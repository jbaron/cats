Configuraton
============
Cats has two level of configuration.

1) Project configuration that contains all settings for a particular project. These settings are stored within the project directoty under .settings/config.json.

2) CATS configuration that contains all the settins for the IDE (like what theme to use). These settings are stored in the user home directory under .cats.json


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




CATS Configuration
==================
Typically the CATS configuration file will be automatically updated when you change a setting within CATS. You can always delete this file and CATS will use some sensible defaults. 
