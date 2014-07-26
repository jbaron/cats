
class SessionPage extends qx.ui.tabview.Page {
 
    editor:SourceEditor;

    constructor(public session:Cats.Session, pos?:Cats.Position) {
        super(session.shortName);
        this.setShowCloseButton(true);
        this.setLayout(new qx.ui.layout.Canvas());
        this.setPadding(0, 0, 0, 0);
        this.setMargin(0, 0, 0, 0);
        this.setDecorator(null);
        this.editor = new SourceEditor(session,pos);
        this.add(this.editor, { edge: 0 });
        this.createContextMenu();
        this.createToolTip();
        
        this.setChanged(false);
    }  
    
    
    private createToolTip() {
        var button:qx.ui.tabview.TabButton = (<any>this).getButton();
        var tooltip = new qx.ui.tooltip.ToolTip(this.session.name);
        button.setToolTip(tooltip);
    }
    
     private createContextMenu() {
        var button:qx.ui.tabview.TabButton = (<any>this).getButton();
        var menu = new qx.ui.menu.Menu();
        var item1 = new qx.ui.menu.Button("Close");
        item1.addListener("execute", () => {
            IDE.sessionTabView.remove(this);
        });

        var item2 = new qx.ui.menu.Button("Close other");
        var item3 = new qx.ui.menu.Button("Close all");
        menu.add(item1);
        menu.add(item2);
        menu.add(item3);
        button.setContextMenu(menu);
    }

    setChanged(changed:boolean) {
        
        var iconPath = "./resource/qx/icon/Tango/16/";  
        
        if (changed) {
            this.setIcon(iconPath + "status/dialog-information.png");
        } else {
            this.setIcon("");
        }
    }

}

class SessionTabView extends qx.ui.tabview.TabView {

    constructor() {
        super();
        this.setPadding(0, 0, 0, 0);
        this.setContentPadding(1, 0, 0, 0);
    }

    addSession(session, pos?:Cats.Position) {
          var page = new SessionPage(session, pos);
          this.add(page);
          this.setSelection([page]);
    }
    
    getSessions():Cats.Session[] {
        var result = [];
        this.getChildren().forEach((child:SessionPage) =>{
            result.push(child.session);
        });
        return result;
    }
    
    /**
      * Set the right margin of the IDE
       * @param margin number of columns
        */
    setRightMargin(margin: number) {
            // IDE.config.rightMargin = margin;
            // IDE.mainEditor.aceEditor.setPrintMarginColumn(margin);
    }

    setFontSize(size) {
        this.getChildren().forEach((child:SessionPage)=>{
           child.editor.setFontSize(size); 
        });
    }
    
    navigateTo(session, pos?:Ace.Position) {
        var page = this.getPageBySession(session);
        this.setSelection([page]);
        if (pos) page.editor.moveToPosition(pos);
    }

    getPageBySession(session):SessionPage {
        var pages = this.getChildren();
        for (var i=0;i<pages.length;i++) {
            var page = <SessionPage>pages[i];
            if (page.session === session) return page;
        }
        return null;
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
