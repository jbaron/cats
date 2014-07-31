class TabView extends qx.ui.tabview.TabView {
    
    //@BUG icon alias doesn't work, resource not there
    private iconFolder = "resource/qx/icon/Oxygen/16/";
    private iconMapping = {
        "search" : {
            label : "Search",
            icon: "actions/edit-find.png"
        }, 
        
        "console" : {
            icon : "apps/utilities-terminal.png"
        },
        
                
         "files" : {
            icon: "actions/view-list-tree.png"
        },
        
         "outline" : {
            icon: "actions/code-class.png"
        },
        
        
        "todo" : {
          icon: "actions/view-pim-tasks.png"  
        },
        
        "properties" : {
          icon: "actions/document-properties.png"  
        },
        
        "problems" : {
            icon: "status/task-attention.png"  
        }
        
        
    }

    constructor(tabNames: string[]) {
        super();
        this.setPadding(0, 0, 0, 0);
        this.setContentPadding(1, 0, 0, 0);
        tabNames.forEach((name) => {
            this.addPage(name);
        });           
        
  
    }

    private getLabel(name) {
        var label;
        var entry = this.iconMapping[name];
        if (entry) label = entry.label;
        if (! label) label = qx.Bootstrap.firstUp(name);
        return label;
    }

    private getIconName(name:string) {
        var entry = this.iconMapping[name];
        if (entry) return this.iconFolder + entry.icon;
    }

    addPage(name:string, tooltipText?:string): qx.ui.tabview.Page {
        var tab = new qx.ui.tabview.Page(this.getLabel(name), this.getIconName(name));
        tab.setLayout(new qx.ui.layout.Canvas());

        var button = (<any>tab).getButton();
        button.setContextMenu(this.createContextMenu(tab));

        if (tooltipText) {
            var tooltip = new qx.ui.tooltip.ToolTip(tooltipText);
            button.setToolTip(tooltip);
            button.setBlockToolTip(false);
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
            if (page.getLabel() === id) {
                return page;
            }
        }
        return null;
    }

    select(id: string) {
        var page = this.getPage(id);
        if (page) this.setSelection([page]);
    }

}
