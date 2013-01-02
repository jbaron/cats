
module cats.ui {

export class ToolTip {

    private element:HTMLElement;

    constructor() {    
        this.element = this.createElement();
    };
    
    show(x:number, y:number, tip:string) {
        this.element.innerText = tip;

        var st = this.element.style;
        st.left = (x + 10).toString(10) + "px";
        st.top =  (y + 10).toString(10) + "px";
        
        st.display = "block";
    };

    hide() {
        this.element.style.display = "none";
    }

    // Copied from Ace kitchen-sinck demo
    private createElement() {
        var tooltipNode = <HTMLElement>document.createElement("div");
        document.documentElement.appendChild(tooltipNode);
        var st = tooltipNode.style;
        st.position = "fixed";
        st.display = "none";
        st.background = "#ffffca";
        st.color = "#000023";
        st.borderRadius = "";
        st.border = "1px solid gray";
        st.padding = "1px";
        st.zIndex = "1000";
        st.fontFamily = "monospace";
        st.whiteSpace = "pre-line";
        return tooltipNode;
    };


}

}