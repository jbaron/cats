// THis is not really yet fully up to date for CodeMirror version 3.0.

module mCodeMirror {

interface ScrollInfo {
	x:number;
	y:number;
	width:number;
	height:number;
}




interface Coords {
	left:number;
	top:number;
	yBot?:number;
}

interface Position {
	line:number;
	ch:number;
}

interface HistorySize {
	undo:number;
	redo:number;
}

interface Token {
	start:number;
	end:number;
	string:string;
	className:string;
	state:any;
}

interface MarkTextOptions {
	inclusiveLeft:bool;
	inclusiveRight:bool;
	startStype:string;
	endStyle:string;
}



interface BookMark {
	clear():void;
	find():Position;
}

interface LineHandle {

}


interface LineInfo {
	line:number;
	handler:LineHandle;
	text:string;
	markerText:string;
	markerClass:string;
	lineClass:string;
	bgClass:string;
}


interface ViewPort {
	from:number;
	to:number;
}








interface Change {
	from:Position;
	to:Position;
	text:string[];
	next:Change;
}

interface ChangeListener {
    (editor:Editor,change:Change): void;
}

interface ViewPortChangeListener {
    (editor:Editor,from:Position,to:Position): void;
}



interface Stream {
	eol():bool;
	sol():bool;
	peek():string;
	next():string;
	eat(match:any):string;
	eatWhile(match:any):bool;
	eatSpace():bool;
	skipToEnd():void;
	skipTo(ch:string):bool;
	match(pattern:RegExp, consume:bool, caseFold:bool):bool;
	backUp(n:number):void;
	column():number;
	indentation():number;
	current():string;
	string:string;
	pos:number;
}


interface ModeDefition {
	(options:Options,modeOptions:any):Mode;
}



interface Mode {
	startState():any;
	token(stream:Stream,state:any):string;
	blankLine?(state:any):string;
	copyState?(state:any):any;
	indent?(state:any, textAfter:string,text:String):number;
	electricChars?:string;
}


interface Editor {
	coordsChar(pos:Coords) : Position; // added by JBaron
    getValue(): string;
    setValue(valu:string):void;
    getSelection():string;
    replaceSelection(value:string):void;
    setSize(width:number,height:number):void;
    focus():void;
    scrollTo(x:number,y:number):void;
    getScrollInfo():ScrollInfo;
    setOption(option:string,value:any);
    getOption(option:string):any;
    getMode():Mode;
    cursorCoords(start:bool,mode:string):Coords;
    charCoords(pos:Position,mode?:string):Coords;
    undo():void;
    redo():void;
    historySize():HistorySize;
    clearHistory():void;
    getHistory():any;
    setHistory(history:any);
    indentLine(line:number,dir?:bool);
    getTokenAt(pos:Position):Token;
    markText(from:Position,to:Position,className:string,
    	option?:MarkTextOptions):BookMark;
    setBookmark(pos:Position):BookMark;
    findMarksAt(pos:Position):BookMark[];
    setMarker(line:number,text:string,className:string):LineHandle;
    clarMarker(line:number):void;
    setLineClass(line:number,className:string,backgroundClassName:string):LineHandle;
    hideLine(line:number):LineHandle;
    showLine(line:number):LineHandle;
    onDeleteLine(line:number,callBack:Function);
    lineInfo(line:number):LineInfo;
    getLineHandler(line:number):LineHandle;
    getViewPort():ViewPort;
    addWidget(pos:Position,node:Node,scrollIntoView:bool);
    matchBrackets():void;
    lineCount():number;
    getCursor(start?:bool):Position;
    somethingSelected():bool;
    setCursor(pos:Position):void;
    setSelection(start:Position,end:Position):void;
    getLine(n:number):string;
    setLine(n:string,text:string):void;
    removeLine(n:number):void;
    getRange(from:Position,to:Position):string;
    replaceRange(text:string,from:Position,to?:Position):void;
    posFromIndex(index:number):Position;
    indexFromPos(pos:Position):number;
    operation(func:Function):any;
    compundChange(func:Function):any;
    refresh():void;
    getInputField():HTMLTextAreaElement;
    getWrapperElement():HTMLElement;
    getScrollerElement():HTMLElement;
    getGutterElement():HTMLElement;
    getStateAfter(line):any;
}


interface Options {
	value?:string;
	mode?:string;
	them?:string;
	indentUnit?:number;
	smartIndend?:number;
	tabSize?:number;
	indentWithTabs?:bool;
	electricsChars?:bool;
	autoClearEmptyLines?:bool;
	keyMap?:string;
	extraKeys?:any;
	lineWrapping?:bool;
	lineNumbers?:bool;
	firstLineNumber?:bool;
	lineNumberFormatter?:Function;
	gutter?:bool;
	fixedGutter?:bool;
	readOnly?:bool;
	onChange?:ChangeListener;
	onCursorActivity?:Function;
	onViewportChange?:ViewPortChangeListener;
	//**todo finish
}


interface StaticVar  {
    (element:HTMLElement,options:Options):Editor;
    version:string;
    defaults:Options;
    fromTextArea(textArea:HTMLTextAreaElement,options:Options):Editor;
    defineMode(name:string,func:ModeDefition);
    defineMIME(mime:string,mode:string);
    connect(target:EventTarget, event:String,func:Function);
    commands:any;
    simpleHint(a,b); // Added by JBaron
}



}

declare var CodeMirror : mCodeMirror.StaticVar;