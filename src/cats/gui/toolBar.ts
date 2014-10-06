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
            Cats.Commands.CMDS.file_new,
            Cats.Commands.CMDS.file_close,
            Cats.Commands.CMDS.file_closeAll,
            Cats.Commands.CMDS.file_save,
            Cats.Commands.CMDS.file_saveAll,
            Cats.Commands.CMDS.file_saveAs,
            null,
            Cats.Commands.CMDS.project_open,
            Cats.Commands.CMDS.project_close,
            Cats.Commands.CMDS.project_build,
            Cats.Commands.CMDS.project_run,
            Cats.Commands.CMDS.project_refresh,
            null,
            Cats.Commands.CMDS.edit_undo,
            Cats.Commands.CMDS.edit_redo,
            Cats.Commands.CMDS.edit_find,
            Cats.Commands.CMDS.edit_replace,
            Cats.Commands.CMDS.edit_indent,
            Cats.Commands.CMDS.edit_outdent,
        //       Cats.Commands.CMDS.edit_toggleComment
            null,
            Cats.Commands.CMDS.ide_history_prev,
            Cats.Commands.CMDS.ide_history_next

        ];


        constructor() {
            super();
            this.init();
        }

        private createButton(cmd: Cats.Commands.Command) {
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
            // var part = new qx.ui.toolbar.Part();
            this.commands.forEach((cmdEnum) => {
                if (cmdEnum === null) {
                    // this.add(part);
                    // part = new qx.ui.toolbar.Part();
                    this.addSeparator();
                } else {
                    var cmd = Cats.Commands.get(cmdEnum);
                    if (cmd) {
                        var button = this.createButton(cmd);
                        this.add(button);
                        // part.add(button);
                    }
                }
            });
            // this.add(part);
            return;
        }

    }
}