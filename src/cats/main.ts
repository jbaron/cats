///<reference path='menu/menubar.ts'/>
///<reference path='menu/filecontextmenu.ts'/>
///<reference path='ui/autocompleteview.ts'/>
///<reference path='project.ts'/>
///<reference path='ui/tabbar.ts'/>
///<reference path='editor.ts'/>
///<reference path='../typings/node-webkit.d.ts'/>
///<reference path='ui/grid.ts'/>
///<reference path='project.ts'/>
///<reference path='../typings/typescript.d.ts'/>

module Cats {

    export var mainEditor: Editor;
    export var project: Project;
    import fs = module("fs");
    import path = module("path");

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

    var defaultProject = "./samples" + path.sep + "greeter";

    project = new Project(getParameterByName("project") || defaultProject);
    mainEditor = new Editor(document.getElementById("editor"));

    function initFileTree() {
        var fileTree = new UI.FileTree(project.projectDir);
        fileTree.appendTo(document.getElementById("filetree"));
        fileTree.onselect = (filePath) => {
            project.editFile(filePath);
        };
    }


    export var tabbar;
    function initTabBar() {

        tabbar = new UI.Tabbar();
        tabbar.setOptions(mainEditor.sessions);
        tabbar.setAspect("name", (session: Session) => { return path.basename(session.name) });
        tabbar.setAspect("selected", (session: Session) => { return session === Cats.mainEditor.activeSession });
        tabbar.setAspect("longname", (session: Session) => { return session.name });
        tabbar.setAspect("changed", (session: Session) => { return session.changed });
        tabbar.onselect = (session) => Cats.project.editFile(session.name); //TODO Fix to use real session

        tabbar.appendTo(document.getElementById("sessionbar"));
    }

    function initNavBar() {
        var navbar = new UI.Tabbar();
        navbar.setOptions([
        { name: "Files", selected: true, decorator: "icon-files" },
        { name: "Outline", selected: false, decorator: "icon-outline" }
        ]);
        navbar.appendTo(document.getElementById("navigationbar"));
    }

    function initInfoBar() {
        var infobar = new UI.Tabbar();
        infobar.setOptions([
            { name: "Task List", selected: true, decorator: "icon-tasks" }
        ]);
        infobar.appendTo(document.getElementById("infobar"));
    }

    function initResultBar() {
        var resultbar = new UI.Tabbar();
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
        resultbar.appendTo(document.getElementById("resultbar"));
    }

    Cats.Menu.createMenuBar();
    initFileTree();
    initTabBar();
    initNavBar();
    initInfoBar();    
    initResultBar();

    $(document).ready(function() {
        $('body').layout({
            applyDemoStyles: false,
            spacing_open: 8
        });
    });

    var gui = require('nw.gui');
    var win = gui.Window.get();

    win.on("close", function() {
        mainEditor.closeAllSessions();
        if (win != null)
            win.close(true);
        this.close(true);
    });

}
