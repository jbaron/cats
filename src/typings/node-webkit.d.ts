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

// declare var process: any;
// declare var global: any; // Also defined in typescript.d.ts
// declare var require: any;
declare var global:any;


declare class EventEmitter {
    addListener(event: string, listener: Function): void;
    on(event: string, listener: Function): void;
    once(event: string, listener: Function): void;
    removeListener(event: string, listener: Function): void;
    removeAllListener(event: string): void;
    setMaxListeners(n: number): void;
    listeners(event: string): Function[];
    emit(event: string, arg1: any, arg2: any, arg3: any): void;
}


declare module nw.gui {

	interface MenuConfig {
		type?:string;
	}

	interface Menu {
		new(config?:MenuConfig):Menu;		
		items: MenuItem[];		
		append(item:MenuItem):void;
		remove(item:MenuItem):void;
		insert(item:MenuItem, atPosition:number):void;
		removeAt(index:number):void;
		popup(x:number,y:number):void;

	}


	interface MenuItemConfig {
		label?:string;
		click?:Function;
		type?:string;
		submenu?:Menu;
		icon?:string;
		tooltip?:string;
		checked?:boolean;
		enabled?:boolean;		
	}

	interface MenuItem extends MenuItemConfig, EventEmitter {
		new(config:MenuItemConfig):MenuItem;
	}

	interface IWindow {
		menu:Menu;
		showDevTools():void;	
        on(event:string,handler:Function):void;
        close(force:boolean):void;
	}

	var MenuItem:MenuItem;
	var Menu:Menu;
	var Window: { 
        get() : IWindow; 
        open(url:string, options:{}):IWindow;
    };
	var App : {
        argv: any;  
        closeAllWindows():void;
        quit():void;
	};
}
