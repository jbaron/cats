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
        var text = this.editor.session.getLine(cursor.row).slice(0, cursor.column + 1);
        var matches = text.match(/[a-zA-Z_0-9\$]*$/);
        if(matches && matches[0]) {
            return matches[0];
        } else {
            return "";
        }
    };
    AutoCompleteView.prototype.getInputText2 = function () {
        var cursor = this.editor.getCursorPosition();
        var result = this.editor.getSession().getTokenAt(cursor.row, cursor.column);
        if(result && result.value) {
            return result.value.trim();
        } else {
            return "";
        }
    };
    AutoCompleteView.prototype.filter = function () {
        var text = this.getInputText();
        if(!text) {
            return this.completions;
        }
        console.log("token: " + text);
        if(text === ".") {
            return this.completions;
        }
        var result = this.completions.filter(function (entry) {
            return entry.name.indexOf(text) === 0;
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
                var inputText = _this.getInputText();
                for(var i = 0; i < inputText.length; i++) {
                    _this.editor.remove("left");
                }
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
            return;
        }
        this.render();
    };
    AutoCompleteView.prototype.render = function () {
        var infos = this.filter();
        if(infos.length > 0) {
            this.listElement.innerHTML = "";
            var html = '';
            for(var n in infos) {
                var info = infos[n];
                var kindClass = "kind-" + info.kind;
                var name = '<span class="name ' + kindClass + '">' + info.name + '</span>';
                var type = "";
                if(info.name !== info.type) {
                    type = '<span class="type">' + info.type + '</span>';
                }
                html += '<li data-name="' + info.name + '">' + name + type + '</li>';
            }
            this.listElement.innerHTML = html;
            this.ensureFocus();
        }
    };
    AutoCompleteView.prototype.showCompletions = function (completions) {
        if(this.active) {
            return;
        }
        this.completions = completions;
        var cursor = this.editor.getCursorPosition();
        var coords = this.editor.renderer.textToScreenCoordinates(cursor.row, cursor.column);
        this.setPosition(coords);
        this.show();
        this.render();
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
            this.worker = new Worker("./lib/tsworker.js");
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
        ISenseHandler.prototype.clear = function () {
            this.registry = {
            };
        };
        ISenseHandler.prototype.init = function () {
            var _this = this;
            this.worker.onmessage = function (e) {
                var msg = e.data;
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
    var fs = require("fs")
    var path = require("path")
    function sort(a, b) {
        if(a.stat.isFile() && b.stat.isDirectory()) {
            return 1;
        }
        if(a.stat.isDirectory() && b.stat.isFile()) {
            return -1;
        }
        if(a.name > b.name) {
            return 1;
        }
        if(b.name > a.name) {
            return -1;
        }
        return 0;
    }
    var TreeViewer = (function () {
        function TreeViewer(projectDir) {
            this.projectDir = projectDir;
        }
        TreeViewer.prototype.getFullDir = function (dir) {
            return path.join(this.projectDir, dir);
        };
        TreeViewer.prototype.createTreeViewer = function (dir, parent, tsHandler) {
            var _this = this;
            var fullDir = this.getFullDir(dir);
            var files = fs.readdirSync(fullDir);
            var entries = [];
            files.forEach(function (file) {
                entries.push({
                    name: file,
                    key: path.join(dir, file),
                    stat: fs.statSync(path.join(fullDir, file))
                });
            });
            entries.sort(sort);
            entries.forEach(function (file) {
                var child = {
                    title: file.name,
                    key: "",
                    isFolder: false,
                    children: []
                };
                if(file.stat.isFile()) {
                    child.key = file.key;
                    if(path.extname(file.name) === ".ts") {
                        tsHandler(file.key);
                    }
                    parent.push(child);
                }
                if(file.stat.isDirectory()) {
                    child.isFolder = true;
                    _this.createTreeViewer(file.key, child.children, tsHandler);
                    parent.push(child);
                }
            });
            return parent;
        };
        return TreeViewer;
    })();
    cats.TreeViewer = TreeViewer;    
})(cats || (cats = {}));
function errorHandler(err, data) {
    if(err) {
        console.log(err);
        alert("Error occured, check console logging");
    }
}
var cats;
(function (cats) {
    var fs = require("fs")
    var path = require("path")
    var Configuration = (function () {
        function Configuration(projectRoot) {
            var fileName = path.join(projectRoot, Configuration.NAME);
            var dir = path.dirname(fileName);
            fs.exists(dir, function (exists) {
                if(!exists) {
                    fs.mkdirSync(dir);
                    console.log("created .setting directory");
                }
            });
        }
        Configuration.NAME = ".settings" + path.sep + "config.json";
        Configuration.prototype.load = function () {
            try  {
                var content = cats.project.readTextFile(Configuration.NAME);
                this._config = JSON.parse(content);
            } catch (err) {
                console.log("Couldn't load project configuration, loading defaults");
                this.loadDefault();
            }
        };
        Configuration.prototype.config = function () {
            return this._config;
        };
        Configuration.prototype.stringify = function () {
            var result = JSON.stringify(this._config, null, 4);
            return result;
        };
        Configuration.prototype.loadDefault = function () {
            this._config = {
                theme: "clouds",
                fontSize: 14,
                main: "index.html",
                sourcePath: null,
                outputPath: null,
                compiler: {
                    useDefaultLib: true,
                    outputMany: true,
                    outputFileName: "main.js",
                    emitComments: false,
                    generateDeclarationFiles: false,
                    mapSourceFiles: false,
                    codeGenTarget: 1,
                    moduleGenTarget: 0
                },
                minify: false,
                rememberOpenFiles: false
            };
        };
        return Configuration;
    })();
    cats.Configuration = Configuration;    
})(cats || (cats = {}));
var cats;
(function (cats) {
    var path = require("path")
    var EditSession = ace.require("ace/edit_session").EditSession;
    var UndoManager = ace.require("ace/undomanager").UndoManager;
    var Session = (function () {
        function Session(project, name, content) {
            this.project = project;
            this.name = name;
            this.enableAutoComplete = false;
            this.pendingWorkerUpdate = false;
            this.changed = false;
            console.log("Creating new session for file " + name + " with content length " + content.length);
            var ext = path.extname(name);
            this.editSession = new EditSession(content, this.getMode(ext));
            if(ext === ".ts") {
                this.enableAutoComplete = true;
            }
            this.editSession.on("change", this.onChangeHandler.bind(this));
            this.editSession.setUndoManager(new UndoManager());
        }
        Session.MODES = {
            ".js": "ace/mode/javascript",
            ".ts": "ace/mode/typescript",
            ".html": "ace/mode/html",
            ".htm": "ace/mode/html",
            ".css": "ace/mode/css",
            ".less": "ace/mode/css",
            ".svg": "ace/mode/svg",
            ".yaml": "ace/mode/yaml",
            ".xml": "ace/mode/xml",
            ".json": "ace/mode/json"
        };
        Session.prototype.getValue = function () {
            return this.editSession.getValue();
        };
        Session.prototype.getMode = function (ext) {
            var result = Session.MODES[ext];
            if(!result) {
                result = "ace/mode/text";
            }
            return result;
        };
        Session.prototype.autoComplete = function (cursor, view) {
            if(!this.enableAutoComplete) {
                return;
            }
            if(this.pendingWorkerUpdate) {
                var source = this.editSession.getValue();
                this.project.iSense.perform("updateScript", this.name, source, function (err, result) {
                    _this.editSession.setAnnotations(result);
                });
                this.pendingWorkerUpdate = false;
            }
            ; ;
            this.project.iSense.perform("autoComplete", cursor, this.name, function (err, completes) {
                if(completes != null) {
                    view.showCompletions(completes.entries);
                }
            });
        };
        Session.prototype.onChangeHandler = function (event) {
            var _this = this;
            this.changed = true;
            if(!this.enableAutoComplete) {
                return;
            }
            this.pendingWorkerUpdate = true;
            clearTimeout(this.updateSourceTimer);
            this.updateSourceTimer = setTimeout(function () {
                if(_this.pendingWorkerUpdate) {
                    console.log("updating source code for file " + _this.name);
                    var source = _this.editSession.getValue();
                    _this.project.iSense.perform("updateScript", _this.name, source, function (err, result) {
                        _this.editSession.setAnnotations(result);
                    });
                    _this.pendingWorkerUpdate = false;
                }
            }, 1000);
        };
        return Session;
    })();
    cats.Session = Session;    
})(cats || (cats = {}));
var cats;
(function (cats) {
    (function (ui) {
        var fs = require("fs")
        var path = require("path")
        function sort(a, b) {
            if((!a.isFolder) && b.isFolder) {
                return 1;
            }
            if(a.isFolder && (!b.isFolder)) {
                return -1;
            }
            if(a.name > b.name) {
                return 1;
            }
            if(b.name > a.name) {
                return -1;
            }
            return 0;
        }
        var FileTree = (function () {
            function FileTree(rootDir) {
                this.rootDir = rootDir;
                var _this = this;
                var list = [
                    {
                        name: path.basename(rootDir),
                        path: "",
                        isFolder: true
                    }
                ];
                this.rootElem = this.render(list);
                this.rootElem.onclick = function (ev) {
                    ev.stopPropagation();
                    _this.toggle(ev.srcElement);
                };
            }
            FileTree.COLLAPSED = "collapsed";
            FileTree.OPENED = "opened";
            FileTree.prototype.appendTo = function (elem) {
                elem.appendChild(this.rootElem);
            };
            FileTree.prototype.render = function (list) {
                var ul = document.createElement("ul");
                list.forEach(function (entry) {
                    var li = document.createElement("li");
                    li.innerText = entry.name;
                    li.dataset.path = entry.path;
                    if(entry.isFolder) {
                        li.className = FileTree.COLLAPSED;
                        li.dataset.isFolder = true;
                    }
                    ul.appendChild(li);
                });
                return ul;
            };
            FileTree.prototype.toggle = function (li) {
                var _this = this;
                console.log(li);
                if(!li.className) {
                    if(this.onselect) {
                        this.onselect(li.dataset.path);
                    }
                    return;
                }
                if(li.className === FileTree.OPENED) {
                    li.className = FileTree.COLLAPSED;
                    li.removeChild(li.childNodes[1]);
                    return;
                }
                li.className = FileTree.OPENED;
                var dir = li.dataset.path;
                var fullDirName = path.join(this.rootDir, dir);
                var files = fs.readdirSync(fullDirName);
                var entries = [];
                files.forEach(function (file) {
                    var pathName = path.join(dir, file);
                    var fullName = path.join(_this.rootDir, pathName);
                    entries.push({
                        name: file,
                        path: pathName,
                        isFolder: fs.statSync(fullName).isDirectory()
                    });
                });
                entries.sort(sort);
                console.log(entries);
                var ul = this.render(entries);
                li.appendChild(ul);
            };
            return FileTree;
        })();
        ui.FileTree = FileTree;        
    })(cats.ui || (cats.ui = {}));
    var ui = cats.ui;
})(cats || (cats = {}));
var cats;
(function (cats) {
    var fs = require("fs")
    var path = require("path")
    var Project = (function () {
        function Project(projectDir) {
            this.sessions = [];
            this.loadDefaultLib = true;
            cats.project = this;
            this.projectDir = path.resolve(projectDir);
            this.config = new cats.Configuration(this.projectDir);
            this.config.load();
            this.editor = this.createEditor();
            this.setTheme(this.config.config().theme);
            this.autoCompleteView = new AutoCompleteView(this.editor);
            this.iSense = new cats.ISenseHandler();
            if(this.loadDefaultLib) {
                var libdts = fs.readFileSync("typings/lib.d.ts", "utf8");
                this.iSense.perform("addScript", "lib.d.ts", libdts, true, null);
            }
            this.loadTypeScriptFiles("");
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
        Project.prototype.setTheme = function (theme) {
            this.editor.setTheme("ace/theme/" + theme);
            this.assimilate();
        };
        Project.prototype.saveFile = function () {
            if(this.session.name === "untitled") {
                this.session.name = prompt("Please enter the file name") || "untitled";
            }
            if(this.session.name !== "untitled") {
                this.writeSession(this.session);
                this.session.changed = false;
            }
        };
        Project.prototype.getSession = function (name) {
            for(var i = 0; i < this.sessions.length; i++) {
                var session = this.sessions[i];
                if(session.name === name) {
                    return session;
                }
            }
        };
        Project.prototype.autoComplete = function () {
            if(this.session.enableAutoComplete) {
                var cursor = this.editor.getCursorPosition();
                this.session.autoComplete(cursor, this.autoCompleteView);
            }
        };
        Project.prototype.closeSession = function (name) {
            var session = this.getSession(name);
            if(session.changed) {
                var c = confirm("Save " + session.name + " before closing ?");
                if(c) {
                    this.writeSession(session);
                }
            }
            var index = this.sessions.indexOf(session);
            this.sessions.splice(index, 1);
            if(this.session === session) {
                this.session === null;
                $("#editor").hide();
            }
            cats.tabbar.refresh();
        };
        Project.prototype.close = function () {
            var _this = this;
            this.sessions.forEach(function (session) {
                if(session.changed) {
                    var c = confirm("Save " + session.name + " before closing ?");
                    if(c != null) {
                        _this.writeSession(session);
                    }
                }
                ; ;
            });
        };
        Project.prototype.createEditor = function () {
            var _this = this;
            var editor = ace.edit("editor");
            editor.getSession().setMode("ace/mode/typescript");
            editor.commands.addCommands([
                {
                    name: "autoComplete",
                    bindKey: "Ctrl-Space",
                    exec: this.autoComplete.bind(this)
                }, 
                {
                    name: "save",
                    bindKey: "Ctrl-s",
                    exec: this.saveFile.bind(this)
                }
            ]);
            var originalTextInput = editor.onTextInput;
            editor.onTextInput = function (text) {
                originalTextInput.call(editor, text);
                if(text === ".") {
                    _this.autoComplete();
                }
            };
            return editor;
        };
        Project.prototype.editFile = function (name, content) {
            var session = this.getSession(name);
            if(!session) {
                if(content == null) {
                    content = this.readTextFile(name);
                }
                session = new cats.Session(this, name, content);
                this.sessions.push(session);
                this.editor.setSession(session.editSession);
                this.editor.moveCursorTo(0, 0);
            } else {
                this.editor.setSession(session.editSession);
            }
            this.session = session;
            $("#editor").show();
            cats.tabbar.refresh();
        };
        Project.prototype.getFullName = function (name) {
            return path.join(this.projectDir, name);
        };
        Project.prototype.writeTextFile = function (name, value) {
            fs.writeFileSync(this.getFullName(name), value, "utf8");
        };
        Project.prototype.writeSession = function (session) {
            this.writeTextFile(session.name, session.getValue());
        };
        Project.prototype.readTextFile = function (name) {
            if(name === "untitled") {
                return "";
            }
            var data = fs.readFileSync(this.getFullName(name), "utf8");
            var content = data.replace(/\r\n?/g, "\n");
            return content;
        };
        Project.prototype.loadTypeScriptFiles = function (directory) {
            var _this = this;
            var files = fs.readdirSync(this.getFullName(directory));
            files.forEach(function (file) {
                var fullName = path.join(directory, file);
                var stats = fs.statSync(_this.getFullName(fullName));
                if(stats.isFile()) {
                    var ext = path.extname(file);
                    if(ext === ".ts") {
                        var content = _this.readTextFile(fullName);
                        _this.iSense.perform("updateScript", fullName, content, function () {
                        });
                        console.log("Loaded " + fullName);
                    }
                }
                if(stats.isDirectory()) {
                    _this.loadTypeScriptFiles(fullName);
                }
            });
        };
        return Project;
    })();
    cats.Project = Project;    
})(cats || (cats = {}));
var Menu;
(function (Menu) {
    var gui = require('nw.gui');
    var win = gui.Window.get();
    var Menubar = (function () {
        function Menubar() {
            this.themes = [
                {
                    theme: "chrome",
                    label: "Chrome"
                }, 
                {
                    theme: "clouds",
                    label: "Clouds"
                }, 
                {
                    theme: "crimson_editor",
                    label: "Crimson Editor"
                }, 
                {
                    theme: "dawn",
                    label: "Dawn"
                }, 
                {
                    theme: "dreamweaver",
                    label: "Dreamweaver"
                }, 
                {
                    theme: "eclipse",
                    label: "Eclipse"
                }, 
                {
                    theme: "github",
                    label: "GitHub"
                }, 
                {
                    theme: "solarized_light",
                    label: "Solarized Light"
                }, 
                {
                    theme: "textmate",
                    label: "TextMate"
                }, 
                {
                    theme: "tomorrow",
                    label: "Tomorrow"
                }, 
                {
                    theme: "xcode",
                    label: "XCode"
                }, 
                {
                    theme: null,
                    label: "seperator dark themes"
                }, 
                {
                    theme: "ambiance",
                    label: "Ambiance"
                }, 
                {
                    theme: "clouds_midnight",
                    label: "Clouds Midnight"
                }, 
                {
                    theme: "cobalt",
                    label: "Cobalt"
                }, 
                {
                    theme: "idle_fingers",
                    label: "idleFingers"
                }, 
                {
                    theme: "kr_theme",
                    label: "krTheme"
                }, 
                {
                    theme: "merbivore",
                    label: "Merbivore"
                }, 
                {
                    theme: "merbivore_soft",
                    label: "Merbivore Soft"
                }, 
                {
                    theme: "mono_industrial",
                    label: "Mono Industrial"
                }, 
                {
                    theme: "monokai",
                    label: "Monokai"
                }, 
                {
                    theme: "pastel_on_dark",
                    label: "Pastel on dark"
                }, 
                {
                    theme: "solarized_dark",
                    label: "Solarized Dark"
                }, 
                {
                    theme: "twilight",
                    label: "Twilight"
                }, 
                {
                    theme: "tomorrow_night",
                    label: "Tomorrow Night"
                }, 
                {
                    theme: "tomorrow_night_blue",
                    label: "Tomorrow Night Blue"
                }, 
                {
                    theme: "tomorrow_night_bright",
                    label: "Tomorrow Night Bright"
                }, 
                {
                    theme: "tomorrow_night_eighties",
                    label: "Tomorrow Night 80s"
                }, 
                {
                    theme: "vibrant_ink",
                    label: "Vibrant Ink"
                }, 
                
            ];
            var menubar = new gui.Menu({
                type: 'menubar'
            });
            var file = new gui.Menu();
            file.append(new gui.MenuItem({
                label: 'Open Project...',
                click: this.openProject
            }));
            file.append(new gui.MenuItem({
                label: 'New File',
                click: this.newFile
            }));
            file.append(new gui.MenuItem({
                label: 'Save (Ctrl+S)',
                click: this.editorCommand("save")
            }));
            file.append(new gui.MenuItem({
                label: 'Save As ...',
                click: this.nop
            }));
            file.append(new gui.MenuItem({
                label: 'Save All',
                click: this.nop
            }));
            file.append(new gui.MenuItem({
                label: 'Close File',
                click: this.closeFile
            }));
            file.append(new gui.MenuItem({
                label: 'Close All Files',
                click: this.closeAllFile
            }));
            file.append(new gui.MenuItem({
                label: 'Close Project',
                click: this.closeProject
            }));
            file.append(new gui.MenuItem({
                label: 'Close All Projects',
                click: this.closeAllProjects
            }));
            var edit = new gui.Menu();
            edit.append(new gui.MenuItem({
                label: 'Undo',
                click: this.editorCommand("undo")
            }));
            edit.append(new gui.MenuItem({
                label: 'Redo',
                click: this.editorCommand("redo")
            }));
            edit.append(new gui.MenuItem({
                label: 'Find',
                click: this.enableFind
            }));
            edit.append(new gui.MenuItem({
                label: 'Replace',
                click: this.enableReplace
            }));
            edit.append(new gui.MenuItem({
                label: 'Format code',
                click: this.formatText
            }));
            edit.append(new gui.MenuItem({
                type: "separator"
            }));
            edit.append(new gui.MenuItem({
                label: 'Cut',
                click: this.editorCommand("cut")
            }));
            edit.append(new gui.MenuItem({
                label: 'Paste',
                click: this.editorCommand("paste")
            }));
            edit.append(new gui.MenuItem({
                label: 'Copy',
                click: this.editorCommand("copy")
            }));
            var refactor = new gui.Menu();
            refactor.append(new gui.MenuItem({
                label: 'Rename',
                click: this.nop
            }));
            var run = new gui.Menu();
            run.append(new gui.MenuItem({
                label: 'Run main',
                click: this.runFile
            }));
            run.append(new gui.MenuItem({
                label: 'Compile All',
                click: this.compileAll
            }));
            run.append(new gui.MenuItem({
                label: 'Debug main',
                click: this.nop
            }));
            var settings = new gui.Menu();
            settings.append(new gui.MenuItem({
                label: 'Theme',
                submenu: this.createThemeMenu()
            }));
            settings.append(new gui.MenuItem({
                label: 'Preferences',
                click: this.preferences
            }));
            var help = new gui.Menu();
            help.append(new gui.MenuItem({
                label: 'Keyboard shortcuts',
                click: this.showShortcuts
            }));
            help.append(new gui.MenuItem({
                label: 'Process Info',
                click: this.showProcess
            }));
            help.append(new gui.MenuItem({
                label: 'Developers tools',
                click: this.showDevTools
            }));
            help.append(new gui.MenuItem({
                label: 'About',
                click: this.showAbout
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
            menubar.append(new gui.MenuItem({
                label: 'Help',
                submenu: help
            }));
            win.menu = menubar;
            this.menubar = menubar;
            console.log("created main menubar");
        }
        Menubar.prototype.editorCommand = function (command) {
            return function () {
                cats.project.editor.execCommand(command);
            }
        };
        Menubar.prototype.showShortcuts = function () {
            window.open('static/html/keyboard_shortcuts.html', '_blank');
        };
        Menubar.prototype.showAbout = function () {
            alert("CATS version 0.5.1\nCode Assisitant for TypeScript\nCreated by JBaron");
        };
        Menubar.prototype.closeAllProjects = function () {
            var sure = confirm("Do you really want to quit?");
            if(sure) {
                gui.App.closeAllWindows();
            }
        };
        Menubar.prototype.showDevTools = function () {
            win.showDevTools();
        };
        Menubar.prototype.newFile = function () {
            cats.project.editFile("untitled", "");
        };
        Menubar.prototype.closeFile = function () {
            cats.project.closeSession(cats.project.session.name);
        };
        Menubar.prototype.closeAllFile = function () {
            var sessions = cats.project.sessions;
            sessions.forEach(function (session) {
                cats.project.closeSession(session.name);
            });
        };
        Menubar.prototype.closeProject = function () {
            window.close();
        };
        Menubar.prototype.quit = function () {
            var sure = confirm("Do you really want to quit?");
            if(sure) {
                gui.App.quit();
            }
        };
        Menubar.prototype.showProcess = function () {
            var mem = process.memoryUsage();
            var display = "memory used: " + mem.heapUsed;
            display += "\nmemory total: " + mem.heapTotal;
            display += "\nplatform: " + process.platform;
            display += "\nworking directory: " + process.cwd();
            alert(display);
        };
        Menubar.prototype.compileAll = function () {
            var path = require("path");
            var options = cats.project.config.config().compiler;
            cats.project.iSense.perform("compile", options, function (err, data) {
                if(err) {
                    console.error(err);
                    alert("Error during compiling " + err);
                    return;
                }
                var sources = data.source;
                for(var name in sources) {
                    cats.project.writeTextFile(name, sources[name]);
                }
            });
        };
        Menubar.prototype.preferences = function () {
            var content = cats.project.config.stringify();
            var name = cats.Configuration.NAME;
            cats.project.editFile(name, content);
        };
        Menubar.prototype.openProject = function () {
            var chooser = document.getElementById('fileDialog');
            chooser.onchange = function (evt) {
                console.log(this.value);
                var param = encodeURIComponent(this.value);
                window.open('index.html?project=' + param, '_blank');
            };
            chooser.click();
        };
        Menubar.prototype.formatText = function () {
            var script = cats.project.editor.session.getScript();
            cats.project.iSense.perform("getFormattingEditsForRange", script.name, 0, script.content.length, function (err, result) {
                console.log(result);
            });
        };
        Menubar.prototype.saveFile = function () {
            cats.project.editor.execCommand("save");
        };
        Menubar.prototype.runFile = function () {
            var path = require("path");
            var main = cats.project.config.config().main;
            if(!main) {
                alert("Please specify the main html file to run in the project settings.");
                return;
            }
            var startPage = "file://" + cats.project.getFullName(main);
            console.log("Opening file: " + startPage);
            var win2 = gui.Window.open(startPage, {
                toolbar: true,
                webkit: {
                    "page-cache": false
                }
            });
            win2.reloadIgnoringCache();
        };
        Menubar.prototype.nop = function () {
            alert("Not yet implemented");
        };
        Menubar.prototype.undoChange = function () {
            var man = cats.project.editor.getSession().getUndoManager();
            man.undo();
        };
        Menubar.prototype.redoChange = function () {
            var man = cats.project.editor.getSession().getUndoManager();
            man.redo();
        };
        Menubar.prototype.enableFind = function () {
            document.getElementById("findArea").style.display = "block";
        };
        Menubar.prototype.actionFind = function () {
            var input = document.getElementById("findText");
            cats.project.editor.find(input.value, {
            }, true);
        };
        Menubar.prototype.actionReplace = function () {
            var findText = document.getElementById("findText");
            var replaceText = document.getElementById("replaceText");
            var options = {
                needle: findText.value
            };
            cats.project.editor.replace(replaceText.value, options);
        };
        Menubar.prototype.setThemeWrapper = function (theme) {
            return function setTheme() {
                cats.project.setTheme(theme);
            }
        };
        Menubar.prototype.createThemeMenu = function () {
            var _this = this;
            var menu = new gui.Menu();
            this.themes.forEach(function (theme) {
                if(theme.theme) {
                    menu.append(new gui.MenuItem({
                        label: theme.label,
                        click: _this.setThemeWrapper(theme.theme)
                    }));
                } else {
                    menu.append(new gui.MenuItem({
                        type: "separator"
                    }));
                }
            });
            return menu;
        };
        Menubar.prototype.enableReplace = function () {
            document.getElementById("findArea").style.display = "block";
            document.getElementById("replaceArea").style.display = "block";
        };
        return Menubar;
    })();    
    Menu.mainMenuBar;
    Menu.mainMenuBar = new Menubar();
})(Menu || (Menu = {}));
var menu;
(function (menu) {
    var fs = require("fs")
    var path = require("path")
    function nop() {
        alert("Not yet implemented");
    }
    ; ;
    var gui = require('nw.gui');
    var win = gui.Window.get();
    var ctxmenu;
    function createContextMenu() {
        var ctxmenu = new gui.Menu();
        ctxmenu.append(new gui.MenuItem({
            label: 'Goto Declaration',
            click: nop
        }));
        ctxmenu.append(new gui.MenuItem({
            label: 'Item B',
            click: nop
        }));
        ctxmenu.append(new gui.MenuItem({
            type: 'separator',
            click: nop
        }));
        ctxmenu.append(new gui.MenuItem({
            label: 'Item C',
            click: nop
        }));
        return ctxmenu;
    }
    var editorContextMenu = createContextMenu();
    document.getElementById("editor").addEventListener('contextmenu', function (ev) {
        ev.preventDefault();
        editorContextMenu.popup(ev.x, ev.y);
        return false;
    });
    function createFileContextMenu() {
        var ctxmenu = new gui.Menu();
        ctxmenu.append(new gui.MenuItem({
            label: 'Rename',
            click: rename
        }));
        ctxmenu.append(new gui.MenuItem({
            label: 'New file',
            click: newFile
        }));
        ctxmenu.append(new gui.MenuItem({
            label: 'Delete',
            click: deleteFile
        }));
        return ctxmenu;
    }
    var fileContextMenu = createFileContextMenu();
    function deleteFile() {
        var sure = confirm("Delete " + data.key);
        if(sure) {
            var fullName = cats.project.getFullName(data.key);
            fs.unlinkSync(fullName);
        }
    }
    function newFile() {
        var basedir;
        if(data.isFolder) {
            basedir = data.key;
        } else {
            basedir = path.dirname(data.key);
        }
        var name = prompt("Enter new file name ");
        if(name == null) {
            return;
        }
        var fullName = path.join(basedir, name);
        cats.project.writeTextFile(fullName, "");
    }
    function rename() {
        var name = prompt("Enter new name", data.key);
        if(name == null) {
            return;
        }
        var c = confirm("Going to rename " + data.key + " into " + name);
        if(c) {
            var root = cats.project.projectDir;
            try  {
                fs.renameSync(path.join(root, data.key), path.join(root, name));
            } catch (err) {
                alert(err);
            }
        }
    }
    var data = {
        key: "",
        isFolder: true
    };
    document.getElementById("fileTree").addEventListener('contextmenu', function (ev) {
        data.key = ev.srcElement.dataset.path;
        data.isFolder = ev.srcElement.dataset.isFolder;
        console.log(data.key);
        ev.preventDefault();
        fileContextMenu.popup(ev.x, ev.y);
        return false;
    });
})(menu || (menu = {}));
var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var cats;
(function (cats) {
    (function (ui) {
        var SingleSelector = (function () {
            function SingleSelector() {
                this.options = [];
                this.aspects = {
                };
            }
            SingleSelector.prototype.addOption = function (obj) {
                this.options.push({
                    value: obj
                });
            };
            SingleSelector.prototype.setOptions = function (arr) {
                this.options = arr;
            };
            SingleSelector.prototype.setAspect = function (name, aspect) {
                this.aspects[name] = aspect;
            };
            SingleSelector.prototype.getAspect = function (name, obj) {
                var aspect = this.aspects[name];
                if(aspect == null) {
                    return obj[name];
                } else {
                    if(typeof (aspect) === "function") {
                        return aspect(obj);
                    }
                    return obj[aspect];
                }
            };
            SingleSelector.prototype.select = function (obj, notify) {
                if (typeof notify === "undefined") { notify = false; }
                this.selected = obj;
            };
            SingleSelector.prototype.removeOption = function (obj) {
                this.options.forEach(function (option) {
                });
            };
            SingleSelector.prototype.refresh = function () {
            };
            return SingleSelector;
        })();
        ui.SingleSelector = SingleSelector;        
        var Tabbar = (function (_super) {
            __extends(Tabbar, _super);
            function Tabbar() {
                        _super.call(this);
                this.counter = 0;
                this.root = document.createElement("ul");
                this.root.onclick = this.onClickHandler.bind(this);
            }
            Tabbar.instances = {
            };
            Tabbar.counter = 0;
            Tabbar.nr = 0;
            Tabbar.prototype.render = function () {
                var _this = this;
                this.root.innerHTML = "";
                this.options.forEach(function (option) {
                    var optionElem = document.createElement("li");
                    optionElem["_value"] = option;
                    optionElem.innerText = _this.getAspect("name", option);
                    var longName = _this.getAspect("longname", option);
                    if(longName) {
                        optionElem.setAttribute("title", longName);
                    }
                    var selected = _this.getAspect("selected", option);
                    if(selected === true) {
                        optionElem.className = "active";
                    }
                    _this.root.appendChild(optionElem);
                });
            };
            Tabbar.prototype.refresh = function () {
                this.render();
            };
            Tabbar.prototype.appendTo = function (elem) {
                this.render();
                elem.appendChild(this.root);
            };
            Tabbar.prototype.select = function (obj, notify) {
                if (typeof notify === "undefined") { notify = false; }
                var _this = this;
                _super.prototype.select.call(this, obj);
                this.options.forEach(function (option) {
                    if(option.value === _this.selected) {
                        option.elem.className = "active";
                    } else {
                        option.elem.className = "";
                    }
                });
            };
            Tabbar.prototype.getSelectedOption = function (ev) {
                var elem = ev.srcElement;
                return elem["_value"];
            };
            Tabbar.prototype.onClickHandler = function (ev) {
                if(this.onselect) {
                    var option = this.getSelectedOption(ev);
                    this.onselect(option);
                }
            };
            return Tabbar;
        })(SingleSelector);
        ui.Tabbar = Tabbar;        
        function test() {
            var users = [
                {
                    name: "john",
                    age: 12
                }, 
                {
                    name: "peter",
                    age: 15
                }, 
                {
                    name: "marry",
                    age: 18
                }, 
                
            ];
            var tb = new Tabbar();
            tb.setOptions(users);
            tb.onselect = function (user) {
                alert("User selected");
            };
        }
    })(cats.ui || (cats.ui = {}));
    var ui = cats.ui;
})(cats || (cats = {}));
var cats;
(function (cats) {
    cats.project;
    
    var path = require("path")
    function getParameterByName(name) {
        name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
        var regexS = "[\\?&]" + name + "=([^&#]*)";
        var regex = new RegExp(regexS);
        var results = regex.exec(window.location.search);
        if(results == null) {
            return "";
        } else {
            return decodeURIComponent(results[1].replace(/\+/g, " "));
        }
    }
    function getParamByName(name) {
        var querystring = require("querystring");
        var params = querystring.parse(window.location.search);
        return params[name];
    }
    var defaultProject = "./samples" + path.sep + "greeter";
    cats.project = new cats.Project(getParameterByName("project") || defaultProject);
    var fileTree = new cats.ui.FileTree(cats.project.projectDir);
    fileTree.appendTo(document.getElementById("fileTree"));
    fileTree.onselect = function (filePath) {
        cats.project.editFile(filePath);
    };
    $(document).ready(function () {
        $('body').layout({
            applyDemoStyles: false,
            spacing_open: 3
        });
    });
    cats.tabbar;
    cats.tabbar = new cats.ui.Tabbar();
    cats.tabbar.setOptions(cats.project.sessions);
    cats.tabbar.setAspect("name", function (session) {
        return path.basename(session.name);
    });
    cats.tabbar.setAspect("selected", function (session) {
        return session === cats.project.session;
    });
    cats.tabbar.setAspect("longname", function (session) {
        return session.name;
    });
    cats.tabbar.onselect = function (session) {
        return cats.project.editFile(session.name);
    };
    cats.tabbar.appendTo(document.getElementById("tabs"));
    var gui = require('nw.gui');
    var win = gui.Window.get();
    win.on("close", function (ev) {
        console.log(ev);
        cats.project.close();
        if(win != null) {
            win.close(true);
        }
        this.close(true);
    });
})(cats || (cats = {}));
