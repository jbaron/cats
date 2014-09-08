module Cats.TSWorker {
    
 
    
    
    export class ModelCreator {

        private model = {};
        private last: ModelEntry;

        constructor() {
            
        }


        getModel(): Array<ModelEntry> {
            var result = [];
            Object.keys(this.model).forEach((key) => {
               result.push(this.model[key]); 
            });
            return result;
        }
        
        parse(doc:TypeScript.Document) {
            this.handle(doc.topLevelDecl());
        }
        
        private interest(kind:TypeScript.PullElementKind) {
            switch (kind) {
                case TypeScript.PullElementKind.Class:
                    return "class";
                case TypeScript.PullElementKind.Container:
                    return "container";    
                case TypeScript.PullElementKind.Interface:
                    return "interface";
                case TypeScript.PullElementKind.Method:
                    return "method";
                case TypeScript.PullElementKind.Enum:
                    return "enum";
                case TypeScript.PullElementKind.Property:
                    return "prop"
                case TypeScript.PullElementKind.ConstructorMethod:
                    return "constructor";
                default:
                    return null;
            }
        }
        
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
        
        
        
    }
   
    
    
    
}