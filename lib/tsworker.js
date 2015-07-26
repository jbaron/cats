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
    var Attribute = (function () {
        function Attribute() {
        }
        return Attribute;
    })();
    Cats.Attribute = Attribute;
    ;
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
        /**
         * The language service host serves as the interface between the TypeScript language
         * services and the files editted within CATS.
         *
         */
        var LanguageServiceHost = (function () {
            function LanguageServiceHost() {
                this.compilationSettings = null;
                this.scripts = {};
                this.setCompilationSettings();
            }
            LanguageServiceHost.prototype.getScriptFileNames = function () {
                return Object.keys(this.scripts);
            };
            LanguageServiceHost.prototype.getNewLine = function () {
                return "\n";
            };
            LanguageServiceHost.prototype.getScriptIsOpen = function (fileName) {
                // @FIX generates not-implemented yet error in TypeScript if return true;
                return this.getScript(fileName).isOpen();
            };
            LanguageServiceHost.prototype.getCancellationToken = function () {
                // @TODO find out what this is used for
                return ts.CancellationTokenObject.None;
            };
            LanguageServiceHost.prototype.getLocalizedDiagnosticMessages = function () {
                // console.log("Called getLocalizedDiagnosticMessages");
            };
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
                }
            };
            /*
            public editScript(fileName: string, minChar: number, limChar: number, newText: string) {
                 var script =  this.scripts[fileName];
                if (script) {
                    script.editContent(minChar, limChar, newText);
                } else {
                    throw new Error("No script with name '" + fileName + "'");
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
                options.noLib = true;
                options.noResolve = true;
                this.compilationSettings = options;
            };
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
                return {
                    row: result.line,
                    column: result.character
                };
            };
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
        TSWorker.ScriptInfo = ScriptInfo;
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
        function respond(message) {
            postMessage(message, null);
        }
        /**
         * Simple function to stub console.log functionality since this is
         * not available in a worker.
         */
        TSWorker.console = {
            log: function (str) { respond({ method: "console", params: ["log", str] }); },
            error: function (str) { respond({ method: "console", params: ["error", str] }); },
            info: function (str) { respond({ method: "console", params: ["info", str] }); }
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
        function spanEnd(span) {
            return span.start + span.length;
        }
        TSWorker.spanEnd = spanEnd;
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
                    // this.ls.refresh();
                    this.compile();
                }
                catch (err) {
                }
            };
            ISense.prototype.getDefinitionAtPosition = function (fileName, pos) {
                var script = this.lsHost.getScript(fileName);
                var chars = script.getPositionFromCursor(pos);
                var infos = this.ls.getDefinitionAtPosition(fileName, chars);
                if (infos) {
                    var info = infos[0];
                    var infoScript = this.lsHost.getScript(info.fileName);
                    // TODO handle better
                    return {
                        fileName: info.fileName,
                        range: infoScript.getRangeFromSpan(info.textSpan)
                    };
                }
                else {
                    return null;
                }
            };
            /**
             * Create a Class Model for project that can be used for example in the
             * UML viewer.
             */
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
             */
            ISense.prototype.convertNavigateTo = function (item) {
                var script = this.lsHost.getScript(item.fileName);
                var result = {
                    range: script.getRangeFromSpan(item.textSpan),
                    name: item.name,
                    fileName: item.fileName,
                    kind: item.kind
                };
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
                return errors.map(function (error) {
                    var script = _this.lsHost.getScript(error.file.fileName);
                    var message = ts.flattenDiagnosticMessageText(error.messageText, "\n");
                    return {
                        range: script.getRange(error.start, error.length),
                        severity: severity,
                        message: message + "",
                        fileName: error.file.fileName
                    };
                });
            };
            /**
             * Get the errors for either one script or for
             * all the scripts
             *
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
             * are registered in this worker
             */
            ISense.prototype.getAllDiagnostics = function () {
                var _this = this;
                var errors = [];
                this.lsHost.getScriptFileNames().forEach(function (fileName) {
                    errors = errors.concat(_this.getErrors(fileName));
                });
                var compilerSettingsErrors = this.ls.getCompilerOptionsDiagnostics();
                var newErrors = this.convertErrors(compilerSettingsErrors, Cats.Severity.Error);
                errors = errors.concat(newErrors);
                return errors;
            };
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
             * Compile the loaded TS files and return the
             * compiles JS sources and errors (if any).
             */
            ISense.prototype.compile = function () {
                var scripts = this.lsHost.getScriptFileNames();
                var result = [];
                var errors = [];
                for (var x = 0; x < scripts.length; x++) {
                    try {
                        var fileName = scripts[x];
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
                    catch (err) { }
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
            };
            ISense.prototype.isExecutable = function (kind) {
                if (kind === "method" || kind === "function" || kind === "constructor")
                    return true;
                return false;
            };
            /**
             * Convert the data for outline usage.
             */
            ISense.prototype.getOutlineModelData = function (fileName, data) {
                var _this = this;
                if ((!data) || (!data.length)) {
                    return [];
                }
                var result = [];
                var script = this.lsHost.getScript(fileName);
                data.forEach(function (item) {
                    var extension = _this.isExecutable(item.kind) ? "()" : "";
                    var entry = {
                        label: item.text + extension,
                        pos: script.positionToLineCol(item.spans[0].start),
                        kind: item.kind,
                        kids: null
                    };
                    entry.kids = _this.getOutlineModelData(fileName, item.childItems);
                    result.push(entry);
                });
                return result;
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
                    var gap = nextEdit.span.start - spanEnd(currentEdit.span);
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
                }
                else {
                    start = script.getPositionFromCursor(range.start);
                    end = script.getPositionFromCursor(range.end);
                }
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
                    var script = this.lsHost.addScript(fileName, content, this.ls);
                }
            };
            // updated the content of a script
            ISense.prototype.updateScript = function (fileName, content) {
                this.lsHost.updateScript(fileName, content);
            };
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
                var result = {
                    description: ts.displayPartsToString(info.displayParts),
                    docComment: ts.displayPartsToString(info.documentation)
                };
                return result;
            };
            ISense.prototype.getNavigateToItems = function (search) {
                var results = this.ls.getNavigateToItems(search);
                return results.map(this.convertNavigateTo);
            };
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
                var type = script.determineMemeberMode(pos);
                // Lets find out what autocompletion there is possible		
                var completions = this.ls.getCompletionsAtPosition(fileName, type.pos) || {};
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
        function setBusy(value, methodName) {
            respond({ method: "setBusy", params: [value, methodName] });
        }
        /*******************************************************************
          Create and initiate the message listener for incomming messages
         *******************************************************************/
        var tsh;
        addEventListener('message', function (e) {
            if (!tsh)
                tsh = new ISense();
            var msg = e["data"];
            var methodName = msg.method;
            var params = msg.params;
            setBusy(true, methodName);
            try {
                var fn = tsh[methodName];
                var result = fn.apply(tsh, params);
                respond({ id: msg.id, result: result });
            }
            catch (err) {
                var error = {
                    description: err.description,
                    stack: err.stack,
                    method: methodName
                };
                TSWorker.console.error("Error during processing message " + methodName);
                respond({ id: msg.id, error: error });
            }
            finally {
                setBusy(false, methodName);
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
            ModelCreator.prototype.handle = function (node) {
                var _this = this;
                if (!node)
                    return;
                try {
                    if (this.isTopLevelNode(node.kind)) {
                        this.last = this.createIfNotExist(node);
                    }
                    if (this.interest(node.kind)) {
                        var fullName = node.name; // symbol;
                    }
                    if (node.kind === 135 /* MethodDeclaration */) {
                        if (this.last)
                            this.last.operations.push(node.name["text"]);
                        return;
                    }
                    if (node.kind === 136 /* Constructor */) {
                        if (this.last)
                            this.last.operations.push("constructor");
                        return;
                    }
                    if (node.kind === 133 /* PropertyDeclaration */) {
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
                return ((kind === 202 /* ClassDeclaration */) ||
                    (kind === 203 /* InterfaceDeclaration */) ||
                    (kind === 205 /* EnumDeclaration */));
            };
            /**
             * What type of node are we interested in
             */
            ModelCreator.prototype.interest = function (kind) {
                switch (kind) {
                    case 202 /* ClassDeclaration */:
                        return "class";
                    case 206 /* ModuleDeclaration */:
                        return "container";
                    case 203 /* InterfaceDeclaration */:
                        return "interface";
                    case 135 /* MethodDeclaration */:
                        return "method";
                    case 205 /* EnumDeclaration */:
                        return "enum";
                    case 133 /* PropertyDeclaration */:
                        return "prop";
                    case 136 /* Constructor */:
                        return "constructor";
                    default:
                        return null;
                }
            };
            ModelCreator.prototype.getName = function (node) {
                return node.getText();
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
                }
                return this.model[fullName];
            };
            return ModelCreator;
        })();
        TSWorker.ModelCreator = ModelCreator;
    })(TSWorker = Cats.TSWorker || (Cats.TSWorker = {}));
})(Cats || (Cats = {}));
