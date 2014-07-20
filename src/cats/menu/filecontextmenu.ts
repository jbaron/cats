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

module Cats.Menu {


    function createFileContextMenu() {
        // Create an empty menu
        var ctxmenu = new GUI.Menu();
        // Add some items
        ctxmenu.append(new GUI.MenuItem({ label: 'Refresh', click: refresh }));
        ctxmenu.append(new GUI.MenuItem({ label: 'Rename', click: rename }));
        ctxmenu.append(new GUI.MenuItem({ label: 'New file', click: newFile }));
        ctxmenu.append(new GUI.MenuItem({ label: 'New folder', click: newFolder }));
        ctxmenu.append(new GUI.MenuItem({ label: 'Delete', click: deleteFile }));
        return ctxmenu;
    }


    function refresh() {
        IDE.project.getTreeView().refresh();
    }


    function deleteFile() {
        var basename = PATH.basename(data.key);
        var sure = confirm("Delete " + basename + "?");
        if (sure) {
            OS.File.remove(data.key);
        }
        setTimeout(function(){refresh(), 100});
    }

    function newFile() {
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

    function newFolder() {
        var basedir;

        if (data.isFolder) {
            basedir = data.key
        } else {
            basedir = PATH.dirname(data.key);
        }

        var name = prompt("Vnesi novo ime mape ");
        if (name == null) return;
        var fullName = PATH.join(basedir, name);
        OS.File.mkdirRecursiveSync(fullName);
        refresh(); 
    }
    
    function rename() {
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

    var data = {
        key: "",
        isFolder: true,
        element: null
    }

   

}