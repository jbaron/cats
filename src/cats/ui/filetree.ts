///<reference path='../cats/node.d.ts' />

declare interface HTMLElement {
	dataset:any;
}


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
			li.dataset.path = entry.path;

			if (entry.isFolder) {
				li.className = FileTree.COLLAPSED;
				li.dataset.isFolder = true;				
			}

			ul.appendChild(li);
		})
		return ul;
	}


	private toggle(li:HTMLElement) {

		if (! li.dataset.isFolder) {
				if (this.onselect) {
					this.onselect(li.dataset.path);
				}
				return;
		}

		if (li.className === FileTree.OPENED) {
			li.className = FileTree.COLLAPSED;			
			li.removeChild(li.childNodes[1]);
			return;
		}
		li.className = FileTree.OPENED;
		var dir = li.dataset.path;
		var fullDirName = path.join(this.rootDir,dir);
		var files = fs.readdirSync(fullDirName);

		var entries:ListEntry[] = [];

		files.forEach( file => {

			var pathName = path.join(dir,file);
			var fullName = path.join(this.rootDir,pathName);

            entries.push({
                name: file,
                path: pathName,
                isFolder: fs.statSync(fullName).isDirectory()
            });
        });

		entries.sort(sort);
		// console.log(entries);

        var ul = this.render(entries);
        li.appendChild(ul);
	} 
	

}


}