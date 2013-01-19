
module Cats.Menu {


    function createFileContextMenu() {
        // Create an empty menu
        var ctxmenu = new gui.Menu();
        // Add some items
        ctxmenu.append(new gui.MenuItem({ label: 'Rename', click: rename }));
        ctxmenu.append(new gui.MenuItem({ label: 'New file', click: newFile }));
        ctxmenu.append(new gui.MenuItem({ label: 'Delete', click: deleteFile }));
        return ctxmenu;
    }



    function deleteFile() {
        var basename = PATH.basename(data.key);
        var sure = confirm("Delete " + basename);
        if (sure) {            
            FS.unlinkSync(data.key);
        }
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
        Cats.project.writeTextFile(fullName, "");
    }


    function rename() {
        var dirname = PATH.dirname(data.key);
        var basename = PATH.basename(data.key);
        var name = prompt("Enter new name", basename);
        if (name == null) return;
        var c = confirm("Going to rename " + basename + " into " + name);
        if (c) {        
            try {
                FS.renameSync(data.key, PATH.join(dirname, name));
            } catch (err) {
                alert(err);
            }
        }
    }

    var data = {
        key: "",
        isFolder: true
    }

    var fileContextMenu = createFileContextMenu();

    IDE.fileNavigation.addEventListener('contextmenu', function(ev: any) {
        var d = UI.TreeView.getValueFromElement(ev.srcElement);
        data.key = d.path;
        data.isFolder = d.isFolder;
        // console.log(data.key);
        ev.preventDefault();
        fileContextMenu.popup(ev.x, ev.y);
        return false;
    });


}