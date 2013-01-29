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

    export class Ide extends EventEmitter {

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
    
        /**
         * Set the font size of the IDE
         */ 
        setFontSize(size:number) {
            mainEditor.aceEditor.setFontSize(size + "px");
        }
    
        /**
         * Set the theme
         * 
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