// Copyright (c) Microsoft. All rights reserved. Licensed under the Apache License, Version 2.0. 
// See LICENSE.txt in the project root for complete license information.

///<reference path='formatting.ts' />


//module EditorAbstractions {
module Formatting {
    export class ParseTree {

        public Root: ParseNode;

        // While not technically attributes of a tree, these exist as a convenience.
        public StartNodeSelf: ParseNode;
        public StartNodePreviousSibling: AuthorParseNode;

        constructor(fileAuthoringProxy: FileAuthoringProxy, span: Span, tokens: IList_TokenSpan, onlySelfAndAncestors: bool) {

            // While not technically attributes of a tree, these exist as a convenience.
            this.StartNodeSelf = null;
            this.StartNodePreviousSibling /*?*/ = null;

            // Restrict the span to only the important tokens eliminating spaces, comments, semicolons, and commas
            if (tokens != null) {
                // Find the first token which belongs to the span
                var firstToken = FirstOrDefault(tokens, (t) => { return t.Span.startPosition() >= span.start() && t.Token != AuthorTokenKind.atkComment && t.Token != AuthorTokenKind.atkSColon && t.Token != AuthorTokenKind.atkComma });
                if (firstToken != null) {
                    var firstTokenStart = firstToken.Span.Start;

                    // Find the last token which belongs to the span
                    var lastToken = LastOrDefault(tokens, (t) => { return t.Span.endPosition() <= span.end() && t.Token != AuthorTokenKind.atkComment && t.Token != AuthorTokenKind.atkSColon && t.Token != AuthorTokenKind.atkComma });
                    if (lastToken != null) {
                        var lastTokenEnd = lastToken.Span.End;

                        if (firstTokenStart < lastTokenEnd) {
                            span = new Span(firstTokenStart, lastTokenEnd - firstTokenStart);
                        }
                    }
                }
            }

            this.Initialize(fileAuthoringProxy, span, onlySelfAndAncestors);
        }

        static FindCommonParentNode(leftSpan: Span, rightSpan: Span, context: ParseNode): ParseNode {
            if (context.CoverSpan(leftSpan) && context.CoverSpan(rightSpan)) {
                Debug.Assert(leftSpan.start() <= rightSpan.start(), "left token should be before the right token");

                if (context.children() != null) {
                    var child: ParseNode = ParseNodeExtensions.TryFindNodeForSpan(context.children(), leftSpan);
                    if (child != null && child.CoverSpan(rightSpan)) {
                        // The child covers both spans, check the child recursively
                        return FindCommonParentNode(leftSpan, rightSpan, child);
                    }
                }

                // None of the children cover both spans, so the context is the common context
                return context;
            }
            else {
                if (context.Parent == null) {
                    // No parent. The context is the root node and the common node
                    return context;
                }
                else {
                    // Check the parent
                    return FindCommonParentNode(leftSpan, rightSpan, context.Parent);
                }
            }
        }

        private Initialize(fileAuthoringProxy: FileAuthoringProxy, span: Span, onlySelfAndAncestors: bool): void
        {
            var astCursor = fileAuthoringProxy.GetASTCursor();

            //TypeScript: using (new ProxyReference(astCursor))
            {
                if (span.length() == 0)
                    astCursor.SeekToOffset(span.start(), /*excludeEndOffset*/false);
                else
                    astCursor.MoveToEnclosingNode(span.start(), span.end());

                // Get self-and-descendant nodes
                var selfAndDescendantsNodes = new List_ParseNode();
                var parseNodeSet = astCursor.GetSubTree(onlySelfAndAncestors ? 0 : -1);

                //TypeScript: using (new ProxyReference(parseNodeSet))
                {
                    if (parseNodeSet.Count() > 0) {
                        var authorNodes = parseNodeSet.GetItems(0, parseNodeSet.Count());

                        // The firstnode always have an edge of apneNone. Make sure we get the right edge relation to its parent
                        if (authorNodes[0].Details.Kind != AuthorParseNodeKind.apnkEndCode) {
                            var nodeEdge = astCursor.GetEdgeLabel();
                            if (nodeEdge != AuthorParseNodeEdge.apneNone) {
                                var newAuthorNode = new AuthorParseNode();
                                newAuthorNode.Level = 0;
                                newAuthorNode.Label = authorNodes[0].Label;
                                newAuthorNode.Name = authorNodes[0].Name;
                                newAuthorNode.Details = authorNodes[0].Details;
                                newAuthorNode.EdgeLabel = nodeEdge;

                                authorNodes[0] = newAuthorNode;
                            }
                        }

                        authorNodes.forEach((authorParseNode) => {
                            var node = new ParseNode();
                            node.AuthorNode = authorParseNode;
                            selfAndDescendantsNodes.add(node);
                        });

                        ParseTree.AdjustNodeSpanIfNeeded(astCursor, selfAndDescendantsNodes.get(0));
                    }
                }

                this.StartNodeSelf = ParseTree.FindStartSelfNode(selfAndDescendantsNodes, span);

                // Get all ancestor nodes up to the root
                var nodeLevel = 0;
                var ancestorNodes = new List_ParseNode();
                var ancestorNodeDetails = astCursor.MoveUp();

                // Before getting all ancestors, get the sibiling node
                if (!onlySelfAndAncestors && this.StartNodeSelf != null) {
                    if (this.StartNodeSelf.AuthorNode.Level > 0) {
                        // Since the "self" node is actually a descendant of the current, enclosing node,
                        // a previous sibling, if one exists, must also be.
                        for (var i = selfAndDescendantsNodes.count() - 1; i >= 0; --i) {
                            var sibling = selfAndDescendantsNodes.get(i).AuthorNode;

                            if (sibling.Level == this.StartNodeSelf.AuthorNode.Level &&
                                ParseTree.IsSiblingEdge(sibling.EdgeLabel) &&
                                sibling.Details.EndOffset < this.StartNodeSelf.AuthorNode.Details.StartOffset) {
                                this.StartNodePreviousSibling = sibling;
                                break;
                            }
                        }
                    }
                    else if (this.StartNodeSelf.AuthorNode.Level == 0) {
                        // Otherwise get the sibling from the cursor.
                        // We don't need a full subtree, just enough to get siblings.
                        parseNodeSet = astCursor.GetSubTree(2);

                        //TypeScript: using (new ProxyReference(parseNodeSet))
                        {
                            if (parseNodeSet.Count() > 0) {
                                var nodes = parseNodeSet.GetItems(0, parseNodeSet.Count());

                                var previousSibling = ParseTree.GetPreviousSibling(this.StartNodeSelf.AuthorNode, nodes);

                                if (previousSibling !== null) {
                                    this.StartNodePreviousSibling = previousSibling;
                                }
                            }
                        }
                    }
                }

                while (ancestorNodeDetails.Kind != AuthorParseNodeKind.apnkEmptyNode) {
                    var nodeEdge = astCursor.GetEdgeLabel();
                    var node = new ParseNode();
                    node.AuthorNode = new AuthorParseNode();
                    node.AuthorNode.Details = ancestorNodeDetails;
                    node.AuthorNode.Level = --nodeLevel;
                    node.AuthorNode.EdgeLabel = nodeEdge;
                    ParseTree.AdjustNodeSpanIfNeeded(astCursor, node);
                    ancestorNodes.add(node);
                    ancestorNodeDetails = astCursor.MoveUp();
                }

                // Insert ancestors nodes at the beginning of the list, in reverse order, so that the root
                // is first in the list.
                for (var i = 0; i < ancestorNodes.count() ; i++) {
                    selfAndDescendantsNodes.insert(0, ancestorNodes.get(i));
                }
                this.Root = ParseTree.BuildTree(selfAndDescendantsNodes);
            }
        }

        static GetPreviousSibling(startNodeSelf: AuthorParseNode, nodes: AuthorParseNode[]): AuthorParseNode {
            var previousSibling: AuthorParseNode = null;
            var siblingLevel = -1;

            var i = nodes.length - 1;
            for (; i > 0; i--) {
                if (nodes[i].Details.Equals(startNodeSelf.Details)) {
                    siblingLevel = nodes[i].Level;
                    break;
                }
            }

            for (; i > 0; i--) {
                var node = nodes[i];
                if (node.Level == siblingLevel
                    && IsSiblingEdge(node.EdgeLabel)
                    && node.Details.EndOffset < startNodeSelf.Details.StartOffset) {
                    previousSibling = node;
                    break;
                }
            }

            return previousSibling;
        }

        static FindStartSelfNode(selfAndDescendantsNodes: IList_ParseNode, span: Span): ParseNode {
            var candidateNodes: IList_ParseNode = selfAndDescendantsNodes.Where((node) => {
                return node.AuthorNode.Details.StartOffset >= span.start() &&
                       node.AuthorNode.Details.StartOffset < span.end()
            });

            if (candidateNodes.count() == 0)
                return FirstOrDefault(selfAndDescendantsNodes, () => { return true; });

            // The first node after the span is the startSelfNode.
            return candidateNodes.get(0);
        }

        static IsSiblingEdge(edge: AuthorParseNodeEdge): bool {
            return edge == AuthorParseNodeEdge.apneArgument ||
                   edge == AuthorParseNodeEdge.apneListItem ||
                   edge == AuthorParseNodeEdge.apneMember;
        }

        static BuildTree(parseNodes: IList_ParseNode): ParseNode {
            var nodesEnumerator = parseNodes.GetEnumerator();
            if (!nodesEnumerator.MoveNext())
                return null;

            var root: ParseNode = nodesEnumerator.Current();

            var lastNode = root;
            lastNode.Parent = null;
            var lastLevel = lastNode.AuthorNode.Level;

            while (nodesEnumerator.MoveNext()) {
                var currentNode = nodesEnumerator.Current();

                if (currentNode.AuthorNode.Level == lastLevel) {
                    // add as a sibling
                    currentNode.Parent = lastNode.Parent;

                    lastNode.Parent.addChildNode(currentNode);
                    lastNode = currentNode;
                }
                else if (currentNode.AuthorNode.Level > lastLevel) {
                    // add as a child
                    currentNode.Parent = lastNode;
                    lastNode.addChildNode(currentNode);

                    lastNode = currentNode;
                    lastLevel = currentNode.AuthorNode.Level;
                }
                else {
                    // move up and add as a sibling
                    //DEBUG: var tempLevel = lastLevel;
                    //DEBUG: var tempLastNode = lastNode;
                    while (lastLevel > currentNode.AuthorNode.Level) {
                        lastNode = lastNode.Parent;
                        lastLevel--;
                    }

                    //DEBUG: Debug.Assert(lastNode !== null, "Last node should not be null, node levels are probably not correctly initialized.");

                    // add as a sibling
                    currentNode.Parent = lastNode.Parent;

                    lastNode.Parent.addChildNode(currentNode);
                    lastNode = currentNode;
                }
            }

            return root;
        }

        static DumpTree(logger: TypeScript.ILogger, parseNode: ParseNode): void
        {
            if (logger.information()) {
                var text: string = "";

                for (var i = -2; i <= parseNode.AuthorNode.Level; i++) {
                    text += " ";
                }
                text += parseNode.toString();

                logger.log(text);

                ParseNodeExtensions.GetChildren(parseNode).foreach((child) => { DumpTree(logger, child); });
            }
        }


        ///// <summary>
        ///// This handles the case:
        /////      return (
        /////              function() {
        /////              })
        ///// The given function's node indicates that the function starts directly after "return (".
        ///// In this case, we adjust the span of the function from the node properties.
        ///// The same applies to objects and arrays.
        ///// This is done here only for the nodes that we traverse up. It's also done in Indenter
        ///// for the nodes that we have tokens for.
        ///// </summary>
        ///// <param name="astCursor">The node current cursor</param>
        ///// <param name="node">The PareNode object</param>
        static AdjustNodeSpanIfNeeded(astCursor: IAuthorParseNodeCursor, node: ParseNode): void
        {
            var propertyToGetStart: AuthorParseNodeProperty = null;
            var propertyToGetEnd: AuthorParseNodeProperty = null;
            var authorParseNode = node.AuthorNode;

            if (authorParseNode.Details.Kind == AuthorParseNodeKind.apnkObject) {
                propertyToGetStart = AuthorParseNodeProperty.apnpLCurlyMin;
                propertyToGetEnd = AuthorParseNodeProperty.apnpRCurlyMin;
            }
            else if (authorParseNode.Details.Kind == AuthorParseNodeKind.apnkArray) {
                propertyToGetStart = AuthorParseNodeProperty.apnpLBrackMin;
                propertyToGetEnd = AuthorParseNodeProperty.apnpRBrackMin;
            }
            else if (authorParseNode.Details.Kind == AuthorParseNodeKind.apnkFncDecl) {
                propertyToGetStart = AuthorParseNodeProperty.apnpFunctionKeywordMin;
                propertyToGetEnd = AuthorParseNodeProperty.apnpRCurlyMin;
            }

            if (propertyToGetStart != null && propertyToGetEnd != null) {
                var newStartOffset = astCursor.GetNodeProperty(propertyToGetStart);
                if (newStartOffset == 0)
                    newStartOffset = node.AuthorNode.Details.StartOffset;

                var newEndOffset = astCursor.GetNodeProperty(propertyToGetEnd);
                if (newEndOffset == 0)
                    newEndOffset = node.AuthorNode.Details.EndOffset;
                else
                    newEndOffset += 1;  // we need this to point to after the token. All the cases above the end token is one character

                ParseNodeExtensions.SetNodeSpan(node, newStartOffset, newEndOffset);
            }
        }
    }
}
