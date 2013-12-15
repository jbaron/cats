//
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

module Cats.UML {


    /**
     * Layout a jsUML diagram using the arbor layout engine
     */
    export class Layout {

        private layoutEngine = arbor.ParticleSystem();
        private iter = 5000;

        constructor(public diagram) {
            this.layoutEngine.screenSize(1900, 1900);
            this.layoutEngine.parameters({ repulsion: 2000, gravity: true });
        }

        
        init() {}

        /**
         * This method is called by arbor after each iteration and used to redraw
         * the diagram
         */ 
        redraw() {            
            this.layoutEngine.eachNode(function(node, pt) {
                var n = node.data.node;
                n.position(pt.x, pt.y);
            });
            this.diagram.draw();
            this.iter--;
            if (this.iter < 0) this.layoutEngine.stop();
        }

        /**
         * Layout the diagram
         */ 
        layout() {
            this.diagram._nodes.forEach((node) => {
                this.layoutEngine.addNode(node.getId(), { node: node });
            });

            this.diagram._relations.forEach((rel) => {
                var a = rel.getElementA();
                var b = rel.getElementB();
                this.layoutEngine.addEdge(a.getId(),b.getId(),{length:3, pointSize:3});
            });
            
            this.layoutEngine.renderer = this;
        }

    }
    
    
    export class DependencyDiagram {
            diagram;
            id=0;         
            dict = {};
            
            constructor(config) {
                this.diagram = new UMLClassDiagram(config);
                this.diagram.setName("Module Dependencies");
            }
            
            private getLabel(name) {
                if (name.lastIndexOf('/') > -1) {
                    return name.substring(name.lastIndexOf('/')+1);
                } else {
                   return name.substring(name.lastIndexOf('\\')+1);
                }
            }
            
            private draw(name) {
              if (this.dict[name]) return this.dict[name];               
               var c = new UMLPackage();
               c.setName(this.getLabel(name));
               c.setId(this.id++);
               c.notifyChange();
               this.diagram.addElement(c);               
               this.dict[name]=c;
               return c;
            }
    
    
           render(){
              
                        
            var deps = window["dependencies"];
            deps.forEach((file) => {
               
               var a = this.draw(file.src);
                                            
               file.ref.forEach((ref) => {
                 var b = this.draw(ref);
                 var depLine = new UMLDependency({a:a,b:b});                
                 this.diagram.addElement(depLine);            
               });
                             
            });
            
          
            var layout = new Layout(this.diagram);
            
            layout.layout();
            
            //Interaction is possible (editable)
            this.diagram.interaction(true);
        }
    }


}



