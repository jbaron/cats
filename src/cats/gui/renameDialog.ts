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
     * Dialog window for capturing rename options and invoke 
     * required functionality
     */
    export class RenameDialog extends qx.ui.window.Window {

        private form = new qx.ui.form.Form();
        private rootDir: string;

        constructor() {
            super("Rename");
            var layout = new qx.ui.layout.VBox();
            this.setLayout(layout);
            this.add(this.createForm());
            this.setModal(true);
            this.addListener("resize", this.center);
        }


        run(fileName: string, project: Project, pos: Position) {
            project.iSense.getRenameInfo(fileName, pos, (err, data) => {
                if (!data) return;
                if (!data.canRename) {
                    alert("Cannot rename the selected element");
                    return;
                }

                var dialog = new Gui.PromptDialog("Rename " + data.displayName + " into:");
                dialog.onSuccess = (newName: string) => {
                  project.iSense.findRenameLocations(fileName, pos, false, false, (err:any, data: Cats.FileRange[]) => {
                      // renameOccurences(data, newName);
                  });
                };
                dialog.show();
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
            var s = this.addTextField("New name", "name");
            s.setRequired(true);

            var c = this.addCheckBox("Replace in strings", "caseInsensitive");
            c.setValue(false);


            var d = this.addCheckBox("Replace in comments", "caseInsensitive");
            d.setValue(false);


            var searchButton = new qx.ui.form.Button("Refactor");
            var cancelButton = new qx.ui.form.Button("Cancel");

            this.form.addButton(searchButton);
            searchButton.addListener("execute", () => {
                if (this.form.validate()) {
                    var param = {
                        name: s.getValue(),
                        caseInsensitive: c.getValue(),
                    };
                   // this.run(param);
                };
            }, this);
            this.form.addButton(cancelButton);
            cancelButton.addListener("execute", () => {
                this.close();
            }, this);
            var renderer = new qx.ui.form.renderer.Single(this.form);
            return renderer;
        }

       

    }
}
