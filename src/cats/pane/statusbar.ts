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

    export class StatusBar extends BasePane {

        
        constructor() {
            super(document.getElementById("statusbar")); 
            this.initStatusBar();
        }

        appendTo(parent: HTMLElement) {
            // NOP
        }

        /*
        public busy(isBusy:boolean) {
            if (IDE.isBusy) {
               $("#activity").addClass("busy"); 
            } else {
                $("#activity").removeClass("busy"); 
            }
        }
        */

        private render() {
            var act = <AceSession>IDE.activeSession;
            var session = act.editSession;
            if (session) {
                document.getElementById("sessionmode").innerText = session.getMode();
                document.getElementById("overwritemode").innerText = session.getOverwrite() ? "overwrite" : "insert";
            }
        }

        initStatusBar() {
            
            var sessionMode = document.getElementById("sessionmode");
            infoBus.SESSION.on("editMode", (mode: string) => {
                sessionMode.innerText = mode;
            });

            var overwriteMode = document.getElementById("overwritemode");
            infoBus.SESSION.on("overwrite",(mode: boolean) => {
                overwriteMode.innerText = mode ? "overwrite" : "insert";
            });

            overwriteMode.onclick = (e:MouseEvent)=>{
              var s = <AceSession>IDE.activeSession;
              if (s && s.editSession) s.editSession.setOverwrite(! s.editSession.getOverwrite());
            };

        }
    }

}