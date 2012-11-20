// Copyright (c) Microsoft. All rights reserved. Licensed under the Apache License, Version 2.0. 
// See LICENSE.txt in the project root for complete license information.

/// <references path="formatting.ts"/>

module Formatting {
    export enum FormattingRequestKind {
        FormatDocument,
        FormatSelection,
        FormatOnEnter,
        FormatOnSemicolon,
        FormatOnClosingCurlyBrace,
        FormatOnPaste
    }
}