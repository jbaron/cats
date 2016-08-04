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
    export enum COMMANDNAME {
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
        file_previous,
        file_next,
        
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
        project_new,
        project_build,
        project_validate,
        project_run,
        project_debug,
        project_refresh,
        project_properties,
        project_quickOpen,
        project_classDiagram,
        project_configure,

        
        ide_quit,
        ide_theme,
        ide_fontSize,
        ide_rightMargin,
        ide_configure,
        ide_history_next,
        ide_history_prev,
        ide_toggle_toolbar,
        ide_toggle_statusbar,
        ide_toggle_context,
        ide_toggle_result 
    };


    export class CommandRegistry {
       
       private registry = new Map<COMMANDNAME,Command>();

    
        
    /**
     * Register a new command
     */ 
	registerCommand(id:COMMANDNAME, fn:Function)  {
	    
	    var name = COMMANDNAME[id];
	    console.log(name);
	    
        this.registry.set(id, {
            name: name,
            label:qx.locale.Manager.tr(name),
            command: fn 
        });
	}
	
	/**
	 * Get the command based on 
	 */ 
	getCommand(command:COMMANDNAME):Command {
	    return this.registry.get(command);
	}
	
    runCommand(name:String) {
        this.registry.forEach((cmd) => {
           if (cmd.name === name) cmd.command(); 
        })
    }

        
    }


	export interface Command {
		name:string;
		label: string;
		command: Function;
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
	function register(command:Command, fn:Function)  {       
        command.command = fn;
	}
	
	
    export var commandRegistry = new CommandRegistry()

    /**
     * Call the different command implementers so they can register 
     * themselves
     */ 
	export function init() {

	    function register(cmd: COMMANDNAME, fn:Function) {
	        commandRegistry.registerCommand(cmd,fn);
	    }
	    
		EditorCommands.init(register);
	    FileCommands.init(register);
		HelpCommands.init(register);
	    ProjectCommands.init(register);
        IdeCommands.init(register);
	}


}
