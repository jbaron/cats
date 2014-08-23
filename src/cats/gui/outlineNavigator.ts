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
        this.getSelectionModel().addListener("changeSelection", (data) => {
            var selectedRow = this.getSelectionModel().getLeadSelectionIndex();
            var data = this.getTableModel().getRowData(selectedRow);
             if (data) IDE.sessionTabView.navigateTo(this.session, data[2].start);
        });

    }

    clear() {
        this.setData(null, []);
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
        var rows:any[] = [];
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

        this.getTableModel().setData(rows);
        this.getSelectionModel().resetSelection(); 
    }


  

}