
///<reference path='isensehandler.ts'/>
///<reference path='configloader.ts'/>
///<reference path='session.ts'/>
///<reference path='ui/tooltip.ts'/>
///<reference path='ui/filetree.ts'/>
///<reference path='../typings/ace.d.ts'/>
///<reference path='directoryreader.ts'/>


module Cats {



    export class Project {

        // The home directory of the project
        projectDir: string;
        name: string;

        // The singleton TSWorker handler instance
        iSense: ISenseHandler;
        config:any;
        private loadDefaultLib = true;

        // Set the project to a new directory and make sure 
        // we remove old artifacts.
        constructor(projectDir: string) {
            project = this;            
            this.projectDir = path.resolve(projectDir);
            this.name = path.basename(this.projectDir);
            this.refresh();           
        }


        getConfigFileName():string {
            return path.join(this.projectDir, ConfigLoader.NAME);
        }    

         private initFileTree() {
            IDE.fileNavigation.innerHTML = "";
            var fileTree = new Cats.UI.TreeView();
            var dirReader = new DirectoryReader();

            fileTree.setAspect("children", (parent:ListEntry):ListEntry[] => {
                if (parent == null) {
                    return [{
                        name:this.name, 
                        isFolder:true, 
                        path:this.projectDir,
                        decorator:"icon-folder"
                    }];
                }

                return dirReader.read(parent);
            
            });
                        
            fileTree.appendTo(IDE.fileNavigation);
            fileTree.refresh();
            
            fileTree.onselect = (filePath) => {
                this.editFile(filePath);
            };
        }

        /**
         *  Refreshes the project and loads required artifacts
         *  again from the filesystem to be fully in sync
         */
        refresh() {
            this.initFileTree();
            this.config = new ConfigLoader(this.projectDir).load();
            
            this.iSense = new ISenseHandler();
            this.iSense.perform("setCompilationSettings",this.config.compiler,null);

            if (this.config.compiler.useDefaultLib) {
                var libdts = fs.readFileSync("typings/lib.d.ts", "utf8");
                var fullName = path.join(process.cwd(),"typings/lib.d.ts" );
                this.iSense.perform("addScript", fullName, libdts, true, null);
            }

            var srcPaths = [].concat(this.config.sourcePath); 
            srcPaths.forEach( (srcPath:string) => {
                var fullPath = path.join(this.projectDir,srcPath);
                this.loadTypeScriptFiles(fullPath);
            });

        }

        editFile(name: string, content?: string, goto?: Ace.Position) :Session {
            var session: Session = mainEditor.getSession(name, this);

            if (!session) {
                if (content == null) content = this.readTextFile(name);
                session = new Session(this, name, content);
                mainEditor.sessions.push(session);
                mainEditor.setSession(session);
                mainEditor.moveCursorTo(goto);

                if (session.typeScriptMode) {
                    this.iSense.perform("updateScript", name, content, (err, result) => {
                        session.editSession.setAnnotations(result);
                    });
                }

            } else {
                mainEditor.setSession(session);
                this.iSense.perform("getErrors", name, (err, result) => {
                    session.editSession.setAnnotations(result);
                });
                if (goto) {
                    mainEditor.moveCursorTo(goto);
                    mainEditor.aceEditor.clearSelection();
                }
            }
            // this.session = session;

            mainEditor.show();
            tabbar.refresh();
            return session;
        }

        getStartURL():string {
            var url = path.join(this.projectDir, this.config.main);
            return "file://" + url;
        }
        

        writeTextFile(name: string, value: string) {
            fs.writeFileSync(name, value, "utf8");
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
            var data = fs.readFileSync(name, "utf8");
            var content = data.replace(/\r\n?/g, "\n");
            return content;
        }

        // Load all the script that are part of the project into the tsworker
        // For now use a synchronous call to load.
        private loadTypeScriptFiles(directory: string) {
            var files = fs.readdirSync(directory);
            files.forEach((file) =>{
                try {
                    var fullName = path.join(directory, file);
                    var stats = fs.statSync(fullName);
                    if (stats.isFile()) {
                        var ext = path.extname(file);
                        if (ext === ".ts") {
                            var content = this.readTextFile(fullName);
                            this.iSense.perform("updateScript", fullName, content, () => { });
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









