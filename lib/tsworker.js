importScripts("typescript.js");
var LiteHarness;
(function (LiteHarness) {
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
    LiteHarness.ScriptInfo = ScriptInfo;    
    var TypeScriptLS = (function () {
        function TypeScriptLS() {
            this.ls = null;
            this.scripts = [];
            this.maxScriptVersions = 100;
        }
        TypeScriptLS.prototype.addScript = function (name, content, isResident) {
            if (typeof isResident === "undefined") { isResident = false; }
            var script = new ScriptInfo(name, content, isResident, this.maxScriptVersions);
            this.scripts.push(script);
        };
        TypeScriptLS.prototype.updateScript = function (name, content, isResident) {
            if (typeof isResident === "undefined") { isResident = false; }
            for(var i = 0; i < this.scripts.length; i++) {
                if(this.scripts[i].name === name) {
                    this.scripts[i].updateContent(content, isResident);
                    return;
                }
            }
            this.addScript(name, content, isResident);
        };
        TypeScriptLS.prototype.editScript = function (name, minChar, limChar, newText) {
            for(var i = 0; i < this.scripts.length; i++) {
                if(this.scripts[i].name == name) {
                    this.scripts[i].editContent(minChar, limChar, newText);
                    return;
                }
            }
            throw new Error("No script with name '" + name + "'");
        };
        TypeScriptLS.prototype.getScriptContent = function (scriptIndex) {
            return this.scripts[scriptIndex].content;
        };
        TypeScriptLS.prototype.information = function () {
            return true;
        };
        TypeScriptLS.prototype.debug = function () {
            return true;
        };
        TypeScriptLS.prototype.warning = function () {
            return true;
        };
        TypeScriptLS.prototype.error = function () {
            return true;
        };
        TypeScriptLS.prototype.fatal = function () {
            return true;
        };
        TypeScriptLS.prototype.log = function (s) {
        };
        TypeScriptLS.prototype.getCompilationSettings = function () {
            return null;
        };
        TypeScriptLS.prototype.getScriptCount = function () {
            return this.scripts.length;
        };
        TypeScriptLS.prototype.getScriptSourceText = function (scriptIndex, start, end) {
            return this.scripts[scriptIndex].content.substring(start, end);
        };
        TypeScriptLS.prototype.getScriptSourceLength = function (scriptIndex) {
            return this.scripts[scriptIndex].content.length;
        };
        TypeScriptLS.prototype.getScriptId = function (scriptIndex) {
            return this.scripts[scriptIndex].name;
        };
        TypeScriptLS.prototype.getScriptIsResident = function (scriptIndex) {
            return this.scripts[scriptIndex].isResident;
        };
        TypeScriptLS.prototype.getScriptVersion = function (scriptIndex) {
            return this.scripts[scriptIndex].version;
        };
        TypeScriptLS.prototype.getScriptEditRangeSinceVersion = function (scriptIndex, scriptVersion) {
            var range = this.scripts[scriptIndex].getEditRangeSinceVersion(scriptVersion);
            return range;
        };
        TypeScriptLS.prototype.getLanguageService = function () {
            var ls = new Services.TypeScriptServicesFactory().createLanguageService(this);
            ls.refresh();
            this.ls = ls;
            return ls;
        };
        TypeScriptLS.prototype.parseSourceText = function (fileName, sourceText) {
            var parser = new TypeScript.Parser();
            parser.setErrorRecovery(null, -1, -1);
            parser.errorCallback = function (a, b, c, d) {
                console.log("Error: %s %s %s %s", a, b, c, d);
            };
            var script = parser.parse(sourceText, fileName, 0);
            return script;
        };
        TypeScriptLS.prototype.lineColToPosition = function (fileName, line, col) {
            var script = this.ls.getScriptAST(fileName);
            return TypeScript.getPositionFromLineColumn(script, line, col);
        };
        TypeScriptLS.prototype.positionToLineCol = function (fileName, position) {
            var script = this.ls.getScriptAST(fileName);
            var result = TypeScript.getLineColumnFromPosition(script, position);
            return result;
        };
        TypeScriptLS.prototype.applyEdits = function (content, edits) {
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
        TypeScriptLS.prototype.normalizeEdits = function (edits) {
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
        return TypeScriptLS;
    })();
    LiteHarness.TypeScriptLS = TypeScriptLS;    
})(LiteHarness || (LiteHarness = {}));
importScripts("typescript.js");
var CATS;
(function (CATS) {
    var outputFiles = {
    };
    var console = {
        log: function (str) {
            postMessage(str, null);
        }
    };
    function caseInsensitive(a, b) {
        if(a.name.toLowerCase() < b.name.toLowerCase()) {
            return -1;
        }
        if(a.name.toLowerCase() > b.name.toLowerCase()) {
            return 1;
        }
        return 0;
    }
    var TypeScriptHint = (function () {
        function TypeScriptHint() {
            this.typescriptLS = new LiteHarness.TypeScriptLS();
            this.ls = this.typescriptLS.getLanguageService();
        }
        TypeScriptHint.prototype.reset123 = function () {
            this.typescriptLS = new LiteHarness.TypeScriptLS();
            this.ls = this.typescriptLS.getLanguageService();
        };
        TypeScriptHint.prototype.createWriter = function () {
            var output = "";
            return {
                Write: function (s) {
                    output += s;
                },
                WriteLine: function (s) {
                    output += s + "\n";
                },
                Close: function () {
                },
                Get: function () {
                    return output;
                }
            };
        };
        TypeScriptHint.prototype.createVirtualFiles = function (path, useUTF8) {
            var output = "";
            var result = {
                Write: function (s) {
                    output += s;
                },
                WriteLine: function (s) {
                    output += s + "\n";
                },
                Close: function () {
                },
                Get: function () {
                    return output;
                }
            };
            outputFiles[path] = result;
            return result;
        };
        TypeScriptHint.prototype.compile = function (options) {
            var outfile = this.createWriter();
            var outerr = this.createWriter();
            var compOptions = new TypeScript.CompilationSettings();
            for(var i in options) {
                compOptions[i] = options[i];
            }
            var compiler = new TypeScript.TypeScriptCompiler(outerr, new TypeScript.NullLogger(), compOptions);
            var scripts = this.typescriptLS.scripts;
            scripts.forEach(function (script) {
                compiler.addUnit(script.content, script.name, false);
            });
            outputFiles = {
            };
            compiler.typeCheck();
            compiler.emit(this.createVirtualFiles);
            var resultSource = {
            };
            for(var file in outputFiles) {
                resultSource[file] = outputFiles[file].Get();
            }
            return {
                source: resultSource,
                error: outerr.Get()
            };
        };
        TypeScriptHint.prototype.getScriptIds = function () {
            var count = this.typescriptLS.getScriptCount();
            var result = [];
            for(var i = 0; i < count; i++) {
                result.push(this.typescriptLS.getScriptId(i));
            }
            return result;
        };
        TypeScriptHint.prototype.getScriptContent = function (id) {
            var scripts = this.typescriptLS.scripts;
            var i = scripts.length;
            while(i--) {
                if(scripts[i].name === id) {
                    return scripts[i].content;
                }
            }
        };
        TypeScriptHint.prototype.getIndex = function (id) {
            var scripts = this.typescriptLS.scripts;
            var i = scripts.length;
            while(i--) {
                if(scripts[i].name === id) {
                    return i;
                }
            }
            throw new Error("Script not found with name " + id);
        };
        TypeScriptHint.prototype.getScript = function (index) {
            if(typeof index === "string") {
                index = this.getIndex(index);
            }
            var script = this.typescriptLS.scripts[index];
            return {
                content: script.content,
                name: script.name
            };
        };
        TypeScriptHint.prototype.getFormattingEditsForRange = function (fileName, start, end) {
            return this.ls.getFormattingEditsForRange(fileName, start, end, new Services.FormatCodeOptions());
        };
        TypeScriptHint.prototype.languageService = function (operation, params) {
            var result = this.ls[operation].call(this.ls, params);
            return result;
        };
        TypeScriptHint.prototype.addScript = function (name, source, resident) {
            this.typescriptLS.addScript(name, source, resident);
        };
        TypeScriptHint.prototype.updateScript = function (fileName, src, errors) {
            if (typeof errors === "undefined") { errors = true; }
            this.typescriptLS.updateScript(fileName, src, false);
            if(!errors) {
                return;
            }
            var errors = this.ls.getScriptErrors(fileName, 10);
            var script = this.ls.getScriptAST(fileName);
            var result = [];
            errors.forEach(function (error) {
                var coord = TypeScript.getLineColumnFromPosition(script, error.minChar);
                var resultEntry = {
                    row: coord.line - 1,
                    column: coord.col - 1,
                    type: "error",
                    text: error.message,
                    raw: error.message
                };
                result.push(resultEntry);
            });
            return result;
        };
        TypeScriptHint.prototype.getPosition = function (fileName, coord) {
            var script = this.ls.getScriptAST(fileName);
            var lineMap = script.locationInfo.lineMap;
            var pos = lineMap[coord.line] + coord.col;
            return pos;
        };
        TypeScriptHint.prototype.getPositionFromCursor = function (fileName, cursor) {
            var script = this.ls.getScriptAST(fileName);
            var lineMap = script.locationInfo.lineMap;
            var pos = lineMap[cursor.row + 1] + cursor.column;
            return pos;
        };
        TypeScriptHint.prototype.getTypeAtPosition = function (fileName, coord) {
            var pos = this.getPosition(fileName, coord);
            return this.ls.getTypeAtPosition(fileName, pos);
        };
        TypeScriptHint.prototype.determineAutoCompleteType = function (source, pos) {
            var memberMatch = /\.[0-9A-Za-z_]*$/;
            var typeMatch = /:[0-9A-Za-z_]*$/;
            var previousCode = source.substring(0, pos);
            if(previousCode.match(memberMatch)) {
                return "member";
            }
            if(previousCode.match(typeMatch)) {
                return "type";
            }
            return "other";
        };
        TypeScriptHint.prototype.getInfoAtPosition = function (method, filename, cursor) {
            var pos = this.getPositionFromCursor(filename, cursor);
            var result = this.ls[method](filename, pos);
            return result;
        };
        TypeScriptHint.prototype.autoComplete = function (cursor, filename) {
            var pos = this.getPositionFromCursor(filename, cursor);
            var memberMode = false;
            var source = this.getScriptContent(filename);
            var type = this.determineAutoCompleteType(source, pos);
            if(type === "member") {
                memberMode = true;
            }
            var completions = this.ls.getCompletionsAtPosition(filename, pos, memberMode);
            completions.entries.sort(caseInsensitive);
            return completions;
        };
        return TypeScriptHint;
    })();    
    var tsh = new TypeScriptHint();
    addEventListener('message', function (e) {
        var msg = e.data;
        var method = msg.method;
        var id = msg.id;
        var params = msg.params;
        try  {
            var result = tsh[method].apply(tsh, params);
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
})(CATS || (CATS = {}));
