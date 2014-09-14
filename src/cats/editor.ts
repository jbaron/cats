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

module Cats {

    /**
     * BaseClass for Editors. Editors should extend this class. The rest of the codebase is only 
     * dependent on this small subset of methods and properties
     * 
     */
    export class Editor extends qx.event.Emitter {
        
        label = "Untitled";
        name = null;
        unsavedChanges = false;
        project = IDE.project;
        properties = [];
        
        save() { /* NOP */ }
        
        moveToPosition(pos: any) { /* NOP */ }
        
        toString() { return ""; }
        
        restoreState(state:string) {
            
        }
        
        static SupportsFile(fileName:string) {
            return false;
        }
        
        getState():string {
            return null;
        }

        executeCommand(commandName: string, ...args): boolean {  return false; }

        getLayoutItem() : qx.ui.core.LayoutItem {
            throw new Error("Abstract Method not implemented: getLayoutItem");
        }

    }
    
    
    export class FileEditor extends Editor {
        
            constructor(public filePath:string) {
                super();
                if (this.filePath) this.label = PATH.basename(this.filePath);
                this.updateProperties();
            }
            
            
            updateProperties() {
                if (this.filePath) {
                    try {
                        this.properties = OS.File.getProperties(this.filePath);
                        this.emit("properties", this.properties);
                    } catch (err) { /* NOP */ }
                 }
            }
        
    }
    
}
