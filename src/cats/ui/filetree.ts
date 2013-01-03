///<reference path='../cats/node.d.ts' />


module cats.ui {

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
export class FileTree {

	private static COLLAPSED = "collapsed";
	private static OPENED = "opened";

	private rootElem: HTMLElement;
	public onselect: (path:string) => void;

	constructor(private rootDir:string) {
		var list:ListEntry[] = [{
				name : path.basename(rootDir),
				path : "",
				isFolder: true
		}];
		this.rootElem = this.render(list);
	    this.rootElem.onclick = (ev) => {
					ev.stopPropagation();
					this.toggle(<HTMLElement>ev.srcElement);
		}
	}



	appendTo(elem:HTMLElement) {
		elem.appendChild(this.rootElem);
	}

	private render(list:ListEntry[]) : HTMLElement {
		var ul = document.createElement("ul");
		list.forEach( (entry:ListEntry) => {
			var li = <HTMLElement>document.createElement("li");
			// var span = <HTMLElement>document.createElement("span");
			// span.innerText = entry.name;
			// li.appendChild(span);
			li.innerText = entry.name;
			li["_value"] = entry;

			if (entry.isFolder) {
				li.className = FileTree.COLLAPSED;
			}

			ul.appendChild(li);
		})
		return ul;
	}


	private toggle(li:HTMLElement) {
        var entry = li["_value"];
		if (! entry.isFolder) {
				if (this.onselect) {
					this.onselect(entry.path);
				}
				return;
		}

		if (li.className === FileTree.OPENED) {
			li.className = FileTree.COLLAPSED;			
			li.removeChild(li.childNodes[1]);
			return;
		}
		li.className = FileTree.OPENED;
		var dir = entry.path;
		var fullDirName = path.join(this.rootDir,dir);
		var files = fs.readdirSync(fullDirName);

		var entries:ListEntry[] = [];

		files.forEach( file => {
            try {
    			var pathName = path.join(dir,file);
    			var fullName = path.join(this.rootDir,pathName);
    
                entries.push({
                    name: file,
                    path: pathName,
                    isFolder: fs.statSync(fullName).isDirectory()
                });
            } catch(err) {
                console.log("Got error while handling file " + fullName);
                console.error(err);
            }
        });

		entries.sort(sort);
		// console.log(entries);

        var ul = this.render(entries);
        li.appendChild(ul);
	} 
	

}


}