// This module contains all the global commands pertaining to the edit functionality
// Much of it is already provided by the Ace editor and just wraps this functionality

module Cats.Commands {


    // Just wrap the Ace command.
    function editorCommand(commandName: string) {
        return function() { Cats.mainEditor.aceEditor.execCommand(commandName); }
    }


 // TODO i18n
    function getShortcut(commandName: string) {
        var platform = Cats.mainEditor.aceEditor.commands.platform;
        var command = Cats.mainEditor.aceEditor.commands.byName[commandName];

        if (command && command.bindKey) {
            var key = command.bindKey[platform];
            return key;
        }
        
        return null;
    }


    // TODO i18n
    function getLabelForCommand(commandName: string) {
        var label = commandName[0].toUpperCase() + commandName.slice(1);
        var platform = Cats.mainEditor.aceEditor.commands.platform;
        var command = Cats.mainEditor.aceEditor.commands.byName[commandName];

        var tabs = 5 - Math.floor((label.length / 4) - 0.01);
        label = label + "\t\t\t\t\t\t".substring(0, tabs);
        if (command && command.bindKey) {
            var key = command.bindKey[platform];
            if (key) label += key;
        }
        return label;
    }


    var icons = {
        undo: "undo_edit.gif",
        redo: "redo_edit.gif",
        copy: "copy_edit.gif",
        paste: "paste_edit.gif",
        cut: "cut_edit.gif",
        indent: "shift_r_edit.gif",
        outdent: "shift_l_edit.gif"
    }

    function editorCommand2(commandName: string) {
        var label = this.getLabelForCommand(commandName);
        var item = new gui.MenuItem({
            label: label,
            click: function() { Cats.mainEditor.aceEditor.execCommand(commandName); }
        });
        var iconName = this.icons[commandName];
        if (iconName) {
            item.icon = "static/img/" + iconName;
        }
        return item;
    }


    export class EditorCommands {
        static init(registry) {
            registry({ name: CMDS.edit_undo, label: "undo", command: editorCommand("undo") });
            
            registry("edit.undo", editorCommand("undo"));
            registry("edit.redo", editorCommand("redo"));
            
            
            
            
        }

    }


}