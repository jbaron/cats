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

module Cats.Menu {


    function getContextSession() {
        return contextElement._value || IDE.activeSession;
    }

    function closeContextTab() {
        var session = getContextSession();
        
        if (session)
            IDE.closeSession(session);
    }

    function closeOtherTabs() {
        var contextSession = getContextSession();
        
        IDE.sessions.forEach((session) => {
            if (session !== contextSession)
                IDE.closeSession(session);
        });
    }

    function closeAllTabs() {
        IDE.sessions.forEach((session) => {
            IDE.closeSession(session);
        });
    }

    function closeRightTabs() {
        var contextSession = getContextSession();
        var found = false;
        
        IDE.sessions.forEach((session) => {
            if (found)
                IDE.closeSession(session);
            
            found = found || session === contextSession;
        });
    }

    function closeLeftTabs() {
        var contextSession = getContextSession();
        var found = false;
        
        IDE.sessions.forEach((session) => {
            found = found || session === contextSession;
            
            if (!found)
                IDE.closeSession(session);
        });
    }

    function closeActiveTab() {
        IDE.closeSession(IDE.activeSession);
    }


    export class TabContextMenu {

        private ctxmenu;
        private lastEvent: MouseEvent;

        constructor() {
            // Create a new menu
            this.ctxmenu = new GUI.Menu();

            // Add the items
            this.ctxmenu.append(new GUI.MenuItem({
                label: "Close",
                click: closeContextTab
            }));

            this.ctxmenu.append(new GUI.MenuItem({
                label: "Close Others",
                click: closeOtherTabs
            }));

            this.ctxmenu.append(new GUI.MenuItem({
                label: "Close All",
                click: closeAllTabs
            }));

            this.ctxmenu.append(new GUI.MenuItem({
                label: "Close Right",
                click: closeRightTabs
            }));

            this.ctxmenu.append(new GUI.MenuItem({
                label: "Close Left",
                click: closeLeftTabs
            }));

            this.ctxmenu.append(new GUI.MenuItem({
                label: "Close Active",
                click: closeActiveTab
            }));

        }

        // Bind this context menu to an HTML element
        popup(x,y) {          
                this.ctxmenu.popup(x, y);                            
        }


    }

    var contextElement;

    export function initTabContextMenu() {
        var contextMenu = new TabContextMenu();

        IDE.sessionBar.addEventListener('contextmenu', function(ev: any) {
            /*
            var d = UI.TreeView.getValueFromElement(ev.srcElement);
            data.key = d.path;
            data.isFolder = d.isFolder;
            data.element = ev.srcElement;
            */
            // console.log(data.key);
            ev.preventDefault();
            contextElement = ev.srcElement;
            contextMenu.popup(ev.x, ev.y);
            return false;
        });
    }

}