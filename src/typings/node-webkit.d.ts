declare var process: any;
declare var global: any;
declare var require: any;
    
declare module "nw.gui" {


	interface EventEmitter {
	    addListener(event: string, listener: Function);
	    on(event: string, listener: Function);
	    once(event: string, listener: Function): void;
	    removeListener(event: string, listener: Function): void;
	    removeAllListener(event: string): void;
	    setMaxListeners(n: number): void;
	    listeners(event: string): { Function; }[];
	    emit(event: string, arg1?: any, arg2?: any): void;
	}
	
	interface MenuConfig {
		type?:string;
	}

	interface Menu {
		new(config?:MenuConfig);		
		items: MenuItem[];		
		append(item:MenuItem);
		remove(item:MenuItem);
		insert(item:MenuItem, atPosition:number);
		removeAt(index:number);
		popup(x:number,y:number);

	}


	interface MenuItemConfig {
		label?:string;
		click?:Function;
		type?:string;
		submenu?:Menu;
		icon?:string;
		tooltip?:string;
		checked?:bool;
		enabled?:bool;		
	}

	interface MenuItem extends MenuItemConfig, EventEmitter {
		new(config:MenuItemConfig);
	}

	interface IWindow {
		menu:Menu;
		showDevTools();	
        on(event:string,handler:Function);
        close(force:bool);
	}

	declare var MenuItem:MenuItem;
	declare var Menu:Menu
	declare var Window: { 
        get() : IWindow; 
        open(url:string, options):IWindow;
    };
	declare var App : {
        argv: any;  
        closeAllWindows();
        quit();
	}
}