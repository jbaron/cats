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
* This section contain the common interfaces and enumerations that are being used to
* transfer data between the worker and the main thread.
*/
var Cats;
(function (Cats) {
    var Attribute = (function () {
        function Attribute() {
        }
        return Attribute;
    })();
    Cats.Attribute = Attribute;

    (function (Severity) {
        Severity[Severity["Info"] = "info"] = "Info";
        Severity[Severity["Warning"] = "warning"] = "Warning";
        Severity[Severity["Error"] = "error"] = "Error";
    })(Cats.Severity || (Cats.Severity = {}));
    var Severity = Cats.Severity;
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
var Cats;
(function (Cats) {
    // This is based on the harness.ts file from TypeScript
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
                    this.lineMap = TypeScript.LineMap1.fromString(this.content);
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

            LanguageServiceHost.prototype.getScriptByteOrderMark = function (fileName) {
                return null;
            };

            LanguageServiceHost.prototype.getLocalizedDiagnosticMessages = function () {
                // console.log("Called getLocalizedDiagnosticMessages");
            };

            //////////////////////////////////////////////////////////////////////
            // IReferenceResolverHost implementation
            LanguageServiceHost.prototype.fileExists = function (path) {
                TSWorker.console.info("Called fileExist" + path);
                return true;
            };

            LanguageServiceHost.prototype.directoryExists = function (path) {
                TSWorker.console.info("Called directoryExist" + path);
                return true;
            };

            LanguageServiceHost.prototype.getParentDirectory = function (path) {
                TSWorker.console.info("Called getParentDirectory" + path);
                return "";
            };

            LanguageServiceHost.prototype.resolveRelativePath = function (path, directory) {
                TSWorker.console.info("Called resolveRelativePath p1:" + path + " p2:" + directory);
                return path;
            };

            LanguageServiceHost.prototype.getScriptSnapshot = function (fileName) {
                var script = this.scripts[fileName];
                var result = TypeScript.ScriptSnapshot.fromString(script.content);

                // Quick hack
                result.getTextChangeRangeSinceVersion = function (version) {
                    return null;
                    // return new TypeScript.TextChangeRange(new TypeScript.TextSpan(0, script.content.length),script.content.length);
                };

                return result;
            };

            //////////////////////////////////////////////////////////////////////
            // local implementation
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
importScripts("../resource/typescriptServices.js");

var Cats;
(function (Cats) {
    (function (TSWorker) {
        /**
        * Simple function to stub console.log functionality since this is
        * not available in a worker.
        */
        TSWorker.console = {
            log: function (str) {
                postMessage({ method: "console", params: ["log", str] }, null);
            },
            error: function (str) {
                postMessage({ method: "console", params: ["error", str] }, null);
            },
            info: function (str) {
                postMessage({ method: "console", params: ["info", str] }, null);
            }
        };

        /**
        * Case insensitive sorting algoritme
        */
        function caseInsensitiveSort(a, b) {
            if (a.name.toLowerCase() < b.name.toLowerCase())
                return -1;
            if (a.name.toLowerCase() > b.name.toLowerCase())
                return 1;

            // the lower-case strings are equal, so now put them in local order..
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
                this.maxErrors = 100;
                this.lsHost = new TSWorker.LanguageServiceHost();
                this.ls = new TypeScript.Services.TypeScriptServicesFactory().createPullLanguageService(this.lsHost);
                this.formatOptions = new TypeScript.Services.FormatCodeOptions();
                this.formatOptions.NewLineCharacter = "\n";
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
            ISense.prototype.positionToLineCol = function (script, position) {
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

            ISense.prototype.getObjectModel = function () {
                var _this = this;
                //Force all symbols to be created.
                this.getAllDiagnostics();

                var mc = new TSWorker.ModelCreator();
                this.lsHost.getScriptFileNames().forEach(function (script) {
                    if (script.indexOf("lib.d.ts") > 0)
                        return;
                    var doc = _this.ls["compiler"].getDocument(script);
                    mc.parse(doc);
                });
                return mc.getModel();
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
            ISense.prototype.convertErrors = function (errors, severity) {
                var _this = this;
                if (typeof severity === "undefined") { severity = Cats.Severity.Error; }
                if (!(errors && errors.length))
                    return [];

                var result = [];
                errors.forEach(function (error) {
                    var r = _this.getRange(error.fileName(), error.start(), error.start() + error.length());
                    result.push({
                        range: r,
                        severity: severity,
                        message: error.message(),
                        fileName: error.fileName()
                    });
                });
                return result;
            };

            /**
            * Get the errors for either one script or for
            * all the scripts
            * @param fileName name of the script. If none provided the errors
            * for all scripts will be returned.
            */
            ISense.prototype.getErrors = function (fileName) {
                var errors = [];
                var fileErrors = this.ls.getSyntacticDiagnostics(fileName);

                var newErrors = this.convertErrors(fileErrors, Cats.Severity.Error);
                errors = errors.concat(newErrors);

                fileErrors = this.ls.getSemanticDiagnostics(fileName);
                newErrors = this.convertErrors(fileErrors, Cats.Severity.Warning);

                errors = errors.concat(newErrors);

                return errors;
            };

            /**
            * Get the diagnostic messages for all the files that
            * are regsitered in this worker
            */
            ISense.prototype.getAllDiagnostics = function () {
                var scripts = this.lsHost.scripts;
                var errors = [];

                for (var fileName in scripts) {
                    errors = errors.concat(this.getErrors(fileName));
                }

                var compilerSettingsErrors = this.ls.getCompilerOptionsDiagnostics();
                var newErrors = this.convertErrors(compilerSettingsErrors, Cats.Severity.Error);

                errors = errors.concat(newErrors);

                return errors;
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

                        emitOutput.outputFiles.forEach(function (file) {
                            result.push({
                                fileName: file.name,
                                content: file.text
                            });
                        });

                        // No need to request other files if there is only one output file
                        if (this.lsHost.getCompilationSettings().outFileOption) {
                            break;
                        }
                    } catch (err) {
                    }
                }
                ;

                errors = this.getAllDiagnostics();
                TSWorker.console.info("Errors found: " + errors.length);
                return {
                    source: result,
                    errors: errors
                };
            };

            /**
            * Configure the compilation settings. Use a mixin to overwrite only the values
            * that are set, leave the other ones the default value.
            */
            ISense.prototype.setSettings = function (compilerOptions, editorOptions) {
                var compOptions = new TypeScript.CompilationSettings();

                for (var i in compilerOptions) {
                    compOptions[i] = compilerOptions[i];
                }

                this.lsHost.setCompilationSettings(compOptions);

                this.formatOptions = new TypeScript.Services.FormatCodeOptions();
                this.formatOptions.NewLineCharacter = "\n";

                // @TODO
                //this.formatOptions.ConvertTabsToSpaces
                return compOptions;
            };

            ISense.prototype.isExecutable = function (kind) {
                if (kind === "method" || kind === "function" || kind === "constructor")
                    return true;
                return false;
            };

            /**
            * Convert the data for outline usage.
            */
            ISense.prototype.getOutlineModelData = function (data) {
                var _this = this;
                if ((!data) || (!data.length)) {
                    return [];
                }

                var parents = {};
                var root = {};

                data.forEach(function (item) {
                    var parentName = item.containerName;
                    var parent = parentName ? parents[parentName] : root;
                    if (!parent)
                        TSWorker.console.info("No Parent for " + parentName);
                    if (!parent.children)
                        parent.children = [];

                    var extension = _this.isExecutable(item.kind) ? "()" : "";
                    var script = _this.getScript(item.fileName);

                    var entry = {
                        label: item.name + extension,
                        position: _this.positionToLineCol(script, item.minChar),
                        kind: item.kind
                    };

                    var childName = parentName ? parentName + "." + item.name : item.name;
                    parents[childName] = entry;
                    parent.children.push(entry);
                });

                return root;
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

            /**
            * Normalize an array of edits by removing overlapping entries and
            * sorting entries on the minChar position.
            *
            * Copied from TypeScript shim
            */
            ISense.prototype.normalizeEdits = function (edits) {
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
                    } else {
                        throw new Error("Trying to apply overlapping edits");
                    }
                }

                return result;
            };

            /**
            * Apply an array of text edits to a string, and return the resulting string.
            *
            * Copied from TypeScript shim
            */
            ISense.prototype.applyEdits = function (content, edits) {
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

            ISense.prototype.getFormattedTextForRange = function (fileName, range) {
                var start, end;
                var content = this.getScriptContent(fileName);
                if (range == null) {
                    start = 0;
                    end = content.length;
                } else {
                    start = this.getPositionFromCursor(fileName, range.start);
                    end = this.getPositionFromCursor(fileName, range.end);
                }

                var edits = this.ls.getFormattingEditsForRange(fileName, start, end, this.formatOptions);
                var result = this.applyEdits(content, edits);
                return result;
            };

            /**
            * Add a new script to the compiler environment
            */
            ISense.prototype.addScript = function (fileName, content) {
                if (this.lsHost.scripts[fileName]) {
                    this.updateScript(fileName, content);
                } else {
                    this.lsHost.addScript(fileName, content);
                }
            };

            // updated the content of a script
            ISense.prototype.updateScript = function (fileName, content) {
                this.lsHost.updateScript(fileName, content);
            };

            // Get an Ace Range from TS minChars and limChars
            ISense.prototype.getRange = function (fileName, minChar, limChar) {
                var script = this.getScript(fileName);
                var result = {
                    start: this.positionToLineCol(script, minChar),
                    end: this.positionToLineCol(script, limChar)
                };
                return result;
            };

            // Get the chars offset based on the Ace position
            ISense.prototype.getPositionFromCursor = function (fileName, cursor) {
                var script = this.getScript(fileName);
                if (script) {
                    var pos = script.getLineMap().getPosition(cursor.row, cursor.column);
                    return pos;
                }
            };

            // Get the position
            ISense.prototype.getTypeAtPosition = function (fileName, coord) {
                var pos = this.getPositionFromCursor(fileName, coord);
                if (!pos)
                    return;
                var result = this.ls.getTypeAtPosition(fileName, pos);
                if (result)
                    result.description = TypeScript.MemberName.memberNameToString(result.memberName);
                return result;
            };

            // Determine type of autocompletion
            ISense.prototype.determineAutoCompleteType = function (fileName, pos) {
                var source = this.getScriptContent(fileName);
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

                return result;
            };

            /**
            * Retieve the line of code that contains a certain range. Used to provide the
            * user with contexts of what is found
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
                return this.getOutlineModelData(finalResults);
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

            /**
            * Determine the possible completions available at a certain position in a file.
            */
            ISense.prototype.getCompletions = function (fileName, cursor) {
                if (!this.getScript(fileName))
                    return [];
                var pos = this.getPositionFromCursor(fileName, cursor);
                var memberMode = false;
                var type = this.determineAutoCompleteType(fileName, pos);

                // Lets find out what autocompletion there is possible
                var completions = this.ls.getCompletionsAtPosition(fileName, type.pos, type.memberMode) || {};
                if (!completions.entries)
                    completions.entries = []; // @Bug in TS
                completions.entries.sort(caseInsensitiveSort); // Sort case insensitive
                return completions.entries;
            };
            return ISense;
        })();

        /**
        * Indicate to the main UI thread if this worker is busy or not
        *
        * @param value true is busy, false othewise
        */
        function setBusy(value) {
            postMessage({ method: "setBusy", params: [value] }, null);
        }

        /*******************************************************************
        Create and initiate the message listener for incomming messages
        *******************************************************************/
        var tsh;

        addEventListener('message', function (e) {
            if (!tsh)
                tsh = new ISense();

            // var startTime = Date.now();
            setBusy(true);
            var msg = e["data"];

            try  {
                var result = tsh[msg.method].apply(tsh, msg.params);
                postMessage({ id: msg.id, result: result }, null);
            } catch (err) {
                var error = {
                    description: err.description,
                    stack: err.stack
                };
                TSWorker.console.error("Error during processing message " + msg.method);
                postMessage({ id: msg.id, error: error }, null);
            } finally {
                setBusy(false);
                // console.log("Method " + msg.method + " took " + (Date.now() - startTime) + "ms");
            }
        }, false);
    })(Cats.TSWorker || (Cats.TSWorker = {}));
    var TSWorker = Cats.TSWorker;
})(Cats || (Cats = {}));
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
var Cats;
(function (Cats) {
    (function (TSWorker) {
        var ModelCreator = (function () {
            function ModelCreator() {
                this.model = {};
            }
            ModelCreator.prototype.getModel = function () {
                var _this = this;
                var result = [];
                Object.keys(this.model).forEach(function (key) {
                    var entry = _this.model[key];
                    result.push(entry);
                });
                return result;
            };

            ModelCreator.prototype.parse = function (doc) {
                this.handle(doc.topLevelDecl());
            };

            ModelCreator.prototype.interest = function (kind) {
                switch (kind) {
                    case TypeScript.PullElementKind.Class:
                        return "class";
                    case TypeScript.PullElementKind.Container:
                        return "container";
                    case TypeScript.PullElementKind.Interface:
                        return "interface";
                    case TypeScript.PullElementKind.Method:
                        return "method";
                    case TypeScript.PullElementKind.Enum:
                        return "enum";
                    case TypeScript.PullElementKind.Property:
                        return "prop";
                    case TypeScript.PullElementKind.ConstructorMethod:
                        return "constructor";
                    default:
                        return null;
                }
            };

            ModelCreator.prototype.isMainNode = function (kind) {
                return ((kind === TypeScript.PullElementKind.Class) || (kind === TypeScript.PullElementKind.Interface) || (kind === TypeScript.PullElementKind.Enum));
            };

            ModelCreator.prototype.createIfNotExist = function (node) {
                var fullName = node.getSymbol().fullName();
                if (!this.model[fullName]) {
                    var entry = {
                        type: this.interest(node.kind),
                        name: fullName,
                        extends: [],
                        implements: [],
                        operations: [],
                        attributes: []
                    };
                    this.model[fullName] = entry;
                    var typeSymbol = node.getSymbol().type;

                    typeSymbol.getExtendedTypes().forEach(function (extType) {
                        entry.extends.push(extType.fullName());
                        // console.log("Extending: " + extType.fullName());
                    });

                    typeSymbol.getImplementedTypes().forEach(function (implType) {
                        entry.implements.push(implType.fullName());
                    });
                }
                return this.model[fullName];
            };

            ModelCreator.prototype.handle = function (node) {
                var _this = this;
                if (!node)
                    return;

                if (this.isMainNode(node.kind)) {
                    this.last = this.createIfNotExist(node);
                }

                if (this.interest(node.kind)) {
                    var s = node.getSymbol();
                    var fullName = s ? s.fullName() : node.name;
                    // console.log(this.interest(node.kind) + ":" + node.name + ":" + fullName) ;
                }

                if (node.kind === TypeScript.PullElementKind.Method) {
                    if (this.last)
                        this.last.operations.push(node.name);
                    return;
                }

                if (node.kind === TypeScript.PullElementKind.ConstructorMethod) {
                    if (this.last)
                        this.last.operations.push("constructor");
                    return;
                }

                if (node.kind === TypeScript.PullElementKind.Property) {
                    if (this.last) {
                        var attr = {
                            name: node.name,
                            modifiers: [],
                            type: null
                        };

                        if (node.getSymbol()) {
                            var t = node.getSymbol().getTypeName();
                            attr.type = t;
                        }
                        this.last.attributes.push(attr);
                    }
                    return;
                }

                var children = node.getChildDecls();
                if (children) {
                    children.forEach(function (child) {
                        _this.handle(child);
                    });
                }

                this.last = null;
            };
            return ModelCreator;
        })();
        TSWorker.ModelCreator = ModelCreator;
    })(Cats.TSWorker || (Cats.TSWorker = {}));
    var TSWorker = Cats.TSWorker;
})(Cats || (Cats = {}));
