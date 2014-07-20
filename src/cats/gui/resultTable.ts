/**
 * This table displays problems and search result
 */
class ResultTable extends qx.ui.table.Table {

    private static HEADERS = ["Message", "File", "Position"];


   private rangeToPosition(range: Cats.Range): string {
        return (range.start.row + 1) + ":" + (range.start.column + 1);
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
            /*
            var grid = new Cats.UI.Grid();
            grid.setColumns(["message", "fileName", "position"]);
            grid.setRows(data);
            grid.setAspect("position", (row) => { return rangeToPosition(row.range) });
            grid.render();
            grid.appendTo(searchResultsElem);
            grid.onselect = (sel: Cats.FileRange) => {
                IDE.openSession(sel.fileName, sel.range.start);
            };
            */
        }
        tableModel.setColumns(ResultTable.HEADERS);
        tableModel.setData(rows);
        this.setTableModel(tableModel);
    }

    constructor() {
        var tableModel = new qx.ui.table.model.Simple();

        // table model
        var headers = ["Message", "File", "Position"];

        tableModel.setColumns(headers);
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
            console.log(data);
            // IDE.openSession(data.fileName, data.range.start);
        })
        
    }

}