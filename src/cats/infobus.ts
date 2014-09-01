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
     
    export interface InfoBus  {
        on(event: string, fn: any): void;
        emit(event: string, ...args): void;

        // Editor events
        on(ev: "editor.overwrite", fn: (value: boolean) => void): void;
        on(ev: "editor.mode", fn: (value: string) => void): void;
        on(ev: "editor.position", fn: (value: Position) => void): void;
        emit(event: "editor.overwrite", value: boolean): void;
        emit(event: "editor.mode", value: string): void;
        emit(event: "editor.position", value: Position): void;
        
        on(ev: "worker.busy", fn: (value: boolean) => void): void;
        emit(event: "worker.busy", value: boolean): void;
    }
}