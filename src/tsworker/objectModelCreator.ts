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
     * This class implements a AST walker that in the process creates 
     * a object model.
     * 
     */ 
    export class ObjectModelCreator extends TypeScript.SyntaxWalker /* TypeScript.PositionTrackingWalker */ {
    
        private model = {};
        private last: ModelEntry;
    
        constructor() {
            super();
        }
 
        getModel(): Array<ModelEntry> {
            var result = [];
            Object.keys(this.model).forEach((key) => {
               result.push(this.model[key]); 
            });
            return result;
        }
 
        private createEntry(type:string, name:string): ModelEntry {
            return {
              type:type,
              name:name,
              operations: [],
              attributes: []
            };
            
        }
 
        public visitInterfaceDeclaration(node: TypeScript.InterfaceDeclarationSyntax) {
            var name = node.identifier.text();
            console.log("interface visit start " + name);
            if (!this.model[name]) this.model[name] = this.createEntry("interface", name);
            this.last = this.model[name];
            super.visitInterfaceDeclaration(node);
            console.log("interface visit end " + name);
        }
 
    
        public visitClassDeclaration(node: TypeScript.ClassDeclarationSyntax) {
            var name = node.identifier.text();
            console.log("class visit start " + name);
            if (!this.model[name]) this.model[name] = this.createEntry("class", name);;
            this.last = this.model[name];
            super.visitClassDeclaration(node);
            console.log("class visit end " + name);
        }
    
        public visitMemberFunctionDeclaration(node: TypeScript.MemberFunctionDeclarationSyntax) {
            var name = node.propertyName.text();
            console.log("member function visit start " + name);
            this.last.operations.push(name);
            super.visitMemberFunctionDeclaration(node);
            console.log("member function visit start " + name);
        }
    
        public visitMemberVariableDeclaration(node: TypeScript.MemberVariableDeclarationSyntax) {
            var name = node.variableDeclarator.propertyName.text();
            this.last.attributes.push(name);
            super.visitMemberVariableDeclaration(node);
        }
    
        public visitMethodSignature(node: TypeScript.MethodSignatureSyntax) {
            var name = node.propertyName.text();
            this.last.operations.push(name);
            super.visitMethodSignature(node);
        }
    
    }


}
