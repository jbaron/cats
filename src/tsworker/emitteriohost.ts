//
// Copyright (c) Microsoft Corporation.  All rights reserved.
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



/** Functionality for compiling TypeScript code */
module Compiler {
        /** Aggregate various writes into a single array of lines. Useful for passing to the
         *  TypeScript compiler to fill with source code or errors.
         */
        export class WriterAggregator implements ITextWriter {
            public lines: string[] = [];
            public currentLine = "";

            public Write(str) {
                this.currentLine += str;
            }

            public WriteLine(str) {
                this.lines.push(this.currentLine + str);
                this.currentLine = "";
            }

            public Close() {
                if (this.currentLine.length > 0) { this.lines.push(this.currentLine); }
                this.currentLine = "";
            }

            public reset() {
                this.lines = [];
                this.currentLine = "";
            }
        }

        /** Mimics having multiple files, later concatenated to a single file. */
        export class EmitterIOHost implements TypeScript.EmitterIOHost {

            private fileCollection = {};

            /** create file gets the whole path to create, so this works as expected with the --out parameter */
            public createFile(s: string, useUTF8?: boolean): ITextWriter {

                if (this.fileCollection[s]) {
                    return <ITextWriter>this.fileCollection[s];
                }

                var writer = new Compiler.WriterAggregator();
                this.fileCollection[s] = writer;
                return writer;
            }

            public directoryExists(s: string) { return false; }
            public fileExists(s: string) { return typeof this.fileCollection[s] !== 'undefined'; }
            public resolvePath(s: string) { return s; }

            public reset() { this.fileCollection = {}; }

            public toArray(): { fileName: string; content: string; }[] {
                var result: { fileName: string; content: string; }[] = [];

                for (var p in this.fileCollection) {
                    if (this.fileCollection.hasOwnProperty(p)) {
                        var current = <Compiler.WriterAggregator>this.fileCollection[p];
                        if (current.lines.length > 0) {
                            if (p !== '0.js') { current.lines.unshift('////[' + p + ']'); }
                            result.push({ fileName: p, content: this.fileCollection[p].lines.join("\n") });
                        }
                    }
                }
                return result;
            }
        }

}
