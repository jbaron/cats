// Licensed under the Apache License, Version 2.0. 
///<reference path='./harness.ts'/>
///<reference path='../typescript/compiler/io.ts'/>

declare var IO: IIO;

var path = require("path");

interface Coord {
    col: number;
    line: number;
}


function caseInsensitive(a, b) {
    if (a.toLowerCase() < b.toLowerCase()) return -1;
    if (a.toLowerCase() > b.toLowerCase()) return 1;
    return 0;
}


// member = 0, type =1, other = 2
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
        "class" : true
    }
    
]

class TypeScriptHint {

    private ls;

    constructor(public projectDir:string) {
        var filesTXT = IO.readFile(path.join(projectDir,"build"));
        var lines = filesTXT.split(/\r?\n/);
        lines.forEach( (line) => {
                line = line.trim();
                if ( line && (line.indexOf("--") !== 0) )  
                this.addScript(line);            
        });
        this.ls = this.typescriptLS.getLanguageService();
    }

    // private typescriptLS = new Harness.TypeScriptLS();
    private typescriptLS : Harness.TypeScriptLS = new Harness.TypeScriptLS();

    getScriptIds() : string[] {
        var count = this.typescriptLS.getScriptCount();
        var result = [];
        for (var i=0;i<count;i++) {
            result.push(this.typescriptLS.getScriptId(i));
        }
        return result;
    }

    getScript(index:number) {
        var script = this.typescriptLS.scripts[index];

        return {
            content : script.content,
            name : script.name
        }
        
    }

    addScript(fileName:string) {
        var fullName = path.join(this.projectDir,fileName);
        var scriptText = IO.readFile(fullName);
        this.typescriptLS.addScript(fileName, scriptText,true);
        console.log("Added " + fileName);
    }

    addSource(src, fileName) {
        this.typescriptLS.addScript(fileName, src, true);
    }

    // updated the content of a script
    updateScript(fileName,src) {
        this.typescriptLS.updateScript(fileName, src, true);
    }

    // Get the position based on the coordinates
    private getPosition(filename:string, coord:Coord) : number{
        var script = this.ls.getScriptAST(filename);
        var lineMap = script.locationInfo.lineMap;  

        // Determine the position
        var pos = lineMap[coord.line] + coord.col;
        return pos;
    }

    public getTypeAtPosition(fileName: string, coord: Coord) {
        var pos = this.getPosition(fileName,coord);
        return this.ls.getTypeAtPosition(fileName,pos);
    }

	public autoComplete(mode:number, coord:Coord, filename:string, updatedSrc?:string) {

         if (updatedSrc) {
            this.updateScript(filename, updatedSrc);
        }
        
        this.ls = this.typescriptLS.getLanguageService();

        var pos = this.getPosition(filename, coord);

        // Lets find out what autocompletion there is possible		
        var member =  this.ls.getCompletionsAtPosition(filename, pos, mode===0);

        var result = [];
        var okKinds = autoCompleteMode[mode];
        member.entries.forEach(entry => {
            // console.log(JSON.stringify(entry));
            if (okKinds[entry.kind]) result.push(entry.name); 
        });
        result.sort(caseInsensitive);
        return {
            list: result,
            from : {line:coord.line -1, ch:coord.col},
            to:    {line:coord.line -1, ch:coord.col}
        };

	}
}


