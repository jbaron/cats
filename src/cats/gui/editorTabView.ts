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
    
    /**
     * This class represents a page holding a session. Typically that means a 
     * editor
     */
    export class EditorPage extends qx.ui.tabview.Page {

    
        constructor(public editor:Editor) {
            super(editor.label);
            this.add(editor.getLayoutItem(), { edge: 0 });

            this.setShowCloseButton(true);
            this.setLayout(new qx.ui.layout.Canvas());
            this.setPadding(0, 0, 0, 0);
            this.setMargin(0, 0, 0, 0);
            this.createContextMenu();
            this.createToolTip();
            this.getButton().setShow("both");

            editor.on("changed", this.setChanged, this);
            editor.on("errors", this.setHasErrors, this);
        }

        continueWhenNeedSaving(callback: () => void) {
            if (this.editor.hasUnsavedChanges()) {
                var dialog = new Gui.ConfirmDialog("There are unsaved changes!\nDo you really want to continue?");
                dialog.onConfirm = callback;
                dialog.show();
            } else {
                callback();
            }
        }

        _onButtonClose() {
            this.continueWhenNeedSaving(() => {
                super._onButtonClose();
            });
        }


        private createToolTip() {
            var button: qx.ui.tabview.TabButton = (<any>this).getButton();
            var tooltipText = this.editor.getDescription() || this.editor.label
            var tooltip = new qx.ui.tooltip.ToolTip(tooltipText);
            button.setToolTip(tooltip);
        }

        private createContextMenu() {
            var button: qx.ui.tabview.TabButton = (<any>this).getButton();
            var menu = new qx.ui.menu.Menu();

            var item1 = new qx.ui.menu.Button("Close");
            item1.addListener("execute", () => { IDE.editorTabView.close(this); });

            var item2 = new qx.ui.menu.Button("Close other");
            item2.addListener("execute", () => { IDE.editorTabView.closeOther(this); });

            var item3 = new qx.ui.menu.Button("Close all");
            item3.addListener("execute", () => { IDE.editorTabView.closeAll(); });

            menu.add(item1);
            menu.add(item2);
            menu.add(item3);
            button.setContextMenu(menu);
        }

        /**
         * Tell the Page that the editor on it has detected some errors in the code
         */
        setHasErrors(level:string) {
            if (level) {
                var icon = IDE.icons.annotation[level];
                this.setIcon(icon);
            } else {
                this.resetIcon();
            }
        }

        setChanged(changed: boolean) {
            
            var button: qx.ui.tabview.TabButton = (<any>this).getButton();

            if (changed) {
                button.setLabel("*" + this.editor.label);
            } else {
                button.setLabel(this.editor.label);
            }
        }

    }

    export class EditorTabView extends qx.ui.tabview.TabView {

        constructor() {
            super();
            this.setPadding(0, 0, 0, 0);
            this.setContentPadding(0, 0, 0, 0);
        }


         addEditor(editor: Editor, pos?: any) {
            var page = new EditorPage(editor);
            this.add(page);
            this.navigateToPage(page,pos);
            page.fadeIn(500);
            return page;
        }

        /**
         * close all open pages
         */
        closeAll() {
            var pages = <EditorPage[]>this.getChildren().concat();
            this.continueIfUnsavedChanges(pages, () => {
                pages.forEach((page) => {
                    this.remove(page);
                });
            });
        }

        /**
         * close one page
         */
        close(page= this.getActivePage()) {
            if (! page) return;
            page.continueWhenNeedSaving(() => {
                this.remove(page);
            });
        }

        onChangeEditor(cb : (editor:Editor, page:EditorPage)=>void) {
            this.addListener("changeSelection", (ev:qx.event.type.Data) => {
                var page:EditorPage = ev.getData()[0];
                if (page) {
                    cb(page.editor, page);
                } else {
                    cb(null, null);
                }
            });
        }


        /**
         * Close the other pages
         */
        closeOther(closePage= this.getActivePage()) {
            var pages = <EditorPage[]>this.getChildren().concat().filter(
                (page)=>{ return page !== closePage;}
            );
            
            this.continueIfUnsavedChanges(pages, () => {
                pages.forEach((page) => {
                    this.remove(page);
                });
            });
        }

        private continueIfUnsavedChanges(pages:EditorPage[], callback: () => void) {
            var hasUnsaved = false; 
            hasUnsaved = pages.some((page) => { 
                return page.editor.hasUnsavedChanges();
            });
            if (hasUnsaved) {
                var dialog = new Gui.ConfirmDialog("There are unsaved changes!\nDo you really want to continue?");
                dialog.onConfirm = callback;
                dialog.show();
            } else {
                callback();
            }
        }

    
        hasUnsavedChanges() {
            return this.getChildren().some((page:EditorPage) => {
                return page.editor.hasUnsavedChanges();
            });
        }

   
        /**
         * Get all the editors
         */
        getEditors() {
            var result:Editor[] = [];
            this.getChildren().forEach((page: EditorPage) => {
                result.push(page.editor);
            });
            return result;
        }
        

        /**
         * Get the currently active editor
         */
        getActiveEditor(type?:new() => Editor) {
            var page = this.getActivePage();
            if (!page) return null;
            if (type) {
                if (page.editor instanceof type) return page.editor;   
            } else {
                return page.editor;
            }
        }

        /**
         * Navigate to a certain page
         */
        navigateToPage(page: EditorPage, pos: any) {
            if (this.getChildren().indexOf(page) === -1) return;
            this.setSelection([page]);
            page.editor.moveToPosition(pos);
        }


        /**
         * Get the page that has a certain instance of an editor.
         */ 
        getPageForEditor(editor:Editor) {
           var pages = <EditorPage[]>this.getChildren(); 
           for (var x=0;x<pages.length;x++) {
               if (pages[x].editor === editor) return pages[x];
           }
        }
  
        getPagesForFile(filePath:string) {
            var result:EditorPage[] = [];
            this.getChildren().forEach((page:EditorPage) => {
                var editor:FileEditor = <any>page.editor;
                if (editor.filePath  === filePath) result.push(page);
            });
            return result;
        }

        getActivePage() {
            return <EditorPage>this.getSelection()[0];
        }


     

    }
}
