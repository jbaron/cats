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
     * Base class for all the configuration dialogs forms in
     * CATS.
     */
    export class ConfigDialog extends qx.ui.window.Window {

        constructor(name:string) {
            super(name);

            var layout = new qx.ui.layout.VBox();
            this.setLayout(layout);
            this.setModal(true);

            this.addTabs();
            this.addButtons();
            this.addListener("resize", this.center);
        }

        protected addTabs() {
            // to do in subclasses;
        }

        protected saveValues() {
            // to do in subclass
        }

        private addButtons() {
            // Save button
            var form = new qx.ui.form.Form();
            var okbutton = new qx.ui.form.Button("Ok");
            form.addButton(okbutton);
            okbutton.addListener("execute", () => {
                if (form.validate()) {
                    this.saveValues();
                    this.close();
                };
            }, this);

            // Cancel button
            var cancelbutton = new qx.ui.form.Button("Cancel");
            form.addButton(cancelbutton);
            cancelbutton.addListener("execute", function() {
                this.close();
            }, this);

            var renderer = new qx.ui.form.renderer.Single(form);
            this.add(renderer);
            // this.add(form);
        }

    }


    /**
     * Base class for all configuration tab pages. Contains a number
     * of helper methods to quickly add a form element.
     */
    export class ConfigDialogPage extends qx.ui.tabview.Page {

        form = new qx.ui.form.Form();
        model: qx.core.Object;

        constructor(name: string) {
            super(name);
            this.setLayout(new qx.ui.layout.Canvas());
        }

        protected addCheckBox(model: string) {
            var cb = new qx.ui.form.CheckBox();
            var label = this.getLabelString(model);
            this.form.add(cb, label, null, model);
        }
        
        private getLabelString(model:string) {
            if (!model) return "<model undefined>";
            var labelId = "config_" + model;
            var label = this.tr(labelId);
            if (label != labelId) return label;
            
            return model.split(/(?=[A-Z])/).join(" ");
        }
        

        protected addSpinner(model: string, min: number, max: number) {
            var s = new qx.ui.form.Spinner();
            s.set({ minimum: min, maximum: max });
            var label = this.getLabelString(model);
            this.form.add(s, label, null, model);
        }

        protected addTextField(model: string) {
            var t = new qx.ui.form.TextField();
            t.setWidth(200);
            var label = this.getLabelString(model);
            this.form.add(t, label, null, model);
        }

        protected addSelectBox(model: string, items: Array<any>) {
            var s = new qx.ui.form.SelectBox();
            items.forEach((item) => {
                var listItem = new qx.ui.form.ListItem(item.label, null, item.model);
                s.add(listItem);
            });
            var label = this.getLabelString(model);
            this.form.add(s, label, null, model);
        }

        setData(data: any) {
            for (var key in data) {
                try {
                    this.model.set(key, data[key]);
                } catch (err) { /* NOP */ }
            }
        }

        /**
         * Get the data back as a JSON object
         */
        getData() {
            var result = JSON.parse(qx.util.Serializer.toJson(this.model));
            return result;
        }

        protected finalStep() {
            var controller = new qx.data.controller.Form(null, this.form);
            this.model = controller.createModel(false);
            var renderer = new qx.ui.form.renderer.Single(this.form);
            this.add(renderer);
        }

    }


}
