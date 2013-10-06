var Cats;
(function (Cats) {
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
    (function (TSWorker) {
        var ScriptInfo = (function () {
            function ScriptInfo(fileName, content) {
                this.fileName = fileName;
                this.content = content;
                this.version = 1;
                this.editRanges = [];
                this.lineMap = null;
                this.setContent(content);
            }
            ScriptInfo.prototype.setContent = function (content) {
                this.content = content;
                this.lineMap = null;
            };

            ScriptInfo.prototype.getLineMap = function () {
                if (!this.lineMap)
                    this.lineMap = TypeScript.LineMap.fromString(this.content);
                return this.lineMap;
            };

            ScriptInfo.prototype.updateContent = function (content) {
                this.editRanges = [];
                this.setContent(content);
                this.version++;
            };

            ScriptInfo.prototype.editContent = function (minChar, limChar, newText) {
                // Apply edits
                var prefix = this.content.substring(0, minChar);
                var middle = newText;
                var suffix = this.content.substring(limChar);
                this.setContent(prefix + middle + suffix);

                // Store edit range + new length of script
                this.editRanges.push({
                    length: this.content.length,
                    textChangeRange: new TypeScript.TextChangeRange(TypeScript.TextSpan.fromBounds(minChar, limChar), newText.length)
                });

                // Update version #
                this.version++;
            };

            ScriptInfo.prototype.getTextChangeRangeSinceVersion = function (version) {
                if (this.version === version) {
                    // No edits!
                    return TypeScript.TextChangeRange.unchanged;
                }

                var initialEditRangeIndex = this.editRanges.length - (this.version - version);

                var entries = this.editRanges.slice(initialEditRangeIndex);
                return TypeScript.TextChangeRange.collapseChangesAcrossMultipleVersions(entries.map(function (e) {
                    return e.textChangeRange;
                }));
            };
            return ScriptInfo;
        })();
        TSWorker.ScriptInfo = ScriptInfo;

        var LanguageServiceHost = (function () {
            function LanguageServiceHost() {
                this.compilationSettings = null;
                this.scripts = {};
                this.maxScriptVersions = 100;
            }
            LanguageServiceHost.prototype.getScriptFileNames = function () {
                return Object.keys(this.scripts);
            };

            LanguageServiceHost.prototype.getScriptIsOpen = function (fileName) {
                return true;
            };

            LanguageServiceHost.prototype.getScriptSnapshot = function (fileName) {
                var script = this.scripts[fileName];
                var result = TypeScript.ScriptSnapshot.fromString(script.content);

                // Quick hack
                result["getTextChangeRangeSinceVersion"] = function (version) {
                    return null;
                    // return new TypeScript.TextChangeRange(new TypeScript.TextSpan(0, script.content.length),script.content.length);
                };

                return result;
            };

            LanguageServiceHost.prototype.addScript = function (fileName, content) {
                var script = new ScriptInfo(fileName, content);
                this.scripts[fileName] = script;
            };

            LanguageServiceHost.prototype.updateScript = function (fileName, content) {
                var script = this.scripts[fileName];
                if (script) {
                    script.updateContent(content);
                } else {
                    this.addScript(fileName, content);
                }
            };

            LanguageServiceHost.prototype.editScript = function (fileName, minChar, limChar, newText) {
                var script = this.scripts[fileName];
                if (script) {
                    script.editContent(minChar, limChar, newText);
                } else {
                    throw new Error("No script with name '" + name + "'");
                }
            };

            //////////////////////////////////////////////////////////////////////
            // ILogger implementation
            LanguageServiceHost.prototype.information = function () {
                return false;
            };
            LanguageServiceHost.prototype.debug = function () {
                return false;
            };
            LanguageServiceHost.prototype.warning = function () {
                return false;
            };
            LanguageServiceHost.prototype.error = function () {
                return false;
            };
            LanguageServiceHost.prototype.fatal = function () {
                return false;
            };

            LanguageServiceHost.prototype.log = function (s) {
            };

            LanguageServiceHost.prototype.getDiagnosticsObject = function () {
                return {
                    log: function (content) {
                    }
                };
            };

            //////////////////////////////////////////////////////////////////////
            // ILanguageServiceHost implementation
            //
            LanguageServiceHost.prototype.getCompilationSettings = function () {
                return this.compilationSettings;
            };

            LanguageServiceHost.prototype.setCompilationSettings = function (value) {
                this.compilationSettings = value;
            };

            LanguageServiceHost.prototype.getScriptVersion = function (fileName) {
                // return null;
                var script = this.scripts[fileName];
                return script.version;
            };

            /**
            * Apply an array of text edits to a string, and return the resulting string.
            */
            LanguageServiceHost.prototype.applyEdits = function (content, edits) {
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
            };

            //
            // Normalize an array of edits by removing overlapping entries and sorting
            // entries on the "minChar" position.
            //
            LanguageServiceHost.prototype.normalizeEdits = function (edits) {
                var result = [];

                function mapEdits(edits) {
                    var result = [];
                    for (var i = 0; i < edits.length; i++) {
                        result.push({ edit: edits[i], index: i });
                    }
                    return result;
                }

                var temp = mapEdits(edits).sort(function (a, b) {
                    var result = a.edit.minChar - b.edit.minChar;
                    if (result === 0)
                        result = a.index - b.index;
                    return result;
                });

                var current = 0;
                var next = 1;
                while (current < temp.length) {
                    var currentEdit = temp[current].edit;

                    if (next >= temp.length) {
                        result.push(currentEdit);
                        current++;
                        continue;
                    }
                    var nextEdit = temp[next].edit;

                    var gap = nextEdit.minChar - currentEdit.limChar;

                    if (gap >= 0) {
                        result.push(currentEdit);
                        current = next;
                        next++;
                        continue;
                    }

                    if (currentEdit.limChar >= nextEdit.limChar) {
                        next++;
                        continue;
                    } else {
                        throw new Error("Trying to apply overlapping edits");
                    }
                }

                return result;
            };
            return LanguageServiceHost;
        })();
        TSWorker.LanguageServiceHost = LanguageServiceHost;
    })(Cats.TSWorker || (Cats.TSWorker = {}));
    var TSWorker = Cats.TSWorker;
})(Cats || (Cats = {}));
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
///<reference path='languageservicehost.ts'/>
///<reference path='../typings/cats.d.ts'/>
importScripts("../static/js/typescriptServices.js");

var Cats;
(function (Cats) {
    (function (TSWorker) {
        /**
        * Simple function to stub console.log functionality since this is
        * not available in a worker.
        */
        var console = {
            log: function (str) {
                postMessage(str, null);
            }
        };

        /**
        * Case insensitive sorting
        */
        function caseInsensitiveSort(a, b) {
            if (a.name.toLowerCase() < b.name.toLowerCase())
                return -1;
            if (a.name.toLowerCase() > b.name.toLowerCase())
                return 1;

            if (a.name < b.name)
                return -1;
            if (a.name > b.name)
                return 1;
            return 0;
        }

        var ISense = (function () {
            /**
            * Create a new TypeScript ISense instance.
            *
            */
            function ISense() {
                this.maxErrors = 20;
                this.lsHost = new TSWorker.LanguageServiceHost();

                // this.ls = new Services.TypeScriptServicesFactory().createLanguageService(this.lsHost);
                this.ls = new Services.TypeScriptServicesFactory().createPullLanguageService(this.lsHost);
            }
            /**
            * Sometimes of the TS language services don't work first time
            * This method tries to fix that
            */
            ISense.prototype.initialize = function () {
                try  {
                    this.ls.refresh();
                    this.compile();
                } catch (err) {
                    // Silently ignore
                }
            };

            ISense.prototype.getScript = function (fileName) {
                return this.lsHost.scripts[fileName];
            };

            /**
            * Convert a TS offset position to a Cats Position
            */
            ISense.prototype.positionToLineCol = function (fileName, position) {
                var script = this.getScript(fileName);
                var result = script.getLineMap().getLineAndCharacterFromPosition(position);
                return {
                    row: result.line(),
                    column: result.character()
                };
            };

            ISense.prototype.getDefinitionAtPosition = function (fileName, pos) {
                var chars = this.getPositionFromCursor(fileName, pos);
                var infos = this.ls.getDefinitionAtPosition(fileName, chars);
                if (infos) {
                    var info = infos[0];
                    return {
                        fileName: info.fileName,
                        range: this.getRange(info.fileName, info.minChar, info.limChar)
                    };
                } else {
                    return null;
                }
            };

            /**
            * Convert Services to Cats NavigateToItems
            * @todo properly do this conversion
            */
            ISense.prototype.convertNavigateTo = function (items) {
                var results = items;
                for (var i = 0; i < results.length; i++) {
                    var result = results[i];
                    result.range = this.getRange(result.fileName, result.minChar, result.limChar);
                }
                return results;
            };

            /**
            * Convert Services to Cats NavigateToItems
            * @todo properly do this conversion
            */
            ISense.prototype.convertNavigateTo2 = function (fileName, items) {
                var result = new Array();
                for (var i = 0; i < items.length; i++) {
                    var item = items[i];
                    var entry = this.getRange(fileName, item.start(), item.end());
                    result.push(entry);
                }
                return result;
            };

            /**
            * Convert the errors from a TypeScript format into Cats format
            */
            ISense.prototype.convertErrors = function (errors) {
                var _this = this;
                var result = [];
                errors.forEach(function (error) {
                    var r = _this.getRange(error.fileName(), error.start(), error.start() + error.length());
                    result.push({
                        range: r,
                        message: error.message(),
                        fileName: error.fileName()
                    });
                });
                return result;
            };

            /**
            * Compile the loaded TS files and return the
            * compiles JS sources and errors (if any).
            */
            ISense.prototype.compile = function () {
                var scripts = this.lsHost.scripts;

                var result = [];
                var errors = [];

                for (var fileName in scripts) {
                    try  {
                        var emitOutput = this.ls.getEmitOutput(fileName);

                        // var fileErrors = emitOutput.diagnostics ;
                        var fileErrors = this.ls.getSyntacticDiagnostics(fileName);

                        if (fileErrors && fileErrors.length) {
                            console.log("errors in file " + fileName);
                            var newErrors = this.convertErrors(fileErrors);
                            errors = errors.concat(newErrors);
                        }

                        emitOutput.outputFiles.forEach(function (file) {
                            result.push({
                                fileName: file.name,
                                content: file.text
                            });
                        });
                    } catch (err) {
                    }
                }
                ;

                return {
                    source: result,
                    errors: errors
                };
            };

            ISense.prototype.setCompilationSettings = function (options) {
                var compOptions = new TypeScript.CompilationSettings();

                for (var i in options) {
                    compOptions[i] = options[i];
                }

                this.lsHost.setCompilationSettings(compOptions);
            };

            ISense.prototype.getDependencyGraph = function () {
                var result = [];
                var scripts = this.lsHost.scripts;
                for (var fileName in scripts) {
                    var script = scripts[fileName];
                    var entry = {
                        src: script.fileName,
                        ref: []
                    };

                    var i = TypeScript.ScriptSnapshot.fromString(script.content);
                    var refs = TypeScript.getReferencedFiles(script.fileName, i);

                    // ast.buildControlFlow();
                    // var ast = this.ls.getScriptSyntaxAST(script.name).getScript();
                    refs.forEach(function (file) {
                        entry.ref.push(file.path);
                    });
                    result.push(entry);
                }
                ;
                return result;
            };

            /**
            * Get the content of a script
            * @param name Script name
            */
            ISense.prototype.getScriptContent = function (fileName) {
                var script = this.lsHost.scripts[fileName];
                if (script)
                    return script.content;
            };

            ISense.prototype.splice = function (str, start, max, replacement) {
                return str.substring(0, start) + replacement + str.substring(max);
            };

            ISense.prototype.getFormattedTextForRange = function (fileName, start, end) {
                var options = new Services.FormatCodeOptions();
                options.NewLineCharacter = "\n";
                var edits = this.ls.getFormattingEditsForRange(fileName, start, end, options);
                var result = this.getScriptContent(fileName);
                var offset = 0;
                for (var i = 0; i < edits.length; i++) {
                    var edit = edits[i];
                    result = this.splice(result, edit.minChar + offset, edit.limChar + offset, edit.text);
                    offset += edit.text.length - (edit.limChar - edit.minChar);
                }
                return result;
            };

            // Quick hack to get access to the language services
            ISense.prototype.languageService = function (operation, params) {
                var result = this.ls[operation].call(this.ls, params);
                return result;
            };

            /**
            * Add a new script to the compiler environment
            */
            ISense.prototype.addScript = function (fileName, content) {
                this.lsHost.addScript(fileName, content);
            };

            /**
            * Get the errors for either one script or for
            * all the scripts
            * @param fileName name of the script. If none provided the errors
            * for all scripts will be returned.
            */
            ISense.prototype.getErrors = function (fileName) {
                var result;
                var errors = this.ls.getSemanticDiagnostics(fileName);
                var errors2 = this.ls.getSyntacticDiagnostics(fileName);
                result = this.convertErrors(errors);
                result = result.concat(this.convertErrors(errors2));
                return result;
            };

            // updated the content of a script
            ISense.prototype.updateScript = function (fileName, content) {
                this.lsHost.updateScript(fileName, content);
            };

            // Get an Ace Range from TS minChars and limChars
            ISense.prototype.getRange = function (fileName, minChar, limChar) {
                var result = {
                    start: this.positionToLineCol(fileName, minChar),
                    end: this.positionToLineCol(fileName, limChar)
                };
                return result;
            };

            // Get the chars offset based on the Ace position
            ISense.prototype.getPositionFromCursor = function (fileName, cursor) {
                var script = this.getScript(fileName);
                var pos = script.getLineMap().getPosition(cursor.row, cursor.column);

                // Determine the position
                // var pos = lineMap[cursor.row + 1] + cursor.column;
                // console.log(pos);
                return pos;
            };

            // Get the position
            ISense.prototype.getTypeAtPosition = function (fileName, coord) {
                var pos = this.getPositionFromCursor(fileName, coord);
                var result = this.ls.getTypeAtPosition(fileName, pos);
                if (result)
                    result.description = TypeScript.MemberName.memberNameToString(result.memberName);
                return result;
            };

            // Determine type of autocompletion
            ISense.prototype.determineAutoCompleteType = function (source, pos) {
                var identifyerMatch = /[0-9A-Za-z_\$]*$/;
                var previousCode = source.substring(0, pos);

                var match = previousCode.match(identifyerMatch);
                var newPos = pos;
                var memberMode = false;
                if (match && match[0])
                    newPos = pos - match[0].length;
                if (source[newPos - 1] === '.')
                    memberMode = true;

                var result = {
                    pos: newPos,
                    memberMode: memberMode
                };

                // console.log("Autocompletion determine: " + JSON.stringify(result));
                return result;
            };

            /**
            * Retieve the line that contains a certain range
            */
            ISense.prototype.getLine = function (fileName, minChar, limChar) {
                var content = this.getScriptContent(fileName);
                var min = content.substring(0, minChar).lastIndexOf("\n");
                var max = content.substring(limChar).indexOf("\n");
                return content.substring(min + 1, limChar + max);
            };

            ISense.prototype.getNavigateToItems = function (search) {
                var results = this.ls.getNavigateToItems(search);
                return this.convertNavigateTo(results);
            };

            ISense.prototype.getScriptLexicalStructure = function (fileName) {
                var results = this.ls.getScriptLexicalStructure(fileName);
                var finalResults = results.filter(function (entry) {
                    return entry.fileName === fileName;
                });
                return this.convertNavigateTo(finalResults);
            };

            ISense.prototype.getOutliningRegions = function (fileName) {
                var results = this.ls.getOutliningRegions(fileName);
                return this.convertNavigateTo2(fileName, results);
            };

            // generic wrapper for info at a certain position
            ISense.prototype.getInfoAtPosition = function (method, fileName, cursor) {
                var pos = this.getPositionFromCursor(fileName, cursor);
                var result = [];
                var entries = this.ls[method](fileName, pos);
                for (var i = 0; i < entries.length; i++) {
                    var ref = entries[i];
                    result.push({
                        fileName: ref.fileName,
                        range: this.getRange(ref.fileName, ref.minChar, ref.limChar),
                        message: this.getLine(ref.fileName, ref.minChar, ref.limChar)
                    });
                }
                return result;
            };

            ISense.prototype.autoComplete = function (cursor, fileName) {
                var pos = this.getPositionFromCursor(fileName, cursor);
                var memberMode = false;
                var source = this.getScriptContent(fileName);
                var type = this.determineAutoCompleteType(source, pos);

                /*
                if (type === "member") {
                memberMode = true;
                }
                */
                // Lets find out what autocompletion there is possible
                var completions = this.ls.getCompletionsAtPosition(fileName, type.pos, type.memberMode);

                completions.entries.sort(caseInsensitiveSort);
                return completions;
            };
            return ISense;
        })();

        var tsh = new ISense();

        addEventListener('message', function (e) {
            var msg = e["data"];

            var method = msg.method;
            var id = msg.id;
            var params = msg.params;
            try  {
                var result;
                var obj;
                if (tsh[method])
                    obj = tsh;
else
                    tsh.ls;
                result = obj[method].apply(obj, params);
                postMessage({ id: id, result: result }, null);
            } catch (err) {
                var error = {
                    description: err.description,
                    stack: err.stack
                };
                console.log("Error during processing message " + method);
                postMessage({ id: id, error: error }, null);
            }
        }, false);
    })(Cats.TSWorker || (Cats.TSWorker = {}));
    var TSWorker = Cats.TSWorker;
})(Cats || (Cats = {}));
