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
     * Thsi class assists the SourceEditor for TypeScript files. It takes care of
     * diagnostics and outline updates.
     */ 
    export class TSHelper {
        
        private errors: Cats.FileRange[] = [];
        outline: NavigateToItem[];
     
        private diagnosticTimer : number;
        private updateSourceTimer : number;
        private pendingUpdates = false;
        
       
        constructor(private editor:SourceEditor, private editSession: ace.EditSession) {
            this.init();
        } 
        
        
        private init() {
            this.getWidget().addListener("appear", () => {
                this.updateDiagnostics(0);
            });
            
            this.editSession.on("change", (ev) => {
                this.updateContent();
            });
        }
        
        
        setErrors(errors: Cats.FileRange[] = []) {
            if ((this.errors.length === 0) && (errors.length === 0)) return;
            this.errors = errors;
            this.editor.showAnnotations(this.errors);
        }

        

        private getWidget() {
            return this.editor.getLayoutItem();
        }

       

        updateContent(timeout=500) {
            clearTimeout(this.updateSourceTimer);
            this.pendingUpdates = true;
            this.updateSourceTimer = setTimeout(() => {
                if (this.pendingUpdates) {
                    this.editor.project.iSense.updateScript(this.editor.filePath, this.editor.getContent());
                    this.pendingUpdates = false;
                     this.updateDiagnostics();
                }
            }, timeout);
        }

        /**
         * Lets check the worker if something changed in the diagnostic.
         * 
         */
        updateDiagnostics(timeout=1000) {
            clearTimeout(this.diagnosticTimer);
            var project = this.editor.project;
            this.diagnosticTimer = setTimeout(() => {
            
                    project.iSense.getErrors(this.editor.filePath, (err: Error, result: Cats.FileRange[]) => {
                        if (project.config.codingStandards.useLint) {
                            result = result.concat(project.linter.lint(this.editor.filePath, this.editor.getContent()));
                        }
                        this.setErrors(result);
                    });
                
            }, timeout);    
        }


      

    }


}