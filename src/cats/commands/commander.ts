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
    export var CMDS = {
        help_devTools: <Command>null,
        help_shortcuts: <Command>null,
        help_processInfo: <Command>null,
        help_about: <Command>null,
        
        file_new: <Command>null,
        file_open: <Command>null,
        file_close: <Command>null,
        file_closeOther: <Command>null,
        file_closeAll: <Command>null,
        file_save: <Command>null,
        file_saveAs: <Command>null,
        file_saveAll: <Command>null,
        file_previous: <Command>null,
        file_next: <Command>null,
        
        edit_undo: <Command>null,
        edit_redo: <Command>null,
        edit_cut: <Command>null,
        edit_copy: <Command>null,
        edit_paste: <Command>null,
        edit_find: <Command>null,
        edit_findNext: <Command>null,
        edit_findPrev: <Command>null,
        edit_replace: <Command>null,
        edit_replaceAll: <Command>null,
        edit_toggleInvisibles: <Command>null,
        edit_toggleRecording: <Command>null,
        edit_replayMacro: <Command>null,
        
        edit_toggleComment: <Command>null,
        edit_indent: <Command>null,
        edit_outdent: <Command>null,
        edit_gotoLine: <Command>null,
        
        source_format: <Command>null,
        source_openDeclaration: <Command>null,
        source_findRef: <Command>null,
        source_findDecl: <Command>null,

        
        project_open: <Command>null,
        project_close: <Command>null,
        project_new: <Command>null,
        project_build: <Command>null,
        project_validate: <Command>null,
        project_run: <Command>null,
        project_debug: <Command>null,
        project_refresh: <Command>null,
        project_properties: <Command>null,
        project_quickOpen: <Command>null,
        project_classDiagram: <Command>null,
        project_configure: <Command>null,
        project_document: <Command>null,
        
        
        ide_quit: <Command>null,
        ide_theme: <Command>null,
        ide_fontSize: <Command>null,
        ide_rightMargin: <Command>null,
        ide_configure: <Command>null,
        ide_history_next: <Command>null,
        ide_history_prev: <Command>null,
        "ide_toggle_toolbar" : <Command>null,
        "ide_toggle_statusbar" : <Command>null,
        "ide_toggle_context" : <Command>null,
        "ide_toggle_result"  : <Command>null,
    };

 


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

    /**
     * Call the different command implementers so they can register 
     * themselves
     */ 
	export function init() {
	   for (var key in CMDS) {
            CMDS[key] = {
                name: key,
                label : qx.locale.Manager.tr(key),
                command: nop
            };
        }
	    
	    
		EditorCommands.init(register);
	    FileCommands.init(register);
		HelpCommands.init(register);
	    ProjectCommands.init(register);
        IdeCommands.init(register);
	}


}
