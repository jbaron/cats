
interface OutlineNavigatorItem {
    name:string;
    fullName:string;
    range: Cats.Range;
    kind: string;
    kids?: OutlineNavigatorItem[];
}
/**      
 * Create a simple Tree to mimic outline functionality      
 */
class OutlineNavigator extends qx.ui.tree.VirtualTree {

    constructor() {
        super(null,"name", "kids");

        this.setDecorator(null);
        this.setPadding(0, 0, 0, 0);
        this.setHideRoot(true);
        /*
        this.addListener("dblclick", () => {
            var item = this.getSelectedItem();
            if (item) {
                IDE.getActiveEditor().moveCursorToPosition(item.range.start);
            }
        });
        */
    }
    
    private getSelectedItem():OutlineNavigatorItem {
        var item = this.getSelection().getItem(0);
        return item;
    }
    
    
    private createModel(data:Cats.NavigateToItem[], parent:OutlineNavigatorItem) {
        if (! parent.kids) parent.kids = [];
        data.forEach((item)=>{
              // var fullName = parent.containerName ? parent.containerName + "." + parent.name : parent.name;
             if ((item.containerKind === parent.kind) && (item.containerName === parent.fullName)) {
                 var fullName = parent.name ? parent.name + "." + item.name : item.name;
                 var newItem = {
                     name: item.name,
                     fullName : fullName,
                     kind: item.kind,
                     range: item.range
                 }
                 parent.kids.push(newItem);
                 this.createModel(data, newItem);
             }
        });
        return parent;
    }
    
    setData(data: Cats.NavigateToItem[]) {
        // console.log(data);
        var json = this.createModel(data,{name:"", kind:"", fullName:"", range:null});
        var model = qx.data.marshal.Json.createModel(json, true);
        this.setModel(model);
        
        
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