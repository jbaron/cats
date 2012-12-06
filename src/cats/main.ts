///<reference path='project.ts'/>
///<reference path='treeviewer.ts'/>



module cats {

// Open a new project
export function selectProject() {
    var chooser:any = document.getElementById('fileDialog');
    chooser.onchange = function(evt) {
      console.log(this.value);
      setProject(this.value);
    };
    chooser.click();            
};

export var project = null;


// Create a new project
export function setProject(dir:string) {
    project = new Project(dir)
}


setProject("./demo");



// var win = gui.Window.get().maximize();





}


/*
var menubar = [

  {label:"File",click:nop,
    submenu : [
        {label:"Open project..."},        
        {label:"Close project"},        
        {label:"XYZ"}        
    ]
  },

  {label:"Edit",click:nop,
    submenu : [
        {label:"Undo"},        
        {label:"Redo"},        
    ]
  },


  {label:"Edit",click:nop,
    submenu : [
        {label:"Undo"},        
        {label:"Redo"},        
    ]
  },



]



createMenuItem(config,type="menu") {
  var menu = new gui.Menu({type: type});
  config.forEach((item) => {
    if (item.submenu) {
      var submenu = createMenuItem(item.submenu);
      item.submenu = submenu;
    }
    var menuItem = new gui.menu(item);  
    menu.append
    
  }
  return 
}

*/
  var gui = require('nw.gui');
  var win = gui.Window.get();

function runFile() {
  window.open('./demo/index.html', '_blank');
};


function nop() {
  console.log("clicked");
};  


function undoChange() {
  var man = cats.project.editor.getSession().getUndoManager();
  man.undo();
}

function redoChange() {
  var man = cats.project.editor.getSession().getUndoManager();
  man.redo();
}


function enableFind() {
  document.getElementById("findArea").style.display = "block";  
}


function actionFind() {
    var input = <HTMLInputElement>document.getElementById("findText");
    cats.project.editor.find(input.value,{},true);
}


function actionReplace() {
    var findText = <HTMLInputElement>document.getElementById("findText");
    var replaceText = <HTMLInputElement>document.getElementById("replaceText");
    var options = {
      needle: findText.value
    };
    cats.project.editor.replace(replaceText.value,options);
}



var themes = [


          
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






function setThemeWrapper(theme) {
  return function setTheme() {
      cats.project.editor.setTheme(theme);
      cats.project.assimilate();
  }
}

function createThemeMenu() {
  var menu = new gui.Menu();
  themes.forEach( (theme) => {
    menu.append(new gui.MenuItem({
      label:theme.label,
      click: setThemeWrapper(theme.theme)
    }));
  });
  return menu;
}

function enableReplace() {
  document.getElementById("findArea").style.display = "block";
  document.getElementById("replaceArea").style.display = "block";
}

function createMenubar() {

    var menubar = new gui.Menu({ type: 'menubar' });
    
    var file = new gui.Menu();
    file.append(new gui.MenuItem({ label: 'Open Project...', click: cats.selectProject}));

    var edit = new gui.Menu();
    edit.append(new gui.MenuItem({label: 'Undo',click: undoChange}));
    edit.append(new gui.MenuItem({label: 'Redo',click: redoChange}));

    edit.append(new gui.MenuItem({label: 'Find',click: enableFind}));
    edit.append(new gui.MenuItem({label: 'Replace',click: enableReplace}));

    var refactor = new gui.Menu();
    refactor.append(new gui.MenuItem({label: 'Rename', click: nop }));

    var run = new gui.Menu();
    run.append(new gui.MenuItem({label: 'Run main', click: runFile }));
    run.append(new gui.MenuItem({label: 'Debug main', click: nop }));

    var settings = new gui.Menu();
    settings.append(new gui.MenuItem({label: 'xyz', click: nop }));
    settings.append(new gui.MenuItem({label: 'theme', submenu: createThemeMenu() }));

    menubar.append(new gui.MenuItem({ label: 'File', submenu: file}));
    menubar.append(new gui.MenuItem({ label: 'Edit', submenu: edit}));
    menubar.append(new gui.MenuItem({ label: 'Refactor', submenu: refactor}));    
    menubar.append(new gui.MenuItem({ label: 'Run', submenu: run}));    
    menubar.append(new gui.MenuItem({ label: 'Settings', submenu: settings}));    
    win.menu = menubar;
}

createMenubar();





