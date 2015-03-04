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
     * Generic tab used for all the tabs in CATS except for the edirtor tabs.
     * Takes care of basic look & feel and some simple features
     */
    export class TabViewPage extends qx.ui.tabview.Page {

        // Hints if this tab want to get selected if its content changes 
        autoSelect = false;

        constructor(public id: string, widget: qx.ui.core.LayoutItem, tooltipText?: string) {
            super(super.tr(id), IDE.icons.tab[id]);
            this.setLayout(new qx.ui.layout.Canvas());

            if (tooltipText) {
                var button = this.getButton();
                var tooltip = new qx.ui.tooltip.ToolTip(tooltipText);
                button.setToolTip(tooltip);
                button.setBlockToolTip(false);
            }

            if (widget) {
                this.add(widget, { edge: 0 });
                widget.addListener("contentChange", () => {
                    if (this.autoSelect) {
                        var elem = <HTMLElement>document.activeElement;
                        this.select();
                        setTimeout(() => {
                            if (elem) elem.focus();
                        }, 10);
                    }
                });
            }

        }




        /**
         * Convenience method to select this page in the tab view.
         */
        private select() {
            var tabView = <TabView>this.getLayoutParent().getLayoutParent();
            tabView.setSelection([this]);
        }

    }

    /**
     * Used for all the tabs execpt the session tab
     */
    export class TabView extends qx.ui.tabview.TabView {

        constructor() {
            super();
            this.setPadding(0, 0, 0, 0);
            this.setContentPadding(0, 0, 0, 0);
            this.createContextMenu();
        }

        private createContextMenu() {
            var menu = new qx.ui.menu.Menu();
            var directions = ["top", "left", "right", "bottom"];
            directions.forEach((dir) => {
                var item = new qx.ui.menu.Button(this.tr(dir));
                item.addListener("execute", () => { this.setBarPosition(dir) });
                menu.add(item);
            });
            var mainmenu = new qx.ui.menu.Menu();
            var b = new qx.ui.menu.Button("Tab layout", null, null, menu);
            mainmenu.add(b);
            this.setContextMenu(mainmenu);
        }

        /**
         * Add a new Page to the tab Viewx
         */
        addPage(id: string, widget: qx.ui.core.LayoutItem, tooltipText?: string): TabViewPage {
            var tab = new TabViewPage(id, widget, tooltipText);
            this.add(tab);
            this.setSelection([tab]);
            return tab;
        }


    }
}