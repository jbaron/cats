// This module contains all the global commands pertaining to the help functionality
module Cats.Commands {

    function showShortcuts() {
        window.open('keyboard_shortcuts.html', '_blank');
    }

    function showAbout() {
        alert("Code Assisitant for TypeScript\nversion 0.6.8\nCreated by JBaron");
    }

    function showDevTools() {        
        gui.Window.get().showDevTools();
    }

    function showProcess() {
            var mem = process.memoryUsage();
            var display = "memory used: " + mem.heapUsed;
            display += "\nmemory total: " + mem.heapTotal;
            display += "\nplatform: " + process.platform;
            display += "\nworking directory: " + process.cwd();
            alert(display);
    }

    export class HelpCommands {
        static init(registry) {
            registry({name:CMDS.help_about, label:"About", command:showAbout});
            registry({name:CMDS.help_devTools, label:"Developer Tools", command:showDevTools});
            registry({name:CMDS.help_shortcuts, label:"Shortcuts", command:showShortcuts});
            registry({name:CMDS.help_processInfo, label:"Process Info", command: showProcess});
        }

    }

}