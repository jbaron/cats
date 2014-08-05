/**
 * This table displays problems and search result
 */
class ResultTable extends qx.ui.table.Table {

    private static HEADERS = ["Message", "File", "Position"];


   private rangeToPosition(range: Cats.Range): string {
        return (range.start.row + 1) + ":" + (range.start.column + 1);
    }


    clear() {
        this.setData([]);
    }

    setData(data: Cats.FileRange[]) {
        var tableModel = new qx.ui.table.model.Simple();
        var rows = [];
        if (data) {
            data.forEach((row)=>{
                rows.push([
                    row.message,
                    row.fileName,
                    this.rangeToPosition(row.range),
                    row.range
                ])
            });
        }
        
        // tableModel.setColumns(ResultTable.HEADERS);
        // tableModel.setData(rows);
        // this.setTableModel(tableModel);
        this.getTableModel().setData(rows);
        this.getSelectionModel().resetSelection(); 
    }

    constructor() {
        var tableModel = new qx.ui.table.model.Simple();
        tableModel.setColumns(ResultTable.HEADERS);
        tableModel.setData([]);

        var custom: any = {
            tableColumnModel: function(obj) {
                return new qx.ui.table.columnmodel.Resize(obj);
            }
        };
        super(tableModel, custom);
        this.setDecorator(null);

        this.setPadding(0, 0, 0, 0);
        
        this.getSelectionModel().addListener("changeSelection" , (data) => {
            var selectedRow = this.getSelectionModel().getLeadSelectionIndex();
            var data = this.getTableModel().getRowData(selectedRow);
            // IDE.console.log("Selected row:" + selectedRow);
            if (data) IDE.openSession(data[1], data[3].start);
        })
        
    }

}