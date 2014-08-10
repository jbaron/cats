class UMLEditor extends qx.ui.embed.Html implements Editor {
	 
	 private backgroundColors = ["white", "black" , "grey"];
	 private diagram;
	 
	 constructor(private session:Cats.Session) {
		 super(null);
		 // this.createContextMenu();
		 this.setOverflow("auto", "auto");
		 
		  this.addListenerOnce("appear", () => {
		     var container:HTMLElement = this.getContentElement().getDomElement();
		     var div = document.createElement("div");
		     div.style.height = "100%";
		     div.style.width = "100%";
		     container.appendChild(div);
		     this.render(div);
		     this.focus();
		  });
	 }

    private render(container) {
            var classDiagram = new UMLClassDiagram({id: container, width: 2000, height: 2000 });

            // Adding classes...
            var vehicleClass = new UMLClass({ x:100, y:50 });
            var carClass = new UMLClass({ x:30, y:170 });
            var boatClass = new UMLClass({ x:150, y:170 });
            classDiagram.addElement(vehicleClass);
            classDiagram.addElement(carClass);
            classDiagram.addElement(boatClass);
        
            // Adding generalizations...
            var generalization1 = new UMLGeneralization({ b:vehicleClass, a:carClass });
            var generalization2 = new UMLGeneralization({ b:vehicleClass, a:boatClass });
            classDiagram.addElement(generalization1);       
            classDiagram.addElement(generalization2);       


            //Defining vehicleClass
            vehicleClass.setName("Vehicle");
            vehicleClass.addAttribute( 'owner' );
            vehicleClass.addAttribute( 'capacity' );
            vehicleClass.addOperation( 'getOwner()' );
            vehicleClass.addOperation( 'getCapacity()' );
            
            //Defining carClass
            carClass.setName("Car");
            carClass.addAttribute( 'num_doors' );
            carClass.addOperation( 'getNumDoors()' );

            //Defining boatClass
            boatClass.setName("Boat");
            boatClass.addAttribute( 'mast' );
            boatClass.addOperation( 'getMast()' );

            //Draw the diagram
            classDiagram.draw();

            //Interaction is possible (editable)
            classDiagram.interaction(true);
            this.diagram = classDiagram;
            
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
    
    getContent() { return null}
    
    setContent(content, keepPosition=true) {}
    
    updateWorld() {}
    
    moveToPosition(pos: Ace.Position) {}
 
 
}