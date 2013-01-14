module Cats.Menu {

    var win = gui.Window.get();

    export class EditorContextMenu {

        private ctxmenu;
        private lastEvent: MouseEvent;

        constructor(private editor: Cats.Editor) {
            // Create a new menu
            this.ctxmenu = new gui.Menu();
            var getCmd = Cats.Commands.getMenuCommand;
            var CMDS = Cats.Commands.CMDS;

            // Add the items
            this.ctxmenu.append(getCmd(CMDS.navigate_declaration));
            this.ctxmenu.append(getCmd(CMDS.navigate_references));
            this.ctxmenu.append(getCmd(CMDS.navigate_occurences));
            this.ctxmenu.append(getCmd(CMDS.navigate_implementors));

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