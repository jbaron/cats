// Copyright (c) Microsoft. All rights reserved. Licensed under the Apache License, Version 2.0. 
// See LICENSE.txt in the project root for complete license information.

///<reference path='typescriptServices.ts' />


module Services {

    //
    // Public interface of of a language service instance shim.
    //
    export interface ILanguageServiceShim {
        host: ILanguageServiceShimHost;
        languageService: Services.ILanguageService;
        logger: TypeScript.ILogger;

        dispose(dummy: any): void;
        refresh(throwOnError: bool): void;

        logAST(fileName: string): void;
        logSyntaxAST(fileName: string): void;

        getErrors(maxCount: number): string;
        getScriptErrors(fileName: string, maxCount: number): string;
        getTypeAtPosition(fileName: string, pos: number): string;
        getSignatureAtPosition(fileName: string, pos: number): string;
        getDefinitionAtPosition(fileName: string, pos: number): string;
        getBraceMatchingAtPosition(fileName: string, pos: number): string;
        getSmartIndentAtLineNumber(fileName: string, lineNumber: number, options: string/*Services.EditorOptions*/): string;
        getReferencesAtPosition(fileName: string, pos: number): string;
        getOccurrencesAtPosition(fileName: string, pos: number): string;
        getCompletionsAtPosition(fileName: string, pos: number, isMemberCompletion: bool);
        getImplementorsAtPosition(fileName: string, pos: number): string;
        getFormattingEditsForRange(fileName: string, minChar: number, limChar: number, options: string/*Services.FormatCodeOptions*/): string;
        getFormattingEditsAfterKeystroke(fileName: string, position: number, key: string, options: string/*Services.FormatCodeOptions*/): string;
        getNavigateToItems(searchValue: string): string;
        getScriptLexicalStructure(fileName: string): string;
        getOutliningRegions(fileName: string): string;
    }

    //
    // Public interface of the host of a language service shim instance.
    //
    export interface ILanguageServiceShimHost extends TypeScript.ILogger {
        getCompilationSettings(): string;
        getScriptCount(): number;
        getScriptId(scriptIndex: number): string;
        getScriptSourceText(scriptIndex: number, start: number, end: number): string;
        getScriptSourceLength(scriptIndex: number): number;
        getScriptIsResident(scriptIndex: number): bool;
        getScriptVersion(scriptIndex: number): number;
        getScriptEditRangeSinceVersion(scriptIndex: number, scriptVersion: number): string;
    }

    export class LanguageServiceShimHostAdapter implements Services.ILanguageServiceHost {
        constructor (private shimHost: ILanguageServiceShimHost) {
        }

        public information(): bool {
            return this.shimHost.information();
        }

        public debug(): bool {
            return this.shimHost.debug();
        }

        public warning(): bool {
            return this.shimHost.warning();
        }

        public error(): bool {
            return this.shimHost.error();
        }

        public fatal(): bool {
            return this.shimHost.fatal();
        }

        public log(s: string): void {
            this.shimHost.log(s);
        }

        public getCompilationSettings(): TypeScript.CompilationSettings {
            var settingsJson = this.shimHost.getCompilationSettings();
            if (settingsJson == null || settingsJson == "") {
                return null;
            }
            var settings: TypeScript.CompilationSettings = JSON.parse(<any>settingsJson);
            return settings;
        }

        public getScriptCount(): number {
            return this.shimHost.getScriptCount();
        }

        public getScriptId(scriptIndex: number): string {
            return this.shimHost.getScriptId(scriptIndex);
        }

        public getScriptSourceText(scriptIndex: number, start: number, end: number): string {
            return this.shimHost.getScriptSourceText(scriptIndex, start, end);
        }

        public getScriptSourceLength(scriptIndex: number): number {
            return this.shimHost.getScriptSourceLength(scriptIndex);
        }

        public getScriptIsResident(scriptIndex: number): bool {
            return this.shimHost.getScriptIsResident(scriptIndex);
        }

        public getScriptVersion(scriptIndex: number): number {
            return this.shimHost.getScriptVersion(scriptIndex);
        }

        public getScriptEditRangeSinceVersion(scriptIndex: number, scriptVersion: number): TypeScript.ScriptEditRange {
            var rangeText = this.shimHost.getScriptEditRangeSinceVersion(scriptIndex, scriptVersion);
            if (rangeText === null || rangeText === "") {
                return null; // "No changes"
            }

            var minLimDeltaString = rangeText.split(",");
            return new TypeScript.ScriptEditRange(parseInt(minLimDeltaString[0]), parseInt(minLimDeltaString[1]), parseInt(minLimDeltaString[2]));
        }
    }

    export function simpleForwardCall(logger: TypeScript.ILogger, actionDescription: string, action: () =>any): any {
        logger.log(actionDescription);
        var start = Date.now();
        var result = action();
        var end = Date.now();
        logger.log(actionDescription + " completed in " + (end - start) + " msec");
        if (typeof (result) === "string") {
            var str = <string>result;
            logger.log("  result.length=" + str.length + ", result=\"" + TypeScript.stringToLiteral(str, 128) + (str.length > 128 ? "..." : "") + "\"");
        }
        return result;
    }

    export function forwardCall(logger: TypeScript.ILogger, actionDescription: string, action: () =>any, throwOnError: bool = false): any {
        try {
            return simpleForwardCall(logger, actionDescription, action);
        }
        catch (err) {
            Services.logInternalError(logger, err);
            if (throwOnError)
                throw err;
            return "##ERROR##" + err.name + "##" + err.message;
        }
    }

    export function forwardJSONCall(logger: TypeScript.ILogger, actionDescription: string, action: () =>any): string {
        try {
            return simpleForwardCall(logger, actionDescription, action);
        }
        catch (err) {
            Services.logInternalError(logger, err);
            //throw err; //TODO: Remove this!
            return _errorToJSON(err);
        }
    }

    function _resultToJSON(result: any): string {
        return '{"result":' + JSON.stringify(result) + "}";
    }

    function _errorToJSON(err): string {
        return '{"error":' + JSON.stringify(err) + "}";
    }

    export class LanguageServiceShim implements ILanguageServiceShim {
        public logger: TypeScript.ILogger;

        constructor (public host: ILanguageServiceShimHost, public languageService: Services.ILanguageService) {
            this.logger = this.host;
        }

        public forwardCall(actionDescription: string, action: () =>any, throwOnError: bool = false): any {
            return Services.forwardCall(this.logger, actionDescription, action, throwOnError);
        }

        public forwardJSONCall(actionDescription: string, action: () =>any): string {
            return Services.forwardJSONCall(this.logger, actionDescription, action);
        }

        // DISPOSE
        // Ensure (almost) determinstic release of internal Javascript resources when 
        // some external native objects holds onto us (e.g. Com/Interop).
        public dispose(dummy: any): void {
            this.logger.log("dispose()")
            this.languageService = null;
            this.logger = null;
        }

        // REFRESH
        // Update the list of scripts known to the compiler
        public refresh(throwOnError: bool): void {
            this.forwardCall(
                "refresh(" + throwOnError + ")",
                () => {
                    this.languageService.refresh();
                    return null;
                },
                throwOnError);
        }

        /// SQUIGGLES
        ///
        public getErrors(maxCount: number): string {
            return this.forwardJSONCall(
                "getErrors(" + maxCount + ")",
                () => {
                    var errors = this.languageService.getErrors(maxCount);
                    return _resultToJSON(errors);
                });
        }

        /// SQUIGGLES
        ///
        public getScriptErrors(fileName: string, maxCount: number): string {
            return this.forwardJSONCall(
                "getScriptErrors(" + maxCount + ")",
                () => {
                    var errors = this.languageService.getScriptErrors(fileName, maxCount);
                    return _resultToJSON(errors);
                });
        }

        /// QUICKINFO
        /// Computes a string representation of the type at the requested position
        /// in the active file.
        public getTypeAtPosition(fileName: string, pos: number): string {
            return this.forwardJSONCall(
                "getTypeAtPosition(\"" + fileName + "\", " + pos + ")",
                () => {
                    var typeInfo = this.languageService.getTypeAtPosition(fileName, pos);
                    return _resultToJSON(typeInfo);
                });
        }

        /// NAMEORDOTTEDNAMESPAN
        /// Computes span information of the name or dotted name at the requested position
        // in the active file.
        public getNameOrDottedNameSpan(fileName: string, startPos: number, endPos: number): string {
            return this.forwardJSONCall(
                "getNameOrDottedNameSpan(\"" + fileName + "\", " + startPos + ", "  + endPos + ")",
                () => {
                    var spanInfo = this.languageService.getNameOrDottedNameSpan(fileName, startPos, endPos);
                    return _resultToJSON(spanInfo);
                });
        }

        /// STATEMENTSPAN
        /// Computes span information of statement at the requested position in the active file.
        public getBreakpointStatementAtPosition(fileName: string, pos: number): string {
            return this.forwardJSONCall(
                "getBreakpointStatementAtPosition(\"" + fileName + "\", " + pos + ")",
                () => {
                    var spanInfo = this.languageService.getBreakpointStatementAtPosition(fileName, pos);
                    return _resultToJSON(spanInfo);
                });
        }

        /// SIGNATUREHELP
        /// Computes a string representation of the signatures at the requested position
        /// in the active file.
        public getSignatureAtPosition(fileName: string, pos: number): string {
            return this.forwardJSONCall(
                "getSignatureAtPosition(\"" + fileName + "\", " + pos + ")",
                () => {
                    var signatureInfo = this.languageService.getSignatureAtPosition(fileName, pos);
                    return _resultToJSON(signatureInfo);
                });
        }

        /// GOTO DEFINITION
        /// Computes the definition location and file for the symbol
        /// at the requested position. 
        public getDefinitionAtPosition(fileName: string, pos: number): string {
            return this.forwardCall(
                "getDefinitionAtPosition(\"" + fileName + "\", " + pos + ")",
                () => {
                    var definition = this.languageService.getDefinitionAtPosition(fileName, pos);
                    var result = "";
                    if (definition !== null) {
                        result = definition.unitIndex + '\t' +
                            definition.minChar + '\t' +
                            definition.limChar + '\t' +
                            definition.kind + '\t' +
                            definition.name + '\t' +
                            definition.containerKind + '\t' +
                            definition.containerName;
                    }
                    return result;
                });
        }

        /// GET BRACE MATCHING
        public getBraceMatchingAtPosition(fileName: string, pos: number): string {
            return this.forwardJSONCall(
                "getBraceMatchingAtPosition(\"" + fileName + "\", " + pos + ")",
                () => {
                    var textRanges = this.languageService.getBraceMatchingAtPosition(fileName, pos);
                    return _resultToJSON(textRanges);
                });
        }

        /// GET SMART INDENT
        public getSmartIndentAtLineNumber(fileName: string, lineNumber: number, options: string /*Services.EditorOptions*/): string {
            return this.forwardJSONCall(
                "getSmartIndentAtLineNumber(\"" + fileName + "\", " + lineNumber + ")",
                () => {
                    var localOptions: Services.EditorOptions = JSON.parse(options);
                    var columnOffset = this.languageService.getSmartIndentAtLineNumber(fileName, lineNumber, localOptions);
                    return _resultToJSON({ value: columnOffset });
                });
        }

        /// GET REFERENCES
        ///  Return references to a symbol at the requested position.
        ///  References are separated by "\n".
        ///  Each reference is a "fileindex min lim" sub-string.
        public getReferencesAtPosition(fileName: string, pos: number): string {
            return this.forwardJSONCall(
                "getReferencesAtPosition(\"" + fileName + "\", " + pos + ")",
                () => {
                    var entries = this.languageService.getReferencesAtPosition(fileName, pos);
                    return this._referencesToResult(entries);
                });
        }

        public getOccurrencesAtPosition(fileName: string, pos: number): string {
            return this.forwardCall(
                "getOccurrencesAtPosition(\"" + fileName + "\", " + pos + ")",
                () => {
                    var entries = this.languageService.getOccurrencesAtPosition(fileName, pos);
                    return this._referencesToResult(entries);
                });
        }

        /// GET IMPLEMENTORS
        public getImplementorsAtPosition(fileName: string, pos: number): string {
            return this.forwardJSONCall(
                "getImplementorsAtPosition(\"" + fileName + "\", " + pos + ")",
                () => {
                    var entries = this.languageService.getImplementorsAtPosition(fileName, pos);
                    return this._referencesToResult(entries);
                });
        }


        private _referencesToResult(entries: Services.ReferenceEntry[]): string {
            var result = "";
            for (var i = 0; i < entries.length; i++) {
                var entry = entries[i];
                result += entry.unitIndex + " " + entry.ast.minChar + " " + entry.ast.limChar + " " + entry.isWriteAccess + "\n";
            }
            return result;
        }

        /// COMPLETION LISTS
        /// Get a string based representation of the completions 
        /// to provide at the given source position and providing a member completion 
        /// list if requested.
        public getCompletionsAtPosition(fileName: string, pos: number, isMemberCompletion: bool) {
            return this.forwardJSONCall(
                "getCompletionsAtPosition(\"" + fileName + "\", " + pos + ", " + isMemberCompletion + ")",
                () => {
                    var completion = this.languageService.getCompletionsAtPosition(fileName, pos, isMemberCompletion);
                    var result = _resultToJSON(completion);
                    return result;
                });
        }

        /// FORMAT SELECTION/DOCUMENT
        public getFormattingEditsForRange(fileName: string, minChar: number, limChar: number, options: string/*Services.FormatCodeOptions*/): string {
            return this.forwardJSONCall(
                "getFormattingEditsForRange(\"" + fileName + "\", " + minChar + ", " + limChar + ")",
                () => {
                    var localOptions: Services.FormatCodeOptions = JSON.parse(options);
                    var edits = this.languageService.getFormattingEditsForRange(fileName, minChar, limChar, localOptions);
                    var result = _resultToJSON(edits);
                    return result;
                });
        }

        /// FORMAT
        public getFormattingEditsAfterKeystroke(fileName: string, position: number, key: string, options: string/*Services.FormatCodeOptions*/): string {
            return this.forwardJSONCall(
                "getFormattingEditsAfterKeystroke(\"" + fileName + "\", " + position + ", \"" + key + "\")",
                () => {
                    var localOptions: Services.FormatCodeOptions = JSON.parse(options);
                    var edits = this.languageService.getFormattingEditsAfterKeystroke(fileName, position, key, localOptions);
                    var result = _resultToJSON(edits);
                    return result;
                });
        }

        /// NAVIGATE TO
        ///  Return a list of symbols that are interesting to navigate to
        public getNavigateToItems(searchValue: string): string {
            return this.forwardCall(
                "getNavigateToItems(\"" + searchValue + "\")",
                () => {
                    var items = this.languageService.getNavigateToItems(searchValue);
                    var result = this._navigateToItemsToString(items);
                    return result;
                });
        }

        // GET SCRIPT LEXICAL STRUCTURE
        //
        public getScriptLexicalStructure(fileName: string): string {
            return this.forwardCall(
                "getScriptLexicalStructure(\"" + fileName + "\")",
                () => {
                    var items = this.languageService.getScriptLexicalStructure(fileName);
                    var result = this._navigateToItemsToString(items);
                    return result;
                });
        }

        // GET OUTLINING REGIONS
        //
        public getOutliningRegions(fileName: string): string {
            return this.forwardCall(
                "getOutliningRegions(\"" + fileName + "\")",
                () => {
                    var items = this.languageService.getOutliningRegions(fileName);
                    var result = this._navigateToItemsToString(items);
                    return result;
                });
        }

        /// LOG AST
        ///
        public logAST(fileName: string): void {
            this.forwardCall(
                "logAST(\"" + fileName + "\")",
                () => {
                    this.languageService.logAST(fileName);
                    return null;
                });
        }

        /// LOG SYNTAX AST
        ///
        public logSyntaxAST(fileName: string): void {
            this.forwardCall(
                "logSyntaxAST(\"" + fileName + "\")",
                () => {
                    this.languageService.logSyntaxAST(fileName);
                    return null;
                });
        }

        private _navigateToItemsToString(items: Services.NavigateToItem[]): string {
            var result = "";
            for (var i = 0; i < items.length; i++) {
                var item = items[i];

                result += item.name + "\t" +
                    item.kind + "\t" +
                    item.kindModifiers + "\t" +
                    item.containerName + "\t" +
                    item.containerKind + "\t" +
                    item.matchKind + "\t" +
                    item.unitIndex + "\t" +
                    item.minChar + "\t" +
                    item.limChar + "\n";
            }
            return result;
        }
    }

    export class ClassifierShim {
        public classifier: Services.Classifier;

        constructor (public host: Services.IClassifierHost) {
            this.classifier = new Services.Classifier(this.host);
        }

        /// COLORIZATION
        public getClassificationsForLine(text: string, lexState: TypeScript.LexState): string {
            var classification = this.classifier.getClassificationsForLine(text, lexState);
            var items = classification.entries;
            var result = "";
            for (var i = 0; i < items.length; i++) {
                result += items[i].length + "\n";
                result += items[i].classification + "\n";
            }
            result += classification.finalLexState;
            return result;
        }
    }

    export class CoreServicesShim {
        public logger: TypeScript.ILogger;
        public services: Services.CoreServices;

        constructor (public host: Services.ICoreServicesHost) {
            this.logger = this.host.logger;
            this.services = new Services.CoreServices(this.host);
        }

        private forwardCall(actionDescription: string, action: () =>any, throwOnError: bool = false): any {
            return Services.forwardCall(this.logger, actionDescription, action, throwOnError);
        }

        private forwardJSONCall(actionDescription: string, action: () =>any): any {
            return Services.forwardJSONCall(this.logger, actionDescription, action);
        }

        ///
        /// getPreProcessedFileInfo
        ///
        public getPreProcessedFileInfo(scriptId: string, sourceText: TypeScript.ISourceText): string {
            return this.forwardJSONCall(
                "getPreProcessedFileInfo(\"" + scriptId + "\")",
                () => {
                    var result = this.services.getPreProcessedFileInfo(scriptId, sourceText);
                    return _resultToJSON(result);
                });
        }

        ///
        /// getDefaultCompilationSettings
        ///
        public getDefaultCompilationSettings(): string {
            return this.forwardJSONCall(
                "getDefaultCompilationSettings()",
                () => {
                    var result = this.services.getDefaultCompilationSettings();
                    return _resultToJSON(result);
                });
        }

        ///
        /// dumpMemory
        ///
        public dumpMemory(dummy: any): string {
            return this.forwardCall(
                "dumpMemory()",
                () => {
                    return this.services.dumpMemory();
                });
        }

        ///
        /// getMemoryInfo
        ///
        public getMemoryInfo(dummy: any): string {
            return this.forwardJSONCall(
                "getMemoryInfo()",
                () => {
                    var result = this.services.getMemoryInfo();
                    return _resultToJSON(result);
                });
        }
    }
}
