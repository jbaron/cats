// This module contains all the global commands pertaining to the help functionality
module Cats.Commands {

    function showShortcuts() {
        window.open('static/html/keyboard_shortcuts.html', '_blank');
    }

    function showAbout() {
        alert("Code Assisitant for TypeScript\nversion 0.6.8\nCreated by JBaron");
    }

    function showDevTools() {        
        gui.Window.get().showDevTools();
    }


    export class HelpCommands {
        static init(registry) {
            registry("help.about", showAbout);
        }

    }

}