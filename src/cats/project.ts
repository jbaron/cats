///<reference path='autocompleteview.ts'/>
///<reference path='isensehandler.ts'/>
///<reference path='configuration.ts'/>
///<reference path='session.ts'/>
///<reference path='editorcontextmenu.ts'/>
///<reference path='node.d.ts'/>
///<reference path='ui/tooltip.ts'/>
///<reference path='ui/filetree.ts'/>
///<reference path='ace.d.ts'/>


module cats {

import fs = module("fs");
import path = module("path");


export class Project {
    
    // The sessions that are open
    sessions:Session[] = [];

    // The current session that is being edited
    session:Session;

    // The home directory of the project
    projectDir:string;

    // The singleton Editor instance
    editor:ACE.Editor;

    // The singleton TSWorker handler instance
    iSense:ISenseHandler;
    config:Configuration;
    toolTip:ui.ToolTip;
    private mouseMoveTimer;
    private loadDefaultLib = true;
    autoCompleteView:AutoCompleteView;
    editorContextMenu: Menu.EditorContextMenu;

// Set the project to a new directory and make sure 
// we remove old artifacts.
constructor(projectDir:string) {
    project = this;
    this.toolTip = new ui.ToolTip();
    this.projectDir = path.resolve(projectDir);
    
    this.config = new Configuration(this.projectDir);
    this.config.load();

    this.editor = this.createEditor();
    this.setTheme(this.config.config().theme); 
    this.editor.setFontSize("16px");       
    this.autoCompleteView = new AutoCompleteView(this.editor); 
    this.hideEditor();
    
    this.iSense = new ISenseHandler();

    if (this.loadDefaultLib) {
      var libdts = fs.readFileSync("typings/lib.d.ts","utf8");
      this.iSense.perform("addScript","lib.d.ts", libdts, true, null);
    }

    this.loadTypeScriptFiles("");

    // this.editor.getSession().getUndoManager().reset();    
    this.assimilate();        

    this.editorContextMenu = new Menu.EditorContextMenu(this);
    // this.editorContextMenu.bindTo(<HTMLElement>document.getElementsByClassName("ace_scroller")[0]);
    this.editorContextMenu.bindTo(<HTMLElement>document.getElementById("editor"));
}


// Get the color of ace editor and use it to style the rest
private assimilate() {
  
  // Use a timeout to make usre the editor has updated its style
  setTimeout( function() {
      var isDark =  $(".ace_dark").length > 0;
      var fg = isDark ? "white" : "black";
      var elem = $(".ace_scroller");
      var bg = elem.css("background-color");
      // var fg = elem.css("color");      
      $("html, #main, #navigator, #info, #result").css("background-color",bg);
      $("html").css("color",fg);
      $(".autocomplete").css("background-color",bg);
      $(".autocomplete").css("color",fg);
      $("input").css("background-color",fg);
      $("input").css("color",bg);
  }, 500);
}


setTheme(theme:string) {
  this.editor.setTheme("ace/theme/" + theme);
  this.assimilate();
}

saveFile() {
  if (this.session.name === "untitled") {
      this.session.name = prompt("Please enter the file name") || "untitled";
  }    
  
  if (this.session.name !== "untitled") {
      this.writeSession(this.session);
      this.session.changed = false;
  }
}


private getSession(name:string):Session {
  for (var i=0;i<this.sessions.length;i++) {
      var session = this.sessions[i];
      if (session.name === name) return session;
  }
}

// Perform code autocompletion
autoComplete()  {
    if (this.session.enableAutoComplete) {
      var cursor = this.editor.getCursorPosition();        
      this.session.autoComplete(cursor,this.autoCompleteView);
    }
}

showEditor() {
  document.getElementById("editor").style.display = "block";
}

hideEditor() {
  document.getElementById("editor").style.display = "none";
}

// Close a single session
closeSession(session:Session) {
  if (session.changed) {
    var c = confirm("Save " + session.name + " before closing ?");
    if (c) this.writeSession(session);
  }

  // Remove it for the list of sessions
  var index = this.sessions.indexOf(session);
  this.sessions.splice(index,1);

  // Check if was the current session displayed
  if (this.session === session) {
    this.session === null;
    this.hideEditor();
  }
  tabbar.refresh();
}

// Close all sessions and editor
close() {
  this.sessions.forEach((session:Session) => {
    if (session.changed) {
        var c = confirm("Save " + session.name + " before closing ?");
        if (c != null) this.writeSession(session);
    };
  });
  this.sessions.length = 0;
  this.session = null;
  this.hideEditor();
  tabbar.refresh();
}




private onMouseMove(ev:MouseEvent) {
    this.toolTip.hide();
    clearTimeout(this.mouseMoveTimer);
    this.mouseMoveTimer = setTimeout(() => {
        // this.session.showInfoAt(ev.x, ev.y);
        this.session.showInfoAt(ev);
    },200);
}


// Initialize the editor
private createEditor():ACE.Editor {
    var editor:ACE.Editor = ace.edit("editor");    
    editor.getSession().setMode("ace/mode/typescript");

    editor.commands.addCommands([
    {
        name:"autoComplete",
        bindKey:"Ctrl-Space",
        exec:this.autoComplete.bind(this)
    },

    {
        name:"save",
        bindKey:"Ctrl-s",
        exec:this.saveFile.bind(this)
    }
    ]);

    var originalTextInput = editor.onTextInput;
    editor.onTextInput = (text) => {
        originalTextInput.call(editor, text);
        if (text === ".") this.autoComplete();
    };

    var elem  = <HTMLElement>document.getElementById("editor");
    elem.onmousemove = this.onMouseMove.bind(this);
    elem.onmouseout = () => {this.toolTip.hide()};

    return editor;
}

editFile(name: string,content?:string, goto?:ACE.Position) {
  var session:Session = this.getSession(name);
  
  if (! session) {
      if (content == null) content = this.readTextFile(name);
      session = new Session(this,name,content);
      this.sessions.push(session);
      this.editor.setSession(session.editSession);

      if (goto) {
        this.editor.moveCursorTo(goto.row, goto.column);
      } else {
        this.editor.moveCursorTo(0, 0);    
      }

      if (session.enableAutoComplete) {
        this.iSense.perform("updateScript",name, content,(err,result) => {
            session.editSession.setAnnotations(result);            
        });
      }
      
  } else {
      this.editor.setSession(session.editSession);
      if (goto) this.editor.moveCursorTo(goto.row, goto.column);
  }
  this.session = session;
  
  this.showEditor();
  tabbar.refresh();
}

getFullName(name:string):string {
  return path.join(this.projectDir,name);
}

writeTextFile(name:string, value:string):void {
    fs.writeFileSync(this.getFullName(name),value,"utf8");
}

writeSession(session:Session):void {
    this.writeTextFile(session.name,session.getValue());
}

readTextFile(name:string) :string {
    if (name === "untitled") return "";
    var data = fs.readFileSync(this.getFullName(name),"utf8");
    var content = data.replace(/\r\n?/g,"\n");
    return content;
}

// Load all the script that are part of the project into the tsworker
// For now use a synchronous call to load.
private loadTypeScriptFiles(directory) {
    var files = fs.readdirSync(this.getFullName(directory));
    files.forEach((file) =>{
      var fullName = path.join(directory,file); 
      var stats = fs.statSync(this.getFullName(fullName));
      if(stats.isFile()) {
          var ext = path.extname(file);
          if (ext === ".ts") {
              var content = this.readTextFile(fullName);
              this.iSense.perform("updateScript",fullName,content,() => {});
              console.log("Found TypeScript file: " + fullName);
          }
      }
      if(stats.isDirectory()) {
          this.loadTypeScriptFiles(fullName);
      }
    });
}   


}

}









