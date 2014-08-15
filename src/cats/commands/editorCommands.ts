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

/*
    // Just wrap the Ace command.
    function editorCommand(commandName: string) {
        return function() { IDE.getActiveEditor().execCommand(commandName); }
    }
*/


    function getLintConfig() {
        var fileName = path.join(IDE.catsHomeDir, "static/tslint.json");
        var content = OS.File.readTextFile(fileName);
        return JSON.parse(content);
    }
 
 
    function convertPos(item): Cats.Range {
        return {
            start : {
                row: item.startPosition.line,
                column : item.startPosition.character
            },
            end : {
                row: item.endPosition.line,
                column : item.endPosition.position.character
            }
        }
        
    }
 
    function lint() {
        var session = IDE.sessionTabView.getActiveSession();
        var options = {
            formatter: "json",
            configuration: getLintConfig(),
            rulesDirectory: "customRules/",
            formattersDirectory: "customFormatters/"
        };
        
        if (session && session.isTypeScript()) {
                var Linter = require("tslint");
                var ll = new Linter(session.name, session.content, options);
                var result:Array<any> = JSON.parse(ll.lint().output);
                // console.log(result);
                // IDE.console.log(JSON.stringify(result,null,4));
                var r:Cats.FileRange[] = [];
                result.forEach((msg) => {
                        var item:Cats.FileRange = {
                              fileName : msg.name,
                              message: msg.failure,
                              severity: Cats.Severity.Info,
                              range: convertPos(msg)
                        };
                        r.push(item)
                });
                session.setErrors(r);
                IDE.problemResult.setData(r);
                
        }
    }


      function formatText() {
          
            var session = IDE.sessionTabView.getActiveSession();
            if (session && session.isTypeScript()) {
                session.project.iSense.getFormattedTextForRange( session.name, 0, -1 , (err, result) => {                    
                    if (!err) {
                        session.setContent(result);
                    }
                    
                });
            }
            
        }

    /*
    function getShortcut(commandName: string) {
        
        var platform = IDE.getActiveEditor().commands.platform;
        var command = IDE.getActiveEditor().commands.byName[commandName];

        if (command && command.bindKey) {
            var key = command.bindKey[platform];
            return key;
        }

        return null;
        
    }


    // TODO i18n
    function addShortcut(label, commandName: string) {
        var result = label;
        var platform = IDE.getActiveEditor().commands.platform;
        var command = IDE.getActiveEditor().commands.byName[commandName];

        if (command && command.bindKey) {
            var tabs = 5 - Math.floor((result.length / 4) - 0.01);
            result = result + "\t\t\t\t\t\t".substring(0, tabs);
            var key = command.bindKey[platform];
            if (key) result += key;
        }
        return result;
    }
    
    
    */
    
    
    function toggleInvisibles() {
        //@TODO fix,don't access private var
        var aceSession = IDE.getActiveEditor()["aceEditor"];
        aceSession.setShowInvisibles(!aceSession.getShowInvisibles());
    }

    

    
    function editorCommand(commandName:string) {
        return function(...args) {
             //@TODO fix,don't access private var
              var aceEditor = IDE.getActiveEditor()["aceEditor"];
              // var command:Function = aceEditor.commands.byName[commandName];
              aceEditor.execCommand(commandName);
        };
        
    }
    
    export class EditorCommands {


        static init(registry:(cmd:Command)=>void) {

            var editorCommands: any[] = [
               { id: Cats.Commands.CMDS.edit_undo, label: "Undo", icon: "actions/edit-undo.png" },
               { id: Cats.Commands.CMDS.edit_redo, label: "Redo", icon: "actions/edit-redo.png" },
        
               { id: Cats.Commands.CMDS.edit_indent, label: "Indent", icon: "actions/format-indent-more.png" },
               { id: Cats.Commands.CMDS.edit_outdent, label: "Outdent", icon: "actions/format-indent-less.png" },
        
               /*{ id: Cats.Commands.CMDS.edit_cut, label: "Cut" },
               { id: Cats.Commands.CMDS.edit_copy, label: "Copy" },
               { id: Cats.Commands.CMDS.edit_paste, label: "Paste" },*/
        
               { id: Cats.Commands.CMDS.edit_find, label: "Find", cmd: "find", icon: "actions/edit-find.png" },
               { id: Cats.Commands.CMDS.edit_findNext, label: "Find Next", cmd: "findnext" },
               { id: Cats.Commands.CMDS.edit_findPrev, label: "Find Previous", cmd: "findprevious" },
               { id: Cats.Commands.CMDS.edit_replace, label: "Find/Replace", cmd: "replace", icon: "actions/edit-find-replace.png", },
               { id: Cats.Commands.CMDS.edit_replaceAll, label: "Replace All", cmd: "replaceall" },
        
               { id: Cats.Commands.CMDS.edit_toggleComment, label: "Toggle Comment", cmd: "togglecomment", icon: "comment.png" },
               { id: Cats.Commands.CMDS.edit_toggleRecording, label: "Start/Stop Recording", cmd: "togglerecording", icon: "actions/media-record.png"  },
               { id: Cats.Commands.CMDS.edit_replayMacro, label: "Playback Macro", cmd: "replaymacro", icon: "actions/media-playback-start.png" },
               
               { id: Cats.Commands.CMDS.edit_gotoLine, label: "Goto Line", cmd: "gotoline" }
            ];



            editorCommands.forEach((config) => {
                if (!config.cmd) config.cmd = config.label.toLowerCase();
                // var label = addShortcut(config.label, config.cmd);
                var item:Command = {
                    name: config.id,
                    label: config.label,
                    icon: config.icon,
                    shortcut:null,
       //             command:null
        //            shortcut: getShortcut(config.cmd),
                    command: editorCommand(config.cmd),
                }
                // if (config.icon) item.icon = config.icon;
                registry(item);
            });
            
            registry({name:CMDS.edit_toggleInvisibles, label:"Toggle Invisible Characters", command: toggleInvisibles, icon: "invisibles.png"});
            registry({name:CMDS.source_format, label:"Format Code", command: formatText});
            registry({name:CMDS.source_tslint, label:"Lint Code", command: lint});
        }

    }




}