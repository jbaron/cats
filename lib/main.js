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
        function darken(hex, lum) {
            if (lum === void 0) { lum = 0; }
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
                style: function (states) { return { decorator: undefined }; }
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
                            backgroundColor: undefined,
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
    var Attribute = (function () {
        function Attribute() {
        }
        return Attribute;
    })();
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
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
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
            var Watcher = (function (_super) {
                __extends(Watcher, _super);
                function Watcher() {
                    _super.call(this);
                    // Keeps track of the files and directories that are being watched 
                    this.watches = {};
                }
                /**
                 * Add a new file or directory to the watch list. If it already exists it is being ignored
                 *
                 */
                Watcher.prototype.add = function (name) {
                    var _this = this;
                    if (this.watches[name])
                        return;
                    var w = fs.watch(name, function (event, filename) {
                        console.info("Node changed " + name + " event " + event + " fileName " + filename);
                        _this.emit("change", name);
                    });
                    this.watches[name] = w;
                };
                /**
                  * Add a new directory to the watch list. If it already exists it is being ignored.
                  * Only rename type of events are being propgated (so new files or deletes).
                  *
                  * Files within a directory changing size etc are not propagated.
                  *
                  */
                Watcher.prototype.addDir = function (name) {
                    var _this = this;
                    if (this.watches[name])
                        return;
                    var w = fs.watch(name, function (event, filename) {
                        console.info("Node changed " + name + " event " + event + " fileName " + filename);
                        if (event === "rename")
                            _this.emit("change", name);
                    });
                    this.watches[name] = w;
                };
                /**
                 * Remove an entry from the watch list (file or directory)
                 *
                 * @param name The filepath that no longer should be watched
                 *
                 */
                Watcher.prototype.remove = function (name) {
                    var w = this.watches[name];
                    if (w) {
                        w.close();
                        delete this.watches[name];
                    }
                };
                return Watcher;
            })(qx.event.Emitter);
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
                var result = [
                    { key: "fileName", value: fileName }
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
            function runCommand(cmd, options, logger) {
                if (logger === void 0) { logger = Cats.IDE.console; }
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
            function join(a, b, native) {
                if (native === void 0) { native = false; }
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
             * Determine the newLineMode.
             *
             * @return Return value is either dos or unix
             *
             */
            function determineNewLineChar() {
                try {
                    var char = Cats.IDE.project.config.codeFormat.NewLineCharacter;
                    if (char)
                        return char;
                }
                catch (exp) { }
                if (isWindows())
                    return "\r\n";
                return "\n";
            }
            /**
             * Write text content to a file. If a directory doesn't exist, create it
             *
             * @param name The full name of the file
             * @param value The content of the file
             * @param stat Indicate if we should return the stat values of the newly written file
             *
             */
            function writeTextFile(name, value, stat) {
                if (stat === void 0) { stat = false; }
                var newLineChar = determineNewLineChar();
                if (newLineChar !== "\n") {
                    value = value.replace(/\n/g, newLineChar);
                }
                var fileName = name;
                fileName = File.PATH.resolve(Cats.IDE.project.projectDir, fileName);
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
             * Sort two directory directorie entries first on
             * directory versus file and then on alphabet.
             *
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
             * Read the files from a directory
             *
             * @param directory The directory name that should be read
             *
             */
            function readDir(directory, sorted) {
                if (sorted === void 0) { sorted = false; }
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
             * Read the content from a text file
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
    var GUI = require('nw.gui');
    /**
     * This class represents the total IDE. The CATS is started a single isntance will be
     * created that takes care of rendering all the components and open a project if applicable.
     *
     */
    var Ide = (function (_super) {
        __extends(Ide, _super);
        function Ide() {
            var _this = this;
            _super.call(this);
            // List of different themes that are available
            this.themes = {
                cats: cats.theme.Default,
                gray: cats.theme.Grey,
                classic: qx.theme.Classic,
                indigo: qx.theme.Indigo,
                modern: qx.theme.Modern,
                simple: qx.theme.Simple
            };
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
                    _this.goto(data.state);
            };
            this.loadShortCuts();
        }
        Ide.prototype.loadShortCuts = function () {
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
                var cmd = new qx.ui.core.Command(shortCut);
                cmd.addListener("execute", (function (commandName) {
                    Cats.Commands.CMDS[commandName].command();
                }).bind(null, commandName));
            }
        };
        /**
         * Load the icons map from the file.
         */
        Ide.prototype.loadIconsMap = function () {
            return JSON.parse(Cats.OS.File.readTextFile("resource/icons.json"));
        };
        Ide.prototype.setColors = function () {
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
        };
        /**
         * Load all the locale dependend messages from the message file.
         *
         * @param locale The locale you want to retrieve the messages for
         */
        Ide.prototype.loadMessages = function (locale) {
            if (locale === void 0) { locale = "en"; }
            var fileName = "resource/locales/" + locale + "/messages.json";
            var messages = JSON.parse(Cats.OS.File.readTextFile(fileName));
            var map = {};
            for (var key in messages) {
                map[key] = messages[key].message;
            }
            qx.locale.Manager.getInstance().setLocale(locale);
            qx.locale.Manager.getInstance().addTranslation(locale, map);
        };
        Ide.prototype.goto = function (entry) {
            var hash = entry.hash;
            this.lastEntry = entry;
            var page = qx.core.ObjectRegistry.fromHashCode(hash);
            if (page)
                Cats.IDE.editorTabView.navigateToPage(page, entry.pos);
        };
        /**
         * Initialize the different modules within the IDE.
         *
         */
        Ide.prototype.init = function (rootDoc) {
            Cats.Commands.init();
            var layouter = new Cats.Gui.Layout(rootDoc);
            layouter.layout(this);
            this.menuBar = new Cats.Gui.MenuBar();
            this.initFileDropArea();
            this.handleCloseWindow();
        };
        /**
         * Add an entry to the history list
         */
        Ide.prototype.addHistory = function (editor, pos) {
            var page = this.editorTabView.getPageForEditor(editor);
            if ((this.lastEntry.hash === page.toHashCode()) && (this.lastEntry.pos === pos))
                return;
            var entry = {
                hash: page.toHashCode(),
                pos: pos
            };
            history.pushState(entry, page.getLabel());
        };
        /**
         * Configure the IDE based on the settings
         */
        Ide.prototype.configure = function () {
            var config = this.config;
            if (config.theme) {
                var theme = this.themes[config.theme] || this.themes.cats;
                if (theme !== qx.theme.manager.Meta.getInstance().getTheme()) {
                    qx.theme.manager.Meta.getInstance().setTheme(theme);
                }
            }
        };
        /**
         * Attach the drag n' drop event listeners to the document
         *
         * @author  LordZardeck <sean@blackfireweb.com>
         */
        Ide.prototype.initFileDropArea = function () {
            // Listen onto file drop events
            document.documentElement.addEventListener("drop", this.acceptFileDrop.bind(this), false);
            // Prevent the browser from redirecting to the file
            document.documentElement.addEventListener("dragover", function (event) {
                event.stopPropagation();
                event.preventDefault();
                event.dataTransfer.dropEffect = "copy"; // Explicitly show this is a copy.
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
                var path = files[i].path;
                Cats.FileEditor.OpenEditor(path);
            }
        };
        /**
         * Load the projects and files that were open last time before the
         * IDE was closed.
         */
        Ide.prototype.restorePreviousProjects = function () {
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
        };
        /**
         * Load the configuration for the IDE. If there is no configuration
         * found, create the default one to use.
         */
        Ide.prototype.loadPreferences = function () {
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
        };
        /**
         * Update the configuration for IDE
         *
         */
        Ide.prototype.updatePreferences = function (config) {
            this.config = config;
            this.emit("config", config);
            this.configure();
            this.savePreferences();
        };
        /**
         * Persist the current IDE configuration to a file
         */
        Ide.prototype.savePreferences = function () {
            try {
                var config = this.config;
                config.version = "1.1";
                config.sessions = [];
                config.projects = this.recentProjects;
                if (this.project) {
                    this.editorTabView.getEditors().forEach(function (editor) {
                        var state = editor.getState();
                        if ((state !== null) && (editor.getType())) {
                            config.sessions.push({
                                state: JSON.stringify(state),
                                type: editor.getType()
                            });
                        }
                    });
                }
                ;
                var configStr = JSON.stringify(config);
                localStorage[Ide.STORE_KEY] = configStr;
            }
            catch (err) {
                console.error(err);
            }
        };
        /**
         * Add a new project to the IDE
         *
         * @param projectDir the directory of the new project
         */
        Ide.prototype.addProject = function (projectDir) {
            projectDir = Cats.OS.File.PATH.resolve(this.catsHomeDir, projectDir);
            if (this.recentProjects.indexOf(projectDir) === -1) {
                this.recentProjects.push(projectDir);
            }
            if (!this.project) {
                this.project = new Cats.Project(projectDir);
                this.fileNavigator.setProject(this.project);
            }
            else {
                var param = encodeURIComponent(projectDir);
                window.open('index.html?project=' + param);
            }
        };
        Ide.prototype.handleCloseWindow = function () {
            // Catch the close of the windows in order to save any unsaved changes
            var win = GUI.Window.get();
            win.on("close", function () {
                var _this = this;
                var doClose = function () {
                    Cats.IDE.savePreferences();
                    _this.close(true);
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
        };
        /**
         * Quit the application. If there are unsaved changes ask the user if they really
         * want to quit.
         */
        Ide.prototype.quit = function () {
            var _this = this;
            var doClose = function () {
                _this.savePreferences();
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
        };
        Ide.STORE_KEY = "cats.config";
        return Ide;
    })(qx.event.Emitter);
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
    var ProjectSettings = (function () {
        function ProjectSettings(projectRoot) {
            this.projectRoot = projectRoot;
        }
        /**
         * Get the name of the configuation file
         */
        ProjectSettings.prototype.getFileName = function () {
            return Cats.OS.File.join(this.projectRoot, ".settings/config.json");
        };
        /**
         * Load the configuration for this project
         */
        ProjectSettings.prototype.load = function () {
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
        };
        /**
         * Store the configuration
         */
        ProjectSettings.prototype.store = function () {
            var name = this.getFileName();
            var content = JSON.stringify(this.value, null, 4);
            Cats.OS.File.writeTextFile(name, content);
        };
        /**
         * Load the default configuration for a project
         */
        ProjectSettings.prototype.loadDefault = function () {
            var result = {
                version: "1.3",
                main: "index.html",
                src: null,
                buildOnSave: false,
                compiler: {
                    "module": 0 /* None */,
                    "noLib": false,
                    "removeComments": false,
                    "noImplicitAny": false,
                    "declaration": false,
                    "sourceMap": false,
                    "target": 1 /* ES5 */,
                },
                tslint: {
                    useLint: false
                },
                codeFormat: {},
                documentation: {}
            };
            this.value = result;
        };
        return ProjectSettings;
    })();
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
    var TSWorkerProxy = (function () {
        function TSWorkerProxy(project) {
            this.project = project;
            this.messageId = 0;
            this.registry = {};
            // Create a new webworker
            this.worker = new Worker("lib/tsworker.js");
            this.initWorker();
        }
        TSWorkerProxy.prototype.stop = function () {
            this.worker.terminate();
        };
        /**
         * Get the diagnostic messages for a file
         */
        TSWorkerProxy.prototype.getErrors = function (fileName, cb) {
            this.perform("getErrors", fileName, cb);
        };
        TSWorkerProxy.prototype.getNavigateToItems = function (search, cb) {
            this.perform("getNavigateToItems", search, cb);
        };
        TSWorkerProxy.prototype.getAllDiagnostics = function (cb) {
            this.perform("getAllDiagnostics", cb);
        };
        TSWorkerProxy.prototype.getTodoItems = function (cb) {
            this.perform("getTodoItems", cb);
        };
        TSWorkerProxy.prototype.getFormattedTextForRange = function (sessionName, range, cb) {
            this.perform("getFormattedTextForRange", sessionName, range, cb);
        };
        TSWorkerProxy.prototype.getDefinitionAtPosition = function (sessionName, cursor, cb) {
            this.perform("getDefinitionAtPosition", sessionName, cursor, cb);
        };
        TSWorkerProxy.prototype.findRenameLocations = function (fileName, position, findInStrings, findInComments, cb) {
            this.perform("findRenameLocations", fileName, position, findInStrings, findInComments, cb);
        };
        TSWorkerProxy.prototype.getCrossReference = function (type, sessionName, cursor, cb) {
            this.perform("getCrossReference", type, sessionName, cursor, cb);
        };
        TSWorkerProxy.prototype.compile = function (cb) {
            this.perform("compile", cb);
        };
        TSWorkerProxy.prototype.getScriptOutline = function (sessionName, cb) {
            this.perform("getScriptOutline", sessionName, cb);
        };
        TSWorkerProxy.prototype.getInfoAtPosition = function (name, docPos, cb) {
            this.perform("getInfoAtPosition", name, docPos, cb);
        };
        TSWorkerProxy.prototype.getRenameInfo = function (name, docPos, cb) {
            this.perform("getRenameInfo", name, docPos, cb);
        };
        TSWorkerProxy.prototype.getObjectModel = function (cb) {
            this.perform("getObjectModel", cb);
        };
        TSWorkerProxy.prototype.setSettings = function (compilerSettings, editorSettings) {
            this.perform("setSettings", compilerSettings, editorSettings, null);
        };
        TSWorkerProxy.prototype.addScript = function (fileName, content) {
            this.perform("addScript", fileName, content, null);
        };
        TSWorkerProxy.prototype.updateScript = function (fileName, content) {
            this.perform("updateScript", fileName, content, null);
        };
        TSWorkerProxy.prototype.getCompletions = function (fileName, cursor, cb) {
            this.perform("getCompletions", fileName, cursor, cb);
        };
        TSWorkerProxy.prototype.initialize = function () {
            this.perform("initialize", null);
        };
        /**
         * Invoke a method on the worker using JSON-RPC message structure
         */
        TSWorkerProxy.prototype.perform = function (method) {
            var data = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                data[_i - 1] = arguments[_i];
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
                this.registry[this.messageId] = handler;
            }
        };
        /**
         * Clear any pending handlers
         */
        TSWorkerProxy.prototype.clear = function () {
            this.registry = {};
        };
        /**
         * Setup the message communication with the worker
         */
        TSWorkerProxy.prototype.initWorker = function () {
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
                    var handler = _this.registry[id];
                    if (handler) {
                        delete _this.registry[id];
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
        };
        return TSWorkerProxy;
    })();
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
    var GUI = require('nw.gui');
    var typedoc;
    /**
     * The project hold the informaiton related to a single project. This include
     * a reference to a worker thread that does much of the TypeScript intelli sense.
     */
    var Project = (function (_super) {
        __extends(Project, _super);
        /**
         * Create a new project.
         */
        function Project(projectDir) {
            var _this = this;
            _super.call(this);
            this.tsfiles = [];
            // IDE.project = this;
            var dir = Cats.OS.File.PATH.resolve(projectDir);
            this.projectDir = Cats.OS.File.switchToForwardSlashes(dir);
            this.refresh();
            if (this.config.tslint.useLint)
                this.linter = new Cats.Linter(this);
            // @TODO optimize only refresh in case of changes
            this.refreshInterval = setInterval(function () { _this.refreshTodoList(); }, 30000);
        }
        Object.defineProperty(Project.prototype, "config", {
            /**
             * Get the project settings
             */
            get: function () {
                return this.settings.value;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Save the project configuration
         */
        Project.prototype.updateConfig = function (config) {
            this.settings.value = config;
            this.emit("config", config);
            if (this.config.tslint.useLint)
                this.linter = new Cats.Linter(this);
            this.settings.store();
            this.iSense.setSettings(this.config.compiler, this.config.codeFormat);
        };
        Project.prototype.refreshTodoList = function () {
            this.iSense.getTodoItems(function (err, data) {
                Cats.IDE.todoList.setData(data);
            });
        };
        /**
         * Close the project
         */
        Project.prototype.close = function () {
            var _this = this;
            if (Cats.IDE.editorTabView.hasUnsavedChanges()) {
                var dialog = new Cats.Gui.ConfirmDialog("You have some unsaved changes that will get lost.\n Continue anyway ?");
                dialog.onConfirm = function () {
                    _this._close();
                };
            }
            else {
                this._close();
            }
        };
        /**
         * Close the project without confirmation.
         * (Internal, do not use directly)
         */
        Project.prototype._close = function () {
            // Lets clear the various output panes.
            Cats.IDE.editorTabView.closeAll();
            Cats.IDE.fileNavigator.clear();
            Cats.IDE.outlineNavigator.clear();
            Cats.IDE.problemResult.clear();
            Cats.IDE.todoList.clear();
            if (this.iSense)
                this.iSense.stop();
            clearInterval(this.refreshInterval);
            Cats.IDE.project = null;
        };
        /**
         * Show the errors on a project level
         */
        Project.prototype.validate = function (verbose) {
            if (verbose === void 0) { verbose = true; }
            this.iSense.getAllDiagnostics(function (err, data) {
                if (data) {
                    Cats.IDE.problemResult.setData(data);
                    if (data.length === 0) {
                        if (verbose) {
                            Cats.IDE.console.log("Project has no errors");
                        }
                    }
                }
            });
        };
        /**
         * Build this project either with the built-in capabilities or by calling
         * an external build tool.
         */
        Project.prototype.build = function () {
            var _this = this;
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
                    _this.showCompilationResults(data);
                    if (data.errors && (data.errors.length > 0))
                        return;
                    var sources = data.source;
                    sources.forEach(function (source) {
                        Cats.OS.File.writeTextFile(source.fileName, source.content);
                    });
                    Cats.IDE.console.log("Done building project " + _this.name + ".");
                });
            }
        };
        /**
         * Generate the documentation for this project
         */
        Project.prototype.document = function () {
            var _this = this;
            var outputDir = this.config.documentation.outputDirectory;
            if (!outputDir) {
                alert("Please configure a output directoty Project -> Settings");
                return;
            }
            var win = new Cats.Gui.BusyWindow("Generating Documentation");
            win.show();
            win.addListenerOnce("ready", function () {
                try {
                    if (!typedoc)
                        typedoc = require('typedoc');
                    var settings = new typedoc.Settings();
                    settings.name = _this.name;
                    settings.compiler = JSON.parse(JSON.stringify(_this.config.compiler));
                    settings.compiler.codepage = null;
                    settings.compiler.noLib = true;
                    settings.compiler.noResolve = true;
                    settings.compiler.mapRoot = "";
                    settings.compiler.sourceRoot = "";
                    var readme = "none";
                    if (_this.config.documentation.readme && (_this.config.documentation.readme !== "none")) {
                        readme = Cats.OS.File.join(_this.projectDir, _this.config.documentation.readme);
                    }
                    settings.readme = readme;
                    settings.includeDeclarations = _this.config.documentation.includeDeclarations || false;
                    settings.verbose = false;
                    settings.theme = _this.config.documentation.theme || "default";
                    var app = new typedoc.Application(settings);
                    var dest = Cats.OS.File.join(_this.projectDir, outputDir);
                    app.generate(_this.tsfiles, dest);
                }
                finally {
                    win.hide();
                }
            });
        };
        /**
         *  Refresh the project and loads required artifacts
         *  again from the filesystem to be fully in sync
         */
        Project.prototype.refresh = function () {
            var _this = this;
            this.settings = new Cats.ProjectSettings(this.projectDir);
            this.settings.load();
            this.name = this.config.name || Cats.OS.File.PATH.basename(this.projectDir);
            document.title = "CATS | " + this.name;
            if (this.iSense)
                this.iSense.stop();
            this.iSense = new Cats.TSWorkerProxy(this);
            this.iSense.setSettings(this.config.compiler, this.config.codeFormat);
            if (!this.config.compiler.noLib) {
                var fullName = Cats.OS.File.join(Cats.IDE.catsHomeDir, "resource/typings/lib.d.ts");
                var libdts = Cats.OS.File.readTextFile(fullName);
                this.addScript(fullName, libdts);
            }
            var srcs = new Array().concat(this.config.src);
            srcs.forEach(function (src) {
                _this.loadTypeScriptFiles(src);
            });
            this.refreshTodoList();
        };
        /**
         * Compile without actually saving the resulting files
         */
        Project.prototype.trialCompile = function () {
            var _this = this;
            this.iSense.compile(function (err, data) {
                _this.showCompilationResults(data);
            });
        };
        Project.prototype.showCompilationResults = function (data) {
            if (data.errors && (data.errors.length > 0)) {
                Cats.IDE.problemResult.setData(data.errors);
                return;
            }
            Cats.IDE.problemResult.clear();
            Cats.IDE.console.log("Successfully compiled " + Object.keys(data.source).length + " file(s).");
        };
        /**
         * Run this project either with the built-in capabilities (only for web apps) or by calling
         * and external command (for example node).
         */
        Project.prototype.run = function () {
            if (this.config.customRun && this.config.customRun.command) {
                var cmd = this.config.customRun.command;
                var options = this.config.customRun.options || { cwd: null };
                if (!options.cwd) {
                    options.cwd = this.projectDir;
                }
                Cats.OS.File.runCommand(cmd, options);
            }
            else {
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
        };
        /**
         * Get the URL for running the project
         */
        Project.prototype.getStartURL = function () {
            var url = Cats.OS.File.join(this.projectDir, this.config.main);
            return "file://" + url;
        };
        Project.prototype.hasScriptFile = function (fileName) {
            return this.tsfiles.indexOf(fileName) > -1;
        };
        Project.prototype.addScript = function (fullName, content) {
            this.iSense.addScript(fullName, content);
            if (!this.hasScriptFile(fullName))
                this.tsfiles.push(fullName);
        };
        Project.prototype.getScripts = function () {
            return this.tsfiles;
        };
        /**
         * Load the TypeScript source files that match the pattern into the tsworker
         * @param pattern The pattern to apply when searching for files
         */
        Project.prototype.loadTypeScriptFiles = function (pattern) {
            var _this = this;
            if (!pattern)
                pattern = "**/*.ts";
            Cats.OS.File.find(pattern, this.projectDir, function (err, files) {
                files.forEach(function (file) {
                    try {
                        var fullName = Cats.OS.File.join(_this.projectDir, file);
                        var content = Cats.OS.File.readTextFile(fullName);
                        _this.addScript(fullName, content);
                    }
                    catch (err) {
                        console.error("Got error while handling file " + fullName);
                        console.error(err);
                    }
                });
            });
        };
        return Project;
    })(qx.event.Emitter);
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
    var Editor = (function (_super) {
        __extends(Editor, _super);
        function Editor() {
            _super.apply(this, arguments);
            this.label = "Untitled"; // Label to be used on the tab page
            // The project this editor belongs to
            this.project = Cats.IDE.project;
            this.properties = {};
        }
        /**
         * Does the Editor have any unsaved changes
         */
        Editor.prototype.hasUnsavedChanges = function () {
            return false;
        };
        Editor.RegisterEditor = function (name, restoreFn) {
            Editor.Registry[name] = restoreFn;
        };
        /**
         * Save the content of the editor. Not all editors imeplement this method.
         */
        Editor.prototype.save = function () { };
        /**
         * Move the editor to a certain position. The position paramters depends on the type of
         * editor. For a text editorit could be a row and column, for an UML editor
         * it could be an x an dy coordinate.
         */
        Editor.prototype.moveToPosition = function (pos) {
            Cats.IDE.addHistory(this, pos);
        };
        /**
         * Return the type of the editor
         */
        Editor.prototype.getType = function () {
            return null;
        };
        /**
         * Based on the state previously returned by getState, create a new editor with identical state
         * Used during startup of CATS to restore same editors as before CATS was closed.
         */
        Editor.Restore = function (type, state) {
            var restoreFn = Editor.Registry[type];
            if (!restoreFn) {
                console.error("No restore function found for " + type);
                return null;
            }
            var editor = restoreFn(state);
            return editor;
        };
        /**
         * Get the state of this editor so it can be at a later session revived. For example for
         * a source file editor this would be the fileName and current position.
         */
        Editor.prototype.getState = function () {
            return null; // means doesn't support persisting;
        };
        /**
         * Get a certain property from the editor
         */
        Editor.prototype.get = function (propertyName) {
            return this.properties[propertyName];
        };
        /**
         * Provide an additional description for the content used in in the editor.
         */
        Editor.prototype.getDescription = function () {
            return this.label;
        };
        /**
         * Set a property on the editor
         */
        Editor.prototype.set = function (propertyName, value) {
            if (!propertyName)
                return;
            this.properties[propertyName] = value;
            this.emit(propertyName, value);
        };
        /**
         * Does the editor support a certain property
         */
        Editor.prototype.has = function (property) {
            return this.get(property) != null;
        };
        /**
         * Command pattern implementation
         */
        Editor.prototype.executeCommand = function (commandName) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
        };
        /**
         * Provide the Qooxdoo LayouItem needed to added to this editor to the EditorPage
         */
        Editor.prototype.getLayoutItem = function () {
            throw new Error("Abstract Method not implemented: getLayoutItem");
        };
        Editor.Registry = {};
        return Editor;
    })(qx.event.Emitter);
    Cats.Editor = Editor;
    /**
     * Base class that contains some common features for editors that work on resouces on the
     * file system.
     */
    var FileEditor = (function (_super) {
        __extends(FileEditor, _super);
        function FileEditor(filePath) {
            _super.call(this);
            if (filePath)
                this.setFilePath(filePath);
        }
        FileEditor.prototype.updateFileInfo = function () {
            if (this.filePath) {
                try {
                    this.set("info", Cats.OS.File.getProperties(this.filePath));
                }
                catch (err) { }
            }
        };
        FileEditor.prototype.setFilePath = function (filePath) {
            this.filePath = filePath;
            this.label = Cats.OS.File.PATH.basename(this.filePath);
            this.updateFileInfo();
        };
        /**
         * Which type of files does this editor supports for editing.
         */
        FileEditor.SupportsFile = function (fileName) {
            return false;
        };
        /**
         * @override
         */
        FileEditor.prototype.getDescription = function () {
            return this.filePath || this.label;
        };
        /**
         * Check for a given file which default editor should be opened and return an instance
         * of that.
         */
        FileEditor.CreateEditor = function (fileName) {
            if (Cats.Gui.Editor.ImageEditor.SupportsFile(fileName))
                return new Cats.Gui.Editor.ImageEditor(fileName);
            if (Cats.Gui.Editor.SourceEditor.SupportsFile(fileName))
                return new Cats.Gui.Editor.SourceEditor(fileName);
            return null;
        };
        /**
         * Open an existing file editor or if it doesn't exist yet create
         * a new FileEditor suitable for the file selected.
         */
        FileEditor.OpenEditor = function (fileName, pos) {
            if (pos === void 0) { pos = { row: 0, column: 0 }; }
            var editor;
            var pages = [];
            pages = Cats.IDE.editorTabView.getPagesForFile(fileName);
            if (!pages.length) {
                editor = this.CreateEditor(fileName);
                if (editor) {
                    Cats.IDE.editorTabView.addEditor(editor, pos);
                }
                else {
                    var dialog = new Cats.Gui.ConfirmDialog("No suitable editor found for this file type, open with source editor?");
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
        };
        return FileEditor;
    })(Editor);
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
    var Linter = (function () {
        function Linter(project) {
            this.project = project;
            this.TSLint = require("tslint");
        }
        Linter.prototype.convertPos = function (item) {
            return {
                start: {
                    row: item.startPosition.line,
                    column: item.startPosition.character
                },
                end: {
                    row: item.endPosition.line,
                    column: item.endPosition.position.character
                }
            };
        };
        /**
         * Get the configured Lint options
         */
        Linter.prototype.getOptions = function () {
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
        };
        /**
         * Excute lint on the provided content and return the resulting warnings
         *
         */
        Linter.prototype.lint = function (fileName, content) {
            var _this = this;
            var ll = new this.TSLint(fileName, content, this.getOptions());
            var result = JSON.parse(ll.lint().output);
            var r = [];
            result.forEach(function (msg) {
                var item = {
                    fileName: msg.name,
                    message: msg.failure,
                    severity: Cats.Severity.Info,
                    range: _this.convertPos(msg)
                };
                r.push(item);
            });
            return r;
        };
        return Linter;
    })();
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
            project_document: null,
            ide_quit: null,
            ide_theme: null,
            ide_fontSize: null,
            ide_rightMargin: null,
            ide_configure: null,
            ide_history_next: null,
            ide_history_prev: null,
            "ide_toggle_toolbar": null,
            "ide_toggle_statusbar": null,
            "ide_toggle_context": null,
            "ide_toggle_result": null,
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
            return function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i - 0] = arguments[_i];
                }
                var editor = Cats.IDE.editorTabView.getActiveEditor();
                if (editor)
                    editor.executeCommand(commandName);
            };
        }
        var EditorCommands = (function () {
            function EditorCommands() {
            }
            EditorCommands.init = function (registry) {
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
            };
            return EditorCommands;
        })();
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
            if (!Cats.IDE.project) {
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
        var FileCommands = (function () {
            function FileCommands() {
            }
            FileCommands.init = function (registry) {
                registry(Commands.CMDS.file_new, newFile);
                registry(Commands.CMDS.file_close, closeFile);
                registry(Commands.CMDS.file_closeOther, closeOtherFiles);
                registry(Commands.CMDS.file_closeAll, closeAllFiles);
                registry(Commands.CMDS.file_save, saveFile);
                registry(Commands.CMDS.file_saveAll, saveAll);
                registry(Commands.CMDS.file_saveAs, saveAs);
                registry(Commands.CMDS.file_previous, previous);
                registry(Commands.CMDS.file_next, next);
            };
            return FileCommands;
        })();
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
            var GUI = require('nw.gui');
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
                registry(Commands.CMDS.help_about, showAbout);
                registry(Commands.CMDS.help_devTools, showDevTools);
                registry(Commands.CMDS.help_shortcuts, showShortcuts);
                registry(Commands.CMDS.help_processInfo, showProcess);
            };
            return HelpCommands;
        })();
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
        var IdeCommands = (function () {
            function IdeCommands() {
            }
            IdeCommands.init = function (registry) {
                registry(Commands.CMDS.ide_quit, quit);
                registry(Commands.CMDS.ide_toggle_toolbar, function () { return toggleView(Cats.IDE.toolBar); });
                registry(Commands.CMDS.ide_toggle_statusbar, function () { return toggleView(Cats.IDE.statusBar); });
                registry(Commands.CMDS.ide_toggle_result, function () { return toggleView(Cats.IDE.resultPane); });
                registry(Commands.CMDS.ide_toggle_context, function () { return toggleView(Cats.IDE.contextPane); });
                registry(Commands.CMDS.ide_configure, configureIde);
                registry(Commands.CMDS.ide_history_next, next);
                registry(Commands.CMDS.ide_history_prev, prev);
            };
            return IdeCommands;
        })();
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
            if (Cats.IDE.project)
                Cats.IDE.project.close();
        }
        /**
         * Close the project
         */
        function closeProject() {
            if (Cats.IDE.project)
                Cats.IDE.project.close();
        }
        /**
         * Run the project
         */
        function runProject() {
            if (Cats.IDE.project)
                Cats.IDE.project.run();
        }
        ;
        /**
         * Show a class diagram of the project.
         */
        function showDiagram() {
            if (Cats.IDE.project)
                Cats.IDE.editorTabView.addEditor(new Cats.Gui.Editor.UMLEditor("Class Diagram"));
        }
        /**
         * Shows a quick open dialog for the project.
         */
        function quickOpen() {
            if (Cats.IDE.project) {
                var dialog = new Cats.Gui.QuickOpenDialog(Cats.IDE.project);
                dialog.show();
            }
        }
        /**
         * Compile all the sources without actually saving them
         * to see if there are any issues popping up.
         */
        function validateProject() {
            if (Cats.IDE.project)
                Cats.IDE.project.validate();
        }
        /**
         * Build the project
         */
        function buildProject() {
            if (Cats.IDE.project)
                Cats.IDE.project.build();
        }
        /**
         * Generate the API documentation for the project
         */
        function documentProject() {
            if (Cats.IDE.project)
                Cats.IDE.project.document();
        }
        /**
         * Provide the user with an UI to configure the project settings
         */
        function configureProject() {
            if (Cats.IDE.project) {
                var w = new Cats.Gui.ProjectSettingsDialog(Cats.IDE.project);
                w.show();
            }
        }
        /**
         * Refresh the project so everything is in sync again. This is needed when more complex
         * filesystem changes are done (like renaming TS files etc).
         */
        function refreshProject() {
            if (Cats.IDE.project)
                Cats.IDE.project.refresh();
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
        var ProjectCommands = (function () {
            function ProjectCommands() {
            }
            ProjectCommands.init = function (registry) {
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
                registry(Commands.CMDS.project_document, documentProject);
            };
            return ProjectCommands;
        })();
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
            var TSCompleter = (function () {
                function TSCompleter(editor) {
                    this.editor = editor;
                }
                TSCompleter.prototype.getCompletions = function (editor, session, pos, prefix, cb) {
                    var fileName = this.editor.filePath;
                    if (!fileName)
                        cb(null, []);
                    Cats.IDE.project.iSense.getCompletions(fileName, pos, function (err, completes) {
                        var result = [];
                        if (!completes)
                            return result;
                        completes.forEach(function (entry) {
                            result.push({ caption: entry.name, value: entry.name, meta: entry.kind });
                        });
                        cb(null, result);
                    });
                };
                return TSCompleter;
            })();
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
            var AutoCompletePopup = (function (_super) {
                __extends(AutoCompletePopup, _super);
                function AutoCompletePopup() {
                    var _this = this;
                    _super.call(this, new qx.ui.layout.Flow());
                    this.cursorPos = 0;
                    // this.setDecorator(null);
                    this.setPadding(0, 0, 0, 0);
                    this.setMargin(0, 0, 0, 0);
                    this.setWidth(300);
                    this.setHeight(200);
                    this.createList();
                    this.initHandler();
                    this.changeListener = function (ev) { return _this.onChange(ev); };
                    this.addListener("disappear", this.hidePopup, this);
                }
                /**
                 * Create the list that hold the completions
                 */
                AutoCompletePopup.prototype.createList = function () {
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
                };
                /**
                 * Get the text between cursor and start
                 */
                AutoCompletePopup.prototype.getInputText = function () {
                    var cursor = this.sourceEditor.getPosition();
                    var text = this.sourceEditor.getLine(cursor.row).slice(0, cursor.column);
                    // console.log("input text:" + text);
                    var matches = text.match(/[a-zA-Z_0-9\$]*$/);
                    if (matches && matches[0])
                        return matches[0];
                    else
                        return "";
                };
                AutoCompletePopup.prototype.match_strict = function (text, completion) {
                    if (!text)
                        return true;
                    if (completion.indexOf(text) === 0)
                        return true;
                    return false;
                };
                AutoCompletePopup.prototype.match_forgiven = function (text, completion) {
                    if (!text)
                        return true;
                    if (completion.indexOf(text) > -1)
                        return true;
                    return false;
                };
                /**
                 * Filter the available completions based on the users text input
                 * so far.
                 */
                AutoCompletePopup.prototype.updateFilter = function () {
                    var _this = this;
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
                    var delegate = {};
                    delegate["filter"] = function (data) {
                        var value = data.getCaption().toLowerCase();
                        var result = matchFunction(text, value);
                        if (result)
                            _this.filtered.push(data);
                        if (data === lastItem) {
                            // IDE.console.log("filtered items: " + this.filtered.length);
                            // @TODO check for selected
                            var selection = _this.list.getSelection().getItem(0);
                            if (!(selection && (_this.filtered.indexOf(selection) > -1))) {
                                _this.cursorPos = 0;
                                _this.moveCursor(0);
                            }
                        }
                        return result;
                    };
                    this.list.setDelegate(delegate);
                };
                AutoCompletePopup.prototype.moveCursor = function (row) {
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
                };
                AutoCompletePopup.prototype.insertSelectedItem = function () {
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
                };
                /**
                 * Setup the different keybindings that would go to the
                 * popup window and not the editor
                 */
                AutoCompletePopup.prototype.initHandler = function () {
                    var _this = this;
                    this.handler = new HashHandler();
                    this.handler.bindKey("Home", function () { _this.moveCursor(-10000); });
                    this.handler.bindKey("End", function () { _this.moveCursor(10000); });
                    this.handler.bindKey("Down", function () { _this.moveCursor(1); });
                    this.handler.bindKey("PageDown", function () { _this.moveCursor(10); });
                    this.handler.bindKey("Up", function () { _this.moveCursor(-1); });
                    this.handler.bindKey("PageUp", function () { _this.moveCursor(-10); });
                    this.handler.bindKey("Esc", function () { _this.hidePopup(); });
                    this.handler.bindKey("Return|Tab", function () { _this.insertSelectedItem(); });
                };
                AutoCompletePopup.prototype.isExecutable = function (kind) {
                    if (kind === "method" || kind === "function" || kind === "constructor")
                        return true;
                    return false;
                };
                /**
                 * Show the popup and make sure the keybinding is in place
                 *
                 */
                AutoCompletePopup.prototype.showPopup = function (completions) {
                    var _this = this;
                    if (this.list.isSeeable() || (completions.length === 0))
                        return;
                    var cursor = this.editor.getCursorPosition();
                    var coords = this.editor.renderer.textToScreenCoordinates(cursor.row, cursor.column);
                    this.editor.keyBinding.addKeyboardHandler(this.handler);
                    this.moveTo(coords.pageX, coords.pageY + 20);
                    var rawData = [];
                    completions.forEach(function (completion) {
                        var extension = "";
                        if (_this.isExecutable(completion.meta)) {
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
                };
                /**
                 * Hide the popup and remove all keybindings
                 */
                AutoCompletePopup.prototype.hidePopup = function () {
                    this.editor.keyBinding.removeKeyboardHandler(this.handler);
                    this.exclude();
                    this.editor.getSession().removeListener('change', this.changeListener);
                    this.editor.focus();
                };
                /**
                 * Determines if the specified character may be part of a JS identifier
                 */
                AutoCompletePopup.isJsIdentifierPart = function (ch) {
                    ch |= 0; //tell JIT that ch is an int
                    return ch >= 97 && ch <= 122 //a-z
                        || ch >= 65 && ch <= 90 //A-Z
                        || ch >= 48 && ch <= 57 //0-9
                        || ch === 95 //_
                        || ch === 36 //$
                        || ch > 127; //non-ASCII letter. Not accurate, but good enough for autocomplete
                };
                AutoCompletePopup.prototype.onChange2 = function (e) {
                    var key = e.args || "";
                    alert(key);
                    if ((key == null) || (!AutoCompletePopup.isJsIdentifierPart(key.charCodeAt(0)))) {
                        this.hidePopup();
                        return;
                    }
                    this.updateFilter();
                };
                /**
                 * Check wether the typed character is reason to stop
                 * the auto-complete task
                 */
                AutoCompletePopup.prototype.onChange = function (ev) {
                    var _this = this;
                    var key = ev.data.text;
                    if ((key == null) || (!AutoCompletePopup.isJsIdentifierPart(key.charCodeAt(0)))) {
                        this.hidePopup();
                        return;
                    }
                    // hack to get the cursor updated before we render
                    // TODO find out how to force update without a timer delay
                    setTimeout(function () { _this.updateFilter(); }, 0);
                };
                /**
                 * The method called form the editor to start the code completion process.
                 */
                AutoCompletePopup.prototype.complete = function (memberCompletionOnly, sourceEditor, editor) {
                    var _this = this;
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
                                _this.showPopup(matches);
                            }
                        });
                    });
                };
                return AutoCompletePopup;
            })(qx.ui.popup.Popup);
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
            var SourceEditor = (function (_super) {
                __extends(SourceEditor, _super);
                function SourceEditor(fileName) {
                    var _this = this;
                    _super.call(this, fileName);
                    this.status = {};
                    this.unsavedChanges = false;
                    this.pendingWorkerUpdate = false;
                    this.createEditSession();
                    this.createWidget();
                    this.contextMenu = new Editor.SourceEditorContextMenu(this);
                    this.widget.setContextMenu(this.contextMenu);
                    Cats.IDE.on("config", function () { _this.configureEditor(); });
                }
                SourceEditor.prototype.createWidget = function () {
                    var _this = this;
                    var widget = new qx.ui.core.Widget();
                    widget.setDecorator(null);
                    widget.setFont(null);
                    widget.setAppearance(null);
                    widget.addListenerOnce("appear", function () {
                        var container = widget.getContentElement().getDomElement();
                        container.style.lineHeight = "normal";
                        _this.aceEditor = _this.createAceEditor(container);
                        _this.configureEditor();
                        if (_this.pendingPosition)
                            _this.moveToPosition(_this.pendingPosition);
                    }, this);
                    widget.addListener("appear", function () {
                        // this.session.activate();
                        _this.informWorld();
                        if (_this.aceEditor)
                            _this.aceEditor.focus();
                    });
                    // session.on("errors", this.showErrors, this);
                    widget.addListener("resize", function () { _this.resizeHandler(); });
                    this.widget = widget;
                };
                SourceEditor.prototype.createEditSession = function () {
                    var _this = this;
                    this.editSession = new Editor.EditSession(this);
                    this.editSession.on("changeAnnotation", function () {
                        _this.emit("errors", _this.editSession.getMaxAnnotationLevel());
                    });
                    this.editSession.on("changeOverwrite", function (a) {
                        _this.informWorld();
                    });
                    this.editSession.on("change", function () {
                        _this.setHasUnsavedChanges(true);
                    });
                };
                SourceEditor.prototype.setHasUnsavedChanges = function (value) {
                    if (value === this.unsavedChanges)
                        return;
                    this.unsavedChanges = value;
                    this.emit("changed", value);
                };
                SourceEditor.prototype.getState = function () {
                    return {
                        fileName: this.filePath,
                        pos: this.getPosition()
                    };
                };
                SourceEditor.RestoreState = function (state) {
                    var editor = new SourceEditor(state.fileName);
                    editor.moveToPosition(state.pos);
                    return editor;
                };
                SourceEditor.prototype.executeCommand = function (name) {
                    var args = [];
                    for (var _i = 1; _i < arguments.length; _i++) {
                        args[_i - 1] = arguments[_i];
                    }
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
                };
                SourceEditor.prototype.isTypeScript = function () {
                    return this.editSession.isTypeScript() && this.project.hasScriptFile(this.filePath);
                };
                SourceEditor.prototype.getType = function () {
                    return registryEntryName;
                };
                SourceEditor.SupportsFile = function (fileName) {
                    var name = Cats.OS.File.PATH.basename(fileName);
                    var mode = modelist.getModeForPath(name);
                    if (mode && mode.supportsFile(name))
                        return true;
                    return false;
                };
                /**
                 * Get the Qooxdoo Widget that can be added to the parent
                 */
                SourceEditor.prototype.getLayoutItem = function () {
                    return this.widget;
                };
                SourceEditor.prototype.formatText = function () {
                    var _this = this;
                    var r = null;
                    if (this.isTypeScript()) {
                        var range = this.aceEditor.selection.getRange();
                        if (!range.isEmpty())
                            r = { start: range.start, end: range.end };
                        Cats.IDE.project.iSense.getFormattedTextForRange(this.filePath, r, function (err, result) {
                            if (!err)
                                _this.setContent(result);
                        });
                    }
                };
                SourceEditor.prototype.setMode = function (mode) {
                    this.editSession.setMode(mode);
                    this.informWorld();
                };
                /**
                 * Replace the current content of this editor with new content and indicate
                 * wether the cursor should stay on the same position
                 *
                 */
                SourceEditor.prototype.setContent = function (content, keepPosition) {
                    if (keepPosition === void 0) { keepPosition = true; }
                    var pos;
                    if (keepPosition)
                        pos = this.getPosition();
                    this.editSession.setValue(content);
                    if (pos)
                        this.moveToPosition(pos);
                };
                /**
                 * Update the configuaration of the editor.
                 *
                 */
                SourceEditor.prototype.configureEditor = function () {
                    var config = Cats.IDE.config.editor;
                    if (config.fontSize)
                        this.aceEditor.setFontSize(config.fontSize + "px");
                    if (config.rightMargin)
                        this.aceEditor.setPrintMarginColumn(config.rightMargin);
                    if (config.theme)
                        this.aceEditor.setTheme("ace/theme/" + config.theme);
                };
                /**
                 * Inform the world about current status of the editor
                 *
                 */
                SourceEditor.prototype.informWorld = function () {
                    var value = this.getPosition();
                    var label = (value.row + 1) + ":" + (value.column + 1);
                    this.status = {
                        overwrite: this.editSession.getOverwrite(),
                        mode: Cats.OS.File.PATH.basename(this.editSession.mode).toUpperCase(),
                        position: label
                    };
                    this.emit("status", this.status);
                };
                SourceEditor.prototype.replace = function (range, content) {
                    this.editSession.replace(range, content);
                };
                SourceEditor.prototype.getLine = function (row) {
                    if (row === void 0) { row = this.getPosition().row; }
                    return this.editSession.getLine(row);
                };
                /**
                 * Get the content of the editor
                 *
                 */
                SourceEditor.prototype.getContent = function () {
                    return this.editSession.getValue();
                };
                /**
                 * Make sure the ace editor is resized when the Qooxdoo container is resized.
                 *
                 */
                SourceEditor.prototype.resizeHandler = function () {
                    var _this = this;
                    if (!this.widget.isSeeable()) {
                        this.addListenerOnce("appear", function () { _this.resizeEditor(); });
                    }
                    else {
                        this.resizeEditor();
                    }
                };
                SourceEditor.prototype.resizeEditor = function () {
                    var _this = this;
                    setTimeout(function () {
                        _this.aceEditor.resize();
                    }, 100);
                };
                SourceEditor.prototype.clearSelectedTextMarker = function () {
                    if (this.selectedTextMarker) {
                        this.editSession.removeMarker(this.selectedTextMarker);
                        this.selectedTextMarker = null;
                    }
                };
                SourceEditor.prototype.addTempMarker = function (r) {
                    this.clearSelectedTextMarker();
                    var range = new Range(r.start.row, r.start.column, r.end.row, r.end.column);
                    this.selectedTextMarker = this.editSession.addMarker(range, "ace_selected-word", "text");
                };
                SourceEditor.prototype.moveToPosition = function (pos) {
                    var _this = this;
                    if (!this.aceEditor) {
                        this.pendingPosition = pos;
                    }
                    else {
                        this.aceEditor.clearSelection();
                        _super.prototype.moveToPosition.call(this, pos);
                        if (pos) {
                            if (pos.start) {
                                this.aceEditor.moveCursorToPosition(pos.start);
                            }
                            else {
                                this.aceEditor.moveCursorToPosition(pos);
                            }
                        }
                        setTimeout(function () {
                            _this.aceEditor.centerSelection();
                            if (pos && pos.start)
                                _this.addTempMarker(pos);
                        }, 100);
                    }
                };
                /**
                 * Get the position of the cursor within the content.
                 *
                 */
                SourceEditor.prototype.getPosition = function () {
                    if (this.aceEditor)
                        return this.aceEditor.getCursorPosition();
                };
                /**
                  * Get the Position based on mouse x,y coordinates
                  */
                SourceEditor.prototype.getPositionFromScreenOffset = function (ev) {
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
                };
                /**
                 * Perform code autocompletion.
                 */
                SourceEditor.prototype.showAutoComplete = function (memberCompletionOnly) {
                    if (memberCompletionOnly === void 0) { memberCompletionOnly = false; }
                    // Any pending changes that are not yet send to the worker?
                    if (this.isTypeScript()) {
                        this.project.iSense.updateScript(this.filePath, this.getContent());
                    }
                    autoCompletePopup.complete(memberCompletionOnly, this, this.aceEditor);
                };
                SourceEditor.prototype.liveAutoComplete = function (e) {
                    if (!this.isTypeScript())
                        return;
                    var text = e.args || "";
                    if ((e.command.name === "insertstring") && (text === ".")) {
                        this.showAutoComplete(true);
                    }
                };
                /**
                 * Create a new isntance of the ACE editor and append is to a dom element
                 *
                 */
                SourceEditor.prototype.createAceEditor = function (rootElement) {
                    var _this = this;
                    var editor = ace.edit(rootElement);
                    editor.setSession(this.editSession);
                    editor.on("changeSelection", function () {
                        _this.clearSelectedTextMarker();
                        _this.informWorld();
                    });
                    new Editor.TSTooltip(this);
                    new Gui.TSHelper(this, this.editSession);
                    editor.commands.on('afterExec', function (e) { _this.liveAutoComplete(e); });
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
                            exec: function () { _this.showAutoComplete(); }
                        },
                        {
                            name: "gotoDeclaration",
                            bindKey: {
                                win: "F12",
                                mac: "F12"
                            },
                            exec: function () { _this.contextMenu.gotoDeclaration(); }
                        },
                        {
                            name: "save",
                            bindKey: {
                                win: "Ctrl-S",
                                mac: "Command-S"
                            },
                            exec: function () { _this.save(); }
                        }
                    ]);
                    return editor;
                };
                SourceEditor.prototype.hasUnsavedChanges = function () {
                    return this.unsavedChanges;
                };
                /**
                 * Persist this session to the file system. This overrides the NOP in the base class
                 */
                SourceEditor.prototype.save = function () {
                    this.editSession.save();
                };
                return SourceEditor;
            })(Cats.FileEditor);
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
            var ImageEditor = (function (_super) {
                __extends(ImageEditor, _super);
                function ImageEditor(fileName) {
                    _super.call(this, fileName);
                    this.canvas = new qx.ui.embed.Canvas();
                    this.set("status", { mode: "IMAGE" });
                    this.loadImage(fileName);
                    this.createContextMenu();
                }
                ImageEditor.prototype.getLayoutItem = function () {
                    return this.canvas;
                };
                ImageEditor.prototype.executeCommand = function (name) {
                    var args = [];
                    for (var _i = 1; _i < arguments.length; _i++) {
                        args[_i - 1] = arguments[_i];
                    }
                    return false;
                };
                ImageEditor.prototype.save = function () { };
                ImageEditor.prototype.loadImage = function (url) {
                    var _this = this;
                    var image = new Image();
                    image.onload = function () { _this.drawImage(image); };
                    image.src = url;
                };
                ImageEditor.prototype.getState = function () {
                    return {
                        fileName: this.filePath
                    };
                };
                ImageEditor.prototype.getType = function () {
                    return registryEntryName;
                };
                ImageEditor.prototype.resizeIfRequired = function (image) {
                    if (image.width > this.canvas.getCanvasWidth()) {
                        this.canvas.setCanvasWidth(image.width);
                    }
                    if (image.height > this.canvas.getCanvasHeight()) {
                        this.canvas.setCanvasHeight(image.height);
                    }
                };
                ImageEditor.prototype.drawImage = function (image) {
                    this.resizeIfRequired(image);
                    this.canvas.getContext2d().drawImage(image, this.canvas.getCanvasWidth() / 2 - image.width / 2, this.canvas.getCanvasHeight() / 2 - image.height / 2);
                };
                ImageEditor.prototype.createContextMenu = function () {
                    var _this = this;
                    var menu = new qx.ui.menu.Menu();
                    ImageEditor.BackgroundColors.forEach(function (color) {
                        var button = new qx.ui.menu.Button("Background " + color);
                        button.addListener("execute", function () {
                            _this.canvas.setBackgroundColor(color);
                        });
                        menu.add(button);
                    });
                    this.canvas.setContextMenu(menu);
                };
                ImageEditor.SupportsFile = function (fileName) {
                    var supportedExt = [".png", ".gif", ".jpg", ".jpeg"];
                    var ext = Cats.OS.File.PATH.extname(fileName);
                    return supportedExt.indexOf(ext) > -1;
                };
                ImageEditor.prototype.moveToPosition = function (pos) { };
                ImageEditor.BackgroundColors = ["white", "black", "grey"];
                return ImageEditor;
            })(Cats.FileEditor);
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
            var UMLEditor = (function (_super) {
                __extends(UMLEditor, _super);
                function UMLEditor(name) {
                    var _this = this;
                    _super.call(this);
                    this.backgroundColors = ["white", "black", "grey"];
                    this.unsavedChanges = false;
                    this.widget = new qx.ui.embed.Html(null);
                    this.label = name;
                    if (!dagre)
                        dagre = require("dagre");
                    this.widget.setOverflow("auto", "auto");
                    this.widget.addListenerOnce("appear", function () {
                        var container = _this.widget.getContentElement().getDomElement();
                        var div = document.createElement("div");
                        div.style.height = "100%";
                        div.style.width = "100%";
                        container.appendChild(div);
                        UMLEditor.LoadResources(function () {
                            _this.render(div);
                            _this.widget.focus();
                        });
                    });
                }
                UMLEditor.prototype.getLayoutItem = function () {
                    return this.widget;
                };
                UMLEditor.LoadResources = function (cb) {
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
                };
                UMLEditor.prototype.getMaxSize = function (size) {
                    if (size > 30000)
                        return 30000;
                    return size;
                };
                UMLEditor.prototype.format = function (str, maxlen) {
                    if (maxlen === void 0) { maxlen = 20; }
                    if (!str)
                        return str;
                    return str.substr(-maxlen);
                };
                UMLEditor.prototype.render = function (container) {
                    var _this = this;
                    var nodes = {};
                    var g = new dagre.Digraph();
                    var max = 100;
                    Cats.IDE.console.log("Creating class diagram ...");
                    Cats.IDE.project.iSense.getObjectModel(function (err, model) {
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
                            c.setName(_this.format(name));
                            entry.operations.forEach(function (mName) {
                                c.addOperation(_this.format(mName + "()", 25));
                            });
                            entry.attributes.forEach(function (attr) {
                                var t = attr.type || "unknown";
                                c.addAttribute(_this.format(attr.name + ":" + attr.type, 25));
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
                            width: _this.getMaxSize(graph.width + 10),
                            height: _this.getMaxSize(graph.height + 10)
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
                        _this.diagram = classDiagram;
                        Cats.IDE.console.log("Finished creating class diagram.");
                    });
                    return;
                };
                UMLEditor.prototype.createContextMenu = function () {
                    var _this = this;
                    var menu = new qx.ui.menu.Menu();
                    this.backgroundColors.forEach(function (color) {
                        var button = new qx.ui.menu.Button("Background " + color);
                        button.addListener("execute", function () {
                            _this.widget.setBackgroundColor(color);
                        });
                        menu.add(button);
                    });
                    this.widget.setContextMenu(menu);
                };
                UMLEditor.prototype.replace = function (range, content) { };
                UMLEditor.prototype.getContent = function () { return null; };
                UMLEditor.prototype.setContent = function (content, keepPosition) {
                    if (keepPosition === void 0) { keepPosition = true; }
                };
                UMLEditor.prototype.updateWorld = function () { };
                UMLEditor.prototype.moveToPosition = function (pos) { };
                UMLEditor.Resources1 = [
                    "resource/uml/css/UDStyle.css",
                    "resource/uml/UDCore.js"
                ];
                UMLEditor.Resources2 = [
                    "resource/uml/UDModules.js"
                ];
                UMLEditor.ResourcesLoaded = false;
                return UMLEditor;
            })(Cats.Editor);
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
            var TSTooltip = (function (_super) {
                __extends(TSTooltip, _super);
                function TSTooltip(editor) {
                    var _this = this;
                    _super.call(this, "");
                    this.editor = editor;
                    this.mouseX = 0;
                    this.mouseY = 0;
                    this.exclude();
                    this.setRich(true);
                    this.setMaxWidth(500);
                    var elem = editor.getLayoutItem().getContentElement().getDomElement(); // TODo find scroller child
                    elem.onmousemove = this.onMouseMove.bind(this);
                    elem.onmouseout = function () {
                        if (_this.isSeeable())
                            _this.exclude();
                        clearTimeout(_this.mouseMoveTimer);
                    };
                }
                /**
                 * Show info at Screen location
                 */
                TSTooltip.prototype.showToolTipAt = function (ev) {
                    var _this = this;
                    var docPos = this.editor.getPositionFromScreenOffset(ev);
                    this.editor.project.iSense.getInfoAtPosition(this.editor.filePath, docPos, function (err, data) {
                        if ((!data) || (!data.description))
                            return;
                        var tip = data.description;
                        if (data.docComment) {
                            tip += '<hr>' + data.docComment;
                        }
                        if (tip && tip.trim()) {
                            _this.setLabel(tip);
                            _this.moveTo(ev.x, ev.y + 10);
                            _this.show();
                        }
                    });
                };
                TSTooltip.prototype.onMouseMove = function (ev) {
                    var _this = this;
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
                        _this.showToolTipAt(ev);
                    }, 800);
                };
                return TSTooltip;
            })(qx.ui.tooltip.ToolTip);
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
            var SourceEditorContextMenu = (function (_super) {
                __extends(SourceEditorContextMenu, _super);
                function SourceEditorContextMenu(editor) {
                    _super.call(this);
                    this.editor = editor;
                    this.init();
                }
                SourceEditorContextMenu.prototype.createContextMenuItem = function (name, fn, self) {
                    var button = new qx.ui.menu.Button(name);
                    button.addListener("execute", fn, self);
                    return button;
                };
                SourceEditorContextMenu.prototype.getIsense = function () {
                    return this.editor.project.iSense;
                };
                SourceEditorContextMenu.prototype.gotoDeclaration = function () {
                    this.getIsense().getDefinitionAtPosition(this.editor.filePath, this.getPos(), function (err, data) {
                        if (data && data.fileName)
                            Cats.FileEditor.OpenEditor(data.fileName, data.range.start);
                    });
                };
                SourceEditorContextMenu.prototype.getPos = function () {
                    return this.editor.getPosition();
                };
                SourceEditorContextMenu.prototype.getInfoAt = function (type) {
                    this.getIsense().getCrossReference(type, this.editor.filePath, this.getPos(), function (err, data) {
                        if (!data)
                            return;
                        var resultTable = new Gui.ResultTable();
                        var page = Cats.IDE.resultPane.addPage("info_tab", resultTable);
                        page.setShowCloseButton(true);
                        resultTable.setData(data);
                    });
                };
                SourceEditorContextMenu.prototype.findReferences = function () {
                    return this.getInfoAt("getReferencesAtPosition");
                };
                SourceEditorContextMenu.prototype.findOccurences = function () {
                    return this.getInfoAt("getOccurrencesAtPosition");
                };
                SourceEditorContextMenu.prototype.findImplementors = function () {
                    return this.getInfoAt("getImplementorsAtPosition");
                };
                SourceEditorContextMenu.prototype.bookmark = function () {
                    var _this = this;
                    var dialog = new Gui.PromptDialog("Please provide bookmark name");
                    dialog.onSuccess = function (name) {
                        var pos = _this.getPos();
                        Cats.IDE.bookmarks.addData({
                            message: name,
                            fileName: _this.editor.filePath,
                            range: {
                                start: pos,
                                end: pos
                            }
                        });
                    };
                    dialog.show();
                };
                SourceEditorContextMenu.prototype.refactor = function () {
                    var pos = this.getPos();
                    Cats.Refactor.rename(this.editor.filePath, this.editor.project, pos);
                };
                SourceEditorContextMenu.prototype.createModeMenu = function () {
                    var _this = this;
                    var menu = new qx.ui.menu.Menu();
                    var modes = ace.require('ace/ext/modelist').modes;
                    modes.forEach(function (entry) {
                        var button = new qx.ui.menu.Button(entry.caption);
                        button.addListener("execute", function () {
                            _this.editor.setMode(entry.mode);
                        });
                        menu.add(button);
                    });
                    return menu;
                };
                SourceEditorContextMenu.prototype.init = function () {
                    if (this.editor.isTypeScript()) {
                        this.add(this.createContextMenuItem("Goto Declaration", this.gotoDeclaration, this));
                        this.add(this.createContextMenuItem("Find References", this.findReferences, this));
                        this.add(this.createContextMenuItem("Find Occurences", this.findOccurences, this));
                        // this.add(this.createContextMenuItem("Find Implementations", this.findImplementors, this));
                        this.addSeparator();
                        this.add(this.createContextMenuItem("Rename", this.refactor, this));
                        this.addSeparator();
                    }
                    this.add(this.createContextMenuItem("Bookmark", this.bookmark, this));
                    var modeMenu = this.createModeMenu();
                    var b = new qx.ui.menu.Button("Modes", null, null, modeMenu);
                    this.add(b);
                };
                return SourceEditorContextMenu;
            })(qx.ui.menu.Menu);
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
            var EditSession = (function (_super) {
                __extends(EditSession, _super);
                function EditSession(editor) {
                    var _this = this;
                    var content = "";
                    this.version = 0;
                    this.editor = editor;
                    this.mode = this.calculateMode();
                    if (editor.filePath) {
                        content = Cats.OS.File.readTextFile(editor.filePath);
                        if (this.isTypeScript() && (!Cats.IDE.project.hasScriptFile(editor.filePath))) {
                            var addDialog = new Gui.ConfirmDialog("Not yet part of project, add it now?");
                            addDialog.onConfirm = function () {
                                Cats.IDE.project.addScript(editor.filePath, content);
                            };
                            addDialog.show();
                        }
                    }
                    _super.call(this, content, this.mode);
                    this.setNewLineMode("unix");
                    this.configureAceSession(Cats.IDE.project.config);
                    this.setUndoManager(new UndoManager());
                    Cats.IDE.project.on("config", function (c) { _this.configureAceSession(c); });
                    this.on("change", function () { _this.version++; });
                }
                EditSession.prototype.calculateMode = function () {
                    if (!this.editor.filePath)
                        return "ace/mode/text";
                    var mode = modelist.getModeForPath(this.editor.filePath).mode;
                    return mode;
                };
                /**
                 * Check if there are any errors for this session and show them.
                 */
                EditSession.prototype.showAnnotations = function (result) {
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
                    _super.prototype.setAnnotations.call(this, annotations);
                };
                /**
                  * Is the editor currently containing TypeScript content. This determines wehther all kind
                  * of features are enabled or not.
                  */
                EditSession.prototype.isTypeScript = function () {
                    return this.mode === "ace/mode/typescript";
                };
                EditSession.prototype.setMode = function (mode) {
                    this.mode = mode;
                    _super.prototype.setMode.call(this, mode);
                };
                /**
                 * Determine the maximum level of severity within a set of annotations.
                 *
                 * @return Possible return values are info, warning or error
                 */
                EditSession.prototype.getMaxAnnotationLevel = function () {
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
                };
                EditSession.prototype.configureAceSession = function (projectConfig) {
                    var config = projectConfig.codeFormat;
                    if (config.TabSize)
                        this.setTabSize(config.TabSize);
                    if (config.ConvertTabsToSpaces != null)
                        this.setUseSoftTabs(config.ConvertTabsToSpaces);
                };
                /**
                 * Persist this session to the file system. This overrides the NOP in the base class
                 */
                EditSession.prototype.save = function () {
                    var _this = this;
                    var filePath = this.editor.filePath;
                    var content = this.getValue();
                    if (filePath == null) {
                        var dir = Cats.OS.File.join(Cats.IDE.project.projectDir, "/");
                        var dialog = new Gui.PromptDialog("Please enter the file name", dir);
                        dialog.onSuccess = function (filePath) {
                            filePath = Cats.OS.File.switchToForwardSlashes(filePath);
                            _this.editor.setFilePath(filePath);
                            _this.mode = _this.calculateMode();
                            _this.setMode(_this.mode);
                            if (_this.isTypeScript() && (!Cats.IDE.project.hasScriptFile(filePath))) {
                                var addDialog = new Gui.ConfirmDialog("Not yet part of project, add it now?");
                                addDialog.onConfirm = function () {
                                    Cats.IDE.project.addScript(filePath, content);
                                };
                                addDialog.show();
                            }
                            _this.save();
                        };
                        dialog.show();
                    }
                    else {
                        Cats.OS.File.writeTextFile(filePath, content);
                        this.editor.setHasUnsavedChanges(false);
                        this.editor.updateFileInfo();
                        Cats.IDE.console.log("Saved file " + filePath);
                        if (this.isTypeScript()) {
                            Cats.IDE.project.iSense.updateScript(filePath, content);
                            Cats.IDE.project.validate(false);
                            if (Cats.IDE.project.config.buildOnSave)
                                Cats.Commands.CMDS.project_build.command();
                        }
                    }
                };
                return EditSession;
            })(ace.EditSession);
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
            fileName = Cats.OS.File.PATH.resolve(Cats.IDE.project.projectDir, fileName);
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
        var ConsoleLog = (function (_super) {
            __extends(ConsoleLog, _super);
            function ConsoleLog() {
                var _this = this;
                _super.call(this, null);
                this.printTime = true;
                this.tsRef = /ts\([0-9]+,[0-9]+\):/i;
                this.setPadding(2, 2, 2, 2);
                this.setDecorator(null);
                this.setOverflow("auto", "auto");
                this.addListenerOnce("appear", function () {
                    _this.container = _this.getContentElement().getDomElement();
                });
                this.setContextMenu(this.createContextMenu());
                this.setFocusable(false);
            }
            ConsoleLog.prototype.addBody = function (parent, prefix, line) {
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
            };
            ConsoleLog.prototype.insertLine = function (prefix, line, severity) {
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
            };
            ConsoleLog.prototype.print = function (msg, severity) {
                var _this = this;
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
                        _this.insertLine(prefix, line, severity);
                    });
                    this.container.scrollTop = this.container.scrollHeight;
                }
            };
            /**
             * Log a message to the console widget. This should only be used for
             * logging mesages that are useful to the enduser (= developer) and not for
             * debug information.
             *
             */
            ConsoleLog.prototype.log = function (msg) {
                this.print(msg, 0);
            };
            ConsoleLog.prototype.info = function (msg) {
                this.print(msg, 1);
            };
            ConsoleLog.prototype.error = function (msg) {
                this.print(msg, 2);
            };
            ConsoleLog.prototype.createContextMenu = function () {
                var _this = this;
                var menu = new qx.ui.menu.Menu();
                var item1 = new qx.ui.menu.Button("Clear Output");
                item1.addListener("execute", function () { _this.clear(); });
                menu.add(item1);
                var item2 = new qx.ui.menu.Button("Toggle Print Time");
                item2.addListener("execute", function () { _this.printTime = !_this.printTime; });
                menu.add(item2);
                return menu;
            };
            ConsoleLog.prototype.clear = function () {
                if (this.container)
                    this.container.innerHTML = "";
            };
            return ConsoleLog;
        })(qx.ui.embed.Html);
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
        var FileNavigator = (function (_super) {
            __extends(FileNavigator, _super);
            function FileNavigator() {
                _super.call(this, null, "label", "children");
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
            }
            FileNavigator.prototype.setProject = function (project) {
                var _this = this;
                this.projectDir = project.projectDir;
                this.watcher = Cats.OS.File.getWatcher();
                this.watcher.on("change", function (dir) {
                    var parent = _this.parents[dir];
                    if (parent)
                        _this.readDir(parent);
                });
                var directory = project.projectDir;
                this.rootTop.fullPath = directory;
                this.rootTop.label = Cats.OS.File.PATH.basename(directory);
                var root = qx.data.marshal.Json.createModel(this.rootTop, true);
                this.setModel(root);
                this.setupDelegate();
                this.setup();
                console.info("Icon path:" + this.getIconPath());
                this.addListener("dblclick", function () {
                    var file = _this.getSelectedFile();
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
            };
            FileNavigator.prototype.clear = function () {
                this.setModel(null);
            };
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
            /**
             * Get an icon for a file based on its mimetype
             */
            FileNavigator.prototype.getIconForMimeType = function (mimetype) {
                var icon = Cats.IDE.icons.mimetype[mimetype] || Cats.IDE.icons.mimetype["text/plain"];
                return icon;
            };
            FileNavigator.prototype.setup = function () {
                var _this = this;
                this.setIconPath("");
                this.setIconOptions({
                    converter: function (value, model) {
                        if (value.getDirectory()) {
                            return _this.getIconForMimeType("inode/directory");
                        }
                        var mimetype = Cats.Util.MimeTypeFinder.lookup(value.getLabel());
                        return _this.getIconForMimeType(mimetype);
                    }
                });
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
            /**
             * Read the files from a directory
             * @param directory The directory name that should be read
             */
            FileNavigator.prototype.readDir = function (parent) {
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
            };
            return FileNavigator;
        })(qx.ui.tree.VirtualTree);
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
         * Provide an outline view of the source code.
         *
         * When you click on an entry wihin the outline, the corresponding source file will be opened
         * at the righ position.
         */
        var OutlineNavigator = (function (_super) {
            __extends(OutlineNavigator, _super);
            function OutlineNavigator() {
                var _this = this;
                _super.call(this, null, "label", "kids");
                this.setDecorator(null);
                this.setPadding(0, 0, 0, 0);
                this.setHideRoot(true);
                this.setDecorator(null);
                this.addListener("click", function (data) {
                    var item = _this.getSelectedItem();
                    if (item && item.getPos) {
                        var position = JSON.parse(qx.util.Serializer.toJson(item.getPos()));
                        Cats.IDE.editorTabView.navigateToPage(_this.page, position);
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
            OutlineNavigator.prototype.register = function (editor, page) {
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
            };
            OutlineNavigator.prototype.getSelectedItem = function () {
                var item = this.getSelection().getItem(0);
                return item;
            };
            /**
             * Clear the content of the outline navigator
             *
             */
            OutlineNavigator.prototype.clear = function () {
                this.setModel(null);
            };
            OutlineNavigator.prototype.expandAll = function (root, count) {
                if (count === void 0) { count = 0; }
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
            };
            /**
             * Lets check the worker if something changed in the outline of the source.
             * But lets not call this too often.
             */
            OutlineNavigator.prototype.updateOutline = function (data) {
                if (data === void 0) { data = []; }
                // IDE.console.log("Received outline info:" + data.length);
                var root = {
                    label: "root",
                    kids: data,
                    kind: ""
                };
                this.setModel(qx.data.marshal.Json.createModel(root, false));
                this.expandAll(this.getModel());
            };
            OutlineNavigator.MAX_DEFAULT_OPEN = 200;
            return OutlineNavigator;
        })(qx.ui.tree.VirtualTree);
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
        var ResultTable = (function (_super) {
            __extends(ResultTable, _super);
            function ResultTable(headers) {
                var _this = this;
                if (headers === void 0) { headers = ["tableheader_message", "tableheader_file", "tableheader_position"]; }
                var tableModel = new qx.ui.table.model.Simple();
                var columns = [];
                headers.forEach(function (header) { return columns.push(_this.tr(header)); });
                tableModel.setColumns(columns);
                tableModel.setData([]);
                this.setStatusBarVisible(false);
                var custom = {
                    tableColumnModel: function () {
                        return new qx.ui.table.columnmodel.Resize();
                    }
                };
                _super.call(this, tableModel, custom);
                this.setDecorator(null);
                this.setPadding(0, 0, 0, 0);
                this.addListener("click", function () {
                    var selectedRow = _this.getSelectionModel().getLeadSelectionIndex();
                    var data = _this.getTableModel().getRowData(selectedRow);
                    if (data)
                        Cats.FileEditor.OpenEditor(data[1], data[3]);
                });
                this.setContextMenu(this.createContextMenu());
            }
            ResultTable.prototype.rangeToPosition = function (range) {
                return (range.start.row + 1) + ":" + (range.start.column + 1);
            };
            /**
             * Clear all the data from the table
             */
            ResultTable.prototype.clear = function () {
                this.setData([]);
            };
            ResultTable.prototype.convert = function (row) {
                return [
                    row.message,
                    row.fileName,
                    this.rangeToPosition(row.range),
                    row.range
                ];
            };
            ResultTable.prototype.getData = function () {
                return this.data;
            };
            ResultTable.prototype.areEmpty = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i - 0] = arguments[_i];
                }
                for (var i = 0; i < args.length; i++) {
                    var arr = args[i];
                    if (arr && (arr.length > 0))
                        return false;
                }
                return true;
            };
            /**
             * Set the data for this table
             */
            ResultTable.prototype.setData = function (data) {
                var _this = this;
                if (this.areEmpty(this.data, data))
                    return;
                this.fireDataEvent("contentChange", null);
                this.data = data;
                var tableModel = new qx.ui.table.model.Simple();
                var rows = [];
                if (data) {
                    data.forEach(function (row) {
                        rows.push(_this.convert(row));
                    });
                }
                var model = this.getTableModel();
                model.setData(rows);
                // this.getSelectionModel().resetSelection();
            };
            /**
             * Add a row to the table
             */
            ResultTable.prototype.addData = function (row) {
                var model = this.getTableModel();
                model.addRows([this.convert(row)]);
            };
            ResultTable.prototype.createContextMenu = function () {
                var _this = this;
                var menu = new qx.ui.menu.Menu();
                var item1 = new qx.ui.menu.Button("Clear Output");
                item1.addListener("execute", function () { _this.clear(); });
                menu.add(item1);
                return menu;
            };
            return ResultTable;
        })(qx.ui.table.Table);
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
        var TabViewPage = (function (_super) {
            __extends(TabViewPage, _super);
            function TabViewPage(id, widget, tooltipText) {
                var _this = this;
                _super.call(this, _super.prototype.tr.call(this, id), Cats.IDE.icons.tab[id]);
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
                        if (_this.autoSelect) {
                            var elem = document.activeElement;
                            _this.select();
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
            TabViewPage.prototype.select = function () {
                var tabView = this.getLayoutParent().getLayoutParent();
                tabView.setSelection([this]);
            };
            return TabViewPage;
        })(qx.ui.tabview.Page);
        Gui.TabViewPage = TabViewPage;
        /**
         * Used for all the tabs execpt the session tab
         */
        var TabView = (function (_super) {
            __extends(TabView, _super);
            function TabView() {
                _super.call(this);
                this.setPadding(0, 0, 0, 0);
                this.setContentPadding(0, 0, 0, 0);
                this.createContextMenu();
            }
            TabView.prototype.createContextMenu = function () {
                var _this = this;
                var menu = new qx.ui.menu.Menu();
                var directions = ["top", "left", "right", "bottom"];
                directions.forEach(function (dir) {
                    var item = new qx.ui.menu.Button(_this.tr(dir));
                    item.addListener("execute", function () { _this.setBarPosition(dir); });
                    menu.add(item);
                });
                var mainmenu = new qx.ui.menu.Menu();
                var b = new qx.ui.menu.Button("Tab layout", null, null, menu);
                mainmenu.add(b);
                this.setContextMenu(mainmenu);
            };
            /**
             * Add a new Page to the tab Viewx
             */
            TabView.prototype.addPage = function (id, widget, tooltipText) {
                var tab = new TabViewPage(id, widget, tooltipText);
                this.add(tab);
                this.setSelection([tab]);
                return tab;
            };
            return TabView;
        })(qx.ui.tabview.TabView);
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
        var ToolBar = (function (_super) {
            __extends(ToolBar, _super);
            function ToolBar() {
                _super.call(this);
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
            ToolBar.prototype.createButton = function (cmd) {
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
            };
            ToolBar.prototype.init = function () {
                var _this = this;
                var part = new qx.ui.toolbar.Part();
                this.commands.forEach(function (cmd) {
                    if (cmd === null) {
                        _this.add(part);
                        part = new qx.ui.toolbar.Part();
                    }
                    else {
                        var button = _this.createButton(cmd);
                        part.add(button);
                    }
                });
                this.add(part);
            };
            /**
             * Alternative way to adding buttons to the toolbar
             */
            ToolBar.prototype.init2 = function () {
                var _this = this;
                this.commands.forEach(function (cmd) {
                    if (cmd === null) {
                        _this.addSeparator();
                    }
                    else {
                        var button = _this.createButton(cmd);
                        _this.add(button);
                    }
                });
            };
            return ToolBar;
        })(qx.ui.toolbar.ToolBar);
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
        var EditorPage = (function (_super) {
            __extends(EditorPage, _super);
            function EditorPage(editor) {
                _super.call(this, editor.label);
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
            EditorPage.prototype.continueWhenNeedSaving = function (callback) {
                if (this.editor.hasUnsavedChanges()) {
                    var dialog = new Gui.ConfirmDialog("There are unsaved changes!\nDo you really want to continue?");
                    dialog.onConfirm = callback;
                    dialog.show();
                }
                else {
                    callback();
                }
            };
            EditorPage.prototype._onButtonClose = function () {
                var _this = this;
                this.continueWhenNeedSaving(function () {
                    _super.prototype._onButtonClose.call(_this);
                });
            };
            EditorPage.prototype.createToolTip = function () {
                var button = this.getButton();
                var tooltipText = this.editor.getDescription() || this.editor.label;
                var tooltip = new qx.ui.tooltip.ToolTip(tooltipText);
                button.setToolTip(tooltip);
            };
            EditorPage.prototype.createContextMenu = function () {
                var _this = this;
                var button = this.getButton();
                var menu = new qx.ui.menu.Menu();
                var item1 = new qx.ui.menu.Button("Close");
                item1.addListener("execute", function () { Cats.IDE.editorTabView.close(_this); });
                var item2 = new qx.ui.menu.Button("Close other");
                item2.addListener("execute", function () { Cats.IDE.editorTabView.closeOther(_this); });
                var item3 = new qx.ui.menu.Button("Close all");
                item3.addListener("execute", function () { Cats.IDE.editorTabView.closeAll(); });
                menu.add(item1);
                menu.add(item2);
                menu.add(item3);
                button.setContextMenu(menu);
            };
            /**
             * Tell the Page that the editor on it has detected some errors in the code
             */
            EditorPage.prototype.setHasErrors = function (level) {
                if (level) {
                    var icon = Cats.IDE.icons.annotation[level];
                    this.setIcon(icon);
                }
                else {
                    this.resetIcon();
                }
            };
            EditorPage.prototype.setChanged = function (changed) {
                var button = this.getButton();
                if (changed) {
                    button.setLabel("*" + this.editor.label);
                }
                else {
                    button.setLabel(this.editor.label);
                }
            };
            return EditorPage;
        })(qx.ui.tabview.Page);
        Gui.EditorPage = EditorPage;
        var EditorTabView = (function (_super) {
            __extends(EditorTabView, _super);
            function EditorTabView() {
                _super.call(this);
                this.setPadding(0, 0, 0, 0);
                this.setContentPadding(0, 0, 0, 0);
            }
            EditorTabView.prototype.addEditor = function (editor, pos) {
                var page = new EditorPage(editor);
                this.add(page);
                this.navigateToPage(page, pos);
                page.fadeIn(500);
                return page;
            };
            /**
             * close all open pages
             */
            EditorTabView.prototype.closeAll = function () {
                var _this = this;
                var pages = this.getChildren().concat();
                this.continueIfUnsavedChanges(pages, function () {
                    pages.forEach(function (page) {
                        _this.remove(page);
                    });
                });
            };
            /**
             * close one page
             */
            EditorTabView.prototype.close = function (page) {
                var _this = this;
                if (page === void 0) { page = this.getActivePage(); }
                if (!page)
                    return;
                page.continueWhenNeedSaving(function () {
                    _this.remove(page);
                });
            };
            EditorTabView.prototype.onChangeEditor = function (cb) {
                this.addListener("changeSelection", function (ev) {
                    var page = ev.getData()[0];
                    if (page) {
                        cb(page.editor, page);
                    }
                    else {
                        cb(null, null);
                    }
                });
            };
            /**
             * Close the other pages
             */
            EditorTabView.prototype.closeOther = function (closePage) {
                var _this = this;
                if (closePage === void 0) { closePage = this.getActivePage(); }
                var pages = this.getChildren().concat().filter(function (page) { return page !== closePage; });
                this.continueIfUnsavedChanges(pages, function () {
                    pages.forEach(function (page) {
                        _this.remove(page);
                    });
                });
            };
            EditorTabView.prototype.continueIfUnsavedChanges = function (pages, callback) {
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
            };
            EditorTabView.prototype.hasUnsavedChanges = function () {
                return this.getChildren().some(function (page) {
                    return page.editor.hasUnsavedChanges();
                });
            };
            /**
             * Get all the editors
             */
            EditorTabView.prototype.getEditors = function () {
                var result = [];
                this.getChildren().forEach(function (page) {
                    result.push(page.editor);
                });
                return result;
            };
            /**
             * Get the currently active editor
             */
            EditorTabView.prototype.getActiveEditor = function (type) {
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
            };
            /**
             * Navigate to a certain page
             */
            EditorTabView.prototype.navigateToPage = function (page, pos) {
                if (this.getChildren().indexOf(page) === -1)
                    return;
                this.setSelection([page]);
                page.editor.moveToPosition(pos);
            };
            /**
             * Get the page that has a certain instance of an editor.
             */
            EditorTabView.prototype.getPageForEditor = function (editor) {
                var pages = this.getChildren();
                for (var x = 0; x < pages.length; x++) {
                    if (pages[x].editor === editor)
                        return pages[x];
                }
            };
            EditorTabView.prototype.getPagesForFile = function (filePath) {
                var result = [];
                this.getChildren().forEach(function (page) {
                    var editor = page.editor;
                    if (editor.filePath === filePath)
                        result.push(page);
                });
                return result;
            };
            EditorTabView.prototype.getActivePage = function () {
                return this.getSelection()[0];
            };
            return EditorTabView;
        })(qx.ui.tabview.TabView);
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
        var StatusBar = (function (_super) {
            __extends(StatusBar, _super);
            function StatusBar() {
                _super.call(this);
                this.status = {};
                this.init();
                this.setPadding(0, 0, 0, 0);
                Cats.IDE.editorTabView.onChangeEditor(this.register.bind(this));
            }
            StatusBar.prototype.clear = function () {
                this.modeInfo.setLabel("");
                this.overwriteInfo.setLabel("INSERT");
                this.positionInfo.setLabel("");
            };
            StatusBar.prototype.updateStatus = function (status) {
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
            };
            StatusBar.prototype.register = function (editor) {
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
            };
            /**
             * Create a new botton
             *
             */
            StatusBar.prototype.createButton = function (label, icon) {
                var button = new qx.ui.toolbar.Button(label, icon);
                // button.setPadding(1,1,1,1);
                button.setMargin(0, 10, 0, 10);
                button.setMinWidth(100);
                button.setDecorator(null);
                return button;
            };
            /**
             * Initialize the status bar
             *
             */
            StatusBar.prototype.init = function () {
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
            };
            /**
             * Indicate if the worker is busy or not
             *
             */
            StatusBar.prototype.setBusy = function (busy, activity) {
                if (busy) {
                    this.busyInfo.setIcon("./resource/cats/loader_anim.gif");
                }
                else {
                    this.busyInfo.setIcon("./resource/cats/loader.gif");
                }
                if (Cats.IDE.debug && busy && activity)
                    Cats.IDE.console.log(activity);
            };
            return StatusBar;
        })(qx.ui.toolbar.ToolBar);
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
        var ConfirmDialog = (function (_super) {
            __extends(ConfirmDialog, _super);
            function ConfirmDialog(text) {
                _super.call(this, name);
                var layout = new qx.ui.layout.VBox();
                this.setLayout(layout);
                this.setModal(true);
                this.setShowMinimize(false);
                this.setShowMaximize(false);
                this.addControls(text);
                this.addListener("resize", this.center);
            }
            ConfirmDialog.prototype.addControls = function (text) {
                var _this = this;
                var form = new qx.ui.form.Form();
                // Prompt message
                form.addGroupHeader(text);
                // Confirm command
                var confirmCommand = new qx.ui.core.Command("Enter");
                confirmCommand.addListener("execute", function () {
                    if (_this.onConfirm) {
                        _this.onConfirm();
                    }
                    _this.close();
                });
                // Cancel command
                var cancelCommand = new qx.ui.core.Command("Escape");
                cancelCommand.addListener("execute", function () {
                    if (_this.onCancel) {
                        _this.onCancel();
                    }
                    _this.close();
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
            };
            return ConfirmDialog;
        })(qx.ui.window.Window);
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
         * CATS.
         */
        var PromptDialog = (function (_super) {
            __extends(PromptDialog, _super);
            function PromptDialog(text, value) {
                if (value === void 0) { value = ""; }
                _super.call(this, name);
                var layout = new qx.ui.layout.VBox();
                this.setLayout(layout);
                this.setModal(true);
                this.setShowMinimize(false);
                this.setShowMaximize(false);
                this.addControls(text, value);
                this.addListener("resize", this.center);
            }
            PromptDialog.prototype.addControls = function (text, value) {
                var _this = this;
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
                var successCommand = new qx.ui.core.Command("Enter");
                successCommand.addListener("execute", function () {
                    if (form.validate()) {
                        if (_this.onSuccess) {
                            _this.onSuccess(valuefield.getValue());
                        }
                        _this.close();
                    }
                    ;
                });
                // Cancel command
                var cancelCommand = new qx.ui.core.Command("Escape");
                cancelCommand.addListener("execute", function () {
                    _this.close();
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
            };
            return PromptDialog;
        })(qx.ui.window.Window);
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
        function throttle(fn, threshhold, context) {
            if (threshhold === void 0) { threshhold = 250; }
            if (context === void 0) { context = null; }
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
        var QuickOpenDialog = (function (_super) {
            __extends(QuickOpenDialog, _super);
            function QuickOpenDialog(project) {
                _super.call(this, "Quick Open");
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
            QuickOpenDialog.prototype.collectFiles = function () {
                var _this = this;
                var projectDir = this.project.projectDir;
                this.project.getScripts().forEach(function (absolutePath) {
                    if (absolutePath.lastIndexOf(projectDir, 0) === 0) {
                        var relativePath = absolutePath.slice(projectDir.length + 1);
                        _this.files.push(relativePath);
                    }
                });
            };
            QuickOpenDialog.prototype.addControls = function () {
                // Prompt message
                // form.addGroupHeader("Type a few letters to find a project file to open...");
                var _this = this;
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
                    var results = fuzzy.filter(query, _this.files, opts);
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
                var successCommand = new qx.ui.core.Command("Enter");
                successCommand.addListener("execute", function () {
                    var results = filelist.getSelection();
                    if (results.length > 0) {
                        var result = results[0];
                        var relativePath = result.getModel();
                        var filePath = Cats.OS.File.join(_this.project.projectDir, relativePath);
                        Cats.FileEditor.OpenEditor(filePath);
                        _this.close();
                    }
                    ;
                });
                filelist.addListener("dblclick", function () {
                    successCommand.execute(null);
                });
                // Cancel command
                var cancelCommand = new qx.ui.core.Command("Escape");
                cancelCommand.addListener("execute", function () {
                    _this.close();
                });
                // Command cleanup
                this.addListener("close", function () {
                    successCommand.setEnabled(false);
                    cancelCommand.setEnabled(false);
                });
            };
            return QuickOpenDialog;
        })(qx.ui.window.Window);
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
        var FileContextMenu = (function (_super) {
            __extends(FileContextMenu, _super);
            function FileContextMenu(fileNavigator) {
                _super.call(this);
                this.fileNavigator = fileNavigator;
                this.gui = require("nw.gui");
                this.searchDialog = new Gui.SearchDialog();
                this.init();
            }
            FileContextMenu.prototype.openInApp = function () {
                var osPath = Cats.OS.File.join(this.getFullPath(), "", true);
                if (osPath)
                    this.gui.Shell.openItem(osPath);
            };
            FileContextMenu.prototype.showInFolder = function () {
                var osPath = Cats.OS.File.join(this.getFullPath(), "", true);
                if (osPath)
                    this.gui.Shell.showItemInFolder(osPath);
            };
            FileContextMenu.prototype.search = function () {
                this.searchDialog.search(this.getFullPath());
            };
            FileContextMenu.prototype.getSelectedItem = function () {
                return this.fileNavigator.getSelection().getItem(0);
            };
            FileContextMenu.prototype.getFullPath = function () {
                var fileName = this.getSelectedItem().getFullPath();
                return fileName;
            };
            FileContextMenu.prototype.init = function () {
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
            };
            FileContextMenu.prototype.deleteFile = function () {
                var fullName = this.getFullPath();
                var basename = Cats.OS.File.PATH.basename(fullName);
                var dialog = new Gui.ConfirmDialog("Delete " + basename + "?");
                dialog.onConfirm = function () {
                    Cats.OS.File.remove(fullName);
                };
                dialog.show();
            };
            FileContextMenu.prototype.getBaseDir = function () {
                var item = this.getSelectedItem();
                var fullPath = this.getFullPath();
                if (item.getDirectory()) {
                    return fullPath;
                }
                else {
                    return Cats.OS.File.PATH.dirname(fullPath);
                }
            };
            FileContextMenu.prototype.newFile = function () {
                var basedir = this.getBaseDir();
                var dialog = new Gui.PromptDialog("Enter new file name in directory " + basedir);
                dialog.onSuccess = function (name) {
                    var fullName = Cats.OS.File.join(basedir, name);
                    Cats.OS.File.writeTextFile(fullName, "");
                };
                dialog.show();
            };
            FileContextMenu.prototype.newFolder = function () {
                var basedir = this.getBaseDir();
                var dialog = new Gui.PromptDialog("Enter new folder name in directory " + basedir);
                dialog.onSuccess = function (name) {
                    var fullName = Cats.OS.File.join(basedir, name);
                    Cats.OS.File.mkdirRecursiveSync(fullName);
                };
                dialog.show();
            };
            FileContextMenu.prototype.rename = function () {
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
            };
            return FileContextMenu;
        })(qx.ui.menu.Menu);
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
        var ConfigDialog = (function (_super) {
            __extends(ConfigDialog, _super);
            function ConfigDialog(name) {
                _super.call(this, name);
                var layout = new qx.ui.layout.VBox();
                this.setLayout(layout);
                this.setModal(true);
                this.addTabs();
                this.addButtons();
                this.addListener("resize", this.center);
            }
            ConfigDialog.prototype.addTabs = function () {
                // to do in subclasses;
            };
            ConfigDialog.prototype.saveValues = function () {
                // to do in subclass
            };
            ConfigDialog.prototype.addButtons = function () {
                var _this = this;
                // Save button
                var form = new qx.ui.form.Form();
                var okbutton = new qx.ui.form.Button("Ok");
                form.addButton(okbutton);
                okbutton.addListener("execute", function () {
                    if (form.validate()) {
                        _this.saveValues();
                        _this.close();
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
            };
            return ConfigDialog;
        })(qx.ui.window.Window);
        Gui.ConfigDialog = ConfigDialog;
        /**
         * Base class for all configuration tab pages. Contains a number
         * of helper methods to quickly add a form element.
         */
        var ConfigDialogPage = (function (_super) {
            __extends(ConfigDialogPage, _super);
            function ConfigDialogPage(name) {
                _super.call(this, name);
                this.form = new qx.ui.form.Form();
                this.setLayout(new qx.ui.layout.Canvas());
            }
            ConfigDialogPage.prototype.addCheckBox = function (model) {
                var cb = new qx.ui.form.CheckBox();
                var label = this.getLabelString(model);
                this.form.add(cb, label, null, model);
            };
            ConfigDialogPage.prototype.getLabelString = function (model) {
                if (!model)
                    return "<model undefined>";
                var labelId = "config_" + model;
                var label = this.tr(labelId);
                if (label != labelId)
                    return label;
                return model.split(/(?=[A-Z])/).join(" ");
            };
            ConfigDialogPage.prototype.addSpinner = function (model, min, max) {
                var s = new qx.ui.form.Spinner();
                s.set({ minimum: min, maximum: max });
                var label = this.getLabelString(model);
                this.form.add(s, label, null, model);
            };
            ConfigDialogPage.prototype.addTextField = function (model) {
                var t = new qx.ui.form.TextField();
                t.setWidth(200);
                var label = this.getLabelString(model);
                this.form.add(t, label, null, model);
            };
            ConfigDialogPage.prototype.addSelectBox = function (model, items) {
                var s = new qx.ui.form.SelectBox();
                items.forEach(function (item) {
                    var listItem = new qx.ui.form.ListItem(item.label, null, item.model);
                    s.add(listItem);
                });
                var label = this.getLabelString(model);
                this.form.add(s, label, null, model);
            };
            ConfigDialogPage.prototype.setData = function (data) {
                for (var key in data) {
                    try {
                        this.model.set(key, data[key]);
                    }
                    catch (err) { }
                }
            };
            /**
             * Get the data back as a JSON object
             */
            ConfigDialogPage.prototype.getData = function () {
                var result = JSON.parse(qx.util.Serializer.toJson(this.model));
                return result;
            };
            ConfigDialogPage.prototype.finalStep = function () {
                var controller = new qx.data.controller.Form(null, this.form);
                this.model = controller.createModel(false);
                var renderer = new qx.ui.form.renderer.Single(this.form);
                this.add(renderer);
            };
            return ConfigDialogPage;
        })(qx.ui.tabview.Page);
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
        var ProjectSettingsDialog = (function (_super) {
            __extends(ProjectSettingsDialog, _super);
            function ProjectSettingsDialog(project) {
                _super.call(this, _super.prototype.tr.call(this, "project_settings"));
                this.project = project;
                this.loadValues();
            }
            ProjectSettingsDialog.prototype.loadValues = function () {
                var config = this.project.config;
                this.projectSettings.setData(config);
                this.compilerSettings.setData(config.compiler);
                this.codeFormatSettings.setData(config.codeFormat);
                this.tslintSettings.setData(config.tslint);
                this.customBuild.setData(config.customBuild);
                this.customRun.setData(config.customRun);
                this.documentationSettings.setData(config.documentation);
            };
            ProjectSettingsDialog.prototype.saveValues = function () {
                var config = this.projectSettings.getData();
                config.compiler = this.compilerSettings.getData();
                config.codeFormat = this.codeFormatSettings.getData();
                config.customBuild = this.customBuild.getData();
                config.customRun = this.customRun.getData();
                config.documentation = this.documentationSettings.getData();
                config.tslint = this.tslintSettings.getData();
                Cats.IDE.project.updateConfig(config);
            };
            ProjectSettingsDialog.prototype.addTabs = function () {
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
            };
            return ProjectSettingsDialog;
        })(Gui.ConfigDialog);
        Gui.ProjectSettingsDialog = ProjectSettingsDialog;
        /**
         * Dialog window to set the compiler settings
         */
        var ProjectCompilerSettings = (function (_super) {
            __extends(ProjectCompilerSettings, _super);
            function ProjectCompilerSettings() {
                _super.call(this, "Compiler");
                this.moduleGenTarget = [
                    { label: "none", model: 0 /* None */ },
                    { label: "commonjs", model: 1 /* CommonJS */ },
                    { label: "amd", model: 2 /* AMD */ }
                ];
                this.jsTarget = [
                    { label: "es3", model: 0 /* ES3 */ },
                    { label: "es5", model: 1 /* ES5 */ },
                    { label: "es6", model: 2 /* ES6 */ }
                ];
                this.createForm();
                this.finalStep();
            }
            ProjectCompilerSettings.prototype.createForm = function () {
                this.addCheckBox("noLib");
                this.addCheckBox("removeComments");
                this.addCheckBox("noImplicitAny");
                this.addCheckBox("declaration");
                this.addCheckBox("sourceMap");
                this.addCheckBox("propagateEnumConstants");
                this.addCheckBox("allowAutomaticSemicolonInsertion");
                this.addSelectBox("target", this.jsTarget);
                this.addSelectBox("module", this.moduleGenTarget);
                this.addTextField("outDir");
                this.addTextField("out");
            };
            return ProjectCompilerSettings;
        })(Gui.ConfigDialogPage);
        /**
         * The generic project settings
         */
        var ProjectGeneric = (function (_super) {
            __extends(ProjectGeneric, _super);
            function ProjectGeneric() {
                _super.call(this, "Generic");
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
            ProjectGeneric.prototype.createForm = function () {
                this.addTextField("src");
                this.addTextField("main");
                this.addCheckBox("buildOnSave");
                this.addSelectBox("projectType", this.projectType);
            };
            return ProjectGeneric;
        })(Gui.ConfigDialogPage);
        /**
         * The different settings so all developers checking the same code format and
         * standards.
         */
        var CodeFormatSettings = (function (_super) {
            __extends(CodeFormatSettings, _super);
            function CodeFormatSettings() {
                _super.call(this, "Code Formatting");
                this.newLineMode = [
                    { label: "Linux/OSX", model: "\n" },
                    { label: "Dos/Windows", model: "\r\n" },
                ];
                this.createForm();
                this.finalStep();
            }
            CodeFormatSettings.prototype.createForm = function () {
                this.addSelectBox("NewLineCharacter", this.newLineMode);
                this.addCheckBox("ConvertTabsToSpaces");
                this.addSpinner("IndentSize", 1, 16);
                this.addSpinner("TabSize", 1, 16);
                // this.addCheckBox2("InsertSpaceAfterCommaDelimiter");
                // this.addCheckBox2("InsertSpaceAfterFunctionKeywordForAnonymousFunctions");
                // this.addCheckBox2("")
            };
            return CodeFormatSettings;
        })(Gui.ConfigDialogPage);
        /**
         * The configuration for TSLint
         */
        var TSLintSettings = (function (_super) {
            __extends(TSLintSettings, _super);
            function TSLintSettings() {
                _super.call(this, "TSLint Settings");
                this.createForm();
                this.finalStep();
            }
            TSLintSettings.prototype.createForm = function () {
                this.addCheckBox("useLint");
                this.addTextField("lintFile");
            };
            return TSLintSettings;
        })(Gui.ConfigDialogPage);
        /**
         * The various settings for the documentation generation tool (TypeDoc).
         */
        var DocumentationSettings = (function (_super) {
            __extends(DocumentationSettings, _super);
            function DocumentationSettings() {
                _super.call(this, "Documentation Settings");
                this.themes = [
                    { label: "Default", model: "default" },
                ];
                this.createForm();
                this.finalStep();
            }
            DocumentationSettings.prototype.createForm = function () {
                this.addCheckBox("includeDeclarations");
                this.addTextField("outputDirectory");
                this.addTextField("readme");
                this.addSelectBox("theme", this.themes);
            };
            return DocumentationSettings;
        })(Gui.ConfigDialogPage);
        var CustomBuildSettings = (function (_super) {
            __extends(CustomBuildSettings, _super);
            function CustomBuildSettings(name) {
                if (name === void 0) { name = "Custom Build"; }
                _super.call(this, name);
                this.createForm();
                this.finalStep();
            }
            CustomBuildSettings.prototype.createForm = function () {
                this.addTextField("name");
                this.addTextField("command");
                this.addTextField("directory");
                this.addTextField("environment");
                this.addCheckBox("ownConsole");
            };
            return CustomBuildSettings;
        })(Gui.ConfigDialogPage);
        var CustomRunSettings = (function (_super) {
            __extends(CustomRunSettings, _super);
            function CustomRunSettings() {
                _super.call(this, "Custom Run");
            }
            return CustomRunSettings;
        })(CustomBuildSettings);
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
        var IdePreferencesDialog = (function (_super) {
            __extends(IdePreferencesDialog, _super);
            function IdePreferencesDialog(config) {
                _super.call(this, "CATS Settings");
                this.config = config;
                this.loadValues();
            }
            IdePreferencesDialog.prototype.loadValues = function () {
                var config = this.config;
                this.editorSettings.setData(config.editor);
                this.ideGenericSettings.setData(config);
            };
            IdePreferencesDialog.prototype.saveValues = function () {
                var config = this.ideGenericSettings.getData();
                config.editor = this.editorSettings.getData();
                Cats.IDE.updatePreferences(config);
            };
            IdePreferencesDialog.prototype.addTabs = function () {
                var tab = new qx.ui.tabview.TabView();
                this.ideGenericSettings = new GenericPreferences;
                this.editorSettings = new EditorPreferences;
                tab.add(this.ideGenericSettings);
                tab.add(this.editorSettings);
                this.add(tab);
            };
            return IdePreferencesDialog;
        })(Gui.ConfigDialog);
        Gui.IdePreferencesDialog = IdePreferencesDialog;
        /**
         * This class contains the configuration page for the overal IDE
         */
        var GenericPreferences = (function (_super) {
            __extends(GenericPreferences, _super);
            function GenericPreferences() {
                _super.call(this, "Generic");
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
            GenericPreferences.prototype.createForm = function () {
                this.addSelectBox("theme", this.themes);
                this.addSelectBox("locale", this.locales);
                this.addCheckBox("rememberOpenFiles");
                this.addCheckBox("rememberLayout");
            };
            return GenericPreferences;
        })(Gui.ConfigDialogPage);
        /**
         * This class contains the configuration page for the source editor
         */
        var EditorPreferences = (function (_super) {
            __extends(EditorPreferences, _super);
            function EditorPreferences() {
                _super.call(this, "Source Editor");
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
            EditorPreferences.prototype.getThemes = function () {
                var themelist = ace.require("ace/ext/themelist");
                var result = [];
                themelist.themes.forEach(function (x) {
                    var name = Cats.OS.File.PATH.basename(x.theme);
                    result.push({ model: name, label: name });
                });
                return result;
            };
            EditorPreferences.prototype.createForm = function () {
                this.addSpinner("fontSize", 6, 24);
                this.addSpinner("rightMargin", 40, 240);
                this.addSelectBox("theme", this.getThemes());
                this.addSelectBox("completionMode", this.completionMode);
            };
            return EditorPreferences;
        })(Gui.ConfigDialogPage);
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
         * stopped or killed.
         *
         * @TODO provide feedback of the actuall status of a process
         */
        var ProcessTable = (function (_super) {
            __extends(ProcessTable, _super);
            function ProcessTable() {
                _super.call(this, new qx.ui.layout.VBox());
                this.setPadding(0, 0, 0, 0);
                this.add(this.createControls());
                this.add(this.createTable(), { flex: 1 });
            }
            /**
             * Add a new process to the table
             */
            ProcessTable.prototype.addProcess = function (child, cmd) {
                var row = new Array("" + child.pid, cmd, child);
                var model = this.table.getTableModel();
                model.addRows([row]);
                this.table.getSelectionModel().resetSelection();
            };
            ProcessTable.prototype.sendSignal = function (signal) {
                var table = this.table;
                var selectedRow = table.getSelectionModel().getLeadSelectionIndex();
                if (selectedRow < 0) {
                    alert("You have to select a process from the table below first");
                    return;
                }
                var data = table.getTableModel().getRowData(selectedRow);
                var child = data[2];
                child.kill(signal);
            };
            ProcessTable.prototype.addButton = function (bar, label, signal) {
                var _this = this;
                var button = new qx.ui.toolbar.Button(label);
                button.addListener("execute", function () { _this.sendSignal(signal); });
                bar.add(button);
            };
            ProcessTable.prototype.createTable = function () {
                var tableModel = new qx.ui.table.model.Simple();
                var headers = [_super.prototype.tr.call(this, "tableheader_pid"), _super.prototype.tr.call(this, "tableheader_command")];
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
            };
            ProcessTable.prototype.createControls = function () {
                var bar = new qx.ui.toolbar.ToolBar();
                this.addButton(bar, "Stop", "SIGTERM");
                this.addButton(bar, "Kill", "SIGKILL");
                this.addButton(bar, "Pause", "SIGSTOP");
                this.addButton(bar, "Resume", "SIGCONT");
                return bar;
            };
            return ProcessTable;
        })(qx.ui.container.Composite);
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
         */
        var BusyWindow = (function (_super) {
            __extends(BusyWindow, _super);
            function BusyWindow(name) {
                var _this = this;
                _super.call(this, name);
                this.setLayout(new qx.ui.layout.Basic());
                this.setMinWidth(300);
                this.setMinHeight(150);
                this.add(new qx.ui.basic.Label("Please wait one moment ...."));
                this.setModal(true);
                this.addListener("resize", this.center);
                this.addListenerOnce("appear", function () {
                    setTimeout(function () {
                        _this.fireDataEvent("ready", {});
                    }, 100);
                });
            }
            return BusyWindow;
        })(qx.ui.window.Window);
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
        var PropertyTable = (function (_super) {
            __extends(PropertyTable, _super);
            function PropertyTable() {
                var tableModel = new qx.ui.table.model.Simple();
                var headers = [_super.prototype.tr.call(this, "tableheader_name"), _super.prototype.tr.call(this, "tableheader_value")];
                tableModel.setColumns(headers);
                tableModel.setData([]);
                this.setStatusBarVisible(false);
                var custom = {
                    tableColumnModel: function (obj) {
                        return new qx.ui.table.columnmodel.Resize();
                    }
                };
                _super.call(this, tableModel, custom);
                this.setDecorator(null);
                this.setPadding(0, 0, 0, 0);
                Cats.IDE.editorTabView.onChangeEditor(this.register.bind(this));
            }
            PropertyTable.prototype.clear = function () {
                this.setData([]);
            };
            PropertyTable.prototype.register = function (editor) {
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
            };
            PropertyTable.prototype.getData = function () {
                return this.data;
            };
            PropertyTable.prototype.setData = function (data) {
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
            };
            return PropertyTable;
        })(qx.ui.table.Table);
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
        var Layout = (function () {
            function Layout(rootDoc) {
                this.rootDoc = rootDoc;
            }
            /**
             * Layout the various parts of de IDE
             */
            Layout.prototype.layout = function (ide) {
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
            };
            return Layout;
        })();
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
        var SearchDialog = (function (_super) {
            __extends(SearchDialog, _super);
            function SearchDialog() {
                _super.call(this, "Search in Files");
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
            SearchDialog.prototype.search = function (rootDir) {
                this.rootDir = rootDir;
                this.show();
            };
            SearchDialog.prototype.getResults = function (fileName, pattern, result) {
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
            };
            SearchDialog.prototype.run = function (param) {
                var _this = this;
                var result = [];
                var mod = param.caseInsensitive ? "i" : "";
                var searchPattern = new RegExp(param.search, "g" + mod);
                if (!param.glob)
                    param.glob = "**/*";
                Cats.OS.File.find(param.glob, this.rootDir, function (err, files) {
                    files.forEach(function (file) {
                        if (result.length > param.maxHits)
                            return;
                        var fullName = Cats.OS.File.join(_this.rootDir, file);
                        _this.getResults(fullName, searchPattern, result);
                    });
                    var resultTable = new Gui.ResultTable();
                    var toolTipText = "Search results for " + searchPattern + " in " + _this.rootDir + "/" + param.glob;
                    var page = Cats.IDE.resultPane.addPage("search", resultTable, toolTipText);
                    page.setShowCloseButton(true);
                    resultTable.setData(result);
                    _this.close();
                });
            };
            SearchDialog.prototype.addTextField = function (label, model) {
                var t = new qx.ui.form.TextField();
                t.setWidth(200);
                this.form.add(t, label, null, model);
                return t;
            };
            SearchDialog.prototype.addSpinner = function (label, model) {
                var s = new qx.ui.form.Spinner();
                s.set({ minimum: 0, maximum: 1000 });
                this.form.add(s, label, null, model);
                return s;
            };
            SearchDialog.prototype.addCheckBox = function (label, model) {
                var cb = new qx.ui.form.CheckBox();
                this.form.add(cb, label, null, model);
                return cb;
            };
            SearchDialog.prototype.createForm = function () {
                var _this = this;
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
                    if (_this.form.validate()) {
                        var param = {
                            search: s.getValue(),
                            glob: p.getValue(),
                            caseInsensitive: c.getValue(),
                            maxHits: m.getValue()
                        };
                        _this.run(param);
                    }
                    ;
                }, this);
                this.form.addButton(cancelButton);
                cancelButton.addListener("execute", function () {
                    _this.close();
                }, this);
                var renderer = new qx.ui.form.renderer.Single(this.form);
                return renderer;
            };
            SearchDialog.prototype.createResultTable = function () {
                var r = new Gui.ResultTable();
                return r;
            };
            return SearchDialog;
        })(qx.ui.window.Window);
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
        var RenameDialog = (function (_super) {
            __extends(RenameDialog, _super);
            function RenameDialog() {
                _super.call(this, "Rename");
                this.form = new qx.ui.form.Form();
                var layout = new qx.ui.layout.VBox();
                this.setLayout(layout);
                this.add(this.createForm());
                this.setModal(true);
                this.addListener("resize", this.center);
            }
            RenameDialog.prototype.run = function (fileName, project, pos) {
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
            };
            RenameDialog.prototype.addTextField = function (label, model) {
                var t = new qx.ui.form.TextField();
                t.setWidth(200);
                this.form.add(t, label, null, model);
                return t;
            };
            RenameDialog.prototype.addSpinner = function (label, model) {
                var s = new qx.ui.form.Spinner();
                s.set({ minimum: 0, maximum: 1000 });
                this.form.add(s, label, null, model);
                return s;
            };
            RenameDialog.prototype.addCheckBox = function (label, model) {
                var cb = new qx.ui.form.CheckBox();
                this.form.add(cb, label, null, model);
                return cb;
            };
            RenameDialog.prototype.createForm = function () {
                var _this = this;
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
                    if (_this.form.validate()) {
                        var param = {
                            name: s.getValue(),
                            caseInsensitive: c.getValue(),
                        };
                    }
                    ;
                }, this);
                this.form.addButton(cancelButton);
                cancelButton.addListener("execute", function () {
                    _this.close();
                }, this);
                var renderer = new qx.ui.form.renderer.Single(this.form);
                return renderer;
            };
            return RenameDialog;
        })(qx.ui.window.Window);
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
        var GUI = require('nw.gui');
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
         * is not using Qooxdoo but an API exposed by nodewebkit.
         * This makes it possible to have the feeling of a native menubar.
         */
        var MenuBar = (function () {
            function MenuBar() {
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
            MenuBar.prototype.createMenuBar = function () {
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
            };
            /**
             * Create an item in the main menu bar. Optional the position can be passed
             * for this item.
             */
            MenuBar.prototype.createMenuBarItem = function (name, position) {
                var label = qx.locale.Manager.tr(name + "_menu_name");
                var menu = new GUI.Menu();
                this.menus[name] = menu;
                if (position) {
                    this.menu.insert(new GUI.MenuItem({ label: label, submenu: menu }), position);
                }
                else {
                    this.menu.append(new GUI.MenuItem({ label: label, submenu: menu }));
                }
            };
            MenuBar.prototype.createSourceMenu = function () {
                var source = this.menus.source;
                source.append(getItem(CMDS.edit_toggleComment));
                source.append(getItem(CMDS.edit_toggleInvisibles));
                source.append(new GUI.MenuItem({ type: "separator" }));
                source.append(getItem(CMDS.edit_indent));
                source.append(getItem(CMDS.edit_outdent));
                source.append(new GUI.MenuItem({ type: "separator" }));
                source.append(getItem(CMDS.source_format));
                source.append(getItem(CMDS.edit_gotoLine));
            };
            MenuBar.prototype.createHelpMenu = function () {
                var help = this.menus["help"];
                help.append(getItem(CMDS.help_shortcuts));
                help.append(getItem(CMDS.help_processInfo));
                help.append(getItem(CMDS.help_devTools));
                help.append(getItem(CMDS.help_about));
            };
            MenuBar.prototype.createEditMenu = function () {
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
            };
            MenuBar.prototype.createFileMenu = function () {
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
            };
            MenuBar.prototype.recentProjects = function () {
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
            };
            MenuBar.prototype.createProjectMenu = function () {
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
                proj.append(new GUI.MenuItem({ type: "separator" }));
                proj.append(getItem(CMDS.project_classDiagram));
                proj.append(getItem(CMDS.project_document));
                proj.append(new GUI.MenuItem({ type: "separator" }));
                proj.append(getItem(CMDS.project_configure));
            };
            MenuBar.prototype.createViewMenu = function () {
                var view = this.menus.view;
                view.append(getItem(CMDS.ide_toggle_toolbar));
                view.append(getItem(CMDS.ide_toggle_statusbar));
                view.append(getItem(CMDS.ide_toggle_context));
                view.append(getItem(CMDS.ide_toggle_result));
            };
            return MenuBar;
        })();
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
        var TSHelper = (function () {
            function TSHelper(editor, editSession) {
                this.editor = editor;
                this.editSession = editSession;
                this.pendingUpdates = false;
                this.init();
            }
            TSHelper.prototype.init = function () {
                var _this = this;
                this.updateDiagnostics(0);
                this.updateOutline(0);
                this.editor.getLayoutItem().addListener("appear", function () {
                    _this.updateDiagnostics(0);
                });
                this.editSession.on("change", function () {
                    _this.updateContent();
                });
            };
            TSHelper.prototype.updateContent = function (timeout) {
                var _this = this;
                if (timeout === void 0) { timeout = 500; }
                if (!this.editor.isTypeScript())
                    return;
                clearTimeout(this.updateSourceTimer);
                this.pendingUpdates = true;
                this.updateSourceTimer = setTimeout(function () {
                    if (_this.pendingUpdates) {
                        _this.editor.project.iSense.updateScript(_this.editor.filePath, _this.editSession.getValue());
                        _this.pendingUpdates = false;
                        _this.updateDiagnostics();
                        _this.updateOutline();
                    }
                }, timeout);
            };
            /**
            * Lets check the worker if something changed in the outline of the source.
            * But lets not call this too often.
            *
            */
            TSHelper.prototype.updateOutline = function (timeout) {
                var _this = this;
                if (timeout === void 0) { timeout = 5000; }
                if (!this.editor.isTypeScript())
                    return;
                var project = this.editor.project;
                clearTimeout(this.outlineTimer);
                this.outlineTimer = setTimeout(function () {
                    project.iSense.getScriptOutline(_this.editor.filePath, function (err, data) {
                        _this.editor.set("outline", data);
                    });
                }, timeout);
            };
            /**
             * Lets check the worker if something changed in the diagnostic.
             *
             */
            TSHelper.prototype.updateDiagnostics = function (timeout) {
                var _this = this;
                if (timeout === void 0) { timeout = 1000; }
                if (!this.editor.isTypeScript())
                    return;
                var project = this.editor.project;
                this.diagnosticTimer = setTimeout(function () {
                    project.iSense.getErrors(_this.editor.filePath, function (err, result) {
                        if (project.config.tslint.useLint) {
                            result = result.concat(project.linter.lint(_this.editor.filePath, _this.editor.getContent()));
                        }
                        _this.editSession.showAnnotations(result);
                    });
                }, timeout);
            };
            return TSHelper;
        })();
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
        var MimeTypeFinder = (function () {
            function MimeTypeFinder() {
            }
            /**
             * Find the mimetype for a file name
             */
            MimeTypeFinder.lookup = function (filename, fallback) {
                return this.types[Cats.OS.File.PATH.extname(filename)] || fallback || this.default_type;
            };
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
            return MimeTypeFinder;
        })();
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
        var ResourceLoader = (function () {
            function ResourceLoader() {
            }
            ResourceLoader.prototype.require = function (file, callback) {
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
            };
            ResourceLoader.prototype.loadResources = function (files, callback) {
                var _this = this;
                var counter = 0;
                files.forEach(function (file) {
                    _this.require(file, function () {
                        counter++;
                        if (counter === files.length) {
                            callback();
                        }
                    });
                });
            };
            return ResourceLoader;
        })();
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
    // Variable used everywhere for accessing the singleton IDE instance
    Cats.IDE;
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
        if (args.indexOf("--debug") > -1) {
            Cats.IDE.debug = true;
        }
        Cats.IDE.init(app.getRoot());
        var prjDir = determineProject(args);
        if (prjDir) {
            Cats.IDE.addProject(prjDir);
        }
        else {
            if (args.indexOf("--restore") > -1)
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
