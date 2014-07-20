/**      
 * Create a simple Tree to mimic outline functionality      
 */
class OutlineNavigator extends qx.ui.tree.Tree {

    constructor() {
        super();

        this.setDecorator(null);
        this.setPadding(0, 0, 0, 0);
        this.setHideRoot(true);

        // create and set the tree root
        var root = new qx.ui.tree.TreeFolder("Desktop");
        this.setRoot(root);

        for (var f = 0; f < 10; f++) {
            var f1 = new qx.ui.tree.TreeFolder("Class-" + f);
            root.add(f1);
            // create a third layer
            for (var i = 0; i < 10; i++) {
                var f11 = new qx.ui.tree.TreeFile("Method-" + i);
                f1.add(f11);
            }
        }
        // open the folders
        root.setOpen(true);
        f1.setOpen(true);
    }
    
    
    
    private createModel(data:Cats.NavigateToItem[], parent) {
        if (! parent.kids) parent.kids = [];
        data.forEach((item)=>{
             if ((item.containerKind === parent.kind) && (item.containerName === parent.name)) {
                 var newItem = {
                     name: item.name,
                     kind: item.kind
                 }
                 parent.kids.push(newItem);
                 this.createModel(data, newItem);
             }
        })
    }
    
    setData(data: Cats.NavigateToItem[]) {
        var json = this.createModel(data,{name:"", kind:""});
        var model = qx.data.marshal.Json.createModel(json, true);
        
        
                /*
                IDE.outlineNavigation.innerHTML = "";
                var outliner = new Cats.UI.TreeView();
                outliner.setAspect("children", (parent: OutlineTreeElement): OutlineTreeElement[] => {
                    var name = parent ? parent.qualifyer : "";
                    var kind = parent ? parent.kind : ""; // no script anymore
                    var result: OutlineTreeElement[] = [];
                    for (var i = 0; i < data.length; i++) {
                        var o = data[i];
                                                
                        if ((o.containerKind === kind) && (o.containerName === name)) {
                            var fullName = o.name;
                            if (name) fullName = name + "." + fullName;
                            var item: OutlineTreeElement = {
                                name: o.name,
                                decorator: "icon-" + o.kind,
                                qualifyer: fullName,
                                kind: o.kind,
                                outline: o
                            };

                            item.isFolder = navigateToItemHasChildren(fullName, o.kind, data); // !(o.kind === "method" || o.kind === "constructor" || o.kind === "function")

                            result.push(item);
                        }
                    }
                    return result;
                });
                outliner.appendTo(IDE.outlineNavigation);
                outliner.onselect = (value) => {
                    var data: NavigateToItem = value.outline;
                    IDE.openSession(data.fileName, data.range.start);
                };
                outliner.refresh();
                */
            

        
    }

}