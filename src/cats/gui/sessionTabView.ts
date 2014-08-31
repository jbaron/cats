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
    export class SessionPage extends qx.ui.tabview.Page {

        editor: Editor;

        constructor(public session: Cats.Session) {
            super(session.shortName);
            this.setShowCloseButton(true);
            this.setLayout(new qx.ui.layout.Canvas());
            this.setPadding(0, 0, 0, 0);
            this.setMargin(0, 0, 0, 0);
            this.createEditor();
            this.createContextMenu();
            this.createToolTip();
            this.getButton().setShow("both");

            this.session.on("changed", this.setChanged, this);
            this.session.on("errors", this.setHasErrors, this);
          
        }

        private createEditor() {
            if (this.session.uml) {
                this.editor = new UMLEditor(this.session);
            } else if (this.session.isImage()) {
                this.editor = new ImageEditor(this.session);
            } else {
                this.editor = new SourceEditor(this.session);
            }
            this.add(this.editor, { edge: 0 });
        }

        private createToolTip() {
            var button: qx.ui.tabview.TabButton = (<any>this).getButton();
            var tooltip = new qx.ui.tooltip.ToolTip(this.session.name);
            button.setToolTip(tooltip);
        }

        private createContextMenu() {
            var button: qx.ui.tabview.TabButton = (<any>this).getButton();
            var menu = new qx.ui.menu.Menu();

            var item1 = new qx.ui.menu.Button("Close");
            item1.addListener("execute", () => { IDE.sessionTabView.close(this); });

            var item2 = new qx.ui.menu.Button("Close other");
            item2.addListener("execute", () => { IDE.sessionTabView.closeOther(this); });

            var item3 = new qx.ui.menu.Button("Close all");
            item3.addListener("execute", () => { IDE.sessionTabView.closeAll(); });

            menu.add(item1);
            menu.add(item2);
            menu.add(item3);
            button.setContextMenu(menu);
        }

        /**
         * Tell the Page that the editor on it has detected some errors in the code
         */
        setHasErrors(errors: any[]) {
            if (errors.length > 0) {
                this.setIcon("./resource/qx/icon/Oxygen/16/status/task-attention.png");
            } else {
                this.resetIcon();
            }
        }

        setChanged(changed: boolean) {
            var button: qx.ui.tabview.TabButton = (<any>this).getButton();

            if (changed) {
                button.setLabel("*" + this.session.shortName);
            } else {
                button.setLabel(this.session.shortName);
            }
        }

    }

    export class SessionTabView extends qx.ui.tabview.TabView {

        constructor() {
            super();
            this.setPadding(0, 0, 0, 0);
            this.setContentPadding(0, 0, 0, 0);
        }

        addSession(session: Cats.Session, pos?: any) {
            var page = new SessionPage(session);
            this.add(page);
            this.setSelection([page]);
            page.editor.addListenerOnce("ready", (editor: Editor) => {
                this.navigateToPage(page,pos);
            });
            page.fadeIn(500);
            return page;
        }

        /**
         * close all open pages
         */
        closeAll() {
            var pages = <SessionPage[]>this.getChildren().concat();
            pages.forEach((page) => {
                this.remove(page);
            });
        }

        /**
         * close one page
         */
        close(page= this.getActivePage()) {
            this.remove(page);
        }

        /**
         * Close the other pages
         */
        closeOther(closePage= this.getActivePage()) {
            var pages = <SessionPage[]>this.getChildren().concat();
            pages.forEach((page) => {
                if (page !== closePage) this.remove(page);
            });
        }

        /**
         * Get all the open sessions
         */
        getSessions(): Cats.Session[] {
            var result = [];
            this.getChildren().forEach((child: SessionPage) => {
                result.push(child.session);
            });
            return result;
        }

        /**
         * Get the currently active session
         */
        getActiveSession() {
            var page = this.getActivePage();
            if (!page) return null;
            return page.session;
        }

        navigateTo(session: Cats.Session, pos?: Ace.Position) {
            var page = this.getPageBySession(session);
            if (page) {
                this.navigateToPage(page, pos);
            }
        }

        navigateToPage(page: SessionPage, pos?: any, storeHistory = true) {
            this.setSelection([page]);
            if (pos) page.editor.moveToPosition(pos);
            if (storeHistory) IDE.history.add(page, pos);
        }

        /**
         * Find a page by its session
         */
        getPageBySession(session: Cats.Session): SessionPage {
            var pages = this.getChildren();
            for (var i = 0; i < pages.length; i++) {
                var page = <SessionPage>pages[i];
                if (page.session === session) return page;
            }
            return null;
        }

        getActivePage() {
            return <SessionPage>this.getSelection()[0];
        }


        select(session: Cats.Session) {
            var page = this.getPageBySession(session);
            if (page) this.setSelection([page]);
        }

    }
}