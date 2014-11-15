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
     * Searchdialog for searching specific strings within the files.
     */
    export class SearchDialog extends qx.ui.window.Window {

        private form = new qx.ui.form.Form();
        private rootDir: string;


        constructor() {
            super("Search in Files");
            var layout = new qx.ui.layout.VBox();
            this.setLayout(layout);
            this.add(this.createForm());
            this.setModal(true);
            this.addListener("resize", this.center);
        }

        /**
         * Open the search dialog with a root directory
         */ 
        search(rootDir:string) {
            this.rootDir = rootDir;
            this.show();
        }


        private getResults(fileName: string, pattern: RegExp, result: Cats.FileRange[]) {
            try {
                var content = OS.File.readTextFile(fileName);
                if (!content.match(pattern)) return;

                var lines = content.split("\n");
                for (var x = 0; x < lines.length; x++) {
                    var line = lines[x];
                    var match:RegExpMatchArray = null;
                    while (match = pattern.exec(line)) {
                        var columnX = pattern.lastIndex - match[0].length;
                        var columnY = pattern.lastIndex;
                        var item: Cats.FileRange = {
                            range: {
                                start: { row: x, column: columnX },
                                end: { row: x, column: columnY }
                            },
                            fileName: fileName,
                            message: line
                        };
                        result.push(item);
                    }
                }
            } catch (err) {
                console.error("Got error while handling file " + fileName);
                console.error(err);
            }
        }

        private run(param:any) {
            var result: Cats.FileRange[] = [];
            var mod = param.caseInsensitive ? "i" : "";
            var searchPattern = new RegExp(param.search, "g" + mod);
            if (!param.glob) param.glob = "**/*";
            OS.File.find(param.glob, this.rootDir, (err: Error, files: Array<string>) => {
                files.forEach((file) => {
                    if (result.length > param.maxHits) return;
                    var fullName = OS.File.join(this.rootDir, file);
                    this.getResults(fullName, searchPattern, result);
                });
                var resultTable = new ResultTable();
                var toolTipText = "Search results for " + searchPattern + " in " + this.rootDir + "/" + param.glob;
                var page = IDE.resultPane.addPage("search", resultTable, toolTipText);
                page.setShowCloseButton(true);
                resultTable.setData(result);
                this.close();
            });
        }

        private addTextField(label: string, model: string) {
            var t = new qx.ui.form.TextField();
            t.setWidth(200);
            this.form.add(t, label, null, model);
            return t;
        }

        private addSpinner(label: string, model: string) {
            var s = new qx.ui.form.Spinner();
            s.set({ minimum: 0, maximum: 1000 });
            this.form.add(s, label, null, model);
            return s;
        }

        private addCheckBox(label: string, model?: string) {
            var cb = new qx.ui.form.CheckBox();
            this.form.add(cb, label, null, model);
            return cb;
        }

        private createForm() {
            var s = this.addTextField("Search for", "search");
            s.setRequired(true);

            var p = this.addTextField("File Pattern", "glob");
            p.setValue("**/*");

            var c = this.addCheckBox("Case insensitive", "caseInsensitive");
            c.setValue(false);

            var m = this.addSpinner("Maximum hits", "maxHits");
            m.setValue(100);

            var searchButton = new qx.ui.form.Button("Search");
            var cancelButton = new qx.ui.form.Button("Cancel");

            this.form.addButton(searchButton);
            searchButton.addListener("execute", () => {
                if (this.form.validate()) {
                    var param = {
                        search: s.getValue(),
                        glob: p.getValue(),
                        caseInsensitive: c.getValue(),
                        maxHits: m.getValue()
                    };
                    this.run(param);
                };
            }, this);
            this.form.addButton(cancelButton);
            cancelButton.addListener("execute", () => {
                this.close();
            }, this);
            var renderer = new qx.ui.form.renderer.Single(this.form);
            return renderer;
        }

        private createResultTable() {
            var r = new ResultTable();
            return r;
        }

    }
}