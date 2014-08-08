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

module Cats {
    
    
    export class Session extends qx.event.Emitter {

        private static MODES = {
            ".js": "javascript",
            ".ts": "typescript",
            ".xhtml": "html",
            ".xhtm": "html",
            ".html": "html",
            ".htm": "html",
            ".css": "css",
            ".less": "less",
            ".md": "markdown",
            ".svg": "svg",
            ".yaml": "yaml",
            ".yml": "yaml",
            ".xml": "xml",
            ".json": "json",
            ".png" : "binary",
            ".gif" : "binary",
            ".jpg" : "binary",
            ".jpeg" : "binary"
        };

        private static DEFAULT_MODE = "text";
        public mode:string;
        private changed = false;
        private errors: Cats.FileRange[] = [];
        private outline:NavigateToItem[];
        private outlineTimer:number;
        
        /**
         * Create a new session
         * 
         * @param project The project the session belongs to
         * @param name The name of the session
         * @param content The content of the session
         */
        constructor(public name?: string, public content?: string) {
            super();
            this.mode = Session.determineMode(name);
        }

      
        get project():Project {
            return IDE.project;
        }

        isTypeScript(): boolean {
            return this.mode === "typescript";
        }
        
        isActive() : boolean {
            return (IDE.sessionTabView.getActiveSession() === this); 
        }

        get shortName():string {
            if (! this.name) return "Untitled";
            return PATH.basename(this.name);
        }


        setContent(content) {
            var page = <SessionPage>IDE.sessionTabView.getPageBySession(this);
            return page.editor.setContent(content);
        }
        
     
     
        getChanged() {
            return this.changed;
        }
        
        setChanged(value:boolean) {
            this.changed = value;
            this.emit("setChanged", this.changed);
        }
        
        getContent() {
            var page = <SessionPage>IDE.sessionTabView.getPageBySession(this);
            return page.editor.getContent();
        }

        /**
         * Persist the edit session
         */
        persist(shouldConfirm=false) {
            // Select proper folder separator according to platform used 
            
            
            var dirSlash = process.platform == "win32" ? "\\" : "/";
            
            if (this.name == null ) {
                this.name = prompt("Please enter the file name", IDE.project.projectDir + dirSlash);
                if (! this.name) return;
            }

 
            OS.File.writeTextFile(this.name, this.getContent());
            this.setChanged(false);
            
            if (this.mode === "typescript") this.project.validate();
            
            if (IDE.project.config.buildOnSave && (this.mode === "typescript") ) 
                    Commands.runCommand(Commands.CMDS.project_build);
                    
        }

        setErrors(errors:Cats.FileRange[]) {
            if ((this.errors.length === 0) && (errors.length === 0)) return;
            this.errors = errors;
            this.emit("errors", this.errors);
        }
        
        setOutline(outline:NavigateToItem[]) {
            this.outline = outline;
            if (this.isActive()) IDE.outlineNavigator.setData(this,this.outline);
            this.emit("outline", this.outline);
        }

        updateContent(content) {
            this.content = content;
            IDE.project.iSense.updateScript(this.name, content);
            this.getDiagnostics();
        }


        getDiagnostics() {
            if (this.isTypeScript()) {
               IDE.project.iSense.getErrors(this.name, (err, result: Cats.FileRange[]) => {
                   this.setErrors(result);
               });
            }
        }
        
        getOutline(timeout=5000) {
            if (this.isTypeScript()) {
                // Clear any pending updates
                clearTimeout(this.outlineTimer);
                this.outlineTimer = setTimeout(() => {
                    IDE.project.iSense.getScriptLexicalStructure(this.name, (err, data: NavigateToItem[]) => {
                        this.setOutline(data);
                    });
                }, timeout);
            } else {
                this.setOutline([]);
            }
        }    

        sync() {
            this.getDiagnostics();
            this.getOutline(10);
        }

        /**
         * Determine the edit mode based on the file name
         * @param name File name
         */
        public static determineMode(name: string): string {
            var ext = PATH.extname(name);
            var result = Session.MODES[ext] || Session.DEFAULT_MODE;
            return result;
        }

 
}
}