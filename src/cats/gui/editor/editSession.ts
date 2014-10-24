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

    export class EditSession extends ace.EditSession {

        constructor(content: string, mode: string, private editor: SourceEditor) {
            super(content, mode);
            this.setNewLineMode("unix");
            this.setUndoManager(new UndoManager());

            IDE.project.on("config", () => { this.configureAceSession(); });
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
         * Determine the maximum level of warnings within a set of annotations.
         */
        getMaxAnnotation() {
            var annotations = this.getAnnotations();
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

    }

}
