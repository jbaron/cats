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
        private static STORE_KEY = "cats.config";

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
        private initViews() {
            this.views.outline = new Cats.View.Outline();
            this.views.toolBar = new Cats.View.ToolBar();
            this.views.statusBar = new Cats.View.StatusBar();
            this.views.searchResults = new Cats.View.SearchResults();
            this.views.navigation = new Cats.View.Navigator();
            
            this.initTabBar();
            this.initNavBar();
            this.initInfoBar();
            this.initResultBar();
        }

        private initTabBar() {
            this.tabbar = new UI.Tabbar();
            var tb = this.tabbar;
            tb.setAspect("name", (session: Session) => { return session.shortName });
            tb.setAspect("selected", (session: Session) => { return session === IDE.activeSession });
            tb.setAspect("longname", (session: Session) => { return session.name });
            tb.setAspect("changed", (session: Session) => { return session.changed });
            tb.onselect = (session:Session) => {
                if (session) this.openSession(session.name);
            };
            tb.ondelete = (session:Session) => this.closeSession(session);
            tb.appendTo(this.sessionBar);
            IDE.on("sessions", (sessions) => {this.tabbar.setOptions(sessions)} );
        }

        private initNavBar() {
            var navbar = new UI.Tabbar();
    
            var t = new UI.ElemTabAdapter(navbar, [this.fileNavigation, this.outlineNavigation], this.fileNavigation);
            t.setAspect(this.fileNavigation, "decorator", "icon-files");
            t.setAspect(this.outlineNavigation, "decorator", "icon-outline");
            navbar.appendTo(this.navigationBar);
        }

        private initInfoBar() {
            var infobar = new UI.Tabbar();
            infobar.setOptions([
                { name: "Task List", selected: true, decorator: "icon-tasks" }
            ]);
            infobar.appendTo(this.taskBar);
        }
      
        private initResultBar() {
            var t  = new UI.ElemTabAdapter(IDE.resultbar, [IDE.compilationResult, IDE.searchResult, IDE.console], IDE.compilationResult);
            t.setAspect(this.compilationResult, "decorator", "icon-errors");
            t.setAspect(this.searchResult, "decorator", "icon-search");
            t.setAspect(this.console, "decorator", "icon-console");
            this.resultbar.appendTo(this.resultbarElem);        
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
            this.config = this.loadConfig(true);
            infoBus.IDE.on("toggleView", (name) => this.layoutConfig.toggle(name));
        }

        init() {
            Cats.Commands.init();
            Cats.Menu.createMenuBar();
            this.initViews();
            this.initFileDropArea();
            this.layout();
            Cats.Menu.initFileContextMenu();
            Cats.Menu.initTabContextMenu();
            
            setTimeout(() => {
                this.setTheme(this.config.theme);
                this.setFontSize(this.config.fontSize);
                this.setRightMargin(this.config.rightMargin);
            }, 2000);
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
            IDE.mainEditor.aceEditor.setFontSize(size + "px");
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
            if (isBusy) {
               $("#activity").addClass("busy"); 
            } else {
                $("#activity").removeClass("busy"); 
            }
        }

        /**
         * Layout the IDE
         */ 
        private layout() {
             this.layoutConfig = layoutIDE();
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
                this.addSession(session);
            }
            this.mainEditor.edit(session,pos);
            this.activeSession = session;
            this.addToSessionStack(name, pos, cb);
            if (cb) cb(session);
        }

        persistSession(session: Session, shouldConfirm = false) {
            if (this.project)
                this.project.getWatcher().preventFileChange(session.name);

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
            setTimeout(function() {
                var isDark = document.getElementsByClassName("ace_dark").length > 0;
                var fg = isDark ? "white" : "black";
                var elem = <HTMLElement>document.getElementsByClassName("ace_scroller")[0];
                var bg = window.getComputedStyle(elem, null).backgroundColor;
                elem = document.getElementById("editor");
                var fg = window.getComputedStyle(elem, null).color;
                var markerLayer = document.createElement("div");
                markerLayer.className = "ace_marker-layer";
                var selectionEl = document.createElement("span");
                selectionEl.className = "ace_selection";
                markerLayer.appendChild(selectionEl);
                elem.appendChild(markerLayer);
                var selectionBg = window.getComputedStyle(selectionEl, null).backgroundColor;
                var selectionFg = window.getComputedStyle(selectionEl, null).color;
                elem.removeChild(markerLayer);

                $("html, #main, #navigator, #info, #result").css("background-color", bg);
                $("html").css("color", fg);
                $("body").removeClass("theme-light theme-dark").addClass(isDark ? "theme-dark" : "theme-light");
                $(".autocomplete").css("background-color", bg);
                $(".autocomplete").css("color", fg);
                $("input").css("background-color", fg);
                $("input").css("color", bg);
                
                elem = <HTMLElement>document.getElementById("editor");
                bg = window.getComputedStyle(elem, null).backgroundColor;
                fg = window.getComputedStyle(elem, null).color;
                
                var style = document.createElement("style");
                style.appendChild(document.createTextNode(""));
                document.head.appendChild(style);

                var sheet = <CSSStyleSheet>style["sheet"];
                sheet.insertRule(".tabbar li.active, .tabbar li:hover { background-color: " + bg + " !important; color: " + fg + " !important; }", 0);
                sheet.insertRule(".autocomplete_selected { background-color: " + selectionBg + " !important; color: " + selectionFg + "}", 0);
                sheet.insertRule(".ace_search, input { background-color: " + bg + " !important; color: " + fg + "}", 0);
                sheet.insertRule(".ace_search_options .ace_button:before { background-color: " + bg + " !important;", 0);
            }, 500);
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
