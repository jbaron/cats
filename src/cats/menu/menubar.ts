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

module Cats.Menu {


    /**
     * This class creates the main menubar. This is the only GUI component that 
     * is not using Qooxdoo but some API exposed by nodewebkit. 
     * This makes it possible to have the feeling of a native menubar.
     */
    export class Menubar {

        private fontSizes = [8, 10, 12, 13, 14, 16, 18, 20, 24];

        private themes = [                   
                    { theme: Cats.theme.Theme, label: "CATS" },
                    { theme: qx.theme.Classic, label: "Classic" },
                    { theme: qx.theme.Indigo, label: "Indigo" },
                    { theme: qx.theme.Modern, label: "Modern" },
                    { theme: qx.theme.Simple, label: "Simple" }
        ];

        private themes2 = [
                    { theme: "cats", label: "CATS" },
                    { theme: "chrome", label: "Chrome" },
                    { theme: "clouds", label: "Clouds" },
                    { theme: "crimson_editor", label: "Crimson Editor" },
                    { theme: "dawn", label: "Dawn" },
                    { theme: "dreamweaver", label: "Dreamweaver" },
                    { theme: "eclipse", label: "Eclipse" },                    
                    { theme: "github", label: "GitHub" },
                    { theme: "solarized_light", label: "Solarized Light" },
                    { theme: "textmate", label: "TextMate" },
                    { theme: "tomorrow", label: "Tomorrow" },
                    { theme: "xcode", label: "XCode" },

                    { theme: null, label: "seperator dark themes" },
                    { theme: "ambiance", label: "Ambiance" },
                    { theme: "clouds_midnight", label: "Clouds Midnight" },
                    { theme: "cobalt", label: "Cobalt" },
                    { theme: "idle_fingers", label: "idleFingers" },
                    { theme: "kr_theme", label: "krTheme" },
                    { theme: "merbivore", label: "Merbivore" },
                    { theme: "merbivore_soft", label: "Merbivore Soft" },
                    { theme: "mono_industrial", label: "Mono Industrial" },
                    { theme: "monokai", label: "Monokai" },
                    { theme: "pastel_on_dark", label: "Pastel on dark" },
                    { theme: "solarized_dark", label: "Solarized Dark" },
                    { theme: "twilight", label: "Twilight" },
                    { theme: "tomorrow_night", label: "Tomorrow Night" },
                    { theme: "tomorrow_night_blue", label: "Tomorrow Night Blue" },
                    { theme: "tomorrow_night_bright", label: "Tomorrow Night Bright" },
                    { theme: "tomorrow_night_eighties", label: "Tomorrow Night 80s" },
                    { theme: "vibrant_ink", label: "Vibrant Ink" },
        ];


        // TODO i18n
        private addShortcut(label:string, shortCut: string) {
            var result = label;
            var tabs = 5 - Math.floor((result.length / 4));
            result = result + "     " + "\t\t\t\t\t\t".substring(0, tabs) + shortCut;
            return result;
        }


       /**
        * Create a menu item for a certain command.
        */
        private getMenuCommand(name,label?:string, ...params:Array<any>) {
            var cmd = Cats.Commands.get(name);
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
  
            if (cmd.shortcut) item.label = this.addShortcut(item.label, cmd.shortcut);        
            return new GUI.MenuItem(item);
        }


        constructor() {
            var menubar = new GUI.Menu({ type: 'menubar' });
            
            // @TODO fix a bit nicer
            if ((OS.File.platform() === OS.File.PlatForm.OSX) && menubar.createMacBuiltin) {
                menubar.createMacBuiltin("CATS");
                GUI.Window.get().menu = menubar;
            }
            
            var getCmd = this.getMenuCommand;
            var CMDS = Cats.Commands.CMDS;

            var file = new GUI.Menu();
            file.append(getCmd(CMDS.file_new));
            file.append(new GUI.MenuItem({ type: "separator" }));
            file.append(getCmd(CMDS.file_save));
            file.append(getCmd(CMDS.file_saveAs));
            file.append(getCmd(CMDS.file_saveAll));
            file.append(new GUI.MenuItem({ type: "separator" }));
            file.append(getCmd(CMDS.file_close));
            file.append(getCmd(CMDS.file_closeAll));
            file.append(getCmd(CMDS.file_closeOther));
            file.append(new GUI.MenuItem({ type: "separator" }));
            file.append(getCmd(CMDS.ide_configure));
            file.append(getCmd(CMDS.ide_quit));

            var edit = new GUI.Menu();
            // edit.append(this.editorCommand("undo"));
            edit.append(getCmd(CMDS.edit_undo));
            edit.append(getCmd(CMDS.edit_redo));
            /*edit.append(new GUI.MenuItem({ type: "separator" }));
            edit.append(getCmd(CMDS.edit_cut));
            edit.append(getCmd(CMDS.edit_copy));
            edit.append(getCmd(CMDS.edit_paste));*/
            edit.append(new GUI.MenuItem({ type: "separator" }));
            edit.append(getCmd(CMDS.edit_find));
            edit.append(getCmd(CMDS.edit_findNext));
            edit.append(getCmd(CMDS.edit_findPrev));
            edit.append(getCmd(CMDS.edit_replace));
            edit.append(getCmd(CMDS.edit_replaceAll));
            
            edit.append(new GUI.MenuItem({ type: "separator" }));
            // edit.append(getCmd(CMDS.edit_toggleInvisibles));
            edit.append(getCmd(CMDS.edit_toggleRecording));
            edit.append(getCmd(CMDS.edit_replayMacro));
             edit.append(getCmd(CMDS.edit_gotoLine));


            var source = new GUI.Menu();
            source.append(getCmd(CMDS.edit_toggleComment));
            source.append(getCmd(CMDS.edit_toggleInvisibles));
            source.append(getCmd(CMDS.edit_indent));
            source.append(getCmd(CMDS.edit_outdent));
            source.append(getCmd(CMDS.source_format));
            source.append(getCmd(CMDS.source_tslint));

            var refactor = new GUI.Menu();
            refactor.append(getCmd(CMDS.refactor_rename));

            var proj = new GUI.Menu();
            proj.append(getCmd(CMDS.project_open));
            proj.append(getCmd(CMDS.project_close));
            proj.append(new GUI.MenuItem({ type: "separator" }));
            proj.append(getCmd(CMDS.project_build));
            proj.append(getCmd(CMDS.project_validate));

            var buildOnSaveItem = new GUI.MenuItem({ label: 'Build on Save', checked: false, type: "checkbox" });
            proj.append(buildOnSaveItem);
            buildOnSaveItem.click = () => {
                IDE.project.config.buildOnSave = buildOnSaveItem.checked;
            }
            proj.append(getCmd(CMDS.project_refresh));
            proj.append(getCmd(CMDS.project_dependencies));
            proj.append(new GUI.MenuItem({ type: "separator" }));
            proj.append(getCmd(CMDS.project_configure)); 

            var run = new GUI.Menu();
            run.append(getCmd(CMDS.project_run));
            // run.append(getCmd(CMDS.project_debug));


            var window = new GUI.Menu();
            window.append(new GUI.MenuItem({ label: 'Theme', submenu: this.createThemeMenu() }));
            window.append(new GUI.MenuItem({ label: 'Font Size', submenu: this.createFontSizeMenu() }));
            window.append(new GUI.MenuItem({ label: 'Right Margin', submenu: this.createMarginMenu() }));
            window.append(new GUI.MenuItem({ label: 'Views', submenu: this.createViewMenu() }));

            var help = new GUI.Menu();
            help.append(getCmd(CMDS.help_shortcuts));
            help.append(getCmd(CMDS.help_processInfo));
            help.append(getCmd(CMDS.help_devTools));
            help.append(getCmd(CMDS.help_about));
            
            menubar.append(new GUI.MenuItem({ label: 'File', submenu: file }));
            menubar.append(new GUI.MenuItem({ label: 'Edit', submenu: edit }));
            menubar.append(new GUI.MenuItem({ label: 'Source', submenu: source }));
            menubar.append(new GUI.MenuItem({ label: 'Refactor', submenu: refactor }));
            menubar.append(new GUI.MenuItem({ label: 'Project', submenu: proj }));
            menubar.append(new GUI.MenuItem({ label: 'Run', submenu: run }));
            menubar.append(new GUI.MenuItem({ label: 'Window', submenu: window }));
            menubar.append(new GUI.MenuItem({ label: 'Help', submenu: help }));
            
            var win = GUI.Window.get();
            win.menu = menubar;
        }
         
  
        private createFontSizeMenu() {
            var CMDS = Cats.Commands.CMDS;
            var menu = new GUI.Menu();
            this.fontSizes.forEach((size: number) => {
                var item = this.getMenuCommand(CMDS.ide_fontSize,size+"px",size);
                menu.append(item);
            });
            return menu;
        }

        private createMarginMenu() {
            var CMDS = Cats.Commands.CMDS;
            var menu = new GUI.Menu();
            [80, 100, 120, 140, 160, 180, 200].forEach((margin) => {
                var item = this.getMenuCommand(CMDS.ide_rightMargin, margin.toString(), margin);
                menu.append(item);
            });
            return menu;
        }

        private createViewMenu() {
            var CMDS = Cats.Commands.CMDS;
            var menu = new GUI.Menu();
            var views = [
                {id:IDE.toolBar,name:"Toggle Toolbar"},    
                {id:IDE.statusBar,name:"Toggle Statusbar"},
                {id:IDE.infoPane,name:"Toggle Info"}
            ];
            views.forEach((view:any) => {
                    var item = this.getMenuCommand(CMDS.ide_toggleView,view.name,view.id);
                    menu.append(item);
            });
            return menu;
        }

        private createThemeMenu() {
            var CMDS = Cats.Commands.CMDS;
            var menu = new GUI.Menu();
            this.themes.forEach((theme) => {
                if (theme.theme) {
                    var item = this.getMenuCommand(CMDS.ide_theme,theme.label,theme.theme);
                    menu.append(item);
                } else {
                    menu.append(new GUI.MenuItem({
                        type: "separator"
                    }));
                }
            });
            return menu;
        }

    }

  
}

