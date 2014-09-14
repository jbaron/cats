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

        private editor: Editor;
        private page:EditorPage;
        private static MAX = 200;

        constructor() {
            super(null, "label", "children");
            this.setDecorator(null);
            this.setPadding(0, 0, 0, 0);
            this.setHideRoot(true);

            this.setDecorator(null);
            this.addListener("click", (data) => {
                var item = <any>this.getSelectedItem();
                if (item) {
                    var position = this.modelToPosition(item.getRange().getStart());
                    IDE.editorTabView.navigateToPage(this.page,position);
                }
            });
            this.setIconPath("");
            this.setIconOptions({
                converter: (value, model) => {
                    return this.getIconForKind(value.getKind());
                }
            });
            
            IDE.editorTabView.addListener("changeSelection", (ev) => {
                var page:EditorPage = ev.getData()[0];
                if (page) {
                    this.page = page;
                    this.register(page.editor);
                } else {
                    this.register(null);
                }
            });

        }

        private modelToPosition(start): Ace.Position {
            var result = {
                row: start.getRow(),
                column: start.getColumn()
            };
            return result;

        }


        private register(editor) {
            if (this.editor) {
                this.editor.off("outline", this.setData, this);
            }
            
            this.editor = editor;
            
            if (editor && editor.outline) {
                editor.on("outline", this.setData,this);
                this.setData(editor.outline);
            } else {
                this.clear();
            }
        }

        private getSelectedItem() {
            var item = this.getSelection().getItem(0);
            return item;
        }


        private getIconForKind(name: string) {
            var iconPath = "./resource/qx/icon/Oxygen/16/types/";
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
            if (root && root.getChildren) {
                this.openNode(root);
                var children = root.getChildren();
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


        private isExecutable(kind) {
            if (kind === "method" || kind === "function" || kind === "constructor") return true;
            return false;
        }

        /**
         * Set the data for this outline.
         */
        setData(data: Cats.NavigateToItem[]) {
            if ((!data) || (!data.length)) {
                this.clear();
                return;
            }

            var parents = {};
            var root = {};

            data.forEach((item) => {
                var parentName = item.containerName;
                var parent = parentName ? parents[parentName] : root;
                if (!parent) console.info("No Parent for " + parentName);
                if (!parent.children) parent.children = [];

                var extension = this.isExecutable(item.kind) ? "()" : "";

                var entry = {
                    label: item.name + extension,
                    range: item.range,
                    kind: item.kind
                };

                var childName = parentName ? parentName + "." + item.name : item.name;
                parents[childName] = entry;
                parent.children.push(entry);
            });
            this.setModel(qx.data.marshal.Json.createModel(root, false));
            this.expandAll(this.getModel());

        }

    }
}