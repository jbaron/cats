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


///<reference path='../typings/typescript.d.ts' />

// This is based on the harness.ts file from TypeScript (80% identical)
// Major difference is that this module uses real language services API and not the Shim.
// Licensed under the Apache License, Version 2.0. 


module Cats.TSWorker {

    export class ScriptInfo {
        public version: number;
        public editRanges: { length: number; editRange: TypeScript.ScriptEditRange; }[] = [];

        constructor(public name: string, public content: string, public isResident: bool, public maxScriptVersions: number) {
            this.version = 1;
        }

        public updateContent(content: string, isResident: bool) {
            this.editRanges = [];
            this.content = content;
            this.isResident = isResident;
            this.version++;
        }

        public editContent(minChar: number, limChar: number, newText: string) {
            // Apply edits
            var prefix = this.content.substring(0, minChar);
            var middle = newText;
            var suffix = this.content.substring(limChar);
            this.content = prefix + middle + suffix;

            // Store edit range + new length of script
            this.editRanges.push({
                length: this.content.length,
                editRange: new TypeScript.ScriptEditRange(minChar, limChar, (limChar - minChar) + newText.length)
            });

            if (this.editRanges.length > this.maxScriptVersions) {
                this.editRanges.splice(0, this.maxScriptVersions - this.editRanges.length);
            }

            // Update version #
            this.version++;
        }

        public getEditRangeSinceVersion(version: number): TypeScript.ScriptEditRange {
            if (this.version == version) {
                // No edits!
                return null;
            }

            var initialEditRangeIndex = this.editRanges.length - (this.version - version);
            if (initialEditRangeIndex < 0 || initialEditRangeIndex >= this.editRanges.length) {
                // Too far away from what we know
                return TypeScript.ScriptEditRange.unknown();
            }

            var entries = this.editRanges.slice(initialEditRangeIndex);

            var minDistFromStart = entries.map(x => x.editRange.minChar).reduce((prev, current) => Math.min(prev, current));
            var minDistFromEnd = entries.map(x => x.length - x.editRange.limChar).reduce((prev, current) => Math.min(prev, current));
            var aggDelta = entries.map(x => x.editRange.delta).reduce((prev, current) => prev + current);

            return new TypeScript.ScriptEditRange(minDistFromStart, entries[0].length - minDistFromEnd, aggDelta);
        }
    }

    export class LanguageServiceHost implements Services.ILanguageServiceHost {
        private ls: Services.ILanguageService = null;
        private compilationSettings:TypeScript.CompilationSettings = null;

        public scripts: ScriptInfo[] = [];
        public maxScriptVersions = 100;


        public addScript(name: string, content: string, isResident = false) {
            var script = new ScriptInfo(name, content, isResident, this.maxScriptVersions);
            this.scripts.push(script);
        }

        public updateScript(name: string, content: string, isResident = false) {
            for (var i = 0; i < this.scripts.length; i++) {
                if (this.scripts[i].name === name) {
                    this.scripts[i].updateContent(content, isResident);
                    return;
                }
            }

            this.addScript(name, content, isResident);
        }

        public editScript(name: string, minChar: number, limChar: number, newText: string) {
            for (var i = 0; i < this.scripts.length; i++) {
                if (this.scripts[i].name == name) {
                    this.scripts[i].editContent(minChar, limChar, newText);
                    return;
                }
            }

            throw new Error("No script with name '" + name + "'");
        }

        public getScriptContent(scriptIndex: number): string {
            return this.scripts[scriptIndex].content;
        }

        //////////////////////////////////////////////////////////////////////
        // ILogger implementation
        //
        public information(): bool { return true; }
        public debug(): bool { return true; }
        public warning(): bool { return true; }
        public error(): bool { return true; }
        public fatal(): bool { return true; }

        public log(s: string): void {
            // For debugging...
            // IO.printLine("TypeScriptLS:" + s);
        }

        //////////////////////////////////////////////////////////////////////
        // ILanguageServiceHost implementation
        //

        public getCompilationSettings(): TypeScript.CompilationSettings {
            return this.compilationSettings; 
        }

        public setCompilationSettings(value: TypeScript.CompilationSettings) {
            this.compilationSettings = value;
        }

        public getScriptCount(): number {
            return this.scripts.length;
        }

        public getScriptSourceText(scriptIndex: number, start: number, end: number): string {
            return this.scripts[scriptIndex].content.substring(start, end);
        }

        public getScriptSourceLength(scriptIndex: number): number {
            return this.scripts[scriptIndex].content.length;
        }

        public getScriptId(scriptIndex: number): string {
            return this.scripts[scriptIndex].name;
        }

        public getScriptIsResident(scriptIndex: number): bool {
            return this.scripts[scriptIndex].isResident;
        }

        public getScriptVersion(scriptIndex: number): number {
            return this.scripts[scriptIndex].version;
        }

        public getScriptEditRangeSinceVersion(scriptIndex: number, scriptVersion: number): TypeScript.ScriptEditRange {
            var range = this.scripts[scriptIndex].getEditRangeSinceVersion(scriptVersion);
            return range;
        }

       
        //
        // Parse file given its source text
        //
        public parseSourceText(fileName: string, sourceText: TypeScript.ISourceText): TypeScript.Script {
            var parser = new TypeScript.Parser();
            // parser.setErrorRecovery(null, -1, -1);
            parser.errorCallback = (a, b, c, d) => {
                console.log("Error: %s %s %s %s", a, b, c, d);
            };

            var script = parser.parse(sourceText, fileName, 0);
            return script;
        }
     
        //
        // Apply an array of text edits to a string, and return the resulting string.
        //
        public applyEdits(content: string, edits: Services.TextEdit[]): string {
            var result = content;
            edits = this.normalizeEdits(edits);

            for (var i = edits.length - 1; i >= 0; i--) {
                var edit = edits[i];
                var prefix = result.substring(0, edit.minChar);
                var middle = edit.text;
                var suffix = result.substring(edit.limChar);
                result = prefix + middle + suffix;
            }
            return result;
        }

        //
        // Normalize an array of edits by removing overlapping entries and sorting
        // entries on the "minChar" position.
        //
        private normalizeEdits(edits: Services.TextEdit[]): Services.TextEdit[] {
            var result: Services.TextEdit[] = [];

            function mapEdits(edits: Services.TextEdit[]): { edit: Services.TextEdit; index: number; }[] {
                var result = [];
                for (var i = 0; i < edits.length; i++) {
                    result.push({ edit: edits[i], index: i });
                }
                return result;
            }

            var temp = mapEdits(edits).sort(function(a, b) {
                var result = a.edit.minChar - b.edit.minChar;
                if (result == 0)
                    result = a.index - b.index;
                return result;
            });

            var current = 0;
            var next = 1;
            while (current < temp.length) {
                var currentEdit = temp[current].edit;

                // Last edit
                if (next >= temp.length) {
                    result.push(currentEdit);
                    current++;
                    continue;
                }
                var nextEdit = temp[next].edit;

                var gap = nextEdit.minChar - currentEdit.limChar;

                // non-overlapping edits
                if (gap >= 0) {
                    result.push(currentEdit);
                    current = next;
                    next++;
                    continue;
                }

                // overlapping edits: for now, we only support ignoring an next edit 
                // entirely contained in the current edit.
                if (currentEdit.limChar >= nextEdit.limChar) {
                    next++;
                    continue;
                }
                else {
                    throw new Error("Trying to apply overlapping edits");
                }
            }

            return result;
        }

    }


}
