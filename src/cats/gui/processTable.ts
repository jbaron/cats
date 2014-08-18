/**      
 * Overview of started processes. With the controls the processes can be paused,
 * stopped or killed.
 * 
 * @TODO provide visualization of the status of a process
 */
class ProcessTable extends qx.ui.container.Composite  {

    private static HEADERS = ["PID", "Command"];
    private table:qx.ui.table.Table;
   
    constructor() {
        super(new qx.ui.layout.VBox());
        this.setPadding(0,0,0,0);
        this.add(this.createControls());
        this.add(this.createTable(), {flex: 1});
    }

    /**
     * Add a new process to the table
     */ 
    addProcess(child, cmd:string) {
        var row = new Array(
            "" + child.pid, cmd, child
        );
        this.table.getTableModel().addRows([row]);
        this.table.getSelectionModel().resetSelection(); 
    }

    private sendSignal(signal?:string) {
        var table = this.table;
        var selectedRow = table.getSelectionModel().getLeadSelectionIndex();
        if (selectedRow < 0) return;
        var data = table.getTableModel().getRowData(selectedRow);
        var child = data[2];
        child.kill(signal);
    }
    
    private addButton(bar:qx.ui.toolbar.ToolBar, label:string, signal:string) {
        var button = new qx.ui.toolbar.Button(label);
        button.addListener("execute", (evt) => { this.sendSignal(signal); });
        bar.add(button);
    }
    
    
    private createTable() {
        var tableModel = new qx.ui.table.model.Simple();
        tableModel.setColumns(ProcessTable.HEADERS);
        tableModel.setData([]);

        var custom: any = {
            tableColumnModel: function(obj) {
                return new qx.ui.table.columnmodel.Resize(obj);
            }
        };

        var table = new qx.ui.table.Table(tableModel, custom);
        table.setDecorator(null);
        table.getSelectionModel().addListener("changeSelection", (data) => {
            var selectedRow = table.getSelectionModel().getLeadSelectionIndex();
            var data = table.getTableModel().getRowData(selectedRow);
        });
        this.table = table;
        return table;
    }
    
    private createControls() {
        var bar = new qx.ui.toolbar.ToolBar();
        this.addButton(bar, "Stop", "SIGTERM");
        this.addButton(bar, "Kill", "SIGKILL");
        this.addButton(bar, "Pause", "SIGSTOP");
        this.addButton(bar, "Resume", "SIGCONT");
        return bar;
    }

    
}

  
  

