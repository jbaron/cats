//
// Copyright (c) JBaron.  All rights reserved.
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//

var PATH=require("path");
var FS=require("fs");
var GUI = require('nw.gui');

///<reference path='../typings/cats.d.ts'/>
///<reference path='ui/widget.ts'/>
///<reference path='eventbus.ts'/>
///<reference path='commands/commander.ts'/>
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
    export var tabbar: UI.Tabbar;

    function getParameterByName(name):string {
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
    if (!projectName) {
        var args = GUI.App.argv;
        if (args && (args.length > 0))
            projectName = args[0];
        else
            projectName = PATH.join(process.cwd(), "samples", "greeter");
    }

    project = new Project(projectName);
    mainEditor = new Editor(IDE.editor);


    function initTabBar() {

        tabbar = new UI.Tabbar();
        tabbar.setOptions(mainEditor.sessions);
        tabbar.setAspect("name", (session: Session) => { return PATH.basename(session.name) });
        tabbar.setAspect("selected", (session: Session) => { return session === Cats.mainEditor.activeSession });
        tabbar.setAspect("longname", (session: Session) => { return session.name });
        tabbar.setAspect("changed", (session: Session) => { return session.changed });
        // tabbar.onselect = (session) => Cats.project.editFile(session.name); //TODO Fix to use real session
        tabbar.onselect = (session) => Cats.mainEditor.setSession(session); //TODO Fix to use real session
        tabbar.appendTo(IDE.sessionBar);
    }

    function initNavBar() {
        var navbar = new UI.Tabbar();

        var t = new UI.ElemTabAdapter(navbar, [IDE.fileNavigation, IDE.outlineNavigation], IDE.fileNavigation);
        t.setAspect(IDE.fileNavigation, "decorator", "icon-files");
        t.setAspect(IDE.outlineNavigation, "decorator", "icon-outline");
        navbar.appendTo(IDE.navigationBar);
    }

    function initInfoBar() {
        var infobar = new UI.Tabbar();
        infobar.setOptions([
            { name: "Task List", selected: true, decorator: "icon-tasks" }
        ]);
        infobar.appendTo(IDE.taskBar);
    }

    function initToolBar() {
        var t = IDE.toolBar;
        var cmd = Cats.Commands.getAllCommands();
        cmd.forEach((cmd) => {
            if (cmd.icon) {
                var button = <HTMLElement>document.createElement("button");
                button.style.backgroundImage = "url(../" + cmd.icon + ")";
                button.title = cmd.label;
                button.onclick = <any>cmd.command;
                t.appendChild(button);
            }
        });
    }

    interface OutlineTreeElement {
        name: string;
        decorator: string;
        qualifyer: string;
        kind: string;
        isFolder?: bool;
    }

    function navigateToItemHasChildren(name:string,kind:string,data:NavigateToItem[]):bool {
        for (var i=0;i<data.length;i++) {
            var item = data[i];
            if ((item.containerName === name) && (item.containerKind === kind)) return true;
        }
        return false;
    }

    function handleOutlineEvent(session:Session) {
        var mode = "getScriptLexicalStructure";
        // var mode = "getOutliningRegions";
        // session.project.iSense.perform("getNavigateToItems","Greeter", (err, data:NavigateToItem[]) => {
        session.project.iSense.perform(mode, session.name, (err, data:NavigateToItem[]) => {        
            Cats.IDE.outlineNavigation.innerHTML = "";
            var outliner = new Cats.UI.TreeView();
            outliner.setAspect("children", (parent: OutlineTreeElement): OutlineTreeElement[] => {
                var name = parent ? parent.qualifyer : "";
                var kind = parent ? parent.kind : "";
                var result: OutlineTreeElement[] = [];
                for (var i = 0; i < data.length; i++) {
                    var o = data[i];
                    if ((o.containerKind === kind) && (o.containerName === name)) {
                        var fullName = o.name;
                        if (name) fullName = name + "." + fullName;
                        var item:OutlineTreeElement = {
                            name: o.name,
                            decorator: "icon-" + o.kind,
                            qualifyer: fullName,
                            kind: o.kind,
                            outline: o
                        };
                        
                        item.isFolder= navigateToItemHasChildren(fullName,o.kind,data); // !(o.kind === "method" || o.kind === "constructor" || o.kind === "function")
                        
                        result.push(item);
                    }
                }
                return result;
            });
            outliner.appendTo(Cats.IDE.outlineNavigation);
            outliner.onselect = (value) => {
                var data:NavigateToItem = value.outline;
                Cats.project.editFile(data.unitName, null, { row: data.range.start.row, column: data.range.start.column });
            };

            outliner.refresh();
        });

    }

    function initOutlineView() {
        EventBus.on(Event.activeSessionChanged, (session:Session) => {
            if (session && (session.mode === "typescript"))
                handleOutlineEvent(session);
            else
                Cats.IDE.outlineNavigation.innerHTML = "";
        });

    }

    function initStatusBar() {
        var div = document.getElementById("sessionmode");
        EventBus.on(Event.editModeChanged, (mode) => {
            div.innerText = PATH.basename(mode);
        });
    }

    export var resultbar = new UI.Tabbar();
    function initResultBar() {
        var t  = new UI.ElemTabAdapter(resultbar, [IDE.compilationResult, IDE.searchResult], IDE.compilationResult);
        t.setAspect(IDE.compilationResult, "decorator", "icon-errors");
        t.setAspect(IDE.searchResult, "decorator", "icon-search");
        resultbar.appendTo(IDE.resultBar);        
    }


    Cats.Commands.init();
    Cats.Menu.createMenuBar();
    initTabBar();
    initNavBar();
    initInfoBar();
    initResultBar();
    initToolBar();
    initStatusBar();
    initOutlineView();
    Cats.Menu.initFileContextMenu();
    mainEditor.init();
    
    setTimeout(() => {
        mainEditor.setTheme("cats");
    }, 2000);

    var win = GUI.Window.get();
    win.on("close", function() {
        Cats.Commands.get(Cats.Commands.CMDS.ide_quit).command();
    });


}
