/**      
 * Overview of started processes      
 */
class ProcessTable extends qx.ui.table.Table  {

    private static HEADERS = ["PID", "Command"];

    constructor() {
        var tableModel = new qx.ui.table.model.Simple();

        tableModel.setColumns(ProcessTable.HEADERS);
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
            // IDE.console.log("Selected row:" + selectedRow);

            // if (data) IDE.sessionTabView.navigateTo(this.session, data[2].start);
        })

    }

    addProcess(child, cmd, args) {
        var row = new Array(
            "" + child.pid,
            cmd + " " + args.join(" ")
        );
        this.getTableModel().addRows([row]);
        this.getSelectionModel().resetSelection(); 
    }


  

}