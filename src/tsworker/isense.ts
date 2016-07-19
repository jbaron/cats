//
// Copyright (c) JBaron.  All rights reserved.
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//

importScripts("../resource/typescriptServices.js");

/**
 * TSWorker contains all the code that runs in the webworker and not the main UI thread.
 * All the compiling and code completion is done in a webworker so the UI in not blocked.
 */ 
module Cats.TSWorker {

    function respond(message:any) {
        postMessage(message,<any>[]);
    }

    /**
     * Simple function to stub console.log functionality since this is 
     * not available in a webworker.
     */
    export var console = {
        log: function(str: string) { respond({ method: "console", params: ["log",str] }); },
        error: function(str: string) { respond({ method: "console", params: ["error",str] }); },
        info: function(str: string) { respond({ method: "console", params: ["info",str] }); }
    };
    
    /**
     * Case insensitive sorting algoritme
     */
    function caseInsensitiveSort(a: { name: string; }, b: { name: string; }) {
        if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
        if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
        // the lower-case strings are equal, so now put them in local order..
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
    }


    class ISense {

        private maxErrors = 100;
        private ls: ts.LanguageService;
        private lsHost: LanguageServiceHost;
        private formatOptions: ts.FormatCodeOptions;
        private documentRegistry: ts.DocumentRegistry;

        /**
         * Create a new TypeScript ISense instance.
         * 
         */
        constructor() {
            this.lsHost = new LanguageServiceHost();
            this.documentRegistry = ts.createDocumentRegistry();
            this.ls = ts.createLanguageService(this.lsHost, this.documentRegistry);
            this.formatOptions = this.getDefaultFormatOptions(); 
        }


        private getDefaultFormatOptions(): ts.FormatCodeOptions {
            return { 
                IndentSize: 4,
                IndentStyle: ts.IndentStyle.Smart,
                TabSize: 4,
                NewLineCharacter: "\n",
                ConvertTabsToSpaces: true,
                InsertSpaceAfterCommaDelimiter: true,
                InsertSpaceAfterSemicolonInForStatements: true,
                InsertSpaceBeforeAndAfterBinaryOperators: true,
                InsertSpaceAfterOpeningAndBeforeClosingNonemptyBrackets: true,
                InsertSpaceAfterKeywordsInControlFlowStatements: true,
                InsertSpaceAfterFunctionKeywordForAnonymousFunctions: true,
                InsertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesis: false,
                InsertSpaceAfterOpeningAndBeforeClosingTemplateStringBraces: false,
                PlaceOpenBraceOnNewLineForFunctions: false,
                PlaceOpenBraceOnNewLineForControlBlocks: false
            };
        }


        /**
         * Sometimes of the TS language services don't work first time
         * This method tries to fix that 
         */
        initialize() {
            try {
                // this.ls.refresh();
                this.compile();
            } catch (err) {
                // Silently ignore
            }
        }


       getTypeDefinitionAtPosition(fileName: string, pos: Position): Cats.FileRange {
            var script = this.lsHost.getScript(fileName);
            var chars = script.getPositionFromCursor(pos);
            var infos = this.ls.getTypeDefinitionAtPosition(fileName, chars);
            if (infos) {
                var info = infos[0];
                var script2 = this.lsHost.getScript(info.fileName);
                // TODO handle better
                return {
                    fileName: info.fileName,
                    range: script2.getRangeFromSpan(info.textSpan)
                };
            } else {
                return null;
            }
        }


        getDefinitionAtPosition(fileName: string, pos: Position): Cats.FileRange {
            var script = this.lsHost.getScript(fileName);
            var chars = script.getPositionFromCursor(pos);
            var infos = this.ls.getDefinitionAtPosition(fileName, chars);
            if (infos) {
                var info = infos[0];
                var script2 = this.lsHost.getScript(info.fileName);
                // TODO handle better
                return {
                    fileName: info.fileName,
                    range: script2.getRangeFromSpan(info.textSpan)
                };
            } else {
                return null;
            }
        }

        /**
         * Create a Class Model for project that can be used for example in the 
         * UML viewer.
         */ 
        public getObjectModel() {
            //Force all symbols to be created.
            this.getAllDiagnostics();
  
           var mc = new ModelCreator();
            this.lsHost.getScriptFileNames().forEach((scriptName) => {
                if (scriptName.indexOf("lib.d.ts") > 0) return;
                var script = this.lsHost.getScript(scriptName);
                // var doc:ts.SourceFile = ts.createSourceFile(scriptName, script.getContent(),
                //        this.lsHost.getCompilationSettings().target, script.getVersion());
                /*
                var doc = this.documentRegistry.acquireDocument(
                    scriptName, 
                    this.lsHost.getCompilationSettings(), 
                    script.getScriptSnapshot(),
                    script.getVersion(), 
                    script.isOpen()
                );
                */
                var doc = script.getSourceFile();
    
                mc.parse(doc);
                
                this.documentRegistry.releaseDocument(scriptName, this.lsHost.getCompilationSettings());
            });
            return mc.getModel();
        }

  
        /**
         * Convert Services to Cats NavigateToItems
         */
        private convertNavigateTo(item: ts.NavigateToItem): NavigateToItem {
            var script = this.lsHost.getScript(item.fileName);
            var result = {
                range : script.getRangeFromSpan(item.textSpan),
                name : item.name,
                fileName: item.fileName,
                kind: item.kind
            }
            return result;
        }


        /**
         * Convert the errors from a TypeScript format into Cats format 
         */
        private convertError(error: ts.Diagnostic): Cats.FileRange {

                var message =  ts.flattenDiagnosticMessageText(error.messageText, "\n");
                
                var severity:Severity;
                switch (error.category) {
                    case ts.DiagnosticCategory.Warning:
                        severity = Severity.Warning;
                        return;
                        
                    case ts.DiagnosticCategory.Message:
                        severity = Severity.Info;
                        return;
                    
                    case ts.DiagnosticCategory.Error:
                    default:
                        severity = Severity.Error;    
                            
                }
                
                var result:Cats.FileRange = {
                    message: message + "",
                    severity: severity
                };
                
                if (error.file) {
                    var script = this.lsHost.getScript(error.file.fileName);
                    result.range = script.getRange(error.start, error.length);
                    result.fileName= error.file.fileName
                }
                
                return result;
        }



        
        /**
         * Get the diagnostic messages for one source file
         * 
         * @param fileName name of the script. 
         */
        getErrors(fileName: string): FileRange[] {
            var script = this.lsHost.getScript(fileName);
            var errors = script.getErrors();

            var result = errors.map((error) => {return this.convertError(error)});
            return result;  
        }

        /**
         * Get the diagnostic messages for all the files and compiler.
         */
        getAllDiagnostics() {
            
            var errors: FileRange[] = [];

            // Let's first get the errors related to the source files
            this.lsHost.getScriptFileNames().forEach((fileName) => {
                errors = errors.concat(this.getErrors(fileName));
            });

            // And then let's see if one or more compiler setttings are wrong
            var compilerSettingsErrors = this.ls.getCompilerOptionsDiagnostics();
            var newErrors = compilerSettingsErrors.map(this.convertError);

            errors = errors.concat(newErrors);

            return errors;
        }

    

        /**
         * Get the various annotations in the comments, like TODO items.
         */ 
        getTodoItems() {
            var result:FileRange[] = [];
           
            this.lsHost.getScripts().forEach((script)=> {
                var entries = script.getTodoItems();
                result = result.concat(entries);
            });
            return result;
        }


        insertDocComments(fileName: string, position: Cats.Position) {
            var script = this.lsHost.getScript(fileName);
            var t = script.insertDoc(position);
            return t;
        }

        /**
         * Compile the loaded TS files and return the 
         * compiles JS sources, mapfiles and errors (if any).
         */
        compile(): Cats.CompileResults {
            var scripts = this.lsHost.getScriptFileNames();

            var outputFiles: ts.OutputFile[] = [];
            var errors: FileRange[] = [];
            var alreadyProcessed :{ [fileName: string]: boolean; } = {}

            
            this.lsHost.getScripts().forEach((script) => {
                try {
                    var emits = script.emitOutput();

                    emits.forEach((file) => {
                        if (! alreadyProcessed[file.name]) outputFiles.push(file);
                        alreadyProcessed[file.name] = true;
                    });

                    // No need to request other files if there is only one output file
                    // if (outputFiles.length > 0 && this.lsHost.getCompilationSettings().out) {
                    //    break;
                    // }
                } catch (err) {/* ignore */}


            });

            errors = this.getAllDiagnostics();
            console.info("Errors found: " + errors.length);
            return {
                outputFiles: outputFiles,
                errors: errors
            };
        }

        /**
         * Use the TSConfig file to set the compiler options
         */ 
        setConfigFile(path:string,content) {
            var result = ts.readConfigFile(path,(path) => {return content});
            var options = result.config.compilerOptions;
            
            this.lsHost.setCompilationSettings(options);
            
            this.formatOptions = this.getDefaultFormatOptions();
            let editorOptions = options.formatCodeOptions || {};
            for (var i in editorOptions) {
                this.formatOptions[i] = editorOptions[i];
            }
        }

  
       private isExecutable(kind:string) {
            if (kind === "method" || kind === "function" || kind === "constructor") return true;
            return false;
        }


        /**
         * Convert the data for outline usage.
         */
        private getOutlineModelData(fileName:string, data: ts.NavigationBarItem[]) {
            if ((!data) || (!data.length)) {
                return [];
            }

            var result:OutlineModelEntry[] = [];
            var script = this.lsHost.getScript(fileName);

            data.forEach((item) => {
               
                var extension = this.isExecutable(item.kind) ? "()" : "";
    
                var entry:OutlineModelEntry = {
                    label: item.text + extension,
                    pos: script.positionToLineCol(item.spans[0].start),
                    kind: item.kind,
                    kids: null
                };
                entry.kids = this.getOutlineModelData(fileName, item.childItems)
                result.push(entry);

            });
            
            return result;
        }


 

        public getFormattedTextForRange(fileName: string, range?:Cats.Range): string {
            var start:number, end:number;
            var script = this.lsHost.getScript(fileName);
            
            var content = script.getContent();
            
            if (range == null) {
                start = 0;
                end = content.length;
            } else {
                start = script.getPositionFromCursor(range.start);
                end = script.getPositionFromCursor(range.end);
            }
            
            var edits = this.ls.getFormattingEditsForRange(fileName, start, end, this.formatOptions);
            var result = applyEdits(content, edits);
            return result;
        }

        /**
         * Add a new script to the compiler environment
         */
        public addScript(fileName: string, content: string) {
            if (this.lsHost.getScript(fileName)) {
                this.updateScript(fileName, content);
            } else {
                var script = this.lsHost.addScript(fileName, content, this.ls);
            }
        }


        // updated the content of a script
        public updateScript(fileName: string, content: string) {
            var script = this.lsHost.getScript(fileName);
            if (script) script.updateContent(content);
        }


        /**
         * Get the info at a certain position. Used for the tooltip in the editor
         * 
         */ 
        public getInfoAtPosition(fileName: string, coord: Cats.Position):TypeInfo {
            var script = this.lsHost.getScript(fileName);
            return script.getInfoAtPosition(coord);
        }


        public getNavigateToItems(search: string) {
            var results = this.ls.getNavigateToItems(search);
            return results.map(this.convertNavigateTo);
        }


        public getScriptOutline(fileName: string) {
            var result =  this.ls.getNavigationBarItems(fileName);
            return this.getOutlineModelData(fileName, result);
        }


        public getRenameInfo(fileName:string, cursor: Position) {
            var script = this.lsHost.getScript(fileName);
            return script.getRenameInfo(cursor);
        }


        public findRenameLocations(fileName: string, position: Position, findInStrings: boolean, findInComments: boolean) {
            var script = this.lsHost.getScript(fileName);
            var pos = script.getPositionFromCursor(position);
            var result: Cats.FileRange[] = [];
            var entries = this.ls.findRenameLocations(fileName,pos,findInStrings,findInComments);
            for (var i = 0; i < entries.length; i++) {
                var ref = entries[i];
                var refScript = this.lsHost.getScript(ref.fileName);
                result.push({
                    fileName: ref.fileName,
                    range: refScript.getRangeFromSpan(ref.textSpan),
                    message: refScript.getLine(ref.textSpan)
                });
            }
            return result;
        }


        /**
         * Generic method to get references, implementations or occurences of a certain
         * element at a position in a source file.
         * 
         *    getReferencesAtPosition
         *    getOccurrencesAtPosition
         *    getImplementorsAtPosition
         */ 
        public getCrossReference(method: string, fileName: string, cursor: Position): Cats.FileRange[] {
            var script = this.lsHost.getScript(fileName);
            
            var pos = script.getPositionFromCursor(cursor);
            var result: Cats.FileRange[] = [];
            var entries: ts.ReferenceEntry[];
            
            switch (method) {
                case "getReferencesAtPosition":
                        entries = this.ls.getReferencesAtPosition(fileName, pos);
                        break;
                 case "getOccurrencesAtPosition":
                        entries = this.ls.getOccurrencesAtPosition(fileName, pos);
                        break;
            } 
            if (! entries) return result;
            
            for (var i = 0; i < entries.length; i++) {
                var ref = entries[i];
                var refScript = this.lsHost.getScript(ref.fileName);
                result.push({
                    fileName: ref.fileName,
                    range: refScript.getRangeFromSpan(ref.textSpan),
                    message: refScript.getLine(ref.textSpan)
                });
            }
            return result;
        }

        /**
         * Determine the possible completions available at a certain position in a file.
         */
        public getCompletions(fileName: string, cursor: Position): ts.CompletionEntry[] {
            var script = this.lsHost.getScript(fileName);
            if (!script) return [];
            var completions = script.getCompletions(cursor) ;
            completions.sort(caseInsensitiveSort); // Sort case insensitive
            return completions;
        }
    }


    /**
     * Indicate to the main UI thread if this worker is busy or not
     * 
     * @param value true is busy, false othewise
     */
    function setBusy(value: boolean, methodName:string) {
        respond({ method: "setBusy", params: [value,methodName] });
    }

    /*******************************************************************
      Create and initiate the message listener for incomming messages
     *******************************************************************/

    var tsh: ISense;

    addEventListener('message', function(e) {
        if (!tsh) tsh = new ISense();

        var msg: Cats.JSONRPCRequest = e["data"];
        var methodName = msg.method;
        var params = msg.params;
        setBusy(true, methodName);
        
        try {
            var fn:Function = tsh[methodName];
            var result = fn.apply(tsh,params);
            respond({ id: msg.id, result: result });
        } catch (err) {
            var error = {
                description: err.description,
                stack: err.stack,
                method: methodName
            };
            console.error("Error during processing message " + methodName);
            respond({ id: msg.id, error: error });
        } finally {
            setBusy(false, methodName);
        }
    }, false);




}
