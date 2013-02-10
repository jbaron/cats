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

module Cats.Commands {

    function getCursor(): Ace.Position {
        return IDE.mainEditor.aceEditor.getCursorPosition();
    }

    export function gotoDeclaration() {        
        var session = IDE.mainEditor.activeSession;
        if (! session) return;
        var cursor = getCursor();
        session.project.iSense.perform("getDefinitionAtPosition", session.name, cursor, (err, data:FileRange) => {
            if (data && data.unitName)
                IDE.openSession(data.unitName, data.range.start);
        });
    }

    function getInfoAt(type: string) {        
        var session = IDE.mainEditor.activeSession;
        if (! session) return;
        IDE.resultbar.selectOption(1);
        var cursor = getCursor();
        var searchResultsElem = IDE.searchResult;
        searchResultsElem.innerHTML = "";
        $(searchResultsElem).addClass("busy");        
        session.project.iSense.perform("getInfoAtPosition", type, session.name, cursor, (err, data:Cats.FileRange[]) => {
            $(searchResultsElem).removeClass("busy");
            IDE.views.searchResults.render(data);
        });
    }

    function findReferences() {
        return getInfoAt("getReferencesAtPosition");        
    }

    function findOccurences() {
        return getInfoAt("getOccurrencesAtPosition");        
    }


    function findImplementors() {
        return getInfoAt("getImplementorsAtPosition");        
    }


    export class NavigateCommands {
        static init(registry:(cmd:Command)=>void) {
            
            registry({name:CMDS.navigate_references, label:"Find References", command:findReferences});
            registry({name:CMDS.navigate_implementors, label:"Find Implementations", command:findImplementors});
            registry({name:CMDS.navigate_occurences, label:"Find Occurences", command:findOccurences});
            registry({name:CMDS.navigate_declaration, label:"Goto declaration", command: gotoDeclaration});
            
            
        }

    }


}

