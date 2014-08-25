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

/**
 * The toolbar for CATS
 */
class StatusBar extends qx.ui.toolbar.ToolBar {

    private modeInfo:qx.ui.toolbar.Button;
    private overwriteInfo:qx.ui.toolbar.Button;
    private positionInfo:qx.ui.toolbar.Button;
    private busyInfo: qx.ui.toolbar.Button;
    

    constructor() {
        super();
        this.init();
        this.setPadding(0,0,0,0);
        this.setupListeners();
    }

    private createButton(label?:string, icon?:string) {
        var button = new qx.ui.toolbar.Button(label,icon);
        // button.setPadding(1,1,1,1);
        button.setMargin(0, 10, 0, 10);
        button.setMinWidth(100);
        button.setDecorator(null);
        return button;
    }

    private init() {
       this.positionInfo = this.createButton("-:-");
       this.add(this.positionInfo);
       
       this.modeInfo = this.createButton("Unknown");
       this.add(this.modeInfo);
       this.addSpacer();

       this.busyInfo = this.createButton("","./resource/cats/loader.gif");
       this.busyInfo.setShow("icon");
       this.add(this.busyInfo);

       this.overwriteInfo = this.createButton("INSERT");
       this.add(this.overwriteInfo);
    }

    /**
     * Indicate if the worker is busy or not
     */ 
    setBusy(busy:boolean) {
        if (busy) {
            this.busyInfo.setIcon("./resource/cats/loader_anim.gif");
        } else {
            this.busyInfo.setIcon("./resource/cats/loader.gif");
        }
    }

    private setupListeners() {
        IDE.infoBus.on("editor.overwrite", (value:boolean) => {
            this.overwriteInfo.setLabel(value ? "OVERWRITE" : "INSERT");
        });
        
        IDE.infoBus.on("editor.mode" , (value:string) => {
            this.modeInfo.setLabel(value.toUpperCase());
        });
        
        IDE.infoBus.on("editor.position", (value:Ace.Position) => {
             var label = (value.row +1) + ":" + (value.column+1);
             this.positionInfo.setLabel(label);
        });
        
    }

        
}