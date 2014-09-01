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
    
    
    var langTools = ace.require("ace/ext/language_tools");

    class Completer {

        getCompletions(editor:Ace.Editor, session:Ace.EditSession, pos:Ace.Position, prefix:string, cb:Function) {
            // if (prefix.length === 0) { cb(null, []); return }
            var fileName = session["__fileName__"];
            IDE.project.iSense.getCompletions(fileName, pos, (err, completes: TypeScript.Services.CompletionInfo) => {
                    var result = [];
                    if (! completes) return result;
                    completes.entries.forEach((entry) => {
                        result.push({name: entry.name, value: entry.name, meta: entry.kind});
                    });
                    cb(null, result);
            });
        }
    
    }
    export function installCompleter() {
        langTools.addCompleter(new Completer());
        /*
        var rhymeCompleter = {
        getCompletions: function(editor, session, pos, prefix, callback) {
            if (prefix.length === 0) { callback(null, []); return }
            $.getJSON(jsonUrl, function(wordList) {
                callback(null, wordList.map(function(ea)  {           
                    return {name: ea.word, value: ea.word, meta: "optional text"}
                }));
            })
        }
        */
    }

    installCompleter();
}