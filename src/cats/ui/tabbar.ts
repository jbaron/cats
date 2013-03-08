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


///<reference path='mvc.ts'/>

module Cats.UI {



export class AspectWidget {

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





class SessionsBar extends MVC.View {
    
    private root : HTMLElement;
    private ul: HTMLElement;
    private selectElem: HTMLElement;
    
    constructor() {
        super();
        // <ul>{{sessions}}<li title="{{name}}">{{shortName}}</li>{{sessions}}</ul>
        this.root = <HTMLElement>document.createElement("div");
        this.ul = <HTMLElement>document.createElement("ul");
        this.selectElem = <HTMLElement>document.createElement("select");
        this.selectElem.style.display = "none";
        this.root.appendChild(this.ul);
        this.root.appendChild(this.selectElem);
        this.root.className = "tabbar";
        this.ul.className = "tabbar";
        this.ul.onclick = (ev) => {
            IDE.activeSession = ev.srcElement["_value"];
        };
        // this.onClickHandler.bind(this);

    }
    
    
     private renderDropDown() {
        this.selectElem.style.display = "block";
        this.selectElem.innerHTML = "";
        IDE.sessions.forEach((session) => {
            var optionElem = <HTMLOptionElement>document.createElement("option");
            optionElem.innerText = session.shortName;
            optionElem.value = session.name;
            if (session === IDE.activeSession) optionElem.selected = true;
            optionElem["_value"] = session;
            this.selectElem.appendChild(optionElem);
        });
    }

    private isOverflowed() {
        var element = this.ul;
        return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
    }

    
    render() {
        this.ul.innerHTML = "";
        IDE.sessions.forEach((session) => {
            var li = document.createElement("li");
            li.innerText = session.shortName;
            if (session === IDE.activeSession) li.className += " active";            
            if (session.changed) li.className += " changed "
            
            this.ul.appendChild(li);         
        });    
         if (this.isOverflowed()) { 
                this.renderDropDown();
         } else {
                this.selectElem.style.display = "none";
         }        
        
    }
        
        
}
    


export class Tabbar extends AspectWidget {

    private root : HTMLElement;
    private ul: HTMLElement;
    private selectElem: HTMLElement;

    onselect:(option)=> void;
    ondelete:(option)=>void;
    options = [];

    constructor() {
        super();
        this.root = <HTMLElement>document.createElement("div");
        this.ul = <HTMLElement>document.createElement("ul");
        this.selectElem = <HTMLElement>document.createElement("select");
        this.ul.onclick = this.onClickHandler.bind(this);
        this.selectElem.onchange = (ev) => this.onChangeHandler(ev);
        this.selectElem.style.display = "none";
        this.root.appendChild(this.ul);
        this.root.appendChild(this.selectElem);
        this.root.className = "tabbar";
        this.ul.className = "tabbar";
    }

    private renderDropDown() {
        this.selectElem.style.display = "block";
        this.selectElem.innerHTML = "";
        this.options.forEach( (option) => {
            var optionElem = <HTMLOptionElement>document.createElement("option");
            optionElem.innerText = this.getValue(option,"name");
            var selected = this.getValue(option,"selected");
            if (selected === true) {
                optionElem.selected = true;
                // optionElem.setAttribute("selected","selected");
             }
            optionElem["_value"] = option;
            this.selectElem.appendChild(optionElem);
        });

    }

    private render() {
        this.ul.innerHTML="";
        this.options.forEach( (option) => {
             var optionElem = document.createElement("li");
             optionElem["_value"] = option;
             optionElem.innerText = this.getValue(option,"name");
             optionElem.className = "tab"

             var longName = this.getValue(option,"longname");
             if (longName) optionElem.setAttribute("title",longName);

             var selected = this.getValue(option,"selected");
             if (selected === true) {
                optionElem.className += " active";
             }                     
            
             var changed = this.getValue(option,"changed");
             if (changed === true) {
                optionElem.className += " changed";
             }

             var decorator = this.getValue(option,"decorator");
             if (decorator) {
                optionElem.className += " " + decorator;
             }

             // Create the delete button
             if (this.ondelete) {
                 var closeButton = document.createElement("span");
                 closeButton.innerHTML = "X";
                 closeButton.onclick = () => {
                     if (this.ondelete) {
                         this.ondelete(option);
                     }
                 }
                 optionElem.appendChild(closeButton);
             }
            
             this.ul.appendChild(optionElem);
        });
        // Check if overflow occured and if so render an additional dropdown.
        if (this.isOverflowed()) { 
            this.renderDropDown();
        } else {
            this.selectElem.style.display = "none";
        }
    }

    refresh() {
        this.render();
    }

    private isOverflowed():bool{
        var element = this.ul;
        return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
    }


    setOptions(arr:any[]) {
        this.options = arr;
        this.refresh();
    }

    appendTo(elem:HTMLElement) {
        this.render();
        elem.appendChild(this.root);
    }


    selectOption(index:number) { 
        if (this.onselect) this.onselect(this.options[index]);         
    }

    private getSelectedOption(ev) {
        var elem = ev.srcElement;
        return elem["_value"];
    }

    private onClickHandler(ev) {
        if (this.onselect) {            
            var option = this.getSelectedOption(ev);
            this.onselect(option);
        }
    }

    private onChangeHandler(ev) {
        if (this.onselect) {
             var sel = ev.srcElement;
             var option = sel.options[sel.selectedIndex];
             var value = option["_value"];
             this.onselect(value);
        }            
    }
   
}



}