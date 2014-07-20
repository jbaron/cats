class TabView extends qx.ui.tabview.TabView {

    constructor(tabNames: string[]) {
        super();
        this.setPadding(0, 0, 0, 0);
        this.setContentPadding(1, 0, 0, 0);
        tabNames.forEach((name) => {
            this.addPage(name);
        });
    }

    addPage(name, tooltipText?:string): qx.ui.tabview.Page {
        var tab = new qx.ui.tabview.Page(name);
        tab.setLayout(new qx.ui.layout.Canvas());
        tab.setPadding(0, 0, 0, 0);
        tab.setMargin(0, 0, 0, 0);
        tab.setDecorator(null);
        
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
            console.log(page.getLabel());
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
