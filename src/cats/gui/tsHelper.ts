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


module Cats.Gui {

    /**
     * This class assists the SourceEditor for TypeScript files. It takes care of
     * diagnostics and outline updates.
     */ 
    export class TSHelper {
        
        outline: NavigateToItem[];
     
        private diagnosticTimer : number;
        private outlineTimer : number;
        private updateSourceTimer : number;
        private pendingUpdates = false;
        
       
        constructor(private editor:Editor.SourceEditor, private editSession: Editor.EditSession) {
            this.init();
        } 
        
        
        private init() {
            
            
            this.updateDiagnostics(0);
            this.updateOutline(0);
             
            
            this.editor.getLayoutItem().addListener("appear", () =>{
                this.updateDiagnostics(0);
            })
            
            this.editSession.on("change", () => {
                this.updateContent();
            });
        }
        
        
        private updateContent(timeout=500) {
            if (! this.editor.isTypeScript()) return;
            clearTimeout(this.updateSourceTimer);
            this.pendingUpdates = true;
            this.updateSourceTimer = setTimeout(() => {
                if (this.pendingUpdates) {
                    this.editor.project.iSense.updateScript(this.editor.filePath, this.editSession.getValue());
                    this.pendingUpdates = false;
                    this.updateDiagnostics();
                    this.updateOutline();
                }
            }, timeout);
        }

         /**
         * Lets check the worker if something changed in the outline of the source.
         * But lets not call this too often.
         * 
         */
        private updateOutline(timeout= 5000) {
            if (! this.editor.isTypeScript()) return;
                var project = this.editor.project;
                clearTimeout(this.outlineTimer);
                this.outlineTimer = setTimeout(() => {
                    project.iSense.getScriptOutline(this.editor.filePath, (err: Error, data: NavigateToItem[]) => {
                        this.editor.set("outline",data);
                    });
                    
                    
                }, timeout);
        }

        /**
         * Lets check the worker if something changed in the diagnostic.
         * 
         */
        private updateDiagnostics(timeout=1000) {
            if (! this.editor.isTypeScript()) return;
            var project = this.editor.project;
            this.diagnosticTimer = setTimeout(() => {
            
                    project.iSense.getErrors(this.editor.filePath, (err: Error, result: Cats.FileRange[]) => {
                        if (project.config.tslint.useLint) {
                            result = result.concat(project.linter.lint(this.editor.filePath, this.editor.getContent()));
                        }
                        this.editSession.showAnnotations(result);
                    });
                
            }, timeout);    
        }

    }


}