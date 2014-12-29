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

/**
 * This module holds the refactoring logic for CATS
 *
 */ 
module Cats.Refactor {
    
    var Range: ace.Range = ace.require("ace/range").Range;

    function renameOccurences(edits:FileRange[],name:string) {
        for (var i = edits.length - 1; i >= 0; i--) {
            var data = edits[i];
            var editor = <Gui.Editor.SourceEditor>FileEditor.OpenEditor(data.fileName);
            var r = data.range;
            var range: ace.Range = new Range(r.start.row, r.start.column, r.end.row, r.end.column);
            editor.replace(range,name);
            editor.moveToPosition(range.start);
        };        
    }

    /**
     * Rename a class, interface, property or method throughout the project. It finds all references
     * and then replaces the macthed text with the new name. 
     */ 
    export function rename(fileName:string, project:Project, pos:Position) {
        project.iSense.getRenameInfo(fileName, pos, (err,data) => {
            if (! data) return;
            if (! data.canRename) {
                alert("Cannot rename the selected element");
                return;
            }
            
            var dialog = new Gui.PromptDialog("Rename " + data.displayName +  " into:");
            dialog.onSuccess = (newName: string) => {
                project.iSense.findRenameLocations(fileName, pos, false, false, (err, data: Cats.FileRange[]) => {
                    renameOccurences(data, newName);
                });
            };
            dialog.show();
        });
    }
    

}
