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

      var iconMapping = {
            "files": {
                label: "Project Explorer"
            }
        };

    function getLabel(name: string) {
            var label: string;
            var entry = iconMapping[name];
            if (entry) label = entry.label;
            if (!label) label = qx.Bootstrap.firstUp(name);
            return label;
    }

    function getIconName(name: string) {
            var entry = IDE.icons.tab[name];
            if (entry) return entry;
            console.log("No icon found for tab with name " + name);
    }


    export class TabViewPage extends qx.ui.tabview.Page {
        
        autoSelect = false;
        
        constructor(public id: string, tooltipText?: string, widget?: qx.ui.core.LayoutItem) {
            super(getLabel(id), getIconName(id));
            this.setLayout(new qx.ui.layout.Canvas());

            if (tooltipText) {
                var button = this.getButton();
                var tooltip = new qx.ui.tooltip.ToolTip(tooltipText);
                button.setToolTip(tooltip);
                button.setBlockToolTip(false);
            }

            if (widget) {
                this.add(widget, { edge: 0 });
                widget.addListener("contentChange",() => {
                    if (this.autoSelect) this.select(); 
                });
            }

        }
        
        select() {
            var tabView = this.getLayoutParent().getLayoutParent();
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
        }

       addPage(id: string, tooltipText?: string, widget?: qx.ui.core.LayoutItem): TabViewPage {
            var tab = new TabViewPage(id, tooltipText, widget);
            this.add(tab);
            return tab;
        }

        getPage(id: string): qx.ui.tabview.Page {
            var pages = <TabViewPage[]>this.getChildren();
            for (var i = 0; i < pages.length; i++) {
                var page = pages[i];
                if (page.id === id) {
                    return page;
                }
            }
            return null;
        }

        selectPage(id: string) {
            var page = this.getPage(id);
            if (page) this.setSelection([page]);
        }

    }
}