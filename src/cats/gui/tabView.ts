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

/**
 * Used for all the tabs execpt the session tab
 */ 
class TabView extends qx.ui.tabview.TabView {
  private static IDNAME="___ID___" ;
  private iconFolder = "./resource/qx/icon/Oxygen/16/";
    private iconMapping = {
        "search" : {
            label : "Search",
            icon: "actions/edit-find.png"
        }, 
        
        "console" : {
            icon : "apps/utilities-terminal.png"
        },
        
        "process" : {
            icon: "actions/view-process-all.png"  
        },
                
         "files" : {
            label: "Project Explorer",
            icon: "actions/view-list-tree.png"
            // icon: "filenav_nav.svg"
        },
        
         "outline" : {
            icon: "actions/code-class.png"
            // icon: "outline_co.svg"
        },
        
        "bookmarks" : {
            icon: "actions/bookmarks-organize.png"
        },
        
        "todo" : {
          icon: "actions/view-pim-tasks.png"  
        },
        
        "properties" : {
          icon: "actions/document-properties.png"  
        },
        
        "problems" : {
            icon: "status/task-attention.png"  
        },
        
        "info" : {
            icon: "status/dialog-information.png"  
        }
       
    } ; 

    constructor(tabNames: string[]=[]) {
        super();
        this.setPadding(0, 0, 0, 0);
        this.setContentPadding(0, 0, 0, 0);
        tabNames.forEach((name) => {
            this.addPage(name);
        });           
    }

    private getLabel(name:string) {
        var label:string;
        var entry = this.iconMapping[name];
        if (entry) label = entry.label;
        if (! label) label = qx.Bootstrap.firstUp(name);
        return label;
    }

    private getIconName(name:string) {
        var entry = this.iconMapping[name];
        if (entry) return this.iconFolder + entry.icon;
    }

    addPage(id:string, tooltipText?:string, widget?:qx.ui.core.LayoutItem): qx.ui.tabview.Page {
        var tab = new qx.ui.tabview.Page(this.getLabel(id), this.getIconName(id));
        tab[TabView.IDNAME] = id;
        tab.setLayout(new qx.ui.layout.Canvas());

        var button = (<any>tab).getButton();
        // button.setContextMenu(this.createContextMenu(tab));

        if (tooltipText) {
            var tooltip = new qx.ui.tooltip.ToolTip(tooltipText);
            button.setToolTip(tooltip);
            button.setBlockToolTip(false);
        }
        
        if (widget) {
            tab.add(widget, { edge: 0 });
        }
        
        this.add(tab);
        return tab;
    }

    private createContextMenu(tab: qx.ui.tabview.Page) {
        var menu = new qx.ui.menu.Menu();
        var item1 = new qx.ui.menu.Button("Close");
        item1.addListener("execute", () => {
            this.remove(tab);
        });

        var item2 = new qx.ui.menu.Button("Close other");
        var item3 = new qx.ui.menu.Button("Close all");
        menu.add(item1);
        menu.add(item2);
        menu.add(item3);
        return menu;
    }

    getPage(id: string): qx.ui.tabview.Page {
        var pages = this.getChildren();
        for (var i = 0; i < pages.length; i++) {
            var page = pages[i];
            if (page[TabView.IDNAME] === id) {
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
