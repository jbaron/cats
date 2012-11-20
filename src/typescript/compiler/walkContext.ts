// Copyright (c) Microsoft. All rights reserved. Licensed under the Apache License, Version 2.0. 
// See LICENSE.txt in the project root for complete license information.

///<reference path='typescript.ts' />

module Tools {
    export interface IWalkContext {
        goChildren: bool;
        goNextSibling: bool;
        // visit siblings in reverse execution order
        reverseSiblings: bool;
    }

    export class BaseWalkContext implements IWalkContext {
        public goChildren = true;
        public goNextSibling = true;
        public reverseSiblings = false;
    }
}