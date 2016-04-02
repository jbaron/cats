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

       
        mode: string;
        private version:number;
        private filePath;
   
        constructor(private editor:SourceEditor) {
            // @TODO solve nicely
            super("","ace/mode/text");
            this.filePath = editor.filePath;
            // super("","");
            var content = "";
            this.version = 0;
            this.mode = this.calculateMode();
            
            if (this.filePath) {
                content = OS.File.readTextFile(this.filePath) ;
            }

            super.setMode(this.mode);
            super.setValue(content);
            this.setNewLineMode("unix");
            // this.configureAceSession(IDE.project.config); @TODO
            this.setUndoManager(new UndoManager());


            // @TODO
            // project.on("config", (c:ProjectConfiguration) => { this.configureAceSession(c); });
            this.on("change", () => {this.version++});
        }

 
        private get project() {
            return IDE.getProject(this.filePath);
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
         * Is the file being edited a possible candiate for the tsconfig project. Right now
         * TypeScript supports 4 type of scripts: TS, TSX, JS, JSX.
         *
         */ 
        isProjectCandidate() {
            if (! this.filePath) return false;
            var exts = [".ts" , ".tsx" , ".js", ".jsx"];
            var ext = OS.File.PATH.extname(this.filePath);
            return (exts.indexOf(ext) > -1) ;
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
        getMaxAnnotationLevel(): ""|"info"|"error"|"warning" {
            var annotations = this.getAnnotations();
            if ((!annotations) || (annotations.length === 0)) return "";
            var result:"info"|"error"|"warning" = "info";
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
                var dir = OS.File.join(IDE.rootDir, "/");
                var dialog = new Gui.PromptDialog("Please enter the file name", dir);

                dialog.onSuccess = (filePath: string) => {
                    filePath = OS.File.switchToForwardSlashes(filePath);
                    this.editor.setFilePath(filePath);
                    
                    this.mode = this.calculateMode();
                    this.setMode(this.mode); 
                    this.save();
                    
                    if ( this.isProjectCandidate() ) {
                        var addDialog = new Gui.ConfirmDialog("Not yet part of any project, refresh IDE now?");
                        addDialog.onConfirm = () => {
                            IDE.refresh();
                        };
                        addDialog.show();
                    }
                    
                };
                dialog.show();
            } else {
                OS.File.writeTextFile(filePath, content);
                this.editor.setHasUnsavedChanges(false);
                this.editor.updateFileInfo();
                IDE.console.log("Saved file " + filePath);
                if (this.project) {
                    this.project.updateScript(filePath, content);
                    this.project.validate(false);
                    
                    if (this.project.config.buildOnSave) {
                        Commands.CMDS.project_build.command();
                    } else {
                        if (this.project.config.compileOnSave) {
                            this.project.validate(true);
                        }
                    }
                }
            }
        }
        

    }

}
