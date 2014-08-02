
interface OutlineNavigatorItem {
    name: string;
    fullName: string;
    range: Cats.Range;
    kind: string;
    kids?: OutlineNavigatorItem[];
}
/**      
 * Create a simple Tree to mimic outline functionality      
 */
class OutlineNavigator extends qx.ui.table.Table /* qx.ui.tree.VirtualTree */ {

    private session: Cats.Session;
    private static HEADERS = ["Name", "Position"];


    constructor() {
        var tableModel = new qx.ui.table.model.Simple();

        tableModel.setColumns(OutlineNavigator.HEADERS);
        tableModel.setData([]);

        var custom: any = {
            tableColumnModel: function(obj) {
                return new qx.ui.table.columnmodel.Resize(obj);
            }
        };

        super(tableModel, custom);

        this.setDecorator(null);
        // this.setPadding(0, 0, 0, 0);
        // this.setHideRoot(true);

        this.addListener("dblclick", () => {
            var item = <any>this.getSelectedItem();
            if (item) {
                // @TODO fix getStart to use primitive types

                IDE.getActiveEditor().moveToPosition(item.getRange().getStart());
            }
        });

    }

    private getSelectedItem(): OutlineNavigatorItem {
        // var item = this.getSelection().getItem(0);
        // return item;
        return null;
    }

    private rangeToPosition(range: Cats.Range): string {
        return (range.start.row + 1) + ":" + (range.start.column + 1);
    }

    /**
     * Set the data for this outline.
     */ 
    setData(session: Cats.Session, data: Cats.NavigateToItem[]) {
        this.session = session;
        var indentation = ["", " -- ", " ---- ", " ------ ", " -------- "];

        var tableModel = new qx.ui.table.model.Simple();
        var rows = [];
        data.forEach((item) => {
            var prefix = "";
            var nrSpaces = item.containerName.split(".").length;
            if (item.containerName && (nrSpaces > 0)) prefix = indentation[nrSpaces];

            rows.push([
                prefix + item.name,
                this.rangeToPosition(item.range),
                // fullName : fullName,
                item.range,
                item.kind
            ]);
        });

        tableModel.setColumns(["Name", "Position"]);
        tableModel.setData(rows);
        this.setTableModel(tableModel);

        this.getSelectionModel().addListener("changeSelection", (data) => {
            var selectedRow = this.getSelectionModel().getLeadSelectionIndex();
            var data = this.getTableModel().getRowData(selectedRow);
            // IDE.console.log("Selected row:" + selectedRow);

            if (data) IDE.sessionTabView.navigateTo(this.session, data[2].start);
        })
    }


    private createModel(data: Cats.NavigateToItem[], parent: OutlineNavigatorItem) {
        if (!parent.kids) parent.kids = [];
        data.forEach((item) => {
            // var fullName = parent.containerName ? parent.containerName + "." + parent.name : parent.name;
            if ((item.containerKind === parent.kind) && (item.containerName === parent.fullName)) {
                var fullName = parent.name ? parent.name + "." + item.name : item.name;
                var newItem = {
                    name: item.name,
                    fullName: fullName,
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
    setData2(session: Cats.Session, data: Cats.NavigateToItem[]) {
        // console.log(data);
        this.session = session;
        var json = this.createModel(data, { name: "", kind: "", fullName: "", range: null });

        // This could be very expensive call, look for better alternative.
        var model = qx.data.marshal.Json.createModel(json, true);
        // this.setModel(model);
    }

}