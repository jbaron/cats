///<reference path='autocompleteview.ts'/>
///<reference path='isensehandler.ts'/>
///<reference path='treeviewer.ts'/>
///<reference path='configuration.ts'/>

declare var ace;
declare var require;
declare var _canLog; // logging flag dynatree;


module cats {

var EditSession = ace.require("ace/edit_session").EditSession;
var UndoManager = ace.require("ace/undomanager").UndoManager;

// Bug in tsc that makes --out directory not working
// when using import statements. So for now a plain require
// import fs = module("fs");
// import path = module("path");
var fs = require("fs");
var path = require("path");

export var project:Project; // Singleton project

export class Project {
    // The name of the file that is currently being edited
    filename:string;
    private ignoreChange = false;
    private sessions = {};
    private defaultTheme = "ace/theme/clouds";
    editor;
    iSense;
    config: Configuration;

    private loadDefaultLib = true;
    private updateSourceTimer;
    private changed = false;
    private markedErrors = [];
    autoCompleteView;


// Set the project to a new directory and make sure 
// we remove old artifacts.
constructor(public projectDir:string) {
    this.config = new Configuration(this.projectDir);
    this.config.load();

    this.initEditor();
    this.autoCompleteView = new AutoCompleteView(this.editor); 
    
    this.iSense = new ISenseHandler();

    if (this.loadDefaultLib) {
      var libdts = Project.readTextFile("typings/lib.d.ts");
      this.iSense.perform("addScript","lib.d.ts", libdts, true, null);
    }


    this.scanProjectDir();

    // this.editor.getSession().getUndoManager().reset();    
    this.assimilate();        
}


// Get the color of ace editor and use it to style the rest
assimilate() {
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


saveFile() {  
  var confirmation = confirm("Save file " + this.filename);
  if (confirmation) {
      var content = this.editor.getValue();      
      Project.writeTextFile(this.filename,content);
  }
}

// Perform code autocompletion
autoComplete()  {
        
    // Any pending changes that are not yet send to the worker?
    if (this.changed) {
            var source = this.editor.getValue();
            this.iSense.perform("updateScript",this.filename, source,(err,result) => {
                this.handleCompileErrors(result);
            }); 
            this.changed = false; 
    };

    var cursor = this.editor.getCursorPosition();
    this.iSense.perform("autoComplete",cursor, this.filename, (err,completes) => {
        if (completes != null) this.autoCompleteView.showCompletions(completes.entries);
    });
}


// Initialize the editor
initEditor() {
    var editor = ace.edit("editor");
    editor.setTheme(this.config.config().theme);    
    editor.getSession().setMode("ace/mode/typescript");
    this.ignoreChange = true;

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

    // editor.getSession().on("change", this.onChangeHandler.bind(this));
    editor.on("change", this.onChangeHandler.bind(this));

    this.editor = editor;


}

// Display the compile errors we get back from the compiler
handleCompileErrors(errors) {
    this.editor.getSession().setAnnotations(errors);
}

// Check what to do when de content of the editor changes
onChangeHandler(event) {

    if (this.ignoreChange) {
        console.log("ignoring change");
        return;
    }

    this.changed = true;
    clearTimeout(this.updateSourceTimer);
    
    this.updateSourceTimer = setTimeout(() => {    
          if (this.changed) { 
              console.log("updating source code for file " + this.filename); 
              var source = this.editor.getValue();
              this.iSense.perform("updateScript",this.filename, source,(err,result) => {
                    this.handleCompileErrors(result);
              });
              this.changed= false; // Already make sure we know a change has been send.
          }
    },1000);  
};

editFile(name: string,content?:string) {
  var session = this.sessions[name];
  
  if (! session) {
      session = this.createNewSession(name,content);
      session.fileName = name;
      this.sessions[name] = session;
      this.editor.setSession(session);
      var li = document.createElement("li");
      li.innerText = path.basename(name);
      li.setAttribute("id","tab_" + name);  
      li.setAttribute("title",name);  
      document.getElementById("tabs").appendChild(li);
      this.editor.moveCursorTo(0, 0);    
  } else {
      this.editor.setSession(session);
       var ext = path.extname(name);
       if (ext === ".ts") 
             this.ignoreChange = false;
        else 
             this.ignoreChange = true;             
  }

  this.filename = name;  
  $("#tabs li").removeClass("active");
  document.getElementById("tab_" + name).className = "active";
  document.getElementById("tabs").onclick = function(ev) {
    console.log(ev);
  }
}

private createNewSession(name:string,content?:string) {
  console.log("Creating new session for file " + name);
  if (content == null) content = Project.readTextFile(name);
  var mode = "ace/mode/typescript";
  var ext = path.extname(name);
  this.ignoreChange = false;
  if (ext !== ".ts") {
    mode = "ace/mode/text";
    this.ignoreChange = true;        
  } else {
    this.iSense.perform("updateScript",name,content,() => {});
  }
  var session = new EditSession(content,mode);
  session.setUndoManager(new UndoManager());
  return session;  
}

private static writeTextFile(fullName:string,content:string) {
    fs.writeFileSync(fullName,content,"utf8");
}

private static readTextFile(fullName:string) :string {
    var data = fs.readFileSync(fullName,"utf8");
    var content = data.replace(/\r\n?/g,"\n");
    return content;
}

// Load all the script that are part of the project
// For now use a synchronous call to load.
// Also update the worker to have these scripts
scanProjectDir() {

        var children = createTreeViewer(this.projectDir,[],(tsName)=>{            
            var script = {
                name: tsName, //path.basename(tsName),
                content: Project.readTextFile(tsName)
            }

            // this.iSense.perform("addScript",script,() => {});
            this.iSense.perform("updateScript",script.name,script.content,() => {});
            // console.log("Added script " + script.name);  
        });

        _canLog = false;        

        var root = document.getElementById("fileTree");
        // var ftree = document.createElement("div");
        // root.appendChild(ftree);

        children = [{
          title: path.basename(this.projectDir),
          isFolder: true,
          children: children
        }];

        // $("#fileTree").innerHTML = "";
        $(root).dynatree({
          onActivate: function(node) { 
            var scriptname:string = node.data.key;
            if (scriptname) {
              cats.project.editFile(scriptname);
            }
          },
          children: children
       });

};


}

}









