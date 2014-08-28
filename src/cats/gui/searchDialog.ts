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

/**
 * Base class for all the configuration dialogs forms in
 * CATS.
 */ 
class SearchDialog extends qx.ui.window.Window {

    private form = new qx.ui.form.Form();
   //  private resultTable = new ResultTable();
    
    private rootDir:string;

    constructor() {
        super("Search");

        var layout = new qx.ui.layout.VBox();
        this.setLayout(layout);
        this.add(this.createForm());
        // this.add(this.resultTable);
        // this.resultTable.exclude();
        
        this.setModal(true);
        this.addListener("resize", this.center);
        
    }
    
    search(rootDir) {
        this.rootDir = rootDir;    
        this.show();
    }
    
    
    
    private getResults(content:string,pattern:RegExp, fileName, result:Cats.FileRange[]) {
        var lines = content.split("\n");
        for (var x=0;x<lines.length;x++) {
            var line = lines[x];
            if (line.match(pattern)) {
                var item:Cats.FileRange = {
                    range:{
                        start : {row:x, column:0},
                        end: {row:x, column:0}
                    },
                    fileName: fileName,
                    message: line
                };
                result.push(item);
            }
        }
        
    }
    
    private run(search:string, filePattern) {
        // this.resultTable.show();
        var result:Cats.FileRange[] = [];
        var searchPattern = new RegExp(search,"g");
        if (! filePattern) filePattern = "**/*";
         OS.File.find(filePattern,this.rootDir,  (err:Error,files:Array<string>) => {
            files.forEach((file) => {
                try {
                    var fullName = OS.File.join(this.rootDir, file);
                    var content = OS.File.readTextFile(fullName);
                    if (content.match(searchPattern)) {
                        this.getResults(content,searchPattern,fullName,result);
                    }
                    
                } catch (err) {
                    console.error("Got error while handling file " + fullName);
                    console.error(err);
                }
            });
            IDE.searchResult.setData(result);
            this.close();
         });    
    }
    
    private addTextField(label:string, model:string) {
        var t = new qx.ui.form.TextField();
        t.setWidth(200);
        this.form.add(t, label, null, model); 
        return t;
    }
    
    private createForm() {
        var s = this.addTextField("Search for", "search");
        s.setRequired(true);
        
        var p = this.addTextField("File Pattern", "glob");
        var searchButton = new qx.ui.form.Button("Search");
        var cancelButton = new qx.ui.form.Button("Cancel");
        this.form.addButton(searchButton);
        searchButton.addListener("execute", () => {
            if (this.form.validate()) {
                this.run(s.getValue(), p.getValue());
            };
        }, this);
        this.form.addButton(cancelButton);
        var renderer = new qx.ui.form.renderer.Single(this.form);
        return renderer;
    }
    
    private createResultTable() {
        var r = new ResultTable();
        return r;
    }
    
}