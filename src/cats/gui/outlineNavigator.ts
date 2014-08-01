
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

    private session:Cats.Session;

    constructor() {
        super(null,"name", "kids");
        this.setDecorator(null);
        // this.setPadding(0, 0, 0, 0);
        this.setHideRoot(true);
        
        this.addListener("dblclick", () => {
            var item = <any>this.getSelectedItem();
            if (item) {
                // @TODO fix getStart to use primitive types
                
                IDE.getActiveEditor().moveToPosition(item.getRange().getStart());
            }
        });
        
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
    
    /**
     * Set the data for outline navigator
     */ 
    setData(session:Cats.Session, data: Cats.NavigateToItem[]) {
        // console.log(data);
        this.session = session;
        var json = this.createModel(data,{name:"", kind:"", fullName:"", range:null});
        
        // This could be very expensive call, look for better alternative.
        var model = qx.data.marshal.Json.createModel(json, true);
        this.setModel(model);
    }

}