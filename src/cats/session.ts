///<reference path='project.ts'/>

module cats {

var EditSession = ace.require("ace/edit_session").EditSession;
var UndoManager = ace.require("ace/undomanager").UndoManager;
var path = require("path");

class Session {
	
	static MODES = {
		".js" : "ace/mode/javascript",
		".ts" : "ace/mode/typescript",
		".html" : "ace/mode/html",
		".htm" : "ace/mode/html",
		".css" : "ace/mode/css",
		".json" : "ace/mode/json"
	};

	editSession;
	updateSourceTimer;
	autocomplete = false;
	iSense;
	changed = false;

	constructor(private project:Project,private name:string,content:string) {
		console.log("Creating new session for file " + name);
  		var ext = path.extname(name);

  		this.editSession = new EditSession(content,this.getMode(ext));

		if (ext === ".ts") {
			this.autocomplete = true;        
			this.editSession.on("change", this.onChangeHandler.bind(this));
		}

  		this.editSession.setUndoManager(new UndoManager());  		
	}


	private getMode(ext: string) : string {
		var result = Session.MODES[ext];
		if (! result) result = "ace/mode/text";
		return result;
	}

	// Perform code autocompletion
	autoComplete(cursor, view)  {    
		if (! this.autoComplete) return;
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