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
    // const child_process = require('child_process');
    
    export function getNWWindow() {
        if (typeof nw != "undefined") {
            return nw["Window"].get();
        } else {
            var GUI = require('nw.gui');
            return GUI.Window.get();
        }
    }
    
    export function getNWGui() : any {
        if (typeof nw != "undefined") {
            return nw;
        } else {
            global.nw = require( 'nw.gui' );
            return nw;
        }
    }

    var localeManager = qx.locale.Manager.getInstance();

    export function translate2(msg:string, options=[]) {
        return localeManager.translate(msg,[])
    }

    export function translate(msg:string) {
        return qx.locale.Manager.tr(msg);
    }

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

 
    function startWebServer() {
        var http = require("http");
        var PORT = 8080;
        var server = http.createServer((req,res)=>{
                 var content = OS.File.readTextFile(IDE.rootDir + "/public/manifest.json");
                 res.end(content);
        });
        server.listen(PORT, function(){
             //Callback triggered when server is successfully listening. Hurray!
            console.log("Server listening on: http://localhost:%s", PORT);
        });
    }
 
 
    /**
     * This is the functions that kicks it all of. When Qooxdoo is loaded it will 
     * call this main to start the application. 
     */
    function main(app: qx.application.Standalone) {
        
        const GUI = getNWGui(); // require('nw.gui');

        const args:string[] = GUI.App.argv;
        if (args.indexOf("--debug") === -1) {
            console.info = function() { /* NOP */};
            console.debug = function() { /* NOP */};
        } 
        
        IDE = new Cats.Ide();
        IDE.init(<qx.ui.container.Composite>app.getRoot());
        
        
        if (args.indexOf("--debug") > -1) {
            IDE.debug = true;
        }

        if (args.indexOf("--project") > -1) {
           let dir = args[args.indexOf("--project") + 1];
           IDE.setDirectory(dir);
        }

        if (args.indexOf("--restore") > -1) {
            IDE.restorePreviousProjects();
        }
        
        startWebServer();
    }


    // Catch unhandled expections so they don't stop the process.
    process.on("uncaughtException", function(err: any) {
            console.error("Uncaught exception occured: " + err);
            console.error(err.stack);
            if (IDE && IDE.console) IDE.console.error(err.stack);
    });

   /*    
   var worker_process = child_process.fork("tsserver.js", []);	
   worker_process.on('close', function (code) {
      console.log('child process exited with code ' + code);
   });
    */

    // Register the main method that once Qooxdoo is loaded is called
    qx.registry.registerMainMethod(main);
    
}



