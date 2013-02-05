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
     * Context menu for the main editor
     */ 
    export class EditorContextMenu {

        private ctxmenu;
        private lastEvent: MouseEvent;

        constructor(private editor: Cats.TextEditor) {
            // Create a new menu
            this.ctxmenu = new GUI.Menu();
            var getCmd = Cats.Commands.getMenuCommand;
            var CMDS = Cats.Commands.CMDS;

            // Add the items
            this.ctxmenu.append(getCmd(CMDS.navigate_declaration));
            this.ctxmenu.append(getCmd(CMDS.navigate_references));
            this.ctxmenu.append(getCmd(CMDS.navigate_occurences));
            this.ctxmenu.append(getCmd(CMDS.navigate_implementors));

        }

        /**
         * Bind this context menu to an HTML element
         */ 
        bindTo(elem: HTMLElement) {

            elem.oncontextmenu = (ev: any) => {
                ev.preventDefault();
                if (this.editor.activeSession.mode === "typescript") {
                    this.lastEvent = ev;
                    this.ctxmenu.popup(ev.x, ev.y);
                }
                return false;
            };
        }


    }


}