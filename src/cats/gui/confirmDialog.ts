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
     * Basic Qooxdoo-powered replacement for native `confirm` usage in
     * CATS.
     */
    export class ConfirmDialog extends qx.ui.window.Window {
        onConfirm: () => void;
        onCancel: () => void;

        constructor(text: string) {
            super(name);

            var layout = new qx.ui.layout.VBox();
            this.setLayout(layout);
            this.setModal(true);
            this.setShowMinimize(false);
            this.setShowMaximize(false);

            this.addControls(text);
            this.addListener("resize", this.center);
        }

        private addControls(text: string) {
            var form = new qx.ui.form.Form();

            // Prompt message
            form.addGroupHeader(text);

            // Confirm command
            var confirmCommand = new qx.ui.core.Command("Enter");
            confirmCommand.addListener("execute", () => {
                if (this.onConfirm) {
                  this.onConfirm();
                }
                this.close();
            });

            // Cancel command
            var cancelCommand = new qx.ui.core.Command("Escape");
            cancelCommand.addListener("execute", () => {
                if (this.onCancel) {
                  this.onCancel();
                }
                this.close();
            });

            // Command cleanup
            this.addListener("close", () => {
                confirmCommand.setEnabled(false);
                cancelCommand.setEnabled(false);
            });

            // Confirm button
            var okbutton = new qx.ui.form.Button("Confirm");
            form.addButton(okbutton);
            okbutton.setCommand(confirmCommand);

            // Cancel button
            var cancelbutton = new qx.ui.form.Button("Cancel");
            cancelbutton.setCommand(cancelCommand);
            form.addButton(cancelbutton);

            var renderer = new qx.ui.form.renderer.Single(form);
            this.add(renderer);
        }

    }

}

