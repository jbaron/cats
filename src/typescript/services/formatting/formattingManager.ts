// Copyright (c) Microsoft. All rights reserved. Licensed under the Apache License, Version 2.0. 
// See LICENSE.txt in the project root for complete license information.

/// <references path="formatting.ts"/>

module Formatting {
    export class FormattingManager implements IFormatter {

        private logger: TypeScript.LoggerAdapter;
        private sourceText: TypeScript.ISourceText;
        private snapshot: TextSnapshot;
        private fileAuthoringProxy: FileAuthoringProxy;
        private tokenKindMap: AuthorTokenKindMap;

        constructor(private scriptSyntaxAST: Services.ScriptSyntaxAST, private rulesProvider: RulesProvider, private editorOptions: Services.EditorOptions) {
            this.logger = new TypeScript.LoggerAdapter(this.scriptSyntaxAST.getLogger());
            this.sourceText = this.scriptSyntaxAST.getSourceText();
            this.snapshot = new TextSnapshot(this.scriptSyntaxAST.getScript(), this.sourceText);
            this.fileAuthoringProxy = new FileAuthoringProxy(this.scriptSyntaxAST);
            this.tokenKindMap = AuthorTokenKindMap.getInstance();
        }

        public formatRange(minChar: number, limChar: number): Services.TextEdit[]{
            var span = new SnapshotSpan(this.snapshot, Span.FromBounds(minChar, limChar));
            return this.Format(span, FormattingRequestKind.FormatSelection, (a, b) => true);
        }

        public FormatDocument(): void {
        }

        public FormatSelection(span: SnapshotSpan): void {
        }

        public FormatOnPaste(selection: SnapshotSpan): void {
        }

        public FormatOnEnter(caret: SnapshotPoint): void {
        }

/*
            FormatDocument(): void;
        FormatSelection(span: SnapshotSpan): void;
        FormatOnPaste(selection: SnapshotSpan): void;
        FormatOnSemicolon(caretPosition: number): void;
        FormatOnClosingCurlyBrace(caretPosition: number): void;
        FormatOnEnter(caret: SnapshotPoint): void;
    */

        //publicISmartIndent GetSmartIndenter();
        // The rules map instance is shared across all views. Once we have no more views, the rules map is cleaned up.
        //private static object rulesMapInitLock = new object();
        //private static volatile RulesMap rulesMap = null;
        //private static int rulesMapViewsRefCount = 0;

        //private ITextView textView;
        //private ITextBuffer textBuffer;
        //private IScriptContext scriptContext;
        //private IServiceCore core;
        //private ITextUndoHistory undoHistory;
        //private IEditorOperations editorOperations;
        //private ITextSnapshot prePasteSnapshot;
        //private IContainedLanguageHost containedLanguageHost;
        //private bool isClosed;

        //private FormattingManager(ITextView textView, ITextBuffer textBuffer, IScriptContext scriptContext, IContainedLanguageHost containedLanguageHost, ITextUndoHistory undoHistory)
        //{
        //    this.textView = textView;
        //    this.textBuffer = textBuffer;
        //    this.scriptContext = scriptContext;
        //    this.core = scriptContext.Core;
        //    this.containedLanguageHost = containedLanguageHost;
        //    this.undoHistory = undoHistory;

        //    this.core.UserSettings.PropertyChanged += this.OnUserSettingsPropertyChanged;

        //    this.editorOperations = this.core.EditorOperationsFactory.GetEditorOperations(this.textView);

        //    rulesMapViewsRefCount++;

        //    this.EnsureRulesMapInitializedAsync();
        //}

        //public void Close()
        //{
        //    if (this.isClosed)
        //        return;

        //    this.core.UserSettings.PropertyChanged -= this.OnUserSettingsPropertyChanged;

        //    if (rulesMapViewsRefCount > 0)
        //    {
        //        // Release rules map if it's not in use.
        //        if (--rulesMapViewsRefCount == 0)
        //        {
        //            InvalidateRulesMap();
        //        }
        //    }

        //    this.isClosed = true;
        //}

        //internal static FormattingManager GetFormattingManager(ITextView textView, ITextBuffer textBuffer, IScriptContext scriptContext, IContainedLanguageHost containedLanguageHost)
        //{
        //    ITextUndoHistory undoHistory;

        //    if (!EditorUtilities.TryGetUndoHistory(scriptContext.Core.UndoHistoryRegistry, textView, out undoHistory))
        //        return null;

        //    return new FormattingManager(textView, textBuffer, scriptContext, containedLanguageHost, undoHistory);
        //}

        //public bool PreProcessCommand(Guid guidCmdGroup, uint commandId, IntPtr variantIn)
        //{
        //    if (guidCmdGroup == VSConstants.VSStd2K)
        //    {
        //        switch ((VSConstants.VSStd2KCmdID)commandId)
        //        {
        //            case VSConstants.VSStd2KCmdID.FORMATDOCUMENT:
        //                {
        //                    this.FormatDocument();
        //                    return true;
        //                }

        //            case VSConstants.VSStd2KCmdID.FORMATSELECTION:
        //                {
        //                    SnapshotSpan snapshotSpan = this.GetSelectionSpan();
        //                    this.FormatSelection(snapshotSpan);
        //                    return true;
        //                }
        //        }
        //    }
        //    else if (guidCmdGroup == typeof(VSConstants.VSStd97CmdID).GUID)
        //    {
        //        switch ((VSConstants.VSStd97CmdID)commandId)
        //        {
        //            case VSConstants.VSStd97CmdID.Paste:
        //                {
        //                    this.prePasteSnapshot = this.textView.TextSnapshot;
        //                }
        //                break;
        //        }
        //    }

        //    return false;
        //}

        //public void PostProcessCommand(Guid guidCmdGroup, uint commandId, IntPtr variantIn, bool wasHandled)
        //{
        //    if (guidCmdGroup == VSConstants.VSStd2K)
        //    {
        //        switch ((VSConstants.VSStd2KCmdID)commandId)
        //        {
        //            case VSConstants.VSStd2KCmdID.TYPECHAR:
        //                char ch = CommandFilter.GetTypedChar(variantIn);

        //                if (ch == ';' && this.core.UserSettings.FormatCompletedStatementOnSemicolon)
        //                {
        //                    this.FormatOnSemicolon(this.textView.Caret.Position.BufferPosition);
        //                }
        //                else if (ch == '}' && this.core.UserSettings.FormatCompletedBlockOnRightCurlyBrace)
        //                {
        //                    this.FormatOnClosingCurlyBrace(this.textView.Caret.Position.BufferPosition);
        //                }

        //                break;

        //            case VSConstants.VSStd2KCmdID.RETURN:
        //                if (!wasHandled && this.core.UserSettings.FormatCompletedLineOnEnter)
        //                {
        //                    this.FormatOnEnter(this.textView.Caret.Position.BufferPosition);
        //                }

        //                break;
        //        }
        //    }
        //    else if (guidCmdGroup == typeof(VSConstants.VSStd97CmdID).GUID)
        //    {
        //        switch ((VSConstants.VSStd97CmdID)commandId)
        //        {
        //            case VSConstants.VSStd97CmdID.Paste:
        //                {
        //                    if (this.core.UserSettings.FormatOnPaste)
        //                    {
        //                        INormalizedTextChangeCollection changes = this.prePasteSnapshot.Version.Changes;

        //                        if (changes != null && changes.Count > 0)
        //                        {
        //                            // In <script /> blocks we cannot rely completely on ITextChange.New* members 
        //                            // for the current (new) snapshot because they do not fully account for new 
        //                            // lines.  Instead, we'll create a span based on the old snapshot and translate 
        //                            // it to the new snapshot.
        //                            ITextChange firstChange = changes.First();
        //                            ITextChange lastChange = changes.Last();
        //                            int length = (lastChange.OldPosition + lastChange.OldLength) - firstChange.OldPosition;
        //                            SnapshotSpan oldSpan = EditorUtilities.CreateSnapshotSpan(this.prePasteSnapshot, firstChange.OldPosition, length);
        //                            SnapshotSpan newSpan = oldSpan.TranslateTo(this.textView.TextSnapshot, SpanTrackingMode.EdgeInclusive);

        //                            this.FormatOnPaste(newSpan);
        //                        }
        //                    }
        //                }

        //                break;
        //        }
        //    }
        //}

        //public bool QueryCommandStatus(Guid guidCmdGroup, uint commandId, IntPtr commandText, out OLE.Interop.OLECMDF commandStatus)
        //{
        //    commandStatus = new OLECommandFlags();

        //    if (guidCmdGroup == VSConstants.VSStd2K)
        //    {
        //        switch ((VSConstants.VSStd2KCmdID)commandId)
        //        {
        //            case VSConstants.VSStd2KCmdID.FORMATDOCUMENT:
        //                if (this.CanFormatDocument())
        //                {
        //                    commandStatus = OLECommandFlags.OLECMDF_ENABLED | OLECommandFlags.OLECMDF_SUPPORTED;
        //                    return true;
        //                }
        //                break;

        //            case VSConstants.VSStd2KCmdID.FORMATSELECTION:
        //                if (this.CanFormatSelection())
        //                {
        //                    commandStatus = OLECommandFlags.OLECMDF_SUPPORTED;
        //                    if (!this.textView.Selection.IsEmpty)
        //                    {
        //                        commandStatus |= OLECommandFlags.OLECMDF_ENABLED;
        //                    }

        //                    return true;
        //                }
        //                break;
        //        }
        //    }

        //    return false;
        //}

        //private SnapshotSpan GetSelectionSpan()
        //{
        //    int startPos = this.textView.Selection.Start.Position.Position;
        //    int endPos = this.textView.Selection.End.Position.Position;
        //    Span span = Span.FromBounds(startPos, endPos);
        //    SnapshotSpan snapshotSpan = new SnapshotSpan(this.textView.TextSnapshot, span);
        //    return snapshotSpan;
        //}

        //private bool CanFormatSelection()
        //{
        //    SnapshotSpan selection = this.GetSelectionSpan();
        //    SnapshotSpan? mappedSpan = this.MapDownSnapshotSpan(selection);
        //    if (mappedSpan != null)
        //    {
        //        return this.CanFormatSpan(mappedSpan.Value);
        //    }

        //    return false;
        //}

        //private bool CanFormatDocument()
        //{
        //    int endPos = this.textBuffer.CurrentSnapshot.Length;
        //    return this.CanFormatSpan(new SnapshotSpan(this.textView.TextSnapshot, Span.FromBounds(0, endPos)));
        //}

        private CanFormatSpan(span: SnapshotSpan): bool {
            return true;
            //TypeScript: No support for read-only buffers (yet)
            //return !this.textBuffer.IsReadOnly(span);
        }

        //private void OnUserSettingsPropertyChanged(object sender, System.ComponentModel.PropertyChangedEventArgs args)
        //{
        //    switch (args.PropertyName)
        //    {
        //        case UserSettings.PropertyNames.PlaceOpenBraceOnNewLineForFunctions:
        //        case UserSettings.PropertyNames.PlaceOpenBraceOnNewLineForControlBlocks:
        //        case UserSettings.PropertyNames.InsertSpaceAfterCommaDelimiter:
        //        case UserSettings.PropertyNames.InsertSpaceAfterSemicolonInForStatements:
        //        case UserSettings.PropertyNames.InsertSpaceBeforeAndAfterBinaryOperators:
        //        case UserSettings.PropertyNames.InsertSpaceAfterKeywordsInControlFlowStatements:
        //        case UserSettings.PropertyNames.InsertSpaceAfterFunctionKeywordForAnonymousFunctions:
        //        case UserSettings.PropertyNames.InsertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesis:
        //            // Invalidate RulesMap
        //            InvalidateRulesMap();
        //            break;
        //    }
        //}

        //public void FormatDocument()
        //{
        //    CodeMarkers.Instance.CodeMarker(CodeMarkerEvent.perfBrowserTools_LanguageServiceFormattingBegin);

        //    Stopwatch timeInTask = new Stopwatch();

        //    int endPos = this.textBuffer.CurrentSnapshot.Length;
        //    SnapshotSpan span = new SnapshotSpan(this.textBuffer.CurrentSnapshot, Span.FromBounds(0, endPos));

        //    this.Format(span, FormattingRequestKind.FormatDocument, prerequisiteTokenTest: null, timeInTask: timeInTask);

        //    CodeMarkers.Instance.CodeMarker(CodeMarkerEvent.perfBrowserTools_LanguageServiceFormattingEnd);
        //}

        //public void FormatSelection(SnapshotSpan span)
        //{
        //    CodeMarkers.Instance.CodeMarker(CodeMarkerEvent.perfBrowserTools_LanguageServiceFormattingBegin);

        //    this.FormatSelection(span, FormattingRequestKind.FormatSelection);

        //    CodeMarkers.Instance.CodeMarker(CodeMarkerEvent.perfBrowserTools_LanguageServiceFormattingEnd);
        //}

        //public void FormatOnPaste(SnapshotSpan selection)
        //{
        //    CodeMarkers.Instance.CodeMarker(CodeMarkerEvent.perfBrowserTools_LanguageServiceFormattingBegin);

        //    this.FormatSelection(selection, FormattingRequestKind.FormatOnPaste);

        //    CodeMarkers.Instance.CodeMarker(CodeMarkerEvent.perfBrowserTools_LanguageServiceFormattingEnd);
        //}

        //private void FormatSelection(SnapshotSpan span, FormattingRequestKind formattingRequestKind)
        //{
        //    Stopwatch timeInTask = new Stopwatch();

        //    int startPosition = span.Start.GetContainingLine().Start;
        //    int endPosition = span.End.GetContainingLine().End;

        //    span = EditorUtilities.CreateSnapshotSpan(span.Snapshot, startPosition, endPosition - startPosition);

        //    SnapshotSpan? mappedSnapshotSpan = this.MapDownSnapshotSpan(span);

        //    if (mappedSnapshotSpan.HasValue)
        //    {
        //        this.Format(mappedSnapshotSpan.Value, formattingRequestKind, prerequisiteTokenTest: null, timeInTask: timeInTask);
        //    }
        //}

        public FormatOnSemicolon(caretPosition: number): Services.TextEdit[]
        {
            //CodeMarkers.Instance.CodeMarker(CodeMarkerEvent.perfBrowserTools_LanguageServiceFormattingBegin);

            //Stopwatch timeInTask = new Stopwatch();

            var caret = new SnapshotPoint(this.snapshot, caretPosition);
            var semicolonPoint = caret.Add(-1);
            var mappedPoint = this.MapDownSnapshotPoint(semicolonPoint);

            if (mappedPoint !== null) {
                var span = this.FindStatementSpan(mappedPoint, FormattingRequestKind.FormatOnSemicolon);

                if (span != null) {
                    return this.Format(span, FormattingRequestKind.FormatOnSemicolon,
                        (tokens, requestKind) => { return !this.IsInsideStringLiteralOrComment(mappedPoint, tokens); });
                }
            }

            //CodeMarkers.Instance.CodeMarker(CodeMarkerEvent.perfBrowserTools_LanguageServiceFormattingEnd);
            return [];
        }

        public FormatOnClosingCurlyBrace(caretPosition: number): Services.TextEdit[]{
            //CodeMarkers.Instance.CodeMarker(CodeMarkerEvent.perfBrowserTools_LanguageServiceFormattingBegin);

            //Stopwatch timeInTask = new Stopwatch();
            var caret = new SnapshotPoint(this.snapshot, caretPosition);

            var closeBracePoint = caret.Add(-1);
            var mappedPoint = this.MapDownSnapshotPoint(closeBracePoint);

            if (mappedPoint !== null) {
                var span = this.FindMatchingBlockSpan(mappedPoint, FormattingRequestKind.FormatOnClosingCurlyBrace);

                if (span != null) {
                    return this.Format(span, FormattingRequestKind.FormatOnClosingCurlyBrace,
                        (tokens, requestKind) => { return !this.IsInsideStringLiteralOrComment(mappedPoint, tokens); });
                }
            }

            return [];
            //CodeMarkers.Instance.CodeMarker(CodeMarkerEvent.perfBrowserTools_LanguageServiceFormattingEnd);
        }

        //public void FormatOnEnter(SnapshotPoint caret)
        //{
        //    CodeMarkers.Instance.CodeMarker(CodeMarkerEvent.perfBrowserTools_LanguageServiceFormattingBegin);

        //    Stopwatch timeInTask = new Stopwatch();

        //    int lineNumber = this.textView.TextSnapshot.GetLineNumberFromPosition(caret);

        //    if (lineNumber > 0)
        //    {
        //        // Format both lines
        //        ITextSnapshotLine prevLine = this.textView.TextSnapshot.GetLineFromLineNumber(lineNumber - 1);
        //        ITextSnapshotLine currentLine = this.textView.TextSnapshot.GetLineFromLineNumber(lineNumber);
        //        SnapshotSpan? mappedSnapshotSpan = this.MapDownSnapshotSpan(new SnapshotSpan(prevLine.Start, currentLine.End));

        //        if (mappedSnapshotSpan.HasValue)
        //        {
        //            this.Format(mappedSnapshotSpan.Value, FormattingRequestKind.FormatOnEnter, prerequisiteTokenTest: null, timeInTask: timeInTask);
        //        }
        //    }

        //    CodeMarkers.Instance.CodeMarker(CodeMarkerEvent.perfBrowserTools_LanguageServiceFormattingEnd);
        //}

        private FindMatchingBlockSpan(bracePoint: SnapshotPoint, formattingRequestKind: FormattingRequestKind): SnapshotSpan {
            var authoringProxy = this.fileAuthoringProxy;
            var matchingBlockTask = new MatchingBlockFinderTask(bracePoint, authoringProxy);

            //authoringProxy.Scheduler.QueueTask(matchingBlockTask);

            //if (!this.TaskFinishedInTime(timeInTask, matchingBlockTask, formattingRequestKind))
            //{
            //    return null;
            //}

            var blockSpan = matchingBlockTask.Run();

            if (blockSpan !== null) {
                return new SnapshotSpan(bracePoint.snapshot, blockSpan);
            }
            else {
                return null;
            }
        }

        private FindStatementSpan(semicolonPoint: SnapshotPoint, formattingRequestKind: FormattingRequestKind): SnapshotSpan {
            var authoringProxy = this.fileAuthoringProxy;
            var statementFinderTask = new StatementFinderTask(this.logger, semicolonPoint, authoringProxy);

            //authoringProxy.Scheduler.QueueTask(statementFinderTask);

            //if (!this.TaskFinishedInTime(timeInTask, statementFinderTask, formattingRequestKind)) {
            //    return null;
            //}
            statementFinderTask.Run();

            if (statementFinderTask.BlockSpan != null) {
                return new SnapshotSpan(semicolonPoint.snapshot, statementFinderTask.BlockSpan);
            }
            else {
                return null;
            }
        }

        //    private SnapshotSpan? MapDownSnapshotSpan(SnapshotSpan snapshotSpan)
        //    {
        //        IList<SnapshotSpan> mappedSpans = this.textView.BufferGraph.MapDownToBuffer(snapshotSpan, SpanTrackingMode.EdgeInclusive, this.textBuffer);
        //        if (mappedSpans == null || mappedSpans.Count == 0)
        //            return null;

        //        SnapshotSpan firstSpan = mappedSpans.First();
        //        SnapshotSpan lastSpan = mappedSpans.Last();

        //        return new SnapshotSpan(firstSpan.Start, lastSpan.End);
        //    }

        private MapDownSnapshotPoint(snapshotPoint: SnapshotPoint): SnapshotPoint {
            //TypeScript: No support for projection buffers
            return snapshotPoint;
            //return this.textView.BufferGraph.MapDownToBuffer(snapshotPoint, PointTrackingMode.Positive, this.textBuffer, PositionAffinity.Predecessor);
        }

        private GetTokens(span: SnapshotSpan): IList_TokenSpan {
            return Formatting.getTokensInSpan(this.logger, this.scriptSyntaxAST, this.tokenKindMap, span);
        }

        private IsInsideStringLiteralOrComment(point: SnapshotPoint, tokens: IList_TokenSpan): bool {
            if (point !== null) {
                var span = new Span(point.position, 1);

                for (var i = 0; i < tokens.count() ; i++) {
                    var token = tokens.get(i);
                    if (token.Span.OverlapsWith(span)) {
                        return token.Token == AuthorTokenKind.atkString || token.Token == AuthorTokenKind.atkComment;
                    }
                }
            }

            return false;
        }

        private Format(span: SnapshotSpan, formattingRequestKind: FormattingRequestKind, prerequisiteTokenTest: (a: IList_TokenSpan, b: FormattingRequestKind) => bool): Services.TextEdit[]
        {
            //this.core.DebugOutputPane.WriteLine("FormattingManager.Format called.");

            //if (span.Snapshot.TextBuffer != this.textBuffer)
            //    return;

            if (span.IsEmpty() || !this.CanFormatSpan(span))
                return [];

            //var authoringProxy = this.scriptContext.FileAuthoringProxy;

            // This empty task is queued to wait on the scheduler to flush all its tasks
            // We will be doing some more work on the UI thread and then Wait on 
            // this task to finish before we check for any parsing errors
            //SingleThreadTask schedulerFlushTask = authoringProxy.Scheduler.QueueTask(() => { }, "Formatting manager waiting on scheduler thread");

            // Wait for update or any other task to finish and check for error status
            //if (!this.TaskFinishedInTime(timeInTask, schedulerFlushTask, formattingRequestKind))
            //{
            //    return;
            //}

            //TODO:
            var scriptHasErrors = false;
            //bool scriptHasErrors = (this.scriptContext.FileStatus & AuthorFileStatus.afsErrors) == AuthorFileStatus.afsErrors;

            if (scriptHasErrors /*&& !this.core.UserSettings.FormatIndentationInPresenceOfErrors*/) {
                // Cannot continue because the file contains errors.
                return [];
            }

            // Ensure the rules map is initialized. This is done once every time user settings are changed
            //this.EnsureRulesMapInitialized();

            // Always format from the beginning of the line
            var startLinePoint = span.start().GetContainingLine().start();
            span = new SnapshotSpan(startLinePoint.snapshot, Span.FromBounds(startLinePoint.position, span.endPosition()));

            // Get the tokens in the given span.
            var tokens: IList_TokenSpan = TypeScript.timeFunction(this.logger, "FormattingManager: GetTokens()", () => { return this.GetTokens(span); });

            if (prerequisiteTokenTest != null && !prerequisiteTokenTest(tokens, formattingRequestKind))
                return [];

            // Collect indentations from the host language in case of embedded script
            var languageHostIndentation = null;
            //TypeScript: No support for projection buffers
            //if (this.containedLanguageHost != null)
            //{
            //    int startLineNumber = span.Snapshot.GetLineNumberFromPosition(span.Start.Position);
            //    languageHostIndentation = this.containedLanguageHost.GetLineIndent(startLineNumber).IndentString;
            //}

            // Start the formatting task and wait for it to finish
            var editorOptions = this.editorOptions;

            var formattingTask = new FormattingTask(
                this.logger,
                this.snapshot,
                span,
                tokens,
                this.fileAuthoringProxy,
                this.rulesProvider,
                editorOptions,
                languageHostIndentation,
                scriptHasErrors,
                formattingRequestKind);

            formattingTask.Run();
            var result: Services.TextEdit[] = [];
            formattingTask.EditCommands.foreach((item) => {
                var edit = new Services.TextEdit(item.position, item.position + item.Length, item.replaceWith);
                result.push(edit);
            });
            return result;
            //authoringProxy.Scheduler.QueueTask(formattingTask);

            //if (!this.TaskFinishedInTime(timeInTask, formattingTask, formattingRequestKind))
            //{
            //    return;
            //}

            // Apply edits to the textBuffer
            //if (formattingTask.EditCommands.Count > 0)
            //{
            //    ITextSnapshot formattedSnapshot = null;

            //    EditorUtilities.PerformActionInUndo(this.textView, this.undoHistory, this.editorOperations, Strings.FormattingEditsTransactionName, () =>
            //        {
            //            using (ITextEdit textEdit = this.textBuffer.CreateEdit())
            //            {
            //                foreach (var editCommand in formattingTask.EditCommands)
            //                {
            //                    textEdit.Replace(editCommand.Position, editCommand.Length, editCommand.ReplaceWith);
            //                }

            //                formattedSnapshot = textEdit.Apply();
            //                return true;
            //            }
            //        });

            //    // Smartindent runs before formatting. So, in the case of format on enter that modifies the line
            //    // we need to run smart indentation again to fix the position based on the new changes
            //    if (formattedSnapshot != null &&
            //        formattingRequestKind == FormattingRequestKind.FormatOnEnter &&
            //        this.core.UserSettings.SmartIndentEnabled &&
            //        this.core.GlobalEditorOptions.IndentStyle != TextManager.Interop.vsIndentStyle.vsIndentStyleNone)
            //    {
            //        var formattedSpan = span.TranslateTo(formattedSnapshot, SpanTrackingMode.EdgeInclusive);
            //        this.DoSmartIndent(formattedSpan);
            //    }
            //}
        }

        //    public ISmartIndent GetSmartIndenter()
        //    {
        //        Microsoft.VisualStudio.Utilities.PropertyCollection textViewProperties;
        //        ISmartIndent smartIndenter;

        //        if (this.scriptContext.TextViewProperties.TryGetProperties(this.textView, out textViewProperties) &&
        //            textViewProperties.TryGetProperty(typeof(SmartIndentProvider.SmartIndenter), out smartIndenter))
        //        {
        //            return smartIndenter;
        //        }

        //        return null;
        //    }

        //    private void DoSmartIndent(SnapshotSpan formattedSpan)
        //    {
        //        // Only handle the lines that are empty, because the formatter already took care of lines with tokens
        //        var line = formattedSpan.End.GetContainingLine();
        //        if (line.Length == 0)
        //        {
        //            ISmartIndent smartIndenter = this.GetSmartIndenter();
        //            if (smartIndenter != null)
        //            {
        //                int? newIndent = smartIndenter.GetDesiredIndentation(line);
        //                if (newIndent.HasValue)
        //                {
        //                    SnapshotPoint? mappedPoint = this.MapPointToView(line.Start);
        //                    if (mappedPoint != null)
        //                    {
        //                        VirtualSnapshotPoint virtualPoint = new VirtualSnapshotPoint(mappedPoint.Value, newIndent.Value);
        //                        this.editorOperations.SelectAndMoveCaret(virtualPoint, virtualPoint, TextSelectionMode.Stream, EnsureSpanVisibleOptions.ShowStart);
        //                    }
        //                }
        //            }
        //        }
        //    }

        //    private SnapshotPoint? MapPointToView(SnapshotPoint point)
        //    {
        //        if (this.textBuffer == this.textView.TextBuffer)
        //            return point;

        //        return this.textView.BufferGraph.MapUpToBuffer(point, PointTrackingMode.Positive, PositionAffinity.Successor, this.textView.TextBuffer);
        //    }

        //    private bool TaskFinishedInTime(Stopwatch taskAccumulateTime, SingleThreadTask task, FormattingRequestKind formattingRequestKind)
        //    {
        //        int timeout;

        //        switch (formattingRequestKind)
        //        {
        //            case FormattingRequestKind.FormatDocument:
        //            case FormattingRequestKind.FormatSelection:
        //                timeout = this.core.UserSettings.ExplicitFormatWaitTimeout;
        //                break;

        //            case FormattingRequestKind.FormatOnEnter:
        //            case FormattingRequestKind.FormatOnSemicolon:
        //            case FormattingRequestKind.FormatOnClosingCurlyBrace:
        //            case FormattingRequestKind.FormatOnPaste:
        //            default:
        //                timeout = this.core.UserSettings.ImplicitFormatWaitTimeout;
        //                break;
        //        }

        //        int adjustedTimeout = timeout - (int)taskAccumulateTime.ElapsedMilliseconds;
        //        if (adjustedTimeout <= 0)
        //            return false;

        //        taskAccumulateTime.Start();
        //        bool waitingResult = task.Wait(adjustedTimeout);
        //        taskAccumulateTime.Stop();

        //        if (!waitingResult)
        //        {
        //            task.Cancel();
        //            this.core.MessagePane.WriteLine(Strings.FormatRequestTimedOut, timeout);
        //            return false;
        //        }

        //        return true;
        //    }

        //    private void EnsureRulesMapInitializedAsync()
        //    {
        //        if (rulesMap == null)
        //        {
        //            // Queue a task in the threadpool to build the rules map on the background
        //            System.Threading.ThreadPool.QueueUserWorkItem((s) => { EnsureRulesMapInitialized(); }, null);
        //        }
        //    }

        //    private void EnsureRulesMapInitialized()
        //    {
        //        if (rulesMap == null)
        //        {
        //            lock (rulesMapInitLock)
        //            {
        //                if (rulesMap == null)
        //                {
        //                    List<Rule> activeRules = this.GetActiveRules();
        //                    rulesMap = new RulesMap(activeRules);
        //                }
        //            }
        //        }
        //    }

        //    private static void InvalidateRulesMap()
        //    {
        //        lock (rulesMapInitLock)
        //        {
        //            rulesMap = null;
        //        }
        //    }
    }
}
