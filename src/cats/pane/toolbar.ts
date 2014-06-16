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

module Cats.View {

    export class BasePane implements IView {

        constructor(public root: HTMLElement) { }

        icon: string = "";
        name: string = "";
        show() { this.root.style.display = "block" }
        hide() { this.root.style.display = "none" }

        appendTo(parent: HTMLElement) {
            parent.appendChild(this.root);
        }

    }


    export class ToolBar extends BasePane {



        constructor() {
            super(document.getElementById("toolbar"));
            this.initToolBar();
        }



        initToolBar() {
            var t = document.getElementById("toolbar");
            t.innerHTML = "";
            var cmds = Cats.Commands.getAllCommands();
            cmds.forEach((cmd) => {
                if (cmd.icon) {
                    var button = <HTMLElement>document.createElement("button");
                    button.style.backgroundImage = "url(.." + "/static/img/" + cmd.icon + ")";
                    button.title = cmd.label;
                    button.onclick = <any>cmd.command;
                    t.appendChild(button);
                }
            });
        }


    }

}