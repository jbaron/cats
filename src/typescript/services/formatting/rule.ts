// Copyright (c) Microsoft. All rights reserved. Licensed under the Apache License, Version 2.0. 
// See LICENSE.txt in the project root for complete license information.

///<reference path='formatting.ts' />


module Formatting {
    export class Rule {
        constructor(
            public Descriptor: RuleDescriptor,
            public Operation: RuleOperation,
            public Flag: RuleFlags = RuleFlags.None) {
        }

        public toString() {
            return "[desc=" + this.Descriptor + "," +
                "operation=" + this.Operation + "," +
                "flag=" + this.Flag + "]";
        }
    }
}
