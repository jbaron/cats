///<reference path='../cats/node.d.ts' />


module Cats.UI {


    export interface ListEntry {
        name: string;
        path: string;
        isFolder: bool;
    }

    class AspectWidget {

        private aspects = {};
        defaultHandler = (data, name: string) => { return data[name]; };


        setAspect(name, aspect) {
            this.aspects[name] = aspect;
        }

        getValue(data, name: string) {
            var fn = this.aspects[name] || this.defaultHandler;
            return fn(data, name);
        }

    }


    // Created a file tree view based on a directory.
    // Very simple and fast implementation that refreshes a directory
    // every time you open it.
    export class TreeView {

        private aspects = {};
        defaultHandler = (data, name: string) => { return data[name]; };


        setAspect(name, aspect) {
            this.aspects[name] = aspect;
        }

        getValue(data, name: string) {
            var fn = this.aspects[name] || this.defaultHandler;
            return fn(data, name);
        }

       private static COLLAPSED = "collapsed";
        private static OPENED = "opened";
        private openFolders = [];

        private rootElem: HTMLElement;
        public onselect: (value) => void;
        public oncontextmenu: (path: string) => void; //TODO implement

        constructor() {
            // super();

            this.rootElem = document.createElement("div");
            this.rootElem.className = "treeview";

            this.rootElem.onclick = (ev) => {
                ev.stopPropagation();
                var elem = <HTMLElement>ev.srcElement;
                if (elem.tagName.toLowerCase() === "span") {
                    if (this.onselect) {
                        var entry = TreeView.getValueFromElement(elem);
                        this.onselect(entry);
                    }
                } else {
                    this.handleClick(elem);
                }
            }
        }

        public refresh() {
            this.rootElem.innerHTML = "";
            var elem = this.render(this.getValue(null, "children"));
            this.rootElem.appendChild(elem);
        }


        appendTo(elem: HTMLElement) {
            elem.appendChild(this.rootElem);
        }

        private render(list): HTMLElement {
            var ul = document.createElement("ul");
            list.forEach((entry) => {
                var li = <HTMLElement>document.createElement("li");
                var span = <HTMLElement>document.createElement("span");
                span.innerText = this.getValue(entry, "name");
                li.appendChild(span);

                // li.innerText = this.getValue(entry,"name");
                li["_value"] = entry;

                if (this.getValue(entry, "isFolder")) {
                    li.className = TreeView.COLLAPSED;
                }

                this.decorate(li);
                ul.appendChild(li);
            })
            return ul;
        }

        private decorate(li: HTMLElement) {
            var entry = li["_value"];
            var decorator = this.getValue(entry, "decorator");
            if (decorator) li.className += " " + decorator;
        }

        static getValueFromElement(elem: HTMLElement) {
            if (elem.tagName.toLowerCase() === "span") {
                elem = <HTMLElement>elem.parentNode;
            }
            return elem["_value"];
        }

        private handleClick(li: HTMLElement) {
            var entry = li["_value"];
 
            if ($(li).hasClass(TreeView.OPENED)) {
                li.className = TreeView.COLLAPSED;
                this.decorate(li);
                li.removeChild(li.childNodes[1]);
                return;
            }
            li.className = TreeView.OPENED;
            this.decorate(li);
            var entries = this.getValue(entry, "children");


            var ul = this.render(entries);
            li.appendChild(ul);
        }


    }


}