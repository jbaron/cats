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
    
    
    var langTools = ace.require("ace/ext/language_tools");

    var snippetCompleter = langTools.snippetCompleter;
    var keyWordCompleter = langTools.keyWordCompleter;
    
    var ID_REGEX = /[a-zA-Z_0-9\$\-\u00A2-\uFFFF]/;

    export function retrievePrecedingIdentifier(text:string, pos:number, regex?:RegExp) {
        regex = regex || ID_REGEX;
        var buf:string[] = [];
        for (var i = pos-1; i >= 0; i--) {
            if (regex.test(text[i]))
                buf.push(text[i]);
            else
                break;
        }
        return buf.reverse().join("");
    };
    
    
    export function getCompleters(editor:SourceEditor, memberCompletionOnly:boolean) {
            if (memberCompletionOnly && editor.isTypeScript()) {
                return [new TSCompleter(editor)]
            } 
            
            if (editor.isTypeScript()) {
                return  [new TSCompleter(editor ), snippetCompleter];
            }
            
            return [keyWordCompleter, snippetCompleter];
        }
    
    

    export class TSCompleter {

        constructor(private editor:SourceEditor) {
        }

 
        getCompletions(editor:ace.Editor, session:ace.EditSession, pos:ace.Position, prefix:string, cb:CB<Cats.CompletionEntry[]>):void {

            var fileName = this.editor.filePath;
            if (! fileName) cb(null,[]);
            
            IDE.project.iSense.getCompletions(fileName, pos, (err:any, completes: ts.CompletionEntry[]) => {
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