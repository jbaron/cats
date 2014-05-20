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

export interface Tab {
    elem: HTMLElement;
    selected: boolean;
    name: boolean;
}
    
export class ElemTabAdapter {
    
    constructor(private tab:Cats.UI.Tabbar, private elems:HTMLElement[], selected?:HTMLElement ) {
        tab.setOptions(this.convert(elems));
        if (selected) this.onSelect(this.getTab(selected));
        tab.onselect = (elem:Tab) => this.onSelect(elem);        
    }

    setAspect(elem:HTMLElement,name:string,value) {
        var tab = this.getTab(elem);
        if (tab) tab[name] = value;
    }

    private getTab(elem: HTMLElement):Tab {
        var options = this.tab.options;
        for (var i=0;i<options.length;i++) {
            if (options[i].elem === elem) return options[i];
        }
        return null;
    }

    private convert(elems: HTMLElement[]) : Tab[] {
        var result = [];        
        for (var i=0;i<elems.length;i++) {
            var elem = elems[i];            
            result.push({
                name: elem.getAttribute("data-title") || elem.title || elem.id,
                selected: false,
                elem: elem
            });
        }
        return result;
    }

    private onSelect(tab:Tab) {
        var options:Tab[]= this.tab.options;
        options.forEach( (option) => {
            option.elem.style.display = "none";
            option.selected = false;
        });
        tab.elem.style.display = "block";
        tab.selected =true;
        this.tab.refresh();
    }


}    
    
    
}