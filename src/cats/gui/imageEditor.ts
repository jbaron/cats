class ImageEditor extends qx.ui.embed.Canvas {
	 
	 constructor(private session:Cats.Session) {
		 super();
		 this.loadImage(session.name);
	 }

	 private loadImage(url) {
			var image = new Image();
			image.onload = () => { this.drawImage(image);} 
			image.src = url;
	 }

	private resizeIfRequired(image:HTMLImageElement) {
	    if (image.width > this.getCanvasWidth()) {
	        this.setCanvasWidth(image.width)
	    }
	    
	    if (image.height > this.getCanvasHeight()) {
	        this.setCanvasHeight(image.height)
	    }
	}
	 
	 private drawImage(image) {
	    this.resizeIfRequired(image); 
		this.getContext2d().drawImage(image,
            this.getCanvasWidth() / 2 - image.width / 2,
            this.getCanvasHeight() / 2 - image.height / 2
        );
	 }
 
}