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
    
        
    export class Widget {
        
        public onselect: (value) => void;
        public oncontextmenu: (path: string) => void; //TODO implement
        
        public aspects = {};
        private static DefaultAspectHandler = (data, name: string) => { return data[name]; };
        
        private decorators = {};
        private value;
        public rootElem:HTMLElement;
        
        constructor(tagName="div") {
            this.rootElem = document.createElement(tagName);            
        }
                
        setAspect(name, value) {
            this.aspects[name] = value;
        }


        getAspect(name: string) {
            var fn = this.aspects[name] || Widget.DefaultAspectHandler;
            return fn(this.value, name);
        }
        
        show() {
            this.rootElem.style.display = "block";    
        }
         
        remove() {
            if (this.rootElem.parentNode)
                this.rootElem.parentNode.removeChild(this.rootElem);
        } 
         
        clear() {
            this.rootElem.innerHTML = "";
        }        
                
        hide() {
            this.rootElem.style.display = "none";                
        }
        
        appendTo(elem:HTMLElement){
            elem.appendChild(this.rootElem);
        }
        
        
        setValue(value) {
            this.value = value;
        }
        
        getValue() {
            return this.value;
        }
        
        
        private setClassName() {
            var name = " " + Object.keys(this.decorators).join(" ");
            this.rootElem.className = name;
        }
        
        decorate(decorator:string) {
            this.decorators[decorator] = true;
            this.setClassName();
        }
        
        
        redecorate(olddecorator:string, newdecorator:string) {
            delete this.decorators[olddecorator];
            this.decorators[newdecorator] = true;
            this.setClassName();
        }
        
        hasDecorator(decorator:string) {
            return this.decorators.hasOwnProperty(decorator);
        }
        
        strip(decorator:string) {
            delete this.decorators[decorator];
            this.setClassName();
        }
        
        render() {
            var decorator = this.getAspect("decorator");
            if (decorator) this.decorate(decorator);
        }
        
        
    }
  
  
    class Label extends Widget {
        constructor(label?:string) {
            super("span");
            if (label) this.setAspect("label",label);
        }
            
        setLabel(label:string) {
            this.setAspect("label", label);
        }    
            
        render() {
            this.rootElem.innerText = this.getAspect("label");
        }
        
    }
  
  
  
  
    export class TreeElement extends Widget {
        constructor(value?) {
            super("li");
            this.setValue(value);
        }
        
        render() {
            super.render();
            this.rootElem.innerHTML = "";            
            var span = <HTMLElement>document.createElement("span");
            span.innerText = this.getAspect("name");
            this.rootElem.appendChild(span);            
        }
        
        removeChildren() {
            if (this.rootElem.childNodes.length > 1)
             this.rootElem.removeChild(this.rootElem.childNodes[1]);
        }
                
    }
    
    
    export class Tree extends Widget {
        
        constructor() {
            super("ul");
            this.decorate("treeview");
        }
                                
        private render() {
            this.rootElem.innerHTML = "";
            var list = this.getAspect("children");            
            list.forEach((entry) => {
                var li = document.createElement("li");                
                var treeNode = new TreeElement(entry);
                treeNode.setValue(entry);
                if (entry.isFolder) treeNode.decorate(TreeView.COLLAPSED);
                treeNode.rootElem.onclick = (ev) => {
                    ev.stopPropagation();
                    if (ev.srcElement.tagName === "SPAN") {
                        console.log("selected");
                    } else {
                        this.handleClick(treeNode);
                    }
                }
                treeNode.appendTo(li);                
                this.rootElem.appendChild(li);                                
                treeNode.render();
                
            })            
        }
        
        refresh() {
            this.render();
        }
        
        private handleClick(node: TreeElement) {

            if (node.hasDecorator(TreeView.OPENED)) {
                node.redecorate(TreeView.OPENED,TreeView.COLLAPSED); 
                node.removeChildren();                
                return;
            }
            
            if (node.hasDecorator(TreeView.COLLAPSED)) {
                node.redecorate(TreeView.COLLAPSED,TreeView.OPENED); 
                var child = new Tree();
                child.setValue(node.getValue());
                child.aspects = this.aspects;
                child.render();
                child.appendTo(node.rootElem);
            }
        }

        
    }
    
    class Container extends Widget {
        
        children:Widget[] = [];
        
        constructor(elem?) {
            super(elem);
        }
        
        addWidget(widget:Widget) {
            this.children.push(widget);
            widget.appendTo(this.rootElem);
        }


        clear() {
            super.clear();
            this.children = [];
        }

        setWidget(widget:Widget) {
            this.clear();
            this.addWidget(widget);
        }

        setText(txt:string) {
           this.rootElem.innerText = txt; 
        }
            
    }
 
 
    class Pane extends Container {
        constructor() {
            super();
        }
        
    }
    
    
}    
    
    