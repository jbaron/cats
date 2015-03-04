// Copyright (c) JBaron.  All rights reserved.
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//


module Cats.Gui {

    /**      
     * Overview of started processes. Also provides the controls so these processes can be paused,
     * stopped or killed.
     * 
     * @TODO provide feedback of the actuall status of a process
     */
    export class ProcessTable extends qx.ui.container.Composite {

        private table: qx.ui.table.Table;

        constructor() {
            super(new qx.ui.layout.VBox());
            this.setPadding(0, 0, 0, 0);
            this.add(this.createControls());
            this.add(this.createTable(), { flex: 1 });
        }


        /**
         * Add a new process to the table
         */
        addProcess(child: any, cmd: string) {
            var row = new Array<any>(
                "" + child.pid, cmd, child
                );
            var model = <qx.ui.table.model.Simple>this.table.getTableModel();
            model.addRows([row]);
            this.table.getSelectionModel().resetSelection();
        }


        private sendSignal(signal: string) {
            var table = this.table;
            var selectedRow = table.getSelectionModel().getLeadSelectionIndex();
            if (selectedRow < 0) { 
                alert("You have to select a process from the table below first");
                return;
            }
            var data = table.getTableModel().getRowData(selectedRow);
            var child = data[2];
            child.kill(signal);
        }


        private addButton(bar: qx.ui.toolbar.ToolBar, label: string, signal: string) {
            var button = new qx.ui.toolbar.Button(label);
            button.addListener("execute", () => { this.sendSignal(signal); });
            bar.add(button);
        }


        private createTable() {
            var tableModel = new qx.ui.table.model.Simple();
            var headers = [super.tr("tableheader_pid"), super.tr("tableheader_command")];
            tableModel.setColumns(headers);
            tableModel.setData([]);

            var custom: IMap = {
                tableColumnModel: function() {
                    return new qx.ui.table.columnmodel.Resize();
                }
            };

            var table = new qx.ui.table.Table(tableModel, custom);
            table.setDecorator(null);
            table.setStatusBarVisible(false); 

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
}



