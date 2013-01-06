module Cats.Commands {


	export interface Command {
		name:string;
		label: string;
		command: ()=>void;
		icon: string;
		shortcuts: string;
	};

    function getLabel(name:string):string { return ""}
    function getIcon(name:string) :string{return ""}
    function getShortcuts(name:string) :string{return ""}

	private commands = {};
    private commandList:Command[] =[];

	export function register(name:string, command:()=>void)  {
		var cmd = {
			name:name,
			command:command,
			icon:getIcon(name),
			label:getLabel(name),
			shortcuts:getShortcuts(name)
		}

		commands[name] = cmd;
        commandList.push(cmd);
	}

	export function get(name:string) :Command {
		return commands[name];
	}

	export function init() {
		EditorCommands.init(register);
		FileCommands.init(register);
		HelpCommands.init(register);
		ProjectCommands.init(register);
	}


}