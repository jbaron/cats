ace.define("ace/snippets/typescript",["require","exports","module"], function(require, exports, module) {
"use strict";

exports.snippetText = "# switch\n\
snippet switch\n\
	switch (${1:expression}) {\n\
		case '${3:case}':\n\
			${4:// code}\n\
			break;\n\
		${5}\n\
		default:\n\
			${2:// code}\n\
	}\n\
#";

exports.scope = "typescript";

});
