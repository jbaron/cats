module Menu {

import gui = module('nw.gui');
var win = gui.Window.get();



private cell(row,content) {
	var td = row.insertCell(-1);
	td.innerText = content;
}


export class EditorContextMenu {	

private ctxmenu;
private lastEvent:MouseEvent;

constructor(private project:cats.Project) {
	// Create a new menu
	this.ctxmenu = new gui.Menu();

	// Add the items
	this.ctxmenu.append(new gui.MenuItem({ 
		    label: 'Goto Declaration', 
		    click: () => { this.gotoDeclaration()} 
	}));

	this.ctxmenu.append(new gui.MenuItem({ 
		label: 'Get References', 
		click: () => {this.getInfoAt("getReferencesAtPosition")} 
	}));

	this.ctxmenu.append(new gui.MenuItem({ 
		label: 'Get Occurences', 
		click: () => {this.getInfoAt("getOccurrencesAtPosition")}
	}));

	this.ctxmenu.append(new gui.MenuItem({ 
		label: 'Get Implementors', 
		click: () => {this.getInfoAt("getImplementorsAtPosition")}
	}));
	
}

// Bind this context menu to an HTML element
bindTo(elem:HTMLElement) {

	// session.on('contextmenu', (ev:any) => {       
	// elem.addEventListener('contextmenu', (ev:any) => {       
	elem.oncontextmenu = (ev:any) => {       	
	    ev.preventDefault();   
	    if (this.project.session.enableAutoComplete) {
	      this.lastEvent = ev;
	      this.ctxmenu.popup(ev.x, ev.y);
	    }
	    return false;
  	};
}


getCursor(): Ace.Position {
	return cats.project.editor.getCursorPosition();
	// return cats.project.session.getPositionFromScreenOffset(this.lastEvent.offsetX,this.lastEvent.offsetY);
}

gotoDeclaration() {
	var cursor = this.getCursor();
	var fileName = cats.project.session.name;
	cats.project.iSense.perform("getDefinitionAtPosition", fileName, cursor, (err,data) => {
		if (data && data.unitName)
			cats.project.editFile(data.unitName,null,data.startPos);
	});
}

static RangeToPosition(range) {
	return (range.startRow+1) + ":" + (range.startColumn+1);
}

getInfoAt(type:string) {
	var cursor = this.getCursor();
	var fileName = cats.project.session.name;
	$("#result").addClass("busy");
	cats.project.iSense.perform("getInfoAtPosition",type, fileName, cursor, (err,data) => {
		$("#result").removeClass("busy");
		if (data) {
			document.getElementById("result").innerHTML = "";
			var grid = new cats.ui.Grid();
			grid.setColumns(["description","script","position"]);
			grid.setRows(data);
			grid.setAspect("position", (row) => {return EditorContextMenu.RangeToPosition(row.range)});
			grid.render();
			grid.appendTo(document.getElementById("result"));
			grid.onselect = (data) => {
				cats.project.editFile(data.script,null,{row:data.range.startRow,column:data.range.startColumn});
			};			
		}
	});
}














}


}