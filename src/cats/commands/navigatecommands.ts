
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
        static init(registry) {
            
            registry({name:CMDS.navigate_references, label:"Find References", command:findReferences});
            registry({name:CMDS.navigate_implementors, label:"Find Implementations", command:findImplementors});
            registry({name:CMDS.navigate_occurences, label:"Find Occurences", command:findOccurences});
            registry({name:CMDS.navigate_declaration, label:"Goto declaration", command: gotoDeclaration});

            
            
        }

    }


}

