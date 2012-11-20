// Copyright (c) Microsoft. All rights reserved. Licensed under the Apache License, Version 2.0. 
// See LICENSE.txt in the project root for complete license information.

///<reference path='formatting.ts' />

module Formatting {

    export class RuleOperationContext {
        private customContextChecks: { (context: FormattingContext): bool; }[];
        
        constructor(...funcs: { (context: FormattingContext): bool; }[]) {
            this.customContextChecks = funcs;
        }

        static Any: RuleOperationContext = new RuleOperationContext();


        public IsAny(): bool {
            { return this == RuleOperationContext.Any; }
        }

        public  InContext(context: FormattingContext): bool {
            if (this.IsAny()) {
                return true;
            }

            for (var i = 0, len = this.customContextChecks.length; i < len; i++) {
                if (!this.customContextChecks[i](context)) {
                    return false;
                }
            }
            return true;
        }
    }
}
