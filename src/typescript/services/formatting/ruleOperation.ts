// Copyright (c) Microsoft. All rights reserved. Licensed under the Apache License, Version 2.0. 
// See LICENSE.txt in the project root for complete license information.

///<reference path='formatting.ts' />


module Formatting {
    export class RuleOperation {
        public Context: RuleOperationContext;
        public Action: RuleAction;

        constructor() {
            this.Context = null;
            this.Action = null;
        }

        public toString(): string {
            return "[context=" + this.Context + "," +
                "action=" + this.Action + "]";
        }

        static create1(action: RuleAction) {
            return create2(RuleOperationContext.Any, action)
        }

        static create2(context: RuleOperationContext, action: RuleAction) {
            var result = new RuleOperation();
            result.Context = context;
            result.Action = action;
            return result;
        }
    }
}
