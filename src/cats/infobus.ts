declare class EventEmitter {
    addListener(event: string, listener: Function): void;
    on(event: string, listener: Function): void;
    once(event: string, listener: Function): void;
    removeListener(event: string, listener: Function): void;
    removeAllListener(event: string): void;
    setMaxListeners(n: number): void;
    listeners(event: string): { Function; }[];
    emit(event: string, arg1: any, arg2: any): void;
}


var EM = <EventEmitter>require('events').EventEmitter;


module Cats {

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
        IDE: IDEEvent = new EM();
        SESSION: IDEEvent = new EM();
        EDITOR: IDEEvent = new EM();
        IntelliSense: IntelliSenseEvent = new EM();
        
        constructor() {
            console.info("initiated new InfoBus");
        }
        
    }

}