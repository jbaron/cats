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

    export class Ide extends ObservableImpl {


        sessions: Session[]=[];

        navigationBar= document.getElementById("navigationbar");
        fileNavigation= document.getElementById("filetree");
        outlineNavigation= document.getElementById("outlinenav");

        resultBar= document.getElementById("resultbar");
        compilationResult = document.getElementById("errorresults");
        searchResult= document.getElementById("searchresults");

        taskBar= document.getElementById("infobar");

        editor= document.getElementById("editor");
        sessionBar= document.getElementById("sessionbar");

        toolBar= document.getElementById("toolbar");
        statusBar= document.getElementById("statusbar");

        mainMenu= null;
    
    
        constructor() {
            super("sessions");
        }
    
        /**
         * Set the font size of the IDE
         */ 
        setFontSize(size:number) {
            mainEditor.aceEditor.setFontSize(size + "px");
        }
    
        /**
         * Add a new session to the IDE
         * @param session The session to be added
         */ 
        addSession(session:Session) {
            this.sessions = this.sessions.concat([session]);
        }

        /**
         * Are there any session with unsaved changes 
         */ 
        hasUnsavedSessions() :bool {
            for (var i=0;i<this.sessions.length;i++) {
                if (this.sessions[i].changed) return true;
            }
            return false;
        }

        /**
         * Get the session based on its filename
         * @param name 
         */ 
        getSession(name:string) {
            for (var i = 0; i < this.sessions.length; i++) {
                var session = this.sessions[i];
                if (session.name === name) return session;
            }
        }

        /**
         * Close a session
         */ 
        closeSession(session:Session) {
            var result = [];
            
            if (session.changed) {
                var c = confirm("Save " + session.name + " before closing ?");
                if (c) session.persist();
            }
            
            this.sessions.forEach((s)=>{
                if ( s !== session) {
                    result.push(s);
                } 
            })
             // Check if was the current session displayed
            if (mainEditor.activeSession === session) {
                mainEditor.activeSession = null;                
                mainEditor.hide();
            }            
            this.sessions = result;
        }

        /**
         * Set the theme
         */ 
        setTheme(theme:string) {            
            mainEditor.setTheme(theme);
            setTimeout(function() {
                var isDark = document.getElementsByClassName("ace_dark").length > 0;
                var fg = isDark ? "white" : "black";
                var elem = <HTMLElement>document.getElementsByClassName("ace_scroller")[0];
                var bg =  window.getComputedStyle(elem,null).backgroundColor;

                $("html, #main, #navigator, #info, #result").css("background-color", bg);
                $("html").css("color", fg);
                $(".autocomplete").css("background-color", bg);
                $(".autocomplete").css("color", fg);
                $("input").css("background-color", fg);
                $("input").css("color", bg);
            }, 500); 
        }

        /**
         * Load a new project into the IDE
         * 
         */ 
        loadProject(dir:string) {
            
        }        

    }

    export var IDE:Ide; 
    
}