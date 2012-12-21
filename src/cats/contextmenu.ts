
module menu {

import fs = module("fs");
import path = module("path");
import util = module("util");

var inspect = util.inspect;

function nop() {
  alert("Not yet implemented");
};  

var gui = require('nw.gui');
var win = gui.Window.get();

var ctxmenu;

function createContextMenu() {
	// Create an empty menu
	var ctxmenu = new gui.Menu();

/*
getSignatureAtPosition(fileName: string, pos: number): SignatureInfo;
        getDefinitionAtPosition(fileName: string, pos: number): DefinitionInfo;
        getReferencesAtPosition(fileName: string, pos: number): ReferenceEntry[];
        getOccurrencesAtPosition(fileName: string, pos: number): ReferenceEntry[];
        getImplementorsAtPosition(fileName: string, pos: number): ReferenceEntry[];
*/

	// Add some items
	ctxmenu.append(new gui.MenuItem({ 
		    label: 'Find Definition', 
		    click: () => {getInfoAt("getDefinitionAtPosition")} 
	}));

	ctxmenu.append(new gui.MenuItem({ 
		label: 'Get References', 
		click: () => {getInfoAt("getReferencesAtPosition")} 
	}));

	ctxmenu.append(new gui.MenuItem({ 
		label: 'Get Occurences', 
		click: () => {getInfoAt("getOccurrencesAtPosition")}
	}));

	ctxmenu.append(new gui.MenuItem({ 
		label: 'Get Implementors', 
		click: () => {getInfoAt("getImplementorsAtPosition")}
	}));
	
	return ctxmenu;
}

var lastEvent:MouseEvent;

function getInfoAt(type:string) {
	var cursor = cats.project.session.getCursorFromScreen(lastEvent.x,lastEvent.y);
	var fileName = cats.project.session.name;
	cats.project.iSense.perform("getInfoAtPosition",type, fileName, cursor, (err,data) => {
		if (data) {
			var str = inspect(data, false, 5);
			document.getElementById("info").innerText = str;
		}
	});
}

var editorContextMenu = createContextMenu();
document.getElementById("editor").addEventListener('contextmenu', function(ev:any) { 			
  ev.preventDefault();   
  if (cats.project.session.enableAutoComplete) {
  	lastEvent = ev;
  	editorContextMenu.popup(ev.x, ev.y);
  }
  return false;
});


function createFileContextMenu() {
	// Create an empty menu
	var ctxmenu = new gui.Menu();
	// Add some items
	ctxmenu.append(new gui.MenuItem({ label: 'Rename', click: rename }));
	ctxmenu.append(new gui.MenuItem({ label: 'New file', click: newFile }));
	ctxmenu.append(new gui.MenuItem({ label: 'Delete', click: deleteFile }));
	return ctxmenu;
}

var fileContextMenu = createFileContextMenu();


function deleteFile() {
	var sure = confirm("Delete " + data.key);
	if (sure) {
		var fullName = cats.project.getFullName(data.key);
		fs.unlinkSync(fullName);
	}
}

function newFile() {
	var basedir;

	if (data.isFolder) {
		basedir = data.key
	} else {
		basedir = path.dirname(data.key);
	}

	var name = prompt("Enter new file name ");
	if (name == null) return;
    var fullName = path.join(basedir,name);
	cats.project.writeTextFile(fullName,"");
}


function rename() {
	var name = prompt("Enter new name", data.key);
	if (name == null) return;
	var c= confirm("Going to rename " + data.key + " into " + name);
	if (c) {
		var root = cats.project.projectDir;
		try {
			fs.renameSync(path.join(root,data.key),path.join(root,name));
			} catch (err) {
				alert(err);
			}
	}
}

var data = {
	key:"",
	isFolder: true
}

document.getElementById("fileTree").addEventListener('contextmenu', function(ev:any) { 
  data.key = ev.srcElement.dataset.path;
  data.isFolder = ev.srcElement.dataset.isFolder;
  console.log(data.key);
  ev.preventDefault();
  fileContextMenu.popup(ev.x, ev.y);
  return false;
});


}