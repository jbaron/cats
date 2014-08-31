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
    
    var Linter;
    
    export class Session extends qx.event.Emitter  {

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
        outline:NavigateToItem[];
        properties = [];
        private outlineTimer:number;
        uml = false;
        
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
            this.updateProperties();
            this.updateOutline(10);
        }

      
        get project():Project {
            return IDE.project;
        }

        /**
         * Is this session a TypeScript session
         */ 
        isTypeScript(): boolean {
            return this.mode === "typescript";
        }
        
        isImage() : boolean {
            return this.mode === "binary";
        }
        
        /**
         * Is this session active right now in the main editor
         */ 
        isActive() : boolean {
            return (IDE.sessionTabView.getActiveSession() === this); 
        }

        /**
         * What is the short name of this session to show on buttons etc
         */ 
        get shortName():string {
            if (! this.name) return "Untitled";
            return PATH.basename(this.name);
        }

        // @TODO make this a real MVC pattern, not pushing
        setContent(content:String) {
            var page = <Gui.SessionPage>IDE.sessionTabView.getPageBySession(this);
            return page.editor.setContent(content);
        }
        
        /**
         * Has this session be changed since last save
         */ 
        getChanged() {
            return this.changed;
        }
        
        setChanged(value:boolean) {
            this.changed = value;
            this.emit("changed", this.changed);
        }
        
        // @TODO make this a real MVC pattern, not pulling
        getContent() {
            var page = <Gui.SessionPage>IDE.sessionTabView.getPageBySession(this);
            return page.editor.getContent();
        }

        /**
         * Persist this session to the file system
         */
        persist(shouldConfirm=false) {
           
            if (this.name == null ) {
                var dir = PATH.join(this.project.projectDir, "/");
                this.name = prompt("Please enter the file name", dir);
                if (! this.name) return;
                this.name = OS.File.switchToForwardSlashes(this.name);
            }

 
            OS.File.writeTextFile(this.name, this.getContent());
            this.setChanged(false);
            this.updateProperties();
            
            if (this.isTypeScript()) this.project.validate(false);
            
            if (this.project.config.buildOnSave && (this.mode === "typescript") ) 
                    Commands.runCommand(Commands.CMDS.project_build);
                    
        }

        setErrors(errors:Cats.FileRange[]) {
            if ((this.errors.length === 0) && (errors.length === 0)) return;
            this.errors = errors;
            this.emit("errors", this.errors);
        }
        
        private setOutline(outline:NavigateToItem[]) {
            this.outline = outline;
            this.emit("outline", this.outline);
        }


        private updateProperties() {
            if (this.name) {
                try {
                    this.properties = OS.File.getProperties(this.name);
                    this.emit("properties", this.properties);
                } catch(err) { /* NOP */ }
            }
        }

        updateContent(content:string) {
            this.content = content;
            this.project.iSense.updateScript(this.name, content);
            this.updateDiagnostics();
        }

        /**
         * Lets check the worker if something changed in the diagnostic.
         * 
         */ 
        private updateDiagnostics() {
            if (this.isTypeScript()) {
               this.project.iSense.getErrors(this.name, (err:Error, result: Cats.FileRange[]) => {
                   if (this.project.config.codingStandards.useLint) {
                       result = result.concat(this.lint());
                   }
                   this.setErrors(result);
               });
            }
        }
        
        
        private convertPos(item:any): Cats.Range {
            return {
                start : {
                    row: item.startPosition.line,
                    column : item.startPosition.character
                },
                end : {
                    row: item.endPosition.line,
                    column : item.endPosition.position.character
                }
            };
        }
        
        private lint() {
            if (! Linter) Linter = require("tslint"); 
            var ll = new Linter(this.name, this.content, this.project.getLintOptions());
            var result:Array<any> = JSON.parse(ll.lint().output);
            var r:Cats.FileRange[] = [];
            result.forEach((msg) => {
                var item:Cats.FileRange = {
                      fileName : msg.name,
                      message: msg.failure,
                      severity: Cats.Severity.Info,
                      range: this.convertPos(msg)
                };
                r.push(item);
            });
            return r;
        }
        
        /**
         * Lets check the worker if something changed in the outline of the source.
         * But lets not call this too often.
         */ 
        private updateOutline(timeout=5000) {
            if (this.isTypeScript()) {
                // Clear any pending updates
                clearTimeout(this.outlineTimer);
                this.outlineTimer = setTimeout(() => {
                    this.project.iSense.getScriptLexicalStructure(this.name, (err:Error, data: NavigateToItem[]) => {
                        this.setOutline(data);
                    });
                }, timeout);
            } else {
                this.setOutline([]);
            }
        }    

        /**
         * Lets make sure all the state of the session is up to date with the worker
         */ 
        activate() {
            this.updateDiagnostics();
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