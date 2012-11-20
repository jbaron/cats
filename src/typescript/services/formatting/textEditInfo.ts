// Copyright (c) Microsoft. All rights reserved. Licensed under the Apache License, Version 2.0. 
// See LICENSE.txt in the project root for complete license information.

///<reference path='formatting.ts' />


module Formatting {
    export class TextEditInfo {

        public Position: number;
        public Length: number;
        public ReplaceWith: string;

        constructor(public position: number, public length: number, public replaceWith: string) {
            this.Position = this.position;
            this.Length = length;
            this.ReplaceWith = this.replaceWith;
        }
    }
}
