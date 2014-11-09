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
    var GUI = require( 'nw.gui' );

    var CMDS = Cats.Commands.CMDS;

    function getItem( cmd: Cats.Commands.Command ) {
        var item = {
            label: cmd.label,
            click: cmd.command
        };
        return new GUI.MenuItem( item );
    }

    /**
     * This class creates the main menubar. This is the only GUI component that 
     * is not using Qooxdoo but an API exposed by nodewebkit. 
     * This makes it possible to have the feeling of a native menubar.
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
            var label = qx.locale.Manager.tr( name + "_menu_name" );
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
            source.append( getItem( CMDS.edit_toggleComment ) );
            source.append( getItem( CMDS.edit_toggleInvisibles ) );
            source.append( new GUI.MenuItem( { type: "separator" }) );
            source.append( getItem( CMDS.edit_indent ) );
            source.append( getItem( CMDS.edit_outdent ) );
            source.append( new GUI.MenuItem( { type: "separator" }) );
            source.append( getItem( CMDS.source_format ) );
            source.append( getItem( CMDS.edit_gotoLine ) );
        }

        private createHelpMenu() {
            var help = this.menus["help"];
            help.append( getItem( CMDS.help_shortcuts ) );
            help.append( getItem( CMDS.help_processInfo ) );
            help.append( getItem( CMDS.help_devTools ) );
            help.append( getItem( CMDS.help_about ) );
        }

        private createEditMenu() {
            var edit = this.menus.edit;

            // Already done by native OSX menu
            if ( !OS.File.isOSX() ) {
                edit.append( getItem( CMDS.edit_undo ) );
                edit.append( getItem( CMDS.edit_redo ) );
                edit.append( new GUI.MenuItem( { type: "separator" }) );
                edit.append( getItem( CMDS.edit_cut ) );
                edit.append( getItem( CMDS.edit_copy ) );
                edit.append( getItem( CMDS.edit_paste ) );
            }

            edit.append( new GUI.MenuItem( { type: "separator" }) );
            edit.append( getItem( CMDS.edit_find ) );
            edit.append( getItem( CMDS.edit_findNext ) );
            edit.append( getItem( CMDS.edit_findPrev ) );
            edit.append( getItem( CMDS.edit_replace ) );
            edit.append( getItem( CMDS.edit_replaceAll ) );

            edit.append( new GUI.MenuItem( { type: "separator" }) );
            edit.append( getItem( CMDS.edit_toggleRecording ) );
            edit.append( getItem( CMDS.edit_replayMacro ) );
        }

        private createFileMenu() {
            var file = this.menus.file;
            file.append( getItem( CMDS.file_new ) );
            file.append( new GUI.MenuItem( { type: "separator" }) );
            file.append( getItem( CMDS.file_save ) );
            file.append( getItem( CMDS.file_saveAs ) );
            file.append( getItem( CMDS.file_saveAll ) );
            file.append( new GUI.MenuItem( { type: "separator" }) );
            file.append( getItem( CMDS.file_close ) );
            file.append( getItem( CMDS.file_closeAll ) );
            file.append( getItem( CMDS.file_closeOther ) );
            file.append( new GUI.MenuItem( { type: "separator" }) );
            file.append( getItem( CMDS.ide_configure ) );

            if ( !OS.File.isOSX() ) {
                file.append( getItem( CMDS.ide_quit ) );
            }
        }


        private recentProjects() {
            var menu = new GUI.Menu();
            IDE.config.projects.slice().reverse().forEach((project) => {
                if (! project) return;
                var item = {
                    label: project,
                    click: () => { IDE.addProject(project); }
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
            proj.append( getItem( CMDS.project_open ) );
            proj.append( getItem( CMDS.project_close ) );
            proj.append( getItem( CMDS.project_new ) );
            proj.append(this.recentProjects());

            proj.append( new GUI.MenuItem( { type: "separator" }) );
            proj.append( getItem( CMDS.project_build ) );
            proj.append( getItem( CMDS.project_run ) );
            proj.append( getItem( CMDS.project_validate ) );
            proj.append( getItem( CMDS.project_refresh ) );

            proj.append( new GUI.MenuItem( { type: "separator" }) );
            proj.append(getItem(CMDS.project_classDiagram));
            proj.append( getItem( CMDS.project_document ) );

            proj.append( new GUI.MenuItem( { type: "separator" }) );
            proj.append( getItem( CMDS.project_configure ) );
        }

        private createViewMenu() {
            var view = this.menus.view;
            view.append( getItem( CMDS.ide_toggle_toolbar ) );
            view.append( getItem( CMDS.ide_toggle_statusbar ) );
            view.append( getItem( CMDS.ide_toggle_context ) );
            view.append( getItem( CMDS.ide_toggle_result ) );
        }

    }

}

