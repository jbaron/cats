class ImageEditor extends qx.ui.embed.Canvas implements Editor {
	 
	 private backgroundColors = ["white", "black" , "grey"];
	 
	 constructor(private session:Cats.Session) {
		 super();
		 this.loadImage(session.name);
		 this.createContextMenu();
	 }

     executeCommand(name, ...args):boolean {
         return false;
     }    

	 private loadImage(url) {
			var image = new Image();
			image.onload = () => { this.drawImage(image);}; 
			image.src = url;
	 }

	private resizeIfRequired(image:HTMLImageElement) {
	    if (image.width > this.getCanvasWidth()) {
	        this.setCanvasWidth(image.width);
	    }
	    
	    if (image.height > this.getCanvasHeight()) {
	        this.setCanvasHeight(image.height);
	    }
	}
	 
	 private drawImage(image) {
	    this.resizeIfRequired(image); 
		this.getContext2d().drawImage(image,
            this.getCanvasWidth() / 2 - image.width / 2,
            this.getCanvasHeight() / 2 - image.height / 2
        );
	 }
 
     private createContextMenu() {
        var menu = new qx.ui.menu.Menu();
        this.backgroundColors.forEach((color) => {
            var button = new qx.ui.menu.Button("Background " + color);
            button.addListener("execute",() => {
                this.setBackgroundColor(color);
            });
            menu.add(button);
        });
        this.setContextMenu(menu);
    }
 
 
     replace(range:Ace.Range,content:string) {}  
    
    getContent() { return null;}
    
    setContent(content, keepPosition=true) {}
    
    updateWorld() {}
    
    moveToPosition(pos: Ace.Position) {}
 
 
}