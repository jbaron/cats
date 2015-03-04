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


/**
 * Main module of the CATS IDE
 */
module Cats {

    // Variable used everywhere for accessing the singleton IDE instance
    export var IDE: Cats.Ide;

    /**
     * Get a parameter from the URL. This is used when a new project is opened from within
     * the IDE and the project name is passed s a parameter.
     */
    function getParameterByName(val:string) {
        var items = location.search.substr(1).split("&");
        for (var index = 0; index < items.length; index++) {
            var tmp = items[index].split("=");
            if (tmp[0] === val) return decodeURIComponent(tmp[1]);
        }
    }

    /**
     * Determine which project(s) we should load during 
     * startup. This is used when the IDE is started from the command line
     */
    function determineProject(args:string[]): string {
        var projectName = getParameterByName("project");
        if (!projectName) {
            var i = args.indexOf("--project");
            if (i > -1) projectName = args[i + 1];
        }
        return projectName;
    }



    /**
     * This is the functions that kicks it all of. When Qooxdoo is loaded it will 
     * call this main to start the application. 
     */
    function main(app: qx.application.Standalone) {
        var GUI = require('nw.gui');

        var args:string[] = GUI.App.argv;
        if (args.indexOf("--debug") === -1) {
            console.info = function() { /* NOP */};
            console.debug = function() { /* NOP */};
        } 
        
        IDE = new Cats.Ide();
        if (args.indexOf("--debug") > -1) {
            IDE.debug = true;
        }

       IDE.init(<qx.ui.container.Composite>app.getRoot());

        var prjDir = determineProject(args);
        if (prjDir) {
            IDE.addProject(prjDir);
        } else {
            if (args.indexOf("--restore") > -1) IDE.restorePreviousProjects();
        }
    }

    // Catch unhandled expections so they don't stop the process.
    process.on("uncaughtException", function(err: any) {
        console.error("Uncaught exception occured: " + err);
        console.error(err.stack);
        if (IDE.console) IDE.console.error(err.stack);
    });

    // Register the main method that once Qooxdoo is loaded is called
    qx.registry.registerMainMethod(main);
    
}



