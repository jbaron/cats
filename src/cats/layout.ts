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
  
    /**
     * Quickfix to deal with the fact that when the browser window is resized, by default the 
     * filetree and outline divs are sized 25 pixels to heigh. This is due to the tabs
     * above them.
     */ 
    function resizeOuter(name:string, state) {
        if (name === "west") {
            $("#filetree, #outlinenav").height(state.innerHeight()-25);
        }
    }

    function resizeInner(name:string, state) {
        if (name === "center") IDE.mainEditor.aceEditor.resize(true);
        if (name === "south") {
            $("#searchresults, #errorresults, #console").height(state.innerHeight()-25);
        }
    }

    /**
     * Initialize and layout the various components of the IDE 
     */ 
    export function layoutIDE():any {
        
       

		// OUTER-LAYOUT
		var layout = $('body').layout({
            onresize: resizeOuter  
		,	center__paneSelector:	"#center"
		,	west__paneSelector:		"#navigator"
		,	north__paneSelector:	"#toolbar"
		,	south__paneSelector:	"#statusbar"
		,	spacing_open:			0
		,	spacing_closed:			0
		,	north__maxSize:			25
		,	west__size:				.20
		,	west__spacing_open:		4
		,	west__spacing_closed:	4
		,	south__maxSize:			25

			// MIDDLE-LAYOUT (child of outer-center-pane)
		,	center__childOptions: {
                onresize: resizeInner  
			,	center__paneSelector:	"#main"
			,	east__paneSelector:		"#info"
			,	south__paneSelector:	"#result"
			,	east__size:				.20
			,	south__size:			.20
			,	spacing_open:			4
			,	spacing_closed:			4

			}
		});
	return layout;	
	};
        
}