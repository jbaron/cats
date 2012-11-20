// Copyright (c) Microsoft. All rights reserved. Licensed under the Apache License, Version 2.0. 
// See LICENSE.txt in the project root for complete license information.

///<reference path='typescriptServices.ts' />

module Services {
    //
    // Encapsulate state about a single script source, with access to token stream and syntax-only AST.
    //
    export class ScriptSyntaxAST { 
        constructor(private logger: TypeScript.ILogger, private script: TypeScript.Script, private sourceText: TypeScript.ISourceText) {
        }

        public getLogger(): TypeScript.ILogger {
            return this.logger;
        }

        public getScriptId(): string {
            return this.script.locationInfo.filename;
        }

        public getScript(): TypeScript.Script {
            return this.script;
        }

        public getSourceText(): TypeScript.ISourceText {
            return this.sourceText;
        }

        public getTokenStream(minChar: number = 0, limChar?: number): TokenStream {
            //REVIEW: This can be extremely inefficient if the span is large, but this is 
            //        currently the only way since we don't store tokens in memory
            if (minChar > 0) {
                minChar = this.getTokenizationOffset(minChar);
            }

            if (!limChar) {
                limChar = this.getSourceText().getLength();
            }

            var scannerSourceText = this.getSourceText();
            if (minChar > 0 || limChar < scannerSourceText.getLength()) {
                scannerSourceText = new Services.SourceTextRange(scannerSourceText, minChar, limChar);
            }

            var scanner = new TypeScript.Scanner();
            scanner.resetComments();
            scanner.setSourceText(scannerSourceText, TypeScript.LexMode.File);
            scanner.setScanComments(true);

            var tokenStream = new TokenStream(scanner, minChar);
            return tokenStream;
        }

        public getTokenizationOffset(position: number): number {
            return TypeScript.getTokenizationOffset(this.script, position);
        }

        public getAstPathToPosition(pos: number, options = TypeScript.GetAstPathOptions.Default): TypeScript.AstPath {
            return TypeScript.getAstPathToPosition(this.script, pos, options);
        }
    }

    export class TokenStream {
        private currentToken: TypeScript.Token;

        constructor(private scanner: TypeScript.Scanner, private offset: number) {
            this.currentToken = null;
        }

        public moveNext(): bool {
            this.currentToken = this.scanner.scan();
            if (this.currentToken.tokenId === TypeScript.TokenID.EOF) {
                return false;
            }
            return true;
        }

        public sourceTextOffset() {
            return this.offset;
        }

        public tokenId(): TypeScript.TokenID {
            return this.currentToken.tokenId;
        }

        public tokenStartPos(): number {
            return this.offset + this.scanner.startPos;
        }

        public tokenEndPos(): number {
            return this.offset + this.scanner.pos;
        }
    }

    export class TokenStreamHelper {
        constructor (public stream: TokenStream) {
            this.moveNext();
        }

        public moveNext(): bool {
            do  {
                if (!this.stream.moveNext())
                    return false;
            } while (this.tokenId() === TypeScript.TokenID.Comment)

            return true;
        }

        public expect(token: TypeScript.TokenID): bool {
            if (this.stream.tokenId() === token) {
                this.moveNext();
                return true;
            }

            return false;
        }

        public skipToOffset(pos: number): bool {
            while (this.tokenStartPos() < pos) {
                if (!this.moveNext())
                    return false;
            }

            return true;
        }

        public tokenId(): TypeScript.TokenID {
            return this.stream.tokenId();
        }

        public tokenStartPos(): number {
            return this.stream.tokenStartPos();
        }

        public tokenEndPos(): number {
            return this.stream.tokenEndPos();
        }
    }
}
