var CATS;
(function (CATS) {
    var filename;
    var fs = require("fs");
    var path = require("path");
    function createTreeViewer(dir, parent) {
        if(!parent) {
            parent = document.createElement("ul");
        }
        fs.readdirSync(dir).forEach(function (file) {
            var li = document.createElement("li");
            var name = path.join(dir, file);
            var stat = fs.statSync(name);
            if(stat.isFile()) {
                li.appendChild(document.createTextNode(file));
                li.setAttribute("data-full", name);
                parent.appendChild(li);
            }
            if(stat.isDirectory()) {
                li.appendChild(document.createTextNode(file));
                li.appendChild(createTreeViewer(name, li));
                parent.appendChild(li);
            }
        });
        return parent;
    }
    function autoComplete(editor) {
        var cur = editor.getCursor();
        console.log(JSON.stringify(editor.getTokenAt(cur)));
        var pos = editor.indexFromPos(cur);
        if(changed) {
            var source = editor.getValue();
            iSense.perform("updateScript", filename, source, function (err, result) {
                handleCompileErrors(editor, result);
            });
            changed = false;
        }
        ; ;
        iSense.perform("autoComplete", pos, filename, function (err, completes) {
            var result = {
                list: completes,
                from: {
                    line: cur.line,
                    ch: cur.col
                },
                to: {
                    line: cur.line,
                    ch: cur.col
                }
            };
            CodeMirror.simpleHint(editor, function () {
                return result;
            });
        });
    }
    var editor = CodeMirror(document.getElementById("editorPane"), {
        lineNumbers: true,
        extraKeys: {
            "Ctrl-Space": autoComplete
        },
        matchBrackets: true,
        mode: "text/typescript",
        gutters: [
            "CompileError"
        ]
    });
    editor.on("change", onChangeHandler);
    var updateSourceTimer;
    var changed = false;
    var markedErrors = [];
    function handleCompileErrors(editor, errors) {
        markedErrors.forEach(function (mark) {
            return mark.clear();
        });
        editor.clearGutter("CompileError");
        markedErrors = [];
        errors.forEach(function (error) {
            console.log(JSON.stringify(error));
            var from = editor.posFromIndex(error.minChar);
            var to = editor.posFromIndex(error.limChar);
            var markedError = editor.markText(from, to, {
                className: "crinkle"
            });
            markedErrors.push(markedError);
            var img = document.createElement("img");
            img.setAttribute("title", error.message);
            img.setAttribute("src", "static/error.png");
            editor.setGutterMarker(from.line, "CompileError", img);
        });
    }
    function onChangeHandler(editor, info) {
        changed = true;
        clearTimeout(updateSourceTimer);
        if(info.text[0] === '.') {
            autoComplete(editor);
        }
        updateSourceTimer = setTimeout(function () {
            if(changed) {
                console.log("updating source code");
                var source = editor.getValue();
                iSense.perform("updateScript", filename, source, function (err, result) {
                    handleCompileErrors(editor, result);
                });
                changed = false;
            }
        }, 500);
    }
    ; ;
    function updateEditor(nr) {
        iSense.perform("getScript", nr, function (err, script) {
            filename = script.name;
            editor.setValue(script.content);
        });
    }
    CATS.updateEditor = updateEditor;
    ; ;
    function loadScripts(projectDir) {
        var result = [];
        try  {
            var buildFile = path.join(projectDir, "build");
            var filesTXT = fs.readFileSync(buildFile, "utf-8");
        } catch (err) {
            alert("Couldn't find valid build file at " + buildFile);
            return [];
        }
        var lines = filesTXT.split(/\r?\n/);
        lines.forEach(function (line) {
            line = line.trim();
            if(line && (line.indexOf("--") !== 0)) {
                var fullName = path.join(projectDir, line);
                result.push({
                    name: line,
                    content: fs.readFileSync(fullName, "utf-8")
                });
            }
        });
        return result;
    }
    function setProject(projectDir) {
        iSense.perform("reset", function () {
        });
        var select = document.getElementById("projectFiles");
        select.innerHTML = '';
        var files = loadScripts(projectDir);
        files.forEach(function (file) {
            var option = document.createElement("option");
            option.setAttribute("value", file.name);
            option.innerHTML = file.name;
            select.appendChild(option);
            iSense.perform("addScript", file, function () {
            });
        });
        if(files.length) {
            updateEditor(0);
        } else {
            editor.setValue("");
        }
    }
    CATS.setProject = setProject;
    var ISenseHandler = (function () {
        function ISenseHandler() {
            this.messageId = 0;
            this.registry = {
            };
            this.worker = new Worker("./lib/worker.js");
            this.init();
        }
        ISenseHandler.prototype.perform = function (method) {
            var data = [];
            for (var _i = 0; _i < (arguments.length - 1); _i++) {
                data[_i] = arguments[_i + 1];
            }
            var handler = data.pop();
            this.messageId++;
            var message = {
                id: this.messageId,
                method: method,
                params: data
            };
            this.worker.postMessage(message);
            if(handler) {
                this.registry[this.messageId] = handler;
            }
        };
        ISenseHandler.prototype.init = function () {
            var _this = this;
            this.worker.onmessage = function (e) {
                var msg = e.data;
                var id = msg.id;
                if(msg.error) {
                    console.error("Got error back !!! " + msg.error);
                    console.error(msg.error.stack);
                }
                var handler = _this.registry[id];
                if(handler) {
                    delete _this.registry[id];
                    handler(msg.error, msg.result);
                }
            };
        };
        return ISenseHandler;
    })();
    CATS.ISenseHandler = ISenseHandler;    
    function chooseFile(chooser) {
        chooser.trigger('click');
        chooser.change(function (evt) {
            setProject(this.value);
        });
    }
    CATS.chooseFile = chooseFile;
    ; ;
    var iSense = new ISenseHandler();
    setProject("./demo");
    var gui = require('nw.gui');
    var win = gui.Window.get().maximize();
})(CATS || (CATS = {}));
