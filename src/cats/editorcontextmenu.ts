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
	return cats.project.session.getPositionFromScreenOffset(this.lastEvent.offsetX,this.lastEvent.offsetY);
}

gotoDeclaration() {
	var cursor = this.getCursor();
	var fileName = cats.project.session.name;
	cats.project.iSense.perform("getDefinitionAtPosition", fileName, cursor, (err,data) => {
		if (data && data.unitName)
			cats.project.editFile(data.unitName,null,data.startPos);
	});
}

getInfoAt(type:string) {
	var cursor = this.getCursor();
	var fileName = cats.project.session.name;
	$("#result").addClass("busy");
	cats.project.iSense.perform("getInfoAtPosition",type, fileName, cursor, (err,data) => {
		$("#result").removeClass("busy");
		if (data) {
			console.log(data);	
			document.getElementById("result").innerHTML = "";
			var table = document.createElement("table");
			data.forEach((result) => {
				var row = table.insertRow(-1);
				cell(row,result.ast.minChar);
				cell(row,result.ast.limChar);
				cell(row,result.ast.text);
				cell(row,result.unitIndex);
			});
			document.getElementById("result").appendChild(table);
		}
	});
}














}


}