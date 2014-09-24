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

    var UndoManager: ace.UndoManager = ace.require("ace/undomanager").UndoManager;
    var Range: ace.Range = ace.require("ace/range").Range;
    var modelist = ace.require('ace/ext/modelist');

    var autoCompletePopup = new AutoCompletePopup();
    

    /**
     * Wrapper around the ACE editor. The rest of the code base should not use
     * ACE editor directly so it can be changed for another editor if required.
     */
    export class SourceEditor extends FileEditor {


        private mode:string;
        private aceEditor: ace.Editor;
        private mouseMoveTimer: number;
        private outlineTimer: number
        private updateSourceTimer: number;
        private pendingWorkerUpdate = false;
        private editSession: ace.EditSession;
        private pendingPosition:ace.Position;
        private selectedTextMarker:any;
        private widget:qx.ui.core.Widget;
        private contextMenu:SourceEditorContextMenu;
        
        unsavedChanges = false;

        constructor(fileName?:string) {
            super(fileName);
            
            var widget = new qx.ui.core.Widget();
            widget.setDecorator(null);
            widget.setFont(null);
            widget.setAppearance(null);
            this.widget = widget;
            
            var content = "";
            this.mode = "ace/mode/text";
            
            if (fileName) {
                content = OS.File.readTextFile(fileName) ;
                this.mode = modelist.getModeForPath(fileName).mode
            }
            
            this.editSession = new (<any>ace).EditSession(content, this.mode);
            this.editSession.setNewLineMode("unix");
            this.editSession.setUndoManager(new UndoManager());
            this.editSession["__fileName__"] = this.filePath;
            this.configureAceSession();
            this.editSession.on("change", this.onChangeHandler.bind(this));
        
            this.editSession.on("changeAnnotation", () => {
                var a = this.editSession.getAnnotations();
                this.emit("errors", this.getMaxAnnotation(a));
            });
            
            this.updateOutline(0);

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

                this.contextMenu = new SourceEditorContextMenu(this);
                this.widget.setContextMenu(this.contextMenu);

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

        /**
         * Determine the maximum level of warnings within a set of annotations.
         */ 
        private getMaxAnnotation(annotations:ace.Annotation[]) {
            if ((!annotations) || (annotations.length ===0)) return "";
            var result = "info";
            annotations.forEach((annotation) => {
                if (annotation.type === "error") result = "error";
                if (annotation.type === "warning" && result === "info") result = "warning";
            });
            return result;
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

        /**
         * Get the Qooxdoo Widget that can be added to the parent
         */ 
        getLayoutItem() {
            return this.widget;
        }


        /**
         * Is the editor currently containing TypeScript content. This determines wehther all kind 
         * of features are enabled or not.
         */ 
        isTypeScript() {
            return this.mode === "ace/mode/typescript";
        }


        /**
         * Replace the current content of this editor with new content and indicate
         * wether the cursor should stay on the same position
         * 
         */ 
        setContent(content, keepPosition= true) {
            var pos: ace.Position;
            if (keepPosition) pos = this.getPosition();
            this.aceEditor.getSession().setValue(content);
            if (pos) this.moveToPosition(pos);
        }


        /**
         * Update the configuaration of the editor. 
         *
         */
        private configureEditor() {
            var config = IDE.config.editor;
            if (config.fontSize) this.aceEditor.setFontSize(config.fontSize + "px");
            if (config.rightMargin) this.aceEditor.setPrintMarginColumn(config.rightMargin);
            if (config.theme) this.aceEditor.setTheme("ace/theme/" + config.theme);
        }

        /**
         * Update the configuration of the session.
         * 
         */ 
        private configureAceSession() {
            var config = this.project.config.codingStandards;
            var session = this.editSession;
            if (config.tabSize) session.setTabSize(config.tabSize);
            if (config.useSoftTabs != null) session.setUseSoftTabs(config.useSoftTabs);
        }


        /**
         * Inform the world about current status of the editor
         * 
         */ 
        private informWorld() {
            IDE.infoBus.emit("editor.overwrite", this.editSession.getOverwrite());
            var mode = PATH.basename(this.mode)
            IDE.infoBus.emit("editor.mode", mode);
            IDE.infoBus.emit("editor.position", this.aceEditor.getCursorPosition());
        }

        replace(range: ace.Range, content: string) {
            this.editSession.replace(range, content);
        }


        getLine(row = this.getPosition().row) {
            return this.editSession.getLine(row);   
        }

        /**
         * Get the content of the editor
         * 
         */ 
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
            this.updateOutline();
        }

        /**
         * Make sure the ace editor is resized when the Qooxdoo container is resized.
         * 
         */ 
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
            var range: ace.Range = new Range(r.start.row, r.start.column, r.end.row, r.end.column);
            this.selectedTextMarker = this.editSession.addMarker(range,"ace_selected-word", "text");
        }

        moveToPosition(pos: Cats.Range);
        moveToPosition(pos: ace.Position);
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

        /**
         * Get the position of the cursor within the content.
         * 
         */ 
        getPosition() {
            return this.aceEditor.getCursorPosition();
        }

        /**
          * Get the Position based on mouse x,y coordinates
          */
        getPositionFromScreenOffset(x: number, y: number): ace.Position {
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
                this.project.iSense.updateScript(this.filePath, this.getContent());
                // this.session.updateContent(source);
                clearTimeout(this.updateSourceTimer);
                this.pendingWorkerUpdate = false;
        }


        /**
         * Perform code autocompletion.
         */
        showAutoComplete(memberCompletionOnly = false) {
             // Any pending changes that are not yet send to the worker?
            if (this.pendingWorkerUpdate) this.update();
            autoCompletePopup.complete(memberCompletionOnly, this, this.aceEditor);
        }


        /**
         * Check if there are any errors for this session and show them.    
         */
        showAnnotations(result: Cats.FileRange[]) {
            var annotations: ace.Annotation[] = [];
            result.forEach((error: Cats.FileRange) => {
                annotations.push({
                    row: error.range.start.row,
                    column: error.range.start.column,
                    type: <any>error.severity,
                    text: error.message
                });
            });
            this.aceEditor.getSession().setAnnotations(annotations);
        }


         private liveAutoComplete(e) {
            var text = e.args || "";
            if ((e.command.name === "insertstring") && (text === ".")) {
                this.showAutoComplete(true);
            }
        }

        /**
         * Create a new isntance of the ACE editor and append is to a dom element
         * 
         */ 
        private createAceEditor(rootElement: HTMLElement): ace.Editor {
            var editor: ace.Editor = ace.edit(rootElement);
            if (this.isTypeScript()) {
                editor.completers =  [new TSCompleter(this), snippetCompleter];
                editor.commands.on('afterExec', (e) => { this.liveAutoComplete(e);});
                new TSTooltip(this);
                new TSHelper(this, this.editSession);
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
                    exec: () => { this.contextMenu.gotoDeclaration(); }
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


        /**
         * Lets check the worker if something changed in the outline of the source.
         * But lets not call this too often.
         * 
         */
        private updateOutline(timeout= 5000) {
                if (! this.isTypeScript()) return;
                clearTimeout(this.outlineTimer);
                this.outlineTimer = setTimeout(() => {
                    this.project.iSense.getScriptLexicalStructure(this.filePath, (err: Error, data: NavigateToItem[]) => {
                        this.set("outline",data);
                    });
                }, timeout);
        }

     
        /**
         * Persist this session to the file system. This overrides the NOP in the base class
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