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

/**
 * This file layout the different views that make up the IDE. The views themselves
 * are not in this file.
 */ 
module Cats {
    
     function initTabBar() {

        IDE.tabbar = new UI.Tabbar();        
        IDE.tabbar.setAspect("name", (session: Session) => { return session.shortName });
        IDE.tabbar.setAspect("selected", (session: Session) => { return session === IDE.mainEditor.activeSession });
        IDE.tabbar.setAspect("longname", (session: Session) => { return session.name });
        IDE.tabbar.setAspect("changed", (session: Session) => { return session.changed });
        IDE.tabbar.onselect = (session) => IDE.mainEditor.setSession(session);
        IDE.tabbar.appendTo(IDE.sessionBar);
        IDE.on("sessions", (sessions) => {IDE.tabbar.setOptions(sessions)} );
    }

    function initNavBar() {
        var navbar = new UI.Tabbar();

        var t = new UI.ElemTabAdapter(navbar, [IDE.fileNavigation, IDE.outlineNavigation], IDE.fileNavigation);
        t.setAspect(IDE.fileNavigation, "decorator", "icon-files");
        t.setAspect(IDE.outlineNavigation, "decorator", "icon-outline");
        navbar.appendTo(IDE.navigationBar);
    }

    function initInfoBar() {
        var infobar = new UI.Tabbar();
        infobar.setOptions([
            { name: "Task List", selected: true, decorator: "icon-tasks" }
        ]);
        infobar.appendTo(IDE.taskBar);
    }

      
    function initResultBar() {
        var t  = new UI.ElemTabAdapter(IDE.resultbar, [IDE.compilationResult, IDE.searchResult], IDE.compilationResult);
        t.setAspect(IDE.compilationResult, "decorator", "icon-errors");
        t.setAspect(IDE.searchResult, "decorator", "icon-search");
        IDE.resultbar.appendTo(IDE.resultbarElem);        
    }
 
     function resizeOuter(name, state) {
        if (name === "west") {
            $("#filetree, #outlinenav").height(state.innerHeight()-25);
        }
    }

    function resizeInner(name, state) {
        if (name === "center") IDE.mainEditor.aceEditor.resize(true);
        if (name === "south") {
            $("#searchresults, #errorresults").height(state.innerHeight()-25);
        }
    }


    export function layoutIDE() {
        
        initTabBar();
        initNavBar();
        initInfoBar();
        initResultBar();

		// OUTER-LAYOUT
		$('body').layout({
            onresize: resizeOuter  
		,	center__paneSelector:	"#center"
		,	west__paneSelector:		"#navigator"
		,	north__paneSelector:	"#toolbar"
		,	south__paneSelector:	"#statusbar"
		,	west__size:				.20
		,	spacing_open:			4  // ALL panes
		,	spacing_closed:			12 // ALL panes
		,	north__maxSize:			25
		,	south__maxSize:			25

			// MIDDLE-LAYOUT (child of outer-center-pane)
		,	center__childOptions: {
                onresize: resizeInner  
			,	center__paneSelector:	"#main"
			,	east__paneSelector:		"#info"
			,	south__paneSelector:	"#result"
			,	east__size:				.20
			,	south__size:			.20
			,	spacing_open:			4  // ALL panes
			,	spacing_closed:			12 // ALL panes

			}
		});
		
	};
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
}