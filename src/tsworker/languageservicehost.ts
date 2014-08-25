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


// This is based on the harness.ts file from TypeScript
// Major difference is that this module uses real language services API and not the Shim.
// Licensed under the Apache License, Version 2.0. 


module Cats.TSWorker {

export class ScriptInfo {
        public version: number = 1;
        public editRanges: { length: number; textChangeRange: TypeScript.TextChangeRange; }[] = [];
        private lineMap: TypeScript.LineMap = null;

        constructor(public fileName: string, public content: string) {
            this.setContent(content);
        }

        private setContent(content: string): void {
            this.content = content;
            this.lineMap = null;
        }

        public getLineMap() {
            if (! this.lineMap) this.lineMap = TypeScript.LineMap1.fromString(this.content);
            return this.lineMap;
        }


        public updateContent(content: string): void {
            this.editRanges = [];
            this.setContent(content);
            this.version++;
        }

        public editContent(minChar: number, limChar: number, newText: string): void {
            // Apply edits
            var prefix = this.content.substring(0, minChar);
            var middle = newText;
            var suffix = this.content.substring(limChar);
            this.setContent(prefix + middle + suffix);

            // Store edit range + new length of script
            this.editRanges.push({
                length: this.content.length,
                textChangeRange: new TypeScript.TextChangeRange(
                    TypeScript.TextSpan.fromBounds(minChar, limChar), newText.length)
            });

            // Update version #
            this.version++;
        }

        public getTextChangeRangeSinceVersion(version: number): TypeScript.TextChangeRange {
            if (this.version === version) {
                // No edits!
                return TypeScript.TextChangeRange.unchanged;
            }

            var initialEditRangeIndex = this.editRanges.length - (this.version - version);

            var entries = this.editRanges.slice(initialEditRangeIndex);
            return TypeScript.TextChangeRange.collapseChangesAcrossMultipleVersions(entries.map(e => e.textChangeRange));
        }
    }

   
    export class LanguageServiceHost implements TypeScript.Services.ILanguageServiceHost {

        private compilationSettings:TypeScript.CompilationSettings = null;

        public scripts:Map<ScriptInfo> = {};
        public maxScriptVersions = 100;
        
        public getScriptFileNames():string[] {
            return Object.keys(this.scripts);
        }

        getScriptIsOpen(fileName: string) {
            return true;
        }

        getScriptByteOrderMark(fileName: string):TypeScript.ByteOrderMark {
            return null;
        }
        
        getLocalizedDiagnosticMessages() {
            // console.log("Called getLocalizedDiagnosticMessages");
        }
        
        //////////////////////////////////////////////////////////////////////
        // IReferenceResolverHost implementation
        
        fileExists(path: string): boolean {
            console.log("Called fileExist" + path);
            return true;
        }
        
        directoryExists(path: string): boolean {
            console.log("Called directoryExist" + path);
            return true;
        }
        
        getParentDirectory(path: string): string {
            console.log("Called getParentDirectory" + path);
            return "";
        }
        
        
        resolveRelativePath(path: string, directory: string) : string{
            console.log("Called resolveRelativePath p1:" + path + " p2:" + directory);
            return path;
        }
        
        public getScriptSnapshot(fileName: string): TypeScript.IScriptSnapshot {
             var script = this.scripts[fileName];
             var result =  TypeScript.ScriptSnapshot.fromString(script.content);
             
             // Quick hack
             result.getTextChangeRangeSinceVersion =  (version) => {
                    return <TypeScript.TextChangeRange>null;
                    // return new TypeScript.TextChangeRange(new TypeScript.TextSpan(0, script.content.length),script.content.length);
             };
             
             return result;
        }


        //////////////////////////////////////////////////////////////////////
        // local implementation
        
        public addScript(fileName: string, content: string) {
            var script = new ScriptInfo(fileName, content);
            this.scripts[fileName] = script;
        }

        public updateScript(fileName: string, content: string) {
            var script =  this.scripts[fileName];
            if (script) {
                script.updateContent(content);
            } else {
               this.addScript(fileName, content);    
            }
        }

        public editScript(fileName: string, minChar: number, limChar: number, newText: string) {
             var script =  this.scripts[fileName];
            if (script) {
                script.editContent(minChar, limChar, newText);
            } else {
                throw new Error("No script with name '" + name + "'");
            }
        }

        //////////////////////////////////////////////////////////////////////
        // ILogger implementation
        
        public information(): boolean { return false; }
        public debug(): boolean { return false; }
        public warning(): boolean { return false; }
        public error(): boolean { return false; }
        public fatal(): boolean { return false; }

        public log(s: string): void {}
        
        
        public getDiagnosticsObject() {
            return {
                log : function (content: string) {}
            };
        }

        //////////////////////////////////////////////////////////////////////
        // ILanguageServiceHost implementation
        //

        public getCompilationSettings(): TypeScript.CompilationSettings {
            return this.compilationSettings; 
        }

        public setCompilationSettings(value: TypeScript.CompilationSettings) {
            this.compilationSettings = value;
        }

        
        public getScriptVersion(fileName: string): number {
            // return null;
            var script = this.scripts[fileName];            
            return script.version;
        }

       

    }


}
