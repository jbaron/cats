/**
 * The toolbar for CATS
 */
class StatusBar extends qx.ui.toolbar.ToolBar {

    constructor() {
        super();
        this.setPadding(0, 0, 0, 0);
        this.setMargin(0, 0, 0, 0);
        this.setDecorator(null);
        this.init();
    }

    init() {
       var positionButton = new qx.ui.toolbar.Button("1:1");
       positionButton.setPadding(1,1,1,1);
       positionButton.setMargin(0, 0, 0, 0);
       this.add(positionButton); 
    }

    toggle() {
        if (this.isVisible()) { 
            this.exclude();    
        } else {
            this.show();
        }
    }


}