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

            if ($(li).hasClass(TreeView.OPENED)) {
                li.className = TreeView.COLLAPSED;
                this.decorate(li);
                li.removeChild(li.childNodes[1]);
                return;
            }
            
            if ($(li).hasClass(TreeView.COLLAPSED)) {
                li.className = TreeView.OPENED;
                this.decorate(li);
                var entry = li["_value"];
                var entries = this.getValue(entry, "children");
                var ul = this.render(entries);
                li.appendChild(ul);
            }
        }


    }


}