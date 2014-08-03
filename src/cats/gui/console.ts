/**
 * Basic logging widget that can be used to write 
 * logging information that are of interest to the user.
 * 
 */ 
class ConsoleLog extends qx.ui.embed.Html /* qx.ui.container.Scroll  qx.ui.core.Widget */ {
 
    private container:HTMLElement;
 
    constructor() {
        super(null);
        this.setPadding(2,2,2,2);
        this.setDecorator(null);
        //var w = new qx.ui.core.Widget();
        // this.add(w);
        this.setOverflow("auto","auto");
        this.addListenerOnce("appear", () => {
            this.container = this.getContentElement().getDomElement();
        });
        this.setContextMenu(this.createContextMenu());
    }
    
    private insertLine(line, severity?) {
        if (line.trim()) {
            var span = document.createElement("SPAN");
            span.innerText = line;
            if (severity) span.style.color = "red";
            this.container.appendChild(span);
        }
        this.container.appendChild(document.createElement('BR'));
    }
     
    /**
     * Log a message to the console widget. This should only be used for 
     * logging mesages that are useful to the enduser (= developer) and not for
     * debug information.
     * 
     * @TODO implement a better performing solution using addChild
     */ 
    log(msg:string,printTime:boolean=false,severity:number=0) {
        IDE.problemPane.selectPage("console");
        if (this.container) {
            var prefix = "" 
            if (printTime) {
               var dt = new Date();
               prefix = dt.toLocaleTimeString() + " ";
            }
            var lines = [].concat(msg.split("\n"));
            lines.forEach((line) => {
                if (line.trim()) line = prefix + line;
                this.insertLine(line,severity);
            });
            
            this.container.scrollTop = this.container.scrollHeight;
             
            // this.container.innerText += prefix + msg + "\n";
            // this.container.insertAdjacentText("beforeend", prefix+msg+"\n");
            // this.container.appendChild(document.createTextNode(prefix + msg));
            // this.container.appendChild(document.createElement('BR'));
           
            // this.getContentElement().scrollToY(100000);
            // this.container.scrollTop = this.container.scrollHeight; // Scroll to bottom
            
            // var t = document.createTextNode(prefix + msg);
            // this.container.appendChild(t);
            // this.container.appendChild(document.createElement("br"));
        }
    } 
    
    private createContextMenu() {
        var menu = new qx.ui.menu.Menu();
        var item1 = new qx.ui.menu.Button("Clear Output");
        item1.addListener("execute", () => { this.clear();});
        menu.add(item1);
        return menu;
    }
    
    private clear() {
        if (this.container) this.container.innerHTML = "";
    }
    
}