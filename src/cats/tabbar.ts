/*
<div id="tabs">
    <ul>
        <li><a href="#fragment-1"><span>One</span></a></li>
        <li><a href="#fragment-2"><span>Two</span></a></li>
        <li><a href="#fragment-3"><span>Three</span></a></li>
    </ul>
    <div id="fragment-1">
        <p>First tab is active by default:</p>
        <pre><code>$( "#tabs" ).tabs(); </code></pre>
    </div>
    <div id="fragment-2">
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
    </div>
    <div id="fragment-3">
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
    </div>
</div>
*/

module gui {

declare var $:any;

export class Tabbar {

    private root : Element;
    private ul : Element; 
    private tabs: Tab[] = [];
    private static nr:number = 0;

    constructor(private id:string = "tabs") {
        this.root = document.createElement("div");
        this.root.setAttribute("id", id);
        this.ul = document.createElement("ul");
        this.root.appendChild(this.ul);
    }

    getElement() {
        return this.root;
    }

    addTab(label:string, ref?:string):Tab {
        if (!ref) ref = this.id + (Tabbar.nr++);

        var li = document.createElement("li");
        var a = document.createElement("a");
        a.setAttribute("href","#" + ref);
        var span = document.createElement("span");
        span.appendChild(document.createTextNode(label));
        a.appendChild(span);
        li.appendChild(a);
        this.ul.appendChild(li);
        var tab = new Tab(ref);
        this.tabs.push(tab);
        this.root.appendChild(tab.getElement());
        return tab;
         $(this.root).tabs();
    }

    render() {
        $(this.root).tabs();
    }


}

export class Tab {

    private root: Element;

    constructor(private ref:string) {
        var div = document.createElement("div");
        div.setAttribute("id",ref);
        this.root = div;
    }

    addContent(node:Node) {
        this.root.appendChild(node);
    }

    getElement() {
        return this.root;
    }

    clear() {
        var node:any = this.root;
        node.innerHTML = "";
    }

}

function test() {
    var tb = new Tabbar();
    tb.addTab("tab1");
    tb.addTab("tab2");
}


}