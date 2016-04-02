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
if ((typeof nw != 'undefined') && nw["require"])
    window["require"] = nw["require"];
if ((typeof nw != 'undefined') && nw["process"])
    window["process"] = nw["process"];
var Cats;
(function (Cats) {
    var Theme;
    (function (Theme) {
        function darken(hex, lum = 0) {
            // validate hex string
            hex = String(hex).replace(/[^0-9a-f]/gi, '');
            if (hex.length < 6) {
                hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
            }
            // convert to decimal and change luminosity
            var rgb = "#", c;
            for (var i = 0; i < 3; i++) {
                c = parseInt(hex.substr(i * 2, 2), 16);
                c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
                rgb += ("00" + c).substr(c.length);
            }
            return rgb;
        }
        var base = {
            ide_fg: "#010101",
            ide_bg: "#AABBCC",
            pane_fg: "#010101",
            pane_bg: "#FEFEFE",
            accent: "#5685D6"
        };
        qx.Theme.define("cats.theme.Color", {
            colors: {
                // main
                "background": base.pane_bg,
                "dark-blue": base.accent,
                "light-background": base.ide_bg,
                "link": base.ide_fg,
                // backgrounds
                "background-selected": "#6694E3",
                "background-selected-disabled": "#CDCDCD",
                "background-selected-dark": base.accent,
                "background-disabled": "#F7F7F7",
                "background-disabled-checked": "#BBBBBB",
                "background-pane": "#FAFBFE",
                // tabview
                "tabview-unselected": "#1866B5",
                "tabview-button-border": "#134983",
                "tabview-label-active-disabled": "#D9D9D9",
                // scrollbar
                "scrollbar-bright": "#F1F1F1",
                "scrollbar-dark": "#EBEBEB",
                // form
                "button": "#E8F0E3",
                "button-border": "#BBB",
                "button-border-hovered": "#939393",
                "invalid": "#FF0000",
                "button-box-bright": "rgba(200, 200, 200, 0.8)",
                "button-box-dark": "#E3E3E3",
                "button-box-bright-pressed": "#DDDDDD",
                "button-box-dark-pressed": "#F5F5F5",
                "border-lead": "#888888",
                // window
                "window-border": "#2E3A46",
                "window-border-inner": "#9DCBFE",
                // group box
                "white-box-border": "#BCBCBC",
                // shadows
                "shadow": qx.core.Environment.get("css.rgba") ? "rgba(0, 0, 0, 0.4)" : "#666666",
                // borders
                // 'border-main' is an alias of 'background-selected' (compatibility reasons)
                "border-main": "#6694E3",
                "border-light": "#B7B7B7",
                "border-light-shadow": "#686868",
                // separator
                "border-separator": "#808080",
                // text
                "text": "black",
                "text-disabled": "#A7A6AA",
                "text-selected": "white",
                "text-placeholder": "#CBC8CD",
                // tooltip
                "tooltip": "#FFFFE1",
                "tooltip-text": "black",
                // table
                "table-header": [242, 242, 242],
                "table-focus-indicator": [179, 217, 255],
                // used in table code
                "table-header-cell": [235, 234, 219],
                "table-row-background-focused-selected": [90, 138, 211],
                "table-row-background-focused": [221, 238, 255],
                "table-row-background-selected": [51, 94, 168],
                "table-row-background-even": "white",
                "table-row-background-odd": "white",
                "table-row-selected": [255, 255, 255],
                "table-row": [0, 0, 0],
                "table-row-line": "#EEE",
                "table-column-line": "#EEE",
                // used in progressive code
                "progressive-table-header": "#AAAAAA",
                "progressive-table-row-background-even": [250, 248, 243],
                "progressive-table-row-background-odd": [255, 255, 255],
                "progressive-progressbar-background": "gray",
                "progressive-progressbar-indicator-done": "#CCCCCC",
                "progressive-progressbar-indicator-undone": "white",
                "progressive-progressbar-percent-background": "gray",
                "progressive-progressbar-percent-text": "white"
            }
        });
        qx.Theme.define("cats.theme.ColorGrey", {
            extend: qx.theme.simple.Color,
            colors: {
                "light-background": "#B0B0B0",
                "button-box-bright": "#A0A0A0",
                "background-selected": "#666666",
                "border-main": "#666666",
                "background-selected-dark": "#555555",
                "link": "#EEEEEE"
            }
        });
    })(Theme = Cats.Theme || (Cats.Theme = {}));
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
    var Theme;
    (function (Theme) {
        qx.Theme.define("cats.theme.Decoration", {
            extend: qx.theme.simple.Decoration,
            decorations: {
                "button-box": {
                    style: {
                        radius: 3,
                        width: 1,
                        color: "button-border",
                        backgroundColor: "button-box-bright"
                    }
                }
            }
        });
    })(Theme = Cats.Theme || (Cats.Theme = {}));
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
    var Theme;
    (function (Theme) {
        qx.Theme.define("cats.theme.Font", {
            extend: qx.theme.simple.Font,
            fonts: {}
        });
    })(Theme = Cats.Theme || (Cats.Theme = {}));
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
    var Theme;
    (function (Theme) {
        function noDecorator() {
            return {
                base: true,
                style: function (states) {
                    return {
                        decorator: undefined
                    };
                }
            };
        }
        qx.Theme.define("cats.theme.Appearance", {
            extend: qx.theme.simple.Appearance,
            appearances: {
                "root": {
                    base: true,
                    style: function (states) {
                        return {
                            backgroundColor: "light-background"
                        };
                    }
                },
                "tabview-page/button": {
                    base: true,
                    style: function (states) {
                        return {
                            padding: [6, 6, 6, 6]
                        };
                    }
                },
                "splitpane": {
                    style: function (states) {
                        return {
                            backgroundColor: "light-background",
                            decorator: undefined
                        };
                    }
                },
                "toolbar": {
                    base: true,
                    style: function (states) {
                        return {
                            backgroundColor: undefined
                        };
                    }
                },
                "toolbar-button": {
                    base: true,
                    style: function (states) {
                        return {
                            padding: [3, 3],
                            margin: [5, 0]
                        };
                    }
                }
            }
        });
    })(Theme = Cats.Theme || (Cats.Theme = {}));
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
    var Theme;
    (function (Theme) {
        // Fix for the fact that workign directory is not the same directory as the HMTL file
        qx.theme.icon.Oxygen.aliases.icon = "resource/" + qx.theme.icon.Oxygen.aliases.icon;
        qx.theme.icon.Tango.aliases.icon = qx.theme.icon.Oxygen.aliases.icon;
        qx.Theme.define("cats.theme.Default", {
            meta: {
                color: cats.theme.Color,
                decoration: cats.theme.Decoration,
                font: cats.theme.Font,
                icon: qx.theme.icon.Oxygen,
                appearance: cats.theme.Appearance
            }
        });
        qx.Theme.define("cats.theme.Grey", {
            meta: {
                color: cats.theme.ColorGrey,
                decoration: cats.theme.Decoration,
                font: cats.theme.Font,
                icon: qx.theme.icon.Oxygen,
                appearance: cats.theme.Appearance
            }
        });
    })(Theme = Cats.Theme || (Cats.Theme = {}));
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
    class Attribute {
        constructor() {
        }
    }
    Cats.Attribute = Attribute;
    ;
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
/**
 * This module abstracts out the native File IO and Process access. Right now it uses Nodejs, but this
 * could be changed to another implementation like a cloud storage API.
 *
 * @TODO make this more an async api so it becomes easier to switch to other implementations
 * Perhaps after TS has implement await type of functionality.
 */
var Cats;
(function (Cats) {
    var OS;
    (function (OS) {
        var File;
        (function (File) {
            File.PATH = require("path");
            var fs = require("fs");
            var exec = require("child_process").exec;
            var glob = require("glob");
            /**
             * Very lightweight watcher for files and directories, used to inform the user of changes
             * in the underlying file system.
             *
             */
            class Watcher extends qx.event.Emitter {
                constructor() {
                    _super();
                    // Keeps track of the files and directories that are being watched 
                    this.watches = {};
                }
                /**
                 * Add a new file or directory to the watch list. If it already exists it is being ignored
                 *
                 */
                add(name) {
                    if (this.watches[name])
                        return;
                    var w = fs.watch(name, function (event, filename) {
                        console.info("Node changed " + name + " event " + event + " fileName " + filename);
                        this.emit("change", name);
                    });
                    this.watches[name] = w;
                }
                /**
                  * Add a new directory to the watch list. If it already exists it is being ignored.
                  * Only rename type of events are being propgated (so new files or deletes).
                  *
                  * Files within a directory changing size etc are not propagated.
                  *
                  */
                addDir(name) {
                    if (this.watches[name])
                        return;
                    var w = fs.watch(name, function (event, filename) {
                        console.info("Node changed " + name + " event " + event + " fileName " + filename);
                        if (event === "rename")
                            this.emit("change", name);
                    });
                    this.watches[name] = w;
                }
                /**
                 * Remove an entry from the watch list (file or directory)
                 *
                 * @param name The filepath that no longer should be watched
                 *
                 */
                remove(name) {
                    var w = this.watches[name];
                    if (w) {
                        w.close();
                        delete this.watches[name];
                    }
                }
            }
            File.Watcher = Watcher;
            /**
              * Create recursively directories if they don't exist yet
              *
              * @param path The directory path to create
              *
              */
            function mkdirRecursiveSync(path) {
                if (!fs.existsSync(path)) {
                    mkdirRecursiveSync(File.PATH.dirname(path));
                    fs.mkdirSync(path, 509); //, 0775);
                }
            }
            File.mkdirRecursiveSync = mkdirRecursiveSync;
            /**
             * Create a file watcher
             */
            function getWatcher() {
                var watcher = new Watcher();
                return watcher;
            }
            File.getWatcher = getWatcher;
            /**
             * Get the stat of a file and return them as a set of properties
             *
             */
            function getProperties(fileName) {
                if (!fileName)
                    return [];
                var stat = fs.statSync(fileName);
                var baseName = File.PATH.basename(fileName);
                var result = [
                    { key: "fileName", value: baseName },
                    { key: "filePath", value: fileName }
                ];
                for (var key in stat) {
                    if (stat.hasOwnProperty(key)) {
                        result.push({
                            key: key,
                            value: stat[key]
                        });
                    }
                }
                return result;
            }
            File.getProperties = getProperties;
            /**
             * Run an external command like a build tool and log the output
             *
             */
            function runCommand(cmd, options, logger = Cats.IDE.console) {
                if (!options.env) {
                    options.env = process.env;
                }
                var child = exec(cmd, options, function () {
                    /* ignore the buffers */
                });
                var id = child.pid;
                Cats.IDE.processTable.addProcess(child, cmd);
                child.stdout.on("data", function (data) {
                    logger.log("" + data);
                });
                child.stderr.on("data", function (data) {
                    logger.error("" + data);
                });
                child.on("close", function (code) {
                    logger.log("Done");
                });
            }
            File.runCommand = runCommand;
            /**
             * Remove a file or an empty directory
             *
             * @param path the path of the file or directory to be removed
             *
             */
            function remove(path) {
                var isFile = fs.statSync(path).isFile();
                if (isFile)
                    fs.unlinkSync(path);
                else
                    fs.rmdirSync(path);
            }
            File.remove = remove;
            /**
             * Is this instance running on the OSX platform
             */
            function isOSX() {
                return process.platform === "darwin";
            }
            File.isOSX = isOSX;
            function isWindows() {
                return process.platform === "win32";
            }
            File.isWindows = isWindows;
            /**
             * Join two paths together and return the result.
             */
            function join(a, b, native = false) {
                var result = File.PATH.join(a, b);
                if (!native)
                    result = switchToForwardSlashes(result);
                return result;
            }
            File.join = join;
            /**
             * Find a file matching a certain patterns and in the certain directory
             */
            function find(pattern, rootDir, cb) {
                var files = glob.sync(pattern, { cwd: rootDir, mark: true });
                files = files.filter(function (name) { return name.slice(-1) !== "/"; });
                cb(null, files);
            }
            File.find = find;
            /**
             * Rename a file or directory
             *
             * @param oldName the old name of the file or directory
             * @param newName the new name of the file or directory
             */
            function rename(oldName, newName) {
                fs.renameSync(oldName, newName);
            }
            File.rename = rename;
            /**
             * Determine the newLine character that should be used.
             *
             * @return Returned value is either the dos or unix newline character
             */
            function determineNewLineChar() {
                return "\n";
                /*
               try {
                   var char = IDE.project.config.codeFormat.NewLineCharacter;
                   if (char) return char;
               } catch (exp) {}
               
               if (isWindows()) return "\r\n";
               return "\n";
               */
            }
            /**
             * Write text content to a file. If a directory doesn't exist, create it
             *
             * @param name The full name of the file
             * @param value The content of the file
             * @param stat Indicate if we should return the stat values of the newly written file
             *
             */
            function writeTextFile(name, value, stat = false) {
                var newLineChar = determineNewLineChar();
                if (newLineChar !== "\n") {
                    value = value.replace(/\n/g, newLineChar);
                }
                var fileName = name;
                //fileName = PATH.resolve(IDE.project.projectDir, fileName);
                mkdirRecursiveSync(File.PATH.dirname(fileName));
                fs.writeFileSync(fileName, value, "utf8");
                if (stat)
                    return fs.statSync(fileName);
                return null;
            }
            File.writeTextFile = writeTextFile;
            /**
             * Convert backward slashes (DOS) to forward slashes (UNIX)
             *
             */
            function switchToForwardSlashes(path) {
                if (!path)
                    return path;
                return path.replace(/\\/g, "/");
            }
            File.switchToForwardSlashes = switchToForwardSlashes;
            /**
             * Sort two file entries. First sort on directory versus file and then on alphabet.
             * This is similar how most file explorers do it.
             */
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
             * Read all the files from a directory
             *
             * @param directory The directory name that should be read
             * @param sorted Should be result be sorted or not
             *
             */
            function readDir(directory, sorted = false) {
                var files = fs.readdirSync(directory);
                var result = [];
                files.forEach(function (file) {
                    var fullName = OS.File.join(directory, file);
                    var stats = fs.statSync(fullName);
                    result.push({
                        name: file,
                        fullName: fullName,
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
             * Read the content from a text file.
             *
             * @param name The full name/path of the file
             *
             */
            function readTextFile(name) {
                if (name == null)
                    return "";
                var data = fs.readFileSync(name, "utf8");
                // Use single character line returns
                data = data.replace(/\r\n?/g, "\n");
                // Remove the BOM (only MS uses BOM for UTF8)
                data = data.replace(/^\uFEFF/, '');
                return data;
            }
            File.readTextFile = readTextFile;
        })(File = OS.File || (OS.File = {}));
    })(OS = Cats.OS || (Cats.OS = {}));
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
    var glob = require("glob");
    /**
     * This class represents the total IDE. The CATS is started a single isntance will be
     * created that takes care of rendering all the components and open a project if applicable.
     */
    class Ide extends qx.event.Emitter {
        constructor() {
            _super();
            // List of different themes that are available
            this.themes = {
                cats: cats.theme.Default,
                gray: cats.theme.Grey,
                classic: qx.theme.Classic,
                indigo: qx.theme.Indigo,
                modern: qx.theme.Modern,
                simple: qx.theme.Simple
            };
            this.projects = [];
            this.debug = false;
            this.lastEntry = {};
            this.catsHomeDir = process.cwd();
            this.loadMessages();
            this.config = this.loadPreferences();
            this.recentProjects = Array.isArray(this.config.projects) ? this.config.projects : [];
            this.icons = this.loadIconsMap();
            this.configure();
            window.onpopstate = function (data) {
                if (data && data.state)
                    this.goto(data.state);
            };
            this.loadShortCuts();
        }
        loadShortCuts() {
            var fileName = Cats.OS.File.join(this.catsHomeDir, "resource/shortcuts.json");
            var c = Cats.OS.File.readTextFile(fileName);
            var shortCutSets = JSON.parse(c);
            var os = "linux";
            if (Cats.OS.File.isWindows()) {
                os = "win";
            }
            else if (Cats.OS.File.isOSX()) {
                os = "osx";
            }
            var shortCuts = shortCutSets[os];
            for (var shortCut in shortCuts) {
                var commandName = shortCuts[shortCut];
                var cmd = new qx.ui.command.Command(shortCut);
                cmd.addListener("execute", (function (commandName) {
                    Cats.Commands.CMDS[commandName].command();
                }).bind(null, commandName));
            }
        }
        /**
         * Load the icons map from the file.
         */
        loadIconsMap() {
            return JSON.parse(Cats.OS.File.readTextFile("resource/icons.json"));
        }
        setColors() {
            var manager = qx.theme.manager.Color.getInstance();
            var colors = manager.getTheme()["colors"];
            var jcolors = JSON.stringify(colors.__proto__, null, 4);
            Cats.IDE.console.log(jcolors);
            var editor = new Cats.Gui.Editor.SourceEditor();
            Cats.IDE.editorTabView.addEditor(editor, { row: 0, column: 0 });
            editor.setContent(jcolors);
            editor.setMode("ace/mode/json");
            Cats.IDE.console.log(jcolors);
            for (var c in colors) {
                var dyn = manager.isDynamic(c);
                Cats.IDE.console.log(c + ":" + colors[c] + ":" + dyn);
            }
        }
        /**
         * Load all the locale dependend messages from the message file.
         *
         * @param locale The locale you want to retrieve the messages for
         */
        loadMessages(locale = "en") {
            var fileName = "resource/locales/" + locale + "/messages.json";
            var messages = JSON.parse(Cats.OS.File.readTextFile(fileName));
            var map = {};
            for (var key in messages) {
                map[key] = messages[key].message;
            }
            qx.locale.Manager.getInstance().setLocale(locale);
            qx.locale.Manager.getInstance().addTranslation(locale, map);
        }
        goto(entry) {
            var hash = entry.hash;
            this.lastEntry = entry;
            var page = qx.core.ObjectRegistry.fromHashCode(hash);
            if (page)
                Cats.IDE.editorTabView.navigateToPage(page, entry.pos);
        }
        /**
         * Initialize the different modules within the IDE.
         *
         */
        init(rootDoc) {
            Cats.Commands.init();
            var layouter = new Cats.Gui.Layout(rootDoc);
            layouter.layout(this);
            this.menuBar = new Cats.Gui.MenuBar();
            // @TODO fix for 1.4
            this.initFileDropArea();
            this.handleCloseWindow();
        }
        /**
         * Add an entry to the history list
         */
        addHistory(editor, pos) {
            var page = this.editorTabView.getPageForEditor(editor);
            if ((this.lastEntry.hash === page.toHashCode()) && (this.lastEntry.pos === pos))
                return;
            var entry = {
                hash: page.toHashCode(),
                pos: pos
            };
            history.pushState(entry, page.getLabel());
        }
        /**
         * Configure the IDE based on the settings
         */
        configure() {
            var config = this.config;
            if (config.theme) {
                var theme = this.themes[config.theme] || this.themes.cats;
                if (theme !== qx.theme.manager.Meta.getInstance().getTheme()) {
                    qx.theme.manager.Meta.getInstance().setTheme(theme);
                }
            }
        }
        /**
         * Attach the drag n' drop event listeners to the document
         *
         * @author  LordZardeck <sean@blackfireweb.com>
         */
        initFileDropArea() {
            // Listen onto file drop events
            document.documentElement.addEventListener("drop", function (ev) this.acceptFileDrop(ev), false);
            // Prevent the browser from redirecting to the file
            document.documentElement.addEventListener("dragover", function (event) {
                event.stopPropagation();
                event.preventDefault();
                event.dataTransfer.dropEffect = "copy"; // Explicitly show this is a copy.
            }, false);
        }
        /**
         * Process the file and open it inside a new ACE session
         *
         * @param   event       {DragEvent}
         * @author  LordZardeck <sean@blackfireweb.com>
         */
        acceptFileDrop(event) {
            event.stopPropagation();
            event.preventDefault();
            // Loop over each file dropped. More than one file
            // can be added at a time
            var files = event.dataTransfer.files;
            for (var i = 0; i < files.length; i++) {
                var path = files[i].path;
                Cats.FileEditor.OpenEditor(path);
            }
        }
        /**
         * Load the projects and files that were open last time before the
         * IDE was closed.
         */
        restorePreviousProjects() {
            console.info("restoring previous project and sessions.");
            if (this.config.projects && this.config.projects.length) {
                var projectDir = this.config.projects[0];
                this.addProject(projectDir);
                if (this.config.sessions) {
                    console.info("Found previous sessions: ", this.config.sessions.length);
                    this.config.sessions.forEach(function (session) {
                        try {
                            var editor = Cats.Editor.Restore(session.type, JSON.parse(session.state));
                            if (editor)
                                Cats.IDE.editorTabView.addEditor(editor);
                        }
                        catch (err) {
                            console.error("error " + err);
                        }
                    });
                }
            }
        }
        close() {
            this.projects.forEach(function (project) project.close());
            this.fileNavigator.clear();
            this.todoList.clear();
            this.problemResult.clear();
            this.projects = [];
        }
        /**
         * Load the configuration for the IDE. If there is no configuration
         * found, create the default one to use.
         */
        loadPreferences() {
            var defaultConfig = {
                version: "1.1",
                theme: "cats",
                editor: {
                    fontSize: 13,
                    rightMargin: 100
                },
                locale: "en",
                rememberOpenFiles: false,
                sessions: [],
                projects: []
            };
            var configStr = localStorage[Ide.STORE_KEY];
            if (configStr) {
                try {
                    var config = JSON.parse(configStr);
                    if (config.version === "1.1")
                        return config;
                }
                catch (err) {
                    console.error("Error during parsing config " + err);
                }
            }
            return defaultConfig;
        }
        /**
         * Update the configuration for IDE
         *
         */
        updatePreferences(config) {
            this.config = config;
            this.emit("config", config);
            this.configure();
            this.savePreferences();
        }
        /**
         * Persist the current IDE configuration to a file
         */
        savePreferences() {
            try {
                var config = this.config;
                config.version = "1.1";
                config.sessions = [];
                config.projects = this.recentProjects;
                this.editorTabView.getEditors().forEach(function (editor) {
                    var state = editor.getState();
                    if ((state !== null) && (editor.getType())) {
                        config.sessions.push({
                            state: JSON.stringify(state),
                            type: editor.getType()
                        });
                    }
                });
                var configStr = JSON.stringify(config);
                localStorage[Ide.STORE_KEY] = configStr;
            }
            catch (err) {
                console.error(err);
            }
        }
        getProject(path) {
            for (var x = 0; x < this.projects.length; x++) {
                var project = this.projects[x];
                if (project.hasScriptFile(path))
                    return project;
            }
        }
        /**
         * Find all possible TSConfig files from a certain base directory.
         */
        getTSConfigs(dir) {
            var configs = glob.sync(dir + "/" + "**/tsconfig*.json");
            if (configs.length === 0) {
                var fileName = Cats.OS.File.PATH.join(dir, "tsconfig.json");
                Cats.OS.File.writeTextFile(fileName, "{}");
                configs = [fileName];
            }
            return configs;
        }
        refresh() {
            this.addProject(this.rootDir);
        }
        /**
         * Add a new project to the IDE
         *
         * @param projectDir the directory of the new project
         */
        addProject(projectDir) {
            this.projects = [];
            this.rootDir = Cats.OS.File.PATH.resolve(this.catsHomeDir, projectDir);
            var index = this.recentProjects.indexOf(projectDir);
            if (index !== -1) {
                this.recentProjects.splice(index, 1);
            }
            this.recentProjects.push(projectDir);
            var name = Cats.OS.File.PATH.basename(projectDir);
            document.title = "CATS | " + name;
            this.fileNavigator.setRootDir(projectDir);
            var configs = this.getTSConfigs(projectDir);
            configs.forEach(function (config) {
                var path = Cats.OS.File.PATH.resolve(config);
                path = Cats.OS.File.switchToForwardSlashes(path);
                var p = new Cats.Project(path);
                this.projects.push(p);
            });
        }
        handleCloseWindow() {
            if (typeof nw != "undefined") {
                var GUI = nw;
            }
            else {
                var GUI = require('nw.gui');
            }
            // Catch the close of the windows in order to save any unsaved changes
            var win = GUI.Window.get();
            win.on("close", function () {
                var doClose = function () {
                    Cats.IDE.savePreferences();
                    this.close(true);
                };
                try {
                    if (Cats.IDE.editorTabView.hasUnsavedChanges()) {
                        var dialog = new Cats.Gui.ConfirmDialog("There are unsaved changes!\nDo you really want to continue?");
                        dialog.onConfirm = doClose;
                        dialog.show();
                    }
                    else {
                        doClose();
                    }
                }
                catch (err) { } // lets ignore this
            });
        }
        /**
         * Quit the application. If there are unsaved changes ask the user if they really
         * want to quit.
         */
        quit() {
            var GUI = require('nw.gui');
            var doClose = function () {
                this.savePreferences();
                GUI.App.quit();
            };
            if (this.editorTabView.hasUnsavedChanges()) {
                var dialog = new Cats.Gui.ConfirmDialog("There are unsaved files!\nDo you really want to quit?");
                dialog.onConfirm = doClose;
                dialog.show();
            }
            else {
                doClose();
            }
        }
    }
    Ide.STORE_KEY = "cats.config";
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
    /**
     *  Loads the configuration for a project. If no configuration file is found, it
     *  returns sensible defaults that will be used instead.
     */
    class ProjectSettings {
        constructor(projectRoot) {
            this.projectRoot = projectRoot;
        }
        /**
         * Get the name of the configuation file
         */
        getFileName() {
            return Cats.OS.File.join(this.projectRoot, ".settings/config.json");
        }
        /**
         * Load the configuration for this project
         */
        load() {
            var fileName = this.getFileName();
            try {
                var content = Cats.OS.File.readTextFile(fileName);
                var result = JSON.parse(content);
                // Do some basic sanitizing to avoid checks in the code
                if (!result.codeFormat)
                    result.codeFormat = {};
                if (!result.compiler)
                    result.compiler = {};
                if (!result.tslint)
                    result.tslint = {};
                this.value = result;
            }
            catch (err) {
                console.info("Couldn't find project configuration, loading defaults");
                this.loadDefault();
            }
        }
        /**
         * Store the configuration
         */
        store() {
            var name = this.getFileName();
            var content = JSON.stringify(this.value, null, 4);
            Cats.OS.File.writeTextFile(name, content);
        }
        /**
         * Load the default configuration for a project
         */
        loadDefault() {
            var result = {
                version: "1.3",
                main: "index.html",
                src: null,
                buildOnSave: false,
                compilerOptions: {
                    "noLib": false,
                    "removeComments": false,
                    "noImplicitAny": false,
                    "declaration": false,
                    "sourceMap": false,
                    "target": "ES5"
                },
                tslint: {
                    useLint: false
                },
                codeFormat: {},
                documentation: {}
            };
            this.value = result;
        }
    }
    Cats.ProjectSettings = ProjectSettings;
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
     * Load the TSWorker and handles the communication with the web worker
     * This implementation uses internally a JSON-RPC style message format
     * for the communication. However it exposes a typed interface to towards
     * the outside world.
     */
    class TSWorkerProxy {
        constructor() {
            this.messageId = 0;
            this.registry = {};
            // Create a new webworker
            this.worker = new Worker("lib/tsworker.js");
            this.initWorker();
        }
        stop() {
            this.worker.terminate();
        }
        /**
         * Get the diagnostic messages for a file
         */
        getErrors(fileName, cb) {
            this.perform("getErrors", fileName, cb);
        }
        getNavigateToItems(search, cb) {
            this.perform("getNavigateToItems", search, cb);
        }
        getAllDiagnostics(cb) {
            this.perform("getAllDiagnostics", cb);
        }
        getTodoItems(cb) {
            this.perform("getTodoItems", cb);
        }
        getFormattedTextForRange(sessionName, range, cb) {
            this.perform("getFormattedTextForRange", sessionName, range, cb);
        }
        getDefinitionAtPosition(sessionName, cursor, cb) {
            this.perform("getDefinitionAtPosition", sessionName, cursor, cb);
        }
        getTypeDefinitionAtPosition(sessionName, cursor, cb) {
            this.perform("getTypeDefinitionAtPosition", sessionName, cursor, cb);
        }
        findRenameLocations(fileName, position, findInStrings, findInComments, cb) {
            this.perform("findRenameLocations", fileName, position, findInStrings, findInComments, cb);
        }
        getCrossReference(type, sessionName, cursor, cb) {
            this.perform("getCrossReference", type, sessionName, cursor, cb);
        }
        compile(cb) {
            this.perform("compile", cb);
        }
        getScriptOutline(sessionName, cb) {
            this.perform("getScriptOutline", sessionName, cb);
        }
        getInfoAtPosition(name, docPos, cb) {
            this.perform("getInfoAtPosition", name, docPos, cb);
        }
        getRenameInfo(name, docPos, cb) {
            this.perform("getRenameInfo", name, docPos, cb);
        }
        insertDocComments(fileName, position, cb) {
            this.perform("insertDocComments", fileName, position, cb);
        }
        getObjectModel(cb) {
            this.perform("getObjectModel", cb);
        }
        setConfigFile(path, content) {
            this.perform("setConfigFile", path, content, null);
        }
        addScript(fileName, content) {
            this.perform("addScript", fileName, content, null);
        }
        updateScript(fileName, content) {
            this.perform("updateScript", fileName, content, null);
        }
        getCompletions(fileName, cursor, cb) {
            this.perform("getCompletions", fileName, cursor, cb);
        }
        initialize() {
            this.perform("initialize", null);
        }
        /**
         * Invoke a method on the worker using JSON-RPC message structure
         */
        perform(method, ...data) {
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
                this.registry[this.messageId] = handler;
            }
        }
        /**
         * Clear any pending handlers
         */
        clear() {
            this.registry = {};
        }
        /**
         * Setup the message communication with the worker
         */
        initWorker() {
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
                    var handler = this.registry[id];
                    if (handler) {
                        delete this.registry[id];
                        handler(msg.error, msg.result);
                    }
                }
                else {
                    var params = msg.params;
                    var methodName = msg.method;
                    if (methodName && (methodName === "setBusy")) {
                        Cats.IDE.statusBar.setBusy(params[0], params[1]);
                    }
                    if (methodName && (methodName === "console")) {
                        console[params[0]](params[1]);
                    }
                }
            };
        }
    }
    Cats.TSWorkerProxy = TSWorkerProxy;
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
// 
var Cats;
(function (Cats) {
    var tsconfig = require("tsconfig");
    /**
     * The project hold the informaiton related to a single project. This include
     * a reference to a worker thread that does much of the TypeScript intelli sense.
     */
    class Project extends qx.event.Emitter {
        /**
         * Create a new project.
         */
        constructor(tsConfigFile) {
            _super();
            this.tsConfigFile = tsConfigFile;
            this.tsfiles = [];
            this.projectDir = Cats.OS.File.PATH.dirname(tsConfigFile);
            this.refresh();
            // if (this.config.tslint.useLint) this.linter = new Linter(this);
            // @TODO optimize only refresh in case of changes
            this.refreshInterval = setInterval(function () { this.refreshTodoList(); }, 60000);
        }
        readConfigFile(fileName) {
            try {
                return tsconfig.readFileSync(fileName);
            }
            catch (err) {
                Cats.IDE.console.error(`Error reading config file ${ + fileName);
            }
        }
        /**
         * Save the project configuration
         */
        updateConfig(config) {
            return; /*
            this.settings.value = config;
            this.emit("config", config);
            if (this.config.tslint.useLint) this.linter = new Linter(this);
            this.settings.store();
            this.iSense.setSettings(this.config.compiler, this.config.codeFormat);
            */
        }
        refreshTodoList() {
            this.iSense.getTodoItems(function (err, data) {
                Cats.IDE.todoList.setData(data, this);
            });
        }
        /**
         * Close the project
         */
        close() {
            if (Cats.IDE.editorTabView.hasUnsavedChanges()) {
                var dialog = new Cats.Gui.ConfirmDialog("You have some unsaved changes that will get lost.\n Continue anyway ?");
                dialog.onConfirm = function () {
                    this._close();
                };
            }
            else {
                this._close();
            }
        }
        /**
         * Close the project without confirmation.
         * (Internal, do not use directly)
         */
        _close() {
            // Lets clear the various output panes.
            Cats.IDE.editorTabView.closeAll();
            Cats.IDE.fileNavigator.clear();
            Cats.IDE.outlineNavigator.clear();
            Cats.IDE.problemResult.clear();
            Cats.IDE.todoList.clear();
            if (this.iSense)
                this.iSense.stop();
            clearInterval(this.refreshInterval);
            Cats.IDE.projects = [];
        }
        /**
         * Show the errors on a project level
         */
        validate(verbose = true) {
            this.iSense.getAllDiagnostics(function (err, data) {
                if (data) {
                    Cats.IDE.problemResult.setData(data, this);
                    if (data.length === 0) {
                        if (verbose) {
                            Cats.IDE.console.log(`Project ${ + this.name + } has no errors`);
                        }
                    }
                }
            });
        }
        /**
         * Build this project either with the built-in capabilities or by calling
         * an external build tool.
         */
        build() {
            Cats.IDE.console.log("Start building project " + this.name + " ...");
            if (this.config.customBuild && this.config.customBuild.command) {
                // IDE.resultbar.selectOption(2);
                var cmd = this.config.customBuild.command;
                var options = this.config.customBuild.options || { cwd: null };
                if (!options.cwd) {
                    options.cwd = this.projectDir;
                }
                var child = Cats.OS.File.runCommand(cmd, options);
            }
            else {
                this.iSense.compile(function (err, data) {
                    this.showCompilationResults(data);
                    if (data.errors && (data.errors.length > 0))
                        return;
                    var files = data.outputFiles;
                    files.forEach(function (file) {
                        if (!Cats.OS.File.PATH.isAbsolute(file.name)) {
                            file.name = Cats.OS.File.PATH.join(this.projectDir, file.name);
                            file.name = Cats.OS.File.PATH.normalize(file.name);
                        }
                        Cats.OS.File.writeTextFile(file.name, file.text);
                    });
                    Cats.IDE.console.log("Done building project " + this.name + ".");
                });
            }
        }
        /**
         *  Refresh the project and loads required artifacts
         *  again from the filesystem to be fully in sync
         */
        refresh() {
            this.config = this.readConfigFile(this.tsConfigFile);
            Cats.IDE.console.log(`Found TypeScript project configuration at ${ + this.tsConfigFile + } containing ${ + this.config.files.length + } files`);
            this.tsfiles = this.config.files;
            this.name = this.config.name || Cats.OS.File.PATH.basename(this.projectDir);
            if (!this.config.compilerOptions)
                this.config.compilerOptions = {};
            if (this.iSense)
                this.iSense.stop();
            this.iSense = new Cats.TSWorkerProxy();
            var content = JSON.stringify(this.config);
            this.iSense.setConfigFile(this.tsConfigFile, content);
            if (!this.config.compilerOptions.noLib) {
                var libFile;
                switch (this.config.compilerOptions.target) {
                    case "es6":
                    case "ES6":
                        libFile = "resource/typings/lib.es6.d.ts";
                        break;
                    case "es7":
                    case "ES7":
                        libFile = "resource/typings/lib.es7.d.ts";
                        break;
                    default:
                        libFile = "resource/typings/lib.d.ts";
                        break;
                }
                var fullName = Cats.OS.File.join(Cats.IDE.catsHomeDir, libFile);
                var libdts = Cats.OS.File.readTextFile(fullName);
                this.addScript(fullName, libdts);
            }
            this.loadProjectSourceFiles();
            this.refreshTodoList();
        }
        /**
         * Compile without actually saving the resulting files
         */
        trialCompile() {
            this.iSense.compile(function (err, data) {
                this.showCompilationResults(data);
            });
        }
        showCompilationResults(data) {
            if (data.errors && (data.errors.length > 0)) {
                Cats.IDE.problemResult.setData(data.errors, this);
                return;
            }
            Cats.IDE.problemResult.clear();
            Cats.IDE.console.log("Successfully generated " + data.outputFiles.length + " file(s).");
        }
        /**
         * Run this project either with the built-in capabilities (only for web apps) or by calling
         * and external command (for example node).
         */
        run() {
            if (this.config.customRun && this.config.customRun.command) {
                var cmd = this.config.customRun.command;
                var options = this.config.customRun.options || { cwd: null };
                if (!options.cwd) {
                    options.cwd = this.projectDir;
                }
                Cats.OS.File.runCommand(cmd, options);
            }
            else {
                var GUI = require('nw.gui');
                var main = this.config.main;
                if (!main) {
                    alert("Please specify the main html file or customRun in the project settings.");
                    return;
                }
                var startPage = this.getStartURL();
                console.info("Opening file: " + startPage);
                var win2 = GUI.Window.open(startPage, {
                    toolbar: true,
                    // nodejs: true,
                    // "new-instance": true,
                    webkit: {
                        "page-cache": false
                    }
                });
            }
        }
        /**
         * Get the URL for running the project
         */
        getStartURL() {
            var url = Cats.OS.File.join(this.projectDir, this.config.main);
            return "file://" + url;
        }
        hasScriptFile(fileName) {
            return this.tsfiles.indexOf(fileName) > -1;
        }
        updateScript(fullName, content) {
            this.iSense.updateScript(fullName, content);
        }
        addScript(fullName, content) {
            this.iSense.addScript(fullName, content);
            if (!this.hasScriptFile(fullName))
                this.tsfiles.push(fullName);
        }
        getScripts() {
            return this.tsfiles;
        }
        /**
        * Load the source files that are part of this project. Typically
        * files ending with ts, tsx or js.
        */
        loadProjectSourceFiles() {
            this.config.files.forEach(function (file) {
                try {
                    var fullName = file; // OS.File.join(this.projectDir, file);
                    var content = Cats.OS.File.readTextFile(fullName);
                    this.addScript(fullName, content);
                }
                catch (err) {
                    console.error("Got error while handling file " + fullName);
                    console.error(err);
                }
            });
        }
    }
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
/**
 * This module holds the refactoring logic for CATS
 *
 */
var Cats;
(function (Cats) {
    var Refactor;
    (function (Refactor) {
        var Range = ace.require("ace/range").Range;
        function renameOccurences(edits, name) {
            for (var i = edits.length - 1; i >= 0; i--) {
                var data = edits[i];
                var editor = Cats.FileEditor.OpenEditor(data.fileName);
                var r = data.range;
                var range = new Range(r.start.row, r.start.column, r.end.row, r.end.column);
                editor.replace(range, name);
                editor.moveToPosition(range.start);
            }
            ;
        }
        /**
         * Rename a class, interface, property or method throughout the project. It finds all references
         * and then replaces the macthed text with the new name.
         */
        function rename(fileName, project, pos) {
            project.iSense.getRenameInfo(fileName, pos, function (err, data) {
                if (!data)
                    return;
                if (!data.canRename) {
                    alert("Cannot rename the selected element");
                    return;
                }
                var dialog = new Cats.Gui.PromptDialog("Rename " + data.displayName + " into:");
                dialog.onSuccess = function (newName) {
                    project.iSense.findRenameLocations(fileName, pos, false, false, function (err, data) {
                        renameOccurences(data, newName);
                    });
                };
                dialog.show();
            });
        }
        Refactor.rename = rename;
    })(Refactor = Cats.Refactor || (Cats.Refactor = {}));
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
    /**
     * BaseClass for Editors. Editors should extend this class. The rest of the codebase is only
     * dependent on this small subset of methods and properties.
     */
    class Editor extends qx.event.Emitter {
        constructor(...args) {
            super(...args);
            /**
             * Label used on the tab page
             */
            this.label = "Untitled";
            // The project this editor belongs to
            // project:Project;
            this.properties = {};
        }
        /**
         * Does the Editor have any unsaved changes
         */
        hasUnsavedChanges() {
            return false;
        }
        static RegisterEditor(name, restoreFn) {
            Editor.Registry[name] = restoreFn;
        }
        /**
         * Save the content of the editor. Not all editors imeplement this method.
         */
        save() { }
        /**
         * Move the editor to a certain position. The position paramters depends on the type of
         * editor. For a text editorit could be a row and column, for an UML editor
         * it could be an x an dy coordinate.
         */
        moveToPosition(pos) {
            Cats.IDE.addHistory(this, pos);
        }
        /**
         * Return the type of the editor
         */
        getType() {
            return null;
        }
        /**
         * Based on the state previously returned by getState, create a new editor with identical state
         * Used during startup of CATS to restore same editors as before CATS was closed.
         */
        static Restore(type, state) {
            var restoreFn = Editor.Registry[type];
            if (!restoreFn) {
                console.error("No restore function found for " + type);
                return null;
            }
            var editor = restoreFn(state);
            return editor;
        }
        /**
         * Get the state of this editor so it can be at a later session revived. For example for
         * a source file editor this would be the fileName and current position.
         */
        getState() {
            return null; // means doesn't support persisting;
        }
        /**
         * Get a certain property from the editor
         */
        get(propertyName) {
            return this.properties[propertyName];
        }
        /**
         * Provide an additional description for the content used in in the editor.
         */
        getDescription() {
            return this.label;
        }
        /**
         * Set a property on the editor
         */
        set(propertyName, value) {
            if (!propertyName)
                return;
            this.properties[propertyName] = value;
            this.emit(propertyName, value);
        }
        /**
         * Does the editor support a certain property
         */
        has(property) {
            return this.get(property) != null;
        }
        /**
         * Command pattern implementation
         */
        executeCommand(commandName, ...args) { }
        /**
         * Provide the Qooxdoo LayouItem needed to added to this editor to the EditorPage
         */
        getLayoutItem() {
            throw new Error("Abstract Method not implemented: getLayoutItem");
        }
    }
    Editor.Registry = {};
    Cats.Editor = Editor;
    /**
     * Base class that contains some common features for editors that work on resouces on the
     * file system.
     */
    class FileEditor extends Editor {
        constructor(filePath) {
            _super();
            if (filePath)
                this.setFilePath(filePath);
        }
        updateFileInfo() {
            if (this.filePath) {
                try {
                    var prop = Cats.OS.File.getProperties(this.filePath);
                    this.set("info", prop);
                }
                catch (err) { }
            }
        }
        setFilePath(filePath) {
            this.filePath = filePath;
            this.label = Cats.OS.File.PATH.basename(this.filePath);
            this.updateFileInfo();
        }
        /**
         * Which type of files does this editor supports for editing.
         */
        static SupportsFile(fileName) {
            return false;
        }
        /**
         * @override
         */
        getDescription() {
            return this.filePath || this.label;
        }
        /**
         * Check for a given file which default editor should be opened and return an instance
         * of that.
         */
        static CreateEditor(fileName) {
            if (Cats.Gui.Editor.ImageEditor.SupportsFile(fileName))
                return new Cats.Gui.Editor.ImageEditor(fileName);
            if (Cats.Gui.Editor.SourceEditor.SupportsFile(fileName))
                return new Cats.Gui.Editor.SourceEditor(fileName);
            return null;
        }
        /**
         * Open an existing file editor or if it doesn't exist yet create
         * a new FileEditor suitable for the file selected.
         */
        static OpenEditor(fileName, pos = { row: 0, column: 0 }) {
            var editor;
            var pages = [];
            pages = Cats.IDE.editorTabView.getPagesForFile(fileName);
            if (!pages.length) {
                editor = this.CreateEditor(fileName);
                if (editor) {
                    Cats.IDE.editorTabView.addEditor(editor, pos);
                }
                else {
                    var dialog = new Cats.Gui.ConfirmDialog("No suitable editor found for this file type, open with default editor?");
                    dialog.onConfirm = function () {
                        var editor = new Cats.Gui.Editor.SourceEditor(fileName);
                        Cats.IDE.editorTabView.addEditor(editor, pos);
                    };
                    dialog.show();
                }
            }
            else {
                editor = pages[0].editor;
                Cats.IDE.editorTabView.setSelection([pages[0]]);
                if (editor.moveToPosition)
                    editor.moveToPosition(pos);
            }
            return editor;
        }
    }
    Cats.FileEditor = FileEditor;
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
     * Simple helper class to call tslint functionality
     * Ideally this should be done in the tsworker to offload the main thread, but right now
     * tslint uses require to load modules on the fly and that doesn't function in worker threads
     */
    class Linter {
        constructor(project) {
            this.project = project;
            this.TSLint = require("tslint");
        }
        convertPos(item) {
            var startPosition = item.getStartPosition().getLineAndCharacter();
            var endPosition = item.getEndPosition().getLineAndCharacter();
            return {
                start: {
                    row: startPosition.line,
                    column: startPosition.character
                },
                end: {
                    row: endPosition.line,
                    column: endPosition.character
                }
            };
        }
        /**
         * Get the configured Lint options
         */
        getOptions() {
            if (!this.lintOptions) {
                var fileName;
                if (this.project.config.tslint.lintFile) {
                    fileName = Cats.OS.File.join(this.project.projectDir, this.project.config.tslint.lintFile);
                }
                else {
                    fileName = Cats.OS.File.join(Cats.IDE.catsHomeDir, "resource/tslint.json");
                }
                var content = Cats.OS.File.readTextFile(fileName);
                var config = JSON.parse(content);
                var options = {
                    formatter: "json",
                    configuration: config,
                    rulesDirectory: "customRules/",
                    formattersDirectory: "customFormatters/"
                };
                this.lintOptions = options;
            }
            ;
            return this.lintOptions;
        }
        /**
         * Excute lint on the provided content and return the resulting warnings
         *
         */
        lint(fileName, content) {
            var ll = new this.TSLint(fileName, content, this.getOptions());
            // var result: Array<any> = JSON.parse(ll.lint().output);
            var r = [];
            var failures = ll.lint().failures;
            failures.forEach(function (failure) {
                var item = {
                    fileName: fileName,
                    message: failure.getFailure(),
                    severity: Cats.Severity.Info,
                    range: this.convertPos(failure)
                };
                r.push(item);
            });
            return r;
        }
    }
    Cats.Linter = Linter;
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
    var Commands;
    (function (Commands) {
        /**
         * List of known commands
         */
        Commands.CMDS = {
            help_devTools: null,
            help_shortcuts: null,
            help_processInfo: null,
            help_about: null,
            file_new: null,
            file_open: null,
            file_close: null,
            file_closeOther: null,
            file_closeAll: null,
            file_save: null,
            file_saveAs: null,
            file_saveAll: null,
            file_previous: null,
            file_next: null,
            edit_undo: null,
            edit_redo: null,
            edit_cut: null,
            edit_copy: null,
            edit_paste: null,
            edit_find: null,
            edit_findNext: null,
            edit_findPrev: null,
            edit_replace: null,
            edit_replaceAll: null,
            edit_toggleInvisibles: null,
            edit_toggleRecording: null,
            edit_replayMacro: null,
            edit_toggleComment: null,
            edit_indent: null,
            edit_outdent: null,
            edit_gotoLine: null,
            source_format: null,
            source_openDeclaration: null,
            source_findRef: null,
            source_findDecl: null,
            project_open: null,
            project_close: null,
            project_new: null,
            project_build: null,
            project_validate: null,
            project_run: null,
            project_debug: null,
            project_refresh: null,
            project_properties: null,
            project_quickOpen: null,
            project_classDiagram: null,
            project_configure: null,
            ide_quit: null,
            ide_theme: null,
            ide_fontSize: null,
            ide_rightMargin: null,
            ide_configure: null,
            ide_history_next: null,
            ide_history_prev: null,
            ide_toggle_toolbar: null,
            ide_toggle_statusbar: null,
            ide_toggle_context: null,
            ide_toggle_result: null
        };
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
        function register(command, fn) {
            command.command = fn;
        }
        /**
         * Call the different command implementers so they can register
         * themselves
         */
        function init() {
            for (var key in Commands.CMDS) {
                Commands.CMDS[key] = {
                    name: key,
                    label: qx.locale.Manager.tr(key),
                    command: nop
                };
            }
            Commands.EditorCommands.init(register);
            Commands.FileCommands.init(register);
            Commands.HelpCommands.init(register);
            Commands.ProjectCommands.init(register);
            Commands.IdeCommands.init(register);
        }
        Commands.init = init;
    })(Commands = Cats.Commands || (Cats.Commands = {}));
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
// This module contains all the global commands pertaining to the edit functionality
// Much of it is already provided by the Ace editor and just wraps this functionality
var Cats;
(function (Cats) {
    var Commands;
    (function (Commands) {
        function formatText() {
            var editor = Cats.IDE.editorTabView.getActiveEditor();
            if (editor)
                editor.executeCommand("formatText");
        }
        function toggleInvisibles() {
            var editor = Cats.IDE.editorTabView.getActiveEditor();
            if (editor)
                editor.executeCommand("toggleInvisibles");
        }
        function editorCommand(commandName) {
            return function (...args) {
                var editor = Cats.IDE.editorTabView.getActiveEditor();
                if (editor)
                    editor.executeCommand(commandName);
            };
        }
        class EditorCommands {
            constructor() {
            }
            static init(registry) {
                registry(Commands.CMDS.edit_undo, editorCommand("undo"));
                registry(Commands.CMDS.edit_redo, editorCommand("redo"));
                registry(Commands.CMDS.edit_indent, editorCommand("indent"));
                registry(Commands.CMDS.edit_outdent, editorCommand("outdent"));
                registry(Commands.CMDS.edit_find, editorCommand("find"));
                registry(Commands.CMDS.edit_findNext, editorCommand("findnext"));
                registry(Commands.CMDS.edit_findPrev, editorCommand("findprevious"));
                registry(Commands.CMDS.edit_replace, editorCommand("replace"));
                registry(Commands.CMDS.edit_replaceAll, editorCommand("replaceall"));
                registry(Commands.CMDS.edit_toggleComment, editorCommand("togglecomment"));
                registry(Commands.CMDS.edit_toggleRecording, editorCommand("togglerecording"));
                registry(Commands.CMDS.edit_replayMacro, editorCommand("replaymacro"));
                registry(Commands.CMDS.edit_gotoLine, editorCommand("gotoline"));
                registry(Commands.CMDS.edit_toggleInvisibles, toggleInvisibles);
                registry(Commands.CMDS.source_format, formatText);
                registry(Commands.CMDS.edit_cut, function () { document.execCommand("cut"); });
                registry(Commands.CMDS.edit_copy, function () { document.execCommand("copy"); });
                registry(Commands.CMDS.edit_paste, function () { document.execCommand("paste"); });
            }
        }
        Commands.EditorCommands = EditorCommands;
    })(Commands = Cats.Commands || (Cats.Commands = {}));
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
// This module contains all the global commands pertaining to the file functionality
var Cats;
(function (Cats) {
    var Commands;
    (function (Commands) {
        /**
         * Create a new edit session
         */
        function newFile() {
            if (Cats.IDE.projects.length === 0) {
                alert("Please open a project first.");
                return;
            }
            Cats.IDE.editorTabView.addEditor(new Cats.Gui.Editor.SourceEditor(), { row: 0, column: 0 });
        }
        /**
         * Close the active edit session
         */
        function closeFile() {
            Cats.IDE.editorTabView.close();
        }
        /**
         * Close all edit sessions
         */
        function closeAllFiles() {
            Cats.IDE.editorTabView.closeAll();
        }
        /**
         * Close all edit sessions except the active session
         */
        function closeOtherFiles() {
            Cats.IDE.editorTabView.closeOther();
        }
        /**
         * Save all edit sessions that have changed
         */
        function saveAll() {
            var editors = Cats.IDE.editorTabView.getEditors();
            editors.forEach(function (editor) {
                if (editor.hasUnsavedChanges())
                    editor.save();
            });
        }
        /**
         * Save the active sessions under a different name
         */
        function saveAs() {
            var editor = Cats.IDE.editorTabView.getActiveEditor(Cats.Gui.Editor.SourceEditor);
            if (editor) {
                var dialog = new Cats.Gui.PromptDialog("Enter new name", editor.filePath);
                dialog.onSuccess = function (newName) {
                    editor.filePath = newName;
                    editor.save();
                };
                dialog.show();
            }
        }
        /**
         * Save the active session
         */
        function saveFile() {
            var editor = Cats.IDE.editorTabView.getActiveEditor();
            if (editor)
                editor.save();
        }
        /**
         * Cycle the active editor by shifting by `delta`
         * (usually -1 or 1).
         * Internal: do not use directly.
         */
        function cycleActiveEditor(delta) {
            var page = Cats.IDE.editorTabView.getActivePage();
            if (!page)
                return;
            var pages = Cats.IDE.editorTabView.getChildren();
            var index = pages.indexOf(page);
            if (index > -1) {
                var newIndex = (index + pages.length + delta) % pages.length;
                var newPage = pages[newIndex];
                Cats.IDE.editorTabView.setSelection([newPage]);
            }
        }
        /**
         * Switch to the previous tab (cycle if necessary)
         */
        function previous() {
            cycleActiveEditor(-1);
        }
        /**
         * Switch to the next tab (cycle if necessary)
         */
        function next() {
            cycleActiveEditor(1);
        }
        class FileCommands {
            constructor() {
            }
            static init(registry) {
                registry(Commands.CMDS.file_new, newFile);
                registry(Commands.CMDS.file_close, closeFile);
                registry(Commands.CMDS.file_closeOther, closeOtherFiles);
                registry(Commands.CMDS.file_closeAll, closeAllFiles);
                registry(Commands.CMDS.file_save, saveFile);
                registry(Commands.CMDS.file_saveAll, saveAll);
                registry(Commands.CMDS.file_saveAs, saveAs);
                registry(Commands.CMDS.file_previous, previous);
                registry(Commands.CMDS.file_next, next);
            }
        }
        Commands.FileCommands = FileCommands;
    })(Commands = Cats.Commands || (Cats.Commands = {}));
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
// This module contains all the global commands pertaining to the help functionality
var Cats;
(function (Cats) {
    var Commands;
    (function (Commands) {
        /**
         * Show the available keyboard shortcuts
         */
        function showShortcuts() {
            var w = window.open("resource/keyboard_shortcuts.html", "_blank", "width=800; height=595");
        }
        /**
         * Show the version of CATS
         */
        function showAbout() {
            var packageFile = Cats.OS.File.join(Cats.IDE.catsHomeDir, "package.json");
            var package = JSON.parse(Cats.OS.File.readTextFile(packageFile));
            var version = package.version;
            alert("Code Assisitant for TypeScript, version " + version + "\nCreated by JBaron\n");
        }
        /**
         * Open the webkit developers tools for debugging etc.
         */
        function showDevTools() {
            Cats.getNWWindow().showDevTools();
            // var GUI = require('nw.gui');
            // GUI.Window.get().showDevTools();
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
        class HelpCommands {
            constructor() {
            }
            static init(registry) {
                registry(Commands.CMDS.help_about, showAbout);
                registry(Commands.CMDS.help_devTools, showDevTools);
                registry(Commands.CMDS.help_shortcuts, showShortcuts);
                registry(Commands.CMDS.help_processInfo, showProcess);
            }
        }
        Commands.HelpCommands = HelpCommands;
    })(Commands = Cats.Commands || (Cats.Commands = {}));
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
 * This module contains all the global commands pertaining to IDE functionality
 */
var Cats;
(function (Cats) {
    var Commands;
    (function (Commands) {
        /**
         * Quit CATS
         */
        function quit() {
            Cats.IDE.quit();
        }
        function toggleView(component) {
            if (component.isVisible()) {
                component.exclude();
            }
            else {
                component.show();
            }
        }
        function next() {
            history.forward();
        }
        function prev() {
            history.back();
        }
        function configureIde() {
            var w = new Cats.Gui.IdePreferencesDialog(Cats.IDE.config);
            w.show();
        }
        /**
         * Register the IDE commands
         */
        class IdeCommands {
            constructor() {
            }
            static init(registry) {
                registry(Commands.CMDS.ide_quit, quit);
                registry(Commands.CMDS.ide_toggle_toolbar, function () toggleView(Cats.IDE.toolBar));
                registry(Commands.CMDS.ide_toggle_statusbar, function () toggleView(Cats.IDE.statusBar));
                registry(Commands.CMDS.ide_toggle_result, function () toggleView(Cats.IDE.resultPane));
                registry(Commands.CMDS.ide_toggle_context, function () toggleView(Cats.IDE.contextPane));
                registry(Commands.CMDS.ide_configure, configureIde);
                registry(Commands.CMDS.ide_history_next, next);
                registry(Commands.CMDS.ide_history_prev, prev);
            }
        }
        Commands.IdeCommands = IdeCommands;
    })(Commands = Cats.Commands || (Cats.Commands = {}));
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
// This module contains all the global commands pertaining to project related functionality
var Cats;
(function (Cats) {
    var Commands;
    (function (Commands) {
        /**
         * Close all open projects
         */
        function closeAllProjects() {
            Cats.IDE.close();
        }
        /**
         * Close the project
         */
        function closeProject() {
            Cats.IDE.close();
        }
        /**
         * Run the project
         */
        function runProject() {
            Cats.IDE.projects.forEach(function (project) project.run());
        }
        ;
        /**
         * Show a class diagram of the project.
         */
        function showDiagram() {
            // if (IDE.project) IDE.editorTabView.addEditor(new Gui.Editor.UMLEditor("Class Diagram"));
        }
        /**
         * Shows a quick open dialog for the project.
         */
        function quickOpen(project) {
            var dialog = new Cats.Gui.QuickOpenDialog(project);
            dialog.show();
        }
        /**
         * Compile all the sources without actually saving them
         * to see if there are any issues popping up.
         */
        function validateProject() {
            Cats.IDE.projects.forEach(function (project) project.validate());
        }
        /**
         * Build the project
         */
        function buildProject() {
            Cats.IDE.projects.forEach(function (project) project.build());
        }
        /**
         * Provide the user with an UI to configure the project settings
         */
        function configureProject(project) {
            var w = new Cats.Gui.ProjectSettingsDialog(project);
            w.show();
        }
        /**
         * Refresh the project so everything is in sync again. This is needed when more complex
         * filesystem changes are done (like renaming TS files etc).
         */
        function refreshProject() {
            Cats.IDE.refresh();
            // IDE.projects.forEach((project) => project.refresh());
        }
        /**
         * Open a project. If current windows doesn't have a project yet, opene there.
         * Otherwise open the project in a new window.
         *
         * @TODO: for a new project provide template capabilities
         */
        function newProject() {
            var chooser = document.getElementById('fileDialog');
            chooser.onchange = function (evt) {
                Cats.IDE.addProject(this.value);
            };
            chooser.click();
        }
        ;
        /**
         * Open a project. If current windows doesn't have a project yet, opene there.
         * Otherwise open the project in a new window
         */
        function openProject() {
            var chooser = document.getElementById('fileDialog');
            chooser.onchange = function (evt) {
                Cats.IDE.addProject(this.value);
            };
            chooser.click();
        }
        ;
        class ProjectCommands {
            constructor() {
            }
            static init(registry) {
                registry(Commands.CMDS.project_open, openProject);
                registry(Commands.CMDS.project_new, newProject);
                registry(Commands.CMDS.project_close, closeProject);
                registry(Commands.CMDS.project_build, buildProject);
                registry(Commands.CMDS.project_validate, validateProject);
                registry(Commands.CMDS.project_refresh, refreshProject);
                registry(Commands.CMDS.project_run, runProject);
                // registry(CMDS.project_debug, label: "Debug Project",null, icon: "debug.png" });
                registry(Commands.CMDS.project_quickOpen, quickOpen);
                registry(Commands.CMDS.project_classDiagram, showDiagram);
                registry(Commands.CMDS.project_configure, configureProject);
            }
        }
        Commands.ProjectCommands = ProjectCommands;
    })(Commands = Cats.Commands || (Cats.Commands = {}));
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
    var Gui;
    (function (Gui) {
        var Editor;
        (function (Editor) {
            var langTools = ace.require("ace/ext/language_tools");
            var snippetCompleter = langTools.snippetCompleter;
            var keyWordCompleter = langTools.keyWordCompleter;
            var ID_REGEX = /[a-zA-Z_0-9\$\-\u00A2-\uFFFF]/;
            function retrievePrecedingIdentifier(text, pos, regex) {
                regex = regex || ID_REGEX;
                var buf = [];
                for (var i = pos - 1; i >= 0; i--) {
                    if (regex.test(text[i]))
                        buf.push(text[i]);
                    else
                        break;
                }
                return buf.reverse().join("");
            }
            Editor.retrievePrecedingIdentifier = retrievePrecedingIdentifier;
            ;
            function getCompleters(editor, memberCompletionOnly) {
                if (memberCompletionOnly && editor.isTypeScript()) {
                    return [new TSCompleter(editor)];
                }
                if (editor.isTypeScript()) {
                    return [new TSCompleter(editor), snippetCompleter];
                }
                return [keyWordCompleter, snippetCompleter];
            }
            Editor.getCompleters = getCompleters;
            class TSCompleter {
                constructor(editor) {
                    this.editor = editor;
                }
                getCompletions(editor, session, pos, prefix, cb) {
                    var fileName = this.editor.filePath;
                    if (!fileName)
                        cb(null, []);
                    this.editor.project.iSense.getCompletions(fileName, pos, function (err, completes) {
                        var result = [];
                        if (!completes)
                            return result;
                        completes.forEach(function (entry) {
                            result.push({ caption: entry.name, value: entry.name, meta: entry.kind });
                        });
                        cb(null, result);
                    });
                }
            }
            Editor.TSCompleter = TSCompleter;
        })(Editor = Gui.Editor || (Gui.Editor = {}));
    })(Gui = Cats.Gui || (Cats.Gui = {}));
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
    var Gui;
    (function (Gui) {
        var Editor;
        (function (Editor) {
            var HashHandler = ace.require('ace/keyboard/hash_handler').HashHandler;
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
            /**
             * This class takes care of the autocomplete popup and deals with
             * the key events and filtering of the results while you are typing
             */
            class AutoCompletePopup extends qx.ui.popup.Popup {
                constructor() {
                    _super(new qx.ui.layout.Flow());
                    this.cursorPos = 0;
                    // this.setDecorator(null);
                    this.setPadding(0, 0, 0, 0);
                    this.setMargin(0, 0, 0, 0);
                    this.setWidth(300);
                    this.setHeight(200);
                    this.createList();
                    this.initHandler();
                    this.changeListener = function (ev) this.onChange(ev);
                    this.addListener("disappear", this.hidePopup, this);
                }
                /**
                 * Create the list that hold the completions
                 */
                createList() {
                    var self = this;
                    // Creates the list and configures it
                    var list = new qx.ui.list.List(null).set({
                        scrollbarX: "off",
                        selectionMode: "single",
                        // height: 280,
                        width: 300,
                        labelPath: "caption",
                        iconPath: "meta",
                        iconOptions: {
                            converter: function (data) {
                                var icon = Cats.IDE.icons.kind[data] || Cats.IDE.icons.kind["default"];
                                return icon;
                            }
                        }
                    });
                    list.setDecorator(null);
                    this.add(list);
                    this.list = list;
                    this.list.addListener("click", this.insertSelectedItem.bind(this));
                }
                /**
                 * Get the text between cursor and start
                 */
                getInputText() {
                    var cursor = this.sourceEditor.getPosition();
                    var text = this.sourceEditor.getLine(cursor.row).slice(0, cursor.column);
                    // console.log("input text:" + text);
                    var matches = text.match(/[a-zA-Z_0-9\$]*$/);
                    if (matches && matches[0])
                        return matches[0];
                    else
                        return "";
                }
                match_strict(text, completion) {
                    if (!text)
                        return true;
                    if (completion.indexOf(text) === 0)
                        return true;
                    return false;
                }
                match_forgiven(text, completion) {
                    if (!text)
                        return true;
                    if (completion.indexOf(text) > -1)
                        return true;
                    return false;
                }
                /**
                 * Filter the available completions based on the users text input
                 * so far.
                 */
                updateFilter() {
                    var text = this.getInputText();
                    if (text)
                        text = text.toLowerCase();
                    var matchFunction = this.match_forgiven;
                    if (Cats.IDE.config.editor.completionMode) {
                        var methodName = "match_" + Cats.IDE.config.editor.completionMode;
                        if (this[methodName])
                            matchFunction = this[methodName];
                    }
                    var lastItem = this.listModel.getItem(this.listModel.getLength() - 1);
                    var counter = 0;
                    this.filtered = [];
                    var delegate = {
                        filter: function (data) {
                            var value = data.getCaption().toLowerCase();
                            var result = matchFunction(text, value);
                            if (result)
                                this.filtered.push(data);
                            if (data === lastItem) {
                                // IDE.console.log("filtered items: " + this.filtered.length);
                                // @TODO check for selected
                                var selection = this.list.getSelection().getItem(0);
                                if (!(selection && (this.filtered.indexOf(selection) > -1))) {
                                    this.cursorPos = 0;
                                    this.moveCursor(0);
                                }
                            }
                            return result;
                        }
                    };
                    this.list.setDelegate(delegate);
                }
                moveCursor(row) {
                    this.cursorPos += row;
                    var len = this.filtered.length - 1;
                    if (this.cursorPos > len)
                        this.cursorPos = len;
                    if (this.cursorPos < 0)
                        this.cursorPos = 0;
                    var item = this.filtered[this.cursorPos];
                    this.list.resetSelection();
                    this.list.getSelection().push(item);
                    // IDE.console.log("Cursor:" + this.cursorPos);
                }
                insertSelectedItem() {
                    var current = this.list.getSelection().getItem(0);
                    ;
                    if (current) {
                        var inputText = this.getInputText();
                        for (var i = 0; i < inputText.length; i++) {
                            this.editor.remove("left");
                        }
                        if (current.getMeta() === "snippet") {
                            this.editor.insertSnippet(current.getSnippet());
                        }
                        else {
                            this.editor.insert(current.getValue());
                        }
                    }
                    this.hidePopup();
                }
                /**
                 * Setup the different keybindings that would go to the
                 * popup window and not the editor
                 */
                initHandler() {
                    this.handler = new HashHandler();
                    this.handler.bindKey("Home", function () { this.moveCursor(-10000); });
                    this.handler.bindKey("End", function () { this.moveCursor(10000); });
                    this.handler.bindKey("Down", function () { this.moveCursor(1); });
                    this.handler.bindKey("PageDown", function () { this.moveCursor(10); });
                    this.handler.bindKey("Up", function () { this.moveCursor(-1); });
                    this.handler.bindKey("PageUp", function () { this.moveCursor(-10); });
                    this.handler.bindKey("Esc", function () { this.hidePopup(); });
                    this.handler.bindKey("Return|Tab", function () { this.insertSelectedItem(); });
                }
                isExecutable(kind) {
                    if (kind === "method" || kind === "function" || kind === "constructor")
                        return true;
                    return false;
                }
                /**
                 * Show the popup and make sure the keybinding is in place
                 *
                 */
                showPopup(completions) {
                    if (this.list.isSeeable() || (completions.length === 0))
                        return;
                    var cursor = this.editor.getCursorPosition();
                    var coords = this.editor.renderer.textToScreenCoordinates(cursor.row, cursor.column);
                    this.editor.keyBinding.addKeyboardHandler(this.handler);
                    this.moveTo(coords.pageX, coords.pageY + 20);
                    var rawData = [];
                    completions.forEach(function (completion) {
                        var extension = "";
                        if (this.isExecutable(completion.meta)) {
                            completion.caption += "()";
                            if (completion.value)
                                completion.value += "()";
                        }
                        if ((!completion.caption) && (!completion.name)) {
                            console.log(completion);
                            return;
                        }
                        rawData.push({
                            caption: completion.caption || completion.name,
                            meta: completion.meta,
                            snippet: completion.snippet || "",
                            value: completion.value || ""
                        });
                    });
                    this.listModel = qx.data.marshal.Json.createModel(rawData, false);
                    this.list.setModel(this.listModel);
                    this.updateFilter();
                    this.cursorPos = 0;
                    this.moveCursor(0);
                    this.show();
                    // this.editor.commands.on('afterExec', (e) => { this.onChange2(e);});
                    this.editor.getSession().on("change", this.changeListener);
                }
                /**
                 * Hide the popup and remove all keybindings
                 */
                hidePopup() {
                    this.editor.keyBinding.removeKeyboardHandler(this.handler);
                    this.exclude();
                    this.editor.getSession().removeListener('change', this.changeListener);
                    this.editor.focus();
                }
                /**
                 * Determines if the specified character may be part of a JS identifier
                 */
                static isJsIdentifierPart(ch) {
                    ch |= 0; //tell JIT that ch is an int
                    return ch >= 97 && ch <= 122 //a-z
                        || ch >= 65 && ch <= 90 //A-Z
                        || ch >= 48 && ch <= 57 //0-9
                        || ch === 95 //_
                        || ch === 36 //$
                        || ch > 127; //non-ASCII letter. Not accurate, but good enough for autocomplete
                }
                onChange2(e) {
                    var key = e.args || "";
                    alert(key);
                    if ((key == null) || (!AutoCompletePopup.isJsIdentifierPart(key.charCodeAt(0)))) {
                        this.hidePopup();
                        return;
                    }
                    this.updateFilter();
                }
                /**
                 * Check wether the typed character is reason to stop
                 * the auto-complete task
                 */
                onChange(ev) {
                    var key = ev.lines.join("");
                    if ((key == null) || (!AutoCompletePopup.isJsIdentifierPart(key.charCodeAt(0)))) {
                        this.hidePopup();
                        return;
                    }
                    // hack to get the cursor updated before we render
                    // TODO find out how to force update without a timer delay
                    setTimeout(function () { this.updateFilter(); }, 0);
                }
                /**
                 * The method called form the editor to start the code completion process.
                 */
                complete(memberCompletionOnly, sourceEditor, editor) {
                    this.editor = editor;
                    this.sourceEditor = sourceEditor;
                    var session = editor.getSession();
                    var pos = editor.getCursorPosition();
                    var line = session.getLine(pos.row);
                    var prefix = Editor.retrievePrecedingIdentifier(line, pos.column);
                    // this.base = session.doc.createAnchor(pos.row, pos.column - prefix.length);
                    var matches = [];
                    var completers = Editor.getCompleters(sourceEditor, memberCompletionOnly);
                    var total = completers.length;
                    completers.forEach(function (completer, i) {
                        completer.getCompletions(editor, session, pos, prefix, function (err, results) {
                            total--;
                            if (!err)
                                matches = matches.concat(results);
                            if (total === 0) {
                                this.showPopup(matches);
                            }
                        });
                    });
                }
            }
            Editor.AutoCompletePopup = AutoCompletePopup;
        })(Editor = Gui.Editor || (Gui.Editor = {}));
    })(Gui = Cats.Gui || (Cats.Gui = {}));
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
    var Gui;
    (function (Gui) {
        var Editor;
        (function (Editor) {
            var Range = ace.require("ace/range").Range;
            var modelist = ace.require('ace/ext/modelist');
            var autoCompletePopup = new Editor.AutoCompletePopup();
            var registryEntryName = "SourceEditor";
            function restoreState(state) {
                var editor = new SourceEditor(state.fileName);
                editor.moveToPosition(state.pos);
                return editor;
            }
            Cats.Editor.RegisterEditor(registryEntryName, restoreState);
            /**
             * Wrapper around the ACE editor. The rest of the code base should not use
             * ACE editor directly so it can be changed for another editor if required.
             */
            class SourceEditor extends Cats.FileEditor {
                constructor(fileName) {
                    _super(fileName);
                    this.status = {};
                    this.unsavedChanges = false;
                    this.pendingWorkerUpdate = false;
                    this.createEditSession();
                    this.createWidget();
                    this.contextMenu = new Editor.SourceEditorContextMenu(this);
                    this.widget.setContextMenu(this.contextMenu);
                    Cats.IDE.on("config", function () { this.configureEditor(); });
                }
                get project() {
                    return Cats.IDE.getProject(this.filePath);
                }
                createWidget() {
                    var widget = new qx.ui.core.Widget();
                    widget.setDecorator(null);
                    widget.setFont(null);
                    widget.setAppearance(null);
                    widget.addListenerOnce("appear", function () {
                        var container = widget.getContentElement().getDomElement();
                        container.style.lineHeight = "normal";
                        this.aceEditor = this.createAceEditor(container);
                        this.configureEditor();
                        if (this.pendingPosition)
                            this.moveToPosition(this.pendingPosition);
                    }, this);
                    widget.addListener("appear", function () {
                        // this.session.activate();
                        this.informWorld();
                        if (this.aceEditor)
                            this.aceEditor.focus();
                    });
                    // session.on("errors", this.showErrors, this);
                    widget.addListener("resize", function () { this.resizeHandler(); });
                    this.widget = widget;
                }
                createEditSession() {
                    this.editSession = new Editor.EditSession(this);
                    this.editSession.on("changeAnnotation", function () {
                        this.emit("errors", this.editSession.getMaxAnnotationLevel());
                    });
                    this.editSession.on("changeOverwrite", function () {
                        this.informWorld();
                    });
                    this.editSession.on("change", function () {
                        this.setHasUnsavedChanges(true);
                    });
                }
                getAceEditor() {
                    return this.aceEditor;
                }
                setHasUnsavedChanges(value) {
                    if (value === this.unsavedChanges)
                        return;
                    this.unsavedChanges = value;
                    this.emit("changed", value);
                }
                getState() {
                    return {
                        fileName: this.filePath,
                        pos: this.getPosition()
                    };
                }
                static RestoreState(state) {
                    var editor = new SourceEditor(state.fileName);
                    editor.moveToPosition(state.pos);
                    return editor;
                }
                executeCommand(name, ...args) {
                    switch (name) {
                        case 'toggleInvisibles':
                            this.aceEditor.setShowInvisibles(!this.aceEditor.getShowInvisibles());
                            break;
                        case 'formatText':
                            this.formatText();
                            break;
                        default:
                            this.aceEditor.execCommand(name);
                            break;
                    }
                }
                isTypeScript() {
                    return this.editSession.isTypeScript() && this.project.hasScriptFile(this.filePath);
                }
                getType() {
                    return registryEntryName;
                }
                static SupportsFile(fileName) {
                    var name = Cats.OS.File.PATH.basename(fileName);
                    var mode = modelist.getModeForPath(name);
                    if (mode && mode.supportsFile(name))
                        return true;
                    return false;
                }
                /**
                 * Get the Qooxdoo Widget that can be added to the parent
                 */
                getLayoutItem() {
                    return this.widget;
                }
                formatText() {
                    var r = null;
                    if (this.isTypeScript()) {
                        var range = this.aceEditor.selection.getRange();
                        if (!range.isEmpty())
                            r = { start: range.start, end: range.end };
                        this.project.iSense.getFormattedTextForRange(this.filePath, r, function (err, result) {
                            if (!err)
                                this.setContent(result);
                        });
                    }
                }
                setMode(mode) {
                    this.editSession.setMode(mode);
                    this.informWorld();
                }
                /**
                 * Replace the current content of this editor with new content and indicate
                 * wether the cursor should stay on the same position
                 *
                 */
                setContent(content, keepPosition = true) {
                    var pos;
                    if (keepPosition)
                        pos = this.getPosition();
                    this.editSession.setValue(content);
                    if (pos)
                        this.moveToPosition(pos);
                }
                /**
                 * Update the configuaration of the editor.
                 *
                 */
                configureEditor() {
                    var config = Cats.IDE.config.editor;
                    if (config.fontSize)
                        this.aceEditor.setFontSize(config.fontSize + "px");
                    if (config.rightMargin)
                        this.aceEditor.setPrintMarginColumn(config.rightMargin);
                    if (config.theme)
                        this.aceEditor.setTheme("ace/theme/" + config.theme);
                }
                /**
                 * Inform the world about current status of the editor
                 *
                 */
                informWorld() {
                    var value = this.getPosition();
                    var label = (value.row + 1) + ":" + (value.column + 1);
                    this.status = {
                        overwrite: this.editSession.getOverwrite(),
                        mode: Cats.OS.File.PATH.basename(this.editSession.mode).toUpperCase(),
                        position: label
                    };
                    this.emit("status", this.status);
                }
                replace(range, content) {
                    this.editSession.replace(range, content);
                }
                getLine(row = this.getPosition().row) {
                    return this.editSession.getLine(row);
                }
                /**
                 * Get the content of the editor
                 *
                 */
                getContent() {
                    return this.editSession.getValue();
                }
                /**
                 * Make sure the ace editor is resized when the Qooxdoo container is resized.
                 *
                 */
                resizeHandler() {
                    if (!this.widget.isSeeable()) {
                        this.addListenerOnce("appear", function () { this.resizeEditor(); });
                    }
                    else {
                        this.resizeEditor();
                    }
                }
                resizeEditor() {
                    setTimeout(function () {
                        this.aceEditor.resize();
                    }, 100);
                }
                clearSelectedTextMarker() {
                    if (this.selectedTextMarker) {
                        this.editSession.removeMarker(this.selectedTextMarker);
                        this.selectedTextMarker = null;
                    }
                }
                addTempMarker(r) {
                    this.clearSelectedTextMarker();
                    var range = new Range(r.start.row, r.start.column, r.end.row, r.end.column);
                    this.selectedTextMarker = this.editSession.addMarker(range, "ace_selected-word", "text");
                }
                moveToPosition(pos) {
                    if (!this.aceEditor) {
                        this.pendingPosition = pos;
                    }
                    else {
                        this.aceEditor.clearSelection();
                        _super.prototype.moveToPosition(pos);
                        if (pos) {
                            if (pos.start) {
                                this.aceEditor.moveCursorToPosition(pos.start);
                            }
                            else {
                                this.aceEditor.moveCursorToPosition(pos);
                            }
                        }
                        setTimeout(function () {
                            this.aceEditor.centerSelection();
                            if (pos && pos.start)
                                this.addTempMarker(pos);
                        }, 100);
                    }
                }
                /**
                 * Get the position of the cursor within the content.
                 *
                 */
                getPosition() {
                    if (this.aceEditor)
                        return this.aceEditor.getCursorPosition();
                }
                /**
                  * Get the Position based on mouse x,y coordinates
                  */
                getPositionFromScreenOffset(ev) {
                    var x = ev.offsetX;
                    var y = ev.offsetY;
                    // var cursor = this.aceEditor.renderer.pixelToScreenCoordinates(x, y);
                    // IDE.console.log(JSON.stringify(cursor));
                    // var docPos2 = this.aceEditor.getSession().screenToDocumentPosition(cursor.row, cursor.col);
                    // IDE.console.log(JSON.stringify(docPos2));
                    var r = this.aceEditor.renderer;
                    // var offset = (x + r.scrollLeft - r.$padding) / r.characterWidth;
                    var offset = (x - r.$padding) / r.characterWidth;
                    // @BUG: Quickfix for strange issue with top
                    var correction = r.scrollTop ? 7 : 0;
                    var row = Math.floor((y + r.scrollTop - correction) / r.lineHeight);
                    var col = Math.round(offset);
                    var docPos = this.aceEditor.getSession().screenToDocumentPosition(row, col);
                    // IDE.console.log(JSON.stringify(docPos));
                    return docPos;
                }
                /**
                 * Perform code autocompletion.
                 */
                showAutoComplete(memberCompletionOnly = false) {
                    // Any pending changes that are not yet send to the worker?
                    if (this.isTypeScript()) {
                        this.project.iSense.updateScript(this.filePath, this.getContent());
                    }
                    autoCompletePopup.complete(memberCompletionOnly, this, this.aceEditor);
                }
                liveAutoComplete(e) {
                    if (!this.isTypeScript())
                        return;
                    var text = e.args || "";
                    if ((e.command.name === "insertstring") && (text === ".")) {
                        this.showAutoComplete(true);
                    }
                }
                /**
                 * Create a new isntance of the ACE editor and append is to a dom element
                 *
                 */
                createAceEditor(rootElement) {
                    var editor = ace.edit(rootElement);
                    editor["$blockScrolling"] = Infinity; // surpresses ACE warning
                    editor.setSession(this.editSession);
                    editor.on("changeSelection", function () {
                        this.clearSelectedTextMarker();
                        this.informWorld();
                    });
                    new Editor.TSTooltip(this);
                    new Gui.TSHelper(this, this.editSession);
                    editor.commands.on('afterExec', function (e) { this.liveAutoComplete(e); });
                    editor.setOptions({
                        enableSnippets: true
                    });
                    editor.commands.addCommands([
                        {
                            name: "autoComplete",
                            bindKey: {
                                win: "Ctrl-Space",
                                mac: "Ctrl-Space"
                            },
                            exec: function () { this.showAutoComplete(); }
                        },
                        {
                            name: "gotoDeclaration",
                            bindKey: {
                                win: "F12",
                                mac: "F12"
                            },
                            exec: function () { this.contextMenu.gotoDeclaration(); }
                        },
                        {
                            name: "save",
                            bindKey: {
                                win: "Ctrl-S",
                                mac: "Command-S"
                            },
                            exec: function () { this.save(); }
                        }
                    ]);
                    return editor;
                }
                hasUnsavedChanges() {
                    return this.unsavedChanges;
                }
                /**
                 * Persist this session to the file system. This overrides the NOP in the base class
                 */
                save() {
                    this.editSession.save();
                }
            }
            Editor.SourceEditor = SourceEditor;
        })(Editor = Gui.Editor || (Gui.Editor = {}));
    })(Gui = Cats.Gui || (Cats.Gui = {}));
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
    var Gui;
    (function (Gui) {
        var Editor;
        (function (Editor) {
            var registryEntryName = "ImageEditor";
            function restoreState(state) {
                var editor = new ImageEditor(state.fileName);
                return editor;
            }
            Cats.Editor.RegisterEditor(registryEntryName, restoreState);
            /**
             * Simple image viewer for image files. Uses canvas to render the image.
             */
            class ImageEditor extends Cats.FileEditor {
                constructor(fileName) {
                    _super(fileName);
                    this.canvas = new qx.ui.embed.Canvas();
                    this.set("status", { mode: "IMAGE" });
                    this.loadImage(fileName);
                    this.createContextMenu();
                }
                getLayoutItem() {
                    return this.canvas;
                }
                executeCommand(name, ...args) {
                    return false;
                }
                save() { }
                loadImage(url) {
                    var image = new Image();
                    image.onload = function () { this.drawImage(image); };
                    image.src = url;
                }
                getState() {
                    return {
                        fileName: this.filePath
                    };
                }
                getType() {
                    return registryEntryName;
                }
                resizeIfRequired(image) {
                    if (image.width > this.canvas.getCanvasWidth()) {
                        this.canvas.setCanvasWidth(image.width);
                    }
                    if (image.height > this.canvas.getCanvasHeight()) {
                        this.canvas.setCanvasHeight(image.height);
                    }
                }
                drawImage(image) {
                    this.resizeIfRequired(image);
                    this.canvas.getContext2d().drawImage(image, this.canvas.getCanvasWidth() / 2 - image.width / 2, this.canvas.getCanvasHeight() / 2 - image.height / 2);
                }
                createContextMenu() {
                    var menu = new qx.ui.menu.Menu();
                    ImageEditor.BackgroundColors.forEach(function (color) {
                        var button = new qx.ui.menu.Button("Background " + color);
                        button.addListener("execute", function () {
                            this.canvas.setBackgroundColor(color);
                        });
                        menu.add(button);
                    });
                    this.canvas.setContextMenu(menu);
                }
                static SupportsFile(fileName) {
                    var supportedExt = [".png", ".gif", ".jpg", ".jpeg"];
                    var ext = Cats.OS.File.PATH.extname(fileName);
                    return supportedExt.indexOf(ext) > -1;
                }
                moveToPosition(pos) { }
            }
            ImageEditor.BackgroundColors = ["white", "black", "grey"];
            Editor.ImageEditor = ImageEditor;
        })(Editor = Gui.Editor || (Gui.Editor = {}));
    })(Gui = Cats.Gui || (Cats.Gui = {}));
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
    var Gui;
    (function (Gui) {
        var Editor;
        (function (Editor) {
            var dagre;
            /**
             * Draws an UML diagram
             * @TODO Canvas is not really suited due to limits in size. Better to use SVG based drawing
             */
            class UMLEditor extends Cats.Editor {
                constructor(name) {
                    _super();
                    this.backgroundColors = ["white", "black", "grey"];
                    this.unsavedChanges = false;
                    this.widget = new qx.ui.embed.Html(null);
                    this.label = name;
                    if (!dagre)
                        dagre = require("dagre");
                    this.widget.setOverflow("auto", "auto");
                    this.widget.addListenerOnce("appear", function () {
                        var container = this.widget.getContentElement().getDomElement();
                        var div = document.createElement("div");
                        div.style.height = "100%";
                        div.style.width = "100%";
                        container.appendChild(div);
                        UMLEditor.LoadResources(function () {
                            this.render(div);
                            this.widget.focus();
                        });
                    });
                }
                getLayoutItem() {
                    return this.widget;
                }
                /**
                 * Dynamically load the resources so the overhead ony occurs when using
                 * the UML feature and not at startup of CATS
                 *
                 */
                static LoadResources(cb) {
                    if (UMLEditor.ResourcesLoaded) {
                        cb();
                    }
                    else {
                        var resourceLoader = new Cats.Util.ResourceLoader();
                        resourceLoader.loadResources(UMLEditor.Resources1, function () {
                            resourceLoader.loadResources(UMLEditor.Resources2, function () {
                                UMLEditor.ResourcesLoaded = true;
                                cb();
                            });
                        });
                    }
                }
                getMaxSize(size) {
                    if (size > 30000)
                        return 30000;
                    return size;
                }
                format(str, maxlen = 20) {
                    if (!str)
                        return str;
                    return str.substr(-maxlen);
                }
                render(container, project = Cats.IDE.projects[0]) {
                    var nodes = {};
                    var g = new dagre.Digraph();
                    var max = 100;
                    Cats.IDE.console.log("Creating class diagram ...");
                    project.iSense.getObjectModel(function (err, model) {
                        if (!model)
                            return;
                        var count = 0;
                        model.forEach(function (entry) {
                            count++;
                            if (count > max)
                                return;
                            var name = entry.name;
                            var c;
                            if (entry.type === "class")
                                c = new UMLClass();
                            if (entry.type === "enum")
                                c = new UMLClass();
                            if (entry.type === "interface")
                                c = new UMLInterfaceExtended();
                            c.setName(this.format(name));
                            entry.operations.forEach(function (mName) {
                                c.addOperation(this.format(mName + "()", 25));
                            });
                            entry.attributes.forEach(function (attr) {
                                var t = attr.type || "unknown";
                                c.addAttribute(this.format(attr.name + ":" + attr.type, 25));
                            });
                            g.addNode(name, { width: c.getWidth(), height: c.getHeight() });
                            nodes[name] = c;
                        });
                        var rels = [];
                        model.forEach(function (entry) {
                            var curr = nodes[entry.name];
                            if (!curr)
                                return;
                            entry.extends.forEach(function (ext) {
                                var base = nodes[ext];
                                if (base) {
                                    var generalization = new UMLGeneralization({ b: base, a: curr });
                                    g.addEdge(null, ext, entry.name);
                                    rels.push(generalization);
                                }
                            });
                            entry.implements.forEach(function (ext) {
                                var base = nodes[ext];
                                if (base) {
                                    var realization = new UMLRealization({ b: base, a: curr });
                                    g.addEdge(null, ext, entry.name);
                                    rels.push(realization);
                                }
                            });
                        });
                        var layout = dagre.layout().run(g);
                        var graph = layout.graph();
                        var classDiagram = new UMLClassDiagram({
                            id: container,
                            width: this.getMaxSize(graph.width + 10),
                            height: this.getMaxSize(graph.height + 10)
                        });
                        // Draw all the nodes
                        layout.eachNode(function (name, value) {
                            var n = nodes[name];
                            var x = value.x - (n.getWidth() / 2);
                            var y = value.y - (n.getHeight() / 2);
                            n.setPosition(x, y);
                            classDiagram.addElement(n);
                            // IDE.console.log("Adding node " + name + " at " + x + ":" + y);
                        });
                        // Now add the relations
                        rels.forEach(function (rel) { classDiagram.addElement(rel); });
                        //Draw the diagram
                        classDiagram.draw();
                        //Interaction is possible (editable)
                        classDiagram.interaction(true);
                        this.diagram = classDiagram;
                        Cats.IDE.console.log("Finished creating class diagram.");
                    });
                    return;
                }
                /**
                 * Simple context menu that allows to set backgroud color
                 */
                createContextMenu() {
                    var menu = new qx.ui.menu.Menu();
                    this.backgroundColors.forEach(function (color) {
                        var button = new qx.ui.menu.Button("Background " + color);
                        button.addListener("execute", function () {
                            this.widget.setBackgroundColor(color);
                        });
                        menu.add(button);
                    });
                    this.widget.setContextMenu(menu);
                }
                replace(range, content) { }
                getContent() { return null; }
                setContent(content, keepPosition = true) { }
                updateWorld() { }
                moveToPosition(pos) { }
            }
            UMLEditor.Resources1 = [
                "resource/uml/css/UDStyle.css",
                "resource/uml/UDCore.js"
            ];
            UMLEditor.Resources2 = [
                "resource/uml/UDModules.js"
            ];
            UMLEditor.ResourcesLoaded = false;
            Editor.UMLEditor = UMLEditor;
        })(Editor = Gui.Editor || (Gui.Editor = {}));
    })(Gui = Cats.Gui || (Cats.Gui = {}));
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
    var Gui;
    (function (Gui) {
        var Editor;
        (function (Editor) {
            class TSTooltip extends qx.ui.tooltip.ToolTip {
                constructor(editor) {
                    _super("");
                    this.editor = editor;
                    this.mouseX = 0;
                    this.mouseY = 0;
                    this.exclude();
                    this.setRich(true);
                    this.setMaxWidth(500);
                    var elem = editor.getLayoutItem().getContentElement().getDomElement(); // TODo find scroller child
                    elem.onmousemove = this.onMouseMove.bind(this);
                    elem.onmouseout = function () {
                        if (this.isSeeable())
                            this.exclude();
                        clearTimeout(this.mouseMoveTimer);
                    };
                }
                /**
                 * Show info at Screen location
                 */
                showToolTipAt(ev) {
                    var docPos = this.editor.getPositionFromScreenOffset(ev);
                    this.editor.project.iSense.getInfoAtPosition(this.editor.filePath, docPos, function (err, data) {
                        if ((!data) || (!data.description))
                            return;
                        var tip = data.description;
                        if (data.docComment) {
                            tip += '<hr>' + data.docComment;
                        }
                        if (tip && tip.trim()) {
                            this.setLabel(tip);
                            this.moveTo(ev.x, ev.y + 10);
                            this.show();
                        }
                    });
                }
                onMouseMove(ev) {
                    var oldX = this.mouseX, oldY = this.mouseY;
                    this.mouseX = ev.clientX;
                    this.mouseY = ev.clientY;
                    // Some UA may fire mousemove events periodically even if the mouse is not moving,
                    // so we must not hide tooltip in this situation to avoid blink.
                    if ((this.mouseX - oldX === 0) && (this.mouseY - oldY === 0))
                        return;
                    else if (this.isSeeable())
                        this.exclude();
                    if (!this.editor.isTypeScript())
                        return;
                    clearTimeout(this.mouseMoveTimer);
                    var elem = ev.srcElement;
                    if (elem.className !== "ace_content")
                        return;
                    this.mouseMoveTimer = setTimeout(function () {
                        this.showToolTipAt(ev);
                    }, 800);
                }
            }
            Editor.TSTooltip = TSTooltip;
        })(Editor = Gui.Editor || (Gui.Editor = {}));
    })(Gui = Cats.Gui || (Cats.Gui = {}));
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
    var Gui;
    (function (Gui) {
        var Editor;
        (function (Editor) {
            /**
             * The context menu for the source editor. This menu provides basic
             * navigation and refactoring options
             */
            class SourceEditorContextMenu extends qx.ui.menu.Menu {
                constructor(editor) {
                    _super();
                    this.editor = editor;
                    this.init();
                }
                createContextMenuItem(name, fn, self) {
                    var button = new qx.ui.menu.Button(name);
                    button.addListener("execute", fn, self);
                    return button;
                }
                getIsense() {
                    return this.editor.project.iSense;
                }
                gotoDeclaration() {
                    this.getIsense().getDefinitionAtPosition(this.editor.filePath, this.getPos(), function (err, data) {
                        if (data && data.fileName)
                            Cats.FileEditor.OpenEditor(data.fileName, data.range.start);
                    });
                }
                gotoTypeDeclaration() {
                    this.getIsense().getTypeDefinitionAtPosition(this.editor.filePath, this.getPos(), function (err, data) {
                        if (data && data.fileName)
                            Cats.FileEditor.OpenEditor(data.fileName, data.range.start);
                    });
                }
                getPos() {
                    return this.editor.getPosition();
                }
                getInfoAt(type) {
                    this.getIsense().getCrossReference(type, this.editor.filePath, this.getPos(), function (err, data) {
                        if (!data)
                            return;
                        var resultTable = new Gui.ResultTable();
                        var page = Cats.IDE.resultPane.addPage("info_tab", resultTable);
                        page.setShowCloseButton(true);
                        resultTable.setData(data, this.editor.project);
                    });
                }
                findReferences() {
                    return this.getInfoAt("getReferencesAtPosition");
                }
                findOccurences() {
                    return this.getInfoAt("getOccurrencesAtPosition");
                }
                findImplementors() {
                    return this.getInfoAt("getImplementorsAtPosition");
                }
                insertDoc() {
                    this.getIsense().insertDocComments(this.editor.filePath, this.getPos(), function (err, data) {
                        if (data)
                            this.editor.getAceEditor().insert(data.newText);
                    });
                }
                bookmark() {
                    var dialog = new Gui.PromptDialog("Please provide bookmark name");
                    dialog.onSuccess = function (name) {
                        var pos = this.getPos();
                        Cats.IDE.bookmarks.addData({
                            message: name,
                            fileName: this.editor.filePath,
                            range: {
                                start: pos,
                                end: pos
                            }
                        });
                    };
                    dialog.show();
                }
                refactor() {
                    var pos = this.getPos();
                    Cats.Refactor.rename(this.editor.filePath, this.editor.project, pos);
                }
                createModeMenu() {
                    var menu = new qx.ui.menu.Menu();
                    var modes = ace.require('ace/ext/modelist').modes;
                    modes.forEach(function (entry) {
                        var button = new qx.ui.menu.Button(entry.caption);
                        button.addListener("execute", function () {
                            this.editor.setMode(entry.mode);
                        });
                        menu.add(button);
                    });
                    return menu;
                }
                init() {
                    if (this.editor.project) {
                        this.add(this.createContextMenuItem("Goto Declaration", this.gotoDeclaration, this));
                        this.add(this.createContextMenuItem("Goto Type Declaration", this.gotoTypeDeclaration, this));
                        this.add(this.createContextMenuItem("Find References", this.findReferences, this));
                        this.add(this.createContextMenuItem("Find Occurences", this.findOccurences, this));
                        // this.add(this.createContextMenuItem("Find Implementations", this.findImplementors, this));
                        this.addSeparator();
                        this.add(this.createContextMenuItem("Rename", this.refactor, this));
                        this.addSeparator();
                        this.add(this.createContextMenuItem("Insert doc comments", this.insertDoc, this));
                        this.addSeparator();
                    }
                    this.add(this.createContextMenuItem("Bookmark", this.bookmark, this));
                    var modeMenu = this.createModeMenu();
                    var b = new qx.ui.menu.Button("Modes", null, null, modeMenu);
                    this.add(b);
                }
            }
            Editor.SourceEditorContextMenu = SourceEditorContextMenu;
        })(Editor = Gui.Editor || (Gui.Editor = {}));
    })(Gui = Cats.Gui || (Cats.Gui = {}));
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
    var Gui;
    (function (Gui) {
        var Editor;
        (function (Editor) {
            var UndoManager = ace.require("ace/undomanager").UndoManager;
            var modelist = ace.require('ace/ext/modelist');
            /**
             * Wrapper class around the Ace EditSession that takes care of the common
             * features for all edit sessions.
             *
             */
            class EditSession extends ace.EditSession {
                constructor(editor) {
                    // @TODO solve nicely
                    _super("", "ace/mode/text");
                    this.editor = editor;
                    this.filePath = editor.filePath;
                    // super("","");
                    var content = "";
                    this.version = 0;
                    this.mode = this.calculateMode();
                    if (this.filePath) {
                        content = Cats.OS.File.readTextFile(this.filePath);
                        this.checkIfNewTSFile(this.filePath, content);
                    }
                    _super.prototype.setMode(this.mode);
                    _super.prototype.setValue(content);
                    this.setNewLineMode("unix");
                    // this.configureAceSession(IDE.project.config); @TODO
                    this.setUndoManager(new UndoManager());
                    // @TODO
                    // project.on("config", (c:ProjectConfiguration) => { this.configureAceSession(c); });
                    this.on("change", function () { this.version++; });
                }
                get project() {
                    return Cats.IDE.getProject(this.filePath);
                }
                checkIfNewTSFile(filePath, content) {
                    if (this.isTypeScript() && this.project && (!this.project.hasScriptFile(filePath))) {
                        var addDialog = new Gui.ConfirmDialog("Not yet part of project, add it now?");
                        addDialog.onConfirm = function () {
                            this.project.addScript(filePath, content);
                        };
                        addDialog.show();
                    }
                }
                calculateMode() {
                    if (!this.editor.filePath)
                        return "ace/mode/text";
                    var mode = modelist.getModeForPath(this.editor.filePath).mode;
                    return mode;
                }
                /**
                 * Check if there are any errors for this session and show them.
                 */
                showAnnotations(result) {
                    if (!result)
                        return;
                    var annotations = [];
                    result.forEach(function (error) {
                        annotations.push({
                            row: error.range.start.row,
                            column: error.range.start.column,
                            type: error.severity,
                            text: error.message + ""
                        });
                    });
                    _super.prototype.setAnnotations(annotations);
                }
                /**
                  * Is the editor currently containing TypeScript content. This determines wehther all kind
                  * of features are enabled or not.
                  */
                isTypeScript() {
                    var ext = Cats.OS.File.PATH.extname(this.filePath);
                    return (((ext === ".ts") || (ext === ".tsx")) && this.project);
                    // return this.mode === "ace/mode/typescript";
                }
                setMode(mode) {
                    this.mode = mode;
                    _super.prototype.setMode(mode);
                }
                /**
                 * Determine the maximum level of severity within a set of annotations.
                 *
                 * @return Possible return values are info, warning or error
                 */
                getMaxAnnotationLevel() {
                    var annotations = this.getAnnotations();
                    if ((!annotations) || (annotations.length === 0))
                        return "";
                    var result = "info";
                    annotations.forEach(function (annotation) {
                        if (annotation.type === "error")
                            result = "error";
                        if (annotation.type === "warning" && result === "info")
                            result = "warning";
                    });
                    return result;
                }
                configureAceSession(projectConfig) {
                    var config = projectConfig.codeFormat;
                    if (config.TabSize)
                        this.setTabSize(config.TabSize);
                    if (config.ConvertTabsToSpaces != null)
                        this.setUseSoftTabs(config.ConvertTabsToSpaces);
                }
                /**
                 * Persist this session to the file system. This overrides the NOP in the base class
                 */
                save() {
                    var filePath = this.editor.filePath;
                    var content = this.getValue();
                    if (filePath == null) {
                        var dir = Cats.OS.File.join(Cats.IDE.rootDir, "/");
                        var dialog = new Gui.PromptDialog("Please enter the file name", dir);
                        dialog.onSuccess = function (filePath) {
                            filePath = Cats.OS.File.switchToForwardSlashes(filePath);
                            this.editor.setFilePath(filePath);
                            this.mode = this.calculateMode();
                            this.setMode(this.mode);
                            if (this.isTypeScript()) {
                                var addDialog = new Gui.ConfirmDialog("Not yet part of project, refresh project now?");
                                addDialog.onConfirm = function () {
                                    this.project.refresh();
                                };
                                addDialog.show();
                            }
                            this.save();
                        };
                        dialog.show();
                    }
                    else {
                        Cats.OS.File.writeTextFile(filePath, content);
                        this.editor.setHasUnsavedChanges(false);
                        this.editor.updateFileInfo();
                        Cats.IDE.console.log("Saved file " + filePath);
                        if (this.project) {
                            this.project.updateScript(filePath, content);
                            this.project.validate(false);
                            if (this.project.config.buildOnSave) {
                                Cats.Commands.CMDS.project_build.command();
                            }
                            else {
                                if (this.project.config.compileOnSave) {
                                    this.project.validate(true);
                                }
                            }
                        }
                    }
                }
            }
            Editor.EditSession = EditSession;
        })(Editor = Gui.Editor || (Gui.Editor = {}));
    })(Gui = Cats.Gui || (Cats.Gui = {}));
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
    var Gui;
    (function (Gui) {
        function handleClick() {
            var line = this.innerText;
            var sections = line.split("(");
            var fileName = sections[0];
            var location = sections[1].split(")")[0].split(",");
            // fileName = OS.File.PATH.resolve(IDE.project.projectDir, fileName);
            fileName = Cats.OS.File.switchToForwardSlashes(fileName);
            Cats.FileEditor.OpenEditor(fileName, {
                row: parseInt(location[0], 10) - 1,
                column: parseInt(location[1], 10) - 1
            });
        }
        /**
         * Basic logging widget that can be used to write
         * logging information that are of interest to the user.
         *
         */
        class ConsoleLog extends qx.ui.embed.Html {
            constructor() {
                _super(null);
                this.printTime = true;
                this.tsRef = /ts\([0-9]+,[0-9]+\):/i;
                this.setPadding(2, 2, 2, 2);
                this.setDecorator(null);
                this.setOverflow("auto", "auto");
                this.addListenerOnce("appear", function () {
                    this.container = this.getContentElement().getDomElement();
                });
                this.setContextMenu(this.createContextMenu());
                this.setFocusable(false);
            }
            addBody(parent, prefix, line) {
                if (line.search(this.tsRef) === -1) {
                    parent.innerText = prefix + line;
                }
                else {
                    parent.innerText = prefix;
                    var a = document.createElement("a");
                    a.href = "#";
                    a.onclick = handleClick;
                    a.innerText = line;
                    parent.appendChild(a);
                }
            }
            insertLine(prefix, line, severity) {
                if (line.trim()) {
                    var elem = document.createElement("span"); // HTMLAnchorElement|HTMLSpanElement;
                    this.addBody(elem, prefix, line);
                    if (severity === 2)
                        elem.style.color = "red";
                    if (severity === 1)
                        elem.style.color = "green";
                    this.container.appendChild(elem);
                }
                this.container.appendChild(document.createElement('BR'));
            }
            print(msg, severity) {
                this.container.scrollTop = this.container.scrollHeight;
                this.fireDataEvent("contentChange", null);
                if (this.container) {
                    var prefix = "";
                    if (this.printTime) {
                        var dt = new Date();
                        prefix = dt.toLocaleTimeString() + " ";
                    }
                    var lines = msg.split("\n");
                    lines.forEach(function (line) {
                        this.insertLine(prefix, line, severity);
                    });
                    this.container.scrollTop = this.container.scrollHeight;
                }
            }
            /**
             * Log a message to the console widget. This should only be used for
             * logging mesages that are useful to the enduser (= developer) and not for
             * debug information.
             *
             */
            log(msg) {
                this.print(msg, 0);
            }
            info(msg) {
                this.print(msg, 1);
            }
            error(msg) {
                this.print(msg, 2);
            }
            createContextMenu() {
                var menu = new qx.ui.menu.Menu();
                var item1 = new qx.ui.menu.Button("Clear Output");
                item1.addListener("execute", function () { this.clear(); });
                menu.add(item1);
                var item2 = new qx.ui.menu.Button("Toggle Print Time");
                item2.addListener("execute", function () { this.printTime = !this.printTime; });
                menu.add(item2);
                return menu;
            }
            clear() {
                if (this.container)
                    this.container.innerHTML = "";
            }
        }
        Gui.ConsoleLog = ConsoleLog;
    })(Gui = Cats.Gui || (Cats.Gui = {}));
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
    var Gui;
    (function (Gui) {
        /**
         * File navigator for CATS that displays a directories and its subdirectories
         * and files as a tree.
         */
        class FileNavigator extends qx.ui.tree.VirtualTree {
            constructor() {
                _super(null, "label", "children");
                this.rootTop = {
                    label: "qx-cats",
                    fullPath: "",
                    directory: true,
                    children: [{
                            label: "Loading",
                            icon: "loading",
                            directory: false
                        }],
                    loaded: false
                };
                this.directoryModels = {};
                this.parents = {};
                this.setDecorator(null);
                this.setPadding(0, 0, 0, 0);
                var contextMenu = new Gui.FileContextMenu(this);
                this.setContextMenu(contextMenu);
                this.setupDragAndDrop();
            }
            /**
             * Enable drag and drop on the FileNavigator
             * @TODO finalized implementation
             */
            setupDragAndDrop() {
                this.setDraggable(true);
                this.setDroppable(true);
                // @TODO Issue because <cntrl> is also right click.            
                // this.setSelectionMode("multi");
                this.addListener("dragstart", function (e) {
                    Cats.IDE.console.log("drag started. Not yet implemented!!!");
                    e.addAction("move");
                    e.addType("tree-items");
                    e.addData("tree-items", this.getSelection());
                }, this);
                this.addListener("drop", function (e) {
                    var target = e.getOriginalTarget();
                    var itemlist = [];
                    for (var i = 0; i < this.getSelection().getLength(); i++) {
                        itemlist.push(this.getSelection().getItem(i));
                    }
                    var model = target.getModel();
                    for (var k = 0; k < itemlist.length; k++) {
                        var item = itemlist[k];
                        // (<any>this)._moveItem(item, model); // item = source model =  target 
                        Cats.IDE.console.log("moved item. Not yet implemented!!!");
                        console.log(item);
                    }
                }, this);
            }
            setRootDir(dir) {
                this.projectDir = dir;
                this.watcher = Cats.OS.File.getWatcher();
                this.watcher.on("change", function (dir) {
                    var parent = this.parents[dir];
                    if (parent)
                        this.readDir(parent);
                });
                var directory = dir;
                this.rootTop.fullPath = directory;
                this.rootTop.label = Cats.OS.File.PATH.basename(directory);
                var root = qx.data.marshal.Json.createModel(this.rootTop, true);
                this.setModel(root);
                this.setupDelegate();
                this.setup();
                console.info("Icon path:" + this.getIconPath());
                this.addListener("dblclick", function () {
                    var file = this.getSelectedFile();
                    if (file) {
                        Cats.FileEditor.OpenEditor(file.getFullPath());
                    }
                });
                // Force a relaod after a close
                /*
                this.addListener("close", (event) => {
                    var data = event.getData();
                    data.setLoaded(false);
                });
                */
            }
            clear() {
                this.setModel(null);
            }
            getSelectedFile() {
                var item = this.getSelection().getItem(0);
                if (!item)
                    return null;
                if (!item.getDirectory)
                    return null;
                if (!item.getDirectory()) {
                    return item;
                }
                return null;
            }
            /**
             * Get an icon for a file based on its mimetype
             */
            getIconForMimeType(mimetype) {
                var icon = Cats.IDE.icons.mimetype[mimetype] || Cats.IDE.icons.mimetype["text/plain"];
                return icon;
            }
            setup() {
                this.setIconPath("");
                this.setIconOptions({
                    converter: function (value, model) {
                        if (value.getDirectory()) {
                            return this.getIconForMimeType("inode/directory");
                        }
                        var mimetype = Cats.Util.MimeTypeFinder.lookup(value.getLabel());
                        return this.getIconForMimeType(mimetype);
                    }
                });
            }
            setupDelegate() {
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
            }
            /**
             * Read the files from a directory
             * @param directory The directory name that should be read
             */
            readDir(parent) {
                var directory = parent.getFullPath();
                this.watcher.addDir(directory);
                this.parents[directory] = parent;
                parent.getChildren().removeAll();
                var entries = [];
                try {
                    entries = Cats.OS.File.readDir(directory, true);
                }
                catch (err) { }
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
            }
        }
        Gui.FileNavigator = FileNavigator;
    })(Gui = Cats.Gui || (Cats.Gui = {}));
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
    var Gui;
    (function (Gui) {
        /**
         * Provide an outline view of the source code. When you click on an entry within the outline,
         * the editor will jump the corresponding position.
         */
        class OutlineNavigator extends qx.ui.tree.VirtualTree {
            constructor() {
                _super(null, "label", "kids");
                this.setDecorator(null);
                this.setPadding(0, 0, 0, 0);
                this.setHideRoot(true);
                this.setDecorator(null);
                this.addListener("click", function () {
                    var item = this.getSelectedItem();
                    if (item && item.getPos) {
                        var position = JSON.parse(qx.util.Serializer.toJson(item.getPos()));
                        Cats.IDE.editorTabView.navigateToPage(this.page, position);
                    }
                });
                this.setIconPath("kind");
                this.setIconOptions({
                    converter: function (value) {
                        var icon = Cats.IDE.icons.kind[value] || Cats.IDE.icons.kind["default"];
                        return icon;
                    }
                });
                Cats.IDE.editorTabView.onChangeEditor(this.register.bind(this));
            }
            register(editor, page) {
                if (this.editor) {
                    this.editor.off("outline", this.updateOutline, this);
                }
                this.page = page;
                if (editor) {
                    this.editor = editor;
                    editor.on("outline", this.updateOutline, this);
                    this.updateOutline(editor.get("outline"));
                }
                else {
                    this.clear();
                    this.editor = null;
                }
            }
            getSelectedItem() {
                var item = this.getSelection().getItem(0);
                return item;
            }
            /**
             * Clear the content of the outline navigator
             *
             */
            clear() {
                this.setModel(null);
            }
            expandAll(root, count = 0) {
                if (root && root.getKids) {
                    this.openNode(root);
                    var children = root.getKids();
                    count += children.length;
                    if (count > OutlineNavigator.MAX_DEFAULT_OPEN)
                        return count;
                    for (var i = 0; i < children.length; i++) {
                        var child = children.getItem(i);
                        count = this.expandAll(child, count);
                        if (count > OutlineNavigator.MAX_DEFAULT_OPEN)
                            return count;
                    }
                }
                return count;
            }
            /**
             * Lets check the worker if something changed in the outline of the source.
             * But lets not call this too often.
             */
            updateOutline(data = []) {
                // IDE.console.log("Received outline info:" + data.length);
                var root = {
                    label: "root",
                    kids: data,
                    kind: ""
                };
                this.setModel(qx.data.marshal.Json.createModel(root, false));
                this.expandAll(this.getModel());
            }
        }
        OutlineNavigator.MAX_DEFAULT_OPEN = 200;
        Gui.OutlineNavigator = OutlineNavigator;
    })(Gui = Cats.Gui || (Cats.Gui = {}));
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
    var Gui;
    (function (Gui) {
        /**
         * This table displays data that is related to a file. Can be
         * search results of error messages or even bookmarks.
         */
        class ResultTable extends qx.ui.table.Table {
            constructor(headers = ["tableheader_message", "tableheader_project", "tableheader_file", "tableheader_position"]) {
                var tableModel = new qx.ui.table.model.Simple();
                var columns = [];
                headers.forEach(function (header) columns.push(this.tr(header)));
                tableModel.setColumns(columns);
                tableModel.setData([]);
                var custom = {
                    tableColumnModel: function () {
                        return new qx.ui.table.columnmodel.Resize();
                    }
                };
                _super(tableModel, custom);
                this.setStatusBarVisible(false);
                this.setDecorator(null);
                this.projectData = {};
                this.setPadding(0, 0, 0, 0);
                this.addListener("click", function () {
                    var selectedRow = this.getSelectionModel().getLeadSelectionIndex();
                    var data = this.getTableModel().getRowData(selectedRow);
                    if (data && data[4])
                        Cats.FileEditor.OpenEditor(data[4], data[5]);
                });
                this.setContextMenu(this.createContextMenu());
            }
            rangeToPosition(range) {
                if (range) {
                    return (range.start.row + 1) + ":" + (range.start.column + 1);
                }
                else {
                    return "";
                }
            }
            /**
             * Clear all the data from the table
             */
            clear() {
                var model = this.getTableModel();
                this.projectData = {};
                model.setData([]);
            }
            convert(row) {
                return [
                    row.message,
                    row.fileName || "",
                    this.rangeToPosition(row.range),
                    row.range
                ];
            }
            areEmpty(...args) {
                for (var i = 0; i < args.length; i++) {
                    var arr = args[i];
                    if (arr && (arr.length > 0))
                        return false;
                }
                return true;
            }
            /**
             * @TODO finalize the logic to show results of multiple project in one table
             */
            flatten() {
                var result = [];
                var baseDir = Cats.IDE.rootDir;
                Object.keys(this.projectData).forEach(function (key) {
                    var projectData = this.projectData[key];
                    var projectName = projectData.project ? projectData.project.name : "default";
                    projectData.data.forEach(function (row) {
                        var fileName = row.fileName || "";
                        if (fileName)
                            fileName = Cats.OS.File.PATH.relative(baseDir, fileName);
                        result.push([
                            row.message,
                            projectName,
                            fileName,
                            this.rangeToPosition(row.range),
                            row.fileName || "",
                            row.range
                        ]);
                    });
                });
                return result;
            }
            /**
             * Set the data for this table
             */
            setData(data, project) {
                var key = project ? project.tsConfigFile : "default";
                if (this.areEmpty(this.projectData[key], data))
                    return;
                this.fireDataEvent("contentChange", null);
                this.projectData[key] = {
                    data: data,
                    project: project
                };
                var rows = this.flatten();
                var model = this.getTableModel();
                model.setData(rows);
                // this.getSelectionModel().resetSelection();
            }
            /**
             * Add a row to the table
             */
            addData(row) {
                var model = this.getTableModel();
                model.addRows([this.convert(row)]);
            }
            createContextMenu() {
                var menu = new qx.ui.menu.Menu();
                var item1 = new qx.ui.menu.Button("Clear Output");
                item1.addListener("execute", function () { this.clear(); });
                menu.add(item1);
                return menu;
            }
        }
        Gui.ResultTable = ResultTable;
    })(Gui = Cats.Gui || (Cats.Gui = {}));
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
    var Gui;
    (function (Gui) {
        /**
         * Generic tab used for all the tabs in CATS except for the edirtor tabs.
         * Takes care of basic look & feel and some simple features
         */
        class TabViewPage extends qx.ui.tabview.Page {
            constructor(id, widget, tooltipText) {
                _super(_super.prototype.tr(id), Cats.IDE.icons.tab[id]);
                this.id = id;
                // Hints if this tab want to get selected if its content changes 
                this.autoSelect = false;
                this.setLayout(new qx.ui.layout.Canvas());
                if (tooltipText) {
                    var button = this.getButton();
                    var tooltip = new qx.ui.tooltip.ToolTip(tooltipText);
                    button.setToolTip(tooltip);
                    button.setBlockToolTip(false);
                }
                if (widget) {
                    this.add(widget, { edge: 0 });
                    widget.addListener("contentChange", function () {
                        if (this.autoSelect) {
                            var elem = document.activeElement;
                            this.select();
                            setTimeout(function () {
                                if (elem)
                                    elem.focus();
                            }, 10);
                        }
                    });
                }
            }
            /**
             * Convenience method to select this page in the tab view.
             */
            select() {
                var tabView = this.getLayoutParent().getLayoutParent();
                tabView.setSelection([this]);
            }
        }
        Gui.TabViewPage = TabViewPage;
        /**
         * Used for all the tabs execpt the session tab
         */
        class TabView extends qx.ui.tabview.TabView {
            constructor() {
                _super();
                this.setPadding(0, 0, 0, 0);
                this.setContentPadding(0, 0, 0, 0);
                this.createContextMenu();
            }
            createContextMenu() {
                var menu = new qx.ui.menu.Menu();
                var directions = ["top", "left", "right", "bottom"];
                directions.forEach(function (dir) {
                    var item = new qx.ui.menu.Button(this.tr(dir));
                    item.addListener("execute", function () { this.setBarPosition(dir); });
                    menu.add(item);
                });
                var mainmenu = new qx.ui.menu.Menu();
                var b = new qx.ui.menu.Button("Tab layout", null, null, menu);
                mainmenu.add(b);
                this.setContextMenu(mainmenu);
            }
            /**
             * Add a new Page to the tab Viewx
             */
            addPage(id, widget, tooltipText) {
                var tab = new TabViewPage(id, widget, tooltipText);
                this.add(tab);
                this.setSelection([tab]);
                return tab;
            }
        }
        Gui.TabView = TabView;
    })(Gui = Cats.Gui || (Cats.Gui = {}));
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
    var Gui;
    (function (Gui) {
        /**
         * The toolbar for CATS
         */
        class ToolBar extends qx.ui.toolbar.ToolBar {
            constructor() {
                _super();
                this.commands = [
                    Cats.Commands.CMDS.file_new,
                    Cats.Commands.CMDS.file_close,
                    Cats.Commands.CMDS.file_closeAll,
                    null,
                    Cats.Commands.CMDS.file_save,
                    Cats.Commands.CMDS.file_saveAll,
                    Cats.Commands.CMDS.file_saveAs,
                    null,
                    Cats.Commands.CMDS.project_open,
                    Cats.Commands.CMDS.project_close,
                    Cats.Commands.CMDS.project_build,
                    Cats.Commands.CMDS.project_run,
                    Cats.Commands.CMDS.project_refresh,
                    null,
                    Cats.Commands.CMDS.edit_undo,
                    Cats.Commands.CMDS.edit_redo,
                    Cats.Commands.CMDS.edit_find,
                    Cats.Commands.CMDS.edit_replace,
                    Cats.Commands.CMDS.edit_indent,
                    Cats.Commands.CMDS.edit_outdent,
                    //       Cats.Commands.CMDS.edit_toggleComment
                    null,
                    Cats.Commands.CMDS.ide_history_prev,
                    Cats.Commands.CMDS.ide_history_next
                ];
                this.init();
            }
            createButton(cmd) {
                var icon = Cats.IDE.icons.toolbar[cmd.name];
                var button = new qx.ui.toolbar.Button(cmd.label, icon);
                button.setShow("icon");
                button.getChildControl("icon").set({
                    width: 22,
                    height: 22,
                    scale: true
                });
                var tooltip = new qx.ui.tooltip.ToolTip(cmd.label, null);
                button.setToolTip(tooltip);
                button.setBlockToolTip(false);
                button.addListener("click", function () {
                    cmd.command();
                });
                return button;
            }
            init() {
                var part = new qx.ui.toolbar.Part();
                this.commands.forEach(function (cmd) {
                    if (cmd === null) {
                        this.add(part);
                        part = new qx.ui.toolbar.Part();
                    }
                    else {
                        var button = this.createButton(cmd);
                        part.add(button);
                    }
                });
                this.add(part);
            }
            /**
             * Alternative way to adding buttons to the toolbar
             */
            init2() {
                this.commands.forEach(function (cmd) {
                    if (cmd === null) {
                        this.addSeparator();
                    }
                    else {
                        var button = this.createButton(cmd);
                        this.add(button);
                    }
                });
            }
        }
        Gui.ToolBar = ToolBar;
    })(Gui = Cats.Gui || (Cats.Gui = {}));
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
    var Gui;
    (function (Gui) {
        /**
         * This class represents a page holding a session. Typically that means a
         * editor
         */
        class EditorPage extends qx.ui.tabview.Page {
            constructor(editor) {
                _super(editor.label);
                this.editor = editor;
                this.add(editor.getLayoutItem(), { edge: 0 });
                this.setShowCloseButton(true);
                this.setLayout(new qx.ui.layout.Canvas());
                this.setPadding(0, 0, 0, 0);
                this.setMargin(0, 0, 0, 0);
                this.createContextMenu();
                this.createToolTip();
                this.getButton().setShow("both");
                editor.on("changed", this.setChanged, this);
                editor.on("errors", this.setHasErrors, this);
            }
            continueWhenNeedSaving(callback) {
                if (this.editor.hasUnsavedChanges()) {
                    var dialog = new Gui.ConfirmDialog("There are unsaved changes!\nDo you really want to continue?");
                    dialog.onConfirm = callback;
                    dialog.show();
                }
                else {
                    callback();
                }
            }
            _onButtonClose() {
                this.continueWhenNeedSaving(function () {
                    _super.prototype._onButtonClose();
                });
            }
            createToolTip() {
                var button = this.getButton();
                var tooltipText = this.editor.getDescription() || this.editor.label;
                var tooltip = new qx.ui.tooltip.ToolTip(tooltipText);
                button.setToolTip(tooltip);
            }
            createContextMenu() {
                var button = this.getButton();
                var menu = new qx.ui.menu.Menu();
                var item1 = new qx.ui.menu.Button("Close");
                item1.addListener("execute", function () { Cats.IDE.editorTabView.close(this); });
                var item2 = new qx.ui.menu.Button("Close other");
                item2.addListener("execute", function () { Cats.IDE.editorTabView.closeOther(this); });
                var item3 = new qx.ui.menu.Button("Close all");
                item3.addListener("execute", function () { Cats.IDE.editorTabView.closeAll(); });
                menu.add(item1);
                menu.add(item2);
                menu.add(item3);
                button.setContextMenu(menu);
            }
            /**
             * Tell the Page that the editor on it has detected some errors in the code
             */
            setHasErrors(level) {
                if (level) {
                    var icon = Cats.IDE.icons.annotation[level];
                    this.setIcon(icon);
                }
                else {
                    this.resetIcon();
                }
            }
            setChanged(changed) {
                var button = this.getButton();
                if (changed) {
                    button.setLabel("*" + this.editor.label);
                }
                else {
                    button.setLabel(this.editor.label);
                }
            }
        }
        Gui.EditorPage = EditorPage;
        class EditorTabView extends qx.ui.tabview.TabView {
            constructor() {
                _super();
                this.setPadding(0, 0, 0, 0);
                this.setContentPadding(0, 0, 0, 0);
            }
            addEditor(editor, pos) {
                var page = new EditorPage(editor);
                this.add(page);
                this.navigateToPage(page, pos);
                page.fadeIn(500);
                return page;
            }
            /**
             * close all open pages
             */
            closeAll() {
                var pages = this.getChildren().concat();
                this.continueIfUnsavedChanges(pages, function () {
                    pages.forEach(function (page) {
                        this.remove(page);
                    });
                });
            }
            /**
             * close one page
             */
            close(page = this.getActivePage()) {
                if (!page)
                    return;
                page.continueWhenNeedSaving(function () {
                    this.remove(page);
                });
            }
            onChangeEditor(cb) {
                this.addListener("changeSelection", function (ev) {
                    var page = ev.getData()[0];
                    if (page) {
                        cb(page.editor, page);
                    }
                    else {
                        cb(null, null);
                    }
                });
            }
            /**
             * Close the other pages
             */
            closeOther(closePage = this.getActivePage()) {
                var pages = this.getChildren().concat().filter(function (page) { return page !== closePage; });
                this.continueIfUnsavedChanges(pages, function () {
                    pages.forEach(function (page) {
                        this.remove(page);
                    });
                });
            }
            continueIfUnsavedChanges(pages, callback) {
                var hasUnsaved = false;
                hasUnsaved = pages.some(function (page) {
                    return page.editor.hasUnsavedChanges();
                });
                if (hasUnsaved) {
                    var dialog = new Gui.ConfirmDialog("There are unsaved changes!\nDo you really want to continue?");
                    dialog.onConfirm = callback;
                    dialog.show();
                }
                else {
                    callback();
                }
            }
            hasUnsavedChanges() {
                return this.getChildren().some(function (page) {
                    return page.editor.hasUnsavedChanges();
                });
            }
            /**
             * Get all the editors
             */
            getEditors() {
                var result = [];
                this.getChildren().forEach(function (page) {
                    result.push(page.editor);
                });
                return result;
            }
            /**
             * Get the currently active editor
             */
            getActiveEditor(type) {
                var page = this.getActivePage();
                if (!page)
                    return null;
                if (type) {
                    if (page.editor instanceof type)
                        return page.editor;
                }
                else {
                    return page.editor;
                }
            }
            /**
             * Navigate to a certain page
             */
            navigateToPage(page, pos) {
                if (this.getChildren().indexOf(page) === -1)
                    return;
                this.setSelection([page]);
                page.editor.moveToPosition(pos);
            }
            /**
             * Get the page that has a certain instance of an editor.
             */
            getPageForEditor(editor) {
                var pages = this.getChildren();
                for (var x = 0; x < pages.length; x++) {
                    if (pages[x].editor === editor)
                        return pages[x];
                }
            }
            getPagesForFile(filePath) {
                var result = [];
                this.getChildren().forEach(function (page) {
                    var editor = page.editor;
                    if (editor.filePath === filePath)
                        result.push(page);
                });
                return result;
            }
            getActivePage() {
                return this.getSelection()[0];
            }
        }
        Gui.EditorTabView = EditorTabView;
    })(Gui = Cats.Gui || (Cats.Gui = {}));
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
    var Gui;
    (function (Gui) {
        /**
         * Represents the statusbar for CATS displayed at the bottom of the screen.
         */
        class StatusBar extends qx.ui.toolbar.ToolBar {
            constructor() {
                _super();
                this.status = {};
                this.init();
                this.setPadding(0, 0, 0, 0);
                Cats.IDE.editorTabView.onChangeEditor(this.register.bind(this));
            }
            clear() {
                this.modeInfo.setLabel("");
                this.overwriteInfo.setLabel("INSERT");
                this.positionInfo.setLabel("");
            }
            updateStatus(status) {
                if (!status)
                    return;
                if (status.mode !== this.status.mode) {
                    this.modeInfo.setLabel(status.mode || "Unknown");
                }
                if (status.overwrite !== this.status.overwrite) {
                    this.overwriteInfo.setLabel(status.overwrite ? "OVERWRITE" : "INSERT");
                }
                if (status.position !== this.status.position) {
                    this.positionInfo.setLabel(status.position || ":");
                }
                this.status = status;
            }
            register(editor) {
                if (this.editor) {
                    this.editor.off("status", this.updateStatus, this);
                }
                if (editor) {
                    this.editor = editor;
                    editor.on("status", this.updateStatus, this);
                    this.updateStatus(editor.get("status"));
                }
                else {
                    this.clear();
                    this.editor = null;
                }
            }
            /**
             * Create a new button
             *
             */
            createButton(label, icon) {
                var button = new qx.ui.toolbar.Button(label, icon);
                // button.setPadding(1,1,1,1);
                button.setMargin(0, 10, 0, 10);
                button.setMinWidth(100);
                button.setDecorator(null);
                return button;
            }
            /**
             * Initialize the status bar
             *
             */
            init() {
                this.positionInfo = this.createButton("-:-");
                this.add(this.positionInfo);
                this.modeInfo = this.createButton("Unknown");
                this.add(this.modeInfo);
                this.addSpacer();
                this.busyInfo = this.createButton("", "./resource/cats/loader.gif");
                this.busyInfo.setShow("icon");
                this.add(this.busyInfo);
                this.overwriteInfo = this.createButton("INSERT");
                this.add(this.overwriteInfo);
            }
            /**
             * Indicate if the worker is busy or not
             *
             */
            setBusy(busy, activity) {
                if (busy) {
                    this.busyInfo.setIcon("./resource/cats/loader_anim.gif");
                }
                else {
                    this.busyInfo.setIcon("./resource/cats/loader.gif");
                }
                if (Cats.IDE.debug && busy && activity)
                    Cats.IDE.console.log(activity);
            }
        }
        Gui.StatusBar = StatusBar;
    })(Gui = Cats.Gui || (Cats.Gui = {}));
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
    var Gui;
    (function (Gui) {
        /**
         * Basic Qooxdoo-powered replacement for native `confirm` usage in
         * CATS.
         */
        class ConfirmDialog extends qx.ui.window.Window {
            constructor(text) {
                _super(name);
                var layout = new qx.ui.layout.VBox();
                this.setLayout(layout);
                this.setModal(true);
                this.setShowMinimize(false);
                this.setShowMaximize(false);
                this.addControls(text);
                this.addListener("resize", this.center);
            }
            addControls(text) {
                var form = new qx.ui.form.Form();
                // Prompt message
                form.addGroupHeader(text);
                // Confirm command
                var confirmCommand = new qx.ui.command.Command("Enter");
                confirmCommand.addListener("execute", function () {
                    if (this.onConfirm) {
                        this.onConfirm();
                    }
                    this.close();
                });
                // Cancel command
                var cancelCommand = new qx.ui.command.Command("Escape");
                cancelCommand.addListener("execute", function () {
                    if (this.onCancel) {
                        this.onCancel();
                    }
                    this.close();
                });
                // Command cleanup
                this.addListener("close", function () {
                    confirmCommand.setEnabled(false);
                    cancelCommand.setEnabled(false);
                });
                // Confirm button
                var okbutton = new qx.ui.form.Button("Confirm");
                form.addButton(okbutton);
                okbutton.setCommand(confirmCommand);
                // Cancel button
                var cancelbutton = new qx.ui.form.Button("Cancel");
                cancelbutton.setCommand(cancelCommand);
                form.addButton(cancelbutton);
                var renderer = new qx.ui.form.renderer.Single(form);
                this.add(renderer);
            }
        }
        Gui.ConfirmDialog = ConfirmDialog;
    })(Gui = Cats.Gui || (Cats.Gui = {}));
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
    var Gui;
    (function (Gui) {
        /**
         * Basic Qooxdoo-powered replacement for native `prompt` usage in
         * CATS. Main difference is that this is an asynchronous prompt.
         */
        class PromptDialog extends qx.ui.window.Window {
            constructor(text, value = "") {
                _super(name);
                var layout = new qx.ui.layout.VBox();
                this.setLayout(layout);
                this.setModal(true);
                this.setShowMinimize(false);
                this.setShowMaximize(false);
                this.addControls(text, value);
                this.addListener("resize", this.center);
            }
            addControls(text, value) {
                var form = new qx.ui.form.Form();
                // Prompt message
                form.addGroupHeader(text);
                // Value text field
                var valuefield = new qx.ui.form.TextField();
                valuefield.setValue(value);
                valuefield.setWidth(400);
                form.add(valuefield, "");
                this.addListener("appear", function () {
                    valuefield.focus();
                });
                // Success command
                var successCommand = new qx.ui.command.Command("Enter");
                successCommand.addListener("execute", function () {
                    if (form.validate()) {
                        if (this.onSuccess) {
                            this.onSuccess(valuefield.getValue());
                        }
                        this.close();
                    }
                    ;
                });
                // Cancel command
                var cancelCommand = new qx.ui.command.Command("Escape");
                cancelCommand.addListener("execute", function () {
                    this.close();
                });
                // Command cleanup
                this.addListener("close", function () {
                    successCommand.setEnabled(false);
                    cancelCommand.setEnabled(false);
                });
                // Ok button
                var okbutton = new qx.ui.form.Button("Ok");
                form.addButton(okbutton);
                okbutton.setCommand(successCommand);
                // Cancel button
                var cancelbutton = new qx.ui.form.Button("Cancel");
                cancelbutton.setCommand(cancelCommand);
                form.addButton(cancelbutton);
                var renderer = new qx.ui.form.renderer.Single(form);
                this.add(renderer);
            }
        }
        Gui.PromptDialog = PromptDialog;
    })(Gui = Cats.Gui || (Cats.Gui = {}));
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
    var Gui;
    (function (Gui) {
        var fuzzy;
        function throttle(fn, threshhold = 250, context = null) {
            var last, deferTimer;
            return function () {
                var now = +new Date, args = arguments;
                if (last && now < last + threshhold) {
                    // hold on to it
                    clearTimeout(deferTimer);
                    deferTimer = setTimeout(function () {
                        last = now;
                        fn.apply(context, args);
                    }, threshhold);
                }
                else {
                    last = now;
                    fn.apply(context, args);
                }
            };
        }
        /**
         * Quickly open any typescript file in a project.
         */
        class QuickOpenDialog extends qx.ui.window.Window {
            constructor(project) {
                _super("Quick Open");
                this.project = project;
                this.files = [];
                if (!fuzzy)
                    fuzzy = require("fuzzy");
                this.collectFiles();
                var layout = new qx.ui.layout.VBox();
                layout.setSpacing(6);
                this.setLayout(layout);
                this.setModal(true);
                this.setShowMinimize(false);
                this.setShowMaximize(false);
                this.addControls();
                this.addListener("resize", this.center);
            }
            collectFiles() {
                var projectDir = this.project.projectDir;
                this.project.getScripts().forEach(function (absolutePath) {
                    if (absolutePath.lastIndexOf(projectDir, 0) === 0) {
                        var relativePath = absolutePath.slice(projectDir.length + 1);
                        this.files.push(relativePath);
                    }
                });
            }
            addControls() {
                // Prompt message
                // form.addGroupHeader("Type a few letters to find a project file to open...");
                // Value text field
                var valuefield = new qx.ui.form.TextField();
                valuefield.setWidth(450);
                this.add(valuefield);
                this.addListener("appear", function () {
                    valuefield.focus();
                });
                // File list
                var filelist = new qx.ui.form.List();
                filelist.setMinHeight(500);
                this.add(filelist);
                var doFilter = function () {
                    var query = valuefield.getValue();
                    var opts = {
                        pre: '{{{',
                        post: '}}}'
                    };
                    var results = fuzzy.filter(query, this.files, opts);
                    filelist.removeAll();
                    for (var i = 0; i < results.length; i++) {
                        var result = results[i];
                        function format(str) {
                            return str.replace(/{{{/g, "<strong>").replace(/}}}/g, "</strong>");
                        }
                        var cutIndex = result.string.lastIndexOf('/');
                        var long = result.string;
                        var short = result.string.slice(cutIndex + 1);
                        var pretty = "<span style='font-size: 120%; display: block;'>" + format(short) +
                            "</span><span style='opacity: 0.7;'>" + format(long) + "</span>";
                        var item = new qx.ui.form.ListItem(pretty);
                        item.setRich(true);
                        item.setModel(result.original);
                        filelist.add(item);
                        if (i === 0) {
                            filelist.addToSelection(item);
                        }
                    }
                };
                valuefield.addListener("input", throttle(doFilter, 100));
                valuefield.addListener("keypress", function (ev) {
                    var id = ev.getKeyIdentifier();
                    switch (id) {
                        case "Down":
                        case "Up":
                            filelist.handleKeyPress(ev);
                            break;
                    }
                });
                // Success command
                var successCommand = new qx.ui.command.Command("Enter");
                successCommand.addListener("execute", function () {
                    var results = filelist.getSelection();
                    if (results.length > 0) {
                        var result = results[0];
                        var relativePath = result.getModel();
                        var filePath = Cats.OS.File.join(this.project.projectDir, relativePath);
                        Cats.FileEditor.OpenEditor(filePath);
                        this.close();
                    }
                    ;
                });
                filelist.addListener("dblclick", function () {
                    successCommand.execute(null);
                });
                // Cancel command
                var cancelCommand = new qx.ui.command.Command("Escape");
                cancelCommand.addListener("execute", function () {
                    this.close();
                });
                // Command cleanup
                this.addListener("close", function () {
                    successCommand.setEnabled(false);
                    cancelCommand.setEnabled(false);
                });
            }
        }
        Gui.QuickOpenDialog = QuickOpenDialog;
    })(Gui = Cats.Gui || (Cats.Gui = {}));
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
    var Gui;
    (function (Gui) {
        /**
         * The context menu for the file navigator. This menu provides basic
         * file operations like, rename, delete and create.
         */
        class FileContextMenu extends qx.ui.menu.Menu {
            constructor(fileNavigator) {
                _super();
                this.fileNavigator = fileNavigator;
                this.searchDialog = new Gui.SearchDialog();
                this.init();
            }
            openInApp() {
                var gui = require("nw.gui");
                var osPath = Cats.OS.File.join(this.getFullPath(), "", true);
                if (osPath)
                    gui.Shell.openItem(osPath);
            }
            showInFolder() {
                var gui = require("nw.gui");
                var osPath = Cats.OS.File.join(this.getFullPath(), "", true);
                if (osPath)
                    gui.Shell.showItemInFolder(osPath);
            }
            search() {
                this.searchDialog.search(this.getFullPath());
            }
            getSelectedItem() {
                return this.fileNavigator.getSelection().getItem(0);
            }
            getFullPath() {
                var item = this.getSelectedItem();
                if (item)
                    return item.getFullPath();
            }
            init() {
                // var refreshButton = new qx.ui.menu.Button("Refresh");
                var renameButton = new qx.ui.menu.Button("Rename");
                renameButton.addListener("execute", this.rename, this);
                var deleteButton = new qx.ui.menu.Button("Delete");
                deleteButton.addListener("execute", this.deleteFile, this);
                var newFileButton = new qx.ui.menu.Button("New File");
                newFileButton.addListener("execute", this.newFile, this);
                var newDirButton = new qx.ui.menu.Button("New Directory");
                newDirButton.addListener("execute", this.newFolder, this);
                var searchButton = new qx.ui.menu.Button("Search");
                searchButton.addListener("execute", this.search, this);
                var openInAppButton = new qx.ui.menu.Button("Open in default App");
                openInAppButton.addListener("execute", this.openInApp, this);
                var showInFolderButton = new qx.ui.menu.Button("Show item in folder");
                showInFolderButton.addListener("execute", this.showInFolder, this);
                // this.add(refreshButton);
                this.add(renameButton);
                this.add(deleteButton);
                this.add(newFileButton);
                this.add(newDirButton);
                this.addSeparator();
                this.add(searchButton);
                this.addSeparator();
                this.add(openInAppButton);
                this.add(showInFolderButton);
            }
            deleteFile() {
                var fullName = this.getFullPath();
                var basename = Cats.OS.File.PATH.basename(fullName);
                var dialog = new Gui.ConfirmDialog("Delete " + basename + "?");
                dialog.onConfirm = function () {
                    Cats.OS.File.remove(fullName);
                };
                dialog.show();
            }
            getBaseDir() {
                var item = this.getSelectedItem();
                var fullPath = this.getFullPath();
                if (item.getDirectory()) {
                    return fullPath;
                }
                else {
                    return Cats.OS.File.PATH.dirname(fullPath);
                }
            }
            newFile() {
                var basedir = this.getBaseDir();
                var dialog = new Gui.PromptDialog("Enter new file name in directory " + basedir);
                dialog.onSuccess = function (name) {
                    var fullName = Cats.OS.File.join(basedir, name);
                    Cats.OS.File.writeTextFile(fullName, "");
                };
                dialog.show();
            }
            newFolder() {
                var basedir = this.getBaseDir();
                var dialog = new Gui.PromptDialog("Enter new folder name in directory " + basedir);
                dialog.onSuccess = function (name) {
                    var fullName = Cats.OS.File.join(basedir, name);
                    Cats.OS.File.mkdirRecursiveSync(fullName);
                };
                dialog.show();
            }
            rename() {
                var fullName = this.getFullPath();
                var dirname = Cats.OS.File.PATH.dirname(fullName);
                var basename = Cats.OS.File.PATH.basename(fullName);
                var dialog = new Gui.PromptDialog("Enter new name", basename);
                dialog.onSuccess = function (name) {
                    var message = "Going to rename " + basename + " to " + name;
                    var confirmDialog = new Gui.ConfirmDialog(message);
                    confirmDialog.onConfirm = function () {
                        try {
                            Cats.OS.File.rename(fullName, Cats.OS.File.join(dirname, name));
                        }
                        catch (err) {
                            alert(err);
                        }
                    };
                    confirmDialog.show();
                };
                dialog.show();
            }
        }
        Gui.FileContextMenu = FileContextMenu;
    })(Gui = Cats.Gui || (Cats.Gui = {}));
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
    var Gui;
    (function (Gui) {
        /**
         * Base class for all the configuration dialogs forms in
         * CATS.
         */
        class ConfigDialog extends qx.ui.window.Window {
            constructor(name) {
                _super(name);
                var layout = new qx.ui.layout.VBox();
                this.setLayout(layout);
                this.setModal(true);
                this.addTabs();
                this.addButtons();
                this.addListener("resize", this.center);
            }
            addTabs() {
                // to do in subclasses;
            }
            saveValues() {
                // to do in subclass
            }
            addButtons() {
                // Save button
                var form = new qx.ui.form.Form();
                var okbutton = new qx.ui.form.Button("Ok");
                form.addButton(okbutton);
                okbutton.addListener("execute", function () {
                    if (form.validate()) {
                        this.saveValues();
                        this.close();
                    }
                    ;
                }, this);
                // Cancel button
                var cancelbutton = new qx.ui.form.Button("Cancel");
                form.addButton(cancelbutton);
                cancelbutton.addListener("execute", function () {
                    this.close();
                }, this);
                var renderer = new qx.ui.form.renderer.Single(form);
                this.add(renderer);
                // this.add(form);
            }
        }
        Gui.ConfigDialog = ConfigDialog;
        /**
         * Base class for all configuration tab pages. Contains a number
         * of helper methods to quickly add a form element.
         */
        class ConfigDialogPage extends qx.ui.tabview.Page {
            constructor(name) {
                _super(name);
                this.form = new qx.ui.form.Form();
                this.setLayout(new qx.ui.layout.Canvas());
            }
            addCheckBox(model) {
                var cb = new qx.ui.form.CheckBox();
                var label = this.getLabelString(model);
                this.form.add(cb, label, null, model);
            }
            getLabelString(model) {
                if (!model)
                    return "<model undefined>";
                var labelId = "config_" + model;
                var label = this.tr(labelId);
                if (label != labelId)
                    return label;
                return model.split(/(?=[A-Z])/).join(" ");
            }
            addSpinner(model, min, max) {
                var s = new qx.ui.form.Spinner();
                s.set({ minimum: min, maximum: max });
                var label = this.getLabelString(model);
                this.form.add(s, label, null, model);
            }
            addTextField(model) {
                var t = new qx.ui.form.TextField();
                t.setWidth(200);
                var label = this.getLabelString(model);
                this.form.add(t, label, null, model);
            }
            addSelectBox(model, items) {
                var s = new qx.ui.form.SelectBox();
                items.forEach(function (item) {
                    var listItem = new qx.ui.form.ListItem(item.label, null, item.model);
                    s.add(listItem);
                });
                var label = this.getLabelString(model);
                this.form.add(s, label, null, model);
            }
            setData(data) {
                for (var key in data) {
                    try {
                        this.model.set(key, data[key]);
                    }
                    catch (err) { }
                }
            }
            /**
             * Get the data back as a JSON object
             */
            getData() {
                var result = JSON.parse(qx.util.Serializer.toJson(this.model));
                return result;
            }
            finalStep() {
                var controller = new qx.data.controller.Form(null, this.form);
                this.model = controller.createModel(false);
                var renderer = new qx.ui.form.renderer.Single(this.form);
                this.add(renderer);
            }
        }
        Gui.ConfigDialogPage = ConfigDialogPage;
    })(Gui = Cats.Gui || (Cats.Gui = {}));
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
    var Gui;
    (function (Gui) {
        /**
        * This class represents the configuration windows for the project specific
        * settings.
        */
        class ProjectSettingsDialog extends Gui.ConfigDialog {
            constructor(project) {
                _super(_super.prototype.tr("project_settings"));
                this.project = project;
                this.loadValues();
            }
            loadValues() {
                var config = this.project.config;
                this.projectSettings.setData(config);
                this.compilerSettings.setData(config.compilerOptions);
                this.codeFormatSettings.setData(config.codeFormat);
                this.tslintSettings.setData(config.tslint);
                this.customBuild.setData(config.customBuild);
                this.customRun.setData(config.customRun);
                this.documentationSettings.setData(config.documentation);
            }
            saveValues() {
                var config = this.projectSettings.getData();
                config.compiler = this.compilerSettings.getData();
                config.codeFormat = this.codeFormatSettings.getData();
                config.customBuild = this.customBuild.getData();
                config.customRun = this.customRun.getData();
                config.documentation = this.documentationSettings.getData();
                config.tslint = this.tslintSettings.getData();
                this.project.updateConfig(config);
            }
            addTabs() {
                var tab = new qx.ui.tabview.TabView();
                this.compilerSettings = new ProjectCompilerSettings();
                tab.add(this.compilerSettings);
                this.projectSettings = new ProjectGeneric();
                tab.add(this.projectSettings);
                this.codeFormatSettings = new CodeFormatSettings();
                tab.add(this.codeFormatSettings);
                this.tslintSettings = new TSLintSettings();
                tab.add(this.tslintSettings);
                this.documentationSettings = new DocumentationSettings();
                tab.add(this.documentationSettings);
                this.customBuild = new CustomBuildSettings();
                tab.add(this.customBuild);
                this.customRun = new CustomRunSettings();
                tab.add(this.customRun);
                this.add(tab);
            }
        }
        Gui.ProjectSettingsDialog = ProjectSettingsDialog;
        /**
         * Dialog window to set the compiler settings
         */
        class ProjectCompilerSettings extends Gui.ConfigDialogPage {
            constructor() {
                _super("Compiler");
                this.moduleGenTarget = [
                    { label: "none", model: ts.ModuleKind.None },
                    { label: "commonjs", model: ts.ModuleKind.CommonJS },
                    { label: "amd", model: ts.ModuleKind.AMD },
                    { label: "umd", model: ts.ModuleKind.UMD },
                    { label: "system", model: ts.ModuleKind.System },
                    { label: "es6", model: ts.ModuleKind.ES6 },
                    { label: "es2015", model: ts.ModuleKind.ES2015 }
                ];
                this.jsTarget = [
                    { label: "es3", model: ts.ScriptTarget.ES3 },
                    { label: "es5", model: ts.ScriptTarget.ES5 },
                    { label: "es6", model: ts.ScriptTarget.ES6 },
                    { label: "es2015", model: ts.ScriptTarget.ES2015 },
                    { label: "latest", model: ts.ScriptTarget.Latest }
                ];
                this.newLineKind = [
                    { label: "OSX/Linux", model: ts.NewLineKind.LineFeed },
                    { label: "Windows", model: ts.NewLineKind.CarriageReturnLineFeed },
                ];
                this.jsxEmit = [
                    { label: "None", model: ts.JsxEmit.None },
                    { label: "Preserve (jsx)", model: ts.JsxEmit.Preserve },
                    { label: "Generate React code (js)", model: ts.JsxEmit.React }
                ];
                this.createForm();
                this.finalStep();
            }
            createForm() {
                this.addCheckBox("noLib");
                this.addCheckBox("removeComments");
                this.addCheckBox("noImplicitAny");
                this.addCheckBox("noEmitHelpers");
                this.addCheckBox("declaration");
                this.addCheckBox("sourceMap");
                this.addCheckBox("propagateEnumConstants");
                this.addCheckBox("allowAutomaticSemicolonInsertion");
                this.addCheckBox("allowSyntheticDefaultImports");
                this.addCheckBox("experimentalDecorators");
                this.addCheckBox("emitDecoratorMetadata");
                this.addCheckBox("allowUnusedLabels");
                this.addCheckBox("allowUnreachableCode");
                this.addSelectBox("target", this.jsTarget);
                this.addSelectBox("module", this.moduleGenTarget);
                this.addSelectBox("newLine", this.newLineKind);
                this.addSelectBox("jsx", this.jsxEmit);
                this.addTextField("outDir");
                this.addTextField("rootDir");
                this.addTextField("out");
            }
        }
        /**
         * The generic project settings
         */
        class ProjectGeneric extends Gui.ConfigDialogPage {
            constructor() {
                _super("Generic");
                this.projectType = [
                    { label: "standard", model: "standard" },
                    { label: "webworker", model: "webworker" },
                    { label: "ECMAScript", model: "core" },
                    { label: "scriptHost", model: "scriptHost" },
                    // { label: "IE10", model: "dom" },
                    { label: "none", model: "none" }
                ];
                this.createForm();
                this.finalStep();
            }
            createForm() {
                this.addTextField("src");
                this.addTextField("main");
                this.addCheckBox("buildOnSave");
                this.addSelectBox("projectType", this.projectType);
            }
        }
        /**
         * The different settings so all developers checking the same code format and
         * standards.
         */
        class CodeFormatSettings extends Gui.ConfigDialogPage {
            constructor() {
                _super("Code Formatting");
                this.newLineMode = [
                    { label: "Linux/OSX", model: "\n" },
                    { label: "Dos/Windows", model: "\r\n" },
                ];
                this.createForm();
                this.finalStep();
            }
            createForm() {
                this.addSelectBox("NewLineCharacter", this.newLineMode);
                this.addCheckBox("ConvertTabsToSpaces");
                this.addSpinner("IndentSize", 1, 16);
                this.addSpinner("TabSize", 1, 16);
                // this.addCheckBox2("InsertSpaceAfterCommaDelimiter");
                // this.addCheckBox2("InsertSpaceAfterFunctionKeywordForAnonymousFunctions");
                // this.addCheckBox2("")
            }
        }
        /**
         * The configuration for TSLint
         */
        class TSLintSettings extends Gui.ConfigDialogPage {
            constructor() {
                _super("TSLint Settings");
                this.createForm();
                this.finalStep();
            }
            createForm() {
                this.addCheckBox("useLint");
                this.addTextField("lintFile");
            }
        }
        /**
         * The various settings for the documentation generation tool (TypeDoc).
         */
        class DocumentationSettings extends Gui.ConfigDialogPage {
            constructor() {
                _super("Documentation Settings");
                this.themes = [
                    { label: "Default", model: "default" },
                ];
                this.createForm();
                this.finalStep();
            }
            createForm() {
                this.addCheckBox("includeDeclarations");
                this.addTextField("outputDirectory");
                this.addTextField("readme");
                this.addSelectBox("theme", this.themes);
            }
        }
        class CustomBuildSettings extends Gui.ConfigDialogPage {
            constructor(name = "Custom Build") {
                _super(name);
                this.createForm();
                this.finalStep();
            }
            createForm() {
                this.addTextField("name");
                this.addTextField("command");
                this.addTextField("directory");
                this.addTextField("environment");
                this.addCheckBox("ownConsole");
            }
        }
        class CustomRunSettings extends CustomBuildSettings {
            constructor() {
                _super("Custom Run");
            }
        }
    })(Gui = Cats.Gui || (Cats.Gui = {}));
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
    var Gui;
    (function (Gui) {
        /**
         * The main class for the IDE configuration window. This window allows to configure
         * all kind of personal settings and preferences.
         */
        class IdePreferencesDialog extends Gui.ConfigDialog {
            constructor(config) {
                _super("CATS Settings");
                this.config = config;
                this.loadValues();
            }
            loadValues() {
                var config = this.config;
                this.editorSettings.setData(config.editor);
                this.ideGenericSettings.setData(config);
            }
            saveValues() {
                var config = this.ideGenericSettings.getData();
                config.editor = this.editorSettings.getData();
                Cats.IDE.updatePreferences(config);
            }
            addTabs() {
                var tab = new qx.ui.tabview.TabView();
                this.ideGenericSettings = new GenericPreferences;
                this.editorSettings = new EditorPreferences;
                tab.add(this.ideGenericSettings);
                tab.add(this.editorSettings);
                this.add(tab);
            }
        }
        Gui.IdePreferencesDialog = IdePreferencesDialog;
        /**
         * This class contains the configuration page for the overal IDE
         */
        class GenericPreferences extends Gui.ConfigDialogPage {
            constructor() {
                _super("Generic");
                this.themes = [
                    { label: "CATS", model: "cats" },
                    { label: "Gray", model: "gray" },
                    { label: "Classic", model: "classic" },
                    { label: "Modern", model: "modern" },
                    { label: "Indigo", model: "indigo" },
                    { label: "Simple", model: "simple" }
                ];
                this.locales = [
                    { label: "English", model: "en" }
                ];
                this.createForm();
                this.finalStep();
            }
            createForm() {
                this.addSelectBox("theme", this.themes);
                this.addSelectBox("locale", this.locales);
                this.addCheckBox("rememberOpenFiles");
                this.addCheckBox("rememberLayout");
            }
        }
        /**
         * This class contains the configuration page for the source editor
         */
        class EditorPreferences extends Gui.ConfigDialogPage {
            constructor() {
                _super("Source Editor");
                this.completionMode = [
                    { label: "strict", model: "strict" },
                    { label: "forgiven", model: "forgiven" }
                ];
                this.theme = [
                    { model: "chrome", label: "Chrome" },
                    { model: "clouds", label: "Clouds" },
                    { model: "crimson_editor", label: "Crimson Editor" },
                    { model: "dreamweaver", label: "Dreamweaver" },
                    { model: "eclipse", label: "Eclipse" },
                    { model: "github", label: "GitHub" },
                    { model: "textmate", label: "TextMate" },
                    { model: "xcode", label: "XCode" },
                ];
                this.createForm();
                this.finalStep();
            }
            getThemes() {
                var themelist = ace.require("ace/ext/themelist");
                var result = [];
                themelist.themes.forEach(function (x) {
                    var name = Cats.OS.File.PATH.basename(x.theme);
                    result.push({ model: name, label: name });
                });
                return result;
            }
            createForm() {
                this.addSpinner("fontSize", 6, 24);
                this.addSpinner("rightMargin", 40, 240);
                this.addSelectBox("theme", this.getThemes());
                this.addSelectBox("completionMode", this.completionMode);
            }
        }
    })(Gui = Cats.Gui || (Cats.Gui = {}));
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
    var Gui;
    (function (Gui) {
        /**
         * Overview of started processes. Also provides the controls so these processes can be paused,
         * stopped or killed. Especially with custom build and run scripts this provides a bit more
         * control from within CATS.
         *
         * @TODO provide feedback of the actuall status of a process
         */
        class ProcessTable extends qx.ui.container.Composite {
            constructor() {
                _super(new qx.ui.layout.VBox());
                this.setPadding(0, 0, 0, 0);
                this.add(this.createControls());
                this.add(this.createTable(), { flex: 1 });
            }
            /**
             * Add a new process to the table
             */
            addProcess(child, cmd) {
                var row = new Array("" + child.pid, cmd, child);
                var model = this.table.getTableModel();
                model.addRows([row]);
                this.table.getSelectionModel().resetSelection();
            }
            sendSignal(signal) {
                var table = this.table;
                var selectedRow = table.getSelectionModel().getLeadSelectionIndex();
                if (selectedRow < 0) {
                    alert("You have to select a process from the table below first");
                    return;
                }
                var data = table.getTableModel().getRowData(selectedRow);
                var child = data[2];
                child.kill(signal);
            }
            addButton(bar, label, signal) {
                var button = new qx.ui.toolbar.Button(label);
                button.addListener("execute", function () { this.sendSignal(signal); });
                bar.add(button);
            }
            createTable() {
                var tableModel = new qx.ui.table.model.Simple();
                var headers = [_super.prototype.tr("tableheader_pid"), _super.prototype.tr("tableheader_command")];
                tableModel.setColumns(headers);
                tableModel.setData([]);
                var custom = {
                    tableColumnModel: function () {
                        return new qx.ui.table.columnmodel.Resize();
                    }
                };
                var table = new qx.ui.table.Table(tableModel, custom);
                table.setDecorator(null);
                table.setStatusBarVisible(false);
                this.table = table;
                return table;
            }
            createControls() {
                var bar = new qx.ui.toolbar.ToolBar();
                this.addButton(bar, "Stop", "SIGTERM");
                this.addButton(bar, "Kill", "SIGKILL");
                this.addButton(bar, "Pause", "SIGSTOP");
                this.addButton(bar, "Resume", "SIGCONT");
                return bar;
            }
        }
        Gui.ProcessTable = ProcessTable;
    })(Gui = Cats.Gui || (Cats.Gui = {}));
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
    var Gui;
    (function (Gui) {
        /**
         * The BusyWindow indicates to the user that there is processing going
         * on that first has to finish before the rest of the UI is available again.
         *
         * Since most activities are done in the backgorund, this should not be used often.
         */
        class BusyWindow extends qx.ui.window.Window {
            constructor(name) {
                _super(name);
                this.setLayout(new qx.ui.layout.Basic());
                this.setMinWidth(300);
                this.setMinHeight(150);
                this.add(new qx.ui.basic.Label("Please wait one moment ...."));
                this.setModal(true);
                this.addListener("resize", this.center);
                this.addListenerOnce("appear", function () {
                    setTimeout(function () {
                        this.fireDataEvent("ready", {});
                    }, 100);
                });
            }
        }
        Gui.BusyWindow = BusyWindow;
    })(Gui = Cats.Gui || (Cats.Gui = {}));
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
    var Gui;
    (function (Gui) {
        /**
         * This table displays properties
         */
        class PropertyTable extends qx.ui.table.Table {
            constructor() {
                var tableModel = new qx.ui.table.model.Simple();
                var headers = [_super.prototype.tr("tableheader_name"), _super.prototype.tr("tableheader_value")];
                tableModel.setColumns(headers);
                tableModel.setData([]);
                var custom = {
                    tableColumnModel: function (obj) {
                        return new qx.ui.table.columnmodel.Resize();
                    }
                };
                _super(tableModel, custom);
                this.setStatusBarVisible(false);
                this.setDecorator(null);
                this.setPadding(0, 0, 0, 0);
                Cats.IDE.editorTabView.onChangeEditor(this.register.bind(this));
            }
            clear() {
                this.setData([]);
            }
            register(editor) {
                if (this.editor) {
                    this.editor.off("info", this.setData, this);
                }
                this.editor = editor;
                if (editor) {
                    editor.on("info", this.setData, this);
                    this.setData(editor.get("info"));
                }
                else {
                    this.clear();
                }
            }
            getData() {
                return this.data;
            }
            setData(data) {
                this.data = data;
                var rows = [];
                if (data) {
                    data.forEach(function (row) {
                        rows.push([row.key, row.value]);
                    });
                }
                var model = this.getTableModel();
                model.setData(rows);
                this.getSelectionModel().resetSelection();
            }
        }
        Gui.PropertyTable = PropertyTable;
    })(Gui = Cats.Gui || (Cats.Gui = {}));
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
    var Gui;
    (function (Gui) {
        /**
         * This class takes care of the layout of the IDE.
         * @TODO should not instantiate navigators etc, only do the layout.
         */
        class Layout {
            constructor(rootDoc) {
                this.rootDoc = rootDoc;
            }
            /**
             * Layout the various parts of de IDE
             */
            layout(ide) {
                // container layout
                var layout = new qx.ui.layout.VBox();
                // main container
                var mainContainer = new qx.ui.container.Composite(layout);
                this.rootDoc.add(mainContainer, { edge: 0 });
                ide.toolBar = new Gui.ToolBar();
                mainContainer.add(ide.toolBar, { flex: 0 });
                // mainsplit, contains the editor splitpane and the info splitpane
                var mainsplit = new qx.ui.splitpane.Pane("horizontal");
                // mainsplit.set({ decorator: null });
                // ********************* Navigator Pane ********************
                var navigatorPane = new Gui.TabView();
                ide.bookmarks = new Gui.ResultTable(["tableheader_bookmark"]);
                ide.fileNavigator = new Gui.FileNavigator();
                var fileTab = navigatorPane.addPage("files_tab", ide.fileNavigator);
                navigatorPane.addPage("bookmarks_tab", ide.bookmarks);
                navigatorPane.setSelection([fileTab]);
                mainsplit.add(navigatorPane, 1); // navigator
                var editorSplit = new qx.ui.splitpane.Pane("vertical");
                // editorSplit.setDecorator(null);
                var infoSplit = new qx.ui.splitpane.Pane("horizontal");
                ide.editorTabView = new Gui.EditorTabView();
                // infoSplit.set({ decorator: null });
                infoSplit.add(ide.editorTabView, 4); // editor
                ide.contextPane = new Gui.TabView();
                ide.outlineNavigator = new Gui.OutlineNavigator();
                ide.propertyTable = new Gui.PropertyTable();
                var outlineTab = ide.contextPane.addPage("outline_tab", ide.outlineNavigator);
                ide.contextPane.addPage("properties_tab", ide.propertyTable);
                ide.contextPane.setSelection([outlineTab]);
                infoSplit.add(ide.contextPane, 1); // todo
                editorSplit.add(infoSplit, 4);
                // **********************  Problem Pane ***************************
                ide.resultPane = new Gui.TabView();
                editorSplit.add(ide.resultPane, 2); // Info
                ide.console = new Gui.ConsoleLog();
                ide.problemResult = new Gui.ResultTable();
                ide.todoList = new Gui.ResultTable();
                ide.processTable = new Gui.ProcessTable();
                var problemPage = ide.resultPane.addPage("problems_tab", ide.problemResult);
                problemPage.autoSelect = true;
                var consolePage = ide.resultPane.addPage("console_tab", ide.console);
                consolePage.autoSelect = true;
                ide.resultPane.addPage("process_tab", ide.processTable);
                ide.resultPane.addPage("todo_tab", ide.todoList);
                ide.resultPane.setSelection([consolePage]);
                mainsplit.add(editorSplit, 4); // main area
                mainContainer.add(mainsplit, { flex: 1 });
                // ************************ Status Bar *****************************
                ide.statusBar = new Gui.StatusBar();
                mainContainer.add(ide.statusBar, { flex: 0 });
            }
        }
        Gui.Layout = Layout;
    })(Gui = Cats.Gui || (Cats.Gui = {}));
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
    var Gui;
    (function (Gui) {
        /**
         * Searchdialog for searching specific strings within the files.
         */
        class SearchDialog extends qx.ui.window.Window {
            constructor() {
                _super("Search in Files");
                this.form = new qx.ui.form.Form();
                var layout = new qx.ui.layout.VBox();
                this.setLayout(layout);
                this.add(this.createForm());
                this.setModal(true);
                this.addListener("resize", this.center);
            }
            /**
             * Open the search dialog with a root directory
             */
            search(rootDir) {
                this.rootDir = rootDir;
                this.show();
            }
            getResults(fileName, pattern, result) {
                try {
                    var content = Cats.OS.File.readTextFile(fileName);
                    if (!content.match(pattern))
                        return;
                    var lines = content.split("\n");
                    for (var x = 0; x < lines.length; x++) {
                        var line = lines[x];
                        var match = null;
                        while (match = pattern.exec(line)) {
                            var columnX = pattern.lastIndex - match[0].length;
                            var columnY = pattern.lastIndex;
                            var item = {
                                range: {
                                    start: { row: x, column: columnX },
                                    end: { row: x, column: columnY }
                                },
                                fileName: fileName,
                                message: line
                            };
                            result.push(item);
                        }
                    }
                }
                catch (err) {
                    console.error("Got error while handling file " + fileName);
                    console.error(err);
                }
            }
            run(param) {
                var result = [];
                var mod = param.caseInsensitive ? "i" : "";
                var searchPattern = new RegExp(param.search, "g" + mod);
                if (!param.glob)
                    param.glob = "**/*";
                Cats.OS.File.find(param.glob, this.rootDir, function (err, files) {
                    files.forEach(function (file) {
                        if (result.length > param.maxHits)
                            return;
                        var fullName = Cats.OS.File.join(this.rootDir, file);
                        this.getResults(fullName, searchPattern, result);
                    });
                    var resultTable = new Gui.ResultTable();
                    var toolTipText = "Search results for " + searchPattern + " in " + this.rootDir + "/" + param.glob;
                    var page = Cats.IDE.resultPane.addPage("search", resultTable, toolTipText);
                    page.setShowCloseButton(true);
                    resultTable.setData(result);
                    this.close();
                });
            }
            addTextField(label, model) {
                var t = new qx.ui.form.TextField();
                t.setWidth(200);
                this.form.add(t, label, null, model);
                return t;
            }
            addSpinner(label, model) {
                var s = new qx.ui.form.Spinner();
                s.set({ minimum: 0, maximum: 1000 });
                this.form.add(s, label, null, model);
                return s;
            }
            addCheckBox(label, model) {
                var cb = new qx.ui.form.CheckBox();
                this.form.add(cb, label, null, model);
                return cb;
            }
            createForm() {
                var s = this.addTextField("Search for", "search");
                s.setRequired(true);
                var p = this.addTextField("File Pattern", "glob");
                p.setValue("**/*");
                var c = this.addCheckBox("Case insensitive", "caseInsensitive");
                c.setValue(false);
                var m = this.addSpinner("Maximum hits", "maxHits");
                m.setValue(100);
                var searchButton = new qx.ui.form.Button("Search");
                var cancelButton = new qx.ui.form.Button("Cancel");
                this.form.addButton(searchButton);
                searchButton.addListener("execute", function () {
                    if (this.form.validate()) {
                        var param = {
                            search: s.getValue(),
                            glob: p.getValue(),
                            caseInsensitive: c.getValue(),
                            maxHits: m.getValue()
                        };
                        this.run(param);
                    }
                    ;
                }, this);
                this.form.addButton(cancelButton);
                cancelButton.addListener("execute", function () {
                    this.close();
                }, this);
                var renderer = new qx.ui.form.renderer.Single(this.form);
                return renderer;
            }
            createResultTable() {
                var r = new Gui.ResultTable();
                return r;
            }
        }
        Gui.SearchDialog = SearchDialog;
    })(Gui = Cats.Gui || (Cats.Gui = {}));
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
    var Gui;
    (function (Gui) {
        /**
         * Dialog window for capturing rename options and invoke
         * required functionality
         */
        class RenameDialog extends qx.ui.window.Window {
            constructor() {
                _super("Rename");
                this.form = new qx.ui.form.Form();
                var layout = new qx.ui.layout.VBox();
                this.setLayout(layout);
                this.add(this.createForm());
                this.setModal(true);
                this.addListener("resize", this.center);
            }
            run(fileName, project, pos) {
                project.iSense.getRenameInfo(fileName, pos, function (err, data) {
                    if (!data)
                        return;
                    if (!data.canRename) {
                        alert("Cannot rename the selected element");
                        return;
                    }
                    var dialog = new Gui.PromptDialog("Rename " + data.displayName + " into:");
                    dialog.onSuccess = function (newName) {
                        project.iSense.findRenameLocations(fileName, pos, false, false, function (err, data) {
                            // renameOccurences(data, newName);
                        });
                    };
                    dialog.show();
                });
            }
            addTextField(label, model) {
                var t = new qx.ui.form.TextField();
                t.setWidth(200);
                this.form.add(t, label, null, model);
                return t;
            }
            addSpinner(label, model) {
                var s = new qx.ui.form.Spinner();
                s.set({ minimum: 0, maximum: 1000 });
                this.form.add(s, label, null, model);
                return s;
            }
            addCheckBox(label, model) {
                var cb = new qx.ui.form.CheckBox();
                this.form.add(cb, label, null, model);
                return cb;
            }
            createForm() {
                var s = this.addTextField("New name", "name");
                s.setRequired(true);
                var c = this.addCheckBox("Replace in strings", "caseInsensitive");
                c.setValue(false);
                var d = this.addCheckBox("Replace in comments", "caseInsensitive");
                d.setValue(false);
                var searchButton = new qx.ui.form.Button("Refactor");
                var cancelButton = new qx.ui.form.Button("Cancel");
                this.form.addButton(searchButton);
                searchButton.addListener("execute", function () {
                    if (this.form.validate()) {
                        var param = {
                            name: s.getValue(),
                            caseInsensitive: c.getValue()
                        };
                    }
                    ;
                }, this);
                this.form.addButton(cancelButton);
                cancelButton.addListener("execute", function () {
                    this.close();
                }, this);
                var renderer = new qx.ui.form.renderer.Single(this.form);
                return renderer;
            }
        }
        Gui.RenameDialog = RenameDialog;
    })(Gui = Cats.Gui || (Cats.Gui = {}));
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
    var Gui;
    (function (Gui) {
        if (typeof nw != "undefined") {
            var GUI = nw;
        }
        else {
            var GUI = require('nw.gui');
        }
        var CMDS = Cats.Commands.CMDS;
        function getItem(cmd) {
            var item = {
                label: cmd.label,
                click: cmd.command
            };
            return new GUI.MenuItem(item);
        }
        /**
         * This class creates the main menubar. This is the only GUI component that
         * is not using Qooxdoo/HTML5 but an API exposed by NW.js.
         * This makes it possible to have a native menubar.
         *
         * @TODO revise if this is really the best approach.
         */
        class MenuBar {
            constructor() {
                this.menus = {};
                this.createMenuBar();
                this.createFileMenu();
                this.createEditMenu();
                this.createViewMenu();
                this.createProjectMenu();
                this.createSourceMenu();
                this.createHelpMenu();
                var win = GUI.Window.get();
                win.menu = this.menu;
            }
            createMenuBar() {
                this.menu = new GUI.Menu({ type: "menubar" });
                if (Cats.OS.File.isOSX() && this.menu.createMacBuiltin) {
                    this.menu.createMacBuiltin("CATS");
                    this.menus.cats = this.menu.items[0].submenu;
                    this.menus.edit = this.menu.items[1].submenu;
                    this.menus.window = this.menu.items[2].submenu;
                    // 0 is builtin CATS menu
                    this.createMenuBarItem("file", 1);
                    // 2 is builtin Edit
                    this.createMenuBarItem("view", 3);
                    this.createMenuBarItem("project", 4);
                    this.createMenuBarItem("source", 5);
                    // 6 is builtin Windows
                    this.createMenuBarItem("help");
                }
                else {
                    this.createMenuBarItem("file");
                    this.createMenuBarItem("edit");
                    this.createMenuBarItem("view");
                    this.createMenuBarItem("project");
                    this.createMenuBarItem("source");
                    this.createMenuBarItem("help");
                }
            }
            /**
             * Create an item in the main menu bar. Optional the position can be passed
             * for this item.
             */
            createMenuBarItem(name, position) {
                var label = qx.locale.Manager.tr(name + "_menu_name");
                var menu = new GUI.Menu();
                this.menus[name] = menu;
                if (position) {
                    this.menu.insert(new GUI.MenuItem({ label: label, submenu: menu }), position);
                }
                else {
                    this.menu.append(new GUI.MenuItem({ label: label, submenu: menu }));
                }
            }
            createSourceMenu() {
                var source = this.menus.source;
                source.append(getItem(CMDS.edit_toggleComment));
                source.append(getItem(CMDS.edit_toggleInvisibles));
                source.append(new GUI.MenuItem({ type: "separator" }));
                source.append(getItem(CMDS.edit_indent));
                source.append(getItem(CMDS.edit_outdent));
                source.append(new GUI.MenuItem({ type: "separator" }));
                source.append(getItem(CMDS.source_format));
                source.append(getItem(CMDS.edit_gotoLine));
            }
            createHelpMenu() {
                var help = this.menus["help"];
                help.append(getItem(CMDS.help_shortcuts));
                help.append(getItem(CMDS.help_processInfo));
                help.append(getItem(CMDS.help_devTools));
                help.append(getItem(CMDS.help_about));
            }
            createEditMenu() {
                var edit = this.menus.edit;
                // Already done by native OSX menu
                if (!Cats.OS.File.isOSX()) {
                    edit.append(getItem(CMDS.edit_undo));
                    edit.append(getItem(CMDS.edit_redo));
                    edit.append(new GUI.MenuItem({ type: "separator" }));
                    edit.append(getItem(CMDS.edit_cut));
                    edit.append(getItem(CMDS.edit_copy));
                    edit.append(getItem(CMDS.edit_paste));
                }
                edit.append(new GUI.MenuItem({ type: "separator" }));
                edit.append(getItem(CMDS.edit_find));
                edit.append(getItem(CMDS.edit_findNext));
                edit.append(getItem(CMDS.edit_findPrev));
                edit.append(getItem(CMDS.edit_replace));
                edit.append(getItem(CMDS.edit_replaceAll));
                edit.append(new GUI.MenuItem({ type: "separator" }));
                edit.append(getItem(CMDS.edit_toggleRecording));
                edit.append(getItem(CMDS.edit_replayMacro));
            }
            createFileMenu() {
                var file = this.menus.file;
                file.append(getItem(CMDS.file_new));
                file.append(new GUI.MenuItem({ type: "separator" }));
                file.append(getItem(CMDS.file_save));
                file.append(getItem(CMDS.file_saveAs));
                file.append(getItem(CMDS.file_saveAll));
                file.append(new GUI.MenuItem({ type: "separator" }));
                file.append(getItem(CMDS.file_close));
                file.append(getItem(CMDS.file_closeAll));
                file.append(getItem(CMDS.file_closeOther));
                file.append(new GUI.MenuItem({ type: "separator" }));
                file.append(getItem(CMDS.ide_configure));
                if (!Cats.OS.File.isOSX()) {
                    file.append(getItem(CMDS.ide_quit));
                }
            }
            recentProjects() {
                var menu = new GUI.Menu();
                Cats.IDE.config.projects.slice().reverse().forEach(function (project) {
                    if (!project)
                        return;
                    var item = {
                        label: project,
                        click: function () { Cats.IDE.addProject(project); }
                    };
                    menu.append(new GUI.MenuItem(item));
                });
                var entry = new GUI.MenuItem({
                    label: "Recent Projects",
                    submenu: menu
                });
                return entry;
            }
            createProjectMenu() {
                var proj = this.menus.project;
                proj.append(getItem(CMDS.project_open));
                proj.append(getItem(CMDS.project_close));
                proj.append(getItem(CMDS.project_new));
                proj.append(this.recentProjects());
                proj.append(new GUI.MenuItem({ type: "separator" }));
                proj.append(getItem(CMDS.project_build));
                proj.append(getItem(CMDS.project_run));
                proj.append(getItem(CMDS.project_validate));
                proj.append(getItem(CMDS.project_refresh));
                // proj.append( new GUI.MenuItem( { type: "separator" }) );
                // proj.append(getItem(CMDS.project_classDiagram));
                // proj.append( new GUI.MenuItem( { type: "separator" }) );
                // proj.append( getItem( CMDS.project_configure ) );
            }
            createViewMenu() {
                var view = this.menus.view;
                view.append(getItem(CMDS.ide_toggle_toolbar));
                view.append(getItem(CMDS.ide_toggle_statusbar));
                view.append(getItem(CMDS.ide_toggle_context));
                view.append(getItem(CMDS.ide_toggle_result));
            }
        }
        Gui.MenuBar = MenuBar;
    })(Gui = Cats.Gui || (Cats.Gui = {}));
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
    var Gui;
    (function (Gui) {
        /**
         * This class assists the SourceEditor for TypeScript files. It takes care of
         * diagnostics and outline updates.
         */
        class TSHelper {
            constructor(editor, editSession) {
                this.editor = editor;
                this.editSession = editSession;
                this.pendingUpdates = false;
                this.init();
            }
            init() {
                this.updateDiagnostics(0);
                this.updateOutline(0);
                this.editor.getLayoutItem().addListener("appear", function () {
                    this.updateDiagnostics(0);
                });
                this.editSession.on("change", function () {
                    this.updateContent();
                });
            }
            updateContent(timeout = 500) {
                if (!this.editor.isTypeScript())
                    return;
                clearTimeout(this.updateSourceTimer);
                this.pendingUpdates = true;
                this.updateSourceTimer = setTimeout(function () {
                    if (this.pendingUpdates) {
                        this.editor.project.iSense.updateScript(this.editor.filePath, this.editSession.getValue());
                        this.pendingUpdates = false;
                        this.updateDiagnostics();
                        this.updateOutline();
                    }
                }, timeout);
            }
            /**
            * Lets check the worker if something changed in the outline of the source.
            * But lets not call this too often.
            *
            */
            updateOutline(timeout = 5000) {
                if (!this.editor.isTypeScript())
                    return;
                var project = this.editor.project;
                clearTimeout(this.outlineTimer);
                this.outlineTimer = setTimeout(function () {
                    project.iSense.getScriptOutline(this.editor.filePath, function (err, data) {
                        this.editor.set("outline", data);
                    });
                }, timeout);
            }
            /**
             * Lets check the worker if something changed in the diagnostic.
             *
             */
            updateDiagnostics(timeout = 1000) {
                if (!this.editor.isTypeScript())
                    return;
                var project = this.editor.project;
                this.diagnosticTimer = setTimeout(function () {
                    project.iSense.getErrors(this.editor.filePath, function (err, result) {
                        if (project.config.tslint && project.config.tslint.useLint) {
                            result = result.concat(project.linter.lint(this.editor.filePath, this.editor.getContent()));
                        }
                        this.editSession.showAnnotations(result);
                    });
                }, timeout);
            }
        }
        Gui.TSHelper = TSHelper;
    })(Gui = Cats.Gui || (Cats.Gui = {}));
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
    var Util;
    (function (Util) {
        /**
         * Some help to find based on the file name extension either the computer language (for the editor)
         * or the mimetype (for the icons in the file navigator)
         */
        class MimeTypeFinder {
            constructor() {
            }
            /**
             * Find the mimetype for a file name
             */
            static lookup(filename, fallback) {
                return this.types[Cats.OS.File.PATH.extname(filename)] || fallback || this.default_type;
            }
        }
        MimeTypeFinder.default_type = 'application/octet-stream';
        MimeTypeFinder.types = {
            ".3gp": "video/3gpp",
            ".a": "application/octet-stream",
            ".ai": "application/postscript",
            ".aif": "audio/x-aiff",
            ".aiff": "audio/x-aiff",
            ".arj": "application/x-arj-compressed",
            ".asc": "application/pgp-signature",
            ".asf": "video/x-ms-asf",
            ".asm": "text/x-asm",
            ".asx": "video/x-ms-asf",
            ".atom": "application/atom+xml",
            ".au": "audio/basic",
            ".avi": "video/x-msvideo",
            ".bat": "application/x-msdownload",
            ".bcpio": "application/x-bcpio",
            ".bin": "application/octet-stream",
            ".bmp": "image/bmp",
            ".bz2": "application/x-bzip2",
            ".c": "text/x-c",
            ".cab": "application/vnd.ms-cab-compressed",
            ".cc": "text/x-c",
            ".ccad": "application/clariscad",
            ".chm": "application/vnd.ms-htmlhelp",
            ".class": "application/octet-stream",
            ".cod": "application/vnd.rim.cod",
            ".com": "application/x-msdownload",
            ".conf": "text/plain",
            ".cpio": "application/x-cpio",
            ".cpp": "text/x-c",
            ".cpt": "application/mac-compactpro",
            ".crt": "application/x-x509-ca-cert",
            ".csh": "application/x-csh",
            ".css": "text/css",
            ".csv": "text/csv",
            ".cxx": "text/x-c",
            ".dart": "application/dart",
            ".deb": "application/x-debian-package",
            ".der": "application/x-x509-ca-cert",
            ".diff": "text/x-diff",
            ".djv": "image/vnd.djvu",
            ".djvu": "image/vnd.djvu",
            ".dl": "video/dl",
            ".dll": "application/x-msdownload",
            ".dmg": "application/octet-stream",
            ".doc": "application/msword",
            ".dot": "application/msword",
            ".drw": "application/drafting",
            ".dtd": "application/xml-dtd",
            ".dvi": "application/x-dvi",
            ".dwg": "application/acad",
            ".dxf": "application/dxf",
            ".dxr": "application/x-director",
            ".ear": "application/java-archive",
            ".eml": "message/rfc822",
            ".eps": "application/postscript",
            ".etx": "text/x-setext",
            ".exe": "application/x-msdownload",
            ".ez": "application/andrew-inset",
            ".f": "text/x-fortran",
            ".f77": "text/x-fortran",
            ".f90": "text/x-fortran",
            ".fli": "video/x-fli",
            ".flv": "video/x-flv",
            ".for": "text/x-fortran",
            ".gem": "application/octet-stream",
            ".gemspec": "text/x-script.ruby",
            ".gif": "image/gif",
            ".gl": "video/gl",
            ".gtar": "application/x-gtar",
            ".gz": "application/x-gzip",
            ".h": "text/x-c",
            ".hdf": "application/x-hdf",
            ".hh": "text/x-c",
            ".hqx": "application/mac-binhex40",
            ".htm": "text/html",
            ".html": "text/html",
            ".ice": "x-conference/x-cooltalk",
            ".ico": "image/vnd.microsoft.icon",
            ".ics": "text/calendar",
            ".ief": "image/ief",
            ".ifb": "text/calendar",
            ".igs": "model/iges",
            ".ips": "application/x-ipscript",
            ".ipx": "application/x-ipix",
            ".iso": "application/octet-stream",
            ".jad": "text/vnd.sun.j2me.app-descriptor",
            ".jar": "application/java-archive",
            ".java": "text/x-java-source",
            ".jnlp": "application/x-java-jnlp-file",
            ".jpeg": "image/jpeg",
            ".jpg": "image/jpeg",
            ".js": "application/javascript",
            ".json": "application/json",
            ".latex": "application/x-latex",
            ".log": "text/plain",
            ".lsp": "application/x-lisp",
            ".lzh": "application/octet-stream",
            ".m": "text/plain",
            ".m3u": "audio/x-mpegurl",
            ".m4v": "video/mp4",
            ".man": "text/troff",
            ".mathml": "application/mathml+xml",
            ".mbox": "application/mbox",
            ".mdoc": "text/troff",
            ".me": "text/troff",
            ".mid": "audio/midi",
            ".midi": "audio/midi",
            ".mif": "application/x-mif",
            ".mime": "www/mime",
            ".mml": "application/mathml+xml",
            ".mng": "video/x-mng",
            ".mov": "video/quicktime",
            ".movie": "video/x-sgi-movie",
            ".mp3": "audio/mpeg",
            ".mp4": "video/mp4",
            ".mp4v": "video/mp4",
            ".mpeg": "video/mpeg",
            ".mpg": "video/mpeg",
            ".mpga": "audio/mpeg",
            ".ms": "text/troff",
            ".msi": "application/x-msdownload",
            ".nc": "application/x-netcdf",
            ".oda": "application/oda",
            ".odp": "application/vnd.oasis.opendocument.presentation",
            ".ods": "application/vnd.oasis.opendocument.spreadsheet",
            ".odt": "application/vnd.oasis.opendocument.text",
            ".ogg": "application/ogg",
            ".ogm": "application/ogg",
            ".p": "text/x-pascal",
            ".pas": "text/x-pascal",
            ".pbm": "image/x-portable-bitmap",
            ".pdf": "application/pdf",
            ".pem": "application/x-x509-ca-cert",
            ".pgm": "image/x-portable-graymap",
            ".pgn": "application/x-chess-pgn",
            ".pgp": "application/pgp",
            ".pkg": "application/octet-stream",
            ".pl": "text/x-script.perl",
            ".pm": "application/x-perl",
            ".png": "image/png",
            ".pnm": "image/x-portable-anymap",
            ".ppm": "image/x-portable-pixmap",
            ".pps": "application/vnd.ms-powerpoint",
            ".ppt": "application/vnd.ms-powerpoint",
            ".ppz": "application/vnd.ms-powerpoint",
            ".pre": "application/x-freelance",
            ".prt": "application/pro_eng",
            ".ps": "application/postscript",
            ".psd": "image/vnd.adobe.photoshop",
            ".py": "text/x-script.python",
            ".qt": "video/quicktime",
            ".ra": "audio/x-realaudio",
            ".rake": "text/x-script.ruby",
            ".ram": "audio/x-pn-realaudio",
            ".rar": "application/x-rar-compressed",
            ".ras": "image/x-cmu-raster",
            ".rb": "text/x-script.ruby",
            ".rdf": "application/rdf+xml",
            ".rgb": "image/x-rgb",
            ".rm": "audio/x-pn-realaudio",
            ".roff": "text/troff",
            ".rpm": "application/x-redhat-package-manager",
            ".rss": "application/rss+xml",
            ".rtf": "text/rtf",
            ".rtx": "text/richtext",
            ".ru": "text/x-script.ruby",
            ".s": "text/x-asm",
            ".scm": "application/x-lotusscreencam",
            ".set": "application/set",
            ".sgm": "text/sgml",
            ".sgml": "text/sgml",
            ".sh": "application/x-sh",
            ".shar": "application/x-shar",
            ".sig": "application/pgp-signature",
            ".silo": "model/mesh",
            ".sit": "application/x-stuffit",
            ".skt": "application/x-koan",
            ".smil": "application/smil",
            ".snd": "audio/basic",
            ".so": "application/octet-stream",
            ".sol": "application/solids",
            ".spl": "application/x-futuresplash",
            ".src": "application/x-wais-source",
            ".stl": "application/SLA",
            ".stp": "application/STEP",
            ".sv4cpio": "application/x-sv4cpio",
            ".sv4crc": "application/x-sv4crc",
            ".svg": "image/svg+xml",
            ".svgz": "image/svg+xml",
            ".swf": "application/x-shockwave-flash",
            ".t": "text/troff",
            ".tar": "application/x-tar",
            ".tbz": "application/x-bzip-compressed-tar",
            ".tcl": "application/x-tcl",
            ".tex": "application/x-tex",
            ".texi": "application/x-texinfo",
            ".texinfo": "application/x-texinfo",
            ".text": "text/plain",
            ".tgz": "application/x-tar-gz",
            ".tif": "image/tiff",
            ".tiff": "image/tiff",
            ".torrent": "application/x-bittorrent",
            ".tr": "text/troff",
            ".ts": "application/x-typescript",
            ".tsi": "audio/TSP-audio",
            ".tsp": "application/dsptype",
            ".tsv": "text/tab-separated-values",
            ".txt": "text/plain",
            ".unv": "application/i-deas",
            ".ustar": "application/x-ustar",
            ".vcd": "application/x-cdlink",
            ".vcf": "text/x-vcard",
            ".vcs": "text/x-vcalendar",
            ".vda": "application/vda",
            ".vivo": "video/vnd.vivo",
            ".vrm": "x-world/x-vrml",
            ".vrml": "model/vrml",
            ".war": "application/java-archive",
            ".wav": "audio/x-wav",
            ".wax": "audio/x-ms-wax",
            ".wma": "audio/x-ms-wma",
            ".wmv": "video/x-ms-wmv",
            ".wmx": "video/x-ms-wmx",
            ".wrl": "model/vrml",
            ".wsdl": "application/wsdl+xml",
            ".wvx": "video/x-ms-wvx",
            ".xbm": "image/x-xbitmap",
            ".xhtml": "application/xhtml+xml",
            ".xls": "application/vnd.ms-excel",
            ".xlw": "application/vnd.ms-excel",
            ".xml": "application/xml",
            ".xpm": "image/x-xpixmap",
            ".xsl": "application/xml",
            ".xslt": "application/xslt+xml",
            ".xwd": "image/x-xwindowdump",
            ".xyz": "chemical/x-pdb",
            ".yaml": "text/yaml",
            ".yml": "text/yaml",
            ".zip": "application/zip"
        };
        Util.MimeTypeFinder = MimeTypeFinder;
    })(Util = Cats.Util || (Cats.Util = {}));
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
    var Util;
    (function (Util) {
        /**
         * Dynamically load resources like CSS and Javascript files.
         *
         */
        class ResourceLoader {
            constructor() {
            }
            require(file, callback) {
                callback = callback ||
                    function () { };
                var jsfile_extension = /(.js)$/i;
                var cssfile_extension = /(.css)$/i;
                if (jsfile_extension.test(file)) {
                    var scriptnode = document.createElement('script');
                    scriptnode.src = file;
                    scriptnode.onload = function () {
                        callback();
                    };
                    document.head.appendChild(scriptnode);
                }
                else if (cssfile_extension.test(file)) {
                    var linknode = document.createElement('link');
                    linknode.rel = 'stylesheet';
                    linknode.type = 'text/css';
                    linknode.href = file;
                    document.head.appendChild(linknode);
                    callback();
                }
                else {
                    console.log("Unknown file type to load.");
                }
            }
            loadResources(files, callback) {
                var counter = 0;
                files.forEach(function (file) {
                    this.require(file, function () {
                        counter++;
                        if (counter === files.length) {
                            callback();
                        }
                    });
                });
            }
        }
        Util.ResourceLoader = ResourceLoader;
    })(Util = Cats.Util || (Cats.Util = {}));
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
 * Main module of the CATS IDE
 */
var Cats;
(function (Cats) {
    function getNWWindow() {
        if (typeof nw != "undefined") {
            return nw["Window"].get();
        }
        else {
            var GUI = require('nw.gui');
            return GUI.Window.get();
        }
    }
    Cats.getNWWindow = getNWWindow;
    function getNWGui() {
        if (typeof nw != "undefined") {
            return nw;
        }
        else {
            global.nw = require('nw.gui');
            return nw;
        }
    }
    Cats.getNWGui = getNWGui;
    /**
     * Get a parameter from the URL. This is used when a new project is opened from within
     * the IDE and the project name is passed s a parameter.
     */
    function getParameterByName(val) {
        var items = location.search.substr(1).split("&");
        for (var index = 0; index < items.length; index++) {
            var tmp = items[index].split("=");
            if (tmp[0] === val)
                return decodeURIComponent(tmp[1]);
        }
    }
    /**
     * Determine which project(s) we should load during
     * startup. This is used when the IDE is started from the command line
     */
    function determineProject(args) {
        var projectName = getParameterByName("project");
        if (!projectName) {
            var i = args.indexOf("--project");
            if (i > -1)
                projectName = args[i + 1];
        }
        return projectName;
    }
    /**
     * This is the functions that kicks it all of. When Qooxdoo is loaded it will
     * call this main to start the application.
     */
    function main(app) {
        var GUI = require('nw.gui');
        var args = GUI.App.argv;
        if (args.indexOf("--debug") === -1) {
            console.info = function () { };
            console.debug = function () { };
        }
        Cats.IDE = new Cats.Ide();
        Cats.IDE.init(app.getRoot());
        if (args.indexOf("--debug") > -1) {
            Cats.IDE.debug = true;
        }
        var prjDir = determineProject(args);
        if (prjDir) {
            Cats.IDE.addProject(prjDir);
        }
        else {
            if (args.indexOf("--restore") !== -1)
                Cats.IDE.restorePreviousProjects();
        }
    }
    // Catch unhandled expections so they don't stop the process.
    process.on("uncaughtException", function (err) {
        console.error("Uncaught exception occured: " + err);
        console.error(err.stack);
        if (Cats.IDE.console)
            Cats.IDE.console.error(err.stack);
    });
    // Register the main method that once Qooxdoo is loaded is called
    qx.registry.registerMainMethod(main);
})(Cats || (Cats = {}));
