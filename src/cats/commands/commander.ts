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

module Cats.Commands {

    /**
     * List of known commands
     */ 
    export enum CMDS {
        help_devTools,
        help_shortcuts,
        help_processInfo,
        help_about,
        
        file_new,
        file_open,
        file_close,
        file_closeOther,
        file_closeAll,
        file_save,
        file_saveAs,
        file_saveAll,
        
        edit_undo,
        edit_redo,
        edit_cut,
        edit_copy,
        edit_paste,
        edit_find,
        edit_findNext,
        edit_findPrev,
        edit_replace,
        edit_replaceAll,
        edit_toggleInvisibles, 
        edit_toggleRecording,
        edit_replayMacro,
        
        edit_toggleComment,
        edit_indent,
        edit_outdent,
        edit_gotoLine,
        
        source_format,
        source_openDeclaration,
        source_findRef,
        source_findDecl,
        source_tslint,
        
        project_open,
        project_close,
        project_build,
        project_validate,
        project_run,
        project_debug,
        project_refresh,
        project_properties,
        project_dependencies,
        
        refactor_rename,
        
        ide_quit,
        ide_theme,
        ide_fontSize,
        ide_rightMargin,
        ide_toggleView,
        
    }

	export interface Command {
		name:CMDS;
		label?: string;
		command: any;
		icon?: string;
		shortcut?: string;
	}

 
	var commands:Command[] = [];
    var commandList:Command[] =[];


    export function getAllCommands() {
        return commands;
    }

    /**
     * When a command has no function declared,
     * use this one 
     */ 
    function nop() {
        alert("Not yet implemented");
    }

    /**
     * Register a new command
     */ 
	export function register(command:Command)  {       
        if (! command.command) command.command = nop;
		commands[command.name] = command;
        commandList.push(command);
	}



    // TODO i18n
    function addShortcut(label:string, shortCut: string) {
        var result = label;
        var tabs = 5 - Math.floor((result.length / 4));
        // console.log("Label " + result + " has tabs: " + tabs);
        result = result + "     " + "\t\t\t\t\t\t".substring(0, tabs) + shortCut;
        // result += "\u0007" + shortCut;
        // result += "      " + shortCut;
        // result += shortCut;        
        return result;
    }


    /**
     * Create a menu item for a certain command.
     */
    export function getMenuCommand(name); 
    export function getMenuCommand(name,label:string, ...params:Array<any>);     
    export function getMenuCommand(name,label?:string, ...params:Array<any>) {
        var cmd = commands[name];
        if (! cmd) {
            console.error("No implementation available for command " + name);
            return new GUI.MenuItem({label:"Unknow command"});
        }
        var click;
        if (params.length > 0) {
            // lets generate a closure
            click = function() { cmd.command.apply(this,params); }
        } else {
            click = cmd.command;
        }
        var item:any = {
            label: label || cmd.label,
            click: click
        };
        
        
        // if (cmd.shortcut) item.label += " [" + cmd.shortcut + "]";
        if (cmd.shortcut) item.label = addShortcut(item.label, cmd.shortcut);        
        
        // if (cmd.icon) item.icon = "static/resource/qx/icon/Oxygen/22/" + cmd.icon;
                
        return new GUI.MenuItem(item);
    }

    export function runCommand(name:CMDS):void  {
		commands[name].command();
	}

	export function get(name:CMDS) :Command {
		return commands[name];
	}

    /**
     * Call the different command implementers so they can register 
     * themselves
     */ 
	export function init() {
		EditorCommands.init(register);
	    FileCommands.init(register);
		HelpCommands.init(register);
	    ProjectCommands.init(register);
        IdeCommands.init(register);
        RefactorCommands.init(register);
	}


}