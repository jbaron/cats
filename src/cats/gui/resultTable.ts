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
     * This table displays problems and search result
     */
    export class ResultTable extends qx.ui.table.Table {

        private data: Cats.FileRange[];

        private rangeToPosition(range: Cats.Range): string {
            return (range.start.row + 1) + ":" + (range.start.column + 1);
        }


        clear() {
            this.setData([]);
        }


        private convert(row: Cats.FileRange) {
            return [
                row.message,
                row.fileName,
                this.rangeToPosition(row.range),
                row.range
            ];
        }

        getData(): Cats.FileRange[] {
            return this.data;
        }

        private areEmpty(...args) {
            for (var i=0; i< args.length; i++ ) {
                var arr = args[i];
                if (arr && (arr.length > 0)) return false
            }
            return true;
        }

        setData(data: Cats.FileRange[]) {
            if (this.areEmpty(this.data, data)) return;
            this.fireDataEvent("contentChange", null);
            this.data = data;
            var tableModel = new qx.ui.table.model.Simple();
            var rows: any[] = [];
            if (data) {
                data.forEach((row) => {
                    rows.push(this.convert(row));
                });
            }
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

            this.getSelectionModel().addListener("changeSelection", (data) => {
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
            item1.addListener("execute", () => { this.clear(); });
            menu.add(item1);

            return menu;
        }

    }
}