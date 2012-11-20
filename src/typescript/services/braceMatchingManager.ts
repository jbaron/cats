// Copyright (c) Microsoft. All rights reserved. Licensed under the Apache License, Version 2.0. 
// See LICENSE.txt in the project root for complete license information.

///<reference path='typescriptServices.ts' />

module Services {

    export class BraceMathingManager {

        constructor(private scriptSyntaxAST: Services.ScriptSyntaxAST) {
        }

        // Given a script name and position in the script, return a pair of text range if the 
        // position corresponds to a "brace matchin" characters (e.g. "{" or "(", etc.)
        // If the position is not on any range, return "null".
        public getBraceMatchingAtPosition(position: number): TextRange[]{
            var openBraces = "{([";
            var openBracesTokens = [TypeScript.TokenID.LCurly, TypeScript.TokenID.LParen, TypeScript.TokenID.LBrack];
            var closeBraces = "})]";
            var closeBracesTokens = [TypeScript.TokenID.RCurly, TypeScript.TokenID.RParen, TypeScript.TokenID.RBrack];

            var result = new TextRange[]();
            var character = this.scriptSyntaxAST.getSourceText().getText(position, position + 1);
            var openBraceIndex = openBraces.indexOf(character);
            if (openBraceIndex >= 0) {
                var closeBracePos = this.getMatchingBraceForward(position, openBracesTokens[openBraceIndex], closeBracesTokens[openBraceIndex]);
                if (closeBracePos >= 0) {
                    var range1 = new TextRange(position, position + 1);
                    var range2 = new TextRange(closeBracePos, closeBracePos + 1);
                    result.push(range1, range2);
                }
            }

            character = this.scriptSyntaxAST.getSourceText().getText(position - 1, position);
            var closeBraceIndex = closeBraces.indexOf(character);
            if (closeBraceIndex >= 0) {
                var openBracePos = this.getMatchingBraceBackward(position - 1, closeBracesTokens[closeBraceIndex], openBracesTokens[closeBraceIndex]);
                if (openBracePos >= 0) {
                    var range1 = new TextRange(position - 1, position);
                    var range2 = new TextRange(openBracePos, openBracePos + 1);
                    result.push(range1, range2);
                }
            }
            return result;
        }

        public getMatchingBraceForward(position: number, openToken: TypeScript.TokenID, closeToken: TypeScript.TokenID): number {
            var tokenStream = this.scriptSyntaxAST.getTokenStream()
            var balanceCount = 0;
            var foundOpenToken = false;
            while (tokenStream.moveNext()) {
                if (tokenStream.tokenStartPos() === position) {
                    if (tokenStream.tokenId() === openToken) {
                        foundOpenToken = true;
                    }
                    else {
                        break;
                    }
                }

                if (foundOpenToken) {
                    if (tokenStream.tokenId() === openToken) {
                        balanceCount++;
                    }
                    else if (tokenStream.tokenId() === closeToken) {
                        balanceCount--;
                        if (balanceCount === 0) {
                            return tokenStream.tokenStartPos();
                        }
                    }
                }
            }

            return -1;
        }

        public getMatchingBraceBackward(position: number, closeToken: TypeScript.TokenID, openToken: TypeScript.TokenID): number {
            var tokenStream = this.scriptSyntaxAST.getTokenStream();
            var openTokenPositions: number[] = [];
            var foundOpenToken = false;
            while (tokenStream.moveNext()) {
                // We didn't find the close token: no match!
                if (tokenStream.tokenStartPos() > position) {
                    break;
                }

                // Found the close brace: return position of most recently found open token
                if (tokenStream.tokenStartPos() === position && tokenStream.tokenId() === closeToken) {
                    if (openTokenPositions.length > 0) {
                        return openTokenPositions[openTokenPositions.length - 1];
                    }
                    break;
                }

                if (tokenStream.tokenId() === openToken) {
                    openTokenPositions.push(tokenStream.tokenStartPos());
                }
                else if (tokenStream.tokenId() === closeToken) {
                    if (openTokenPositions.length > 0) {
                        openTokenPositions.pop();
                    }
                }
            }

            return -1;
        }
    }
}
