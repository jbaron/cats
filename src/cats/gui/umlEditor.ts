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
module Cats.Gui {

var dagre ;

export class UMLEditor extends qx.ui.embed.Html implements Editor {
	 
	 private backgroundColors = ["white", "black" , "grey"];
	 private diagram:any;
	 private static Resources1 = [
	    "js/uml/css/UDStyle.css",
        "js/uml/UDCore.js"
	  ];
	 
	 private static Resources2 = [
        "js/uml/UDModules.js" 
	  ];
	  
	 private static ResourcesLoaded = false;
	 
	 constructor(private session:Cats.Session) {
		 super(null);
		 if (! dagre) dagre = require("dagre");
		 this.setOverflow("auto", "auto");
		  this.addListenerOnce("appear", () => {
		     var container:HTMLElement = this.getContentElement().getDomElement();
		     var div = document.createElement("div");
		     div.style.height = "100%";
		     div.style.width = "100%";
		     container.appendChild(div);
		     UMLEditor.LoadResources(() => {
    		        this.render(div);
    		        this.focus();
		      }); 
		  });
	}

   executeCommand(name, ...args):boolean {
         return false;
     }    


    static LoadResources(cb:Function) {
        if (UMLEditor.ResourcesLoaded) {
            cb();
        } else {
            var resourceLoader = new Util.ResourceLoader();
		     resourceLoader.loadResources(UMLEditor.Resources1, () => {
		         resourceLoader.loadResources(UMLEditor.Resources2, () => {
		           UMLEditor.ResourcesLoaded = true;  
    		       cb();
		         }); 
		     });
        }    
    }


    private render(container:HTMLElement) {
            var nodes = {};
            var g = new dagre.Digraph();
            
            IDE.project.iSense.getObjectModel((err, model:Array<Cats.ModelEntry>) => {
                var counter = 0;
                model.forEach((entry)=>{
                   counter++;
                   if (counter > 100) return;
                   var name = entry.name;
                   var c;
                   if (entry.type === "class") c = new UMLClass();
                   if (entry.type === "interface") c = new UMLInterfaceExtended();
                   c.setName(name);
                   
                   entry.operations.forEach((mName)=>{
                       c.addOperation(mName + "()");
                   });
                   
                   entry.attributes.forEach((aName) => {
                       c.addAttribute(aName);
                   });
                   
                   
                   g.addNode(name, {width: c.getWidth(), height: c.getHeight()})
                   nodes[name] = c;
                });
                
                var layout = dagre.layout().run(g);
                var graph = layout.graph();
                var classDiagram = new UMLClassDiagram({id: container, width: graph.width + 100, height: graph.height + 100});
 
                layout.eachNode((name, value) => {
                    var n = nodes[name];
                    n._x = value.x - (n.getWidth() / 2);
                    n._y = value.y - (n.getHeight() / 2);
                    classDiagram.addElement(n);
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
}
