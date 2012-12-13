///<reference path='project.ts'/>
declare var process;

module Menu {

var gui = require('nw.gui');
var win = gui.Window.get();

// This is the class that creates the main menubar and has actions that are linked to the 
// click events.
class Menubar {
defaultOutput = "main.js";
menubar;
themes = [
            {theme:"ace/theme/chrome",label:"Chrome"},
            {theme:"ace/theme/clouds",label:"Clouds"},
            {theme:"ace/theme/crimson_editor",label:"Crimson Editor"},
            {theme:"ace/theme/dawn",label:"Dawn"},
            {theme:"ace/theme/dreamweaver",label:"Dreamweaver"},
            {theme:"ace/theme/eclipse",label:"Eclipse"},
            {theme:"ace/theme/github",label:"GitHub"},
            {theme:"ace/theme/solarized_light",label:"Solarized Light"},
            {theme:"ace/theme/textmate",label:"TextMate"},
            {theme:"ace/theme/tomorrow",label:"Tomorrow"},
            {theme:"ace/theme/xcode",label:"XCode"},

            {theme:null, label:"seperator dark themes"},
            {theme:"ace/theme/ambiance",label:"Ambiance"},
            {theme:"ace/theme/clouds_midnight",label:"Clouds Midnight"},
            {theme:"ace/theme/cobalt",label:"Cobalt"},
            {theme:"ace/theme/idle_fingers",label:"idleFingers"},
            {theme:"ace/theme/kr_theme",label:"krTheme"},
            {theme:"ace/theme/merbivore",label:"Merbivore"},
            {theme:"ace/theme/merbivore_soft",label:"Merbivore Soft"},
            {theme:"ace/theme/mono_industrial",label:"Mono Industrial"},
            {theme:"ace/theme/monokai",label:"Monokai"},
            {theme:"ace/theme/pastel_on_dark",label:"Pastel on dark"},
            {theme:"ace/theme/solarized_dark",label:"Solarized Dark"},
            {theme:"ace/theme/twilight",label:"Twilight"},
            {theme:"ace/theme/tomorrow_night",label:"Tomorrow Night"},
            {theme:"ace/theme/tomorrow_night_blue",label:"Tomorrow Night Blue"},
            {theme:"ace/theme/tomorrow_night_bright",label:"Tomorrow Night Bright"},
            {theme:"ace/theme/tomorrow_night_eighties",label:"Tomorrow Night 80s"},
            {theme:"ace/theme/vibrant_ink",label:"Vibrant Ink"},
];



constructor() {
    var menubar = new gui.Menu({ type: 'menubar' });
    
    var file = new gui.Menu();
    file.append(new gui.MenuItem({ label: 'Open Project...', click: this.openProject}));
    file.append(new gui.MenuItem({ label: 'New File', click: this.nop}));
    file.append(new gui.MenuItem({ label: 'Save (Ctrl+S)', click: this.editorCommand("save")}));
    file.append(new gui.MenuItem({ label: 'Save As ...', click: this.nop}));
    file.append(new gui.MenuItem({ label: 'Save All', click: this.nop}));

    var edit = new gui.Menu();
    edit.append(new gui.MenuItem({label: 'Undo',click: this.editorCommand("undo")}));
    edit.append(new gui.MenuItem({label: 'Redo',click: this.editorCommand("redo")}));

    edit.append(new gui.MenuItem({label: 'Find',click: this.enableFind}));
    edit.append(new gui.MenuItem({label: 'Replace',click: this.enableReplace}));
    edit.append(new gui.MenuItem({label: 'Format code',click: this.formatText}));
    edit.append(new gui.MenuItem({type: "separator"}));
    edit.append(new gui.MenuItem({label: 'Cut',click: this.editorCommand("cut")}));
    edit.append(new gui.MenuItem({label: 'Paste',click: this.editorCommand("paste")}));
    edit.append(new gui.MenuItem({label: 'Copy',click: this.editorCommand("copy") }));

    var refactor = new gui.Menu();
    refactor.append(new gui.MenuItem({label: 'Rename', click: this.nop }));

    var run = new gui.Menu();
    run.append(new gui.MenuItem({label: 'Run main', click: this.runFile }));
    run.append(new gui.MenuItem({label: 'Compile All', click: this.compileAll }));
    run.append(new gui.MenuItem({label: 'Debug main', click: this.nop }));

    var settings = new gui.Menu();
    settings.append(new gui.MenuItem({label: 'Theme', submenu: this.createThemeMenu() }));
    settings.append(new gui.MenuItem({label: 'Preferences', click: this.preferences }));

    var help = new gui.Menu();
    help.append(new gui.MenuItem({label: 'Keyboard shortcuts', click: this.showShortcuts }));
    help.append(new gui.MenuItem({label: 'About', click: this.showAbout }));
    help.append(new gui.MenuItem({label: 'Process', click: this.showProcess }));


    menubar.append(new gui.MenuItem({ label: 'File', submenu: file}));
    menubar.append(new gui.MenuItem({ label: 'Edit', submenu: edit}));
    menubar.append(new gui.MenuItem({ label: 'Refactor', submenu: refactor}));    
    menubar.append(new gui.MenuItem({ label: 'Run', submenu: run}));    
    menubar.append(new gui.MenuItem({ label: 'Settings', submenu: settings}));
    menubar.append(new gui.MenuItem({ label: 'Help', submenu: help}));    
    win.menu = menubar;
    this.menubar = menubar;
    console.log("created main menubar");
}

editorCommand(command:string) {
  return function() {
    cats.project.editor.execCommand(command);
  }
}


showShortcuts() {
  window.open('static/html/keyboard_shortcuts.html', '_blank'); 
}

showAbout() {
  alert("CATS version 0.3.0\nCode Assisitant for TypeScript\nCreated by JBaron");
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
  var path = require("path");
  // this.defaultOutput = window.prompt("Output file",this.defaultOutput);
  var options = cats.project.config.config().compiler;
  cats.project.iSense.perform("compile", options, (err,data) => {
    // var fullOutput = path.join(cats.project.projectDir,this.defaultOutput);
    // var content = data.source;
    // alert("going to write " + content.length + " characters to file " + fullOutput);
    console.log(data);
    var sources = data.source
    for (var name in sources) {
      cats.Project.writeTextFile(name,sources[name]);
    }
  });
}

preferences() {
  var content = cats.project.config.stringify();
  var name = cats.project.config.fileName;
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
  var script = cats.project.editor.session.getScript();
  cats.project.iSense.perform("getFormattingEditsForRange",script.name,0,script.content.length,(err,result) => {
      console.log(result);
  });
}

saveFile() {
  cats.project.editor.execCommand("save");
  // saveFile();
}

runFile() {
  var path = require("path");
  var main = cats.project.config.config().main;
  if (! main) {
    alert("Please specify the main html file to run in the project settings.");
    return;
  }
  var startPage = path.join(cats.project.projectDir,main);
  gui.Window.open(startPage,{toolbar:true});
  // window.open(startPage, '_blank');
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
  document.getElementById("findArea").style.display = "block";  
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
      cats.project.editor.setTheme(theme);
      cats.project.assimilate();
  }
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
mainMenuBar = new Menubar();  

}
