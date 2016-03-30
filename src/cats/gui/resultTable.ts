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

    interface ProjectData {
        data:any[];
        project:Project;
    }


    /**
     * This table displays data that is related to a file. Can be 
     * search results of error messages or even bookmarks. 
     */
    export class ResultTable extends qx.ui.table.Table {

        
        private projectData:Map<ProjectData>;
        
        constructor(headers = ["tableheader_message", "tableheader_project", "tableheader_file", "tableheader_position"]) {
    
            var tableModel = new qx.ui.table.model.Simple();
            var columns:string[] = [];
            headers.forEach((header) => columns.push(this.tr(header)));
            tableModel.setColumns(columns);
            tableModel.setData([]);
            var custom: any = {
                tableColumnModel: function() {
                    return new qx.ui.table.columnmodel.Resize();
                }
            };
            super(tableModel, custom);
            
            this.setStatusBarVisible(false); 
            this.setDecorator(null);
            this.projectData = {};
            this.setPadding(0, 0, 0, 0);

            this.addListener("click", () => {
                var selectedRow = this.getSelectionModel().getLeadSelectionIndex();
                var data = this.getTableModel().getRowData(selectedRow);
                if (data && data[4]) FileEditor.OpenEditor(data[4], data[5]);
            });

            this.setContextMenu(this.createContextMenu());
        }


        private rangeToPosition(range: Cats.Range): string {
            if (range) {
                return (range.start.row + 1) + ":" + (range.start.column + 1);
            } else {
                return "";
            }
        }

        /**
         * Clear all the data from the table
         */ 
        clear() {
            var model = <qx.ui.table.model.Simple>this.getTableModel();
            this.projectData = {};
            model.setData([]);
        }


        private convert(row: Cats.FileRange) {
            return [
                row.message,
                row.fileName || "",
                this.rangeToPosition(row.range),
                row.range
            ];
        }

   
        private areEmpty(...args:any[]) {
            for (var i=0; i< args.length; i++ ) {
                var arr = args[i];
                if (arr && (arr.length > 0)) return false
            }
            return true;
        }

        /**
         * @TODO finalize the logic to show results of multiple project in one table
         */ 
        private flatten() {
            var result = [];
            var baseDir = IDE.rootDir;
            Object.keys(this.projectData).forEach((key) => {
                var projectData = this.projectData[key];
                var projectName = projectData.project ? projectData.project.name : "default";
                projectData.data.forEach((row) => {
                    var fileName = row.fileName || "";
                    if (fileName) fileName = OS.File.PATH.relative(baseDir,fileName);
                    result.push([
                         row.message,
                         projectName, 
                         fileName,
                         this.rangeToPosition(row.range),
                         row.fileName || "",
                         row.range   
                    ]);
                });
            })
            return result;
        }

        /**
         * Set the data for this table
         */ 
        setData(data: Cats.FileRange[], project?:Project) {
            var key = project ? project.tsConfigFile : "default";
            if (this.areEmpty(this.projectData[key], data)) return;
            this.fireDataEvent("contentChange", null);
            
            this.projectData[key] = {
                    data: data,
                    project : project 
            }
            
            var rows = this.flatten();
            var model = <qx.ui.table.model.Simple>this.getTableModel();
            model.setData(rows);
            // this.getSelectionModel().resetSelection();
        }

        /**
         * Add a row to the table
         */ 
        addData(row: Cats.FileRange) {
            var model = <qx.ui.table.model.Simple>this.getTableModel();
            model.addRows([this.convert(row)]);
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