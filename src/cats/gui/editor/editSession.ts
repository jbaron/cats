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


module Cats.Gui.Editor {

    var UndoManager: ace.UndoManager = ace.require("ace/undomanager").UndoManager;
    var modelist = ace.require('ace/ext/modelist');


    /**
     * Wrapper class around the Ace EditSession that takes care of the common
     * features for all edit sessions.
     * 
     */ 
    export class EditSession extends ace.EditSession {

        private editor;
        mode: string;

        constructor(editor:SourceEditor) {
            var content = "";
            this.mode = "ace/mode/text";
            this.editor = editor;
            
            if (editor.filePath) {
                content = OS.File.readTextFile(editor.filePath) ;
                this.mode = modelist.getModeForPath(editor.filePath).mode
                
                if ( this.isTypeScript() && (!IDE.project.hasScriptFile( editor.filePath )) ) {
                    var isProjectFile = confirm( "Not yet part of project, add it now?" );
                    if ( isProjectFile ) IDE.project.addScript( editor.filePath, content );
                }
            
            }
            
            super(content, this.mode);
            this.setNewLineMode("unix");
            this.setUndoManager(new UndoManager());

            IDE.project.on("config", (c) => { this.configureAceSession(c); });
        }

 
        /**
         * Check if there are any errors for this session and show them.    
         */
        showAnnotations(result: Cats.FileRange[]) {
            var annotations: ace.Annotation[] = [];
            result.forEach((error: Cats.FileRange) => {
                annotations.push({
                    row: error.range.start.row,
                    column: error.range.start.column,
                    type: <any>error.severity,
                    text: error.message
                });
            });
            this.setAnnotations(annotations);
        }


       /**
         * Is the editor currently containing TypeScript content. This determines wehther all kind 
         * of features are enabled or not.
         */ 
        isTypeScript() {
            return this.mode === "ace/mode/typescript";
        }

        setMode(mode:string) {
            this.mode=mode;
            super.setMode(mode);
        }


        /**
         * Determine the maximum level of severity within a set of annotations.
         * 
         * @return Possible return values are info, warning or error
         */
        getMaxAnnotationLevel() {
            var annotations = this.getAnnotations();
            if ((!annotations) || (annotations.length === 0)) return "";
            var result = "info";
            annotations.forEach((annotation) => {
                if (annotation.type === "error") result = "error";
                if (annotation.type === "warning" && result === "info") result = "warning";
            });
            return result;
        }

        private configureAceSession(projectConfig:ProjectConfiguration) {
            var config = projectConfig.codingStandards;
            if (config.tabSize) this.setTabSize(config.tabSize);
            if (config.useSoftTabs != null) this.setUseSoftTabs(config.useSoftTabs);
        }
        
        /**
         * Persist this session to the file system. This overrides the NOP in the base class
         */
        save() {
            var filePath = this.editor.filePath;
            if (filePath == null) {
                var dir = OS.File.join(IDE.project.projectDir, "/");
                filePath = prompt("Please enter the file name", dir);
                if (! filePath) return;
                filePath = OS.File.switchToForwardSlashes(filePath);
                this.editor.setFilePath(filePath);
            }

            OS.File.writeTextFile(filePath, this.getValue());
            this.editor.setHasUnsavedChanges(false);
            this.editor.updateFileInfo();
            IDE.console.log("Saved file " + filePath);
            if (this.isTypeScript()) {
                IDE.project.iSense.updateScript(filePath, this.getValue());
                IDE.project.validate(false);
                if (IDE.project.config.buildOnSave) Commands.CMDS.project_build.command();
            }
        }
        

    }

}
