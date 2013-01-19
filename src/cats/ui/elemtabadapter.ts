module Cats.UI {

export interface Tab {
    elem: HTMLElement;
    selected: bool;
    name: bool;
}
    
export class ElemTabAdapter {
    constructor(private tab:Cats.UI.Tabbar, private elems:HTMLElement[], selected?:HTMLElement ) {
        tab.setOptions(this.convert(elems));
        if (selected) this.onSelect(this.getTab(selected));
        tab.onselect = (elem:Tab) => this.onSelect(elem);        
    };

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
                name: elem.title || elem.id,
                selected: false,
                elem: elem
            });
        }
        return result;
    }


    public select(elem:HTMLElement) {
        this.onSelect(this.getTab(elem));
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