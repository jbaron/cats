module cats {

declare var require;
var fs = require("fs");
var path = require("path");

// Create the tree representing a directory on the filesystem.
export function createTreeViewer(dir:string, parent: any[], tsHandler: Function)  {

    fs.readdirSync(dir).forEach( file => {

        var name = path.join(dir,file);

        var child = {
            title: file,
            key: "",
            isFolder: false,
            children:[]
        };

        
        var stat = fs.statSync(name);

        if (stat.isFile()) {
            child["abc"] = true;
            child.key = name;

            /* Lets already load it */
            if (path.extname(name) === ".ts") {
                tsHandler(name);
            }

            parent.push(child);
        }

        if (stat.isDirectory()) {
            child.isFolder = true;
            createTreeViewer(name,child.children, tsHandler);
            parent.push(child);
        }
    });

    return parent;

}


}

