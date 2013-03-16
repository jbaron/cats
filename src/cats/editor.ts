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

///<reference path='menu/editorcontextmenu.ts'/>
///<reference path='ui/autocompleteview.ts'/>



module Cats {


    function setOverwrite() {        
        var s = <AceSession>IDE.activeSession;
        IDE.mainEditor.overwrite = s.editSession.getOverwrite();
    }

    /**
     * The TextEditor class that wraps the Ace editor
     * and provides a set common methods. There is only
     * one TextEditor instance per window.
     */ 
    export class TextEditor extends ObservableImpl implements Editor {
        public aceEditor: Ace.Editor;
        public toolTip: UI.ToolTip;
        private autoCompleteView: UI.AutoCompleteView;
        public onAutoComplete: Function;
        private mouseMoveTimer: number;
        
        editMode:string;
        overwrite:bool;

        private editorContextMenu: Cats.Menu.EditorContextMenu;

        constructor(private rootElement: HTMLElement) {
            super("editMode", "overwrite");
            this.aceEditor = this.createAceEditor();
            this.hide();
            this.init();
        }

        // Small wrappers to make the observers a bit more typed.
        onEditMode(fn:(mode:string)=>void) { this.on("editMode",fn); }
        onOverwrite(fn:(mode:bool)=>void) { this.on("overwrite",fn); }


        init() {
            this.toolTip = new UI.ToolTip();
            this.autoCompleteView = new UI.AutoCompleteView(this.aceEditor);
            this.editorContextMenu = new Cats.Menu.EditorContextMenu(this);
            this.editorContextMenu.bindTo(this.rootElement);            
        }

        /**
         * Deactive and activeate listeners
         * @param oldSession The current active session that will de activated
         * @param newSession The session that will be the new active session
         */ 
        private swapListeners(oldSession:AceSession, newSession:AceSession) {
            var listeners = {
               "changeOverwrite" : setOverwrite                 
            };
            
            if (oldSession) {
                for (var event in listeners) {
                    oldSession.editSession.removeListener(event,listeners[event]);
                }
            }
            
            if (newSession) {
                for (var event in listeners) {
                    newSession.editSession.on(event,listeners[event]);
                }

            }
                    
        }


        /**
         * Make a session the active one
         * @param session the session to make active
         * @param pos The position to scroll to
         */
        edit(session: Session, pos?: Ace.Position); 
        edit(session: AceSession, pos?: Ace.Position) {

            if (IDE.activeSession === session) {
                if (pos) {
                    this.moveCursorTo(pos);
                }
                return;
            }
           
            this.swapListeners(<AceSession>IDE.activeSession,session); 

            IDE.activeSession = session;
            
            // var aceSession = <AceSession>session;
            
            this.aceEditor.setSession(session.editSession);
            if (session.mode === "binary") {
                this.aceEditor.setReadOnly(true);
            } else {
                this.aceEditor.setReadOnly(false);                
            }
            
            if (pos) {
                this.moveCursorTo(pos);
            }
            this.show();
            this.aceEditor.focus();
            session.showErrors();
            if (IDE.tabbar) IDE.tabbar.refresh();
            this.editMode = PATH.basename(session.mode); 
         
        }

        /**
         * Move cursor to a certain position
         */ 
        moveCursorTo(pos: Ace.Position = { column: 0, row: 0 }) {
            this.aceEditor.moveCursorToPosition(pos);
            this.aceEditor.clearSelection();
            this.aceEditor.centerSelection();
        }

        /**
         * Show the editor
         */ 
        show() {
            this.rootElement.style.display = "block";
            this.aceEditor.focus();
        }

        /**
         * Hide the editor
         */ 
        hide() {
            this.rootElement.style.display = "none";
        }

        /**
         * Set the theme of the editor
         */ 
        setTheme(theme: string) {
            this.aceEditor.setTheme("ace/theme/" + theme);           
        }

        /**
         * Add a command to the editor
         */ 
        addCommand(command: Ace.EditorCommand) {
            this.aceEditor.commands.addCommand(command);
        }

        bindToMouse(fn) {
            this.rootElement.onmousemove = fn;
            this.rootElement.onmouseout = () => { this.toolTip.hide() };
        }

        autoComplete() {
            // if (this.activeSession.mode === "typescript") {
                var cursor = this.aceEditor.getCursorPosition();
                var aceSession = <AceSession>IDE.activeSession;
                aceSession.autoComplete(cursor, this.autoCompleteView);
            // }                        
        }

    
        private onMouseMove(ev: MouseEvent) {
            this.toolTip.hide();
            clearTimeout(this.mouseMoveTimer);
            var elem = <HTMLElement>ev.srcElement;
            if (elem.className !== "ace_content") return;
            var session = <AceSession>IDE.activeSession;
            this.mouseMoveTimer = setTimeout(() => {
                session.showInfoAt(ev);
            }, 800);
        }

        // Initialize the editor
        private createAceEditor():Ace.Editor {
            var editor: Ace.Editor = ace.edit(this.rootElement);

            editor.commands.addCommands([
            {
                name: "autoComplete",
                bindKey: {
                    win: "Ctrl-Space",
                    mac: "Command-Space"
                },
                exec: () => { this.autoComplete() }
            },

           {
                name: "gotoDeclaration",
                bindKey: {
                    win: "F12",
                    mac: "F12"
                },
                exec: () => { Commands.runCommand(Commands.CMDS.navigate_declaration) }
            },


            {
                name: "save",
                bindKey: {
                    win: "Ctrl-S",
                    mac: "Command-S"
                },
                exec: () =>  { Commands.runCommand(Commands.CMDS.file_save) }
            }
            ]);
 
            var originalTextInput = editor.onTextInput;
            editor.onTextInput = (text) => {
                originalTextInput.call(editor, text);
                if (text === ".") this.autoComplete();
            };

            var elem = this.rootElement; // TODo find scroller child
            elem.onmousemove = this.onMouseMove.bind(this);
            elem.onmouseout = () => {
                this.toolTip.hide()
                clearTimeout(this.mouseMoveTimer);
            };

            return editor;
        }

    }

}