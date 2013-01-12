///<reference path='bootstrap.ts'/>
///<reference path='ide.ts'/>
///<reference path='menu/menubar.ts'/>
///<reference path='menu/filecontextmenu.ts'/>
///<reference path='project.ts'/>
///<reference path='ui/tabbar.ts'/>
///<reference path='ui/elemtabadapter.ts'/>
///<reference path='editor.ts'/>
///<reference path='../typings/node-webkit.d.ts'/>
///<reference path='ui/grid.ts'/>
///<reference path='../typings/typescript.d.ts'/>

module Cats {
    
    export var mainEditor: Editor;
    export var project: Project;
   
    function getParameterByName(name) {
        name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
        var regexS = "[\\?&]" + name + "=([^&#]*)";
        var regex = new RegExp(regexS);
        var results = regex.exec(window.location.search);
        if (results == null)
            return "";
        else
            return decodeURIComponent(results[1].replace(/\+/g, " "));
    }

    
    var projectName = getParameterByName("project");
    if (! projectName) {
        var args = gui.App.argv;
        if (args && (args.length > 0)) 
            projectName = args[0];
        else
            projectName = path.join(process.cwd(), "samples","greeter");            
    } 
    
    project = new Project(projectName);
    mainEditor = new Editor(IDE.editor);

    export var tabbar;
    function initTabBar() {

        tabbar = new UI.Tabbar();
        tabbar.setOptions(mainEditor.sessions);
        tabbar.setAspect("name", (session: Session) => { return path.basename(session.name) });
        tabbar.setAspect("selected", (session: Session) => { return session === Cats.mainEditor.activeSession });
        tabbar.setAspect("longname", (session: Session) => { return session.name });
        tabbar.setAspect("changed", (session: Session) => { return session.changed });
        tabbar.onselect = (session) => Cats.project.editFile(session.name); //TODO Fix to use real session

        tabbar.appendTo(IDE.sessionBar);
    }

    function initNavBar() {
        var navbar = new UI.Tabbar();
        
        var t = new UI.ElemTabAdapter(navbar,[IDE.fileNavigation,IDE.outlineNavigation], IDE.fileNavigation);
        t.setAspect(IDE.fileNavigation,"decorator","icon-files");
        t.setAspect(IDE.outlineNavigation,"decorator","icon-outline");
        navbar.appendTo(IDE.navigationBar);
        return;
 
        // new UI.ElemTabAdapter(navbar,[IDE.fileNavigation,IDE.])
        navbar.setOptions([
            { name: "Files", 
                selected: true, 
                decorator: "icon-files", 
                elem: IDE.fileNavigation
            },
        { 
            name: "Outline", 
            selected: false, 
            decorator: "icon-outline", 
            elem: IDE.outlineNavigation
        }
        ]);
        navbar.appendTo(IDE.navigationBar);
        navbar.onselect= (item) => {
            document.getElementById("filetree").style.display = "none";
            document.getElementById("outlinenav").style.display = "none"; 
            item.elem.style.display = "block";
        };
    }

    function initInfoBar() {
        var infobar = new UI.Tabbar();
        infobar.setOptions([
            { name: "Task List", selected: true, decorator: "icon-tasks" }
        ]);
        infobar.appendTo(IDE.taskBar);
    }


    function initResultBar() {
        var resultbar = new UI.Tabbar();
        var t = new UI.ElemTabAdapter(resultbar,[IDE.compilationResult,IDE.searchResult],IDE.compilationResult);
        t.setAspect(IDE.compilationResult,"decorator","icon-errors");
        t.setAspect(IDE.searchResult,"decorator","icon-search");
        resultbar.appendTo(IDE.resultBar);
        return;
        
        var resultbaroptions = [{
            name: "Errors",
            selected: true,
            decorator: "icon-errors",
            element: document.getElementById("errorresults")
        }, {
            name: "Search",
            selected: false,
            decorator: "icon-search",
            element: document.getElementById("searchresults")
        }
        ];
        resultbar.setOptions(resultbaroptions);
        resultbar.setAspect("selected", function(data, name) {
            if (data.selected) {
                data.element.style.display = "block";
                return true;
            } else {
                data.element.style.display = "none";
                return false;
            }
        });
        resultbar.onselect = (option) => {
            resultbaroptions.forEach((o) => o.selected = false);
            option.selected = true;
            resultbar.refresh();
        };
        resultbar.appendTo(IDE.resultBar);
    }


    Cats.Menu.createMenuBar();
    initTabBar();
    initNavBar();
    initInfoBar();    
    initResultBar();

   
     
        var win = gui.Window.get();
        win.on("close", function() {
        mainEditor.closeAllSessions();
        if (win != null) win.close(true);
        this.close(true);
        });




}
