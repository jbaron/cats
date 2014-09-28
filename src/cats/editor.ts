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
     * dependent on this small subset of methods and properties.
     */
    export class Editor extends qx.event.Emitter {
        
        label = "Untitled"; // Labe to be used on the tab page
        editorClass = null; // The editor type
       
        
        project = IDE.project;
        properties = [];
        outline = {};
        
        
        hasUnsavedChanges() {
            return false;
        }
        
        /**
         * Save the content of the editor. Not all editors imeplement this method.
         */ 
        save() { /* NOP */ }
        
        /**
         * Move the editor to a certain position. The position paramters depends on the type of 
         * editor. For a text editorit could be a row and column, for an UML editor 
         * it could be an x an dy coordinate.  
         */ 
        moveToPosition(pos?: any) { 
            IDE.addHistory(this, pos);
        }
        

        /**
         * Based on the state previously returned by getState, create a new editor with identical state
         * Used during startup of CATS to restore same editors as before CATS was closed.
         */ 
        static RestoreState(state:string):Editor {
            return null;
        }
        
        /**
         * Get the state of this editor so it can be at a later session revived. For example for 
         * a source file editor this would be the fileName and current position.
         */ 
        getState():string {
            return null; // means doesn't support it;
        }
        
        get(property:string) {
            return this[property];
        }
        

        set(property:string, value) {
            if (! property) return;
            this[property] = value;
            this.emit(property, value);
        }
        
        has(property:string) {
            return this.get(property) != null;
        }
        
        /**
         * Which type of files does this editor supports for editing.
         */ 
        static SupportsFile(fileName:string) {
            return false;
        }
        
       
        /**
         * Command pattern implementation
         */ 
        executeCommand(commandName: string, ...args): boolean {  return false; }


        /**
         * Provide the Qooxdoo LayouItem needed to added to this editor to the EditorPage
         */ 
        getLayoutItem() : qx.ui.core.LayoutItem {
            throw new Error("Abstract Method not implemented: getLayoutItem");
        }

    }
    
    /**
     * Base class that contains some common features for editors that work on resouces on the 
     * file system.
     */ 
    export class FileEditor extends Editor {
        
            constructor(public filePath:string) {
                super();
                if (this.filePath) {
                    this.label = PATH.basename(this.filePath);
                }    
                this.updateProperties();
            }
            
            updateProperties() {
                if (this.filePath) {
                    try {
                        this.set("properties", OS.File.getProperties(this.filePath));
                    } catch (err) { /* NOP */ }
                 }
            }
            
        private static CreateEditor(fileName:string) : FileEditor {
            if (Gui.ImageEditor.SupportsFile(fileName)) return new Gui.ImageEditor(fileName);
            if (Gui.SourceEditor.SupportsFile(fileName)) return new Gui.SourceEditor(fileName);
            return null;
        }

        /**
         * Open an existing editor or if it doesn't exist yet create
         * a new FileEditor.
         */ 
        static OpenEditor(name: string, pos:ace.Position = {row:0, column:0}):FileEditor {
            var editor : FileEditor;
            var pages:Gui.EditorPage[] = [];
            pages = IDE.editorTabView.getPagesForFile(name);
            if (! pages.length) {
                editor = this.CreateEditor(name);
                if (! editor) {
                    var c = confirm("No suitable editor found for this file type, open with source editor?");
                    if (! c) return; 
                    editor = new Gui.SourceEditor(name);
                }
                IDE.editorTabView.addEditor(editor,pos);
            } else {
                editor = <Gui.SourceEditor>pages[0].editor;
                IDE.editorTabView.setSelection([pages[0]]);
                editor.moveToPosition(pos);
            }

            return editor;
        }

        
    }
    
}
