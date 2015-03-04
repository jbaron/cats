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
module Cats.Gui.Editor {

    /**
     * The context menu for the source editor. This menu provides basic 
     * navigation and refactoring options
     */
    export class SourceEditorContextMenu extends qx.ui.menu.Menu {


        constructor(private editor: SourceEditor) {
            super();
            this.init();

        }

        private createContextMenuItem(name: string, fn: Function, self?: any) {
            var button = new qx.ui.menu.Button(name);
            button.addListener("execute", fn, self);
            return button;
        }


        private getIsense() {
            return this.editor.project.iSense;
        }

        gotoDeclaration() {
            this.getIsense().getDefinitionAtPosition(this.editor.filePath, this.getPos(), (err:any, data: Cats.FileRange) => {
                if (data && data.fileName)
                    FileEditor.OpenEditor(data.fileName, data.range.start);
            });
        }

        private getPos() {
            return this.editor.getPosition();
        }

        private getInfoAt(type: string) {

            this.getIsense().getCrossReference(type, this.editor.filePath, this.getPos(), (err:any, data: Cats.FileRange[]) => {
                if (!data) return;
                var resultTable = new ResultTable();
                var page = IDE.resultPane.addPage("info_tab", resultTable);
                page.setShowCloseButton(true);
                resultTable.setData(data);
            });
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



        private bookmark() {
            var dialog = new Gui.PromptDialog("Please provide bookmark name");
            dialog.onSuccess = (name: string) => {
                var pos = this.getPos();
                IDE.bookmarks.addData({
                    message: name,
                    fileName: this.editor.filePath,
                    range: {
                        start: pos,
                        end: pos
                    }
                });
            };
            dialog.show();
        }

        private refactor() {
            var pos = this.getPos();
            Refactor.rename(this.editor.filePath, this.editor.project, pos);
        }


        private createModeMenu() {
            var menu = new qx.ui.menu.Menu();
             var modes = ace.require( 'ace/ext/modelist' ).modes;
             modes.forEach((entry:any) => {
                  var button = new qx.ui.menu.Button(entry.caption);
                  button.addListener("execute", ()=> {
                      this.editor.setMode(entry.mode)
                  });
                  menu.add(button);
             });
             return menu;
        }


        private init() {

            if (this.editor.isTypeScript()) {
                this.add(this.createContextMenuItem("Goto Declaration", this.gotoDeclaration, this));
                this.add(this.createContextMenuItem("Find References", this.findReferences, this));
                this.add(this.createContextMenuItem("Find Occurences", this.findOccurences, this));
                // this.add(this.createContextMenuItem("Find Implementations", this.findImplementors, this));
                this.addSeparator();
                this.add(this.createContextMenuItem("Rename", this.refactor, this));
                this.addSeparator();
            }
            this.add(this.createContextMenuItem("Bookmark", this.bookmark, this));
            var modeMenu = this.createModeMenu();
            
            var b = new qx.ui.menu.Button("Modes", null,null,modeMenu);
            this.add(b);
        }


    }
}
