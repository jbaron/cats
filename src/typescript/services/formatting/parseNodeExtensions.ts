// Copyright (c) Microsoft. All rights reserved. Licensed under the Apache License, Version 2.0. 
// See LICENSE.txt in the project root for complete license information.

///<reference path='formatting.ts' />


//module EditorAbstractions {
module Formatting {
    export class ParseNodeExtensions {
        static GetChildren(node: ParseNode): List_ParseNode {
            if (node == null || node.children() == null)
                return new List_ParseNode();

            return node.children();
        }

        static FindChildrenWithEdge(node: ParseNode, edge: AuthorParseNodeEdge): List_ParseNode {
            var result = new List_ParseNode();
            GetChildren(node).foreach((item) => {
                if (item.AuthorNode.EdgeLabel == edge) {
                    result.add(item);
                }
            });
            return result;
        }

        static FindChildWithEdge(node: ParseNode, edge: AuthorParseNodeEdge): ParseNode {
            return FirstOrDefault(GetChildren(node).Where((c) => { return c.AuthorNode.EdgeLabel == edge; }), () => { return true; });
        }

        static ForAllChildren(node: ParseNode, action: (item: ParseNode) => void ) {
            GetChildren(node).foreach(action);
        }

        static comparer(position: number, item: ParseNode): number {
            return position - item.AuthorNode.Details.StartOffset;
        }

        static findNodeInsertionPivot(nodes: IList_ParseNode, startOffset: number): number {
            if (nodes.count() == 0)
                return 0;

            return BinarySearch(nodes, startOffset, ParseNodeExtensions.comparer);
        }

        static TryFindNodeIndexForStartOffset(nodes: IList_ParseNode, startOffset: number): number/*?*/ {
            var targetNodeIndex = -1;
            if (nodes.count() > 0) {
                var pivot = BinarySearch(nodes, startOffset, comparer);
                if (pivot < 0) {
                    pivot = ~pivot - 1;
                    targetNodeIndex = pivot;
                }
                else {
                    targetNodeIndex = pivot;
                }
            }

            return targetNodeIndex;
        }

        static TryFindNodeForSpan(nodes: IList_ParseNode, span: Span): ParseNode {
            var nodeIndex = TryFindNodeIndexForStartOffset(nodes, span.start());

            if (nodeIndex >= 0 && nodeIndex < nodes.count()) {
                var node = nodes.get(nodeIndex);
                if (node.CoverSpan(span)) {
                    return node;
                }
            }

            return null;
        }

        static SetNodeSpan(node: ParseNode, newStartOffset: number, newEndOffset: number): void
        {
            var authorParseNode = node.AuthorNode;
            if (newStartOffset != authorParseNode.Details.StartOffset || newEndOffset != authorParseNode.Details.EndOffset) {
                var newAuthorNode = new AuthorParseNode();
                newAuthorNode.Details = new AuthorParseNodeDetails()
                newAuthorNode.Details.StartOffset = newStartOffset;
                newAuthorNode.Details.EndOffset = newEndOffset;
                newAuthorNode.Details.Flags = authorParseNode.Details.Flags;
                newAuthorNode.Details.Kind = authorParseNode.Details.Kind;
                newAuthorNode.Details.nodeType = authorParseNode.Details.nodeType;
                newAuthorNode.Details.ast = authorParseNode.Details.ast;
                newAuthorNode.EdgeLabel = authorParseNode.EdgeLabel;
                newAuthorNode.Label = authorParseNode.Label;
                newAuthorNode.Level = authorParseNode.Level;
                newAuthorNode.Name = authorParseNode.Name;

                node.AuthorNode = newAuthorNode;
            }
        }
    }
}
