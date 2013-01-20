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

    export class Session {

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

        // Is the worker out of sync with the source code
        private pendingWorkerUpdate = false;
        public mode: string;

        // Has the code been changed without saving yet
        private _changed = false;
        get changed(): bool { return this._changed; }
        set changed(value: bool) {
            if (this._changed !== value) {
                this._changed = value;
                tabbar.refresh();
            }
        }

        constructor(public project: Project, public name: string, content: string) {
            console.log("Creating new session for file " + name + " with content length " + content.length);
            var ext = PATH.extname(name);

            this.mode = this.determineMode(ext);
            this.editSession = new EditSession(content,"ace/mode/" + this.mode);

          

            this.editSession.on("change", this.onChangeHandler.bind(this));
            this.editSession.setUndoManager(new UndoManager());
        }

        persist() {
            this.project.writeSession(this);
            this.changed = false;
        }

        getValue(): string {
            return this.editSession.getValue();
        }

        setValue(value: string) {
            this.editSession.setValue(value);
        }


        static convertMember(member): string {
            var result = member.prefix;
            if (member.entries) {
                for (var i = 0; i < member.entries.length; i++) {
                    result += this.convertMember(member.entries[i]);
                }
            } else {
                result += member.text;
            }
            result += member.suffix;
            return result;
        }

        getPositionFromScreenOffset(x: number, y: number): Ace.Position {
            var r = Cats.mainEditor.aceEditor.renderer;
            // var offset = (x + r.scrollLeft - r.$padding) / r.characterWidth;
            var offset = (x - r.$padding) / r.characterWidth;

            // Quickfix for strange issue        
            var correction = r.scrollTop ? 7 : 0;

            var row = Math.floor((y + r.scrollTop - correction) / r.lineHeight);
            var col = Math.round(offset);
            var docPos = this.editSession.screenToDocumentPosition(row, col);
            return docPos;
        }

        // Screen location
        showInfoAt(ev: MouseEvent) {
            if (this.mode !== "typescript") return;

            var docPos = this.getPositionFromScreenOffset(ev.offsetX, ev.offsetY);
            var project = this.project;

            this.project.iSense.perform("getTypeAtPosition", this.name, docPos,
                (err, data: Services.TypeInfo) => {
                    if (!data) return;
                    var member = data.memberName;
                    if (!member) return;

                    var tip = Session.convertMember(member);
                    // Bug in TS, need to prefix with cats.
                    Cats.mainEditor.toolTip.show(ev.x, ev.y, tip);
                });
        }

        // Determine the edit mode based on the file extension
        private determineMode(ext: string): string {
            var result = Session.MODES[ext] || Session.DEFAULT_MODE;
            return result;
        }

        // Perform code autocompletion for JS
        autoCompleteJS(cursor: Ace.Position, view: Cats.UI.AutoCompleteView) {
            var editSession = this.editSession;

            // Any pending changes that are not yet send to the worker?
            if (this.pendingWorkerUpdate) {
                var source = editSession.getValue();
                this.project.JSSense.perform("updateScript", this.name, source, (err, result) => {
                    // editSession.setAnnotations(result);
                });
                this.pendingWorkerUpdate = false;
            };

            this.project.JSSense.perform("autoComplete", cursor, this.name, (err, completes) => {
                if (completes != null) view.showCompletions(completes.entries);
            });
        }

        showErrors() {
            if (this.mode === "typescript") {
                var self = this; // BUG in TS
                this.project.iSense.perform("getErrors", this.name, (err, result) => {
                        self.editSession.setAnnotations(result);
                });
            }
        }

        /**
         * Make sure the session updated any pending chnages to the worker.
         * 
         */
        update() {
           if (this.mode === "typescript") {
                var source = this.editSession.getValue();                
                this.project.iSense.perform("updateScript", this.name, source, null);
                this.pendingWorkerUpdate = false;
            }; 
        }

        // Perform code autocompletion
        autoComplete(cursor: Ace.Position, view: Cats.UI.AutoCompleteView) {
            if (this.mode === "javascript") {
                this.autoCompleteJS(cursor, view);
                return;
            }
            
            if (this.mode !== "typescript") return;
            var editSession = this.editSession;

            // Any pending changes that are not yet send to the worker?
            this.update();

            this.project.iSense.perform("autoComplete", cursor, this.name, (err, completes) => {
                if (completes != null) view.showCompletions(completes.entries);
            });
        }

        private onChangeHandler(event) {
            this.changed = true;
            this.pendingWorkerUpdate = true;

            if (this.mode !== "typescript") return;
                        
            clearTimeout(this.updateSourceTimer);

            this.updateSourceTimer = setTimeout(() => {
                if (this.pendingWorkerUpdate) {
                    this.update();
                    this.showErrors();
                }
            }, 1000);
        };
    }

}