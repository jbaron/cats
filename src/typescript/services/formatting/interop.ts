// Copyright (c) Microsoft. All rights reserved. Licensed under the Apache License, Version 2.0. 
// See LICENSE.txt in the project root for complete license information.

///<reference path='formatting.ts' />

module Formatting {
    export class SnapshotSpan {
        private _startPoint: SnapshotPoint;
        private _endPoint: SnapshotPoint;

        constructor (public snapshot: ITextSnapshot, public span: Span) {
            this._startPoint = null;
            this._endPoint = null;
        }

        public start(): SnapshotPoint {
            if (this._startPoint == null)
                this._startPoint = new SnapshotPoint(this.snapshot, this.span.start());
            return this._startPoint;
        }

        public end(): SnapshotPoint {
            if (this._endPoint == null)
                this._endPoint = new SnapshotPoint(this.snapshot, this.span.end());
            return this._endPoint;
        }

        public startPosition(): number {
            return this.span.start();
        }

        public endPosition(): number {
            return this.span.end();
        }

        public GetText(): string {
            return this.snapshot.GetText(this.span);
        }

        public IsEmpty(): bool {
            return this.span.length() === 0;
        }

        public OverlapsWith(spanArg: Span): bool {
            return this.span.OverlapsWith(spanArg);
        }

        public Intersection(simpleSpan: Span): SnapshotSpan/*?*/ {
            var nullable = this.span.Intersection(simpleSpan);
            if (nullable !== null) {
                return new SnapshotSpan(this.snapshot, nullable);
            }
            return null;
        }
    }

    export class SnapshotPoint {
        constructor (public snapshot: ITextSnapshot, public position: number) {
        }
        public GetContainingLine(): ITextSnapshotLine {
            return this.snapshot.GetLineFromPosition(this.position);
        }
        public Add(offset: number): SnapshotPoint {
            return new SnapshotPoint(this.snapshot, this.position + offset);
        }
    }

    export class FileAuthoringProxy {
        constructor (public scriptSyntaxAST: Services.ScriptSyntaxAST) {
        }
        public GetASTCursor(): IAuthorParseNodeCursor {
            return new AuthorParseNodeCursor(this);
        }
    }

    export class AuthorParseNodeCursor implements IAuthorParseNodeCursor {

        private logger: TypeScript.ILogger;
        private path: TypeScript.AstPath;

        constructor (private fileAuthoringProxy: FileAuthoringProxy) {
            this.logger = this.fileAuthoringProxy.scriptSyntaxAST.getLogger();
            this.path = new TypeScript.AstPath();
        }

        //
        // Fixup "newPath" so that is has the expected shape for browsing through the AST 
        // via IAuthorParseNodeCursor
        //
        private fixupPath(newPath: TypeScript.AstPath): TypeScript.AstPath {
            var temp = new TypeScript.AstPath();

            for (var i = 0; i < newPath.count() ; i++) {

                temp.push(newPath.asts[i]);

                if (temp.isBodyOfCase()) {
                    // TypeScript AST is always:
                    //  case
                    //    List
                    //      Statements
                    // JS AST depends on the :
                    //  case
                    //    Block (synthesized)
                    //      List or Single Statement
                    // * The code below takes care of adding the "Block" node
                    // * The "mapAstNode" code takes care of filtering out the "List" node if needed
                    var fakeBlock = this.mapBodyOfCase(<TypeScript.ASTList>temp.ast());
                    var previousBody = temp.pop();
                    temp.push(fakeBlock);
                    temp.push(previousBody);
                }

            }

            return temp;
        }

        private mapNodeType(path: TypeScript.AstPath): AuthorParseNodeKind {
            var nodeType = path.ast().nodeType;

            var mapList = () => {
                if (path.isBodyOfScript() ||
                    path.isBodyOfModule() ||
                    path.isBodyOfClass() ||
                    path.isBodyOfInterface() ||
                    path.isBodyOfFor() ||
                    path.isBodyOfForIn() ||
                    path.isBodyOfWhile() ||
                    path.isBodyOfDoWhile() ||
                    path.isBodyOfTry() ||
                    path.isBodyOfCatch() ||
                    path.isBodyOfFinally() ||
                    //path.isBodyOfDefaultCase() ||
                    //path.isBodyOfCase() ||
                    path.isBodyOfFunction() ||
                    path.isBodyOfWith() ||
                    path.isBodyOfSwitch() ||
                    false) {
                    return AuthorParseNodeKind.apnkBlock;
                }
                else {
                    return AuthorParseNodeKind.apnkList;
                }
            }

            switch (nodeType) {
                case TypeScript.NodeType.None: return AuthorParseNodeKind.apnkEmptyNode; //TODO
                case TypeScript.NodeType.Empty: return AuthorParseNodeKind.apnkEmpty; //TODO
                case TypeScript.NodeType.EmptyExpr: return AuthorParseNodeKind.apnkEmptyNode;//TODO
                case TypeScript.NodeType.True: return AuthorParseNodeKind.apnkTrue;
                case TypeScript.NodeType.False: return AuthorParseNodeKind.apnkFalse;
                case TypeScript.NodeType.This: return AuthorParseNodeKind.apnkThis;
                case TypeScript.NodeType.Super: return AuthorParseNodeKind.apnkThis;//TODO
                case TypeScript.NodeType.QString: return AuthorParseNodeKind.apnkStr;
                case TypeScript.NodeType.Regex: return AuthorParseNodeKind.apnkRegExp;
                case TypeScript.NodeType.Null: return AuthorParseNodeKind.apnkNull;
                case TypeScript.NodeType.ArrayLit: return AuthorParseNodeKind.apnkArray;
                case TypeScript.NodeType.ObjectLit: return AuthorParseNodeKind.apnkObject;
                case TypeScript.NodeType.Void: return AuthorParseNodeKind.apnkNull; //TODO
                case TypeScript.NodeType.Comma: return AuthorParseNodeKind.apnkComma;
                case TypeScript.NodeType.Pos: return AuthorParseNodeKind.apnkPos;
                case TypeScript.NodeType.Neg: return AuthorParseNodeKind.apnkNeg;
                case TypeScript.NodeType.Delete: return AuthorParseNodeKind.apnkDelete;
                case TypeScript.NodeType.Await: return AuthorParseNodeKind.apnkEmpty; //TODO
                case TypeScript.NodeType.In: return AuthorParseNodeKind.apnkIn;
                case TypeScript.NodeType.Dot: return AuthorParseNodeKind.apnkDot;
                case TypeScript.NodeType.From: return AuthorParseNodeKind.apnkEmpty; //TODO
                case TypeScript.NodeType.Is: return AuthorParseNodeKind.apnkEmpty;//TODO
                case TypeScript.NodeType.InstOf: return AuthorParseNodeKind.apnkInstOf;
                case TypeScript.NodeType.Typeof: return AuthorParseNodeKind.apnkTypeof;
                case TypeScript.NodeType.NumberLit: return AuthorParseNodeKind.apnkInt;
                case TypeScript.NodeType.Name: return AuthorParseNodeKind.apnkName;
                case TypeScript.NodeType.TypeRef: return AuthorParseNodeKind.apnkEmpty; //TODO
                case TypeScript.NodeType.Index: return AuthorParseNodeKind.apnkIndex;
                case TypeScript.NodeType.Call: return AuthorParseNodeKind.apnkCall;
                case TypeScript.NodeType.New: return AuthorParseNodeKind.apnkNew;
                case TypeScript.NodeType.Asg: return AuthorParseNodeKind.apnkAsg;
                case TypeScript.NodeType.AsgAdd: return AuthorParseNodeKind.apnkAsgAdd;
                case TypeScript.NodeType.AsgSub: return AuthorParseNodeKind.apnkAsgDiv;
                case TypeScript.NodeType.AsgDiv: return AuthorParseNodeKind.apnkAsgMul;
                case TypeScript.NodeType.AsgMul: return AuthorParseNodeKind.apnkAsgMul;
                case TypeScript.NodeType.AsgMod: return AuthorParseNodeKind.apnkAsgMod;
                case TypeScript.NodeType.AsgAnd: return AuthorParseNodeKind.apnkAsgAnd;
                case TypeScript.NodeType.AsgXor: return AuthorParseNodeKind.apnkAsgXor;
                case TypeScript.NodeType.AsgOr: return AuthorParseNodeKind.apnkAsgOr;
                case TypeScript.NodeType.AsgLsh: return AuthorParseNodeKind.apnkAsgLsh;
                case TypeScript.NodeType.AsgRsh: return AuthorParseNodeKind.apnkAsgRsh;
                case TypeScript.NodeType.AsgRs2: return AuthorParseNodeKind.apnkAsgRs2;
                case TypeScript.NodeType.QMark: return AuthorParseNodeKind.apnkQmark;
                case TypeScript.NodeType.LogOr: return AuthorParseNodeKind.apnkLogOr;
                case TypeScript.NodeType.LogAnd: return AuthorParseNodeKind.apnkLogAnd;
                case TypeScript.NodeType.Or: return AuthorParseNodeKind.apnkOr;
                case TypeScript.NodeType.Xor: return AuthorParseNodeKind.apnkXor;
                case TypeScript.NodeType.And: return AuthorParseNodeKind.apnkAnd;
                case TypeScript.NodeType.Eq: return AuthorParseNodeKind.apnkEq;
                case TypeScript.NodeType.Ne: return AuthorParseNodeKind.apnkNe;
                case TypeScript.NodeType.Eqv: return AuthorParseNodeKind.apnkEqv;
                case TypeScript.NodeType.NEqv: return AuthorParseNodeKind.apnkNEqv;
                case TypeScript.NodeType.Lt: return AuthorParseNodeKind.apnkLt;
                case TypeScript.NodeType.Le: return AuthorParseNodeKind.apnkLe;
                case TypeScript.NodeType.Gt: return AuthorParseNodeKind.apnkGt;
                case TypeScript.NodeType.Ge: return AuthorParseNodeKind.apnkGe;
                case TypeScript.NodeType.Add: return AuthorParseNodeKind.apnkAdd;
                case TypeScript.NodeType.Sub: return AuthorParseNodeKind.apnkSub;
                case TypeScript.NodeType.Mul: return AuthorParseNodeKind.apnkMul;
                case TypeScript.NodeType.Div: return AuthorParseNodeKind.apnkDiv;
                case TypeScript.NodeType.Mod: return AuthorParseNodeKind.apnkMod;
                case TypeScript.NodeType.Lsh: return AuthorParseNodeKind.apnkLsh;
                case TypeScript.NodeType.Rsh: return AuthorParseNodeKind.apnkRsh;
                case TypeScript.NodeType.Rs2: return AuthorParseNodeKind.apnkRs2;
                case TypeScript.NodeType.Not: return AuthorParseNodeKind.apnkNot;
                case TypeScript.NodeType.LogNot: return AuthorParseNodeKind.apnkLogNot;
                case TypeScript.NodeType.IncPre: return AuthorParseNodeKind.apnkIncPre;
                case TypeScript.NodeType.DecPre: return AuthorParseNodeKind.apnkDecPre;
                case TypeScript.NodeType.IncPost: return AuthorParseNodeKind.apnkIncPost;
                case TypeScript.NodeType.DecPost: return AuthorParseNodeKind.apnkDecPost;
                case TypeScript.NodeType.TypeAssertion: return AuthorParseNodeKind.apnkEmpty; //TODO
                case TypeScript.NodeType.FuncDecl: return AuthorParseNodeKind.apnkFncDecl;
                case TypeScript.NodeType.Member: return AuthorParseNodeKind.apnkMember;
                case TypeScript.NodeType.VarDecl: return AuthorParseNodeKind.apnkVarDecl;
                case TypeScript.NodeType.ArgDecl: return AuthorParseNodeKind.apnkVarDecl;
                case TypeScript.NodeType.Return: return AuthorParseNodeKind.apnkReturn;
                case TypeScript.NodeType.Break: return AuthorParseNodeKind.apnkBreak;
                case TypeScript.NodeType.Continue: return AuthorParseNodeKind.apnkContinue;
                case TypeScript.NodeType.Throw: return AuthorParseNodeKind.apnkThrow;
                case TypeScript.NodeType.For: return AuthorParseNodeKind.apnkFor;
                case TypeScript.NodeType.ForIn: return AuthorParseNodeKind.apnkForIn;
                case TypeScript.NodeType.If: return AuthorParseNodeKind.apnkIf;
                case TypeScript.NodeType.While: return AuthorParseNodeKind.apnkWhile;
                case TypeScript.NodeType.DoWhile: return AuthorParseNodeKind.apnkDoWhile;
                case TypeScript.NodeType.Block: return AuthorParseNodeKind.apnkBlock;
                case TypeScript.NodeType.Case: return AuthorParseNodeKind.apnkCase;
                case TypeScript.NodeType.Switch: return AuthorParseNodeKind.apnkSwitch;
                case TypeScript.NodeType.Try: return AuthorParseNodeKind.apnkTry;
                case TypeScript.NodeType.TryCatch: return AuthorParseNodeKind.apnkTryCatch;
                case TypeScript.NodeType.TryFinally: return AuthorParseNodeKind.apnkTryFinally;
                case TypeScript.NodeType.Finally: return AuthorParseNodeKind.apnkFinally;
                case TypeScript.NodeType.Catch: return AuthorParseNodeKind.apnkCatch;
                case TypeScript.NodeType.List: return mapList();
                case TypeScript.NodeType.Script: return AuthorParseNodeKind.apnkProg;
                case TypeScript.NodeType.Class: return AuthorParseNodeKind.apnkEmpty; //Note: We handle this directly in formatting code
                case TypeScript.NodeType.Interface: return AuthorParseNodeKind.apnkEmpty; //Note: We handle this directly in formatting code
                case TypeScript.NodeType.Module: return AuthorParseNodeKind.apnkEmpty; //Note: We handle this directly in formatting code
                case TypeScript.NodeType.Import: return AuthorParseNodeKind.apnkEmpty; //Note: We handle this directly in formatting code
                case TypeScript.NodeType.With: return AuthorParseNodeKind.apnkWith;
                case TypeScript.NodeType.Label: return AuthorParseNodeKind.apnkLabel;
                case TypeScript.NodeType.LabeledStatement: return AuthorParseNodeKind.apnkLabel; //TODO
                case TypeScript.NodeType.EBStart: return AuthorParseNodeKind.apnkEmpty; //TODO
                case TypeScript.NodeType.GotoEB: return AuthorParseNodeKind.apnkEmpty; //TODO
                case TypeScript.NodeType.EndCode: return AuthorParseNodeKind.apnkEndCode;
                case TypeScript.NodeType.Error: return AuthorParseNodeKind.apnkEmpty; //TODO
                case TypeScript.NodeType.Comment: return AuthorParseNodeKind.apnkEmpty; //TODO
                default:
                    throw new Error("Invalid node kind: " + nodeType);
            }
        }

        private mapNodeFlags(path: TypeScript.AstPath) {
            var result = AuthorParseNodeFlags.apnfNone;
            if (path.isSynthesizedBlock()) {
                result = result | AuthorParseNodeFlags.apnfSyntheticNode;
            }
            return result;
        }

        private getDetails(path: TypeScript.AstPath): AuthorParseNodeDetails {
            var ast = path.ast();
            var result = new AuthorParseNodeDetails();
            if (path.isListOfObjectLit()) {
                // Because of the peculiarities of the formatting engnine, 
                // we want the list to *not* have the same span as the object literal AST.
                Formatting.Debug.Assert(path.parent().minChar == path.ast().minChar, "Assumption about AST minChar position is not verified");
                Formatting.Debug.Assert(path.parent().limChar == path.ast().limChar, "Assumption about AST limChar position is not verified");
                result.StartOffset = ast.minChar + 1;
                result.EndOffset = ast.limChar - 1;
            }
            else {
                result.StartOffset = ast.minChar;
                result.EndOffset = ast.limChar;
            }
            result.Flags = this.mapNodeFlags(path);
            result.Kind = this.mapNodeType(path);
            result.nodeType = ast.nodeType;
            result.ast = ast;
            return result;
        }

        private getEdgeLabel(path: TypeScript.AstPath): AuthorParseNodeEdge {

            // Node is the statement of a body of a container statement
            // Applicable for:
            //TypeScript:           NodeType.module
            //TypeScript:           NodeType.class
            //TypeScript:           NodeType.interface
            //                  apnkProg
            //                  apnkFncDecl
            //                  apnkFor
            //                  apnkForIn
            //                  apnkWhile
            //                  apnkDoWhile
            //                  apnkWith
            //                  apnkCase
            //                  apnkDefaultCase
            //                  apnkTry
            //                  apnkCatch
            //                  apnkFinally
            if (path.isBodyOfScript() ||
                path.isBodyOfModule() ||
                path.isBodyOfClass() ||
                path.isBodyOfInterface() ||
                path.isBodyOfFunction() ||
                path.isBodyOfFor() ||
                path.isBodyOfForIn() ||
                path.isBodyOfWhile() ||
                path.isBodyOfDoWhile() ||
                path.isBodyOfWith() ||
                path.isBodyOfSwitch() || //Note: Should not happen due to filtering
                this.isBodyOfCase(path) ||//path.isBodyOfCase() || //Note: Special case due to our AST rewriting
                path.isBodyOfTry() ||
                path.isBodyOfCatch() ||
                path.isBodyOfFinally()) {
                return AuthorParseNodeEdge.apneBody;
            }

            if (path.isThenOfIf()) {
                return AuthorParseNodeEdge.apneThen;
            }

            if (path.isElseOfIf()) {
                return AuthorParseNodeEdge.apneElse;
            }

            if (path.isBodyOfBlock() ||
                this.isBodyOfBlock(path)) { //Note: special case for single statement list inside blocks
                return AuthorParseNodeEdge.apneBlockBody;
            }

            if (path.isDefaultCaseOfSwitch()) {
                return AuthorParseNodeEdge.apneDefaultCase;
            }

            if (path.isCaseOfSwitch()) {
                return AuthorParseNodeEdge.apneCase;
            }

            // Node is a list of member of an object or an enum
            // Applicable for:
            //                  apnkEnum
            //                  apnkStruct
            //                  apnkObject
            if (path.isListOfObjectLit()) {
                return AuthorParseNodeEdge.apneMembers;
            }

            // Node is a member of an array
            // Applicable for:
            //                  apnkArray
            if (path.isListOfArrayLit()) {
                return AuthorParseNodeEdge.apneElements;
            }

            // Node is a member in an object
            // Applicable for:
            //                  apnkMember
            if (path.isMemberOfMember()) {
                return AuthorParseNodeEdge.apneMember;
            }

            // Node is a target of a call statement 
            // Applicable for:
            //                  apnkCall
            //                  apnkNew
            //                  apnkMember
            if (path.isTargetOfMember()) {
                return AuthorParseNodeEdge.apneTarget;
            }

            // Node is an argument in a function declaration node (formal)
            // Applicable for:
            //                  apnkFncDecl
            if (path.isArgumentOfFunction()) {
                return AuthorParseNodeEdge.apneArgument;
            }

            // Node is a member in a list of statements
            // Applicable for:
            //                  apnkList
            if (path.isItemOfList()) {
                return AuthorParseNodeEdge.apneListItem;
            }

            return AuthorParseNodeEdge.apneNone;
        }

        private getEmptyNodeDetails(): AuthorParseNodeDetails {
            var result = new AuthorParseNodeDetails();
            result.StartOffset = 0;
            result.EndOffset = 0;
            result.Flags = AuthorParseNodeFlags.apnfNone;
            result.Kind = AuthorParseNodeKind.apnkEmptyNode;
            result.nodeType = TypeScript.NodeType.Empty;
            result.ast = null;
            return result;
        }

        private getAstPath(position: number, options = TypeScript.GetAstPathOptions.Default): TypeScript.AstPath {
            var path = this.fileAuthoringProxy.scriptSyntaxAST.getAstPathToPosition(position, options);
            while (path.count() >= 1 && this.skipNode(path)) {
                path.up();
            }
            return path;
        }

        private moveToParent(path: TypeScript.AstPath) {
            while (path.count() >= 1) {
                path.up();
                if (!this.skipNode(path))
                    break;
            }
        }

        private getAuthorParseNodeDetails(path: TypeScript.AstPath) {
            if (path.count() === 0) {
                return this.getEmptyNodeDetails();
            }
            else {
                return this.getDetails(path);
            }
        }

        // Get the node the cursor is pointing at. If the current node does not exist an empty node (kind: apnkEmptyNode) 
        // is returned. Initial value is the root of the tree.
        public Current(): AuthorParseNodeDetails {
            return this.getAuthorParseNodeDetails(this.path);
        }

        // Get the parent of the current node the cursor is pointing at. If the parent node does not exist an empty node (kind: apnkEmptyNode) 
        // is returned.
        public Parent(): AuthorParseNodeDetails {
            var temp = this.path.clone();
            this.moveToParent(temp);
            return this.getAuthorParseNodeDetails(temp);
        }

        // Get the one of the children of the current node without moving the cursor. The child is selected based on the label 
        // defined by edgeLabel. If the current node does not support the specific edge label the call will fail with E_INVALIDARG.
        // Use index to select which child to use in case of list nodes. The value of index is ignored for all other node
        // types.
        // If the child specified by edgeLabel does not exist (e.g. else for an if statement), an empty node (kind: apnkEmptyNode)
        // will be returned. 
        // In order to invoke any of the cursor methods on the child node, the cursor needs to be moved to the child node first.
        // Use this method to investigate the basic properties of a child node without moving the cursor.
        //AuthorParseNodeDetails Child(AuthorParseNodeEdge edgeLabel, int index);

        // Move the cursor to one of the children of the current node. The child is selected based on the label defined 
        // by edgeLabel. If the current node does not support the specific edge label the call will fail with E_INVALIDARG.
        // Use index to select which child to use in case of list nodes. The value of index is ignored for all other node
        // types.
        // If the child specified by edgeLabel does not exist (e.g. else for an if statement), the cursor will be moved to 
        // point to an empty node (kind: apnkEmptyNode); use MoveUp to revert the cursor to the parent node.
        public MoveToChild(edgeLabel: AuthorParseNodeEdge, index: number): AuthorParseNodeDetails {
            var pushIfNotNull = (node) => {
                if (node != null) {
                    this.path.push(node);
                    return this.getAuthorParseNodeDetails(this.path);
                }
                else {
                    return this.getEmptyNodeDetails();
                }
            }

            if (this.path.count() >= 1) {
                var ast = this.path.ast();
                switch (ast.nodeType) {
                    case TypeScript.NodeType.ArrayLit: {
                        switch (edgeLabel) {
                            case AuthorParseNodeEdge.apneElements:
                                return pushIfNotNull((<TypeScript.UnaryExpression>ast).operand);
                        }
                    }
                        break;
                }
            }

            var empty = new TypeScript.AST(TypeScript.NodeType.Empty);
            this.path.push(empty);
            return this.getAuthorParseNodeDetails(this.path);
        }

        // Move the cursor to the parent of the current node. If the current node is the root, NULL is returned
        public MoveUp(): AuthorParseNodeDetails {
            this.moveToParent(this.path);
            return this.getAuthorParseNodeDetails(this.path);
        }

        // Move the cursor to the inner most node with range containing offset. Set excludeEndOffset to true to exclude nodes
        // that end at offset from the search.
        public SeekToOffset(offset: number, excludeEndOffset: bool /*= false*/): AuthorParseNodeDetails {
            var newPath = this.getAstPath(offset, excludeEndOffset ? TypeScript.GetAstPathOptions.Default : TypeScript.GetAstPathOptions.EdgeInclusive);
            this.path = this.fixupPath(newPath);
            if (this.path.count() == 0)
                return null;
            return this.getDetails(this.path);
        }


        // Moves the cursor to the closest node that encloses the range defined by startOffset and endOffset. startOffset 
        // is expected to be less than or equal to endOffset; if not the call will fail. 
        // Set excludeEndOffset to true to exclude nodes that end at either startOffset and endOffset from the search.
        public MoveToEnclosingNode(startOffset: number, endOffset: number): AuthorParseNodeDetails {
            if (startOffset > endOffset)
                throw new Error("Invalid offsets");

            var start = this.getAstPath(startOffset);
            var end = this.getAstPath(endOffset - 1); //TODO: Shouldn't need "-1"
            if (start.count() == 0 || end.count() == 0)
                throw new Error("No nodes enclosing span");

            var startIndex = 0;
            var endIndex = 0;
            while (startIndex < start.count() && endIndex < end.count()) {
                if (start.get(startIndex) !== end.get(endIndex)) {
                    break;
                }
                startIndex++;
                endIndex++;
            }

            start.top = startIndex - 1;
            while (this.skipNode(start))
                start.up();

            this.path = this.fixupPath(start);
            return this.getDetails(this.path);
        }

        private skipNode(path: TypeScript.AstPath) {
            // We don't want to return the ASTList ast to match the behavior for the JS AST.
            return path.isBodyOfSwitch() ||
                path.isTopLevelImplicitModule() ||
                path.isBodyOfTopLevelImplicitModule() ||
                (path.isBodyOfBlock() && path.isSingleStatementList()) ||
                (path.isBodyOfCase() && path.isSingleStatementList()) ||
                (path.isArgumentListOfFunction());
        }

        private mapAstNode(path: TypeScript.AstPath, depth: number): AuthorParseNode {
            if (!TypeScript.isValidAstNode(path.ast()))
                return null;

            // We won't want to return the ASTList ast to match the behavior for the JS AST.
            if (this.skipNode(path))
                return null;

            var result = new AuthorParseNode();
            result.Details = this.getDetails(path);
            result.Level = depth;
            result.Label = 0; // TODO
            result.Name = 0; //TODO
            result.EdgeLabel = this.getEdgeLabel(path);
            return result;
        }

        private isBodyOfBlock(path: TypeScript.AstPath): bool {
            var result = false;
            if (path.count() >= 2) {

                // A multi statement list which is the body of a case
                if (path.ast().nodeType == TypeScript.NodeType.List && !path.isSingleStatementList() && path.isBodyOfCase())
                    result = true;

                // The statement of a single statement list which is the body of a case
                path.up();
                if (path.ast().nodeType == TypeScript.NodeType.List && path.isSingleStatementList() && path.isBodyOfCase()) {
                    result = true;
                }
                path.down();
            }
            return result;
        }

        private isBodyOfCase(path: TypeScript.AstPath): bool {
            var asts = path.asts;
            var top = path.top;
            return path.count() >= 2 &&
                asts[top - 1].nodeType === TypeScript.NodeType.Case &&
                asts[top - 0].nodeType === TypeScript.NodeType.Block &&
                (<TypeScript.CaseStatement>asts[top - 1]).body == (<TypeScript.Block>asts[top - 0]).stmts;
        }

        private mapBodyOfCase(body: TypeScript.ASTList) {
            var fakeBlock = new TypeScript.Block(body, /*visible*/false);
            fakeBlock.minChar = body.minChar;
            fakeBlock.limChar = body.limChar;
            return fakeBlock;
        }

        // Serialize the sub tree rooted at the current node into a list.
        // The list will always begin with the current node. Each node will be followed by its children. Use Level field 
        // in IAuthorParesNode struct to identify children of a node. Each node pears an edge label that defines its 
        // relationship to the parent. Only edges with nonempty nodes will be serialized (e.g. if without an else will only 
        // have two child nodes: condition and then). 
        // Use depth to control what portion of the tree will be serialized; depth = 0 will return the current node only, 
        // depth = 1 will return the current node and its children and so on. If depth < 0 all the nodes in the tree will be 
        // serialized.
        public GetSubTree(depth: number): IAuthorParseNodeSet {
            if (this.path.count() == 0) {
                return new AuthorParseNodeSet([]);
            }

            var context = {
                path: new TypeScript.AstPath(),
                nodes: <AuthorParseNode[]>[],
                curDepth: 0,
                curDepths: <number[]>[]
            };

            var pre = (cur: TypeScript.AST, parent: TypeScript.AST, walker: TypeScript.IAstWalker): TypeScript.AST => {
                context.curDepths.push(context.curDepth);
                context.path.push(cur);

                if (context.path.isBodyOfCase()) {
                    var fakeBlock = this.mapBodyOfCase(<TypeScript.ASTList>cur);
                    var previousBody = context.path.pop();
                    context.path.push(fakeBlock);
                    context.nodes.push(this.mapAstNode(context.path, context.curDepth));
                    context.curDepth++;
                    context.path.pop();
                    context.path.push(previousBody);
                }

                var node = this.mapAstNode(context.path, context.curDepth);
                if (node !== null) {
                    context.nodes.push(node);
                    context.curDepth++;
                }

                // Decide if we want to keep going through children
                walker.options.goChildren = (depth < 0 || context.curDepth <= depth)
                return cur;
            }

            var post = (cur: TypeScript.AST, parent: TypeScript.AST, walker: TypeScript.IAstWalker): TypeScript.AST => {
                context.curDepth = context.curDepths.pop();
                context.path.pop();
                return cur;
            }

            TypeScript.getAstWalkerFactory().walk(this.path.ast(), pre, post);

            //if (this.logger.information()) {
            //    this.logger.log("getSubTree(" + depth + ") - beofre sort")
            //    for (var i = 0; i < nodes.length; i++) {
            //        var authorNode = nodes[i];

            //        var text = authorNode.Level + ": " +
            //        (<any>AuthorParseNodeKind)._map[authorNode.Details.Kind] +
            //        " - " + (<any>Tools.NodeType)._map[authorNode.Details.nodeType] +
            //        "(" + (<any>AuthorParseNodeEdge)._map[authorNode.EdgeLabel] + ")" +
            //        "(" + authorNode.Details.StartOffset + "," + authorNode.Details.EndOffset + ")" +
            //        " -- F:(" + authorNode.Details.Flags + ")";

            //        this.logger.log(text);
            //    }
            //}

            //nodes.sort((a: AuthorParseNode, b: AuthorParseNode): number => {
            //    // Increasing offset
            //    var result = (a.Details.StartOffset - b.Details.StartOffset);
            //    if (result === 0) {
            //        // Decreasing length
            //        var l1 = a.Details.EndOffset - a.Details.StartOffset;
            //        var l2 = b.Details.EndOffset - b.Details.StartOffset;
            //        result = (l2 - l1);
            //    }
            //    return result;
            //});

            if (this.logger.information()) {
                this.logger.log("getSubTree(" + depth + ")")
                for (var i = 0; i < context.nodes.length; i++) {
                    var authorNode = context.nodes[i];

                    var text = authorNode.Level + ": " +
                    (<any>AuthorParseNodeKind)._map[authorNode.Details.Kind] +
                    " - " + (<any>TypeScript.NodeType)._map[authorNode.Details.nodeType] +
                    "(" + (<any>AuthorParseNodeEdge)._map[authorNode.EdgeLabel] + ")" +
                    "(" + authorNode.Details.StartOffset + "," + authorNode.Details.EndOffset + ")" +
                    " -- F:(" + authorNode.Details.Flags + ")";

                    this.logger.log(text);
                }
            }
            return new AuthorParseNodeSet(context.nodes);
        }

        // Get the value of a property on the current node. If the property value is not supported on the current node, 0 is 
        // returned.
        public GetNodeProperty(nodeProperty: AuthorParseNodeProperty): number {
            if (this.path.count() == 0)
                return 0;

            var authorNode = this.mapAstNode(this.path, 0);
            if (authorNode.Details.ast === null)
                return 0;

            switch (authorNode.Details.ast.nodeType) {
                case TypeScript.NodeType.FuncDecl: {
                    var funcDecl = (<TypeScript.FuncDecl>authorNode.Details.ast);
                    var bod = funcDecl.bod;
                    switch (nodeProperty) {
                        case AuthorParseNodeProperty.apnpFunctionKeywordMin:
                            return funcDecl.minChar; // TODO: Is this really the "function" keyword?

                        case AuthorParseNodeProperty.apnpLCurlyMin:
                            if (bod !== null) {
                                return bod.minChar;
                            }
                            else {
                                return 0;
                            }

                        case AuthorParseNodeProperty.apnpRCurlyMin:
                            if (bod !== null) {
                                return bod.limChar - 1; // need to return *starting* position of curly
                            }
                            else {
                                return 0;
                            }

                        case AuthorParseNodeProperty.apnpRParenMin:
                            if (funcDecl.args != null) {
                                return funcDecl.args.limChar - 1; // need to return *starting* position of curly
                            }
                    }
                }
                    break;

                case TypeScript.NodeType.Class: {
                    var classDecl = <TypeScript.ClassDecl>authorNode.Details.ast;
                    var bod = <TypeScript.ASTList>classDecl.members;
                    switch (nodeProperty) {
                        case AuthorParseNodeProperty.apnpLCurlyMin:
                            if (bod !== null) {
                                return bod.minChar;
                            }
                            else {
                                return 0;
                            }

                        case AuthorParseNodeProperty.apnpRCurlyMin:
                            if (bod !== null) {
                                return bod.limChar - 1; // need to return *starting* position of curly
                            }
                            else {
                                return 0;
                            }
                    }
                }
                    break;

            }

            if (this.logger.warning()) {
                this.logger.log("NYI:GetNodeProperty " +
                    "(nodeType=" + (<any>TypeScript.NodeType)._map[authorNode.Details.ast.nodeType] + ", " +
                    "propperty= " + (<any>AuthorParseNodeProperty)._map[nodeProperty] + ")");
            }
            return 0;
        }

        // Get property string using an id. GetSubTree call will serialize names and string literals as id's. Use this method
        // to retrieve the actual text. Call will fail if the id is invalid.
        //[return: MarshalAs(UnmanagedType.BStr)]
        //string GetPropertyById(int propertyId);

        // Get the string value associated with the current node. This call is applicable to string literal nodes and name
        // nodes; calling this method on other node types will fail.
        //[return: MarshalAs(UnmanagedType.BStr)]
        //string GetStringValue();

        // Get the value of the current integer literal. If the current node is not a integer literal the call will fail.
        //int GetIntValue();

        // Get the value of the current float literal. If the current node is not a float literal the call will fail.
        //double GetFloatValue();

        // Get the value of the current regular expression node. If the current node is not a RegExp the call will fail.
        //[return: MarshalAs(UnmanagedType.BStr)]
        //void GetRegExpValue(out string result, out AuthorRegExpOptions options);

        // Get the label text associated with the current statement. If the current statement does not have a label or 
        // current node is not a statement null is returned.
        //[return: MarshalAs(UnmanagedType.BStr)]
        //string GetStatementLabel();

        // Gets the string value of labels of jump statements. Statements that support this call are Break and Continue.
        // If the current jump node does not have a target label null is returned.
        //[return: MarshalAs(UnmanagedType.BStr)]
        //string GetTargetLabel();

        // Get the span of the current node. The statement span is the start and end offsets of a statement as the debugger would
        // show them (e.g. statement span of if statement is the if keyword and the condition, similarlly that of a do while loop is
        // the while keyword and condition.
        //void GetStatementSpan(out int startOffset, out int endOffset);

        // Checks if the offset lies within a comment regardless of the cursor location.
        //[return: MarshalAs(UnmanagedType.VariantBool)]
        //bool OffsetInComment(int offset);

        // Gets the edge label of the current node with respect to its parent.
        public GetEdgeLabel(): AuthorParseNodeEdge {
            return this.mapAstNode(this.path, 0).EdgeLabel;
        }
    }

    export interface ITextSnapshot {
        GetText(span: Span): string;
        GetLineNumberFromPosition(position: number): number;
        GetLineFromPosition(position: number): ITextSnapshotLine;
        GetLineFromLineNumber(lineNumber: number): ITextSnapshotLine;
    }

    export class TextSnapshot implements ITextSnapshot {

        private lines: TextSnapshotLine[];

        constructor (private script: TypeScript.Script, private sourceText: TypeScript.ISourceText) {
            this.lines = [];
        }

        public GetText(span: Span): string {
            return this.sourceText.getText(span.start(), span.end());
        }

        public GetLineNumberFromPosition(position: number): number {
            var lineNumber = TypeScript.getLineNumberFromPosition(this.script.locationInfo.lineMap, position);
            return lineNumber - 1;   // We want to be 0-based.
        }

        public GetLineFromPosition(position: number): ITextSnapshotLine {
            var lineNumber = this.GetLineNumberFromPosition(position);
            return this.GetLineFromLineNumber(lineNumber);
        }

        public GetLineFromLineNumber(lineNumber: number): ITextSnapshotLine {
            var line = this.lines[lineNumber];
            if (line === undefined) {
                line = <TextSnapshotLine>this.GetLineFromLineNumberWorker(lineNumber);
                this.lines[lineNumber] = line;
            }
            return line;
        }

        private GetLineFromLineNumberWorker(lineNumber: number): ITextSnapshotLine {
            var lineMap = this.script.locationInfo.lineMap;
            var lineMapIndex = lineNumber + 1; //Note: lineMap is 1-based
            if (lineMapIndex < 1 || lineMapIndex >= lineMap.length)
                throw new Error("invalid line number (" + lineMapIndex + ")");
            var start = lineMap[lineMapIndex];

            var end: number;
            var endIncludingLineBreak: number;
            var lineBreak = "";
            if (lineMapIndex == lineMap.length) {
                end = endIncludingLineBreak = this.sourceText.getLength();
            }
            else {
                endIncludingLineBreak = (lineMapIndex >= lineMap.length - 1 ? this.sourceText.getLength() : this.script.locationInfo.lineMap[lineMapIndex + 1]);
                for (var p = endIncludingLineBreak - 1; p >= start; p--) {
                    var c = this.sourceText.getText(p, p + 1);
                    //TODO: Other ones?
                    if (c != "\r" && c != "\n") {
                        break;
                    }
                }
                end = p + 1;
                lineBreak = this.sourceText.getText(end, endIncludingLineBreak);
            }
            var result = new TextSnapshotLine(this, lineNumber, start, end, lineBreak);
            return result;
        }
    }

    export interface ITextSnapshotLine {
        snapshot(): ITextSnapshot;

        start(): SnapshotPoint;
        startPosition(): number;

        end(): SnapshotPoint;
        endPosition(): number;

        endIncludingLineBreak(): SnapshotPoint;
        endIncludingLineBreakPosition(): number;

        length(): number;
        lineNumber(): number;
        getText(): string;
    }

    export class TextSnapshotLine implements ITextSnapshotLine {
        constructor (private _snapshot: TextSnapshot, private _lineNumber: number, private _start: number, private _end: number, private _lineBreak: string) {
        }
        public snapshot() { return this._snapshot; }
        public start() { return new SnapshotPoint(this._snapshot, this._start); }
        public startPosition() { return this._start; }
        public end() { return new SnapshotPoint(this._snapshot, this._end); }
        public endPosition() { return this._end; }
        public endIncludingLineBreak() { return new SnapshotPoint(this._snapshot, this._end + this._lineBreak.length); };
        public endIncludingLineBreakPosition() { return this._end + this._lineBreak.length; };
        public length() { return this._end - this._start; }
        public lineNumber() { return this._lineNumber; }
        public getText(): string { return this._snapshot.GetText(Span.FromBounds(this._start, this._end)); }
    }

    export class Span {
        constructor (private _start: number, private _length: number) {
            if (this._start < 0)
                throw new Error("Invalid start value");
            if (this._length < 0)
                throw new Error("Invalid length value");
        }

        public start(): number {
            return this._start;
        }

        public end(): number {
            return this._start + this._length;
        }

        public length(): number {
            return this._length;
        }

        public Intersection(span: Span): Span {
            var start = Math.Max(this.start(), span.start());
            var end = Math.Min(this.end(), span.end());
            if (start <= end) {
                return Span.FromBounds(start, end);
            }
            return null;
        }

        public OverlapsWith(span: Span): bool {
            var num = Math.Max(this.start(), span.start());
            var num2 = Math.Min(this.end(), span.end());
            return (num < num2);
        }

        public Contains(span: Span): bool {
            return ((span.start() >= this.start()) && (span.end() <= this.end()));
        }

        static FromBounds(start: number, end: number): Span {
            return new Span(start, end - start);
        }
    }

    export interface IList {
        count(): number;
        get(index: number): any;
        add(item: any): void;
        contains(item: any): bool;
        foreach(action: (item: any) => void ): void;
        GetEnumerator(): IEnumerator;
        Where(pred: (item) =>bool): IList;
    }

    export interface IList_TokenSpan extends IList {
        get(index: number): TokenSpan;
        add(item: TokenSpan): void;
        foreach(action: (item: TokenSpan) => void ): void;
    }

    export interface IList_TextEditInfo extends IList {
        get(index: number): TextEditInfo;
        add(item: TextEditInfo): void;
        foreach(action: (item: TextEditInfo) => void ): void;
    }

    export interface IList_IndentationInfo extends IList {
        get(index: number): IndentationInfo;
        add(item: IndentationInfo): void;
        foreach(action: (item: IndentationInfo) => void ): void;
    }

    export interface IList_IndentationEditInfo extends IList {
        get(index: number): IndentationEditInfo;
        add(item: IndentationEditInfo): void;
        foreach(action: (item: IndentationEditInfo) => void ): void;
    }

    export interface IList_ITextSnapshotLine extends IList {
        get(index: number): ITextSnapshotLine;
        add(item: ITextSnapshotLine): void;
        foreach(action: (item: ITextSnapshotLine) => void ): void;
    }

    export interface IList_ParseNode extends IList {
        get(index: number): ParseNode;
        add(item: ParseNode): void;
        foreach(action: (item: ParseNode) => void ): void;
    }

    export interface IEnumerator {
        MoveNext(): bool;
        Current(): any;
    }

    export class ListEnumerator implements IEnumerator {

        private index: number;

        constructor (private list: IList) {
            this.index = -1;
        }

        public MoveNext(): bool {
            if (this.index < this.list.count() - 1) {
                this.index++;
                return true;
            }
            return false;
        }

        public Current(): any {
            return this.list.get(this.index);
        }
    }

    export class List implements IList {
        static empty = [];
        private items: any[];

        constructor () {
            this.items = List.empty;
        }

        private copyOnWrite() {
            if (this.items === List.empty)
                this.items = [];
        }

        public count() {
            return this.items.length;
        }

        public get(index: number): any {
            var result = this.items[index];
            if (result === undefined)
                throw new Error("Invalid list index " + index + " (valid range is 0 to " + (this.items.length - 1) + ")");
            return result;
        }

        public add(item: any) {
            if (item === undefined)
                throw new Error("Cannot add an undefined value in a list")
            this.copyOnWrite();
            this.items.push(item);
        }

        public addAll(range: any[]) {
            range.forEach((item) => {
                this.add(item);
            });
        }

        public insert(index: number, item: any): void {
            if (item === undefined)
                throw new Error("Cannot add an undefined value in a list")
            if (index < 0 || index > this.items.length)
                throw new Error("Invalid index when inserting into array" + " (valid range is 0 to " + this.items.length + ")")
            this.copyOnWrite();
            this.items.splice(index, 0, item);
        }

        public contains(item: any): bool {
            var found = false;
            this.foreach((i) => {
                if (i === item) found = true;
            });
            return found;
        }

        public foreach(action: (item) =>void ) {
            var list = this;
            for (var i = 0, len = list.count() ; i < len; i++) {
                action(list.get(i));
            }
        }

        public GetEnumerator(): IEnumerator {
            return new ListEnumerator(this);
        }

        public Where(pred: (item) =>bool): IList {
            var result = new List();
            this.foreach((item) => {
                if (pred(item))
                    result.add(item);
            });
            return result;
        }
    }

    export class List_TokenSpan extends List implements IList_TokenSpan {
        public get(index: number): TokenSpan {
            return super.get(index);
        }

        //public add(item:TokenSpan):void {
        //    super.add(item);
        //}

        public foreach(action: (item: TokenSpan) => void ) {
            super.foreach(action);
        }
    }

    export class List_AuthorTokenKind extends List {
        public get(index: number): AuthorTokenKind {
            return super.get(index);
        }

        public foreach(action: (item: AuthorTokenKind) => void ) {
            super.foreach(action);
        }
    }

    export class List_IndentationInfo extends List implements IList_IndentationInfo {
        public get(index: number): IndentationInfo {
            return super.get(index);
        }

        public foreach(action: (item: IndentationInfo) => void ) {
            super.foreach(action);
        }
    }

    export class List_IndentationEditInfo extends List implements IList_IndentationEditInfo {
        public get(index: number): IndentationEditInfo {
            return super.get(index);
        }

        public foreach(action: (item: IndentationEditInfo) => void ) {
            super.foreach(action);
        }
    }

    export class List_ParseNode extends List implements IList_ParseNode {
        public get(index: number): ParseNode {
            return super.get(index);
        }

        public foreach(action: (item: ParseNode) => void ) {
            super.foreach(action);
        }
    }

    export class List_TextEditInfo extends List implements IList_TextEditInfo {
        constructor (/*TODO: Get rid of this param*/item: TextEditInfo = null) {
            super();
            if (item != null)
                this.add(item);
        }

        public get(index: number): TextEditInfo {
            return super.get(index);
        }

        public foreach(action: (item: TextEditInfo) => void ) {
            super.foreach(action);
        }
    }

    export class List_Rule extends List {
        public get(index: number): Rule {
            return super.get(index);
        }

        public foreach(action: (item: Rule) => void ) {
            super.foreach(action);
        }

        public Add(item: Rule) {
            super.add(item);
        }

        public AddRange(items: Rule[]) {
            items.forEach((item) => {
                this.Add(item);
            });
        }
    }

    export class List_ITextSnapshotLine extends List implements IList_ITextSnapshotLine {
        public get(index: number): ITextSnapshotLine {
            return super.get(index);
        }

        public foreach(action: (item: ITextSnapshotLine) => void ) {
            super.foreach(action);
        }
    }

    export class Stack {
        private items: any[];

        constructor () {
            this.items = [];
        }

        public Count() {
            return this.items.length;
        }

        public Push(item: any) {
            if (item === undefined)
                throw new Error("Cannot add an undefined value in a list")
            this.items.push(item);
        }

        public Pop(): any {
            if (this.items.length === 0)
                throw new Error("Cannot pop from an empty stack")
            return this.items.pop();
        }
    }

    export class Stack_ParseNode extends Stack {
        //public Push(item:ParseNode) {
        //    return super.Push(item);
        //}

        public Pop(): ParseNode {
            return super.Pop();
        }
    }

    //
    // Summary:
    //     Searches the entire sorted System.Collections.Generic.List<T> for an element
    //     using the specified comparer and returns the zero-based index of the element.
    //
    // Returns:
    //     The zero-based index of item in the sorted System.Collections.Generic.List<T>,
    //     if item is found; otherwise, a negative number that is the bitwise complement
    //     of the index of the next element that is larger than item or, if there is
    //     no larger element, the bitwise complement of System.Collections.Generic.List<T>.Count.
    export function BinarySearch(list: IList, searchValue: any, comparer: (searchValue: any, item: any) => number): number {
        var low = 0;
        var high = list.count();
        while (low < high) {
            var median = (low + high) >> 1;
            var compareResult = comparer(searchValue, list.get(median));
            if (compareResult > 0) {
                low = median + 1;
            }
            else {
                high = median;
            }
        }

        Debug.Assert(low >= 0 && low <= list.count(), "Incorrect implementation of BinarySearch");

        // min is position of 1st elem or insertion pos
        if (low == list.count() || comparer(searchValue, list.get(low)) != 0)
            return ~low;
        return low;
    }

    export function FirstOrDefault(list: IList, pred: (item) =>bool) {
        for (var i = 0, len = list.count() ; i < len; i++) {
            if (pred(list.get(i)))
                return list.get(i);
        }
        return null;
    }

    export function LastOrDefault(list: IList, pred: (item) =>bool) {
        for (var len = list.count(), i = len - 1; i >= 0; i--) {
            if (pred(list.get(i)))
                return list.get(i);
        }
        return null;
    }

    export class AuthorParseNode {
        constructor () {
        }

        public Details: AuthorParseNodeDetails;

        // The name associated with this node if applicable 
        // (e.g. function, variable or jump target for jump nodes)
        // In order to retrieve the actual string value, use IAuthorParseNodeCursor.GetPropertyById(<name>)
        // on the cursor object that created this node object.
        public Name: number;

        // The label associated with this node if exists
        // In order to retrieve the actual string value, use IAuthorParseNodeCursor.GetPropertyById(<label>)
        // on the cursor object that created this node object.
        public Label: number;

        // The edge label defining the relationship to the parent node. 
        // The root node will have a apneNone value. 
        public EdgeLabel: AuthorParseNodeEdge;

        // The level of the current node in the tree relative to the root node
        public Level: number;

    }

    export class AuthorParseNodeDetails {
        constructor () {
        }

        // The kind of AST node this is
        public nodeType: TypeScript.NodeType;
        public ast: TypeScript.AST;

        // The kind of parse node this is
        public Kind: AuthorParseNodeKind;

        // The starting offset of this node
        public StartOffset: number;

        // The ending offset of this node
        public EndOffset: number;

        // Flags associated with the current node
        public Flags: AuthorParseNodeFlags;

        public Equals(other: AuthorParseNodeDetails): bool {
            if (other == null)
                return false;

            return this.Kind == other.Kind &&
                this.nodeType == other.nodeType &&
                this.StartOffset == other.StartOffset &&
                this.EndOffset == other.EndOffset &&
                this.Flags == other.Flags;
        }
    }

    // Used to report when semicolons were automatically inserted to complete the node or when block was 
    // optional in the syntax but was included explicitly
    export enum AuthorParseNodeFlags {
        // No flags set
        apnfNone = 0x0000,

        // Statement terminated by an explicit semicolon
        //apnfExplicitSimicolon = 0x0010,

        // Statement terminated by an automatic semicolon
        //apnfAutomaticSimicolon = 0x0020,

        // Statement missing terminating semicolon, and is not applicable for automatic semicolon insersion
        //apnfMissingSimicolon = 0x0040,

        // Node is added by the parser or does it represent actual user code
        apnfSyntheticNode = 0x0100,

        // Function is subsumed in a call and was hoisted out
        //apnfSubsumedFunction = 0x0200
    }

    // Indicates the kind of the parse node.
    export enum AuthorParseNodeKind {
        apnkEmptyNode,
        apnkNone,
        apnkName,
        apnkInt,
        apnkFlt,
        apnkStr,
        apnkRegExp,
        apnkThis,
        apnkNull,
        apnkFalse,
        apnkTrue,
        apnkEmpty,
        apnkLdFncSlot,
        apnkArgRef,
        apnkHelperCall3,
        apnkNot,
        apnkNeg,
        apnkPos,
        apnkLogNot,
        apnkIncPost,
        apnkDecPost,
        apnkIncPre,
        apnkDecPre,
        apnkTypeof,
        apnkVoid,
        apnkDelete,
        apnkArray,
        apnkObject,
        apnkTempRef,
        apnkStFncSlot,
        apnkAdd,
        apnkSub,
        apnkMul,
        apnkDiv,
        apnkMod,
        apnkOr,
        apnkXor,
        apnkAnd,
        apnkEq,
        apnkNe,
        apnkLt,
        apnkLe,
        apnkGe,
        apnkGt,
        apnkCall,
        apnkDot,
        apnkAsg,
        apnkInstOf,
        apnkIn,
        apnkEqv,
        apnkNEqv,
        apnkComma,
        apnkLogOr,
        apnkLogAnd,
        apnkLsh,
        apnkRsh,
        apnkRs2,
        apnkNew,
        apnkIndex,
        apnkQmark,
        apnkAsgAdd,
        apnkAsgSub,
        apnkAsgMul,
        apnkAsgDiv,
        apnkAsgMod,
        apnkAsgAnd,
        apnkAsgXor,
        apnkAsgOr,
        apnkAsgLsh,
        apnkAsgRsh,
        apnkAsgRs2,
        apnkScope,
        apnkMember,
        apnkSetMember,
        apnkGetMember,
        apnkList,
        apnkVarDecl,
        apnkTemp,
        apnkFncDecl,
        apnkProg,
        apnkEndCode,
        apnkDebugger,
        apnkFor,
        apnkIf,
        apnkWhile,
        apnkDoWhile,
        apnkForIn,
        apnkBlock,
        apnkWith,
        apnkBreak,
        apnkContinue,
        apnkLabel,
        apnkSwitch,
        apnkCase,
        apnkTryCatch,
        apnkCatch,
        apnkReturn,
        apnkTry,
        apnkThrow,
        apnkFinally,
        apnkTryFinally,
        apnkStruct,
        apnkEnum,
        apnkTyped,
        apnkVarDeclList,
        apnkDefaultCase
    }

    export enum AuthorTokenKind {
        // No more tokens are in the provided range.
        atkEnd,

        // The token is normal text (or otherwise unclassified token)
        atkText,

        // The token is an identifier
        atkIdentifier,

        // The token is a comment.
        atkComment,

        // The token is a numberic literal.
        atkNumber,

        // The token is a string literal.
        atkString,

        // The token is a regular expression literal.
        atkRegexp,

        // The token is a conditional compilation directive.
        atkConditionalComp,

        // The Scanner has encountered an error in syntax coloring.
        atkScanError,

        // The token is ";".
        atkSColon,

        // The token is "(".
        atkLParen,

        // The token is ")".
        atkRParen,

        // The token is "[".
        atkLBrack,

        // The token is "]".
        atkRBrack,

        // The token is "{".
        atkLCurly,

        // The token is "}".
        atkRCurly,

        // The token is ",".
        atkComma,

        // The token is "=".
        atkAsg,

        // The token is "+=".
        atkAsgAdd,

        // The token is "-=".
        atkAsgSub,

        // The token is "*=".
        atkAsgMul,

        // The token is "/=".
        atkAsgDiv,

        // The token is "%=".
        atkAsgMod,

        // The token is "&=".
        atkAsgAnd,

        // The token is "^=".
        atkAsgXor,

        // The token is "|=".
        atkAsgOr,

        // The token is "<<=".
        atkAsgLsh,

        // The token is ">>=".
        atkAsgRsh,

        // The token is ">>>=".
        atkAsgRs2,

        // The token is "?".
        atkQMark,

        // The token is ":".
        atkColon,

        // The token is "||".
        atkLogOr,

        // The token is "&&".
        atkLogAnd,

        // The token is "|".
        atkOr,

        // The token is "^".
        atkXor,

        // The token is "&".
        atkAnd,

        // The token is "==".
        atkEQ,

        // The token is "!=".
        atkNE,

        // The token is "===".
        atkEqv,

        // The token is "!==".
        atkNEqv,

        // The token is "<".
        atkLT,

        // The token is "<=".
        atkLE,

        // The token is ">".
        atkGT,

        // The token is ">=".
        atkGE,

        // The token is "<<".
        atkLsh,

        // The token is ">>".
        atkRsh,

        // The token is ">>>".
        atkRs2,

        // The token is "+".
        atkAdd,

        // The token is "-".
        atkSub,

        // The token is "*".
        atkMult,

        // The token is "/".
        atkDiv,

        // The token is "%".
        atkPct,

        // The token is "~".
        atkTilde,

        // The token is "!".
        atkBang,

        // The token is "++".
        atkInc,

        // The token is "--".
        atkDec,

        // The token is ".".
        atkDot,

        // The token is "::".
        atkScope,

        // The token is the "break" keyword.
        atkBreak,

        // The token is the "case" keyword.
        atkCase,

        // The token is the "catch" keyword.
        atkCatch,

        // The token is the "class" keyword.
        atkClass,

        // The token is the "const" keyword.
        atkConst,

        // The token is the "continue" keyword.
        atkContinue,

        // The token is the "debugger" keyword.
        atkDebugger,

        // The token is the "default" keyword.
        atkDefault,

        // The token is the "delete" keyword.
        atkDelete,

        // The token is the "do" keyword.
        atkDo,

        // The token is the "else" keyword.
        atkElse,

        // The token is the "enum" keyword.
        atkEnum,

        // The token is the "export" keyword.
        atkExport,

        // The token is the "extends" keyword.
        atkExtends,

        // The token is the "else" keyword.
        atkFalse,

        // The token is the "finally" keyword.
        atkFinally,

        // The token is the "for" keyword.
        atkFor,

        // The token is the "function" keyword.
        atkFunction,

        // The token is the "if" keyword.
        atkIf,

        // The token is the "import" keyword.
        atkImport,

        // The token is the "in" keyword.
        atkIn,

        // The token is the "instanceof" keyword.
        atkInstanceof,

        // The token is the "new" keyword.
        atkNew,

        // The token is the "null" keyword.
        atkNull,

        // The token is the "return" keyword.
        atkReturn,

        // The token is the "super" keyword.
        atkSuper,

        // The token is the "switch" keyword.
        atkSwitch,

        // The token is the "this" keyword.
        atkThis,

        // The token is the "throw" keyword.
        atkThrow,

        // The token is the "true" keyword.
        atkTrue,

        // The token is the "try" keyword.
        atkTry,

        // The token is the "typeof" keyword.
        atkTypeof,

        // The token is the "var" keyword.
        atkVar,

        // The token is the "void" keyword.
        atkVoid,

        // The token is the "while" keyword.
        atkWhile,

        // The token is the "with" keyword.
        atkWith,

        // The token is the future reserved keyword "implements".
        atkImplements,

        // The token is the future reserved keyword "interface".
        atkInterface,

        // The token is the future reserved keyword "let".
        atkLet,

        // The token is the future reserved keyword "package".
        atkPackage,

        // The token is the future reserved keyword "private".
        atkPrivate,

        // The token is the future reserved keyword "protected".
        atkProtected,

        // The token is the future reserved keyword "public".
        atkPublic,

        // The token is the future reserved keyword "static".
        atkStatic,

        // The token is the future reserved keyword "yield".
        atkYield,

        //TypeScript: length
        Length
    }

    // Indicates the relationship to between a parent and a child nodes
    export enum AuthorParseNodeEdge {
        // Node has no relationship to it parent
        // Applicable for: root node
        apneNone,

        // Node is an operand
        // Applicable for: 
        //                  apnkNot,
        //                  apnkNeg,
        //                  apnkPos,
        //                  apnkLogNot,
        //                  apnkIncPre,
        //                  apnkDecPre,
        //                  apnkTypeof,
        //                  apnkVoid,
        //                  apnkDelete,
        //                  apnkIncPost,
        //                  apnkDecPost,
        apneOperand,

        // Node is a left child of a binary expression
        // Applicable for:
        //                  apnkAdd
        //                  apnkSub
        //                  apnkMul
        //                  apnkDiv
        //                  apnkMod
        //                  apnkOr
        //                  apnkXor
        //                  apnkAnd
        //                  apnkEq
        //                  apnkNe
        //                  apnkLt
        //                  apnkLe
        //                  apnkGe
        //                  apnkGt
        //                  apnkDot
        //                  apnkAsg
        //                  apnkInstOf
        //                  apnkIn
        //                  apnkEqv
        //                  apnkNEqv
        //                  apnkComma
        //                  apnkLogOr
        //                  apnkLogAnd
        //                  apnkLsh
        //                  apnkRsh
        //                  apnkRs2
        //                  apnkAsgAdd
        //                  apnkAsgSub
        //                  apnkAsgMul
        //                  apnkAsgDiv
        //                  apnkAsgMod
        //                  apnkAsgAnd
        //                  apnkAsgXor
        //                  apnkAsgOr
        //                  apnkAsgLsh
        //                  apnkAsgRsh
        //                  apnkAsgRs2
        //                  apnkScope
        apneLeft,

        // Node is a right child of a binary expression
        // Applicable for:
        //                  apnkAdd
        //                  apnkSub
        //                  apnkMul
        //                  apnkDiv
        //                  apnkMod
        //                  apnkOr
        //                  apnkXor
        //                  apnkAnd
        //                  apnkEq
        //                  apnkNe
        //                  apnkLt
        //                  apnkLe
        //                  apnkGe
        //                  apnkGt
        //                  apnkDot
        //                  apnkAsg
        //                  apnkInstOf
        //                  apnkIn
        //                  apnkEqv
        //                  apnkNEqv
        //                  apnkComma
        //                  apnkLogOr
        //                  apnkLogAnd
        //                  apnkLsh
        //                  apnkRsh
        //                  apnkRs2
        //                  apnkAsgAdd
        //                  apnkAsgSub
        //                  apnkAsgMul
        //                  apnkAsgDiv
        //                  apnkAsgMod
        //                  apnkAsgAnd
        //                  apnkAsgXor
        //                  apnkAsgOr
        //                  apnkAsgLsh
        //                  apnkAsgRsh
        //                  apnkAsgRs2
        //                  apnkScope
        apneRight,

        // Node is a condition in a statement
        // Applicable for:
        //                  apnkQmark
        //                  apnkIf
        //                  apnkFor
        //                  apnkWhile
        //                  apnkDoWhile
        apneCondition,

        // Node is the statements on the true branch of and branch statement
        // Applicable for:
        //                  apnkQmark
        //                  apnkIf
        apneThen,

        // Node is the statements on the false branch of and branch statement
        // Applicable for:
        //                  apnkQmark
        //                  apnkIf
        apneElse,

        // Node is the initialization in a var declaration or of a for statement
        // Applicable for:
        //                  apnkFor
        //                  apnkVarDecl
        apneInitialization,

        // Node is the increment in a for statement
        // Applicable for:
        //                  apnkFor
        apneIncrement,

        // Node is the statement of a body of a container statement
        // Applicable for:
        //TypeScript:           NodeType.module
        //TypeScript:           NodeType.class
        //TypeScript:           NodeType.interface
        //                  apnkProg
        //                  apnkFncDecl
        //                  apnkFor
        //                  apnkForIn
        //                  apnkWhile
        //                  apnkDoWhile
        //                  apnkWith
        //                  apnkCase
        //                  apnkTry
        //                  apnkCatch
        //                  apnkFinally
        apneBody,

        // Node is the statement of a body of a block
        // Applicable for:
        //                  apnkBlock
        apneBlockBody,

        // Node is a value of in a statement 
        // Applicable for:
        //                  apnkReturn
        //                  apnkSwitch
        //                  apnkCase
        //                  apnkThrow
        //                  apnkGetMember
        //                  apnkSetMember
        //                  apnkTyped
        //                  apnkIndex
        apneValue,

        // Node is a target of a call statement 
        // Applicable for:
        //                  apnkCall
        //                  apnkNew
        //                  apnkMember
        apneTarget,

        // Node is an argument in a function declaration node (formal)
        // Applicable for:
        //                  apnkFncDecl
        apneArgument,

        // Node is a list of function arguments (actual)
        // Applicable for:
        //                  apnkCall
        //                  apnkNew
        apneArguments,

        // Node is a list of member of an object or an enum
        // Applicable for:
        //                  apnkEnum
        //                  apnkStruct
        //                  apnkObject
        apneMembers,

        // Node is a variable in a catch or a forin statement 
        // Applicable for:
        //                  apnkCatch
        //                  apnkForIn
        apneVariable,

        // Node is an object in a forin or with statement 
        // Applicable for:
        //                  apnkWith
        //                  apnkForIn
        apneObject,

        // Node is a try statement  in a try-finally or a try-catch node
        // Applicable for:
        //                  apnkTryFinally
        //                  apnkTryCatch
        apneTry,

        // Node is a catch statement in a try-finally or a try-catch node
        // Applicable for:
        //                  apnkTryCatch
        apneCatch,

        // Node is a finally statement in a try-finally or a try-catch node
        // Applicable for:
        //                  apnkTryFinally
        apneFinally,

        // Node is a case statement in a switch node
        // Applicable for:
        //                  apnkSwitch
        apneCase,

        // Node is the default case statement in a switch node
        // Applicable for:
        //                  apnkSwitch
        apneDefaultCase,

        // Node is a member of an array
        // Applicable for:
        //                  apnkArray
        apneElements,

        // Node is a member in a list of statements
        // Applicable for:
        //                  apnkList
        apneListItem,

        // Node is a member in an object
        // Applicable for:
        //                  apnkMember
        apneMember,

        // Node is the type in a typed expression
        // Applicable for:
        //                  apnkTyped
        apneType
    }

    export interface IAuthorParseNodeCursor {
        // Get the node the cursor is pointing at. If the current node does not exist an empty node (kind: apnkEmptyNode) 
        // is returned. Initial value is the root of the tree.
        Current(): AuthorParseNodeDetails;

        // Get the parent of the current node the cursor is pointing at. If the parent node does not exist an empty node (kind: apnkEmptyNode) 
        // is returned.
        Parent(): AuthorParseNodeDetails;

        // Get the one of the children of the current node without moving the cursor. The child is selected based on the label 
        // defined by edgeLabel. If the current node does not support the specific edge label the call will fail with E_INVALIDARG.
        // Use index to select which child to use in case of list nodes. The value of index is ignored for all other node
        // types.
        // If the child specified by edgeLabel does not exist (e.g. else for an if statement), an empty node (kind: apnkEmptyNode)
        // will be returned. 
        // In order to invoke any of the cursor methods on the child node, the cursor needs to be moved to the child node first.
        // Use this method to investigate the basic properties of a child node without moving the cursor.
        //AuthorParseNodeDetails Child(AuthorParseNodeEdge edgeLabel, int index);

        // Move the cursor to one of the children of the current node. The child is selected based on the label defined 
        // by edgeLabel. If the current node does not support the specific edge label the call will fail with E_INVALIDARG.
        // Use index to select which child to use in case of list nodes. The value of index is ignored for all other node
        // types.
        // If the child specified by edgeLabel does not exist (e.g. else for an if statement), the cursor will be moved to 
        // point to an empty node (kind: apnkEmptyNode); use MoveUp to revert the cursor to the parent node.
        MoveToChild(edgeLabel: AuthorParseNodeEdge, index: number): AuthorParseNodeDetails;

        // Move the cursor to the parent of the current node. If the current node is the root, NULL is returned
        MoveUp(): AuthorParseNodeDetails;

        // Move the cursor to the inner most node with range containing offset. Set excludeEndOffset to true to exclude nodes
        // that end at offset from the search.
        SeekToOffset(offset: number, excludeEndOffset: bool /*= false*/): AuthorParseNodeDetails;

        // Moves the cursor to the closest node that encloses the range defined by startOffset and endOffset. startOffset 
        // is expected to be less than or equal to endOffset; if not the call will fail. 
        // Set excludeEndOffset to true to exclude nodes that end at either startOffset and endOffset from the search.
        MoveToEnclosingNode(startOffset: number, endOffset: number): AuthorParseNodeDetails;

        // Serialize the sub tree rooted at the current node into a list.
        // The list will always begin with the current node. Each node will be followed by its children. Use Level field 
        // in IAuthorParesNode struct to identify children of a node. Each node pears an edge label that defines its 
        // relationship to the parent. Only edges with nonempty nodes will be serialized (e.g. if without an else will only 
        // have two child nodes: condition and then). 
        // Use depth to control what portion of the tree will be serialized; depth = 0 will return the current node only, 
        // depth = 1 will return the current node and its children and so on. If depth < 0 all the nodes in the tree will be 
        // serialized.
        GetSubTree(depth: number): IAuthorParseNodeSet;

        // Get the value of a property on the current node. If the property value is not supported on the current node, 0 is 
        // returned.
        GetNodeProperty(nodeProperty: AuthorParseNodeProperty): number;

        // Get property string using an id. GetSubTree call will serialize names and string literals as id's. Use this method
        // to retrieve the actual text. Call will fail if the id is invalid.
        //[return: MarshalAs(UnmanagedType.BStr)]
        //string GetPropertyById(int propertyId);

        // Get the string value associated with the current node. This call is applicable to string literal nodes and name
        // nodes; calling this method on other node types will fail.
        //[return: MarshalAs(UnmanagedType.BStr)]
        //string GetStringValue();

        // Get the value of the current integer literal. If the current node is not a integer literal the call will fail.
        //int GetIntValue();

        // Get the value of the current float literal. If the current node is not a float literal the call will fail.
        //double GetFloatValue();

        // Get the value of the current regular expression node. If the current node is not a RegExp the call will fail.
        //[return: MarshalAs(UnmanagedType.BStr)]
        //void GetRegExpValue(out string result, out AuthorRegExpOptions options);

        // Get the label text associated with the current statement. If the current statement does not have a label or 
        // current node is not a statement null is returned.
        //[return: MarshalAs(UnmanagedType.BStr)]
        //string GetStatementLabel();

        // Gets the string value of labels of jump statements. Statements that support this call are Break and Continue.
        // If the current jump node does not have a target label null is returned.
        //[return: MarshalAs(UnmanagedType.BStr)]
        //string GetTargetLabel();

        // Get the span of the current node. The statement span is the start and end offsets of a statement as the debugger would
        // show them (e.g. statement span of if statement is the if keyword and the condition, similarlly that of a do while loop is
        // the while keyword and condition.
        //void GetStatementSpan(out int startOffset, out int endOffset);

        // Checks if the offset lies within a comment regardless of the cursor location.
        //[return: MarshalAs(UnmanagedType.VariantBool)]
        //bool OffsetInComment(int offset);

        // Gets the edge label of the current node with respect to its parent.
        GetEdgeLabel(): AuthorParseNodeEdge;
    }

    export interface IAuthorParseNodeSet {
        // Returns the total number of nodes
        Count(): number;

        // Retrieves count nodes staring at start index
        GetItems(startIndex: number, count: number): AuthorParseNode[];
    }

    export class AuthorParseNodeSet implements IAuthorParseNodeSet {
        constructor (private nodes: AuthorParseNode[]) {
        }

        public Count() {
            return this.nodes.length;
        }

        public GetItems(startIndex: number, count: number): AuthorParseNode[] {
            if (startIndex == 0 && count == this.nodes.length) {
                return this.nodes;
            }

            throw new Error("Invalid call to GetItems");
        }
    }

    // Used by calls to GetNodeProperty to specify which node property to retrieve
    export enum AuthorParseNodeProperty {
        // Starting offset of the left curly braces in a statement
        apnpLCurlyMin,

        // Starting offset of the right curly braces in a statement
        apnpRCurlyMin,

        // Starting offset of the left parenthesis in a statement
        apnpLParenMin,

        // Starting offset of the right parenthesis in a statement
        apnpRParenMin,

        // Starting offset of the left square bracket in an index statement
        apnpLBrackMin,

        // Starting offset of the right square bracket in an index statement
        apnpRBrackMin,

        // Starting offset of the identifier name of a function, parameter, or variable declaration.
        apnpIdentifierMin,

        // Starting offset of the function keyword
        apnpFunctionKeywordMin
    }

    // Map TokenID to AuthorTokenKind
    export class AuthorTokenKindMap {
        static instance: AuthorTokenKindMap = null;
        private tokenMap: AuthorTokenKind[];

        static getInstance() {
            if (instance === null) {
                instance = new AuthorTokenKindMap();
            }
            return instance;
        }

        constructor () {
            this.tokenMap = [];
            this.init();
        }

        private init(): void {
            for (var i = 0, len = TypeScript.TokenID.Lim; i < len; i++) {
                this.tokenMap[i] = this.mapTokenID(i);
            }
        }

        public getTokenKind(kind: TypeScript.TokenID): AuthorTokenKind {
            return this.tokenMap[kind];
        }

        private mapTokenID(kind: TypeScript.TokenID): AuthorTokenKind {
            switch (kind) {
                case TypeScript.TokenID.ANY: return AuthorTokenKind.atkIdentifier;//TODO
                case TypeScript.TokenID.BOOL: return AuthorTokenKind.atkIdentifier;//TODO
                case TypeScript.TokenID.BREAK: return AuthorTokenKind.atkBreak;
                case TypeScript.TokenID.CASE: return AuthorTokenKind.atkCase;
                case TypeScript.TokenID.CATCH: return AuthorTokenKind.atkCatch;
                case TypeScript.TokenID.CLASS: return AuthorTokenKind.atkClass;
                case TypeScript.TokenID.CONST: return AuthorTokenKind.atkConst;
                case TypeScript.TokenID.CONTINUE: return AuthorTokenKind.atkContinue;
                case TypeScript.TokenID.DEBUGGER: return AuthorTokenKind.atkDebugger;
                case TypeScript.TokenID.DEFAULT: return AuthorTokenKind.atkDefault;
                case TypeScript.TokenID.DELETE: return AuthorTokenKind.atkDelete;
                case TypeScript.TokenID.DO: return AuthorTokenKind.atkDo;
                case TypeScript.TokenID.ELSE: return AuthorTokenKind.atkElse;
                case TypeScript.TokenID.ENUM: return AuthorTokenKind.atkEnum;
                case TypeScript.TokenID.EXPORT: return AuthorTokenKind.atkExport;
                case TypeScript.TokenID.EXTENDS: return AuthorTokenKind.atkExtends;
                case TypeScript.TokenID.DECLARE: return AuthorTokenKind.atkIdentifier;//TODO
                case TypeScript.TokenID.FALSE: return AuthorTokenKind.atkFalse;
                case TypeScript.TokenID.FINALLY: return AuthorTokenKind.atkFinally;
                case TypeScript.TokenID.FOR: return AuthorTokenKind.atkFor;
                case TypeScript.TokenID.CONSTRUCTOR: return AuthorTokenKind.atkFunction;//TODO
                case TypeScript.TokenID.FUNCTION: return AuthorTokenKind.atkFunction;
                case TypeScript.TokenID.GET: return AuthorTokenKind.atkIdentifier;//TODO
                case TypeScript.TokenID.IF: return AuthorTokenKind.atkIf;
                case TypeScript.TokenID.IMPLEMENTS: return AuthorTokenKind.atkImplements;
                case TypeScript.TokenID.IMPORT: return AuthorTokenKind.atkImport;
                case TypeScript.TokenID.IN: return AuthorTokenKind.atkIn;
                case TypeScript.TokenID.INSTANCEOF: return AuthorTokenKind.atkInstanceof;
                case TypeScript.TokenID.INTERFACE: return AuthorTokenKind.atkInterface;
                case TypeScript.TokenID.LET: return AuthorTokenKind.atkLet;
                case TypeScript.TokenID.MODULE: return AuthorTokenKind.atkIdentifier;//TODO
                case TypeScript.TokenID.NEW: return AuthorTokenKind.atkNew;
                case TypeScript.TokenID.NUMBER: return AuthorTokenKind.atkIdentifier;//TODO
                case TypeScript.TokenID.NULL: return AuthorTokenKind.atkNull;//TODO
                case TypeScript.TokenID.PACKAGE: return AuthorTokenKind.atkPackage;//TODO
                case TypeScript.TokenID.PRIVATE: return AuthorTokenKind.atkPrivate;//TODO
                case TypeScript.TokenID.PROTECTED: return AuthorTokenKind.atkProtected;//TODO
                case TypeScript.TokenID.PUBLIC: return AuthorTokenKind.atkPublic;//TODO
                case TypeScript.TokenID.WITH: return AuthorTokenKind.atkWith;//TODO
                case TypeScript.TokenID.RETURN: return AuthorTokenKind.atkReturn;
                case TypeScript.TokenID.SET: return AuthorTokenKind.atkIdentifier;//TODO
                case TypeScript.TokenID.STATIC: return AuthorTokenKind.atkStatic;//TODO
                case TypeScript.TokenID.STRING: return AuthorTokenKind.atkIdentifier;//TODO
                case TypeScript.TokenID.SUPER: return AuthorTokenKind.atkSuper;
                case TypeScript.TokenID.SWITCH: return AuthorTokenKind.atkSwitch;
                case TypeScript.TokenID.THIS: return AuthorTokenKind.atkThis;//TODO
                case TypeScript.TokenID.THROW: return AuthorTokenKind.atkThrow;//TODO
                case TypeScript.TokenID.TRUE: return AuthorTokenKind.atkTrue;
                case TypeScript.TokenID.TRY: return AuthorTokenKind.atkTry;
                case TypeScript.TokenID.TYPEOF: return AuthorTokenKind.atkTypeof;
                case TypeScript.TokenID.VAR: return AuthorTokenKind.atkVar;
                case TypeScript.TokenID.VOID: return AuthorTokenKind.atkVoid;
                case TypeScript.TokenID.WHILE: return AuthorTokenKind.atkWhile;
                case TypeScript.TokenID.YIELD: return AuthorTokenKind.atkYield;

                case TypeScript.TokenID.SColon: return AuthorTokenKind.atkSColon;
                case TypeScript.TokenID.LParen: return AuthorTokenKind.atkLParen;
                case TypeScript.TokenID.RParen: return AuthorTokenKind.atkRParen;
                case TypeScript.TokenID.LBrack: return AuthorTokenKind.atkLBrack;
                case TypeScript.TokenID.RBrack: return AuthorTokenKind.atkRBrack;
                case TypeScript.TokenID.LCurly: return AuthorTokenKind.atkLCurly;
                case TypeScript.TokenID.RCurly: return AuthorTokenKind.atkRCurly;
                case TypeScript.TokenID.Comma: return AuthorTokenKind.atkComma;
                case TypeScript.TokenID.Asg: return AuthorTokenKind.atkAsg;
                case TypeScript.TokenID.AsgAdd: return AuthorTokenKind.atkAsgAdd;
                case TypeScript.TokenID.AsgSub: return AuthorTokenKind.atkAsgSub;
                case TypeScript.TokenID.AsgMul: return AuthorTokenKind.atkAsgMul;
                case TypeScript.TokenID.AsgDiv: return AuthorTokenKind.atkAsgDiv;
                case TypeScript.TokenID.AsgMod: return AuthorTokenKind.atkAsgMod;
                case TypeScript.TokenID.AsgAnd: return AuthorTokenKind.atkAsgAnd;
                case TypeScript.TokenID.AsgXor: return AuthorTokenKind.atkAsgXor;
                case TypeScript.TokenID.AsgOr: return AuthorTokenKind.atkAsgOr;
                case TypeScript.TokenID.AsgLsh: return AuthorTokenKind.atkAsgLsh;
                case TypeScript.TokenID.AsgRsh: return AuthorTokenKind.atkAsgRsh;
                case TypeScript.TokenID.AsgRs2: return AuthorTokenKind.atkAsgRs2;
                case TypeScript.TokenID.QMark: return AuthorTokenKind.atkQMark;
                case TypeScript.TokenID.Colon: return AuthorTokenKind.atkColon;
                case TypeScript.TokenID.LogOr: return AuthorTokenKind.atkLogOr;
                case TypeScript.TokenID.LogAnd: return AuthorTokenKind.atkLogAnd;
                case TypeScript.TokenID.Or: return AuthorTokenKind.atkOr;
                case TypeScript.TokenID.Xor: return AuthorTokenKind.atkXor;
                case TypeScript.TokenID.And: return AuthorTokenKind.atkAnd;
                case TypeScript.TokenID.EQ: return AuthorTokenKind.atkEQ;
                case TypeScript.TokenID.NE: return AuthorTokenKind.atkNE;
                case TypeScript.TokenID.Eqv: return AuthorTokenKind.atkEqv;
                case TypeScript.TokenID.NEqv: return AuthorTokenKind.atkNEqv;
                case TypeScript.TokenID.LT: return AuthorTokenKind.atkLT;
                case TypeScript.TokenID.LE: return AuthorTokenKind.atkLE;
                case TypeScript.TokenID.GT: return AuthorTokenKind.atkGT;
                case TypeScript.TokenID.GE: return AuthorTokenKind.atkGE;
                case TypeScript.TokenID.Lsh: return AuthorTokenKind.atkLsh;
                case TypeScript.TokenID.Rsh: return AuthorTokenKind.atkRsh;
                case TypeScript.TokenID.Rs2: return AuthorTokenKind.atkRs2;
                case TypeScript.TokenID.Add: return AuthorTokenKind.atkAdd;
                case TypeScript.TokenID.Sub: return AuthorTokenKind.atkSub;
                case TypeScript.TokenID.Mult: return AuthorTokenKind.atkMult;
                case TypeScript.TokenID.Div: return AuthorTokenKind.atkDiv;
                case TypeScript.TokenID.Pct: return AuthorTokenKind.atkPct;
                case TypeScript.TokenID.Tilde: return AuthorTokenKind.atkTilde;
                case TypeScript.TokenID.Bang: return AuthorTokenKind.atkBang;
                case TypeScript.TokenID.Inc: return AuthorTokenKind.atkInc;
                case TypeScript.TokenID.Dec: return AuthorTokenKind.atkDec;
                case TypeScript.TokenID.Dot: return AuthorTokenKind.atkDot;
                case TypeScript.TokenID.Ellipsis: return AuthorTokenKind.atkIdentifier; //TODO
                case TypeScript.TokenID.Error: return AuthorTokenKind.atkIdentifier;//TODO
                case TypeScript.TokenID.EOF: return AuthorTokenKind.atkEnd;
                case TypeScript.TokenID.Arrow: return AuthorTokenKind.atkIdentifier;//TODO
                case TypeScript.TokenID.ID: return AuthorTokenKind.atkIdentifier;
                case TypeScript.TokenID.QString: return AuthorTokenKind.atkString;
                case TypeScript.TokenID.Regex: return AuthorTokenKind.atkRegexp;
                case TypeScript.TokenID.NumberLit: return AuthorTokenKind.atkNumber;
                case TypeScript.TokenID.Whitespace: return AuthorTokenKind.atkIdentifier;//TODO
                case TypeScript.TokenID.Comment: return AuthorTokenKind.atkComment;
                default:
                    throw new Error("Invalid token kind:" + kind + " (" + (<any>TypeScript.TokenID)._map[kind] + ")");
            }
        }
    }

    export class Debug {
        static Assert(cond: bool, msg: string): void {
            if (!cond)
                throw new Error("assertion failure: " + msg);
        }

        static Fail(msg: string): void {
            Assert(false, msg);
        }
    }

    export class HashSet_int {
        public items: number[];

        constructor () {
            this.items = [];
        }

        public Contains(item: number) {
            return this.items[item] !== undefined;
        }
        public Add(item: number) {
            this.items[item] = item;
        }
    }

    export class Dictionary_int_List_IndentationEditInfo {
        private items: List_IndentationEditInfo[];

        constructor () {
            this.items = [];
        }
        public GetValue(key: number): List_IndentationEditInfo {
            var result = this.items[key];
            return result === undefined ? null : result;
        }
        public Add(key: number, value: List_IndentationEditInfo) {
            this.items[key] = value;
        }
    }

    export class Dictionary_int_int {
        private items: number[];

        constructor () {
            this.items = [];
        }
        public GetValue(key: number): number {
            var result = this.items[key];
            return result === undefined ? null : result;
        }
        public Add(key: number, value: number) {
            this.items[key] = value;
        }
    }

    //TODO: Get rid of this
    export class Math {
        static Max(x: number, y: number): number {
            return (x > y ? x : y);
        }
        static Min(x: number, y: number): number {
            return (x < y ? x : y);
        }
    }

    export class StringUtils {
        static IndexOf(value: string, search: string, startIndex = 0) {
            return value.indexOf(search, startIndex);
        }

        static Equals(x: string, y: string): bool {
            return x == y;
        }

        static IsNullOrEmpty(x: string): bool {
            return x === null || x === "";
        }

        static IsWhiteSpace(charCode: number): bool {
            return EditorUtilities.IsWhitespace(charCode);
        }

        static create(value: string, count: number) {
            var result = "";
            for (var i = 0; i < count; i++) {
                result += value;
            }
            return result;
        }

        static foreach(x: string, action: (c: string) =>void ) {
            for (var i = 0; i < x.length; i++) {
                action(x.charAt(i));
            }
        }
    }

    export class EditorUtilities {
        // This complies with the ECMA-262 specification and is not the same
        // as System.Char.IsWhitespace(...).
        // 3.0:  http://www.unicode.org/Public/3.0-Update/UnicodeData-3.0.0.txt
        // latest:  http://www.unicode.org/Public/UNIDATA/UnicodeData.txt
        static IsWhitespace(charCode: number): bool {
            switch (charCode) {
                case 0x0009: // tab
                case 0x000b: // vertical tab
                case 0x000c: // form feed
                case 0xfeff: // byte order mark

                    // Unicode 3.0 general category Zs
                case 0x0020: // space
                case 0x00a0: // no-break space
                case 0x1680: // Ogham space mark.  Added in a 3.0.0 update.
                case 0x2000: // en quad
                case 0x2001: // em quad
                case 0x2002: // en space
                case 0x2003: // em space
                case 0x2004: // three-per-em space
                case 0x2005: // four-per-em space
                case 0x2006: // six-per-em space
                case 0x2007: // figure space
                case 0x2008: // punctuation space
                case 0x2009: // thin space
                case 0x200a: // hair space
                case 0x202f: // narrow no-break space

                    // In later versions of Unicode this has been recategorized as Cf.
                    // However, ECMA-262 requires that Unicode 3.0 support.
                case 0x200b: // zero width space
                case 0x3000: // ideographic space

                    // Added post-3.0.
                case 0x180e: // Mongolian vowel separator.  Recategorized.  Was Cf.
                case 0x205f: // medium mathematical space
                    return true;

                default:
                    return false;
            }
        }
    }

    export function getTokensInSpan(logger: TypeScript.ILogger, scriptSyntaxAST: Services.ScriptSyntaxAST, tokenKindMap: AuthorTokenKindMap, span: SnapshotSpan): IList_TokenSpan {
        var tokens = new List_TokenSpan();

        var tokenStream = scriptSyntaxAST.getTokenStream(span.startPosition());
        while (tokenStream.moveNext()) {
            if (logger.information()) {
                var text = "token: " + (<any>TypeScript.TokenID)._map[tokenStream.tokenId()] + " - startPos=" + tokenStream.tokenStartPos() + ", pos=" + tokenStream.tokenEndPos();
                logger.log(text);
            }

            var endPos = tokenStream.tokenEndPos();
            // If we are before the span range, skip this token
            if (endPos < span.startPosition()) {
                continue;
            }

            var startPos = tokenStream.tokenStartPos();
            // If we are past the span range, stop scanning
            if (startPos > span.endPosition()) {
                break;
            }

            var kind = tokenKindMap.getTokenKind(tokenStream.tokenId());
            var tokenSpan = new TokenSpan(kind, tokenStream.tokenId(), new SnapshotSpan(span.snapshot, Span.FromBounds(startPos, endPos)))
            tokens.add(tokenSpan);
        }

        logger.log("GetTokens([" + span.startPosition() + "," + span.endPosition() + "]): returned " + tokens.count() + " tokens from source text offset " + tokenStream.sourceTextOffset());
        return tokens;
    }
}
