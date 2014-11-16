//
// Copyright (c) JBaron.  All rights reserved.
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//


module Cats {

    export class Attribute {
        name: string;
        modifiers: string[];
        type: string;
    }

    export interface IconMap {
        kind: Map<string>;
        tab: Map<string>;
        annotation: Map<string>;
        mimetype: Map<string>;
        toolbar: Map<string>;
    }

    export interface CB<T> {
        (err:any, result:T): void;
    }

   export interface ModelEntry {
        type: string;
        name: string;
        operations?: Array<string>;
        attributes?: Array<Attribute>;
        extends?: Array<string>;
        implements?: Array<string>;
    }   

    export interface OutlineModelEntry{
        label: string;
        pos: Position;
        kind: string;
        kids: OutlineModelEntry[];
    };


    export interface Range {
        start: Position;
        end: Position;
    }

    export enum Severity {
        Info = <any>"info",
        Warning = <any>"warning",
        Error = <any>"error"
    }

    

    export interface FileRange {
        fileName: string;
        range: Range;
        message?: string;
        context?: string;
        severity?: Severity;
    }

}
