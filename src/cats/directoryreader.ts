///<reference path='../cats/node.d.ts' />


module Cats{

import fs = module("fs");
import path = module("path");


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

// Created a file tree view based on a directory.
// Very simple and fast implementation that refreshes a directory
// every time you open it.
export class DirectoryReader {


	constructor() {
		
	}



	read(dir:ListEntry) :ListEntry[] {       

		var files = fs.readdirSync(dir.path);

		var entries:ListEntry[] = [];

		files.forEach( file => {
            try {
    			var pathName = path.join(dir.path,file);
    
                entries.push({
                    name: file,
                    path: pathName,
                    isFolder: fs.statSync(pathName).isDirectory()
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