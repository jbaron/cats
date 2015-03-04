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
     * Basic Qooxdoo-powered replacement for native `prompt` usage in
     * CATS.
     */
    export class PromptDialog extends qx.ui.window.Window {
        onSuccess: (value: string) => void;

        constructor(text: string, value = "") {
            super(name);

            var layout = new qx.ui.layout.VBox();
            this.setLayout(layout);
            this.setModal(true);
            this.setShowMinimize(false);
            this.setShowMaximize(false);

            this.addControls(text, value);
            this.addListener("resize", this.center);
        }

        private addControls(text: string, value: string) {
            var form = new qx.ui.form.Form();

            // Prompt message
            form.addGroupHeader(text);

            // Value text field
            var valuefield = new qx.ui.form.TextField();
            valuefield.setValue(value);
            valuefield.setWidth(400);
            form.add(valuefield, "");

            this.addListener("appear", () => {
                valuefield.focus();
            });

            // Success command
            var successCommand = new qx.ui.core.Command("Enter");
            successCommand.addListener("execute", () => {
                if (form.validate()) {
                    if (this.onSuccess) {
                      this.onSuccess(valuefield.getValue());
                    }
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
