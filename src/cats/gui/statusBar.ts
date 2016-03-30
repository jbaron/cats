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
     * Represents the statusbar for CATS displayed at the bottom of the screen.
     */
    export class StatusBar extends qx.ui.toolbar.ToolBar {

        private modeInfo: qx.ui.toolbar.Button;
        private overwriteInfo: qx.ui.toolbar.Button;
        private positionInfo: qx.ui.toolbar.Button;
        private busyInfo: qx.ui.toolbar.Button;
        private editor:Editor;
        private status:any = {};

        constructor() {
            super();
            this.init();
            this.setPadding(0, 0, 0, 0);
            IDE.editorTabView.onChangeEditor(this.register.bind(this));
        }


        private clear() {
             this.modeInfo.setLabel("");
             this.overwriteInfo.setLabel("INSERT");
             this.positionInfo.setLabel("");
        }

        private updateStatus(status) {
            if (! status) return;
            
            if (status.mode !== this.status.mode) {
                this.modeInfo.setLabel(status.mode || "Unknown");
            }
            
            if (status.overwrite !== this.status.overwrite) {
                this.overwriteInfo.setLabel(status.overwrite ? "OVERWRITE" : "INSERT");
            } 
            
            if (status.position !== this.status.position) {
                this.positionInfo.setLabel(status.position || ":");
            }
            
            this.status = status;
        }

        private register(editor:Editor.SourceEditor) {
            if (this.editor) {
                this.editor.off("status",  this.updateStatus, this);
            }
            
            if (editor) {
                this.editor = editor;
                editor.on("status", this.updateStatus,this);
                this.updateStatus(editor.get("status"));
            } else {
                this.clear();
                this.editor = null;
            }
           
        }


        /**
         * Create a new button 
         * 
         */ 
        private createButton(label?: string, icon?: string) {
            var button = new qx.ui.toolbar.Button(label, icon);
            // button.setPadding(1,1,1,1);
            button.setMargin(0, 10, 0, 10);
            button.setMinWidth(100);
            button.setDecorator(null);
            return button;
        }


        /**
         * Initialize the status bar
         * 
         */ 
        private init() {
            this.positionInfo = this.createButton("-:-");
            this.add(this.positionInfo);

            this.modeInfo = this.createButton("Unknown");
            this.add(this.modeInfo);
            this.addSpacer();

            this.busyInfo = this.createButton("", "./resource/cats/loader.gif");
            this.busyInfo.setShow("icon");
            this.add(this.busyInfo);

            this.overwriteInfo = this.createButton("INSERT");
            this.add(this.overwriteInfo);
        }


        /**
         * Indicate if the worker is busy or not
         * 
         */
        setBusy(busy: boolean, activity:string) {
            if (busy) {
                this.busyInfo.setIcon("./resource/cats/loader_anim.gif");
            } else {
                this.busyInfo.setIcon("./resource/cats/loader.gif");
            }
            if (IDE.debug && busy && activity) IDE.console.log(activity);
        }

    }
}