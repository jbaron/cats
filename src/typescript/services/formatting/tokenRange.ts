// Copyright (c) Microsoft. All rights reserved. Licensed under the Apache License, Version 2.0. 
// See LICENSE.txt in the project root for complete license information.

///<reference path='formatting.ts' />


module Formatting {
    export module Shared {
        export interface ITokenAccess {
            GetTokens(): List_AuthorTokenKind;
            Contains(token: AuthorTokenKind): bool;
        }

        export class TokenRangeAccess implements ITokenAccess {
            private tokens: List_AuthorTokenKind;

            constructor(from: AuthorTokenKind, to: AuthorTokenKind, except: AuthorTokenKind[]) {
                this.tokens = new List_AuthorTokenKind();
                for (var token = from; token <= to; token++) {
                    if (except.indexOf(token) < 0) {
                        this.tokens.add(token);
                    }
                }
            }

            public GetTokens(): List_AuthorTokenKind {
                return this.tokens;
            }

            public Contains(token: AuthorTokenKind): bool {
                return this.tokens.contains(token);
            }


            public toString(): string {
                return "[tokenRangeStart=" + (<any>AuthorTokenKind)._map[this.tokens.get(0)] + "," +
                 "tokenRangeEnd=" + (<any>AuthorTokenKind)._map[this.tokens.get(this.tokens.count()-1)] + "]";
            }
        }

        export class TokenValuesAccess implements ITokenAccess {
            private tokens: List_AuthorTokenKind;

            constructor(tks: AuthorTokenKind[]) {
                this.tokens = new List_AuthorTokenKind();
                this.tokens.addAll(tks);
            }

            public GetTokens(): List_AuthorTokenKind {
                return this.tokens;
            }

            public Contains(token: AuthorTokenKind): bool {
                return this.GetTokens().contains(token);
            }
        }

        export class TokenSingleValueAccess implements ITokenAccess {
            constructor(public token: AuthorTokenKind) {
            }

            public GetTokens(): List_AuthorTokenKind {
                var result = new List_AuthorTokenKind();
                result.add(this.token);
                return result;
            }

            public Contains(tokenValue: AuthorTokenKind): bool {
                return tokenValue == this.token;
            }

            public toString(): string {
                return "[singleTokenKind=" + (<any>AuthorTokenKind)._map[this.token] + "]";
            }
        }

        export class TokenAllAccess implements ITokenAccess {
            public GetTokens(): List_AuthorTokenKind {
                var result = new List_AuthorTokenKind();
                for (var token = AuthorTokenKind.atkEnd; token < AuthorTokenKind.Length; token++) {
                    result.add(token);
                }
                return result;
            }

            public Contains(tokenValue: AuthorTokenKind): bool {
                return true;
            }

            public toString(): string {
                return "[allTokens]";
            }
        }

        export class TokenRange {
            constructor(public tokenAccess: ITokenAccess) {
            }

            static FromToken(token: AuthorTokenKind): TokenRange {
                return new TokenRange(new TokenSingleValueAccess(token));
            }

            static FromTokens(tokens: AuthorTokenKind[]): TokenRange {
                return new TokenRange(new TokenValuesAccess(tokens));
            }

            static FromRange(f: AuthorTokenKind, to: AuthorTokenKind, except: AuthorTokenKind[] = []): TokenRange {
                return new TokenRange(new TokenRangeAccess(f, to, except));
            }

            static AllTokens(): TokenRange {
                return new TokenRange(new TokenAllAccess());
            }

            public GetTokens(): List_AuthorTokenKind {
                return this.tokenAccess.GetTokens();
            }

            public Contains(token: AuthorTokenKind): bool {
                return this.tokenAccess.Contains(token);
            }

            public toString(): string {
                return this.tokenAccess.toString();
            }

            static Any: TokenRange = AllTokens();
            static Keywords = TokenRange.FromRange(AuthorTokenKind.atkBreak, AuthorTokenKind.atkWith);
            static Operators = TokenRange.FromRange(AuthorTokenKind.atkSColon, AuthorTokenKind.atkScope);
            static BinaryOperators = TokenRange.FromRange(AuthorTokenKind.atkAsg, AuthorTokenKind.atkPct);
            static BinaryKeywordOperators = TokenRange.FromTokens([AuthorTokenKind.atkIn, AuthorTokenKind.atkInstanceof]);
            static ReservedKeywords = TokenRange.FromRange(AuthorTokenKind.atkImplements, AuthorTokenKind.atkYield);
            static UnaryPrefixOperators = TokenRange.FromTokens([AuthorTokenKind.atkAdd, AuthorTokenKind.atkSub, AuthorTokenKind.atkTilde, AuthorTokenKind.atkBang]);
            static UnaryPrefixExpressions = TokenRange.FromTokens([AuthorTokenKind.atkNumber, AuthorTokenKind.atkIdentifier, AuthorTokenKind.atkLParen, AuthorTokenKind.atkLBrack, AuthorTokenKind.atkLCurly, AuthorTokenKind.atkThis, AuthorTokenKind.atkNew]);
            static UnaryPreincrementExpressions = TokenRange.FromTokens([AuthorTokenKind.atkIdentifier, AuthorTokenKind.atkLParen, AuthorTokenKind.atkThis, AuthorTokenKind.atkNew]);
            static UnaryPostincrementExpressions = TokenRange.FromTokens([AuthorTokenKind.atkIdentifier, AuthorTokenKind.atkRParen, AuthorTokenKind.atkRBrack, AuthorTokenKind.atkNew]);
            static UnaryPredecrementExpressions = TokenRange.FromTokens([AuthorTokenKind.atkIdentifier, AuthorTokenKind.atkLParen, AuthorTokenKind.atkThis, AuthorTokenKind.atkNew]);
            static UnaryPostdecrementExpressions = TokenRange.FromTokens([AuthorTokenKind.atkIdentifier, AuthorTokenKind.atkRParen, AuthorTokenKind.atkRBrack, AuthorTokenKind.atkNew]);
        }
    }
}
