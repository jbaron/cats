
module menu {

function nop() {
  alert("Not yet implemented");
};  

var gui = require('nw.gui');
var win = gui.Window.get();

var ctxmenu;

function createContextMenu() {
	// Create an empty menu
	var ctxmenu = new gui.Menu();

	// Add some items
	ctxmenu.append(new gui.MenuItem({ label: 'Goto Declaration', click:nop }));
	ctxmenu.append(new gui.MenuItem({ label: 'Item B', click: nop }));
	ctxmenu.append(new gui.MenuItem({ type: 'separator',click: nop }));
	ctxmenu.append(new gui.MenuItem({ label: 'Item C', click:nop }));
	return ctxmenu;
}

var editorContextMenu = createContextMenu();
document.getElementById("editor").addEventListener('contextmenu', function(ev:any) { 
  ev.preventDefault();   
  editorContextMenu.popup(ev.x, ev.y);
  return false;
});


function createFileContextMenu() {
	// Create an empty menu
	var ctxmenu = new gui.Menu();
	// Add some items
	ctxmenu.append(new gui.MenuItem({ label: 'Rename...', click:nop }));
	ctxmenu.append(new gui.MenuItem({ label: 'Delete', click: nop }));
	return ctxmenu;
}

var fileContextMenu = createFileContextMenu();


document.getElementById("fileTree").addEventListener('contextmenu', function(ev:any) { 
  console.log(ev);	
  // var fileName = $(ev.srcElement).data.key;
  var fileName = ev.srcElement.childNodes[0].data; // ToDo fix this
  console.log(fileName);	
  // alert(fileName);
  ev.preventDefault();
  fileContextMenu.popup(ev.x, ev.y);
  return false;
});


}