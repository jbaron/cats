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

    /**
     * Wrapper around the ACE editor. The rest of the code base should not use
     * ACE editor directly so it can be changed for another editor if required.
     */
    export class SourceEditor extends qx.ui.core.Widget implements Editor /* qx.ui.embed.Html */ {


        private aceEditor: Ace.Editor;
        private autoCompletePopup: AutoCompletePopup;
        private mouseMoveTimer: number;
        private updateSourceTimer: number;
        private pendingWorkerUpdate = false;
        private editSession: Ace.EditSession;

        constructor(private session: Cats.Session) {
            super();
            this.setDecorator(null);
            this.setFont(null);
            this.setAppearance(null);
            this.editSession = new (<any>ace).EditSession(session.content, "ace/mode/" + session.mode);
            this.editSession.setNewLineMode("unix");
            this.editSession.setUndoManager(new UndoManager());
            this.editSession["__fileName__"] = session.name;
            this.configureAceSession();
            this.editSession.on("change", this.onChangeHandler.bind(this));


            this.addListenerOnce("appear", () => {
                var container = this.getContentElement().getDomElement();
                container.style.lineHeight = "normal";
                this.aceEditor = this.createAceEditor(container);
                
                if (IDE.debug) {
                    this.aceEditor.setOptions({
                        enableBasicAutocompletion: true,
                        enableSnippets: true
                    });
                }
                this.aceEditor.setSession(this.editSession);

                if (session.mode === "binary") {
                    this.aceEditor.setReadOnly(true);
                } else {
                    this.aceEditor.setReadOnly(false);
                }

                this.createContextMenu();

                if (session.isTypeScript()) {
                    this.autoCompletePopup = new AutoCompletePopup(this.aceEditor);
                    this.autoCompletePopup.show();
                    this.autoCompletePopup.hide();
                }

                this.aceEditor.on("changeSelection", () => {
                    IDE.infoBus.emit("editor.position", this.aceEditor.getCursorPosition());
                });

                this.configureEditor();

                setTimeout(() => { this.fireDataEvent("ready", this); }, 10);


            }, this);

            this.addListener("appear", () => {
                this.session.activate();
                this.updateWorld();
            });

            session.on("errors", this.showErrors, this);
            this.addListener("resize", () => { this.resizeHandler(); });

            
            IDE.infoBus.on("project.config", () => { this.configureAceSession(); });
            IDE.infoBus.on("ide.config", () => { this.configureEditor(); });
        }

        executeCommand(name, ...args): boolean {
            return false;
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
            var config = this.session.project.config.codingStandards;
            var session = this.editSession;
            if (config.tabSize) session.setTabSize(config.tabSize);
            if (config.useSoftTabs != null) session.setUseSoftTabs(config.useSoftTabs);
        }

        updateWorld() {
            IDE.infoBus.emit("editor.overwrite", this.aceEditor.getSession().getOverwrite());
            IDE.infoBus.emit("editor.mode", this.session.mode);
            IDE.infoBus.emit("editor.position", this.aceEditor.getCursorPosition());
        }

        replace(range: Ace.Range, content: string) {
            this.editSession.replace(range, content);
        }

        getContent() {
            return this.aceEditor.getSession().getValue();
        }

        /**
         * Keep track of changes made to the content and update the 
         * worker if required.
         */
        private onChangeHandler(event) {
            if (!this.session.getChanged()) this.session.setChanged(true);

            this.pendingWorkerUpdate = true;


            if (!this.session.isTypeScript()) return;

            clearTimeout(this.updateSourceTimer);

            // Don't send too many updates to the worker, wait for people to 
            // finsih typing at least 1 second.
            this.updateSourceTimer = setTimeout(() => {
                if (this.pendingWorkerUpdate) this.update();
            }, 1000);
        }

        private createToolTip() {
            var tooltip = new qx.ui.tooltip.ToolTip("");
            tooltip.exclude();
            tooltip.setRich(true);
            tooltip.setMaxWidth(500);
            this.setToolTip(tooltip);
            return tooltip;
        }

        private resizeHandler() {
            if (!this.isSeeable()) {
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
            var session = this.aceEditor.getSession();
            session.on("changeOverwrite", (a) => {
                IDE.infoBus.emit("editor.overwrite", session.getOverwrite());
            });
        }

        moveToPosition(pos: Ace.Position) {
            this.aceEditor.clearSelection();
            this.aceEditor.moveCursorToPosition(pos);
            this.aceEditor.centerSelection();
        }

        private getPosition() {
            return this.aceEditor.getCursorPosition();
        }

        /**
          * Get the Position based on mouse x,y coordinates
          */
        private getPositionFromScreenOffset(x: number, y: number): Ace.Position {
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
         * Show info at Screen location
         */
        private showToolTipAt(ev: MouseEvent) {
            // if (this.mode !== "typescript") return;

            var docPos = this.getPositionFromScreenOffset(ev.offsetX, ev.offsetY);
            var project = IDE.project;

            project.iSense.getTypeAtPosition(this.session.name, docPos,
                (err, data: Cats.TypeInfo) => {
                    if (!data) return;
                    var member = data.memberName;
                    if (!member) return;

                    var tip = data.description;
                    if (data.docComment) {
                        tip += '<hr>' + data.docComment;
                    }

                    if (tip && tip.trim()) {
                        var tooltip: qx.ui.tooltip.ToolTip = this.getToolTip();
                        if (!tooltip) tooltip = this.createToolTip();
                        tooltip.setLabel(tip);
                        tooltip.moveTo(ev.x, ev.y + 10);
                        tooltip.show();
                    }
                });
        }


        /**
          * Update the worker with the latest version of the content of this 
          * session.
          */
        private update() {
            if (this.session.isTypeScript()) {
                var source = this.aceEditor.getSession().getValue();
                this.session.updateContent(source);
                clearTimeout(this.updateSourceTimer);
                this.pendingWorkerUpdate = false;
            };
        }

        /**
         * Perform code autocompletion. Right now support for TS.
         */
        private showAutoComplete(cursor: Ace.Position) {

            if (!this.session.isTypeScript()) return;

            // Any pending changes that are not yet send to the worker?
            if (this.pendingWorkerUpdate) this.update();

            IDE.project.iSense.getCompletions(this.session.name, cursor,
                (err, completes: TypeScript.Services.CompletionInfo) => {
                    if (completes != null) this.autoCompletePopup.showCompletions(completes.entries);
                });
        }


        private autoComplete() {
            if (this.session.isTypeScript()) {
                var cursor = this.aceEditor.getCursorPosition();
                this.showAutoComplete(cursor);
            }
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


        /**
         * @TODO Put all the typescript feauture setup in here
         */
        private setupTypeScriptFeatures() {

        }

        // Initialize the editor
        private createAceEditor(rootElement: HTMLElement): Ace.Editor {
            var editor: Ace.Editor = ace.edit(rootElement);

            editor.commands.addCommands([
                {
                    name: "autoComplete",
                    bindKey: {
                        win: "Ctrl-Space",
                        mac: "Ctrl-Space"
                    },
                    exec: () => { this.autoComplete(); }
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
                    exec: () => { this.session.persist(); }
                }
            ]);


            var originalTextInput = editor.onTextInput;
            editor.onTextInput = (text: string) => {
                originalTextInput.call(editor, text);
                if (text === ".") this.autoComplete();
            };


            var elem = rootElement; // TODo find scroller child
            elem.onmousemove = this.onMouseMove.bind(this);
            elem.onmouseout = () => {
                if (this.getToolTip() && this.getToolTip().isSeeable()) this.getToolTip().exclude();
                clearTimeout(this.mouseMoveTimer);
            };

            return editor;
        }

        private gotoDeclaration() {
            var session = this.session;

            session.project.iSense.getDefinitionAtPosition(session.name, this.getPosition(), (err, data: Cats.FileRange) => {
                if (data && data.fileName)
                    IDE.openSession(data.fileName, data.range.start);
            });
        }

        private getInfoAt(type: string) {

            this.session.project.iSense.getInfoAtPosition(type, this.session.name, this.getPosition(), (err, data: Cats.FileRange[]) => {
                console.debug("Called getInfoAt for with results #" + data.length);
                var resultTable = new ResultTable();
                var page = IDE.problemPane.addPage("info", null, resultTable);
                page.setShowCloseButton(true);
                resultTable.setData(data);
                IDE.problemPane.setSelection([page]);
            });
        }


        private refactor() {
            var pos = this.getPosition();
            Refactor.rename(this.session, pos);
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

        private createContextMenuItem(name: string, fn: Function) {
            var button = new qx.ui.menu.Button(name);
            button.addListener("execute", fn);
            return button;
        }

        private bookmark() {
            var name = prompt("please provide bookmark name");
            if (name) {
                var pos = this.getPosition();
                IDE.bookmarks.addData({
                    message: name,
                    fileName: this.session.name,
                    range: {
                        start: pos,
                        end: pos
                    }
                });
            }
        }

        private createContextMenu() {
            var menu = new qx.ui.menu.Menu();
            if (this.session.isTypeScript()) {
                menu.add(this.createContextMenuItem("Goto Declaration", this.gotoDeclaration.bind(this)));
                menu.add(this.createContextMenuItem("Find References", this.findReferences.bind(this)));
                menu.add(this.createContextMenuItem("Find Occurences", this.findOccurences.bind(this)));
                menu.add(this.createContextMenuItem("FInd Implementations", this.findImplementors.bind(this)));
                menu.addSeparator();
                menu.add(this.createContextMenuItem("Rename", this.refactor.bind(this)));
                menu.addSeparator();
            }
            menu.add(this.createContextMenuItem("Bookmark", this.bookmark.bind(this)));
            this.setContextMenu(menu);
        }

        private onMouseMove(ev: MouseEvent) {
            if (this.getToolTip() && this.getToolTip().isSeeable()) this.getToolTip().exclude();
            clearTimeout(this.mouseMoveTimer);
            var elem = <HTMLElement>ev.srcElement;
            if (elem.className !== "ace_content") return;
            this.mouseMoveTimer = setTimeout(() => {
                this.showToolTipAt(ev);
            }, 800);
        }

    }

}