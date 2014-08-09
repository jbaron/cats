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
        iSense: TSWorkerProxy;
        
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


        private getConfigFileName() {
            return PATH.join(this.projectDir, ".settings", "config.json");
        }

        editConfig()  {
            var existing = IDE.getSession(this.getConfigFileName());
            if (existing) {
                IDE.sessionTabView.select(existing);
            } else {
                var content = JSON.stringify(this.config, null, 4);
                var session = new Session(this.getConfigFileName(),content);
                IDE.sessionTabView.addSession(session);
            }
           
        }

        hasUnsavedSessions() {
            var sessions = IDE.sessions;
             for (var i = 0; i < sessions.length; i++) {
                if (sessions[i].getChanged()) return true;
            }
            return false;
        }

        /**
         * Close the project
         */ 
        close() {
            if (this.hasUnsavedSessions()) {
                var c = confirm("You have some unsaved changes that will get lost.\n Continue anyway ?");
                if (! c) return;
            }
            IDE.sessionTabView.closeAll();
            IDE.navigatorPane.getPage("files").removeAll();
            IDE.outlineNavigator.clear();
            IDE.problemResult.clear();
            IDE.searchResult.clear();
            if (this.iSense) this.iSense.stop();
        }

        /**
         * Show the errors on a project level
         */ 
        validate(verbose=true) {
            // @TODO don't compile just get the errors
            this.iSense.getAllDiagnostics( (err,data) => {
               if (data) {
                   IDE.problemResult.setData(data);
                   if (data.length === 0) {
                       if (verbose) {
                            IDE.console.log("Project has no errors");
                            IDE.problemPane.selectPage("console"); 
                       }
                   } else {
                       IDE.problemPane.selectPage("problems");
                   }
               }
               
            });
        }

        build() {
        IDE.console.log("Start building project " + this.name + " ...");
        if (this.config.customBuild) {
            IDE.busy(true);
            // IDE.resultbar.selectOption(2);
            var cmd = this.config.customBuild.command;
            var options = this.config.customBuild.options || {};
            
            if (! options.cwd) {
                options.cwd = this.projectDir;
            }
            
            var child = OS.File.executeProcess(cmd,options,
              function (error, stdout, stderr) {
                if (stdout) IDE.console.log(stdout);
                if (stderr) IDE.console.log(stderr,2);
                if (error !== null) IDE.console.log('Execution error: ' + error,2);
                IDE.busy(false);
                IDE.console.log("Done building project " + this.name + " ...");
            });
            
        } else {
            this.iSense.compile((err, data:Cats.CompileResults) => {                        
                this.showCompilationResults(data);
                if (data.errors && (data.errors.length > 0)) return;
                var sources = data.source;
                sources.forEach((source) => {
                        OS.File.writeTextFile(source.fileName, source.content);
                });
                IDE.console.log("Done building project " + this.name + " ...");
            });
        }
    }


        /**
         *  Refreshes the project and loads required artifacts
         *  again from the filesystem to be fully in sync
         */
        refresh() {
            var projectConfig = new ProjectConfig(this.projectDir);
            this.config = projectConfig.load();
            this.name = this.config.name || PATH.basename(this.projectDir);
            document.title = "CATS | " + this.name;

            // this.initJSSense();
            if (this.iSense) this.iSense.stop();
            this.iSense = new TSWorkerProxy(this);
            
            if (this.config.compiler.outFileOption) {
                this.config.compiler.outFileOption = PATH.join(this.projectDir,this.config.compiler.outFileOption);
                console.info("Compiler output: " + this.config.compiler.outFileOption);
            }
                
            this.iSense.setCompilationSettings(this.config.compiler);

            if (this.config.compiler.useDefaultLib) {
                var fullName = PATH.join(IDE.catsHomeDir, "typings/lib.d.ts");
                var libdts = OS.File.readTextFile(fullName);
                this.iSense.addScript(fullName, libdts);
            }

            var srcs = [].concat(this.config.src);
            srcs.forEach((src: string) => {
                this.loadTypeScriptFiles(src);
            });

        }
       
       /**
        * Compile without actually saving the result
        */ 
        trialCompile() {
            this.iSense.compile((err, data:Cats.CompileResults) => {                        
                this.showCompilationResults(data);
            });
        }
       
       private showCompilationResults(data:Cats.CompileResults) {
           
            if (data.errors && (data.errors.length > 0)) {
                IDE.problemResult.setData(data.errors);
                return;
            }
            
            IDE.problemResult.setData([]);
            IDE.console.log("Successfully compiled " + Object.keys(data.source).length + " file(s).");
        }

        run() {
            var main = this.config.main;
            if (!main) {
                alert("Please specify the main html file to run in the project settings.");
                return;
            }
            var startPage = this.getStartURL();
            console.info("Opening file: " + startPage);
            var win2 = GUI.Window.open(startPage, {
                toolbar: true,
                webkit: {
                    "page-cache": false
                }
            });
        }

        /**
         * Get the URl for running the project
         */ 
        private getStartURL(): string {
            var url = PATH.join(this.projectDir, this.config.main);
            return "file://" + url;
        }
        
        /**
         * Load all the script that are part of the project into the tsworker
         * @param directory The source directory where to start the scan
         */
        private loadTypeScriptFiles(pattern:string) {
            if (! pattern) pattern = "**/*.ts";
            OS.File.find(pattern,this.projectDir,  (err,files) => {
            files.forEach((file) => {
                try {
                    var fullName = path.join(this.projectDir, file);
                    OS.File.readTextFile2(fullName,(content) => {
                                this.iSense.addScript(fullName,content);
                    });
                } catch (err) {
                    console.error("Got error while handling file " + fullName);
                    console.error(err);
                }
            });
            });
        }


    }

}
