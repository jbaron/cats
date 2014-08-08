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

    function refactor(rows,name:string) {
    
        rows.forEach((data) => {
            var session = IDE.openSession(data.fileName);
            var p = IDE.sessionTabView.getPageBySession(session);
            var r = data.range;
            var range: Ace.Range = new Range(r.start.row, r.start.column, r.end.row, r.end.column);
            p.editor.replace(range,name);
        });        
    }


    function rename() {
        
        var rows  = IDE.searchResult.getData();
        if (rows.length === 0) {
            alert("Need search results to refactor");
            return;
        }
        var msg = "Using the search results. \n Going to rename " + rows.length + " instances.\nPlease enter new name";
        var newName = prompt(msg);
        if (!newName) return;
        refactor(rows,newName);
    }


    export class RefactorCommands {
        static init(registry: (cmd: Command) => void ) {
            registry({ name: CMDS.refactor_rename, label: "Rename", command: rename });
        }

    }


}