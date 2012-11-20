// Copyright (c) Microsoft. All rights reserved. Licensed under the Apache License, Version 2.0. 
// See LICENSE.txt in the project root for complete license information.

/// <references path="formatting.ts"/>

module Formatting {
    export class FormattingContext {

        public contextNode: ParseNode;
        public tokenSpan: TokenSpan;
        public nextTokenSpan: TokenSpan;

        private contextNodeAllOnSameLine: bool;
        private tokensAreOnSameLine: bool;
        private tokensAreSiblingNodesOnSameLine: bool;

        constructor (
            private fileAuthoringProxy: FileAuthoringProxy,
            private snapshot: ITextSnapshot,
            private tokens: IList_TokenSpan,
            public formattingRequestKind: FormattingRequestKind) {

            this.contextNode = null;
            this.tokenSpan = null;
            this.nextTokenSpan = null;

            this.contextNodeAllOnSameLine = undefined;
            this.tokensAreOnSameLine = undefined;
            this.tokensAreSiblingNodesOnSameLine = undefined;

            Debug.Assert(this.snapshot != null, "snapshot is null");
            Debug.Assert(this.tokens != null, "tokens is null");
        }

        public findTokenAtPosition(position: number): TokenSpan {
            var index = Formatting.BinarySearch(this.tokens, position, (position: number, tokenSpan: TokenSpan) => {
                if (position < tokenSpan.Span.startPosition())
                    return -1;
                else if (position < tokenSpan.Span.endPosition())
                    return 0;
                else
                    return 1;
            });

            if (index < 0)
                return null;
            else
                return this.tokens.get(index);
        }

        public setContext(node: ParseNode, t1: TokenSpan, t2: TokenSpan) {
            Debug.Assert(node != null, "node is null");
            Debug.Assert(t1 != null, "t1 is null");
            Debug.Assert(t2 != null, "t2 is null");

            this.contextNode = node;
            this.tokenSpan = t1;
            this.nextTokenSpan = t2;

            this.contextNodeAllOnSameLine = undefined;
            this.tokensAreOnSameLine = undefined;
            this.tokensAreSiblingNodesOnSameLine = undefined;
        }

        public ContextNodeAllOnSameLine(): bool {
            if (this.contextNodeAllOnSameLine === undefined) {
                var blockSpan = this.contextNode.GetBlockSpan(this.fileAuthoringProxy, this.tokens);

                // If token at start of span is "{", but token at end of span is not a "}",
                // the parser went one token too far for us to be able to answer the "on same line question".
                // For example, code like this:
                //   function of1(b: { r: number;
                // The "}" token of the object type will be the token after the last ";", which is probably on the next line.
                //
                // Fix this by finding the token *before* the end token of the AST node
                var openToken = this.findTokenAtPosition(blockSpan.start());
                if (openToken != null && openToken.tokenID == TypeScript.TokenID.LCurly) {
                    var closeToken = this.findTokenAtPosition(blockSpan.end() - 1);
                    if (closeToken == null || closeToken.tokenID != TypeScript.TokenID.RCurly) {
                        //REVIEW: This could be more efficient... But this is safe and works with EOF token
                        for (var position = blockSpan.end() - 2; position > openToken.Span.endPosition(); position--) {
                            closeToken = this.findTokenAtPosition(position);
                            if (closeToken != null) {
                                blockSpan = Span.FromBounds(openToken.Span.startPosition(), closeToken.Span.endPosition());
                                break;
                            }
                        }
                    }
                }

                var startLine = this.snapshot.GetLineNumberFromPosition(blockSpan.start());
                var endLine = this.snapshot.GetLineNumberFromPosition(blockSpan.end());

                this.contextNodeAllOnSameLine = (startLine == endLine);
            }

            return this.contextNodeAllOnSameLine;
        }

        public TokensAreOnSameLine(): bool {
            if (this.tokensAreOnSameLine === undefined) {
                var startLine = this.tokenSpan.lineNumber();
                var endLine = this.nextTokenSpan.lineNumber();

                this.tokensAreOnSameLine = (startLine == endLine);
            }

            return this.tokensAreOnSameLine;
        }

        public TokensAreSiblingNodesOnSameLine(): bool {
            if (this.tokensAreSiblingNodesOnSameLine === undefined) {
                this.tokensAreSiblingNodesOnSameLine = this.AreTokensSiblingNodesOnSameLine();
            }

            return this.tokensAreSiblingNodesOnSameLine;
        }

        private AreTokensSiblingNodesOnSameLine(): bool {
            if (this.contextNode.children() == null || this.contextNode.children().count() < 2)
                return false;

            var current: ParseNode = null;
            var sibling: ParseNode = null;

            // Find the node that matches the next token
            var nodeIndex = ParseNodeExtensions.TryFindNodeIndexForStartOffset(this.contextNode.children(), this.nextTokenSpan.Span.startPosition());
            if (nodeIndex < 0)
                return false;
            sibling = this.contextNode.children().get(nodeIndex);

            // Find the self node starting looking backward from the sibling index
            for (var i = nodeIndex - 1; i >= 0; --i) {
                var child: ParseNode = this.contextNode.children().get(i);
                if (child.AuthorNode.Details.EndOffset == this.tokenSpan.Span.endPosition()) {
                    current = child;
                    break;
                }
            }

            if (current == null)
                return false;

            var startLine = this.snapshot.GetLineNumberFromPosition(current.AuthorNode.Details.EndOffset);
            var endLine = this.snapshot.GetLineNumberFromPosition(sibling.AuthorNode.Details.StartOffset);

            return startLine == endLine;
        }
    }
}