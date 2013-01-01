// Right now only defined what CATS is actually using

module Ace {

	interface EditorCommand {
		name:string;
        bindKey:any;
        exec:Function;
	}

	interface CommandManager {
		byName;
		commands;
		addCommands(commands:EditorCommand[]);
		addCommand(command:EditorCommand);
		platform: string; // win or mac
	}

	interface Annotation {
		 row: number;
         column: number;
         text: string;
         type: string;
	}

	interface Document {
		getAllLines(): string[];
		getLines(firstRow:number, lastRow:number) : string[];
	}

	interface Range {
		startRow:number;
		startColumn:number;
		endRow:number;
		endColumn:number;
	}

	interface UndoManager {
		new();
		undo(dontSelect?: bool);
		redo(dontSelect?:bool): Range;
		reset():void;
		hasUndo(): bool;
		hasRedo(): bool;
	}

	interface TokenInfo {
		value: string;
	}

	interface EditSession {
		new(content:string, mode:string);
		getUndoManager():UndoManager;
		getValue():string;
		getDocument():Document;
		setMode(mode:string);
		setUndoManager(manager:UndoManager);
		on: (event:string, handler:Function) => void;
		screenToDocumentPosition(x:number,y:number);
		getLine(row:number):string;
		removeListener(event:string, listener:Function);
		removeAllListeners(event:string);
		getTokenAt(row:number, column:number): TokenInfo;	
		setAnnotations(annotations:Annotation[]);
	}

	interface Position {
		row: number;
		column: number;
	}

	interface Editor {
		find(value:string,options,something);
		focus();
		replace(value:string,options);
		session:EditSession;
		renderer;
		keyBinding;
		clearSelection();
        onTextInput:Function;
        getSelectionRange(): Range;
		remove(direction:string);
		insert(text:string);
		container: HTMLElement;
		commands:CommandManager;
		setSession(session:EditSession);
		getCursorPosition():Position;
		execCommand(command:string);
		getSession():EditSession;
		setTheme(theme:string);
		getTheme():string;
		moveCursorTo(row:number, column:number);
		setFontSize(cssSize: string);
	}


}

declare var ace;