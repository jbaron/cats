var Cats;
(function (Cats) {
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
    ///<reference path='../../typings/arbor.d.ts'/>
    ///<reference path='../../typings/jsuml2.d.ts'/>
    (function (UML) {
        /**
        * Layout a jsUML diagram using the arbor layout engine
        */
        var Layout = (function () {
            function Layout(diagram) {
                this.diagram = diagram;
                this.layoutEngine = arbor.ParticleSystem();
                this.iter = 5000;
                this.layoutEngine.screenSize(1900, 1900);
                this.layoutEngine.parameters({ repulsion: 2000, gravity: true });
            }
            Layout.prototype.init = function () {
            };

            /**
            * This method is called by arbor after each iteration and used to redraw
            * the diagram
            */
            Layout.prototype.redraw = function () {
                this.layoutEngine.eachNode(function (node, pt) {
                    var n = node.data.node;
                    n.position(pt.x, pt.y);
                });
                this.diagram.draw();
                this.iter--;
                if (this.iter < 0)
                    this.layoutEngine.stop();
            };

            /**
            * Layout the diagram
            */
            Layout.prototype.layout = function () {
                var _this = this;
                this.diagram._nodes.forEach(function (node) {
                    _this.layoutEngine.addNode(node.getId(), { node: node });
                });

                this.diagram._relations.forEach(function (rel) {
                    var a = rel.getElementA();
                    var b = rel.getElementB();
                    _this.layoutEngine.addEdge(a.getId(), b.getId(), { length: 3, pointSize: 3 });
                });

                this.layoutEngine.renderer = this;
            };
            return Layout;
        })();
        UML.Layout = Layout;

        var DependencyDiagram = (function () {
            function DependencyDiagram(config) {
                this.id = 0;
                this.dict = {};
                this.diagram = new UMLClassDiagram(config);
                this.diagram.setName("Module Dependencies");
            }
            DependencyDiagram.prototype.getLabel = function (name) {
                if (name.lastIndexOf('/') > -1) {
                    return name.substring(name.lastIndexOf('/') + 1);
                } else {
                    return name.substring(name.lastIndexOf('\\') + 1);
                }
            };

            DependencyDiagram.prototype.draw = function (name) {
                if (this.dict[name])
                    return this.dict[name];
                var c = new UMLPackage();
                c.setName(this.getLabel(name));
                c.setId(this.id++);
                c.notifyChange();
                this.diagram.addElement(c);
                this.dict[name] = c;
                return c;
            };

            DependencyDiagram.prototype.render = function () {
                var _this = this;
                var deps = window["dependencies"];
                deps.forEach(function (file) {
                    var a = _this.draw(file.src);

                    file.ref.forEach(function (ref) {
                        var b = _this.draw(ref);
                        var depLine = new UMLDependency({ a: a, b: b });
                        _this.diagram.addElement(depLine);
                    });
                });

                var layout = new Layout(this.diagram);
                layout.layout();

                //Interaction is possible (editable)
                this.diagram.interaction(true);
            };
            return DependencyDiagram;
        })();
        UML.DependencyDiagram = DependencyDiagram;
    })(Cats.UML || (Cats.UML = {}));
    var UML = Cats.UML;
})(Cats || (Cats = {}));
