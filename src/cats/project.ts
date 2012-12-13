///<reference path='autocompleteview.ts'/>
///<reference path='isensehandler.ts'/>
///<reference path='treeviewer.ts'/>
///<reference path='configuration.ts'/>
///<reference path='session.ts'/>

declare var ace;
declare var require;
declare var _canLog; // logging flag dynatree;

module cats {


// Bug in tsc that makes --out directory not working
// when using import statements. So for now a plain require
// import fs = module("fs");
// import path = module("path");
var fs = require("fs");
var path = require("path");

export var project:Project; // Singleton project

export class Project {
    // The name of the file that is currently being edited
    // filename:string;
    // private ignoreChange = false;
    private sessions = {};
    private session:Session;
    editor:any;
    iSense:ISenseHandler;
    config: Configuration;

    private loadDefaultLib = true;
    // private markedErrors = [];
    autoCompleteView;


// Set the project to a new directory and make sure 
// we remove old artifacts.
constructor(public projectDir:string) {
    this.config = new Configuration(this.projectDir);
    this.config.load();

    this.editor = this.createEditor();
    
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
  var script = this.session.getValue();      
  var confirmation = confirm("Save file " + script.name);
  if (confirmation) {  
      Project.writeTextFile(script.name,script.content);
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
    editor.setTheme(this.config.config().theme);    
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
      if (content == null) content = Project.readTextFile(name);
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









