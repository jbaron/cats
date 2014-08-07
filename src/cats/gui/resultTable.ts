/**
 * This table displays problems and search result
 */
class ResultTable extends qx.ui.table.Table {


   private rangeToPosition(range: Cats.Range): string {
        return (range.start.row + 1) + ":" + (range.start.column + 1);
    }


    clear() {
        this.setData([]);
    }


    private convert(row:Cats.FileRange) {
        return [
                    row.message,
                    row.fileName,
                    this.rangeToPosition(row.range),
                    row.range
                ];
    }

    setData(data: Cats.FileRange[]) {
        var tableModel = new qx.ui.table.model.Simple();
        var rows:any[] = [];
        if (data) {
            data.forEach((row)=>{
                rows.push(this.convert(row));
            });
        }
        // tableModel.setColumns(ResultTable.HEADERS);
        // tableModel.setData(rows);
        // this.setTableModel(tableModel);
        this.getTableModel().setData(rows);
        this.getSelectionModel().resetSelection(); 
    }

    addData(row: Cats.FileRange) {
        this.getTableModel().addRows([this.convert(row)]);
    }

    constructor(headers = ["Message", "File", "Position"]) {
        
        var tableModel = new qx.ui.table.model.Simple();
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
            var selectedRow = this.getSelectionModel().getLeadSelectionIndex();
            var data = this.getTableModel().getRowData(selectedRow);
            // IDE.console.log("Selected row:" + selectedRow);
            if (data) IDE.openSession(data[1], data[3].start);
        });
        
        this.setContextMenu(this.createContextMenu());
    }

   private createContextMenu() {
        var menu = new qx.ui.menu.Menu();
        var item1 = new qx.ui.menu.Button("Clear Output");
        item1.addListener("execute", () => { this.clear();});
        menu.add(item1);
        
        return menu;
    }


}