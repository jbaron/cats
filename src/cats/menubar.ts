///<reference path='project.ts'/>
///<reference path='ui/grid.ts'/>
///<reference path='../typings/node-webkit.d.ts'/>

module Menu {

import gui = module('nw.gui');

var win = gui.Window.get();


// TODO i18n
function createHeader(table:HTMLTableElement, headers: string[]) {
  var head = <HTMLTableElement>table.createTHead();
  var row = head.insertRow(-1);
  headers.forEach((header) => {
    var th = document.createElement("th");
    th.innerText = header;
    row.appendChild(th);
  });
}

function showErrors(errors:string[]) {
    
    var grid = new cats.ui.Grid();
    grid.setColumns(["description","resource","row","column","type"]);
    var rows = [];

    errors.forEach( (error:string) => {      
      var match = /^(.*)\(([0-9]*),([0-9]*)\):(.*)$/g;
      var parts = match.exec(error);
      if (! parts) {
        console.error("Couldn't parse error:" + error);
        return;
      }
      rows.push ({
        description: parts[4],
        resource: parts[1],
        row: parseInt(parts[2],10),
        column: parseInt(parts[3]+1,10),
        type: "TypeScript error"
      });
    });

    grid.setRows(rows);
    grid.onselect = function(data){
        cats.project.editFile(data.resource,null,{row:data.row-1, column:data.column-1});
    };

    grid.render();

    var result = document.getElementById("result");
    result.innerHTML = "";
    grid.appendTo(result);
}

// This class creates the main menubar and has the actions that are linked to the 
// menubar.
class Menubar {

menubar;

fontSizes = [10,12,14,16,18,20];

themes = [
            {theme:"chrome",label:"Chrome"},
            {theme:"clouds",label:"Clouds"},
            {theme:"crimson_editor",label:"Crimson Editor"},
            {theme:"dawn",label:"Dawn"},
            {theme:"dreamweaver",label:"Dreamweaver"},
            {theme:"eclipse",label:"Eclipse"},
            {theme:"github",label:"GitHub"},
            {theme:"solarized_light",label:"Solarized Light"},
            {theme:"textmate",label:"TextMate"},
            {theme:"tomorrow",label:"Tomorrow"},
            {theme:"xcode",label:"XCode"},

            {theme:null, label:"seperator dark themes"},
            {theme:"ambiance",label:"Ambiance"},
            {theme:"clouds_midnight",label:"Clouds Midnight"},
            {theme:"cobalt",label:"Cobalt"},
            {theme:"idle_fingers",label:"idleFingers"},
            {theme:"kr_theme",label:"krTheme"},
            {theme:"merbivore",label:"Merbivore"},
            {theme:"merbivore_soft",label:"Merbivore Soft"},
            {theme:"mono_industrial",label:"Mono Industrial"},
            {theme:"monokai",label:"Monokai"},
            {theme:"pastel_on_dark",label:"Pastel on dark"},
            {theme:"solarized_dark",label:"Solarized Dark"},
            {theme:"twilight",label:"Twilight"},
            {theme:"tomorrow_night",label:"Tomorrow Night"},
            {theme:"tomorrow_night_blue",label:"Tomorrow Night Blue"},
            {theme:"tomorrow_night_bright",label:"Tomorrow Night Bright"},
            {theme:"tomorrow_night_eighties",label:"Tomorrow Night 80s"},
            {theme:"vibrant_ink",label:"Vibrant Ink"},
];


constructor() {
    var menubar = new gui.Menu({ type: 'menubar' });
    
    var file = new gui.Menu();    
    file.append(new gui.MenuItem({ label: 'New File', click: this.newFile}));
    file.append(new gui.MenuItem({type: "separator"}));
    file.append(this.editorCommand("save"));
    file.append(new gui.MenuItem({ label: 'Save As ...', click: this.nop}));
    file.append(new gui.MenuItem({ label: 'Save All', click: this.nop}));
    file.append(new gui.MenuItem({type: "separator"}));
    file.append(new gui.MenuItem({ label: 'Close File', click: this.closeFile}));
    file.append(new gui.MenuItem({ label: 'Close All Files', click: this.closeAllFiles}));
    file.append(new gui.MenuItem({type: "separator"}));
    file.append(new gui.MenuItem({ label: 'Exit', click: this.closeAllProjects}));

    var edit = new gui.Menu();
    edit.append(this.editorCommand("undo"));
    edit.append(this.editorCommand("redo"));
    edit.append(new gui.MenuItem({type: "separator"}));
    edit.append(this.editorCommand("cut"));
    edit.append(this.editorCommand("copy"));
    edit.append(this.editorCommand("paste"));
    edit.append(new gui.MenuItem({type: "separator"}));
    edit.append(this.editorCommand("find"));
    edit.append(this.editorCommand("findnext"));
    edit.append(this.editorCommand("findprevious"));
    edit.append(this.editorCommand("replace"));
    edit.append(this.editorCommand("replaceall"));
    edit.append(new gui.MenuItem({label: 'Find/Replace...',click: this.nop}));
    edit.append(new gui.MenuItem({type: "separator"}));
    edit.append(this.editorCommand("togglerecording"));
    edit.append(this.editorCommand("replaymacro"));

    var source = new gui.Menu();
    source.append(this.editorCommand("togglecomment"));
    source.append(this.editorCommand("indent"));
    source.append(this.editorCommand("outdent"));
    source.append(new gui.MenuItem({label: 'Format code',click: this.formatText}));

    var refactor = new gui.Menu();
    refactor.append(new gui.MenuItem({label: 'Rename', click: this.nop }));

    var proj = new gui.Menu();
    proj.append(new gui.MenuItem({ label: 'Open Project...', click: this.openProject}));
    proj.append(new gui.MenuItem({ label: 'Close Project', click: this.closeProject}));
    proj.append(new gui.MenuItem({type: "separator"}));
    proj.append(new gui.MenuItem({label: 'Build Project', click: this.compileAll }));


    var run = new gui.Menu();
    run.append(new gui.MenuItem({label: 'Run main', click: this.runFile }));
    run.append(new gui.MenuItem({label: 'Debug main', click: this.nop }));

    var window = new gui.Menu();
    window.append(new gui.MenuItem({label: 'Theme', submenu: this.createThemeMenu() }));
    window.append(new gui.MenuItem({label: 'Font size', submenu: this.createFontSizeMenu() }));
    window.append(new gui.MenuItem({label: 'Preferences', click: this.preferences }));

    var help = new gui.Menu();
    help.append(new gui.MenuItem({label: 'Keyboard shortcuts', click: this.showShortcuts }));    
    help.append(new gui.MenuItem({label: 'Process Info', click: this.showProcess }));
    help.append(new gui.MenuItem({label: 'Developers tools', click: this.showDevTools }));
    help.append(new gui.MenuItem({label: 'About CATS', click: this.showAbout }));


    menubar.append(new gui.MenuItem({ label: 'File', submenu: file}));
    menubar.append(new gui.MenuItem({ label: 'Edit', submenu: edit}));
    menubar.append(new gui.MenuItem({ label: 'Source', submenu: source}));
    menubar.append(new gui.MenuItem({ label: 'Refactor', submenu: refactor}));    
    menubar.append(new gui.MenuItem({ label: 'Project', submenu: proj}));        
    menubar.append(new gui.MenuItem({ label: 'Run', submenu: run}));    
    menubar.append(new gui.MenuItem({ label: 'Window', submenu: window}));
    menubar.append(new gui.MenuItem({ label: 'Help', submenu: help}));    
    win.menu = menubar;
    this.menubar = menubar;
}


// TODO i18n
getLabelForCommand(commandName: string) {
  var label = commandName[0].toUpperCase() + commandName.slice(1);
  var platform = cats.project.editor.commands.platform;
  var command = cats.project.editor.commands.byName[commandName];

  var tabs = 5 - Math.floor((label.length / 4) - 0.01); 
   label = label + "\t\t\t\t\t\t".substring(0,tabs);
  if (command && command.bindKey) {
    var key = command.bindKey[platform] ;
    if (key) label += key ;
  } 
  return label;  
}

editorCommand(commandName: string ) {
  var label = this.getLabelForCommand(commandName);
  var item = new gui.MenuItem({
      label: label,
      click: function() {cats.project.editor.execCommand(commandName);}
  });
  return item;
}

showShortcuts() {
  window.open('static/html/keyboard_shortcuts.html', '_blank'); 
}

showAbout() {
  alert("Code Assisitant for TypeScript\nversion 0.6.8\nCreated by JBaron");
}

closeAllProjects() {
  var sure = confirm("Do you really want to quit?");
  if (sure) gui.App.closeAllWindows();
}

showDevTools() {
  win.showDevTools()
}

newFile() {
  cats.project.editFile("untitled","");
}


closeFile() {
  cats.project.closeSession(cats.project.session);
}

closeAllFiles() {
  cats.project.close();
}

closeProject() {
  window.close();
}

quit() {
  var sure = confirm("Do you really want to quit?");
  if (sure) gui.App.quit();
}

showProcess() {
  var mem = process.memoryUsage();
  var display = "memory used: " + mem.heapUsed;
  display += "\nmemory total: " + mem.heapTotal;
  display += "\nplatform: " + process.platform;
  display += "\nworking directory: " + process.cwd();
  alert(display);
}

compileAll() {

  // this.defaultOutput = window.prompt("Output file",this.defaultOutput);
  var options = cats.project.config.config().compiler;
  $("#result").addClass("busy");
  cats.project.iSense.perform("compile", options, (err,data) => {
  $("#result").removeClass("busy");
    if (err) {
      console.error(err.stack);
      var msg = err.stack.substring(13).split("\n")[0];
      showErrors([msg]);
      alert("Error during compiling " + err);
      return;
    }

    if (data.error) {
      showErrors(data.error.split("\n"));
      return;
    }

    document.getElementById("result").innerText = "Successfully generated " + Object.keys(data.source).length + " file(s).";
    var sources = data.source
    for (var name in sources) {
        cats.project.writeTextFile(name,sources[name]);
    }
  });
}

preferences() {
  var content = cats.project.config.stringify();
  var name = cats.Configuration.NAME;
  cats.project.editFile(name,content);
}

openProject() {
    var chooser:any = document.getElementById('fileDialog');
    chooser.onchange = function(evt) {
        console.log(this.value);
        var param = encodeURIComponent(this.value)
        window.open('index.html?project=' + param, '_blank');    
    };
    chooser.click();            
};


formatText() {
  var session = cats.project.session;
  cats.project.iSense.perform("getFormattedTextForRange",session.name,0,session.getValue().length,(err,result) => {
      if (! err) cats.project.session.editSession.setValue(result);
  });
}

saveFile() {
  cats.project.editor.execCommand("save");
}

runFile() {
  var path = require("path");

  var main = cats.project.config.config().main;
  if (! main) {
    alert("Please specify the main html file to run in the project settings.");
    return;
  }
  var startPage = "file://" + cats.project.getFullName(main);
  console.log("Opening file: " + startPage);
  var win2 = gui.Window.open(startPage,{
    toolbar:true,
    webkit : {
      "page-cache": false
    }
  });
  // win2.reloadIgnoringCache()
};


nop() {
  alert("Not yet implemented");
};  

undoChange() {
  var man = cats.project.editor.getSession().getUndoManager();
  man.undo();
}

redoChange() {
  var man = cats.project.editor.getSession().getUndoManager();
  man.redo();
}

enableFind() {
  window.open('static/html/findreplace.html', '_blank'); 
}

actionFind() {
    var input = <HTMLInputElement>document.getElementById("findText");
    cats.project.editor.find(input.value,{},true);
}

actionReplace() {
    var findText = <HTMLInputElement>document.getElementById("findText");
    var replaceText = <HTMLInputElement>document.getElementById("replaceText");
    var options = {
      needle: findText.value
    };
    cats.project.editor.replace(replaceText.value,options);
}

setThemeWrapper(theme) {
  return function setTheme() {
      cats.project.setTheme(theme);
  }
}

createFontSizeMenu() {
  var menu = new gui.Menu();
  this.fontSizes.forEach( (size:number) => {
      menu.append(new gui.MenuItem({
        label:size + "px",
        click: () => {cats.project.editor.setFontSize(size + "px")}
      }));
    });
  return menu;  
}

createThemeMenu() {
  var menu = new gui.Menu();
  this.themes.forEach( (theme) => {
    if (theme.theme) {
      menu.append(new gui.MenuItem({
        label:theme.label,
        click: this.setThemeWrapper(theme.theme)
      }));
    } else {
      menu.append(new gui.MenuItem({        
        type: "separator"
      }));
    } 
  });
  return menu;
}

enableReplace() {
  document.getElementById("findArea").style.display = "block";
  document.getElementById("replaceArea").style.display = "block";
}


}

export var mainMenuBar;
export function createMenuBar() {
  mainMenuBar = new Menubar();    
}


}


// global.actionFind = Menu.mainMenuBar.actionFind; 