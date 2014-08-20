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

/**
 * The context menu for the file navigator. This menu provides basic 
 * file operations like, rename, delete and create.
 */ 
class FileContextMenu extends qx.ui.menu.Menu {

    private gui = require('nw.gui');


    constructor(private fileNavigator:FileNavigator) {
        super();
        this.init();
    }


    private openInApp() {
        this.gui.Shell.openItem(this.getFullPath());
    }
    
    private showInFolder() {
        this.gui.Shell.showItemInFolder(this.getFullPath());
    }

    

    private getSelectedItem() {
        return this.fileNavigator.getSelection().getItem(0);
    }

 
    private getFullPath() {
        var fileName = this.getSelectedItem().getFullPath();
        return fileName;
    }


    private init() {
         // var refreshButton = new qx.ui.menu.Button("Refresh");
        
        var renameButton = new qx.ui.menu.Button("Rename");
        renameButton.addListener("execute",this.rename, this);
        
        var deleteButton = new qx.ui.menu.Button("Delete");
        deleteButton.addListener("execute", this.deleteFile, this);

        var newFileButton = new qx.ui.menu.Button("New File");
        newFileButton.addListener("execute", this.newFile, this);
        
        var newDirButton = new qx.ui.menu.Button("New Directory");
        newDirButton.addListener("execute", this.newFolder, this);

        var openInAppButton = new qx.ui.menu.Button("Open in default App");
        openInAppButton.addListener("execute", this.openInApp, this);

        var showInFolderButton = new qx.ui.menu.Button("Show item in folder");
        showInFolderButton.addListener("execute", this.showInFolder, this);

    
        // this.add(refreshButton);
        this.add(renameButton);
        this.add(deleteButton);
        this.add(newFileButton);
        this.add(newDirButton);
        this.addSeparator();
        this.add(openInAppButton);
        this.add(showInFolderButton);
        
    }

   

    private refresh() {
        var item = this.getSelectedItem();
        // IDE.project.getTreeView().refresh();
    }


    private deleteFile() {
        var fullName = this.getFullPath();
        var basename = PATH.basename(fullName);
        var sure = confirm("Delete " + basename + "?");
        if (sure) {
            OS.File.remove(fullName);
        }
        setTimeout(()=>{ this.refresh();}, 100);
    }


    private getBaseDir() {
        var item = this.getSelectedItem();
        var fullPath = this.getFullPath();
        
        if (item.getDirectory()) {
            return fullPath;
        } else { 
            return PATH.dirname(fullPath);
        }
    }

    private newFile() {
        var basedir = this.getBaseDir();
 
        var name = prompt("Enter new file name in directory " + basedir);
        if (name == null) return;
        var fullName = OS.File.join(basedir, name);
        OS.File.writeTextFile(fullName, "");
        this.refresh();
    }

    private newFolder() {
        var basedir = this.getBaseDir();

        var name = prompt("Enter new folder name in directory " + basedir);
        if (name == null) return;
        var fullName = OS.File.join(basedir, name);
        OS.File.mkdirRecursiveSync(fullName);
        this.refresh(); 
    }
    
    private rename() {
        var fullName = this.getFullPath();
        var dirname = PATH.dirname(fullName);
        var basename = PATH.basename(fullName);
        var name = prompt("Enter new name", basename);
        if (name == null) return;
        var c = confirm("Going to rename " + basename + " to " + name);
        if (c) {        
            try {
                OS.File.rename(fullName, OS.File.join(dirname, name));
            } catch (err) {
                alert(err);
            }
        }
    }

    
}  

