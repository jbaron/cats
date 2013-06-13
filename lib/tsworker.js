var Cats;
(function (Cats) {
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
                var prefix = this.content.substring(0, minChar);
                var middle = newText;
                var suffix = this.content.substring(limChar);
                this.setContent(prefix + middle + suffix);

                this.editRanges.push({
                    length: this.content.length,
                    textChangeRange: new TypeScript.TextChangeRange(TypeScript.TextSpan.fromBounds(minChar, limChar), newText.length)
                });

                this.version++;
            };

            ScriptInfo.prototype.getTextChangeRangeSinceVersion = function (version) {
                if (this.version === version) {
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

                result["getTextChangeRangeSinceVersion"] = function (version) {
                    return null;
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

            LanguageServiceHost.prototype.getCompilationSettings = function () {
                return this.compilationSettings;
            };

            LanguageServiceHost.prototype.setCompilationSettings = function (value) {
                this.compilationSettings = value;
            };

            LanguageServiceHost.prototype.getScriptVersion = function (fileName) {
                var script = this.scripts[fileName];
                return script.version;
            };

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
importScripts("../static/js/typescript.js");

var Cats;
(function (Cats) {
    (function (TSWorker) {
        var console = {
            log: function (str) {
                postMessage(str, null);
            }
        };

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
            function ISense() {
                this.maxErrors = 20;
                this.lsHost = new TSWorker.LanguageServiceHost();

                this.ls = new Services.TypeScriptServicesFactory().createPullLanguageService(this.lsHost);
            }
            ISense.prototype.initialize = function () {
                try  {
                    this.ls.refresh();
                    this.compile();
                } catch (err) {
                }
            };

            ISense.prototype.getScript = function (fileName) {
                return this.lsHost.scripts[fileName];
            };

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

            ISense.prototype.convertNavigateTo = function (items) {
                var results = items;
                for (var i = 0; i < results.length; i++) {
                    var result = results[i];
                    result.range = this.getRange(result.fileName, result.minChar, result.limChar);
                }
                return results;
            };

            ISense.prototype.convertNavigateTo2 = function (fileName, items) {
                var result = new Array();
                for (var i = 0; i < items.length; i++) {
                    var item = items[i];
                    var entry = this.getRange(fileName, item.start(), item.end());
                    result.push(entry);
                }
                return result;
            };

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

            ISense.prototype.compile = function () {
                var scripts = this.lsHost.scripts;

                var result = [];
                var errors = [];
                var hasErrors = false;

                for (var fileName in scripts) {
                    var emitOutput = this.ls.getEmitOutput(fileName);

                    if (emitOutput.diagnostics && emitOutput.diagnostics.length) {
                        var newErrors = this.convertErrors(emitOutput.diagnostics);
                        errors = errors.concat(newErrors);
                        hasErrors = true;
                    }

                    emitOutput.outputFiles.forEach(function (file) {
                        result.push({
                            fileName: file.name,
                            content: file.text
                        });
                    });
                }
                ;

                return {
                    source: hasErrors ? [] : result,
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

                    refs.forEach(function (file) {
                        entry.ref.push(file.path);
                    });
                    result.push(entry);
                }
                ;
                return result;
            };

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

            ISense.prototype.languageService = function (operation, params) {
                var result = this.ls[operation].call(this.ls, params);
                return result;
            };

            ISense.prototype.addScript = function (fileName, content) {
                this.lsHost.addScript(fileName, content);
            };

            ISense.prototype.getErrors = function (fileName) {
                var result;
                var errors = this.ls.getSemanticDiagnostics(fileName);
                var errors2 = this.ls.getSyntacticDiagnostics(fileName);
                result = this.convertErrors(errors);
                result = result.concat(this.convertErrors(errors2));
                return result;
            };

            ISense.prototype.updateScript = function (fileName, content) {
                this.lsHost.updateScript(fileName, content);
            };

            ISense.prototype.getRange = function (fileName, minChar, limChar) {
                var result = {
                    start: this.positionToLineCol(fileName, minChar),
                    end: this.positionToLineCol(fileName, limChar)
                };
                return result;
            };

            ISense.prototype.getPositionFromCursor = function (fileName, cursor) {
                var script = this.getScript(fileName);
                var pos = script.getLineMap().getPosition(cursor.row, cursor.column);

                return pos;
            };

            ISense.prototype.getTypeAtPosition = function (fileName, coord) {
                var pos = this.getPositionFromCursor(fileName, coord);
                var result = this.ls.getTypeAtPosition(fileName, pos);
                if (result)
                    result.description = TypeScript.MemberName.memberNameToString(result.memberName);
                return result;
            };

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

                return result;
            };

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
                    obj = tsh; else
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
