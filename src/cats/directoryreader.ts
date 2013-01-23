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
    name: string; // Just the file/directory name without path
	path: string; // fullName including path
	isFolder: bool; // is this a folder or a file
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
 * Reads the contents of a directory. This class doesn't walk recursively.
 */ 
export class DirectoryReader {

    ignore:string[]=["^\."];

	constructor() {
		// @TODO allow to set filter flags
	}

    /**
     * Read a directory and return a sorted list of its content
     * 
     */ 
	read(dir:ListEntry) :ListEntry[] {       

		var files:string[] = FS.readdirSync(dir.path);

		var entries:ListEntry[] = [];

		files.forEach( file => {
            try {
    			var pathName = PATH.join(dir.path,file);
                var isFolder = FS.statSync(pathName).isDirectory();

                // @TODO should not have decorator in here
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

        return entries;
	} 
	

}


}