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

    /**
     * Simple function to stub console.log functionality since this is 
     * not available in a worker.
     */
    export var console = {
        log: function(str: string) { postMessage({ method: "console", params: ["log",str] }, null); },
        error: function(str: string) { postMessage({ method: "console", params: ["error",str] }, null); },
        info: function(str: string) { postMessage({ method: "console", params: ["info",str] }, null); }
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

        /**
         * Create a new TypeScript ISense instance.
         * 
         */
        constructor() {
            this.lsHost = new LanguageServiceHost();
            this.ls = ts.createLanguageService(this.lsHost, ts.createDocumentRegistry());
            this.formatOptions = this.getDefaultFormatOptions();
        }

        private getDefaultFormatOptions() {
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
                InsertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesis: true,
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
                    range: infoScript.getRange(info.textSpan.start(), info.textSpan.end())
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
            this.lsHost.getScriptFileNames().forEach((script) => {
                if (script.indexOf("lib.d.ts") > 0) return;
                // @TODO fix
                // var doc:TypeScript.Document = this.ls["compiler"].getDocument(script);
                // mc.parse(doc);
            });
            return mc.getModel();
        }

  
        /**
         * Convert Services to Cats NavigateToItems
         */
        private convertNavigateTo(item: ts.NavigateToItem): NavigateToItem {
            var script = this.lsHost.getScript(item.fileName);
            var result = {
                range : script.getRange(item.textSpan.start(), item.textSpan.end()),
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
                var script = this.lsHost.getScript(error.file.filename);  
                return {
                    range: script.getRange(error.start, error.start + error.length),
                    severity: severity,
                    message: error.messageText,
                    fileName: error.file.filename
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
         * are regsitered in this worker
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
                    range: script.getRange(todo.position, todo.position + todo.descriptor.text.length),
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
            var descriptor = {
                text: "@TODO",
                priority: 1
            };
            
            var result:FileRange[] = [];
            this.lsHost.getScriptFileNames().forEach((fileName)=> {
                var comments = this.ls.getTodoComments(fileName, [descriptor]);
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
                    if (this.lsHost.getCompilationSettings().out) {
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
         * Configure the compilation settings. Use a mixin to overwrite only the values
         * that are set, leave the other ones the default value.
         */
        setSettings(compilerOptions, editorOptions): ts.CompilationSettings {
            var compOptions = ts.getDefaultCompilerOptions();
 

            // Do a quick mixin
            for (var i in compilerOptions) {
                compOptions[i] = compilerOptions[i];
            }
            this.lsHost.setCompilationSettings(compOptions);

            
            this.formatOptions = this.getDefaultFormatOptions();
            // Do a quick mixin
            for (var i in editorOptions) {
                this.formatOptions[i] = editorOptions[i];
            }
            
            return compOptions;
        }


       private isExecutable(kind) {
            if (kind === "method" || kind === "function" || kind === "constructor") return true;
            return false;
        }


    

        /**
         * Convert the data for outline usage.
         */
        private getOutlineModelData(fileName, data: ts.NavigationBarItem[]) {
            if ((!data) || (!data.length)) {
                return [];
            }

            var result = [];

            data.forEach((item) => {
               
                var extension = this.isExecutable(item.kind) ? "()" : "";
                var script = this.lsHost.getScript(fileName);

                var entry = {
                    label: item.text + extension,
                    pos: script.positionToLineCol(item.spans[0].start()),
                    kind: item.kind,
                    kids: []
                };

                if (item.childItems && (item.childItems.length > 0)) {
                    entry.kids = this.getOutlineModelData(fileName, item.childItems)
                }
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
                var result = a.edit.span.start() - b.edit.span.start();
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
                var gap = nextEdit.span.start() - currentEdit.span.end();

                // non-overlapping edits
                if (gap >= 0) {
                    result.push(currentEdit);
                    current = next;
                    next++;
                    continue;
                }

                // overlapping edits: for now, we only support ignoring an next edit 
                // entirely contained in the current edit.
                if (currentEdit.span.end() >= nextEdit.span.end()) {
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
                var prefix = result.substring(0, edit.span.start());
                var middle = edit.newText;
                var suffix = result.substring(edit.span.end());
                result = prefix + middle + suffix;
            }
            return result;
        }

        public getFormattedTextForRange(fileName: string, range?:Cats.Range): string {
            var start, end;
            var script = this.lsHost.getScript(fileName);
            
            var content = script.content;
            
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
                this.lsHost.addScript(fileName, content);
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


        // Determine type of autocompletion
        private determineAutoCompleteType(fileName: string, pos: number) {
            var source = this.lsHost.getScript(fileName).content;
            var identifyerMatch = /[0-9A-Za-z_\$]*$/;
            var previousCode = source.substring(0, pos);

            var match = previousCode.match(identifyerMatch);
            var newPos = pos;
            var memberMode = false;
            if (match && match[0]) newPos = pos - match[0].length;
            if (source[newPos - 1] === '.') memberMode = true;

            var result = {
                pos: newPos,
                memberMode: memberMode
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
                    range: refScript.getRange(ref.textSpan.start(), ref.textSpan.end()),
                    message: refScript.getLine(ref.textSpan.start(), ref.textSpan.end())
                });
            }
            return result;
        }


        /**
         * Generic method to get referecnes, implementations or occurences of a certain
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
            var entries: ts.ReferenceEntry[] = this.ls[method](fileName, pos);
            for (var i = 0; i < entries.length; i++) {
                var ref = entries[i];
                var refScript = this.lsHost.getScript(ref.fileName);
                result.push({
                    fileName: ref.fileName,
                    range: refScript.getRange(ref.textSpan.start(), ref.textSpan.end()),
                    message: refScript.getLine(ref.textSpan.start(), ref.textSpan.end())
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
            var type = this.determineAutoCompleteType(fileName, pos);

            // Lets find out what autocompletion there is possible		
            var completions = this.ls.getCompletionsAtPosition(fileName, type.pos, type.memberMode) || <ts.CompletionInfo>{};
            if (!completions.entries) completions.entries = []; // @Bug in TS
            completions.entries.sort(caseInsensitiveSort); // Sort case insensitive
            return completions.entries;
        }
    }


    /**
     * Indicate to the main UI thread if this worker is busy or not
     * 
     * @param value true is busy, false othewise
     */
    function setBusy(value: boolean) {
        postMessage({ method: "setBusy", params: [value] }, null);
    }

    /*******************************************************************
      Create and initiate the message listener for incomming messages
     *******************************************************************/

    var tsh: ISense;

    addEventListener('message', function(e) {
        if (!tsh) tsh = new ISense();
        // var startTime = Date.now();
        setBusy(true);
        var msg: Cats.JSONRPCRequest = e["data"];

        try {
            var result = tsh[msg.method].apply(tsh, msg.params);
            postMessage({ id: msg.id, result: result }, null);
        } catch (err) {
            var error = {
                description: err.description,
                stack: err.stack
            };
            console.error("Error during processing message " + msg.method);
            postMessage({ id: msg.id, error: error }, null);
        } finally {
            setBusy(false);
            // console.log("Method " + msg.method + " took " + (Date.now() - startTime) + "ms");
        }
    }, false);




}
