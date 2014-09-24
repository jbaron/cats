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


module Cats.Gui {

    var UndoManager: ace.UndoManager = ace.require("ace/undomanager").UndoManager;
    var Range: ace.Range = ace.require("ace/range").Range;
    var modelist = ace.require('ace/ext/modelist');


    class EditSession extends ace.EditSession {
    
    
    unsavedChanges = false;

    constructor(content:string, mode:string, private editor:SourceEditor) {
            super(content, mode);
            this.setNewLineMode("unix");
            this.setUndoManager(new UndoManager());

            this.on("changeAnnotation", () => {
                var a = this.getAnnotations();
                this.editor.emit("errors", this.getMaxAnnotation(a));
            });
            
            this.on("changeOverwrite", (a) => {
                IDE.infoBus.emit("editor.overwrite", this.getOverwrite());
            });
            
            this.on("change", this.onChangeHandler.bind(this));
            
            IDE.infoBus.on("project.config", () => { this.configureAceSession(); });
        }

        /**
         * Determine the maximum level of warnings within a set of annotations.
         */
        private getMaxAnnotation(annotations: ace.Annotation[]) {
            if ((!annotations) || (annotations.length === 0)) return "";
            var result = "info";
            annotations.forEach((annotation) => {
                if (annotation.type === "error") result = "error";
                if (annotation.type === "warning" && result === "info") result = "warning";
            });
            return result;
        }

        private configureAceSession() {
            var config = this.editor.project.config.codingStandards;
            if (config.tabSize) this.setTabSize(config.tabSize);
            if (config.useSoftTabs != null) this.setUseSoftTabs(config.useSoftTabs);
        }

        private setupEvents() {
            this.on("changeOverwrite", (a) => {
                IDE.infoBus.emit("editor.overwrite", this.getOverwrite());
            });
        }
        
        
        /**
         * Keep track of changes made to the content and update the 
         * worker if required.
         */
        private onChangeHandler(event) {
            if (! this.unsavedChanges) {
                this.unsavedChanges = true;
                this.editor.emit("changed", true);
            }
        }


    }


}