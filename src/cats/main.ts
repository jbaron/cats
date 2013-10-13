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

///<reference path='../typings/cats.d.ts'/>
///<reference path='../typings/typescript.d.ts'/>
///<reference path='../typings/node-webkit.d.ts'/>

var PATH = require("path");
var GUI = require('nw.gui');

///<reference path='os.ts'/>
///<reference path='observable.ts'/>
///<reference path='ide.ts'/>
///<reference path='layout.ts'/>


///<reference path='commands/commander.ts'/>
///<reference path='menu/menubar.ts'/>
///<reference path='menu/filecontextmenu.ts'/>
///<reference path='menu/tabcontextmenu.ts'/>
///<reference path='project.ts'/>
///<reference path='ui/tabbar.ts'/>
///<reference path='ui/elemtabadapter.ts'/>
///<reference path='editor.ts'/>

///<reference path='ui/grid.ts'/>

var IDE:Cats.Ide;

/**
 * This is the file that is included in the index.html and 
 * bootstraps the starting of CATS.
 */
 
/**
 * Main module of the CATS IDE
 */  
module Cats {

    /**
     * Get a parameter from the URL
     */ 
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

    /**
     * Determine which project(s) we should load during 
     * startup.
     */ 
    function determineProject():string {
        var projectName = getParameterByName("project");
        if (!projectName) {
            var args = GUI.App.argv;
            if (args && (args.length > 0)) projectName = args[0];
        }
        return projectName;
    }
   
    // Catch unhandled expections so they don't showup in the IDE.
    process.on('uncaughtException', function (err) {
        console.error("Uncaught exception occured: " + err);
        console.error(err.stack);
        alert(err);
    });
   
    // Instantiate the global ide   
    IDE = new Ide();     

    var prjName = determineProject();
    if (prjName) {
        IDE.addProject(new Project(prjName));
    } else {
        IDE.loadDefaultProjects();
    }
    
    IDE.init();
    
    // Catch the close of the windows in order to save any unsaved changes
    var win = GUI.Window.get();
    win.on("close", function() {
        Cats.Commands.get(Cats.Commands.CMDS.ide_quit).command();
    });

}
