///<reference path='autocompleteview.ts'/>
///<reference path='isensehandler.ts'/>
///<reference path='treeviewer.ts'/>
///<reference path='configuration.ts'/>
///<reference path='session.ts'/>
///<reference path='node.d.ts'/>
///<reference path='ui/filetree.ts'/>

declare var ace;
declare var _canLog; // logging flag dynatree;

module cats {

import fs = module("fs");
import path = module("path");


export class Project {
    // The name of the file that is currently being edited
    // filename:string;
    // private ignoreChange = false;
    sessions:Session[] = [];
    session:Session;
    projectDir;
    editor:any;
    iSense:ISenseHandler;
    config: Configuration;

    private loadDefaultLib = true;
    // private markedErrors = [];
    autoCompleteView;


// Set the project to a new directory and make sure 
// we remove old artifacts.
constructor(projectDir:string) {
    project = this;
    this.projectDir = path.resolve(projectDir);
    
    this.config = new Configuration(this.projectDir);
    this.config.load();

    this.editor = this.createEditor();
    this.setTheme(this.config.config().theme);        
    this.autoCompleteView = new AutoCompleteView(this.editor); 
    
    this.iSense = new ISenseHandler();

    if (this.loadDefaultLib) {
      var libdts = fs.readFileSync("typings/lib.d.ts","utf8");
      this.iSense.perform("addScript","lib.d.ts", libdts, true, null);
    }


    // this.scanProjectDir();
    this.loadTypeScriptFiles("");

    // this.editor.getSession().getUndoManager().reset();    
    this.assimilate();        
}


// Get the color of ace editor and use it to style the rest
private assimilate() {
  // Use a timeout to make usre the editor has updated its style
  setTimeout( function() {
      var elem = $(".ace_gutter");
      var bg = elem.css("background-color");
      var fg = elem.css("color");      
      $("body").css("background-color",bg);
      $("body").css("color",fg);
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

closeSession(name) {
  var session = this.getSession(name);
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
    $("#editor").hide();
  }
  tabbar.refresh();
}

close() {
  this.sessions.forEach((session:Session) => {
    if (session.changed) {
        var c = confirm("Save " + session.name + " before closing ?");
        if (c != null) this.writeSession(session);
    };
  });
}

// Initialize the editor
private createEditor() {
    var editor = ace.edit("editor");    
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
    return editor;
}


editFile(name: string,content?:string) {
  var session:Session = this.getSession(name);
  
  if (! session) {
      if (content == null) content = this.readTextFile(name);
      session = new Session(this,name,content);
      this.sessions.push(session);
      this.editor.setSession(session.editSession);
      this.editor.moveCursorTo(0, 0);    

      /* Tabbar stuff, should be removed
      var li = document.createElement("li");
      li.innerText = path.basename(name);
      li.setAttribute("id","tab_" + name);  
      li.setAttribute("title",name);  
      document.getElementById("tabs").appendChild(li);
      */
      
  } else {
      this.editor.setSession(session.editSession);
  }
  this.session = session;

  /*
  $("#tabs li").removeClass("active");
  document.getElementById("tab_" + name).className = "active";
  document.getElementById("tabs").onclick = function(ev) {
    console.log(ev);
  } */
  $("#editor").show();
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

// Load all the script that are part of the project
// For now use a synchronous call to load.
// Also update the worker to have these scripts
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
              console.log("Loaded " + fullName);
          }
      }
      if(stats.isDirectory()) {
          this.loadTypeScriptFiles(fullName);
      }
    });
}   


}

}









