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
        private version:number;

        constructor(editor:SourceEditor) {
            var content = "";
            this.version = 0;
            this.editor = editor;
            this.mode = this.calculateMode();
            
            if (editor.filePath) {
                content = OS.File.readTextFile(editor.filePath) ;

                if ( this.isTypeScript() && (!IDE.project.hasScriptFile( editor.filePath )) ) {
                    var addDialog = new Gui.ConfirmDialog("Not yet part of project, add it now?");
                    addDialog.onConfirm = () => {
                        IDE.project.addScript(editor.filePath, content);
                    };
                    addDialog.show();
                }
            
            }
            
            super(content, this.mode);
            this.setNewLineMode("unix");
            this.configureAceSession(IDE.project.config);
            this.setUndoManager(new UndoManager());

            IDE.project.on("config", (c:ProjectConfiguration) => { this.configureAceSession(c); });
            this.on("change", () => {this.version++});
        }

 
        private calculateMode() {
            if (! this.editor.filePath) return "ace/mode/text";
            var mode = modelist.getModeForPath(this.editor.filePath).mode
            return mode;    
        }
 
        /**
         * Check if there are any errors for this session and show them.    
         */
        showAnnotations(result: FileRange[]) {
            if (! result) return;
            var annotations: ace.Annotation[] = [];
            result.forEach((error: FileRange) => {
                annotations.push({
                    row: error.range.start.row,
                    column: error.range.start.column,
                    type: <any>error.severity,
                    text: error.message + ""
                });
            });
            super.setAnnotations(annotations);
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
            var config = projectConfig.codeFormat;
            if (config.TabSize) this.setTabSize(config.TabSize);
            if (config.ConvertTabsToSpaces != null) this.setUseSoftTabs(config.ConvertTabsToSpaces);
        }
        
    
        /**
         * Persist this session to the file system. This overrides the NOP in the base class
         */
        save() {
            var filePath = this.editor.filePath;
            var content = this.getValue();
            if (filePath == null) {
                var dir = OS.File.join(IDE.project.projectDir, "/");
                var dialog = new Gui.PromptDialog("Please enter the file name", dir);

                dialog.onSuccess = (filePath: string) => {
                    filePath = OS.File.switchToForwardSlashes(filePath);
                    this.editor.setFilePath(filePath);
                    
                    this.mode = this.calculateMode();
                    this.setMode(this.mode); 
                    
                    if ( this.isTypeScript() && (!IDE.project.hasScriptFile(filePath)) ) {
                        var addDialog = new Gui.ConfirmDialog("Not yet part of project, add it now?");
                        addDialog.onConfirm = () => {
                            IDE.project.addScript(filePath, content);
                        };
                        addDialog.show();
                    }
                    this.save();
                };
                dialog.show();
            } else {
                OS.File.writeTextFile(filePath, content);
                this.editor.setHasUnsavedChanges(false);
                this.editor.updateFileInfo();
                IDE.console.log("Saved file " + filePath);
                if (this.isTypeScript()) {
                    IDE.project.iSense.updateScript(filePath, content);
                    IDE.project.validate(false);
                    if (IDE.project.config.buildOnSave) Commands.CMDS.project_build.command();
                }
            }
        }
        

    }

}
