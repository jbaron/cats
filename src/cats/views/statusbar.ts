//
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

module Cats.View {

    export class StatusBar extends BaseView {

        
        constructor() {
            super(document.getElementById("statusbar")); 
            this.initStatusBar();
        }

        appendTo(parent: HTMLElement) {
            // NOP
        }

        initStatusBar() {
            
            var sessionMode = document.getElementById("sessionmode");
            IDE.mainEditor.on("editMode", (mode: string) => {
                sessionMode.innerText = mode;
            });

            var overwriteMode = document.getElementById("overwritemode");
            IDE.mainEditor.onOverwrite((mode: boolean) => {
                overwriteMode.innerText = mode ? "overwrite" : "insert";
            });
        }
    }

}