// Copyright (c) Microsoft. All rights reserved. Licensed under the Apache License, Version 2.0. 
// See LICENSE.txt in the project root for complete license information.

///<reference path='formatting.ts' />


module Formatting {
    export class RuleDescriptor {
        constructor(public LeftTokenRange: Shared.TokenRange, public RightTokenRange: Shared.TokenRange) {
        }

        public toString(): string {
            return "[leftRange=" + this.LeftTokenRange + "," +
                "rightRange=" + this.RightTokenRange + "]";
        }

        static create1(left: AuthorTokenKind, right: AuthorTokenKind): RuleDescriptor {
            return create4(Shared.TokenRange.FromToken(left), Shared.TokenRange.FromToken(right))
        }

        static create2(left: Shared.TokenRange, right: AuthorTokenKind): RuleDescriptor {
            return create4(left, Shared.TokenRange.FromToken(right));
        }

        static create3(left: AuthorTokenKind, right: Shared.TokenRange): RuleDescriptor
            //: this(TokenRange.FromToken(left), right)
        {
            return create4(Shared.TokenRange.FromToken(left), right);
        }

        static create4(left: Shared.TokenRange, right: Shared.TokenRange): RuleDescriptor {
            return new RuleDescriptor(left, right);
        }
    }
}
