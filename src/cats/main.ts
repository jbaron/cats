///<reference path='menubar.ts'/>
///<reference path='filecontextmenu.ts'/>
///<reference path='project.ts'/>
///<reference path='ui/tabbar.ts'/>
///<reference path='editor.ts'/>

module cats {

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

    function getParamByName(name: string) {
        var querystring = require("querystring");
        var params = querystring.parse(window.location.search);
        return params[name];
    }

    var defaultProject = "./samples" + path.sep + "greeter";

    project = new Project(getParameterByName("project") || defaultProject);
    mainEditor = new Editor(document.getElementById("editor"));

    Menu.createMenuBar();

    var fileTree = new ui.FileTree(project.projectDir);
    fileTree.appendTo(document.getElementById("filetree"));
    fileTree.onselect = (filePath) => {
        project.editFile(filePath);
    };

    export var tabbar;
    tabbar = new ui.Tabbar();
    tabbar.setOptions(mainEditor.sessions);
    tabbar.setAspect("name", (session: Session) => { return path.basename(session.name) });
    tabbar.setAspect("selected", (session: Session) => { return session === cats.mainEditor.activeSession });
    tabbar.setAspect("longname", (session: Session) => { return session.name });
    tabbar.setAspect("changed", (session: Session) => { return session.changed });
    tabbar.onselect = (session) => cats.project.editFile(session.name); //TODO Fix to use real session

    tabbar.appendTo(document.getElementById("sessionbar"));


    var navbar = new ui.Tabbar();
    navbar.setOptions([{
        name: "Files",
        selected: true,
    },
    {
        name: "Outline",
        selected: false
        
    }]);
    navbar.appendTo(document.getElementById("navigationbar"));

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
