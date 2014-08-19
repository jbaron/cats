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
     * is not using Qooxdoo but an API exposed by nodewebkit. 
     * This makes it possible to have the feeling of a native menubar.
     */
    export class Menubar {

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
                click = function() { cmd.command.apply(this,params); };
            } else {
                click = cmd.command;
            }
            var item:any = {
                label: label || cmd.label,
                click: click
            };
  
            return new GUI.MenuItem(item);
        }


        constructor() {
            var menubar = new GUI.Menu({ type: 'menubar' });
            
            // @TODO fix a bit nicer
            if (OS.File.isOSX() && menubar.createMacBuiltin) {
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

            var proj = new GUI.Menu();
            proj.append(getCmd(CMDS.project_open));
            proj.append(getCmd(CMDS.project_close));
            proj.append(new GUI.MenuItem({ type: "separator" }));
            proj.append(getCmd(CMDS.project_build));
            proj.append(getCmd(CMDS.project_validate));

            proj.append(getCmd(CMDS.project_refresh));
            proj.append(getCmd(CMDS.project_dependencies));
            proj.append(new GUI.MenuItem({ type: "separator" }));
            proj.append(getCmd(CMDS.project_configure)); 
            proj.append(getCmd(CMDS.project_document)); 
            proj.append(getCmd(CMDS.project_run));
 
    

            var window = new GUI.Menu();
            window.append(new GUI.MenuItem({ label: 'Views', submenu: this.createViewMenu() }));

            var help = new GUI.Menu();
            help.append(getCmd(CMDS.help_shortcuts));
            help.append(getCmd(CMDS.help_processInfo));
            help.append(getCmd(CMDS.help_devTools));
            help.append(getCmd(CMDS.help_about));
            
            menubar.append(new GUI.MenuItem({ label: 'File', submenu: file }));
            menubar.append(new GUI.MenuItem({ label: 'Edit', submenu: edit }));
            menubar.append(new GUI.MenuItem({ label: 'Source', submenu: source }));
            menubar.append(new GUI.MenuItem({ label: 'Project', submenu: proj }));
            menubar.append(new GUI.MenuItem({ label: 'Window', submenu: window }));
            menubar.append(new GUI.MenuItem({ label: 'Help', submenu: help }));
            
            var win = GUI.Window.get();
            win.menu = menubar;
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


    }

  
}

