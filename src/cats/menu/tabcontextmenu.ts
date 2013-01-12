module Cats.Menu {

    var win = gui.Window.get();

    function getTab() {
    }

    function nop() {
        alert("not yet implemented");
    }


    export class TabContextMenu {

        private ctxmenu;
        private lastEvent: MouseEvent;

        constructor(private editor: Cats.Editor) {
            // Create a new menu
            this.ctxmenu = new gui.Menu();

            // Add the items
            this.ctxmenu.append(new gui.MenuItem({
                label: 'Close this tab',
                click: nop
            }));

            this.ctxmenu.append(new gui.MenuItem({
                label: 'Close other tabs',
                click: nop
            }));

            this.ctxmenu.append(new gui.MenuItem({
                label: 'Close all tabs',
                click: nop
            }));

            this.ctxmenu.append(new gui.MenuItem({
                label: 'Close active tab',
                click: nop
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