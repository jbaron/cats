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

importScripts("../static/js/typescriptServices.js");

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
        ls: TypeScript.Services.ILanguageService;
        private lsHost: LanguageServiceHost;
        private formatOptions: TypeScript.Services.FormatCodeOptions;

        /**
         * Create a new TypeScript ISense instance.
         * 
         */
        constructor() {
            this.lsHost = new LanguageServiceHost();
            this.ls = new TypeScript.Services.TypeScriptServicesFactory().createPullLanguageService(this.lsHost);
            this.formatOptions = new TypeScript.Services.FormatCodeOptions();
            this.formatOptions.NewLineCharacter = "\n";
        }

        /**
         * Sometimes of the TS language services don't work first time
         * This method tries to fix that 
         */
        initialize() {
            try {
                this.ls.refresh();
                this.compile();
            } catch (err) {
                // Silently ignore
            }
        }


        private getScript(fileName: string): ScriptInfo {
            return this.lsHost.scripts[fileName];
        }

        /**
         * Convert a TS offset position to a Cats Position
         */
        private positionToLineCol(script: ScriptInfo, position: number): Position {
            var result = script.getLineMap().getLineAndCharacterFromPosition(position);
            return {
                row: result.line(),
                column: result.character()
            };
        }


        getDefinitionAtPosition(fileName: string, pos: Position): Cats.FileRange {
            var chars = this.getPositionFromCursor(fileName, pos);
            var infos = this.ls.getDefinitionAtPosition(fileName, chars);
            if (infos) {
                var info = infos[0]; // TODO handle better
                return {
                    fileName: info.fileName,
                    range: this.getRange(info.fileName, info.minChar, info.limChar)
                };
            } else {
                return null;
            }
        }

        public getObjectModel() {
            //Force all symbols to be created.
            this.getAllDiagnostics();
            
            var mc = new ModelCreator();
            this.lsHost.getScriptFileNames().forEach((script) => {
                if (script.indexOf("lib.d.ts") > 0) return;
                var doc:TypeScript.Document = this.ls["compiler"].getDocument(script);
                mc.parse(doc);
            });
            return mc.getModel();
        }

  
        /**
         * Convert Services to Cats NavigateToItems
         * @todo properly do this conversion
         */
        private convertNavigateTo(items: TypeScript.Services.NavigateToItem[]): NavigateToItem[] {
            var results = <NavigateToItem[]>items;
            for (var i = 0; i < results.length; i++) {
                var result = results[i];
                result.range = this.getRange(result.fileName, result.minChar, result.limChar);
            }
            return results;
        }

        /**
         * Convert Services to Cats NavigateToItems
         * @todo properly do this conversion
         */
        private convertNavigateTo2(fileName: string, items: TypeScript.TextSpan[]): Range[] {
            var result = new Array<Range>();
            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                var entry = this.getRange(fileName, item.start(), item.end());
                result.push(entry);
            }
            return result;
        }


        /**
         * Convert the errors from a TypeScript format into Cats format 
         */
        private convertErrors(errors: TypeScript.Diagnostic[], severity= Severity.Error): Cats.FileRange[] {

            if (!(errors && errors.length)) return [];

            var result: Cats.FileRange[] = [];
            errors.forEach((error) => {

                var r = this.getRange(error.fileName(), error.start(), error.start() + error.length());
                result.push({
                    range: r,
                    severity: severity,
                    message: error.message(),
                    fileName: error.fileName()
                });
            });
            return result;
        }

        /**
         * Get the errors for either one script or for 
         * all the scripts
         * @param fileName name of the script. If none provided the errors
         * for all scripts will be returned.
         */
        getErrors(fileName: string): Cats.FileRange[] {
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
            var scripts = this.lsHost.scripts;
            var errors: FileRange[] = [];

            for (var fileName in scripts) {
                errors = errors.concat(this.getErrors(fileName));
            }

            var compilerSettingsErrors = this.ls.getCompilerOptionsDiagnostics();
            var newErrors = this.convertErrors(compilerSettingsErrors, Severity.Error);

            errors = errors.concat(newErrors);

            return errors;
        }

        /**
         * Compile the loaded TS files and return the 
         * compiles JS sources and errors (if any).
         */
        compile(): Cats.CompileResults {
            var scripts = this.lsHost.scripts;

            var result: { fileName: string; content: string; }[] = [];
            var errors: FileRange[] = [];

            for (var fileName in scripts) {
                try {
                    var emitOutput = this.ls.getEmitOutput(fileName);

                    emitOutput.outputFiles.forEach((file: TypeScript.OutputFile) => {
                        result.push({
                            fileName: file.name,
                            content: file.text
                        });
                    });

                    // No need to request other files if there is only one output file
                    if (this.lsHost.getCompilationSettings().outFileOption) {
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
        setSettings(compilerOptions, editorOptions): TypeScript.CompilationSettings {
            var compOptions = new TypeScript.CompilationSettings();

            // Do a quick mixin
            for (var i in compilerOptions) {
                compOptions[i] = compilerOptions[i];
            }

            this.lsHost.setCompilationSettings(compOptions);

            this.formatOptions = new TypeScript.Services.FormatCodeOptions();
            this.formatOptions.NewLineCharacter = "\n";

            // @TODO
            //this.formatOptions.ConvertTabsToSpaces

            return compOptions;
        }


       private isExecutable(kind) {
            if (kind === "method" || kind === "function" || kind === "constructor") return true;
            return false;
        }


        /**
         * Convert the data for outline usage.
         */
        private getOutlineModelData(data: TypeScript.Services.NavigateToItem[]) {
            if ((!data) || (!data.length)) {
                return [];
            }

            var parents = {};
            var root = {};

            data.forEach((item) => {
                var parentName = item.containerName;
                var parent = parentName ? parents[parentName] : root;
                if (!parent) console.info("No Parent for " + parentName);
                if (!parent.children) parent.children = [];

                var extension = this.isExecutable(item.kind) ? "()" : "";
                var script = this.getScript(item.fileName);

                var entry = {
                    label: item.name + extension,
                    position: this.positionToLineCol(script, item.minChar),
                    kind: item.kind
                };

                var childName = parentName ? parentName + "." + item.name : item.name;
                parents[childName] = entry;
                parent.children.push(entry);
            });
            
            return root;
        }

        /**
         * Get the content of a script
         * @param name Script name
         */
        getScriptContent(fileName: string): string {
            var script = this.lsHost.scripts[fileName];
            if (script) return script.content;
        }


        /** 
         * Normalize an array of edits by removing overlapping entries and 
         * sorting entries on the minChar position. 
         * 
         * Copied from TypeScript shim 
         */
        private normalizeEdits(edits: TypeScript.Services.TextEdit[]): TypeScript.Services.TextEdit[] {
            var result: TypeScript.Services.TextEdit[] = [];

            function mapEdits(edits: TypeScript.Services.TextEdit[]): { edit: TypeScript.Services.TextEdit; index: number; }[] {
                var result: { edit: TypeScript.Services.TextEdit; index: number; }[] = [];
                for (var i = 0; i < edits.length; i++) {
                    result.push({ edit: edits[i], index: i });
                }
                return result;
            }

            var temp = mapEdits(edits).sort(function(a, b) {
                var result = a.edit.minChar - b.edit.minChar;
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
                var gap = nextEdit.minChar - currentEdit.limChar;

                // non-overlapping edits
                if (gap >= 0) {
                    result.push(currentEdit);
                    current = next;
                    next++;
                    continue;
                }

                // overlapping edits: for now, we only support ignoring an next edit 
                // entirely contained in the current edit.
                if (currentEdit.limChar >= nextEdit.limChar) {
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
        private applyEdits(content: string, edits: TypeScript.Services.TextEdit[]): string {
            var result = content;
            edits = this.normalizeEdits(edits);

            for (var i = edits.length - 1; i >= 0; i--) {
                var edit = edits[i];
                var prefix = result.substring(0, edit.minChar);
                var middle = edit.text;
                var suffix = result.substring(edit.limChar);
                result = prefix + middle + suffix;
            }
            return result;
        }


        public getFormattedTextForRange(fileName: string, range?:Cats.Range): string {
            var start, end;
            var content = this.getScriptContent(fileName);
            if (range == null) {
                start = 0;
                end = content.length;
            } else {
                start = this.getPositionFromCursor(fileName, range.start);
                end = this.getPositionFromCursor(fileName, range.end);
            }
            
            var edits = this.ls.getFormattingEditsForRange(fileName, start, end, this.formatOptions);
            var result = this.applyEdits(content, edits);
            return result;
        }

        /**
         * Add a new script to the compiler environment
         */
        public addScript(fileName: string, content: string) {
            if (this.lsHost.scripts[fileName]) {
                this.updateScript(fileName, content);
            } else {
                this.lsHost.addScript(fileName, content);
            }
        }


        // updated the content of a script
        public updateScript(fileName: string, content: string) {
            this.lsHost.updateScript(fileName, content);
        }

        // Get an Ace Range from TS minChars and limChars
        private getRange(fileName: string, minChar: number, limChar: number): Cats.Range {
            var script = this.getScript(fileName);
            var result = {
                start: this.positionToLineCol(script, minChar),
                end: this.positionToLineCol(script, limChar)
            };
            return result;
        }

        // Get the chars offset based on the Ace position
        private getPositionFromCursor(fileName: string, cursor: Position): number {
            var script = this.getScript(fileName);
            if (script) {
                var pos = script.getLineMap().getPosition(cursor.row, cursor.column);
                return pos;
            }
        }

        // Get the position
        public getTypeAtPosition(fileName: string, coord: Cats.Position): TypeInfo {
            var pos = this.getPositionFromCursor(fileName, coord);
            if (!pos) return;
            var result = <TypeInfo>this.ls.getTypeAtPosition(fileName, pos);
            if (result) result.description = TypeScript.MemberName.memberNameToString(result.memberName);
            return result;
        }


        // Determine type of autocompletion
        private determineAutoCompleteType(fileName: string, pos: number) {
            var source = this.getScriptContent(fileName);
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

        /**
         * Retieve the line of code that contains a certain range. Used to provide the 
         * user with contexts of what is found
         */
        private getLine(fileName: string, minChar: number, limChar: number) {
            var content = this.getScriptContent(fileName);
            var min = content.substring(0, minChar).lastIndexOf("\n");
            var max = content.substring(limChar).indexOf("\n");
            return content.substring(min + 1, limChar + max);
        }

        public getNavigateToItems(search: string): NavigateToItem[] {
            var results = this.ls.getNavigateToItems(search);
            return this.convertNavigateTo(results);
        }

        public getScriptLexicalStructure(fileName: string) {
            var results = this.ls.getScriptLexicalStructure(fileName);
            var finalResults = results.filter((entry) => { return entry.fileName === fileName; });
            return this.getOutlineModelData(finalResults);
        }

        public getOutliningRegions(fileName: string): Range[] {
            var results = this.ls.getOutliningRegions(fileName);
            return this.convertNavigateTo2(fileName, results);
        }

        // generic wrapper for info at a certain position 
        public getInfoAtPosition(method: string, fileName: string, cursor: Position): Cats.FileRange[] {
            var pos = this.getPositionFromCursor(fileName, cursor);
            var result: Cats.FileRange[] = [];
            var entries: TypeScript.Services.ReferenceEntry[] = this.ls[method](fileName, pos);
            for (var i = 0; i < entries.length; i++) {
                var ref = entries[i];
                result.push({
                    fileName: ref.fileName,
                    range: this.getRange(ref.fileName, ref.minChar, ref.limChar),
                    message: this.getLine(ref.fileName, ref.minChar, ref.limChar)
                });
            }
            return result;
        }

        /**
         * Determine the possible completions available at a certain position in a file.
         */
        public getCompletions(fileName: string, cursor: Position): TypeScript.Services.CompletionEntry[] {
            if (! this.getScript(fileName)) return [];
            var pos = this.getPositionFromCursor(fileName, cursor);
            var memberMode = false;
            var type = this.determineAutoCompleteType(fileName, pos);

            // Lets find out what autocompletion there is possible		
            var completions = this.ls.getCompletionsAtPosition(fileName, type.pos, type.memberMode) || <TypeScript.Services.CompletionInfo>{};
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
