
module cats.ui {



export class SingleSelector {

    options = [];
    private aspects = {};
    selected;
    public onselect: Function;

    addOption(obj) {
        this.options.push({value:obj});
    }

    setOptions(arr:any[]) {
        this.options = arr;
        // [];
        // arr.forEach( (option) => this.addOption(option));        
    }

    setAspect(name,aspect) {
        this.aspects[name] = aspect
    }

    getAspect(name, obj) {
        var aspect = this.aspects[name];
        if (aspect == null) {
            return obj[name];
        } else {
            if (typeof(aspect) === "function") return aspect(obj);
            return obj[aspect];
        }
    }

    select(obj,notify=false) {
        this.selected = obj;
    }

    removeOption(obj) {
        this.options.forEach(option => {
            // TODO
        });
    }

    refresh() {}


}

export class Tabbar extends SingleSelector {

    private static instances = {};
    private static counter = 0;
    private root : HTMLElement;
    private static nr:number = 0;
    onselect:(option)=> void;
    private counter = 0;
    public aspect;

    constructor() {
        super();
        this.root = <HTMLElement>document.createElement("ul");        
        this.root.onclick = this.onClickHandler.bind(this);
    }

    private render() {
        this.root.innerHTML="";
        this.options.forEach( (option) => {
             var optionElem = document.createElement("li");
             optionElem["_value"] = option;
             optionElem.innerText = this.getAspect("name",option);

             var longName = this.getAspect("longname",option);
             if (longName) optionElem.setAttribute("title",longName);

             var selected = this.getAspect("selected",option);
             if (selected === true) {
                optionElem.className = "active";
             }                     

             /*
             var changed = this.getAspect("changed",option);
             if (changed === true) {
                optionElem.className += " changed";
             }

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

    appendTo(elem:HTMLElement) {
        this.render()
        elem.appendChild(this.root);
    }


    select(obj,notify=false) { 
        super.select(obj);

        this.options.forEach(option => {
                if (option.value === this.selected) { 
                        option.elem.className = "active";
                 } else {                       
                        option.elem.className = "";
                }
        });           
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
   
}


function test() {
    var users = [
        {name:"john", age:12},
        {name:"peter", age:15},
        {name:"marry", age:18},
    ]

    var tb = new Tabbar();
    tb.setOptions(users);
    



    tb.onselect = (user) => {
        alert("User selected");
    };
}


}