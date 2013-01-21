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


// Licensed under the Apache License, Version 2.0. 
///<reference path='harness.ts'/>
///<reference path='../typings/ace.d.ts'/>
///<reference path='../typings/cats.d.ts'/>

importScripts("../static/js/typescript.js")

module Cats.TSWorker {

    var outputFiles = {};

    var console = {
        log: function(str) {
            postMessage(str, null);
        }
    }

    // Case insensitive sorting
    function caseInsensitiveSort(a: { name: string; }, b: { name: string; }) {
        if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
        if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
        return 0;
    }

    class ISense {

        private maxErrors = 10;
        ls: Services.ILanguageService;
        private lsHost: LanguageServiceHost;

        // Create a new TypeScript instance with projectDir as project home
        constructor() {
            this.init();            
        }

        init() {
            this.lsHost = new LanguageServiceHost();
            this.ls = new Services.TypeScriptServicesFactory().createLanguageService(this.lsHost);
            this.ls.refresh();
        }


         //
        // line and column are 1-based
        //
        private lineColToPosition(fileName: string, line: number, col: number): number {
            var script = this.ls.getScriptAST(fileName);
            return TypeScript.getPositionFromLineColumn(script, line, col);
        }

        //
        // line and column are 1-based
        //
        private positionToLineCol(fileName: string, position: number): TypeScript.ILineCol {
            var script = this.ls.getScriptAST(fileName);
            var result = TypeScript.getLineColumnFromPosition(script, position);

            return result;
        }

    

        // Get the name of a script based on its index
        private getUnitName(index: number): string {
            return this.lsHost.scripts[index].name;
        }

        // Convert a TS offset to Ace position
        getCursor(name: string, chars: number): Ace.Position {
            var tsCursor = this.positionToLineCol(name, chars);
            var result = {
                row: tsCursor.line - 1,
                column: tsCursor.col - 1
            };
            return result;
        }

        getDefinitionAtPosition(fileName: string, pos: Ace.Position):Cats.FileRange {
            var chars = this.getPositionFromCursor(fileName, pos);
            var info = this.ls.getDefinitionAtPosition(fileName, chars);        
            if (info) {
                var unitName = this.getUnitName(info.unitIndex);
                return {
                    unitName: unitName,
                    range: this.getRange(unitName,info.minChar,info.limChar)                    
                };
            } else {
                return null;
            }
        }


        private convertErrors(errors: TypeScript.ErrorEntry[]) :Cats.FileRange[]{
            var result:Cats.FileRange[] = []
            errors.forEach((error) => {
                var scriptName = this.getUnitName(error.unitIndex);
                var r = this.getRange(scriptName, error.minChar, error.limChar);
                result.push({
                    range:r,
                    message:error.message,
                    unitName: scriptName
                });             
            });
            return result;
        }


        compile(options): Cats.CompileResults {
            var scripts = this.lsHost.scripts;
            var result = {}
            scripts.forEach((script) => {
                var files = this.ls.getEmitOutput(script.name);
                files.forEach((file) => {
                    result[file.name] = file.text;
                });
            })

            var errors = this.ls.getErrors(this.maxErrors);
            
            return {
                source: result,
                errors: this.convertErrors(errors)
            };
        }

        setCompilationSettings(options:any) {
            var compOptions = new TypeScript.CompilationSettings();

            // Do a quick mixin
            for (var i in options) {
                compOptions[i] = options[i];
            }

            this.lsHost.setCompilationSettings(compOptions);
        }


     
        // Get the filenames of the scripts
        getScriptIds(): string[] {
            var count = this.lsHost.getScriptCount();
            var result = [];
            for (var i = 0; i < count; i++) {
                result.push(this.lsHost.getScriptId(i));
            }
            return result;
        }


        getScriptContent(id: string): string {
            var scripts = this.lsHost.scripts;
            var i = scripts.length;
            while (i--) {
                if (scripts[i].name === id) return scripts[i].content;
            }
        }

        getIndex(id: string): number {
            var scripts = this.lsHost.scripts;
            var i = scripts.length;
            while (i--) {
                if (scripts[i].name === id) return i;
            }
            throw new Error("Script not found with name " + id);
        }


        private splice(str, start, max, replacement) {
            return str.substring(0, start) + replacement + str.substring(max);
        }

        getFormattedTextForRange(fileName: string, start: number, end: number) {
            var options = new Services.FormatCodeOptions();
            options.NewLineCharacter = "\n";
            var edits = this.ls.getFormattingEditsForRange(fileName, start, end, options);
            var result = this.getScriptContent(fileName);
            var offset = 0;
            for (var i = 0; i < edits.length; i++) {
                var edit = edits[i];
                result = this.splice(result, edit.minChar + offset, edit.limChar + offset, edit.text);
                offset += edit.text.length - (edit.limChar - edit.minChar);
            }
            return result;
        }


        // Quick hack to get access to the language services
        languageService(operation: string, params) {
            var result = this.ls[operation].call(this.ls, params);
            return result;
        }

        // Add a new script
        addScript(name: string, source: string, resident?: bool) {
            this.lsHost.addScript(name, source, resident);
        }


        // Get the know errors in a script
        getErrors(fileName: string) : Cats.FileRange[]{
            var result = [];
            var errors;
            if (fileName)
                errors = this.ls.getScriptErrors(fileName, this.maxErrors);
            else
                errors = this.ls.getErrors(this.maxErrors);

            return this.convertErrors(errors);
        };
        
          

        // updated the content of a script
        updateScript(fileName: string, src: string) {
            this.lsHost.updateScript(fileName, src, false);
        }

        // Get an Ace Range from TS minChars and limChars
        private getRange(script: string, minChar: number, limChar: number):Cats.Range {
            var startLC = this.positionToLineCol(script, minChar);
            var endLC = this.positionToLineCol(script, limChar);
            var result = {
                start : {
                    row: startLC.line - 1,
                    column: startLC.col - 1
                },
                end : {
                    row: endLC.line - 1,
                    column: endLC.col - 1
                }
            };
            return result;
        }
       
        // Get the chars offset based on the Ace position
        private getPositionFromCursor(fileName: string, cursor: Ace.Position): number {
            var script = this.ls.getScriptAST(fileName);
            var lineMap = script.locationInfo.lineMap;

            // Determine the position
            var pos = lineMap[cursor.row + 1] + cursor.column;
            // console.log(pos);
            return pos;
        }


        // Get the position
        public getTypeAtPosition(fileName: string, coord): Services.TypeInfo {
            var pos = this.getPositionFromCursor(fileName, coord);
            return this.ls.getTypeAtPosition(fileName, pos);
        }


        // Determine type of autocompletion
        private determineAutoCompleteType(source: string, pos: number) {
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
            }

            // console.log("Autocompletion determine: " + JSON.stringify(result));
            return result;
        }

        /**
         * Retieve the line that contains a certain range
         */
        private getLine(scriptName: string, minChar: number, limChar: number) {
            var content = this.getScriptContent(scriptName);
            var min = content.substring(0, minChar).lastIndexOf("\n");
            var max = content.substring(limChar).indexOf("\n");
            return content.substring(min + 1, limChar + max);
        }


        public getOutliningRegions(fileName: string) {
            var results: Services.NavigateToItem[] = this.ls.getOutliningRegions(fileName);
            for (var i = 0; i < results.length; i++) {
                var result = results[i];
                var fileName = this.getUnitName(result.unitIndex);
                result["range"] = this.getRange(fileName, result.minChar, result.limChar);
                result["unitName"] = fileName;
            }
            return results;
        }


        // generic wrapper for info at a certain position 
        public getInfoAtPosition(method: string, filename: string, cursor: Ace.Position): Cats.FileRange[] {
            var pos = this.getPositionFromCursor(filename, cursor);
            var result:Cats.FileRange[] = [];
            var entries: Services.ReferenceEntry[] = this.ls[method](filename, pos);
            for (var i = 0; i < entries.length; i++) {
                var ref = entries[i];
                var name = this.lsHost.scripts[ref.unitIndex].name;
                result.push({
                    unitName: name,
                    range: this.getRange(name, ref.ast.minChar, ref.ast.limChar),
                    message: this.getLine(name, ref.ast.minChar, ref.ast.limChar)
                });
            }
            return result;
        }

        public autoComplete(cursor: Ace.Position, filename: string): any {
            var pos = this.getPositionFromCursor(filename, cursor);
            var memberMode = false;
            var source = this.getScriptContent(filename);
            var type = this.determineAutoCompleteType(source, pos);
            /*
            if (type === "member") {
                memberMode = true;
            }
            */
            // Lets find out what autocompletion there is possible		
            var completions = this.ls.getCompletionsAtPosition(filename, type.pos, type.memberMode);

            completions.entries.sort(caseInsensitiveSort); // Sort case insensitive
            return completions;
        }
    }

    var tsh = new ISense();

    addEventListener('message', function(e) {
        var msg = e["data"];

        var method = msg.method;
        var id = msg.id;
        var params = msg.params;
        try {
            var result;
            var obj;
            if (tsh[method])
                obj = tsh
            else
                tsh.ls;
            result = obj[method].apply(obj, params);
            postMessage({ id: id, result: result }, null);
        } catch (err) {
            var error = {
                description: err.description,
                stack: err.stack
            }
            postMessage({ id: id, error: error }, null);
        }
    }, false);


}