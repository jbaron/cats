///<reference path='../cats/node.d.ts' />


module Cats.UI {

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

class AspectWidget {

    private aspects = {};
    defaultHandler = (data,name:string) => { return data[name];};

   
    setAspect(name,aspect) {
        this.aspects[name] = aspect;
    }

    getValue(data,name:string)  {
    	var fn = this.aspects[name] || this.defaultHandler;
		return fn(data,name);
	}

}


// Created a file tree view based on a directory.
// Very simple and fast implementation that refreshes a directory
// every time you open it.
export class TreeView  {

  private aspects = {};
    defaultHandler = (data,name:string) => { return data[name];};

   
    setAspect(name,aspect) {
        this.aspects[name] = aspect;
    }

    getValue(data,name:string)  {
        var fn = this.aspects[name] || this.defaultHandler;
		return fn(data,name);
	}







	private static COLLAPSED = "collapsed";
	private static OPENED = "opened";
    private openFolders = [];

	private rootElem: HTMLElement;
	public onselect: (path:string) => void;
	public oncontextmenu : (path:string) => void; //TODO implement

	constructor() {
       // super();
        
		this.rootElem = document.createElement("div");
        this.rootElem.className = "treeview";
        
	    this.rootElem.onclick = (ev) => {
					ev.stopPropagation();
					this.handleClick(<HTMLElement>ev.srcElement);
		}
	}

    public refresh() {
        this.rootElem.innerHTML = "";
        var elem = this.render(this.getValue(null,"children"));
        this.rootElem.appendChild(elem);        
    }


	appendTo(elem:HTMLElement) {
		elem.appendChild(this.rootElem);
	}

	private render(list) : HTMLElement {
		var ul = document.createElement("ul");
		list.forEach( (entry) => {
			var li = <HTMLElement>document.createElement("li");
			// var span = <HTMLElement>document.createElement("span");
			// span.innerText = entry.name;
			// li.appendChild(span);

			li.innerText = this.getValue(entry,"name");
			li["_value"] = entry;

			if (this.getValue(entry, "isFolder")) {
				li.className = TreeView.COLLAPSED;
			}

            this.decorate(li);
			ul.appendChild(li);
		})
		return ul;
	}

    private decorate(li:HTMLElement) {
        var entry = li["_value"];
        var decorator = this.getValue(entry, "decorator");
        if (decorator) li.className += " " + decorator;
    }

	private handleClick(li:HTMLElement) {
        var entry = li["_value"];
		if (! entry.isFolder) {
				if (this.onselect) {
					this.onselect(entry.path);
				}
				return;
		}

		if ($(li).hasClass(TreeView.OPENED)) {
			li.className = TreeView.COLLAPSED;
            this.decorate(li);
			li.removeChild(li.childNodes[1]);
			return;
		}
		li.className = TreeView.OPENED;
        this.decorate(li);
		var entries =  this.getValue(entry,"children");
		// entries.sort(sort);

        var ul = this.render(entries);
        li.appendChild(ul);
	} 
	

}


}