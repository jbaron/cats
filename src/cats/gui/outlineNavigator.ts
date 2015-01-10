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
     * 
     * When you click on an entry wihin the outline, the corresponding source file will be opened 
     * at the righ position.
     */
    export class OutlineNavigator extends qx.ui.tree.VirtualTree {

        private editor: Editor.SourceEditor;
        private page:EditorPage;
        private static MAX_DEFAULT_OPEN = 200;
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
                converter: (value) => {
                    var icon = IDE.icons.kind[value] || IDE.icons.kind["default"];
                    return icon;
                }
            });
            
           
           IDE.editorTabView.onChangeEditor(this.register.bind(this));

        }


        private register(editor:Editor.SourceEditor, page) {
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

        /**
         * Clear the content of the outline navigator
         * 
         */ 
        clear() {
            this.setModel(null);
        }


        private expandAll(root,count=0) {
            if (root && root.getKids) {
                this.openNode(root);
                var children = root.getKids();
                count += children.length;
                if (count > OutlineNavigator.MAX_DEFAULT_OPEN) return count;
                for (var i=0;i<children.length;i++) {
                    var child = children.getItem(i);
                    count = this.expandAll(child, count);
                    if (count > OutlineNavigator.MAX_DEFAULT_OPEN) return count;
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