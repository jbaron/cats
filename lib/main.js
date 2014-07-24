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
* This contain the common interfaces and enumerations that are being used to
* transfer data between the worker and the main thread.
*/
var Cats;
(function (Cats) {
    (function (Severity) {
        Severity[Severity["Info"] = 0] = "Info";
        Severity[Severity["Warning"] = 1] = "Warning";
        Severity[Severity["Error"] = 2] = "Error";
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
var Events = require('events');

var Cats;
(function (Cats) {
    

    

    

    /**
    * Central infobus that transports all type of events
    */
    var InfoBus2 = (function () {
        function InfoBus2() {
            this.IDE = new Events.EventEmitter();
            this.SESSION = new Events.EventEmitter();
            this.EDITOR = new Events.EventEmitter();
            this.IntelliSense = new Events.EventEmitter();
            console.info("initiated new InfoBus");
        }
        return InfoBus2;
    })();
    Cats.InfoBus2 = InfoBus2;
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

        var PlatForm = (function () {
            function PlatForm() {
            }
            PlatForm.OSX = "darwin";
            return PlatForm;
        })();
        File.PlatForm = PlatForm;

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

        // Sort first on directory versus file and then on alphabet
        function sort(a, b) {
            if ((!a.isDirectory) && b.isDirectory)
                return 1;
            if (a.isDirectory && (!b.isDirectory))
                return -1;
            if (a.name > b.name)
                return 1;
            if (b.name > a.name)
                return -1;
            return 0;
        }

        /**
        * Read the files from a directory
        * @param directory The directory name that should be read
        */
        function readDir(directory, sorted) {
            if (typeof sorted === "undefined") { sorted = false; }
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
            if (sorted)
                result.sort(sort);
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
var Cats;
(function (Cats) {
    var Ide = (function () {
        function Ide(doc) {
            this.doc = doc;
            this.sessions = [];
            this.infoBus = new Events.EventEmitter();
            this.mainMenu = null;
            this.sessionStack = [];
            this.config = this.loadConfig(true);
        }
        Ide.prototype.getActiveEditor = function () {
            var page = this.sessionTabView.getSelection()[0];
            if (!page)
                return null;
            var editor = page.getChildren()[0];
            return editor;
        };

        Object.defineProperty(Ide.prototype, "activeSession", {
            get: function () {
                var page = this.sessionTabView.getSelection()[0];
                if (!page)
                    return null;
                var editor = page.getChildren()[0];
                return editor.getSession();
            },
            enumerable: true,
            configurable: true
        });

        Ide.prototype.init = function () {
            this.layoutQx();
            Cats.Commands.init();

            this.toolBar.init();
            Cats.Menu.createMenuBar();
        };

        Ide.prototype.layoutQx = function () {
            // container layout
            var layout = new qx.ui.layout.VBox();

            // main container
            var mainContainer = new qx.ui.container.Composite(layout);
            this.doc.add(mainContainer, { edge: 0 });

            this.toolBar = new ToolBar();

            mainContainer.add(this.toolBar, { flex: 0 });

            // mainsplit, contains the editor splitpane and the info splitpane
            var mainsplit = new qx.ui.splitpane.Pane("horizontal");
            mainsplit.set({ decorator: null });

            // mainsplit.setBackgroundColor("#F4F4F4");
            this.navigatorPane = new TabView(["Files", "Outline"]);
            var fileTree = new FileNavigator(process.cwd());
            this.navigatorPane.getChildren()[0].add(fileTree, { edge: 0 });

            this.outlineNavigator = new OutlineNavigator();
            this.navigatorPane.getChildren()[1].add(this.outlineNavigator, { edge: 0 });

            mainsplit.add(this.navigatorPane, 1); // navigator

            var editorSplit = new qx.ui.splitpane.Pane("vertical").set({ decorator: null });

            var infoSplit = new qx.ui.splitpane.Pane("horizontal");
            this.sessionTabView = new SessionTabView();
            infoSplit.set({ decorator: null });
            infoSplit.add(this.sessionTabView, 4); // editor

            this.infoPane = new TabView(["Todo", "Properties"]);
            infoSplit.add(this.infoPane, 1); // todo

            editorSplit.add(infoSplit, 4);

            // Setup Problems section
            this.problemPane = new TabView(["Problems", "Search", "Console"]);
            this.console123 = new Console123();

            editorSplit.add(this.problemPane, 2); // Info

            this.problemResult = new ResultTable();
            this.problemPane.getChildren()[0].add(this.problemResult, { edge: 0 });

            this.searchResult = new ResultTable();
            this.problemPane.getChildren()[1].add(this.searchResult, { edge: 0 });
            this.problemPane.getChildren()[2].add(this.console123, { edge: 0 });

            this.problemPane.select("Console");

            // this.problemPane.setSelection([this.problemPane.getChildren()[2]]);
            mainsplit.add(editorSplit, 4); // main area

            mainContainer.add(mainsplit, { flex: 1 });

            // Setup status bar
            this.statusBar = new StatusBar();
            mainContainer.add(this.statusBar, { flex: 0 });
        };

        /**
        * Attach the drag n' drop event listeners to the document
        *
        * @author  LordZardeck <sean@blackfireweb.com>
        */
        Ide.prototype.initFileDropArea = function () {
            // Listen onto file drop events
            document.documentElement.addEventListener('drop', this.acceptFileDrop.bind(this), false);

            // Prevent the browser from redirecting to the file
            document.documentElement.addEventListener('dragover', function (event) {
                event.stopPropagation();
                event.preventDefault();
                event.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
            }, false);
        };

        /**
        * Process the file and open it inside a new ACE session
        *
        * @param   event       {DragEvent}
        * @author  LordZardeck <sean@blackfireweb.com>
        */
        Ide.prototype.acceptFileDrop = function (event) {
            event.stopPropagation();
            event.preventDefault();

            // Loop over each file dropped. More than one file
            // can be added at a time
            var files = event.dataTransfer.files;

            for (var i = 0; i < files.length; i++) {
                this.openSession(files[i].path);
            }
        };

        /**
        * Load the projects and files that were open last time before the
        * IDE was closed.
        */
        Ide.prototype.restorePreviousProjects = function () {
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
                        _this.openSession(session.path);
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
            // IDE.getActiveEditor().setFontSize(size + "px");
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
            var p = IDE.sessionTabView.addSession(session);
            IDE.console123.log("Added File " + session.name);
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
            //@TODO call status bar busy
            /*
            if (isBusy) {
            $("#activity").addClass("busy");
            } else {
            $("#activity").removeClass("busy");
            }
            */
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

            var configStr = localStorage[Ide.STORE_KEY];

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
                    path: session.name
                });
            });

            if (this.project)
                config.projects.push(this.project.projectDir);
            var configStr = JSON.stringify(config);
            localStorage[Ide.STORE_KEY] = configStr;
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
            var _this = this;
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
                if ((session.mode === "typescript") && (!this.project.containsTSFile(name))) {
                    this.project.addTSFile(name, content);
                }
                this.sessions = this.sessions.concat([session]);
                var p = IDE.sessionTabView.addSession(session, pos);
            } else {
                this.sessionTabView.navigateTo(session, pos);
            }

            this.addToSessionStack(name, pos, cb);
            var project = session.project;

            // var mode = "getOutliningRegions";
            if (session.isTypeScript()) {
                this.project.iSense.getScriptLexicalStructure(session.name, function (err, data) {
                    _this.outlineNavigator.setData(data);
                });
            } else {
                this.outlineNavigator.setData([]);
            }

            if (cb)
                cb(session);
        };

        Ide.prototype.persistSession = function (session, shouldConfirm) {
            if (typeof shouldConfirm === "undefined") { shouldConfirm = false; }
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
        Ide.STORE_KEY = "cats.config";
        return Ide;
    })();
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
var Cats;
(function (Cats) {
    var EditSession = ace.require("ace/edit_session").EditSession;
    var UndoManager = ace.require("ace/undomanager").UndoManager;

    var AceSession = (function () {
        /**
        * Create a new session
        *
        * @param project The project the session belongs to
        * @param name The name of the session
        * @param content The content of the session
        */
        function AceSession(name, content) {
            this.name = name;
            this.type = "ACE";
            this.overwrite = false;
            // Is the worker out of sync with the source code
            this.pendingWorkerUpdate = false;
            // Has the code been changed without saving yet
            this.changed = false;
            this.mode = AceSession.determineMode(name);
            this.editSession = new EditSession(content, "ace/mode/" + this.mode);

            this.configEditor(this.project.config.editor);

            this.editSession.on("change", this.onChangeHandler.bind(this));
            this.editSession.setUndoManager(new UndoManager());
            this.editSession.on("changeOverwrite", function (a) {
                // infoBus.SESSION.emit("overwrite",this.editSession.getOverwrite());
            });
            // @TODO this.on("changed", () => { IDE.tabbar.refresh() });
        }
        /**
        * Config the editor with any confiured default values
        */
        AceSession.prototype.configEditor = function (editorConfig) {
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
        };

        Object.defineProperty(AceSession.prototype, "project", {
            get: function () {
                return IDE.project;
            },
            enumerable: true,
            configurable: true
        });

        AceSession.prototype.isTypeScript = function () {
            return this.mode === "typescript";
        };

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

            if (this.mode === "typescript")
                this.project.validate();

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
        * Show info at Screen location
        */
        AceSession.prototype.showInfoAt = function (ev) {
            if (this.mode !== "typescript")
                return;

            var docPos = IDE.getActiveEditor().getPositionFromScreenOffset(ev.offsetX, ev.offsetY);
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
                // TODO get its own timer
                this.project.iSense.getErrors(this.name, function (err, result) {
                    var annotations = [];
                    if (result) {
                        result.forEach(function (error) {
                            annotations.push({
                                row: error.range.start.row,
                                column: error.range.start.column,
                                type: error.severity === 2 /* Error */ ? "error" : "warning",
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
    })();
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
            // EditorCommands.init(register);
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
        /*
        // Just wrap the Ace command.
        function editorCommand(commandName: string) {
        return function() { IDE.getActiveEditor().execCommand(commandName); }
        }
        */
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
                session.project.iSense.getFormattedTextForRange(session.name, 0, session.getValue().length, function (err, result) {
                    if (!err) {
                        var pos = IDE.getActiveEditor().getPosition();
                        session.setValue(result);
                        if (pos)
                            IDE.getActiveEditor().moveToPosition(pos);
                    }
                });
            }
        }

        /*
        function getShortcut(commandName: string) {
        
        var platform = IDE.getActiveEditor().commands.platform;
        var command = IDE.getActiveEditor().commands.byName[commandName];
        
        if (command && command.bindKey) {
        var key = command.bindKey[platform];
        return key;
        }
        
        return null;
        
        }
        
        
        // TODO i18n
        function addShortcut(label, commandName: string) {
        var result = label;
        var platform = IDE.getActiveEditor().commands.platform;
        var command = IDE.getActiveEditor().commands.byName[commandName];
        
        if (command && command.bindKey) {
        var tabs = 5 - Math.floor((result.length / 4) - 0.01);
        result = result + "\t\t\t\t\t\t".substring(0, tabs);
        var key = command.bindKey[platform];
        if (key) result += key;
        }
        return result;
        }
        
        function toggleInvisibles() {
        IDE.getActiveEditor().setShowInvisibles(!IDE.mainEditor.aceEditor.getShowInvisibles());
        }
        
        */
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
                        shortcut: null,
                        command: null
                    };
                    if (config.icon)
                        item.icon = config.icon;
                    registry(item);
                });

                // registry({name:CMDS.edit_toggleInvisibles, label:"Toggle Invisible Characters", command: toggleInvisibles, icon: "invisibles.png"});
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
            var w = window.open("keyboard_shortcuts.html", "_blank", "width=800; height=595");
            /*
            var isDark = document.getElementsByClassName("ace_dark").length > 0;
            var elem = <HTMLElement>document.getElementsByClassName("ace_scroller")[0];
            var bg = window.getComputedStyle(elem, null).backgroundColor;
            elem = document.getElementById("editor");
            var fg = window.getComputedStyle(elem, null).color;
            var w = window.open("keyboard_shortcuts.html", "_blank", "width=800; height=595");
            
            
            w.onload = () => {
            
            var body = w.document.body;
            
            $(body)
            .css("background-color", bg)
            .css("color", fg);
            
            if (isDark) {
            $(body).addClass("dark");
            }
            
            };
            */
        }

        /**
        * Show the version of CATS
        */
        function showAbout() {
            alert("Code Assisitant for TypeScript, version 1.0.1\nCreated by JBaron\n");
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

        function toggleView(component) {
            component.toggle();
            // infoBus.IDE.emit("toggleView", name);
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
            return IDE.getActiveEditor().getPosition();
        }

        function gotoDeclaration() {
            var session = IDE.activeSession;
            if (!session)
                return;
            var cursor = getCursor();
            session.project.iSense.getDefinitionAtPosition(session.name, cursor, function (err, data) {
                if (data && data.fileName)
                    IDE.openSession(data.fileName, data.range.start);
            });
        }
        Commands.gotoDeclaration = gotoDeclaration;

        function getInfoAt(type) {
            var session = IDE.activeSession;
            if (!session)
                return;
            IDE.problemPane.select("Search");
            var cursor = getCursor();

            session.project.iSense.getInfoAtPosition(type, session.name, cursor, function (err, data) {
                console.log("Called getInfoAt for with results #" + data.length);
                IDE.searchResult.setData(data);
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
        function showCompilationResults(data) {
            if (data.errors && (data.errors.length > 0)) {
                IDE.problemResult.setData(data.errors);
                return;
            }

            IDE.problemResult.setData([]);
            var time = new Date();
            var stamp = time.toLocaleTimeString();
            IDE.console123.log(stamp + " Successfully compiled " + Object.keys(data.source).length + " file(s).\n");
        }

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

            project.iSense.compile(function (err, data) {
                showCompilationResults(data);
            });
        }

        function show(text) {
            if (!text)
                return;
            IDE.console123.log(text);
        }

        /**
        * Build the project
        */
        function buildProject() {
            // this.defaultOutput = window.prompt("Output file",this.defaultOutput);
            var project = IDE.project;
            if (project.config.customBuild) {
                IDE.busy(true);

                // IDE.resultbar.selectOption(2);
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
                project.iSense.compile(function (err, data) {
                    showCompilationResults(data);
                    if (data.errors && (data.errors.length > 0))
                        return;
                    var sources = data.source;
                    sources.forEach(function (source) {
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
            /*
            @TODO
            var table = <HTMLElement>document.querySelector("#searchresults table");
            if (!table) {
            alert("Cannot rename if there are no search results available");
            return;
            }
            var grid = Cats.UI.Grid.getGridFromElement(table);
            var rows: FileRange[] = grid.getRows();
            var msg = "Going to rename " + rows.length + " instances.\nPlease enter new name";
            var newName = prompt(msg);
            if (!newName) return;
            refactor(rows,newName);
            */
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
                    outFileOption: "",
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

            // if (IDE.tabbar) IDE.tabbar.refresh();
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
        function ISenseHandler(project) {
            this.project = project;
            this.messageId = 0;
            this.registry = {};
            // Create a new webworker
            this.worker = new Worker("../lib/tsworker.js");
            this.initWorker();
        }
        ISenseHandler.prototype.getErrors = function (fileName, cb) {
            this.perform("getErrors", fileName, cb);
        };

        ISenseHandler.prototype.getAllDiagnostics = function (cb) {
            this.perform("getAllDiagnostics", cb);
        };

        ISenseHandler.prototype.getFormattedTextForRange = function (sessionName, start, end, cb) {
            this.perform("getFormattedTextForRange", sessionName, start, end, cb);
        };

        ISenseHandler.prototype.getDefinitionAtPosition = function (sessionName, cursor, cb) {
            this.perform("getDefinitionAtPosition", sessionName, cursor, cb);
        };

        ISenseHandler.prototype.getInfoAtPosition = function (type, sessionName, cursor, cb) {
            this.perform("getInfoAtPosition", type, sessionName, cursor, cb);
        };

        ISenseHandler.prototype.compile = function (cb) {
            this.perform("compile", cb);
        };

        ISenseHandler.prototype.getScriptLexicalStructure = function (sessionName, cb) {
            this.perform("getScriptLexicalStructure", sessionName, cb);
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
            console.info("Send message: " + message.method);
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
        ISenseHandler.prototype.initWorker = function () {
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
            // IDE.project.getTreeView().refresh();
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

            var name = prompt("Please enter new name");
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

                // @TODO fix a bit nicer
                if ((OS.File.platform() === OS.File.PlatForm.OSX) && menubar.createMacBuiltin) {
                    menubar.createMacBuiltin("CATS");
                    GUI.Window.get().menu = menubar;
                }

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
                    { id: IDE.toolBar, name: "Toolbar" },
                    { id: IDE.statusBar, name: "Statusbar" }
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
    

    var Project = (function () {
        /**
        * Set the project to a new directory and make sure
        * we remove old artifacts.
        */
        function Project(projectDir) {
            // The TypeScript files that are part of the project
            this.tsFiles = [];
            IDE.project = this;
            this.projectDir = PATH.resolve(projectDir);
            this.refresh();
        }
        /**
        * Check whether a certain TS file is part of this project
        */
        Project.prototype.containsTSFile = function (name) {
            return (this.tsFiles.indexOf(name) > -1);
        };

        Project.prototype.addTSFile = function (name, content) {
            this.tsFiles.push(name);
            this.iSense.addScript(name, content);
            console.info("Added TypeScript file: " + name);
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
        * Show the errors on a project level
        */
        Project.prototype.validate = function () {
            // @TODO don't compile just get the errors
            this.iSense.getAllDiagnostics(function (err, data) {
                if (data)
                    IDE.problemResult.setData(data);
            });
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
            this.iSense = new Cats.ISenseHandler(this);

            if (this.config.compiler.outFileOption) {
                this.config.compiler.outFileOption = PATH.join(this.projectDir, this.config.compiler.outFileOption);
                console.info("Compiler output: " + this.config.compiler.outFileOption);
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
        * @param directory The source directory where to start the scan
        */
        Project.prototype.loadTypeScriptFiles = function (directory) {
            var _this = this;
            OS.File.readDir2(directory, function (files) {
                files.forEach(function (file) {
                    try  {
                        var fullName = file.fullName;
                        if (file.isFile) {
                            console.info("FullName: " + fullName);
                            var ext = PATH.extname(fullName);
                            if (ext === ".ts") {
                                OS.File.readTextFile2(fullName, function (content) {
                                    _this.addTSFile(fullName, content);
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
                console.info("Received completions: " + completions.length);
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
                    this.wrap.style.left = coords.pageX + 'px';
                } else {
                    this.wrap.style.top = (top - $(this.wrap).height() - 20) + 'px';
                    this.wrap.style.left = coords.pageX + 'px';
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
// declare var require: any;
// declare var ace: any;
// declare var process;
/**
* The main IDE class that contains the layout and various
* components that make up CATS
*/
var Ide = (function () {
    function Ide(app) {
        this.doc = app.getRoot();
    }
    Ide.prototype.layout = function () {
        // container layout
        var layout = new qx.ui.layout.VBox();

        // main container
        var mainContainer = new qx.ui.container.Composite(layout);
        this.doc.add(mainContainer, { edge: 0 });

        this.toolBar = new ToolBar();

        mainContainer.add(this.toolBar, { flex: 0 });

        // mainsplit, contains the editor splitpane and the info splitpane
        var mainsplit = new qx.ui.splitpane.Pane("horizontal").set({ decorator: null });
        this.navigatorPane = new TabView(["Files", "Outline"]);
        var fileTree = new FileNavigator(process.cwd());
        this.navigatorPane.getChildren()[0].add(fileTree, { edge: 0 });
        this.navigatorPane.getChildren()[1].add(new OutlineNavigator(), { edge: 0 });

        mainsplit.add(this.navigatorPane, 1); // navigator

        var editorSplit = new qx.ui.splitpane.Pane("vertical").set({ decorator: null });

        var infoSplit = new qx.ui.splitpane.Pane("horizontal");
        this.sessionPane = new TabView([]);
        infoSplit.set({ decorator: null });
        infoSplit.add(this.sessionPane, 4); // editor

        this.infoPane = new TabView(["Todo", "Properties"]);
        infoSplit.add(this.infoPane, 1); // todo

        editorSplit.add(infoSplit, 4);

        // Setup Problems section
        this.problemPane = new TabView(["Problems", "Search", "Console"]);
        this.console = new Console123();

        editorSplit.add(this.problemPane, 2); // Info

        this.problemPane.getChildren()[0].add(new ResultTable(), { edge: 0 });
        this.problemPane.getChildren()[1].add(new ResultTable(), { edge: 0 });
        this.problemPane.getChildren()[2].add(this.console, { edge: 0 });

        this.problemPane.select("Console");

        // this.problemPane.setSelection([this.problemPane.getChildren()[2]]);
        mainsplit.add(editorSplit, 4); // main area

        mainContainer.add(mainsplit, { flex: 1 });

        // Setup status bar
        this.statusBar = new qx.ui.toolbar.ToolBar();
        this.statusBar.add(new qx.ui.toolbar.Button("1:1"));
        mainContainer.add(this.statusBar, { flex: 0 });
    };
    return Ide;
})();
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
* Basic logging widget that can be used to write
* logging information that are of interest to the user.
*
*/
var Console123 = (function (_super) {
    __extends(Console123, _super);
    function Console123() {
        var _this = this;
        _super.call(this);

        this.setDecorator(null);
        var w = new qx.ui.core.Widget();
        this.add(w);

        this.addListenerOnce("appear", function () {
            _this.container = w.getContentElement().getDomElement();
        });
        this.setContextMenu(this.createContextMenu());
    }
    Console123.prototype.log = function (msg, printTime, severity) {
        if (typeof printTime === "undefined") { printTime = false; }
        if (typeof severity === "undefined") { severity = 0; }
        if (this.container) {
            var prefix = "";
            if (printTime) {
                var dt = new Date();
                prefix = dt.toLocaleTimeString() + " ";
            }
            this.container.innerText += prefix + msg + "\n";
            this.container.scrollTop = this.container.scrollHeight; // Scroll to bottom
            // var t = document.createTextNode(prefix + msg);
            // this.container.appendChild(t);
            // this.container.appendChild(document.createElement("br"));
        }
    };

    Console123.prototype.createContextMenu = function () {
        var _this = this;
        var menu = new qx.ui.menu.Menu();
        var item1 = new qx.ui.menu.Button("Clear");
        item1.addListener("execute", function () {
            _this.clear();
        });
        menu.add(item1);
        return menu;
    };

    Console123.prototype.clear = function () {
        if (this.container)
            this.container.innerHTML = "";
    };
    return Console123;
})(qx.ui.container.Scroll);
var fs = require("fs");
var path = require("path");

var rootTop = {
    label: "qx-cats",
    fullPath: "/Users/peter/Development/qx-cats/",
    directory: true,
    children: [{
            label: "Loading",
            icon: "loading",
            directory: false
        }],
    loaded: false
};

/**
* File navigator widget for CATS
*/
var FileNavigator = (function (_super) {
    __extends(FileNavigator, _super);
    function FileNavigator(directory) {
        var _this = this;
        _super.call(this, null, "label", "children");
        this.directoryModels = {};
        rootTop.fullPath = directory;
        rootTop.label = path.basename(directory);
        var root = qx.data.marshal.Json.createModel(rootTop, true);
        this.setModel(root);

        // this.setLabelPath("label");
        // this.setChildProperty("children");
        this.setDecorator(null);

        this.setupDelegate();
        this.setContextMenu(this.createContextMenu());
        this.setup();

        console.log("Icon path:" + this.getIconPath());
        this.addListener("dblclick", function () {
            var file = _this.getSelectedFile();
            if (file) {
                IDE.openSession(file.getFullPath());
            }
        });

        // Force a relaod after a close
        this.addListener("close", function (event) {
            var data = event.getData();
            data.setLoaded(false);
        });
    }
    FileNavigator.prototype.getSelectedFile = function () {
        var item = this.getSelection().getItem(0);
        if (!item)
            return null;
        if (!item.getDirectory)
            return null;
        if (!item.getDirectory()) {
            return item;
        }
        return null;
    };

    FileNavigator.prototype.getSelectedItem = function () {
        console.log(this.getSelection().getItem(0));
        var fileName = this.getSelection().getItem(0).getLabel();
        return fileName;
    };

    FileNavigator.prototype.setup = function () {
        this.setIconPath("");
        this.setIconOptions({
            converter: function (value, model) {
                if (value.getDirectory()) {
                    return "./resource/qx/icon/Tango/16/places/folder.png";
                }
                return "./resource/qx/icon/Tango/16/mimetypes/text-plain.png";
            }
        });
    };

    FileNavigator.prototype.createContextMenu = function () {
        var _this = this;
        var menu = new qx.ui.menu.Menu();
        var refreshButton = new qx.ui.menu.Button("Refresh");
        var renameButton = new qx.ui.menu.Button("Rename");

        var deleteButton = new qx.ui.menu.Button("Delete");
        deleteButton.addListener("execute", function () {
            alert("going to delete " + _this.getSelectedItem());
        });

        var newFileButton = new qx.ui.menu.Button("New File");
        var newDirButton = new qx.ui.menu.Button("New Directory");

        menu.add(refreshButton);
        menu.add(renameButton);
        menu.add(deleteButton);
        menu.add(newFileButton);
        menu.add(newDirButton);
        return menu;
    };

    FileNavigator.prototype.setupDelegate = function () {
        var self = this;
        var delegate = {
            bindItem: function (controller, item, index) {
                controller.bindDefaultProperties(item, index);

                controller.bindProperty("", "open", {
                    converter: function (value, model, source, target) {
                        var isOpen = target.isOpen();
                        if (isOpen && !value.getLoaded()) {
                            value.setLoaded(true);

                            setTimeout(function () {
                                value.getChildren().removeAll();
                                self.readDir(value);
                            }, 0);
                        }
                        return isOpen;
                    }
                }, item, index);
            }
        };
        this.setDelegate(delegate);
    };

    FileNavigator.prototype.refreshDir = function (dir) {
        var value;
        setTimeout(function () {
            // alert("refreshing tree");
            var node = {
                label: "Loading",
                fullPath: "asasasa/dss",
                directory: false
            };
            value.getChildren().removeAll();
            value.getChildren().push(qx.data.marshal.Json.createModel(node, true));
        }, 0);
    };

    /**
    * Read the files from a directory
    * @param directory The directory name that should be read
    */
    FileNavigator.prototype.readDir = function (parent) {
        var entries = OS.File.readDir(parent.getFullPath(), true);
        entries.forEach(function (entry) {
            var node = {
                label: entry.name,
                fullPath: entry.fullName,
                loaded: !entry.isDirectory,
                directory: entry.isDirectory,
                children: entry.isDirectory ? [{
                        label: "Loading",
                        icon: "loading",
                        directory: false
                    }] : null
            };
            parent.getChildren().push(qx.data.marshal.Json.createModel(node, true));
        });
    };
    FileNavigator.COUNT = 0;
    return FileNavigator;
})(qx.ui.tree.VirtualTree);
/**
* Create a simple Tree to mimic outline functionality
*/
var OutlineNavigator = (function (_super) {
    __extends(OutlineNavigator, _super);
    function OutlineNavigator() {
        var _this = this;
        _super.call(this, null, "name", "kids");
        this.setDecorator(null);

        // this.setPadding(0, 0, 0, 0);
        this.setHideRoot(true);

        this.addListener("dblclick", function () {
            var item = _this.getSelectedItem();
            if (item) {
                // @TODO fix getStart to use primitive types
                IDE.getActiveEditor().moveToPosition(item.getRange().getStart());
            }
        });
    }
    OutlineNavigator.prototype.getSelectedItem = function () {
        var item = this.getSelection().getItem(0);
        return item;
    };

    OutlineNavigator.prototype.createModel = function (data, parent) {
        var _this = this;
        if (!parent.kids)
            parent.kids = [];
        data.forEach(function (item) {
            // var fullName = parent.containerName ? parent.containerName + "." + parent.name : parent.name;
            if ((item.containerKind === parent.kind) && (item.containerName === parent.fullName)) {
                var fullName = parent.name ? parent.name + "." + item.name : item.name;
                var newItem = {
                    name: item.name,
                    fullName: fullName,
                    kind: item.kind,
                    range: item.range
                };
                parent.kids.push(newItem);
                _this.createModel(data, newItem);
            }
        });
        return parent;
    };

    OutlineNavigator.prototype.setData = function (data) {
        // console.log(data);
        var json = this.createModel(data, { name: "", kind: "", fullName: "", range: null });

        // This could be very expensive call, look for better alternative.
        var model = qx.data.marshal.Json.createModel(json, true);
        this.setModel(model);
        /*
        IDE.outlineNavigation.innerHTML = "";
        var outliner = new Cats.UI.TreeView();
        outliner.setAspect("children", (parent: OutlineTreeElement): OutlineTreeElement[] => {
        var name = parent ? parent.qualifyer : "";
        var kind = parent ? parent.kind : ""; // no script anymore
        var result: OutlineTreeElement[] = [];
        for (var i = 0; i < data.length; i++) {
        var o = data[i];
        
        if ((o.containerKind === kind) && (o.containerName === name)) {
        var fullName = o.name;
        if (name) fullName = name + "." + fullName;
        var item: OutlineTreeElement = {
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
        outliner.onselect = (value) => {
        var data: NavigateToItem = value.outline;
        IDE.openSession(data.fileName, data.range.start);
        };
        outliner.refresh();
        */
    };
    return OutlineNavigator;
})(qx.ui.tree.VirtualTree);
/**
* This table displays problems and search result
*/
var ResultTable = (function (_super) {
    __extends(ResultTable, _super);
    function ResultTable() {
        var _this = this;
        var tableModel = new qx.ui.table.model.Simple();

        // table model
        var headers = ["Message", "File", "Position"];

        tableModel.setColumns(headers);
        tableModel.setData([]);

        var custom = {
            tableColumnModel: function (obj) {
                return new qx.ui.table.columnmodel.Resize(obj);
            }
        };
        _super.call(this, tableModel, custom);
        this.setDecorator(null);

        this.setPadding(0, 0, 0, 0);

        this.getSelectionModel().addListener("changeSelection", function (data) {
            var selectedRow = _this.getSelectionModel().getLeadSelectionIndex();
            var data = _this.getTableModel().getRowData(selectedRow);
            IDE.console123.log("Selected row:" + selectedRow);
            if (data)
                IDE.openSession(data[1], data[3].start);
        });
    }
    ResultTable.prototype.rangeToPosition = function (range) {
        return (range.start.row + 1) + ":" + (range.start.column + 1);
    };

    ResultTable.prototype.setData = function (data) {
        var _this = this;
        var tableModel = new qx.ui.table.model.Simple();
        var rows = [];
        if (data) {
            data.forEach(function (row) {
                rows.push([
                    row.message,
                    row.fileName,
                    _this.rangeToPosition(row.range),
                    row.range
                ]);
            });
            /*
            var grid = new Cats.UI.Grid();
            grid.setColumns(["message", "fileName", "position"]);
            grid.setRows(data);
            grid.setAspect("position", (row) => { return rangeToPosition(row.range) });
            grid.render();
            grid.appendTo(searchResultsElem);
            grid.onselect = (sel: Cats.FileRange) => {
            IDE.openSession(sel.fileName, sel.range.start);
            };
            */
        }
        tableModel.setColumns(ResultTable.HEADERS);
        tableModel.setData(rows);
        this.setTableModel(tableModel);
    };
    ResultTable.HEADERS = ["Message", "File", "Position"];
    return ResultTable;
})(qx.ui.table.Table);
/**
* Wrapper around the ACE editor. The rest of the code base should not use
* ACE editor directly so it can be easily changed for another editor if required.
*/
var SourceEditor = (function (_super) {
    __extends(SourceEditor, _super);
    function SourceEditor(session, pos) {
        var _this = this;
        _super.call(this);
        this.session = session;
        this.addListenerOnce("appear", function () {
            var container = _this.getContentElement().getDomElement();

            // create the editor
            _this.aceEditor = _this.createAceEditor(container);
            _this.aceEditor.getSession().setMode("ace/mode/typescript");

            // this.aceEditor.getSession().setValue(this.getContent());
            _this.aceEditor.getSession();
            _this.setContent(session.getValue());
            _this.addListener("resize", function () {
                // use a timeout to let the layout queue apply its changes to the dom
                window.setTimeout(function () {
                    _this.aceEditor.resize();
                }, 0);
            });
            _this.autoCompleteView = new Cats.UI.AutoCompleteView(_this.aceEditor);

            // this.setupInputHandling();
            if (session.mode === "typescript")
                _this.createContextMenu();
            if (pos)
                _this.moveToPosition(pos);
        }, this);

        this.popup = new qx.ui.popup.Popup(new qx.ui.layout.Flow());
        this.popup.add(new qx.ui.basic.Label("Code completion"));
    }
    SourceEditor.prototype.getSession = function () {
        return this.session;
    };

    SourceEditor.prototype.setupEvents = function () {
        var session = this.aceEditor.getSession();
        session.on("changeOverwrite", function (a) {
            IDE.infoBus.emit("editor.overwrite", session.getOverwrite());
        });
    };

    SourceEditor.prototype.getAceEditor = function () {
        return this.aceEditor;
    };

    SourceEditor.prototype.moveToPosition = function (pos) {
        this.aceEditor.moveCursorToPosition(pos);
        this.aceEditor.clearSelection();
        this.aceEditor.centerSelection();
    };

    SourceEditor.prototype.getPosition = function () {
        return this.aceEditor.getCursorPosition();
    };

    /**
    * Get the Position based on mouse x,y coordinates
    */
    SourceEditor.prototype.getPositionFromScreenOffset = function (x, y) {
        var r = this.aceEditor.renderer;

        // var offset = (x + r.scrollLeft - r.$padding) / r.characterWidth;
        var offset = (x - r.$padding) / r.characterWidth;

        // @BUG: Quickfix for strange issue with top
        var correction = r.scrollTop ? 7 : 0;

        var row = Math.floor((y + r.scrollTop - correction) / r.lineHeight);
        var col = Math.round(offset);

        var docPos = this.aceEditor.getSession().screenToDocumentPosition(row, col);
        return docPos;
    };

    SourceEditor.prototype.autoComplete = function () {
        if (this.session.mode === "typescript") {
            var cursor = this.aceEditor.getCursorPosition();
            this.session.autoComplete(cursor, this.autoCompleteView);
        }
    };

    SourceEditor.prototype.autoComplete123 = function () {
        // alert("auto complete");
        var cursor = this.aceEditor.getCursorPosition();
        var coords = this.aceEditor.renderer.textToScreenCoordinates(cursor.row, cursor.column);
        this.popup.moveTo(coords.pageX, coords.pageY);
        this.popup.show();
    };

    // Initialize the editor
    SourceEditor.prototype.createAceEditor = function (rootElement) {
        var _this = this;
        var editor = ace.edit(rootElement);

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

        /*
        var elem = rootElement; // TODo find scroller child
        elem.onmousemove = this.onMouseMove.bind(this);
        elem.onmouseout = () => {
        this.toolTip.hide()
        clearTimeout(this.mouseMoveTimer);
        };
        */
        return editor;
    };

    SourceEditor.prototype.setContent = function (value) {
        this.aceEditor.getSession().setValue(value);
    };

    SourceEditor.prototype.createContextMenuItem = function (name, commandID) {
        var button = new qx.ui.menu.Button(name);
        var command = Cats.Commands.get(commandID).command;
        button.addListener("execute", function () {
            command();
        });
        return button;
    };

    SourceEditor.prototype.createContextMenu = function () {
        var CMDS = Cats.Commands.CMDS;
        var menu = new qx.ui.menu.Menu();

        menu.add(this.createContextMenuItem("Goto Declaration", 45 /* navigate_declaration */));
        menu.add(this.createContextMenuItem("Find References", 42 /* navigate_references */));
        menu.add(this.createContextMenuItem("Find Occurences", 43 /* navigate_occurences */));
        menu.add(this.createContextMenuItem("FInd Implementations", 44 /* navigate_implementors */));

        this.setContextMenu(menu);
    };
    return SourceEditor;
})(qx.ui.core.Widget);
var TabView = (function (_super) {
    __extends(TabView, _super);
    function TabView(tabNames) {
        var _this = this;
        _super.call(this);
        this.iconPath = "./img/eclipse/";

        //       this.setPadding(0, 0, 0, 0);
        this.setContentPadding(1, 0, 0, 0);
        tabNames.forEach(function (name) {
            _this.addPage(name);
        });
    }
    TabView.prototype.getIconName = function (name) {
        return this.iconPath + name.toLowerCase() + "_view.gif";
    };

    TabView.prototype.addPage = function (name, tooltipText) {
        var tab = new qx.ui.tabview.Page(name, this.getIconName(name));
        tab.setLayout(new qx.ui.layout.Canvas());

        var button = tab.getButton();
        button.setContextMenu(this.createContextMenu(tab));

        if (tooltipText) {
            var tooltip = new qx.ui.tooltip.ToolTip(tooltipText);
            button.setToolTip(tooltip);
            button.setBlockToolTip(false);
        }
        this.add(tab);
        return tab;
    };

    TabView.prototype.createContextMenu = function (tab) {
        var _this = this;
        var menu = new qx.ui.menu.Menu();
        var item1 = new qx.ui.menu.Button("Close");
        item1.addListener("execute", function () {
            _this.remove(tab);
        });

        var item2 = new qx.ui.menu.Button("Close other");
        var item3 = new qx.ui.menu.Button("Close all");
        menu.add(item1);
        menu.add(item2);
        menu.add(item3);
        return menu;
    };

    TabView.prototype.getPage = function (id) {
        var pages = this.getChildren();
        for (var i = 0; i < pages.length; i++) {
            var page = pages[i];
            console.log(page.getLabel());
            if (page.getLabel() === id) {
                return page;
            }
        }
        return null;
    };

    TabView.prototype.select = function (id) {
        var page = this.getPage(id);
        if (page)
            this.setSelection([page]);
    };
    return TabView;
})(qx.ui.tabview.TabView);
/**
* The toolbar for CATS
*/
var ToolBar = (function (_super) {
    __extends(ToolBar, _super);
    function ToolBar() {
        _super.call(this);
        this.themes = ["Modern", "Indigo", "Simple", "Classic"];
    }
    ToolBar.prototype.init = function () {
        var _this = this;
        var cmds = Cats.Commands.getAllCommands();
        cmds.forEach(function (cmd) {
            if (cmd.icon) {
                var icon = "../" + IDE.getIconDir() + cmd.icon;
                var button = new qx.ui.toolbar.Button(cmd.label, icon);
                button.setShow("icon");
                button.getChildControl("icon").set({
                    width: 16,
                    height: 16,
                    scale: true
                });
                var tooltip = new qx.ui.tooltip.ToolTip(cmd.label, null);
                button.setToolTip(tooltip);
                button.setBlockToolTip(false);
                button.addListener("click", function () {
                    cmd.command();
                });
                _this.add(button);
            }
        });

        this.initThemes();
    };

    ToolBar.prototype.toggle = function () {
        if (this.isVisible()) {
            this.exclude();
        } else {
            this.show();
        }
    };

    ToolBar.prototype.initThemes = function () {
        var _this = this;
        this.themes.forEach(function (theme) {
            var themeButton = new qx.ui.toolbar.Button(theme);
            themeButton.addListener("click", function () {
                qx.theme.manager.Meta.getInstance().setTheme(qx.theme[theme]);
            });
            _this.add(themeButton);
        });
    };
    return ToolBar;
})(qx.ui.toolbar.ToolBar);
var SessionPage = (function (_super) {
    __extends(SessionPage, _super);
    function SessionPage(session, pos) {
        _super.call(this, session.shortName);
        this.session = session;
        this.setShowCloseButton(true);
        this.setLayout(new qx.ui.layout.Canvas());
        this.setPadding(0, 0, 0, 0);
        this.setMargin(0, 0, 0, 0);
        this.setDecorator(null);
        this.editor = new SourceEditor(session, pos);
        this.add(this.editor, { edge: 0 });
        this.createContextMenu();

        this.setChanged(false);
    }
    SessionPage.prototype.createContextMenu = function () {
        var _this = this;
        var button = this.getButton();
        var menu = new qx.ui.menu.Menu();
        var item1 = new qx.ui.menu.Button("Close");
        item1.addListener("execute", function () {
            IDE.sessionTabView.remove(_this);
        });

        var item2 = new qx.ui.menu.Button("Close other");
        var item3 = new qx.ui.menu.Button("Close all");
        menu.add(item1);
        menu.add(item2);
        menu.add(item3);
        button.setContextMenu(menu);
    };

    SessionPage.prototype.setChanged = function (changed) {
        var iconPath = "./resource/qx/icon/Tango/16/";

        if (changed) {
            this.setIcon(iconPath + "status/dialog-information.png");
        } else {
            this.setIcon("");
        }
    };
    return SessionPage;
})(qx.ui.tabview.Page);

var SessionTabView = (function (_super) {
    __extends(SessionTabView, _super);
    function SessionTabView() {
        _super.call(this);
        this.setPadding(0, 0, 0, 0);
        this.setContentPadding(1, 0, 0, 0);
    }
    SessionTabView.prototype.addSession = function (session, pos) {
        var page = new SessionPage(session, pos);
        this.add(page);
        this.setSelection([page]);
    };

    SessionTabView.prototype.navigateTo = function (session, pos) {
        var page = this.getPageBySession(session);
        this.setSelection([page]);
        if (pos)
            page.editor.moveToPosition(pos);
    };

    SessionTabView.prototype.getPageBySession = function (session) {
        var pages = this.getChildren();
        for (var i = 0; i < pages.length; i++) {
            var page = pages[i];
            if (page.session === session)
                return page;
        }
        return null;
    };

    SessionTabView.prototype.getPage = function (id) {
        var pages = this.getChildren();
        for (var i = 0; i < pages.length; i++) {
            var page = pages[i];
            console.log(page.getLabel());
            if (page.getLabel() === id) {
                return page;
            }
        }
        return null;
    };

    SessionTabView.prototype.select = function (id) {
        var page = this.getPage(id);
        if (page)
            this.setSelection([page]);
    };
    return SessionTabView;
})(qx.ui.tabview.TabView);
/**
* The toolbar for CATS
*/
var StatusBar = (function (_super) {
    __extends(StatusBar, _super);
    function StatusBar() {
        _super.call(this);
        this.init();
        this.setupListeners();
    }
    StatusBar.prototype.createButton = function (label) {
        var button = new qx.ui.toolbar.Button(label);
        button.setPadding(1, 1, 1, 1);
        button.setMargin(0, 0, 0, 0);
        return button;
    };

    StatusBar.prototype.init = function () {
        this.positionInfo = this.createButton("1:1");
        this.add(this.positionInfo);

        this.modeInfo = this.createButton("TYPESCRIPT");
        this.add(this.modeInfo);

        this.overwriteInfo = this.createButton("INSERT");
        this.add(this.overwriteInfo);

        this.busyInfo = this.createButton();
        this.add(this.busyInfo);
    };

    StatusBar.prototype.toggle = function () {
        if (this.isVisible()) {
            this.exclude();
        } else {
            this.show();
        }
    };

    // Leftover past
    StatusBar.prototype.render = function () {
        var act = IDE.activeSession;
        var session = act.editSession;
        if (session) {
            document.getElementById("sessionmode").innerText = session.getMode();
            document.getElementById("overwritemode").innerText = session.getOverwrite() ? "overwrite" : "insert";
            this.updateSelectionText();
        }
    };

    StatusBar.prototype.setupListeners = function () {
        var _this = this;
        IDE.infoBus.on("editor.overwrite", function (value) {
            if (value)
                _this.overwriteInfo.setLabel("OVERWRITE");
            else
                _this.overwriteInfo.setLabel("INESRT");
        });
    };

    StatusBar.prototype.initStatusBar = function () {
        var overwriteMode = document.getElementById("overwritemode");
        /*
        infoBus.SESSION.on("overwrite",(mode: boolean) => {
        overwriteMode.innerText = mode ? "overwrite" : "insert";
        });
        
        
        overwriteMode.onclick = (e:MouseEvent)=>{
        var s = <Cats.AceSession>IDE.activeSession;
        if (s && s.editSession) s.editSession.setOverwrite(! s.editSession.getOverwrite());
        };
        
        var aceEditor = <any>IDE.mainEditor.aceEditor;
        aceEditor.on("changeSelection", this.updateSelectionText);
        
        var sessionMode = document.getElementById("sessionmode");
        aceEditor.on("changeMode", () => {
        var mode = aceEditor.getSession().getMode();
        sessionMode.innerText = PATH.basename(mode.$id);
        });
        
        var recordingMode = document.getElementById("recordingmode");
        aceEditor.on("changeStatus", () => {
        setTimeout(() => {
        recordingMode.innerText = aceEditor.commands.recording ? "RECORDING" : "";
        }, 100);
        });
        recordingMode.onclick = (e:MouseEvent) => {
        aceEditor.commands.toggleRecording(aceEditor);
        };
        */
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
})(qx.ui.toolbar.ToolBar);
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

var args = GUI.App.argv;
if (args.indexOf("--debug") === -1) {
    console.info = function () {
    };
    console.debug = function () {
    };
}

var IDE;

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
            var i = args.indexOf("--project");
            if (i > -1)
                projectName = args[i + 1];
        }
        return projectName;
    }

    // Catch unhandled expections so they don't showup in the IDE.
    process.on('uncaughtException', function (err) {
        console.error("Uncaught exception occured: " + err);
        console.error(err.stack);
        alert(err);
    });

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

    function main(app) {
        // Instantiate the global ide
        IDE = new Cats.Ide(app.getRoot());

        var prjName = determineProject();
        if (prjName) {
            IDE.addProject(new Cats.Project(prjName));
        } else {
            IDE.restorePreviousProjects();
        }

        IDE.init();
    }

    qx.registry.registerMainMethod(main);
})(Cats || (Cats = {}));
