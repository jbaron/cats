module cats {

declare var require;
var fs = require("fs");
var path = require("path");


// Sort first on directory versus file and then alphabet
function sort(a,b) {
    if (a.stat.isFile() && b.stat.isDirectory()) return 1;
    if (a.stat.isDirectory() && b.stat.isFile()) return -1;
    if (a.name > b.name) return 1;
    if (b.name > a.name) return -1;
    return 0;
}



// Create the tree structure representing a directory on the filesystem.
// This structure is suited for dynatree
export function createTreeViewer(dir:string, parent: any[], tsHandler: Function) :any[] {    
    var files = fs.readdirSync(dir);
    var entries = [];

    files.forEach( file => {
        var fullName = path.join(dir,file);
        entries.push({
            name: file,
            fullName: fullName,
            stat: fs.statSync(fullName)
        });
    });

    entries.sort(sort);

    entries.forEach( file => {

        name = file.fullName;

        var child = {
            title: file.name,
            key: "",
            isFolder: false,
            children:[]
        };

        if (file.stat.isFile()) {
            child["abc"] = true;
            child.key = name;

            /* Lets already load it */
            if (path.extname(name) === ".ts") {
                tsHandler(name);
            }

            parent.push(child);
        }

        if (file.stat.isDirectory()) {
            child.isFolder = true;
            createTreeViewer(name,child.children, tsHandler);
            parent.push(child);
        }
    });

    return parent;

}


}

