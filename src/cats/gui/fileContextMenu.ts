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
module Cats.Gui {

/**
 * The context menu for the file navigator. This menu provides basic 
 * file operations like, rename, delete and create.
 */ 
export class FileContextMenu extends qx.ui.menu.Menu {

    private gui = require("nw.gui");
    private searchDialog = new SearchDialog();

    constructor(private fileNavigator:FileNavigator) {
        super();
        this.init();
    }

    private openInApp() {
        var osPath = OS.File.join(this.getFullPath(),"", true);
        if (osPath) this.gui.Shell.openItem(osPath);
    }
    
    private showInFolder() {
        var osPath = OS.File.join(this.getFullPath(),"", true);
        if (osPath) this.gui.Shell.showItemInFolder(osPath);
    }

    private search() {
        this.searchDialog.search(this.getFullPath());
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
        
        var searchButton = new qx.ui.menu.Button("Search");
        searchButton.addListener("execute", this.search, this);

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
        this.add(searchButton);
        this.addSeparator();
        this.add(openInAppButton);
        this.add(showInFolderButton);
        
    }



    private deleteFile() {
        var fullName = this.getFullPath();
        var basename = OS.File.PATH.basename(fullName);

        var dialog = new Gui.ConfirmDialog("Delete " + basename + "?");
        dialog.onConfirm = () => {
            OS.File.remove(fullName);
        }
        dialog.show();
    }


    private getBaseDir() {
        var item = this.getSelectedItem();
        var fullPath = this.getFullPath();
        
        if (item.getDirectory()) {
            return fullPath;
        } else { 
            return OS.File.PATH.dirname(fullPath);
        }
    }

    private newFile() {
        var basedir = this.getBaseDir();
 
        var dialog = new Gui.PromptDialog("Enter new file name in directory " + basedir);
        dialog.onSuccess = (name: string) => {
            var fullName = OS.File.join(basedir, name);
            OS.File.writeTextFile(fullName, "");
        };
        dialog.show();
    }

    private newFolder() {
        var basedir = this.getBaseDir();

        var dialog = new Gui.PromptDialog("Enter new folder name in directory " + basedir);
        dialog.onSuccess = (name: string) => {
            var fullName = OS.File.join(basedir, name);
            OS.File.mkdirRecursiveSync(fullName);
        };
        dialog.show();
    }
    
    private rename() {
        var fullName = this.getFullPath();
        var dirname = OS.File.PATH.dirname(fullName);
        var basename = OS.File.PATH.basename(fullName);

        var dialog = new Gui.PromptDialog("Enter new name", basename);
        dialog.onSuccess = (name: string) => {
            var message = "Going to rename " + basename + " to " + name;
            var confirmDialog = new Gui.ConfirmDialog(message);
            confirmDialog.onConfirm = () => {
                try {
                    OS.File.rename(fullName, OS.File.join(dirname, name));
                } catch (err) {
                    alert(err);
                }
            };
            confirmDialog.show();
        }
        dialog.show();
    }

    
}  
}
