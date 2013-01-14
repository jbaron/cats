
module Cats{



export interface ListEntry {
    name: string;
	path: string;
	isFolder: bool;
}

// Sort first on directory versus file and then on alphabet
function sort(a:ListEntry,b:ListEntry) {
    if ( (! a.isFolder) && b.isFolder) return 1;
    if (a.isFolder && (! b.isFolder)) return -1;
    if (a.name > b.name) return 1;
    if (b.name > a.name) return -1;
    return 0;
}

/**
 * Reads a directory and returns an array
 * of files and direct sub directories. 
 */ 
export class DirectoryReader {

    ignore:string[]=["^\."];

	constructor() {
		
	}



	read(dir:ListEntry) :ListEntry[] {       

		var files = fs.readdirSync(dir.path);

		var entries:ListEntry[] = [];

		files.forEach( file => {
            try {
    			var pathName = path.join(dir.path,file);
                var isFolder = fs.statSync(pathName).isDirectory();

                entries.push({
                    name: file,
                    path: pathName,
                    isFolder: isFolder,
                    decorator: isFolder? "icon-folder" : "icon-file"
                });
            } catch(err) {
                console.log("Got error while handling file " + pathName);
                console.error(err);
            }
        });

		entries.sort(sort);
		console.log(entries);

        return entries;
	} 
	

}


}