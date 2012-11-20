// Copyright (c) Microsoft. All rights reserved. Licensed under the Apache License, Version 2.0. 
// See LICENSE.txt in the project root for complete license information.

///<reference path='typescriptServices.ts' />

module Services {
    export class Classifier {

        constructor(public host: IClassifierHost) {
        }

        private scanner = new TypeScript.Scanner();

        /// COLORIZATION
        public getClassificationsForLine(text: string, lexState: TypeScript.LexState): ClassificationResult {
            var result = new ClassificationResult();
            result.initialState = lexState;

            this.scanner.lexState = lexState;
            this.scanner.setText(text, TypeScript.LexMode.Line);
            var t = this.scanner.scan();
            while (t.tokenId != TypeScript.TokenID.EOF) {
                result.entries.push(new ClassificationInfo(this.scanner.pos, t.classification()));
                t = this.scanner.scan();
            }

            result.finalLexState = this.scanner.lexState;
            return result;
        }
    }

    export interface IClassifierHost extends TypeScript.ILogger {
    }

    export class ClassificationResult {
        public initialState: TypeScript.LexState;
        public finalLexState: TypeScript.LexState;
        public entries: ClassificationInfo[];

        constructor() {
            this.initialState = TypeScript.LexState.Start;
            this.finalLexState = TypeScript.LexState.Start;
            this.entries = [];
        }
    }

    export class ClassificationInfo {
        constructor(public length: number, public classification: TypeScript.TokenClass) {
        }
    }
}
