// Licensed under the Apache License, Version 2.0. 
///<reference path='./harness.ts'/>

importScripts("typescript.js")


module CATS {

var outputFiles = {};


var console = {
    log : function(str) {
        postMessage(str,null);
    }
}

function caseInsensitive(a, b) {
    if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
    if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
    return 0;
}

declare interface Cursor {
    column: number;
    row: number;
}


class TypeScriptHint {

    private ls:Services.ILanguageService;
    private typescriptLS : LiteHarness.TypeScriptLS;

    // Create a new TypeScript instance with projectDir as project home
    constructor() {
        this.typescriptLS = new LiteHarness.TypeScriptLS();
        this.ls = this.typescriptLS.getLanguageService();
    }

    reset123() {
        this.typescriptLS = new LiteHarness.TypeScriptLS();
        this.ls = this.typescriptLS.getLanguageService();
    }


    createWriter() {
        var output = "";
        return {
            Write: function (s) { output  += s; },
            WriteLine: function (s) { output  += s + "\n";},
            Close: function () {},
            Get : function() { return output }
        };
    }


    createVirtualFiles(path:string,useUTF8?:bool):ITextWriter {        
        var output = "";
        var result = {
            Write: function (s) { output  += s; },
            WriteLine: function (s) { output  += s + "\n";},
            Close: function () {},
            Get : function() { return output }
        };
        outputFiles[path] = result;
        return result;
    }


    compile(options){

        var outfile = this.createWriter();
        var outerr = this.createWriter();

        var compOptions = new TypeScript.CompilationSettings();
        for (var i in options) {
            compOptions[i] = options[i];
        } 


        var compiler = new TypeScript.TypeScriptCompiler(outerr, new TypeScript.NullLogger(), compOptions);
        var scripts = this.typescriptLS.scripts;
        scripts.forEach( (script) =>{
            compiler.addUnit(script.content, script.name, false);
        })
        
        outputFiles = {};
        compiler.typeCheck();
        
        // compiler.emit(false, function (name) {});
        // public emit(createFile: (path: string, useUTF8?: bool) => ITextWriter): void;

        compiler.emit(this.createVirtualFiles);
        var resultSource = {}
        for ( var file in outputFiles) {
            resultSource[file] = outputFiles[file].Get();
        }

        // compiler.emitToOutfile(outfile);
        return {
            source: resultSource, // outfile.Get(),
            error: outerr.Get()
        } 
    }




    // Get the filenames of the scripts
    getScriptIds() : string[] {
        var count = this.typescriptLS.getScriptCount();
        var result = [];
        for (var i=0;i<count;i++) {
            result.push(this.typescriptLS.getScriptId(i));
        }
        return result;
    }


    getScriptContent(id:string) : string {
        var scripts = this.typescriptLS.scripts;
        var i = scripts.length;
        while (i--) {
            if (scripts[i].name === id) return scripts[i].content;
        }
    }

    getIndex(id:string) : number {
        var scripts = this.typescriptLS.scripts;
        var i = scripts.length;
        while (i--) {
            if (scripts[i].name === id) return i;
        }
        throw new Error("Script not found with name " + id);
    }


    // Get the script name and content
    getScript(id:string);
    getScript(index:number);  
    getScript(index) {
        if (typeof index === "string") {
            index = this.getIndex(index);
        }

        var script = this.typescriptLS.scripts[index];

        return {
            content : script.content,
            name : script.name
        }        
    }

    getFormattingEditsForRange(fileName, start, end) {
        return this.ls.getFormattingEditsForRange(fileName, start, end , new Services.FormatCodeOptions());
    }


    // Quick hack to get access to the language services
    languageService(operation:string,params) {
        var result = this.ls[operation].call(this.ls,params);
        return result;
    }

    // Add a new script
    addScript(name:string,source:string,resident?:bool) {
        this.typescriptLS.addScript(name, source,resident);
    }

    // updated the content of a script
    updateScript(fileName:string,src:string,errors=true) {
        this.typescriptLS.updateScript(fileName, src, false);
        if (! errors) {
            return;
        }
        // this.ls = this.typescriptLS.getLanguageService();
        var errors = this.ls.getScriptErrors(fileName,10);
        var script = this.ls.getScriptAST(fileName);
        
        var result = [];

        errors.forEach((error:TypeScript.ErrorEntry) => {
                var coord = TypeScript.getLineColumnFromPosition(script, error.minChar);
                var resultEntry = {
                    row:coord.line-1,
                    column:coord.col-1,
                    type:"error",
                    text:error.message,
                    raw: error.message
                };
                result.push(resultEntry);
        });
        return result;
    }

    // Get the position based on the coordinates
    private getPosition(fileName:string, coord) : number{
        var script = this.ls.getScriptAST(fileName);
        var lineMap = script.locationInfo.lineMap;  

        // Determine the position
        var pos = lineMap[coord.line] + coord.col;
        return pos;
    }

     // Get the position based on the coordinates
    private getPositionFromCursor(fileName:string, cursor:Cursor) : number{
        var script = this.ls.getScriptAST(fileName);
        var lineMap = script.locationInfo.lineMap;  

        // Determine the position
        var pos = lineMap[cursor.row + 1] + cursor.column;
        // console.log(pos);
        return pos;
    } 


    // Get the position
    public getTypeAtPosition(fileName: string, coord) {
        var pos = this.getPosition(fileName,coord);
        return this.ls.getTypeAtPosition(fileName,pos);
    }

    // Determine type of autocompletion
    private determineAutoCompleteType(source:string, pos:number) : string {
        var memberMatch=/\.[0-9A-Za-z_]*$/;
        var typeMatch=/:[0-9A-Za-z_]*$/;
        var previousCode = source.substring(0,pos);
        if (previousCode.match(memberMatch)) return "member";
        if (previousCode.match(typeMatch)) return "type";
        return "other";
    }

    // generic wrapper for info at a certain position 
    public getInfoAtPosition(method:string, filename:string, cursor:Cursor) {
        var pos = this.getPositionFromCursor(filename,cursor);
        var result = this.ls[method](filename, pos);
        return result;
    }

	public autoComplete(cursor:Cursor, filename:string) : any {
        var pos = this.getPositionFromCursor(filename,cursor);
        var memberMode = false;
        var source = this.getScriptContent(filename);
        var type = this.determineAutoCompleteType(source,pos);
        if (type === "member") {
            memberMode = true;
        }
        // Lets find out what autocompletion there is possible		
        var completions =  this.ls.getCompletionsAtPosition(filename, pos, memberMode);
        
        completions.entries.sort(caseInsensitive); // Sort case insensitive
        return completions;

	}
}

var tsh = new TypeScriptHint();

addEventListener('message', function(e) {
  var msg = e.data;

  var method = msg.method;
  var id = msg.id;
  var params = msg.params;
  try {
        var result = tsh[method].apply(tsh,params);
        postMessage({id: id,result: result},null);
   } catch(err) {
    var error = {
        description: err.description,
        stack: err.stack
    }
    postMessage({id: id,error: error},null);
   } 
}, false);


}