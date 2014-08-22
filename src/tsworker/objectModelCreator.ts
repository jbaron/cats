module Cats.TSWorker {


    /**
     * This class implements a AST walker that in the process creates 
     * a object model.
     * 
     */ 
    export class ObjectModelCreator extends TypeScript.PositionTrackingWalker {
    
        classNames = {};
        private lastClass: Array<string>;
    
        constructor() {
            super();
        }
    
        public visitClassDeclaration(node: TypeScript.ClassDeclarationSyntax) {
            var className = node.identifier.text();
            if (!this.classNames[className]) this.classNames[className] = [];
            this.lastClass = this.classNames[className];
            super.visitClassDeclaration(node);
        }
    
        public visitMemberFunctionDeclaration(node: TypeScript.MemberFunctionDeclarationSyntax) {
            var methodName = node.propertyName.text();
            this.lastClass.push(methodName);
            super.visitMemberFunctionDeclaration(node);
        }
    
    }


}
