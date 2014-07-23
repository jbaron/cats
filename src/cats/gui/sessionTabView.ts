
class SessionPage extends qx.ui.tabview.Page {
 
    editor:SourceEditor;
 
    constructor(public session:Cats.Session) {
        super(session.shortName);
        this.setShowCloseButton(true);
        this.setLayout(new qx.ui.layout.Canvas());
        this.setPadding(0, 0, 0, 0);
        this.setMargin(0, 0, 0, 0);
        this.setDecorator(null);
        this.editor = new SourceEditor(<Cats.AceSession>session);
        this.add(this.editor, { edge: 0 });
        this.createContextMenu();
        
        this.setChanged(false);
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

    addSession(session) {
          this.add(new SessionPage(session));
    }
    
    navigateTo(session, pos?:Ace.Position) {
        var page = this.getPageBySession(session);
        this.setSelection([page]);
        if (pos) {
            setTimeout(() => {
                page.editor.moveToPosition(pos);
            }, 0);
        }
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
