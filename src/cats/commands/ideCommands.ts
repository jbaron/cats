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
 * This module contains all the global commands pertaining to IDE functionality
 */
module Cats.Commands {

    var styleNr = 0;


    /**
     * Quit CATS
     */
    function quit() {
        IDE.quit();
    }



    function toggleView(component: qx.ui.core.Widget) {
        if (component.isVisible()) {
            component.exclude();
        } else {
            component.show();
        }
    }


    function next() {
        history.forward();
    }

    function prev() {
        history.back();
    }

    function configureIde() {
        var w = new Gui.IdePreferencesDialog(IDE.config);
        w.show();
    }

    /**
     * Cycle trhough the themes and set the next one.
     */ 
    function setTheme() {
            const themes = IDE.getThemes();
            if (styleNr >= themes.length) styleNr = 0;
            const theme = themes[styleNr];
            IDE.setTheme(theme.name);
            styleNr++;
    }

    /**
     * Register the IDE commands
     */
    export class IdeCommands {
        static init(registry: (cmd: COMMANDNAME, fn:Function) => void) {
            registry(COMMANDNAME.ide_quit,  quit );
            registry( COMMANDNAME.ide_toggle_toolbar,  () => toggleView(IDE.toolBar) );
            registry( COMMANDNAME.ide_toggle_statusbar,  () => toggleView(IDE.statusBar) );
            registry( COMMANDNAME.ide_toggle_result,  () => toggleView(IDE.resultPane) );
            registry( COMMANDNAME.ide_toggle_context,  () => toggleView(IDE.contextPane) );
            
            registry( COMMANDNAME.ide_configure,  configureIde );
            registry( COMMANDNAME.ide_history_next, next);
            registry(COMMANDNAME.ide_history_prev,  prev);
            registry(COMMANDNAME.ide_theme, setTheme);
        }
    }


}