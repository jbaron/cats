///<reference path='project.ts'/>
///<reference path='../tsworker/typescript.d.ts'/>

module cats {

import path = module("path");
// import TypeScript = module(TypeScript);

var EditSession = ace.require("ace/edit_session").EditSession;
var UndoManager = ace.require("ace/undomanager").UndoManager;

export class Session {
	
	private static MODES = {
		".js" : "ace/mode/javascript",
		".ts" : "ace/mode/typescript",
		".html" : "ace/mode/html",
		".htm" : "ace/mode/html",
		".css" : "ace/mode/css",
		".less" : "ace/mode/css",
		".svg" : "ace/mode/svg",
		".yaml" : "ace/mode/yaml",
		".xml" : "ace/mode/xml",
		".json" : "ace/mode/json"
	};

	// The ACE EditSession object
	editSession:ACE.EditSession;

	private updateSourceTimer;
	enableAutoComplete = false;
	
	// Is the worker out of sync with the source code
	private pendingWorkerUpdate = false; 

	// Has the code been changed without saving yet
	changed = false;

	constructor(private project:Project,public name:string,content:string) {
		console.log("Creating new session for file " + name + " with content length " + content.length);
  		var ext = path.extname(name);

  		this.editSession = new EditSession(content,this.getMode(ext));

		if (ext === ".ts") {
			this.enableAutoComplete = true; 
		}

		this.editSession.on("change", this.onChangeHandler.bind(this));	
  		this.editSession.setUndoManager(new UndoManager());  		
	}

	getValue() {	
		return this.editSession.getValue()
	}

	static convertMember(member) :string{
		var result = member.prefix;
		if (member.entries) {
			for (var i=0;i<member.entries.length;i++) {
				result += this.convertMember(member.entries[i]);
			}		
		} else {
			result += member.text;
		}
		result += member.suffix;
		return result;
	}


	getCursorFromScreen(x:number,y:number) {
		var r = this.project.editor.renderer;
        var canvasPos = r.rect || (r.rect = r.scroller.getBoundingClientRect());
        var offset = (x + r.scrollLeft - canvasPos.left - r.$padding) / r.characterWidth;
        var row = Math.floor((y + r.scrollTop - canvasPos.top) / r.lineHeight);
        var col = Math.round(offset);

        var screenPos = {row: row, column: col, side: offset - col > 0 ? 1 : -1};
        var docPos = this.editSession.screenToDocumentPosition(screenPos.row, screenPos.column);
        return docPos;
	}

	// Get the screen position based on the mouse location
	getScreenPos(x:number,y:number) {
		if (! this.enableAutoComplete) return;
		var project = this.project;

		var r = project.editor.renderer;
        var canvasPos = r.rect || (r.rect = r.scroller.getBoundingClientRect());
        var offset = (x + r.scrollLeft - canvasPos.left - r.$padding) / r.characterWidth;
        var row = Math.floor((y + r.scrollTop - canvasPos.top) / r.lineHeight);
        var col = Math.round(offset);

        var screenPos = {row: row, column: col, side: offset - col > 0 ? 1 : -1};
        var docPos = this.editSession.screenToDocumentPosition(screenPos.row, screenPos.column);
        // console.log(JSON.stringify(docPos));
        project.iSense.perform("getInfoAtPosition","getTypeAtPosition",this.name, docPos,         	
        	(err,data:TypeScript.Services.TypeInfo) => {
        		if (! data) return;
        		var member = data.memberName;
        		if (! member) return;

        		var tip = Session.convertMember(member);
        		project.toolTip.show(x,y,tip);	
        		
        	});
	}

	// Determine the edit mode based on the file extension
	private getMode(ext: string) : string {
		var result = Session.MODES[ext];
		if (! result) result = "ace/mode/text";
		return result;
	}

	// Perform code autocompletion
	autoComplete(cursor:ACE.Position, view:AutoCompleteView)  {    
		if (! this.enableAutoComplete) return;
		var editSession = this.editSession;

	    // Any pending changes that are not yet send to the worker?
	    if (this.pendingWorkerUpdate) {
	            var source = editSession.getValue();
	            this.project.iSense.perform("updateScript",this.name, source,(err,result) => {
	                editSession.setAnnotations(result);
	            }); 
	            this.pendingWorkerUpdate = false; 
	    };

	    this.project.iSense.perform("autoComplete",cursor, this.name, (err,completes) => {
	        if (completes != null) view.showCompletions(completes.entries);
	    });
	}

	onChangeHandler(event) {
		this.changed = true;
		if (! this.enableAutoComplete) return;
		
	    this.pendingWorkerUpdate = true;
	    clearTimeout(this.updateSourceTimer);
	    
	    this.updateSourceTimer = setTimeout(() => {    
	          if (this.pendingWorkerUpdate) { 
	              console.log("updating source code for file " + this.name); 
	              var source = this.editSession.getValue();
	              this.project.iSense.perform("updateScript",this.name, source,(err,result) => {
	                    this.editSession.setAnnotations(result);
	              });
	              this.pendingWorkerUpdate= false; // Already make sure we know a change has been send.
	          }
	    },1000);  
	};
}

}