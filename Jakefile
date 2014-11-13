// This file contains the build logic for CATS

var workerOptions = [
    "src/typings/typescriptServices.d.ts",
    "src/typings/cats.d.ts",
    "src/cats/common.ts",
    "src/tsworker/languageservicehost.ts",
    "src/tsworker/isense.ts",
    "src/tsworker/objectModel.ts"
];


var catsOptions = [
    "src/typings/ace.d.ts",
    "src/typings/cats.d.ts",
    "src/typings/jsuml2.d.ts",
    "src/typings/node-webkit.d.ts",
    "src/typings/typescriptServices.d.ts",
    "src/typings/qooxdoo.d.ts",
    
    "src/cats/theme/color.ts",
    "src/cats/theme/decoration.ts",
    "src/cats/theme/font.ts",
    "src/cats/theme/appearance.ts",
    "src/cats/theme/theme.ts",
    
    "src/cats/common.ts",
    "src/cats/os.ts",
    "src/cats/ide.ts",
    "src/cats/projectConfig.ts",
    "src/cats/tsWorkerProxy.ts",
    "src/cats/project.ts",
    "src/cats/refactor.ts",
    "src/cats/editor.ts",
    "src/cats/linter.ts",
    
    "src/cats/commands/commander.ts",
    "src/cats/commands/editorCommands.ts",
    "src/cats/commands/fileCommands.ts",
    "src/cats/commands/helpCommands.ts",
    "src/cats/commands/ideCommands.ts",
    "src/cats/commands/projectCommands.ts",
  
    "src/cats/gui/editor/tsCompleter.ts",
    "src/cats/gui/editor/autoCompletePopup.ts",
    "src/cats/gui/editor/sourceEditor.ts",
    "src/cats/gui/editor/imageEditor.ts",
    "src/cats/gui/editor/umlEditor.ts",
    "src/cats/gui/editor/tsTooltip.ts",
    "src/cats/gui/editor/sourceEditorContextMenu.ts",
    "src/cats/gui/editor/editSession.ts",

    "src/cats/gui/console.ts",
    "src/cats/gui/fileNavigator.ts",
    "src/cats/gui/outlineNavigator.ts",
    "src/cats/gui/resultTable.ts",
    "src/cats/gui/tabView.ts",
    "src/cats/gui/toolBar.ts",
    "src/cats/gui/editorTabView.ts",
    "src/cats/gui/statusBar.ts",
    "src/cats/gui/fileContextMenu.ts",
    "src/cats/gui/configDialog.ts",
    "src/cats/gui/processTable.ts",
    "src/cats/gui/busyWindow.ts",
    "src/cats/gui/propertyTable.ts",
    "src/cats/gui/layout.ts",
    "src/cats/gui/searchDialog.ts",
    "src/cats/gui/menubar.ts",
    "src/cats/gui/tsHelper.ts",
    

    "src/cats/util/mime.ts",
    "src/cats/util/resourceLoader.ts",
    
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
			console.log("Done creating module " + outFile);
			complete();
		});
		ex.addListener("error", function() {
			console.error("Compilation of " + outFile + " had some errors");
		});
		ex.run();	
});


desc("Builds the main frontend for CATS");
file("lib/main.js" , catsOptions, {async:true}, function() {
     jake.Task['compile'].invoke("lib/main.js", catsOptions);
});

desc("Builds the Web workers");
file("lib/tsworker.js" , workerOptions, {async:true}, function() {
   jake.Task['compile'].invoke("lib/tsworker.js", workerOptions);
});

desc("Cleans the compiler output, declare files, and tests");
task("clean", function() {
    jake.rmRf("lib/tsworker.js");
    jake.rmRf("lib/main.js");
});

desc("Forced build the full CATS application");
task("build", [], function() {
   jake.Task.clean.invoke();
   jake.Task.default.invoke();
});

desc("Builds the full CATS application");
task("default", [], function() {
   jake.Task['lib/main.js'].invoke();
   jake.Task['lib/tsworker.js'].invoke();
});


