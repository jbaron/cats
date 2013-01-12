// This module abstracts the native IO form the rest. Right now supports node (node-webkit).

var path = require("path");

// Some commonly used filesystem functions
export var fs = {
	readFile: "",
	writeFiles:"",
	readDir:"",
	writeFile : "",
	removeFile : "",
	removeDir : "",
	watchPath: ""
}

// Some commonly used path functions to make sure CATS work on all platforms
export var path = {
	join:path.join,
	basename:path.basename,
	dirname:path.dirname
};

