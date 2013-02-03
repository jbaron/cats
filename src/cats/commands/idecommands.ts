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


// This module contains all the global commands pertaining to the edit functionality
// Much of it is already provided by the Ace editor and just wraps this functionality

module Cats.Commands {


    function quit() {
         if (IDE.hasUnsavedSessions()) {
            if (! confirm("There are unsaved files!\nDo you really want to quit?")) return;
        }
        GUI.App.quit();
    }

    function setTheme(theme:string) {
        Cats.IDE.setTheme(theme);
    }


    function setFontSize(size:number) {
        Cats.IDE.setFontSize(size);
    }

    export class IdeCommands {
        static init(registry:(cmd:Command)=>void) {
            registry({ name: CMDS.ide_quit, label: "Quit", command: quit });
            registry({ name: CMDS.ide_theme, label: "Theme", command: setTheme });
            registry({ name: CMDS.ide_fontSize, label: "Font Size", command: setFontSize });
        }

    }


}