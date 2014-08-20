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

        
        project_open,
        project_close,
        project_build,
        project_validate,
        project_run,
        project_debug,
        project_refresh,
        project_properties,
        project_classDiagram,
        project_configure,
        project_document,
        
        
        ide_quit,
        ide_theme,
        ide_fontSize,
        ide_rightMargin,
        ide_toggleView,
        ide_configure
        
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
	}


}