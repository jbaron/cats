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

   
    function formatText() {
        var editor = IDE.editorTabView.getActiveEditor();
        if (editor) editor.executeCommand( "formatText" );
    }


    function toggleInvisibles() {
        var editor = IDE.editorTabView.getActiveEditor();
        if (editor) editor.executeCommand( "toggleInvisibles" );
    }


    function editorCommand( commandName: string ) {
        return function ( ...args: Array<any> ) {
            var editor = IDE.editorTabView.getActiveEditor();
            if (editor) editor.executeCommand( commandName );
        };

    }

    export class EditorCommands {

        static init( registry: ( cmd: COMMANDNAME, fn: Function ) => void ) {

            registry( COMMANDNAME.edit_undo, editorCommand( "undo" ) );
            registry( COMMANDNAME.edit_redo, editorCommand( "redo" ) );

            registry( COMMANDNAME.edit_indent, editorCommand( "indent" ) );
            registry( COMMANDNAME.edit_outdent, editorCommand( "outdent" ) );

            registry( COMMANDNAME.edit_find, editorCommand( "find" ) );
            registry( COMMANDNAME.edit_findNext, editorCommand( "findnext" ) );
            registry( COMMANDNAME.edit_findPrev, editorCommand( "findprevious" ) );
            registry( COMMANDNAME.edit_replace, editorCommand( "replace" ) );
            registry( COMMANDNAME.edit_replaceAll, editorCommand( "replaceall" ) );

            registry( COMMANDNAME.edit_toggleComment, editorCommand( "togglecomment" ) );
            registry( COMMANDNAME.edit_toggleRecording, editorCommand( "togglerecording" ) );
            registry( COMMANDNAME.edit_replayMacro, editorCommand( "replaymacro" ) );

            registry( COMMANDNAME.edit_gotoLine, editorCommand( "gotoline" ) );

            registry( COMMANDNAME.edit_toggleInvisibles, toggleInvisibles );
            registry( COMMANDNAME.source_format, formatText );
            registry( COMMANDNAME.edit_cut, () => { document.execCommand( "cut" ); });
            registry( COMMANDNAME.edit_copy, () => { document.execCommand( "copy" ); });
            registry( COMMANDNAME.edit_paste, () => { document.execCommand( "paste" ); });

        }

    }




}