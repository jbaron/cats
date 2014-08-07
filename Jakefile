// This file contains the build logic for CATS

var fs = require("fs");
var path = require("path");

var workerOptions = [
   "src/typings/typescript.d.ts",
   "src/typings/cats.d.ts",
   "src/cats/common.ts",
   "src/tsworker/languageservicehost.ts",    
   "src/tsworker/isense.ts"
];

var umlOptions = [
   "src/typings/arbor.d.ts",
   "src/typings/jsuml2.d.ts",
   "src/uml/layout.ts"
];

var catsOptions = [
    "src/typings/ace.d.ts",
    "src/typings/cats.d.ts",
    "src/typings/jsuml2.d.ts",
    "src/typings/node-webkit.d.ts",
    "src/typings/typescript.d.ts",
    "src/typings/qooxdoo.d.ts",
    
    "src/cats/theme/Color.ts",
    "src/cats/theme/Decoration.ts",
    "src/cats/theme/Font.ts",
    "src/cats/theme/Appearance.ts",
    "src/cats/theme/Theme.ts",
    
    "src/cats/common.ts",
    "src/cats/infobus.ts",
    "src/cats/os.ts",
    "src/cats/ide.ts",
    "src/cats/session.ts",
    "src/cats/commands/commander.ts",
    "src/cats/commands/editorcommands.ts",
    "src/cats/commands/filecommands.ts",
    "src/cats/commands/helpcommands.ts",
    "src/cats/commands/idecommands.ts",
    "src/cats/commands/projectcommands.ts",
    "src/cats/commands/refactorcommands.ts",
    "src/cats/configloader.ts",
    "src/cats/isensehandler.ts",
    "src/cats/menu/menubar.ts",
    "src/cats/project.ts",
    "src/cats/gui/console.ts",
    "src/cats/gui/fileNavigator.ts",
    "src/cats/gui/outlineNavigator.ts",
    "src/cats/gui/resultTable.ts",
    "src/cats/gui/sourceEditor.ts",
    "src/cats/gui/tabView.ts",
    "src/cats/gui/toolBar.ts",
    "src/cats/gui/sessionTabView.ts",
    "src/cats/gui/statusBar.ts",
    "src/cats/gui/autoCompletePopup.ts",
    "src/cats/gui/fileContextMenu.ts",
    
    "src/cats/util/mime.ts",
    
    "src/cats/main.ts"
];


/**
 * Compiler task
 */
task('compile', {async:true}, function(outFile, options) {
		var cmd = "tsc --target ES5 --out " + outFile + " " + options.join(" ") ;

		// console.log(cmd + "\n");
		var ex = jake.createExec([cmd]);
		
		// Add listeners for output and error
		ex.addListener("stdout", function(output) {
			process.stdout.write(output);
		});
		ex.addListener("stderr", function(error) {
			process.stderr.write(error);
		});
		ex.addListener("cmdEnd", function() {
			console.log("Done creating file " + outFile);
			complete();
		});
		ex.addListener("error", function() {
			fs.unlinkSync(outFile);
			console.error("Compilation of " + outFile + " unsuccessful");
		});
		ex.run();	
});


file("lib/main.js" , catsOptions, {async:true}, function() {
     jake.Task['compile'].invoke("lib/main.js", catsOptions);
});

task("compileWorker" , {async:true}, function() {
   jake.Task['compile'].invoke("lib/tsworker.js", workerOptions);
});

file("lib/tsworker.js" , workerOptions, {async:true}, function() {
   jake.Task['compile'].invoke("lib/tsworker.js", workerOptions);
});


file("lib/uml.js", umlOptions, {async:true}, function() {
    jake.Task['compile'].invoke("lib/uml.js", umlOptions);
});


// Set the default task
task("default", [], function() {
   jake.Task['lib/main.js'].invoke();
   jake.Task['lib/tsworker.js'].invoke();
   jake.Task['lib/uml.js'].invoke();
});


