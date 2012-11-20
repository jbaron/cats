// Copyright (c) Microsoft. All rights reserved. Licensed under the Apache License, Version 2.0. 
// See LICENSE.txt in the project root for complete license information.

///<reference path='formatting.ts' />


module Formatting {
    export class IndentationEditInfo {
        public OrigIndentPosition: number;

        constructor(private textEditInfo: TextEditInfo) {
            this.OrigIndentPosition = this.textEditInfo.Position;
        }

        public Position(): number { { return this.textEditInfo.Position; } }
        public Indentation(): string { { return this.textEditInfo.ReplaceWith; } }

        public OrigIndentLength(): number { { return this.textEditInfo.Length; } }

        static create1(textEditInfo: TextEditInfo) {
            return new IndentationEditInfo(textEditInfo);
        }

        static create2(position: number, indentString: string, origPosition: number, origIndentLength: number) {
            var textEditInfo = new TextEditInfo(position, origIndentLength, indentString);
            var result = new IndentationEditInfo(textEditInfo);
            result.OrigIndentPosition = origPosition;
            return result;
        }
    }
}
