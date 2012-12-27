///<reference path='node.d.ts'/>

declare module "nw.gui" {
	
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
		get();
		menu:Menu;
		showDevTools();
		open(url:string, options);
	}

	declare var MenuItem:MenuItem;
	declare var Menu:Menu
	declare var Window:IWindow;
	declare var App;
}