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

module Cats.Gui.Editor {

    export class TSTooltip extends qx.ui.tooltip.ToolTip {

        private mouseMoveTimer: number;
        private mouseX: number = 0;
        private mouseY: number = 0;

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

            var docPos = this.editor.getPositionFromScreenOffset(ev);

            this.editor.project.iSense.getInfoAtPosition(this.editor.filePath, docPos,
                (err, data: Cats.TypeInfo) => {
                    if ((!data) || (! data.description)) return;

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
            var oldX = this.mouseX, oldY = this.mouseY;
            this.mouseX = ev.clientX;
            this.mouseY = ev.clientY;
            // Some UA may fire mousemove events periodically even if the mouse is not moving,
            // so we must not hide tooltip in this situation to avoid blink.
            if ((this.mouseX - oldX === 0) && (this.mouseY - oldY === 0))
                return;
            else if (this.isSeeable())
                this.exclude();

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