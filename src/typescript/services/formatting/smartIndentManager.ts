// Copyright (c) Microsoft. All rights reserved. Licensed under the Apache License, Version 2.0. 
// See LICENSE.txt in the project root for complete license information.

/// <reference path="formatting.ts"/>

module Formatting {
    export class SmartIndentManager {

        private logger: TypeScript.LoggerAdapter;
        private sourceText: TypeScript.ISourceText;
        private snapshot: TextSnapshot;
        private fileAuthoringProxy: FileAuthoringProxy;
        private tokenKindMap: AuthorTokenKindMap;

        constructor(private scriptSyntaxAST: Services.ScriptSyntaxAST, private editorOptions: Services.EditorOptions) {
            this.logger = new TypeScript.LoggerAdapter(this.scriptSyntaxAST.getLogger());
            this.sourceText = this.scriptSyntaxAST.getSourceText();
            this.snapshot = new TextSnapshot(this.scriptSyntaxAST.getScript(), this.sourceText);
            this.fileAuthoringProxy = new FileAuthoringProxy(this.scriptSyntaxAST);
            this.tokenKindMap = AuthorTokenKindMap.getInstance();
        }

        public getSmartIndentAtLineNumber(lineNumber: number): number {
            var line = this.snapshot.GetLineFromLineNumber(lineNumber);
            var caretPosition = new SnapshotSpan(this.snapshot, new Span(line.startPosition(), 0));
            var tokensSpan = this.getPossibleTokenSpan(caretPosition);
            var tokens = this.gtTokens(tokensSpan);

            // Collect indentations from the host language in case of embedded script
            var languageHostIndentation: string = null;
            //TypeScript: Not supported (yet)
            //if (containedLanguageHost != null)
            //{
            //    languageHostIndentation = containedLanguageHost.GetLineIndent(line.LineNumber).IndentString;
            //}

            var task = new Formatting.SmartIndentTask(this.logger, caretPosition, tokens, this.fileAuthoringProxy, this.editorOptions, languageHostIndentation);
            task.Run();
            if (task.DesiredIndentation === null)
                return this.getBlockIndent(line);
            else
                return Formatting.Indenter.GetIndentSizeFromIndentText(task.DesiredIndentation, this.editorOptions);
        }

        private getPossibleTokenSpan(caretPosition: SnapshotSpan): SnapshotSpan {
            var startPosition = caretPosition.start().GetContainingLine().startPosition();
            var endPosition = caretPosition.start().GetContainingLine().endPosition();

            endPosition = Math.Min(endPosition, startPosition + 100);

            return new SnapshotSpan(caretPosition.snapshot, Span.FromBounds(startPosition, endPosition));
        }

        private gtTokens(span: SnapshotSpan): IList_TokenSpan {
            return Formatting.getTokensInSpan(this.logger, this.scriptSyntaxAST, this.tokenKindMap, span);
        }

        private getBlockIndent(line: ITextSnapshotLine): number {
            var previousLine: ITextSnapshotLine = null;

            for (var lineNumber = line.lineNumber() - 1; lineNumber >= 0; --lineNumber) {
                previousLine = line.snapshot().GetLineFromLineNumber(lineNumber);

                //if (lineNumber == line.lineNumber() - 1 && containedLanguageHost != null && IsOpeningScriptElementLine(previousLine))
                //{
                //    ContainedLineIndentSettings indentSettings = containedLanguageHost.GetLineIndent(line.LineNumber);

                //    return GetScriptIndentation(indentSettings);
                //}

                var text = previousLine.getText();

                if (text.length > 0)
                    return Indenter.GetIndentSizeFromIndentText(text, this.editorOptions);
            }

            return null;
        }
    }
}
