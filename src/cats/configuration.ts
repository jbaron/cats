

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

				sourcePath : null, //If not set, the whole project directory is the source directory
				
				compiler : {
					useDefaultLib: true,
					outputSingleFile: false,
					outputPath: null, // Filename or directory
        			ecmaScriptVersion: "ES5",
        			generateDeclarations: false,
        			generateSourceMaps: false,
        			minify: false
				},

				rememberOpenFiles : false
			};
		}

	}

}