///<reference path='project.ts'/>
///<reference path='../tsworker/typescript.d.ts'/>

module cats {

import path = module("path");
// import TypeScript = module(TypeScript);

var EditSession:ACE.EditSession = ace.require("ace/edit_session").EditSession;
var UndoManager:ACE.UndoManager = ace.require("ace/undomanager").UndoManager;

export class Session {
	
	private static MODES = {
		".js" : "ace/mode/javascript",
		".ts" : "ace/mode/typescript",
		".xhtml" : "ace/mode/html",
		".xhtm" : "ace/mode/html",
		".html" : "ace/mode/html",
		".htm" : "ace/mode/html",
		".css" : "ace/mode/css",
		".less" : "ace/mode/less",
		".md" : "ace/mode/markdown",
		".svg" : "ace/mode/svg",
		".yaml" : "ace/mode/yaml",
		".yml" : "ace/mode/yaml",
		".xml" : "ace/mode/xml",
		".json" : "ace/mode/json"
	};

	// The ACE EditSession object
	editSession:ACE.EditSession;

	private updateSourceTimer;
	enableAutoComplete = false; //TODO refactor to typeScriptMode 
	
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

	getValue():string {	
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



	getPositionFromScreenOffset(x:number,y:number) : ACE.Position {
		var r = this.project.editor.renderer;
        var offset = (x + r.scrollLeft - r.$padding) / r.characterWidth;

        // Quickfix for strange issue        
        var correction = r.scrollTop?7:0;

        var row = Math.floor((y + r.scrollTop -correction) / r.lineHeight);
        var col = Math.round(offset);
        // console.log(JSON.stringify([x,y,r.scrollLeft,r.scrollTop,r.lineHeight]));
        var docPos = this.editSession.screenToDocumentPosition(row, col);
        // console.log(JSON.stringify(docPos));
        return docPos;
	}

	getPositionFromScreen(x:number,y:number) : ACE.Position {
		var r = this.project.editor.renderer;
        var canvasPos = r.rect || (r.rect = r.scroller.getBoundingClientRect());
        // console.log(canvasPos.left);
        var offset = (x + r.scrollLeft - canvasPos.left - r.$padding) / r.characterWidth;
        var row = Math.floor((y + r.scrollTop - canvasPos.top) / r.lineHeight);
        var col = Math.round(offset);

        var docPos = this.editSession.screenToDocumentPosition(row, col);
        // console.log(JSON.stringify(docPos));
        return docPos;
	}

	// Screen location
	showInfoAt(ev:MouseEvent) {
		if (! this.enableAutoComplete) return;

		var docPos = this.getPositionFromScreenOffset(ev.offsetX,ev.offsetY);
		var project = this.project;

        project.iSense.perform("getInfoAtPosition","getTypeAtPosition",this.name, docPos,         	
        	(err,data:TypeScript.Services.TypeInfo) => {
        		if (! data) return;
        		var member = data.memberName;
        		if (! member) return;

        		var tip = Session.convertMember(member);
        		project.toolTip.show(ev.x,ev.y,tip);	
        		
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