/**
 * Basic logging widget that can be used to write 
 * logging information that are of interest to the user.
 * 
 */ 
class ConsoleLog extends qx.ui.embed.Html /* qx.ui.container.Scroll  qx.ui.core.Widget */ {
 
    private container:HTMLElement;
    private printTime = true;
 
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
    
    private insertLine(line:string, severity?:number) {
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
    log(msg:string,severity:number=0) {
        IDE.problemPane.selectPage("console");
        if (this.container) {
            var prefix = "" ;
            if (this.printTime) {
               var dt = new Date();
               prefix = dt.toLocaleTimeString() + " ";
            }
            var lines = msg.split("\n");
            lines.forEach((line) => {
                if (line.trim()) line = prefix + line;
                this.insertLine(line,severity);
            });
            
            this.container.scrollTop = this.container.scrollHeight;
        }
    } 
    
    error(msg:string) {
        this.log(msg,2);
    }
    
    
    private createContextMenu() {
        var menu = new qx.ui.menu.Menu();
        var item1 = new qx.ui.menu.Button("Clear Output");
        item1.addListener("execute", () => { this.clear();});
        menu.add(item1);
        
        var item2 = new qx.ui.menu.Button("Toggle Print Time");
        item2.addListener("execute", () => { this.printTime = ! this.printTime;});
        menu.add(item2);
        
        return menu;
    }
    
    private clear() {
        if (this.container) this.container.innerHTML = "";
    }
    
}