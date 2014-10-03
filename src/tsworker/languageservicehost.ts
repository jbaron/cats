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

    /**
     * The language service host serves as the interface between the TypeScript language
     * services and the files editted within CATS.
     * 
     */ 
    export class LanguageServiceHost implements ts.LanguageServiceHost {

        private compilationSettings:ts.CompilerOptions = null;

        private scripts:Map<ScriptInfo> = {};


        getScript(fileName:string) {
            return this.scripts[fileName];
        }
      
        getScriptFileNames():string[] {
            return Object.keys(this.scripts);
        }

        getScriptIsOpen(fileName: string) {
            // @FIX generates not-implemented yet error in TypeScript if return true;
            return false; 
        }

        getCancellationToken(): ts.CancellationToken {
            // @TODO find out what this is used for
            return ts.CancellationTokenObject.None;
        }
        
        getLocalizedDiagnosticMessages() {
            // console.log("Called getLocalizedDiagnosticMessages");
        }
        
        getCurrentDirectory(): string {
            return "";
        }
        
        getDefaultLibFilename() : string {
            return "";
        }
        
        getScriptSnapshot(fileName: string): TypeScript.IScriptSnapshot {
             var script = this.scripts[fileName];
             var result =  TypeScript.ScriptSnapshot.fromString(script.content);
             
             /*
             // Quick hack
             result. getTextChangeRangeSinceVersion =  (version) => {
                    return <TypeScript.TextChangeRange>null;
                    // return new TypeScript.TextChangeRange(new TypeScript.TextSpan(0, script.content.length),script.content.length);
             };
             */
             
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
        // Logger implementation
       public log(s: string): void {}
        
    
        //////////////////////////////////////////////////////////////////////
        // ILanguageServiceHost implementation
        //

        public getCompilationSettings(): ts.CompilerOptions {
            return this.compilationSettings; 
        }

        public setCompilationSettings(value: ts.CompilerOptions) {
            this.compilationSettings = value;
        }

        public getScriptVersion(fileName: string): string {
            var script = this.scripts[fileName];            
            return script.version + "";
        }

    }

}
