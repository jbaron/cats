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
export class OutlineNavigator extends qx.ui.tree.VirtualTree  {

    private session: Cats.Session;
 
    constructor() {
        super(null,"label", "children");
        this.setDecorator(null);
        this.setPadding(0,0,0,0);
        this.setHideRoot(true);

        this.setDecorator(null);
        this.addListener("click", (data) => {
            var item = <any>this.getSelectedItem();
            if (item) {
                var position = this.modelToPosition(item.getRange().getStart());
                IDE.getActiveEditor().moveToPosition(position);
            }
         });
        this.setIconPath("");
        this.setIconOptions({
            converter : (value, model) => {
               return this.getIconForKind(value.getKind());
            }
      });

    }

    private modelToPosition(start) :Ace.Position {
        var result = {
            row: start.getRow(),
            column: start.getColumn()
        };
        return result;
        
    } 


    private getSelectedItem() {
        var item = this.getSelection().getItem(0);
        return item;
    }


    private getIconForKind(name:string) {
        var iconPath = "./resource/qx/icon/Oxygen/16/types/";
        switch (name) {
            case "function":
            case "keyword":
            case "method": return iconPath + "method.png";
            case "constructor": return iconPath + "constructor.png";
            case "module": return iconPath + "module.png";
            case "interface":return iconPath + "interface.png";
            case "enum": return iconPath + "enum.png"; 
            case "class":return iconPath + "class.png";
            case "property":
            case "var":return iconPath + "variable.png";
            default: return iconPath + "method.png";
        }            
    }


    clear() {
        this.setModel(null);
    }


    private expandAll() {
        var top = this.getModel().getChildren();
        for (var i=0;i<top.length;i++) {
            var root = top.getItem(i);
            this.openNode(root);
            if (root.getChildren) {
                var children = root.getChildren();
                for (var j=0;j<children.length;j++) {
                    var child = children.getItem(j);
                    this.openNode(child);
                }
            }
        }
    }
   
   
   private isExecutable(kind) {
       if (kind === "method" || kind === "function" || kind === "constructor") return true;
       return false;
   }
   
    /**
     * Set the data for this outline.
     */ 
    setData(session: Cats.Session, data: Cats.NavigateToItem[]) {
        this.session = session;
        if ((! data) || (! data.length)) {
            this.clear();
            return;
        }
        
        var parents = {};
        var root = {};
      
        data.forEach((item) => {
            var parentName = item.containerName;
            var parent = parentName ? parents[parentName] : root;
            if (! parent) console.info("No Parent for " + parentName);
            if (! parent.children) parent.children = [];
             
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
        this.expandAll();
  
    }

}
}