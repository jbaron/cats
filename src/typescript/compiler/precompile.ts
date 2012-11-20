// Copyright (c) Microsoft. All rights reserved. Licensed under the Apache License, Version 2.0. 
// See LICENSE.txt in the project root for complete license information.

///<reference path='typescript.ts' />

module TypeScript {

    /// Compiler settings

    export class StyleSettings {
        // bitwise operations not permitted
        public bitwise = false;  
        // disallow non-block statements as bodies of compound statements
        public blockInCompoundStmt = false;
        // disallow == and !=
        public eqeqeq = false;
        // require body of for in loop to start with a filter
        public forin = false;
        // empty blocks permitted
        public emptyBlocks = true;
        // require result of new expression to be used (no new just for side-effects)
        public newMustBeUsed = false;
        // require semicolons to terminate statements
        public requireSemi = false;
        // no top-level assignment in conditionals if (a=b) { ...
        public assignmentInCond = false;
        // no == null or != null
        public eqnull = false;
        // permit eval
        public evalOK = true;
        // permit var use if decl in inner scope as in if (c) { var v=10; } v=11;
        public innerScopeDeclEscape = true;
        // permit functions in loops
        public funcInLoop = true;
        // permit re-declaration of local variable 
        public reDeclareLocal = true;
        // permit obj['x'] in addition to obj.x
        public literalSubscript = true;
        // flag implicit 'any'
        public implicitAny = false;

        public setOption(opt: string, val: bool): bool {
            var optExists = this[opt];
            if (optExists !== undefined) {
                this[opt] = val;
                return true;
            }
            else {
                return false;
            }
        }
        
        public parseOptions(str: string) {
            var opts=str.split(";");
            for (var i = 0, len = opts.length; i < len; i++) {
                var opt = opts[i];
                var val = true;
                var colonIndex=opt.lastIndexOf(":");
                if (colonIndex >= 0) {
                    var valStr = opt.substring(colonIndex+1);
                    opt = opt.substring(0, colonIndex);
                    if (valStr == "off") {
                        val = false;
                    }
                }
                if (!this.setOption(opt, val)) {
                    return false;
                }
            }
            return true;
        }
    }
    
    export class CompilationSettings {
        public styleSettings = new StyleSettings();
        public propagateConstants = false;
        public minWhitespace = false;
        public parseOnly = false;
        public outputMany = true;
        public errorRecovery = false;
        public emitComments = false;
        public watch = false;
        public exec = false;
        public resolve = true;
        public controlFlow = false;
        public printControlFlow = false;
        public controlFlowUseDef = false;
        public errorOnWith = true;
        public preprocess = true;
        public canCallDefinitionSignature = false;

        public inferPropertiesFromThisAssignment = false;
        public useDefaultLib = true;

        public codeGenTarget = CodeGenTarget.ES3;
        public moduleGenTarget = ModuleGenTarget.Synchronous;
        public outputFileName: string = "";
        public mapSourceFiles = false;
        public generateDeclarationFiles = false;

        public useCaseSensitiveFileResolution = false;

        public setStyleOptions(str: string) {
            this.styleSettings.parseOptions(str);
        }
        
        public outputOne(outFile: string) {
            this.outputFileName = outFile;
            this.outputMany = false;
        }
    }

    ///
    /// Preprocessing
    ///
    export interface IPreProcessedFileInfo {
        settings: CompilationSettings;
        referencedFiles: IFileReference[];
        importedFiles: IFileReference[];
        isLibFile: bool;
    }

    function getFileReferenceFromReferencePath(comment: string): IFileReference {
        var referencesRegEx = /^(\/\/\/\s*<reference\s+path=)('|")(.+?)\2\s*(static=('|")(.+?)\2\s*)*\/>/gim;
        var match = referencesRegEx.exec(comment);

        if (match) {
            var path: string = normalizePath(match[3]);
            var adjustedPath = normalizePath(path);
    
            var isResident = match.length >= 7 && match[6] == "true";
            if (isResident) {
                CompilerDiagnostics.debugPrint(path + " is resident");
            }
            return { minChar: 0, limChar: 0, path: switchToForwardSlashes(adjustedPath), isResident: isResident };
        }
        else {
            return null;
        }
    }

    // used in the parser, but kept here in case we want to reintegrate it with preprocessing
    export function getAdditionalDependencyPath(comment: string): string {
        var amdDependencyRegEx = /^(\/\/\/\s*<amd-dependency\s+path=)('|")(.+?)\2\s*(static=('|")(.+?)\2\s*)*\/>/gim;
        var match = amdDependencyRegEx.exec(comment);

        if (match) {
            var path: string = match[3];
            return path;
        }
        else {
            return null;
        }
    }

    export function getImplicitImport(comment: string): bool {
        var implicitImportRegEx = /^(\/\/\/\s*<implicit-import\s*)*\/>/gim;
        var match = implicitImportRegEx.exec(comment);

        if (match) {
            return true;
        }
        
        return false;
    }

    export function getStyleSettings(comment: string, styleSettings: StyleSettings) {
        var styleRegEx = /^(\/\/\/\s*<style\s+)(([a-zA-Z])+=('|").+('|"))\s*\/>/gim;

        var settings = styleRegEx.exec(comment);

        if (settings) {
            var settingsRegEx = /^([a-zA-Z]+=['"]on['|"])/gim;
            settings = settingsRegEx.exec(settings[2]);
                
            if (settings) {
                for (var i = 0; i < settings.length; i++) {
                    var setting = (<string>settings[i]).split("=");
                    var on = "\"on\"";

                    switch (setting[0]) {
                        case "blockInCompoundStmt": styleSettings.blockInCompoundStmt = setting[1] == on; break;
                        case "eqeqeq": styleSettings.eqeqeq = setting[1] == on; break;
                        case "forin": styleSettings.forin = setting[1] == on; break;
                        case "emptyBlocks": styleSettings.emptyBlocks = setting[1] == on; break;
                        case "newMustBeUsed": styleSettings.newMustBeUsed = setting[1] == on; break;
                        case "requireSemi": styleSettings.requireSemi = setting[1] == on; break;
                        case "assignmentInCond": styleSettings.assignmentInCond = setting[1] == on; break;
                        case "eqnull": styleSettings.eqnull = setting[1] == on; break;
                        case "evalOK": styleSettings.evalOK = setting[1] == on; break;
                        case "innerScopeDeclEscape": styleSettings.innerScopeDeclEscape = setting[1] == on; break;
                        case "funcInLoop": styleSettings.funcInLoop = setting[1] == on; break;
                        case "reDeclareLocal": styleSettings.reDeclareLocal = setting[1] == on; break;
                        case "literalSubscript": styleSettings.literalSubscript = setting[1] == on; break;
                        case "implicitAny": styleSettings.implicitAny = setting[1] == on; break;                               
                    }
                }
            }
        }
    }

    export function getReferencedFiles(sourceText: ISourceText): IFileReference[] {
        var preProcessInfo = preProcessFile(sourceText, null, false);
        return preProcessInfo.referencedFiles;
    }

    export function preProcessFile(sourceText: ISourceText, options=new CompilationSettings(), readImportFiles? = true): IPreProcessedFileInfo {
        var scanner = new Scanner();
        scanner.resetComments();
        scanner.setSourceText(sourceText, LexMode.File);

        var tok: Token = scanner.scan();
        var comments: CommentToken[] = [];
        var comment: CommentToken = null;
        var leftCurlies: Token[] = [];

        var settings: CompilationSettings = options;
        var referencedFiles: IFileReference[] = [];
        var importedFiles: IFileReference[] = [];
        var isLibFile: bool = false;

        // only search out dynamic mods
        // if you find a dynamic mod, ignore every other mod inside, until you balance rcurlies

        while (tok.tokenId != TokenID.EOF) {

            if (readImportFiles && tok.tokenId == TokenID.IMPORT) {

                tok = scanner.scan();

                if (tok.tokenId == TokenID.ID || convertTokToID(tok, false)) {
                    tok = scanner.scan();

                    if (tok.tokenId == TokenID.Asg) {
                        tok = scanner.scan();

                        if (tok.tokenId == TokenID.MODULE) {
                            tok = scanner.scan();
                            if (tok.tokenId == TokenID.LParen) {
                                tok = scanner.scan();

                                // import foo = module("foo")
                                if (tok.tokenId == TokenID.QString) {
                                    var ref = { minChar: scanner.startPos, limChar: scanner.pos, path: stripQuotes(switchToForwardSlashes(tok.getText())), isResident: false };
                                    importedFiles.push(ref);
                                }
                            }
                        }
                    }
                }
            }

            if (tok.tokenId == TokenID.LCurly) {
                leftCurlies.push(tok);
            }

            if (tok.tokenId == TokenID.RCurly) {
                leftCurlies.pop();
            }

            tok = scanner.scan();
        }

        // deal with comment references, amd dependencies and style settings
        // REVIEW: We could potentially do this inline with the above, if we
        // set Scanner::scanComments to 'true'
        comments = scanner.getComments();

        for (var iComment = 0; iComment < comments.length; iComment++) {
            comment = comments[iComment];
            
            if (!comment.isBlock) {
                var referencedCode = getFileReferenceFromReferencePath(comment.getText());
                if (referencedCode) {
                    referencedCode.minChar = comment.startPos;
                    referencedCode.limChar = referencedCode.minChar + comment.value.length;
                    referencedFiles.push(referencedCode);
                }

                if (settings) {
                    getStyleSettings(comment.getText(), settings.styleSettings);

                    // is it a lib file?
                    var isNoLibRegex = /^(\/\/\/\s*<reference\s+no-default-lib=)('|")(.+?)\2\s*\/>/gim;
                    var isNoLibMatch: any = isNoLibRegex.exec(comment.getText());
                    if (isNoLibMatch) {
                        isLibFile = (isNoLibMatch[3] == "true");
                    }
                }
            }
        }

        return { settings: settings, referencedFiles: referencedFiles, importedFiles: importedFiles, isLibFile: isLibFile };
    }

} // Tools