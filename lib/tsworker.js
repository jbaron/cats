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
<<<<<<< HEAD
/**
 * This section contain the common interfaces and enumerations that are being used to
 * transfer data between the worker and the main thread.
 */
=======
>>>>>>> unstable
var Cats;
(function (Cats) {
    var Attribute = (function () {
        function Attribute() {
        }
        return Attribute;
    })();
    Cats.Attribute = Attribute;
<<<<<<< HEAD
=======
    ;
>>>>>>> unstable
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
// This is based on the harness.ts file from TypeScript
// Major difference is that this module uses real language services API and not the Shim.
// Licensed under the Apache License, Version 2.0. 
var Cats;
(function (Cats) {
    var TSWorker;
    (function (TSWorker) {
<<<<<<< HEAD
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
                return TypeScript.TextChangeRange.collapseChangesAcrossMultipleVersions(entries.map(function (e) { return e.textChangeRange; }));
            };
            return ScriptInfo;
        })();
        TSWorker.ScriptInfo = ScriptInfo;
=======
        /**
         * The language service host serves as the interface between the TypeScript language
         * services and the files editted within CATS.
         *
         */
>>>>>>> unstable
        var LanguageServiceHost = (function () {
            function LanguageServiceHost() {
                this.compilationSettings = null;
                this.scripts = {};
                this.setCompilationSettings();
            }
            LanguageServiceHost.prototype.getScriptFileNames = function () {
                return Object.keys(this.scripts);
            };
<<<<<<< HEAD
=======
            LanguageServiceHost.prototype.getNewLine = function () {
                return "\n";
            };
>>>>>>> unstable
            LanguageServiceHost.prototype.getScriptIsOpen = function (fileName) {
                // @FIX generates not-implemented yet error in TypeScript if return true;
                return this.getScript(fileName).isOpen();
            };
<<<<<<< HEAD
            LanguageServiceHost.prototype.getScriptByteOrderMark = function (fileName) {
                return null;
=======
            LanguageServiceHost.prototype.getCancellationToken = function () {
                // @TODO find out what this is used for
                return ts.CancellationTokenObject.None;
>>>>>>> unstable
            };
            LanguageServiceHost.prototype.getLocalizedDiagnosticMessages = function () {
                // console.log("Called getLocalizedDiagnosticMessages");
            };
<<<<<<< HEAD
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
=======
            LanguageServiceHost.prototype.getCurrentDirectory = function () {
                return "";
            };
            LanguageServiceHost.prototype.getDefaultLibFileName = function (options) {
                return "";
            };
            LanguageServiceHost.prototype.getScriptSnapshot = function (fileName) {
                var script = this.scripts[fileName];
                if (script)
                    return script.getScriptSnapshot();
            };
            LanguageServiceHost.prototype.log = function (s) {
            };
            LanguageServiceHost.prototype.trace = function (s) {
            };
            LanguageServiceHost.prototype.error = function (s) {
            };
            LanguageServiceHost.prototype.getCompilationSettings = function () {
                return this.compilationSettings;
            };
            LanguageServiceHost.prototype.getScriptVersion = function (fileName) {
                var script = this.scripts[fileName];
                return script.getVersion();
>>>>>>> unstable
            };
            //////////////////////////////////////////////////////////////////////
            // local implementation
            LanguageServiceHost.prototype.getScript = function (fileName) {
                return this.scripts[fileName];
            };
            LanguageServiceHost.prototype.addScript = function (fileName, content, ls) {
                var script = new TSWorker.ScriptInfo(fileName, content, ls);
                this.scripts[fileName] = script;
                return script;
            };
            LanguageServiceHost.prototype.updateScript = function (fileName, content) {
                var script = this.scripts[fileName];
                if (script) {
                    script.updateContent(content);
<<<<<<< HEAD
                }
                else {
                    this.addScript(fileName, content);
                }
            };
            LanguageServiceHost.prototype.editScript = function (fileName, minChar, limChar, newText) {
                var script = this.scripts[fileName];
                if (script) {
                    script.editContent(minChar, limChar, newText);
                }
                else {
                    throw new Error("No script with name '" + name + "'");
=======
                }
            };
            /*
            public editScript(fileName: string, minChar: number, limChar: number, newText: string) {
                 var script =  this.scripts[fileName];
                if (script) {
                    script.editContent(minChar, limChar, newText);
                } else {
                    throw new Error("No script with name '" + fileName + "'");
>>>>>>> unstable
                }
            }
            */
            LanguageServiceHost.prototype.setCompilationSettings = function (compilerOptions) {
                if (compilerOptions === void 0) { compilerOptions = {}; }
                var options = ts.getDefaultCompilerOptions();
                // Do a quick mixin
                for (var i in compilerOptions) {
                    options[i] = compilerOptions[i];
                }
                // Set values to avoid the compiler trying to load/resolve files
                options.emitBOM = false;
                options.noLib = true;
                options.noLibCheck = true;
                options.noResolve = true;
                this.compilationSettings = options;
            };
<<<<<<< HEAD
            //////////////////////////////////////////////////////////////////////
            // ILogger implementation
            LanguageServiceHost.prototype.information = function () {
                return false;
=======
            return LanguageServiceHost;
        })();
        TSWorker.LanguageServiceHost = LanguageServiceHost;
    })(TSWorker = Cats.TSWorker || (Cats.TSWorker = {}));
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
// This is based on the harness.ts file from TypeScript
// Major difference is that this module uses real language services API and not the Shim.
// Licensed under the Apache License, Version 2.0. 
var Cats;
(function (Cats) {
    var TSWorker;
    (function (TSWorker) {
        /**
         * This class holds the TypeScript files and expose them to the TS language services. It also
         * provides a number of basic conversions between different ways of determining the position
         * within a file.
         *
         */
        var ScriptInfo = (function () {
            function ScriptInfo(fileName, content, ls) {
                this.fileName = fileName;
                this.content = content;
                this.ls = ls;
                this.version = 1;
                this.editRanges = [];
                this.setContent(content);
            }
            ScriptInfo.prototype.setContent = function (content) {
                this.content = content;
>>>>>>> unstable
            };
            ScriptInfo.prototype.getSourceFile = function () {
                return this.ls.getSourceFile(this.fileName);
            };
            ScriptInfo.prototype.getContent = function () {
                return this.content;
            };
            ScriptInfo.prototype.isOpen = function () {
                return false; // @TODO
            };
            ScriptInfo.prototype.getVersion = function () {
                return this.version + "";
            };
<<<<<<< HEAD
            LanguageServiceHost.prototype.log = function (s) {
            };
            LanguageServiceHost.prototype.getDiagnosticsObject = function () {
=======
            ScriptInfo.prototype.updateContent = function (content) {
                this.editRanges = [];
                this.setContent(content);
                this.version++;
            };
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
            ScriptInfo.prototype.positionToLineCol = function (position) {
                var result = this.getSourceFile().getLineAndCharacterOfPosition(position);
>>>>>>> unstable
                return {
                    row: result.line,
                    column: result.character
                };
            };
<<<<<<< HEAD
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
=======
            /**
             * Get the chars offset based on the Ace position
             */
            ScriptInfo.prototype.getPositionFromCursor = function (cursor) {
                var pos = this.getSourceFile().getPositionOfLineAndCharacter(cursor.row, cursor.column);
                // var pos = this.getLineMap().getPosition(cursor.row, cursor.column);
                return pos;
            };
            /**
            * Retieve the line of code that contains a certain range. Used to provide the
            * user with contexts of what is found
            */
            ScriptInfo.prototype.getLine = function (span) {
                var end = TSWorker.spanEnd(span);
                var min = this.content.substring(0, span.start).lastIndexOf("\n");
                var max = this.content.substring(end).indexOf("\n");
                if ((span.start - min) > 100)
                    min = span.start - 100;
                if (max > 100)
                    max = 100;
                return this.content.substring(min + 1, end + max);
            };
            /**
             * Get an CATS Range from TS minChars and limChars
             */
            ScriptInfo.prototype.getRange = function (minChar, len) {
                var result = {
                    start: this.positionToLineCol(minChar),
                    end: this.positionToLineCol(minChar + len)
                };
                return result;
>>>>>>> unstable
            };
            ScriptInfo.prototype.getRangeFromSpan = function (textSpan) {
                return this.getRange(textSpan.start, textSpan.length);
            };
            /**
             * Based on the position within the script, determine if we are in member mode
             *
             */
            ScriptInfo.prototype.determineMemeberMode = function (pos) {
                var source = this.content;
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
             * Get a snapshot for this script
             */
            ScriptInfo.prototype.getScriptSnapshot = function () {
                return ts.ScriptSnapshot.fromString(this.content);
            };
            return ScriptInfo;
        })();
<<<<<<< HEAD
        TSWorker.LanguageServiceHost = LanguageServiceHost;
=======
        TSWorker.ScriptInfo = ScriptInfo;
>>>>>>> unstable
    })(TSWorker = Cats.TSWorker || (Cats.TSWorker = {}));
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
    var TSWorker;
    (function (TSWorker) {
        /**
         * Simple function to stub console.log functionality since this is
         * not available in a worker.
         */
        TSWorker.console = {
            log: function (str) {
                postMessage({ method: "console", params: ["log", str] });
            },
            error: function (str) {
                postMessage({ method: "console", params: ["error", str] });
            },
            info: function (str) {
                postMessage({ method: "console", params: ["info", str] });
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
<<<<<<< HEAD
=======
        function spanEnd(span) {
            return span.start + span.length;
        }
        TSWorker.spanEnd = spanEnd;
>>>>>>> unstable
        var ISense = (function () {
            /**
             * Create a new TypeScript ISense instance.
             *
             */
            function ISense() {
                this.maxErrors = 100;
                this.lsHost = new TSWorker.LanguageServiceHost();
                this.documentRegistry = ts.createDocumentRegistry();
                this.ls = ts.createLanguageService(this.lsHost, this.documentRegistry);
                this.formatOptions = this.getDefaultFormatOptions();
            }
            ISense.prototype.getDefaultFormatOptions = function () {
                return {
                    IndentSize: 4,
                    TabSize: 4,
                    NewLineCharacter: "\n",
                    ConvertTabsToSpaces: true,
                    InsertSpaceAfterCommaDelimiter: true,
                    InsertSpaceAfterSemicolonInForStatements: true,
                    InsertSpaceBeforeAndAfterBinaryOperators: true,
                    InsertSpaceAfterKeywordsInControlFlowStatements: true,
                    InsertSpaceAfterFunctionKeywordForAnonymousFunctions: true,
                    InsertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesis: false,
                    PlaceOpenBraceOnNewLineForFunctions: false,
                    PlaceOpenBraceOnNewLineForControlBlocks: false
                };
            };
            /**
             * Sometimes of the TS language services don't work first time
             * This method tries to fix that
             */
            ISense.prototype.initialize = function () {
                try {
<<<<<<< HEAD
                    this.ls.refresh();
=======
                    // this.ls.refresh();
>>>>>>> unstable
                    this.compile();
                }
                catch (err) {
                }
            };
<<<<<<< HEAD
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
=======
>>>>>>> unstable
            ISense.prototype.getDefinitionAtPosition = function (fileName, pos) {
                var script = this.lsHost.getScript(fileName);
                var chars = script.getPositionFromCursor(pos);
                var infos = this.ls.getDefinitionAtPosition(fileName, chars);
                if (infos) {
<<<<<<< HEAD
                    var info = infos[0]; // TODO handle better
=======
                    var info = infos[0];
                    var infoScript = this.lsHost.getScript(info.fileName);
                    // TODO handle better
>>>>>>> unstable
                    return {
                        fileName: info.fileName,
                        range: infoScript.getRangeFromSpan(info.textSpan)
                    };
                }
                else {
                    return null;
                }
            };
<<<<<<< HEAD
=======
            /**
             * Create a Class Model for project that can be used for example in the
             * UML viewer.
             */
>>>>>>> unstable
            ISense.prototype.getObjectModel = function () {
                var _this = this;
                //Force all symbols to be created.
                this.getAllDiagnostics();
                var mc = new TSWorker.ModelCreator();
                this.lsHost.getScriptFileNames().forEach(function (scriptName) {
                    if (scriptName.indexOf("lib.d.ts") > 0)
                        return;
                    var script = _this.lsHost.getScript(scriptName);
                    // var doc:ts.SourceFile = ts.createSourceFile(scriptName, script.getContent(),
                    //        this.lsHost.getCompilationSettings().target, script.getVersion());
                    /*
                    var doc = this.documentRegistry.acquireDocument(
                        scriptName,
                        this.lsHost.getCompilationSettings(),
                        script.getScriptSnapshot(),
                        script.getVersion(),
                        script.isOpen()
                    );
                    */
                    var doc = script.getSourceFile();
                    mc.parse(doc);
                    _this.documentRegistry.releaseDocument(scriptName, _this.lsHost.getCompilationSettings());
                });
                return mc.getModel();
            };
            /**
             * Convert Services to Cats NavigateToItems
<<<<<<< HEAD
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
=======
             */
            ISense.prototype.convertNavigateTo = function (item) {
                var script = this.lsHost.getScript(item.fileName);
                var result = {
                    range: script.getRangeFromSpan(item.textSpan),
                    name: item.name,
                    fileName: item.fileName,
                    kind: item.kind
                };
>>>>>>> unstable
                return result;
            };
            /**
             * Convert the errors from a TypeScript format into Cats format
             */
            ISense.prototype.convertErrors = function (errors, severity) {
                var _this = this;
                if (severity === void 0) { severity = Cats.Severity.Error; }
                if (!(errors && errors.length))
                    return [];
<<<<<<< HEAD
                var result = [];
                errors.forEach(function (error) {
                    var r = _this.getRange(error.fileName(), error.start(), error.start() + error.length());
                    result.push({
                        range: r,
=======
                return errors.map(function (error) {
                    var script = _this.lsHost.getScript(error.file.fileName);
                    return {
                        range: script.getRange(error.start, error.length),
>>>>>>> unstable
                        severity: severity,
                        message: error.messageText,
                        fileName: error.file.fileName
                    };
                });
            };
            /**
             * Get the errors for either one script or for
             * all the scripts
<<<<<<< HEAD
=======
             *
>>>>>>> unstable
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
<<<<<<< HEAD
             * are regsitered in this worker
=======
             * are registered in this worker
>>>>>>> unstable
             */
            ISense.prototype.getAllDiagnostics = function () {
                var _this = this;
                var errors = [];
<<<<<<< HEAD
                for (var fileName in scripts) {
                    errors = errors.concat(this.getErrors(fileName));
                }
=======
                this.lsHost.getScriptFileNames().forEach(function (fileName) {
                    errors = errors.concat(_this.getErrors(fileName));
                });
>>>>>>> unstable
                var compilerSettingsErrors = this.ls.getCompilerOptionsDiagnostics();
                var newErrors = this.convertErrors(compilerSettingsErrors, Cats.Severity.Error);
                errors = errors.concat(newErrors);
                return errors;
            };
<<<<<<< HEAD
            /**
=======
            ISense.prototype.convertTodoNavigate = function (fileName, todos) {
                var script = this.lsHost.getScript(fileName);
                return todos.map(function (todo) {
                    var entry = {
                        range: script.getRange(todo.position, todo.descriptor.text.length),
                        fileName: fileName,
                        message: todo.message
                    };
                    return entry;
                });
            };
            /**
             * Get the various annotations in the comments, like TODO items.
             */
            ISense.prototype.getTodoItems = function () {
                var _this = this;
                var descriptors = [
                    { text: "@TODO", priority: 1 },
                    { text: "@BUG", priority: 1 },
                    { text: "@FIXME", priority: 1 },
                    { text: "TODO", priority: 1 },
                ];
                var result = [];
                this.lsHost.getScriptFileNames().forEach(function (fileName) {
                    var comments = _this.ls.getTodoComments(fileName, descriptors);
                    var entries = _this.convertTodoNavigate(fileName, comments);
                    result = result.concat(entries);
                });
                return result;
            };
            /**
>>>>>>> unstable
             * Compile the loaded TS files and return the
             * compiles JS sources and errors (if any).
             */
            ISense.prototype.compile = function () {
<<<<<<< HEAD
                var scripts = this.lsHost.scripts;
                var result = [];
                var errors = [];
                for (var fileName in scripts) {
                    try {
=======
                var scripts = this.lsHost.getScriptFileNames();
                var result = [];
                var errors = [];
                for (var x = 0; x < scripts.length; x++) {
                    try {
                        var fileName = scripts[x];
>>>>>>> unstable
                        var emitOutput = this.ls.getEmitOutput(fileName);
                        emitOutput.outputFiles.forEach(function (file) {
                            result.push({
                                fileName: file.name,
                                content: file.text
                            });
                        });
                        // No need to request other files if there is only one output file
                        if (result.length > 0 && this.lsHost.getCompilationSettings().out) {
                            break;
                        }
                    }
                    catch (err) {
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
<<<<<<< HEAD
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
=======
             * Configure the compilation and format settings.
             * Tthis method uses a simple mixin to overwrite only the values
             * that are set, leave the other ones at the default value.
             */
            ISense.prototype.setSettings = function (compilerOptions, editorOptions) {
                this.lsHost.setCompilationSettings(compilerOptions);
                this.formatOptions = this.getDefaultFormatOptions();
                // Do a quick mixin
                for (var i in editorOptions) {
                    this.formatOptions[i] = editorOptions[i];
                }
>>>>>>> unstable
            };
            ISense.prototype.isExecutable = function (kind) {
                if (kind === "method" || kind === "function" || kind === "constructor")
                    return true;
                return false;
            };
            /**
             * Convert the data for outline usage.
             */
<<<<<<< HEAD
            ISense.prototype.getOutlineModelData = function (data) {
=======
            ISense.prototype.getOutlineModelData = function (fileName, data) {
>>>>>>> unstable
                var _this = this;
                if ((!data) || (!data.length)) {
                    return [];
                }
<<<<<<< HEAD
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
=======
                var result = [];
                var script = this.lsHost.getScript(fileName);
                data.forEach(function (item) {
                    var extension = _this.isExecutable(item.kind) ? "()" : "";
>>>>>>> unstable
                    var entry = {
                        label: item.text + extension,
                        pos: script.positionToLineCol(item.spans[0].start),
                        kind: item.kind,
                        kids: null
                    };
<<<<<<< HEAD
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
=======
                    entry.kids = _this.getOutlineModelData(fileName, item.childItems);
                    result.push(entry);
                });
                return result;
>>>>>>> unstable
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
                    var result = a.edit.span.start - b.edit.span.start;
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
<<<<<<< HEAD
                    var gap = nextEdit.minChar - currentEdit.limChar;
=======
                    var gap = nextEdit.span.start - spanEnd(currentEdit.span);
>>>>>>> unstable
                    // non-overlapping edits
                    if (gap >= 0) {
                        result.push(currentEdit);
                        current = next;
                        next++;
                        continue;
                    }
                    // overlapping edits: for now, we only support ignoring an next edit 
                    // entirely contained in the current edit.
                    if (spanEnd(currentEdit.span) >= spanEnd(nextEdit.span)) {
                        next++;
                        continue;
                    }
                    else {
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
                    var prefix = result.substring(0, edit.span.start);
                    var middle = edit.newText;
                    var suffix = result.substring(edit.span.start + edit.span.length);
                    result = prefix + middle + suffix;
                }
                return result;
            };
            ISense.prototype.getFormattedTextForRange = function (fileName, range) {
                var start, end;
                var script = this.lsHost.getScript(fileName);
                var content = script.getContent();
                if (range == null) {
                    start = 0;
                    end = content.length;
<<<<<<< HEAD
                }
                else {
                    start = this.getPositionFromCursor(fileName, range.start);
                    end = this.getPositionFromCursor(fileName, range.end);
                }
=======
                }
                else {
                    start = script.getPositionFromCursor(range.start);
                    end = script.getPositionFromCursor(range.end);
                }
>>>>>>> unstable
                var edits = this.ls.getFormattingEditsForRange(fileName, start, end, this.formatOptions);
                var result = this.applyEdits(content, edits);
                return result;
            };
            /**
             * Add a new script to the compiler environment
             */
            ISense.prototype.addScript = function (fileName, content) {
                if (this.lsHost.getScript(fileName)) {
                    this.updateScript(fileName, content);
                }
                else {
<<<<<<< HEAD
                    this.lsHost.addScript(fileName, content);
=======
                    var script = this.lsHost.addScript(fileName, content, this.ls);
>>>>>>> unstable
                }
            };
            // updated the content of a script
            ISense.prototype.updateScript = function (fileName, content) {
                this.lsHost.updateScript(fileName, content);
            };
<<<<<<< HEAD
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
=======
            /**
             * Get the info at a certain position. Used for the tooltip in the editor
             *
             */
            ISense.prototype.getInfoAtPosition = function (fileName, coord) {
                var script = this.lsHost.getScript(fileName);
                var pos = script.getPositionFromCursor(coord);
                if (!pos)
                    return;
                var info = this.ls.getQuickInfoAtPosition(fileName, pos);
                if (!info)
                    return {};
>>>>>>> unstable
                var result = {
                    description: ts.displayPartsToString(info.displayParts),
                    docComment: ts.displayPartsToString(info.documentation)
                };
                return result;
            };
<<<<<<< HEAD
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
=======
>>>>>>> unstable
            ISense.prototype.getNavigateToItems = function (search) {
                var results = this.ls.getNavigateToItems(search);
                return results.map(this.convertNavigateTo);
            };
<<<<<<< HEAD
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
=======
            ISense.prototype.getScriptOutline = function (fileName) {
                var result = this.ls.getNavigationBarItems(fileName);
                return this.getOutlineModelData(fileName, result);
            };
            ISense.prototype.getRenameInfo = function (fileName, cursor) {
                var script = this.lsHost.getScript(fileName);
                var pos = script.getPositionFromCursor(cursor);
                var result = this.ls.getRenameInfo(fileName, pos);
                return result;
            };
            ISense.prototype.findRenameLocations = function (fileName, position, findInStrings, findInComments) {
                var script = this.lsHost.getScript(fileName);
                var pos = script.getPositionFromCursor(position);
                var result = [];
                var entries = this.ls.findRenameLocations(fileName, pos, findInStrings, findInComments);
                for (var i = 0; i < entries.length; i++) {
                    var ref = entries[i];
                    var refScript = this.lsHost.getScript(ref.fileName);
                    result.push({
                        fileName: ref.fileName,
                        range: refScript.getRangeFromSpan(ref.textSpan),
                        message: refScript.getLine(ref.textSpan)
                    });
                }
                return result;
            };
            /**
             * Generic method to get references, implementations or occurences of a certain
             * element at a position in a source file.
             *
             *    getReferencesAtPosition
             *    getOccurrencesAtPosition
             *    getImplementorsAtPosition
             */
            ISense.prototype.getCrossReference = function (method, fileName, cursor) {
                var script = this.lsHost.getScript(fileName);
                var pos = script.getPositionFromCursor(cursor);
>>>>>>> unstable
                var result = [];
                var entries;
                switch (method) {
                    case "getReferencesAtPosition":
                        entries = this.ls.getReferencesAtPosition(fileName, pos);
                        break;
                    case "getOccurrencesAtPosition":
                        entries = this.ls.getOccurrencesAtPosition(fileName, pos);
                        break;
                    case "getImplementorsAtPosition":
                        entries = []; // @TODO this.ls.getImplementorsAtPosition(fileName, pos);
                        break;
                }
                if (!entries)
                    return result;
                for (var i = 0; i < entries.length; i++) {
                    var ref = entries[i];
                    var refScript = this.lsHost.getScript(ref.fileName);
                    result.push({
                        fileName: ref.fileName,
                        range: refScript.getRangeFromSpan(ref.textSpan),
                        message: refScript.getLine(ref.textSpan)
                    });
                }
                return result;
            };
            /**
             * Determine the possible completions available at a certain position in a file.
             */
            ISense.prototype.getCompletions = function (fileName, cursor) {
                var script = this.lsHost.getScript(fileName);
                if (!script)
                    return [];
                var pos = script.getPositionFromCursor(cursor);
                var memberMode = false;
<<<<<<< HEAD
                var type = this.determineAutoCompleteType(fileName, pos);
                // Lets find out what autocompletion there is possible		
                var completions = this.ls.getCompletionsAtPosition(fileName, type.pos, type.memberMode) || {};
=======
                var type = script.determineMemeberMode(pos);
                // Lets find out what autocompletion there is possible		
                var completions = this.ls.getCompletionsAtPosition(fileName, type.pos) || {};
>>>>>>> unstable
                if (!completions.entries)
                    return []; // @Bug in TS
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
<<<<<<< HEAD
        function setBusy(value) {
            postMessage({ method: "setBusy", params: [value] }, null);
=======
        function setBusy(value, methodName) {
            postMessage({ method: "setBusy", params: [value, methodName] });
>>>>>>> unstable
        }
        /*******************************************************************
          Create and initiate the message listener for incomming messages
         *******************************************************************/
        var tsh;
        addEventListener('message', function (e) {
            if (!tsh)
                tsh = new ISense();
<<<<<<< HEAD
            // var startTime = Date.now();
            setBusy(true);
            var msg = e["data"];
            try {
                var result = tsh[msg.method].apply(tsh, msg.params);
                postMessage({ id: msg.id, result: result }, null);
=======
            var msg = e["data"];
            var methodName = msg.method;
            var params = msg.params;
            setBusy(true, methodName);
            try {
                var fn = tsh[methodName];
                var result = fn.apply(tsh, params);
                postMessage({ id: msg.id, result: result });
>>>>>>> unstable
            }
            catch (err) {
                var error = {
                    description: err.description,
                    stack: err.stack,
                    method: methodName
                };
<<<<<<< HEAD
                TSWorker.console.error("Error during processing message " + msg.method);
                postMessage({ id: msg.id, error: error }, null);
            }
            finally {
                setBusy(false);
=======
                TSWorker.console.error("Error during processing message " + methodName);
                postMessage({ id: msg.id, error: error });
            }
            finally {
                setBusy(false, methodName);
>>>>>>> unstable
            }
        }, false);
    })(TSWorker = Cats.TSWorker || (Cats.TSWorker = {}));
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
    var TSWorker;
    (function (TSWorker) {
        /**
         * Creates a class model to be used for displaying as an UML diagram
         *
         * @TODO Fix this using the new language service API. Right now disabled.
         */
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
                this.last = null;
                this.handle(doc);
            };
<<<<<<< HEAD
=======
            ModelCreator.prototype.handle = function (node) {
                var _this = this;
                if (!node)
                    return;
                try {
                    if (this.isTopLevelNode(node.kind)) {
                        this.last = this.createIfNotExist(node);
                    }
                    if (this.interest(node.kind)) {
                        var s = node.symbol;
                        var fullName = s ? s.getName() : node.id;
                    }
                    if (node.kind === 132 /* MethodDeclaration */) {
                        if (this.last)
                            this.last.operations.push(node.name["text"]);
                        return;
                    }
                    if (node.kind === 133 /* Constructor */) {
                        if (this.last)
                            this.last.operations.push("constructor");
                        return;
                    }
                    if (node.kind === 130 /* PropertyDeclaration */) {
                        if (this.last) {
                            var attr = {
                                name: node.name["text"],
                                modifiers: [],
                                type: null
                            };
                            if (node["type"]) {
                                var t = node["type"].getText(); // node.symbol.valueDeclaration;
                                attr.type = t;
                            }
                            this.last.attributes.push(attr);
                        }
                        return;
                    }
                    var children = node.getChildren();
                    if (children) {
                        children.forEach(function (child) {
                            _this.handle(child);
                        });
                    }
                }
                catch (err) {
                    TSWorker.console.log(err.stack);
                    return;
                }
            };
            ModelCreator.prototype.isTopLevelNode = function (kind) {
                return ((kind === 196 /* ClassDeclaration */) || (kind === 197 /* InterfaceDeclaration */) || (kind === 199 /* EnumDeclaration */));
            };
            /**
             * What type of node are we interested in
             */
>>>>>>> unstable
            ModelCreator.prototype.interest = function (kind) {
                switch (kind) {
                    case 196 /* ClassDeclaration */:
                        return "class";
                    case 200 /* ModuleDeclaration */:
                        return "container";
                    case 197 /* InterfaceDeclaration */:
                        return "interface";
                    case 132 /* MethodDeclaration */:
                        return "method";
                    case 199 /* EnumDeclaration */:
                        return "enum";
                    case 130 /* PropertyDeclaration */:
                        return "prop";
                    case 133 /* Constructor */:
                        return "constructor";
                    default:
                        return null;
                }
            };
<<<<<<< HEAD
            ModelCreator.prototype.isMainNode = function (kind) {
                return ((kind === TypeScript.PullElementKind.Class) || (kind === TypeScript.PullElementKind.Interface) || (kind === TypeScript.PullElementKind.Enum));
=======
            ModelCreator.prototype.getName = function (node) {
                return node.getText();
>>>>>>> unstable
            };
            ModelCreator.prototype.createIfNotExist = function (node) {
                var fullName = node.name.text;
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
<<<<<<< HEAD
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
=======
                }
                return this.model[fullName];
            };
>>>>>>> unstable
            return ModelCreator;
        })();
        TSWorker.ModelCreator = ModelCreator;
    })(TSWorker = Cats.TSWorker || (Cats.TSWorker = {}));
})(Cats || (Cats = {}));
