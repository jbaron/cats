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
        return IDE.getActiveEditor().getCursorPosition();
    }

    export function gotoDeclaration() {        
        var session = IDE.getActiveSession();
        if (! session) return;
        var cursor = getCursor();
        session.project.iSense.getDefinitionAtPosition( session.name, cursor, (err, data:FileRange) => {
            if (data && data.fileName)
                IDE.openSession(data.fileName, data.range.start);
        });
    }

    function getInfoAt(type: string) {        
        var session = IDE.getActiveSession();
        if (! session) return;
        IDE.problemPane.select("Search");
        var cursor = getCursor();
 
        session.project.iSense.getInfoAtPosition(type, session.name, cursor, (err, data:Cats.FileRange[]) => {
            console.log("Called getInfoAt for with results #" + data.length);
            IDE.searchResult.setData(data);
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
            registry({name:CMDS.navigate_declaration, label:"Goto Declaration", command: gotoDeclaration});
            
            
        }

    }


}

