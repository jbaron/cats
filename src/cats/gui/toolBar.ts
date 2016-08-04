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

    /**
     * The toolbar for CATS
     */
    export class ToolBar extends qx.ui.toolbar.ToolBar {


        private commands = [
            Cats.Commands.COMMANDNAME.file_new,
            Cats.Commands.COMMANDNAME.file_close,
            Cats.Commands.COMMANDNAME.file_closeAll,
            null,
            Cats.Commands.COMMANDNAME.file_save,
            Cats.Commands.COMMANDNAME.file_saveAll,
            Cats.Commands.COMMANDNAME.file_saveAs,
            null,
            Cats.Commands.COMMANDNAME.project_open,
            Cats.Commands.COMMANDNAME.project_close,
            Cats.Commands.COMMANDNAME.project_build,
            Cats.Commands.COMMANDNAME.project_run,
            Cats.Commands.COMMANDNAME.project_refresh,
            null,
            Cats.Commands.COMMANDNAME.edit_undo,
            Cats.Commands.COMMANDNAME.edit_redo,
            Cats.Commands.COMMANDNAME.edit_find,
            Cats.Commands.COMMANDNAME.edit_replace,
            Cats.Commands.COMMANDNAME.edit_indent,
            Cats.Commands.COMMANDNAME.edit_outdent,
        //       Cats.Commands.CMDS.edit_toggleComment
            null,
            Cats.Commands.COMMANDNAME.ide_history_prev,
            Cats.Commands.COMMANDNAME.ide_history_next,
            
            null,
            Cats.Commands.COMMANDNAME.ide_theme

        ];


        constructor() {
            super();
            this.init();
        }

        private createButton(command: Cats.Commands.COMMANDNAME) {
           var cmd = Commands.commandRegistry.getCommand(command);
           var icon = IDE.icons.toolbar[cmd.name];
           var button = new qx.ui.toolbar.Button(cmd.label, icon);
            button.setShow("icon");
            button.getChildControl("icon").set({
                width: 22,
                height: 22,
                scale: true
            });
            var tooltip = new qx.ui.tooltip.ToolTip(cmd.label, null);
            button.setToolTip(tooltip);
            button.setBlockToolTip(false);
            button.addListener("click", () => {
                cmd.command();
            });
            return button;
        }

        private init() {
            var part = new qx.ui.toolbar.Part();
            this.commands.forEach((cmd) => {
                if (cmd === null) {
                    this.add(part);
                    part = new qx.ui.toolbar.Part();
                } else {
                    var button = this.createButton(cmd);
                    part.add(button);
                }
            });
            this.add(part);
        }


        

    }
}