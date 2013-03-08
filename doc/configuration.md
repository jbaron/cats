Configuraton
============
Cats has two level of configuration.

1) Project configuration that contains all settings for a particular project. These settings are stored within the project directoty under .settings/config.json.

2) IDE configuration that contains all the settins for the IDE (like what theme to use). These settings are stored using the localStorage API


Project Configuration
=====================

			{	
				main: "index.html",
				sourcePath : null, //If not set, the whole project directory is the source directory
				outputPath: null,

				compiler : {
					useDefaultLib: true,
					outputMany: true,
					outputFileName: "main.js",
					emitComments: false,
					generateDeclarationFiles: false,
					mapSourceFiles: false,
        			codeGenTarget: 1,
        			moduleGenTarget: 0
				},
				minify: false,
				rememberOpenFiles : false
			};


IDE Configuration
==================
Typically the IDE configuration file will be automatically updated when you exit the IDE with the latest status. For now it stores:
- Theme
- Font size
- Open project(s)
- Open file(s)

