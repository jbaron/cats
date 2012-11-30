// Licensed under the Apache License, Version 2.0. 
///<reference path='./harness.ts'/>

module CATS {



function caseInsensitive(a, b) {
    if (a.toLowerCase() < b.toLowerCase()) return -1;
    if (a.toLowerCase() > b.toLowerCase()) return 1;
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

class TypeScriptHint {

    private ls;
    private typescriptLS : Harness.TypeScriptLS = new Harness.TypeScriptLS();

    // Create a new TypeScript instance with projectDir as project home
    constructor() {
        // this.ls = this.typescriptLS.getLanguageService();
        this.ls = this.typescriptLS.getLanguageService();
    }

    reset() {
        this.typescriptLS = new Harness.TypeScriptLS();
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

    // Get the script name and content 
    getScript(index:number) {
        var script = this.typescriptLS.scripts[index];

        return {
            content : script.content,
            name : script.name
        }
        
    }

    // Add a new script
    addScript(script) {
        this.typescriptLS.addScript(script.name, script.content,false);
    }

    // updated the content of a script
    updateScript(fileName,src) {
        this.typescriptLS.updateScript(fileName, src, false);
        // this.ls = this.typescriptLS.getLanguageService();
        return this.ls.getScriptErrors(fileName,10);
    }

    // Get the position based on the coordinates
    private getPosition(filename:string, coord) : number{
        var script = this.ls.getScriptAST(filename);
        var lineMap = script.locationInfo.lineMap;  

        // Determine the position
        var pos = lineMap[coord.line] + coord.col;
        return pos;
    }

    // Get the position
    public getTypeAtPosition(fileName: string, coord) {
        var pos = this.getPosition(fileName,coord);
        return this.ls.getTypeAtPosition(fileName,pos);
    }

    // Determine type of autocompletion
    private determineAutoCompleteType(source:string, pos:number) {
        var memberMatch=/\.[0-9A-Za-z_]*$/;
        var typeMatch=/:[0-9A-Za-z_]*$/;
        var previousCode = source.substring(0,pos);
        if (previousCode.match(memberMatch)) return "member";
        if (previousCode.match(typeMatch)) return "type";
        return "other";
    }

   
	public autoComplete(pos: number, filename:string) : any {
        
        var memberMode = false;
        var source = this.getScriptContent(filename);
        var type = this.determineAutoCompleteType(source,pos);
        if (type === "member") {
            memberMode = true;
        }
        // Lets find out what autocompletion there is possible		
        var completions =  this.ls.getCompletionsAtPosition(filename, pos, memberMode);

        var result = [];
        // var okKinds = autoCompleteMode[mode];
        completions.entries.forEach(entry => {
            // console.log(JSON.stringify(entry));
            // if (okKinds[entry.kind]) result.push(entry.name); // Todo return all info
            result.push(entry.name); // Todo return all info
        });
        result.sort(caseInsensitive); // Sort case insensitive
        return result;

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