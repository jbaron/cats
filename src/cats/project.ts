///<reference path='autocompleteview.ts'/>
///<reference path='isensehandler.ts'/>
///<reference path='treeviewer.ts'/>
///<reference path='configuration.ts'/>
///<reference path='session.ts'/>
///<reference path='node.d.ts'/>

declare var ace;
declare var _canLog; // logging flag dynatree;

module cats {

import fs = module("fs");
import path = module("path");
// Bug in tsc that makes --out directory not working
// when using import statements. So for now a plain require

// var fs = require("fs");
// var path = require("path");

export var project:Project; // Singleton project

export class Project {
    // The name of the file that is currently being edited
    // filename:string;
    // private ignoreChange = false;
    private sessions = {};
    private session:Session;
    private projectDir;
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


    this.scanProjectDir();

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
  var script = this.session.getValue();      
  var confirmation = confirm("Save file " + script.name);
  if (confirmation) {
      this.writeTextFile(script.name,script.content);
  }
}

// Perform code autocompletion
autoComplete()  {
    if (this.session.enableAutoComplete) {
      var cursor = this.editor.getCursorPosition();        
      this.session.autoComplete(cursor,this.autoCompleteView);
    }
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
  var session:Session = this.sessions[name];
  
  if (! session) {
      if (content == null) content = this.readTextFile(name);
      session = new Session(this,name,content);
      this.sessions[name] = session;
      this.editor.setSession(session.editSession);
      this.editor.moveCursorTo(0, 0);    

      // Tabbar stuff, should be removed
      var li = document.createElement("li");
      li.innerText = path.basename(name);
      li.setAttribute("id","tab_" + name);  
      li.setAttribute("title",name);  
      document.getElementById("tabs").appendChild(li);
      
  } else {
      this.editor.setSession(session.editSession);
  }
  this.session = session;

  $("#tabs li").removeClass("active");
  document.getElementById("tab_" + name).className = "active";
  document.getElementById("tabs").onclick = function(ev) {
    console.log(ev);
  }

}

getFullName(name:string):string {
  return path.join(this.projectDir,name);
}

writeTextFile(name:string,content:string):void {
    fs.writeFileSync(this.getFullName(name),content,"utf8");
}

readTextFile(name:string) :string {
    var data = fs.readFileSync(this.getFullName(name),"utf8");
    var content = data.replace(/\r\n?/g,"\n");
    return content;
}

// Load all the script that are part of the project
// For now use a synchronous call to load.
// Also update the worker to have these scripts
scanProjectDir() {

      var tv = new TreeViewer(this.projectDir);

        var children = tv.createTreeViewer("",[],(tsName)=>{            
            var script = {
                name: tsName, //path.basename(tsName),
                content: this.readTextFile(tsName)
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









