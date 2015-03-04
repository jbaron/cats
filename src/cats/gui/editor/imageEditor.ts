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
    
    var registryEntryName = "ImageEditor";
    
    interface ImageEditorState {
        fileName: string;    
    }
    
    function restoreState(state:ImageEditorState) {
        var editor = new ImageEditor(state.fileName);
        return editor;
    }
    
    Cats.Editor.RegisterEditor(registryEntryName, restoreState);
    
    
    /**
     * Simple image viewer for image files. Uses canvas to render the image.
     */
    export class ImageEditor extends FileEditor {

        private static BackgroundColors = ["white", "black", "grey"];
        private canvas = new qx.ui.embed.Canvas();

        constructor(fileName:string) {
            super(fileName);
            this.set("status", { mode : "IMAGE" });
            this.loadImage(fileName);
            this.createContextMenu();
        }

        getLayoutItem() {
            return this.canvas;
        }

        executeCommand(name:string, ...args:any[]): any {
            return false;
        }

        save() { /* NOP */ }

        private loadImage(url:string) {
            var image = new Image();
            image.onload = () => { this.drawImage(image); };
            image.src = url;
        }

        getState() : ImageEditorState {
            return {
                fileName: this.filePath
            };
        }
       
        getType() {
            return registryEntryName;
        }
 
 
        private resizeIfRequired(image: HTMLImageElement) {
            if (image.width > this.canvas.getCanvasWidth()) {
                this.canvas.setCanvasWidth(image.width);
            }

            if (image.height > this.canvas.getCanvasHeight()) {
                this.canvas.setCanvasHeight(image.height);
            }
        }

        private drawImage(image:HTMLImageElement) {
            this.resizeIfRequired(image);
            this.canvas.getContext2d().drawImage(image,
                this.canvas.getCanvasWidth() / 2 - image.width / 2,
                this.canvas.getCanvasHeight() / 2 - image.height / 2
                );
        }

        private createContextMenu() {
            var menu = new qx.ui.menu.Menu();
            ImageEditor.BackgroundColors.forEach((color) => {
                var button = new qx.ui.menu.Button("Background " + color);
                button.addListener("execute", () => {
                    this.canvas.setBackgroundColor(color);
                });
                menu.add(button);
            });
            this.canvas.setContextMenu(menu);
        }

        static SupportsFile(fileName:string) {
            var supportedExt = [ ".png", ".gif", ".jpg" , ".jpeg"]
            var ext = OS.File.PATH.extname(fileName);
            return supportedExt.indexOf(ext) > -1;
        }

  
        moveToPosition(pos: ace.Position) { }

    }
}