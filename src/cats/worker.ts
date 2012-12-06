// Licensed under the Apache License, Version 2.0. 
///<reference path='./harness.ts'/>

importScripts("typescript.js")


module CATS {




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


// member = 0, type = 1, other = 2
var autoCompleteMode:any[] = [
    {
        "method":true,
        "property":true
    },
    {
        "interface":true,
        "keyword":true
    },
    {
        "method" : true,
        "variable" : true,
        "class" : true,
        "module" : true,
        "function" : true,
        "enum" : true
    }
    
]

declare interface Cursor {
        column: number;
        row: number;
}


class TypeScriptHint {

    private ls;
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

    // Add a new script
    addScript(name,source,resident?) {
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
        console.log(pos);
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