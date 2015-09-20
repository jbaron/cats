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


module Cats.TSWorker {

/**
 * This class holds the TypeScript files and expose them to the TS language services. It also
 * provides a number of basic conversions between different ways of determining the position 
 * within a file.
 * 
 */ 
export class Script {
        private version: number = 1;
        public editRanges: { length: number; textChangeRange: ts.TextChangeRange; }[] = [];
 
        constructor(public fileName: string, private content: string, private ls:ts.LanguageService) {
            this.setContent(content);
        }

        private setContent(content: string): void {
            this.content = content;
        }

        public getSourceFile() {
            return this.ls.getSourceFile(this.fileName);
        }

        public getContent() {
            return this.content;
        }


        public getVersion() {
            return this.version + ""; 
        }

        public updateContent(content: string): void {
            this.editRanges = [];
            this.setContent(content);
            this.version++;
        }

        public insertDoc(position: Cats.Position) {
            var pos = this.getPositionFromCursor(position);
            var text = this.ls.getDocCommentTemplateAtPosition(this.fileName, pos);
            return text;
        }

        public getRenameInfo(cursor: Position) {
            var pos = this.getPositionFromCursor(cursor);
            var result = this.ls.getRenameInfo(this.fileName, pos);
            return result;
        }


        /**
         * Get the info at a certain position. Used for the tooltip in the editor
         * 
         */ 
        public getInfoAtPosition(position: Cats.Position):TypeInfo {
            var pos = this.getPositionFromCursor(position);
            if (!pos) return;
            var info = this.ls.getQuickInfoAtPosition(this.fileName, pos);
            if (! info) return {};
            
            var result = {
                description : ts.displayPartsToString(info.displayParts),
                docComment : ts.displayPartsToString(info.documentation)
            };
            return result;
        }


        getErrors() {
            var errors:ts.Diagnostic[] = [];
            
            // Let's first get the syntactic errors
            var syntactic = this.ls.getSyntacticDiagnostics(this.fileName);
            errors = errors.concat(syntactic);
            
            // And now the semantic erros
            var semantic = this.ls.getSemanticDiagnostics(this.fileName);
            errors = errors.concat(semantic);

            return errors;
        }
        

        getDefinitionAtPosition(pos: Position): Cats.FileRange {
            var chars = this.getPositionFromCursor(pos);
            var infos = this.ls.getDefinitionAtPosition(this.fileName, chars);
            if (infos) {
                var info = infos[0];
                // TODO handle better
                return {
                    fileName: info.fileName,
                    range: this.getRangeFromSpan(info.textSpan)
                };
            } else {
                return null;
            }
        }

        public emitOutput() {
            var output = this.ls.getEmitOutput(this.fileName);
            return output.outputFiles;
        }

        /*
        public editContent(minChar: number, limChar: number, newText: string): void {
            // Apply edits
            var prefix = this.content.substring(0, minChar);
            var middle = newText;
            var suffix = this.content.substring(limChar);
            this.setContent(prefix + middle + suffix);

            // Store edit range + new length of script
            this.editRanges.push({
                length: this.content.length,
                textChangeRange: new ts.TextChangeRange(
                    ts.TextSpan.fromBounds(minChar, limChar), newText.length)
            });

            // Update version #
            this.version++;
        }

        public getTextChangeRangeSinceVersion(version: number): ts.TextChangeRange {
            if (this.version === version) {
                // No edits!
                return ts.TextChangeRange.unchanged;
            }

            var initialEditRangeIndex = this.editRanges.length - (this.version - version);

            var entries = this.editRanges.slice(initialEditRangeIndex);
            return ts.TextChangeRange.collapseChangesAcrossMultipleVersions(entries.map(e => e.textChangeRange));
        }
        */
        

        /**
         * Determine the possible completions available at a certain position in a file.
         */
        public getCompletions(cursor: Position): ts.CompletionEntry[] {
            var pos = this.getPositionFromCursor(cursor);
            var completions = this.ls.getCompletionsAtPosition(this.fileName, pos) || <ts.CompletionInfo>{};
            if (!completions.entries) return []; 
            return completions.entries;
        }
        
        
        /**
         * Convert a TS offset position to a Cats Position
         */
        positionToLineCol(position: number): Position {
            var result = this.getSourceFile().getLineAndCharacterOfPosition(position);
            return {
                row: result.line,
                column: result.character
            };
        }
        
        /**
         * Get the chars offset based on the Ace position
         */ 
        getPositionFromCursor(cursor: Position): number {
            var pos = this.getSourceFile().getPositionOfLineAndCharacter(cursor.row, cursor.column);
            // var pos = this.getLineMap().getPosition(cursor.row, cursor.column);
            return pos;
        }
        
         /**
         * Retieve the line of code that contains a certain range. Used to provide the 
         * user with contexts of what is found
         */
        getLine(span:ts.TextSpan) {
            var end = span.start + span.length;
            var min = this.content.substring(0, span.start).lastIndexOf("\n");
            var max = this.content.substring(end).indexOf("\n");
            if ((span.start - min) > 100) min = span.start - 100;
            if (max > 100) max = 100;
            return this.content.substring(min + 1, end + max);
        }
        
        /**
         * Get an CATS Range from TS minChars and limChars
         */ 
        getRange(minChar: number, len: number): Cats.Range {
            var result = {
                start: this.positionToLineCol(minChar),
                end: this.positionToLineCol(minChar+len)
            };
            return result;
        }
        
       private convertTodoNavigate(todos:ts.TodoComment[]):FileRange[] {
            
            return todos.map((todo) => {
                var entry:FileRange = {
                    range: this.getRange(todo.position, todo.descriptor.text.length),
                    fileName: this.fileName,
                    message: todo.message
                };
                return entry;
            });
        }

        
        /**
         * Get the various annotations in the comments, like TODO items.
         */ 
        getTodoItems() {
            var descriptors = [
                {text: "@TODO",  priority: 1},
                {text: "@BUG",  priority: 1},
                {text: "@FIXME",  priority: 1},
                {text: "TODO",  priority: 1},
            ];
            
            var comments = this.ls.getTodoComments(this.fileName, descriptors);
            var entries = this.convertTodoNavigate(comments);
            return entries;
        }
        
        getRangeFromSpan(textSpan: ts.TextSpan) {
            return this.getRange(textSpan.start, textSpan.length);
        }
        
    
        /**
         * Get a snapshot for this script
         */ 
        getScriptSnapshot() {
             return  ts.ScriptSnapshot.fromString(this.content);
        }

        
        
    }
}