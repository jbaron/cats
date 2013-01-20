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


// This module contains all the global commands pertaining to the edit functionality
// Much of it is already provided by the Ace editor and just wraps this functionality

module Cats.Commands {


    // Just wrap the Ace command.
    function editorCommand(commandName: string) {
        return function() { Cats.mainEditor.aceEditor.execCommand(commandName); }
    }


 // Perform code autocompletion
     function autoComplete(cursor: Ace.Position, view: Cats.UI.AutoCompleteView) {
         var session = Cats.mainEditor.activeSession;
                     
            if (session.mode !== "typescript") return;
            session.update();


            session.project.iSense.perform("autoComplete", cursor, session.name, (err, completes) => {
                if (completes != null) view.showCompletions(completes.entries);
            });
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
    function addShortcut(label, commandName: string) {
        var result = label;
        var platform = Cats.mainEditor.aceEditor.commands.platform;
        var command = Cats.mainEditor.aceEditor.commands.byName[commandName];

        if (command && command.bindKey) {
            var tabs = 5 - Math.floor((result.length / 4) - 0.01);
            result = result + "\t\t\t\t\t\t".substring(0, tabs);
            var key = command.bindKey[platform];
            if (key) result += key;
        }
        return result;
    }

    export class EditorCommands {


        static init(registry:(cmd:Command)=>void) {

            var editorCommands: any[] = [
               { id: Cats.Commands.CMDS.edit_undo, label: "Undo", icon: "undo_edit.gif" },
               { id: Cats.Commands.CMDS.edit_redo, label: "Redo", icon: "redo_edit.gif" },
        
               { id: Cats.Commands.CMDS.edit_indent, label: "indent", icon: "shift_r_edit.gif" },
               { id: Cats.Commands.CMDS.edit_outdent, label: "outdent", icon: "shift_l_edit.gif" },
        
               { id: Cats.Commands.CMDS.edit_cut, label: "cut", icon: "cut_edit.gif" },
               { id: Cats.Commands.CMDS.edit_copy, label: "copy", icon: "copy_edit.gif" },
               { id: Cats.Commands.CMDS.edit_paste, label: "paste", icon: "paste_edit.gif" },
        
               { id: Cats.Commands.CMDS.edit_find, label: "Find", cmd: "find" },
               { id: Cats.Commands.CMDS.edit_findNext, label: "Find Next", cmd: "findnext" },
               { id: Cats.Commands.CMDS.edit_findPrev, label: "Find Previous", cmd: "findprevious" },
               { id: Cats.Commands.CMDS.edit_replace, label: "Replace", cmd: "replace" },
               { id: Cats.Commands.CMDS.edit_replaceAll, label: "Replace All", cmd: "replaceall" },
        
               { id: Cats.Commands.CMDS.edit_toggleComment, label: "Toggle Comment", cmd: "togglecomment" },
               { id: Cats.Commands.CMDS.edit_toggleRecording, label: "Start/stop Recording", cmd: "togglerecording" },
               { id: Cats.Commands.CMDS.edit_replayMacro, label: "Playback Macro", cmd: "replaymacro" }
            ];



            editorCommands.forEach((config) => {
                if (!config.cmd) config.cmd = config.label.toLowerCase();
                var label = addShortcut(config.label, config.cmd);
                var item:Command = {
                    name: config.id,
                    label: label,
                    shortcut: getShortcut(config.cmd),
                    command: editorCommand(config.cmd),
                }
                if (config.icon) item.icon = "static/img/" + config.icon;
                registry(item);
            });
        }

    }




}