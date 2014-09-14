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

    // var EditSession: Ace.EditSession = ace.require("ace/edit_session").EditSession;
    var UndoManager: Ace.UndoManager = ace.require("ace/undomanager").UndoManager;
    var Range: Ace.Range = ace.require("ace/range").Range;
    var modelist = ace.require('ace/ext/modelist');


    /**
     * Wrapper around the ACE editor. The rest of the code base should not use
     * ACE editor directly so it can be changed for another editor if required.
     */
    export class SourceEditor extends FileEditor {


        private mode:string;
        private aceEditor: Ace.Editor;
        private autoCompletePopup: AutoCompletePopup;
        private mouseMoveTimer: number;
        private updateSourceTimer: number;
        private pendingWorkerUpdate = false;
        private editSession: Ace.EditSession;
        private pendingPosition:Ace.Position;
        private selectedTextMarker:any;
        private widget:qx.ui.core.Widget;
        
        unsavedChanges = false;

        constructor(fileName?:string) {
            super(fileName);
            
            var widget = new qx.ui.core.Widget();
            widget.setDecorator(null);
            widget.setFont(null);
            widget.setAppearance(null);
            this.widget = widget;
            
            var content = fileName ? OS.File.readTextFile(fileName) : "";
            
            
            this.mode = modelist.getModeForPath(fileName).mode
            
            this.editSession = new (<any>ace).EditSession(content, this.mode);
            this.editSession.setNewLineMode("unix");
            this.editSession.setUndoManager(new UndoManager());
            this.editSession["__fileName__"] = this.filePath;
            this.configureAceSession();
            this.editSession.on("change", this.onChangeHandler.bind(this));
            this.editSession.on("changeAnnotation", () => {
                var a = this.editSession.getAnnotations();
                this.emit("errors", a);
            });
            


            widget.addListenerOnce("appear", () => {
                var container = widget.getContentElement().getDomElement();
                container.style.lineHeight = "normal";
                this.aceEditor = this.createAceEditor(container);
                

                this.aceEditor.setSession(this.editSession);

                if (this.mode === "binary") {
                    this.aceEditor.setReadOnly(true);
                } else {
                    this.aceEditor.setReadOnly(false);
                }

                this.createContextMenu();

                this.autoCompletePopup = new AutoCompletePopup(this.aceEditor);
                this.autoCompletePopup.show();
                this.autoCompletePopup.hide();
            
                this.aceEditor.on("changeSelection", () => {
                    this.clearSelectedTextMarker();
                    IDE.infoBus.emit("editor.position", this.aceEditor.getCursorPosition());
                });

                this.configureEditor();

                if (this.pendingPosition) this.moveToPosition(this.pendingPosition);


            }, this);

            widget.addListener("appear", () => {
                // this.session.activate();
                this.informWorld();
            });

            // session.on("errors", this.showErrors, this);
            this.widget.addListener("resize", () => { this.resizeHandler(); });

            IDE.infoBus.on("project.config", () => { this.configureAceSession(); });
            IDE.infoBus.on("ide.config", () => { this.configureEditor(); });
        }

        executeCommand(name, ...args): boolean {
            return false;
        }

        static SupportsFile(fileName:string) {
            var name = PATH.basename(fileName);
            var mode = modelist.getModeForPath(name);
            
            if (mode && mode.supportsFile(name)) return true;
            return false;
        }

        getLayoutItem() {
            return this.widget;
        }


        isTypeScript() {
            return this.mode === "ace/mode/typescript";
        }

        setContent(content, keepPosition= true) {
            var pos: Ace.Position;
            if (keepPosition) pos = this.getPosition();
            this.aceEditor.getSession().setValue(content);
            if (pos) this.moveToPosition(pos);
        }

        private configureEditor() {
            var config = IDE.config.editor;
            if (config.fontSize) this.aceEditor.setFontSize(config.fontSize + "px");
            if (config.rightMargin) this.aceEditor.setPrintMarginColumn(config.rightMargin);
            if (config.theme) this.aceEditor.setTheme("ace/theme/" + config.theme);
        }


        private configureAceSession() {
            var config = this.project.config.codingStandards;
            var session = this.editSession;
            if (config.tabSize) session.setTabSize(config.tabSize);
            if (config.useSoftTabs != null) session.setUseSoftTabs(config.useSoftTabs);
        }

        private informWorld() {
            IDE.infoBus.emit("editor.overwrite", this.editSession.getOverwrite());
            IDE.infoBus.emit("editor.mode", this.mode);
            IDE.infoBus.emit("editor.position", this.aceEditor.getCursorPosition());
        }

        replace(range: Ace.Range, content: string) {
            this.editSession.replace(range, content);
        }

        getContent() {
            return this.editSession.getValue();
        }

        /**
         * Keep track of changes made to the content and update the 
         * worker if required.
         */
        private onChangeHandler(event) {
            if (! this.unsavedChanges) {
                this.unsavedChanges = true;
                this.emit("changed", true);
            }
            
            this.pendingWorkerUpdate = true;
            if (!this.isTypeScript()) return;

            clearTimeout(this.updateSourceTimer);

            // Don't send too many updates to the session, wait for people to 
            // finsih typing.
            this.updateSourceTimer = setTimeout(() => {
                if (this.pendingWorkerUpdate) {
                    this.update();
                }
            }, 500);
        }


        private resizeHandler() {
            if (!this.widget.isSeeable()) {
                this.addListenerOnce("appear", () => { this.resizeEditor(); });
            } else {
                this.resizeEditor();
            }
        }

        private resizeEditor() {
            setTimeout(() => {
                this.aceEditor.resize();
            }, 100);
        }

        private setupEvents() {
            this.editSession.on("changeOverwrite", (a) => {
                IDE.infoBus.emit("editor.overwrite", this.editSession.getOverwrite());
            });
        }

        private clearSelectedTextMarker() {
            if (this.selectedTextMarker) {
                this.editSession.removeMarker(this.selectedTextMarker);
                this.selectedTextMarker = null;
            }
        }

        private addTempMarker(r: Cats.Range) {
            this.clearSelectedTextMarker();
            var range: Ace.Range = new Range(r.start.row, r.start.column, r.end.row, r.end.column);
            this.selectedTextMarker = this.editSession.addMarker(range,"ace_selected-word", "text");
        }

        moveToPosition(pos: Cats.Range);
        moveToPosition(pos: Ace.Position);
        moveToPosition(pos: any) {
            if (! this.aceEditor) {
                this.pendingPosition = pos;
            } else {
                this.aceEditor.clearSelection();
                
                if (pos) { 
                    if (pos.start) {
                        this.aceEditor.moveCursorToPosition(pos.start);
                    } else {
                        this.aceEditor.moveCursorToPosition(pos);
                    }    
                    
                }
                setTimeout(()=>{
                    this.aceEditor.centerSelection();
                    if (pos && pos.start) this.addTempMarker(pos);
                },100);
            }
        }

        private getPosition() {
            return this.aceEditor.getCursorPosition();
        }

        /**
          * Get the Position based on mouse x,y coordinates
          */
        getPositionFromScreenOffset(x: number, y: number): Ace.Position {
            var r = this.aceEditor.renderer;
            // var offset = (x + r.scrollLeft - r.$padding) / r.characterWidth;
            var offset = (x - r.$padding) / r.characterWidth;

            // @BUG: Quickfix for strange issue with top
            var correction = r.scrollTop ? 7 : 0;

            var row = Math.floor((y + r.scrollTop - correction) / r.lineHeight);
            var col = Math.round(offset);

            var docPos = this.aceEditor.getSession().screenToDocumentPosition(row, col);
            return docPos;
        }

     


        /**
          * Update the session with the latest version of the content of this 
          * editor.
          */
        private update() {
                var source = this.aceEditor.getSession().getValue();
                // this.session.updateContent(source);
                clearTimeout(this.updateSourceTimer);
                this.pendingWorkerUpdate = false;
        }

        /**
         * Perform code autocompletion.
         */
        showAutoComplete() {
             // Any pending changes that are not yet send to the worker?
            if (this.pendingWorkerUpdate) this.update();
            this.autoCompletePopup.complete();
        }


        private mapSeverity(level: Cats.Severity): string {
            switch (level) {
                case Cats.Severity.Error: return "error";
                case Cats.Severity.Warning: return "warning";
                case Cats.Severity.Info: return "info";
            }
        }


        /**
         * Check if there are any errors for this session and show them.    
         */
        private showErrors(result: Cats.FileRange[]) {
            var annotations: Ace.Annotation[] = [];
            result.forEach((error: Cats.FileRange) => {
                annotations.push({
                    row: error.range.start.row,
                    column: error.range.start.column,
                    type: this.mapSeverity(error.severity),
                    text: error.message
                });
            });
            this.aceEditor.getSession().setAnnotations(annotations);
        }


        // Initialize the editor
        private createAceEditor(rootElement: HTMLElement): Ace.Editor {
            var editor: Ace.Editor = ace.edit(rootElement);
            if (this.isTypeScript()) {
                editor.completers =  [new TSCompleter(this,editor), snippetCompleter];
                new TSTooltip(this);
            } else {
                editor.completers =  [keyWordCompleter, snippetCompleter];
            }
            editor.setOptions({
                enableSnippets: true
            });
            
            editor.commands.addCommands([
                
                {
                    name: "autoComplete",
                    bindKey: {
                        win: "Ctrl-Space",
                        mac: "Ctrl-Space"
                    },
                    exec: () => { this.showAutoComplete(); }
                },
                
                {
                    name: "gotoDeclaration",
                    bindKey: {
                        win: "F12",
                        mac: "F12"
                    },
                    exec: () => { this.gotoDeclaration(); }
                },


                {
                    name: "save",
                    bindKey: {
                        win: "Ctrl-S",
                        mac: "Command-S"
                    },
                    exec: () => { this.save(); }
                }
            ]);
            
           
            return editor;
        }

        private gotoDeclaration() {
            this.project.iSense.getDefinitionAtPosition(this.filePath, this.getPosition(), (err, data: Cats.FileRange) => {
                if (data && data.fileName)
                    IDE.openEditor(data.fileName, data.range.start);
            });
        }

        private getInfoAt(type: string) {

            this.project.iSense.getInfoAtPosition(type, this.filePath, this.getPosition(), (err, data: Cats.FileRange[]) => {
                if (! data) return;
                var resultTable = new ResultTable();
                var page = IDE.problemPane.addPage("info", null, resultTable);
                page.setShowCloseButton(true);
                resultTable.setData(data);
                page.select();
            });
        }


        private refactor() {
            var pos = this.getPosition();
            Refactor.rename(this.filePath,this.project, pos);
        }

        private findReferences() {
            return this.getInfoAt("getReferencesAtPosition");
        }

        private findOccurences() {
            return this.getInfoAt("getOccurrencesAtPosition");
        }


        private findImplementors() {
            return this.getInfoAt("getImplementorsAtPosition");
        }

        private createContextMenuItem(name: string, fn: Function, self?:any) {
            var button = new qx.ui.menu.Button(name);
            button.addListener("execute", fn, self);
            return button;
        }

        private bookmark() {
            var name = prompt("please provide bookmark name");
            if (name) {
                var pos = this.getPosition();
                IDE.bookmarks.addData({
                    message: name,
                    fileName: this.filePath,
                    range: {
                        start: pos,
                        end: pos
                    }
                });
            }
        }

        private createContextMenu() {
            var menu = new qx.ui.menu.Menu();
            if (this.isTypeScript()) {
                menu.add(this.createContextMenuItem("Goto Declaration", this.gotoDeclaration,this));
                menu.add(this.createContextMenuItem("Find References", this.findReferences, this));
                menu.add(this.createContextMenuItem("Find Occurences", this.findOccurences, this));
                menu.add(this.createContextMenuItem("FInd Implementations", this.findImplementors, this));
                menu.addSeparator();
                menu.add(this.createContextMenuItem("Rename", this.refactor, this));
                menu.addSeparator();
            }
            menu.add(this.createContextMenuItem("Bookmark", this.bookmark, this));
            this.widget.setContextMenu(menu);
        }

      
        /**
         * Persist this session to the file system
         */
        save() {
           
            if (this.filePath == null) {
                var dir = PATH.join(this.project.projectDir, "/");
                this.filePath = prompt("Please enter the file name", dir);
                if (! this.filePath) return;
                this.filePath = OS.File.switchToForwardSlashes(this.filePath);
            }


            OS.File.writeTextFile(this.filePath, this.getContent());
            this.unsavedChanges = false;
            this.emit("changed", false);
            this.updateProperties();

            if (this.isTypeScript()) {
                this.project.validate(false);
                if (this.project.config.buildOnSave) Commands.runCommand(Commands.CMDS.project_build);
            }
        }

    }

}