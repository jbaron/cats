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

module Cats {


    /**
     *  Loads the configuration for a project. If no configurationfile is found, it  
     *  returns a number of sensible defaults that will be used.
     */
    export class ConfigLoader {

        /**
         * Get the name of the configuation file
         */
        static getFileName(projectRoot: string):string {
            return PATH.join(projectRoot, ".settings", "config.json");
        }

        /**
         * Load the configuration for a certain project
         */
        static load(projectRoot: string): Configuration {
            var fileName = ConfigLoader.getFileName(projectRoot);
            try {
                var content = Cats.project.readTextFile(fileName);
                return JSON.parse(content);
            } catch (err) {
                console.log("Couldn't load project configuration, loading defaults");
                return ConfigLoader.loadDefault();
            }
        }

        /**
         * Load the default configuration for a project
         */
        private static loadDefault():Configuration {
            var result = {
                main: "index.html",
                sourcePath: null, //If not set, the whole project directory is searched for source files

                compiler: {
                    useDefaultLib: true,
                    outputOption: "",
                    emitComments: false,
                    generateDeclarationFiles: false,
                    mapSourceFiles: false,
                    codeGenTarget: 1,
                    moduleGenTarget: 0
                },
                minify: false,
                rememberOpenFiles: false
            };
            return result;
        }

    }

}