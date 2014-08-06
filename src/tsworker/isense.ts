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
        log: function(str:string) { postMessage({method: "console",  data: str}, null); },
        error: function(str:string) { postMessage({method: "console" , data: str}, null); },
        info: function(str:string) { postMessage({method: "console" , data: str}, null); }
    }

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
        private projectDir:string;

        /**
         * Create a new TypeScript ISense instance.
         * 
         */ 
        constructor() {
            this.lsHost = new LanguageServiceHost();
            // this.ls = new TypeScript.Services.TypeScriptServicesFactory().createLanguageService(this.lsHost);
            this.ls = new TypeScript.Services.TypeScriptServicesFactory().createPullLanguageService(this.lsHost);
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


        private getScript(fileName:string) : ScriptInfo {
            return this.lsHost.scripts[fileName];
        }
     
        /**
         * Convert a TS offset position to a Cats Position
         */
        private positionToLineCol(fileName: string, position: number): Position {
            var script = this.getScript(fileName);
            var result = script.getLineMap().getLineAndCharacterFromPosition(position);
            return {
                row: result.line(),
                column: result.character() 
            };
        }

 
        getDefinitionAtPosition(fileName: string, pos: Cats.Position):Cats.FileRange {
            var chars = this.getPositionFromCursor(fileName, pos);
            var infos = this.ls.getDefinitionAtPosition(fileName, chars);        
            if (infos) {                
                var info = infos[0]; // TODO handle better
                return {
                    fileName: info.fileName,
                    range: this.getRange(info.fileName,info.minChar,info.limChar)                    
                };
            } else {
                return null;
            }
        }


        /**
         * Convert Services to Cats NavigateToItems
         * @todo properly do this conversion
         */ 
        private convertNavigateTo(items:TypeScript.Services.NavigateToItem[]):NavigateToItem[] {
            var results= <NavigateToItem[]>items;
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
        private convertNavigateTo2(fileName:string,items:TypeScript.TextSpan[]):Range[] {
            var result= new Array<Range>();
            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                var entry  = this.getRange(fileName, item.start(), item.end());
                result.push(entry);
            }
            return result;
        }
        

        /**
         * Convert the errors from a TypeScript format into Cats format 
         */ 
        private convertErrors(errors: TypeScript.Diagnostic[], severity=Severity.Error) :Cats.FileRange[]{
            
            if (!(errors && errors.length)) return [];
            
            var result:Cats.FileRange[] = [];
            errors.forEach((error) => {
    
                var r = this.getRange(error.fileName(), error.start(), error.start() + error.length());
                result.push({
                    range:r,
                    severity: severity,
                    message:error.message(),
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
        getErrors(fileName: string) :Cats.FileRange[]{
            var errors:Cats.FileRange[] = [];
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
            var errors:FileRange[] = [];

            for (var fileName in scripts) {
                errors = errors.concat(this.getErrors(fileName));
            }
            return errors;
        }

        /**
         * Compile the loaded TS files and return the 
         * compiles JS sources and errors (if any).
         */ 
        compile(): Cats.CompileResults {
            var scripts = this.lsHost.scripts;
                                    
            var result:{ fileName: string; content: string; }[] = [];
            var errors:FileRange[] = [];

            for (var fileName in scripts) {
                try {
                    var emitOutput = this.ls.getEmitOutput(fileName);
                    // errors = errors.concat(this.getErrors(fileName));
                    
                    emitOutput.outputFiles.forEach((file:TypeScript.OutputFile)=>{
                         result.push({
                            fileName : file.name,
                            content: file.text
                        });
                    });
                    if (this.lsHost.getCompilationSettings().outFileOption) {
                        break;
                    }
                } catch(err) {/*ignore */}
               
                               
            };
            
            errors  = this.getAllDiagnostics();
            console.error("Errors found: " + errors.length);
            return {
                source: result,
                errors: errors
            };
        }


        /**
         * Configure the compiler settings
         */ 
        setCompilationSettings(options:{}) {
            var compOptions = new TypeScript.CompilationSettings();

            // Do a quick mixin
            for (var i in options) {
                compOptions[i] = options[i];
            }

            this.lsHost.setCompilationSettings(compOptions);
        }


        public getDependencyGraph() {
            var result:any = [];
            var scripts = this.lsHost.scripts;
            for (var fileName in scripts) {
                var script = scripts[fileName];
                var entry = {
                    src: script.fileName,
                    ref: <Array<string>>[]
                };
                
                var i = TypeScript.ScriptSnapshot.fromString(script.content);
                var refs = TypeScript.getReferencedFiles(script.fileName,i);
                
                
                // ast.buildControlFlow();
                // var ast = this.ls.getScriptSyntaxAST(script.name).getScript();
                refs.forEach((file) => {
                    entry.ref.push(file.path);
                });
                result.push(entry);
            };
            return result;
        }

        /**
         * Get the content of a script
         * @param name Script name
         */ 
        getScriptContent(fileName: string): string {
            var script = this.lsHost.scripts[fileName];
            if (script) return script.content;
        }
     
        private splice(str:string, start:number, max:number, replacement:string) {
            return str.substring(0, start) + replacement + str.substring(max);
        }

        getFormattedTextForRange(fileName: string, start: number, end: number):string {
            var options = new TypeScript.Services.FormatCodeOptions();
            var result = this.getScriptContent(fileName);
            
            options.NewLineCharacter = "\n";
            if (end === -1) end = result.length;
            
            var edits = this.ls.getFormattingEditsForRange(fileName, start, end, options);
            
            var offset = 0;
            for (var i = 0; i < edits.length; i++) {
                var edit = edits[i];
                result = this.splice(result, edit.minChar + offset, edit.limChar + offset, edit.text);
                offset += edit.text.length - (edit.limChar - edit.minChar);
            }
            return result;
        }

        /**
         * Add a new script to the compiler environment
         */ 
        addScript(fileName: string, content: string) {
            if (this.lsHost.scripts[fileName]) {
                this.updateScript(fileName,content);
            } else {
                this.lsHost.addScript(fileName, content);
            }
        }


        // updated the content of a script
        updateScript(fileName: string, content: string) {
            this.lsHost.updateScript(fileName, content);
        }

        // Get an Ace Range from TS minChars and limChars
        private getRange(fileName: string, minChar: number, limChar: number):Cats.Range {
            var result = {
                start : this.positionToLineCol(fileName, minChar),        
                end :  this.positionToLineCol(fileName, limChar)
            };
            return result;
        }
       
        // Get the chars offset based on the Ace position
        private getPositionFromCursor(fileName: string, cursor: Cats.Position): number {
            var script = this.getScript(fileName);
            if (script) {
                var pos = script.getLineMap().getPosition(cursor.row,cursor.column);
                return pos;
            }
        }

        // Get the position
        public getTypeAtPosition(fileName: string, coord:Cats.Position): TypeInfo {
            var pos = this.getPositionFromCursor(fileName, coord);
            if (!pos) return;
            var result = <TypeInfo>this.ls.getTypeAtPosition(fileName, pos);
            if (result) result.description = TypeScript.MemberName.memberNameToString(result.memberName);
            return result;
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
        private getLine(fileName: string, minChar: number, limChar: number) {
            var content = this.getScriptContent(fileName);
            var min = content.substring(0, minChar).lastIndexOf("\n");
            var max = content.substring(limChar).indexOf("\n");
            return content.substring(min + 1, limChar + max);
        }

    
        public getNavigateToItems(search: string):NavigateToItem[] {
            var results = this.ls.getNavigateToItems(search);
            return this.convertNavigateTo(results);
        }

        public getScriptLexicalStructure(fileName: string):NavigateToItem[] {
            var results = this.ls.getScriptLexicalStructure(fileName);
            var finalResults = results.filter((entry)=>{return entry.fileName === fileName});
            return this.convertNavigateTo(finalResults);
        }

        public getOutliningRegions(fileName: string):Range[] {
            var results = this.ls.getOutliningRegions(fileName);
            return this.convertNavigateTo2(fileName,results);
        }

        // generic wrapper for info at a certain position 
        public getInfoAtPosition(method: string, fileName: string, cursor: Cats.Position): Cats.FileRange[] {
            var pos = this.getPositionFromCursor(fileName, cursor);
            var result:Cats.FileRange[] = [];
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

        public autoComplete(cursor: Cats.Position, fileName: string): TypeScript.Services.CompletionInfo {
            var pos = this.getPositionFromCursor(fileName, cursor);
            var memberMode = false;
            var source = this.getScriptContent(fileName);
            var type = this.determineAutoCompleteType(source, pos);
            /*
            if (type === "member") {
                memberMode = true;
            }
            */
            // Lets find out what autocompletion there is possible		
            var completions = this.ls.getCompletionsAtPosition(fileName, type.pos, type.memberMode) || <TypeScript.Services.CompletionInfo>{};
            if (! completions.entries) completions.entries = []; // @Bug in TS
            completions.entries.sort(caseInsensitiveSort); // Sort case insensitive
            return completions;
        }
    }

    function setBusy(value:boolean) {
        postMessage({method:"setBusy" ,data:value}, null);
    }

    /*******************************************************************
      Create and initiate the message listener for incomming messages
     *******************************************************************/ 

    var tsh:ISense;

    addEventListener('message', function(e) {
        if (! tsh) tsh = new ISense();
        
        setBusy(true);
        var msg: Cats.JSONRPCRequest = e["data"];

        var method = msg.method;
        var id = msg.id;
        var params = msg.params;
        try {
            var result:any;
            /*
            var obj:any;
            if (tsh[method])
                obj = tsh
            else
                tsh.ls;
            */
            result = tsh[method].apply(tsh, params);
            postMessage({ id: id, result: result }, null);
        } catch (err) {
            var error = {
                description: err.description,
                stack: err.stack
            }
            console.error("Error during processing message " + method);
            postMessage({ id: id, error: error }, null);
        } finally {
            setBusy(false);
        }
    }, false);




}
