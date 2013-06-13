var Cats;
(function (Cats) {
    (function (UML) {
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

                this.diagram.interaction(true);
            };
            return DependencyDiagram;
        })();
        UML.DependencyDiagram = DependencyDiagram;
    })(Cats.UML || (Cats.UML = {}));
    var UML = Cats.UML;
})(Cats || (Cats = {}));
