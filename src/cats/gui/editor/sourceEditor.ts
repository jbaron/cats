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

module Cats.Gui.Editor {


    var Range: ace.Range = ace.require( "ace/range" ).Range;
    var modelist = ace.require( 'ace/ext/modelist' );


    var autoCompletePopup = new AutoCompletePopup();
    var registryEntryName = "SourceEditor";


    function restoreState( state: SourceEditorState ) {
        var editor = new SourceEditor( state.fileName );
        editor.moveToPosition( state.pos );
        return editor;
    }

    Cats.Editor.RegisterEditor( registryEntryName, restoreState );

    interface SourceEditorState {
        fileName: string;
        pos: Position;
    }

    /**
     * Wrapper around the ACE editor. The rest of the code base should not use
     * ACE editor directly so it can be changed for another editor if required.
     */
    export class SourceEditor extends FileEditor {

        private status = {};
        private unsavedChanges = false;
        private aceEditor: ace.Editor;
        private mouseMoveTimer: number;
        private outlineTimer: number
        private updateSourceTimer: number;
        private pendingWorkerUpdate = false;
        private editSession: EditSession;
        private pendingPosition: ace.Position;
        private selectedTextMarker: any;
        private widget: qx.ui.core.Widget;
        private contextMenu: SourceEditorContextMenu;

        constructor( fileName?: string ) {
            super( fileName );
            this.createEditSession();
            this.createWidget();
            this.contextMenu = new SourceEditorContextMenu( this );
            this.widget.setContextMenu(this.contextMenu)
            IDE.on( "config", () => { this.configureEditor(); });
        }


        private createWidget() {
            var widget = new qx.ui.core.Widget();
            widget.setDecorator( null );
            widget.setFont( null );
            widget.setAppearance( null );
            
            widget.addListenerOnce( "appear", () => {
                var container = widget.getContentElement().getDomElement();
                container.style.lineHeight = "normal";
                this.aceEditor = this.createAceEditor( container );

                this.configureEditor();
           
                if ( this.pendingPosition ) this.moveToPosition( this.pendingPosition );

            }, this );

            widget.addListener( "appear", () => {
                // this.session.activate();
                this.informWorld();
                if ( this.aceEditor ) this.aceEditor.focus();
            });

            // session.on("errors", this.showErrors, this);
            widget.addListener( "resize", () => { this.resizeHandler(); });

            this.widget = widget;
        }

        private createEditSession() {
            this.editSession = new EditSession( this );

            this.editSession.on( "changeAnnotation", () => {
                this.emit( "errors", this.editSession.getMaxAnnotationLevel() );
            });

            this.editSession.on( "changeOverwrite", ( a ) => {
                this.informWorld();
            });

            this.editSession.on( "change", () => {
                this.setHasUnsavedChanges( true );
            });

        }


        private setHasUnsavedChanges( value: boolean ) {
            if ( value === this.unsavedChanges ) return;
            this.unsavedChanges = value;
            this.emit( "changed", value );
        }

        getState(): SourceEditorState {
            return {
                fileName: this.filePath,
                pos: this.getPosition()
            };
        }

        static RestoreState( state: SourceEditorState ) {
            var editor = new SourceEditor( state.fileName );
            editor.moveToPosition( state.pos );
            return editor;
        }

        executeCommand( name:string, ...args:any[] ): any {
            switch ( name ) {
                case 'toggleInvisibles':
                    this.aceEditor.setShowInvisibles( !this.aceEditor.getShowInvisibles() );
                    break;

                case 'formatText':
                    this.formatText();
                    break;

                default:
                    this.aceEditor.execCommand( name );
                    break;
            }
        }

        isTypeScript() {
            return this.editSession.isTypeScript() && this.project.hasScriptFile(this.filePath);
        }

        getType() {
            return registryEntryName;
        }

        static SupportsFile( fileName: string ) {
            var name = OS.File.PATH.basename( fileName );
            var mode = modelist.getModeForPath( name );

            if ( mode && mode.supportsFile( name ) ) return true;
            return false;
        }

        /**
         * Get the Qooxdoo Widget that can be added to the parent
         */
        getLayoutItem() {
            return this.widget;
        }


        private formatText() {
            var r:Range = null;
            if ( this.isTypeScript() ) {
                var range: ace.Range = this.aceEditor.selection.getRange();
                if ( !range.isEmpty() ) r = { start: range.start, end: range.end };
                IDE.project.iSense.getFormattedTextForRange( this.filePath, r, ( err: Error, result: string ) => {
                    if ( !err ) this.setContent( result );
                });
            }

        }


        setMode(mode:string) {
            this.editSession.setMode(mode);
            this.informWorld();
        }

        /**
         * Replace the current content of this editor with new content and indicate
         * wether the cursor should stay on the same position
         * 
         */
        setContent( content:string, keepPosition= true ) {
            var pos: ace.Position;
            if ( keepPosition ) pos = this.getPosition();
            this.editSession.setValue( content );
            if ( pos ) this.moveToPosition( pos );
        }


        /**
         * Update the configuaration of the editor. 
         *
         */
        private configureEditor() {
            var config = IDE.config.editor;
            if ( config.fontSize ) this.aceEditor.setFontSize( config.fontSize + "px" );
            if ( config.rightMargin ) this.aceEditor.setPrintMarginColumn( config.rightMargin );
            if ( config.theme ) this.aceEditor.setTheme( "ace/theme/" + config.theme );
        }



        /**
         * Inform the world about current status of the editor
         * 
         */
        informWorld() {

            var value = this.getPosition();
            var label = ( value.row + 1 ) + ":" + ( value.column + 1 );

            this.status = {
                overwrite: this.editSession.getOverwrite(),
                mode: OS.File.PATH.basename( this.editSession.mode ).toUpperCase(),
                position: label
            };

            this.emit( "status", this.status );
        }

        replace( range: ace.Range, content: string ) {
            this.editSession.replace( range, content );
        }


        getLine( row = this.getPosition().row ) {
            return this.editSession.getLine( row );
        }

        /**
         * Get the content of the editor
         * 
         */
        getContent() {
            return this.editSession.getValue();
        }


        /**
         * Make sure the ace editor is resized when the Qooxdoo container is resized.
         * 
         */
        private resizeHandler() {
            if ( !this.widget.isSeeable() ) {
                this.addListenerOnce( "appear", () => { this.resizeEditor(); });
            } else {
                this.resizeEditor();
            }
        }

        private resizeEditor() {
            setTimeout( () => {
                this.aceEditor.resize();
            }, 100 );
        }



        private clearSelectedTextMarker() {
            if ( this.selectedTextMarker ) {
                this.editSession.removeMarker( this.selectedTextMarker );
                this.selectedTextMarker = null;
            }
        }

        private addTempMarker( r: Cats.Range ) {
            this.clearSelectedTextMarker();
            var range: ace.Range = new Range( r.start.row, r.start.column, r.end.row, r.end.column );
            this.selectedTextMarker = this.editSession.addMarker( range, "ace_selected-word", "text" );
        }

        moveToPosition( pos: Cats.Range ):void;
        moveToPosition( pos: ace.Position ):void;
        moveToPosition( pos: any ) {
            if ( !this.aceEditor ) {
                this.pendingPosition = pos;
            } else {
                this.aceEditor.clearSelection();
                super.moveToPosition( pos );
                if ( pos ) {
                    if ( pos.start ) {
                        this.aceEditor.moveCursorToPosition( pos.start );
                    } else {
                        this.aceEditor.moveCursorToPosition( pos );
                    }

                }
                setTimeout( () => {
                    this.aceEditor.centerSelection();
                    if ( pos && pos.start ) this.addTempMarker( pos );
                }, 100 );
            }
        }

        /**
         * Get the position of the cursor within the content.
         * 
         */
        getPosition() {
            if (this.aceEditor)
                return this.aceEditor.getCursorPosition();
        }

        /**
          * Get the Position based on mouse x,y coordinates
          */
        getPositionFromScreenOffset( ev: MouseEvent ): ace.Position {
            var x = ev.offsetX;
            var y = ev.offsetY;
            // var cursor = this.aceEditor.renderer.pixelToScreenCoordinates(x, y);
            // IDE.console.log(JSON.stringify(cursor));
            // var docPos2 = this.aceEditor.getSession().screenToDocumentPosition(cursor.row, cursor.col);
            // IDE.console.log(JSON.stringify(docPos2));

            var r = this.aceEditor.renderer;
            // var offset = (x + r.scrollLeft - r.$padding) / r.characterWidth;
            var offset = ( x - r.$padding ) / r.characterWidth;

            // @BUG: Quickfix for strange issue with top
            var correction = r.scrollTop ? 7 : 0;

            var row = Math.floor( ( y + r.scrollTop - correction ) / r.lineHeight );
            var col = Math.round( offset );

            var docPos = this.aceEditor.getSession().screenToDocumentPosition( row, col );
            // IDE.console.log(JSON.stringify(docPos));
            return docPos;
        }

        /**
         * Perform code autocompletion.
         */
        showAutoComplete( memberCompletionOnly = false ) {
            // Any pending changes that are not yet send to the worker?
            if (this.isTypeScript()) {
                this.project.iSense.updateScript( this.filePath, this.getContent() );
            }
            autoCompletePopup.complete( memberCompletionOnly, this, this.aceEditor );
        }

        private liveAutoComplete( e ) {
            if (! this.isTypeScript()) return;
            var text = e.args || "";
            if ( ( e.command.name === "insertstring" ) && ( text === "." ) ) {
                this.showAutoComplete( true );
            }
        }

    
        /**
         * Create a new isntance of the ACE editor and append is to a dom element
         * 
         */
        private createAceEditor( rootElement: HTMLElement ): ace.Editor {
            var editor: ace.Editor = ace.edit( rootElement );
            editor.setSession( this.editSession );
            editor.on( "changeSelection", () => {
                this.clearSelectedTextMarker();
                this.informWorld();
            });

            new TSTooltip( this );
            new TSHelper( this, this.editSession );

            editor.commands.on( 'afterExec', ( e ) => { this.liveAutoComplete( e ); });

            editor.setOptions( {
                enableSnippets: true
            });

            editor.commands.addCommands( [

                {
                    name: "autoComplete",
                    bindKey: {
                        win: "Ctrl-Space",
                        mac: "Ctrl-Space"
                    },
                    exec: () => { this.showAutoComplete(); }
                },

                {
                    name: "gotoDeclaration",
                    bindKey: {
                        win: "F12",
                        mac: "F12"
                    },
                    exec: () => { this.contextMenu.gotoDeclaration(); }
                },


                {
                    name: "save",
                    bindKey: {
                        win: "Ctrl-S",
                        mac: "Command-S"
                    },
                    exec: () => { this.save(); }
                }
            ] );


            return editor;
        }

        hasUnsavedChanges() {
            return this.unsavedChanges;
        }

        /**
         * Persist this session to the file system. This overrides the NOP in the base class
         */
        save() {
            this.editSession.save();
        }

    }

}