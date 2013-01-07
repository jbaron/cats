// This module contains all the global commands pertaining to the edit functionality
// Much of it is already provided by the Ace editor and just wraps this functionality

module Cats.Commands {

    // Just wrap the Ace command.
    function editorCommand(commandName: string) {
        return function() { Cats.mainEditor.aceEditor.execCommand(commandName); }
    }

    export class EditorCommands {
        static init(registry) {
            registry("edit.undo", editorCommand("undo"));
            registry("edit.redo", editorCommand("redo"));
        }

    }


}