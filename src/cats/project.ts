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
///<reference path='session.ts'/>
///<reference path='ui/tooltip.ts'/>
///<reference path='ui/filetree.ts'/>
///<reference path='../typings/ace.d.ts'/>
///<reference path='directoryreader.ts'/>



module Cats {



    function mkdirRecursiveSync(path: string) {
        if (!FS.existsSync(path)) {
            mkdirRecursiveSync(PATH.dirname(path));
            FS.mkdirSync(path, 0775);
        }
    }



    export class Project {

        // The home directory of the project
        projectDir: string;
        name: string;
        private tsFiles: string[] = [];

        // The singleton TSWorker handler instance
        iSense: ISenseHandler;
        JSSense: ISenseHandler;
        config: Configuration;


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
            var libdts = this.readTextFile(fullName);
            this.JSSense.perform("addScript", fullName, libdts, true, null);

        }

        /**
         *  Refreshes the project and loads required artifacts
         *  again from the filesystem to be fully in sync
         */
        refresh() {
            this.tsFiles = [];
            this.config = ConfigLoader.load(this.projectDir);
            this.name = this.config.name || PATH.basename(this.projectDir);
            var titleElem = <HTMLElement>document.getElementsByTagName("title")[0];
            titleElem.innerText = "CATS | " + this.name;

            // IDE.views.navigation.initNavigatorView();
            this.initJSSense();
            this.iSense = new ISenseHandler();
            this.iSense.perform("setCompilationSettings", this.config.compiler, null);

            if (this.config.compiler.useDefaultLib) {
                var fullName = PATH.join(process.cwd(), "typings/lib.d.ts");
                var libdts = this.readTextFile(fullName);
                this.iSense.perform("addScript", fullName, libdts, true, null);
            }

            var srcPaths = [].concat(<any>this.config.sourcePath);
            srcPaths.forEach((srcPath: string) => {
                var fullPath = PATH.join(this.projectDir, srcPath);
                this.loadTypeScriptFiles(fullPath);
                this.initTSWorker();
            });

        }

        editFile(name: string, content?: string, goto?: Ace.Position): Session {
            var session: Session = IDE.getSession(name);

            if (!session) {
                if (content == null) content = this.readTextFile(name);
                session = new Session(this, name, content);
                IDE.addSession(session);
            }

            IDE.mainEditor.setSession(session, goto);
            IDE.mainEditor.show();
            return session;
        }

        getStartURL(): string {
            var url = PATH.join(this.projectDir, this.config.main);
            return "file://" + url;
        }


        writeTextFile(name: string, value: string) {
            mkdirRecursiveSync(PATH.dirname(name));
            FS.writeFileSync(name, value, "utf8");
        }

        writeSession(session: Session) {
            if (session.name === "untitled") {
                session.name = prompt("Please enter the file name") || "untitled";
            }

            if (session.name !== "untitled") {
                session.changed = false;
                this.writeTextFile(session.name, session.getValue());
            }

        }

        readTextFile(name: string): string {
            if (name === "untitled") return "";

            var data = FS.readFileSync(name, "utf8");

            // Use single character line returns
            data = data.replace(/\r\n?/g, "\n");

            // Remove the BOM (only MS uses BOM for UTF8)
            data = data.replace(/^\uFEFF/, '');
            return data;
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
            var files = FS.readdirSync(directory);
            files.forEach((file) => {
                try {
                    var fullName = PATH.join(directory, file);
                    var stats = FS.statSync(fullName);
                    if (stats.isFile()) {
                        var ext = PATH.extname(file);
                        if (ext === ".ts") {
                            var content = this.readTextFile(fullName);
                            this.iSense.perform("addScript", fullName, content, null);
                            this.tsFiles.push(fullName);
                            console.log("Found TypeScript file: " + fullName);
                        }
                    }
                    if (stats.isDirectory()) {
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









