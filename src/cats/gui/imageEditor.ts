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

module Cats.Gui {
    /**
     * Simple image viewer for image files. Uses canvas to render the image.
     */
    export class ImageEditor extends qx.ui.embed.Canvas implements Editor {

        private backgroundColors = ["white", "black", "grey"];

        constructor(private session: Cats.Session) {
            super();
            this.loadImage(session.name);
            this.createContextMenu();
        }

        executeCommand(name, ...args): boolean {
            return false;
        }

        private loadImage(url) {
            var image = new Image();
            image.onload = () => { this.drawImage(image); };
            image.src = url;
        }

        private resizeIfRequired(image: HTMLImageElement) {
            if (image.width > this.getCanvasWidth()) {
                this.setCanvasWidth(image.width);
            }

            if (image.height > this.getCanvasHeight()) {
                this.setCanvasHeight(image.height);
            }
        }

        private drawImage(image) {
            this.resizeIfRequired(image);
            this.getContext2d().drawImage(image,
                this.getCanvasWidth() / 2 - image.width / 2,
                this.getCanvasHeight() / 2 - image.height / 2
                );
        }

        private createContextMenu() {
            var menu = new qx.ui.menu.Menu();
            this.backgroundColors.forEach((color) => {
                var button = new qx.ui.menu.Button("Background " + color);
                button.addListener("execute", () => {
                    this.setBackgroundColor(color);
                });
                menu.add(button);
            });
            this.setContextMenu(menu);
        }


        replace(range: Ace.Range, content: string) { }

        getContent() { return null; }

        setContent(content, keepPosition= true) { }

        updateWorld() { }

        moveToPosition(pos: Ace.Position) { }

    }
}