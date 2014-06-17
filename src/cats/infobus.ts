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

var Events = require('events');

module Cats {

    /**
     * Events related to the editor
     */ 
    export interface EditorEvent extends EventEmitter {
        on(event: string, listener: Function): void;
        on(event: "changed", cb: (fileName: string, content: string) => void): void;
        on(event: "hoover", cb: (fileName: string, content: string) => void): void;
        on(event: "completion", cb: (fileName: string, content: string) => void): void;
        on(event: "mode", cb): void;
        on(event: "overwrite", cb): void;

        emit(event: string, arg1: any, arg2: any): void;
        emit(event: "changed", fileName: string, content: string): void;
    }

    /**
     * Events related to the whole IDE
     */ 
    export interface IDEEvent extends EventEmitter {
        emit(event: string, ...args): void;
        emit(event: "busy", busy: boolean): void;
        emit(event: "sessions", sessions): void;
        emit(event: "activeSession", newsession, oldsession): void;


        on(event: string, fn: any): void;
        on(event: "busy", fn: (flag: boolean) => void): void;
        on(event: "sessions", fn: (sessions) => void): void;
        on(event: "activeSession", fn: (newsession, oldsession) => void): void;
    }

    /**
     * Events related to the intellisense features
     */ 
    export interface IntelliSenseEvent extends EventEmitter {
        emit(event: string, ...args): void;
        emit(event: "busy", busy: boolean): void;
        emit(event: "sessions", sessions): void;
        emit(event: "activeSession", newsession, oldsession): void;


        on(event: string, fn: any): void;
        on(event: "busy", fn: (flag: boolean) => void): void;
        on(event: "sessions", fn: (sessions) => void): void;
        on(event: "activeSession", fn: (newsession, oldsession) => void): void;
    }

    /**
     * Central infobus that transports all the events
     */ 
    export class InfoBus {
         IDE: IDEEvent = new Events.EventEmitter();
         SESSION: IDEEvent= new Events.EventEmitter();
         EDITOR: IDEEvent= new Events.EventEmitter();
         IntelliSense: IntelliSenseEvent= new Events.EventEmitter();
        
        constructor() {
            console.info("initiated new InfoBus");
        }
        
    }

}
