/**
 * Layout the different parts of the IDE.
 */ 
class Layout {
    
        constructor(private rootDoc:qx.ui.container.Composite) {
        }
    
        /**
         * Use better OO encaps
         */ 
        layout(ide:Cats.Ide) {
            // container layout

            var layout = new qx.ui.layout.VBox();
    
            // main container
            var mainContainer = new qx.ui.container.Composite(layout);
            this.rootDoc.add(mainContainer, { edge: 0 });
    
            ide.toolBar = new ToolBar();
    
            mainContainer.add(ide.toolBar, { flex: 0 });
    
            // mainsplit, contains the editor splitpane and the info splitpane
            var mainsplit = new qx.ui.splitpane.Pane("horizontal");
            // mainsplit.set({ decorator: null });
            
            
            // ********************* Navigator Pane ********************
            var navigatorPane = new TabView(["files", "bookmarks"]);
            ide.bookmarks = new ResultTable(["Bookmark"]);
            ide.fileNavigator = new FileNavigator();
            navigatorPane.getPage("files").add(ide.fileNavigator, { edge: 0 });
            navigatorPane.getPage("bookmarks").add(ide.bookmarks, { edge: 0 });
            
            mainsplit.add(navigatorPane, 1); // navigator
    
            var editorSplit = new qx.ui.splitpane.Pane("vertical");
            // editorSplit.setDecorator(null);
    
            var infoSplit = new qx.ui.splitpane.Pane("horizontal");
            ide.sessionTabView = new SessionTabView();
            // infoSplit.set({ decorator: null });
            infoSplit.add(ide.sessionTabView, 4); // editor
           
            ide.infoPane = new TabView(["outline", "properties"]);
            ide.outlineNavigator = new OutlineNavigator();
            ide.infoPane.getChildren()[0].add(ide.outlineNavigator , { edge: 0 });
            infoSplit.add(ide.infoPane, 1); // todo
        
            editorSplit.add(infoSplit, 4);
    
            // **********************  Problem Pane ***************************
            ide.problemPane = new TabView(["problems", "search", "console", "process"]);
            editorSplit.add(ide.problemPane, 2); // Info
    
            ide.console = new ConsoleLog();
            ide.problemResult = new ResultTable();
            ide.searchResult = new ResultTable();
            ide.processTable = new ProcessTable();
            ide.problemPane.getChildren()[0].add(ide.problemResult, { edge: 0 });
            ide.problemPane.getChildren()[1].add(ide.searchResult, { edge: 0 });
            ide.problemPane.getChildren()[2].add(ide.console, { edge: 0 });
            ide.problemPane.getChildren()[3].add(ide.processTable, { edge: 0 });
    
            ide.problemPane.selectPage("console");
            // this.problemPane.setSelection([this.problemPane.getChildren()[2]]);
    
            mainsplit.add(editorSplit, 4); // main area
    
            mainContainer.add(mainsplit, { flex: 1 });
    
            // ************************ Status Bar *****************************
            ide.statusBar = new StatusBar();
            mainContainer.add(ide.statusBar, { flex: 0 });
        }

    
}