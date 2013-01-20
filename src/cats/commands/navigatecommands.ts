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
        return Cats.mainEditor.aceEditor.getCursorPosition();
    }

    export function gotoDeclaration() {
        var cursor = getCursor();
        var session = Cats.mainEditor.activeSession;
        session.project.iSense.perform("getDefinitionAtPosition", session.name, cursor, (err, data) => {
            if (data && data.unitName)
                session.project.editFile(data.unitName, null, data.startPos);
        });
    }

    function rangeToPosition(range: Ace.Range): string {
        return (range.startRow + 1) + ":" + (range.startColumn + 1);
    }

    function getInfoAt(type: string) {
        var cursor = getCursor();
        var session = Cats.mainEditor.activeSession;
        var resultElem = document.getElementById("result");
        $(resultElem).addClass("busy");
        session.project.iSense.perform("getInfoAtPosition", type, session.name, cursor, (err, data) => {
            $(resultElem).removeClass("busy");
            if (data) {
                var searchResultsElem = Cats.IDE.searchResult;
                searchResultsElem.innerHTML = "";
                var grid = new Cats.UI.Grid();
                grid.setColumns(["description", "script", "position"]);
                grid.setRows(data);
                grid.setAspect("position", (row) => { return rangeToPosition(row.range) });
                grid.render();
                grid.appendTo(searchResultsElem);
                grid.onselect = (data) => {
                    session.project.editFile(data.script, null, { row: data.range.startRow, column: data.range.startColumn });
                };

            }
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

