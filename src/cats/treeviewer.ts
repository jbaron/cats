module cats {

import fs = module("fs");
import path = module("path");

// Sort first on directory versus file and then on alphabet
function sort(a,b) {
    if (a.stat.isFile() && b.stat.isDirectory()) return 1;
    if (a.stat.isDirectory() && b.stat.isFile()) return -1;
    if (a.name > b.name) return 1;
    if (b.name > a.name) return -1;
    return 0;
}

// Create the tree structure representing a directory on the filesystem.
// This structure is suited for dynatree
export class TreeViewer {


    constructor(public projectDir:string) {}

    private getFullDir(dir:string) {
        return path.join(this.projectDir,dir);
    } 

    createTreeViewer(dir:string, parent: any[], tsHandler: Function) :any[] {  
        var fullDir =  this.getFullDir(dir);
        var files = fs.readdirSync(fullDir);
        var entries = [];

        files.forEach( file => {
            entries.push({
                name: file,
                key: path.join(dir,file),
                stat: fs.statSync(path.join(fullDir,file))
            });
        });

        entries.sort(sort);

        entries.forEach( file => {


            var child = {
                title: file.name,
                key: "",
                isFolder: false,
                children:[]
            };

            if (file.stat.isFile()) {
                child.key = file.key;

                /* Lets already load it */
                if (path.extname(file.name) === ".ts") {
                    tsHandler(file.key);
                }

                parent.push(child);
            }

            if (file.stat.isDirectory()) {
                child.isFolder = true;
                this.createTreeViewer(file.key,child.children, tsHandler);
                parent.push(child);
            }
        });

        return parent;

}
}

}

