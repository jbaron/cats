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

        private themes = {                  
            cats : cats.theme.Default,
            classic: qx.theme.Classic,
            indigo: qx.theme.Indigo,
            modern:qx.theme.Modern,
            simple:qx.theme.Simple
        };


        catsHomeDir: string;
        navigatorPane: TabView;
        problemPane: TabView;
        toolBar: ToolBar;
        infoPane: TabView;
        statusBar: StatusBar;
        sessionTabView: SessionTabView;
        console:ConsoleLog;
        processTable:ProcessTable;

        // sessions: Session[] = [];
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

        get sessions() {
            return this.sessionTabView.getSessions();
        }

        searchResult:ResultTable;
        bookmarks:ResultTable;
        problemResult:ResultTable;
  
        mainMenu:Menu.Menubar = null;
        config:IDEConfiguration;

        constructor() {
            this.catsHomeDir = process.cwd();
            this.config = this.loadConfig();
            this.configure();
        }

        /**
         * Initialize the different modules within the IDE.
         * 
         */ 
        init(rootDoc:qx.ui.container.Composite) {
            Cats.Commands.init();
            var layouter = new Layout(rootDoc);
            layouter.layout(this);
            this.mainMenu = new Cats.Menu.Menubar();
            this.initFileDropArea();
        }

        /**
         * Configure the IDE based on the settings
         */ 
        configure() {
            var config = this.config;
            if (config.theme) {
                var theme = this.themes[config.theme] || this.themes.cats;
                if (theme !== qx.theme.manager.Meta.getInstance().getTheme()) {
                    qx.theme.manager.Meta.getInstance().setTheme(theme);
                }
            }
        }

 
        /**
         * Attach the drag n' drop event listeners to the document
         *
         * @author  LordZardeck <sean@blackfireweb.com>
         */
        private initFileDropArea(): void {
            // Listen onto file drop events
            document.documentElement.addEventListener("drop", this.acceptFileDrop.bind(this), false);

            // Prevent the browser from redirecting to the file
            document.documentElement.addEventListener("dragover", (event: DragEvent) => {
                event.stopPropagation();
                event.preventDefault();
                event.dataTransfer.dropEffect = "copy"; // Explicitly show this is a copy.
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
            
                if (this.config.sessions) {
                    console.info("Found previous sessions: ", this.config.sessions.length);
                    this.config.sessions.forEach((session) => {
                        try {
                            this.openSession(session.path);
                        } catch (err) {
                            console.error("error " + err);
                        }
                    });
                }
                // this.project.refresh();
            }
        }

 
        /**
         * Are there any session that have unsaved changes 
         */
        hasUnsavedSessions(): boolean {
            if (! this.sessions) return false;
            for (var i = 0; i < this.sessions.length; i++) {
                if (this.sessions[i].getChanged()) return true;
            }
            return false;
        }

        /**
         * Get the first session based on its filename
         * @param name The name of the session
         */
        getSession(name: string) : Session {
            var sessions = this.sessions; 
            for (var i = 0; i < sessions.length; i++) {
                var session = sessions[i];
                if (session.name === name) return session;
            }
        }


        /**
         * Load the configuration for the IDE. If there is no configuration
         * found, create the default one to use.
         */ 
        private loadConfig() {
            
            var defaultConfig:IDEConfiguration = {
                version: "1.1",
                theme: "cats",
                editor : {
                    fontSize: 13,
                    rightMargin: 100
                },
                locale: "en",
                rememberOpenFiles: false,
                sessions: [],
                projects:[]
            };
            
            var configStr = localStorage[Ide.STORE_KEY];
            
            if (configStr) {
                    try {
                        var config:IDEConfiguration = JSON.parse(configStr);
                        if (config.version === "1.1") return config;
                    } catch (err) {
                        console.error("Error during parsing config " + err);
                    }
            }
            
            return defaultConfig;
        }

        updateConfig(config) {
            this.config = config;
            IDE.infoBus.emit("ide.config", config);
            this.configure();
            this.saveConfig();
        }

        /**
         * Persist the current IDE configuration to a file
         */ 
        saveConfig() {
            try {
                var config = this.config;
                config.sessions = [];
                config.projects = [];
                if (this.project) {
                    config.projects.push(this.project.projectDir);
                    this.sessions.forEach((session)=>{               
                        config.sessions.push({ 
                            path: session.name
                            // session.getPosition() //@TODO make session fully responsible
                        });
                    });
                };
                
                var configStr = JSON.stringify(config);
                localStorage[Ide.STORE_KEY] = configStr;
            } catch (err) {
                console.error(err);
            }
        }

        /**
         * Open an existing session or if it doesn't exist yet create
         * a new one.
         */ 
        openSession(name?: string, pos?:Ace.Position):Session {
            var session:Session;
            if (name) session = this.getSession(name);
            if (! session) {
                var content="";
                if (name) {
                    var mode = Session.determineMode(name);
                    if (mode === "binary") {
                        var validate = confirm("This might be a binary file, are you sure ?");
                        if (! validate) return;
                    } 
                    content = OS.File.readTextFile(name);
                }
                session = new Session(name, content);
                if (session.isTypeScript()) {
                    this.project.addScript(name,content);
                }
                var p = IDE.sessionTabView.addSession(session,pos);
            } else {
                 this.sessionTabView.navigateTo(session,pos);
            }

            var project = session.project;
            return session;
        }

 
        /**
         * Set the theme of the IDE
         * @param theme The name of the new theme
         */
        setTheme(theme: string) {
            this.config.theme = theme;
            // IDE.mainEditor.setTheme(theme);
        }

        /**
         * Add a new project to the IDE
         * @param projectDir the directory of the new project
         */
        addProject(project: Project) {
            this.project = project;
              
            if (this.project) {
                var fileTree = new FileNavigator(this.project);
                this.navigatorPane.getChildren()[0].add(fileTree, { edge: 0 });
            }
            
        }
        
        /**
         * Close an open project
         * @param project to be closed
         */
        closeProject(project:Project) {
            // TODO put code on IDE
            this.project.close();
            this.project = null;
        }
 
    }

}
