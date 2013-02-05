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
var IDE:Cats.Ide; 

declare var layoutIDE;
///<reference path='eventemitter.ts'/>
///<reference path='observable.ts'/>
///<reference path='ide.ts'/>
///<reference path='../typings/cats.d.ts'/>
///<reference path='eventbus.ts'/>
///<reference path='commands/commander.ts'/>
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

    function determineProject():string {
        var projectName = getParameterByName("project");
        if (!projectName) {
            var args = GUI.App.argv;
            if (args && (args.length > 0))
                projectName = args[0];
            else
                projectName = PATH.join(process.cwd(), "samples", "greeter");
        }
        return projectName;
    }
   

    function initTabBar() {

        IDE.tabbar = new UI.Tabbar();        
        IDE.tabbar.setAspect("name", (session: Session) => { return PATH.basename(session.name) });
        IDE.tabbar.setAspect("selected", (session: Session) => { return session === IDE.mainEditor.activeSession });
        IDE.tabbar.setAspect("longname", (session: Session) => { return session.name });
        IDE.tabbar.setAspect("changed", (session: Session) => { return session.changed });
        IDE.tabbar.onselect = (session) => IDE.mainEditor.setSession(session);
        IDE.tabbar.appendTo(IDE.sessionBar);
        IDE.on("sessions", (sessions) => {IDE.tabbar.setOptions(sessions)} );
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

      
    function initResultBar() {
        var t  = new UI.ElemTabAdapter(IDE.resultbar, [IDE.compilationResult, IDE.searchResult], IDE.compilationResult);
        t.setAspect(IDE.compilationResult, "decorator", "icon-errors");
        t.setAspect(IDE.searchResult, "decorator", "icon-search");
        IDE.resultbar.appendTo(IDE.resultbarElem);        
    }


    IDE = new Ide();     
    IDE.mainEditor = new TextEditor(IDE.editor);
    // mainEditor.on("activeSession",()=>{console.log("active session changed")})
    IDE.project = new Project(determineProject());
    Cats.Commands.init();
    Cats.Menu.createMenuBar();
    IDE.initViews();
    initTabBar();
    initNavBar();
    initInfoBar();
    initResultBar();
    
    Cats.Menu.initFileContextMenu();
    IDE.mainEditor.init();
    
    setTimeout(() => {
        IDE.mainEditor.setTheme("cats");
    }, 2000);

    var win = GUI.Window.get();
    win.on("close", function() {
        Cats.Commands.get(Cats.Commands.CMDS.ide_quit).command();
    });

    layoutIDE(); 

}
