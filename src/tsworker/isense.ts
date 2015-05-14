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

module Cats.TSWorker {

    function respond(message:any) {
        postMessage(message,null);
    }

    /**
     * Simple function to stub console.log functionality since this is 
     * not available in a worker.
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


    export function spanEnd(span:ts.TextSpan) {
        return span.start + span.length;
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
                TabSize: 4,
                NewLineCharacter: "\n",
                ConvertTabsToSpaces: true,
                InsertSpaceAfterCommaDelimiter: true,
                InsertSpaceAfterSemicolonInForStatements: true,
                InsertSpaceBeforeAndAfterBinaryOperators: true,
                InsertSpaceAfterKeywordsInControlFlowStatements: true,
                InsertSpaceAfterFunctionKeywordForAnonymousFunctions: true,
                InsertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesis: false,
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



        getDefinitionAtPosition(fileName: string, pos: Position): Cats.FileRange {
            var script = this.lsHost.getScript(fileName);
            var chars = script.getPositionFromCursor(pos);
            var infos = this.ls.getDefinitionAtPosition(fileName, chars);
            if (infos) {
                var info = infos[0];
                var infoScript = this.lsHost.getScript(info.fileName);
                // TODO handle better
                return {
                    fileName: info.fileName,
                    range: infoScript.getRangeFromSpan(info.textSpan)
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
        private convertErrors(errors: ts.Diagnostic[], severity= Severity.Error): Cats.FileRange[] {

            if (!(errors && errors.length)) return [];
        
            return errors.map((error) => {
                var script = this.lsHost.getScript(error.file.fileName);
                
                var message =  ts.flattenDiagnosticMessageText(error.messageText, "\n");
       
                return {
                    range: script.getRange(error.start, error.length),
                    severity: severity,
                    message: message + "",
                    fileName: error.file.fileName
                };
            });
            
        }

        /**
         * Get the errors for either one script or for 
         * all the scripts
         * 
         * @param fileName name of the script. If none provided the errors
         * for all scripts will be returned.
         */
        getErrors(fileName: string): FileRange[] {
            var errors: Cats.FileRange[] = [];
            var fileErrors = this.ls.getSyntacticDiagnostics(fileName);

            var newErrors = this.convertErrors(fileErrors, Severity.Error);
            errors = errors.concat(newErrors);

            fileErrors = this.ls.getSemanticDiagnostics(fileName);
            newErrors = this.convertErrors(fileErrors, Severity.Warning);

            errors = errors.concat(newErrors);

            return errors;
        }

        /**
         * Get the diagnostic messages for all the files that 
         * are registered in this worker
         */
        getAllDiagnostics() {
            
            var errors: FileRange[] = [];

            this.lsHost.getScriptFileNames().forEach((fileName) => {
                errors = errors.concat(this.getErrors(fileName));
            });

            var compilerSettingsErrors = this.ls.getCompilerOptionsDiagnostics();
            var newErrors = this.convertErrors(compilerSettingsErrors, Severity.Error);

            errors = errors.concat(newErrors);

            return errors;
        }

        private convertTodoNavigate(fileName:string, todos:ts.TodoComment[]):FileRange[] {
            var script = this.lsHost.getScript(fileName);
            return todos.map((todo) => {
                var entry:FileRange = {
                    range: script.getRange(todo.position, todo.descriptor.text.length),
                    fileName: fileName,
                    message: todo.message
                };
                return entry;
            });
        }

        /**
         * Get the various annotations in the comments, like TODO items.
         */ 
        getTodoItems() {
            var descriptors = [
                {text: "@TODO",  priority: 1},
                {text: "@BUG",  priority: 1},
                {text: "@FIXME",  priority: 1},
                {text: "TODO",  priority: 1},
            ];
            
            var result:FileRange[] = [];
            this.lsHost.getScriptFileNames().forEach((fileName)=> {
                var comments = this.ls.getTodoComments(fileName, descriptors);
                var entries = this.convertTodoNavigate(fileName, comments);
                result = result.concat(entries);
            });
            return result;
        }


        /**
         * Compile the loaded TS files and return the 
         * compiles JS sources and errors (if any).
         */
        compile(): Cats.CompileResults {
            var scripts = this.lsHost.getScriptFileNames();

            var result: { fileName: string; content: string; }[] = [];
            var errors: FileRange[] = [];

            for (var x=0;x<scripts.length;x++) {
                try {
                    var fileName = scripts[x];
                    var emitOutput = this.ls.getEmitOutput(fileName);

                    emitOutput.outputFiles.forEach((file) => {
                        result.push({
                            fileName: file.name,
                            content: file.text
                        });
                    });

                    // No need to request other files if there is only one output file
                    if (result.length > 0 && this.lsHost.getCompilationSettings().out) {
                        break;
                    }
                } catch (err) {/*ignore */}


            };

            errors = this.getAllDiagnostics();
            console.info("Errors found: " + errors.length);
            return {
                source: result,
                errors: errors
            };
        }


        /**
         * Configure the compilation and format settings. 
         * Tthis method uses a simple mixin to overwrite only the values
         * that are set, leave the other ones at the default value.
         */
        setSettings(compilerOptions:ts.CompilerOptions, editorOptions:ts.FormatCodeOptions) {
            this.lsHost.setCompilationSettings(compilerOptions);

            
            this.formatOptions = this.getDefaultFormatOptions();
            // Do a quick mixin
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


        /** 
         * Normalize an array of edits by removing overlapping entries and 
         * sorting entries on the minChar position. 
         * 
         * Copied from TypeScript shim 
         */
        private normalizeEdits(edits: ts.TextChange[]): ts.TextChange[] {
            var result: ts.TextChange[] = [];

            function mapEdits(edits: ts.TextChange[]): { edit: ts.TextChange; index: number; }[] {
                var result: { edit: ts.TextChange; index: number; }[] = [];
                for (var i = 0; i < edits.length; i++) {
                    result.push({ edit: edits[i], index: i });
                }
                return result;
            }

            var temp = mapEdits(edits).sort(function(a, b) {
                var result = a.edit.span.start - b.edit.span.start;
                if (result === 0)
                    result = a.index - b.index;
                return result;
            });

            var current = 0;
            var next = 1;
            while (current < temp.length) {
                var currentEdit = temp[current].edit;

                // Last edit
                if (next >= temp.length) {
                    result.push(currentEdit);
                    current++;
                    continue;
                }
                var nextEdit = temp[next].edit;
                var gap = nextEdit.span.start - spanEnd(currentEdit.span);

                // non-overlapping edits
                if (gap >= 0) {
                    result.push(currentEdit);
                    current = next;
                    next++;
                    continue;
                }

                // overlapping edits: for now, we only support ignoring an next edit 
                // entirely contained in the current edit.
                if (spanEnd(currentEdit.span) >= spanEnd(nextEdit.span)) {
                    next++;
                    continue;
                }
                else {
                    throw new Error("Trying to apply overlapping edits");
                }
            }

            return result;
        }


        /**
         * Apply an array of text edits to a string, and return the resulting string.
         * 
         * Copied from TypeScript shim
         */
        private applyEdits(content: string, edits: ts.TextChange[]): string {
            var result = content;
            edits = this.normalizeEdits(edits);

            for (var i = edits.length - 1; i >= 0; i--) {
                var edit = edits[i];
                var prefix = result.substring(0, edit.span.start);
                var middle = edit.newText;
                var suffix = result.substring(edit.span.start + edit.span.length);
                result = prefix + middle + suffix;
            }
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
            var result = this.applyEdits(content, edits);
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
            this.lsHost.updateScript(fileName, content);
        }


        /**
         * Get the info at a certain position. Used for the tooltip in the editor
         * 
         */ 
        public getInfoAtPosition(fileName: string, coord: Cats.Position):TypeInfo {
            var script = this.lsHost.getScript(fileName);
            var pos = script.getPositionFromCursor(coord);
            if (!pos) return;
            var info = this.ls.getQuickInfoAtPosition(fileName, pos);
            if (! info) return {};
            
            var result = {
                description : ts.displayPartsToString(info.displayParts),
                docComment : ts.displayPartsToString(info.documentation)
            };
            return result;
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
            var pos = script.getPositionFromCursor(cursor);
            var result = this.ls.getRenameInfo(fileName, pos);
            return result;
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
                case "getImplementorsAtPosition":
                        entries = []; // @TODO this.ls.getImplementorsAtPosition(fileName, pos);
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
            var pos = script.getPositionFromCursor(cursor);
            var memberMode = false;
            var type = script.determineMemeberMode(pos);

            // Lets find out what autocompletion there is possible		
            var completions = this.ls.getCompletionsAtPosition(fileName, type.pos) || <ts.CompletionInfo>{};
            if (!completions.entries) return []; // @Bug in TS
            completions.entries.sort(caseInsensitiveSort); // Sort case insensitive
            return completions.entries;
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
