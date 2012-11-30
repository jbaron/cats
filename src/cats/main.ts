///<reference path='../../lib/worker.d.ts'/>
///<reference path='./codemirror.d.ts'/>
///<reference path='./node.d.ts'/>


module CATS {

var filename:string;


// Bug in tsc that makes --out directory not working
// when using import statements. So for now a plain require
// import fs = module("fs");
// import path = module("path");

declare var require;
var fs = require("fs");
var path = require("path");




function createTreeViewer(dir:string, parent?: Element) : Element {

    if (! parent) parent = document.createElement("ul");

    fs.readdirSync(dir).forEach( file => {

        var li = document.createElement("li");
        var name = path.join(dir,file);
        var stat = fs.statSync(name);

        if (stat.isFile()) {
            li.appendChild(document.createTextNode(file));
            li.setAttribute("data-full", name);
            parent.appendChild(li);
        }

        if (stat.isDirectory()) {
            li.appendChild(document.createTextNode(file));
            li.appendChild(createTreeViewer(name, li));
            parent.appendChild(li)
        }
    });

    return parent;

}





function autoComplete(editor)  {
        var cur = editor.getCursor();
        console.log(JSON.stringify(editor.getTokenAt(cur)));
        

        var pos = editor.indexFromPos(cur);

        // Any pending changes that are not yet send to the worker?
        if (changed) {
                var source = editor.getValue();
                iSense.perform("updateScript",filename, source,(err,result) => {
                    handleCompileErrors(editor,result);
                }); 
                changed = false; 
        };

        iSense.perform("autoComplete",pos, filename, (err,completes) => {
            var result = {
                  list: completes,
                  from : {line:cur.line, ch:cur.col}, 
                  to: {line:cur.line, ch:cur.col}
            };
 
            CodeMirror.simpleHint(editor,() => {return result});

        });

}


var editor = CodeMirror(document.getElementById("editorPane"), {
    lineNumbers: true,
    extraKeys: {
        "Ctrl-Space": autoComplete
    },
    matchBrackets: true,
    mode: "text/typescript",
    gutters: ["CompileError"]
});

editor.on("change", onChangeHandler);


var updateSourceTimer;
var changed = false;
var markedErrors = [];

// Display any compile errors we got back
function handleCompileErrors(editor:CM.Editor,errors:TypeScript.ErrorEntry[]) {
    markedErrors.forEach((mark) => mark.clear());
    editor.clearGutter("CompileError");

    markedErrors = [];
    errors.forEach((error) => {
        console.log(JSON.stringify(error));
        var from = editor.posFromIndex(error.minChar);
        var to = editor.posFromIndex(error.limChar);
        var markedError = editor.markText(from,to,{className: "crinkle"});
        markedErrors.push(markedError);

        var img = document.createElement("img");
        img.setAttribute("title",error.message);
        img.setAttribute("src","static/error.png");
        editor.setGutterMarker(from.line,"CompileError",img);

    });    
}

function onChangeHandler(editor:CM.Editor,info) {
    changed = true;
    clearTimeout(updateSourceTimer);
    if (info.text[0] === '.') {
        autoComplete(editor);
    }
    updateSourceTimer = setTimeout(() => {    
          if (changed) { 
              console.log("updating source code"); 
              var source = editor.getValue();
              iSense.perform("updateScript",filename, source,(err,result) => {
                    handleCompileErrors(editor,result);
              });
              changed= false; // Already make sure we know a change has been send.
          }
    },500);  
};


/*
var root:Element = <any>document.getElementsByClassName("CodeMirror")[0];

var mytime;
root.addEventListener("mousemove", function (e:MouseEvent) {
    clearTimeout(mytime);
    mytime = setTimeout(() => {
        var coord = editor.coordsChar({left: e.pageX, top: e.pageY});

    }, 500);
});
*/

export function updateEditor(nr: number) {
    iSense.perform("getScript", nr, (err,script) => {
        filename = script.name;
        editor.setValue(script.content);
    });
};

function loadScripts(projectDir:string) {
        var result = [];
        try {
            var buildFile = path.join(projectDir,"build");
            var filesTXT = fs.readFileSync(buildFile,"utf-8");
        } catch (err) {
            alert("Couldn't find valid build file at " + buildFile);
            return [];            
        }
        var lines = filesTXT.split(/\r?\n/);
        lines.forEach( (line) => {
                line = line.trim();
                if ( line && (line.indexOf("--") !== 0) )  {
                        var fullName = path.join(projectDir,line);
                        result.push({name:line, content:fs.readFileSync(fullName,"utf-8")});        
                }
        });
        return result;
}

export function setProject(projectDir) {
    iSense.perform("reset",() => {});

    var select = document.getElementById("projectFiles");
    select.innerHTML = '';

    var files = loadScripts(projectDir);
    files.forEach( file => {
        var option = document.createElement("option");
        option.setAttribute("value", file.name);
        option.innerHTML = file.name;
        select.appendChild(option);
        iSense.perform("addScript",file,() => {});    
    });
    
    if (files.length)
        updateEditor(0); 
    else 
        editor.setValue("");  


    // var elem = document.getElementById("projectFiles2");
    // var f = createTreeViewer(projectDir,elem);
}


// Handles the communication witht the ISense Worker
// The implementation uses aJSON-RPC style of communication
export class ISenseHandler {

    private worker;
    private messageId = 0;
    private registry = {};

    constructor() {
        // Lets create a new worker
        this.worker = new Worker("./lib/worker.js");
        this.init();
    }

    // Invoke a method on the Worker 
    perform(method, ...data:any[]) {
        var handler = data.pop();
        this.messageId++;
        var message = {
            id: this.messageId,
            method: method,
            params: data
        }
        this.worker.postMessage(message);
        // console.log("Send message " + method + ":" + this.messageId + " to worker");
        if (handler) this.registry[this.messageId] = handler;
    }

    private init() {
        // Setup the message handler
        this.worker.onmessage = (e) => {
            var msg = e.data;
            var id = msg.id;
            // console.log("Received message reply " + id + " from worker.");
            if (msg.error) {
                console.error("Got error back !!! " + msg.error);
                console.error(msg.error.stack);
            }
            var handler = this.registry[id];
            if (handler) {
                delete this.registry[id];
                handler(msg.error, msg.result);
            }
        };
    }

}


export function chooseFile(chooser) {
    chooser.trigger('click');            
    chooser.change(function(evt) {
      setProject(this.value);
    });
};


var iSense = new ISenseHandler();
setProject("./demo");

var gui = require('nw.gui');
var win = gui.Window.get().maximize();

  

}




