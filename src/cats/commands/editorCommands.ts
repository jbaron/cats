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

    function getRange(editor):Cats.Range {
        var range:ace.Range = editor.aceEditor.selection.getRange();
        if (range.isEmpty()) return null; 
        return {
            start : range.start,
            end: range.end
        };    
    }

    function formatText() {
      
        var editor = <Gui.SourceEditor>IDE.editorTabView.getActiveEditor();
        if (editor && editor.isTypeScript && editor.isTypeScript()) {
            var range = getRange(editor);
            IDE.project.iSense.getFormattedTextForRange( editor.filePath, range , (err:Error, result:string) => {                    
                if (!err) {
                    editor.setContent(result);
                }
                
            });
        }
        
    }


    function toggleInvisibles() {
        var editor = IDE.editorTabView.getActiveEditor();
        editor.executeCommand("toggleInvisibles");
    }

    
    function editorCommand(commandName:string) {
        return function(...args:Array<any>) {
              var editor = IDE.editorTabView.getActiveEditor();
              editor.executeCommand(commandName);
        };
        
    }
    
    export class EditorCommands {

        static init(registry:(cmd:Command)=>void) {

            var editorCommands: any[] = [
               { id: Cats.Commands.CMDS.edit_undo, label: "Undo" },
               { id: Cats.Commands.CMDS.edit_redo, label: "Redo" },
        
               { id: Cats.Commands.CMDS.edit_indent, label: "Indent"},
               { id: Cats.Commands.CMDS.edit_outdent, label: "Outdent"},
        
               { id: Cats.Commands.CMDS.edit_find, label: "Find", cmd: "find"},
               { id: Cats.Commands.CMDS.edit_findNext, label: "Find Next", cmd: "findnext" },
               { id: Cats.Commands.CMDS.edit_findPrev, label: "Find Previous", cmd: "findprevious" },
               { id: Cats.Commands.CMDS.edit_replace, label: "Find/Replace", cmd: "replace"},
               { id: Cats.Commands.CMDS.edit_replaceAll, label: "Replace All", cmd: "replaceall" },
        
               { id: Cats.Commands.CMDS.edit_toggleComment, label: "Toggle Comment", cmd: "togglecomment"},
               { id: Cats.Commands.CMDS.edit_toggleRecording, label: "Start/Stop Recording", cmd: "togglerecording" },
               { id: Cats.Commands.CMDS.edit_replayMacro, label: "Playback Macro", cmd: "replaymacro"},
               
               { id: Cats.Commands.CMDS.edit_gotoLine, label: "Goto Line", cmd: "gotoline" }
            ];



            editorCommands.forEach((config) => {
                if (!config.cmd) config.cmd = config.label.toLowerCase();
                // var label = addShortcut(config.label, config.cmd);
                var item:Command = {
                    name: config.id,
                    label: config.label,
                    shortcut:null,
                    command: editorCommand(config.cmd),
                };
                // if (config.icon) item.icon = config.icon;
                registry(item);
            });
            
            registry({name:CMDS.edit_toggleInvisibles, label:"Toggle Invisible Characters", command: toggleInvisibles});
            registry({name:CMDS.source_format, label:"Format Code", command: formatText});
            registry({name:CMDS.edit_cut, label:"Cut", command: () => {document.execCommand("cut");}});
            registry({name:CMDS.edit_copy, label:"Copy", command: () => {document.execCommand("copy");}});
            registry({name:CMDS.edit_paste, label:"Paste", command: () => {document.execCommand("paste");}});
            
            
        }

    }




}