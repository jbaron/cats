module Cats.UI {

interface Tab {
    elem: HTMLElement;
    selected: bool;
    name: bool;
}
    
class ElemTabAdapter {
    constructor(private tab:Cats.UI.Tabbar, private elems:HTMLElement[], selected?:HTMLElement ) {
        tab.setOptions(this.convert(elems));
        if (selected) this.onSelect(selected);
    };

    private convert(elems: HTMLElement[]) : Tab[] {
        var result = [];        
        for (var i=0;i<elems.length;i++) {
            var elem = elems[i];
            result.push({
                name: elem.title,
                selected: false,
                elem: elem
            });
        }
        return result;
    }


    private onSelect(elem) {
        var options = this.tab.options;
        options.forEach( (option) => {
            option.elem.style.display = "none";
            option.selected = false;
        });
        elem.style.display = "block";
        elem.selected =true;
        this.tab.refresh();
    }


}    
    
    
}