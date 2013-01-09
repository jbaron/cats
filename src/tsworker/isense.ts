// Licensed under the Apache License, Version 2.0. 
///<reference path='harness.ts'/>
///<reference path='../typings/ace.d.ts'/>


importScripts("typescript.js")

module Cats.TSWorker {

var outputFiles = {};

var console = {
    log : function(str) {
        postMessage(str,null);
    }
}

// Case insensitive sorting
function caseInsensitiveSort(a:{name:string;}, b:{name:string;}) {
    if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
    if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
    return 0;
}

class ISense {

    private maxErrors = 10;
    private ls:Services.ILanguageService;
    private typescriptLS : TypeScriptLS;

    // Create a new TypeScript instance with projectDir as project home
    constructor() {
        this.typescriptLS = new TypeScriptLS();
        this.ls = this.typescriptLS.getLanguageService();
    }

    reset() {
        this.typescriptLS = new TypeScriptLS();
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

    // Get the name of a script based on its index
    getUnitName(index:number) : string {
        return this.typescriptLS.scripts[index].name;
    }

    // Convert a TS offset to Ace position
    getCursor(name:string,chars:number) : Ace.Position {
        var tsCursor = this.typescriptLS.positionToLineCol(name,chars);
        var result = {
            row: tsCursor.line - 1,
            column: tsCursor.col -1
        };
        return result;
    }

    getDefinitionAtPosition(fileName:string, pos:Ace.Position) {
        var chars = this.getPositionFromCursor(fileName, pos);
        var info = this.ls.getDefinitionAtPosition(fileName,chars);
        if (info) { 
            var unitName = this.getUnitName(info.unitIndex);
            info["unitName"] = unitName;
            info["startPos"] = this.getCursor(unitName, info.minChar);
            info["endPos"] = this.getCursor(unitName, info.limChar);
        }
        return info;
    }


    structureErrors(errorStr:string) {
      var errors = errorStr.split("\n"); 
      var result = [];
      errors.forEach( (error:string) => {      
          var match = /^(.*)\(([0-9]*),([0-9]*)\):(.*)$/g;
          var parts = match.exec(error);
          if (! parts) {
            console.log("Couldn't parse error:" + error);
            return;
           }
           result.push({
                descr : parts[2],
                resource: parts[1],
                position: parts[3],
                type:"error"
            });

      });
      return result;

    }

    compile(options){

        var outfile = this.createWriter();
        var outerr = this.createWriter();

        // TODO recursive mixin
        var compOptions = new TypeScript.CompilationSettings();
        for (var i in options) {
            compOptions[i] = options[i];
        } 

        try {
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
            // var error = this.structureErrors(outerr.Get());

            return {
                source: resultSource, // outfile.Get(),
                error: outerr.Get()
            };

        } catch(err) {
            var msg = err.stack;
            var prefix = "SyntaxError: ";
            if (msg.indexOf(prefix) === 0) {
                return {
                    error: msg.substring(prefix.length)
                };
            }
            throw err;    
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


    splice(str,start,max,replacement) {
        return str.substring(0,start)+replacement+str.substring(max);
    }



    getFormattedTextForRange(fileName:string, start:number, end:number) {
        var options = new Services.FormatCodeOptions();
        options.NewLineCharacter = "\n";
        var edits = this.ls.getFormattingEditsForRange(fileName, start, end , options);
        var result = this.getScriptContent(fileName);
        var offset = 0;
        for (var i=0;i<edits.length;i++) {
            var edit = edits[i];
            result = this.splice(result,edit.minChar+offset, edit.limChar+offset,edit.text);
            offset += edit.text.length - (edit.limChar - edit.minChar) ;
        }
        return result;
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


    // Get the know errors in a script
    getErrors(fileName:string) {
        var result = [];
        var errors = this.ls.getScriptErrors(fileName,this.maxErrors);
        if (errors.length) {
            var script = this.ls.getScriptAST(fileName);
            
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
        }
        return result; 
    }

    // updated the content of a script
    updateScript(fileName:string,src:string,getErrors=true) {
        this.typescriptLS.updateScript(fileName, src, false);
        if (getErrors) return this.getErrors(fileName);
    }

    // Get an Ace Range from TS minChars and limChars
    getRange(script:string, minChar:number,limChar:number)  {
        var startLC = this.typescriptLS.positionToLineCol(script, minChar);
        var endLC = this.typescriptLS.positionToLineCol(script, limChar);
        var result = {
            startRow : startLC.line -1,
            startColumn : startLC.col -1,
            endRow:endLC.line -1,
            endColumn:endLC.col -1
        };
        return result;
    }


    // Get the chars based position on the coordinates
    private getPosition(fileName:string, coord) : number{
        var script = this.ls.getScriptAST(fileName);
        var lineMap = script.locationInfo.lineMap;  

        // Determine the position
        var pos = lineMap[coord.line] + coord.col;
        return pos;
    }

     // Get the chars offset based on the Ace position
    private getPositionFromCursor(fileName:string, cursor:Ace.Position) : number{
        var script = this.ls.getScriptAST(fileName);
        var lineMap = script.locationInfo.lineMap;  

        // Determine the position
        var pos = lineMap[cursor.row + 1] + cursor.column;
        // console.log(pos);
        return pos;
    } 


    // Get the position
    public getTypeAtPosition(fileName: string, coord) : Services.TypeInfo {
        var pos = this.getPositionFromCursor(fileName,coord);
        return this.ls.getTypeAtPosition(fileName,pos);
    }


    // Determine type of autocompletion
    private determineAutoCompleteType(source:string, pos:number)  {
        var identifyerMatch=/[0-9A-Za-z_\$]*$/;
        var previousCode = source.substring(0,pos);

        var match = previousCode.match(identifyerMatch);
        var newPos = pos;
        var memberMode = false;
        if (match && match[0])  newPos = pos - match[0].length;
        if (source[newPos-1] === '.') memberMode = true;

        var result = {
            pos: newPos,
            memberMode:memberMode
        }

        // console.log("Autocompletion determine: " + JSON.stringify(result));
        return result;
    }

    private getLine(scriptName:string,minChar: number, limChar:number) {
        var content = this.getScriptContent(scriptName);
        var min = content.substring(0,minChar).lastIndexOf("\n");
        var max = content.substring(limChar).indexOf("\n");        
        return content.substring(min+1,limChar + max);
    }


    public getOutliningRegions(fileName: string) {
        var results : Services.NavigateToItem[] = this.ls.getOutliningRegions(fileName);
        for (var i=0;i<results.length;i++) {
            var result = results[i];
            var fileName = this.getUnitName(result.unitIndex);
            result["range"] = this.getRange(fileName,result.minChar,result.limChar);
            result["unitName"] = fileName;
        }
        return results;
    }


    // generic wrapper for info at a certain position 
    public getInfoAtPosition(method:string, filename:string, cursor:Ace.Position) {
        var pos = this.getPositionFromCursor(filename,cursor);
        var result = [];
        var entries:Services.ReferenceEntry[] = this.ls[method](filename, pos);
        for (var i=0;i<entries.length;i++) {
            var ref = entries[i];
            var name = this.typescriptLS.scripts[ref.unitIndex].name;
            result.push({
                script : name,
                range : this.getRange(name, ref.ast.minChar,ref.ast.limChar),
                description: this.getLine(name,ref.ast.minChar,ref.ast.limChar)
            }); 
        }               
        return result;
    }

	public autoComplete(cursor:Ace.Position, filename:string) : any {
        var pos = this.getPositionFromCursor(filename,cursor);
        var memberMode = false;
        var source = this.getScriptContent(filename);
        var type = this.determineAutoCompleteType(source,pos);
        /*
        if (type === "member") {
            memberMode = true;
        }
        */
        // Lets find out what autocompletion there is possible		
        var completions =  this.ls.getCompletionsAtPosition(filename, type.pos, type.memberMode);
        
        completions.entries.sort(caseInsensitiveSort); // Sort case insensitive
        return completions;
	}
}

var tsh = new ISense();

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