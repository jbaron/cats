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


// Right now only defined what CATS is actually using

declare module ace {



	interface EditorCommand {
		name:string;
        bindKey:any;
        exec:Function;
	}

	interface CommandManager {
		byName:any;
		commands:any;
		on: any;
		addCommands(commands:EditorCommand[]):void;
		addCommand(command:EditorCommand):void;
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
		createAnchor:any;
		getLines(firstRow:number, lastRow:number) : string[];
	}

	interface Range {
		new(startRow:number,startColumn:number,endRow:number,endColumn:number):Range;
		isEmpty() : boolean;
		start: Position;
		end: Position;
	}

	interface UndoManager {
		new():UndoManager;
		undo(dontSelect?: boolean):Range;
		redo(dontSelect?:boolean): Range;
		reset():void;
		hasUndo(): boolean;
		hasRedo(): boolean;
	}

	interface TokenInfo {
		value: string;
	}

	class EditSession {
		constructor(content:string, mode:string);
		getUndoManager():UndoManager;
		addMarker:any;
		removeMarker: any;
		getValue():string;
        setOverwrite(val:boolean):void;
        getOverwrite():boolean;
        setValue(value:string):void;
		getDocument():Document;
		doc: Document;
		setMode(mode:string):void;
        getSelection():any;
        setNewLineMode(mode:string):void; // unix, windows or auto
        getNewLineMode():string;
        getMode():any;
        setTabSize(size:number):void;
        setUseSoftTabs(softTabs:boolean):void;
		setUndoManager(manager:UndoManager):void;
		on: (event:string, handler:Function) => void;
		screenToDocumentPosition(x:number,y:number):Position;
		getLine(row:number):string;
		removeListener(event:string, listener:Function):void;
		removeAllListeners(event:string):void;
		getTokenAt(row:number, column:number): TokenInfo;	
		setAnnotations(annotations:Annotation[]):void;
		getAnnotations():Annotation[]
		replace(range:Range,newText:string):void;
	}

	interface Position {
		row: number;
		column: number;
	}

	interface Editor {
		find(value:string,options:{},something:any):void;
		focus():void;
		resize():void;
		completers:any;
		selection:any;
		insertSnippet:any;
		on(event:string,callback:any):void;
        setReadOnly(readOnly:boolean):void;
        getReadOnly():boolean;
		replace(value:string,options:{}):void;
		session:EditSession;
		renderer:any;
        resize(force:boolean):void;
		keyBinding:any;
		setOptions(options:any):void;
		clearSelection():void;
        centerSelection():void;
        onTextInput:Function;
        getSelectionRange(): Range;
		remove(direction:string):void;
		insert(text:string):void;
		container: HTMLElement;
		commands:CommandManager;
		setSession(session:EditSession):void;
		getCursorPosition(): Position;
		execCommand(command:string):void;
		getSession():EditSession;
		setTheme(theme:string):void;
		getTheme():string;
		moveCursorTo(row:number, column:number, animate?:boolean):void;
        moveCursorToPosition(position:Position):void;
		setFontSize(cssSize: string):void;
		setPrintMarginColumn(column:number):void;
		getShowInvisibles():boolean;
		setShowInvisibles(showInvisibles:boolean):void;
	}


// interface IAce {

    /**
     * Provides access to require in packed noconflict mode
     * @param moduleName
    **/
    function require(moduleName: string): any;

    /**
     * Embeds the Ace editor into the DOM, at the element provided by `el`.
     * @param el Either the id of an element, or the element itself
    **/
    function edit(el: string):Editor;

    /**
     * Embeds the Ace editor into the DOM, at the element provided by `el`.
     * @param el Either the id of an element, or the element itself
    **/
    function edit(el: HTMLElement):Editor;

    /**
     * Creates a new [[EditSession]], and returns the associated [[Document]].
     * @param text {:textParam}
     * @param mode {:modeParam}
    **/
    function createEditSession(text: Document, mode: string):EditSession;

    /**
     * Creates a new [[EditSession]], and returns the associated [[Document]].
     * @param text {:textParam}
     * @param mode {:modeParam}
    **/
    function createEditSession(text: string, mode: string):EditSession;
    
    
// }

}

// declare var ace:Ace.IAce;
