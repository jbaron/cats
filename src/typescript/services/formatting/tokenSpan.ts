// Copyright (c) Microsoft. All rights reserved. Licensed under the Apache License, Version 2.0. 
// See LICENSE.txt in the project root for complete license information.

///<reference path='formatting.ts' />


module Formatting {
    export class TokenSpan {
        private _lineNumber: number;

        constructor(public Token: AuthorTokenKind, public tokenID: TypeScript.TokenID, public Span: SnapshotSpan) {
            this._lineNumber = null;
        }

        public lineNumber(): number {
            if (this._lineNumber === null) {
                this._lineNumber = this.Span.snapshot.GetLineNumberFromPosition(this.Span.startPosition());
            }

            return this._lineNumber;
        }

        public toString():string {
            var result = "[tokenKind=" + (<any>AuthorTokenKind)._map[this.Token] + ", " +
                "tokenID=" + (<any>TypeScript.TokenID)._map[this.tokenID] + ", " +
                "lineNumber=" + this._lineNumber + ", " +
                "span=" + this.Span + "]";
            return result;
        }
    }
}
