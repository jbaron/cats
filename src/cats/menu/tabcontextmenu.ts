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



    function getTab() {
    }

    function nop() {
        alert("not yet implemented");
    }


    export class TabContextMenu {

        private ctxmenu;
        private lastEvent: MouseEvent;

        constructor(private editor: Cats.Editor) {
            // Create a new menu
            this.ctxmenu = new GUI.Menu();

            // Add the items
            this.ctxmenu.append(new GUI.MenuItem({
                label: 'Close this tab',
                click: nop
            }));

            this.ctxmenu.append(new GUI.MenuItem({
                label: 'Close other tabs',
                click: nop
            }));

            this.ctxmenu.append(new GUI.MenuItem({
                label: 'Close all tabs',
                click: nop
            }));

            this.ctxmenu.append(new GUI.MenuItem({
                label: 'Close active tab',
                click: nop
            }));

        }

        // Bind this context menu to an HTML element
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