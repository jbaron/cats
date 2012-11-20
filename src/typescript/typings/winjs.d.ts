/* *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved. 
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0  
 
THIS CODE IS PROVIDED *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE, 
MERCHANTABLITY OR NON-INFRINGEMENT. 
 
See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

declare module WinJS {
    export function strictProcessing(): void;
    export module Binding {
        export function as(data: any): any;
        export class List {
        	constructor(data: any[]);
            public push(item: any): any;
            public indexOf(item: any): number;
            public splice(index: number, count: number, newelems: any[]): any[];
            public splice(index: number, count: number): any[];
            public splice(index: number): any[];
            public createFiltered(predicate: (x: any) => bool): List;
            public createGrouped(keySelector: (x: any) => any, dataSelector: (x:any) => any): List;
            public groups: any;
            public dataSource: any;
            public getAt: any;
        }
    }
    export module Namespace {
        export var define: any;
        export var defineWithParent: any;
    }
    export module Class {
        export function define(constructor: any, instanceMembers: any): any;
        export function derive(baseClass: any, constructor: any, instanceMembers: any): any;
        export function mix(constructor: any, mixin: any): any;
    }
    export function xhr(options: { type: string; url: string; user: string; password: string; headers: any; data: any; responseType: string; }): WinJS.Promise;
    export module Application {
        export interface IOHelper {
            exists(filename: string): bool;
            readText(fileName: string, def: string): WinJS.Promise;
            readText(fileName: string): WinJS.Promise;
            writeText(fileName: string, text: string): WinJS.Promise;
			remove(fileName: string): WinJS.Promise;
        }
        export var local: IOHelper;
        export var roaming: IOHelper;
        export var onactivated: EventListener;
        export var sessionState: any;
        export interface ApplicationActivationEvent extends Event {
            detail: any;
            setPromise(p: Promise): any;
        }
        export function addEventListener(type: string, listener: EventListener, capture?: bool): void;
        export var oncheckpoint: EventListener;  
        export function start(): void;
        export function stop(): void;
    }
    export class Promise {
    	constructor(init: (c: any, e: any, p: any) => void);
        public then: any;
        static join: any;
        static timeout: any;
    }
    export module Navigation {
        export var history: any;
        export var canGoBack: bool;
        export var canGoForward: bool;
        export var location: string;
        export var state: any;
        export function addEventListener(type: string, listener: EventListener, capture: bool): void;
		export function back(): void;
		export function forward(): void;
		export function navigate(location: any, initialState: any);
		export function navigate(location: any);	
		export function removeEventListener(type: string, listener: EventListener, capture: bool): void;	
		export var onbeforenavigate: CustomEvent;
		export var onnavigated: CustomEvent;
		export var onnavigating: CustomEvent;
    }
    export module Utilities {
        export function markSupportedForProcessing(obj: any): void;
		export enum Key {
			backspace = 8, 
			tab = 9, 
			enter = 13, 
			shift = 16, 
			ctrl = 17, 
			alt = 18, 
			pause = 19, 
			capsLock = 20, 
			escape = 27, 
			space = 32, 
			pageUp = 33, 
			pageDown = 34, 
			end = 35, 
			home = 36, 
			leftArrow = 37, 
			upArrow = 38, 
			rightArrow = 39, 
			downArrow = 40, 
			insert = 45, 
			deleteKey = 46, 
			num0 = 48, 
			num1 = 49, 
			num2 = 50, 
			num3 = 51, 
			num4 = 52, 
			num5 = 53, 
			num6 = 54, 
			num7 = 55, 
			num8 = 56, 
			num9 = 57, 
			a = 65, 
			b = 66, 
			c = 67, 
			d = 68, 
			e = 69, 
			f = 70, 
			g = 71, 
			h = 72, 
			i = 73, 
			j = 74, 
			k = 75, 
			l = 76, 
			m = 77, 
			n = 78, 
			o = 79, 
			p = 80, 
			q = 81, 
			r = 82, 
			s = 83, 
			t = 84, 
			u = 85, 
			v = 86, 
			w = 87, 
			x = 88, 
			y = 89, 
			z = 90, 
			leftWindows = 91, 
			rightWindows = 92, 
			numPad0 = 96, 
			numPad1 = 97, 
			numPad2 = 98, 
			numPad3 = 99, 
			numPad4 = 100, 
			numPad5 = 101, 
			numPad6 = 102, 
			numPad7 = 103, 
			numPad8 = 104, 
			numPad9 = 105, 
			multiply = 106, 
			add = 107, 
			subtract = 109, 
			decimalPoint = 110, 
			divide = 111, 
			f1 = 112, 
			f2 = 113, 
			f3 = 114, 
			f4 = 115, 
			f5 = 116, 
			f6 = 117, 
			f7 = 118, 
			f8 = 119, 
			f9 = 120, 
			f10 = 121, 
			f11 = 122, 
			f12 = 123, 
			numLock = 144, 
			scrollLock = 145, 
			semicolon = 186, 
			equal = 187, 
			comma = 188, 
			dash = 189, 
			period = 190, 
			forwardSlash = 191, 
			graveAccent = 192, 
			openBracket = 219, 
			backSlash = 220, 
			closeBracket = 221, 
			singleQuote = 222
		}
	}
    export module UI {  
		export var process: any;
		export var processAll: any;
		export var ListLayout: any;
		export var GridLayout: any;
		export var Pages: any;
		export var Menu: any;
		export var setOptions: any;
    }
}

interface Element {
	winControl: any; // TODO: This should be control?   
}

