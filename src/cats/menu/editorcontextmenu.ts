module Cats.Menu {

    var win = gui.Window.get();


    function getCursor(): Ace.Position {
        return Cats.mainEditor.aceEditor.getCursorPosition();
        // return Cats.project.session.getPositionFromScreenOffset(this.lastEvent.offsetX,this.lastEvent.offsetY);
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

    export function getInfoAt(type: string) {
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


    export class EditorContextMenu {

        private ctxmenu;
        private lastEvent: MouseEvent;

        constructor(private editor: Cats.Editor) {
            // Create a new menu
            this.ctxmenu = new gui.Menu();

            // Add the items
            this.ctxmenu.append(new gui.MenuItem({
                label: 'Goto Declaration',
                click: gotoDeclaration
            }));

            this.ctxmenu.append(new gui.MenuItem({
                label: 'Get References',
                click: () => { getInfoAt("getReferencesAtPosition") }
            }));

            this.ctxmenu.append(new gui.MenuItem({
                label: 'Get Occurences',
                click: () => { getInfoAt("getOccurrencesAtPosition") }
            }));

            this.ctxmenu.append(new gui.MenuItem({
                label: 'Get Implementors',
                click: () => { getInfoAt("getImplementorsAtPosition") }
            }));

        }

        // Bind this context menu to an HTML element
        bindTo(elem: HTMLElement) {

            elem.oncontextmenu = (ev: any) => {
                ev.preventDefault();
                if (this.editor.activeSession.typeScriptMode) {
                    this.lastEvent = ev;
                    this.ctxmenu.popup(ev.x, ev.y);
                }
                return false;
            };
        }


    }


}