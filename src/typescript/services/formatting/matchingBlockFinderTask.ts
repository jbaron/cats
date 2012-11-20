// Copyright (c) Microsoft. All rights reserved. Licensed under the Apache License, Version 2.0. 
// See LICENSE.txt in the project root for complete license information.

///<reference path='formatting.ts' />

module Formatting {
    /// <summary>
    /// This task finds the span for the block of code that belongs to the provided brace point.
    /// It's used mainly to find the span of text that we need to format when typing the closing brace.
    /// </summary>
    export class MatchingBlockFinderTask {
        constructor(private bracePoint: SnapshotPoint, private FileAuthoringProxy: FileAuthoringProxy) {
        }

        public Run(): Span {
            var parseCursor = this.FileAuthoringProxy.GetASTCursor();
            parseCursor.SeekToOffset(this.bracePoint.position, true);
            return this.FindMatchingBlockSpan(parseCursor);
        }

        private FindMatchingBlockSpan(parser: IAuthorParseNodeCursor): Span {
            var currentNode = parser.Current();

            while (currentNode.Kind != AuthorParseNodeKind.apnkEmptyNode) {
                if (currentNode.ast != null) {
                    //TypeScript:
                    switch (currentNode.ast.nodeType) {
                        case TypeScript.NodeType.Interface:
                        case TypeScript.NodeType.Class:
                        case TypeScript.NodeType.Module:
                            return Span.FromBounds(currentNode.ast.minChar, currentNode.ast.limChar);

                        case TypeScript.NodeType.Import:
                            return new Span(currentNode.StartOffset, currentNode.EndOffset - currentNode.StartOffset);
                    }
                }

                switch (currentNode.Kind) {
                    case AuthorParseNodeKind.apnkProg:
                        return null;

                    case AuthorParseNodeKind.apnkVarDecl:
                    case AuthorParseNodeKind.apnkSwitch:
                    case AuthorParseNodeKind.apnkCase:
                    case AuthorParseNodeKind.apnkDefaultCase:
                    case AuthorParseNodeKind.apnkTry:
                    case AuthorParseNodeKind.apnkCatch:
                    case AuthorParseNodeKind.apnkFinally:
                    case AuthorParseNodeKind.apnkIf:
                    case AuthorParseNodeKind.apnkFor:
                    case AuthorParseNodeKind.apnkForIn:
                    case AuthorParseNodeKind.apnkWhile:
                    case AuthorParseNodeKind.apnkDoWhile:
                    case AuthorParseNodeKind.apnkWith:
                    case AuthorParseNodeKind.apnkCall:
                    case AuthorParseNodeKind.apnkReturn:
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
                        return new Span(currentNode.StartOffset, currentNode.EndOffset - currentNode.StartOffset);

                    case AuthorParseNodeKind.apnkBlock:
                        if ((currentNode.Flags & AuthorParseNodeFlags.apnfSyntheticNode) != AuthorParseNodeFlags.apnfSyntheticNode) {
                            var parent = parser.Parent();
                            switch (parent.Kind) {
                                case AuthorParseNodeKind.apnkBlock:
                                case AuthorParseNodeKind.apnkList:
                                    return new Span(currentNode.StartOffset, currentNode.EndOffset - currentNode.StartOffset);
                            }
                        }

                        currentNode = parser.MoveUp();
                        continue;

                    case AuthorParseNodeKind.apnkFncDecl:
                        {
                            // Special handling for the case when function is inside a return
                            var start = parser.GetNodeProperty(AuthorParseNodeProperty.apnpFunctionKeywordMin);
                            start = (start == 0) ? currentNode.StartOffset : start;

                            var end = parser.GetNodeProperty(AuthorParseNodeProperty.apnpRCurlyMin);
                            end = (end == 0) ? currentNode.EndOffset : end + 1;

                            return new Span(start, end - start);
                        }

                    case AuthorParseNodeKind.apnkObject:
                        {
                            // Special handling for the case when object is inside a return
                            var start = parser.GetNodeProperty(AuthorParseNodeProperty.apnpLCurlyMin);
                            start = (start == 0) ? currentNode.StartOffset : start;

                            var end = parser.GetNodeProperty(AuthorParseNodeProperty.apnpRCurlyMin);
                            end = (end == 0) ? currentNode.EndOffset : end + 1;

                            return new Span(start, end - start);
                        }

                    default:
                        currentNode = parser.MoveUp();
                        continue;
                }
            }

            return null;
        }
    }
}