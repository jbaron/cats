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

module Cats.Gui {
    
    if (typeof nw != "undefined") {
        var GUI:any = nw;
    } else {
        var GUI = require( 'nw.gui' );
    }


    function getItem( command: Commands.COMMANDNAME ) {
        var cmd = Commands.commandRegistry.getCommand(command);
        var item = {
            label: cmd.label,
            click: cmd.command
        };
        return new GUI.MenuItem( item );
    }



    /**
     * This class creates the main menubar. This is the only GUI component that 
     * is not using Qooxdoo/HTML5 but an API exposed by NW.js. 
     * This makes it possible to have a native menubar.
     * 
     */
    export class MenuBar {

        private menu: any;
        private menus: any = {};

        constructor() {
            this.createMenuBar();

            this.createFileMenu();
            this.createEditMenu();
            this.createViewMenu();
            this.createProjectMenu();
            this.createSourceMenu();
            this.createHelpMenu();

            var win = GUI.Window.get();
            win.menu = this.menu;
        }


        private createMenuBar() {
            this.menu = new GUI.Menu( { type: "menubar" });

            if ( OS.File.isOSX() && this.menu.createMacBuiltin ) {
                this.menu.createMacBuiltin( "CATS" );

                this.menus.cats = this.menu.items[0].submenu;
                this.menus.edit = this.menu.items[1].submenu;
                this.menus.window = this.menu.items[2].submenu;

                // 0 is builtin CATS menu
                this.createMenuBarItem( "file", 1 );
                // 2 is builtin Edit
                this.createMenuBarItem( "view", 3 );
                this.createMenuBarItem( "project", 4 );
                this.createMenuBarItem( "source", 5 );
                // 6 is builtin Windows
                this.createMenuBarItem( "help" );
                
            } else {
                this.createMenuBarItem( "file" );
                this.createMenuBarItem( "edit" );
                this.createMenuBarItem( "view" );
                this.createMenuBarItem( "project" );
                this.createMenuBarItem( "source" );
                this.createMenuBarItem( "help" );
            }
        }


        /**
         * Create an item in the main menu bar. Optional the position can be passed
         * for this item.
         */
        private createMenuBarItem( name: string, position?: number ) {
            var label = translate( name + "_menu_name" );
            var menu = new GUI.Menu();
            this.menus[name] = menu;
            if ( position ) {
                this.menu.insert( new GUI.MenuItem( { label: label, submenu: menu }), position );
            } else {
                this.menu.append( new GUI.MenuItem( { label: label, submenu: menu }) );
            }
        }

        private createSourceMenu() {
            var source = this.menus.source;
            source.append( getItem( Commands.COMMANDNAME.edit_toggleComment ) );
            source.append( getItem( Commands.COMMANDNAME.edit_toggleInvisibles ) );
            source.append( new GUI.MenuItem( { type: "separator" }) );
            source.append( getItem( Commands.COMMANDNAME.edit_indent ) );
            source.append( getItem( Commands.COMMANDNAME.edit_outdent ) );
            source.append( new GUI.MenuItem( { type: "separator" }) );
            source.append( getItem( Commands.COMMANDNAME.source_format ) );
            source.append( getItem( Commands.COMMANDNAME.edit_gotoLine ) );
        }

        private createHelpMenu() {
            var help = this.menus["help"];
            help.append( getItem( Commands.COMMANDNAME.help_shortcuts ) );
            help.append( getItem( Commands.COMMANDNAME.help_processInfo ) );
            help.append( getItem( Commands.COMMANDNAME.help_devTools ) );
            help.append( getItem( Commands.COMMANDNAME.help_about ) );
        }

        private createEditMenu() {
            var edit = this.menus.edit;

            // Already done by native OSX menu
            if ( !OS.File.isOSX() ) {
                edit.append( getItem( Commands.COMMANDNAME.edit_undo ) );
                edit.append( getItem( Commands.COMMANDNAME.edit_redo ) );
                edit.append( new GUI.MenuItem( { type: "separator" }) );
                edit.append( getItem( Commands.COMMANDNAME.edit_cut ) );
                edit.append( getItem( Commands.COMMANDNAME.edit_copy ) );
                edit.append( getItem( Commands.COMMANDNAME.edit_paste ) );
            }

            edit.append( new GUI.MenuItem( { type: "separator" }) );
            edit.append( getItem( Commands.COMMANDNAME.edit_find ) );
            edit.append( getItem( Commands.COMMANDNAME.edit_findNext ) );
            edit.append( getItem( Commands.COMMANDNAME.edit_findPrev ) );
            edit.append( getItem( Commands.COMMANDNAME.edit_replace ) );
            edit.append( getItem( Commands.COMMANDNAME.edit_replaceAll ) );

            edit.append( new GUI.MenuItem( { type: "separator" }) );
            edit.append( getItem( Commands.COMMANDNAME.edit_toggleRecording ) );
            edit.append( getItem( Commands.COMMANDNAME.edit_replayMacro ) );
        }

        private createFileMenu() {
            var file = this.menus.file;
            file.append( getItem( Commands.COMMANDNAME.file_new ) );
            file.append( new GUI.MenuItem( { type: "separator" }) );
            file.append( getItem( Commands.COMMANDNAME.file_save ) );
            file.append( getItem( Commands.COMMANDNAME.file_saveAs ) );
            file.append( getItem( Commands.COMMANDNAME.file_saveAll ) );
            file.append( new GUI.MenuItem( { type: "separator" }) );
            file.append( getItem( Commands.COMMANDNAME.file_close ) );
            file.append( getItem( Commands.COMMANDNAME.file_closeAll ) );
            file.append( getItem( Commands.COMMANDNAME.file_closeOther ) );
            file.append( new GUI.MenuItem( { type: "separator" }) );
            file.append( getItem( Commands.COMMANDNAME.ide_configure ) );

            if ( !OS.File.isOSX() ) {
                file.append( getItem( Commands.COMMANDNAME.ide_quit ) );
            }
        }


        private recentProjects() {
            var menu = new GUI.Menu();
            IDE.config.projects.slice().reverse().forEach((project) => {
                if (! project) return;
                var item = {
                    label: project,
                    click: () => { IDE.setDirectory(project); }
                };
                menu.append(new GUI.MenuItem(item));
            });
            var entry = new GUI.MenuItem({
               label: "Recent Projects",
               submenu : menu
            });
            return entry;
        }

        private createProjectMenu() {
            var proj = this.menus.project;
            proj.append( getItem( Commands.COMMANDNAME.project_open ) );
            proj.append( getItem( Commands.COMMANDNAME.project_close ) );
            proj.append( getItem( Commands.COMMANDNAME.project_new ) );
            proj.append(this.recentProjects());

            proj.append( new GUI.MenuItem( { type: "separator" }) );
            proj.append( getItem( Commands.COMMANDNAME.project_build ) );
            proj.append( getItem( Commands.COMMANDNAME.project_run ) );
            proj.append( getItem( Commands.COMMANDNAME.project_validate ) );
            proj.append( getItem( Commands.COMMANDNAME.project_refresh ) );

            // proj.append( new GUI.MenuItem( { type: "separator" }) );
            // proj.append( getItem( Commands.COMMANDNAME.project_configure ) );
        }

        private createViewMenu() {
            var view = this.menus.view;
            view.append( getItem( Commands.COMMANDNAME.ide_toggle_toolbar ) );
            view.append( getItem( Commands.COMMANDNAME.ide_toggle_statusbar ) );
            view.append( getItem( Commands.COMMANDNAME.ide_toggle_context ) );
            view.append( getItem( Commands.COMMANDNAME.ide_toggle_result ) );
        }

    }

}

