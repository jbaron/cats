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

    function getRange( editor ): Cats.Range {
        var range: ace.Range = editor.aceEditor.selection.getRange();
        if ( range.isEmpty() ) return null;
        return {
            start: range.start,
            end: range.end
        };
    }

    function formatText() {

        var editor = <Gui.SourceEditor>IDE.editorTabView.getActiveEditor();
        if ( editor && editor.isTypeScript && editor.isTypeScript() ) {
            var range = getRange( editor );
            IDE.project.iSense.getFormattedTextForRange( editor.filePath, range, ( err: Error, result: string ) => {
                if ( !err ) {
                    editor.setContent( result );
                }

            });
        }

    }


    function toggleInvisibles() {
        var editor = IDE.editorTabView.getActiveEditor();
        editor.executeCommand( "toggleInvisibles" );
    }


    function editorCommand( commandName: string ) {
        return function ( ...args: Array<any> ) {
            var editor = IDE.editorTabView.getActiveEditor();
            editor.executeCommand( commandName );
        };

    }

    export class EditorCommands {

        static init( registry: ( cmd: Command, fn: Function ) => void ) {

            registry( CMDS.edit_undo, editorCommand( "undo" ) );
            registry( CMDS.edit_redo, editorCommand( "redo" ) );

            registry( CMDS.edit_indent, editorCommand( "indent" ) );
            registry( CMDS.edit_outdent, editorCommand( "outdent" ) );

            registry( CMDS.edit_find, editorCommand( "find" ) );
            registry( CMDS.edit_findNext, editorCommand( "findnext" ) );
            registry( CMDS.edit_findPrev, editorCommand( "findprevious" ) );
            registry( CMDS.edit_replace, editorCommand( "replace" ) );
            registry( CMDS.edit_replaceAll, editorCommand( "replaceall" ) );

            registry( CMDS.edit_toggleComment, editorCommand( "togglecomment" ) );
            registry( CMDS.edit_toggleRecording, editorCommand( "togglerecording" ) );
            registry( CMDS.edit_replayMacro, editorCommand( "replaymacro" ) );

            registry( CMDS.edit_gotoLine, editorCommand( "gotoline" ) );

            registry( CMDS.edit_toggleInvisibles, toggleInvisibles );
            registry( CMDS.source_format, formatText );
            registry( CMDS.edit_cut, () => { document.execCommand( "cut" ); });
            registry( CMDS.edit_copy, () => { document.execCommand( "copy" ); });
            registry( CMDS.edit_paste, () => { document.execCommand( "paste" ); });

        }

    }




}