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

    export interface Ide {
        fileNavigation: HTMLElement;
        outlineNavigation: HTMLElement;

    }

    export var IDE = {

        navigationBar: document.getElementById("navigationbar"),
        fileNavigation: document.getElementById("filetree"),
        outlineNavigation: document.getElementById("outlinenav"),

        resultBar: document.getElementById("resultbar"),
        compilationResult: document.getElementById("errorresults"),
        searchResult: document.getElementById("searchresults"),

        taskBar: document.getElementById("infobar"),

        editor: document.getElementById("editor"),
        sessionBar: document.getElementById("sessionbar"),

        toolBar: document.getElementById("toolbar"),
        statusBar: document.getElementById("statusbar"),

        mainMenu: null,
    }
    
    
   
    
    

}