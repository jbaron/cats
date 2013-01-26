var Cats;
(function (Cats) {
    (function (TSWorker) {
        var ScriptInfo = (function () {
            function ScriptInfo(name, content, isResident, maxScriptVersions) {
                this.name = name;
                this.content = content;
                this.isResident = isResident;
                this.maxScriptVersions = maxScriptVersions;
                this.editRanges = [];
                this.version = 1;
            }
            ScriptInfo.prototype.updateContent = function (content, isResident) {
                this.editRanges = [];
                this.content = content;
                this.isResident = isResident;
                this.version++;
            };
            ScriptInfo.prototype.editContent = function (minChar, limChar, newText) {
                var prefix = this.content.substring(0, minChar);
                var middle = newText;
                var suffix = this.content.substring(limChar);
                this.content = prefix + middle + suffix;
                this.editRanges.push({
                    length: this.content.length,
                    editRange: new TypeScript.ScriptEditRange(minChar, limChar, (limChar - minChar) + newText.length)
                });
                if(this.editRanges.length > this.maxScriptVersions) {
                    this.editRanges.splice(0, this.maxScriptVersions - this.editRanges.length);
                }
                this.version++;
            };
            ScriptInfo.prototype.getEditRangeSinceVersion = function (version) {
                if(this.version == version) {
                    return null;
                }
                var initialEditRangeIndex = this.editRanges.length - (this.version - version);
                if(initialEditRangeIndex < 0 || initialEditRangeIndex >= this.editRanges.length) {
                    return TypeScript.ScriptEditRange.unknown();
                }
                var entries = this.editRanges.slice(initialEditRangeIndex);
                var minDistFromStart = entries.map(function (x) {
                    return x.editRange.minChar;
                }).reduce(function (prev, current) {
                    return Math.min(prev, current);
                });
                var minDistFromEnd = entries.map(function (x) {
                    return x.length - x.editRange.limChar;
                }).reduce(function (prev, current) {
                    return Math.min(prev, current);
                });
                var aggDelta = entries.map(function (x) {
                    return x.editRange.delta;
                }).reduce(function (prev, current) {
                    return prev + current;
                });
                return new TypeScript.ScriptEditRange(minDistFromStart, entries[0].length - minDistFromEnd, aggDelta);
            };
            return ScriptInfo;
        })();
        TSWorker.ScriptInfo = ScriptInfo;        
        var LanguageServiceHost = (function () {
            function LanguageServiceHost() {
                this.ls = null;
                this.compilationSettings = null;
                this.scripts = [];
                this.maxScriptVersions = 100;
            }
            LanguageServiceHost.prototype.addScript = function (name, content, isResident) {
                if (typeof isResident === "undefined") { isResident = false; }
                var script = new ScriptInfo(name, content, isResident, this.maxScriptVersions);
                this.scripts.push(script);
            };
            LanguageServiceHost.prototype.updateScript = function (name, content, isResident) {
                if (typeof isResident === "undefined") { isResident = false; }
                for(var i = 0; i < this.scripts.length; i++) {
                    if(this.scripts[i].name === name) {
                        this.scripts[i].updateContent(content, isResident);
                        return;
                    }
                }
                this.addScript(name, content, isResident);
            };
            LanguageServiceHost.prototype.editScript = function (name, minChar, limChar, newText) {
                for(var i = 0; i < this.scripts.length; i++) {
                    if(this.scripts[i].name == name) {
                        this.scripts[i].editContent(minChar, limChar, newText);
                        return;
                    }
                }
                throw new Error("No script with name '" + name + "'");
            };
            LanguageServiceHost.prototype.getScriptContent = function (scriptIndex) {
                return this.scripts[scriptIndex].content;
            };
            LanguageServiceHost.prototype.information = function () {
                return true;
            };
            LanguageServiceHost.prototype.debug = function () {
                return true;
            };
            LanguageServiceHost.prototype.warning = function () {
                return true;
            };
            LanguageServiceHost.prototype.error = function () {
                return true;
            };
            LanguageServiceHost.prototype.fatal = function () {
                return true;
            };
            LanguageServiceHost.prototype.log = function (s) {
            };
            LanguageServiceHost.prototype.getCompilationSettings = function () {
                return this.compilationSettings;
            };
            LanguageServiceHost.prototype.setCompilationSettings = function (value) {
                this.compilationSettings = value;
            };
            LanguageServiceHost.prototype.getScriptCount = function () {
                return this.scripts.length;
            };
            LanguageServiceHost.prototype.getScriptSourceText = function (scriptIndex, start, end) {
                return this.scripts[scriptIndex].content.substring(start, end);
            };
            LanguageServiceHost.prototype.getScriptSourceLength = function (scriptIndex) {
                return this.scripts[scriptIndex].content.length;
            };
            LanguageServiceHost.prototype.getScriptId = function (scriptIndex) {
                return this.scripts[scriptIndex].name;
            };
            LanguageServiceHost.prototype.getScriptIsResident = function (scriptIndex) {
                return this.scripts[scriptIndex].isResident;
            };
            LanguageServiceHost.prototype.getScriptVersion = function (scriptIndex) {
                return this.scripts[scriptIndex].version;
            };
            LanguageServiceHost.prototype.getScriptEditRangeSinceVersion = function (scriptIndex, scriptVersion) {
                var range = this.scripts[scriptIndex].getEditRangeSinceVersion(scriptVersion);
                return range;
            };
            LanguageServiceHost.prototype.parseSourceText = function (fileName, sourceText) {
                var parser = new TypeScript.Parser();
                parser.errorCallback = function (a, b, c, d) {
                    console.log("Error: %s %s %s %s", a, b, c, d);
                };
                var script = parser.parse(sourceText, fileName, 0);
                return script;
            };
            LanguageServiceHost.prototype.applyEdits = function (content, edits) {
                var result = content;
                edits = this.normalizeEdits(edits);
                for(var i = edits.length - 1; i >= 0; i--) {
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
                    for(var i = 0; i < edits.length; i++) {
                        result.push({
                            edit: edits[i],
                            index: i
                        });
                    }
                    return result;
                }
                var temp = mapEdits(edits).sort(function (a, b) {
                    var result = a.edit.minChar - b.edit.minChar;
                    if(result == 0) {
                        result = a.index - b.index;
                    }
                    return result;
                });
                var current = 0;
                var next = 1;
                while(current < temp.length) {
                    var currentEdit = temp[current].edit;
                    if(next >= temp.length) {
                        result.push(currentEdit);
                        current++;
                        continue;
                    }
                    var nextEdit = temp[next].edit;
                    var gap = nextEdit.minChar - currentEdit.limChar;
                    if(gap >= 0) {
                        result.push(currentEdit);
                        current = next;
                        next++;
                        continue;
                    }
                    if(currentEdit.limChar >= nextEdit.limChar) {
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
            if(a.name.toLowerCase() < b.name.toLowerCase()) {
                return -1;
            }
            if(a.name.toLowerCase() > b.name.toLowerCase()) {
                return 1;
            }
            return 0;
        }
        var ISense = (function () {
            function ISense() {
                this.maxErrors = 10;
                this.init();
            }
            ISense.prototype.init = function () {
                this.lsHost = new TSWorker.LanguageServiceHost();
                this.ls = new Services.TypeScriptServicesFactory().createLanguageService(this.lsHost);
                this.ls.refresh();
            };
            ISense.prototype.lineColToPosition = function (fileName, line, col) {
                var script = this.ls.getScriptAST(fileName);
                return TypeScript.getPositionFromLineColumn(script, line, col);
            };
            ISense.prototype.positionToLineCol = function (fileName, position) {
                var script = this.ls.getScriptAST(fileName);
                var result = TypeScript.getLineColumnFromPosition(script, position);
                return result;
            };
            ISense.prototype.getUnitName = function (index) {
                return this.lsHost.scripts[index].name;
            };
            ISense.prototype.getCursor = function (name, chars) {
                var tsCursor = this.positionToLineCol(name, chars);
                var result = {
                    row: tsCursor.line - 1,
                    column: tsCursor.col - 1
                };
                return result;
            };
            ISense.prototype.getDefinitionAtPosition = function (fileName, pos) {
                var chars = this.getPositionFromCursor(fileName, pos);
                var info = this.ls.getDefinitionAtPosition(fileName, chars);
                if(info) {
                    var unitName = this.getUnitName(info.unitIndex);
                    return {
                        unitName: unitName,
                        range: this.getRange(unitName, info.minChar, info.limChar)
                    };
                } else {
                    return null;
                }
            };
            ISense.prototype.convertErrors = function (errors) {
                var _this = this;
                var result = [];
                errors.forEach(function (error) {
                    var scriptName = _this.getUnitName(error.unitIndex);
                    var r = _this.getRange(scriptName, error.minChar, error.limChar);
                    result.push({
                        range: r,
                        message: error.message,
                        unitName: scriptName
                    });
                });
                return result;
            };
            ISense.prototype.compile = function (options) {
                var _this = this;
                var scripts = this.lsHost.scripts;
                var result = {
                };
                scripts.forEach(function (script) {
                    var files = _this.ls.getEmitOutput(script.name);
                    files.forEach(function (file) {
                        result[file.name] = file.text;
                    });
                });
                var errors = this.ls.getErrors(this.maxErrors);
                return {
                    source: result,
                    errors: this.convertErrors(errors)
                };
            };
            ISense.prototype.setCompilationSettings = function (options) {
                var compOptions = new TypeScript.CompilationSettings();
                for(var i in options) {
                    compOptions[i] = options[i];
                }
                this.lsHost.setCompilationSettings(compOptions);
            };
            ISense.prototype.getScriptIds = function () {
                var count = this.lsHost.getScriptCount();
                var result = [];
                for(var i = 0; i < count; i++) {
                    result.push(this.lsHost.getScriptId(i));
                }
                return result;
            };
            ISense.prototype.getScriptContent = function (id) {
                var scripts = this.lsHost.scripts;
                var i = scripts.length;
                while(i--) {
                    if(scripts[i].name === id) {
                        return scripts[i].content;
                    }
                }
            };
            ISense.prototype.getIndex = function (id) {
                var scripts = this.lsHost.scripts;
                var i = scripts.length;
                while(i--) {
                    if(scripts[i].name === id) {
                        return i;
                    }
                }
                throw new Error("Script not found with name " + id);
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
                for(var i = 0; i < edits.length; i++) {
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
            ISense.prototype.addScript = function (name, source, resident) {
                this.lsHost.addScript(name, source, resident);
            };
            ISense.prototype.getErrors = function (fileName) {
                var result = [];
                var errors;
                if(fileName) {
                    errors = this.ls.getScriptErrors(fileName, this.maxErrors);
                } else {
                    errors = this.ls.getErrors(this.maxErrors);
                }
                return this.convertErrors(errors);
            };
            ISense.prototype.updateScript = function (fileName, src) {
                this.lsHost.updateScript(fileName, src, false);
            };
            ISense.prototype.getRange = function (script, minChar, limChar) {
                var startLC = this.positionToLineCol(script, minChar);
                var endLC = this.positionToLineCol(script, limChar);
                var result = {
                    start: {
                        row: startLC.line - 1,
                        column: startLC.col - 1
                    },
                    end: {
                        row: endLC.line - 1,
                        column: endLC.col - 1
                    }
                };
                return result;
            };
            ISense.prototype.getPositionFromCursor = function (fileName, cursor) {
                var script = this.ls.getScriptAST(fileName);
                var lineMap = script.locationInfo.lineMap;
                var pos = lineMap[cursor.row + 1] + cursor.column;
                return pos;
            };
            ISense.prototype.getTypeAtPosition = function (fileName, coord) {
                var pos = this.getPositionFromCursor(fileName, coord);
                var result = this.ls.getTypeAtPosition(fileName, pos);
                result["description"] = TypeScript.MemberName.memberNameToString(result.memberName);
                return result;
            };
            ISense.prototype.determineAutoCompleteType = function (source, pos) {
                var identifyerMatch = /[0-9A-Za-z_\$]*$/;
                var previousCode = source.substring(0, pos);
                var match = previousCode.match(identifyerMatch);
                var newPos = pos;
                var memberMode = false;
                if(match && match[0]) {
                    newPos = pos - match[0].length;
                }
                if(source[newPos - 1] === '.') {
                    memberMode = true;
                }
                var result = {
                    pos: newPos,
                    memberMode: memberMode
                };
                return result;
            };
            ISense.prototype.getLine = function (scriptName, minChar, limChar) {
                var content = this.getScriptContent(scriptName);
                var min = content.substring(0, minChar).lastIndexOf("\n");
                var max = content.substring(limChar).indexOf("\n");
                return content.substring(min + 1, limChar + max);
            };
            ISense.prototype.getOutliningRegions = function (fileName) {
                var results = this.ls.getOutliningRegions(fileName);
                for(var i = 0; i < results.length; i++) {
                    var result = results[i];
                    var fileName = this.getUnitName(result.unitIndex);
                    result.range = this.getRange(fileName, result.minChar, result.limChar);
                    result.unitName = fileName;
                }
                return results;
            };
            ISense.prototype.getInfoAtPosition = function (method, filename, cursor) {
                var pos = this.getPositionFromCursor(filename, cursor);
                var result = [];
                var entries = this.ls[method](filename, pos);
                for(var i = 0; i < entries.length; i++) {
                    var ref = entries[i];
                    var name = this.lsHost.scripts[ref.unitIndex].name;
                    result.push({
                        unitName: name,
                        range: this.getRange(name, ref.ast.minChar, ref.ast.limChar),
                        message: this.getLine(name, ref.ast.minChar, ref.ast.limChar)
                    });
                }
                return result;
            };
            ISense.prototype.autoComplete = function (cursor, filename) {
                var pos = this.getPositionFromCursor(filename, cursor);
                var memberMode = false;
                var source = this.getScriptContent(filename);
                var type = this.determineAutoCompleteType(source, pos);
                var completions = this.ls.getCompletionsAtPosition(filename, type.pos, type.memberMode);
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
                if(tsh[method]) {
                    obj = tsh;
                } else {
                    tsh.ls;
                }
                result = obj[method].apply(obj, params);
                postMessage({
                    id: id,
                    result: result
                }, null);
            } catch (err) {
                var error = {
                    description: err.description,
                    stack: err.stack
                };
                postMessage({
                    id: id,
                    error: error
                }, null);
            }
        }, false);
    })(Cats.TSWorker || (Cats.TSWorker = {}));
    var TSWorker = Cats.TSWorker;
})(Cats || (Cats = {}));
