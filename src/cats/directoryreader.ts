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

		var files = FS.readdirSync(dir.path);

		var entries:ListEntry[] = [];

		files.forEach( file => {
            try {
    			var pathName = PATH.join(dir.path,file);
                var isFolder = FS.statSync(pathName).isDirectory();

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
		// console.log(entries);

        return entries;
	} 
	

}


}