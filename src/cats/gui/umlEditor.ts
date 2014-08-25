// Copyright (c) JBaron.  All rights reserved.
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//

var dagre ;

class UMLEditor extends qx.ui.embed.Html implements Editor {
	 
	 private backgroundColors = ["white", "black" , "grey"];
	 private diagram:any;
	 private static LoadedResources = false;
	 
	 constructor(private session:Cats.Session) {
		 super(null);
		 if (! dagre) dagre = require("dagre");
		 // UMLEditor.LoadResources();
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

   executeCommand(name, ...args):boolean {
         return false;
     }    

    static LoadResources() {
        if (this.LoadedResources) {
            return;
        }
        // IDE.loadCSSFile("js/uml/css/UDStyle.css");
        // IDE.loadJSFile("js/uml/UDCore.js");
        // IDE.loadJSFile("js/uml/UDModules.js");
        this.LoadedResources = true;
    }

    private render(container:HTMLElement) {
            var classes = {};
            var g = new dagre.Digraph();
            
            IDE.project.iSense.getObjectModel((err,model:Object) => {
                var counter = 0;
                Object.keys(model).forEach((className)=>{
                   counter++;
                   if (counter > 100) return; 
                   var c = new UMLClass();
                   c.setName(className);
                   var m:Array<string> = model[className];
                   m.forEach((methodName)=>{
                       c.addOperation(methodName + "()");
                   });
                   
                   g.addNode(className, {width: c.getWidth(), height: c.getHeight()})
                   classes[className] = c;
                });
                
                var layout = dagre.layout().run(g);
                var graph = layout.graph();
                var classDiagram = new UMLClassDiagram({id: container, width: graph.width + 100, height: graph.height + 100});
 
                layout.eachNode((className, value) => {
                    var c = classes[className];
                    c._x = value.x - (c.getWidth() / 2);
                    c._y = value.y - (c.getHeight() / 2);
                    classDiagram.addElement(c);
                });
                
                 //Draw the diagram
                classDiagram.draw();

                //Interaction is possible (editable)
                classDiagram.interaction(true);
                this.diagram = classDiagram;
                
            });
            
            return;
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
    
    getContent():string { return null ;}
    
    setContent(content:string, keepPosition=true) {}
    
    updateWorld() {}
    
    moveToPosition(pos: Ace.Position) {}
 
 
}