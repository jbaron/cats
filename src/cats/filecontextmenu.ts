
module Menu {

    import fs = module("fs");
    import path = module("path");


    function nop() {
        alert("Not yet implemented");
    };

    import gui = module('nw.gui');
    var win = gui.Window.get();

    function createFileContextMenu() {
        // Create an empty menu
        var ctxmenu = new gui.Menu();
        // Add some items
        ctxmenu.append(new gui.MenuItem({ label: 'Rename', click: rename }));
        ctxmenu.append(new gui.MenuItem({ label: 'New file', click: newFile }));
        ctxmenu.append(new gui.MenuItem({ label: 'Delete', click: deleteFile }));
        return ctxmenu;
    }

    var fileContextMenu = createFileContextMenu();


    function deleteFile() {
        var sure = confirm("Delete " + data.key);
        if (sure) {
            var fullName = cats.project.getFullName(data.key);
            fs.unlinkSync(fullName);
        }
    }

    function newFile() {
        var basedir;

        if (data.isFolder) {
            basedir = data.key
        } else {
            basedir = path.dirname(data.key);
        }

        var name = prompt("Enter new file name ");
        if (name == null) return;
        var fullName = path.join(basedir, name);
        cats.project.writeTextFile(fullName, "");
    }


    function rename() {
        var name = prompt("Enter new name", data.key);
        if (name == null) return;
        var c = confirm("Going to rename " + data.key + " into " + name);
        if (c) {
            var root = cats.project.projectDir;
            try {
                fs.renameSync(path.join(root, data.key), path.join(root, name));
            } catch (err) {
                alert(err);
            }
        }
    }

    var data = {
        key: "",
        isFolder: true
    }

    document.getElementById("filetree").addEventListener('contextmenu', function(ev: any) {
        data.key = ev.srcElement.dataset.path;
        data.isFolder = ev.srcElement.dataset.isFolder;
        console.log(data.key);
        ev.preventDefault();
        fileContextMenu.popup(ev.x, ev.y);
        return false;
    });


}