/*
compiler_options = {
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
*/

/*

var formatting_options = {
        public IndentSize: number;
        public TabSize: number;
        public NewLineCharacter: string;
        public ConvertTabsToSpaces: bool;
        public InsertSpaceAfterCommaDelimiter: bool;
        public InsertSpaceAfterSemicolonInForStatements: bool;
        public InsertSpaceBeforeAndAfterBinaryOperators: bool;
        public InsertSpaceAfterKeywordsInControlFlowStatements: bool;
        public InsertSpaceAfterFunctionKeywordForAnonymousFunctions: bool;
        public InsertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesis: bool;
        public PlaceOpenBraceOnNewLineForFunctions: bool;
        public PlaceOpenBraceOnNewLineForControlBlocks: bool;
}
*/


function errorHandler(err,data) {
	if (err) {
		console.log(err);
		alert("Error occured, check console logging");
	}
}

module Cats {
    
    /*
    interface Config {
        
				main: string;
				sourcePath : string;
				outputPath: string;

				compiler : {
					useDefaultLib: bool;
					outputMany: bool;
					outputFileName: string;
					emitComments: bool;
					generateDeclarationFiles: bool;
					mapSourceFiles: bool;
        			codeGenTarget: number;
        			moduleGenTarget: number;
				};
				minify: bool;
			};
    }

	*/
    
    /**
     *  Loads the configuration for a project. If not found it  
     *  returns a number of sensible defaults.
     */
	export class ConfigLoader {

		static NAME = ".settings" + path.sep + "config.json"; 
		// static NAME = ".settings" + "/" + "config.json"; // work around
		private _config;
        private fileName:string;

		constructor(projectRoot:string) {
			this.fileName = path.join(projectRoot,ConfigLoader.NAME);
			var dir:string = path.dirname(this.fileName);
			fs.exists(dir, (exists) => {
					if (! exists) {
						fs.mkdirSync(dir); //Should be called only once.
						console.log("created .setting directory");
					}
			});	
		}

		load():any {
			try {
				var content = Cats.project.readTextFile(this.fileName);
				this._config = JSON.parse(content);                
			} catch (err) {
				console.log("Couldn't load project configuration, loading defaults");
				this.loadDefault();                
			}
            return this._config;
		}

		config() {
			return this._config;
		}

	
		loadDefault() {
			this._config = {	
				main: "index.html",
				sourcePath : null, //If not set, the whole project directory is searched for source files
				outputPath: null,

				compiler : {
					useDefaultLib: true,
					outputOption: null,
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