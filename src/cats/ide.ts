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
        activeSession: Session;

        views: IDEViews = {
            navigation: null,
            outline: null,
            searchResults: null,
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

        taskBar = document.getElementById("infobar");

        editor = document.getElementById("editor");
        sessionBar = document.getElementById("sessionbar");

        mainMenu = null;

        mainEditor: TextEditor;

        constructor() {
            super("sessions","activeSession","project");
        }

        /**
         * Set the font size of the IDE
         */
        setFontSize(size: number) {
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
         * Are there any session with unsaved changes 
         */
        hasUnsavedSessions(): bool {
            for (var i = 0; i < this.sessions.length; i++) {
                if (this.sessions[i].changed) return true;
            }
            return false;
        }

        /**
         * Get the session based on its filename
         * @param name 
         */
        getSession(name: string) {
            for (var i = 0; i < this.sessions.length; i++) {
                var session = this.sessions[i];
                if (session.name === name) return session;
            }
        }

        /**
         * Open an existing session or if it doesn't exist yet create
         * a new one.
         */ 
        openSession(name: string, pos?:Ace.Position): Session {
            var session = this.getSession(name);
            if (! session) {
                var content;
                if (name) content = OS.File.readTextFile(name);
                session = new Session(name, content);
                this.addSession(session);
            }
            this.mainEditor.setSession(session,pos);
            this.activeSession = session;
            return session;
        }

        /**
         * Close a session
         */
        closeSession(session: Session) {
            var result = [];

            if (session.changed) {
                var c = confirm("Save " + session.name + " before closing ?");
                if (c) session.persist();
            }

            this.sessions.forEach((s) => {
                if (s !== session) {
                    result.push(s);
                }
            })
            // Check if was the current session displayed
            if (IDE.mainEditor.activeSession === session) {
                IDE.mainEditor.activeSession = null;
                IDE.mainEditor.hide();
            }
            this.sessions = result;
        }

        /**
         * Set the theme
         */
        setTheme(theme: string) {
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
         * Add a new project into the IDE
         */
        addProject(dir: string) {
            this.project = new Project(dir);
        }

    }

}