
module cats.ui {



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

export class Tabbar extends AspectWidget {

    private root : HTMLElement;
    onselect:(option)=> void;
    options = [];

    constructor() {
        super();
        this.root = <HTMLElement>document.createElement("ul");        
        this.root.onclick = this.onClickHandler.bind(this);
        this.root.className = "tabbar";
    }

    private render() {
        this.root.innerHTML="";
        this.options.forEach( (option) => {
             var optionElem = document.createElement("li");
             optionElem["_value"] = option;
             optionElem.innerText = this.getValue(option,"name");

             var longName = this.getValue(option,"longname");
             if (longName) optionElem.setAttribute("title",longName);

             var selected = this.getValue(option,"selected");
             if (selected === true) {
                optionElem.className = "active";
             }                     
            
             var changed = this.getValue(option,"changed");
             if (changed === true) {
                optionElem.className += " changed";
             }

             /*
             var closeButton = document.createElement("span");
             closeButton.innerHTML = "X";
             optionElem.appendChild(closeButton);

            */
             this.root.appendChild(optionElem);
        });
    }

    refresh() {
        this.render();
    }

    setOptions(arr:any[]) {
        this.options = arr;
    }

    appendTo(elem:HTMLElement) {
        this.render();
        elem.appendChild(this.root);
    }

/*
    select(obj,notify=false) { 
        
        this.options.forEach(option => {
                if (option.value === this.selected) { 
                        option.elem.className = "active";
                 } else {                       
                        option.elem.className = "";
                }
        });           
    }
*/

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
   
}



}