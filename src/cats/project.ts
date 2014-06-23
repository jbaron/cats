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

    class ProjectWatcher extends TreeWatcher {
        
        private _treeView: Cats.UI.TreeView;
        
        constructor(public path) {
            super();
            this.setDirectory(path);
        }
        
        public setTreeView(view: Cats.UI.TreeView) {
            this._treeView = view;
        }
        
        public onFileCreate(path: string): void {
            if (this._treeView != null) {
                this._treeView.refresh();
            }
        }
        public onFileDelete(path: string): void {
            if (this._treeView != null) {
                this._treeView.refresh();
            }
        }
        public onDirectoryCreate(path: string): void {
            if (this._treeView != null) {
                this._treeView.refresh();
            }
        }
        public onDirectoryDelete(path: string): void {
            if (this._treeView != null) {
                this._treeView.refresh();
            }
        }
        public onFileChange(filepath: any): void {
            var session = IDE.getSession(filepath);
            if (session) {
                if (confirm('File ' + filepath + ' modifed out of the editor, reload it ?')) {
                    IDE.getSession(filepath).setValue(OS.File.readTextFile(filepath));
                    session.changed = false;
                } else {
                    session.changed = true;
                }
            }
        }
        public onError(error: any): void {
            console.log('Watcher error');
            console.log(error);
        }
    }

    export class Project {


        // The home directory of the project
        projectDir: string;
        name: string;
        
        // The TypeScript files that are part of the project
        private tsFiles: string[] = [];
        
        private watcher: ProjectWatcher;
        private _treeView: Cats.UI.TreeView;
        public setTreeView(view: Cats.UI.TreeView): void {
            this._treeView = view;
            this.watcher.setTreeView(view);
        }
        public getTreeView(): Cats.UI.TreeView {
            return this._treeView;
        }
        public getWatcher(): TreeWatcher {
            return this.watcher;
        }

        /**
         * Check whether a certain TS file is part of this project
         */ 
        public containsTSFile(name:string) : boolean {
            return (this.tsFiles.indexOf(name) > -1);
        }

        // The singleton TSWorker handler instance
        iSense: ISenseHandler;
        config: ProjectConfiguration;

        /**    
         * Set the project to a new directory and make sure 
         * we remove old artifacts.
         */ 
        constructor(projectDir: string) {
            IDE.project = this;
            this.projectDir = PATH.resolve(projectDir);
            this.watcher = new ProjectWatcher(this.projectDir);
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
                console.info("Compiler output: " + this.config.compiler.outputOption);
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
                // this.initTSWorker(); @TODO still needed ?
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
                this.iSense.initialize();
            }
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
                                this.iSense.addScript(fullName, content);
                                this.tsFiles.push(fullName);
                                console.info("Found TypeScript file: " + fullName);
                            });
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
            });
        }


    }

}









