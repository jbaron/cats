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
 * This module holds all the refactoring logic for CATS
 * 
 */ 
module Cats.Refactor {

    var Range: Ace.Range = ace.require("ace/range").Range;

    /**
     * Rename a class, interface, property or method throughout the project
     */ 
    export function rename(rows:Cats.FileRange[],name:string) {
    
        rows.forEach((data) => {
            var session = IDE.openSession(data.fileName);
            var p = IDE.sessionTabView.getPageBySession(session);
            var r = data.range;
            var range: Ace.Range = new Range(r.start.row, r.start.column, r.end.row, r.end.column);
            p.editor.replace(range,name);
        });        
    }

}