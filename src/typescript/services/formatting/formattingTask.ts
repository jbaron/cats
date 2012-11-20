// Copyright (c) Microsoft. All rights reserved. Licensed under the Apache License, Version 2.0. 
// See LICENSE.txt in the project root for complete license information.

/// <references path="formatting.ts"/>

module Formatting {
    export class FormattingTask {

        private snapshotSpan: SnapshotSpan;
        private tokenTags: IList_TokenSpan;
        public EditCommands: List_TextEditInfo;

        constructor(
            public logger: TypeScript.ILogger,
            public Snapshot: ITextSnapshot,
            public span: SnapshotSpan,
            public tokens: IList_TokenSpan,
            public fileAuthoringProxy: FileAuthoringProxy,
            public rulesProvider: RulesProvider,
            public editorOptions: Services.EditorOptions,
            public languageHostIndentation: string,
            public scriptHasErrors: bool,
            public formattingRequestKind: FormattingRequestKind) {

            this.snapshotSpan = this.span;
            this.tokenTags = this.tokens;
            this.EditCommands = new List_TextEditInfo();
        }

        public Run(): void
        {
            if (this.tokenTags.count() == 0)
                return;

            var tree: ParseTree = TypeScript.timeFunction(this.logger, "FormattingTask: new ParseTree()", () => {
                return new ParseTree(this.fileAuthoringProxy, this.snapshotSpan.span, this.tokenTags, false);
            });

            if (tree.Root == null)
                return;

            TypeScript.timeFunction(this.logger, "FormattingTask: FillIndentationLevels()", () => {
                IndentationEdgeFinder.FillIndentationLevels(tree.Root);
            });

            TypeScript.timeFunction(this.logger, "FormattingTask: Format()", () => {
                this.Format(tree);
            });
        }

        private Format(tree: ParseTree): void
        {
            var tokenIndex = 0;
            var token1Line = 0;
            var currentLineNumber = -1;
            var context = tree.Root;

            ParseTree.DumpTree(this.logger, tree.Root);

            // This flag is set when we want to insert the indentation in the input line. 
            // This case applies when we move a token to the next line.
            var sameLineIndent = false;

            // We take every token pair and find their context. Then we apply the maching rule on these tokens.
            // When the first token starts a new line, we indent it only if it applies.
            var t1 = this.tokenTags.get(0);
            token1Line = t1.lineNumber();

            var indenter = new Indenter(this.logger, tree, this.Snapshot, this.languageHostIndentation, this.editorOptions, t1, false);

            if (!this.scriptHasErrors) {
                // Trim end-of-line whitespace on lines in the selection but before the first token.
                this.TrimWhitespaceInLineRange(t1, this.Snapshot.GetLineNumberFromPosition(this.snapshotSpan.startPosition()), token1Line - 1);
            }

            if (this.tokenTags.count() == 1) {
                context = ParseTree.FindCommonParentNode(t1.Span.span, t1.Span.span, context);
            }

            var formattingContext = new FormattingContext(this.fileAuthoringProxy, this.Snapshot, this.tokenTags, this.formattingRequestKind);

            for (tokenIndex = 1; tokenIndex < this.tokenTags.count() ; tokenIndex++) {
                if (this.logger.information()) {
                    this.logger.log("Processing token #" + tokenIndex + ": tokenId=" + (<any>TypeScript.TokenID)._map[t1.tokenID] + ", span=[" + t1.Span.startPosition() + "," + t1.Span.endPosition() + "]");
                }

                var t2 = this.tokenTags.get(tokenIndex);
                var token2Line = t2.lineNumber();

                context = ParseTree.FindCommonParentNode(t1.Span.span, t2.Span.span, context);

                // Match up the token with the context
                if (context.TokenTagIndex == null &&
                    context.AuthorNode.Details.StartOffset == t1.Span.span.start()) {
                    context.TokenTagIndex = tokenIndex - 1;
                }

                if (token1Line != currentLineNumber) {
                    var node = this.FindTokenNode(t1.Span.span, context);
                    var edits = indenter.GetIndentationEdits(t1, t2, node, sameLineIndent);
                    for (var i = 0; i < edits.count() ; i++) {
                        this.EditCommands.add(edits.get(i));
                    }

                    currentLineNumber = token1Line;
                    sameLineIndent = false;
                }

                // In the case of block comments or multiline-string the end line can be different 
                // from the beginning line. So, we need to set the current line number on the last line
                if (t1.Token == AuthorTokenKind.atkComment || t1.Token == AuthorTokenKind.atkString) {
                    currentLineNumber = this.Snapshot.GetLineNumberFromPosition(t1.Span.endPosition());
                }

                if (this.logger.information()) {
                    this.logger.log("Context node: " + context.toString());
                }

                if (!this.scriptHasErrors) {
                    formattingContext.setContext(context, t1, t2);
                    var rule = this.rulesProvider.getRulesMap().GetRule(formattingContext);

                    if (rule != null) {
                        this.GetRuleEdits(rule, t1, t2).foreach((edit) => {
                            this.EditCommands.add(edit);
                        });

                        // Handle the case where the next line is moved to be the end of this line. 
                        // In this case we don't indent the next line in the next pass.
                        if ((rule.Operation.Action == RuleAction.Space || rule.Operation.Action == RuleAction.Delete) &&
                            token1Line != token2Line) {
                                // Register the new indentation of t2 token since it's moving to a differnet line (to end of t1 line)
                                // The indentation string to use is the one from t1 line.
                            var indent = indenter.GetLineIndentationForOffset(t1.Span.startPosition());
                            indenter.RegisterIndentation2(t2.Span.startPosition(), indent);

                            currentLineNumber = token2Line;
                        }

                        // Handle the case where token2 is moved to the new line. 
                        // In this case we indent token2 in the next pass but we set
                        // sameLineIndent flag to notify the indenter that the indentation is within the line.
                        if (rule.Operation.Action == RuleAction.NewLine && token1Line == token2Line) {
                            currentLineNumber = token2Line - 1;
                            sameLineIndent = true;
                        }
                    }

                    if (token1Line != token2Line) {
                        this.TrimWhitespaceInLineRange(t1, token1Line, token2Line - 1);
                    }
                }

                t1 = t2;
                token1Line = token2Line;
            }

            // If the last token is on a new line, indent it
            if (token1Line != currentLineNumber) {
                context = ParseTree.FindCommonParentNode(t1.Span.span, t1.Span.span, context);
                indenter.GetIndentationEdits(t1, null, context, sameLineIndent).foreach((edit) => {
                    this.EditCommands.add(edit);
                });
            }

            if (!this.scriptHasErrors) {
                // For projected buffer, make sure we don't remove spaces on the last line, i.e., before </script>
                //   1. Create a set that contains all the end lines from each block in our buffer
                //   2. ignore removing whitespaces in these lines
                // For standalone file, the set will be empty
                var projectionEndLineSet = this.GetProjectionLineEndPositionSet();

                if (!projectionEndLineSet.Contains(token1Line)) {
                    this.TrimWhitespace(t1);

                    var endlineNumber = this.Snapshot.GetLineNumberFromPosition(this.snapshotSpan.endPosition());
                    if (projectionEndLineSet.Contains(endlineNumber))
                        endlineNumber--;

                    // Trim end-of-line whitespace on lines in the selection but after the last token.
                    this.TrimWhitespaceInLineRange(t1, token1Line + 1, endlineNumber);
                }
            }
        }

        private GetProjectionEndLines(): List_ITextSnapshotLine {
            var result = new List_ITextSnapshotLine();


            //TypeScript: No support for projections (yet)
            //IProjectionSnapshot projectionSnapshot = this.snapshotSpan.Snapshot.TextBuffer.CurrentSnapshot as IProjectionSnapshot;
            //if (projectionSnapshot != null)
            //{
            //    foreach (var sourceSpan in projectionSnapshot.GetSourceSpans())
            //    {
            //        var targetPoint = projectionSnapshot.MapFromSourceSnapshot(sourceSpan.End, PositionAffinity.Predecessor);
            //        if (targetPoint != null &&
            //            targetPoint.Value.Position > this.snapshotSpan.Start.Position &&
            //            targetPoint.Value.Position <= this.snapshotSpan.End.Position)
            //        {
            //            yield return targetPoint.Value.GetContainingLine();
            //        }
            //    }
            //}

            return result;
        }

        private GetProjectionLineEndPositionSet(): HashSet_int {
            var projectionEndLineSet = new HashSet_int();

            this.GetProjectionEndLines().foreach((line) => {
                if (!projectionEndLineSet.Contains(line.lineNumber()))
                    projectionEndLineSet.Add(line.lineNumber());
            });

            return projectionEndLineSet;
        }

        private TrimWhitespaceInLineRange(token: TokenSpan, startLine: number, endLine: number): void
        {
            for (var lineNumber = startLine; lineNumber <= endLine; ++lineNumber) {
                var line = this.Snapshot.GetLineFromLineNumber(lineNumber);

                this.TrimWhitespace2(token, line);
            }
        }

        private TrimWhitespace(token: TokenSpan): void
        {
            var line = this.Snapshot.GetLineFromPosition(token.Span.startPosition());
            this.TrimWhitespace2(token, line);
        }

        private TrimWhitespace2(token: TokenSpan, line: ITextSnapshotLine): void
        {
            // Don't remove the trailing spaces inside comments (this includes line comments and block comments)
            if (token.Token == AuthorTokenKind.atkComment && token.Span.startPosition() <= line.endPosition() && token.Span.endPosition() >= line.endPosition())
                return;

            var text = line.getText();
            var index = 0;

            for (index = text.length - 1; index >= 0; --index) {
                if (!EditorUtilities.IsWhitespace(text.charCodeAt(index))) {
                    break;
                }
            }

            ++index;

            if (index < text.length) {
                var edit = new TextEditInfo(line.startPosition() + index, line.length() - index, "");
                if (this.logger.information()) {
                    this.logger.log("TrimWhiteSpace2()");
                    this.logger.log("edit: minChar=" + edit.position + ", limChar=" + (edit.position + edit.length) + ", text=\"" + TypeScript.stringToLiteral(edit.replaceWith, 30) + "\"");
                }
                this.EditCommands.add(edit);
            }
        }

        private GetRuleEdits(rule: Rule, t1: TokenSpan, t2: TokenSpan): IList_TextEditInfo {
            if (this.logger.information()) {
                this.logger.log("GetRuleEdits(" + this.rulesProvider.getRuleName(rule) + ", " +
                    "t1=[" + t1.Span.startPosition() + "," + t1.Span.endPosition() + "], " +
                    "t2=[" + t2.Span.startPosition() + "," + t2.Span.endPosition() + "]" +
                    ")");
            }

            var result = this.GetRuleEditsWorker(rule, t1, t2);

            if (this.logger.information()) {
                for (var i = 0; i < result.count() ; i++) {
                    var edit = result.get(i);
                    this.logger.log("edit: minChar=" + edit.position + ", limChar=" + (edit.position + edit.length) + ", text=\"" + TypeScript.stringToLiteral(edit.replaceWith, 30) + "\"");
                }
            }

            return result;
        }

        private GetRuleEditsWorker(rule: Rule, t1: TokenSpan, t2: TokenSpan): IList_TextEditInfo {
            var emptyResult = new List_TextEditInfo();
            if (rule.Operation.Action == RuleAction.Ignore)
                return emptyResult;

            var betweenSpan: Span;

            switch (rule.Operation.Action) {
                case RuleAction.Delete:
                    {
                        betweenSpan = new Span(t1.Span.endPosition(), t2.Span.startPosition() - t1.Span.endPosition());

                        if (betweenSpan.length() > 0) {
                            return new List_TextEditInfo(new TextEditInfo(betweenSpan.start(), betweenSpan.length(), ""));
                        }
                    }
                    break;

                case RuleAction.NewLine:
                    {
                        if (rule.Flag == RuleFlags.CanDeleteNewLines) {
                            betweenSpan = new Span(t1.Span.endPosition(), t2.Span.startPosition() - t1.Span.endPosition());
                        }
                        else {
                            var lengthBetween: number;
                            if (t1.lineNumber() == t2.lineNumber())
                                lengthBetween = t2.Span.startPosition() - t1.Span.endPosition();
                            else
                                lengthBetween = t1.Span.end().GetContainingLine().endIncludingLineBreakPosition() - t1.Span.endPosition();

                            betweenSpan = new Span(t1.Span.endPosition(), Math.Max(0, lengthBetween));
                        }

                        var doEdit = false;
                        var betweenText = this.Snapshot.GetText(betweenSpan);

                        var lineFeedLoc = StringUtils.IndexOf(betweenText, this.editorOptions.NewLineCharacter);
                        if (lineFeedLoc < 0) {
                            // no linefeeds, do the edit
                            doEdit = true;
                        }
                        else {
                            // We only require one line feed. If there is another one, do the edit
                            lineFeedLoc = StringUtils.IndexOf(betweenText, this.editorOptions.NewLineCharacter, lineFeedLoc + 1);
                            if (lineFeedLoc >= 0) {
                                doEdit = true;
                            }
                        }

                        if (doEdit) {
                            return new List_TextEditInfo(new TextEditInfo(betweenSpan.start(), betweenSpan.length(), this.editorOptions.NewLineCharacter));
                        }
                    }
                    break;

                case RuleAction.Space:
                    {
                        if (rule.Flag == RuleFlags.CanDeleteNewLines) {
                            betweenSpan = new Span(t1.Span.endPosition(), t2.Span.startPosition() - t1.Span.endPosition());
                        }
                        else {
                            var lengthBetween: number;

                            if (t1.lineNumber() == t2.lineNumber())
                                lengthBetween = t2.Span.startPosition() - t1.Span.endPosition();
                            else
                                lengthBetween = t1.Span.end().GetContainingLine().endPosition() - t1.Span.endPosition();

                            betweenSpan = new Span(t1.Span.endPosition(), Math.Max(0, lengthBetween));
                        }

                        if (betweenSpan.length() > 1 || this.Snapshot.GetText(betweenSpan) != " ") {
                            return new List_TextEditInfo(new TextEditInfo(betweenSpan.start(), betweenSpan.length(), " "));
                        }
                    }
                    break;
            }
            return emptyResult;
        }

        private FindTokenNode(span: Span, helperNode: ParseNode): ParseNode {
            if (helperNode.CoverSpan(span)) {
                if (helperNode.children() != null) {
                    var child = ParseNodeExtensions.TryFindNodeForSpan(helperNode.children(), span);
                    if (child != null) {
                        return this.FindTokenNode(span, child);
                    }
                }

                // None of the children cover the span, so the token belongs to the helper node.
                return helperNode;
            }
            else {
                if (helperNode.Parent == null) {
                    // No parent. The helperNode is the root node and the token node
                    return helperNode;
                }
                else {
                    // Check the parent
                    return this.FindTokenNode(span, helperNode.Parent);
                }
            }
        }
    }
}
