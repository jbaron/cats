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
