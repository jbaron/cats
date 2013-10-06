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

/*
 * This file layout the different views that make up the IDE. The views themselves
 * are not declared in this file.
 */ 

module Cats {
    
     function initTabBar() {
        IDE.tabbar = new UI.Tabbar();
        var tb = IDE.tabbar;
        tb.setAspect("name", (session: Session) => { return session.shortName });
        tb.setAspect("selected", (session: Session) => { return session === IDE.activeSession });
        tb.setAspect("longname", (session: Session) => { return session.name });
        tb.setAspect("changed", (session: Session) => { return session.changed });
        tb.onselect = (session:Session) => IDE.openSession(session.name);
        tb.ondelete = (session:Session) => IDE.closeSession(session);
        tb.appendTo(IDE.sessionBar);
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
        var t  = new UI.ElemTabAdapter(IDE.resultbar, [IDE.compilationResult, IDE.searchResult, IDE.console], IDE.compilationResult);
        t.setAspect(IDE.compilationResult, "decorator", "icon-errors");
        t.setAspect(IDE.searchResult, "decorator", "icon-search");
        t.setAspect(IDE.console, "decorator", "icon-console");
        IDE.resultbar.appendTo(IDE.resultbarElem);        
    }
 
 
    /**
     * Quickfix to deal with the fact that when the browser window is resized, by default the 
     * filetree and outline divs are sized 25 pixels to heigh. This is due to the tabs
     * above them.
     */ 
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

    /**
     * Initialize and layout the various components of the IDE 
     */ 
    export function layoutIDE():any {
        
        initTabBar();
        initNavBar();
        initInfoBar();
        initResultBar();

		// OUTER-LAYOUT
		var layout = $('body').layout({
            onresize: resizeOuter  
		,	center__paneSelector:	"#center"
		,	west__paneSelector:		"#navigator"
		,	north__paneSelector:	"#toolbar"
		,	south__paneSelector:	"#statusbar"
		,	west__size:				.20
		,	spacing_open:			4  // ALL panes
		,	spacing_closed:			4 // ALL panes
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
			,	spacing_closed:			4 // ALL panes

			}
		});
	return layout;	
	};
        
}