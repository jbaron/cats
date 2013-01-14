// This module contains all the global commands pertaining to the edit functionality
// Much of it is already provided by the Ace editor and just wraps this functionality

module Cats.Commands {


    function quit() {
        var sure = confirm("Do you really want to quit?");
        if (sure) gui.App.quit();
    }

    function setTheme(theme) {
        Cats.mainEditor.setTheme(theme);
    }


    function setFontSize(size) {
        Cats.mainEditor.aceEditor.setFontSize(size + "px");
    }

    export class IdeCommands {
        static init(registry) {
            registry({ name: CMDS.ide_quit, label: "Quit", command: quit });
            registry({ name: CMDS.ide_theme, label: "Theme", command: setTheme });
            registry({ name: CMDS.ide_fontSize, label: "Font Size", command: setFontSize });
        }

    }


}