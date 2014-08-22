class BusyWindow extends qx.ui.window.Window {
    
    constructor(name) {
        super(name);
        this.setLayout(new qx.ui.layout.Basic());
        this.setMinWidth(300);
        this.setMinHeight(150);
        this.add(new qx.ui.basic.Label("Please wait one moment ...."));
        
        this.setModal(true);
        this.addListener("resize", this.center);
        this.addListenerOnce("appear",() => {
          setTimeout(() => {
              this.fireDataEvent("ready",{});
          },100);  
            
        })
    }
    
    
}