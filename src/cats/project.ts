///<reference path='autocompleteview.ts'/>
///<reference path='isensehandler.ts'/>

declare var ace;
declare var require;


module cats {

var fs = require("fs");
var path = require("path");


export class Project {
    // The name of the file that is currently being edited
    private filename:string;
    private ignoreChange = false;
    private iSense;
    editor;

    private loadDefaultLib = true;
    private updateSourceTimer;
    private changed = false;
    private markedErrors = [];
    autoCompleteView;

// Bug in tsc that makes --out directory not working
// when using import statements. So for now a plain require
// import fs = module("fs");
// import path = module("path");



// Set the project to a new directory and make sure 
// we remove old artifacts.
constructor(private projectDir:string) {

    this.initEditor();
    this.autoCompleteView = new AutoCompleteView(this.editor); 
    
    this.iSense = new ISenseHandler();

    if (this.loadDefaultLib) {
      var libdts = Project.readTextFile("typings/lib.d.ts");
      this.iSense.perform("addScript","lib.d.ts", libdts, true, null);
    }


    this.scanProjectDir();

    this.editor.getSession().getUndoManager().reset();    
    this.assimilate();        
}


// Get the color of ace editor and use it to style the rest
assimilate() {
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

// Perform code autocompletion
autoComplete()  {
    var editor = this.editor;
    var cursor = editor.getCursorPosition();
        
    // Any pending changes that are not yet send to the worker?
    if (this.changed) {
            var source = editor.getValue();
            this.iSense.perform("updateScript",this.filename, source,(err,result) => {
                this.handleCompileErrors(result);
            }); 
            this.changed = false; 
    };

    this.iSense.perform("autoComplete",cursor, this.filename, (err,completes) => {
        if (completes != null) this.autoCompleteView.showCompletions(completes.entries);
    });
}


// Initialize the editor
initEditor() {
    var editor = ace.edit("editor");
    editor.setTheme("ace/theme/clouds");
    editor.getSession().setMode("ace/mode/typescript");
    this.ignoreChange = true;

    editor.commands.addCommands([{
        name:"autoComplete",
        bindKey:"Ctrl-Space",
        exec:this.autoComplete.bind(this)
    }]);

    var originalTextInput = editor.onTextInput;
    editor.onTextInput = (text) => {
        originalTextInput.call(editor, text);
        if (text === ".") this.autoComplete();
    };

    editor.getSession().on("change", this.onChangeHandler.bind(this));

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
    
    /*
    if (info.text[0] === '.') {
        autoComplete(editor);
    }
    */

    this.updateSourceTimer = setTimeout(() => {    
          if (this.changed) { 
              console.log("updating source code for file " + this.filename); 
              var source = this.editor.getValue();
              this.iSense.perform("updateScript",this.filename, source,(err,result) => {
                    this.handleCompileErrors(result);
              });
              this.changed= false; // Already make sure we know a change has been send.
          }
    },500);  
};


updateNonTs(name) {
  var content = Project.readTextFile(name);  
  this.editor.getSession().setMode("ace/mode/text");
  this.editor.setValue(content);
  this.filename = name;
  this.editor.moveCursorTo(0, 0);
}

updateEditor(name: string) {
    this.ignoreChange = true;
    var ext = path.extname(name);
    if (ext !== ".ts") {
        this.updateNonTs(name);
    } else {
      var tsName = path.basename(name);
      this.iSense.perform("getScript", tsName, (err,script) => {
        this.filename = tsName;
        this.editor.getSession().setMode("ace/mode/typescript");
        this.editor.setValue(script.content);
        this.editor.moveCursorTo(0, 0);
        this.ignoreChange = false;
    });
    }
};


static readTextFile(fullName:string) :string {
    var data = fs.readFileSync(fullName,"utf-8");
    var content = data.replace(/\r\n?/g,"\n");
    return content;
}

// Load all the script that are part of the project
// For now use a synchronous call to load.
// Also update the worker to have these scripts
scanProjectDir() {

        var children = createTreeViewer(this.projectDir,[],(tsName)=>{            
            var script = {
                name: path.basename(tsName),
                content: Project.readTextFile(tsName)
            }

            // this.iSense.perform("addScript",script,() => {});
            this.iSense.perform("updateScript",script.name,script.content,() => {});
            console.log("Added script " + script.name);  
        });

        $("#fileTree").innerHTML = "";
        $("#fileTree").dynatree({
          onActivate: function(node) { 
            var scriptname:string = node.data.key;
            if (scriptname) {
              cats.project.updateEditor(scriptname);
            }
          },
          children: children
       });

};


}

}









