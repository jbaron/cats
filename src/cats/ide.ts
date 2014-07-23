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

    export class Ide  {

        navigatorPane: TabView;
        problemPane: TabView;
        toolBar: ToolBar
        infoPane: TabView;
        statusBar: qx.ui.toolbar.ToolBar;
        sessionTabView: SessionTabView;
        console123:Console123;

        sessions: Session[] = [];
        project: Project;
        private static STORE_KEY = "cats.config";


        infoBus= <InfoBus> new Events.EventEmitter();

        outlineNavigator:OutlineNavigator; 

        getActiveEditor() {
            var page = <qx.ui.tabview.Page>this.sessionTabView.getSelection()[0];
            if (! page) return null;
            var editor:SourceEditor = <SourceEditor>page.getChildren()[0];
            return editor;
        }

         get activeSession() {
            var page = <qx.ui.tabview.Page>this.sessionTabView.getSelection()[0];
            if (! page) return null;
            var editor:SourceEditor = <SourceEditor>page.getChildren()[0];
            return editor.getSession();
        }

        searchResult:ResultTable;
        problemResult:ResultTable;

        mainMenu = null;
        private config:IDEConfiguration;

        mainEditor: TextEditor;

        constructor(private doc) {
            this.config = this.loadConfig(true);
        }

        init() {
            
            this.layoutQx();
            Cats.Commands.init();
           
            this.toolBar.init();
            Cats.Menu.createMenuBar();
        }

        layoutQx() {
            // container layout
            var layout = new qx.ui.layout.VBox();
    
            // main container
            var mainContainer = new qx.ui.container.Composite(layout);
            this.doc.add(mainContainer, { edge: 0 });
    
            this.toolBar = new ToolBar();
    
            mainContainer.add(this.toolBar, { flex: 0 });
    
            // mainsplit, contains the editor splitpane and the info splitpane
            var mainsplit = new qx.ui.splitpane.Pane("horizontal");
            mainsplit.set({ decorator: null });
            mainsplit.setBackgroundColor("#F4F4F4");
            
            this.navigatorPane = new TabView(["Files", "Outline"]);
            var fileTree = new FileNavigator(process.cwd());
            this.navigatorPane.getChildren()[0].add(fileTree, { edge: 0 });
            
            this.outlineNavigator = new OutlineNavigator()
            this.navigatorPane.getChildren()[1].add(this.outlineNavigator , { edge: 0 });
    
            mainsplit.add(this.navigatorPane, 1); // navigator
    
    
            var editorSplit = new qx.ui.splitpane.Pane("vertical").set({ decorator: null });
    
            var infoSplit = new qx.ui.splitpane.Pane("horizontal");
            this.sessionTabView = new SessionTabView();
            infoSplit.set({ decorator: null });
            infoSplit.add(this.sessionTabView, 4); // editor
           
            this.infoPane = new TabView(["Todo", "Properties"]);
            infoSplit.add(this.infoPane, 1); // todo
    
            editorSplit.add(infoSplit, 4);
    
            // Setup Problems section
            this.problemPane = new TabView(["Problems", "Search", "Console"]);
            this.console123 = new Console123();
    
            editorSplit.add(this.problemPane, 2); // Info
    
    
            this.problemResult = new ResultTable();
            this.problemPane.getChildren()[0].add(this.problemResult, { edge: 0 });
            
            this.searchResult = new ResultTable()
            this.problemPane.getChildren()[1].add(this.searchResult, { edge: 0 });
            this.problemPane.getChildren()[2].add(this.console123, { edge: 0 });
    
            this.problemPane.select("Console");
            // this.problemPane.setSelection([this.problemPane.getChildren()[2]]);
    
            mainsplit.add(editorSplit, 4); // main area
    
            mainContainer.add(mainsplit, { flex: 1 });
    
            // Setup status bar
            this.statusBar = new StatusBar();
            mainContainer.add(this.statusBar, { flex: 0 });
        }

        /**
         * Attach the drag n' drop event listeners to the document
         *
         * @author  LordZardeck <sean@blackfireweb.com>
         */
        private initFileDropArea(): void {
            // Listen onto file drop events
            document.documentElement.addEventListener('drop', this.acceptFileDrop.bind(this), false);

            // Prevent the browser from redirecting to the file
            document.documentElement.addEventListener('dragover', (event: DragEvent) => {
                event.stopPropagation();
                event.preventDefault();
                event.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
            }, false);
        }

        /**
         * Process the file and open it inside a new ACE session
         *
         * @param   event       {DragEvent}
         * @author  LordZardeck <sean@blackfireweb.com>
         */
        private acceptFileDrop(event: DragEvent): void {
            event.stopPropagation();
            event.preventDefault();

            // Loop over each file dropped. More than one file
            // can be added at a time
            var files: FileList = event.dataTransfer.files;

            for(var i = 0; i < files.length; i++) {
                this.openSession((<any>files[i]).path);
            }
        }

        /**
         * Load the projects and files that were open last time before the
         * IDE was closed.
         */ 
        restorePreviousProjects() {
            console.info("restoring previous project and sessions.");
            if (this.config.projects && this.config.projects.length) { 
                var projectDir = this.config.projects[0]; 
                this.addProject(new Project(projectDir));
            }
            
            if (this.config.sessions) {
                console.info("Found previous sessions: ", this.config.sessions.length);
                this.config.sessions.forEach((session) => {
                    try {
                        this.openSession(session.path,session.pos);
                    } catch (err) {
                        console.error("error " + err);
                        alert("Couldn't open file " + session.path);
                    }
                });
            }            
        }

        /**
         * Set the font size of the IDE
         * @param size the font size in pixels
         */
        setFontSize(size: number) {
            this.config.fontSize = size;
            // IDE.getActiveEditor().setFontSize(size + "px");
        }

        /**
        * Set the right margin of the IDE
        * @param margin number of columns
        */
        setRightMargin(margin: number) {
            this.config.rightMargin = margin;
            IDE.mainEditor.aceEditor.setPrintMarginColumn(margin);
        }

        /**
         * Add a new session to the IDE
         * @param session The session to be added
         */
        addSession(session: Session) {
            this.sessions = this.sessions.concat([session]);
            var p = IDE.sessionTabView.addSession(session);
            IDE.console123.log("Added File " + session.name);
        }

        /**
         * Are there any session that have unsaved changes 
         */
        hasUnsavedSessions(): boolean {
            for (var i = 0; i < this.sessions.length; i++) {
                if (this.sessions[i].changed) return true;
            }
            return false;
        }

        /**
         * Get the first session based on its filename
         * @param name The name of the session
         */
        getSession(name: string) : Session {
            for (var i = 0; i < this.sessions.length; i++) {
                var session = this.sessions[i];
                if (session.name === name) return session;
            }
        }

        /**
         * Indicate whether the IDE is busy with some (background) task
         * @param isBusy true if busy, false otherwise
         */ 
        public busy(isBusy:boolean) {
            //@TODO call status bar busy 
                     
            /*
            if (isBusy) {
               $("#activity").addClass("busy"); 
            } else {
                $("#activity").removeClass("busy"); 
            }
            */
        }

        /**
         * Get the directory where the icons for the IDE can be found
         */ 
        public getIconDir() {
            return this.config.iconDir || "static/img/";
        }

        /**
         * Load the configuration for the IDE
         * @param project Also load the project
         */ 
        private loadConfig(project:boolean) {
            var defaultConfig:IDEConfiguration = {
                version: "1",
                theme: "cats",
                fontSize: 13,
                iconDir: "static/img/",
                rightMargin: 80,
                sessions: [],
                projects:[PATH.join(process.cwd(), "samples", "greeter")],
            };
            
            var configStr = localStorage[Ide.STORE_KEY];
            
            if (configStr) {
                    try {
                        var config:IDEConfiguration = JSON.parse(configStr);
                        if (config.version === "1") return config;
                    } catch (err) {
                        console.log("Error during parsing config " + err);
                    }
            }
            
            return defaultConfig;
        }

        /**
         * Persist the current IDE configuration to a file
         */ 
        saveConfig() {
            var config = this.config;
            config.sessions = [];
            config.projects = [];
            
            this.sessions.forEach((session)=>{               
                config.sessions.push({
                    path: session.name,
                    pos: session.getPosition() //TODO make session fully responsible
                });
            });

            if (this.project) config.projects.push(this.project.projectDir);
            var configStr = JSON.stringify(config);
            localStorage[Ide.STORE_KEY] = configStr;
        }


        private sessionStack: {name: string; pos: Ace.Position; cb: Function}[] = [];
        
        private addToSessionStack(name: string, pos: Ace.Position, cb: Function) {
            this.removeFromSessionStack(name);
            this.sessionStack.push({
                name: name,
                pos: pos,
                cb: cb
            });
        }
        
        private removeFromSessionStack (name: string): void {
            this.sessionStack = this.sessionStack.filter(session => {
                return session.name != name;
            });
        }
        
        private hasPreviousSession(): boolean {
            return this.sessionStack.length > 0;
        }
        
        private previousSession() {
            return this.sessionStack[this.sessionStack.length - 1];
        }

       
        /**
         * Open an existing session or if it doesn't exist yet create
         * a new one.
         */ 
        openSession(name: string, pos?:Ace.Position, cb?:Function):void {
            var session = this.getSession(name);
            if (! session) {
                var content="";
                if (name) {
                    var mode = AceSession.determineMode(name);
                    if (mode === "binary") {
                        var validate = confirm("This might be a binary file, are you sure ?");
                        if (! validate) return;
                    } 
                    content = OS.File.readTextFile(name);
                }
                session = new AceSession(name, content);
                if ((session.mode === "typescript") && (! this.project.containsTSFile(name))) {
                    this.project.addTSFile(name,content);
                }
                this.addSession(session);
            }
            this.sessionTabView.navigateTo(session,pos);

            this.addToSessionStack(name, pos, cb);
            var project = session.project;
            
            // var mode = "getOutliningRegions";
            if ((<AceSession>session).isTypeScript()) {
                this.project.iSense.getScriptLexicalStructure(session.name, (err, data: NavigateToItem[]) => {
                    this.outlineNavigator.setData(data);
                });    
            } else {
                this.outlineNavigator.setData([]);
            }
            
            
            if (cb) cb(session);
        }

        persistSession(session: Session, shouldConfirm = false) {
            session.persist(shouldConfirm);
        }

        /**
         * Close a session
         * @param session The session to close
         */
        closeSession(session: Session) {
            var result = [];
            this.persistSession(session, true);
            
            this.sessions.forEach((s) => {
                if (s !== session) {
                    result.push(s);
                }
            })
            
            this.removeFromSessionStack(session.name);
            
            // Check if was the current session displayed
            if (IDE.activeSession === session) {
                IDE.activeSession = null;
                IDE.mainEditor.hide();
                if (this.hasPreviousSession()) {
                    var prevSession = this.previousSession();
                    setTimeout(() => {
                        this.openSession(prevSession.name, prevSession.pos, prevSession.cb);
                    }, 0);
                }
            }
            
            this.sessions = result;
        }

        /**
         * Set the theme of the IDE
         * @param theme The name of the new theme
         */
        setTheme(theme: string) {
            this.config.theme = theme;
            IDE.mainEditor.setTheme(theme);
        }

        /**
         * Add a new project to the IDE
         * @param projectDir the directory of the new project
         */
        addProject(project: Project) {
            this.project = project;
        }
        
         /**
         * Close an open project
         * @param project to be closed
         */
        closeProject(project) {
            // TODO put code on IDE
            var sessions = IDE.sessions;
            for (var i = 0; i < sessions.length; i++) {
                var session = sessions[i];
                if (session.changed) IDE.persistSession(session,true);
            }
            this.sessions = [];
            this.project.close();
            this.project = null;
        }

    }

}
