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


///<reference path='session.ts'/>
///<reference path='menu/editorcontextmenu.ts'/>
///<reference path='ui/autocompleteview.ts'/>
///<reference path='session.ts'/>

declare var $;

module Cats {

    /**
     * The main Editor class that wraps the Ace editor
     * and provides a set common methods. There is only
     * one Editor per window.
     */ 
    export class Editor {
        public aceEditor: Ace.Editor;
        public toolTip: UI.ToolTip;
        private autoCompleteView: UI.AutoCompleteView;
        public onAutoComplete: Function;
        private mouseMoveTimer: number;

        // The sessions that are open by the editor
        sessions: Session[] = [];

        // The current session that is being edited
        public activeSession: Session;

        private editorContextMenu: Cats.Menu.EditorContextMenu;

        // private rootElement
        constructor(private rootElement: HTMLElement) {

            this.aceEditor = this.createEditor();
            this.aceEditor.setFontSize("16px");
            this.setTheme("cats");
            this.hide();            
        }

        init() {
            this.toolTip = new UI.ToolTip();
            this.autoCompleteView = new UI.AutoCompleteView(this.aceEditor);

            this.editorContextMenu = new Cats.Menu.EditorContextMenu(this);
            this.editorContextMenu.bindTo(this.rootElement);
            
        }

        getSession(name: string, project: Project): Session {
            for (var i = 0; i < this.sessions.length; i++) {
                var session = this.sessions[i];
                if ((session.name === name) && (project === session.project)) return session;
            }
        }
    
        addSession(session:Session) {
            this.sessions.push(session);
            session.update();
        }
    
        setSession(session: Session, pos?: Ace.Position) {
            
            if (this.activeSession === session) {
                if (pos) {
                    this.moveCursorTo(pos);
                    this.aceEditor.clearSelection();
                }
                return;
            }
            
            
            this.activeSession = session;
            this.aceEditor.setSession(session.editSession);
            if (pos) {
                this.moveCursorTo(pos);
                this.aceEditor.clearSelection();
            }
            this.aceEditor.focus();
            session.showErrors();
            tabbar.refresh();
            EventBus.emit(Event.editModeChanged,session.mode);
            EventBus.emit(Event.activeSessionChanged,session);
         
        }

        moveCursorTo(pos: Ace.Position = { column: 0, row: 0 }) {
            this.aceEditor.moveCursorTo(pos.row, pos.column);
        }


        show() {
            this.rootElement.style.display = "block";
            this.aceEditor.focus();
        }

        hide() {
            this.rootElement.style.display = "none";
        }

        setTheme(theme: string) {
            this.aceEditor.setTheme("ace/theme/" + theme);
            // Get the color of ace editor and use it to style the rest

            // Use a timeout to make sure the editor has updated its style
            // @TODO rewrite some css rules, don't set all of these.
            setTimeout(function() {
                var isDark = document.getElementsByClassName("ace_dark").length > 0;
                var fg = isDark ? "white" : "black";
                var elem = <HTMLElement>document.getElementsByClassName("ace_scroller")[0];
                var bg =  window.getComputedStyle(elem,null).backgroundColor;
                // var fg = elem.css("color");      
                $("html, #main, #navigator, #info, #result").css("background-color", bg);
                $("html").css("color", fg);
                $(".autocomplete").css("background-color", bg);
                $(".autocomplete").css("color", fg);
                $("input").css("background-color", fg);
                $("input").css("color", bg);
            }, 500);

        }

        hasUnsavedSessions() :bool {
            for (var i=0;i<this.sessions.length;i++) {
                if (this.sessions[i].changed) return true;
            }
            return false;
        }

        // Close a single session
        closeSession(session: Session) {
            if (session.changed) {
                var c = confirm("Save " + session.name + " before closing ?");
                if (c) session.persist();
            }

            // Remove it for the list of sessions
            var index = this.sessions.indexOf(session);
            this.sessions.splice(index, 1);

            // Check if was the current session displayed
            if (this.activeSession === session) {
                this.activeSession === null;
                EventBus.emit(Event.activeSessionChanged,null,session);
                this.hide();
            }

            tabbar.refresh();
        }


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
                this.activeSession.autoComplete(cursor, this.autoCompleteView);
            // }                        
        }

        private onMouseMove(ev: MouseEvent) {
            this.toolTip.hide();
            var session = this.activeSession;
            clearTimeout(this.mouseMoveTimer);
            var elem = <HTMLElement>ev.srcElement;
            if (elem.className !== "ace_content") return;
            this.mouseMoveTimer = setTimeout(() => {
                session.showInfoAt(ev);
            }, 800);
        }

        // Initialize the editor
        private createEditor():Ace.Editor {
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
                name: "save",
                bindKey: {
                    win: "Ctrl-S",
                    mac: "Command-S"
                },
                exec: () => { 
                    if (this.activeSession) this.activeSession.persist();                    
                }
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