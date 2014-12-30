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
    var fuzzy: any;

    function throttle(fn, threshhold = 250, context = null) {
        var last,
            deferTimer;
        return function () {
            var now = +new Date,
                args = arguments;
            if (last && now < last + threshhold) {
                // hold on to it
                clearTimeout(deferTimer);
                deferTimer = setTimeout(function () {
                    last = now;
                    fn.apply(context, args);
                }, threshhold);
            } else {
                last = now;
                fn.apply(context, args);
            }
        };
    }
    
    /**
     * Quickly open any typescript file in a project.
     */
    export class QuickOpenDialog extends qx.ui.window.Window {
        files: Array<string> = [];

        constructor(public project: Project) {
            super("Quick Open");

            if (!fuzzy) fuzzy = require("fuzzy");
            this.collectFiles();

            var layout = new qx.ui.layout.VBox();
            layout.setSpacing(6);
            this.setLayout(layout);
            this.setModal(true);
            this.setShowMinimize(false);
            this.setShowMaximize(false);

            this.addControls();
            this.addListener("resize", this.center);
        }

        collectFiles() {
            var projectDir = this.project.projectDir;
            this.project.getScripts().forEach((absolutePath) => {
                if (absolutePath.lastIndexOf(projectDir, 0) === 0) {
                    var relativePath = absolutePath.slice(projectDir.length + 1);
                    this.files.push(relativePath);
                }
            });
        }

        private addControls() {
            // Prompt message
            // form.addGroupHeader("Type a few letters to find a project file to open...");

            // Value text field
            var valuefield = new qx.ui.form.TextField();
            valuefield.setWidth(450);
            this.add(valuefield);

            this.addListener("appear", () => {
                valuefield.focus();
            });

            // File list
            var filelist = new qx.ui.form.List();
            filelist.setMinHeight(500);
            this.add(filelist);

            var doFilter = () => {
                var query = valuefield.getValue();
                var opts = {
                    pre  : '{{{',
                    post : '}}}'
                };
                var results = fuzzy.filter(query, this.files, opts);
                filelist.removeAll();
                for (var i = 0; i < results.length; i++) {
                    var result = results[i];

                    function format(str) {
                        return str.replace(/{{{/g, "<strong>").replace(/}}}/g, "</strong>");
                    }
                    var cutIndex = result.string.lastIndexOf('/');
                    var long  = result.string;
                    var short = result.string.slice(cutIndex + 1);
                    var pretty = "<span style='font-size: 120%; display: block;'>" + format(short) +
                                 "</span><span style='opacity: 0.7;'>" + format(long) + "</span>";

                    var item = new qx.ui.form.ListItem(pretty);
                    item.setRich(true);
                    item.setModel(result.original);
                    filelist.add(item);
                    if (i === 0) {
                        filelist.addToSelection(item);
                    }
                }
            };
            valuefield.addListener("input", throttle(doFilter, 100));

            valuefield.addListener("keypress", (ev) => {
                var id = ev.getKeyIdentifier();
                switch (id) {
                    case "Down":
                    case "Up":
                        filelist.handleKeyPress(ev);
                        break;
                }
            });

            // Success command
            var successCommand = new qx.ui.core.Command("Enter");
            successCommand.addListener("execute", () => {
                var results = filelist.getSelection();
                if (results.length > 0) {
                    var result = <qx.ui.form.ListItem>results[0];
                    var relativePath = result.getModel();
                    var filePath = OS.File.join(this.project.projectDir, relativePath);
                    FileEditor.OpenEditor(filePath);
                    this.close();
                };
            });
            filelist.addListener("dblclick", () => {
                successCommand.execute(null);
            });

            // Cancel command
            var cancelCommand = new qx.ui.core.Command("Escape");
            cancelCommand.addListener("execute", () => {
                this.close();
            });

            // Command cleanup
            this.addListener("close", () => {
                successCommand.setEnabled(false);
                cancelCommand.setEnabled(false);
            });
        }

    }

}

