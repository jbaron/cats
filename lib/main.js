var Cats;
(function (Cats) {
    var Defer = (function () {
        function Defer() {
            this.promise = new Promise();
        }
        Defer.prototype.resolve = function (value) {
            if (this.promise.resolve)
                this.promise.resolve(value);
        };

        Defer.prototype.reject = function (value) {
            if (this.promise.reject)
                this.promise.reject(value);
        };
        return Defer;
    })();
    Cats.Defer = Defer;

    var Promise = (function () {
        function Promise() {
        }
        Promise.prototype.then = function (resolve, reject, progress) {
            this.resolve = resolve;
            var d = new Defer();
            return d.promise;
        };
        return Promise;
    })();
    Cats.Promise = Promise;

    function asyncComputeTheAnswerToEverything() {
        var result = new Defer();
        setTimeout(function () {
            result.resolve(42);
        }, 0);
        return result.promise;
    }

    function addTwo(a) {
        var result = new Defer();
        setTimeout(function () {
            result.resolve(a + 2);
        }, 0);
        return result.promise;
    }

    function print(a) {
        console.log("result is " + a);
    }
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
var Events = require('events');

var Cats;
(function (Cats) {
    

    

    

    /**
    * Central infobus that transports all the events
    */
    var InfoBus = (function () {
        function InfoBus() {
            this.IDE = new Events.EventEmitter();
            this.SESSION = new Events.EventEmitter();
            this.EDITOR = new Events.EventEmitter();
            this.IntelliSense = new Events.EventEmitter();
            console.info("initiated new InfoBus");
        }
        return InfoBus;
    })();
    Cats.InfoBus = InfoBus;
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
var OS;
(function (OS) {
    /**
    * This module abstracts out the native File IO. Right now it uses Nodejs, but this
    * could be easily changed to another implementation like a cloud storage API.
    *
    * @TODO make this an async api.
    */
    (function (File) {
        var FS = require("fs");

        /**
        * Create recursively directories if they don't exist yet
        * @param path The directory path to create
        */
        function mkdirRecursiveSync(path) {
            if (!FS.existsSync(path)) {
                mkdirRecursiveSync(PATH.dirname(path));
                FS.mkdirSync(path, 509); //, 0775);
            }
        }
        File.mkdirRecursiveSync = mkdirRecursiveSync;

        /**
        * Remove a file or empty directory
        * @param path the path of the file or directory
        */
        function remove(path) {
            var isFile = FS.statSync(path).isFile();
            if (isFile)
                FS.unlinkSync(path);
            else
                FS.rmdirSync(path);
        }
        File.remove = remove;

        /**
        * Get platform
        */
        function platform() {
            return process.platform;
        }
        File.platform = platform;

        /**
        * Rename a file or directory
        * @param oldName the old name of the file or directory
        * @param newName the new name of the file or directory
        */
        function rename(oldName, newName) {
            FS.renameSync(oldName, newName);
        }
        File.rename = rename;

        /**
        * Write text content to a file. If a directory doesn't exist, create it
        * @param name The full name of the file
        * @param value The content of the file
        */
        function writeTextFile(name, value) {
            mkdirRecursiveSync(PATH.dirname(name));
            FS.writeFileSync(name, value, "utf8");
        }
        File.writeTextFile = writeTextFile;

        function switchToForwardSlashes(path) {
            return path.replace(/\\/g, "/");
        }
        File.switchToForwardSlashes = switchToForwardSlashes;

        /**
        * Read the files from a directory
        * @param directory The directory name that should be read
        */
        function readDir(directory) {
            var files = FS.readdirSync(directory);
            var result = [];
            files.forEach(function (file) {
                var fullName = PATH.join(directory, file);
                var stats = FS.statSync(fullName);
                result.push({
                    name: file,
                    fullName: switchToForwardSlashes(fullName),
                    isFile: stats.isFile(),
                    isDirectory: stats.isDirectory()
                });
            });
            return result;
        }
        File.readDir = readDir;

        /**
        * Read the files from a directory
        * @param directory The directory name that should be read
        */
        function readDir2(directory, cb) {
            var files = FS.readdirSync(directory);
            var result = [];
            files.forEach(function (file) {
                var fullName = PATH.join(directory, file);
                var stats = FS.statSync(fullName);
                result.push({
                    name: file,
                    fullName: switchToForwardSlashes(fullName),
                    isFile: stats.isFile(),
                    isDirectory: stats.isDirectory()
                });
            });
            cb(result);
        }
        File.readDir2 = readDir2;

        /**
        * Read the content from a text file
        * @param name The full name/path of the file
        */
        function readTextFile(name) {
            if (name === "Untitled")
                return "";

            var data = FS.readFileSync(name, "utf8");

            // Use single character line returns
            data = data.replace(/\r\n?/g, "\n");

            // Remove the BOM (only MS uses BOM for UTF8)
            data = data.replace(/^\uFEFF/, '');
            return data;
        }
        File.readTextFile = readTextFile;

        /**
        * Read the content from a text file
        * @param name The full name/path of the file
        */
        function readTextFile2(name, cb) {
            if (name === "Untitled")
                return "";

            var data = FS.readFileSync(name, "utf8");

            // Use single character line returns
            data = data.replace(/\r\n?/g, "\n");

            // Remove the BOM (only MS uses BOM for UTF8)
            data = data.replace(/^\uFEFF/, '');
            cb(data);
        }
        File.readTextFile2 = readTextFile2;

        /**
        * Return stats info about a path
        * @param name The fulle name/path of the file
        */
        function stat(path) {
            return FS.statSync(path);
        }
        File.stat = stat;

        /**
        * Return a watcher object on a file
        * @param name The fulle name/path of the file
        */
        function watch(path) {
            return FS.watch(path);
        }
        File.watch = watch;
    })(OS.File || (OS.File = {}));
    var File = OS.File;
})(OS || (OS = {}));
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
    /**
    * A utility class that makes it easy to make observable properties
    * Just inherit from this class and tell which properties you want to
    * become observable.
    */
    var ObservableImpl = (function () {
        function ObservableImpl(args) {
            // Give it is name that won't quickly conflict with classes that inherit this
            this._observerRegistry = {};
            if (args.length)
                this.makeObservable.apply(this, args);
        }
        ObservableImpl.prototype.removeListener = function (event, listener) {
            var o = this._observerRegistry[event];
            if (o) {
                var i = o.indexOf(listener);
                if (i > -1)
                    o.splice(i, 1);
            }
        };

        /**
        * Notify observers of a property change
        */
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

        /**
        * Get a list of all observers for a property
        */
        ObservableImpl.prototype.listeners = function (propertyName) {
            return this._observerRegistry[propertyName];
        };

        /**
        * Register an observer for changes to a certain property
        * @param event The property of interest
        * @param listener The observer that will be called
        * @param initial Should we also send an initial update
        */
        ObservableImpl.prototype.on = function (event, listener, initial) {
            if (typeof initial === "undefined") { initial = false; }
            if (!this._observerRegistry[event])
                this._observerRegistry[event] = [];
            this._observerRegistry[event].push(listener);
            if (initial) {
                listener.call(this, this[event], this);
            }
        };

        ObservableImpl.prototype.handleViewer = function (event) {
            var viewer = window["__viewID"];
            if (viewer) {
                var l = this._observerRegistry[event];
                if (l) {
                    var found = false;
                    for (var i = 0; i < l.length; i++) {
                        if (l[i] === viewer) {
                            found = true;
                            break;
                        }
                    }
                    if (!found)
                        l.push(viewer);
                } else {
                    this._observerRegistry[event] = [viewer];
                }
            }
        };

        /**
        * Make a number of plain properties observable
        * @param props The list of properties to be observable
        */
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
                        // this.handleViewer(prop);
                        return privateVar;
                    },
                    set: function (val) {
                        var _this = this;
                        console.log("received event: " + prop);
                        if (val === privateVar)
                            return;
                        privateVar = val;
                        clearTimeout(timer);
                        timer = setTimeout(function () {
                            return _this.emit(prop, val);
                        }, 0);
                    }
                });
            });
        };
        return ObservableImpl;
    })();
    Cats.ObservableImpl = ObservableImpl;
})(Cats || (Cats = {}));
var Cats;
(function (Cats) {
    var TreeWatcher = (function () {
        function TreeWatcher() {
            this.dirs = {};
            this.files = [];
            this.initial = true;
            this.preventedFileChange = [];
            this.alreadyFileChange = {};
        }
        TreeWatcher.prototype.onFileCreate = function (path) {
        };
        TreeWatcher.prototype.onFileDelete = function (path) {
        };
        TreeWatcher.prototype.onDirectoryCreate = function (path) {
        };
        TreeWatcher.prototype.onDirectoryDelete = function (path) {
        };
        TreeWatcher.prototype.onError = function (error) {
        };
        TreeWatcher.prototype.onFileChange = function (path) {
        };

        TreeWatcher.prototype.preventFileChange = function (filepath) {
            if (this.preventedFileChange.indexOf(filepath) == -1) {
                this.preventedFileChange.push(filepath);
            }
        };

        TreeWatcher.prototype.removePreventedFileChange = function (filepath) {
            var index = this.preventedFileChange.indexOf(filepath);
            if (index != -1) {
                this.preventedFileChange[index] = this.preventedFileChange[this.preventedFileChange.length - 1];
                this.preventedFileChange.pop();
            }
        };

        TreeWatcher.prototype.hasDirectory = function (directory) {
            return this.dirs.hasOwnProperty(directory);
        };

        TreeWatcher.prototype.addFile = function (filepath) {
            if (this.files.indexOf(filepath) == -1) {
                this.files.push(OS.File.switchToForwardSlashes(filepath));
                if (!this.initial) {
                    this.onFileCreate(filepath);
                }
            } else {
                if (this.preventedFileChange.indexOf(filepath) != -1) {
                    this.removePreventedFileChange(filepath);
                } else {
                    this.onFileChange(filepath);
                }
            }
        };

        TreeWatcher.prototype.removeFile = function (filepath) {
            var index = this.files.indexOf(filepath);
            if (index != -1) {
                if (index != (this.files.length - 1)) {
                    this.files[index] = this.files[this.files.length - 1];
                }
                this.files.pop();
                this.onFileDelete(filepath);
            }
        };

        TreeWatcher.prototype.setDirectory = function (directory) {
            this.clear();
            this.addDirectory(OS.File.switchToForwardSlashes(directory));
        };

        TreeWatcher.prototype.addDirectory = function (directory) {
            var _this = this;
            if (OS.File.platform() === "darwin")
                return;
            if (!this.hasDirectory(directory)) {
                if (!this.initial) {
                    this.onDirectoryCreate(directory);
                }
                this.dirs[OS.File.switchToForwardSlashes(directory)] = this.createWatcherForPath(directory);
                OS.File.readDir(directory).forEach(function (fileinfo) {
                    if (fileinfo.isDirectory) {
                        _this.addDirectory(fileinfo.fullName);
                    } else if (fileinfo.isFile) {
                        _this.addFile(fileinfo.fullName);
                    }
                });
            }
            this.initial = false;
        };

        TreeWatcher.prototype.removeDirectory = function (directory) {
            var _this = this;
            Object.keys(this.dirs).forEach(function (dir) {
                if ((dir == directory) || (dir.indexOf(directory + '/') == 0)) {
                    _this.onDirectoryDelete(dir);
                    _this.dirs[dir].close();
                    delete _this.dirs[dir];
                }
            });
            this.files.forEach(function (filepath) {
                if (filepath.indexOf(directory + '/') == 0) {
                    _this.removeFile(filepath);
                }
            });
        };

        TreeWatcher.prototype.clear = function () {
            for (var dirpath in this.dirs) {
                if (this.dirs.hasOwnProperty(dirpath)) {
                    this.removeDirectory(dirpath);
                }
            }
        };

        TreeWatcher.prototype.removeFileOrDirectory = function (path) {
            this.removeDirectory(path);
            this.removeFile(path);
        };

        TreeWatcher.prototype.refreshChangedFiles = function () {
            var _this = this;
            var now = new Date().getTime();
            Object.keys(this.alreadyFileChange).forEach(function (filepath) {
                if ((now - _this.alreadyFileChange[filepath]) > 50) {
                    delete _this.alreadyFileChange[filepath];
                }
            });
        };

        /**
        * The fs.watch api returns the change event twice when a file is saved, first
        * when the file is opened and truncated, then when the file is written.
        * This method handles this and returns true only once for a file path.
        */
        TreeWatcher.prototype.handleDoubleFileChange = function (filepath) {
            this.refreshChangedFiles();
            var now = new Date().getTime();
            if (!this.alreadyFileChange[filepath]) {
                this.alreadyFileChange[filepath] = now;
                return true;
            }
            return false;
        };

        TreeWatcher.prototype.createWatcherForPath = function (dirpath) {
            var _this = this;
            var watcher = OS.File.watch(dirpath);
            watcher.on('change', function (event, filename) {
                if (filename == null) {
                    try  {
                        OS.File.readDir(dirpath).filter(function (fileinfo) {
                            try  {
                                OS.File.stat(fileinfo.fullName);
                                return true;
                            } catch (e) {
                                return false;
                            }
                            return false;
                        }).forEach(function (fileinfo) {
                            _this.removeFileOrDirectory(fileinfo.fullName);
                        });
                    } catch (e) {
                        _this.removeFileOrDirectory(dirpath);
                    }
                } else {
                    try  {
                        var path = OS.File.switchToForwardSlashes(dirpath) + '/' + filename;
                        var stats;
                        stats = OS.File.stat(path);
                        if (stats.isDirectory()) {
                            _this.addDirectory(path);
                        } else if (stats.isFile()) {
                            if (_this.handleDoubleFileChange(path)) {
                                _this.addFile(path);
                            }
                        }
                    } catch (e) {
                        _this.removeFileOrDirectory(path);
                    }
                }
            });
            watcher.on('error', function (error) {
                _this.onError(error);
            });
            return watcher;
        };
        return TreeWatcher;
    })();
    Cats.TreeWatcher = TreeWatcher;
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
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Cats;
(function (Cats) {
    var Ide = (function (_super) {
        __extends(Ide, _super);
        function Ide() {
            _super.call(this, ["sessions", "activeSession", "project"]);
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
            this.sessionStack = [];
            this.mainEditor = new Cats.TextEditor(this.editor);
            this.config = this.loadConfig(true);
        }
        /**
        * Initialize the views associated with the IDE
        */
        Ide.prototype.initViews = function () {
            this.views.outline = new Cats.View.Outline();
            this.views.toolBar = new Cats.View.ToolBar();
            this.views.statusBar = new Cats.View.StatusBar();
            this.views.searchResults = new Cats.View.SearchResults();
            this.views.navigation = new Cats.View.Navigator();

            this.initTabBar();
            this.initNavBar();
            this.initInfoBar();
            this.initResultBar();
        };

        Ide.prototype.initTabBar = function () {
            var _this = this;
            this.tabbar = new Cats.UI.Tabbar();
            var tb = this.tabbar;
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
                if (session)
                    _this.openSession(session.name);
            };
            tb.ondelete = function (session) {
                return _this.closeSession(session);
            };
            tb.appendTo(this.sessionBar);
            IDE.on("sessions", function (sessions) {
                _this.tabbar.setOptions(sessions);
            });
        };

        Ide.prototype.initNavBar = function () {
            var navbar = new Cats.UI.Tabbar();

            var t = new Cats.UI.ElemTabAdapter(navbar, [this.fileNavigation, this.outlineNavigation], this.fileNavigation);
            t.setAspect(this.fileNavigation, "decorator", "icon-files");
            t.setAspect(this.outlineNavigation, "decorator", "icon-outline");
            navbar.appendTo(this.navigationBar);
        };

        Ide.prototype.initInfoBar = function () {
            var infobar = new Cats.UI.Tabbar();
            infobar.setOptions([
                { name: "Task List", selected: true, decorator: "icon-tasks" }
            ]);
            infobar.appendTo(this.taskBar);
        };

        Ide.prototype.initResultBar = function () {
            var t = new Cats.UI.ElemTabAdapter(IDE.resultbar, [IDE.compilationResult, IDE.searchResult, IDE.console], IDE.compilationResult);
            t.setAspect(this.compilationResult, "decorator", "icon-errors");
            t.setAspect(this.searchResult, "decorator", "icon-search");
            t.setAspect(this.console, "decorator", "icon-console");
            this.resultbar.appendTo(this.resultbarElem);
        };

        Ide.prototype.init = function () {
            var _this = this;
            Cats.Commands.init();
            Cats.Menu.createMenuBar();
            this.initViews();
            this.layout();
            Cats.Menu.initFileContextMenu();
            Cats.Menu.initTabContextMenu();

            setTimeout(function () {
                _this.setTheme(_this.config.theme);
                _this.setFontSize(_this.config.fontSize);
                _this.setRightMargin(_this.config.rightMargin);
            }, 2000);
        };

        /**
        * Load the projects and files that were open last time before the
        * application was closed.
        */
        Ide.prototype.loadDefaultProjects = function () {
            var _this = this;
            console.info("restoring previous project and sessions.");
            if (this.config.projects && this.config.projects.length) {
                var projectDir = this.config.projects[0];
                this.addProject(new Cats.Project(projectDir));
            }

            if (this.config.sessions) {
                console.info("Found previous sessions: ", this.config.sessions.length);
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

        /**
        * Set the font size of the IDE
        * @param size the font size in pixels
        */
        Ide.prototype.setFontSize = function (size) {
            this.config.fontSize = size;
            IDE.mainEditor.aceEditor.setFontSize(size + "px");
        };

        /**
        * Set the right margin of the IDE
        * @param margin number of columns
        */
        Ide.prototype.setRightMargin = function (margin) {
            this.config.rightMargin = margin;
            IDE.mainEditor.aceEditor.setPrintMarginColumn(margin);
        };

        /**
        * Add a new session to the IDE
        * @param session The session to be added
        */
        Ide.prototype.addSession = function (session) {
            this.sessions = this.sessions.concat([session]);
        };

        /**
        * Are there any session that have unsaved changes
        */
        Ide.prototype.hasUnsavedSessions = function () {
            for (var i = 0; i < this.sessions.length; i++) {
                if (this.sessions[i].changed)
                    return true;
            }
            return false;
        };

        /**
        * Get the first session based on its filename
        * @param name The name of the session
        */
        Ide.prototype.getSession = function (name) {
            for (var i = 0; i < this.sessions.length; i++) {
                var session = this.sessions[i];
                if (session.name === name)
                    return session;
            }
        };

        /**
        * Indicate whether the IDE is busy with some (background) task
        * @param isBusy true if busy, false otherwise
        */
        Ide.prototype.busy = function (isBusy) {
            if (isBusy) {
                $("#activity").addClass("busy");
            } else {
                $("#activity").removeClass("busy");
            }
        };

        /**
        * Layout the IDE
        */
        Ide.prototype.layout = function () {
            this.layoutConfig = Cats.layoutIDE();
        };

        /**
        * Get the directory where the icons for the IDE can be found
        */
        Ide.prototype.getIconDir = function () {
            return this.config.iconDir || "static/img/";
        };

        /**
        * Load the configuration for the IDE
        * @param project Also load the project
        */
        Ide.prototype.loadConfig = function (project) {
            var defaultConfig = {
                version: "1",
                theme: "cats",
                fontSize: 13,
                iconDir: "static/img/",
                rightMargin: 80,
                sessions: [],
                projects: [PATH.join(process.cwd(), "samples", "greeter")]
            };

            var configStr = localStorage["cats.config"];

            if (configStr) {
                try  {
                    var config = JSON.parse(configStr);
                    if (config.version === "1")
                        return config;
                } catch (err) {
                    console.log("Error during parsing config " + err);
                }
            }

            return defaultConfig;
        };

        /**
        * Persist the current IDE configuration to a file
        */
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

            if (this.project)
                config.projects.push(this.project.projectDir);
            var configStr = JSON.stringify(config);
            localStorage["cats.config"] = configStr;
        };

        Ide.prototype.addToSessionStack = function (name, pos, cb) {
            this.removeFromSessionStack(name);
            this.sessionStack.push({
                name: name,
                pos: pos,
                cb: cb
            });
        };

        Ide.prototype.removeFromSessionStack = function (name) {
            this.sessionStack = this.sessionStack.filter(function (session) {
                return session.name != name;
            });
        };

        Ide.prototype.hasPreviousSession = function () {
            return this.sessionStack.length > 0;
        };

        Ide.prototype.previousSession = function () {
            return this.sessionStack[this.sessionStack.length - 1];
        };

        /**
        * Open an existing session or if it doesn't exist yet create
        * a new one.
        */
        Ide.prototype.openSession = function (name, pos, cb) {
            var session = this.getSession(name);
            if (!session) {
                var content = "";
                if (name) {
                    var mode = Cats.AceSession.determineMode(name);
                    if (mode === "binary") {
                        var validate = confirm("This might be a binary file, are you sure ?");
                        if (!validate)
                            return;
                    }
                    content = OS.File.readTextFile(name);
                }
                session = new Cats.AceSession(name, content);
                this.addSession(session);
            }
            this.mainEditor.edit(session, pos);
            this.activeSession = session;
            this.addToSessionStack(name, pos, cb);
            if (cb)
                cb(session);
        };

        Ide.prototype.persistSession = function (session, shouldConfirm) {
            if (typeof shouldConfirm === "undefined") { shouldConfirm = false; }
            if (this.project)
                this.project.getWatcher().preventFileChange(session.name);

            session.persist(shouldConfirm);
        };

        /**
        * Close a session
        * @param session The session to close
        */
        Ide.prototype.closeSession = function (session) {
            var _this = this;
            var result = [];
            this.persistSession(session, true);

            this.sessions.forEach(function (s) {
                if (s !== session) {
                    result.push(s);
                }
            });

            this.removeFromSessionStack(session.name);

            // Check if was the current session displayed
            if (IDE.activeSession === session) {
                IDE.activeSession = null;
                IDE.mainEditor.hide();
                if (this.hasPreviousSession()) {
                    var prevSession = this.previousSession();
                    setTimeout(function () {
                        _this.openSession(prevSession.name, prevSession.pos, prevSession.cb);
                    }, 0);
                }
            }

            this.sessions = result;
        };

        /**
        * Set the theme of the IDE
        * @param theme The name of the new theme
        */
        Ide.prototype.setTheme = function (theme) {
            this.config.theme = theme;
            IDE.mainEditor.setTheme(theme);
            setTimeout(function () {
                var isDark = document.getElementsByClassName("ace_dark").length > 0;
                var fg = isDark ? "white" : "black";
                var elem = document.getElementsByClassName("ace_scroller")[0];
                var bg = window.getComputedStyle(elem, null).backgroundColor;
                elem = document.getElementById("editor");
                var fg = window.getComputedStyle(elem, null).color;
                var markerLayer = document.createElement("div");
                markerLayer.className = "ace_marker-layer";
                var selectionEl = document.createElement("span");
                selectionEl.className = "ace_selection";
                markerLayer.appendChild(selectionEl);
                elem.appendChild(markerLayer);
                var selectionBg = window.getComputedStyle(selectionEl, null).backgroundColor;
                var selectionFg = window.getComputedStyle(selectionEl, null).color;
                elem.removeChild(markerLayer);

                $("html, #main, #navigator, #info, #result").css("background-color", bg);
                $("html").css("color", fg);
                $("body").removeClass("theme-light theme-dark").addClass(isDark ? "theme-dark" : "theme-light");
                $(".autocomplete").css("background-color", bg);
                $(".autocomplete").css("color", fg);
                $("input").css("background-color", fg);
                $("input").css("color", bg);

                elem = document.getElementById("editor");
                bg = window.getComputedStyle(elem, null).backgroundColor;
                fg = window.getComputedStyle(elem, null).color;

                var style = document.createElement("style");
                style.appendChild(document.createTextNode(""));
                document.head.appendChild(style);

                var sheet = style["sheet"];
                sheet.insertRule(".tabbar li.active, .tabbar li:hover { background-color: " + bg + " !important; color: " + fg + " !important; }", 0);
                sheet.insertRule(".autocomplete_selected { background-color: " + selectionBg + " !important; color: " + selectionFg + "}", 0);
                sheet.insertRule(".ace_search, input { background-color: " + bg + " !important; color: " + fg + "}", 0);
                sheet.insertRule(".ace_search_options .ace_button:before { background-color: " + bg + " !important;", 0);
            }, 500);
        };

        /**
        * Add a new project to the IDE
        * @param projectDir the directory of the new project
        */
        Ide.prototype.addProject = function (project) {
            this.project = project;
        };

        /**
        * Close an open project
        * @param project to be closed
        */
        Ide.prototype.closeProject = function (project) {
            // TODO put code on IDE
            var sessions = IDE.sessions;
            for (var i = 0; i < sessions.length; i++) {
                var session = sessions[i];
                if (session.changed)
                    IDE.persistSession(session, true);
            }
            this.sessions = [];
            this.project.close();
            this.project = null;
        };
        return Ide;
    })(Cats.ObservableImpl);
    Cats.Ide = Ide;
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
/*
* This file layout the different views that make up the IDE. The views themselves
* are not declared in this file.
*/
var Cats;
(function (Cats) {
    /**
    * Quickfix to deal with the fact that when the browser window is resized, by default the
    * filetree and outline divs are sized 25 pixels to heigh. This is due to the tabs
    * above them.
    */
    function resizeOuter(name, state) {
        if (name === "west") {
            $("#filetree, #outlinenav").height(state.innerHeight() - 25);
        }
    }

    function resizeInner(name, state) {
        if (name === "center")
            IDE.mainEditor.aceEditor.resize(true);
        if (name === "south") {
            $("#searchresults, #errorresults, #console").height(state.innerHeight() - 25);
        }
    }

    /**
    * Initialize and layout the various components of the IDE
    */
    function layoutIDE() {
        // OUTER-LAYOUT
        var layout = $('body').layout({
            onresize: resizeOuter,
            center__paneSelector: "#center",
            west__paneSelector: "#navigator",
            north__paneSelector: "#toolbar",
            south__paneSelector: "#statusbar",
            spacing_open: 0,
            spacing_closed: 0,
            north__maxSize: 25,
            west__size: .20,
            west__spacing_open: 4,
            west__spacing_closed: 4,
            south__maxSize: 25,
            center__childOptions: {
                onresize: resizeInner,
                center__paneSelector: "#main",
                south__paneSelector: "#result",
                south__size: .20,
                spacing_open: 4,
                spacing_closed: 4
            }
        });
        return layout;
    }
    Cats.layoutIDE = layoutIDE;
    ;
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
var Cats;
(function (Cats) {
    var EditSession = ace.require("ace/edit_session").EditSession;
    var UndoManager = ace.require("ace/undomanager").UndoManager;

    var AceSession = (function (_super) {
        __extends(AceSession, _super);
        /**
        * Create a new session
        *
        * @param project The project the session belongs to
        * @param name The name of the session
        * @param content The content of the session
        */
        function AceSession(name, content) {
            var _this = this;
            _super.call(this, ["changed"]);
            this.name = name;
            this.type = "ACE";
            this.overwrite = false;
            // Is the worker out of sync with the source code
            this.pendingWorkerUpdate = false;
            // Has the code been changed without saving yet
            this.changed = false;

            console.log("Creating new session for file " + name);
            this.mode = AceSession.determineMode(name);
            this.editSession = new EditSession(content, "ace/mode/" + this.mode);

            var editorConfig = this.project.config.editor;
            if (editorConfig) {
                for (var key in editorConfig) {
                    try  {
                        var ukey = key[0].toUpperCase() + key.slice(1);
                        var value = editorConfig[key];
                        this.editSession['set' + ukey](value);
                    } catch (e) {
                        console.warn("can't set editor config: " + key + ":" + value);
                        console.warn(e);
                    }
                }
            }

            this.editSession.on("change", this.onChangeHandler.bind(this));
            this.editSession.setUndoManager(new UndoManager());
            this.editSession.on("changeOverwrite", function (a) {
                infoBus.SESSION.emit("overwrite", _this.editSession.getOverwrite());
            });

            this.on("changed", function () {
                IDE.tabbar.refresh();
            });
        }
        Object.defineProperty(AceSession.prototype, "project", {
            get: function () {
                return IDE.project;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(AceSession.prototype, "shortName", {
            get: function () {
                if (!this.name)
                    return "Untitled";
                return PATH.basename(this.name);
            },
            enumerable: true,
            configurable: true
        });

        /**
        * Get the current position of the cursor
        */
        AceSession.prototype.getPosition = function () {
            var c = this.editSession.getSelection().getCursor();

            var pos = {
                row: c.row,
                column: c.column
            };

            return pos;
        };

        /**
        * Setup some required listeners
        */
        AceSession.prototype.setListeners = function () {
            var _this = this;
            var listeners = {
                "changeOverwrite": function () {
                    _this.overwrite = _this.editSession.getOverwrite();
                }
            };

            for (var event in listeners) {
                this.editSession.on(event, listeners[event]);
            }
        };

        /**
        * Persist the edit session
        */
        AceSession.prototype.persist = function (shouldConfirm) {
            // Select proper folder separator according to platform used
            if (typeof shouldConfirm === "undefined") { shouldConfirm = false; }
            var dirSlash = process.platform == "win32" ? "\\" : "/";

            if (this.name === "Untitled") {
                this.name = prompt("Please enter the file name", IDE.project.projectDir + dirSlash) || "Untitled";
            }

            if (this.changed && shouldConfirm) {
                var c = confirm("Save " + this.name + " before closing ?");
                if (!c)
                    return;
            }

            if (this.name !== "Untitled") {
                OS.File.writeTextFile(this.name, this.getValue());
                this.changed = false;
            }

            if (IDE.project.config.buildOnSave && (this.mode === "typescript"))
                Cats.Commands.runCommand(34 /* project_build */);
        };

        /**
        * Get the value of this edit session
        */
        AceSession.prototype.getValue = function () {
            return this.editSession.getValue();
        };

        /**
        * Set the value of this edit session.
        */
        AceSession.prototype.setValue = function (value) {
            this.editSession.setValue(value);
        };

        /**
        * Get the Position based on mouse x,y coordinates
        */
        AceSession.prototype.getPositionFromScreenOffset = function (x, y) {
            var r = IDE.mainEditor.aceEditor.renderer;

            // var offset = (x + r.scrollLeft - r.$padding) / r.characterWidth;
            var offset = (x - r.$padding) / r.characterWidth;

            // @BUG: Quickfix for strange issue with top
            var correction = r.scrollTop ? 7 : 0;

            var row = Math.floor((y + r.scrollTop - correction) / r.lineHeight);
            var col = Math.round(offset);
            var docPos = this.editSession.screenToDocumentPosition(row, col);
            return docPos;
        };

        /**
        * Show info at Screen location
        */
        AceSession.prototype.showInfoAt = function (ev) {
            if (this.mode !== "typescript")
                return;

            var docPos = this.getPositionFromScreenOffset(ev.offsetX, ev.offsetY);
            var project = this.project;

            this.project.iSense.getTypeAtPosition(this.name, docPos, function (err, data) {
                if (!data)
                    return;
                var member = data.memberName;
                if (!member)
                    return;

                var tip = data.description;
                if (data.docComment) {
                    tip += "\n" + data.docComment;
                }

                IDE.mainEditor.toolTip.show(ev.x, ev.y, tip);
            });
        };

        /**
        * Determine the edit mode based on the file name
        * @param name File name
        */
        AceSession.determineMode = function (name) {
            var ext = PATH.extname(name);
            var result = AceSession.MODES[ext] || AceSession.DEFAULT_MODE;
            return result;
        };

        /**
        * Check if there are any errors for this session and show them.
        */
        AceSession.prototype.showErrors = function () {
            var _this = this;
            if (this.mode === "typescript") {
                this.project.iSense.getErrors(this.name, function (err, result) {
                    var annotations = [];
                    if (result) {
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

        /**
        * Update the worker with the latest version of the content of this
        * session.
        */
        AceSession.prototype.update = function () {
            if (this.mode === "typescript") {
                var source = this.editSession.getValue();
                this.project.iSense.updateScript(this.name, source);
                clearTimeout(this.updateSourceTimer);
                this.pendingWorkerUpdate = false;
            }
            ;
        };

        /**
        * Perform code autocompletion. Right now support for TS.
        */
        AceSession.prototype.autoComplete = function (cursor, view) {
            if (this.mode !== "typescript")
                return;

            // Any pending changes that are not yet send to the worker?
            if (this.pendingWorkerUpdate)
                this.update();

            this.project.iSense.autoComplete(cursor, this.name, function (err, completes) {
                if (completes != null)
                    view.showCompletions(completes.entries);
            });
        };

        /**
        * Keep track of changes made to the content and update the
        * worker if required.
        */
        AceSession.prototype.onChangeHandler = function (event) {
            var _this = this;
            this.changed = true;
            this.pendingWorkerUpdate = true;

            if (this.mode !== "typescript")
                return;

            clearTimeout(this.updateSourceTimer);

            // Don't send too many updates to the worker
            this.updateSourceTimer = setTimeout(function () {
                if (_this.pendingWorkerUpdate)
                    _this.update();
                _this.showErrors();
            }, 1000);
        };
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
        return AceSession;
    })(Cats.ObservableImpl);
    Cats.AceSession = AceSession;
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
var Cats;
(function (Cats) {
    (function (Commands) {
        /**
        * List of known commands
        */
        (function (CMDS) {
            CMDS[CMDS["help_devTools"] = 0] = "help_devTools";
            CMDS[CMDS["help_shortcuts"] = 1] = "help_shortcuts";
            CMDS[CMDS["help_processInfo"] = 2] = "help_processInfo";
            CMDS[CMDS["help_about"] = 3] = "help_about";

            CMDS[CMDS["file_new"] = 4] = "file_new";
            CMDS[CMDS["file_open"] = 5] = "file_open";
            CMDS[CMDS["file_close"] = 6] = "file_close";
            CMDS[CMDS["file_closeOther"] = 7] = "file_closeOther";
            CMDS[CMDS["file_closeAll"] = 8] = "file_closeAll";
            CMDS[CMDS["file_save"] = 9] = "file_save";
            CMDS[CMDS["file_saveAs"] = 10] = "file_saveAs";
            CMDS[CMDS["file_saveAll"] = 11] = "file_saveAll";

            CMDS[CMDS["edit_undo"] = 12] = "edit_undo";
            CMDS[CMDS["edit_redo"] = 13] = "edit_redo";
            CMDS[CMDS["edit_cut"] = 14] = "edit_cut";
            CMDS[CMDS["edit_copy"] = 15] = "edit_copy";
            CMDS[CMDS["edit_paste"] = 16] = "edit_paste";
            CMDS[CMDS["edit_find"] = 17] = "edit_find";
            CMDS[CMDS["edit_findNext"] = 18] = "edit_findNext";
            CMDS[CMDS["edit_findPrev"] = 19] = "edit_findPrev";
            CMDS[CMDS["edit_replace"] = 20] = "edit_replace";
            CMDS[CMDS["edit_replaceAll"] = 21] = "edit_replaceAll";
            CMDS[CMDS["edit_toggleInvisibles"] = 22] = "edit_toggleInvisibles";
            CMDS[CMDS["edit_toggleRecording"] = 23] = "edit_toggleRecording";
            CMDS[CMDS["edit_replayMacro"] = 24] = "edit_replayMacro";

            CMDS[CMDS["edit_toggleComment"] = 25] = "edit_toggleComment";
            CMDS[CMDS["edit_indent"] = 26] = "edit_indent";
            CMDS[CMDS["edit_outdent"] = 27] = "edit_outdent";

            CMDS[CMDS["source_format"] = 28] = "source_format";
            CMDS[CMDS["source_openDeclaration"] = 29] = "source_openDeclaration";
            CMDS[CMDS["source_findRef"] = 30] = "source_findRef";
            CMDS[CMDS["source_findDecl"] = 31] = "source_findDecl";

            CMDS[CMDS["project_open"] = 32] = "project_open";
            CMDS[CMDS["project_close"] = 33] = "project_close";
            CMDS[CMDS["project_build"] = 34] = "project_build";
            CMDS[CMDS["project_validate"] = 35] = "project_validate";
            CMDS[CMDS["project_run"] = 36] = "project_run";
            CMDS[CMDS["project_debug"] = 37] = "project_debug";
            CMDS[CMDS["project_refresh"] = 38] = "project_refresh";
            CMDS[CMDS["project_properties"] = 39] = "project_properties";
            CMDS[CMDS["project_dependencies"] = 40] = "project_dependencies";

            CMDS[CMDS["navigate_gotoLine"] = 41] = "navigate_gotoLine";
            CMDS[CMDS["navigate_references"] = 42] = "navigate_references";
            CMDS[CMDS["navigate_occurences"] = 43] = "navigate_occurences";
            CMDS[CMDS["navigate_implementors"] = 44] = "navigate_implementors";
            CMDS[CMDS["navigate_declaration"] = 45] = "navigate_declaration";

            CMDS[CMDS["refactor_rename"] = 46] = "refactor_rename";

            CMDS[CMDS["ide_quit"] = 47] = "ide_quit";
            CMDS[CMDS["ide_theme"] = 48] = "ide_theme";
            CMDS[CMDS["ide_fontSize"] = 49] = "ide_fontSize";
            CMDS[CMDS["ide_rightMargin"] = 50] = "ide_rightMargin";
            CMDS[CMDS["ide_toggleView"] = 51] = "ide_toggleView";
        })(Commands.CMDS || (Commands.CMDS = {}));
        var CMDS = Commands.CMDS;

        var commands = [];
        var commandList = [];

        function getAllCommands() {
            return commands;
        }
        Commands.getAllCommands = getAllCommands;

        /**
        * When a command has no function declared,
        * use this one
        */
        function nop() {
            alert("Not yet implemented");
        }

        /**
        * Register a new command
        */
        function register(command) {
            if (!command.command)
                command.command = nop;
            commands[command.name] = command;
            commandList.push(command);
        }
        Commands.register = register;

        // TODO i18n
        function addShortcut(label, shortCut) {
            var result = label;
            var tabs = 5 - Math.floor((result.length / 4));

            // console.log("Label " + result + " has tabs: " + tabs);
            result = result + "     " + "\t\t\t\t\t\t".substring(0, tabs) + shortCut;

            // result += "\u0007" + shortCut;
            // result += "      " + shortCut;
            // result += shortCut;
            return result;
        }

        

        function getMenuCommand(name, label) {
            var params = [];
            for (var _i = 0; _i < (arguments.length - 2); _i++) {
                params[_i] = arguments[_i + 2];
            }
            var cmd = commands[name];
            if (!cmd) {
                console.error("No implementation available for command " + name);
                return new GUI.MenuItem({ label: "Unknow command" });
            }
            var click;
            if (params.length > 0) {
                // lets generate a closure
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

            // if (cmd.shortcut) item.label += " [" + cmd.shortcut + "]";
            if (cmd.shortcut)
                item.label = addShortcut(item.label, cmd.shortcut);
            if (cmd.icon)
                item.icon = IDE.getIconDir() + cmd.icon;

            return new GUI.MenuItem(item);
        }
        Commands.getMenuCommand = getMenuCommand;

        function runCommand(name) {
            commands[name].command();
        }
        Commands.runCommand = runCommand;

        function get(name) {
            return commands[name];
        }
        Commands.get = get;

        /**
        * Call the different command implementers so they can register
        * themselves
        */
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
    // This module contains all the global commands pertaining to the edit functionality
    // Much of it is already provided by the Ace editor and just wraps this functionality
    (function (Commands) {
        // Just wrap the Ace command.
        function editorCommand(commandName) {
            return function () {
                IDE.mainEditor.aceEditor.execCommand(commandName);
            };
        }

        // Perform code autocompletion
        function autoComplete(cursor, view) {
            var session = IDE.activeSession;
            if (!session)
                return;

            if (session.mode !== "typescript")
                return;
            session.update();

            session.project.iSense.autoComplete(cursor, session.name, function (err, completes) {
                if (completes != null)
                    view.showCompletions(completes.entries);
            });
        }

        function formatText() {
            var session = IDE.activeSession;
            if (session) {
                session.project.iSense.perform("getFormattedTextForRange", session.name, 0, session.getValue().length, function (err, result) {
                    if (!err) {
                        var pos = IDE.mainEditor.aceEditor.getCursorPosition();
                        session.setValue(result);
                        if (pos)
                            IDE.mainEditor.aceEditor.moveCursorToPosition(pos);
                    }
                });
            }
        }

        // TODO i18n
        function getShortcut(commandName) {
            var platform = IDE.mainEditor.aceEditor.commands.platform;
            var command = IDE.mainEditor.aceEditor.commands.byName[commandName];

            if (command && command.bindKey) {
                var key = command.bindKey[platform];
                return key;
            }

            return null;
        }

        // TODO i18n
        function addShortcut(label, commandName) {
            var result = label;
            var platform = IDE.mainEditor.aceEditor.commands.platform;
            var command = IDE.mainEditor.aceEditor.commands.byName[commandName];

            if (command && command.bindKey) {
                var tabs = 5 - Math.floor((result.length / 4) - 0.01);
                result = result + "\t\t\t\t\t\t".substring(0, tabs);
                var key = command.bindKey[platform];
                if (key)
                    result += key;
            }
            return result;
        }

        function toggleInvisibles() {
            IDE.mainEditor.aceEditor.setShowInvisibles(!IDE.mainEditor.aceEditor.getShowInvisibles());
        }

        var EditorCommands = (function () {
            function EditorCommands() {
            }
            EditorCommands.init = function (registry) {
                var editorCommands = [
                    { id: 12 /* edit_undo */, label: "Undo", icon: "undo.png" },
                    { id: 13 /* edit_redo */, label: "Redo", icon: "redo.png" },
                    { id: 26 /* edit_indent */, label: "Indent" },
                    { id: 27 /* edit_outdent */, label: "Outdent" },
                    /*{ id: Cats.Commands.CMDS.edit_cut, label: "Cut" },
                    { id: Cats.Commands.CMDS.edit_copy, label: "Copy" },
                    { id: Cats.Commands.CMDS.edit_paste, label: "Paste" },*/
                    { id: 17 /* edit_find */, label: "Find", cmd: "find" },
                    { id: 18 /* edit_findNext */, label: "Find Next", cmd: "findnext" },
                    { id: 19 /* edit_findPrev */, label: "Find Previous", cmd: "findprevious" },
                    { id: 20 /* edit_replace */, label: "Find/Replace", cmd: "replace", icon: "find.png" },
                    { id: 21 /* edit_replaceAll */, label: "Replace All", cmd: "replaceall" },
                    { id: 25 /* edit_toggleComment */, label: "Toggle Comment", cmd: "togglecomment", icon: "comment.png" },
                    { id: 23 /* edit_toggleRecording */, label: "Start/Stop Recording", cmd: "togglerecording" },
                    { id: 24 /* edit_replayMacro */, label: "Playback Macro", cmd: "replaymacro" },
                    { id: 41 /* navigate_gotoLine */, label: "Goto Line", cmd: "gotoline" }
                ];

                editorCommands.forEach(function (config) {
                    if (!config.cmd)
                        config.cmd = config.label.toLowerCase();

                    // var label = addShortcut(config.label, config.cmd);
                    var item = {
                        name: config.id,
                        label: config.label,
                        shortcut: getShortcut(config.cmd),
                        command: editorCommand(config.cmd)
                    };
                    if (config.icon)
                        item.icon = config.icon;
                    registry(item);
                });

                registry({ name: 22 /* edit_toggleInvisibles */, label: "Toggle Invisible Characters", command: toggleInvisibles, icon: "invisibles.png" });
                registry({ name: 28 /* source_format */, label: "Format Code", command: formatText, icon: "format.png" });
            };
            return EditorCommands;
        })();
        Commands.EditorCommands = EditorCommands;
    })(Cats.Commands || (Cats.Commands = {}));
    var Commands = Cats.Commands;
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
var Cats;
(function (Cats) {
    // This module contains all the global commands pertaining to the file functionality
    (function (Commands) {
        /**
        * Create a new edit session
        */
        function newFile() {
            IDE.openSession("Untitled");
        }

        /**
        * Close the active edit session
        */
        function closeFile() {
            if (IDE.activeSession)
                IDE.closeSession(IDE.activeSession);
        }

        /**
        * Close all edit sessions
        */
        function closeAllFiles() {
            var sessions = IDE.sessions;
            sessions.forEach(function (session) {
                IDE.closeSession(session);
            });
        }

        /**
        * Close all edit sessions except the active session
        */
        function closeOtherFiles() {
            var sessions = IDE.sessions;
            var activeSession = IDE.activeSession;
            for (var i = 0; i < sessions.length; i++) {
                var session = sessions[i];
                if (session !== activeSession) {
                    IDE.closeSession(session);
                }
            }
        }

        /**
        * Save all edit sessions that have changed
        */
        function saveAll() {
            var sessions = IDE.sessions;
            for (var i = 0; i < sessions.length; i++) {
                var session = sessions[i];
                if (session.changed)
                    IDE.persistSession(session);
            }
        }

        /**
        * Save the active sessions under a different name
        */
        function saveAs() {
            var session = IDE.activeSession;
            if (session) {
                var newName = prompt("Enter new name", session.name);
                if (newName) {
                    session.name = newName;
                    IDE.persistSession(session);
                }
            }
        }

        /**
        * Save the active session
        */
        function saveFile() {
            var session = IDE.activeSession;
            if (session)
                IDE.persistSession(session);
        }

        var FileCommands = (function () {
            function FileCommands() {
            }
            FileCommands.init = function (registry) {
                registry({ name: 4 /* file_new */, label: "New File", command: newFile, icon: "new.png" });
                registry({ name: 6 /* file_close */, label: "Close File", command: closeFile });
                registry({ name: 7 /* file_closeOther */, label: "Close Other Files", command: closeOtherFiles });
                registry({ name: 8 /* file_closeAll */, label: "Close All Files", command: closeAllFiles });
                registry({ name: 9 /* file_save */, label: "Save File", command: saveFile });
                registry({ name: 11 /* file_saveAll */, label: "Save All", command: saveAll, icon: "save.png" });
                registry({ name: 10 /* file_saveAs */, label: "Save As...", command: saveAs });
            };
            return FileCommands;
        })();
        Commands.FileCommands = FileCommands;
    })(Cats.Commands || (Cats.Commands = {}));
    var Commands = Cats.Commands;
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
var Cats;
(function (Cats) {
    // This module contains all the global commands pertaining to the help functionality
    (function (Commands) {
        /**
        * Show the available keyboard shortcuts
        */
        function showShortcuts() {
            var isDark = document.getElementsByClassName("ace_dark").length > 0;
            var elem = document.getElementsByClassName("ace_scroller")[0];
            var bg = window.getComputedStyle(elem, null).backgroundColor;
            elem = document.getElementById("editor");
            var fg = window.getComputedStyle(elem, null).color;
            var w = window.open("keyboard_shortcuts.html", "_blank", "width=800; height=595");

            w.onload = function () {
                var body = w.document.body;

                $(body).css("background-color", bg).css("color", fg);

                if (isDark) {
                    $(body).addClass("dark");
                }
            };
        }

        /**
        * Show the version of CATS
        */
        function showAbout() {
            alert("Code Assisitant for TypeScript, version 0.9.5.alpha\nCreated by JBaron\nIcons from icons8.com");
        }

        /**
        * Open the webkit developers tools for debugging etc.
        */
        function showDevTools() {
            GUI.Window.get().showDevTools();
        }

        /**
        * Show process info like current memory usage
        */
        function showProcess() {
            var mem = process.memoryUsage();
            var display = "memory used: " + mem.heapUsed;
            display += "\nmemory total: " + mem.heapTotal;
            display += "\nplatform: " + process.platform;
            display += "\nworking directory: " + process.cwd();
            alert(display);
        }

        var HelpCommands = (function () {
            function HelpCommands() {
            }
            HelpCommands.init = function (registry) {
                registry({ name: 3 /* help_about */, label: "About", command: showAbout });
                registry({ name: 0 /* help_devTools */, label: "Developer Tools", command: showDevTools });
                registry({ name: 1 /* help_shortcuts */, label: "Shortcuts", command: showShortcuts });
                registry({ name: 2 /* help_processInfo */, label: "Process Info", command: showProcess });
            };
            return HelpCommands;
        })();
        Commands.HelpCommands = HelpCommands;
    })(Cats.Commands || (Cats.Commands = {}));
    var Commands = Cats.Commands;
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
var Cats;
(function (Cats) {
    /**
    * This module contains all the global commands pertaining to IDE functionality
    */
    (function (Commands) {
        /**
        * Quit CATS
        */
        function quit() {
            if (IDE.hasUnsavedSessions()) {
                if (!confirm("There are unsaved files!\nDo you really want to quit?"))
                    return;
            }
            IDE.saveConfig();
            GUI.App.quit();
        }

        /**
        * Set the theme
        */
        function setTheme(theme) {
            IDE.setTheme(theme);
        }

        /**
        * Set the font size
        */
        function setFontSize(size) {
            IDE.setFontSize(size);
        }

        function setRightMargin(margin) {
            IDE.setRightMargin(margin);
        }

        function toggleView(name) {
            IDE.layoutConfig.toggle(name);
        }

        /**
        * Register the IDE commands
        */
        var IdeCommands = (function () {
            function IdeCommands() {
            }
            IdeCommands.init = function (registry) {
                registry({ name: 47 /* ide_quit */, label: "Quit", command: quit });
                registry({ name: 48 /* ide_theme */, label: "Theme", command: setTheme });
                registry({ name: 49 /* ide_fontSize */, label: "Font Size", command: setFontSize });
                registry({ name: 50 /* ide_rightMargin */, label: "Right Margin", command: setRightMargin });
                registry({ name: 51 /* ide_toggleView */, label: "Toggle View", command: toggleView });
            };
            return IdeCommands;
        })();
        Commands.IdeCommands = IdeCommands;
    })(Cats.Commands || (Cats.Commands = {}));
    var Commands = Cats.Commands;
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
var Cats;
(function (Cats) {
    (function (Commands) {
        function getCursor() {
            return IDE.mainEditor.aceEditor.getCursorPosition();
        }

        function gotoDeclaration() {
            var session = IDE.activeSession;
            if (!session)
                return;
            var cursor = getCursor();
            session.project.iSense.perform("getDefinitionAtPosition", session.name, cursor, function (err, data) {
                if (data && data.fileName)
                    IDE.openSession(data.fileName, data.range.start);
            });
        }
        Commands.gotoDeclaration = gotoDeclaration;

        function getInfoAt(type) {
            var session = IDE.activeSession;
            if (!session)
                return;
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
            function NavigateCommands() {
            }
            NavigateCommands.init = function (registry) {
                registry({ name: 42 /* navigate_references */, label: "Find References", command: findReferences });
                registry({ name: 44 /* navigate_implementors */, label: "Find Implementations", command: findImplementors });
                registry({ name: 43 /* navigate_occurences */, label: "Find Occurences", command: findOccurences });
                registry({ name: 45 /* navigate_declaration */, label: "Goto Declaration", command: gotoDeclaration });
            };
            return NavigateCommands;
        })();
        Commands.NavigateCommands = NavigateCommands;
    })(Cats.Commands || (Cats.Commands = {}));
    var Commands = Cats.Commands;
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
var Cats;
(function (Cats) {
    // This module contains all the global commands pertaining to project related functionality
    (function (Commands) {
        function closeAllProjects() {
            var sure = confirm("Do you really want to quit?");
            if (sure)
                GUI.App.closeAllWindows();
        }

        /**
        * Close the project
        */
        function closeProject() {
            IDE.closeProject(IDE.project);
        }

        /**
        * Run the project
        */
        function runProject() {
            var main = IDE.project.config.main;
            if (!main) {
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
            // win2.reloadIgnoringCache()
        }
        ;

        /**
        * Run the project
        */
        function showDependency() {
            IDE.project.iSense.getDependencyGraph(function (err, data) {
                data.forEach(function (entry) {
                    var refs = entry.ref;
                    var d = PATH.dirname(entry.src);
                    for (var i = 0; i < refs.length; i++) {
                        refs[i] = OS.File.switchToForwardSlashes(PATH.join(d, refs[i]));
                    }
                    ;
                });

                window["dependencies"] = data;
                var startPage = "uml.html";
                console.log("Opening file: " + startPage);
                var win2 = window.open(startPage, "dependencies", "status=1,resizable=1,menubar=1,location=1,toolbar=1,titlebar=1,scrollbars=1");
                win2["dependencies"] = data;
            });
            // win2.reloadIgnoringCache()
        }
        ;

        /**
        * Compile all the sources without saving them
        */
        function validateProject() {
            var project = IDE.project;
            IDE.compilationResult.innerHTML = "";

            project.iSense.compile(function (err, data) {
                Cats.View.showCompilationResults(data);
            });
        }

        function show(text) {
            if (!text)
                return;
            IDE.console.innerText += text;
            IDE.console.scrollTop = IDE.console.scrollHeight; // Scroll to bottom
        }

        /**
        * Build the project
        */
        function buildProject() {
            // this.defaultOutput = window.prompt("Output file",this.defaultOutput);
            var project = IDE.project;
            if (project.config.customBuild) {
                IDE.busy(true);
                IDE.resultbar.selectOption(2);
                var cmd = project.config.customBuild.command;
                var options = project.config.customBuild.options || {};

                if (!options.cwd) {
                    options.cwd = IDE.project.projectDir;
                }

                var exec = require('child_process').exec;

                var child = exec(cmd, options, function (error, stdout, stderr) {
                    IDE.busy(false);
                    show(stdout);
                    show(stderr);
                    if (error !== null) {
                        show('exec error: ' + error);
                    }
                });
            } else {
                IDE.compilationResult.innerHTML = "";
                project.iSense.compile(function (err, data) {
                    Cats.View.showCompilationResults(data);
                    if (data.errors && (data.errors.length > 0))
                        return;
                    var sources = data.source;
                    sources.forEach(function (source) {
                        console.log(source.fileName);
                        OS.File.writeTextFile(source.fileName, source.content);
                    });
                });
            }
        }

        /**
        * Configure the properties of a project
        */
        function propertiesProject() {
            var project = IDE.project;
            var name = Cats.ConfigLoader.getFileName(project.projectDir);
            if (IDE.getSession(name)) {
                IDE.openSession(name);
            } else {
                var content = JSON.stringify(project.config, null, 4);
                var session = new Cats.AceSession(name, content);
                IDE.addSession(session);
                IDE.openSession(name);
            }
        }

        /**
        * Refresh the project so everything is in sync again.
        */
        function refreshProject() {
            IDE.project.refresh();
        }

        /**
        * Open a (new) project in a separate window
        */
        function openProject() {
            var chooser = document.getElementById('fileDialog');
            chooser.onchange = function (evt) {
                console.log(this.value);
                var param = encodeURIComponent(this.value);
                this.value = ""; // Make sure the change event goes off next tome

                /*
                var gui = require('nw.gui');
                gui.Window.open(
                'index.html?project=' + param,
                {"new-instance":true}
                );
                */
                window.open('index.html?project=' + param, '_blank');
            };
            chooser.click();
        }
        ;

        var ProjectCommands = (function () {
            function ProjectCommands() {
            }
            ProjectCommands.init = function (registry) {
                registry({ name: 32 /* project_open */, label: "Open Project...", command: openProject, icon: "open.png" });
                registry({ name: 33 /* project_close */, label: "Close project", command: closeProject });
                registry({ name: 34 /* project_build */, label: "Build Project", command: buildProject, icon: "build.png" });
                registry({ name: 35 /* project_validate */, label: "Validate Project", command: validateProject });
                registry({ name: 38 /* project_refresh */, label: "Refresh Project", command: refreshProject, icon: "refresh.png" });
                registry({ name: 36 /* project_run */, label: "Run Project", command: runProject, icon: "run.png" });

                // registry({ name: CMDS.project_debug, label: "Debug Project", command: null, icon: "debug.png" });
                registry({ name: 39 /* project_properties */, label: "Properties", command: propertiesProject });
                registry({ name: 40 /* project_dependencies */, label: "Show Dependencies", command: showDependency });
            };
            return ProjectCommands;
        })();
        Commands.ProjectCommands = ProjectCommands;
    })(Cats.Commands || (Cats.Commands = {}));
    var Commands = Cats.Commands;
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
var Cats;
(function (Cats) {
    (function (Commands) {
        var Range = ace.require("ace/range").Range;

        function refactor(rows, name, i) {
            if (typeof i === "undefined") { i = 0; }
            if (i >= rows.length)
                return;
            var data = rows[i];
            IDE.openSession(data.fileName, null, function (session) {
                var r = data.range;
                var range = new Range(r.start.row, r.start.column, r.end.row, r.end.column);
                session.editSession.replace(range, name);
                refactor(rows, name, ++i);
            });
        }

        function rename() {
            var table = document.querySelector("#searchresults table");
            if (!table) {
                alert("Cannot rename if there are no search results available");
                return;
            }
            var grid = Cats.UI.Grid.getGridFromElement(table);
            var rows = grid.getRows();
            var msg = "Going to rename " + rows.length + " instances.\nPlease enter new name";
            var newName = prompt(msg);
            if (!newName)
                return;
            refactor(rows, newName);
        }

        var RefactorCommands = (function () {
            function RefactorCommands() {
            }
            RefactorCommands.init = function (registry) {
                registry({ name: 46 /* refactor_rename */, label: "Rename", command: rename });
            };
            return RefactorCommands;
        })();
        Commands.RefactorCommands = RefactorCommands;
    })(Cats.Commands || (Cats.Commands = {}));
    var Commands = Cats.Commands;
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
/*
var formatting_options = {
public IndentSize: number;
public TabSize: number;
public NewLineCharacter: string;
public ConvertTabsToSpaces: bool;
public InsertSpaceAfterCommaDelimiter: bool;
public InsertSpaceAfterSemicolonInForStatements: bool;
public InsertSpaceBeforeAndAfterBinaryOperators: bool;
public InsertSpaceAfterKeywordsInControlFlowStatements: bool;
public InsertSpaceAfterFunctionKeywordForAnonymousFunctions: bool;
public InsertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesis: bool;
public PlaceOpenBraceOnNewLineForFunctions: bool;
public PlaceOpenBraceOnNewLineForControlBlocks: bool;
}
*/
var Cats;
(function (Cats) {
    /**
    *  Loads the configuration for a project. If no configuration file is found, it
    *  returns sensible defaults that will be used instead.
    */
    var ConfigLoader = (function () {
        function ConfigLoader() {
        }
        /**
        * Get the name of the configuation file
        */
        ConfigLoader.getFileName = function (projectRoot) {
            return PATH.join(projectRoot, ".settings", "config.json");
        };

        /**
        * Load the configuration for a certain project
        */
        ConfigLoader.load = function (projectRoot) {
            var fileName = ConfigLoader.getFileName(projectRoot);
            try  {
                var content = OS.File.readTextFile(fileName);
                return JSON.parse(content);
            } catch (err) {
                console.log("Couldn't find project configuration, loading defaults");
                return ConfigLoader.loadDefault();
            }
        };

        /**
        * Load the default configuration for a project
        */
        ConfigLoader.loadDefault = function () {
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
                rememberOpenFiles: false,
                editor: {
                    newLineMode: "unix",
                    useSoftTabs: true,
                    tabSize: 4
                },
                completionMode: "strict"
            };
            return result;
        };
        return ConfigLoader;
    })();
    Cats.ConfigLoader = ConfigLoader;
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
var Cats;
(function (Cats) {
    /**
    * The TextEditor class that wraps the Ace editor
    * and provides a set common methods. There is only
    * one TextEditor instance per window.
    */
    var TextEditor = (function () {
        function TextEditor(rootElement) {
            this.rootElement = rootElement;
            this.aceEditor = this.createAceEditor();
            this.hide();
            this.init();
        }
        TextEditor.prototype.init = function () {
            this.toolTip = new Cats.UI.ToolTip();
            this.autoCompleteView = new Cats.UI.AutoCompleteView(this.aceEditor);
            this.editorContextMenu = new Cats.Menu.EditorContextMenu(this);
            this.editorContextMenu.bindTo(this.rootElement);
        };

        TextEditor.prototype.edit = function (session, pos) {
            if (IDE.activeSession === session) {
                if (pos) {
                    this.moveCursorTo(pos);
                }
                return;
            }

            IDE.activeSession = session;

            this.aceEditor.setSession(session.editSession);
            if (session.mode === "binary") {
                this.aceEditor.setReadOnly(true);
            } else {
                this.aceEditor.setReadOnly(false);
            }

            if (pos) {
                this.moveCursorTo(pos);
            }
            this.show();
            this.aceEditor.focus();
            session.showErrors();
            if (IDE.tabbar)
                IDE.tabbar.refresh();
            this.editMode = PATH.basename(session.mode);
        };

        /**
        * Move cursor to a certain position
        */
        TextEditor.prototype.moveCursorTo = function (pos) {
            if (typeof pos === "undefined") { pos = { column: 0, row: 0 }; }
            this.aceEditor.moveCursorToPosition(pos);
            this.aceEditor.clearSelection();
            this.aceEditor.centerSelection();
        };

        /**
        * Show the editor
        */
        TextEditor.prototype.show = function () {
            this.rootElement.style.display = "block";
            this.aceEditor.focus();
        };

        /**
        * Hide the edit        or
        */
        TextEditor.prototype.hide = function () {
            this.rootElement.style.display = "none";
        };

        /**
        * Set the theme of the editor
        */
        TextEditor.prototype.setTheme = function (theme) {
            this.aceEditor.setTheme("ace/theme/" + theme);
        };

        /**
        * Add a command to the editor
        */
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
            var aceSession = IDE.activeSession;
            if (aceSession.mode === "typescript") {
                var cursor = this.aceEditor.getCursorPosition();
                aceSession.autoComplete(cursor, this.autoCompleteView);
            }
        };

        TextEditor.prototype.onMouseMove = function (ev) {
            this.toolTip.hide();
            clearTimeout(this.mouseMoveTimer);
            var elem = ev.srcElement;
            if (elem.className !== "ace_content")
                return;
            var session = IDE.activeSession;
            this.mouseMoveTimer = setTimeout(function () {
                session.showInfoAt(ev);
            }, 800);
        };

        // Initialize the editor
        TextEditor.prototype.createAceEditor = function () {
            var _this = this;
            var editor = ace.edit(this.rootElement);

            editor.commands.addCommands([
                {
                    name: "autoComplete",
                    bindKey: {
                        win: "Ctrl-Space",
                        mac: "Ctrl-Space"
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
                        Cats.Commands.runCommand(45 /* navigate_declaration */);
                    }
                },
                {
                    name: "save",
                    bindKey: {
                        win: "Ctrl-S",
                        mac: "Command-S"
                    },
                    exec: function () {
                        Cats.Commands.runCommand(9 /* file_save */);
                    }
                }
            ]);

            var originalTextInput = editor.onTextInput;
            editor.onTextInput = function (text) {
                originalTextInput.call(editor, text);
                if (text === ".")
                    _this.autoComplete();
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
    })();
    Cats.TextEditor = TextEditor;
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
var Cats;
(function (Cats) {
    /**
    * Load the TSWorker and handles the communication with the ISense web worker
    * This implementation uses a JSON-RPC style message format for the communication.
    */
    var ISenseHandler = (function () {
        function ISenseHandler() {
            this.messageId = 0;
            this.registry = {};
            // Create a new webworker
            this.worker = new Worker("../lib/tsworker.js");
            this.init();
        }
        ISenseHandler.prototype.getErrors = function (fileName, cb) {
            this.perform("getErrors", fileName, cb);
        };

        ISenseHandler.prototype.compile = function (cb) {
            this.perform("compile", cb);
        };

        ISenseHandler.prototype.getTypeAtPosition = function (name, docPos, cb) {
            this.perform("getTypeAtPosition", name, docPos, cb);
        };

        ISenseHandler.prototype.getCompletions = function (fileName, cursor, cb) {
            this.perform("getCompletions", fileName, cursor, cb);
        };

        ISenseHandler.prototype.getDependencyGraph = function (cb) {
            this.perform("getDependencyGraph", cb);
        };

        ISenseHandler.prototype.setCompilationSettings = function (settings) {
            this.perform("setCompilationSettings", settings, null);
        };

        ISenseHandler.prototype.addScript = function (fileName, content) {
            this.perform("addScript", fileName, content, null);
        };

        ISenseHandler.prototype.updateScript = function (fileName, content) {
            this.perform("updateScript", fileName, content, null);
        };

        ISenseHandler.prototype.autoComplete = function (cursor, name, cb) {
            this.perform("autoComplete", cursor, name, cb);
        };

        ISenseHandler.prototype.initialize = function () {
            this.perform("initialize", null);
        };

        /**
        * Invoke a method on the worker using JSON-RPC message structure
        */
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
            if (handler) {
                IDE.busy(true);
                this.registry[this.messageId] = handler;
            }
        };

        /**
        * Clear any pending handlers
        */
        ISenseHandler.prototype.clear = function () {
            this.registry = {};
        };

        /**
        * Setup the message communication with the worker
        */
        ISenseHandler.prototype.init = function () {
            var _this = this;
            // Setup the message handler
            this.worker.onmessage = function (e) {
                var msg = e.data;

                // console.log("Received message " + JSON.stringify(msg) + " from worker");
                // console.log("Received message reply " + msg.id + " from worker.");
                if (msg.error) {
                    console.error("Got error back !!! ");
                    console.error(msg.error.stack);
                }

                // @TODO handle exceptions better and call callback
                var id = msg.id;
                if (id) {
                    IDE.busy(false);
                    var handler = _this.registry[id];
                    if (handler) {
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
    (function (Menu) {
        /**
        * Context menu for the main editor
        */
        var EditorContextMenu = (function () {
            function EditorContextMenu(editor) {
                this.editor = editor;
                this.initialized = false;
            }
            EditorContextMenu.prototype.init = function () {
                // Create a new menu
                this.ctxmenu = new GUI.Menu();
                var getCmd = Cats.Commands.getMenuCommand;
                var CMDS = Cats.Commands.CMDS;

                // Add the items
                this.ctxmenu.append(getCmd(45 /* navigate_declaration */));
                this.ctxmenu.append(getCmd(42 /* navigate_references */));
                this.ctxmenu.append(getCmd(43 /* navigate_occurences */));
                this.ctxmenu.append(getCmd(44 /* navigate_implementors */));
            };

            /**
            * Bind this context menu to an HTML element
            */
            EditorContextMenu.prototype.bindTo = function (elem) {
                var _this = this;
                elem.oncontextmenu = function (ev) {
                    if (!_this.initialized)
                        _this.init();
                    ev.preventDefault();
                    if (IDE.activeSession.mode === "typescript") {
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
    (function (Menu) {
        function createFileContextMenu() {
            // Create an empty menu
            var ctxmenu = new GUI.Menu();

            // Add some items
            ctxmenu.append(new GUI.MenuItem({ label: 'Refresh', click: refresh }));
            ctxmenu.append(new GUI.MenuItem({ label: 'Rename', click: rename }));
            ctxmenu.append(new GUI.MenuItem({ label: 'New file', click: newFile }));
            ctxmenu.append(new GUI.MenuItem({ label: 'New folder', click: newFolder }));
            ctxmenu.append(new GUI.MenuItem({ label: 'Delete', click: deleteFile }));
            return ctxmenu;
        }

        function refresh() {
            IDE.project.getTreeView().refresh();
        }

        function deleteFile() {
            var basename = PATH.basename(data.key);
            var sure = confirm("Delete " + basename + "?");
            if (sure) {
                OS.File.remove(data.key);
            }
            setTimeout(function () {
                refresh(), 100;
            });
        }

        function newFile() {
            var basedir;

            if (data.isFolder) {
                basedir = data.key;
            } else {
                basedir = PATH.dirname(data.key);
            }

            var name = prompt("Enter new file name ");
            if (name == null)
                return;
            var fullName = PATH.join(basedir, name);
            OS.File.writeTextFile(fullName, "");
        }

        function newFolder() {
            var basedir;

            if (data.isFolder) {
                basedir = data.key;
            } else {
                basedir = PATH.dirname(data.key);
            }

            var name = prompt("Vnesi novo ime mape ");
            if (name == null)
                return;
            var fullName = PATH.join(basedir, name);
            OS.File.mkdirRecursiveSync(fullName);
            refresh();
        }

        function rename() {
            var dirname = PATH.dirname(data.key);
            var basename = PATH.basename(data.key);
            var name = prompt("Enter new name", basename);
            if (name == null)
                return;
            var c = confirm("Going to rename " + basename + " to " + name);
            if (c) {
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
                if (d && d.path) {
                    data.key = d.path;
                    data.isFolder = d.isFolder;
                    data.element = ev.srcElement;

                    // console.log(data.key);
                    ev.preventDefault();
                    fileContextMenu.popup(ev.x, ev.y);
                }
                return false;
            });
        }
        Menu.initFileContextMenu = initFileContextMenu;
    })(Cats.Menu || (Cats.Menu = {}));
    var Menu = Cats.Menu;
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
var Cats;
(function (Cats) {
    (function (Menu) {
        /**
        * This class creates the main menubar.
        */
        var Menubar = (function () {
            function Menubar() {
                this.fontSizes = [8, 10, 12, 13, 14, 16, 18, 20, 24];
                this.themes = [
                    { theme: "cats", label: "CATS" },
                    { theme: "chrome", label: "Chrome" },
                    { theme: "clouds", label: "Clouds" },
                    { theme: "crimson_editor", label: "Crimson Editor" },
                    { theme: "dawn", label: "Dawn" },
                    { theme: "dreamweaver", label: "Dreamweaver" },
                    { theme: "eclipse", label: "Eclipse" },
                    { theme: "github", label: "GitHub" },
                    { theme: "solarized_light", label: "Solarized Light" },
                    { theme: "textmate", label: "TextMate" },
                    { theme: "tomorrow", label: "Tomorrow" },
                    { theme: "xcode", label: "XCode" },
                    { theme: null, label: "seperator dark themes" },
                    { theme: "ambiance", label: "Ambiance" },
                    { theme: "clouds_midnight", label: "Clouds Midnight" },
                    { theme: "cobalt", label: "Cobalt" },
                    { theme: "idle_fingers", label: "idleFingers" },
                    { theme: "kr_theme", label: "krTheme" },
                    { theme: "merbivore", label: "Merbivore" },
                    { theme: "merbivore_soft", label: "Merbivore Soft" },
                    { theme: "mono_industrial", label: "Mono Industrial" },
                    { theme: "monokai", label: "Monokai" },
                    { theme: "pastel_on_dark", label: "Pastel on dark" },
                    { theme: "solarized_dark", label: "Solarized Dark" },
                    { theme: "twilight", label: "Twilight" },
                    { theme: "tomorrow_night", label: "Tomorrow Night" },
                    { theme: "tomorrow_night_blue", label: "Tomorrow Night Blue" },
                    { theme: "tomorrow_night_bright", label: "Tomorrow Night Bright" },
                    { theme: "tomorrow_night_eighties", label: "Tomorrow Night 80s" },
                    { theme: "vibrant_ink", label: "Vibrant Ink" }
                ];
                var menubar = new GUI.Menu({ type: 'menubar' });
                var getCmd = Cats.Commands.getMenuCommand;
                var CMDS = Cats.Commands.CMDS;

                var file = new GUI.Menu();
                file.append(getCmd(4 /* file_new */));
                file.append(new GUI.MenuItem({ type: "separator" }));
                file.append(getCmd(9 /* file_save */));
                file.append(getCmd(10 /* file_saveAs */));
                file.append(getCmd(11 /* file_saveAll */));
                file.append(new GUI.MenuItem({ type: "separator" }));
                file.append(getCmd(6 /* file_close */));
                file.append(getCmd(8 /* file_closeAll */));
                file.append(getCmd(7 /* file_closeOther */));
                file.append(new GUI.MenuItem({ type: "separator" }));
                file.append(getCmd(47 /* ide_quit */));

                var edit = new GUI.Menu();

                // edit.append(this.editorCommand("undo"));
                edit.append(getCmd(12 /* edit_undo */));
                edit.append(getCmd(13 /* edit_redo */));

                /*edit.append(new GUI.MenuItem({ type: "separator" }));
                edit.append(getCmd(CMDS.edit_cut));
                edit.append(getCmd(CMDS.edit_copy));
                edit.append(getCmd(CMDS.edit_paste));*/
                edit.append(new GUI.MenuItem({ type: "separator" }));
                edit.append(getCmd(17 /* edit_find */));
                edit.append(getCmd(18 /* edit_findNext */));
                edit.append(getCmd(19 /* edit_findPrev */));
                edit.append(getCmd(20 /* edit_replace */));
                edit.append(getCmd(21 /* edit_replaceAll */));

                edit.append(new GUI.MenuItem({ type: "separator" }));
                edit.append(getCmd(22 /* edit_toggleInvisibles */));
                edit.append(getCmd(23 /* edit_toggleRecording */));
                edit.append(getCmd(24 /* edit_replayMacro */));

                var source = new GUI.Menu();
                source.append(getCmd(25 /* edit_toggleComment */));
                source.append(getCmd(26 /* edit_indent */));
                source.append(getCmd(27 /* edit_outdent */));
                source.append(getCmd(28 /* source_format */));

                var refactor = new GUI.Menu();
                refactor.append(getCmd(46 /* refactor_rename */));

                var navigate = new GUI.Menu();
                navigate.append(getCmd(41 /* navigate_gotoLine */));
                navigate.append(getCmd(45 /* navigate_declaration */));
                navigate.append(getCmd(42 /* navigate_references */));
                navigate.append(getCmd(43 /* navigate_occurences */));
                navigate.append(getCmd(44 /* navigate_implementors */));

                var proj = new GUI.Menu();
                proj.append(getCmd(32 /* project_open */));
                proj.append(getCmd(33 /* project_close */));
                proj.append(new GUI.MenuItem({ type: "separator" }));
                proj.append(getCmd(34 /* project_build */));
                proj.append(getCmd(35 /* project_validate */));

                var buildOnSaveItem = new GUI.MenuItem({ label: 'Build on Save', checked: false, type: "checkbox" });
                proj.append(buildOnSaveItem);
                buildOnSaveItem.click = function () {
                    console.log("Clicked: " + buildOnSaveItem.checked);
                    IDE.project.config.buildOnSave = buildOnSaveItem.checked;
                };
                proj.append(getCmd(38 /* project_refresh */));
                proj.append(getCmd(39 /* project_properties */));
                proj.append(getCmd(40 /* project_dependencies */));

                var run = new GUI.Menu();
                run.append(getCmd(36 /* project_run */));

                // run.append(getCmd(CMDS.project_debug));
                var window = new GUI.Menu();
                window.append(new GUI.MenuItem({ label: 'Theme', submenu: this.createThemeMenu() }));
                window.append(new GUI.MenuItem({ label: 'Font Size', submenu: this.createFontSizeMenu() }));
                window.append(new GUI.MenuItem({ label: 'Right Margin', submenu: this.createMarginMenu() }));
                window.append(new GUI.MenuItem({ label: 'Views', submenu: this.createViewMenu() }));

                var help = new GUI.Menu();
                help.append(getCmd(1 /* help_shortcuts */));
                help.append(getCmd(2 /* help_processInfo */));
                help.append(getCmd(0 /* help_devTools */));
                help.append(getCmd(3 /* help_about */));

                menubar.append(new GUI.MenuItem({ label: 'File', submenu: file }));
                menubar.append(new GUI.MenuItem({ label: 'Edit', submenu: edit }));
                menubar.append(new GUI.MenuItem({ label: 'Source', submenu: source }));
                menubar.append(new GUI.MenuItem({ label: 'Refactor', submenu: refactor }));
                menubar.append(new GUI.MenuItem({ label: 'Navigate', submenu: navigate }));
                menubar.append(new GUI.MenuItem({ label: 'Project', submenu: proj }));
                menubar.append(new GUI.MenuItem({ label: 'Run', submenu: run }));
                menubar.append(new GUI.MenuItem({ label: 'Window', submenu: window }));
                menubar.append(new GUI.MenuItem({ label: 'Help', submenu: help }));

                var win = GUI.Window.get();
                win.menu = menubar;
            }
            Menubar.prototype.createFontSizeMenu = function () {
                var getCmd = Cats.Commands.getMenuCommand;
                var CMDS = Cats.Commands.CMDS;
                var menu = new GUI.Menu();
                this.fontSizes.forEach(function (size) {
                    var item = getCmd(49 /* ide_fontSize */, size + "px", size);
                    menu.append(item);
                });
                return menu;
            };

            Menubar.prototype.createMarginMenu = function () {
                var getCmd = Cats.Commands.getMenuCommand;
                var CMDS = Cats.Commands.CMDS;
                var menu = new GUI.Menu();
                [80, 100, 120, 140, 160, 180, 200].forEach(function (margin) {
                    var item = getCmd(50 /* ide_rightMargin */, margin.toString(), margin);
                    menu.append(item);
                });
                return menu;
            };

            Menubar.prototype.createViewMenu = function () {
                var getCmd = Cats.Commands.getMenuCommand;
                var CMDS = Cats.Commands.CMDS;
                var menu = new GUI.Menu();
                var views = [
                    { id: "north", name: "Toolbar" },
                    { id: "south", name: "Statusbar" }
                ];
                views.forEach(function (view) {
                    var item = getCmd(51 /* ide_toggleView */, view.name, view.id);
                    menu.append(item);
                });
                return menu;
            };

            Menubar.prototype.createThemeMenu = function () {
                var getCmd = Cats.Commands.getMenuCommand;
                var CMDS = Cats.Commands.CMDS;
                var menu = new GUI.Menu();
                this.themes.forEach(function (theme) {
                    if (theme.theme) {
                        var item = getCmd(48 /* ide_theme */, theme.label, theme.theme);
                        menu.append(item);
                    } else {
                        menu.append(new GUI.MenuItem({
                            type: "separator"
                        }));
                    }
                });
                return menu;
            };
            return Menubar;
        })();

        function createMenuBar() {
            var m = new Menubar();
        }
        Menu.createMenuBar = createMenuBar;
    })(Cats.Menu || (Cats.Menu = {}));
    var Menu = Cats.Menu;
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
var Cats;
(function (Cats) {
    (function (Menu) {
        function getContextSession() {
            return contextElement._value || IDE.activeSession;
        }

        function closeContextTab() {
            var session = getContextSession();

            if (session)
                IDE.closeSession(session);
        }

        function closeOtherTabs() {
            var contextSession = getContextSession();

            IDE.sessions.forEach(function (session) {
                if (session !== contextSession)
                    IDE.closeSession(session);
            });
        }

        function closeAllTabs() {
            IDE.sessions.forEach(function (session) {
                IDE.closeSession(session);
            });
        }

        function closeRightTabs() {
            var contextSession = getContextSession();
            var found = false;

            IDE.sessions.forEach(function (session) {
                if (found)
                    IDE.closeSession(session);

                found = found || session === contextSession;
            });
        }

        function closeLeftTabs() {
            var contextSession = getContextSession();
            var found = false;

            IDE.sessions.forEach(function (session) {
                found = found || session === contextSession;

                if (!found)
                    IDE.closeSession(session);
            });
        }

        function closeActiveTab() {
            IDE.closeSession(IDE.activeSession);
        }

        var TabContextMenu = (function () {
            function TabContextMenu() {
                // Create a new menu
                this.ctxmenu = new GUI.Menu();

                // Add the items
                this.ctxmenu.append(new GUI.MenuItem({
                    label: "Close",
                    click: closeContextTab
                }));

                this.ctxmenu.append(new GUI.MenuItem({
                    label: "Close Others",
                    click: closeOtherTabs
                }));

                this.ctxmenu.append(new GUI.MenuItem({
                    label: "Close All",
                    click: closeAllTabs
                }));

                this.ctxmenu.append(new GUI.MenuItem({
                    label: "Close Right",
                    click: closeRightTabs
                }));

                this.ctxmenu.append(new GUI.MenuItem({
                    label: "Close Left",
                    click: closeLeftTabs
                }));

                this.ctxmenu.append(new GUI.MenuItem({
                    label: "Close Active",
                    click: closeActiveTab
                }));
            }
            // Bind this context menu to an HTML element
            TabContextMenu.prototype.popup = function (x, y) {
                this.ctxmenu.popup(x, y);
            };
            return TabContextMenu;
        })();
        Menu.TabContextMenu = TabContextMenu;

        var contextElement;

        function initTabContextMenu() {
            var contextMenu = new TabContextMenu();

            IDE.sessionBar.addEventListener('contextmenu', function (ev) {
                /*
                var d = UI.TreeView.getValueFromElement(ev.srcElement);
                data.key = d.path;
                data.isFolder = d.isFolder;
                data.element = ev.srcElement;
                */
                // console.log(data.key);
                ev.preventDefault();
                contextElement = ev.srcElement;
                contextMenu.popup(ev.x, ev.y);
                return false;
            });
        }
        Menu.initTabContextMenu = initTabContextMenu;
    })(Cats.Menu || (Cats.Menu = {}));
    var Menu = Cats.Menu;
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
var Cats;
(function (Cats) {
    var ProjectWatcher = (function (_super) {
        __extends(ProjectWatcher, _super);
        function ProjectWatcher(path) {
            _super.call(this);
            this.path = path;
            this.setDirectory(path);
        }
        ProjectWatcher.prototype.setTreeView = function (view) {
            this._treeView = view;
        };

        ProjectWatcher.prototype.onFileCreate = function (path) {
            if (this._treeView != null) {
                this._treeView.refresh();
            }
        };
        ProjectWatcher.prototype.onFileDelete = function (path) {
            if (this._treeView != null) {
                this._treeView.refresh();
            }
        };
        ProjectWatcher.prototype.onDirectoryCreate = function (path) {
            if (this._treeView != null) {
                this._treeView.refresh();
            }
        };
        ProjectWatcher.prototype.onDirectoryDelete = function (path) {
            if (this._treeView != null) {
                this._treeView.refresh();
            }
        };
        ProjectWatcher.prototype.onFileChange = function (filepath) {
            var session = IDE.getSession(filepath);
            if (session) {
                if (confirm('File ' + filepath + ' modifed out of the editor, reload it ?')) {
                    IDE.getSession(filepath).setValue(OS.File.readTextFile(filepath));
                    session.changed = false;
                } else {
                    session.changed = true;
                }
            }
        };
        ProjectWatcher.prototype.onError = function (error) {
            console.log('Watcher error');
            console.log(error);
        };
        return ProjectWatcher;
    })(Cats.TreeWatcher);

    var Project = (function () {
        /**
        * Set the project to a new directory and make sure
        * we remove old artifacts.
        */
        function Project(projectDir) {
            this.tsFiles = [];
            IDE.project = this;
            this.projectDir = PATH.resolve(projectDir);
            this.watcher = new ProjectWatcher(this.projectDir);
            this.refresh();
        }
        Project.prototype.setTreeView = function (view) {
            this._treeView = view;
            this.watcher.setTreeView(view);
        };
        Project.prototype.getTreeView = function () {
            return this._treeView;
        };
        Project.prototype.getWatcher = function () {
            return this.watcher;
        };

        /**
        * Close the project
        */
        Project.prototype.close = function () {
            var gui = require('nw.gui');
            var win = gui.Window.get();
            win.close();
        };

        /**
        *  Refreshes the project and loads required artifacts
        *  again from the filesystem to be fully in sync
        */
        Project.prototype.refresh = function () {
            var _this = this;
            this.tsFiles = [];
            this.config = Cats.ConfigLoader.load(this.projectDir);
            this.name = this.config.name || PATH.basename(this.projectDir);
            document.title = "CATS | " + this.name;

            // this.initJSSense();
            this.iSense = new Cats.ISenseHandler();

            if (this.config.compiler.outputOption) {
                this.config.compiler.outputOption = PATH.join(this.projectDir, this.config.compiler.outputOption);
                console.log("Compiler output: " + this.config.compiler.outputOption);
            }

            this.iSense.setCompilationSettings(this.config.compiler);

            if (this.config.compiler.useDefaultLib) {
                var fullName = PATH.join(process.cwd(), "typings/lib.d.ts");
                var libdts = OS.File.readTextFile(fullName);
                this.iSense.addScript(fullName, libdts);
            }

            var srcPaths = [].concat(this.config.sourcePath);
            srcPaths.forEach(function (srcPath) {
                var fullPath = PATH.join(_this.projectDir, srcPath || '');
                _this.loadTypeScriptFiles(fullPath);
                // this.initTSWorker(); @TODO still needed ?
            });
        };

        /**
        * Get the URl for running the project
        */
        Project.prototype.getStartURL = function () {
            var url = PATH.join(this.projectDir, this.config.main);
            return "file://" + url;
        };

        /**
        * @BUG Somehow TS LanguageServices are not ready by default.
        * This triggers it to be ready
        */
        Project.prototype.initTSWorker = function () {
            if (this.tsFiles.length > 0) {
                this.iSense.initialize();
            }
        };

        /**
        * Load all the script that are part of the project into the tsworker
        * For now use a synchronous call to load.
        * @param directory The source directory where to start the scan
        */
        Project.prototype.loadTypeScriptFiles = function (directory) {
            var _this = this;
            OS.File.readDir2(directory, function (files) {
                files.forEach(function (file) {
                    try  {
                        var fullName = file.fullName;
                        if (file.isFile) {
                            console.log("FullName: " + fullName);
                            var ext = PATH.extname(fullName);
                            if (ext === ".ts") {
                                OS.File.readTextFile2(fullName, function (content) {
                                    _this.iSense.addScript(fullName, content);
                                    _this.tsFiles.push(fullName);
                                    console.log("Found TypeScript file: " + fullName);
                                });
                            }
                        }
                        if (file.isDirectory) {
                            _this.loadTypeScriptFiles(fullName);
                        }
                    } catch (err) {
                        console.log("Got error while handling file " + fullName);
                        console.error(err);
                    }
                });
            });
        };
        return Project;
    })();
    Cats.Project = Project;
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
var Cats;
(function (Cats) {
    (function (UI) {
        var HashHandler = ace.require('ace/keyboard/hash_handler').HashHandler;

        /**
        * This class takes care of the autocomplete popup and deals with
        * the key events and filtering of the results while you are typing
        */
        var AutoCompleteView = (function () {
            function AutoCompleteView(editor) {
                this.editor = editor;
                this.handler = new HashHandler();
                // Other tasks can check wether autocompletion is in progress
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
            AutoCompleteView.prototype.init = function () {
                this.wrap = document.createElement('div');
                this.listElement = document.createElement('ul');
                this.wrap.className = AutoCompleteView.className;
                this.wrap.appendChild(this.listElement);
            };

            /**
            * Get the text between cursor and start
            */
            AutoCompleteView.prototype.getInputText = function () {
                var cursor = this.editor.getCursorPosition();
                var text = this.editor.session.getLine(cursor.row).slice(0, cursor.column);

                // console.log("input text:" + text);
                var matches = text.match(/[a-zA-Z_0-9\$]*$/);
                if (matches && matches[0])
                    return matches[0];
                else
                    return "";
            };

            // ALternative immplementation to get the text between cursor and start
            AutoCompleteView.prototype.getInputText2 = function () {
                var pos = this.editor.getCursorPosition();
                var result = this.editor.getSession().getTokenAt(pos.row, pos.column);
                if (result && result.value)
                    return result.value.trim();
                else
                    return "";
            };

            /**
            * Only match when exactly same string from first position
            */
            AutoCompleteView.prototype.strictComparison = function (a, b) {
                return (a.indexOf(b) === 0);
            };

            /**
            * Match any string within other string, case insensitive
            */
            AutoCompleteView.prototype.looseComparison = function (a, b) {
                return (a.toLowerCase().indexOf(b.toLowerCase()) >= 0);
            };

            /**
            * Fitler the available completetions based on the users input
            * so far.
            */
            AutoCompleteView.prototype.filter = function () {
                var _this = this;
                var text = this.getInputText();
                if (!text) {
                    this.filteredCompletions = this.completions;
                } else {
                    var mode = "strictComparison";
                    if (IDE.project.config.completionMode) {
                        mode = IDE.project.config.completionMode + "Comparison";
                    }

                    this.filteredCompletions = this.completions.filter(function (entry) {
                        return _this[mode](entry.name, text);
                    });
                }
            };

            /**
            * Fitler the available completetions based on the users input
            * so far. This one is case insensitive a find any matching string
            */
            AutoCompleteView.prototype.filter2 = function () {
                var text = this.getInputText();
                if (!text) {
                    this.filteredCompletions = this.completions;
                } else {
                    text = text.toLowerCase();
                    this.filteredCompletions = this.completions.filter(function (entry) {
                        return (entry.name.toLowerCase().indexOf(text) > -1);
                    });
                }
            };

            /**
            * Setup the different keybindings that would go to the
            * popup window and not the editor
            */
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
                    if (current) {
                        var inputText = _this.getInputText();
                        for (var i = 0; i < inputText.length; i++) {
                            _this.editor.remove("left");
                        }
                        var span = current.firstChild;
                        _this.editor.insert(span.innerText);
                    }
                    _this.hide();
                });
                // this.handler.bindKeys(AutoCompleteView.KeyBinding);
            };

            /**
            * Show the popup and make sure the keybinding is in place
            *
            */
            AutoCompleteView.prototype.show = function () {
                var _this = this;
                this.editor.keyBinding.addKeyboardHandler(this.handler);
                this.wrap.style.display = 'block';
                this.changeListener = function (ev) {
                    return _this.onChange(ev);
                };

                // this.editor.getSession().removeAllListeners('change');
                this.editor.getSession().on("change", this.changeListener);
                this.active = true;
            };

            /**
            * Hide the popup and remove all keybindings
            *
            */
            AutoCompleteView.prototype.hide = function () {
                this.editor.keyBinding.removeKeyboardHandler(this.handler);
                this.wrap.style.display = 'none';
                this.editor.getSession().removeListener('change', this.changeListener);

                // this.editor.getSession().removeAllListeners('change');
                this.active = false;
                // this.editor.getSession().on("change",CATS.onChangeHandler);
                // this.editor.getSession().removeAllListeners('change');
            };

            /**
            * Determines if the specified character may be part of a JS identifier
            */
            AutoCompleteView.isJsIdentifierPart = function (ch) {
                ch |= 0; //tell JIT that ch is an int
                return ch >= 97 && ch <= 122 || ch >= 65 && ch <= 90 || ch >= 48 && ch <= 57 || ch === 95 || ch === 36 || ch > 127;
            };

            /**
            * Check wether the typed character is reason to stop
            * the auto-complete task
            */
            AutoCompleteView.prototype.onChange = function (ev) {
                var _this = this;
                var key = ev.data.text;
                if (!AutoCompleteView.isJsIdentifierPart(key.charCodeAt(0))) {
                    this.hide();
                    return;
                }

                // hack to get the cursor updated before we render
                // TODO find out how to force update without a timer delay
                setTimeout(function () {
                    _this.render();
                }, 0);
            };

            /**
            * Render a single row
            */
            AutoCompleteView.prototype.renderRow = function () {
                var index = this.listElement.children.length;
                var info = this.filteredCompletions[index];
                var li = document.createElement("li");
                var span1 = document.createElement("span");
                span1.className = "name " + " icon-" + info.kind;
                span1.innerText = info.name;
                li.appendChild(span1);

                /*
                var span2 = document.createElement("span");
                span2.className = "type";
                span2.innerText = info.type;
                li.appendChild(span2);
                
                */
                this.listElement.appendChild(li);
            };

            /**
            * Are there any completions to show
            *
            */
            AutoCompleteView.prototype.hasCompletions = function () {
                return this.filteredCompletions.length > 0;
            };

            AutoCompleteView.prototype.render = function () {
                this.listElement.innerHTML = "";
                this.filter();
                this.offset = 0;
                this.index = 0;
                this.cursor = 0;

                if (this.hasCompletions()) {
                    var max = Math.min(this.filteredCompletions.length, 10);
                    for (var n = 0; n < max; n++)
                        this.renderRow();
                    this.highLite();
                }
            };

            AutoCompleteView.prototype.showCompletions = function (completions) {
                if (this.active || (completions.length === 0))
                    return;
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
                if (!this.hasCompletions())
                    return;
                var newCursor = this.cursor + offset;
                newCursor = Math.min(this.filteredCompletions.length - 1, newCursor);
                newCursor = Math.max(0, newCursor);

                while (newCursor >= this.listElement.children.length)
                    this.renderRow();

                var elem = this.current();
                if (elem)
                    elem.className = "";
                this.cursor = newCursor;
                this.scroll();
            };

            /**
            * Determine the location of the popup. Copied from the Ace playground
            * editor.
            * @TODO remove jQuery dependency
            */
            AutoCompleteView.prototype.setPosition = function (coords) {
                var bottom, editorBottom, top;
                top = coords.pageY + 20;
                editorBottom = $(this.editor.container).offset().top + $(this.editor.container).height();
                bottom = top + $(this.wrap).height();
                if (bottom < editorBottom) {
                    this.wrap.style.top = top + 'px';
                    return this.wrap.style.left = coords.pageX + 'px';
                } else {
                    this.wrap.style.top = (top - $(this.wrap).height() - 20) + 'px';
                    return this.wrap.style.left = coords.pageX + 'px';
                }
            };

            AutoCompleteView.prototype.current = function () {
                if (this.cursor >= 0)
                    return this.listElement.childNodes[this.cursor];
                else
                    return null;
            };

            AutoCompleteView.prototype.hideRow = function (index) {
                var elem = this.listElement.children[index];
                elem.style.display = "none";
            };

            AutoCompleteView.prototype.showRow = function (index) {
                var elem = this.listElement.children[index];
                elem.style.display = "block";
            };

            /**
            * Scroll the view by hiding the first row and showing the next
            * or the reverse.
            */
            AutoCompleteView.prototype.scroll = function () {
                while (this.cursor >= (this.offset + 10)) {
                    this.hideRow(this.offset);
                    this.showRow(this.offset + 10);
                    this.offset++;
                }

                while (this.cursor < this.offset) {
                    this.showRow(this.offset - 1);
                    this.hideRow(this.offset + 9);
                    this.offset--;
                }
                this.highLite();
            };
            AutoCompleteView.selectedClassName = 'autocomplete_selected';
            AutoCompleteView.className = 'autocomplete';
            return AutoCompleteView;
        })();
        UI.AutoCompleteView = AutoCompleteView;
    })(Cats.UI || (Cats.UI = {}));
    var UI = Cats.UI;
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
var Cats;
(function (Cats) {
    (function (UI) {
        var ElemTabAdapter = (function () {
            function ElemTabAdapter(tab, elems, selected) {
                var _this = this;
                this.tab = tab;
                this.elems = elems;
                tab.setOptions(this.convert(elems));
                if (selected)
                    this.onSelect(this.getTab(selected));
                tab.onselect = function (elem) {
                    return _this.onSelect(elem);
                };
            }
            ElemTabAdapter.prototype.setAspect = function (elem, name, value) {
                var tab = this.getTab(elem);
                if (tab)
                    tab[name] = value;
            };

            ElemTabAdapter.prototype.getTab = function (elem) {
                var options = this.tab.options;
                for (var i = 0; i < options.length; i++) {
                    if (options[i].elem === elem)
                        return options[i];
                }
                return null;
            };

            ElemTabAdapter.prototype.convert = function (elems) {
                var result = [];
                for (var i = 0; i < elems.length; i++) {
                    var elem = elems[i];
                    result.push({
                        name: elem.getAttribute("data-title") || elem.title || elem.id,
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
    (function (UI) {
        /***
        * Simple grid that shows an array of data in tabular format.
        */
        var Grid = (function () {
            function Grid() {
                this.aspects = {};
                this.defaultHandler = function (row, name) {
                    return row[name];
                };
                this.rootElement = document.createElement("table");
                this.rootElement["__grid"] = this;
            }
            Grid.getGridFromElement = function (elem) {
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

            Grid.prototype.setAspect = function (aspect, handler /*:AspectHandler BUG in TS */ ) {
                this.aspects[aspect] = handler;
            };

            Grid.prototype.getValue = function (row, columnName) {
                var fn = this.aspects[columnName] || this.defaultHandler;
                return fn(row, columnName);
            };

            // todo i18n
            Grid.prototype.getLabel = function (headerName) {
                return headerName;
            };

            Grid.prototype.appendTo = function (elem) {
                elem.appendChild(this.rootElement);
            };

            // TODO i18n
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
                    if (self.onselect) {
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
/**
* The MVC module implements as the name suggest the Model-View-Controller pattern.
* A slight twist is that the model is capable of observing interest and automaticcaly
* add a view to its list of observers.
*
* Also the notifications of oberservers in case of a change to the model is clustered
* in order to minimize the number of notifications.
*
* This makes it possible to use this MVC module with very little "wiring" code required.
*
* MVC does require support for JavaScript Getters and Setters.
*/
var MVC;
(function (MVC) {
    var View = (function () {
        function View(id) {
            this.id = id;
            if (!this.id) {
                this.id = "view#" + View.ID++;
            }
        }
        /**
        * Get the current active Viewer
        */
        View.GetViewer = function () {
            return View.VIEWER;
        };

        /**
        * Called whenever a model changes
        */
        View.prototype.update = function () {
            this._render();
        };

        /**
        * Wrapper around render method. Main purpose is to
        * set the view attribute on the window so a model can
        * find out who has interest in them.
        */
        View.prototype._render = function () {
            var oldViewer = View.VIEWER;
            View.VIEWER = this;
            try  {
                this.render();
            } finally {
                View.VIEWER = oldViewer;
            }
        };

        /**
        * Overwrite this method in a subclass
        */
        View.prototype.render = function () {
        };
        View.ID = 0;
        return View;
    })();
    MVC.View = View;

    var __OBSERVER_CURRENT;

    /**
    * Get the current Observer is any
    */
    function getObserver() {
        return __OBSERVER_CURRENT;
    }
    MVC.getObserver = getObserver;

    /**
    * Make a function an observer. This means when you run this function,
    * the models keeps track of the interest and will invoke this function when
    * the model state changes.
    *
    * @param fn The function that should become the observer
    * @param ctx The this parameter used to invoke the function
    */
    function makeObserver(fn, ctx) {
        if (typeof ctx === "undefined") { ctx = {}; }
        return function () {
            var oldObserver = __OBSERVER_CURRENT;
            __OBSERVER_CURRENT = fn;
            try  {
                return fn.apply(ctx, arguments);
            } finally {
                __OBSERVER_CURRENT = oldObserver;
            }
        };
    }
    MVC.makeObserver = makeObserver;

    /**
    * The Model class makes it easy to turn a plain Object into an Observable
    * Just call the static method makeObservable
    */
    var Model = (function () {
        function Model() {
        }
        /**
        * Notify observers of a change. This method bundles multiple
        * updates to the same viewer in to one
        */
        Model.notify = function (newWaiters) {
            if (Model.Waiting) {
                var waiters = Model.Waiters;
                newWaiters.forEach(function (waiter) {
                    if (waiters.indexOf(waiter) !== -1)
                        waiters.push(waiter);
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

        /**
        * Is this property accessed by a viewer. If that is the case and this is the first time,
        * lets register the viewer as an observer of the property
        * @param obj The object of the property
        * @param prop The property name
        */
        Model.registerObserver = function (obj, prop) {
            var observer = getObserver();
            if (observer) {
                if (obj.__observers[prop].indexOf(observer) === -1) {
                    console.log("registering new observer " + observer + " for property " + prop);
                    obj.__observers[prop].push(observer);
                }
            }
        };

        /**
        * Utiltiy method to make a number of plain properties observable.
        * @param obj The object that contains the properties of interest
        * @param props The list of property names to be observable
        */
        Model.makeObservable = function (obj, props) {
            if (!obj.__observers)
                obj.__observers = {};
            props.forEach(function (prop) {
                if (obj.__observers[prop])
                    return;
                obj.__observers[prop] = [];
                var privateVar = obj[prop];
                Object.defineProperty(obj, prop, {
                    get: function () {
                        Model.registerObserver(obj, prop);
                        return privateVar;
                    },
                    set: function (val) {
                        if (val === privateVar)
                            return;
                        privateVar = val;
                        Model.notify(obj.__observers[prop]);
                    }
                });
            });
        };
        Model.Waiters = null;
        return Model;
    })();
    MVC.Model = Model;
})(MVC || (MVC = {}));
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
    (function (UI) {
        var AspectWidget = (function () {
            function AspectWidget() {
                this.aspects = {};
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

                // <ul>{{sessions}}<li title="{{name}}">{{shortName}}</li>{{sessions}}</ul>
                this.root = document.createElement("div");
                this.ul = document.createElement("ul");
                this.selectElem = document.createElement("select");
                this.selectElem.style.display = "none";
                this.root.appendChild(this.ul);
                this.root.appendChild(this.selectElem);
                this.root.className = "tabbar";
                this.ul.className = "tabbar";
                this.ul.addEventListener('click', function (ev) {
                    IDE.activeSession = ev.srcElement["_value"];
                });
                // this.onClickHandler.bind(this);
            }
            SessionsBar.prototype.renderDropDown = function () {
                var _this = this;
                this.selectElem.style.display = "block";
                this.selectElem.innerHTML = "";
                IDE.sessions.forEach(function (session) {
                    var optionElem = document.createElement("option");
                    optionElem.innerText = session.shortName;
                    optionElem.value = session.name;
                    if (session === IDE.activeSession)
                        optionElem.selected = true;
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
                    if (session === IDE.activeSession)
                        li.className += " active";
                    if (session.changed)
                        li.className += " changed ";

                    _this.ul.appendChild(li);
                });
                if (this.isOverflowed()) {
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
                    if (selected === true) {
                        optionElem.selected = true;
                        // optionElem.setAttribute("selected","selected");
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
                    if (longName)
                        optionElem.setAttribute("title", longName);

                    var selected = _this.getValue(option, "selected");
                    if (selected === true) {
                        optionElem.className += " active";
                    }

                    var changed = _this.getValue(option, "changed");
                    if (changed === true) {
                        optionElem.className += " changed";
                    }

                    var decorator = _this.getValue(option, "decorator");
                    if (decorator) {
                        optionElem.className += " " + decorator;
                    }

                    // Create the delete button
                    if (_this.ondelete) {
                        var closeButton = document.createElement("span");
                        closeButton.innerHTML = "X";
                        closeButton.onclick = function () {
                            if (_this.ondelete) {
                                _this.ondelete(option);
                            }
                        };
                        optionElem.addEventListener('click', function (evt) {
                            if (evt.which == 2 && _this.ondelete) {
                                _this.ondelete(option);
                                evt.stopPropagation();
                            }
                        });
                        optionElem.appendChild(closeButton);
                    }

                    _this.ul.appendChild(optionElem);
                });

                // Check if overflow occured and if so render an additional dropdown.
                if (this.isOverflowed()) {
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
                if (this.onselect)
                    this.onselect(this.options[index]);
            };

            Tabbar.prototype.getSelectedOption = function (ev) {
                var elem = ev.srcElement;
                return elem["_value"];
            };

            Tabbar.prototype.onClickHandler = function (ev) {
                if (this.onselect) {
                    var option = this.getSelectedOption(ev);
                    if (option) {
                        this.onselect(option);
                    }
                }
            };

            Tabbar.prototype.onChangeHandler = function (ev) {
                if (this.onselect) {
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
    (function (UI) {
        var ToolTip = (function () {
            function ToolTip() {
                this.element = this.createElement();
            }
            ToolTip.prototype.show = function (x, y, tip) {
                this.element.innerText = tip;

                var st = this.element.style;
                st.left = (x + 10).toString(10) + "px";
                st.top = (y + 10).toString(10);
                st.display = "block";
            };

            ToolTip.prototype.hide = function () {
                this.element.style.display = "none";
            };

            // Copied from Ace kitchen-sinck demo
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
    (function (UI) {
        var AspectWidget = (function () {
            function AspectWidget() {
                this.aspects = {};
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

        // Created a file tree view based on a directory.
        // Very simple and fast implementation
        var TreeView = (function () {
            function TreeView() {
                var _this = this;
                this.aspects = {};
                this.defaultHandler = function (data, name) {
                    return data[name];
                };
                this.openFolders = [];
                this.rootElem = document.createElement("div");
                this.rootElem.className = "treeview";

                this.rootElem.onclick = function (ev) {
                    ev.stopPropagation();
                    var elem = ev.srcElement;
                    if (elem.tagName.toLowerCase() === "span") {
                        if (_this.onselect) {
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

            TreeView.prototype.findOpenFolders = function () {
                var a = [];
                $(this.rootElem).find('.opened').each(function (index, node) {
                    a.push(node.getAttribute('data-value'));
                });
                return a;
            };

            TreeView.prototype.refresh = function () {
                var _this = this;
                var openFolders = this.findOpenFolders();
                this.rootElem.innerHTML = "";
                var elem = this.render(this.getValue(null, "children"));
                this.rootElem.appendChild(elem);
                openFolders.forEach(function (path) {
                    _this.handleClick($('li[data-value="' + path + '"]')[0]);
                });
            };

            TreeView.refreshElem = function (elem) {
                if (elem.tagName !== "LI") {
                    elem = elem.parentElement;
                }

                if (elem.childElementCount > 1) {
                    elem.removeChild(elem.children[1]);
                    if ($(elem).hasClass(TreeView.OPENED)) {
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

                    // li.innerText = this.getValue(entry,"name");
                    li.setAttribute("data-name", entry.name.toLowerCase());
                    li["_value"] = entry;

                    if (entry.path) {
                        li.setAttribute("data-value", encodeURIComponent(entry.path));
                    }

                    if (_this.getValue(entry, "isFolder")) {
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
                if (decorator)
                    li.className += " " + decorator;
            };

            TreeView.getValueFromElement = function (elem) {
                if (elem.tagName.toLowerCase() === "span") {
                    elem = elem.parentNode;
                }
                return elem["_value"];
            };

            TreeView.prototype.handleClick = function (li) {
                var elem;

                if ($(li).hasClass(TreeView.OPENED)) {
                    li.className = TreeView.COLLAPSED;
                    this.decorate(li);

                    // li.removeChild(li.childNodes[1]);
                    elem = li.childNodes[1];
                    elem.style.display = "none";
                    return;
                }

                if ($(li).hasClass(TreeView.COLLAPSED)) {
                    li.className = TreeView.OPENED;
                    this.decorate(li);

                    elem = li.childNodes[1];
                    if (elem) {
                        elem.style.display = "block";
                        return;
                    }

                    var entry = li["_value"];
                    var entries = this.getValue(entry, "children");
                    var ul = this.render(entries);
                    li.appendChild(ul);
                }
            };
            TreeView.COLLAPSED = "collapsed";
            TreeView.OPENED = "opened";
            return TreeView;
        })();
        UI.TreeView = TreeView;
    })(Cats.UI || (Cats.UI = {}));
    var UI = Cats.UI;
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
var Cats;
(function (Cats) {
    (function (View) {
        var BasePane = (function () {
            function BasePane(root) {
                this.root = root;
                this.icon = "";
                this.name = "";
            }
            BasePane.prototype.show = function () {
                this.root.style.display = "block";
            };
            BasePane.prototype.hide = function () {
                this.root.style.display = "none";
            };

            BasePane.prototype.appendTo = function (parent) {
                parent.appendChild(this.root);
            };
            return BasePane;
        })();
        View.BasePane = BasePane;

        var ToolBar = (function (_super) {
            __extends(ToolBar, _super);
            function ToolBar() {
                _super.call(this, document.getElementById("toolbar"));
                this.initToolBar();
            }
            ToolBar.prototype.initToolBar = function () {
                var t = document.getElementById("toolbar");
                t.innerHTML = "";
                var cmds = Cats.Commands.getAllCommands();
                cmds.forEach(function (cmd) {
                    if (cmd.icon) {
                        var button = document.createElement("button");
                        button.style.backgroundImage = "url(../" + IDE.getIconDir() + cmd.icon + ")";
                        button.title = cmd.label;
                        button.onclick = cmd.command;
                        t.appendChild(button);
                    }
                });
            };
            return ToolBar;
        })(BasePane);
        View.ToolBar = ToolBar;
    })(Cats.View || (Cats.View = {}));
    var View = Cats.View;
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
var Cats;
(function (Cats) {
    (function (View) {
        function showErrors(errors) {
            IDE.resultbar.selectOption(0);
            var grid = new Cats.UI.Grid();
            grid.setColumns(["message", "fileName", "position"]);
            grid.setAspect("position", function (data) {
                return (data.range.start.row + 1) + ":" + (data.range.start.column + 1);
            });

            grid.setRows(errors);
            grid.onselect = function (data) {
                IDE.openSession(data.fileName, data.range.start);
            };

            grid.render();

            var result = IDE.compilationResult;
            result.innerHTML = "";
            grid.appendTo(result);
        }

        function showCompilationResults(data) {
            if (data.errors && (data.errors.length > 0)) {
                showErrors(data.errors);
                return;
            }

            // Lets puts a timestamp so it is clear we did something
            IDE.resultbar.selectOption(2);
            var time = new Date();
            var stamp = time.toLocaleTimeString();
            IDE.console.innerText += "\n" + stamp + " Successfully compiled " + Object.keys(data.source).length + " file(s).\n";
            IDE.console.scrollTop = IDE.console.scrollHeight; // Scroll to bottom
        }
        View.showCompilationResults = showCompilationResults;
    })(Cats.View || (Cats.View = {}));
    var View = Cats.View;
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
var Cats;
(function (Cats) {
    (function (View) {
        // Sort first on directory versus file and then on alphabet
        function sort(a, b) {
            if ((!a.isFolder) && b.isFolder)
                return 1;
            if (a.isFolder && (!b.isFolder))
                return -1;
            if (a.name > b.name)
                return 1;
            if (b.name > a.name)
                return -1;
            return 0;
        }

        /**
        * Reads the contents of a directory.
        * This class on purpose doesn't walk recursively in order to facilate
        * lazy loading and better performance for large directory structures
        */
        var DirectoryReader = (function () {
            function DirectoryReader() {
                this.ignore = ["^\."];
                // @TODO allow to set filter flags
            }
            /**
            * Read a directory and return a sorted list of its content
            *
            */
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
                if (!proj)
                    return;

                var projects = [proj];
                projects.forEach(function (project) {
                    var dirReader = new DirectoryReader();
                    var fileTree = new Cats.UI.TreeView();

                    // We must pass the treeview to the project to refresh when a file is modified, created or deleted
                    project.setTreeView(fileTree);

                    fileTree.setAspect("children", function (parent) {
                        if (parent == null) {
                            return [{
                                    name: project.name,
                                    isFolder: true,
                                    path: project.projectDir,
                                    decorator: "icon-folder"
                                }];
                        }

                        return dirReader.read(parent);
                    });

                    fileTree.appendTo(IDE.fileNavigation);
                    fileTree.refresh();

                    fileTree.onselect = function (entry) {
                        if (!entry.isFolder)
                            IDE.openSession(entry.path);
                    };
                });
            };
            return Navigator;
        })(View.BasePane);
        View.Navigator = Navigator;
    })(Cats.View || (Cats.View = {}));
    var View = Cats.View;
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
var Cats;
(function (Cats) {
    (function (View) {
        /**
        * Determine if a item has any children or not
        */
        function navigateToItemHasChildren(name, kind, data) {
            for (var i = 0; i < data.length; i++) {
                var item = data[i];
                if ((item.containerName === name) && (item.containerKind === kind))
                    return true;
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

                // var mode = "getOutliningRegions";
                project.iSense.perform(mode, session.name, function (err, data) {
                    IDE.outlineNavigation.innerHTML = "";
                    var outliner = new Cats.UI.TreeView();
                    outliner.setAspect("children", function (parent) {
                        var name = parent ? parent.qualifyer : "";
                        var kind = parent ? parent.kind : "";
                        var result = [];
                        for (var i = 0; i < data.length; i++) {
                            var o = data[i];

                            if ((o.containerKind === kind) && (o.containerName === name)) {
                                var fullName = o.name;
                                if (name)
                                    fullName = name + "." + fullName;
                                var item = {
                                    name: o.name,
                                    decorator: "icon-" + o.kind,
                                    qualifyer: fullName,
                                    kind: o.kind,
                                    outline: o
                                };

                                item.isFolder = navigateToItemHasChildren(fullName, o.kind, data); // !(o.kind === "method" || o.kind === "constructor" || o.kind === "function")

                                result.push(item);
                            }
                        }
                        return result;
                    });
                    outliner.appendTo(IDE.outlineNavigation);
                    outliner.onselect = function (value) {
                        var data = value.outline;
                        IDE.openSession(data.fileName, data.range.start);
                    };
                    outliner.refresh();
                });
            };

            Outline.prototype.initOutlineView = function () {
                var _this = this;
                IDE.on("activeSession", function (session) {
                    if (session && (session.mode === "typescript"))
                        _this.handleOutlineEvent(session);
                    else
                        IDE.outlineNavigation.innerHTML = "";
                });
            };
            return Outline;
        })(View.BasePane);
        View.Outline = Outline;
    })(Cats.View || (Cats.View = {}));
    var View = Cats.View;
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
                if (data) {
                    var grid = new Cats.UI.Grid();
                    grid.setColumns(["message", "fileName", "position"]);
                    grid.setRows(data);
                    grid.setAspect("position", function (row) {
                        return rangeToPosition(row.range);
                    });
                    grid.render();
                    grid.appendTo(searchResultsElem);
                    grid.onselect = function (sel) {
                        IDE.openSession(sel.fileName, sel.range.start);
                    };
                }
            };
            return SearchResults;
        })(View.BasePane);
        View.SearchResults = SearchResults;
    })(Cats.View || (Cats.View = {}));
    var View = Cats.View;
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
                // NOP
            };

            /*
            public busy(isBusy:boolean) {
            if (IDE.isBusy) {
            $("#activity").addClass("busy");
            } else {
            $("#activity").removeClass("busy");
            }
            }
            */
            StatusBar.prototype.render = function () {
                var act = IDE.activeSession;
                var session = act.editSession;
                if (session) {
                    document.getElementById("sessionmode").innerText = session.getMode();
                    document.getElementById("overwritemode").innerText = session.getOverwrite() ? "overwrite" : "insert";
                    this.updateSelectionText();
                }
            };

            StatusBar.prototype.initStatusBar = function () {
                var _this = this;
                var overwriteMode = document.getElementById("overwritemode");
                infoBus.SESSION.on("overwrite", function (mode) {
                    overwriteMode.innerText = mode ? "overwrite" : "insert";
                });

                overwriteMode.onclick = function (e) {
                    var s = IDE.activeSession;
                    if (s && s.editSession)
                        s.editSession.setOverwrite(!s.editSession.getOverwrite());
                };

                var aceEditor = IDE.mainEditor.aceEditor;
                aceEditor.on("changeSelection", this.updateSelectionText);

                var sessionMode = document.getElementById("sessionmode");
                aceEditor.on("changeMode", function () {
                    var mode = aceEditor.getSession().getMode();
                    sessionMode.innerText = PATH.basename(mode.$id);
                });

                var recordingMode = document.getElementById("recordingmode");
                aceEditor.on("changeStatus", function () {
                    setTimeout(function () {
                        recordingMode.innerText = aceEditor.commands.recording ? "RECORDING" : "";
                    }, 100);
                });
                recordingMode.onclick = function (e) {
                    aceEditor.commands.toggleRecording(aceEditor);
                };

                IDE.on("sessions", function (sessions) {
                    if (sessions.length) {
                        _this.root.classList.remove("no-session");
                    } else {
                        _this.root.classList.add("no-session");
                    }
                });
            };

            StatusBar.prototype.updateSelectionText = function () {
                var aceEditor = IDE.mainEditor.aceEditor;
                var lead = aceEditor.selection.lead;
                var text;

                if (aceEditor.selection.isEmpty()) {
                    text = (lead.row + 1) + " : " + (lead.column + 1);
                } else {
                    var copyText = aceEditor.getCopyText();
                    var length = copyText.replace("\n", "").length;

                    text = copyText.split("\n").length + " × " + (lead.column + 1) + " [" + copyText.replace(/\r?\n/g, "").length + "]";
                }

                document.getElementById("selection").innerText = text;
            };
            return StatusBar;
        })(View.BasePane);
        View.StatusBar = StatusBar;
    })(Cats.View || (Cats.View = {}));
    var View = Cats.View;
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
var Cats;
(function (Cats) {
    (function (View) {
        var TaskList = (function (_super) {
            __extends(TaskList, _super);
            function TaskList() {
                _super.call(this, document.getElementById("tasklist"));
            }
            return TaskList;
        })(View.BasePane);
        View.TaskList = TaskList;
    })(Cats.View || (Cats.View = {}));
    var View = Cats.View;
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
var PATH = require("path");
var GUI = require('nw.gui');

var IDE;
var infoBus = new Cats.InfoBus();

/**
* This is the file that is included in the index.html and
* bootstraps the starting of CATS.
*/
/**
* Main module of the CATS IDE
*/
var Cats;
(function (Cats) {
    /**
    * Get a parameter from the URL
    */
    function getParameterByName(name) {
        name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
        var regexS = "[\\?&]" + name + "=([^&#]*)";
        var regex = new RegExp(regexS);
        var results = regex.exec(window.location.search);
        if (results == null)
            return "";
        else
            return decodeURIComponent(results[1].replace(/\+/g, " "));
    }

    /**
    * Determine which project(s) we should load during
    * startup.
    */
    function determineProject() {
        var projectName = getParameterByName("project");
        if (!projectName) {
            var args = GUI.App.argv;
            if (args && (args.length > 0))
                projectName = args[0];
        }
        return projectName;
    }

    // Catch unhandled expections so they don't showup in the IDE.
    process.on('uncaughtException', function (err) {
        console.error("Uncaught exception occured: " + err);
        console.error(err.stack);
        alert(err);
    });

    // Instantiate the global ide
    IDE = new Cats.Ide();

    var prjName = determineProject();
    if (prjName) {
        IDE.addProject(new Cats.Project(prjName));
    } else {
        IDE.loadDefaultProjects();
    }

    IDE.init();

    // Catch the close of the windows in order to save any unsaved changes
    var win = GUI.Window.get();
    win.on("close", function () {
        if (IDE.hasUnsavedSessions()) {
            if (!confirm("There are unsaved files!\nDo you really want to quit?"))
                return;
        }

        IDE.saveConfig();
        this.close(true);
    });
})(Cats || (Cats = {}));
