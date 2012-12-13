///<reference path='project.ts'/>

module cats {

var EditSession = ace.require("ace/edit_session").EditSession;
var UndoManager = ace.require("ace/undomanager").UndoManager;
var path = require("path");

export class Session {
	
	static MODES = {
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

	editSession;
	updateSourceTimer;
	enableAutoComplete = false;
	iSense;
	changed = false;

	constructor(private project:Project,private name:string,content:string) {
		console.log("Creating new session for file " + name + " with content length " + content.length);
  		var ext = path.extname(name);

  		this.editSession = new EditSession(content,this.getMode(ext));

		if (ext === ".ts") {
			this.enableAutoComplete = true;        
			this.editSession.on("change", this.onChangeHandler.bind(this));
		}

  		this.editSession.setUndoManager(new UndoManager());  		
	}

	getValue() {
		return {
			name:this.name,
			content:this.editSession.getValue()
		}
	}

	// Determine the edit mode based on the file extension
	private getMode(ext: string) : string {
		var result = Session.MODES[ext];
		if (! result) result = "ace/mode/text";
		return result;
	}

	// Perform code autocompletion
	autoComplete(cursor, view)  {    
		if (! this.enableAutoComplete) return;

	    // Any pending changes that are not yet send to the worker?
	    if (this.changed) {
	            var source = this.editSession.getValue();
	            this.project.iSense.perform("updateScript",this.name, source,(err,result) => {
	                this.editSession.setAnnotations(result);
	            }); 
	            this.changed = false; 
	    };

	    this.project.iSense.perform("autoComplete",cursor, this.name, (err,completes) => {
	        if (completes != null) view.showCompletions(completes.entries);
	    });
	}

	onChangeHandler(event) {

	    this.changed = true;
	    clearTimeout(this.updateSourceTimer);
	    
	    this.updateSourceTimer = setTimeout(() => {    
	          if (this.changed) { 
	              console.log("updating source code for file " + this.name); 
	              var source = this.editSession.getValue();
	              this.project.iSense.perform("updateScript",this.name, source,(err,result) => {
	                    this.editSession.setAnnotations(result);
	              });
	              this.changed= false; // Already make sure we know a change has been send.
	          }
	    },1000);  
	};

}


}