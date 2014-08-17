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
     *  Loads the configuration for a project. If no configuration file is found, it  
     *  returns sensible defaults that will be used instead.
     */
    export class ProjectConfig {

        constructor(private projectRoot: string) {
        }
        
        /**
         * Get the name of the configuation file
         */
        private getFileName() : string {
            return PATH.join(this.projectRoot, ".settings", "config.json");
        }

       
        /**
         * Load the configuration for this project
         */
        load() : ProjectConfiguration {
            var fileName = this.getFileName();
            try {
                var content = OS.File.readTextFile(fileName);
                var result:ProjectConfiguration = JSON.parse(content);
                
                // Do some basic sanitizing
                if (! result.codingStandards) result.codingStandards = {};
                if (! result.compiler) result.compiler = {};
                return result;
            } catch (err) {
                console.info("Couldn't find project configuration, loading defaults");
                return this.loadDefault();
            }
        }


        store(config:ProjectConfiguration) {
            var name = this.getFileName();
            var content = JSON.stringify(config, null, 4);
            OS.File.writeTextFile(name,content);
        }

        /**
         * Load the default configuration for a project
         */
        private loadDefault() : ProjectConfiguration {
            var result:ProjectConfiguration = {
                version: "1.1",
                main: "index.html",
                src: null, //If not set, the whole project directory is searched for source files
                buildOnSave: false,
                compiler: {
                    "moduleGenTarget": 1,
                    "noLib": false,
                    "removeComments": false,
                    "noImplicitAny" : false,
                    "generateDeclarationFiles": false,
                    "mapSourceFiles": false,
                    "codeGenTarget": 1,
                },
                codingStandards: {
                    newLineMode: "unix",
                    useSoftTabs: true,
                    tabSize: 4,
                    useLint: false,
                    lintFile: null
                }
                
            };
            
            return result;
        }

    }
}
