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


module Cats {

    var TSLint;

    /**
     * Simple helper class to call tslint functionality
     * Ideally this should be done in the tsworker to offload the main thread, but right now
     * tslint uses require to load modules on the fly and that doesn't function in worker threads
     */ 
    export class Linter {

        private lintOptions;

        constructor(private project: Project) {
            if (!TSLint) TSLint = require("tslint");
        }


        private convertPos(item: any): Cats.Range {
            return {
                start: {
                    row: item.startPosition.line,
                    column: item.startPosition.character
                },
                end: {
                    row: item.endPosition.line,
                    column: item.endPosition.position.character
                }
            };
        }

     
        /**
         * Get the configured Lint options
         */
        private getOptions() {
            if (!this.lintOptions) {
                var fileName;

                if (this.project.config.codingStandards.lintFile) {
                    fileName = OS.File.join(this.project.projectDir, this.project.config.codingStandards.lintFile);
                } else {
                    fileName = OS.File.join(IDE.catsHomeDir, "resource/tslint.json");
                }

                var content = OS.File.readTextFile(fileName);
                var config = JSON.parse(content);
                var options = {
                    formatter: "json",
                    configuration: config,
                    rulesDirectory: "customRules/",
                    formattersDirectory: "customFormatters/"
                };
                this.lintOptions = options;
            };
            return this.lintOptions;
        }


        /**
         * Excute lint on the provided content and return the resulting warnings
         * 
         */ 
        lint(fileName:string, content:string) {
            var ll = new TSLint(fileName, content, this.getOptions());
            var result: Array<any> = JSON.parse(ll.lint().output);
            var r: Cats.FileRange[] = [];
            result.forEach((msg) => {
                var item: Cats.FileRange = {
                    fileName: msg.name,
                    message: msg.failure,
                    severity: Cats.Severity.Info,
                    range: this.convertPos(msg)
                };
                r.push(item);
            });
            return r;
        }
    }
}
