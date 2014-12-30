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
            var form = new qx.ui.form.Form();

            // Prompt message
            form.addGroupHeader("Type a few letters to find a project file to open...");

            // Value text field
            var valuefield = new qx.ui.form.TextField();
            valuefield.setWidth(400);
            form.add(valuefield, "");

            this.addListener("appear", () => {
                valuefield.focus();
            });

            // File list
            var filelist = new qx.ui.form.List();
            for (var i = 0; i < this.files.length; i++) {
              var file = this.files[i];
              var item = new qx.ui.form.ListItem(file);
              filelist.add(item);
              if (i === 0) {
                  filelist.addToSelection(item);
              }
            }
            form.add(filelist, "");

            valuefield.addListener("input", () => {
                var query = valuefield.getValue();
                var opts = {
                    pre  : '<strong>',
                    post : '</strong>'
                };
                var results = fuzzy.filter(query, this.files, opts);
                filelist.removeAll();
                for (var i = 0; i < results.length; i++) {
                    var result = results[i];
                    var item = new qx.ui.form.ListItem(result.string);
                    item.setRich(true);
                    filelist.add(item);
                    if (i === 0) {
                        filelist.addToSelection(item);
                    }
                }
            });

            // Success command
            var successCommand = new qx.ui.core.Command("Enter");
            successCommand.addListener("execute", () => {
                var results = filelist.getSelection();
                if (results.length > 0) {
                    var result = <qx.ui.basic.Atom>results[0];
                    var label = result.getLabel();
                    var relativePath = label.replace(/<\/?strong>/g, "");
                    var filePath = OS.File.join(this.project.projectDir, relativePath);
                    FileEditor.OpenEditor(filePath);
                    this.close();
                };
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

            // Ok button
            var okbutton = new qx.ui.form.Button("Ok");
            form.addButton(okbutton);
            okbutton.setCommand(successCommand);

            // Cancel button
            var cancelbutton = new qx.ui.form.Button("Cancel");
            cancelbutton.setCommand(cancelCommand);
            form.addButton(cancelbutton);

            var renderer = new qx.ui.form.renderer.Single(form);
            this.add(renderer);
        }

    }

}

