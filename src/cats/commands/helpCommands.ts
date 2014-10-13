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


// This module contains all the global commands pertaining to the help functionality
module Cats.Commands {

    /**
     * Show the available keyboard shortcuts
     */ 
    function showShortcuts() {
         var w = window.open("resource/keyboard_shortcuts.html", "_blank", "width=800; height=595");
    }

    /**
     * Show the version of CATS
     */ 
    function showAbout() {
        var packageFile = OS.File.join(IDE.catsHomeDir, "package.json");
        var package = JSON.parse(OS.File.readTextFile(packageFile));
        var version = package.version; 
        alert("Code Assisitant for TypeScript, version " + version + "\nCreated by JBaron\n");
    }

    /**
     * Open the webkit developers tools for debugging etc.
     */ 
    function showDevTools() {        
        GUI.Window.get().showDevTools();
    }

    /**
     * Show process info like current memory usage
     */ 
    function showProcess() {
            var mem = process.memoryUsage();
            var display = "memory used: " + mem.heapUsed;
            display += "\nmemory total: " + mem.heapTotal;
            display += "\nplatform: " + process.platform;
            display += "\nworking directory: " + process.cwd();
            alert(display);
    }

    export class HelpCommands {
        static init(registry: (cmd: Command, fn:Function) => void) {
            registry(CMDS.help_about, showAbout);
            registry(CMDS.help_devTools,showDevTools);
            registry(CMDS.help_shortcuts, showShortcuts);
            registry(CMDS.help_processInfo, showProcess);
        }

    }

}