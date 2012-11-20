// Copyright (c) Microsoft. All rights reserved. Licensed under the Apache License, Version 2.0. 
// See LICENSE.txt in the project root for complete license information.

///<reference path='formatting.ts' />


//module EditorAbstractions {
module Formatting {
    export class ParseNode {

        private _children: List_ParseNode;
        private blockSpan: Span;
        public indentationOverride: string;
        public Parent: ParseNode;
        public AuthorNode: AuthorParseNode;
        public IsIndentationOverrideEdge: bool;
        public IndentationDelta: number;
        public ChildrenIndentationDelta: number;
        public TokenTagIndex: number;

        constructor () {
            this._children = null;
            this.blockSpan = null;
            this.indentationOverride = null;
            this.Parent = null;
            this.AuthorNode = null;
            this.IsIndentationOverrideEdge = false;
            this.IndentationDelta = null;
            this.ChildrenIndentationDelta = null;
            this.TokenTagIndex = null;
        }

        public children(): List_ParseNode {
            return this._children;
        }

        public addChildNode(node: ParseNode): void {
            if (this._children === null)
                this._children = new List_ParseNode();

            var count = this._children.count();
            if (count === 0) {
                this._children.add(node);
            }
            else {
                var startOffset = node.AuthorNode.Details.StartOffset;
                var maxOffset = this._children.get(count - 1).AuthorNode.Details.StartOffset;
                if (startOffset >= maxOffset) {
                    // In most cases, we simply add at the end of the list, because we usually add nodes
                    // in the lexical order they appear in source code...
                    this._children.add(node);
                }
                else {
                    // ... in some case though, we receive nodes in non-lexical order, so we have to find 
                    // the insertion point in lexical order.
                    var pivot = ParseNodeExtensions.findNodeInsertionPivot(this._children, node.AuthorNode.Details.StartOffset);
                    if (pivot < 0) {
                        this._children.insert(~pivot, node);
                    }
                    else {
                        this._children.insert(pivot + 1, node);
                    }
                }
            }
        }

        /// <summary>
        /// Determines if the node can be indented based on AST edge values, though we only indent 
        /// nodes that happens to be at the beginning of the line. IsIndented can be used in 
        /// this case to determine if the node got eventually indented or not
        /// </summary>
        public CanIndent(): bool {
            //get
            {
                return this.IndentationDelta != null;
            }
        }

        public CoverSpan(span: Span): bool {
            var details = this.AuthorNode.Details;
            return span.start() >= details.StartOffset &&
                   span.end() <= details.EndOffset;
        }

        public SetIndentationOverride(newIndentationOverride: string): void {
            this.indentationOverride = newIndentationOverride;
        }

        public  GetNodeStartLineIndentation(indentResolver: ILineIndenationResolver): IndentationInfo {
            var node = this;
            var prefix: string = null;

            // Find the closest node that could indent
            while (node != null && !node.CanIndent() && !node.IsIndentationOverrideEdge)
                node = node.Parent;

            if (node != null) {
                if (node.indentationOverride == null) {
                    node.indentationOverride = indentResolver.GetLineIndentationForOffset(node.AuthorNode.Details.StartOffset);
                }

                prefix = node.indentationOverride;
            }

            return new IndentationInfo(prefix, 0);
        }

        public GetEffectiveIndentation(indentResolver: ILineIndenationResolver): IndentationInfo {
            var node = this;
            var prefix: string = null;
            var level = 0;

            // Find the closest node that could indent
            while (node != null && !node.CanIndent() && !node.IsIndentationOverrideEdge)
                node = node.Parent;

            if (node != null) {
                // If indentationOverride is set, then just use that
                if (node.indentationOverride != null) {
                    prefix = node.indentationOverride;
                }
                else {
                    // Otherwise, use the node level and its parent indentation override
                    if (node.CanIndent()) {
                        level = node.IndentationDelta;
                        if (node.AuthorNode.Label != 0)
                            level++;

                        node = node.Parent;
                        while (node != null) {
                            if (node.indentationOverride != null) {
                                prefix = node.indentationOverride;
                                break;
                            }

                            if (node.CanIndent() || node.IsIndentationOverrideEdge) {
                                node.indentationOverride = indentResolver.GetLineIndentationForOffset(node.AuthorNode.Details.StartOffset);
                                prefix = node.indentationOverride;
                                break;
                            }

                            node = node.Parent;
                        }
                    }
                    else if (node.IsIndentationOverrideEdge) {
                        node.indentationOverride = indentResolver.GetLineIndentationForOffset(node.AuthorNode.Details.StartOffset);
                        prefix = node.indentationOverride;
                    }
                }
            }

            return new IndentationInfo(prefix, level);
        }

        public GetEffectiveChildrenIndentation(indentResolver: ILineIndenationResolver): IndentationInfo {
            var node = this;
            var indentation: IndentationInfo = null;

            while (node.ChildrenIndentationDelta == null && node.Parent != null)
                node = node.Parent;

            if (node.ChildrenIndentationDelta != null) {
                indentation = node.GetEffectiveIndentation(indentResolver);
                indentation.Level += node.ChildrenIndentationDelta;
            }

            return indentation;
        }

        public GetEffectiveChildrenIndentationForComment(indentResolver: ILineIndenationResolver): IndentationInfo {
            var node = this;
            var indentation: IndentationInfo = null;

            while (node.ChildrenIndentationDelta == null && node.Parent != null)
                node = node.Parent;

            if (node.ChildrenIndentationDelta != null) {
                indentation = new IndentationInfo();
                indentation.Level = node.ChildrenIndentationDelta;

                if (this.AuthorNode.Details.Kind != AuthorParseNodeKind.apnkProg)
                    indentation.Prefix = indentResolver.GetLineIndentationForOffset(node.AuthorNode.Details.StartOffset);
            }

            return indentation;
        }

        public GetBlockSpan(fileAuthoringProxy: FileAuthoringProxy, tokens: IList_TokenSpan): Span {
            if (this.blockSpan != null)
                return this.blockSpan;

            // By default the block span is taken from the authornode details.
            var start = this.AuthorNode.Details.StartOffset;
            var end = this.AuthorNode.Details.EndOffset;

            //// Special cases for:
            //// 1. nodes which have implicit block (function & switch): We need to find the open block location
            //// 2. nodes which have explicit block node: We need to find the span for the block node

            var implicitBlockNode: ParseNode = null;
            if (this.AuthorNode.Details.Kind == AuthorParseNodeKind.apnkFncDecl ||
                this.AuthorNode.Details.Kind == AuthorParseNodeKind.apnkSwitch) {
                implicitBlockNode = this;
            }
            else if (this.AuthorNode.Details.Kind == AuthorParseNodeKind.apnkList &&
                     this.Parent != null && this.Parent.AuthorNode.Details.Kind == AuthorParseNodeKind.apnkFncDecl) {
                implicitBlockNode = this.Parent;
            }

            if (implicitBlockNode != null) {
                // If the token index is provided, use it to find the next open curly
                if (implicitBlockNode.TokenTagIndex != null) {
                    var functionTokenIndex = implicitBlockNode.TokenTagIndex;

                    // search for the open curly that belongs to the function
                    for (var i = functionTokenIndex + 1; i < tokens.count() ; i++) {
                        if (tokens.get(i).Token == AuthorTokenKind.atkLCurly && tokens.get(i).Span.startPosition() <= end) {
                            start = tokens.get(i).Span.startPosition();
                            break;
                        }
                    }
                }
                else {
                    // otherwise, use AST cursor to get the open curly location
                    var astCursor = fileAuthoringProxy.GetASTCursor();
                    //using (new ProxyReference(astCursor))
                    {
                        astCursor.MoveToEnclosingNode(implicitBlockNode.AuthorNode.Details.StartOffset, implicitBlockNode.AuthorNode.Details.EndOffset);
                        var leftCurlyPos = astCursor.GetNodeProperty(AuthorParseNodeProperty.apnpLCurlyMin);
                        if (leftCurlyPos != 0 && leftCurlyPos <= end) {
                            start = leftCurlyPos;
                        }
                    }
                }
            }
            else if (this.AuthorNode.Details.Kind != AuthorParseNodeKind.apnkBlock) {
                // For any node that is not block, find the block child and use its span
                var found = false;
                ParseNodeExtensions.GetChildren(this).foreach((child) => {
                    if (child.AuthorNode.Details.Kind == AuthorParseNodeKind.apnkBlock) {
                        if (!found) {
                            found = true;
                            start = child.AuthorNode.Details.StartOffset;
                            end = child.AuthorNode.Details.EndOffset;
                        }
                    }
                });
            }

            Debug.Assert(start <= end, "Expecting start to be before end.");

            this.blockSpan = new Span(start, end - start);
            return this.blockSpan;
        }

        public toString() {
            var text = this.AuthorNode.Level + ": " +
                (<any>AuthorParseNodeKind)._map[this.AuthorNode.Details.Kind] +
                " - " + (<any>TypeScript.NodeType)._map[this.AuthorNode.Details.nodeType] +
                " (" + (<any>AuthorParseNodeEdge)._map[this.AuthorNode.EdgeLabel] + ") -- I:" +
                this.IndentationDelta + ",IC:" + this.ChildrenIndentationDelta + " -- (" +
                this.AuthorNode.Details.StartOffset + "," + this.AuthorNode.Details.EndOffset + ") -- F:(" +
                this.AuthorNode.Details.Flags + ")";

            return text;
        }
    }
}
