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


// This module contains all the global commands pertaining to the file functionality

module Cats.Commands {

    /**
     * Create a new edit session
     */ 
    function newFile() {
        IDE.editorTabView.addEditor(new Gui.SourceEditor(),{row:0, column:0});
    }

    /**
     * Close the active edit session
     */ 
    function closeFile() {
      IDE.editorTabView.close();
    }

    /**
     * Close all edit sessions
     */ 
    function closeAllFiles() {
        IDE.editorTabView.closeAll();
    }

    /**
     * Close all edit sessions except the active session
     */ 
    function closeOtherFiles() {       
        IDE.editorTabView.closeOther();
    }

    /**
     * Save all edit sessions that have changed
     */ 
    function saveAll() {
        var editors = IDE.editorTabView.getEditors();
        editors.forEach((editor)=>{
            if (editor.hasUnsavedChanges()) editor.save();
        });
    }
       
        
    /**
     * Save the active sessions under a different name
     */     
     function saveAs() {
        var editor = <Gui.SourceEditor>IDE.editorTabView.getActiveEditor(Gui.SourceEditor);
        if (editor) {
            var newName = prompt("Enter new name", editor.filePath);
            if (newName) {
                editor.filePath = newName;
                editor.save();
            }
        }
    }

    /**
     * Save the active session
     */     
    function saveFile() {
        var editor = IDE.editorTabView.getActiveEditor();
        if (editor) editor.save();
    }

    export class FileCommands {
        static init(registry: (cmd: Command, fn:Function) => void ) {
            registry(CMDS.file_new, newFile);
            registry(CMDS.file_close, closeFile );
            registry(CMDS.file_closeOther,closeOtherFiles );
            registry(CMDS.file_closeAll, closeAllFiles);
            registry(CMDS.file_save, saveFile);
            registry(CMDS.file_saveAll, saveAll);
            registry(CMDS.file_saveAs, saveAs);
        }

    }
}