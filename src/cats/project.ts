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


///<reference path='isensehandler.ts'/>
///<reference path='configloader.ts'/>
///<reference path='ui/tooltip.ts'/>
///<reference path='ui/tree.ts'/>
///<reference path='../typings/ace.d.ts'/>


module Cats {

    export class Project {


        // The home directory of the project
        projectDir: string;
        name: string;
        private tsFiles: string[] = [];

        // The singleton TSWorker handler instance
        iSense: ISenseHandler;
        JSSense: ISenseHandler;
        config: ProjectConfiguration;


        // Set the project to a new directory and make sure 
        // we remove old artifacts.
        constructor(projectDir: string) {
            IDE.project = this;
            this.projectDir = PATH.resolve(projectDir);
            this.refresh();
        }

        private initJSSense() {
            this.JSSense = new ISenseHandler();

            var fullName = PATH.join(process.cwd(), "typings/lib.d.ts");
            var libdts = OS.File.readTextFile(fullName);
            this.JSSense.addScript(fullName, libdts, true);

        }

        /**
         *  Refreshes the project and loads required artifacts
         *  again from the filesystem to be fully in sync
         */
        refresh() {
            this.tsFiles = [];
            this.config = ConfigLoader.load(this.projectDir);
            this.name = this.config.name || PATH.basename(this.projectDir);
            document.title = "CATS | " + this.name;

            // this.initJSSense();
            this.iSense = new ISenseHandler();
            
            if (this.config.compiler.outputOption) {
                this.config.compiler.outputOption = PATH.join(this.projectDir,this.config.compiler.outputOption);
                console.log("Compiler output: " + this.config.compiler.outputOption);
            }
                
            this.iSense.setCompilationSettings(this.config.compiler);

            if (this.config.compiler.useDefaultLib) {
                var fullName = PATH.join(process.cwd(), "typings/lib.d.ts");
                var libdts = OS.File.readTextFile(fullName);
                this.iSense.addScript(fullName, libdts, true);
            }

            var srcPaths = [].concat(<any>this.config.srcPath);
            srcPaths.forEach((srcPath: string) => {
                var fullPath = PATH.join(this.projectDir, srcPath);
                this.loadTypeScriptFiles(fullPath);
                this.initTSWorker();
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
         * @BUG Somehow TS LanguageServices are not ready by default.
         * This triggers it to be ready 
         */
        private initTSWorker() {
            if (this.tsFiles.length > 0) {
                this.iSense.perform("initialize", null);
            }
        }

        /**
         * Load all the script that are part of the project into the tsworker
         * For now use a synchronous call to load.
         * @param directory The source directory where to start the scan
         */
        private loadTypeScriptFiles(directory: string) {
            var files = OS.File.readDir(directory);
            files.forEach((file) => {
                try {
                    var fullName = file.fullName;
                    if (file.isFile) {                       
                        console.log("FullName: " + fullName);
                        var ext = PATH.extname(fullName);
                        if (ext === ".ts") {                            
                            var content = OS.File.readTextFile(fullName);
                            this.iSense.addScript(fullName, content);
                            this.tsFiles.push(fullName);
                            console.log("Found TypeScript file: " + fullName);
                        }
                    }
                    if (file.isDirectory) {
                        this.loadTypeScriptFiles(fullName);
                    }
                } catch (err) {
                    console.log("Got error while handling file " + fullName);
                    console.error(err);
                }
            });
        }


    }

}









