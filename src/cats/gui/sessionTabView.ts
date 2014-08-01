
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
        item1.addListener("execute", () => {
            IDE.sessionTabView.remove(this);
        });

        var item2 = new qx.ui.menu.Button("Close other");
        item2.addListener("execute" , () =>{
           var pages = <SessionPage[]>IDE.sessionTabView.getChildren().concat();
           pages.forEach((page) => {
               if (page !== this) IDE.sessionTabView.remove(page);
           }); 
        });
        
        var item3 = new qx.ui.menu.Button("Close all");
         item3.addListener("execute" , () =>{
           var pages = <SessionPage[]>IDE.sessionTabView.getChildren().concat();
           pages.forEach((page) => { IDE.sessionTabView.remove(page); }); 
        });
        
        
        menu.add(item1);
        menu.add(item2);
        menu.add(item3);
        button.setContextMenu(menu);
    }

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
        this.setContentPadding(1, 0, 0, 0);
    }

    addSession(session, pos?:Cats.Position) {
          var page = new SessionPage(session, pos);
          // page.exclude();
          this.add(page);
          page.fadeIn(500);
          this.setSelection([page]);
    }
    
    getSessions():Cats.Session[] {
        var result = [];
        this.getChildren().forEach((child:SessionPage) =>{
            result.push(child.session);
        });
        return result;
    }
    
    getActiveSession() {
        var page = <SessionPage>this.getSelection()[0];
        if (! page) return null;
        return page.session;
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
    
    getActivePage() {
        return <SessionPage>this.getSelection()[0];
    }
    

    select(session:Cats.Session) {
        var page = this.getPageBySession(session);
        if (page) this.setSelection([page]);
    }

}
