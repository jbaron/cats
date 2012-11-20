// Copyright (c) Microsoft. All rights reserved. Licensed under the Apache License, Version 2.0. 
// See LICENSE.txt in the project root for complete license information.

/// <references path="formatting.ts"/>

module Formatting {
    export interface IFormatter {
        FormatDocument(): void;
        FormatSelection(span: SnapshotSpan): void;
        FormatOnPaste(selection: SnapshotSpan): void;
        FormatOnSemicolon(caretPosition: number): Services.TextEdit[];
        FormatOnClosingCurlyBrace(caretPosition: number): Services.TextEdit[];
        FormatOnEnter(caret: SnapshotPoint): void;
        //ISmartIndent GetSmartIndenter();
    }
}
