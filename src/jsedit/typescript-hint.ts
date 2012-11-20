// Licensed under the Apache License, Version 2.0. 

///<reference path='./harness.ts'/>
///<reference path='../typescript/compiler/io.ts'/>
///<reference path='./codemirror.ts'/>

declare var IO: IIO;

class TypeScriptHint {

    // private typescriptLS = new Harness.TypeScriptLS();
    private typescriptLS = new Harness.TypeScriptLS();
    private id = "sample";
    private ls;

    addFile(filename) {
        var scriptText = IO.readFile(filename);
        this.typescriptLS.addScript(filename, scriptText,true);
    }

    addSource(src, id=this.id) {
        this.typescriptLS.addScript(id, src, true);
    }

    updateSource(src, id=this.id) {
        this.typescriptLS.updateScript(id, src, true);
    }


	public autoComplete(editor: CodeMirrorEditor) {
         var cur = editor.getCursor();
         this.updateSource(editor.getValue());
         var line = cur.line+1;
         var col = cur.ch;

            
		// get the real language service and not the shim
		var ls = this.typescriptLS.getLanguageService();
       
        // Get the lineMap
        var script = ls.getScriptAST(this.id);
        var lineMap = script.locationInfo.lineMap;  

        // Determine the position
        var pos = lineMap[line] + col;

        // Lets find out what autocompletion there is possible		
        var member =  ls.getCompletionsAtPosition(this.id, pos, true);

        // console.log("Possible completions:");

        var result = [];
        member.entries.forEach(entry => {
            // console.log(entry.name);
            result.push(entry.name); 
        });

        return {
            list: result,
            from : {line:cur.line, ch:cur.ch},
            to:    {line:cur.line, ch:cur.ch+1}
        };

	}
}


