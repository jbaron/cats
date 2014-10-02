module Cats.Gui {

    export class TSTooltip extends qx.ui.tooltip.ToolTip {

        private mouseMoveTimer: number;

        constructor(private editor: SourceEditor) {
            super("");
            this.exclude();
            this.setRich(true);
            this.setMaxWidth(500);
            
             var elem = editor.getLayoutItem().getContentElement().getDomElement(); // TODo find scroller child
             elem.onmousemove = this.onMouseMove.bind(this);
             elem.onmouseout = () => {
                    if (this.isSeeable()) this.exclude();
                    clearTimeout(this.mouseMoveTimer);
            };
        }

        /**
         * Show info at Screen location
         */
        private showToolTipAt(ev: MouseEvent) {

            var docPos = this.editor.getPositionFromScreenOffset(ev.offsetX, ev.offsetY);

            this.editor.project.iSense.getTypeAtPosition(this.editor.filePath, docPos,
                (err, data: Cats.TypeInfo) => {
                    if (!data) return;
                   
                    var tip = data.description;
                    if (data.docComment) {
                        tip += '<hr>' + data.docComment;
                    }

                    if (tip && tip.trim()) {
                        this.setLabel(tip);
                        this.moveTo(ev.x, ev.y + 10);
                        this.show();
                    }
                });
        }

        private onMouseMove(ev: MouseEvent) {
            if (this.isSeeable()) this.exclude();
            if (!this.editor.isTypeScript()) return;
            
            clearTimeout(this.mouseMoveTimer);
            var elem = <HTMLElement>ev.srcElement;
            if (elem.className !== "ace_content") return;
            this.mouseMoveTimer = setTimeout(() => {
                this.showToolTipAt(ev);
            }, 800);
        }


    }
}