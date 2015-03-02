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


// This is based on the harness.ts file from TypeScript
// Major difference is that this module uses real language services API and not the Shim.
// Licensed under the Apache License, Version 2.0. 


module Cats.TSWorker {

/**
 * This class holds the TypeScript files and expose them to the TS language services. It also
 * provides a number of basic conversions between different ways of determining the position 
 * within a file.
 * 
 */ 
export class ScriptInfo {
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

        public isOpen() {
            return false; // @TODO
        }


        public getVersion() {
            return this.version + ""; 
        }

        public updateContent(content: string): void {
            this.editRanges = [];
            this.setContent(content);
            this.version++;
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
            var end = spanEnd(span);
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
        
        
        getRangeFromSpan(textSpan: ts.TextSpan) {
            return this.getRange(textSpan.start, textSpan.length);
        }
        
        /**
         * Based on the position within the script, determine if we are in member mode
         * 
         */ 
        determineMemeberMode(pos: number) {
            var source = this.content;
            var identifyerMatch = /[0-9A-Za-z_\$]*$/;
            var previousCode = source.substring(0, pos);

            var match = previousCode.match(identifyerMatch);
            var newPos = pos;
            var memberMode = false;
            if (match && match[0]) newPos = pos - match[0].length;
            if (source[newPos - 1] === '.') memberMode = true;

            var result = {
                pos: newPos,
                memberMode: memberMode
            };

            return result;
        }
        
        /**
         * Get a snapshot for this script
         */ 
        getScriptSnapshot() {
             return  ts.ScriptSnapshot.fromString(this.content);
        }

        
        
    }
}