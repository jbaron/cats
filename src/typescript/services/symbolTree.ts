// Copyright (c) Microsoft. All rights reserved. Licensed under the Apache License, Version 2.0. 
// See LICENSE.txt in the project root for complete license information.

///<reference path='typescriptServices.ts' />

module Services {
    export interface ISymbolTree {
        //
        // Find all the type symbols (classes and interfaces only) that are accessible
        // through the chain of "implements" or "extends" directive of the given type symbol.
        //
        findBaseTypesTransitiveClosure(sym: TypeScript.TypeSymbol): SymbolSet;

        //
        // Find all the type symbols (classes and interfaces only) that are accessible
        // from the chain of "implements" or "extends" directive of the given type symbol.
        //
        findDerivedTypesTransitiveClosure(sym: TypeScript.TypeSymbol): SymbolSet;

        //
        // Given a type symbol "container" (class or interface) and a member symbol "member",
        // return the member symbol of "container" which can be considered an override of "member".
        //
        getOverride(container: TypeScript.TypeSymbol, memberSym: TypeScript.Symbol): TypeScript.Symbol;

        isClass(sym: TypeScript.Symbol): bool;
        isInterface(sym: TypeScript.Symbol): bool;
        isMethod(sym: TypeScript.Symbol): bool;
        isField(sym: TypeScript.Symbol): bool;
    }

    export interface ISymbolTreeHost {
        getScripts(): TypeScript.Script[];
    }

    export class SymbolTree implements ISymbolTree {
        private _allTypes: TypeScript.Symbol[];

        constructor (public host: ISymbolTreeHost) {
            this._allTypes = null;
        }

        public findBaseTypesTransitiveClosure(sym: TypeScript.TypeSymbol): SymbolSet {
            var closure = new SymbolSet();
            var lastSet = new SymbolSet();
            lastSet.add(sym);
            while (!lastSet.isEmpty()) {
                closure.union(lastSet);

                lastSet = this.findBaseTypes(closure, lastSet);
            }
            return closure;
        }

        public findDerivedTypesTransitiveClosure(sym: TypeScript.TypeSymbol): SymbolSet {
            var closure = new SymbolSet();
            var lastSet = new SymbolSet();
            lastSet.add(sym);
            while (!lastSet.isEmpty()) {
                closure.union(lastSet);

                lastSet = this.findDerivedTypes(closure, lastSet);
            }
            return closure;
        }

        public getOverride(container: TypeScript.TypeSymbol, memberSym: TypeScript.Symbol): TypeScript.Symbol {
            var members: TypeScript.ScopedMembers = null;
            if (this.isClass(container)) {
                members = container.type.instanceType.members;
            } else if (this.isInterface(container)) {
                members = container.type.members;
            }

            if (members == null)
                return null;

            var override: TypeScript.Symbol = members.allMembers.lookup(memberSym.name);
            if (override == null)
                return null;

            if ((this.isMethod(memberSym) === this.isMethod(override)) &&
                (this.isField(memberSym) === this.isField(override))) {
                return override;
            }

            return null;
        }

        public getAllTypes(): TypeScript.Symbol[] {
            if (this._allTypes === null) {
                var result = new SymbolSet();
                this.host.getScripts().forEach(script => {
                    // Collect types (class/interface) in "script"
                    TypeScript.walkAST(script, (path, walker) => {
                        if (path.isNameOfClass() || path.isNameOfInterface()) {
                            var sym = (<TypeScript.Identifier>path.ast()).sym;
                            if (sym != null) {
                                if (sym.kind() === TypeScript.SymbolKind.Type) {
                                    var typeSym = <TypeScript.TypeSymbol>sym;
                                    if (this.isClass(typeSym) || this.isInterface(typeSym)) {
                                        result.add(typeSym);
                                    }
                                }
                            }
                        }

                        // Shortcut visitation to skip function bodies, since they don't
                        // currently contain class/interface definition.
                        if (path.isBodyOfFunction()) {
                            walker.options.goChildren = false;
                        }
                    });
                });
                this._allTypes = result.getAll();
            }
            return this._allTypes;
        }

        public findBaseTypes(closure: SymbolSet, lastSet: SymbolSet): SymbolSet {
            var result = new SymbolSet();
            var symsArray = lastSet.getAll();
            symsArray.forEach(sym => {
                if (sym.kind() === TypeScript.SymbolKind.Type) {
                    var type = (<TypeScript.TypeSymbol>sym).type;
                    if (type !== null) {
                        // List of implements/extends is on the "instanceType" for classes.
                        if (type.instanceType != null)
                            type = type.instanceType;
                        this.addBaseTypes(closure, result, type.implementsList);
                        this.addBaseTypes(closure, result, type.extendsList);
                    }
                }
            });
            return result;
        }

        public findDerivedTypes(alreadyFound: SymbolSet, baseSymbols: SymbolSet): SymbolSet {
            var result = new SymbolSet();
            this.getAllTypes().forEach(candidate => {
                if (!alreadyFound.contains(candidate)) {
                    if (candidate.kind() === TypeScript.SymbolKind.Type) {
                        var type = (<TypeScript.TypeSymbol>candidate).type;
                        if (type !== null) {
                            // List of implements/extends is on the "instanceType" for classes.
                            if (type.instanceType != null)
                                type = type.instanceType;
                            var emptySet = new SymbolSet();
                            var baseTypes = new SymbolSet();
                            this.addBaseTypes(emptySet, baseTypes, type.implementsList);
                            this.addBaseTypes(emptySet, baseTypes, type.extendsList);

                            baseTypes.getAll().forEach(baseType => {
                                if (baseSymbols.contains(baseType)) {
                                    result.add(candidate);
                                }
                            });
                        }
                    }
                }
            });
            return result;
        }

        public addBaseTypes(closure: SymbolSet, syms: SymbolSet, bases: TypeScript.Type[]) {
            if (bases == null)
                return;

            bases.forEach(base => {
                if (base.symbol !== null) {
                    if (!closure.contains(base.symbol)) {
                        if (this.isDefinition(base.symbol)) {
                            syms.add(base.symbol);
                        }
                    }
                }
            });
        }

        private isDefinition(sym: TypeScript.Symbol): bool {
            return this.isClass(sym) || this.isInterface(sym);
        }

        public isClass(sym: TypeScript.Symbol): bool {
            return sym != null &&
                sym.kind() == TypeScript.SymbolKind.Type &&
                (<TypeScript.TypeSymbol>sym).isClass();
        }

        public isInterface(sym: TypeScript.Symbol): bool {
            return sym != null &&
                sym.kind() == TypeScript.SymbolKind.Type &&
                sym.declAST != null &&
                sym.declAST.nodeType === TypeScript.NodeType.Interface;
        }

        public isMethod(sym: TypeScript.Symbol): bool {
            return sym != null &&
                sym.kind() === TypeScript.SymbolKind.Type &&
                (<TypeScript.TypeSymbol>sym).isMethod;
        }

        public isField(sym: TypeScript.Symbol): bool {
            return sym != null &&
                sym.kind() === TypeScript.SymbolKind.Field;
        }
    }
}
