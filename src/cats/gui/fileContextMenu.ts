//
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
var data = {
        key: "",
        isFolder: true,
        element: null
    }


class FileContextMenu extends qx.ui.menu.Menu {


    constructor(private fileNavigator:FileNavigator) {
        super();
        this.init();
    }


    getSelection() {
        return this.fileNavigator.getSelection();
    }

    getSelectedFile() {
        var item = this.getSelection().getItem(0);
        if (! item) return null;
        if (! item.getDirectory) return null;
        if (! item.getDirectory()) {
            return item;
        }
        return null;
    }

    getSelectedItem() {
        console.log(this.getSelection().getItem(0));
        var fileName = this.getSelection().getItem(0).getLabel();
        return fileName;
    }


    init() {
         var refreshButton = new qx.ui.menu.Button("Refresh");
        var renameButton = new qx.ui.menu.Button("Rename");
        
        var deleteButton = new qx.ui.menu.Button("Delete");
        deleteButton.addListener("execute", () => { alert("going to delete " + this.getSelectedItem()); });

        var newFileButton = new qx.ui.menu.Button("New File");
        var newDirButton = new qx.ui.menu.Button("New Directory");
        this.add(refreshButton);
        this.add(renameButton);
        this.add(deleteButton);
        this.add(newFileButton);
        this.add(newDirButton);
        
    }

   

    refresh() {
        var item = this.getSelectedItem();
        // IDE.project.getTreeView().refresh();
    }


    deleteFile() {
        var basename = PATH.basename(data.key);
        var sure = confirm("Delete " + basename + "?");
        if (sure) {
            OS.File.remove(data.key);
        }
        setTimeout(()=>{ this.refresh();}, 100);
    }

    newFile() {
        var basedir;

        if (data.isFolder) {
            basedir = data.key
        } else {
            basedir = PATH.dirname(data.key);
        }

        var name = prompt("Enter new file name ");
        if (name == null) return;
        var fullName = PATH.join(basedir, name);
        OS.File.writeTextFile(fullName, "");
    }

    newFolder() {
        var basedir;

        if (data.isFolder) {
            basedir = data.key
        } else {
            basedir = PATH.dirname(data.key);
        }

        var name = prompt("Please enter new name");
        if (name == null) return;
        var fullName = PATH.join(basedir, name);
        OS.File.mkdirRecursiveSync(fullName);
        this.refresh(); 
    }
    
    rename() {
        var dirname = PATH.dirname(data.key);
        var basename = PATH.basename(data.key);
        var name = prompt("Enter new name", basename);
        if (name == null) return;
        var c = confirm("Going to rename " + basename + " to " + name);
        if (c) {        
            try {
                OS.File.rename(data.key, PATH.join(dirname, name));
            } catch (err) {
                alert(err);
            }
        }
    }

    
}  

