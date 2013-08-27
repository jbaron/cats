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


///<reference path='views/toolbar.ts'/>
///<reference path='views/statusbar.ts'/>
///<reference path='views/searchresults.ts'/>
///<reference path='views/outline.ts'/>
///<reference path='acesession.ts'/>
///<reference path='views/navigator.ts'/>
///<reference path='views/compilationresults.ts'/>


module Cats {

    export interface IDEViews {
        navigation: View.Navigator;
        outline: IView;
        searchResults: View.SearchResults;
        compilationResults: IView;
        toolBar: IView;
        statusBar: IView;
        taskList: IView;
        editor: IView;
    }

    export class Ide extends ObservableImpl {

        sessions: Session[] = [];
        project: Project;
        layoutConfig;

        activeSession: Session;
    
        views: IDEViews = {
            navigation: null,
            outline: null,
            searchResults: null,
            console:null,
            compilationResults: null,
            toolBar: null,
            statusBar: null,
            taskList: null,
            editor: null
        };

        /**
         * Initialize the views associated with the IDE
         */
        initViews() {
            this.views.outline = new Cats.View.Outline();
            this.views.toolBar = new Cats.View.ToolBar();
            this.views.statusBar = new Cats.View.StatusBar();
            this.views.searchResults = new Cats.View.SearchResults();
            this.views.navigation = new Cats.View.Navigator();
        }

        tabbar: UI.Tabbar;
        resultbar = new UI.Tabbar();
        
        navigationBar = document.getElementById("navigationbar");
        fileNavigation = document.getElementById("filetree");
        outlineNavigation = document.getElementById("outlinenav");

        resultbarElem = document.getElementById("resultbar");
        compilationResult = document.getElementById("errorresults");
        searchResult = document.getElementById("searchresults");
        console = document.getElementById("console");

        taskBar = document.getElementById("infobar");

        editor = document.getElementById("editor");
        sessionBar = document.getElementById("sessionbar");

        mainMenu = null;
        private config:IDEConfiguration;

        mainEditor: TextEditor;

        constructor() {
            super(["sessions","activeSession","project"]);
            this.mainEditor = new TextEditor(this.editor);
            this.mainEditor.init();
            this.init();
        }

        private init() {
            this.config = this.loadConfig(true);
                        
            setTimeout(() => {
                this.setTheme(this.config.theme);
                this.setFontSize(this.config.fontSize);
            }, 2000);
        }


        /**
         * Load the projects and files that were open last time the user
         * quit.
         */ 
        loadDefaultProjects() {
            if (this.config.projects && this.config.projects.length) { 
                this.addProject(this.config.projects[0]);
            }
            
            if (this.config.sessions) {
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
            IDE.mainEditor.aceEditor.setFontSize(size + "px");
        }

        /**
         * Add a new session to the IDE
         * @param session The session to be added
         */
        addSession(session: Session) {
            this.sessions = this.sessions.concat([session]);
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


        public busy(isBusy:boolean) {
            if (isBusy) {
               $("#activity").addClass("busy"); 
            } else {
                $("#activity").removeClass("busy"); 
            }
        }


        public layout() {
             this.layoutConfig = layoutIDE();
        }

        /**
         * Load the configuration for the IDE
         * @param project Also load the project
         */ 
        private loadConfig(project:boolean) {
            var defaultConfig:IDEConfiguration = {
                version: "1",
                theme: "cats",
                fontSize: 16,
                sessions: [],
                projects:[PATH.join(process.cwd(), "samples", "greeter")],
            };
            
            var configStr = localStorage["cats.config"];
            
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
            localStorage["cats.config"] = configStr;
        }


        /**
         * Open an existing session or if it doesn't exist yet create
         * a new one.
         */ 
        openSession(name: string, pos?:Ace.Position, cb?:Function):void {
            var session = this.getSession(name);
            if (! session) {
                var content;
                if (name) content = OS.File.readTextFile(name);
                session = new AceSession(name, content);
                this.addSession(session);
            }
            this.mainEditor.edit(session,pos);
            this.activeSession = session;
            if (cb) cb(session);
        }

        persistSession(session: Session) {
            this.project.getWatcher().preventFileChange(session.name);
            session.persist();
        }

        /**
         * Close a session
         * @param session The session to close
         */
        closeSession(session: Session) {
            var result = [];

            if (session.changed) {
                var c = confirm("Save " + session.name + " before closing ?");
                if (c) this.persistSession(session);
            }

            this.sessions.forEach((s) => {
                if (s !== session) {
                    result.push(s);
                }
            })
            
            // Check if was the current session displayed
            if (IDE.activeSession === session) {
                IDE.activeSession = null;
                IDE.mainEditor.hide();
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
            setTimeout(function() {
                var isDark = document.getElementsByClassName("ace_dark").length > 0;
                var fg = isDark ? "white" : "black";
                var elem = <HTMLElement>document.getElementsByClassName("ace_scroller")[0];
                var bg = window.getComputedStyle(elem, null).backgroundColor;

                $("html, #main, #navigator, #info, #result").css("background-color", bg);
                $("html").css("color", fg);
                $(".autocomplete").css("background-color", bg);
                $(".autocomplete").css("color", fg);
                $("input").css("background-color", fg);
                $("input").css("color", bg);
            }, 500);
        }

        /**
         * Add a new project to the IDE
         * @param projectDir the directory of the new project
         */
        addProject(projectDir: string) {
            this.project = new Project(projectDir);
        }
        
        
         /**
         * Add a new project to the IDE
         * @param projectDir the directory of the new project
         */
        closeProject(project) {
            this.project.close();
            this.project = null;
        }

    }

}