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
    
    var EditSession: Ace.EditSession = ace.require("ace/edit_session").EditSession;
    var UndoManager: Ace.UndoManager = ace.require("ace/undomanager").UndoManager;
    
    export class AceSession implements Session {

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
        
        type = "ACE";

        // The Ace EditSession object
        editSession: Ace.EditSession;

        private updateSourceTimer;
        public overwrite = false;

        // Is the worker out of sync with the source code
        private pendingWorkerUpdate = false;
        public mode: string;

        // Has the code been changed without saving yet
        changed = false;

        /**
         * Create a new session
         * 
         * @param project The project the session belongs to
         * @param name The name of the session
         * @param content The content of the session
         */
        constructor(public name: string, public content="") {
            this.mode = AceSession.determineMode(name);
            this.editSession = new EditSession(content, "ace/mode/" + this.mode);
            
            this.configEditor(this.project.config.editor);

            this.editSession.on("change", this.onChangeHandler.bind(this));
            this.editSession.setUndoManager(new UndoManager());
            this.editSession.on("changeOverwrite",(a)=>{
                // infoBus.SESSION.emit("overwrite",this.editSession.getOverwrite());
            });

            // @TODO this.on("changed", () => { IDE.tabbar.refresh() });
        }

        /**
         * Config the editor with any confiured default values 
         */ 
        private configEditor(editorConfig) {
           if (editorConfig) {
                for(var key in editorConfig) {
                    try {
                        var ukey = key[0].toUpperCase() + key.slice(1);
                        var value = editorConfig[key];
                        this.editSession['set' + ukey](value);
                    } catch(e) {
                        console.warn("can't set editor config: " + key + ":" + value);
                        console.warn(e);
                    }
                }
            } 
        }


        get project():Project {
            return IDE.project;
        }

        isTypeScript(): boolean {
            return this.mode === "typescript";
        }

        get shortName():string {
            if (! this.name) return "Untitled";
            return PATH.basename(this.name);
        }


        /**
         * Setup some required listeners
         */ 
        private setListeners() {
            var listeners = {
               "changeOverwrite" : () => {this.overwrite = this.editSession.getOverwrite()}                 
            };
            

            for (var event in listeners) {
                this.editSession.on(event,listeners[event]);
            }
                    
        }
      
        /**
         * Persist the edit session
         */
        persist(shouldConfirm=false) {
            // Select proper folder separator according to platform used 
            
            
            var dirSlash = process.platform == "win32" ? "\\" : "/";
            
            if (this.name === "Untitled") {
                this.name = prompt("Please enter the file name", IDE.project.projectDir + dirSlash) || "Untitled";
            }

            if (this.changed && shouldConfirm) {
                var c = confirm("Save " + this.name + " before closing ?");
                if (!c) return;
            }


            if (this.name !== "Untitled") {
                OS.File.writeTextFile(this.name, this.getValue());
                this.changed = false;
            }
            
            
            if (this.mode === "typescript") this.project.validate();
            
            if (IDE.project.config.buildOnSave && (this.mode === "typescript") ) 
                    Commands.runCommand(Commands.CMDS.project_build);
                    
        }

        /**
         * Get the value of this edit session
         */
        getValue(): string {
            return this.editSession.getValue();
        }

        /**
         * Set the value of this edit session.
         */
        setValue(value: string) {
            this.editSession.setValue(value);
        }

        /**
         * Determine the edit mode based on the file name
         * @param name File name
         */
        public static determineMode(name: string): string {
            var ext = PATH.extname(name);
            var result = AceSession.MODES[ext] || AceSession.DEFAULT_MODE;
            return result;
        }

        /**
         * Check if there are any errors for this session and show them.    
         */
        showErrors() {
            if (this.mode === "typescript") {
                // TODO get its own timer
                this.project.iSense.getErrors(this.name, (err, result: FileRange[]) => {
                    var annotations: Ace.Annotation[] = [];
                    if (result) {
                        result.forEach((error: FileRange) => {
                            annotations.push({
                                row: error.range.start.row,
                                column: error.range.start.column,
                                type: error.severity === Severity.Error ? "error" : "warning",
                                text: error.message
                            });
                        });
                    }
                    this.editSession.setAnnotations(annotations);
                });
            }
        }

        /**
         * Update the worker with the latest version of the content of this 
         * session.
         */
        update() {
            if (this.mode === "typescript") {
                var source = this.editSession.getValue();
                this.project.iSense.updateScript(this.name, source);
                clearTimeout(this.updateSourceTimer);
                this.pendingWorkerUpdate = false;
            };
        }

        /**
         * Perform code autocompletion. Right now support for TS.
         */
        autoComplete(cursor: Ace.Position, view: Cats.UI.AutoCompleteView) {
            
            if (this.mode !== "typescript") return;

            // Any pending changes that are not yet send to the worker?
            if (this.pendingWorkerUpdate) this.update();

            this.project.iSense.autoComplete(cursor, this.name, 
            (err, completes:TypeScript.Services.CompletionInfo) => {
                if (completes != null) view.showCompletions(completes.entries);
            });
        }

        
        /**
         * Keep track of changes made to the content and update the 
         * worker if required.
         */
        private onChangeHandler(event) {
            this.changed = true;
            this.pendingWorkerUpdate = true;

            if (this.mode !== "typescript") return;

            clearTimeout(this.updateSourceTimer);

            // Don't send too many updates to the worker
            this.updateSourceTimer = setTimeout(() => {
                if (this.pendingWorkerUpdate) this.update();
                this.showErrors();
            }, 1000);
        }
    }

}
