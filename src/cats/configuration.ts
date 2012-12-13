
var allOptions = {
	canCallDefinitionSignature: false,
	codeGenTarget: 0,
	controlFlow: false,
	controlFlowUseDef: false,
	emitComments: false,
	errorOnWith: true,
	errorRecovery: false,
	exec: false,
	generateDeclarationFiles: false,
	inferPropertiesFromThisAssignment: false,
	mapSourceFiles: false,
	minWhitespace: false,
	moduleGenTarget: 0,
	outputFileName: "",
	outputMany: true,
	parseOnly: false,
	preprocess: true,
	printControlFlow: false,
	propagateConstants: false,
	resolve: true,
	styleSettings: {
		assignmentInCond: false,
		bitwise: false,
		blockInCompoundStmt: false,
		emptyBlocks: true,
		eqeqeq: false,
		eqnull: false,
		evalOK: true,
		forin: false,
		funcInLoop: true,
		implicitAny: false,
		innerScopeDeclEscape: true,
		literalSubscript: true,
		newMustBeUsed: false,
		reDeclareLocal: true,
		requireSemi:false
	},
	useCaseSensitiveFileResolution: false,
	useDefaultLib: true,
	watch: false
}




function errorHandler(err,data) {
	if (err) {
		console.log(err);
		alert("Error occured, check console logging");
	}
}

module cats {
	
	var fs = require("fs");
    var path = require("path");

	export class Configuration {

		private static NAME = ".settings/config.json";
		fileName;
		private _config;

		constructor(projectRoot:string) {
			this.fileName = path.join(projectRoot,Configuration.NAME);
			var dir = path.dirname(this.fileName);
			fs.exists(dir, (exists) => {
					if (! exists) {
						fs.mkdirSync(dir); //Should be called only once.
						console.log("created .setting directory");
					}
			});	
		}

		load() {
			try {
				var content = fs.readFileSync(this.fileName,"utf8");
				this._config = JSON.parse(content);
			} catch (err) {
				console.log("Couldn't load project configuration, loading defaults");
				this.loadDefault();
			}
		}

		save() {
			fs.writeFile(this.fileName,"utf8",errorHandler);
		}

		config() {
			return this._config;
		}

		stringify() {
			var result = JSON.stringify(this._config, null, 4);
			return result;
		}



		loadDefault() {
			this._config = {	
				theme : "ace/theme/clouds",
				fontSize: 14,
				main: "index.html",
				sourcePath : null, //If not set, the whole project directory is the source directory
				outputPath: null,

				compiler : {
					useDefaultLib: true,
					outputMany: true,
					outputFileName: "",
					emitComments: false,
					generateDeclarationFiles: false,
					mapSourceFiles: false,
        			codeGenTarget: 1,
        			moduleGenTarget: 0
				},
				minify: false,
				rememberOpenFiles : false
			};
		}

	}

}