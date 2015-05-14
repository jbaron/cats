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

module Cats.TSWorker {


    /**
     * Creates a class model to be used for displaying as an UML diagram
     * 
     * @TODO Fix this using the new language service API. Right now disabled.
     */
    export class ModelCreator {

        private model:Map<ModelEntry> = {};
        private last: ModelEntry;

        constructor() {

        }


        getModel() {
            var result: Array<ModelEntry> = [];
            Object.keys(this.model).forEach((key) => {
                var entry: ModelEntry = this.model[key];
                result.push(entry);
            });
            return result;
        }


        parse(doc: ts.SourceFile) {
            this.last = null;
            this.handle(doc);
        }

        private handle(node: ts.Declaration) {
            if (!node) return;

            try {
            if (this.isTopLevelNode(node.kind)) {
                this.last = this.createIfNotExist(<any>node);
            }


            if (this.interest(node.kind)) {
                var fullName = node.name;// symbol;
                // var fullName = s ? s.getName() : node.id;
                // console.log(this.interest(node.kind) + ":" + node.name + ":" + fullName) ;
            }

            if (node.kind === ts.SyntaxKind.MethodDeclaration) {
                if (this.last) this.last.operations.push(node.name["text"]);
                return;
            }

            if (node.kind === ts.SyntaxKind.Constructor) {
                if (this.last) this.last.operations.push("constructor");
                return;
            }

            if (node.kind === ts.SyntaxKind.PropertyDeclaration) {
                if (this.last) {
                    var attr: Attribute = {
                        name: node.name["text"],
                        modifiers: [],
                        type: null
                    }

                    if (node["type"]) {
                        var t = node["type"].getText(); // node.symbol.valueDeclaration;
                        attr.type = t;
                    }
                    this.last.attributes.push(attr);
                }
                return;
            }


            var children = node.getChildren();
            if (children) {
                children.forEach((child) => {
                    this.handle(<ts.Declaration>child);
                })
            }

            // this.last = null;
            
            } catch(err) {
                console.log(err.stack);
                return;
            } 
            
        }


        private isTopLevelNode(kind: ts.SyntaxKind) {
            return ((kind === ts.SyntaxKind.ClassDeclaration) ||
                (kind === ts.SyntaxKind.InterfaceDeclaration) ||
                (kind === ts.SyntaxKind.EnumDeclaration)
                );
        }


        /**
         * What type of node are we interested in
         */ 
        private interest(kind: ts.SyntaxKind) {
            switch (kind) {
                case ts.SyntaxKind.ClassDeclaration:
                    return "class";
                case ts.SyntaxKind.ModuleDeclaration:
                    return "container";
                case ts.SyntaxKind.InterfaceDeclaration:
                    return "interface";
                case ts.SyntaxKind.MethodDeclaration:
                    return "method";
                case ts.SyntaxKind.EnumDeclaration:
                    return "enum";
                case ts.SyntaxKind.PropertyDeclaration:
                    return "prop"
                case ts.SyntaxKind.Constructor:
                    return "constructor";
                default:
                    return null;
            }
        }

        private getName(node:ts.TypeReferenceNode) {
            return node.getText();
        }

        private createIfNotExist(node: ts.InterfaceDeclaration|ts.ClassDeclaration): ModelEntry {
            var fullName = node.name.text;
            if (!this.model[fullName]) {
                var entry: ModelEntry = {
                    type: this.interest(node.kind),
                    name: fullName,
                    extends: [],
                    implements: [],
                    operations: [],
                    attributes: []
                };
                this.model[fullName] = entry;
                // var typeSymbol = node.symbol.getDeclarations();

                // if (node instanceof ts.ClassDeclaration) {
                   
                    /*
                    @TODO
                    if (cd.baseType) entry.extends.push(this.getName(cd.baseType));
                    
                    if (cd.implementedTypes) cd.implementedTypes.forEach((implType) => {
                        entry.implements.push(this.getName(implType));
                    });
                    */
                // }
                
                
                // if (node instanceof ts.InterfaceDeclaration) {
                   
                    /*
                    @TODO
                    if (id.baseTypes) id.baseTypes.forEach((type) => {
                        entry.implements.push(this.getName(type));
                    });
                    */
                // }
                
            }
            return this.model[fullName];
        }


        /*
        
        private isMainNode(kind:TypeScript.PullElementKind) {
            return ( (kind === TypeScript.PullElementKind.Class) ||
                 (kind === TypeScript.PullElementKind.Interface) ||
                 (kind === TypeScript.PullElementKind.Enum) 
            );
        }
        
        private createIfNotExist(node:TypeScript.PullDecl): ModelEntry {
            var fullName = node.getSymbol().fullName();
            if (! this.model[fullName]) {
                var entry:ModelEntry = {
                    type: this.interest(node.kind),
                    name: fullName,
                    extends: [],
                    implements : [],
                    operations: [],
                    attributes: []
                };
                this.model[fullName] = entry;
                var typeSymbol = node.getSymbol().type;
                
                typeSymbol.getExtendedTypes().forEach((extType) => {
                    entry.extends.push(extType.fullName());
                    // console.log("Extending: " + extType.fullName());
                });
                
                typeSymbol.getImplementedTypes().forEach((implType) => {
                    entry.implements.push(implType.fullName());
                });
                
            }
            return this.model[fullName];
        }
        
        private handle(node:TypeScript.PullDecl) {
            if (! node) return;
            
           
            if (this.isMainNode(node.kind)) {
                this.last = this.createIfNotExist(node);
            }
            
        
            if (this.interest(node.kind)) {
                var s = node.getSymbol();
                var fullName = s ? s.fullName() : node.name;
                // console.log(this.interest(node.kind) + ":" + node.name + ":" + fullName) ;
            }
            
            if (node.kind === TypeScript.PullElementKind.Method) {
                if (this.last) this.last.operations.push(node.name);
                return;
            }

            if (node.kind === TypeScript.PullElementKind.ConstructorMethod) {
                if (this.last) this.last.operations.push("constructor");
                return;
            }

            if (node.kind === TypeScript.PullElementKind.Property) {
                if (this.last) {
                    var attr:Attribute = {
                        name: node.name,
                        modifiers: [],
                        type: null
                    }
                    
                    if (node.getSymbol()) {
                        var t = node.getSymbol().getTypeName();
                        attr.type = t;
                    }
                    this.last.attributes.push(attr);
                }
                return;
            }
            
            
            var children = node.getChildDecls();
            if (children) {
                children.forEach((child) => {
                    this.handle(child);
                })
            }
            
            this.last = null;
        }
        
        */

    }




}