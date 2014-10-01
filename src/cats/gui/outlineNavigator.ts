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
     * Provide an outline view of the source code.      
     */
    export class OutlineNavigator extends qx.ui.tree.VirtualTree {

        private editor: SourceEditor;
        private page:EditorPage;
        private static MAX = 200;
        private outlineTimer: number;

        constructor() {
            super(null, "label", "kids");
            this.setDecorator(null);
            this.setPadding(0, 0, 0, 0);
            this.setHideRoot(true);

            this.setDecorator(null);
            this.addListener("click", (data) => {
                var item = <any>this.getSelectedItem();
                if (item && item.getPos) {
                    var position = JSON.parse(qx.util.Serializer.toJson(item.getPos())); 
                    IDE.editorTabView.navigateToPage(this.page,position);
                }
            });
            this.setIconPath("kind");
            this.setIconOptions({
                converter: (value, model) => {
                    return this.getIconForKind(value);
                }
            });
            
           
           IDE.editorTabView.onChangeEditor(this.register.bind(this));

        }


        private register(editor:SourceEditor, page) {
            if (this.editor) {
                this.editor.off("outline",  this.updateOutline, this);
            }
            this.page = page;
            if (editor) {
                this.editor = editor;
                editor.on("outline", this.updateOutline,this);
                this.updateOutline(editor.get("outline"));
            } else {
                this.clear();
                this.editor = null;
            }
           
        }

        private getSelectedItem() {
            var item = this.getSelection().getItem(0);
            return item;
        }


        private getIconForKind(name: string) {
            var iconPath = "icon/16/types/";
            switch (name) {
                case "function":
                case "keyword":
                case "method": return iconPath + "method.png";
                case "constructor": return iconPath + "constructor.png";
                case "module": return iconPath + "module.png";
                case "interface": return iconPath + "interface.png";
                case "enum": return iconPath + "enum.png";
                case "class": return iconPath + "class.png";
                case "property":
                case "var": return iconPath + "variable.png";
                default: return iconPath + "method.png";
            }
        }


        clear() {
            this.setModel(null);
        }


        private expandAll(root,count=0) {
            if (root && root.getKids) {
                this.openNode(root);
                var children = root.getKids();
                count += children.length;
                if (count > OutlineNavigator.MAX) return count;
                for (var i=0;i<children.length;i++) {
                    var child = children.getItem(i);
                    count = this.expandAll(child, count);
                    if (count > OutlineNavigator.MAX) return count;
                }
            }
            return count;
        }


        /**
         * Lets check the worker if something changed in the outline of the source.
         * But lets not call this too often.
         */
        private updateOutline(data=[]) {
            // IDE.console.log("Received outline info:" + data.length);
            var root = {
                label : "root",
                kids: data, 
                kind : ""
            };
            this.setModel(qx.data.marshal.Json.createModel(root, false));
            this.expandAll(this.getModel());
        }

       
    }
}