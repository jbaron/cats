 module Cats.Commands {

var Range: Ace.Range = ace.require("ace/range").Range;
    
    
 
 function rename() {        
        var table = <HTMLElement>document.querySelector("#searchresults table");
        var grid = Cats.UI.Grid.getGridFromElement(table);
        var newName = prompt("Enter new name");
        if (! newName) return;
        var rows = grid.getRows();
        var i = rows.length;
        while (i--) {
            var data = rows[i];
            var session = Cats.mainEditor.getSession(data.script,Cats.project);
            if (! session) {
                session = Cats.project.editFile(data.script);
            }
            // console.log(session.name);
            var r = data.range;
            var range:Ace.Range = new Range(r.startRow, r.startColumn,r.endRow,r.endColumn);
            session.editSession.replace(range,newName);
        }
        
    }


    export class RefactorCommands {
        static init(registry:(cmd:Command)=>void) {
            registry({ name: CMDS.refactor_rename, label: "Rename", command: rename });
        }

    }


}