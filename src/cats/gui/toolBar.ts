/**
 * The toolbar for CATS
 */
class ToolBar extends qx.ui.toolbar.ToolBar {

    private themes = ["Modern", "Indigo", "Simple", "Classic"];

    constructor() {
        super();
    }

    init() {
        
        var cmds = Cats.Commands.getAllCommands();
        cmds.forEach((cmd) => {
            if (cmd.icon) {
                    var icon = "../" + IDE.getIconDir() + cmd.icon;
                    var button = new qx.ui.toolbar.Button(cmd.label, icon);
                    button.setShow("icon");
                    button.getChildControl("icon").set({
                       width: 16,
                       height: 16,
                       scale: true
                    });
                    var tooltip = new qx.ui.tooltip.ToolTip(cmd.label, null);
                    button.setToolTip(tooltip);
                    button.setBlockToolTip(false);
                    button.addListener("click", () => {
                        cmd.command();
                    });
                    this.add(button);
            }
        });
        
        this.initThemes();
    }

    toggle() {
        if (this.isVisible()) { 
            this.exclude();    
        } else {
            this.show();
        }
    }


    initThemes() {
        this.themes.forEach((theme) => {
            var themeButton = new qx.ui.toolbar.Button(theme);
            themeButton.addListener("click", () => { qx.theme.manager.Meta.getInstance().setTheme(qx.theme[theme]); });
            this.add(themeButton);
        });
    }

}