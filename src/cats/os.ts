//
// Copyright (c) JBaron.  All rights reserved.
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//


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

