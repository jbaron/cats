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

   var tsconfig = require("tsconfig");

    export interface CompilerOptions {
    [key: string]: any;
        noLib?: boolean;
        target?: string;
    }
    
    export interface TSConfig {
        compilerOptions?: CompilerOptions;
        compileOnSave?: boolean;
        buildOnSave?: boolean;
        files?: string[];
        exclude?: string[];
        filesGlob?: string[];
        customBuild?: any;
        customRun?: any;
        main?: any;
        name?: string;
        tslint?: any;
        codeFormat?:any;
        documentation?:any;
        
        [key: string]: any;
    }
    
    /**
     * The project hold the information related to a single project. This include 
     * a reference to a workerthread that does much of the TypeScript intellisense.
     */
    export class Project extends qx.event.Emitter {

        // The home directory of the project
        name: string;

        private tsfiles: Array<string> = [];
        public projectDir;
        
        // The singleton TSWorker handler instance
        iSense: TSWorkerProxy;
        private refreshInterval: number;
        config:TSConfig;

        /**    
         * Create a new project.
         */
        constructor(public tsConfigFile:string) {
            super();
            this.projectDir = OS.File.PATH.dirname(tsConfigFile);
            this.refresh();
            // @TODO optimize only refresh in case of changes
            this.refreshInterval = setInterval(() => { this.refreshTodoList() }, 60000);
        }


        private readConfigFile(fileName) {
            try {
                return tsconfig.readFileSync(fileName);
            } catch (err) {
                IDE.console.error(`Error reading config file ${fileName}`);
            }
        }

        /**
         * Save the project configuration
         */
        updateConfig(config: ProjectConfiguration) {
            return ; /*
            this.settings.value = config;
            this.emit("config", config);
            if (this.config.tslint.useLint) this.linter = new Linter(this);
            this.settings.store();
            this.iSense.setSettings(this.config.compiler, this.config.codeFormat);
            */
        }

        refreshTodoList() {
            this.iSense.getTodoItems((err, data) => {
                IDE.todoList.setData(data, this);
            });
        }
    
    
        /**
         * Close the project
         */
        close() {
            if (IDE.editorTabView.hasUnsavedChanges()) {
                var dialog = new Gui.ConfirmDialog("You have some unsaved changes that will get lost.\n Continue anyway ?");
                dialog.onConfirm = () => {
                    this._close();
                };
            } else {
                this._close();
            }
        }

        /**
         * Close the project without confirmation.
         * (Internal, do not use directly)
         */
        _close() {
            // Lets clear the various output panes.
            IDE.editorTabView.closeAll();
            IDE.fileNavigator.clear();
            IDE.outlineNavigator.clear();
            IDE.problemResult.clear();
            IDE.todoList.clear();
            if (this.iSense) this.iSense.stop();
            clearInterval(this.refreshInterval);
            IDE.projects = [];
        }

        /**
         * Show the errors on a project level
         */
        validate(verbose = true) {
            this.iSense.getAllDiagnostics((err, data) => {
                if (data) {
                    IDE.problemResult.setData(data,this);
                    if ((data.length === 0) && verbose) {
                            IDE.console.log(`Project ${this.name} has no errors`);
                    }
                }
            });
        }


        /**
         * Build this project either with the built-in capabilities or by calling 
         * an external build tool.
         */
        build() {
            IDE.console.log("Start building project " + this.name + " ...");
            if (this.config.customBuild && this.config.customBuild.command) {
                // IDE.resultbar.selectOption(2);
                var cmd = this.config.customBuild.command;
                var options = this.config.customBuild.options || { cwd: null };

                if (!options.cwd) {
                    options.cwd = this.projectDir;
                }

                var child = OS.File.runCommand(cmd, options);

            } else {
                this.iSense.compile((err: Error, data: CompileResults) => {
                    this.showCompilationResults(data);
                    if (data.errors && (data.errors.length > 0)) return;
                    var files = data.outputFiles;
                    files.forEach((file) => {
                        if (!OS.File.PATH.isAbsolute(file.name)) {
                            file.name = OS.File.PATH.join(this.projectDir,file.name);
                            file.name = OS.File.PATH.normalize(file.name);
                        }
                        OS.File.writeTextFile(file.name, file.text);
                    });
                    IDE.console.log("Done building project " + this.name + ".");
                });
            }
        }

 

        /**
         *  Refresh the project and loads required artifacts
         *  again from the filesystem to be fully in sync
         */
        refresh() {
            this.config = this.readConfigFile(this.tsConfigFile);
            IDE.console.log(`Found TypeScript project configuration at ${this.tsConfigFile} containing ${this.config.files.length} files`);
            this.tsfiles = this.config.files; 
            this.name = this.config.name || OS.File.PATH.basename(this.projectDir);

            if (!this.config.compilerOptions) this.config.compilerOptions = {};
 
            if (this.iSense) this.iSense.stop();
            this.iSense = new TSWorkerProxy();
            
            var content = JSON.stringify(this.config);
            this.iSense.setConfigFile(this.tsConfigFile,content);
            
             if (!this.config.compilerOptions.noLib) {
                let libFile:string;
                switch (this.config.compilerOptions.target) {
                    case "es6":
                    case "ES6":
                        libFile = "resource/typings/lib.es6.d.ts";
                        break;
                    case "es7":
                    case "ES7":
                        libFile = "resource/typings/lib.es7.d.ts";
                        break;
                    default:
                        libFile = "resource/typings/lib.d.ts";
                        break;
                }
                var fullName = OS.File.join(IDE.catsHomeDir, libFile);
                var libdts = OS.File.readTextFile(fullName);
                this.addScript(fullName, libdts);
            }


            this.loadProjectSourceFiles();
            this.refreshTodoList();

        }

        /**
         * Compile without actually saving the resulting files
         */
        trialCompile() {
            this.iSense.compile((err: Error, data: CompileResults) => {
                this.showCompilationResults(data);
            });
        }

        private showCompilationResults(data: CompileResults) {
            if (data.errors && (data.errors.length > 0)) {
                IDE.problemResult.setData(data.errors, this);
                return;
            }

            IDE.problemResult.clear();
            IDE.console.log("Successfully generated " + data.outputFiles.length + " file(s).");
        }

        /**
         * Run this project either with the built-in capabilities (only for web apps) or by calling 
         * and external command (for example node).
         */
        run() {
            if (this.config.customRun && this.config.customRun.command) {

                const cmd = this.config.customRun.command;
                var options = this.config.customRun.options || { cwd: null };
                if (!options.cwd) {
                    options.cwd = this.projectDir;
                }
                OS.File.runCommand(cmd, options);
            } else {
                const GUI = require('nw.gui');
                const main = this.config.main;
                if (!main) {
                    alert("Please specify the main html file or customRun in the project settings.");
                    return;
                }
                const startPage = this.getStartURL();
                console.info("Opening file: " + startPage);
                const win2 = GUI.Window.open(startPage, {
                    toolbar: true,
                    // nodejs: true,
                    // "new-instance": true,
                    webkit: {
                        "page-cache": false
                    }
                });
            }
        }

        /**
         * Get the URL for running the project
         */
        private getStartURL(): string {
            const url = OS.File.join(this.projectDir, this.config.main);
            return "file://" + url;
        }

        hasScriptFile(fileName: string) {
            return this.tsfiles.indexOf(fileName) > -1;
        }

        updateScript(fullName: string, content: string) {
            this.iSense.updateScript(fullName, content);
        }

        addScript(fullName: string, content: string) {
            this.iSense.addScript(fullName, content);
            if (!this.hasScriptFile(fullName)) this.tsfiles.push(fullName);
        }

        getScripts(): Array<string> {
            return this.tsfiles;
        }


        /**
         * Load the source files that are part of this project. Typically
         * files ending with ts, tsx or js.
         */
        private loadProjectSourceFiles() {
            this.config.files.forEach((file) => {
                try {
                    var fullName = OS.File.switchToForwardSlashes(file); // OS.File.join(this.projectDir, file);
                    var content = OS.File.readTextFile(fullName);
                    this.addScript(fullName, content);
                } catch (err) {
                    console.error("Got error while handling file " + fullName);
                    console.error(err);
                }
            });
        }

   

    }

}
