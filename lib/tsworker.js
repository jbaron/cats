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
            }
            LanguageServiceHost.prototype.getScript = function (fileName) {
                return this.scripts[fileName];
            };
            LanguageServiceHost.prototype.getScriptFileNames = function () {
                return Object.keys(this.scripts);
            };
            LanguageServiceHost.prototype.getScriptIsOpen = function (fileName) {
                // @FIX generates not-implemented yet error in TypeScript if return true;
                return false;
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
            LanguageServiceHost.prototype.getDefaultLibFilename = function () {
                return "";
            };
            LanguageServiceHost.prototype.getScriptSnapshot = function (fileName) {
                var script = this.scripts[fileName];
                var result = TypeScript.ScriptSnapshot.fromString(script.content);
                /*
                // Quick hack
                result. getTextChangeRangeSinceVersion =  (version) => {
                       return <TypeScript.TextChangeRange>null;
                       // return new TypeScript.TextChangeRange(new TypeScript.TextSpan(0, script.content.length),script.content.length);
                };
                */
                return result;
            };
            //////////////////////////////////////////////////////////////////////
            // local implementation
            LanguageServiceHost.prototype.addScript = function (fileName, content) {
                var script = new TSWorker.ScriptInfo(fileName, content);
                this.scripts[fileName] = script;
            };
            LanguageServiceHost.prototype.updateScript = function (fileName, content) {
                var script = this.scripts[fileName];
                if (script) {
                    script.updateContent(content);
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
                }
            };
            //////////////////////////////////////////////////////////////////////
            // Logger implementation
            LanguageServiceHost.prototype.log = function (s) {
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
                var script = this.scripts[fileName];
                return script.version + "";
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
         * This class holds the TypeScript files and expose them to the TS language services
         *
         */
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
            /**
             * Convert a TS offset position to a Cats Position
             */
            ScriptInfo.prototype.positionToLineCol = function (position) {
                var result = this.getLineMap().getLineAndCharacterFromPosition(position);
                return {
                    row: result.line(),
                    column: result.character()
                };
            };
            /**
             * Get the chars offset based on the Ace position
             */
            ScriptInfo.prototype.getPositionFromCursor = function (cursor) {
                var pos = this.getLineMap().getPosition(cursor.row, cursor.column);
                return pos;
            };
            /**
            * Retieve the line of code that contains a certain range. Used to provide the
            * user with contexts of what is found
            */
            ScriptInfo.prototype.getLine = function (minChar, limChar) {
                var min = this.content.substring(0, minChar).lastIndexOf("\n");
                var max = this.content.substring(limChar).indexOf("\n");
                return this.content.substring(min + 1, limChar + max);
            };
            /**
             * Get an CATS Range from TS minChars and limChars
             */
            ScriptInfo.prototype.getRange = function (minChar, limChar) {
                var result = {
                    start: this.positionToLineCol(minChar),
                    end: this.positionToLineCol(limChar)
                };
                return result;
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
                this.ls = ts.createLanguageService(this.lsHost, ts.createDocumentRegistry());
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
                    InsertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesis: true,
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
                        range: infoScript.getRange(info.textSpan.start(), info.textSpan.end())
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
                //Force all symbols to be created.
                this.getAllDiagnostics();
                var mc = new TSWorker.ModelCreator();
                this.lsHost.getScriptFileNames().forEach(function (script) {
                    if (script.indexOf("lib.d.ts") > 0)
                        return;
                    // @TODO fix
                    // var doc:TypeScript.Document = this.ls["compiler"].getDocument(script);
                    // mc.parse(doc);
                });
                return mc.getModel();
            };
            /**
             * Convert Services to Cats NavigateToItems
             */
            ISense.prototype.convertNavigateTo = function (item) {
                var script = this.lsHost.getScript(item.fileName);
                var result = {
                    range: script.getRange(item.textSpan.start(), item.textSpan.end()),
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
                    var script = _this.lsHost.getScript(error.file.filename);
                    return {
                        range: script.getRange(error.start, error.start + error.length),
                        severity: severity,
                        message: error.messageText,
                        fileName: error.file.filename
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
                        range: script.getRange(todo.position, todo.position + todo.descriptor.text.length),
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
                        if (this.lsHost.getCompilationSettings().out) {
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
             * Configure the compilation and format settings.
             * Tthis method uses a simple mixin to overwrite only the values
             * that are set, leave the other ones at the default value.
             */
            ISense.prototype.setSettings = function (compilerOptions, editorOptions) {
                var compOptions = ts.getDefaultCompilerOptions();
                for (var i in compilerOptions) {
                    compOptions[i] = compilerOptions[i];
                }
                this.lsHost.setCompilationSettings(compOptions);
                this.formatOptions = this.getDefaultFormatOptions();
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
                data.forEach(function (item) {
                    var extension = _this.isExecutable(item.kind) ? "()" : "";
                    var script = _this.lsHost.getScript(fileName);
                    var entry = {
                        label: item.text + extension,
                        pos: script.positionToLineCol(item.spans[0].start()),
                        kind: item.kind,
                        kids: []
                    };
                    if (item.childItems && (item.childItems.length > 0)) {
                        entry.kids = _this.getOutlineModelData(fileName, item.childItems);
                    }
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
                    var result = a.edit.span.start() - b.edit.span.start();
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
                    var gap = nextEdit.span.start() - currentEdit.span.end();
                    // non-overlapping edits
                    if (gap >= 0) {
                        result.push(currentEdit);
                        current = next;
                        next++;
                        continue;
                    }
                    // overlapping edits: for now, we only support ignoring an next edit 
                    // entirely contained in the current edit.
                    if (currentEdit.span.end() >= nextEdit.span.end()) {
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
                    var prefix = result.substring(0, edit.span.start());
                    var middle = edit.newText;
                    var suffix = result.substring(edit.span.end());
                    result = prefix + middle + suffix;
                }
                return result;
            };
            ISense.prototype.getFormattedTextForRange = function (fileName, range) {
                var start, end;
                var script = this.lsHost.getScript(fileName);
                var content = script.content;
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
                    this.lsHost.addScript(fileName, content);
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
            // Determine type of autocompletion
            ISense.prototype.determineAutoCompleteType = function (fileName, pos) {
                var source = this.lsHost.getScript(fileName).content;
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
                        range: refScript.getRange(ref.textSpan.start(), ref.textSpan.end()),
                        message: refScript.getLine(ref.textSpan.start(), ref.textSpan.end())
                    });
                }
                return result;
            };
            /**
             * Generic method to get referecnes, implementations or occurences of a certain
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
                var entries = this.ls[method](fileName, pos) || [];
                for (var i = 0; i < entries.length; i++) {
                    var ref = entries[i];
                    var refScript = this.lsHost.getScript(ref.fileName);
                    result.push({
                        fileName: ref.fileName,
                        range: refScript.getRange(ref.textSpan.start(), ref.textSpan.end()),
                        message: refScript.getLine(ref.textSpan.start(), ref.textSpan.end())
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
            try {
                var result = tsh[msg.method].apply(tsh, msg.params);
                postMessage({ id: msg.id, result: result }, null);
            }
            catch (err) {
                var error = {
                    description: err.description,
                    stack: err.stack
                };
                TSWorker.console.error("Error during processing message " + msg.method);
                postMessage({ id: msg.id, error: error }, null);
            }
            finally {
                setBusy(false);
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
            ModelCreator.prototype.parse = function (doc /* :TypeScript.Document @TODO */) {
                // this.handle(doc.topLevelDecl());
            };
            return ModelCreator;
        })();
        TSWorker.ModelCreator = ModelCreator;
    })(TSWorker = Cats.TSWorker || (Cats.TSWorker = {}));
})(Cats || (Cats = {}));
