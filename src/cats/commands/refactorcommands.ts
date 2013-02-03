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

var Range: Ace.Range = ace.require("ace/range").Range;
    
    
 
 function rename() {        
        var table = <HTMLElement>document.querySelector("#searchresults table");
        if (! table) {
            alert("Cannot rename if there are no search results");
            return;
        }
        var grid = Cats.UI.Grid.getGridFromElement(table);
        var rows:FileRange[] = grid.getRows();
        var msg = "Going to rename " + rows.length + " instances.\nPlease enter new name";
        var newName = prompt(msg);
        if (! newName) return;
        var i = rows.length;
        while (i--) {
            var data = rows[i];
            var session = IDE.getSession(data.unitName);
            if (! session) {
                session = Cats.project.editFile(data.unitName);
            }
            // console.log(session.name);
            var r = data.range;
            var range:Ace.Range = new Range(r.start.row, r.start.column,r.end.row,r.end.column);
            session.editSession.replace(range,newName);
        }
        
    }


    export class RefactorCommands {
        static init(registry:(cmd:Command)=>void) {
            registry({ name: CMDS.refactor_rename, label: "Rename", command: rename });
        }

    }


}