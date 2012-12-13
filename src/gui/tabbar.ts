
module gui {


export class Tabbar {

    private static instances = {};
    private static counter = 0;
    private root : HTMLElement;
    private static nr:number = 0;
    onclick:(Tabbar,Tab)=> void;
    private tabs:Tab[];
    private counter = 0;

    constructor(private id?:string) {
        if (! this.id) {
            this.id = "tabs_" + (this.counter++);
        }
        this.root = <HTMLElement>document.createElement("ul");        
        this.root.setAttribute("id",id);
        this.root.onclick = this.onClickHandler.bind(this);
    }

    addToElement(parent: HTMLElement) {
        parent.appendChild(this.root);
    }

    addTab(tab: Tab) {
        this.tabs.push(tab);
        tab.addToElement(this.root);
    }

    activateTabWhere(name:string, value:any) { 
        this.tabs.forEach(tab => {
                if (tab.data && (tab.data[name] === value)) { 
                        tab.activate();
                 } else {                       
                        tab.deActivate();
                }
        });           
    }

    private getClickedTab(ev) {
        return this.tabs[0];
    }

    private onClickHandler(ev) {
        if (this.onclick) {
            var tab = this.getClickedTab(ev);
            this.onclick(this,tab);
        }
    }
   
}

export class Tab {

    private root: HTMLElement;

    constructor(public label:string, public data?) {
        this.root = document.createElement("li");
        this.root.innerText = label;
    }

    addToElement(parent:HTMLElement) {
        parent.appendChild(this.root);
    }

    setLabel(label:string) {
        this.root.innerText = label;
    }

    activate() {
        this.root.className = "active";
    }

    deActivate() {
        this.root.className = "";   
    }

}

function test() {
    var tb = new Tabbar();
    tb.addTab(new Tab("tab1")) ;
    tb.addTab(new Tab("tab2"));
}


}