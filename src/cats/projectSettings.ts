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

module Cats {

    /**
     *  Loads the configuration for a project. If no configuration file is found, it  
     *  returns sensible defaults that will be used instead.
     */
    export class ProjectSettings {

        value:ProjectConfiguration;

        constructor( private projectRoot: string ) {
        }

        /**
         * Get the name of the configuation file
         */
        private getFileName(): string {
            return OS.File.join( this.projectRoot, ".settings/config.json" );
        }


        /**
         * Load the configuration for this project
         */
        load(){
            var fileName = this.getFileName();
            try {
                var content = OS.File.readTextFile( fileName );
                var result: ProjectConfiguration = JSON.parse( content );

                // Do some basic sanitizing to avoid checks in the code
                if ( !result.codeFormat ) result.codeFormat = <any>{};
                if ( !result.compiler ) result.compiler = {};
                if ( !result.tslint ) result.tslint = {};
                
                this.value = result;
            } catch ( err ) {
                console.info( "Couldn't find project configuration, loading defaults" );
                this.loadDefault();
            }
        }

        /**
         * Store the configuration
         */
        store() {
            var name = this.getFileName();
            var content = JSON.stringify( this.value, null, 4 );
            OS.File.writeTextFile( name, content );
        }

        /**
         * Load the default configuration for a project
         */
        private loadDefault() {
            var result: ProjectConfiguration = {
                version: "1.3",
                main: "index.html",
                src: null, //If not set, the whole project directory is searched for source files
                buildOnSave: false,
                compiler: {
                    "module": ts.ModuleKind.None,
                    "noLib": false,
                    "removeComments": false,
                    "noImplicitAny": false,
                    "declaration": false,
                    "sourceMap": false,
                    "target": ts.ScriptTarget.ES5,
                },
                tslint : {
                    useLint : false  
                },
                codeFormat: <any>{
                },
                documentation: {

                }

            };

            this.value = result;
        }

    }
}
