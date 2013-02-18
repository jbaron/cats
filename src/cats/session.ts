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


///<reference path='project.ts'/>
///<reference path='../typings/typescript.d.ts'/>

module Cats {

    var EditSession: Ace.EditSession = ace.require("ace/edit_session").EditSession;
    var UndoManager: Ace.UndoManager = ace.require("ace/undomanager").UndoManager;

    export class Session extends ObservableImpl {

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
            ".json": "json"
        };

        private static DEFAULT_MODE = "text";

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
        constructor(public name?: string, content?: string) {
            super("changed");
            console.log("Creating new session for file " + name + " with content length " + content.length);
            this.mode = this.determineMode(name);
            this.editSession = new EditSession(content, "ace/mode/" + this.mode);
            this.editSession.setNewLineMode("unix");

            this.editSession.on("change", this.onChangeHandler.bind(this));
            this.editSession.setUndoManager(new UndoManager());
            this.on("changed", () => { IDE.tabbar.refresh() });
        }


        get project():Project {
            return IDE.project;
        }

        get shortName():string {
            if (! this.name) return "untitled";
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
        persist() {
            if (this.name === "untitled") {
                this.name = prompt("Please enter the file name") || "untitled";
            }

            if (this.name !== "untitled") {
                OS.File.writeTextFile(this.name, this.getValue());
                this.changed = false;
            }
            
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
         * Get the Position based on mouse x,y coordinates
         */
        private getPositionFromScreenOffset(x: number, y: number): Ace.Position {
            var r = IDE.mainEditor.aceEditor.renderer;
            // var offset = (x + r.scrollLeft - r.$padding) / r.characterWidth;
            var offset = (x - r.$padding) / r.characterWidth;

            // @BUG: Quickfix for strange issue with top
            var correction = r.scrollTop ? 7 : 0;

            var row = Math.floor((y + r.scrollTop - correction) / r.lineHeight);
            var col = Math.round(offset);
            var docPos = this.editSession.screenToDocumentPosition(row, col);
            return docPos;
        }

        /**
         * Show info at Screen location
         */
        showInfoAt(ev: MouseEvent) {
            if (this.mode !== "typescript") return;

            var docPos = this.getPositionFromScreenOffset(ev.offsetX, ev.offsetY);
            var project = this.project;

            this.project.iSense.perform("getTypeAtPosition", this.name, docPos,
                (err, data: TypeInfo) => {
                    if (!data) return;
                    var member = data.memberName;
                    if (!member) return;

                    var tip = data.description;
                    if (data.docComment) {
                        tip += "<hr>" + data.docComment;
                    }

                    // Bug in TS, need to prefix with cats.
                    IDE.mainEditor.toolTip.show(ev.x, ev.y, tip);
                });
        }

        /**
         * Determine the edit mode based on the file name
         * @param name File name
         */
        private determineMode(name: string): string {
            var ext = PATH.extname(name);
            var result = Session.MODES[ext] || Session.DEFAULT_MODE;
            return result;
        }

        // Perform code autocompletion for JS
        autoCompleteJS(cursor: Ace.Position, view: Cats.UI.AutoCompleteView) {
            var editSession = this.editSession;

            // Any pending changes that are not yet send to the worker?
            if (this.pendingWorkerUpdate) {
                var source = editSession.getValue();
                this.project.JSSense.perform("updateScript", this.name, source, null);
                this.pendingWorkerUpdate = false;
            };

            this.project.JSSense.perform("autoComplete", cursor, this.name, (err, completes) => {
                if (completes != null) view.showCompletions(completes.entries);
            });
        }

        /**
         * Check if there are any errors for this session and show them.    
         */
        showErrors() {
            if (this.mode === "typescript") {
                this.project.iSense.perform("getErrors", this.name, (err, result: FileRange[]) => {
                    var annotations: Ace.Annotation[] = [];
                    if (result) {
                        result.forEach((error: FileRange) => {
                            annotations.push({
                                row: error.range.start.row,
                                column: error.range.start.column,
                                type: "error",
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
         * Perform code autocompletion. Right now support for JS and TS.
         */
        autoComplete(cursor: Ace.Position, view: Cats.UI.AutoCompleteView) {
            if (this.mode === "javascript") {
                this.autoCompleteJS(cursor, view);
                return;
            }

            if (this.mode !== "typescript") return;

            // Any pending changes that are not yet send to the worker?
            if (this.pendingWorkerUpdate) this.update();

            this.project.iSense.perform("autoComplete", cursor, this.name, (err, completes:Services.CompletionInfo) => {
                if (completes != null) view.showCompletions(completes.entries);
            });
        }

        
        /**
         * Keep track of changes made to the content and update the 
         * worker if required.
         */
        private onChangeHandler(event) {
            document
            this.changed = true;
            this.pendingWorkerUpdate = true;

            if (this.mode !== "typescript") return;

            clearTimeout(this.updateSourceTimer);

            // Don't send too many updates to the worker
            this.updateSourceTimer = setTimeout(() => {
                if (this.pendingWorkerUpdate) this.update();
                this.showErrors();
            }, 1000);
        };
    }

}