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


module Cats.UI {


    export interface ListEntry {
        name: string;
        path: string;
        isFolder: boolean;
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
    // Very simple and fast implementation
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

        static COLLAPSED = "collapsed";
        static OPENED = "opened";
        private openFolders = [];
        
        private findOpenFolders() {
            var a = [];
            $(this.rootElem).find('.opened').each((index: number, node: HTMLLIElement) => {
                a.push(node.getAttribute('data-value'));
            });
            return a;
        }

        private rootElem: HTMLElement;
        public onselect: (value) => void;
        public oncontextmenu: (path: string) => void; //TODO implement

        constructor() {

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
            var openFolders = this.findOpenFolders();
            this.rootElem.innerHTML = "";
            var elem = this.render(this.getValue(null, "children"));
            this.rootElem.appendChild(elem);
            openFolders.forEach(path => {
                this.handleClick($('li[data-value="' + path + '"]')[0]);
            });
        }

        public static refreshElem(elem: HTMLElement) {
            if (elem.tagName !== "LI") {
                elem = elem.parentElement;
            }
            
            if (elem.childElementCount > 1) {
                elem.removeChild(elem.children[1]);
                if ($(elem).hasClass(TreeView.OPENED)) {
                    $(elem).removeClass(TreeView.OPENED);
                    $(elem).addClass(TreeView.COLLAPSED);
                }
            }
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
                li.setAttribute("data-name", entry.name.toLowerCase());
                li["_value"] = entry;

                if (entry.path) {
                    li.setAttribute("data-value", encodeURIComponent(entry.path));
                }

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
            
            var elem;

            if ($(li).hasClass(TreeView.OPENED)) {
                li.className = TreeView.COLLAPSED;
                this.decorate(li);
                // li.removeChild(li.childNodes[1]);
                elem = <HTMLElement>li.childNodes[1];
                elem.style.display = "none";
                return;
            }
            
            if ($(li).hasClass(TreeView.COLLAPSED)) {
                li.className = TreeView.OPENED;
                this.decorate(li);
                
                elem = <HTMLElement>li.childNodes[1];
                if (elem) {
                    elem.style.display = "block";
                    return;
                }
                
                var entry = li["_value"];
                var entries = this.getValue(entry, "children");
                var ul = this.render(entries);
                li.appendChild(ul);
            }
        }


    }


}