var OS;
(function (OS) {
    (function (File) {
        var FS = require("fs");
        function mkdirRecursiveSync(path) {
            if(!FS.existsSync(path)) {
                mkdirRecursiveSync(PATH.dirname(path));
                FS.mkdirSync(path, 0775);
            }
        }
        function remove(path) {
            var isFile = FS.statSync(path).isFile();
            if(isFile) {
                FS.unlinkSync(path);
            } else {
                FS.rmdirSync(path);
            }
        }
        File.remove = remove;
        function rename(oldName, newName) {
            FS.renameSync(oldName, newName);
        }
        File.rename = rename;
        function writeTextFile(name, value) {
            mkdirRecursiveSync(PATH.dirname(name));
            FS.writeFileSync(name, value, "utf8");
        }
        File.writeTextFile = writeTextFile;
        function readDir(directory) {
            var files = FS.readdirSync(directory);
            var result = [];
            files.forEach(function (file) {
                var fullName = PATH.join(directory, file);
                var stats = FS.statSync(fullName);
                result.push({
                    name: file,
                    fullName: fullName,
                    isFile: stats.isFile(),
                    isDirectory: stats.isDirectory()
                });
            });
            return result;
        }
        File.readDir = readDir;
        function readTextFile(name) {
            if(name === "untitled") {
                return "";
            }
            var data = FS.readFileSync(name, "utf8");
            data = data.replace(/\r\n?/g, "\n");
            data = data.replace(/^\uFEFF/, '');
            return data;
        }
        File.readTextFile = readTextFile;
    })(OS.File || (OS.File = {}));
    var File = OS.File;
})(OS || (OS = {}));
var Cats;
(function (Cats) {
    var ObservableImpl = (function () {
        function ObservableImpl() {
            var props = [];
            for (var _i = 0; _i < (arguments.length - 0); _i++) {
                props[_i] = arguments[_i + 0];
            }
            this._observerRegistry = {
            };
            if(props.length) {
                this.makeObservable.apply(this, props);
            }
        }
        ObservableImpl.prototype.removeListener = function (event, listener) {
            var o = this._observerRegistry[event];
            if(o) {
                var i = o.indexOf(listener);
                if(i > -1) {
                    o.splice(i, 1);
                }
            }
        };
        ObservableImpl.prototype.emit = function (propertyName, value) {
            var _this = this;
            var s = this._observerRegistry[propertyName] || [];
            s.forEach(function (fn) {
                try  {
                    fn.call(_this, value, _this);
                } catch (err) {
                    console.error(err);
                }
            });
        };
        ObservableImpl.prototype.listeners = function (propertyName) {
            return this._observerRegistry[propertyName];
        };
        ObservableImpl.prototype.on = function (event, listener, initial) {
            if (typeof initial === "undefined") { initial = false; }
            if(!this._observerRegistry[event]) {
                this._observerRegistry[event] = [];
            }
            this._observerRegistry[event].push(listener);
            if(initial) {
                listener.call(this, this[event], this);
            }
        };
        ObservableImpl.prototype.handleViewer = function (event) {
            var viewer = window["__viewID"];
            if(viewer) {
                var l = this._observerRegistry[event];
                if(l) {
                    var found = false;
                    for(var i = 0; i < l.length; i++) {
                        if(l[i] === viewer) {
                            found = true;
                            break;
                        }
                    }
                    if(!found) {
                        l.push(viewer);
                    }
                } else {
                    this._observerRegistry[event] = [
                        viewer
                    ];
                }
            }
        };
        ObservableImpl.prototype.makeObservable = function () {
            var _this = this;
            var props = [];
            for (var _i = 0; _i < (arguments.length - 0); _i++) {
                props[_i] = arguments[_i + 0];
            }
            props.forEach(function (prop) {
                var privateVar = _this[prop];
                var timer = null;
                Object.defineProperty(_this, prop, {
                    get: function () {
                        return privateVar;
                    },
                    set: function (val) {
                        var _this = this;
                        console.log("received event: " + prop);
                        if(val === privateVar) {
                            return;
                        }
                        privateVar = val;
                        clearTimeout(timer);
                        timer = setTimeout(function () {
                            return _this.emit(prop, val);
                        }, 0);
                    }
                });
            });
        };
        ObservableImpl.prototype.makeObservable2 = function () {
            var _this = this;
            var props = [];
            for (var _i = 0; _i < (arguments.length - 0); _i++) {
                props[_i] = arguments[_i + 0];
            }
            props.forEach(function (prop) {
                var name = "_$_" + prop;
                _this[name] = _this[prop];
                Object.defineProperty(_this, prop, {
                    get: function () {
                        return this[name];
                    },
                    set: function (val) {
                        this[name] = val;
                        this.emit(prop, val);
                    }
                });
            });
        };
        return ObservableImpl;
    })();
    Cats.ObservableImpl = ObservableImpl;    
})(Cats || (Cats = {}));
var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Cats;
(function (Cats) {
    (function (View) {
        var BaseView = (function () {
            function BaseView(root) {
                this.root = root;
                this.icon = "";
                this.name = "";
            }
            BaseView.prototype.show = function () {
                this.root.style.display = "block";
            };
            BaseView.prototype.hide = function () {
                this.root.style.display = "none";
            };
            BaseView.prototype.appendTo = function (parent) {
                parent.appendChild(this.root);
            };
            return BaseView;
        })();
        View.BaseView = BaseView;        
        var ToolBar = (function (_super) {
            __extends(ToolBar, _super);
            function ToolBar() {
                        _super.call(this, document.getElementById("toolbar"));
                this.initToolBar();
            }
            ToolBar.prototype.initToolBar = function () {
                var t = document.getElementById("toolbar");
                t.innerHTML = "";
                var cmd = Cats.Commands.getAllCommands();
                cmd.forEach(function (cmd) {
                    if(cmd.icon) {
                        var button = document.createElement("button");
                        button.style.backgroundImage = "url(../" + cmd.icon + ")";
                        button.title = cmd.label;
                        button.onclick = cmd.command;
                        t.appendChild(button);
                    }
                });
            };
            return ToolBar;
        })(BaseView);
        View.ToolBar = ToolBar;        
    })(Cats.View || (Cats.View = {}));
    var View = Cats.View;
})(Cats || (Cats = {}));
var Cats;
(function (Cats) {
    (function (View) {
        var StatusBar = (function (_super) {
            __extends(StatusBar, _super);
            function StatusBar() {
                        _super.call(this, document.getElementById("statusbar"));
                this.initStatusBar();
            }
            StatusBar.prototype.appendTo = function (parent) {
            };
            StatusBar.prototype.initStatusBar = function () {
                var sessionMode = document.getElementById("sessionmode");
                IDE.mainEditor.on("editMode", function (mode) {
                    sessionMode.innerText = mode;
                });
                var overwriteMode = document.getElementById("overwritemode");
                IDE.mainEditor.onOverwrite(function (mode) {
                    overwriteMode.innerText = mode ? "overwrite" : "insert";
                });
            };
            return StatusBar;
        })(View.BaseView);
        View.StatusBar = StatusBar;        
    })(Cats.View || (Cats.View = {}));
    var View = Cats.View;
})(Cats || (Cats = {}));
var Cats;
(function (Cats) {
    (function (View) {
        function rangeToPosition(range) {
            return (range.start.row + 1) + ":" + (range.start.column + 1);
        }
        var SearchResults = (function (_super) {
            __extends(SearchResults, _super);
            function SearchResults() {
                        _super.call(this, document.getElementById("searchresults"));
            }
            SearchResults.prototype.render = function (data) {
                var searchResultsElem = IDE.searchResult;
                searchResultsElem.innerHTML = "";
                if(data) {
                    var grid = new Cats.UI.Grid();
                    grid.setColumns([
                        "message", 
                        "unitName", 
                        "position"
                    ]);
                    grid.setRows(data);
                    grid.setAspect("position", function (row) {
                        return rangeToPosition(row.range);
                    });
                    grid.render();
                    grid.appendTo(searchResultsElem);
                    grid.onselect = function (sel) {
                        IDE.openSession(sel.unitName, sel.range.start);
                    };
                }
            };
            return SearchResults;
        })(View.BaseView);
        View.SearchResults = SearchResults;        
    })(Cats.View || (Cats.View = {}));
    var View = Cats.View;
})(Cats || (Cats = {}));
var Cats;
(function (Cats) {
    (function (View) {
        function navigateToItemHasChildren(name, kind, data) {
            for(var i = 0; i < data.length; i++) {
                var item = data[i];
                if((item.containerName === name) && (item.containerKind === kind)) {
                    return true;
                }
            }
            return false;
        }
        var Outline = (function (_super) {
            __extends(Outline, _super);
            function Outline() {
                        _super.call(this, document.getElementById("outlinenav"));
                this.icon = "icon-outline";
                this.name = "Outline";
                this.initOutlineView();
            }
            Outline.prototype.handleOutlineEvent = function (session) {
                var project = session.project;
                var mode = "getScriptLexicalStructure";
                project.iSense.perform(mode, session.name, function (err, data) {
                    IDE.outlineNavigation.innerHTML = "";
                    var outliner = new Cats.UI.TreeView();
                    outliner.setAspect("children", function (parent) {
                        var name = parent ? parent.qualifyer : "";
                        var kind = parent ? parent.kind : "";
                        var result = [];
                        for(var i = 0; i < data.length; i++) {
                            var o = data[i];
                            if((o.containerKind === kind) && (o.containerName === name)) {
                                var fullName = o.name;
                                if(name) {
                                    fullName = name + "." + fullName;
                                }
                                var item = {
                                    name: o.name,
                                    decorator: "icon-" + o.kind,
                                    qualifyer: fullName,
                                    kind: o.kind,
                                    outline: o
                                };
                                item.isFolder = navigateToItemHasChildren(fullName, o.kind, data);
                                result.push(item);
                            }
                        }
                        return result;
                    });
                    outliner.appendTo(IDE.outlineNavigation);
                    outliner.onselect = function (value) {
                        var data = value.outline;
                        IDE.openSession(data.unitName, {
                            row: data.range.start.row,
                            column: data.range.start.column
                        });
                    };
                    outliner.refresh();
                });
            };
            Outline.prototype.initOutlineView = function () {
                var _this = this;
                IDE.on("activeSession", function (session) {
                    if(session && (session.mode === "typescript")) {
                        _this.handleOutlineEvent(session);
                    } else {
                        IDE.outlineNavigation.innerHTML = "";
                    }
                });
            };
            return Outline;
        })(View.BaseView);
        View.Outline = Outline;        
    })(Cats.View || (Cats.View = {}));
    var View = Cats.View;
})(Cats || (Cats = {}));
var Cats;
(function (Cats) {
    var ISenseHandler = (function () {
        function ISenseHandler() {
            this.messageId = 0;
            this.registry = {
            };
            this.worker = new Worker("../lib/tsworker.js");
            this.init();
        }
        ISenseHandler.prototype.getErrors = function (unitName, cb) {
            this.perform("getErrors", unitName, cb);
        };
        ISenseHandler.prototype.compile = function (cb) {
            this.perform("compile", cb);
        };
        ISenseHandler.prototype.getCompletions = function (unitName, cursor, cb) {
            this.perform("getCompletions", unitName, cursor, cb);
        };
        ISenseHandler.prototype.setCompilationSettings = function (settings) {
            this.perform("setCompilationSettings", settings, null);
        };
        ISenseHandler.prototype.addScript = function (unitName, content, persistent) {
            this.perform("addScript", unitName, content, persistent, null);
        };
        ISenseHandler.prototype.updateScript = function (unitName, content, persistent) {
            this.perform("updateScript", unitName, content, persistent, null);
        };
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
            console.log("Send message: " + message.method);
            if(handler) {
                IDE.busy(true);
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
                    IDE.busy(false);
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
    Cats.ISenseHandler = ISenseHandler;    
})(Cats || (Cats = {}));
var Cats;
(function (Cats) {
    var ConfigLoader = (function () {
        function ConfigLoader() { }
        ConfigLoader.getFileName = function getFileName(projectRoot) {
            return PATH.join(projectRoot, ".settings", "config.json");
        };
        ConfigLoader.load = function load(projectRoot) {
            var fileName = ConfigLoader.getFileName(projectRoot);
            try  {
                var content = OS.File.readTextFile(fileName);
                return JSON.parse(content);
            } catch (err) {
                console.log("Couldn't find project configuration, loading defaults");
                return ConfigLoader.loadDefault();
            }
        };
        ConfigLoader.loadDefault = function loadDefault() {
            var result = {
                version: "0.7",
                main: "index.html",
                sourcePath: null,
                buildOnSave: false,
                compiler: {
                    useDefaultLib: true,
                    outputOption: "",
                    emitComments: false,
                    generateDeclarationFiles: false,
                    mapSourceFiles: false,
                    codeGenTarget: 1,
                    moduleGenTarget: 0
                },
                minify: false,
                rememberOpenFiles: false
            };
            return result;
        };
        return ConfigLoader;
    })();
    Cats.ConfigLoader = ConfigLoader;    
})(Cats || (Cats = {}));
var Cats;
(function (Cats) {
    (function (UI) {
        var ToolTip = (function () {
            function ToolTip() {
                this.element = this.createElement();
            }
            ToolTip.prototype.show = function (x, y, tip) {
                this.element.innerHTML = tip;
                var st = this.element.style;
                st.left = (x + 10).toString(10) + "px";
                st.top = (y + 10).toString(10) + "px";
                st.display = "block";
            };
            ToolTip.prototype.hide = function () {
                this.element.style.display = "none";
            };
            ToolTip.prototype.createElement = function () {
                var tooltipNode = document.createElement("div");
                document.documentElement.appendChild(tooltipNode);
                var st = tooltipNode.style;
                st.position = "fixed";
                st.display = "none";
                st.background = "#ffffca";
                st.color = "#000023";
                st.borderRadius = "";
                st.border = "1px solid gray";
                st.padding = "1px";
                st.zIndex = "1000";
                st.fontFamily = "monospace";
                st.whiteSpace = "pre-line";
                return tooltipNode;
            };
            return ToolTip;
        })();
        UI.ToolTip = ToolTip;        
    })(Cats.UI || (Cats.UI = {}));
    var UI = Cats.UI;
})(Cats || (Cats = {}));
var Cats;
(function (Cats) {
    (function (UI) {
        var AspectWidget = (function () {
            function AspectWidget() {
                this.aspects = {
                };
                this.defaultHandler = function (data, name) {
                    return data[name];
                };
            }
            AspectWidget.prototype.setAspect = function (name, aspect) {
                this.aspects[name] = aspect;
            };
            AspectWidget.prototype.getValue = function (data, name) {
                var fn = this.aspects[name] || this.defaultHandler;
                return fn(data, name);
            };
            return AspectWidget;
        })();        
        var TreeView = (function () {
            function TreeView() {
                var _this = this;
                this.aspects = {
                };
                this.defaultHandler = function (data, name) {
                    return data[name];
                };
                this.openFolders = [];
                this.rootElem = document.createElement("div");
                this.rootElem.className = "treeview";
                this.rootElem.onclick = function (ev) {
                    ev.stopPropagation();
                    var elem = ev.srcElement;
                    if(elem.tagName.toLowerCase() === "span") {
                        if(_this.onselect) {
                            var entry = TreeView.getValueFromElement(elem);
                            _this.onselect(entry);
                        }
                    } else {
                        _this.handleClick(elem);
                    }
                };
            }
            TreeView.prototype.setAspect = function (name, aspect) {
                this.aspects[name] = aspect;
            };
            TreeView.prototype.getValue = function (data, name) {
                var fn = this.aspects[name] || this.defaultHandler;
                return fn(data, name);
            };
            TreeView.COLLAPSED = "collapsed";
            TreeView.OPENED = "opened";
            TreeView.prototype.refresh = function () {
                this.rootElem.innerHTML = "";
                var elem = this.render(this.getValue(null, "children"));
                this.rootElem.appendChild(elem);
            };
            TreeView.refreshElem = function refreshElem(elem) {
                if(elem.tagName !== "LI") {
                    elem = elem.parentElement;
                }
                if(elem.childElementCount > 1) {
                    elem.removeChild(elem.children[1]);
                    if($(elem).hasClass(TreeView.OPENED)) {
                        $(elem).removeClass(TreeView.OPENED);
                        $(elem).addClass(TreeView.COLLAPSED);
                    }
                }
            };
            TreeView.prototype.appendTo = function (elem) {
                elem.appendChild(this.rootElem);
            };
            TreeView.prototype.render = function (list) {
                var _this = this;
                var ul = document.createElement("ul");
                list.forEach(function (entry) {
                    var li = document.createElement("li");
                    var span = document.createElement("span");
                    span.innerText = _this.getValue(entry, "name");
                    li.appendChild(span);
                    li["_value"] = entry;
                    if(_this.getValue(entry, "isFolder")) {
                        li.className = TreeView.COLLAPSED;
                    }
                    _this.decorate(li);
                    ul.appendChild(li);
                });
                return ul;
            };
            TreeView.prototype.decorate = function (li) {
                var entry = li["_value"];
                var decorator = this.getValue(entry, "decorator");
                if(decorator) {
                    li.className += " " + decorator;
                }
            };
            TreeView.getValueFromElement = function getValueFromElement(elem) {
                if(elem.tagName.toLowerCase() === "span") {
                    elem = elem.parentNode;
                }
                return elem["_value"];
            };
            TreeView.prototype.handleClick = function (li) {
                if($(li).hasClass(TreeView.OPENED)) {
                    li.className = TreeView.COLLAPSED;
                    this.decorate(li);
                    var elem = li.childNodes[1];
                    elem.style.display = "none";
                    return;
                }
                if($(li).hasClass(TreeView.COLLAPSED)) {
                    li.className = TreeView.OPENED;
                    this.decorate(li);
                    var elem = li.childNodes[1];
                    if(elem) {
                        elem.style.display = "block";
                        return;
                    }
                    var entry = li["_value"];
                    var entries = this.getValue(entry, "children");
                    var ul = this.render(entries);
                    li.appendChild(ul);
                }
            };
            return TreeView;
        })();
        UI.TreeView = TreeView;        
    })(Cats.UI || (Cats.UI = {}));
    var UI = Cats.UI;
})(Cats || (Cats = {}));
var Cats;
(function (Cats) {
    var Project = (function () {
        function Project(projectDir) {
            this.tsFiles = [];
            IDE.project = this;
            this.projectDir = PATH.resolve(projectDir);
            this.refresh();
        }
        Project.prototype.initJSSense = function () {
            this.JSSense = new Cats.ISenseHandler();
            var fullName = PATH.join(process.cwd(), "typings/lib.d.ts");
            var libdts = OS.File.readTextFile(fullName);
            this.JSSense.addScript(fullName, libdts, true);
        };
        Project.prototype.refresh = function () {
            var _this = this;
            this.tsFiles = [];
            this.config = Cats.ConfigLoader.load(this.projectDir);
            this.name = this.config.name || PATH.basename(this.projectDir);
            document.title = "CATS | " + this.name;
            this.iSense = new Cats.ISenseHandler();
            this.iSense.setCompilationSettings(this.config.compiler);
            if(this.config.compiler.useDefaultLib) {
                var fullName = PATH.join(process.cwd(), "typings/lib.d.ts");
                var libdts = OS.File.readTextFile(fullName);
                this.iSense.addScript(fullName, libdts, true);
            }
            var srcPaths = [].concat(this.config.sourcePath);
            srcPaths.forEach(function (srcPath) {
                var fullPath = PATH.join(_this.projectDir, srcPath);
                _this.loadTypeScriptFiles(fullPath);
                _this.initTSWorker();
            });
        };
        Project.prototype.getStartURL = function () {
            var url = PATH.join(this.projectDir, this.config.main);
            return "file://" + url;
        };
        Project.prototype.initTSWorker = function () {
            if(this.tsFiles.length > 0) {
                this.iSense.perform("initialize", null);
            }
        };
        Project.prototype.loadTypeScriptFiles = function (directory) {
            var _this = this;
            var files = OS.File.readDir(directory);
            files.forEach(function (file) {
                try  {
                    var fullName = file.fullName;
                    if(file.isFile) {
                        console.log("FullName: " + fullName);
                        var ext = PATH.extname(fullName);
                        if(ext === ".ts") {
                            var content = OS.File.readTextFile(fullName);
                            _this.iSense.addScript(fullName, content);
                            _this.tsFiles.push(fullName);
                            console.log("Found TypeScript file: " + fullName);
                        }
                    }
                    if(file.isDirectory) {
                        _this.loadTypeScriptFiles(fullName);
                    }
                } catch (err) {
                    console.log("Got error while handling file " + fullName);
                    console.error(err);
                }
            });
        };
        return Project;
    })();
    Cats.Project = Project;    
})(Cats || (Cats = {}));
var Cats;
(function (Cats) {
    var EditSession = ace.require("ace/edit_session").EditSession;
    var UndoManager = ace.require("ace/undomanager").UndoManager;
    var AceSession = (function (_super) {
        __extends(AceSession, _super);
        function AceSession(name, content) {
                _super.call(this, "changed");
            this.name = name;
            this.overwrite = false;
            this.pendingWorkerUpdate = false;
            this.changed = false;
            console.log("Creating new session for file " + name);
            this.mode = this.determineMode(name);
            this.editSession = new EditSession(content, "ace/mode/" + this.mode);
            this.editSession.setNewLineMode("unix");
            this.editSession.on("change", this.onChangeHandler.bind(this));
            this.editSession.setUndoManager(new UndoManager());
            this.on("changed", function () {
                IDE.tabbar.refresh();
            });
        }
        AceSession.MODES = {
            ".js": "javascript",
            ".ts": "typescript",
            ".xhtml": "html",
            ".xhtm": "html",
            ".html": "html",
            ".htm": "html",
            ".css": "css",
            ".less": "less",
            ".md": "markdown",
            ".svg": "svg",
            ".yaml": "yaml",
            ".yml": "yaml",
            ".xml": "xml",
            ".json": "json",
            ".png": "binary",
            ".gif": "binary",
            ".jpg": "binary",
            ".jpeg": "binary"
        };
        AceSession.DEFAULT_MODE = "text";
        Object.defineProperty(AceSession.prototype, "project", {
            get: function () {
                return IDE.project;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AceSession.prototype, "shortName", {
            get: function () {
                if(!this.name) {
                    return "untitled";
                }
                return PATH.basename(this.name);
            },
            enumerable: true,
            configurable: true
        });
        AceSession.prototype.getPosition = function () {
            var c = this.editSession.getSelection().getCursor();
            var pos = {
                row: c.row,
                column: c.column
            };
            return pos;
        };
        AceSession.prototype.setListeners = function () {
            var _this = this;
            var listeners = {
                "changeOverwrite": function () {
                    _this.overwrite = _this.editSession.getOverwrite();
                }
            };
            for(var event in listeners) {
                this.editSession.on(event, listeners[event]);
            }
        };
        AceSession.prototype.persist = function () {
            if(this.name === "untitled") {
                this.name = prompt("Please enter the file name") || "untitled";
            }
            if(this.name !== "untitled") {
                OS.File.writeTextFile(this.name, this.getValue());
                this.changed = false;
            }
            if(IDE.project.config.buildOnSave && (this.mode === "typescript")) {
                Cats.Commands.runCommand(Cats.Commands.CMDS.project_build);
            }
        };
        AceSession.prototype.getValue = function () {
            return this.editSession.getValue();
        };
        AceSession.prototype.setValue = function (value) {
            this.editSession.setValue(value);
        };
        AceSession.prototype.getPositionFromScreenOffset = function (x, y) {
            var r = IDE.mainEditor.aceEditor.renderer;
            var offset = (x - r.$padding) / r.characterWidth;
            var correction = r.scrollTop ? 7 : 0;
            var row = Math.floor((y + r.scrollTop - correction) / r.lineHeight);
            var col = Math.round(offset);
            var docPos = this.editSession.screenToDocumentPosition(row, col);
            return docPos;
        };
        AceSession.prototype.showInfoAt = function (ev) {
            if(this.mode !== "typescript") {
                return;
            }
            var docPos = this.getPositionFromScreenOffset(ev.offsetX, ev.offsetY);
            var project = this.project;
            this.project.iSense.perform("getTypeAtPosition", this.name, docPos, function (err, data) {
                if(!data) {
                    return;
                }
                var member = data.memberName;
                if(!member) {
                    return;
                }
                var tip = data.description;
                if(data.docComment) {
                    tip += "<hr>" + data.docComment;
                }
                IDE.mainEditor.toolTip.show(ev.x, ev.y, tip);
            });
        };
        AceSession.prototype.determineMode = function (name) {
            var ext = PATH.extname(name);
            var result = AceSession.MODES[ext] || AceSession.DEFAULT_MODE;
            return result;
        };
        AceSession.prototype.autoCompleteJS = function (cursor, view) {
            var editSession = this.editSession;
            if(this.pendingWorkerUpdate) {
                var source = editSession.getValue();
                this.project.JSSense.updateScript(this.name, source);
                this.pendingWorkerUpdate = false;
            }
            ;
            this.project.JSSense.perform("autoComplete", cursor, this.name, function (err, completes) {
                if(completes != null) {
                    view.showCompletions(completes.entries);
                }
            });
        };
        AceSession.prototype.showErrors = function () {
            var _this = this;
            if(this.mode === "typescript") {
                this.project.iSense.getErrors(this.name, function (err, result) {
                    var annotations = [];
                    if(result) {
                        result.forEach(function (error) {
                            annotations.push({
                                row: error.range.start.row,
                                column: error.range.start.column,
                                type: "error",
                                text: error.message
                            });
                        });
                    }
                    _this.editSession.setAnnotations(annotations);
                });
            }
        };
        AceSession.prototype.update = function () {
            if(this.mode === "typescript") {
                var source = this.editSession.getValue();
                this.project.iSense.updateScript(this.name, source);
                clearTimeout(this.updateSourceTimer);
                this.pendingWorkerUpdate = false;
            }
            ;
        };
        AceSession.prototype.autoComplete = function (cursor, view) {
            if(this.mode === "javascript") {
                this.autoCompleteJS(cursor, view);
                return;
            }
            if(this.mode !== "typescript") {
                return;
            }
            if(this.pendingWorkerUpdate) {
                this.update();
            }
            this.project.iSense.perform("autoComplete", cursor, this.name, function (err, completes) {
                if(completes != null) {
                    view.showCompletions(completes.entries);
                }
            });
        };
        AceSession.prototype.onChangeHandler = function (event) {
            var _this = this;
            document;
            this.changed = true;
            this.pendingWorkerUpdate = true;
            if(this.mode !== "typescript") {
                return;
            }
            clearTimeout(this.updateSourceTimer);
            this.updateSourceTimer = setTimeout(function () {
                if(_this.pendingWorkerUpdate) {
                    _this.update();
                }
                _this.showErrors();
            }, 1000);
        };
        return AceSession;
    })(Cats.ObservableImpl);
    Cats.AceSession = AceSession;    
})(Cats || (Cats = {}));
var Cats;
(function (Cats) {
    (function (View) {
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
        var DirectoryReader = (function () {
            function DirectoryReader() {
                this.ignore = [
                    "^\."
                ];
            }
            DirectoryReader.prototype.read = function (dir) {
                var files = OS.File.readDir(dir.path);
                var entries = [];
                files.forEach(function (file) {
                    entries.push({
                        name: file.name,
                        path: file.fullName,
                        isFolder: file.isDirectory,
                        decorator: file.isDirectory ? "icon-folder" : "icon-file"
                    });
                });
                entries.sort(sort);
                return entries;
            };
            return DirectoryReader;
        })();        
        var Navigator = (function (_super) {
            __extends(Navigator, _super);
            function Navigator() {
                        _super.call(this, document.getElementById("filetree"));
                this.icon = "icon-files";
                this.name = "Files";
                this.initNavigatorView();
            }
            Navigator.prototype.initNavigatorView = function () {
                this.root.innerHTML = "";
                var proj = IDE.project;
                if(!proj) {
                    return;
                }
                var projects = [
                    proj
                ];
                projects.forEach(function (project) {
                    var dirReader = new DirectoryReader();
                    var fileTree = new Cats.UI.TreeView();
                    fileTree.setAspect("children", function (parent) {
                        if(parent == null) {
                            return [
                                {
                                    name: project.name,
                                    isFolder: true,
                                    path: project.projectDir,
                                    decorator: "icon-folder"
                                }
                            ];
                        }
                        return dirReader.read(parent);
                    });
                    fileTree.appendTo(IDE.fileNavigation);
                    fileTree.refresh();
                    fileTree.onselect = function (entry) {
                        if(!entry.isFolder) {
                            IDE.openSession(entry.path);
                        }
                    };
                });
            };
            return Navigator;
        })(View.BaseView);
        View.Navigator = Navigator;        
    })(Cats.View || (Cats.View = {}));
    var View = Cats.View;
})(Cats || (Cats = {}));
var Cats;
(function (Cats) {
    (function (View) {
        function showErrors(errors) {
            IDE.resultbar.selectOption(0);
            var grid = new Cats.UI.Grid();
            grid.setColumns([
                "message", 
                "unitName", 
                "position"
            ]);
            grid.setAspect("position", function (data) {
                return (data.range.start.row + 1) + ":" + (data.range.start.column + 1);
            });
            grid.setRows(errors);
            grid.onselect = function (data) {
                IDE.openSession(data.unitName, data.range.start);
            };
            grid.render();
            var result = IDE.compilationResult;
            result.innerHTML = "";
            grid.appendTo(result);
        }
        function showCompilationResults(data) {
            if(data.errors && (data.errors.length > 0)) {
                showErrors(data.errors);
                return;
            }
            IDE.resultbar.selectOption(2);
            var time = new Date();
            var stamp = time.toLocaleTimeString();
            IDE.console.innerText += "\n" + stamp + " Successfully generated " + Object.keys(data.source).length + " file(s).";
        }
        View.showCompilationResults = showCompilationResults;
    })(Cats.View || (Cats.View = {}));
    var View = Cats.View;
})(Cats || (Cats = {}));
var Cats;
(function (Cats) {
    var Ide = (function (_super) {
        __extends(Ide, _super);
        function Ide() {
                _super.call(this, "sessions", "activeSession", "project");
            this.sessions = [];
            this.views = {
                navigation: null,
                outline: null,
                searchResults: null,
                console: null,
                compilationResults: null,
                toolBar: null,
                statusBar: null,
                taskList: null,
                editor: null
            };
            this.resultbar = new Cats.UI.Tabbar();
            this.navigationBar = document.getElementById("navigationbar");
            this.fileNavigation = document.getElementById("filetree");
            this.outlineNavigation = document.getElementById("outlinenav");
            this.resultbarElem = document.getElementById("resultbar");
            this.compilationResult = document.getElementById("errorresults");
            this.searchResult = document.getElementById("searchresults");
            this.console = document.getElementById("console");
            this.taskBar = document.getElementById("infobar");
            this.editor = document.getElementById("editor");
            this.sessionBar = document.getElementById("sessionbar");
            this.mainMenu = null;
            this.mainEditor = new Cats.TextEditor(this.editor);
            this.mainEditor.init();
            this.init();
        }
        Ide.prototype.initViews = function () {
            this.views.outline = new Cats.View.Outline();
            this.views.toolBar = new Cats.View.ToolBar();
            this.views.statusBar = new Cats.View.StatusBar();
            this.views.searchResults = new Cats.View.SearchResults();
            this.views.navigation = new Cats.View.Navigator();
        };
        Ide.prototype.init = function () {
            var _this = this;
            this.config = this.loadConfig(true);
            setTimeout(function () {
                _this.setTheme(_this.config.theme);
                _this.setFontSize(_this.config.fontSize);
            }, 2000);
        };
        Ide.prototype.loadDefaultProjects = function () {
            var _this = this;
            if(this.config.projects && this.config.projects.length) {
                this.addProject(this.config.projects[0]);
            }
            if(this.config.sessions) {
                this.config.sessions.forEach(function (session) {
                    try  {
                        _this.openSession(session.path, session.pos);
                    } catch (err) {
                        console.error("error " + err);
                        alert("Couldn't open file " + session.path);
                    }
                });
            }
        };
        Ide.prototype.setFontSize = function (size) {
            this.config.fontSize = size;
            IDE.mainEditor.aceEditor.setFontSize(size + "px");
        };
        Ide.prototype.addSession = function (session) {
            this.sessions = this.sessions.concat([
                session
            ]);
        };
        Ide.prototype.hasUnsavedSessions = function () {
            for(var i = 0; i < this.sessions.length; i++) {
                if(this.sessions[i].changed) {
                    return true;
                }
            }
            return false;
        };
        Ide.prototype.getSession = function (name) {
            for(var i = 0; i < this.sessions.length; i++) {
                var session = this.sessions[i];
                if(session.name === name) {
                    return session;
                }
            }
        };
        Ide.prototype.busy = function (isBusy) {
            if(isBusy) {
                $("#activity").addClass("busy");
            } else {
                $("#activity").removeClass("busy");
            }
        };
        Ide.prototype.loadConfig = function (project) {
            var defaultConfig = {
                version: "1",
                theme: "cats",
                fontSize: 16,
                sessions: [],
                projects: [
                    PATH.join(process.cwd(), "samples", "greeter")
                ]
            };
            var configStr = localStorage["cats.config"];
            if(configStr) {
                try  {
                    var config = JSON.parse(configStr);
                    if(config.version === "1") {
                        return config;
                    }
                } catch (err) {
                    console.log("Error during parsing config " + err);
                }
            }
            return defaultConfig;
        };
        Ide.prototype.saveConfig = function () {
            var config = this.config;
            config.sessions = [];
            config.projects = [];
            this.sessions.forEach(function (session) {
                config.sessions.push({
                    path: session.name,
                    pos: session.getPosition()
                });
            });
            if(this.project) {
                config.projects.push(this.project.projectDir);
            }
            var configStr = JSON.stringify(config);
            localStorage["cats.config"] = configStr;
        };
        Ide.prototype.openSession = function (name, pos) {
            var session = this.getSession(name);
            if(!session) {
                var content;
                if(name) {
                    content = OS.File.readTextFile(name);
                }
                session = new Cats.AceSession(name, content);
                this.addSession(session);
            }
            this.mainEditor.edit(session, pos);
            this.activeSession = session;
            return session;
        };
        Ide.prototype.closeSession = function (session) {
            var result = [];
            if(session.changed) {
                var c = confirm("Save " + session.name + " before closing ?");
                if(c) {
                    session.persist();
                }
            }
            this.sessions.forEach(function (s) {
                if(s !== session) {
                    result.push(s);
                }
            });
            if(IDE.activeSession === session) {
                IDE.activeSession = null;
                IDE.mainEditor.hide();
            }
            this.sessions = result;
        };
        Ide.prototype.setTheme = function (theme) {
            this.config.theme = theme;
            IDE.mainEditor.setTheme(theme);
            setTimeout(function () {
                var isDark = document.getElementsByClassName("ace_dark").length > 0;
                var fg = isDark ? "white" : "black";
                var elem = document.getElementsByClassName("ace_scroller")[0];
                var bg = window.getComputedStyle(elem, null).backgroundColor;
                $("html, #main, #navigator, #info, #result").css("background-color", bg);
                $("html").css("color", fg);
                $(".autocomplete").css("background-color", bg);
                $(".autocomplete").css("color", fg);
                $("input").css("background-color", fg);
                $("input").css("color", bg);
            }, 500);
        };
        Ide.prototype.addProject = function (projectDir) {
            this.project = new Cats.Project(projectDir);
        };
        return Ide;
    })(Cats.ObservableImpl);
    Cats.Ide = Ide;    
})(Cats || (Cats = {}));
var Cats;
(function (Cats) {
    function initTabBar() {
        IDE.tabbar = new Cats.UI.Tabbar();
        var tb = IDE.tabbar;
        tb.setAspect("name", function (session) {
            return session.shortName;
        });
        tb.setAspect("selected", function (session) {
            return session === IDE.activeSession;
        });
        tb.setAspect("longname", function (session) {
            return session.name;
        });
        tb.setAspect("changed", function (session) {
            return session.changed;
        });
        tb.onselect = function (session) {
            return IDE.openSession(session.name);
        };
        tb.ondelete = function (session) {
            return IDE.closeSession(session);
        };
        tb.appendTo(IDE.sessionBar);
        IDE.on("sessions", function (sessions) {
            IDE.tabbar.setOptions(sessions);
        });
    }
    function initNavBar() {
        var navbar = new Cats.UI.Tabbar();
        var t = new Cats.UI.ElemTabAdapter(navbar, [
            IDE.fileNavigation, 
            IDE.outlineNavigation
        ], IDE.fileNavigation);
        t.setAspect(IDE.fileNavigation, "decorator", "icon-files");
        t.setAspect(IDE.outlineNavigation, "decorator", "icon-outline");
        navbar.appendTo(IDE.navigationBar);
    }
    function initInfoBar() {
        var infobar = new Cats.UI.Tabbar();
        infobar.setOptions([
            {
                name: "Task List",
                selected: true,
                decorator: "icon-tasks"
            }
        ]);
        infobar.appendTo(IDE.taskBar);
    }
    function initResultBar() {
        var t = new Cats.UI.ElemTabAdapter(IDE.resultbar, [
            IDE.compilationResult, 
            IDE.searchResult, 
            IDE.console
        ], IDE.compilationResult);
        t.setAspect(IDE.compilationResult, "decorator", "icon-errors");
        t.setAspect(IDE.searchResult, "decorator", "icon-search");
        t.setAspect(IDE.console, "decorator", "icon-console");
        IDE.resultbar.appendTo(IDE.resultbarElem);
    }
    function resizeOuter(name, state) {
        if(name === "west") {
            $("#filetree, #outlinenav").height(state.innerHeight() - 25);
        }
    }
    function resizeInner(name, state) {
        if(name === "center") {
            IDE.mainEditor.aceEditor.resize(true);
        }
        if(name === "south") {
            $("#searchresults, #errorresults").height(state.innerHeight() - 25);
        }
    }
    function layoutIDE() {
        initTabBar();
        initNavBar();
        initInfoBar();
        initResultBar();
        $('body').layout({
            onresize: resizeOuter,
            center__paneSelector: "#center",
            west__paneSelector: "#navigator",
            north__paneSelector: "#toolbar",
            south__paneSelector: "#statusbar",
            west__size: .20,
            spacing_open: 4,
            spacing_closed: 12,
            north__maxSize: 25,
            south__maxSize: 25,
            center__childOptions: {
                onresize: resizeInner,
                center__paneSelector: "#main",
                east__paneSelector: "#info",
                south__paneSelector: "#result",
                east__size: .20,
                south__size: .20,
                spacing_open: 4,
                spacing_closed: 12
            }
        });
    }
    Cats.layoutIDE = layoutIDE;
    ;
})(Cats || (Cats = {}));
var Cats;
(function (Cats) {
    (function (Commands) {
        function showShortcuts() {
            window.open('keyboard_shortcuts.html', '_blank');
        }
        function showAbout() {
            alert("Code Assisitant for TypeScript\nversion 0.7.5\nCreated by JBaron");
        }
        function showDevTools() {
            GUI.Window.get().showDevTools();
        }
        function showProcess() {
            var mem = process.memoryUsage();
            var display = "memory used: " + mem.heapUsed;
            display += "\nmemory total: " + mem.heapTotal;
            display += "\nplatform: " + process.platform;
            display += "\nworking directory: " + process.cwd();
            alert(display);
        }
        var HelpCommands = (function () {
            function HelpCommands() { }
            HelpCommands.init = function init(registry) {
                registry({
                    name: Commands.CMDS.help_about,
                    label: "About",
                    command: showAbout
                });
                registry({
                    name: Commands.CMDS.help_devTools,
                    label: "Developer Tools",
                    command: showDevTools
                });
                registry({
                    name: Commands.CMDS.help_shortcuts,
                    label: "Shortcuts",
                    command: showShortcuts
                });
                registry({
                    name: Commands.CMDS.help_processInfo,
                    label: "Process Info",
                    command: showProcess
                });
            };
            return HelpCommands;
        })();
        Commands.HelpCommands = HelpCommands;        
    })(Cats.Commands || (Cats.Commands = {}));
    var Commands = Cats.Commands;
})(Cats || (Cats = {}));
var Cats;
(function (Cats) {
    (function (Commands) {
        function newFile() {
            IDE.openSession("untitled");
        }
        function closeFile() {
            if(IDE.activeSession) {
                IDE.closeSession(IDE.activeSession);
            }
        }
        function closeAllFiles() {
            var sessions = IDE.sessions;
            sessions.forEach(function (session) {
                IDE.closeSession(session);
            });
        }
        function closeOtherFiles() {
            var sessions = IDE.sessions;
            var activeSession = IDE.activeSession;
            for(var i = 0; i < sessions.length; i++) {
                var session = sessions[i];
                if(session !== activeSession) {
                    IDE.closeSession(session);
                }
            }
        }
        function saveAll() {
            var sessions = IDE.sessions;
            for(var i = 0; i < sessions.length; i++) {
                var session = sessions[i];
                if(session.changed) {
                    session.persist();
                }
            }
        }
        function saveAs() {
            var session = IDE.activeSession;
            if(session) {
                var newName = prompt("Enter new name", session.name);
                if(newName) {
                    OS.File.writeTextFile(newName, session.getValue());
                }
            }
        }
        function saveFile() {
            var session = IDE.activeSession;
            if(session) {
                session.persist();
            }
        }
        var FileCommands = (function () {
            function FileCommands() { }
            FileCommands.init = function init(registry) {
                registry({
                    name: Commands.CMDS.file_new,
                    label: "New File",
                    command: newFile
                });
                registry({
                    name: Commands.CMDS.file_close,
                    label: "Close File",
                    command: closeFile
                });
                registry({
                    name: Commands.CMDS.file_closeOther,
                    label: "Close Other Files",
                    command: closeOtherFiles
                });
                registry({
                    name: Commands.CMDS.file_closeAll,
                    label: "Close All Files",
                    command: closeAllFiles
                });
                registry({
                    name: Commands.CMDS.file_save,
                    label: "Save File",
                    icon: "static/img/save_edit.gif",
                    command: saveFile
                });
                registry({
                    name: Commands.CMDS.file_saveAll,
                    label: "Save All",
                    icon: "static/img/saveall_edit.gif",
                    command: saveAll
                });
                registry({
                    name: Commands.CMDS.file_saveAs,
                    label: "Save As...",
                    icon: "static/img/saveas_edit.gif",
                    command: saveAs
                });
            };
            return FileCommands;
        })();
        Commands.FileCommands = FileCommands;        
    })(Cats.Commands || (Cats.Commands = {}));
    var Commands = Cats.Commands;
})(Cats || (Cats = {}));
var Cats;
(function (Cats) {
    (function (Commands) {
        function closeAllProjects() {
            var sure = confirm("Do you really want to quit?");
            if(sure) {
                GUI.App.closeAllWindows();
            }
        }
        function closeProject() {
            window.close();
        }
        function runProject() {
            var main = IDE.project.config.main;
            if(!main) {
                alert("Please specify the main html file to run in the project settings.");
                return;
            }
            var startPage = IDE.project.getStartURL();
            console.log("Opening file: " + startPage);
            var win2 = GUI.Window.open(startPage, {
                toolbar: true,
                webkit: {
                    "page-cache": false
                }
            });
        }
        ;
        function buildProject() {
            var project = IDE.project;
            IDE.compilationResult.innerHTML = "";
            project.iSense.compile(function (err, data) {
                Cats.View.showCompilationResults(data);
                if(data.errors && (data.errors.length > 0)) {
                    return;
                }
                var sources = data.source;
                for(var name in sources) {
                    var src = sources[name];
                    console.log(name);
                    if(name.indexOf(project.projectDir) !== 0) {
                        name = PATH.join(project.projectDir, name);
                    }
                    OS.File.writeTextFile(name, src);
                }
            });
        }
        function propertiesProject() {
            var project = IDE.project;
            var name = Cats.ConfigLoader.getFileName(project.projectDir);
            if(IDE.getSession(name)) {
                IDE.openSession(name);
            } else {
                var content = JSON.stringify(project.config, null, 4);
                var session = new Cats.AceSession(name, content);
                IDE.addSession(session);
                IDE.openSession(name);
            }
        }
        function refreshProject() {
            IDE.project.refresh();
        }
        function openProject() {
            var chooser = document.getElementById('fileDialog');
            chooser.onchange = function (evt) {
                console.log(this.value);
                var param = encodeURIComponent(this.value);
                this.value = "";
                window.open('index.html?project=' + param, '_blank');
            };
            chooser.click();
        }
        ;
        var ProjectCommands = (function () {
            function ProjectCommands() { }
            ProjectCommands.init = function init(registry) {
                registry({
                    name: Commands.CMDS.project_open,
                    label: "Open Project...",
                    command: openProject
                });
                registry({
                    name: Commands.CMDS.project_close,
                    label: "Close project",
                    command: closeProject
                });
                registry({
                    name: Commands.CMDS.project_build,
                    label: "Build Project",
                    command: buildProject
                });
                registry({
                    name: Commands.CMDS.project_refresh,
                    label: "Refresh Project",
                    command: refreshProject
                });
                registry({
                    name: Commands.CMDS.project_run,
                    label: "Run Project",
                    command: runProject
                });
                registry({
                    name: Commands.CMDS.project_debug,
                    label: "Debug Project",
                    command: null
                });
                registry({
                    name: Commands.CMDS.project_properties,
                    label: "Properties",
                    command: propertiesProject
                });
            };
            return ProjectCommands;
        })();
        Commands.ProjectCommands = ProjectCommands;        
    })(Cats.Commands || (Cats.Commands = {}));
    var Commands = Cats.Commands;
})(Cats || (Cats = {}));
var Cats;
(function (Cats) {
    (function (Commands) {
        function quit() {
            if(IDE.hasUnsavedSessions()) {
                if(!confirm("There are unsaved files!\nDo you really want to quit?")) {
                    return;
                }
            }
            IDE.saveConfig();
            GUI.App.quit();
        }
        function setTheme(theme) {
            IDE.setTheme(theme);
        }
        function setFontSize(size) {
            IDE.setFontSize(size);
        }
        var IdeCommands = (function () {
            function IdeCommands() { }
            IdeCommands.init = function init(registry) {
                registry({
                    name: Commands.CMDS.ide_quit,
                    label: "Quit",
                    command: quit
                });
                registry({
                    name: Commands.CMDS.ide_theme,
                    label: "Theme",
                    command: setTheme
                });
                registry({
                    name: Commands.CMDS.ide_fontSize,
                    label: "Font Size",
                    command: setFontSize
                });
            };
            return IdeCommands;
        })();
        Commands.IdeCommands = IdeCommands;        
    })(Cats.Commands || (Cats.Commands = {}));
    var Commands = Cats.Commands;
})(Cats || (Cats = {}));
var Cats;
(function (Cats) {
    (function (Commands) {
        var Range = ace.require("ace/range").Range;
        function rename() {
            var table = document.querySelector("#searchresults table");
            if(!table) {
                alert("Cannot rename if there are no search results available");
                return;
            }
            var grid = Cats.UI.Grid.getGridFromElement(table);
            var rows = grid.getRows();
            var msg = "Going to rename " + rows.length + " instances.\nPlease enter new name";
            var newName = prompt(msg);
            if(!newName) {
                return;
            }
            var i = rows.length;
            while(i--) {
                var data = rows[i];
                var session = IDE.openSession(data.unitName);
                var r = data.range;
                var range = new Range(r.start.row, r.start.column, r.end.row, r.end.column);
                session.editSession.replace(range, newName);
            }
        }
        var RefactorCommands = (function () {
            function RefactorCommands() { }
            RefactorCommands.init = function init(registry) {
                registry({
                    name: Commands.CMDS.refactor_rename,
                    label: "Rename",
                    command: rename
                });
            };
            return RefactorCommands;
        })();
        Commands.RefactorCommands = RefactorCommands;        
    })(Cats.Commands || (Cats.Commands = {}));
    var Commands = Cats.Commands;
})(Cats || (Cats = {}));
var Cats;
(function (Cats) {
    (function (Commands) {
        function getCursor() {
            return IDE.mainEditor.aceEditor.getCursorPosition();
        }
        function gotoDeclaration() {
            var session = IDE.activeSession;
            if(!session) {
                return;
            }
            var cursor = getCursor();
            session.project.iSense.perform("getDefinitionAtPosition", session.name, cursor, function (err, data) {
                if(data && data.unitName) {
                    IDE.openSession(data.unitName, data.range.start);
                }
            });
        }
        Commands.gotoDeclaration = gotoDeclaration;
        function getInfoAt(type) {
            var session = IDE.activeSession;
            if(!session) {
                return;
            }
            IDE.resultbar.selectOption(1);
            var cursor = getCursor();
            var searchResultsElem = IDE.searchResult;
            searchResultsElem.innerHTML = "";
            session.project.iSense.perform("getInfoAtPosition", type, session.name, cursor, function (err, data) {
                IDE.views.searchResults.render(data);
            });
        }
        function findReferences() {
            return getInfoAt("getReferencesAtPosition");
        }
        function findOccurences() {
            return getInfoAt("getOccurrencesAtPosition");
        }
        function findImplementors() {
            return getInfoAt("getImplementorsAtPosition");
        }
        var NavigateCommands = (function () {
            function NavigateCommands() { }
            NavigateCommands.init = function init(registry) {
                registry({
                    name: Commands.CMDS.navigate_references,
                    label: "Find References",
                    command: findReferences
                });
                registry({
                    name: Commands.CMDS.navigate_implementors,
                    label: "Find Implementations",
                    command: findImplementors
                });
                registry({
                    name: Commands.CMDS.navigate_occurences,
                    label: "Find Occurences",
                    command: findOccurences
                });
                registry({
                    name: Commands.CMDS.navigate_declaration,
                    label: "Goto declaration",
                    command: gotoDeclaration
                });
            };
            return NavigateCommands;
        })();
        Commands.NavigateCommands = NavigateCommands;        
    })(Cats.Commands || (Cats.Commands = {}));
    var Commands = Cats.Commands;
})(Cats || (Cats = {}));
var Cats;
(function (Cats) {
    (function (Commands) {
        function editorCommand(commandName) {
            return function () {
                IDE.mainEditor.aceEditor.execCommand(commandName);
            };
        }
        function autoComplete(cursor, view) {
            var session = IDE.activeSession;
            if(!session) {
                return;
            }
            if(session.mode !== "typescript") {
                return;
            }
            session.update();
            session.project.iSense.perform("autoComplete", cursor, session.name, function (err, completes) {
                if(completes != null) {
                    view.showCompletions(completes.entries);
                }
            });
        }
        function formatText() {
            var session = IDE.activeSession;
            if(session) {
                session.project.iSense.perform("getFormattedTextForRange", session.name, 0, session.getValue().length, function (err, result) {
                    if(!err) {
                        var pos = IDE.mainEditor.aceEditor.getCursorPosition();
                        session.setValue(result);
                        if(pos) {
                            IDE.mainEditor.aceEditor.moveCursorToPosition(pos);
                        }
                    }
                });
            }
        }
        function getShortcut(commandName) {
            var platform = IDE.mainEditor.aceEditor.commands.platform;
            var command = IDE.mainEditor.aceEditor.commands.byName[commandName];
            if(command && command.bindKey) {
                var key = command.bindKey[platform];
                return key;
            }
            return null;
        }
        function addShortcut(label, commandName) {
            var result = label;
            var platform = IDE.mainEditor.aceEditor.commands.platform;
            var command = IDE.mainEditor.aceEditor.commands.byName[commandName];
            if(command && command.bindKey) {
                var tabs = 5 - Math.floor((result.length / 4) - 0.01);
                result = result + "\t\t\t\t\t\t".substring(0, tabs);
                var key = command.bindKey[platform];
                if(key) {
                    result += key;
                }
            }
            return result;
        }
        var EditorCommands = (function () {
            function EditorCommands() { }
            EditorCommands.init = function init(registry) {
                var editorCommands = [
                    {
                        id: Cats.Commands.CMDS.edit_undo,
                        label: "Undo",
                        icon: "undo_edit.gif"
                    }, 
                    {
                        id: Cats.Commands.CMDS.edit_redo,
                        label: "Redo",
                        icon: "redo_edit.gif"
                    }, 
                    {
                        id: Cats.Commands.CMDS.edit_indent,
                        label: "indent",
                        icon: "shift_r_edit.gif"
                    }, 
                    {
                        id: Cats.Commands.CMDS.edit_outdent,
                        label: "outdent",
                        icon: "shift_l_edit.gif"
                    }, 
                    {
                        id: Cats.Commands.CMDS.edit_cut,
                        label: "cut",
                        icon: "cut_edit.gif"
                    }, 
                    {
                        id: Cats.Commands.CMDS.edit_copy,
                        label: "copy",
                        icon: "copy_edit.gif"
                    }, 
                    {
                        id: Cats.Commands.CMDS.edit_paste,
                        label: "paste",
                        icon: "paste_edit.gif"
                    }, 
                    {
                        id: Cats.Commands.CMDS.edit_find,
                        label: "Find",
                        cmd: "find"
                    }, 
                    {
                        id: Cats.Commands.CMDS.edit_findNext,
                        label: "Find Next",
                        cmd: "findnext"
                    }, 
                    {
                        id: Cats.Commands.CMDS.edit_findPrev,
                        label: "Find Previous",
                        cmd: "findprevious"
                    }, 
                    {
                        id: Cats.Commands.CMDS.edit_replace,
                        label: "Replace",
                        cmd: "replace"
                    }, 
                    {
                        id: Cats.Commands.CMDS.edit_replaceAll,
                        label: "Replace All",
                        cmd: "replaceall"
                    }, 
                    {
                        id: Cats.Commands.CMDS.edit_toggleComment,
                        label: "Toggle Comment",
                        cmd: "togglecomment"
                    }, 
                    {
                        id: Cats.Commands.CMDS.edit_toggleRecording,
                        label: "Start/stop Recording",
                        cmd: "togglerecording"
                    }, 
                    {
                        id: Cats.Commands.CMDS.edit_replayMacro,
                        label: "Playback Macro",
                        cmd: "replaymacro"
                    }
                ];
                editorCommands.forEach(function (config) {
                    if(!config.cmd) {
                        config.cmd = config.label.toLowerCase();
                    }
                    var item = {
                        name: config.id,
                        label: config.label,
                        shortcut: getShortcut(config.cmd),
                        command: editorCommand(config.cmd)
                    };
                    if(config.icon) {
                        item.icon = "static/img/" + config.icon;
                    }
                    registry(item);
                });
                registry({
                    name: Commands.CMDS.source_format,
                    label: "Format Code",
                    command: formatText
                });
            };
            return EditorCommands;
        })();
        Commands.EditorCommands = EditorCommands;        
    })(Cats.Commands || (Cats.Commands = {}));
    var Commands = Cats.Commands;
})(Cats || (Cats = {}));
var Cats;
(function (Cats) {
    (function (Commands) {
        (function (CMDS) {
            CMDS._map = [];
            CMDS._map[0] = "help_devTools";
            CMDS.help_devTools = 0;
            CMDS._map[1] = "help_shortcuts";
            CMDS.help_shortcuts = 1;
            CMDS._map[2] = "help_processInfo";
            CMDS.help_processInfo = 2;
            CMDS._map[3] = "help_about";
            CMDS.help_about = 3;
            CMDS._map[4] = "file_new";
            CMDS.file_new = 4;
            CMDS._map[5] = "file_open";
            CMDS.file_open = 5;
            CMDS._map[6] = "file_close";
            CMDS.file_close = 6;
            CMDS._map[7] = "file_closeOther";
            CMDS.file_closeOther = 7;
            CMDS._map[8] = "file_closeAll";
            CMDS.file_closeAll = 8;
            CMDS._map[9] = "file_save";
            CMDS.file_save = 9;
            CMDS._map[10] = "file_saveAs";
            CMDS.file_saveAs = 10;
            CMDS._map[11] = "file_saveAll";
            CMDS.file_saveAll = 11;
            CMDS._map[12] = "edit_undo";
            CMDS.edit_undo = 12;
            CMDS._map[13] = "edit_redo";
            CMDS.edit_redo = 13;
            CMDS._map[14] = "edit_cut";
            CMDS.edit_cut = 14;
            CMDS._map[15] = "edit_copy";
            CMDS.edit_copy = 15;
            CMDS._map[16] = "edit_paste";
            CMDS.edit_paste = 16;
            CMDS._map[17] = "edit_find";
            CMDS.edit_find = 17;
            CMDS._map[18] = "edit_findNext";
            CMDS.edit_findNext = 18;
            CMDS._map[19] = "edit_findPrev";
            CMDS.edit_findPrev = 19;
            CMDS._map[20] = "edit_replace";
            CMDS.edit_replace = 20;
            CMDS._map[21] = "edit_replaceAll";
            CMDS.edit_replaceAll = 21;
            CMDS._map[22] = "edit_toggleRecording";
            CMDS.edit_toggleRecording = 22;
            CMDS._map[23] = "edit_replayMacro";
            CMDS.edit_replayMacro = 23;
            CMDS._map[24] = "edit_toggleComment";
            CMDS.edit_toggleComment = 24;
            CMDS._map[25] = "edit_indent";
            CMDS.edit_indent = 25;
            CMDS._map[26] = "edit_outdent";
            CMDS.edit_outdent = 26;
            CMDS._map[27] = "source_format";
            CMDS.source_format = 27;
            CMDS._map[28] = "source_openDeclaration";
            CMDS.source_openDeclaration = 28;
            CMDS._map[29] = "source_findRef";
            CMDS.source_findRef = 29;
            CMDS._map[30] = "source_findDecl";
            CMDS.source_findDecl = 30;
            CMDS._map[31] = "project_open";
            CMDS.project_open = 31;
            CMDS._map[32] = "project_close";
            CMDS.project_close = 32;
            CMDS._map[33] = "project_build";
            CMDS.project_build = 33;
            CMDS._map[34] = "project_run";
            CMDS.project_run = 34;
            CMDS._map[35] = "project_debug";
            CMDS.project_debug = 35;
            CMDS._map[36] = "project_refresh";
            CMDS.project_refresh = 36;
            CMDS._map[37] = "project_properties";
            CMDS.project_properties = 37;
            CMDS._map[38] = "navigate_references";
            CMDS.navigate_references = 38;
            CMDS._map[39] = "navigate_occurences";
            CMDS.navigate_occurences = 39;
            CMDS._map[40] = "navigate_implementors";
            CMDS.navigate_implementors = 40;
            CMDS._map[41] = "navigate_declaration";
            CMDS.navigate_declaration = 41;
            CMDS._map[42] = "refactor_rename";
            CMDS.refactor_rename = 42;
            CMDS._map[43] = "ide_quit";
            CMDS.ide_quit = 43;
            CMDS._map[44] = "ide_theme";
            CMDS.ide_theme = 44;
            CMDS._map[45] = "ide_fontSize";
            CMDS.ide_fontSize = 45;
        })(Commands.CMDS || (Commands.CMDS = {}));
        var CMDS = Commands.CMDS;
        ;
        Commands.commands = [];
        Commands.commandList = [];
        function getAllCommands() {
            return Commands.commands;
        }
        Commands.getAllCommands = getAllCommands;
        function nop() {
            alert("Not yet implemented");
        }
        function register(command) {
            if(!command.command) {
                command.command = nop;
            }
            Commands.commands[command.name] = command;
            Commands.commandList.push(command);
        }
        Commands.register = register;
        function addShortcut(label, shortCut) {
            var result = label;
            var tabs = 5 - Math.floor((result.length / 4));
            result = result + "     " + "\t\t\t\t\t\t".substring(0, tabs) + shortCut;
            return result;
        }
                        function getMenuCommand(name, label) {
            var params = [];
            for (var _i = 0; _i < (arguments.length - 2); _i++) {
                params[_i] = arguments[_i + 2];
            }
            var cmd = Commands.commands[name];
            if(!cmd) {
                console.error("No implementation available for command " + name);
                return new GUI.MenuItem({
                    label: "Unknow command"
                });
            }
            var click;
            if(params.length > 0) {
                click = function () {
                    cmd.command.apply(this, params);
                };
            } else {
                click = cmd.command;
            }
            var item = {
                label: label || cmd.label,
                click: click
            };
            if(cmd.shortcut) {
                item.label = addShortcut(item.label, cmd.shortcut);
            }
            if(cmd.icon) {
                item.icon = cmd.icon;
            }
            return new GUI.MenuItem(item);
        }
        Commands.getMenuCommand = getMenuCommand;
        function runCommand(name) {
            Commands.commands[name].command();
        }
        Commands.runCommand = runCommand;
        function get(name) {
            return Commands.commands[name];
        }
        Commands.get = get;
        function init() {
            Commands.EditorCommands.init(register);
            Commands.FileCommands.init(register);
            Commands.HelpCommands.init(register);
            Commands.ProjectCommands.init(register);
            Commands.IdeCommands.init(register);
            Commands.RefactorCommands.init(register);
            Commands.NavigateCommands.init(register);
        }
        Commands.init = init;
    })(Cats.Commands || (Cats.Commands = {}));
    var Commands = Cats.Commands;
})(Cats || (Cats = {}));
var Cats;
(function (Cats) {
    (function (Menu) {
        var Menubar = (function () {
            function Menubar() {
                this.fontSizes = [
                    8, 
                    10, 
                    12, 
                    14, 
                    16, 
                    18, 
                    20, 
                    24
                ];
                this.themes = [
                    {
                        theme: "cats",
                        label: "CATS"
                    }, 
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
                var menubar = new GUI.Menu({
                    type: 'menubar'
                });
                var getCmd = Cats.Commands.getMenuCommand;
                var CMDS = Cats.Commands.CMDS;
                var file = new GUI.Menu();
                file.append(getCmd(CMDS.file_new));
                file.append(new GUI.MenuItem({
                    type: "separator"
                }));
                file.append(getCmd(CMDS.file_save));
                file.append(getCmd(CMDS.file_saveAs));
                file.append(getCmd(CMDS.file_saveAll));
                file.append(new GUI.MenuItem({
                    type: "separator"
                }));
                file.append(getCmd(CMDS.file_close));
                file.append(getCmd(CMDS.file_closeAll));
                file.append(getCmd(CMDS.file_closeOther));
                file.append(new GUI.MenuItem({
                    type: "separator"
                }));
                file.append(getCmd(CMDS.ide_quit));
                var edit = new GUI.Menu();
                edit.append(getCmd(CMDS.edit_undo));
                edit.append(getCmd(CMDS.edit_redo));
                edit.append(new GUI.MenuItem({
                    type: "separator"
                }));
                edit.append(getCmd(CMDS.edit_cut));
                edit.append(getCmd(CMDS.edit_copy));
                edit.append(getCmd(CMDS.edit_paste));
                edit.append(new GUI.MenuItem({
                    type: "separator"
                }));
                edit.append(getCmd(CMDS.edit_find));
                edit.append(getCmd(CMDS.edit_findNext));
                edit.append(getCmd(CMDS.edit_findPrev));
                edit.append(getCmd(CMDS.edit_replace));
                edit.append(getCmd(CMDS.edit_replaceAll));
                edit.append(new GUI.MenuItem({
                    type: "separator"
                }));
                edit.append(getCmd(CMDS.edit_toggleRecording));
                edit.append(getCmd(CMDS.edit_replayMacro));
                var source = new GUI.Menu();
                source.append(getCmd(CMDS.edit_toggleComment));
                source.append(getCmd(CMDS.edit_indent));
                source.append(getCmd(CMDS.edit_outdent));
                source.append(getCmd(CMDS.source_format));
                var refactor = new GUI.Menu();
                refactor.append(getCmd(CMDS.refactor_rename));
                var navigate = new GUI.Menu();
                navigate.append(getCmd(CMDS.navigate_declaration));
                navigate.append(getCmd(CMDS.navigate_references));
                navigate.append(getCmd(CMDS.navigate_occurences));
                navigate.append(getCmd(CMDS.navigate_implementors));
                var proj = new GUI.Menu();
                proj.append(getCmd(CMDS.project_open));
                proj.append(getCmd(CMDS.project_close));
                proj.append(new GUI.MenuItem({
                    type: "separator"
                }));
                proj.append(getCmd(CMDS.project_build));
                var buildOnSaveItem = new GUI.MenuItem({
                    label: 'Build on Save',
                    checked: false,
                    type: "checkbox"
                });
                proj.append(buildOnSaveItem);
                buildOnSaveItem.click = function () {
                    console.log("Clicked: " + buildOnSaveItem.checked);
                    IDE.project.config.buildOnSave = buildOnSaveItem.checked;
                };
                proj.append(getCmd(CMDS.project_refresh));
                proj.append(getCmd(CMDS.project_properties));
                var run = new GUI.Menu();
                run.append(getCmd(CMDS.project_run));
                run.append(getCmd(CMDS.project_debug));
                var window = new GUI.Menu();
                window.append(new GUI.MenuItem({
                    label: 'Theme',
                    submenu: this.createThemeMenu()
                }));
                window.append(new GUI.MenuItem({
                    label: 'Font size',
                    submenu: this.createFontSizeMenu()
                }));
                var help = new GUI.Menu();
                help.append(getCmd(CMDS.help_shortcuts));
                help.append(getCmd(CMDS.help_processInfo));
                help.append(getCmd(CMDS.help_devTools));
                help.append(getCmd(CMDS.help_about));
                menubar.append(new GUI.MenuItem({
                    label: 'File',
                    submenu: file
                }));
                menubar.append(new GUI.MenuItem({
                    label: 'Edit',
                    submenu: edit
                }));
                menubar.append(new GUI.MenuItem({
                    label: 'Source',
                    submenu: source
                }));
                menubar.append(new GUI.MenuItem({
                    label: 'Refactor',
                    submenu: refactor
                }));
                menubar.append(new GUI.MenuItem({
                    label: 'Navigate',
                    submenu: navigate
                }));
                menubar.append(new GUI.MenuItem({
                    label: 'Project',
                    submenu: proj
                }));
                menubar.append(new GUI.MenuItem({
                    label: 'Run',
                    submenu: run
                }));
                menubar.append(new GUI.MenuItem({
                    label: 'Window',
                    submenu: window
                }));
                menubar.append(new GUI.MenuItem({
                    label: 'Help',
                    submenu: help
                }));
                var win = GUI.Window.get();
                win.menu = menubar;
            }
            Menubar.prototype.enableFind = function () {
                window.open('findreplace.html', '_blank');
            };
            Menubar.prototype.actionFind = function () {
                var input = document.getElementById("findText");
                IDE.mainEditor.aceEditor.find(input.value, {
                }, true);
            };
            Menubar.prototype.actionReplace = function () {
                var findText = document.getElementById("findText");
                var replaceText = document.getElementById("replaceText");
                var options = {
                    needle: findText.value
                };
                IDE.mainEditor.aceEditor.replace(replaceText.value, options);
            };
            Menubar.prototype.createFontSizeMenu = function () {
                var getCmd = Cats.Commands.getMenuCommand;
                var CMDS = Cats.Commands.CMDS;
                var menu = new GUI.Menu();
                this.fontSizes.forEach(function (size) {
                    var item = getCmd(CMDS.ide_fontSize, size + "px", size);
                    menu.append(item);
                });
                return menu;
            };
            Menubar.prototype.createThemeMenu = function () {
                var getCmd = Cats.Commands.getMenuCommand;
                var CMDS = Cats.Commands.CMDS;
                var menu = new GUI.Menu();
                this.themes.forEach(function (theme) {
                    if(theme.theme) {
                        var item = getCmd(CMDS.ide_theme, theme.label, theme.theme);
                        menu.append(item);
                    } else {
                        menu.append(new GUI.MenuItem({
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
        function createMenuBar() {
            new Menubar();
        }
        Menu.createMenuBar = createMenuBar;
    })(Cats.Menu || (Cats.Menu = {}));
    var Menu = Cats.Menu;
})(Cats || (Cats = {}));
var Cats;
(function (Cats) {
    (function (Menu) {
        function createFileContextMenu() {
            var ctxmenu = new GUI.Menu();
            ctxmenu.append(new GUI.MenuItem({
                label: 'Refresh',
                click: refresh
            }));
            ctxmenu.append(new GUI.MenuItem({
                label: 'Rename',
                click: rename
            }));
            ctxmenu.append(new GUI.MenuItem({
                label: 'New file',
                click: newFile
            }));
            ctxmenu.append(new GUI.MenuItem({
                label: 'Delete',
                click: deleteFile
            }));
            return ctxmenu;
        }
        function refresh() {
            Cats.UI.TreeView.refreshElem(data.element);
        }
        function deleteFile() {
            var basename = PATH.basename(data.key);
            var sure = confirm("Delete " + basename);
            if(sure) {
                OS.File.remove(data.key);
            }
        }
        function newFile() {
            var basedir;
            if(data.isFolder) {
                basedir = data.key;
            } else {
                basedir = PATH.dirname(data.key);
            }
            var name = prompt("Enter new file name ");
            if(name == null) {
                return;
            }
            var fullName = PATH.join(basedir, name);
            OS.File.writeTextFile(fullName, "");
        }
        function rename() {
            var dirname = PATH.dirname(data.key);
            var basename = PATH.basename(data.key);
            var name = prompt("Enter new name", basename);
            if(name == null) {
                return;
            }
            var c = confirm("Going to rename " + basename + " to " + name);
            if(c) {
                try  {
                    OS.File.rename(data.key, PATH.join(dirname, name));
                } catch (err) {
                    alert(err);
                }
            }
        }
        var data = {
            key: "",
            isFolder: true,
            element: null
        };
        function initFileContextMenu() {
            var fileContextMenu = createFileContextMenu();
            IDE.fileNavigation.addEventListener('contextmenu', function (ev) {
                var d = Cats.UI.TreeView.getValueFromElement(ev.srcElement);
                data.key = d.path;
                data.isFolder = d.isFolder;
                data.element = ev.srcElement;
                ev.preventDefault();
                fileContextMenu.popup(ev.x, ev.y);
                return false;
            });
        }
        Menu.initFileContextMenu = initFileContextMenu;
    })(Cats.Menu || (Cats.Menu = {}));
    var Menu = Cats.Menu;
})(Cats || (Cats = {}));
var Cats;
(function (Cats) {
    (function (Menu) {
        function getTab() {
        }
        function nop() {
            alert("not yet implemented");
        }
        var TabContextMenu = (function () {
            function TabContextMenu() {
                this.ctxmenu = new GUI.Menu();
                this.ctxmenu.append(new GUI.MenuItem({
                    label: 'Close this tab',
                    click: nop
                }));
                this.ctxmenu.append(new GUI.MenuItem({
                    label: 'Close other tabs',
                    click: nop
                }));
                this.ctxmenu.append(new GUI.MenuItem({
                    label: 'Close all tabs',
                    click: nop
                }));
                this.ctxmenu.append(new GUI.MenuItem({
                    label: 'Close active tab',
                    click: nop
                }));
            }
            TabContextMenu.prototype.popup = function (x, y) {
                this.ctxmenu.popup(x, y);
            };
            return TabContextMenu;
        })();
        Menu.TabContextMenu = TabContextMenu;        
        function initTabContextMenu() {
            return;
            var contextMenu = new TabContextMenu();
            IDE.sessionBar.addEventListener('contextmenu', function (ev) {
                ev.preventDefault();
                contextMenu.popup(ev.x, ev.y);
                return false;
            });
        }
        Menu.initTabContextMenu = initTabContextMenu;
    })(Cats.Menu || (Cats.Menu = {}));
    var Menu = Cats.Menu;
})(Cats || (Cats = {}));
var MVC;
(function (MVC) {
    var View = (function () {
        function View(id) {
            this.id = id;
            if(!this.id) {
                this.id = "view#" + View.ID++;
            }
        }
        View.ID = 0;
        View.GetViewer = function GetViewer() {
            return View.VIEWER;
        };
        View.prototype.update = function () {
            this._render();
        };
        View.prototype._render = function () {
            var oldViewer = View.VIEWER;
            View.VIEWER = this;
            try  {
                this.render();
            }finally {
                View.VIEWER = oldViewer;
            }
        };
        View.prototype.render = function () {
        };
        return View;
    })();
    MVC.View = View;    
    var __OBSERVER_CURRENT;
    function getObserver() {
        return __OBSERVER_CURRENT;
    }
    MVC.getObserver = getObserver;
    function makeObserver(fn, ctx) {
        if (typeof ctx === "undefined") { ctx = {
        }; }
        return function () {
            var oldObserver = __OBSERVER_CURRENT;
            __OBSERVER_CURRENT = fn;
            try  {
                return fn.apply(ctx, arguments);
            }finally {
                __OBSERVER_CURRENT = oldObserver;
            }
        };
    }
    MVC.makeObserver = makeObserver;
    var Model = (function () {
        function Model() { }
        Model.Waiters = null;
        Model.notify = function notify(newWaiters) {
            if(Model.Waiting) {
                var waiters = Model.Waiters;
                newWaiters.forEach(function (waiter) {
                    if(waiters.indexOf(waiter) !== -1) {
                        waiters.push(waiter);
                    }
                });
                return;
            }
            Model.Waiters = newWaiters;
            Model.Waiting = setTimeout(function () {
                var waiters = Model.Waiters;
                Model.Waiting = null;
                waiters.forEach(function (waiter) {
                    try  {
                        waiter();
                    } catch (err) {
                        console.error(err);
                    }
                });
            }, 0);
        };
        Model.registerObserver = function registerObserver(obj, prop) {
            var observer = getObserver();
            if(observer) {
                if(obj.__observers[prop].indexOf(observer) === -1) {
                    console.log("registering new observer " + observer + " for property " + prop);
                    obj.__observers[prop].push(observer);
                }
            }
        };
        Model.makeObservable = function makeObservable(obj, props) {
            if(!obj.__observers) {
                obj.__observers = {
                };
            }
            props.forEach(function (prop) {
                if(obj.__observers[prop]) {
                    return;
                }
                obj.__observers[prop] = [];
                var privateVar = obj[prop];
                Object.defineProperty(obj, prop, {
                    get: function () {
                        Model.registerObserver(obj, prop);
                        return privateVar;
                    },
                    set: function (val) {
                        if(val === privateVar) {
                            return;
                        }
                        privateVar = val;
                        Model.notify(obj.__observers[prop]);
                    }
                });
            });
        };
        return Model;
    })();
    MVC.Model = Model;    
})(MVC || (MVC = {}));
var Cats;
(function (Cats) {
    (function (UI) {
        var AspectWidget = (function () {
            function AspectWidget() {
                this.aspects = {
                };
                this.defaultHandler = function (data, name) {
                    return data[name];
                };
            }
            AspectWidget.prototype.setAspect = function (name, aspect) {
                this.aspects[name] = aspect;
            };
            AspectWidget.prototype.getValue = function (data, name) {
                var fn = this.aspects[name] || this.defaultHandler;
                return fn(data, name);
            };
            return AspectWidget;
        })();
        UI.AspectWidget = AspectWidget;        
        var SessionsBar = (function (_super) {
            __extends(SessionsBar, _super);
            function SessionsBar() {
                        _super.call(this);
                this.root = document.createElement("div");
                this.ul = document.createElement("ul");
                this.selectElem = document.createElement("select");
                this.selectElem.style.display = "none";
                this.root.appendChild(this.ul);
                this.root.appendChild(this.selectElem);
                this.root.className = "tabbar";
                this.ul.className = "tabbar";
                this.ul.onclick = function (ev) {
                    IDE.activeSession = ev.srcElement["_value"];
                };
            }
            SessionsBar.prototype.renderDropDown = function () {
                var _this = this;
                this.selectElem.style.display = "block";
                this.selectElem.innerHTML = "";
                IDE.sessions.forEach(function (session) {
                    var optionElem = document.createElement("option");
                    optionElem.innerText = session.shortName;
                    optionElem.value = session.name;
                    if(session === IDE.activeSession) {
                        optionElem.selected = true;
                    }
                    optionElem["_value"] = session;
                    _this.selectElem.appendChild(optionElem);
                });
            };
            SessionsBar.prototype.isOverflowed = function () {
                var element = this.ul;
                return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
            };
            SessionsBar.prototype.render = function () {
                var _this = this;
                this.ul.innerHTML = "";
                IDE.sessions.forEach(function (session) {
                    var li = document.createElement("li");
                    li.innerText = session.shortName;
                    if(session === IDE.activeSession) {
                        li.className += " active";
                    }
                    if(session.changed) {
                        li.className += " changed ";
                    }
                    _this.ul.appendChild(li);
                });
                if(this.isOverflowed()) {
                    this.renderDropDown();
                } else {
                    this.selectElem.style.display = "none";
                }
            };
            return SessionsBar;
        })(MVC.View);        
        var Tabbar = (function (_super) {
            __extends(Tabbar, _super);
            function Tabbar() {
                var _this = this;
                        _super.call(this);
                this.options = [];
                this.root = document.createElement("div");
                this.ul = document.createElement("ul");
                this.selectElem = document.createElement("select");
                this.ul.onclick = this.onClickHandler.bind(this);
                this.selectElem.onchange = function (ev) {
                    return _this.onChangeHandler(ev);
                };
                this.selectElem.style.display = "none";
                this.root.appendChild(this.ul);
                this.root.appendChild(this.selectElem);
                this.root.className = "tabbar";
                this.ul.className = "tabbar";
            }
            Tabbar.prototype.renderDropDown = function () {
                var _this = this;
                this.selectElem.style.display = "block";
                this.selectElem.innerHTML = "";
                this.options.forEach(function (option) {
                    var optionElem = document.createElement("option");
                    optionElem.innerText = _this.getValue(option, "name");
                    var selected = _this.getValue(option, "selected");
                    if(selected === true) {
                        optionElem.selected = true;
                    }
                    optionElem["_value"] = option;
                    _this.selectElem.appendChild(optionElem);
                });
            };
            Tabbar.prototype.render = function () {
                var _this = this;
                this.ul.innerHTML = "";
                this.options.forEach(function (option) {
                    var optionElem = document.createElement("li");
                    optionElem["_value"] = option;
                    optionElem.innerText = _this.getValue(option, "name");
                    optionElem.className = "tab";
                    var longName = _this.getValue(option, "longname");
                    if(longName) {
                        optionElem.setAttribute("title", longName);
                    }
                    var selected = _this.getValue(option, "selected");
                    if(selected === true) {
                        optionElem.className += " active";
                    }
                    var changed = _this.getValue(option, "changed");
                    if(changed === true) {
                        optionElem.className += " changed";
                    }
                    var decorator = _this.getValue(option, "decorator");
                    if(decorator) {
                        optionElem.className += " " + decorator;
                    }
                    if(_this.ondelete) {
                        var closeButton = document.createElement("span");
                        closeButton.innerHTML = "X";
                        closeButton.onclick = function () {
                            if(_this.ondelete) {
                                _this.ondelete(option);
                            }
                        };
                        optionElem.appendChild(closeButton);
                    }
                    _this.ul.appendChild(optionElem);
                });
                if(this.isOverflowed()) {
                    this.renderDropDown();
                } else {
                    this.selectElem.style.display = "none";
                }
            };
            Tabbar.prototype.refresh = function () {
                this.render();
            };
            Tabbar.prototype.isOverflowed = function () {
                var element = this.ul;
                return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
            };
            Tabbar.prototype.setOptions = function (arr) {
                this.options = arr;
                this.refresh();
            };
            Tabbar.prototype.appendTo = function (elem) {
                this.render();
                elem.appendChild(this.root);
            };
            Tabbar.prototype.selectOption = function (index) {
                if(this.onselect) {
                    this.onselect(this.options[index]);
                }
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
            Tabbar.prototype.onChangeHandler = function (ev) {
                if(this.onselect) {
                    var sel = ev.srcElement;
                    var option = sel.options[sel.selectedIndex];
                    var value = option["_value"];
                    this.onselect(value);
                }
            };
            return Tabbar;
        })(AspectWidget);
        UI.Tabbar = Tabbar;        
    })(Cats.UI || (Cats.UI = {}));
    var UI = Cats.UI;
})(Cats || (Cats = {}));
var Cats;
(function (Cats) {
    (function (UI) {
        var ElemTabAdapter = (function () {
            function ElemTabAdapter(tab, elems, selected) {
                this.tab = tab;
                this.elems = elems;
                var _this = this;
                tab.setOptions(this.convert(elems));
                if(selected) {
                    this.onSelect(this.getTab(selected));
                }
                tab.onselect = function (elem) {
                    return _this.onSelect(elem);
                };
            }
            ElemTabAdapter.prototype.setAspect = function (elem, name, value) {
                var tab = this.getTab(elem);
                if(tab) {
                    tab[name] = value;
                }
            };
            ElemTabAdapter.prototype.getTab = function (elem) {
                var options = this.tab.options;
                for(var i = 0; i < options.length; i++) {
                    if(options[i].elem === elem) {
                        return options[i];
                    }
                }
                return null;
            };
            ElemTabAdapter.prototype.convert = function (elems) {
                var result = [];
                for(var i = 0; i < elems.length; i++) {
                    var elem = elems[i];
                    result.push({
                        name: elem.title || elem.id,
                        selected: false,
                        elem: elem
                    });
                }
                return result;
            };
            ElemTabAdapter.prototype.onSelect = function (tab) {
                var options = this.tab.options;
                options.forEach(function (option) {
                    option.elem.style.display = "none";
                    option.selected = false;
                });
                tab.elem.style.display = "block";
                tab.selected = true;
                this.tab.refresh();
            };
            return ElemTabAdapter;
        })();
        UI.ElemTabAdapter = ElemTabAdapter;        
    })(Cats.UI || (Cats.UI = {}));
    var UI = Cats.UI;
})(Cats || (Cats = {}));
var Cats;
(function (Cats) {
    (function (Menu) {
        var EditorContextMenu = (function () {
            function EditorContextMenu(editor) {
                this.editor = editor;
                this.initialized = false;
            }
            EditorContextMenu.prototype.init = function () {
                this.ctxmenu = new GUI.Menu();
                var getCmd = Cats.Commands.getMenuCommand;
                var CMDS = Cats.Commands.CMDS;
                this.ctxmenu.append(getCmd(CMDS.navigate_declaration));
                this.ctxmenu.append(getCmd(CMDS.navigate_references));
                this.ctxmenu.append(getCmd(CMDS.navigate_occurences));
                this.ctxmenu.append(getCmd(CMDS.navigate_implementors));
            };
            EditorContextMenu.prototype.bindTo = function (elem) {
                var _this = this;
                elem.oncontextmenu = function (ev) {
                    if(!_this.initialized) {
                        _this.init();
                    }
                    ev.preventDefault();
                    if(IDE.activeSession.mode === "typescript") {
                        _this.lastEvent = ev;
                        _this.ctxmenu.popup(ev.x, ev.y);
                    }
                    return false;
                };
            };
            return EditorContextMenu;
        })();
        Menu.EditorContextMenu = EditorContextMenu;        
    })(Cats.Menu || (Cats.Menu = {}));
    var Menu = Cats.Menu;
})(Cats || (Cats = {}));
var Cats;
(function (Cats) {
    (function (UI) {
        var HashHandler = ace.require('ace/keyboard/hash_handler').HashHandler;
        var AutoCompleteView = (function () {
            function AutoCompleteView(editor) {
                this.editor = editor;
                this.handler = new HashHandler();
                this.active = false;
                this.offset = 0;
                this.index = 0;
                this.cursor = -1;
                this.showNumberOfOptions = 10;
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
                var text = this.editor.session.getLine(cursor.row).slice(0, cursor.column);
                var matches = text.match(/[a-zA-Z_0-9\$]*$/);
                if(matches && matches[0]) {
                    return matches[0];
                } else {
                    return "";
                }
            };
            AutoCompleteView.prototype.getInputText2 = function () {
                var pos = this.editor.getCursorPosition();
                var result = this.editor.getSession().getTokenAt(pos.row, pos.column);
                if(result && result.value) {
                    return result.value.trim();
                } else {
                    return "";
                }
            };
            AutoCompleteView.prototype.filter = function () {
                var text = this.getInputText();
                if(!text) {
                    this.filteredCompletions = this.completions;
                } else {
                    this.filteredCompletions = this.completions.filter(function (entry) {
                        return (entry.name.indexOf(text) === 0);
                    });
                }
            };
            AutoCompleteView.prototype.initKeys = function () {
                var _this = this;
                this.handler.bindKey("Home", function () {
                    _this.moveCursor(-10000);
                });
                this.handler.bindKey("End", function () {
                    _this.moveCursor(10000);
                });
                this.handler.bindKey("Down", function () {
                    _this.moveCursor(1);
                });
                this.handler.bindKey("PageDown", function () {
                    _this.moveCursor(10);
                });
                this.handler.bindKey("Up", function () {
                    _this.moveCursor(-1);
                });
                this.handler.bindKey("PageUp", function () {
                    _this.moveCursor(-10);
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
                        var span = current.firstChild;
                        _this.editor.insert(span.innerText);
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
                var _this = this;
                var key = ev.data.text;
                if(" .-=,[]_/()!';:<>".indexOf(key) !== -1) {
                    this.hide();
                    return;
                }
                setTimeout(function () {
                    _this.render();
                }, 0);
            };
            AutoCompleteView.prototype.renderRow = function () {
                var index = this.listElement.children.length;
                var info = this.filteredCompletions[index];
                var li = document.createElement("li");
                var span1 = document.createElement("span");
                span1.className = "name " + " icon-" + info.kind;
                span1.innerText = info.name;
                li.appendChild(span1);
                if(info.name !== info.type) {
                    var span2 = document.createElement("span");
                    span2.className = "type";
                    span2.innerText = info.type;
                    li.appendChild(span2);
                }
                this.listElement.appendChild(li);
            };
            AutoCompleteView.prototype.hasCompletions = function () {
                return this.filteredCompletions.length > 0;
            };
            AutoCompleteView.prototype.render = function () {
                this.listElement.innerHTML = "";
                this.filter();
                this.offset = 0;
                this.index = 0;
                this.cursor = 0;
                if(this.hasCompletions()) {
                    var max = Math.min(this.filteredCompletions.length, 10);
                    for(var n = 0; n < max; n++) {
                        this.renderRow();
                    }
                    this.highLite();
                }
            };
            AutoCompleteView.prototype.showCompletions = function (completions) {
                if(this.active || (completions.length === 0)) {
                    return;
                }
                this.completions = completions;
                console.log("Received completions: " + completions.length);
                var cursor = this.editor.getCursorPosition();
                var coords = this.editor.renderer.textToScreenCoordinates(cursor.row, cursor.column);
                this.setPosition(coords);
                this.render();
                this.show();
            };
            AutoCompleteView.prototype.highLite = function () {
                var elem = this.listElement.children[this.cursor];
                elem.className = AutoCompleteView.selectedClassName;
            };
            AutoCompleteView.prototype.moveCursor = function (offset) {
                if(!this.hasCompletions()) {
                    return;
                }
                var newCursor = this.cursor + offset;
                newCursor = Math.min(this.filteredCompletions.length - 1, newCursor);
                newCursor = Math.max(0, newCursor);
                while(newCursor >= this.listElement.children.length) {
                    this.renderRow();
                }
                var elem = this.current();
                if(elem) {
                    elem.className = "";
                }
                this.cursor = newCursor;
                this.scroll();
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
                if(this.cursor >= 0) {
                    return this.listElement.childNodes[this.cursor];
                } else {
                    return null;
                }
            };
            AutoCompleteView.prototype.hideRow = function (index) {
                var elem = this.listElement.children[index];
                elem.style.display = "none";
            };
            AutoCompleteView.prototype.showRow = function (index) {
                var elem = this.listElement.children[index];
                elem.style.display = "block";
            };
            AutoCompleteView.prototype.scroll = function () {
                while(this.cursor >= (this.offset + 10)) {
                    this.hideRow(this.offset);
                    this.showRow(this.offset + 10);
                    this.offset++;
                }
                while(this.cursor < this.offset) {
                    this.showRow(this.offset - 1);
                    this.hideRow(this.offset + 9);
                    this.offset--;
                }
                this.highLite();
            };
            return AutoCompleteView;
        })();
        UI.AutoCompleteView = AutoCompleteView;        
    })(Cats.UI || (Cats.UI = {}));
    var UI = Cats.UI;
})(Cats || (Cats = {}));
var Cats;
(function (Cats) {
    function setOverwrite() {
        var s = IDE.activeSession;
        IDE.mainEditor.overwrite = s.editSession.getOverwrite();
    }
    var TextEditor = (function (_super) {
        __extends(TextEditor, _super);
        function TextEditor(rootElement) {
                _super.call(this, "editMode", "overwrite");
            this.rootElement = rootElement;
            this.aceEditor = this.createAceEditor();
            this.hide();
            this.init();
        }
        TextEditor.prototype.onEditMode = function (fn) {
            this.on("editMode", fn);
        };
        TextEditor.prototype.onOverwrite = function (fn) {
            this.on("overwrite", fn);
        };
        TextEditor.prototype.init = function () {
            this.toolTip = new Cats.UI.ToolTip();
            this.autoCompleteView = new Cats.UI.AutoCompleteView(this.aceEditor);
            this.editorContextMenu = new Cats.Menu.EditorContextMenu(this);
            this.editorContextMenu.bindTo(this.rootElement);
        };
        TextEditor.prototype.swapListeners = function (oldSession, newSession) {
            var listeners = {
                "changeOverwrite": setOverwrite
            };
            if(oldSession) {
                for(var event in listeners) {
                    oldSession.editSession.removeListener(event, listeners[event]);
                }
            }
            if(newSession) {
                for(var event in listeners) {
                    newSession.editSession.on(event, listeners[event]);
                }
            }
        };
        TextEditor.prototype.edit = function (session, pos) {
            if(IDE.activeSession === session) {
                if(pos) {
                    this.moveCursorTo(pos);
                }
                return;
            }
            this.swapListeners(IDE.activeSession, session);
            IDE.activeSession = session;
            var aceSession = session;
            this.aceEditor.setSession(aceSession.editSession);
            if(session.mode === "binary") {
                this.aceEditor.setReadOnly(true);
            } else {
                this.aceEditor.setReadOnly(false);
            }
            if(pos) {
                this.moveCursorTo(pos);
            }
            this.show();
            this.aceEditor.focus();
            aceSession.showErrors();
            if(IDE.tabbar) {
                IDE.tabbar.refresh();
            }
            this.editMode = PATH.basename(session.mode);
        };
        TextEditor.prototype.moveCursorTo = function (pos) {
            if (typeof pos === "undefined") { pos = {
                column: 0,
                row: 0
            }; }
            this.aceEditor.moveCursorToPosition(pos);
            this.aceEditor.clearSelection();
            this.aceEditor.centerSelection();
        };
        TextEditor.prototype.show = function () {
            this.rootElement.style.display = "block";
            this.aceEditor.focus();
        };
        TextEditor.prototype.hide = function () {
            this.rootElement.style.display = "none";
        };
        TextEditor.prototype.setTheme = function (theme) {
            this.aceEditor.setTheme("ace/theme/" + theme);
        };
        TextEditor.prototype.addCommand = function (command) {
            this.aceEditor.commands.addCommand(command);
        };
        TextEditor.prototype.bindToMouse = function (fn) {
            var _this = this;
            this.rootElement.onmousemove = fn;
            this.rootElement.onmouseout = function () {
                _this.toolTip.hide();
            };
        };
        TextEditor.prototype.autoComplete = function () {
            var cursor = this.aceEditor.getCursorPosition();
            var aceSession = IDE.activeSession;
            aceSession.autoComplete(cursor, this.autoCompleteView);
        };
        TextEditor.prototype.onMouseMove = function (ev) {
            this.toolTip.hide();
            clearTimeout(this.mouseMoveTimer);
            var elem = ev.srcElement;
            if(elem.className !== "ace_content") {
                return;
            }
            var session = IDE.activeSession;
            this.mouseMoveTimer = setTimeout(function () {
                session.showInfoAt(ev);
            }, 800);
        };
        TextEditor.prototype.createAceEditor = function () {
            var _this = this;
            var editor = ace.edit(this.rootElement);
            editor.commands.addCommands([
                {
                    name: "autoComplete",
                    bindKey: {
                        win: "Ctrl-Space",
                        mac: "Command-Space"
                    },
                    exec: function () {
                        _this.autoComplete();
                    }
                }, 
                {
                    name: "gotoDeclaration",
                    bindKey: {
                        win: "F12",
                        mac: "F12"
                    },
                    exec: function () {
                        Cats.Commands.runCommand(Cats.Commands.CMDS.navigate_declaration);
                    }
                }, 
                {
                    name: "save",
                    bindKey: {
                        win: "Ctrl-S",
                        mac: "Command-S"
                    },
                    exec: function () {
                        Cats.Commands.runCommand(Cats.Commands.CMDS.file_save);
                    }
                }
            ]);
            var originalTextInput = editor.onTextInput;
            editor.onTextInput = function (text) {
                originalTextInput.call(editor, text);
                if(text === ".") {
                    _this.autoComplete();
                }
            };
            var elem = this.rootElement;
            elem.onmousemove = this.onMouseMove.bind(this);
            elem.onmouseout = function () {
                _this.toolTip.hide();
                clearTimeout(_this.mouseMoveTimer);
            };
            return editor;
        };
        return TextEditor;
    })(Cats.ObservableImpl);
    Cats.TextEditor = TextEditor;    
})(Cats || (Cats = {}));
var Cats;
(function (Cats) {
    (function (UI) {
        var Grid = (function () {
            function Grid() {
                this.aspects = {
                };
                this.defaultHandler = function (row, name) {
                    return row[name];
                };
                this.rootElement = document.createElement("table");
                this.rootElement["__grid"] = this;
            }
            Grid.getGridFromElement = function getGridFromElement(elem) {
                return elem["__grid"];
            };
            Grid.prototype.setColumns = function (columns) {
                this.columns = columns;
            };
            Grid.prototype.setRows = function (rows) {
                this.rows = rows;
            };
            Grid.prototype.getRows = function () {
                return this.rows;
            };
            Grid.prototype.setAspect = function (aspect, handler) {
                this.aspects[aspect] = handler;
            };
            Grid.prototype.getValue = function (row, columnName) {
                var fn = this.aspects[columnName] || this.defaultHandler;
                return fn(row, columnName);
            };
            Grid.prototype.getLabel = function (headerName) {
                return headerName;
            };
            Grid.prototype.appendTo = function (elem) {
                elem.appendChild(this.rootElement);
            };
            Grid.prototype.createHeader = function () {
                var _this = this;
                var head = this.rootElement.createTHead();
                var row = head.insertRow(-1);
                this.columns.forEach(function (header) {
                    var th = document.createElement("th");
                    th.innerText = _this.getLabel(header);
                    row.appendChild(th);
                });
            };
            Grid.prototype.createRow = function (parent, rowData) {
                var _this = this;
                var row = parent.insertRow(-1);
                this.columns.forEach(function (column) {
                    row.insertCell(-1).innerText = _this.getValue(rowData, column);
                });
                row["_value"] = rowData;
                var self = this;
                row.onclick = function () {
                    if(self.onselect) {
                        self.onselect(this["_value"]);
                    }
                };
            };
            Grid.prototype.render = function () {
                var _this = this;
                var table = this.rootElement;
                table.innerHTML = "";
                this.createHeader();
                var tbody = document.createElement("tbody");
                table.appendChild(tbody);
                this.rows.forEach(function (row) {
                    _this.createRow(tbody, row);
                });
            };
            return Grid;
        })();
        UI.Grid = Grid;        
    })(Cats.UI || (Cats.UI = {}));
    var UI = Cats.UI;
})(Cats || (Cats = {}));
var PATH = require("path");
var GUI = require('nw.gui');
var IDE;
var Cats;
(function (Cats) {
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
    function determineProject() {
        var projectName = getParameterByName("project");
        if(!projectName) {
            var args = GUI.App.argv;
            if(args && (args.length > 0)) {
                projectName = args[0];
            }
        }
        return projectName;
    }
    process.on('uncaughtException', function (err) {
        console.error("Uncaught exception occured: " + err);
        console.error(err.stack);
    });
    IDE = new Cats.Ide();
    var prjName = determineProject();
    if(prjName) {
        IDE.addProject(prjName);
    } else {
        IDE.loadDefaultProjects();
    }
    Cats.Commands.init();
    Cats.Menu.createMenuBar();
    IDE.initViews();
    Cats.layoutIDE();
    Cats.Menu.initFileContextMenu();
    Cats.Menu.initTabContextMenu();
    var win = GUI.Window.get();
    win.on("close", function () {
        Cats.Commands.get(Cats.Commands.CMDS.ide_quit).command();
    });
})(Cats || (Cats = {}));
