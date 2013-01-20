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

    export var IDE = Cats.IDE;

    // This class creates the main menubar and has the actions that are linked to the 
    // menubar.
    class Menubar {

        menubar;

        fontSizes = [10, 12, 14, 16, 18, 20];

        themes = [
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


        constructor() {
            var menubar = new gui.Menu({ type: 'menubar' });
            var getCmd = Cats.Commands.getMenuCommand;
            var CMDS = Cats.Commands.CMDS;

            var file = new gui.Menu();
            file.append(getCmd(CMDS.file_new));
            file.append(new gui.MenuItem({ type: "separator" }));
            file.append(getCmd(CMDS.file_save));
            file.append(getCmd(CMDS.file_saveAs));
            file.append(getCmd(CMDS.file_saveAll));
            file.append(new gui.MenuItem({ type: "separator" }));
            file.append(getCmd(CMDS.file_close));
            file.append(getCmd(CMDS.file_closeAll));
            file.append(getCmd(CMDS.file_closeOther));
            file.append(new gui.MenuItem({ type: "separator" }));
            file.append(getCmd(CMDS.ide_quit));

            var edit = new gui.Menu();
            // edit.append(this.editorCommand("undo"));
            edit.append(getCmd(CMDS.edit_undo));
            edit.append(getCmd(CMDS.edit_redo));
            edit.append(new gui.MenuItem({ type: "separator" }));
            edit.append(getCmd(CMDS.edit_cut));
            edit.append(getCmd(CMDS.edit_copy));
            edit.append(getCmd(CMDS.edit_paste));
            edit.append(new gui.MenuItem({ type: "separator" }));
            edit.append(getCmd(CMDS.edit_find));
            edit.append(getCmd(CMDS.edit_findNext));
            edit.append(getCmd(CMDS.edit_findPrev));
            edit.append(getCmd(CMDS.edit_replace));
            edit.append(getCmd(CMDS.edit_replaceAll));
            
            edit.append(new gui.MenuItem({ type: "separator" }));
            edit.append(getCmd(CMDS.edit_toggleRecording));
            edit.append(getCmd(CMDS.edit_replayMacro));


            var source = new gui.Menu();
            source.append(getCmd(CMDS.edit_toggleComment));
            source.append(getCmd(CMDS.edit_indent));
            source.append(getCmd(CMDS.edit_outdent));
            source.append(new gui.MenuItem({ label: 'Format code', click: this.formatText }));

            var refactor = new gui.Menu();
            refactor.append(getCmd(CMDS.refactor_rename));

            var navigate = new gui.Menu();
            navigate.append(getCmd(CMDS.navigate_declaration));
            navigate.append(getCmd(CMDS.navigate_references));
            navigate.append(getCmd(CMDS.navigate_occurences));
            navigate.append(getCmd(CMDS.navigate_implementors));

            var proj = new gui.Menu();
            proj.append(getCmd(CMDS.project_open));
            proj.append(getCmd(CMDS.project_close));
            proj.append(new gui.MenuItem({ type: "separator" }));
            proj.append(getCmd(CMDS.project_build));
            proj.append(getCmd(CMDS.project_refresh));
            proj.append(getCmd(CMDS.project_properties));


            var run = new gui.Menu();
            run.append(getCmd(CMDS.project_run));
            run.append(getCmd(CMDS.project_debug));


            var window = new gui.Menu();
            window.append(new gui.MenuItem({ label: 'Theme', submenu: this.createThemeMenu() }));
            window.append(new gui.MenuItem({ label: 'Font size', submenu: this.createFontSizeMenu() }));
            

            var help = new gui.Menu();
            help.append(getCmd(CMDS.help_shortcuts));
            help.append(getCmd(CMDS.help_processInfo));
            help.append(getCmd(CMDS.help_devTools));
            help.append(getCmd(CMDS.help_about));
            
            /*
            help.append(new gui.MenuItem({ label: 'Keyboard shortcuts', click: this.showShortcuts }));
            help.append(new gui.MenuItem({ label: 'Process Info', click: this.showProcess }));
            help.append(new gui.MenuItem({ label: 'Developers tools', click: this.showDevTools }));
            help.append(new gui.MenuItem({ label: 'About CATS', click: this.showAbout }));
            */

            menubar.append(new gui.MenuItem({ label: 'File', submenu: file }));
            menubar.append(new gui.MenuItem({ label: 'Edit', submenu: edit }));
            menubar.append(new gui.MenuItem({ label: 'Source', submenu: source }));
            menubar.append(new gui.MenuItem({ label: 'Refactor', submenu: refactor }));
            menubar.append(new gui.MenuItem({ label: 'Navigate', submenu: navigate }));
            menubar.append(new gui.MenuItem({ label: 'Project', submenu: proj }));
            menubar.append(new gui.MenuItem({ label: 'Run', submenu: run }));
            menubar.append(new gui.MenuItem({ label: 'Window', submenu: window }));
            menubar.append(new gui.MenuItem({ label: 'Help', submenu: help }));
            
            var win = gui.Window.get();
            win.menu = menubar;
            this.menubar = menubar;
        }


        // TODO i18n
        getLabelForCommand(commandName: string) {
            var label = commandName[0].toUpperCase() + commandName.slice(1);
            var platform = Cats.mainEditor.aceEditor.commands.platform;
            var command = Cats.mainEditor.aceEditor.commands.byName[commandName];

            var tabs = 5 - Math.floor((label.length / 4) - 0.01);
            label = label + "\t\t\t\t\t\t".substring(0, tabs);
            if (command && command.bindKey) {
                var key = command.bindKey[platform];
                if (key) label += key ;
            }
            return label;
        }


        
     
        formatText() {
            var session = Cats.mainEditor.activeSession;
            session.project.iSense.perform("getFormattedTextForRange", session.name, 0, session.getValue().length, (err, result) => {
                if (!err) session.setValue(result);
            });
        }




        nop() {
            alert("Not yet implemented");
        };

            //undoChange() {
            //  var man = cats.mainEditor.aceEditor.getSession().getUndoManager();
            //  man.undo();
            //}
            //
            //redoChange() {
            //  var man = cats.mainEditor.aceEditor.getSession().getUndoManager();
            //  man.redo();
            //}

        enableFind() {
            window.open('findreplace.html', '_blank');
        }

        actionFind() {
            var input = <HTMLInputElement>document.getElementById("findText");
            Cats.mainEditor.aceEditor.find(input.value, {}, true);
        }

        actionReplace() {
            var findText = <HTMLInputElement>document.getElementById("findText");
            var replaceText = <HTMLInputElement>document.getElementById("replaceText");
            var options = {
                needle: findText.value
            };
            Cats.mainEditor.aceEditor.replace(replaceText.value, options);
        }

        setThemeWrapper(theme) {
            return function setTheme() {
                Cats.mainEditor.setTheme(theme);
            }
        }

        createFontSizeMenu() {
            var menu = new gui.Menu();
            this.fontSizes.forEach((size: number) => {
                menu.append(new gui.MenuItem({
                    label: size + "px",
                    click: () => { Cats.mainEditor.aceEditor.setFontSize(size + "px") }
                }));
            });
            return menu;
        }

        createThemeMenu() {
            var menu = new gui.Menu();
            this.themes.forEach((theme) => {
                if (theme.theme) {
                    menu.append(new gui.MenuItem({
                        label: theme.label,
                        click: this.setThemeWrapper(theme.theme)
                    }));
                } else {
                    menu.append(new gui.MenuItem({
                        type: "separator"
                    }));
                }
            });
            return menu;
        }

        enableReplace() {
            document.getElementById("findArea").style.display = "block";
            document.getElementById("replaceArea").style.display = "block";
        }


    }

    export var mainMenuBar;
    export function createMenuBar() {
        mainMenuBar = new Menubar();
    }


}


// global.actionFind = Menu.mainMenuBar.actionFind; 