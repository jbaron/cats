// Copyright (c) Microsoft. All rights reserved. Licensed under the Apache License, Version 2.0. 
// See LICENSE.txt in the project root for complete license information.

///<reference path='formatting.ts' />


module Formatting {
    export class IndentationInfo {

        public Prefix: string;
        public Level: number;

        constructor(
            public prefix: string = null,
            public level: number = 0) {

            this.Prefix = this.prefix;
            this.Level = this.level;
        }
    }
}
