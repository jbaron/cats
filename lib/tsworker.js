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
    (function (Severity) {
        Severity[Severity["Info"] = 0] = "Info";
        Severity[Severity["Warning"] = 1] = "Warning";
        Severity[Severity["Error"] = 2] = "Error";
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
                TSWorker.console.log("Called fileExist" + path);
                return true;
            };

            LanguageServiceHost.prototype.directoryExists = function (path) {
                TSWorker.console.log("Called directoryExist" + path);
                return true;
            };

            LanguageServiceHost.prototype.getParentDirectory = function (path) {
                TSWorker.console.log("Called getParentDirectory" + path);
                return "";
            };

            LanguageServiceHost.prototype.resolveRelativePath = function (path, directory) {
                TSWorker.console.log("Called resolveRelativePath p1:" + path + " p2:" + directory);
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
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
importScripts("../static/js/typescriptServices.js");

var Cats;
(function (Cats) {
    (function (TSWorker) {
        var ObjectModel = (function (_super) {
            __extends(ObjectModel, _super);
            function ObjectModel() {
                _super.call(this);
                this.classNames = {};
            }
            ObjectModel.prototype.visitClassDeclaration = function (node) {
                var className = node.identifier.text();
                if (!this.classNames[className])
                    this.classNames[className] = [];
                this.lastClass = this.classNames[className];
                _super.prototype.visitClassDeclaration.call(this, node);
            };

            ObjectModel.prototype.visitMemberFunctionDeclaration = function (node) {
                var methodName = node.propertyName.text();
                this.lastClass.push(methodName);
                _super.prototype.visitMemberFunctionDeclaration.call(this, node);
            };
            return ObjectModel;
        })(TypeScript.PositionTrackingWalker);

        /**
        * Simple function to stub console.log functionality since this is
        * not available in a worker.
        */
        TSWorker.console = {
            log: function (str) {
                postMessage({ method: "console", data: str }, null);
            },
            error: function (str) {
                postMessage({ method: "console", data: str }, null);
            },
            info: function (str) {
                postMessage({ method: "console", data: str }, null);
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

                // this.ls = new TypeScript.Services.TypeScriptServicesFactory().createLanguageService(this.lsHost);
                this.ls = new TypeScript.Services.TypeScriptServicesFactory().createPullLanguageService(this.lsHost);
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
                var walker = new ObjectModel();
                this.lsHost.getScriptFileNames().forEach(function (script) {
                    _this.ls.getSyntaxTree(script).sourceUnit().accept(walker);
                });
                var result = walker.classNames;
                return result;
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
                if (typeof severity === "undefined") { severity = 2 /* Error */; }
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

                var newErrors = this.convertErrors(fileErrors, 2 /* Error */);
                errors = errors.concat(newErrors);

                fileErrors = this.ls.getSemanticDiagnostics(fileName);
                newErrors = this.convertErrors(fileErrors, 1 /* Warning */);

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
                var newErrors = this.convertErrors(compilerSettingsErrors, 2 /* Error */);

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
            * Configure the compiler settings
            */
            ISense.prototype.setCompilationSettings = function (options) {
                var compOptions = new TypeScript.CompilationSettings();

                for (var i in options) {
                    compOptions[i] = options[i];
                }

                this.lsHost.setCompilationSettings(compOptions);
                return compOptions;
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
                var options = new TypeScript.Services.FormatCodeOptions();
                var result = this.getScriptContent(fileName);

                options.NewLineCharacter = "\n";
                if (end === -1)
                    end = result.length;

                var edits = this.ls.getFormattingEditsForRange(fileName, start, end, options);

                var offset = 0;
                for (var i = 0; i < edits.length; i++) {
                    var edit = edits[i];
                    result = this.splice(result, edit.minChar + offset, edit.limChar + offset, edit.text);
                    offset += edit.text.length - (edit.limChar - edit.minChar);
                }
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
                var completions = this.ls.getCompletionsAtPosition(fileName, type.pos, type.memberMode) || {};
                if (!completions.entries)
                    completions.entries = []; // @Bug in TS
                completions.entries.sort(caseInsensitiveSort); // Sort case insensitive
                return completions;
            };
            return ISense;
        })();

        function setBusy(value) {
            postMessage({ method: "setBusy", data: value }, null);
        }

        /*******************************************************************
        Create and initiate the message listener for incomming messages
        *******************************************************************/
        var tsh;

        addEventListener('message', function (e) {
            if (!tsh)
                tsh = new ISense();

            setBusy(true);
            var msg = e["data"];

            var method = msg.method;
            var id = msg.id;
            var params = msg.params;
            try  {
                var result;

                /*
                var obj:any;
                if (tsh[method])
                obj = tsh
                else
                tsh.ls;
                */
                result = tsh[method].apply(tsh, params);
                postMessage({ id: id, result: result }, null);
            } catch (err) {
                var error = {
                    description: err.description,
                    stack: err.stack
                };
                TSWorker.console.error("Error during processing message " + method);
                postMessage({ id: id, error: error }, null);
            } finally {
                setBusy(false);
            }
        }, false);
    })(Cats.TSWorker || (Cats.TSWorker = {}));
    var TSWorker = Cats.TSWorker;
})(Cats || (Cats = {}));
