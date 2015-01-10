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


    function handleClick() {
        var line = this.innerText;
        var sections = line.split("(");
        var fileName = sections[0];
        var location:Array<string> = sections[1].split(")")[0].split(",");
        
        fileName = OS.File.PATH.resolve(IDE.project.projectDir, fileName);
        fileName = OS.File.switchToForwardSlashes(fileName);
        FileEditor.OpenEditor(fileName,{ 
            row : parseInt(location[0], 10)-1,
            column : parseInt(location[1], 10)-1
        });
    }

    /**
     * Basic logging widget that can be used to write 
     * logging information that are of interest to the user.
     * 
     */
    export class ConsoleLog extends qx.ui.embed.Html {

        private container: HTMLElement;
        private printTime = true;
        private tsRef = /ts\([0-9]+,[0-9]+\):/i ;
  
        constructor() {
            super(null);
            this.setPadding(2, 2, 2, 2);
            this.setDecorator(null);
            this.setOverflow("auto", "auto");
            this.addListenerOnce("appear", () => {
                this.container = this.getContentElement().getDomElement();
            });
            this.setContextMenu(this.createContextMenu());
            this.setFocusable(false);
        }

 

        private addBody(parent: HTMLSpanElement,prefix: string, line:string) {
            if (line.search(this.tsRef) === -1) {
                parent.innerText = prefix + line;
            } else {
                parent.innerText = prefix;
                var a = document.createElement("a");
                a.href = "#";
                a.onclick = handleClick;
                a.innerText = line;
                parent.appendChild(a);
            }
        }

        private insertLine(prefix:string, line: string, severity: number) {
            if (line.trim()) {
                var elem = document.createElement("span");// HTMLAnchorElement|HTMLSpanElement;
                this.addBody(elem,prefix, line);
                if (severity===2) elem.style.color = "red";
                if (severity===1) elem.style.color = "green";
                this.container.appendChild(elem);
            }
            this.container.appendChild(document.createElement('BR'));
        }

        private print(msg: string, severity:number) {
            this.container.scrollTop = this.container.scrollHeight;
            this.fireDataEvent("contentChange", null);
            if (this.container) {
                var prefix = "";
                if (this.printTime) {
                    var dt = new Date();
                    prefix = dt.toLocaleTimeString() + " ";
                }
                var lines = msg.split("\n");
                lines.forEach((line) => {
                    this.insertLine(prefix, line, severity);
                });

                this.container.scrollTop = this.container.scrollHeight;
            }
        }
        
        /**
         * Log a message to the console widget. This should only be used for 
         * logging mesages that are useful to the enduser (= developer) and not for
         * debug information.
         * 
         */
        log(msg: string) {
            this.print(msg,0);
        }

        info(msg: string) {
            this.print(msg,1);
        }

        error(msg: string) {
            this.print(msg, 2);
        }

        private createContextMenu() {
            var menu = new qx.ui.menu.Menu();
            var item1 = new qx.ui.menu.Button("Clear Output");
            item1.addListener("execute", () => { this.clear(); });
            menu.add(item1);

            var item2 = new qx.ui.menu.Button("Toggle Print Time");
            item2.addListener("execute", () => { this.printTime = !this.printTime; });
            menu.add(item2);

            return menu;
        }

        private clear() {
            if (this.container) this.container.innerHTML = "";
        }

    }
}