// Copyright (c) Microsoft. All rights reserved. Licensed under the Apache License, Version 2.0. 
// See LICENSE.txt in the project root for complete license information.

/// <references path="formatting.ts"/>

module Formatting {
    export class SmartIndentTask {

        private snapshot: ITextSnapshot;
        public DesiredIndentation: string;

        constructor(
            private logger: TypeScript.ILogger,
            private snapshotSpan: SnapshotSpan,
            private tokens: IList_TokenSpan,
            private fileAuthoringProxy: FileAuthoringProxy,
            private editorOptions: Services.EditorOptions,
            private languageHostIndentation: string) {

            this.snapshot = this.snapshotSpan.snapshot;
            this.DesiredIndentation = null;
        }

        public Run(): void {
            var tree: ParseTree = TypeScript.timeFunction(this.logger, "SmartIndentTask: new ParseTree()", () => {
                return new ParseTree(this.fileAuthoringProxy, this.snapshotSpan.span, null, true);
            });

            if (tree.Root == null)
                return;

            IndentationEdgeFinder.FillIndentationLevels(tree.Root);

            ParseTree.DumpTree(this.logger, tree.Root);
            this.FindIndentation(tree);
        }

        private FindIndentation(tree: ParseTree): void {
            var caretSpan = this.snapshotSpan.span;
            var context = ParseTree.FindCommonParentNode(caretSpan, caretSpan, tree.Root);

            // The context should never point to the beginning of a node. If this happened then we are pointing to the next node
            // as opposed to the parent node, so move to the parent since we are interested in children indentation.
            // The only exception is when the node points to a non-synthetic block, since { should be indented based on the block not the parent
            while (context != null &&
                context.AuthorNode.Details.StartOffset == caretSpan.start() &&
                !(context.AuthorNode.Details.Kind == AuthorParseNodeKind.apnkBlock && context.AuthorNode.Details.Flags != AuthorParseNodeFlags.apnfSyntheticNode)) {
                context = context.Parent;
            }

            if (context == null)
                return;

            var firstToken = FirstOrDefault(this.tokens, (item) => true);
            if (firstToken == null) {
                // Nothing on the line, assume we have a semicolon
                firstToken = new TokenSpan(AuthorTokenKind.atkSColon, TypeScript.TokenID.SColon, this.snapshotSpan);
            }
            else if (firstToken.Token != AuthorTokenKind.atkElse &&
                         firstToken.Token != AuthorTokenKind.atkWhile &&
                         firstToken.Token != AuthorTokenKind.atkLCurly &&
                         firstToken.Token != AuthorTokenKind.atkRCurly) {
                firstToken = new TokenSpan(AuthorTokenKind.atkSColon, TypeScript.TokenID.SColon, this.snapshotSpan);
            }

            if (this.CanDoSmartIndent(context, { token: firstToken })) {
                var indenter = new Indenter(this.logger, tree, this.snapshot, this.languageHostIndentation, this.editorOptions, firstToken, true);
                var edit = FirstOrDefault(indenter.GetIndentationEdits(firstToken, null, context, true), (item) => true);
                if (edit != null) {
                    this.DesiredIndentation = edit.ReplaceWith;
                }
            }
        }

        private CanDoSmartIndent(context: ParseNode, firstToken: { token: TokenSpan; }): bool {
            var node = context;

            // Find the closest node traversing up that has children indentation defined
            while (node != null && node.ChildrenIndentationDelta == null)
                node = node.Parent;

            if (node == null)
                return false;


            if (Rules.IsTypeScriptDeclWithBlockContextNode(node)) {
                return this.CanDoSmartIndentInStatementWithBlock(node, firstToken);
            }

            if (node.AuthorNode.Details.ast != null) {
                switch (node.AuthorNode.Details.ast.nodeType) {
                    case TypeScript.NodeType.Import:
                        // only smart indent on the first line
                        return this.CanDoSmartIndentInStatement(node);
                }
            }

            switch (node.AuthorNode.Details.Kind) {
                case AuthorParseNodeKind.apnkAsg:
                case AuthorParseNodeKind.apnkAsgAdd:
                case AuthorParseNodeKind.apnkAsgSub:
                case AuthorParseNodeKind.apnkAsgMul:
                case AuthorParseNodeKind.apnkAsgDiv:
                case AuthorParseNodeKind.apnkAsgMod:
                case AuthorParseNodeKind.apnkAsgAnd:
                case AuthorParseNodeKind.apnkAsgXor:
                case AuthorParseNodeKind.apnkAsgOr:
                case AuthorParseNodeKind.apnkAsgLsh:
                case AuthorParseNodeKind.apnkAsgRsh:
                case AuthorParseNodeKind.apnkAsgRs2:
                case AuthorParseNodeKind.apnkVarDecl:
                case AuthorParseNodeKind.apnkVarDeclList:
                case AuthorParseNodeKind.apnkCall:
                case AuthorParseNodeKind.apnkArray:
                case AuthorParseNodeKind.apnkMember:
                    // only smart indent on the first line
                    return this.CanDoSmartIndentInStatement(node);

                case AuthorParseNodeKind.apnkFor:
                    // treat the expressions inside (...) as statement and only indent the first line
                    return this.CanDoSmartIndentInFor(node);

                case AuthorParseNodeKind.apnkFncDecl:
                    // 1. treat arguments list as statement and only indent the first line
                    // 2. only block indent if the user didn't type the open curly
                    return this.CanDoSmartIndentInFunction(node, firstToken);

                case AuthorParseNodeKind.apnkTry:
                case AuthorParseNodeKind.apnkFinally:
                    return this.CanDoSmartIndentInStatementWithBlock(node, firstToken);

                case AuthorParseNodeKind.apnkCatch:
                case AuthorParseNodeKind.apnkSwitch:
                    return this.CanDoSmartIndentInStatementWithParenAndBlock(node, firstToken);

                default:
                    return true;
            }
        }

        private  CanDoSmartIndentInStatement(node: ParseNode): bool {
            var contextLine = this.snapshot.GetLineNumberFromPosition(node.AuthorNode.Details.StartOffset);
            var newLine = this.snapshot.GetLineNumberFromPosition(this.snapshotSpan.startPosition());
            return SmartIndentTask.IsEmptyRegion(this.snapshot, contextLine + 1, newLine - 1);
        }

        private  CanDoSmartIndentInFunction(node: ParseNode, firstToken: { token: TokenSpan; }): bool {
            var astCursor = this.fileAuthoringProxy.GetASTCursor();
            //using (new ProxyReference(astCursor))
            {
                astCursor.SeekToOffset(node.AuthorNode.Details.StartOffset, false);
                var rightParenPos = astCursor.GetNodeProperty(AuthorParseNodeProperty.apnpRParenMin);

                // only smart indent on the first line if we are inside the paren section
                if (rightParenPos == 0 || this.snapshotSpan.startPosition() <= rightParenPos) {
                    return this.CanDoSmartIndentInStatement(node);
                }

                // If there is no open curly, don't smart indent
                var leftCurlyPos = astCursor.GetNodeProperty(AuthorParseNodeProperty.apnpLCurlyMin);
                if (leftCurlyPos == 0 || this.snapshotSpan.startPosition() <= leftCurlyPos) {
                    // Assume the first token is an open curly so it will get indented correctly based on the function
                    firstToken = { token: new TokenSpan(AuthorTokenKind.atkLCurly, TypeScript.TokenID.LCurly, this.snapshotSpan) };
                }

                return true;
            }
        }

        private  CanDoSmartIndentInStatementWithBlock(node: ParseNode, firstToken: { token: TokenSpan; }): bool {
            var astCursor = this.fileAuthoringProxy.GetASTCursor();
            //using (new ProxyReference(astCursor))
            {
                astCursor.SeekToOffset(node.AuthorNode.Details.StartOffset, false);

                var leftCurlyPos = astCursor.GetNodeProperty(AuthorParseNodeProperty.apnpLCurlyMin);
                if (leftCurlyPos == 0 || this.snapshotSpan.startPosition() <= leftCurlyPos) {
                    // Assume the first token is an open curly so it will get indented correctly based on the statement
                    firstToken = { token: new TokenSpan(AuthorTokenKind.atkLCurly, TypeScript.TokenID.LCurly, this.snapshotSpan) };
                }

                return true;
            }
        }

        private  CanDoSmartIndentInStatementWithParenAndBlock(node: ParseNode, firstToken: { token: TokenSpan; }): bool {
            var astCursor = this.fileAuthoringProxy.GetASTCursor();
            //using (new ProxyReference(astCursor))
            {
                astCursor.SeekToOffset(node.AuthorNode.Details.StartOffset, false);

                var rightParenPos = astCursor.GetNodeProperty(AuthorParseNodeProperty.apnpRParenMin);
                var leftCurlyPos = astCursor.GetNodeProperty(AuthorParseNodeProperty.apnpLCurlyMin);
                if (rightParenPos > 0 && this.snapshotSpan.startPosition() > rightParenPos && (leftCurlyPos == 0 || this.snapshotSpan.startPosition() <= leftCurlyPos)) {
                    // Assume the first token is an open curly so it will get indented correctly based on the statement
                    firstToken = { token: new TokenSpan(AuthorTokenKind.atkLCurly, TypeScript.TokenID.LCurly, this.snapshotSpan) };
                }

                return true;
            }
        }

        private CanDoSmartIndentInFor(node: ParseNode): bool {
            var astCursor = this.fileAuthoringProxy.GetASTCursor();
            //using (new ProxyReference(astCursor))
            {
                astCursor.SeekToOffset(node.AuthorNode.Details.StartOffset, false);
                var rightParenPos = astCursor.GetNodeProperty(AuthorParseNodeProperty.apnpRParenMin);

                // only smart indent on the first line if we are inside the paren section
                if (rightParenPos == 0 || this.snapshotSpan.startPosition() <= rightParenPos) {
                    return this.CanDoSmartIndentInStatement(node);
                }

                return true;
            }
        }

        static IsEmptyRegion(snapshot: ITextSnapshot, startLine: number, endLine: number): bool {
            var empty = true;

            var lineNum = startLine;
            while (lineNum <= endLine) {
                var line = snapshot.GetLineFromLineNumber(lineNum);
                var lineText = line.getText();
                if (!IsEmptyString(lineText)) {
                    empty = false;
                    break;
                }

                lineNum++;
            }

            return empty;
        }

        static IsEmptyString(lineText: string): bool {
            for (var i = 0, len = lineText.length; i < len; i++) {
                if (!EditorUtilities.IsWhitespace(lineText.charCodeAt(i)))
                    return false;
            }

            return true;
        }
    }
}
