// Copyright (c) Microsoft. All rights reserved. Licensed under the Apache License, Version 2.0. 
// See LICENSE.txt in the project root for complete license information.

///<reference path='formatting.ts' />


module Formatting {
    export class IndentationEdgeFinder {
        /// <summary>
        /// This method marks all the nodes that can be indented in the tree with their indentation value.
        /// </summary>
        /// 
        /// <param name="node">The root node</param>
        static FillIndentationLevels(node: ParseNode): void
        {
            var nodeStack = new Stack_ParseNode();

            nodeStack.Push(node);

            while (nodeStack.Count() > 0) {
                FillIndentationLevels2(nodeStack.Pop(), nodeStack);
            }
        }

        static FillBodyIndentation(node: ParseNode, nextNodesToVisit: Stack_ParseNode): void {
            node.IsIndentationOverrideEdge = true;
            node.ChildrenIndentationDelta = 1;

            ParseNodeExtensions.ForAllChildren(
                ParseNodeExtensions.FindChildWithEdge(node, AuthorParseNodeEdge.apneBody), function (child) {
                    if (child.AuthorNode.Details.Kind != AuthorParseNodeKind.apnkEndCode)
                        child.IndentationDelta = 1;

                    nextNodesToVisit.Push(child);
                });
        }

        static FillIndentationLevels2(node: ParseNode, nextNodesToVisit: Stack_ParseNode): void
        {
            //TypeScript specific
            switch (node.AuthorNode.Details.nodeType) {
                case TypeScript.NodeType.Module:
                case TypeScript.NodeType.Class:
                case TypeScript.NodeType.Interface:
                    FillBodyIndentation(node, nextNodesToVisit);
                    // Still visit all children. This covers for example right hand of assignments and functions declared in arguments for function calls
                    ParseNodeExtensions.ForAllChildren(node, (child) => { nextNodesToVisit.Push(child); });
                    return;

                case TypeScript.NodeType.Import:
                    node.ChildrenIndentationDelta = 1;
                    // Still visit all children. This covers for example right hand of assignments and functions declared in arguments for function calls
                    ParseNodeExtensions.ForAllChildren(node, (child) => { nextNodesToVisit.Push(child); });
                    return;
            }

            switch (node.AuthorNode.Details.Kind) {
                case AuthorParseNodeKind.apnkProg:
                    {
                        // Program itself is not indented.
                        node.IndentationDelta = 0;
                        node.ChildrenIndentationDelta = 0;

                        // Program children are not indented.
                        var child = ParseNodeExtensions.FindChildWithEdge(node, AuthorParseNodeEdge.apneBody)
                        ParseNodeExtensions.ForAllChildren(child, (child) => {
                            child.IndentationDelta = 0;
                            child.ChildrenIndentationDelta = 0;
                            nextNodesToVisit.Push(child);
                        });
                    }
                    break;

                case AuthorParseNodeKind.apnkBlock:
                    {
                        // Indent content of block
                        // {
                        //      statement;
                        // }
                        if ((node.AuthorNode.Details.Flags & AuthorParseNodeFlags.apnfSyntheticNode) != AuthorParseNodeFlags.apnfSyntheticNode) {
                            // Real block
                            FillIndentationEdgesForBlock(node, /*childrenLevel:*/ 1);
                        }
                        else {
                            // virtual block, still check its children.  Note, must do this one recursively, see below comment.
                            ParseNodeExtensions.ForAllChildren(node, function (child) { FillIndentationLevels(child); });

                            // virtual block should have no indentation. Reset it after calling the children, in case a child
                            // needs to know where its parent stands, i.e., in the cases of try/catch/finally
                            node.IndentationDelta = null;
                            node.ChildrenIndentationDelta = null;
                        }
                    }
                    break;

                case AuthorParseNodeKind.apnkFncDecl:
                    {
                        // Indent function body
                        // function foo() {
                        //      statement;
                        // }
                        FillBodyIndentation(node, nextNodesToVisit);
                    }
                    break;

                case AuthorParseNodeKind.apnkSwitch:
                    {
                        // Indent all cases
                        // switch (a) {
                        //      case 1: 
                        //      default:
                        // }
                        node.ChildrenIndentationDelta = 1;

                        // cases
                        var col = ParseNodeExtensions.GetChildren(node).Where((c) => {
                            return c.AuthorNode.EdgeLabel == AuthorParseNodeEdge.apneCase ||
                                 c.AuthorNode.EdgeLabel == AuthorParseNodeEdge.apneDefaultCase
                        });
                        col.foreach((caseNode) => {
                            caseNode.IndentationDelta = 1;
                            caseNode.ChildrenIndentationDelta = 1;
                            nextNodesToVisit.Push(caseNode);
                        });
                    }
                    break;

                case AuthorParseNodeKind.apnkCase:
                case AuthorParseNodeKind.apnkDefaultCase:
                    {
                        // Indent all children of case and default
                        var child = ParseNodeExtensions.FindChildWithEdge(
                                        ParseNodeExtensions.FindChildWithEdge(node, AuthorParseNodeEdge.apneBody),
                                        AuthorParseNodeEdge.apneBlockBody);
                        if (child != null) {
                            if (child.AuthorNode.Details.Kind == AuthorParseNodeKind.apnkList) {
                                ParseNodeExtensions.ForAllChildren(child, (grandChild) => {
                                    grandChild.IndentationDelta = 1;
                                    nextNodesToVisit.Push(grandChild);
                                });
                            }
                            else if (child.AuthorNode.Details.Kind == AuthorParseNodeKind.apnkBlock) {
                                child.IndentationDelta = 1;
                                FillIndentationEdgesForBlock(child, /*childrenLevel:*/ 1);
                            }
                            else {
                                child.IndentationDelta = 1;
                                nextNodesToVisit.Push(child);
                            }
                        }
                    }
                    break;

                case AuthorParseNodeKind.apnkIf:
                    {
                        // Indent body of if-then-else
                        // if (a) {
                        //      statement
                        // } else {
                        //      statement
                        // }
                        node.ChildrenIndentationDelta = 1;

                        var thenChild = ParseNodeExtensions.FindChildWithEdge(node, AuthorParseNodeEdge.apneThen);
                        FillIndentationEdgesForBlockOrNot(thenChild, /*childrenLevel:*/ 1);

                        var elseChild = ParseNodeExtensions.FindChildWithEdge(node, AuthorParseNodeEdge.apneElse);
                        FillIndentationEdgesForBlockOrNot(elseChild, /*childrenLevel:*/ 1);
                    }
                    break;

                case AuthorParseNodeKind.apnkFor:
                case AuthorParseNodeKind.apnkForIn:
                case AuthorParseNodeKind.apnkWhile:
                case AuthorParseNodeKind.apnkWith:
                case AuthorParseNodeKind.apnkDoWhile:
                    {
                        // Indent body of for
                        // for (;;) {
                        //      statement
                        // }
                        node.ChildrenIndentationDelta = 1;
                        var child = ParseNodeExtensions.FindChildWithEdge(node, AuthorParseNodeEdge.apneBody);
                        FillIndentationEdgesForBlockOrNot(child, /*childrenLevel:*/ 1);
                    }
                    break;

                case AuthorParseNodeKind.apnkObject:
                    {
                        // Indent members
                        // x = {
                        //      a: 1,
                        //      b: 2
                        // }
                        node.IsIndentationOverrideEdge = true;
                        node.ChildrenIndentationDelta = 1;

                        var members = ParseNodeExtensions.FindChildWithEdge(node, AuthorParseNodeEdge.apneMembers);
                        if (members != null) {
                            if (members.AuthorNode.Details.Kind == AuthorParseNodeKind.apnkList) {
                                ParseNodeExtensions.ForAllChildren(members, (grandChild) => {
                                    grandChild.ChildrenIndentationDelta = 1;
                                    grandChild.IndentationDelta = 1;
                                    nextNodesToVisit.Push(grandChild);
                                });
                            }
                            else {
                                members.ChildrenIndentationDelta = 1;
                                members.IndentationDelta = 1;
                                nextNodesToVisit.Push(members);
                            }
                        }
                    }
                    break;

                case AuthorParseNodeKind.apnkArray:
                    {
                        // Indent elements
                        // x = [
                        //      1,
                        //      2
                        // ]
                        node.IsIndentationOverrideEdge = true;
                        node.ChildrenIndentationDelta = 1;

                        var elements = ParseNodeExtensions.FindChildWithEdge(node, AuthorParseNodeEdge.apneElements);
                        if (elements != null) {
                            if (elements.AuthorNode.Details.Kind == AuthorParseNodeKind.apnkList) {
                                ParseNodeExtensions.ForAllChildren(elements, function (grandChild) {
                                    grandChild.IsIndentationOverrideEdge = true;
                                    nextNodesToVisit.Push(grandChild);
                                });
                            }
                            else {
                                elements.IsIndentationOverrideEdge = true;
                                nextNodesToVisit.Push(elements);
                            }
                        }
                    }
                    break;

                case AuthorParseNodeKind.apnkTry:
                case AuthorParseNodeKind.apnkCatch:
                case AuthorParseNodeKind.apnkFinally:
                    {
                        // Indent body of try/catch/finally
                        // try {
                        //      statement;
                        // }
                        // catch (e) {
                        //      statement;
                        // } 
                        // finally {
                        //      statement;
                        // }
                        node.ChildrenIndentationDelta = 1;

                        var body = ParseNodeExtensions.FindChildWithEdge(node, AuthorParseNodeEdge.apneBody);

                        // try/catch/finally could have no body if there is no block provided
                        // If there is body then we don't care about TryCatch or TryFinally since they are 
                        // just intermediate nodes which don't represent the real user typed try/catch/finally
                        if (body == null ||
                            (body != null &&
                            body.AuthorNode.Details.Kind != AuthorParseNodeKind.apnkTryCatch &&
                            body.AuthorNode.Details.Kind != AuthorParseNodeKind.apnkTryFinally)) {
                                // Use the parent virtual block to set the indentation delta for try/catch/finally
                            var parent = node.Parent;
                            while (parent != null) {
                                if (parent.AuthorNode.Details.Kind == AuthorParseNodeKind.apnkBlock) {
                                    node.IndentationDelta = parent.IndentationDelta;
                                    break;
                                }
                                parent = parent.Parent;
                            }
                        }

                        if (body != null && body.AuthorNode.Details.Kind == AuthorParseNodeKind.apnkBlock) {
                            FillIndentationEdgesForBlock(body, /*childrenLevel:*/ 1);
                        }
                        else {
                            ParseNodeExtensions.ForAllChildren(node, function (child) { nextNodesToVisit.Push(child); });
                        }
                    }
                    break;

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
                case AuthorParseNodeKind.apnkNew:
                case AuthorParseNodeKind.apnkDelete:
                case AuthorParseNodeKind.apnkReturn:
                case AuthorParseNodeKind.apnkDot:
                case AuthorParseNodeKind.apnkIndex:
                    {
                        // check if the node is varDecl that belongs to a varDeclList
                        if (node.AuthorNode.Details.Kind == AuthorParseNodeKind.apnkVarDecl &&
                            node.Parent != null &&
                            node.Parent.AuthorNode.Details.Kind == AuthorParseNodeKind.apnkVarDeclList) {
                                // don't add children indentation on a var decleration that is part of a var decl list
                        }
                        else {
                            node.ChildrenIndentationDelta = 1;
                        }

                        ParseNodeExtensions.ForAllChildren(node, (child) => { nextNodesToVisit.Push(child); });
                    }
                    break;

                default:
                    {
                        // Still visit all children. This covers for example right hand of assignments and functions declared in arguments for function calls
                        ParseNodeExtensions.ForAllChildren(node, (child) => { nextNodesToVisit.Push(child); });
                    }
                    break;
            }
        }

        static FillIndentationEdgesForBlockOrNot(node: ParseNode, childrenLevel: number): void
        {
            if (node == null)
                return;

            node.ChildrenIndentationDelta = childrenLevel;

            if (node.AuthorNode.Details.Kind == AuthorParseNodeKind.apnkBlock) {
                FillIndentationEdgesForBlock(node, childrenLevel);
            }
            else {
                node.IndentationDelta = childrenLevel;
                FillIndentationLevels(node);
            }
        }

        static FillIndentationEdgesForBlock(node: ParseNode, childrenLevel: number): void
        {
            if (node == null)
                return;

            Debug.Assert(node.AuthorNode.Details.Kind == AuthorParseNodeKind.apnkBlock, "Expecting a node of kind block.");

            // No indentation on a virtual block
            if ((node.AuthorNode.Details.Flags & AuthorParseNodeFlags.apnfSyntheticNode) != AuthorParseNodeFlags.apnfSyntheticNode) {
                node.ChildrenIndentationDelta = childrenLevel;
            }

            var child = <ParseNode>FirstOrDefault(ParseNodeExtensions.GetChildren(node), () => { return true; });
            if (child != null) {
                if (child.AuthorNode.Details.Kind == AuthorParseNodeKind.apnkList) {
                    ParseNodeExtensions.ForAllChildren(child, (grandChild) => {
                        grandChild.IndentationDelta = node.ChildrenIndentationDelta;
                        FillIndentationLevels(grandChild);
                    });
                }
                else {
                    child.IndentationDelta = node.ChildrenIndentationDelta;
                    FillIndentationLevels(child);
                }
            }
        }
    }
}
