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
// 
module Cats {
    
    export class Project {


        // The home directory of the project
        projectDir: string;
        name: string;
        
 
        // The singleton TSWorker handler instance
        iSense: ISenseHandler;
        
        // Stores the project configuration paramters
        config: ProjectConfiguration;

        /**    
         * Set the project to a new directory and make sure 
         * we remove old artifacts.
         */ 
        constructor(projectDir: string) {
            IDE.project = this;
            this.projectDir = PATH.resolve(projectDir);
            this.refresh();
        }

        /**
         * Close the project
         */ 
        close() {
            var gui = require('nw.gui');
            var win = gui.Window.get();
            win.close();
        }

        /**
         * Show the errors on a project level
         */ 
        validate() {
            // @TODO don't compile just get the errors
            this.iSense.getAllDiagnostics( (err,data) => {
               if (data) IDE.problemResult.setData(data);
            });
        }

        /**
         *  Refreshes the project and loads required artifacts
         *  again from the filesystem to be fully in sync
         */
        refresh() {
            this.config = ConfigLoader.load(this.projectDir);
            this.name = this.config.name || PATH.basename(this.projectDir);
            document.title = "CATS | " + this.name;

            // this.initJSSense();
            this.iSense = new ISenseHandler(this);
            
            if (this.config.compiler.outFileOption) {
                this.config.compiler.outFileOption = PATH.join(this.projectDir,this.config.compiler.outFileOption);
                console.info("Compiler output: " + this.config.compiler.outFileOption);
            }
                
            this.iSense.setCompilationSettings(this.config.compiler);

            if (this.config.compiler.useDefaultLib) {
                var fullName = PATH.join(process.cwd(), "typings/lib.d.ts");
                var libdts = OS.File.readTextFile(fullName);
                this.iSense.addScript(fullName, libdts);
            }

            var srcPaths = [].concat(<any>this.config.sourcePath);
            srcPaths.forEach((srcPath: string) => {
                var fullPath = PATH.join(this.projectDir, srcPath || '');
                this.loadTypeScriptFiles(fullPath);
            });

        }
       
        /**
         * Get the URl for running the project
         */ 
        getStartURL(): string {
            var url = PATH.join(this.projectDir, this.config.main);
            return "file://" + url;
        }
        
        /**
         * Load all the script that are part of the project into the tsworker
         * @param directory The source directory where to start the scan
         */
        private loadTypeScriptFiles(directory: string) {
            OS.File.readDir2(directory, (files) => {
            files.forEach((file) => {
                try {
                    var fullName = file.fullName;
                    if (file.isFile) {                       
                        console.info("FullName: " + fullName);
                        var ext = PATH.extname(fullName);
                        if (ext === ".ts") {                            
                            OS.File.readTextFile2(fullName,(content) => {
                                this.iSense.addScript(fullName,content);
                            });
                        }
                    }
                    if (file.isDirectory) {
                        this.loadTypeScriptFiles(fullName);
                    }
                } catch (err) {
                    console.error("Got error while handling file " + fullName);
                    console.error(err);
                }
            });
            });
        }


    }

}
