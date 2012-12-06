var HashHandler = ace.require('ace/keyboard/hash_handler').HashHandler;
var AutoCompleteView = (function () {
    function AutoCompleteView(editor) {
        this.editor = editor;
        this.handler = new HashHandler();
        this.active = false;
        this.init();
        this.initKeys();
        this.editor.container.appendChild(this.wrap);
        this.listElement.innerHTML = '';
    }
    AutoCompleteView.selectedClassName = 'autocomplete_selected';
    AutoCompleteView.className = 'autocomplete';
    AutoCompleteView.prototype.init = function () {
        this.wrap = document.createElement('div');
        this.listElement = document.createElement('ul');
        this.wrap.className = AutoCompleteView.className;
        this.wrap.appendChild(this.listElement);
    };
    AutoCompleteView.prototype.getInputText = function () {
        var cursor = this.editor.getCursorPosition();
        var result = this.editor.getSession().getTokenAt(cursor.row, cursor.column);
        if(result) {
            return result.value;
        } else {
            return "";
        }
    };
    AutoCompleteView.prototype.filter = function () {
        var text = this.getInputText().toLowerCase();
        if(!text) {
            return this.completions;
        }
        var result = this.completions.filter(function (entry) {
            return entry.name.toLowerCase().indexOf(text) > -1;
        });
        return result;
    };
    AutoCompleteView.prototype.initKeys = function () {
        var _this = this;
        this.handler.bindKey("Down", function () {
            _this.focusNext();
        });
        this.handler.bindKey("Up", function () {
            _this.focusPrev();
        });
        this.handler.bindKey("Esc", function () {
            _this.hide();
        });
        this.handler.bindKey("Return|Tab", function () {
            var current = _this.current();
            if(current) {
                _this.editor.insert(current.dataset["name"]);
            }
            _this.hide();
        });
    };
    AutoCompleteView.prototype.show = function () {
        var _this = this;
        this.editor.keyBinding.addKeyboardHandler(this.handler);
        this.wrap.style.display = 'block';
        this.changeListener = function (ev) {
            return _this.onChange(ev);
        };
        this.editor.getSession().on("change", this.changeListener);
        this.active = true;
    };
    AutoCompleteView.prototype.hide = function () {
        this.editor.keyBinding.removeKeyboardHandler(this.handler);
        this.wrap.style.display = 'none';
        this.editor.getSession().removeListener('change', this.changeListener);
        this.active = false;
    };
    AutoCompleteView.prototype.onChange = function (ev) {
        var key = ev.data.text;
        if(" -=,[]_/()!';:<>".indexOf(key) !== -1) {
            this.hide();
        }
    };
    AutoCompleteView.prototype.showCompletions = function (completions) {
        if(this.active) {
            return;
        }
        this.completions = completions;
        var infos = completions;
        if(infos.length > 0) {
            this.listElement.innerHTML = "";
            var text = "";
            var cursor = this.editor.getCursorPosition();
            var coords = this.editor.renderer.textToScreenCoordinates(cursor.row, cursor.column - text.length);
            this.setPosition(coords);
            this.show();
            var html = '';
            for(var n in infos) {
                var info = infos[n];
                var kindClass = "kind-" + info.kind;
                var name = '<span class="name ' + kindClass + '">' + info.name + '</span>';
                var type = "";
                if(info.name !== info.type) {
                    type = '<span class="type">' + info.type + '</span>';
                }
                var kind = "";
                html += '<li data-name="' + info.name + '">' + kind + name + type + '</li>';
            }
            this.listElement.innerHTML = html;
            this.ensureFocus();
        } else {
            this.hide();
        }
    };
    AutoCompleteView.prototype.setPosition = function (coords) {
        var bottom, editorBottom, top;
        top = coords.pageY + 20;
        editorBottom = $(this.editor.container).offset().top + $(this.editor.container).height();
        bottom = top + $(this.wrap).height();
        if(bottom < editorBottom) {
            this.wrap.style.top = top + 'px';
            return this.wrap.style.left = coords.pageX + 'px';
        } else {
            this.wrap.style.top = (top - $(this.wrap).height() - 20) + 'px';
            return this.wrap.style.left = coords.pageX + 'px';
        }
    };
    AutoCompleteView.prototype.current = function () {
        var child, children, i;
        children = this.listElement.childNodes;
        for(i in children) {
            child = children[i];
            if(child.className === AutoCompleteView.selectedClassName) {
                return child;
            }
        }
        return null;
    };
    AutoCompleteView.prototype.focusNext = function () {
        var curr, focus;
        curr = this.current();
        focus = curr.nextSibling;
        if(focus) {
            curr.className = '';
            focus.className = AutoCompleteView.selectedClassName;
            return this.adjustPosition();
        }
    };
    AutoCompleteView.prototype.focusPrev = function () {
        var curr, focus;
        curr = this.current();
        focus = curr.previousSibling;
        if(focus) {
            curr.className = '';
            focus.className = AutoCompleteView.selectedClassName;
            return this.adjustPosition();
        }
    };
    AutoCompleteView.prototype.ensureFocus = function () {
        if(!this.current()) {
            var element = this.listElement.firstChild;
            if(element) {
                element.className = AutoCompleteView.selectedClassName;
                return this.adjustPosition();
            }
        }
    };
    AutoCompleteView.prototype.adjustPosition = function () {
        var elm, elmOuterHeight, newMargin, pos, preMargin, wrapHeight;
        elm = this.current();
        if(elm) {
            newMargin = '';
            wrapHeight = $(this.wrap).height();
            elmOuterHeight = $(elm).outerHeight();
            preMargin = $(this.listElement).css("margin-top").replace('px', '');
            preMargin = parseInt(preMargin);
            pos = $(elm).position();
            if(pos.top >= (wrapHeight - elmOuterHeight)) {
                newMargin = (preMargin - elmOuterHeight) + 'px';
                $(this.listElement).css("margin-top", newMargin);
            }
            if(pos.top < 0) {
                newMargin = (-pos.top + preMargin) + 'px';
                return $(this.listElement).css("margin-top", newMargin);
            }
        }
    };
    return AutoCompleteView;
})();
var cats;
(function (cats) {
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
            console.log("Send message " + message.method + ":" + message.id + " to worker");
            if(handler) {
                this.registry[this.messageId] = handler;
            }
        };
        ISenseHandler.prototype.init = function () {
            var _this = this;
            this.worker.onmessage = function (e) {
                var msg = e.data;
                console.log("Received message reply " + msg.id + " from worker.");
                if(msg.error) {
                    console.error("Got error back !!! ");
                    console.error(msg.error.stack);
                }
                var id = msg.id;
                if(id) {
                    var handler = _this.registry[id];
                    if(handler) {
                        delete _this.registry[id];
                        handler(msg.error, msg.result);
                    }
                } else {
                    console.log(msg);
                }
            };
        };
        return ISenseHandler;
    })();
    cats.ISenseHandler = ISenseHandler;    
})(cats || (cats = {}));
var cats;
(function (cats) {
    var fs = require("fs");
    var path = require("path");
    var Project = (function () {
        function Project(projectDir) {
            this.projectDir = projectDir;
            this.ignoreChange = false;
            this.loadDefaultLib = true;
            this.changed = false;
            this.markedErrors = [];
            this.initEditor();
            this.autoCompleteView = new AutoCompleteView(this.editor);
            this.iSense = new cats.ISenseHandler();
            if(this.loadDefaultLib) {
                var libdts = Project.readTextFile("typings/lib.d.ts");
                this.iSense.perform("addScript", "lib.d.ts", libdts, true, null);
            }
            this.scanProjectDir();
            this.editor.getSession().getUndoManager().reset();
            this.assimilate();
        }
        Project.prototype.assimilate = function () {
            setTimeout(function () {
                var elem = $(".ace_gutter");
                var bg = elem.css("background-color");
                var fg = elem.css("color");
                $("body").css("background-color", bg);
                $("body").css("color", fg);
                $(".autocomplete").css("background-color", bg);
                $(".autocomplete").css("color", fg);
                $("input").css("background-color", fg);
                $("input").css("color", bg);
            }, 500);
        };
        Project.prototype.autoComplete = function () {
            var _this = this;
            var editor = this.editor;
            var cursor = editor.getCursorPosition();
            if(this.changed) {
                var source = editor.getValue();
                this.iSense.perform("updateScript", this.filename, source, function (err, result) {
                    _this.handleCompileErrors(result);
                });
                this.changed = false;
            }
            ; ;
            this.iSense.perform("autoComplete", cursor, this.filename, function (err, completes) {
                if(completes != null) {
                    _this.autoCompleteView.showCompletions(completes.entries);
                }
            });
        };
        Project.prototype.initEditor = function () {
            var _this = this;
            var editor = ace.edit("editor");
            editor.setTheme("ace/theme/clouds");
            editor.getSession().setMode("ace/mode/typescript");
            this.ignoreChange = true;
            editor.commands.addCommands([
                {
                    name: "autoComplete",
                    bindKey: "Ctrl-Space",
                    exec: this.autoComplete.bind(this)
                }
            ]);
            var originalTextInput = editor.onTextInput;
            editor.onTextInput = function (text) {
                originalTextInput.call(editor, text);
                if(text === ".") {
                    _this.autoComplete();
                }
            };
            editor.getSession().on("change", this.onChangeHandler.bind(this));
            this.editor = editor;
        };
        Project.prototype.handleCompileErrors = function (errors) {
            this.editor.getSession().setAnnotations(errors);
        };
        Project.prototype.onChangeHandler = function (event) {
            var _this = this;
            if(this.ignoreChange) {
                console.log("ignoring change");
                return;
            }
            this.changed = true;
            clearTimeout(this.updateSourceTimer);
            this.updateSourceTimer = setTimeout(function () {
                if(_this.changed) {
                    console.log("updating source code for file " + _this.filename);
                    var source = _this.editor.getValue();
                    _this.iSense.perform("updateScript", _this.filename, source, function (err, result) {
                        _this.handleCompileErrors(result);
                    });
                    _this.changed = false;
                }
            }, 500);
        };
        Project.prototype.updateNonTs = function (name) {
            var content = Project.readTextFile(name);
            this.editor.getSession().setMode("ace/mode/text");
            this.editor.setValue(content);
            this.filename = name;
            this.editor.moveCursorTo(0, 0);
        };
        Project.prototype.updateEditor = function (name) {
            var _this = this;
            this.ignoreChange = true;
            var ext = path.extname(name);
            if(ext !== ".ts") {
                this.updateNonTs(name);
            } else {
                var tsName = path.basename(name);
                this.iSense.perform("getScript", tsName, function (err, script) {
                    _this.filename = tsName;
                    _this.editor.getSession().setMode("ace/mode/typescript");
                    _this.editor.setValue(script.content);
                    _this.editor.moveCursorTo(0, 0);
                    _this.ignoreChange = false;
                });
            }
        };
        Project.readTextFile = function readTextFile(fullName) {
            var data = fs.readFileSync(fullName, "utf-8");
            var content = data.replace(/\r\n?/g, "\n");
            return content;
        }
        Project.prototype.scanProjectDir = function () {
            var _this = this;
            var children = cats.createTreeViewer(this.projectDir, [], function (tsName) {
                var script = {
                    name: path.basename(tsName),
                    content: Project.readTextFile(tsName)
                };
                _this.iSense.perform("updateScript", script.name, script.content, function () {
                });
                console.log("Added script " + script.name);
            });
            $("#fileTree").innerHTML = "";
            $("#fileTree").dynatree({
                onActivate: function (node) {
                    var scriptname = node.data.key;
                    if(scriptname) {
                        cats.project.updateEditor(scriptname);
                    }
                },
                children: children
            });
        };
        return Project;
    })();
    cats.Project = Project;    
})(cats || (cats = {}));
var cats;
(function (cats) {
    var fs = require("fs");
    var path = require("path");
    function createTreeViewer(dir, parent, tsHandler) {
        fs.readdirSync(dir).forEach(function (file) {
            var name = path.join(dir, file);
            var child = {
                title: file,
                key: "",
                isFolder: false,
                children: []
            };
            var stat = fs.statSync(name);
            if(stat.isFile()) {
                child["abc"] = true;
                child.key = name;
                if(path.extname(name) === ".ts") {
                    tsHandler(name);
                }
                parent.push(child);
            }
            if(stat.isDirectory()) {
                child.isFolder = true;
                createTreeViewer(name, child.children, tsHandler);
                parent.push(child);
            }
        });
        return parent;
    }
    cats.createTreeViewer = createTreeViewer;
})(cats || (cats = {}));
var cats;
(function (cats) {
    function selectProject() {
        var chooser = document.getElementById('fileDialog');
        chooser.onchange = function (evt) {
            console.log(this.value);
            setProject(this.value);
        };
        chooser.click();
    }
    cats.selectProject = selectProject;
    ; ;
    cats.project = null;
    function setProject(dir) {
        cats.project = new cats.Project(dir);
    }
    cats.setProject = setProject;
    setProject("./demo");
})(cats || (cats = {}));
var gui = require('nw.gui');
var win = gui.Window.get();
function runFile() {
    window.open('./demo/index.html', '_blank');
}
; ;
function nop() {
    console.log("clicked");
}
; ;
function undoChange() {
    var man = cats.project.editor.getSession().getUndoManager();
    man.undo();
}
function redoChange() {
    var man = cats.project.editor.getSession().getUndoManager();
    man.redo();
}
function enableFind() {
    document.getElementById("findArea").style.display = "block";
}
function actionFind() {
    var input = document.getElementById("findText");
    cats.project.editor.find(input.value, {
    }, true);
}
function actionReplace() {
    var findText = document.getElementById("findText");
    var replaceText = document.getElementById("replaceText");
    var options = {
        needle: findText.value
    };
    cats.project.editor.replace(replaceText.value, options);
}
var themes = [
    {
        theme: "ace/theme/chrome",
        label: "Chrome"
    }, 
    {
        theme: "ace/theme/clouds",
        label: "Clouds"
    }, 
    {
        theme: "ace/theme/crimson_editor",
        label: "Crimson Editor"
    }, 
    {
        theme: "ace/theme/dawn",
        label: "Dawn"
    }, 
    {
        theme: "ace/theme/dreamweaver",
        label: "Dreamweaver"
    }, 
    {
        theme: "ace/theme/eclipse",
        label: "Eclipse"
    }, 
    {
        theme: "ace/theme/github",
        label: "GitHub"
    }, 
    {
        theme: "ace/theme/solarized_light",
        label: "Solarized Light"
    }, 
    {
        theme: "ace/theme/textmate",
        label: "TextMate"
    }, 
    {
        theme: "ace/theme/tomorrow",
        label: "Tomorrow"
    }, 
    {
        theme: "ace/theme/xcode",
        label: "XCode"
    }, 
    {
        theme: "ace/theme/ambiance",
        label: "Ambiance"
    }, 
    {
        theme: "ace/theme/clouds_midnight",
        label: "Clouds Midnight"
    }, 
    {
        theme: "ace/theme/cobalt",
        label: "Cobalt"
    }, 
    {
        theme: "ace/theme/idle_fingers",
        label: "idleFingers"
    }, 
    {
        theme: "ace/theme/kr_theme",
        label: "krTheme"
    }, 
    {
        theme: "ace/theme/merbivore",
        label: "Merbivore"
    }, 
    {
        theme: "ace/theme/merbivore_soft",
        label: "Merbivore Soft"
    }, 
    {
        theme: "ace/theme/mono_industrial",
        label: "Mono Industrial"
    }, 
    {
        theme: "ace/theme/monokai",
        label: "Monokai"
    }, 
    {
        theme: "ace/theme/pastel_on_dark",
        label: "Pastel on dark"
    }, 
    {
        theme: "ace/theme/solarized_dark",
        label: "Solarized Dark"
    }, 
    {
        theme: "ace/theme/twilight",
        label: "Twilight"
    }, 
    {
        theme: "ace/theme/tomorrow_night",
        label: "Tomorrow Night"
    }, 
    {
        theme: "ace/theme/tomorrow_night_blue",
        label: "Tomorrow Night Blue"
    }, 
    {
        theme: "ace/theme/tomorrow_night_bright",
        label: "Tomorrow Night Bright"
    }, 
    {
        theme: "ace/theme/tomorrow_night_eighties",
        label: "Tomorrow Night 80s"
    }, 
    {
        theme: "ace/theme/vibrant_ink",
        label: "Vibrant Ink"
    }, 
    
];
function setThemeWrapper(theme) {
    return function setTheme() {
        cats.project.editor.setTheme(theme);
        cats.project.assimilate();
    }
}
function createThemeMenu() {
    var menu = new gui.Menu();
    themes.forEach(function (theme) {
        menu.append(new gui.MenuItem({
            label: theme.label,
            click: setThemeWrapper(theme.theme)
        }));
    });
    return menu;
}
function enableReplace() {
    document.getElementById("findArea").style.display = "block";
    document.getElementById("replaceArea").style.display = "block";
}
function createMenubar() {
    var menubar = new gui.Menu({
        type: 'menubar'
    });
    var file = new gui.Menu();
    file.append(new gui.MenuItem({
        label: 'Open Project...',
        click: cats.selectProject
    }));
    var edit = new gui.Menu();
    edit.append(new gui.MenuItem({
        label: 'Undo',
        click: undoChange
    }));
    edit.append(new gui.MenuItem({
        label: 'Redo',
        click: redoChange
    }));
    edit.append(new gui.MenuItem({
        label: 'Find',
        click: enableFind
    }));
    edit.append(new gui.MenuItem({
        label: 'Replace',
        click: enableReplace
    }));
    var refactor = new gui.Menu();
    refactor.append(new gui.MenuItem({
        label: 'Rename',
        click: nop
    }));
    var run = new gui.Menu();
    run.append(new gui.MenuItem({
        label: 'Run main',
        click: runFile
    }));
    run.append(new gui.MenuItem({
        label: 'Debug main',
        click: nop
    }));
    var settings = new gui.Menu();
    settings.append(new gui.MenuItem({
        label: 'xyz',
        click: nop
    }));
    settings.append(new gui.MenuItem({
        label: 'theme',
        submenu: createThemeMenu()
    }));
    menubar.append(new gui.MenuItem({
        label: 'File',
        submenu: file
    }));
    menubar.append(new gui.MenuItem({
        label: 'Edit',
        submenu: edit
    }));
    menubar.append(new gui.MenuItem({
        label: 'Refactor',
        submenu: refactor
    }));
    menubar.append(new gui.MenuItem({
        label: 'Run',
        submenu: run
    }));
    menubar.append(new gui.MenuItem({
        label: 'Settings',
        submenu: settings
    }));
    win.menu = menubar;
}
createMenubar();
