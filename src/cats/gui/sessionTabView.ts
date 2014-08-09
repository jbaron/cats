/**
 * This class represents a page holding a session. Typically that means a 
 * editor
 */ 
class SessionPage extends qx.ui.tabview.Page {
 
    editor:SourceEditor;

    constructor(public session:Cats.Session, pos?:Cats.Position) {
        super(session.shortName);
        this.setShowCloseButton(true);
        this.setLayout(new qx.ui.layout.Canvas());
        this.setPadding(0, 0, 0, 0);
        this.setMargin(0, 0, 0, 0);
        // this.setDecorator(null);
        this.editor = new SourceEditor(session,pos);
        this.add(this.editor, { edge: 0 });
        this.createContextMenu();
        this.createToolTip();
        this.getButton().setShow("both");
        
        this.session.on("setChanged", this.setChanged.bind(this));
        this.session.on("errors", this.setHasErrors.bind(this));
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
        item1.addListener("execute", () => { IDE.sessionTabView.close(this);});

        var item2 = new qx.ui.menu.Button("Close other");
        item2.addListener("execute" , () =>{ IDE.sessionTabView.closeOther(this);});
      
        var item3 = new qx.ui.menu.Button("Close all");
        item3.addListener("execute" , () =>{ IDE.sessionTabView.closeAll(); });
        
        menu.add(item1);
        menu.add(item2);
        menu.add(item3);
        button.setContextMenu(menu);
    }

    /**
     * Tell the Page that the editor on it has detected some errors in the code
     */ 
    setHasErrors(errors:any[]) {
        if (errors.length > 0) {
            this.setIcon("./resource/qx/icon/Oxygen/16/status/task-attention.png");
            // this.getButton().setShow("both");
        } else {
            this.resetIcon();
            // this.getButton().setShow("label");
        }
    }

    setChanged(changed:boolean) {
        var button:qx.ui.tabview.TabButton = (<any>this).getButton();
        
        if (changed) {
            button.setLabel("*" + this.session.shortName);
        } else {
            button.setLabel(this.session.shortName);
        }
    }

}

class SessionTabView extends qx.ui.tabview.TabView {

    constructor() {
        super();
        this.setPadding(0, 0, 0, 0);
        this.setContentPadding(0, 0, 0, 0);
    }

    addSession(session, pos?:Cats.Position) {
          var page = new SessionPage(session, pos);
          // page.exclude();
          this.add(page);
          page.fadeIn(500);
          this.setSelection([page]);
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
    close(page=this.getActivePage()) {
        this.remove(page);
    }
    
    /**
     * Close the other pages
     */ 
    closeOther(closePage=this.getActivePage()) {
           var pages = <SessionPage[]>this.getChildren().concat();
           pages.forEach((page) => {
               if (page !== closePage) this.remove(page);
           }); 
    }
    
    /**
     * Get all the open sessions
     */ 
    getSessions():Cats.Session[] {
        var result = [];
        this.getChildren().forEach((child:SessionPage) =>{
            result.push(child.session);
        });
        return result;
    }
    
    /**
     * Get the currently active session
     */ 
    getActiveSession() {
        var page = <SessionPage>this.getSelection()[0];
        if (! page) return null;
        return page.session;
    }
    
    navigateTo(session:Cats.Session, pos?:Ace.Position) {
        var page = this.getPageBySession(session);
        if (page) {
            this.setSelection([page]);
            if (pos) page.editor.moveToPosition(pos);
        }
    }

    /**
     * Find a page by its session
     */ 
    getPageBySession(session: Cats.Session):SessionPage {
        var pages = this.getChildren();
        for (var i=0;i<pages.length;i++) {
            var page = <SessionPage>pages[i];
            if (page.session === session) return page;
        }
        return null;
    }
    
    getActivePage() {
        return <SessionPage>this.getSelection()[0];
    }
    

    select(session:Cats.Session) {
        var page = this.getPageBySession(session);
        if (page) this.setSelection([page]);
    }

}
