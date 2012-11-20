// Copyright (c) Microsoft. All rights reserved. Licensed under the Apache License, Version 2.0. 
// See LICENSE.txt in the project root for complete license information.

///<reference path='typescriptServices.ts' />

module Services {
    //
    // Cache known state of scripts information from host across language service calls.
    // Used to help with incremental behavior of language service.
    //
    export class ScriptMap {
        private map: TypeScript.StringHashTable; 
        
        constructor() {
            // script id => ScriptMapEntry
            this.map = new TypeScript.StringHashTable();
        }

        public setEntry(id: string, isResident: bool, version: number) {
            var entry: ScriptMapEntry = this.map.lookup(id);
            if (entry == null) {
                entry = new ScriptMapEntry(isResident, version);
                this.map.add(id, entry);
            }
            else {
                entry.isResident = isResident;
                entry.version = version;
            }
        }

        public getEntry(id: string): ScriptMapEntry {
            return this.map.lookup(id);
        }
    }

    export class ScriptMapEntry {
        constructor(public isResident: bool, public version: number) {
        }
    }

    //
    // An cache entry in HostCache 
    //
    export class HostCacheEntry {
        private _cachedSourceText: TypeScript.ISourceText;
        private _sourceText: TypeScript.ISourceText;

        constructor(
            private host: ILanguageServiceHost,
            public hostUnitIndex: number,
            public id: string,
            public version: number,
            public isResident: bool) 
        {
            this._cachedSourceText = null;
            this._sourceText = null;
        }


        public getSourceText(cached: bool): TypeScript.ISourceText {
            if (cached) {
                if (this._cachedSourceText === null) {
                    this._cachedSourceText = new CachedSourceTextAdapter(this.host, this.hostUnitIndex);
                }
                return this._cachedSourceText;
            }
            else {
                if (this._sourceText === null) {
                    this._sourceText = new SourceTextAdapter(this.host, this.hostUnitIndex);
                }
                return this._sourceText;
            }
        }
    }

    //
    // Cache host information about scripts. Should be refreshed 
    // at each language service public entry point, since we don't know when 
    // set of scripts handled by the host changes.
    //
    export class HostCache {
        
        private map: TypeScript.StringHashTable;
        private array: HostCacheEntry[];

        constructor(public host: ILanguageServiceHost) {

            // script id => script index
            this.map = new TypeScript.StringHashTable();
            // script index => HostCacheEntry
            this.array = [];

            this.init();
        }

        private init() {
            for (var i = 0, len = this.host.getScriptCount() ; i < len; i++) {
                var scriptId = this.host.getScriptId(i);
                this.map.add(scriptId, i);
                this.array[i] = new HostCacheEntry(this.host, i, scriptId, this.host.getScriptVersion(i), this.host.getScriptIsResident(i));
            }
        }

        public count() {
            return this.map.count();
        }

        public getUnitIndex(scriptId: string): number {
            var result: number = this.map.lookup(scriptId);
            if (result == null)
                return -1;
            return result;
        }

        public getVersion(scriptIndex: number): number {
            return this.array[scriptIndex].version;
        }

        public getIsResident(scriptIndex: number): bool {
            return this.array[scriptIndex].isResident;
        }

        public getScriptId(scriptIndex: number): string {
            return this.array[scriptIndex].id;
        }

        public getSourceText(scriptIndex: number, cached: bool = false): TypeScript.ISourceText {
            return this.array[scriptIndex].getSourceText(cached);
        }
    }

    //
    // Cache compiler instance mapping from filename to unitindex.
    // A new cache instance should be created whenever the set of scripts
    // passed to the compiler changes. 
    //
    export class CompilerCache {

        private map: TypeScript.StringHashTable;

        constructor(public compiler: TypeScript.TypeScriptCompiler) {

            // script id => compiler unit index
            this.map = new TypeScript.StringHashTable();

            this.init();
        }

        private init() {
            for (var i = 0, len = this.compiler.units.length; i < len; i++) {
                this.map.add(this.compiler.units[i].filename, i);
            }
        }

        public getUnitIndex(scriptId: string): number {
            var result: number = this.map.lookup(scriptId);
            if (result == null)
                return -1;
            return result;
        }
    }

    export class UnitErrors {

        public parseErrors: TypeScript.ErrorEntry[];
        public typeCheckErrors: TypeScript.ErrorEntry[];

        constructor() {
            this.parseErrors = [];
            this.typeCheckErrors = [];
        }
    }

    export class CompilerErrorCollector {

        private parseMode: bool;
        public fileMap: UnitErrors[];

        constructor(public logger: TypeScript.ILogger) {
            this.parseMode = false;
            this.fileMap = [];
        }

        public startParsing(unitIndex: number) {
            //logger.log("Start parsing unit " + unitIndex);
            this.parseMode = true;
            var errors = this.fileMap[unitIndex];
            if (errors !== undefined) {
                errors.parseErrors.length = 0;
            }
        }

        public startTypeChecking() {
            //logger.log("Start type checking");

            this.parseMode = false;
            for (var i = 0; i < this.fileMap.length; i++) {
                var errors = this.fileMap[i];
                if (errors !== undefined) {
                    errors.typeCheckErrors.length = 0;
                }
            }
        }

        public reportError(pos: number, len: number, message: string, unitIndex: number) {
            //logger.log("Compiler reported error in unit index " + unitIndex + " at span(" + pos + ", " + (pos + len) + "): " + message + " (parseMode=" + parseMode + ")");

            var entry = new TypeScript.ErrorEntry(unitIndex, pos, pos + len, message);
            var unitErrors = this.fileMap[unitIndex];
            if (unitErrors == undefined) {
                unitErrors = new UnitErrors();
                this.fileMap[unitIndex] = unitErrors;
            }

            if (this.parseMode) {
                unitErrors.parseErrors.push(entry);
            }
            else {
                unitErrors.typeCheckErrors.push(entry);
            }
        }
    }

    export class CompilerState {

        public logger: TypeScript.ILogger;
        //
        // State related to compiler instance
        //
        private compiler: TypeScript.TypeScriptCompiler;
        private errorCollector: CompilerErrorCollector;
        private unitIndexMap: number[];
        private scriptMap: ScriptMap;
        private hostCache: HostCache;
        private compilerCache: CompilerCache;
        private symbolTree: SymbolTree;
        private compilationSettings: TypeScript.CompilationSettings;

        constructor(public host: ILanguageServiceHost) {
            this.logger = this.host;
            //
            // State related to compiler instance
            //
            this.compiler = null;
            this.errorCollector = null;
            this.unitIndexMap = []; // Map from compiler unit index to host unitindex
            this.scriptMap = null; // Map from filename to FileMapEntry

            //
            // State recomputed at every "refresh" call (performance)
            //
            this.hostCache = null;
            this.compilerCache = null;
            this.symbolTree = null;
            this.compilationSettings = null;
        }

        public getCompilationSettings() {
            return this.compilationSettings;
        }

        private setUnitMapping(unitIndex: number, hostUnitIndex: number) {
            this.scriptMap.setEntry(this.hostCache.getScriptId(hostUnitIndex), this.hostCache.getIsResident(hostUnitIndex), this.hostCache.getVersion(hostUnitIndex));
            this.setUnitIndexMapping(unitIndex, hostUnitIndex);
        }

        private setUnitIndexMapping(unitIndex: number, hostUnitIndex: number) {
            this.unitIndexMap[unitIndex] = hostUnitIndex;
        }

        private onTypeCheckStarting(): void {
            this.errorCollector.startTypeChecking();
            this.symbolTree = new SymbolTree(this);
        }

        public getSymbolTree(): ISymbolTree {
            return this.symbolTree;
        }

        public mapToHostUnitIndex(unitIndex: number): number {
            return this.unitIndexMap[unitIndex];
        }

        public anyType() {
            return this.compiler.typeFlow.anyType;
        }

        public getScriptCount() {
            return this.compiler.scripts.members.length;
        }

        public getScript(index: number): TypeScript.Script {
            return <TypeScript.Script>this.compiler.scripts.members[index];
        }

        public getScripts(): TypeScript.Script[] {
            return <TypeScript.Script[]>this.compiler.scripts.members;
        }

        public getUnitIndex(fileName: string) {
            return this.compilerCache.getUnitIndex(fileName);
        }

        public getScriptVersion(fileName: string) {
            return this.hostCache.getVersion(this.hostCache.getUnitIndex(fileName));
        }

        private addCompilerUnit(compiler: TypeScript.TypeScriptCompiler, hostUnitIndex: number) {

            var newUnitIndex = compiler.units.length;
            this.errorCollector.startParsing(newUnitIndex);

            //Note: We need to call "_setUnitMapping" _before_ calling into the compiler,
            //      in case the compiler fails (i.e. throws an exception). This is due to the way
            //      we recover from those failure (we still report errors to the host, 
            //      and we need unit mapping info to do that correctly.
            this.setUnitMapping(newUnitIndex, hostUnitIndex);

            var newScript = compiler.addSourceUnit(this.hostCache.getSourceText(hostUnitIndex), this.hostCache.getScriptId(hostUnitIndex), this.hostCache.getIsResident(hostUnitIndex));
        }

        private updateCompilerUnit(compiler: TypeScript.TypeScriptCompiler, hostUnitIndex: number, unitIndex: number): TypeScript.UpdateUnitResult {
            var scriptId = this.hostCache.getScriptId(hostUnitIndex);

            //Note: We need to call "_setUnitIndexMapping" _before_ calling into the compiler,
            //      in case the compiler fails (i.e. throws an exception). This is due to the way
            //      we recover from those failure (we still report errors to the host, 
            //      and we need unit mapping info to do that correctly.
            this.setUnitIndexMapping(unitIndex, hostUnitIndex);

            var previousEntry = this.scriptMap.getEntry(scriptId);

            //
            // If file is resident, no update for sure
            //
            var isResident = this.hostCache.getIsResident(hostUnitIndex);
            if (isResident) {
                //logger.log("Resident unit are always unchanged (until they become resident): " + unitIndex + "-" + fileName);
                return TypeScript.UpdateUnitResult.noEdits(unitIndex); // not updated
            }

            //
            // If file version is the same, assume no update
            //
            var version = this.hostCache.getVersion(hostUnitIndex);
            if (previousEntry.version === version) {
                //logger.log("Assumed unchanged unit: " + unitIndex + "-"+ fileName);
                return TypeScript.UpdateUnitResult.noEdits(unitIndex); // not updated
            }

            //
            // Otherwise, we need to re-parse/retypecheck the file (maybe incrementally)
            //
            var result = this.attemptIncrementalUpdateUnit(scriptId);
            if (result != null)
                return result;

            var sourceText = this.hostCache.getSourceText(hostUnitIndex);
            this.setUnitMapping(unitIndex, hostUnitIndex);
            return compiler.partialUpdateUnit(sourceText, scriptId, true/*setRecovery*/);
        }

        private attemptIncrementalUpdateUnit(scriptId: string): TypeScript.UpdateUnitResult {
            var previousScript = this.getScriptAST(scriptId);
            var newSourceText = this.getSourceText(previousScript, false);
            var editRange = this.getScriptEditRange(previousScript);

            var result = new TypeScript.IncrementalParser(this.logger).attemptIncrementalUpdateUnit(previousScript, scriptId, newSourceText, editRange);
            if (result == null)
                return null;

            if (result.kind === TypeScript.UpdateUnitKind.EditsInsideSingleScope) {
                if (result.scope1.nodeType != TypeScript.NodeType.FuncDecl) {
                    this.logger.log("  Bailing out because containing scope is not a function");
                    return null;
                }
            }

            //TODO: We don't enable incremental right now, as it would break IDE error reporting
            if (true) {
                this.logger.log("  Bailing out because incremental typecheck is not implemented yet");
                return null;
            }
            else {
                return result;
            }
        }

        private getHostCompilationSettings() {
            var settings = this.host.getCompilationSettings();
            if (settings !== null) {
                return settings;
            }

            // Set "ES5" target by default for language service
            settings = new TypeScript.CompilationSettings();
            settings.codeGenTarget = TypeScript.CodeGenTarget.ES5;
            return settings;
        }

        private createCompiler() {
            var outfile = { Write: (s) => { }, WriteLine: (s) => { }, Close: () => { } };
            var outerr = { Write: (s) => { }, WriteLine: (s) => { }, Close: () => { } };

            // Create and initialize compiler
            this.logger.log("Initializing compiler");

            this.compilationSettings = new TypeScript.CompilationSettings();
            
            Services.copyDataObject(this.compilationSettings, this.getHostCompilationSettings());
            this.compiler = new TypeScript.TypeScriptCompiler(outerr, this.logger, this.compilationSettings);
            this.scriptMap = new ScriptMap();
            this.unitIndexMap = [];
            this.errorCollector = new CompilerErrorCollector(this.logger);

            //TODO: "bind" doesn't work here in the context of running unit tests
            //compiler.setErrorCallback(errorCollector.reportError.bind(errorCollector));
            this.compiler.setErrorCallback((a, b, c, d) => { this.errorCollector.reportError(a, b, c, d); });
            this.compiler.parser.errorRecovery = true;

            // Add unit for all source files
            for (var i = 0, length = this.host.getScriptCount() ; i < length; i++) {
                this.addCompilerUnit(this.compiler, i);
            }

            this.compilerCache = new CompilerCache(this.compiler);

            // Initial typecheck
            this.onTypeCheckStarting();
            this.compiler.typeCheck()
        }

        public minimalRefresh(): void {
            // Reset the cache at start of every refresh
            this.hostCache = new HostCache(this.host);
        }

        public refresh(throwOnError: bool = true): void {
            try {
                // Reset the cache at start of every refresh
                this.hostCache = new HostCache(this.host);

                // If full refresh not needed, attempt partial refresh
                if (!this.fullRefresh()) {
                    this.partialRefresh();
                }

                // Debugging: log version and unit index mapping data
                if (this.logger.information()) {
                    for (var i = 0; i < this.compiler.units.length; i++) {
                        this.logger.log("compiler unit[" + i + "].filename='" + this.compiler.units[i].filename + "'");
                    }
                    for (var i = 0; i < this.hostCache.count() ; i++) {
                        this.logger.log("host script[" + i + "].filename='" + this.hostCache.getScriptId(i) + "', version=" + this.hostCache.getVersion(i));
                    }
                    for (var i = 0; i < this.unitIndexMap.length; i++) {
                        this.logger.log("unitIndexMap[" + i + "] = " + this.unitIndexMap[i]);
                    }
                }
            }
            catch (err) {
                var lastUnitIndex = 0;
                if (this.compiler != null) {
                    lastUnitIndex = this.compiler.units.length - 1;
                }
                this.compiler = null;

                this.logger.log("WARNING: PERF: Internal error during \"Refresh\":");
                logInternalError(this.logger, err);
                this.logger.log("WARNING: PERF:    Compiler state is lost and will be re-initiliazed during next call.");

                this.errorCollector.reportError(0, 1, "Internal error: " + err.message, lastUnitIndex);
                this.errorCollector.reportError(0, 1, "Internal error: IntelliSense features are disabled. Try making edits to source files to restore a valid compilation state.", lastUnitIndex);

                if (throwOnError)
                    throw err;
            }
        }

        //
        // Re-create a fresh compiler instance if needed. 
        // Return "true" if a fresh compiler instance was created. 
        //
        private fullRefresh(): bool {
            // Initial state: no compiler yet
            if (this.compiler == null) {
                this.logger.log("Creating new compiler instance because there is no currently active instance");
                this.createCompiler();
                return true;
            }

            // If any compilation settings changes, a new compiler instance is needed
            if (!Services.compareDataObjects(this.compilationSettings, this.getHostCompilationSettings())) {
                this.logger.log("Creating new compiler instance because compilation settings have changed.");
                this.createCompiler();
                return true;
            }

            /// If any file was deleted, we need to create a new compiler, because we are not
            /// even close to supporting removing symbols (unitindex will be all over the place
            /// if we remove scripts from the list).
            for (var unitIndex = 0, len = this.compiler.units.length; unitIndex < len; unitIndex++) {
                var fileName = this.compiler.units[unitIndex].filename;

                var hostUnitIndex = this.hostCache.getUnitIndex(fileName);
                if (hostUnitIndex < 0) {
                    this.logger.log("Creating new compiler instance because of unit is not part of program anymore: " + unitIndex + "-" + fileName);
                    this.createCompiler();
                    return true;
                }
            }

            //
            // If any file "isResident" status has changed, create a new compiler instance
            //
            for (var unitIndex = 0, len = this.compiler.units.length; unitIndex < len; unitIndex++) {
                var fileName = this.compiler.units[unitIndex].filename;
                var isResident = (<TypeScript.Script>this.compiler.scripts.members[unitIndex]).isResident;
                var hostUnitIndex = this.hostCache.getUnitIndex(fileName);

                if (this.hostCache.getIsResident(hostUnitIndex) != isResident) {
                    this.logger.log("Creating new compiler instance because of unit 'isResident' status has changed: " + unitIndex + "-" + fileName);
                    this.createCompiler();
                    return true;
                }
            }

            // We can attempt a partial refresh
            return false;
        }

        // Attempt an incremental refresh of the compiler state.
        private partialRefresh(): void {
            this.logger.log("Updating files...");
            this.compilerCache = new CompilerCache(this.compiler);

            var updateResults: TypeScript.UpdateUnitResult[] = [];
            function getSingleFunctionEdit(updateResults: TypeScript.UpdateUnitResult[]) {
                var result: TypeScript.UpdateUnitResult = null;
                for (var i = 0, len = updateResults.length; i < len; i++) {
                    var entry = updateResults[i];
                    if (entry.kind == TypeScript.UpdateUnitKind.EditsInsideSingleScope) {
                        if (result === null)
                            result = entry;
                        else {
                            result = null;
                            break;
                        }
                    } else if (entry.kind == TypeScript.UpdateUnitKind.Unknown) {
                        result = null;
                        break;
                    }
                }
                return result;
            }
            var fileAdded: bool = false;

            // foreach file in the list of new files
            //   if there was a file with the same name before
            //      update it if content has changed
            //   else
            //      add it
            for (var hostUnitIndex = 0, len = this.host.getScriptCount() ; hostUnitIndex < len; hostUnitIndex++) {
                var fileName = this.hostCache.getScriptId(hostUnitIndex);
                var unitIndex = this.compilerCache.getUnitIndex(fileName);

                if (unitIndex >= 0) {
                    var updateResult = this.updateCompilerUnit(this.compiler, hostUnitIndex, unitIndex);
                    updateResults.push(updateResult);
                }
                else {
                    this.addCompilerUnit(this.compiler, hostUnitIndex);
                    fileAdded = true;
                }
            }

            // Are we in an incremental update situation?
            var incrementalTypeCheckSuccessful = false;
            var singleEdit = getSingleFunctionEdit(updateResults);
            if (fileAdded === false && singleEdit !== null) {
                this.logger.log("Attempting incremental type check because there was a single edit to the function \"" + (<TypeScript.FuncDecl>singleEdit.scope1).name.actualText + "\"");
                incrementalTypeCheckSuccessful = this.attemptIncrementalTypeCheck(singleEdit);
            }

            // Incremental was not applicable, fall back to full typecheck
            if (!incrementalTypeCheckSuccessful) {
                // Apply changes to units
                var anythingUpdated = false;
                for (var i = 0, len = updateResults.length; i < len; i++) {
                    var entry = updateResults[i];
                    if (this.applyUpdateResult(entry))
                        anythingUpdated = true;
                }

                if (anythingUpdated) {
                    this.logger.log("Incremental type check not applicable, processing unit updates");
                    this.onTypeCheckStarting();
                    this.compiler.reTypeCheck();
                }
                else {
                    this.logger.log("No updates to source files, no typecheck needed");
                }
            }
        }

        private attemptIncrementalTypeCheck(updateResult: TypeScript.UpdateUnitResult): bool {
            var success = this.compiler.attemptIncrementalTypeCheck(updateResult);
            if (success) {
                this.applyUpdateResult(updateResult);
            }
            return success;
        }

        private applyUpdateResult(updateResult: TypeScript.UpdateUnitResult): bool {
            switch (updateResult.kind) {
                case TypeScript.UpdateUnitKind.NoEdits:
                    return false;
                case TypeScript.UpdateUnitKind.Unknown:
                case TypeScript.UpdateUnitKind.EditsInsideSingleScope:
                    this.errorCollector.startParsing(updateResult.unitIndex);
                    return this.compiler.applyUpdateResult(updateResult);
            }
        }

        public getScriptAST(fileName: string): TypeScript.Script {
            var unitIndex = this.compilerCache.getUnitIndex(fileName);
            if (unitIndex < 0) {
                throw new Error("Interal error: No AST found for file \"" + fileName + "\".");
            }

            return <TypeScript.Script>this.compiler.scripts.members[unitIndex];
        }

        public getLineMap(fileName: string): number[] {
            var unitIndex = this.compilerCache.getUnitIndex(fileName);
            if (unitIndex < 0) {
                throw new Error("Interal error: No AST found for file \"" + fileName + "\".");
            }

            return this.compiler.units[unitIndex].lineMap;
        }

        public getScopeEntries(enclosingScopeContext: TypeScript.EnclosingScopeContext) {
            return new TypeScript.ScopeTraversal(this.compiler).getScopeEntries(enclosingScopeContext);
        }

        public getErrorEntries(maxCount: number, filter: (unitIndex: number, error: TypeScript.ErrorEntry) =>bool): TypeScript.ErrorEntry[] {
            var entries: TypeScript.ErrorEntry[] = [];
            var count = 0;

            var addError = (error: TypeScript.ErrorEntry): bool => {
                entries.push(error);
                count++;
                return (count < maxCount);
            }

            for (var unitIndex = 0, len = this.errorCollector.fileMap.length; unitIndex < len; unitIndex++) {
                var errors = this.errorCollector.fileMap[unitIndex];
                if (errors !== undefined) {
                    for (var i = 0; i < errors.parseErrors.length; i++) {
                        var error = errors.parseErrors[i];
                        if (filter(unitIndex, error)) {
                            if (!addError(error))
                                break;
                        }
                    }
                    for (var i = 0; i < errors.typeCheckErrors.length; i++) {
                        var error = errors.typeCheckErrors[i];
                        if (filter(unitIndex, error)) {
                            if (!addError(error))
                                break;
                        }
                    }
                }
            }

            // Convert "unitIndex" into host units
            var result: TypeScript.ErrorEntry[] = [];
            for (var i = 0; i < entries.length; i++) {
                var e = entries[i];
                var ne = new TypeScript.ErrorEntry(this.mapToHostUnitIndex(e.unitIndex), e.minChar, e.limChar, e.message);
                result.push(ne);
            }
            return result;
        }

        public cleanASTTypesForReTypeCheck(ast: TypeScript.AST): void {
            this.compiler.cleanASTTypesForReTypeCheck(ast);
        }

        public getScriptEditRange(script: TypeScript.Script): TypeScript.ScriptEditRange {
            var lastKnownVersion = this.scriptMap.getEntry(script.locationInfo.filename).version;
            return this.getScriptEditRangeSinceVersion(script.locationInfo.filename, lastKnownVersion);
        }

        public getScriptEditRangeSinceVersion(fileName: string, lastKnownVersion: number): TypeScript.ScriptEditRange {
            var hostUnitIndex = this.hostCache.getUnitIndex(fileName);

            var currentVersion = this.hostCache.getVersion(hostUnitIndex);
            if (lastKnownVersion === currentVersion) {
                return null; // "No changes"
            }

            return this.host.getScriptEditRangeSinceVersion(hostUnitIndex, lastKnownVersion);
        }

        public getSourceText(script: TypeScript.Script, cached: bool = false) {
            return this.hostCache.getSourceText(this.hostCache.getUnitIndex(script.locationInfo.filename), cached);
        }

        public getSourceText2(fileName: string, cached: bool = false) {
            return this.hostCache.getSourceText(this.hostCache.getUnitIndex(fileName), cached);
        }

        // Since we don't have incremental parsing or typecheck, we resort to parsing the whole source text
        // and return a "syntax only" AST. For example, we use this for formatting engine.
        // We will change this when we have incremental parsing.
        public getScriptSyntaxAST(fileName: string): ScriptSyntaxAST {
            var sourceText = this.hostCache.getSourceText(this.hostCache.getUnitIndex(fileName), /*cached*/true);

            var parser = new TypeScript.Parser();
            parser.setErrorRecovery(null, -1, -1);
            parser.errorCallback = (a, b, c, d) => { };

            var script = parser.parse(sourceText, fileName, 0);

            return new ScriptSyntaxAST(this.logger, script, sourceText);
        }
    }
}
