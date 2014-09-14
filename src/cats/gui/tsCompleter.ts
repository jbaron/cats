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

    export var snippetCompleter = langTools.snippetCompleter;
    export var keyWordCompleter = langTools.keyWordCompleter;
    
    var ID_REGEX = /[a-zA-Z_0-9\$\-\u00A2-\uFFFF]/;

    export function retrievePrecedingIdentifier(text, pos, regex?) {
        regex = regex || ID_REGEX;
        var buf = [];
        for (var i = pos-1; i >= 0; i--) {
            if (regex.test(text[i]))
                buf.push(text[i]);
            else
                break;
        }
        return buf.reverse().join("");
    };

    export class TSCompleter {

        constructor(private editor:SourceEditor, aceEditor:Ace.Editor) {
            aceEditor.commands.on('afterExec', (e) => { this.liveAutoComplete(e);});
        }

         private liveAutoComplete(e) {
            var text = e.args || "";
            if ((e.command.name === "insertstring") && (text === ".")) {
                this.editor.showAutoComplete();
            }
        }

        getCompletions(editor:Ace.Editor, session:Ace.EditSession, pos:Ace.Position, prefix:string, cb:(any,completions: Cats.CompletionEntry[])=>void) {
            
            var fileName = this.editor.filePath;
            if (! fileName) return [];
            
            IDE.project.iSense.getCompletions(fileName, pos, (err, completes: TypeScript.Services.CompletionEntry[]) => {
                    var result:Array<Cats.CompletionEntry> = [];
                    if (! completes) return result;
                    completes.forEach((entry) => {
                        result.push({caption: entry.name, value: entry.name, meta: entry.kind});
                    });
                    cb(null, result);
            });
        }
    
    }
   

}