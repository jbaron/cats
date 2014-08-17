/**      
 * Overview of started processes      
 */
class ProcessTable extends qx.ui.container.Composite  {

    private static HEADERS = ["PID", "Command"];
    private table:qx.ui.table.Table;

    constructor() {
        super(new qx.ui.layout.VBox());
        var tableModel = new qx.ui.table.model.Simple();
        this.setPadding(0,0,0,0);

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
            // IDE.console.log("Selected row:" + selectedRow);

            // if (data) IDE.sessionTabView.navigateTo(this.session, data[2].start);
        });
        this.table = table;
        this.add(this.createControls());
        this.add(table, {flex: 1});
    }

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
    
    private createControls() {
      var bar = new qx.ui.toolbar.ToolBar();
      var button, part, checkBox;

      part = new qx.ui.toolbar.Part();
      bar.add(part);

      button = new qx.ui.toolbar.Button("Stop process", "icon/22/actions/edit-undo.png");
      button.addListener("execute", (evt) => { this.sendSignal("SIGTERM"); });
      part.add(button);

      button = new qx.ui.toolbar.Button("Kill process", "icon/22/actions/edit-undo.png");
      button.addListener("execute", (evt) => { this.sendSignal("SIGKILL"); });
      part.add(button);

      button = new qx.ui.toolbar.Button("Pause process", "icon/22/actions/edit-undo.png");
      button.addListener("execute", (evt) => { this.sendSignal("SIGSTOP"); });
      part.add(button);

      button = new qx.ui.toolbar.Button("Resume process", "icon/22/actions/edit-undo.png");
      button.addListener("execute", (evt) => { this.sendSignal("SIGCONT") ;});
      part.add(button);
      
      bar.add(part);
      
      return bar;
    }

    
}

  
  

