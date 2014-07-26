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
    
    
    export class Session  {

        private static MODES = {
            ".js": "javascript",
            ".ts": "typescript",
            ".xhtml": "html",
            ".xhtm": "html",
            ".html": "html",
            ".htm": "html",
            ".css": "css",
            ".less": "less",
            ".md": "markdown",
            ".svg": "svg",
            ".yaml": "yaml",
            ".yml": "yaml",
            ".xml": "xml",
            ".json": "json",
            ".png" : "binary",
            ".gif" : "binary",
            ".jpg" : "binary",
            ".jpeg" : "binary"
        };

        private static DEFAULT_MODE = "text";
        public mode:string;
        public changed = false;
        
        /**
         * Create a new session
         * 
         * @param project The project the session belongs to
         * @param name The name of the session
         * @param content The content of the session
         */
        constructor(public name?: string, public content?: string) {
            this.mode = Session.determineMode(name);
 
        }

      
        get project():Project {
            return IDE.project;
        }

        isTypeScript(): boolean {
            return this.mode === "typescript";
        }

        get shortName():string {
            if (! this.name) return "Untitled";
            return PATH.basename(this.name);
        }

        /**
         * Persist the edit session
         */
        persist(shouldConfirm=false) {
            // Select proper folder separator according to platform used 
            
            
            var dirSlash = process.platform == "win32" ? "\\" : "/";
            
            if (this.name == null ) {
                this.name = prompt("Please enter the file name", IDE.project.projectDir + dirSlash);
                if (! this.name) return;
            }

 
            OS.File.writeTextFile(this.name, this.content);
            
            if (this.mode === "typescript") this.project.validate();
            
            if (IDE.project.config.buildOnSave && (this.mode === "typescript") ) 
                    Commands.runCommand(Commands.CMDS.project_build);
                    
        }



        /**
         * Determine the edit mode based on the file name
         * @param name File name
         */
        public static determineMode(name: string): string {
            var ext = PATH.extname(name);
            var result = Session.MODES[ext] || Session.DEFAULT_MODE;
            return result;
        }

 
}
}