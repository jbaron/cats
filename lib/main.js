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
        qx.Theme.define("cats.theme.ColorBlue", {
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
        qx.Theme.define("cats.theme.Color2", {
            extend: qx.theme.simple.Color,
            colors: {
                "background": "#eeeeee",
                "light-background": "#646464",
                "button-box-bright": "#A0A0A0",
                "background-selected": "#666666",
                "border-main": "#666666",
                "background-selected-dark": "#555555",
                "link": "#AAAAAA",
                "table-row-background-even": "#eeeeee",
                "table-row-background-odd": "#dedede",
                "table-row-background-focused-selected": "#646464"
            }
        });
        qx.Theme.define("cats.theme.Color", {
            extend: qx.theme.simple.Color,
            colors: {
                "background": "rgba(242, 242, 242, 0.5)",
                "light-background": "transparent",
                "background-selected": "rgba(151, 151, 151, 0.6)",
                "background-selected-dark": "rgba(111, 111, 111, 0.6)",
                "background-pane": "rgba(200, 200, 200, 0.9)",
                "button-box-bright": "rgba(222, 222, 222, 0.3)",
                "border-main": "rgba(111, 111, 111, 0.6)",
                // "link": "rgba(51, 51, 51, 0.9)",
                "link": "rgba(221, 221, 221, 0.9)",
                "table-row-background-even": "rgba(222, 222, 222, 0.1)",
                "table-row-background-odd": "transparent",
                "table-header-cell": "rgba(100, 100, 100, 0.4)",
                "table-header": "rgba(100, 100, 100, 0.4)",
                "table-row-background-focused-selected": "rgba(221, 238, 255, 0.7)",
                // tooltip
                "tooltip": "rgba(255, 255, 204, 0.8)",
                "tooltip-text": "#000023"
            }
        });
        qx.Theme.define("cats.theme.ColorLight2", {
            extend: qx.theme.simple.Color,
            colors: {
                "background": "rgba(242, 242, 242, 0.7)",
                "light-background": "transparent",
                "background-selected": "rgba(151, 151, 151, 0.6)",
                "background-selected-dark": "rgba(111, 111, 111, 0.6)",
                "background-pane": "rgba(200, 200, 200, 0.9)",
                "button-box-bright": "rgba(222, 222, 222, 0.3)",
                "border-main": "rgba(111, 111, 111, 0.6)",
                // "link": "rgba(51, 51, 51, 0.9)",
                "link": "rgba(221, 221, 221, 0.9)",
                "table-row-background-even": "rgba(222, 222, 222, 0.1)",
                "table-row-background-odd": "rgba(100, 100, 100, 0.1)",
                "table-header-cell": "rgba(100, 100, 100, 0.4)",
                "table-header": "rgba(100, 100, 100, 0.4)",
                "table-row-background-focused-selected": "rgba(221, 238, 255, 0.7)",
                // tooltip
                "tooltip": "rgba(255, 255, 204, 0.8)",
                "tooltip-text": "#000023"
            }
        });
        qx.Theme.define("cats.theme.ColorDark", {
            extend: qx.theme.simple.Color,
            colors: {
                "background": "rgba(42, 42, 42, 0.5)",
                "light-background": "transparent",
                "background-selected": "rgba(51, 51, 51, 0.6)",
                "background-selected-dark": "rgba(211, 211, 211, 0.6)",
                "background-pane": "rgba(50, 50, 50, 0.9)",
                "button-box-bright": "rgba(22, 22, 22, 0.3)",
                "border-main": "rgba(111, 111, 111, 0.6)",
                "link": "rgba(222, 222, 222, 0.9)",
                "table-row-background-even": "rgba(100, 100, 100, 0.1)",
                "table-row-background-odd": "transparent",
                "table-header-cell": "rgba(100, 100, 100, 0.4)",
                "table-header": "rgba(100, 100, 100, 0.4)",
                "table-row-background-focused-selected": "rgba(121, 138, 155, 0.7)",
                "table-row": "#aaa",
                "text": "#eee",
                "text-disabled": "#A7A6AA",
                "text-selected": "#aaa",
                "text-placeholder": "#CBC8CD",
                // tooltip
                "tooltip": "rgba(255, 255, 204, 0.8)",
                "tooltip-text": "#000023"
            }
        });
        qx.Theme.define("cats.theme.ColorDark2", {
            extend: qx.theme.simple.Color,
            colors: {
                "background": "rgba(42, 42, 42, 0.8)",
                "light-background": "transparent",
                "background-selected": "rgba(51, 51, 51, 0.8)",
                "background-selected-dark": "rgba(211, 211, 211, 0.6)",
                "background-pane": "rgba(50, 50, 50, 0.9)",
                "button-box-bright": "rgba(22, 22, 22, 0.3)",
                "border-main": "rgba(111, 111, 111, 0.6)",
                "link": "rgba(222, 222, 222, 0.9)",
                "table-row-background-even": "rgba(222, 222, 222, 0.2)",
                "table-row-background-odd": "rgba(100, 100, 100, 0.2)",
                "table-header-cell": "rgba(100, 100, 100, 0.4)",
                "table-header": "rgba(100, 100, 100, 0.4)",
                "table-row-background-focused-selected": "rgba(121, 138, 155, 0.7)",
                "table-row": "#aaa",
                "text": "#eee",
                "text-disabled": "#A7A6AA",
                "text-selected": "#aaa",
                "text-placeholder": "#CBC8CD",
                // tooltip
                "tooltip": "rgba(255, 255, 204, 0.8)",
                "tooltip-text": "#000023"
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
        qx.Theme.define("cats.theme.Font16", {
            extend: qx.theme.simple.Font,
            fonts: {
                "default": {
                    size: 16,
                    family: ["Source Sans Pro", "arial", "sans-serif"]
                }
            }
        });
        qx.Theme.define("cats.theme.Font", {
            extend: qx.theme.simple.Font,
            fonts: {
                "default": {
                    size: 13,
                    family: ["arial", "sans-serif"]
                    // family : ["Source Sans Pro", "arial", "sans-serif"]
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
                "popup": {
                    base: true,
                    style: function (states) {
                        return {
                            backgroundColor: undefined
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
                color: cats.theme.ColorDark,
                decoration: cats.theme.Decoration,
                // decoration: qx.theme.simple.Decoration,
                font: cats.theme.Font,
                icon: qx.theme.icon.Oxygen,
                // appearance: cats.theme.Appearance
                appearance: qx.theme.simple.Appearance
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
    }
    Cats.Attribute = Attribute;
    ;
    let Severity;
    (function (Severity) {
        Severity[Severity["Info"] = "info"] = "Info";
        Severity[Severity["Warning"] = "warning"] = "Warning";
        Severity[Severity["Error"] = "error"] = "Error";
    })(Severity = Cats.Severity || (Cats.Severity = {}));
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
             */
            class Watcher extends qx.event.Emitter {
                constructor() {
                    super();
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
                    var w = fs.watch(name, (event, filename) => {
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
                    var w = fs.watch(name, (event, filename) => {
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
                var child = exec(cmd, options, () => {
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
                files = files.filter((name) => { return name.slice(-1) !== "/"; });
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
                files.forEach((file) => {
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
     * This class represents the total IDE. Wehn CATS is started a single instance of this class
     * will be created that takes care of rendering all the components and open a project
     * if applicable.
     */
    class Ide extends qx.event.Emitter {
        constructor() {
            super();
            this.projects = [];
            this.debug = false;
            this.lastEntry = {};
            this.catsHomeDir = process.cwd();
            this.loadMessages();
            this.config = this.loadPreferences();
            this.recentProjects = Array.isArray(this.config.projects) ? this.config.projects : [];
            this.icons = this.loadIconsMap();
            this.themes = this.loadThemes();
            window.onpopstate = (data) => {
                if (data && data.state)
                    this.goto(data.state);
            };
            this.loadShortCuts();
            qx.theme.manager.Meta.getInstance().setTheme(cats.theme.Default);
            this.setTheme(this.config.theme);
        }
        loadShortCuts() {
            try {
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
                        Cats.Commands.commandRegistry.runCommand(commandName);
                    }).bind(null, commandName));
                }
            }
            catch (err) {
                console.error("Error loading shortcuts" + err);
            }
        }
        /**
         * Load the icons map from the file.
         */
        loadIconsMap() {
            return JSON.parse(Cats.OS.File.readTextFile("resource/icons.json"));
        }
        /**
         * Load the themes from the file.
         */
        loadThemes() {
            return JSON.parse(Cats.OS.File.readTextFile("resource/themes.json"));
        }
        setFont(size = 14) {
            var theme = cats.theme.Font;
            theme.fonts.default.size = size;
            var manager = qx.theme.manager.Font.getInstance();
            // @TODO hack to make Qooxdoo aware there is a change
            manager.setTheme(cats.theme.Font16);
            // manager.setTheme(null);
            manager.setTheme(theme);
            this.emit("config");
        }
        setColors(colorTheme = cats.theme.ColorDark) {
            var manager = qx.theme.manager.Color.getInstance();
            qx.theme.manager.Color.getInstance().setTheme(colorTheme);
            // document.body.style.color = "black";
            document.body.style.color = colorTheme.colors.text;
            /*
            var colors = manager.getTheme()["colors"];
            var jcolors = JSON.stringify(colors.__proto__,null,4);
            IDE.console.log(jcolors);
            
            var editor = new Gui.Editor.SourceEditor();
            IDE.editorTabView.addEditor(editor,{row:0, column:0});
            editor.setContent(jcolors);
            editor.setMode("ace/mode/json");

            IDE.console.log(jcolors);
            for (var c in colors) {
                var dyn = manager.isDynamic(c);
                IDE.console.log(c + ":" + colors[c] + ":" + dyn);
            }
            */
        }
        /**
         * Load all the locale dependend messages from the message file.
         *
         * @param locale The locale you want to retrieve the messages for
         */
        loadMessages(locale = "en") {
            const fileName = "resource/locales/" + locale + "/messages.json";
            const messages = JSON.parse(Cats.OS.File.readTextFile(fileName));
            let map = {};
            for (var key in messages) {
                map[key] = messages[key].message;
            }
            qx.locale.Manager.getInstance().setLocale(locale);
            qx.locale.Manager.getInstance().addTranslation(locale, map);
        }
        goto(entry) {
            const hash = entry.hash;
            this.lastEntry = entry;
            const page = qx.core.ObjectRegistry.fromHashCode(hash);
            if (page)
                Cats.IDE.editorTabView.navigateToPage(page, entry.pos);
        }
        /**
         * Initialize the different modules within the IDE.
         *
         */
        init(rootDoc) {
            Cats.Commands.init();
            const layouter = new Cats.Gui.Layout(rootDoc);
            rootDoc.setBackgroundColor("transparent");
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
            const page = this.editorTabView.getPageForEditor(editor);
            if ((this.lastEntry.hash === page.toHashCode()) && (this.lastEntry.pos === pos))
                return;
            var entry = {
                hash: page.toHashCode(),
                pos: pos
            };
            history.pushState(entry, page.getLabel());
        }
        getCurrentTheme() {
            const themeName = this.config.theme || "default";
            var theme = this.themes.find((theme) => { return theme.name == themeName; });
            if (theme)
                return theme;
            return this.getDefaultTheme();
        }
        getThemes() {
            return this.themes;
        }
        /**
         * Attach the drag n' drop event listeners to the document
         *
         * @author  LordZardeck <sean@blackfireweb.com>
         */
        initFileDropArea() {
            // Listen onto file drop events
            document.documentElement.addEventListener("drop", (ev) => this.acceptFileDrop(ev), false);
            // Prevent the browser from redirecting to the file
            document.documentElement.addEventListener("dragover", (event) => {
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
            const files = event.dataTransfer.files;
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
                const projectDir = this.config.projects[0];
                this.setDirectory(projectDir);
                if (this.config.sessions) {
                    console.info("Found previous sessions: ", this.config.sessions.length);
                    this.config.sessions.forEach((session) => {
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
                // this.project.refresh();
            }
        }
        getDefaultTheme() {
            return {
                "name": "default",
                "background": "linear-gradient(to right, #666 , #888)",
                "color": "Color",
                "ace": "ace/theme/eclipse"
            };
        }
        findTheme(name) {
            return this.themes.find((theme) => { return theme.name == name; });
        }
        /**
         * CLose the current project
         */
        close() {
            this.projects.forEach((project) => project.close());
            this.fileNavigator.clear();
            this.todoList.clear();
            this.problemResult.clear();
            this.console.clear();
            this.projects = [];
        }
        /**
         * Get a set of default preferences.
         */
        getDefaultPreferences() {
            var defaultConfig = {
                version: "2.0",
                theme: "default",
                fontSize: 13,
                editor: {
                    rightMargin: 100
                },
                locale: "en",
                rememberOpenFiles: false,
                sessions: [],
                projects: []
            };
            return defaultConfig;
        }
        /**
         * Load the configuration for the IDE. If there is no configuration
         * found or it is an old version, use the default one to use.
         */
        loadPreferences() {
            var configStr = localStorage[Ide.STORE_KEY];
            if (configStr) {
                try {
                    var config = JSON.parse(configStr);
                    if (config.version === "2.0")
                        return config;
                }
                catch (err) {
                    console.error("Error during parsing config " + err);
                }
            }
            return this.getDefaultPreferences();
        }
        /**
         * Set the theme for this IDE
         */
        setTheme(name = "default") {
            var theme = this.findTheme(name);
            if (!theme) {
                Cats.IDE.console.error(`Theme with name ${name} not found.`);
                theme = this.getDefaultTheme();
            }
            this.theme = theme;
            const colorTheme = cats.theme[theme.color] || cats.theme.Color;
            document.body.style.background = theme.background;
            var manager = qx.theme.manager.Color.getInstance();
            qx.theme.manager.Color.getInstance().setTheme(colorTheme);
            document.body.style.color = colorTheme.colors.text;
            this.setFont(this.config.fontSize);
            this.emit("config");
        }
        /**
         * Update the configuration for IDE
         *
         */
        updatePreferences(config) {
            this.config = config;
            this.setTheme(config.theme);
            this.emit("config", config);
            this.savePreferences();
        }
        /**
         * Persist the current IDE configuration to a file
         */
        savePreferences() {
            try {
                let config = this.config;
                config.version = "2.0";
                config.sessions = [];
                config.projects = this.recentProjects;
                this.editorTabView.getEditors().forEach((editor) => {
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
        /**
         * For a given file get the first project it belongs to.
         */
        getProject(fileName) {
            for (var x = 0; x < this.projects.length; x++) {
                let project = this.projects[x];
                if (project.hasScriptFile(fileName))
                    return project;
            }
        }
        /**
         * Find all possible TSConfig files from a certain base directory.
         */
        getTSConfigs(dir) {
            var configs = glob.sync(dir + "/" + "**/tsconfig*.json");
            if (configs.length === 0) {
                this.console.log("No tsconfig file found, creating a default one");
                let fileName = Cats.OS.File.PATH.join(dir, "tsconfig.json");
                Cats.OS.File.writeTextFile(fileName, "{}");
                configs = [fileName];
            }
            return configs;
        }
        refresh() {
            this.setDirectory(this.rootDir, false);
        }
        /**
         * Set the working directory. CATS will start scanning the directory and subdirectories for
         * tsconfig files and for each one found create a TS Project. If none found it will create
         * the default config file and use that one instead.
         *
         * @param directory the directory of the new project
         * @param refreshFileNavigator should the fileNavigator also be refreshed.
         */
        setDirectory(directory, refreshFileNavigator = true) {
            this.projects = [];
            this.rootDir = Cats.OS.File.PATH.resolve(this.catsHomeDir, directory);
            var index = this.recentProjects.indexOf(directory);
            if (index !== -1) {
                this.recentProjects.splice(index, 1);
            }
            this.recentProjects.push(directory);
            var name = Cats.OS.File.PATH.basename(directory);
            document.title = "CATS | " + name;
            if (refreshFileNavigator)
                this.fileNavigator.setRootDir(directory);
            var configs = this.getTSConfigs(directory);
            configs.forEach((config) => {
                let path = Cats.OS.File.PATH.resolve(config);
                path = Cats.OS.File.switchToForwardSlashes(path);
                let p = new Cats.Project(path);
                this.projects.push(p);
            });
        }
        handleCloseWindow() {
            // Catch the close of the windows in order to save any unsaved changes
            var win = Cats.getNWWindow();
            win.on("close", function () {
                var doClose = () => {
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
            var GUI = Cats.getNWGui();
            var doClose = () => {
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
        /**
         * Stop the worker and release any resources maintained.
         */
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
            this.worker.onmessage = (e) => {
                var msg = e.data;
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
     * The project hold the information related to a single TypeScript project.
     * This include a reference to a workerthread that does much of the TypeScript
     * intellisense.
     */
    class Project extends qx.event.Emitter {
        /**
         * Create a new project.
         */
        constructor(tsConfigFile) {
            super();
            this.tsConfigFile = tsConfigFile;
            this.tsfiles = [];
            this.projectDir = Cats.OS.File.PATH.dirname(tsConfigFile);
            this.refresh();
            // @TODO optimize only refresh in case of changes
            this.refreshInterval = setInterval(() => { this.refreshTodoList(); }, 60000);
        }
        readConfigFile(fileName) {
            try {
                return tsconfig.readFileSync(fileName);
            }
            catch (err) {
                Cats.IDE.console.error(`Error reading config file ${fileName}`);
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
            this.iSense.getTodoItems((err, data) => {
                Cats.IDE.todoList.setData(data, this);
            });
        }
        /**
         * Close the project
         */
        close() {
            if (Cats.IDE.editorTabView.hasUnsavedChanges()) {
                var dialog = new Cats.Gui.ConfirmDialog("You have some unsaved changes that will get lost.\n Continue anyway ?");
                dialog.onConfirm = () => {
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
            this.iSense.getAllDiagnostics((err, data) => {
                if (data) {
                    Cats.IDE.problemResult.setData(data, this);
                    if ((data.length === 0) && verbose) {
                        Cats.IDE.console.log(`Project ${this.name} has no errors`);
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
                this.iSense.compile((err, data) => {
                    this.showCompilationResults(data);
                    if (data.errors && (data.errors.length > 0))
                        return;
                    var files = data.outputFiles;
                    files.forEach((file) => {
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
            Cats.IDE.console.log(`Found TypeScript project configuration at ${this.tsConfigFile} containing ${this.config.files.length} files`);
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
                let libFile;
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
            this.iSense.compile((err, data) => {
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
                const cmd = this.config.customRun.command;
                var options = this.config.customRun.options || { cwd: null };
                if (!options.cwd) {
                    options.cwd = this.projectDir;
                }
                Cats.OS.File.runCommand(cmd, options);
            }
            else {
                const GUI = require('nw.gui');
                const main = this.config.main;
                if (!main) {
                    alert("Please specify the main html file or customRun in the project settings.");
                    return;
                }
                const startPage = this.getStartURL();
                console.info("Opening file: " + startPage);
                const win2 = GUI.Window.open(startPage, {
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
            const url = Cats.OS.File.join(this.projectDir, this.config.main);
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
            this.config.files.forEach((file) => {
                try {
                    var fullName = Cats.OS.File.switchToForwardSlashes(file); // OS.File.join(this.projectDir, file);
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
            project.iSense.getRenameInfo(fileName, pos, (err, data) => {
                if (!data)
                    return;
                if (!data.canRename) {
                    alert("Cannot rename the selected element");
                    return;
                }
                var dialog = new Cats.Gui.PromptDialog("Rename " + data.displayName + " into:");
                dialog.onSuccess = (newName) => {
                    project.iSense.findRenameLocations(fileName, pos, false, false, (err, data) => {
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
        constructor() {
            super(...arguments);
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
            const restoreFn = Editor.Registry[type];
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
            super();
            if (filePath)
                this.setFilePath(Cats.OS.File.switchToForwardSlashes(filePath));
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
            let editor;
            // var pages: Gui.EditorPage[] = [];
            const pages = Cats.IDE.editorTabView.getPagesForFile(fileName);
            if (!pages.length) {
                editor = this.CreateEditor(fileName);
                if (editor) {
                    Cats.IDE.editorTabView.addEditor(editor, pos);
                }
                else {
                    var dialog = new Cats.Gui.ConfirmDialog("No suitable editor found for this file type, open with default editor?");
                    dialog.onConfirm = () => {
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
    var Commands;
    (function (Commands) {
        /**
     * List of known commands
     */
        let COMMANDNAME;
        (function (COMMANDNAME) {
            COMMANDNAME[COMMANDNAME["help_devTools"] = 0] = "help_devTools";
            COMMANDNAME[COMMANDNAME["help_shortcuts"] = 1] = "help_shortcuts";
            COMMANDNAME[COMMANDNAME["help_processInfo"] = 2] = "help_processInfo";
            COMMANDNAME[COMMANDNAME["help_about"] = 3] = "help_about";
            COMMANDNAME[COMMANDNAME["file_new"] = 4] = "file_new";
            COMMANDNAME[COMMANDNAME["file_open"] = 5] = "file_open";
            COMMANDNAME[COMMANDNAME["file_close"] = 6] = "file_close";
            COMMANDNAME[COMMANDNAME["file_closeOther"] = 7] = "file_closeOther";
            COMMANDNAME[COMMANDNAME["file_closeAll"] = 8] = "file_closeAll";
            COMMANDNAME[COMMANDNAME["file_save"] = 9] = "file_save";
            COMMANDNAME[COMMANDNAME["file_saveAs"] = 10] = "file_saveAs";
            COMMANDNAME[COMMANDNAME["file_saveAll"] = 11] = "file_saveAll";
            COMMANDNAME[COMMANDNAME["file_previous"] = 12] = "file_previous";
            COMMANDNAME[COMMANDNAME["file_next"] = 13] = "file_next";
            COMMANDNAME[COMMANDNAME["edit_undo"] = 14] = "edit_undo";
            COMMANDNAME[COMMANDNAME["edit_redo"] = 15] = "edit_redo";
            COMMANDNAME[COMMANDNAME["edit_cut"] = 16] = "edit_cut";
            COMMANDNAME[COMMANDNAME["edit_copy"] = 17] = "edit_copy";
            COMMANDNAME[COMMANDNAME["edit_paste"] = 18] = "edit_paste";
            COMMANDNAME[COMMANDNAME["edit_find"] = 19] = "edit_find";
            COMMANDNAME[COMMANDNAME["edit_findNext"] = 20] = "edit_findNext";
            COMMANDNAME[COMMANDNAME["edit_findPrev"] = 21] = "edit_findPrev";
            COMMANDNAME[COMMANDNAME["edit_replace"] = 22] = "edit_replace";
            COMMANDNAME[COMMANDNAME["edit_replaceAll"] = 23] = "edit_replaceAll";
            COMMANDNAME[COMMANDNAME["edit_toggleInvisibles"] = 24] = "edit_toggleInvisibles";
            COMMANDNAME[COMMANDNAME["edit_toggleRecording"] = 25] = "edit_toggleRecording";
            COMMANDNAME[COMMANDNAME["edit_replayMacro"] = 26] = "edit_replayMacro";
            COMMANDNAME[COMMANDNAME["edit_toggleComment"] = 27] = "edit_toggleComment";
            COMMANDNAME[COMMANDNAME["edit_indent"] = 28] = "edit_indent";
            COMMANDNAME[COMMANDNAME["edit_outdent"] = 29] = "edit_outdent";
            COMMANDNAME[COMMANDNAME["edit_gotoLine"] = 30] = "edit_gotoLine";
            COMMANDNAME[COMMANDNAME["source_format"] = 31] = "source_format";
            COMMANDNAME[COMMANDNAME["source_openDeclaration"] = 32] = "source_openDeclaration";
            COMMANDNAME[COMMANDNAME["source_findRef"] = 33] = "source_findRef";
            COMMANDNAME[COMMANDNAME["source_findDecl"] = 34] = "source_findDecl";
            COMMANDNAME[COMMANDNAME["project_open"] = 35] = "project_open";
            COMMANDNAME[COMMANDNAME["project_close"] = 36] = "project_close";
            COMMANDNAME[COMMANDNAME["project_new"] = 37] = "project_new";
            COMMANDNAME[COMMANDNAME["project_build"] = 38] = "project_build";
            COMMANDNAME[COMMANDNAME["project_validate"] = 39] = "project_validate";
            COMMANDNAME[COMMANDNAME["project_run"] = 40] = "project_run";
            COMMANDNAME[COMMANDNAME["project_debug"] = 41] = "project_debug";
            COMMANDNAME[COMMANDNAME["project_refresh"] = 42] = "project_refresh";
            COMMANDNAME[COMMANDNAME["project_properties"] = 43] = "project_properties";
            COMMANDNAME[COMMANDNAME["project_quickOpen"] = 44] = "project_quickOpen";
            COMMANDNAME[COMMANDNAME["project_classDiagram"] = 45] = "project_classDiagram";
            COMMANDNAME[COMMANDNAME["project_configure"] = 46] = "project_configure";
            COMMANDNAME[COMMANDNAME["ide_quit"] = 47] = "ide_quit";
            COMMANDNAME[COMMANDNAME["ide_theme"] = 48] = "ide_theme";
            COMMANDNAME[COMMANDNAME["ide_fontSize"] = 49] = "ide_fontSize";
            COMMANDNAME[COMMANDNAME["ide_rightMargin"] = 50] = "ide_rightMargin";
            COMMANDNAME[COMMANDNAME["ide_configure"] = 51] = "ide_configure";
            COMMANDNAME[COMMANDNAME["ide_history_next"] = 52] = "ide_history_next";
            COMMANDNAME[COMMANDNAME["ide_history_prev"] = 53] = "ide_history_prev";
            COMMANDNAME[COMMANDNAME["ide_toggle_toolbar"] = 54] = "ide_toggle_toolbar";
            COMMANDNAME[COMMANDNAME["ide_toggle_statusbar"] = 55] = "ide_toggle_statusbar";
            COMMANDNAME[COMMANDNAME["ide_toggle_context"] = 56] = "ide_toggle_context";
            COMMANDNAME[COMMANDNAME["ide_toggle_result"] = 57] = "ide_toggle_result";
        })(COMMANDNAME = Commands.COMMANDNAME || (Commands.COMMANDNAME = {}));
        ;
        class CommandRegistry {
            constructor() {
                this.registry = new Map();
            }
            /**
             * Register a new command
             */
            registerCommand(id, fn) {
                var name = COMMANDNAME[id];
                console.log(name);
                this.registry.set(id, {
                    name: name,
                    label: qx.locale.Manager.tr(name),
                    command: fn
                });
            }
            /**
             * Get the command based on
             */
            getCommand(command) {
                return this.registry.get(command);
            }
            runCommand(name) {
                this.registry.forEach((cmd) => {
                    if (cmd.name === name)
                        cmd.command();
                });
            }
        }
        Commands.CommandRegistry = CommandRegistry;
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
        Commands.commandRegistry = new CommandRegistry();
        /**
         * Call the different command implementers so they can register
         * themselves
         */
        function init() {
            function register(cmd, fn) {
                Commands.commandRegistry.registerCommand(cmd, fn);
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
            static init(registry) {
                registry(Commands.COMMANDNAME.edit_undo, editorCommand("undo"));
                registry(Commands.COMMANDNAME.edit_redo, editorCommand("redo"));
                registry(Commands.COMMANDNAME.edit_indent, editorCommand("indent"));
                registry(Commands.COMMANDNAME.edit_outdent, editorCommand("outdent"));
                registry(Commands.COMMANDNAME.edit_find, editorCommand("find"));
                registry(Commands.COMMANDNAME.edit_findNext, editorCommand("findnext"));
                registry(Commands.COMMANDNAME.edit_findPrev, editorCommand("findprevious"));
                registry(Commands.COMMANDNAME.edit_replace, editorCommand("replace"));
                registry(Commands.COMMANDNAME.edit_replaceAll, editorCommand("replaceall"));
                registry(Commands.COMMANDNAME.edit_toggleComment, editorCommand("togglecomment"));
                registry(Commands.COMMANDNAME.edit_toggleRecording, editorCommand("togglerecording"));
                registry(Commands.COMMANDNAME.edit_replayMacro, editorCommand("replaymacro"));
                registry(Commands.COMMANDNAME.edit_gotoLine, editorCommand("gotoline"));
                registry(Commands.COMMANDNAME.edit_toggleInvisibles, toggleInvisibles);
                registry(Commands.COMMANDNAME.source_format, formatText);
                registry(Commands.COMMANDNAME.edit_cut, () => { document.execCommand("cut"); });
                registry(Commands.COMMANDNAME.edit_copy, () => { document.execCommand("copy"); });
                registry(Commands.COMMANDNAME.edit_paste, () => { document.execCommand("paste"); });
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
            editors.forEach((editor) => {
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
                dialog.onSuccess = (newName) => {
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
            static init(registry) {
                registry(Commands.COMMANDNAME.file_new, newFile);
                registry(Commands.COMMANDNAME.file_close, closeFile);
                registry(Commands.COMMANDNAME.file_closeOther, closeOtherFiles);
                registry(Commands.COMMANDNAME.file_closeAll, closeAllFiles);
                registry(Commands.COMMANDNAME.file_save, saveFile);
                registry(Commands.COMMANDNAME.file_saveAll, saveAll);
                registry(Commands.COMMANDNAME.file_saveAs, saveAs);
                registry(Commands.COMMANDNAME.file_previous, previous);
                registry(Commands.COMMANDNAME.file_next, next);
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
            static init(registry) {
                registry(Commands.COMMANDNAME.help_about, showAbout);
                registry(Commands.COMMANDNAME.help_devTools, showDevTools);
                registry(Commands.COMMANDNAME.help_shortcuts, showShortcuts);
                registry(Commands.COMMANDNAME.help_processInfo, showProcess);
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
        var styleNr = 0;
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
         * Cycle trhough the themes and set the next one.
         */
        function setTheme() {
            const themes = Cats.IDE.getThemes();
            if (styleNr >= themes.length)
                styleNr = 0;
            const theme = themes[styleNr];
            Cats.IDE.setTheme(theme.name);
            styleNr++;
        }
        /**
         * Register the IDE commands
         */
        class IdeCommands {
            static init(registry) {
                registry(Commands.COMMANDNAME.ide_quit, quit);
                registry(Commands.COMMANDNAME.ide_toggle_toolbar, () => toggleView(Cats.IDE.toolBar));
                registry(Commands.COMMANDNAME.ide_toggle_statusbar, () => toggleView(Cats.IDE.statusBar));
                registry(Commands.COMMANDNAME.ide_toggle_result, () => toggleView(Cats.IDE.resultPane));
                registry(Commands.COMMANDNAME.ide_toggle_context, () => toggleView(Cats.IDE.contextPane));
                registry(Commands.COMMANDNAME.ide_configure, configureIde);
                registry(Commands.COMMANDNAME.ide_history_next, next);
                registry(Commands.COMMANDNAME.ide_history_prev, prev);
                registry(Commands.COMMANDNAME.ide_theme, setTheme);
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
            Cats.IDE.projects.forEach((project) => project.run());
        }
        ;
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
            Cats.IDE.projects.forEach((project) => project.validate());
        }
        /**
         * Build the project
         */
        function buildProject() {
            Cats.IDE.projects.forEach((project) => project.build());
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
        }
        /**
         * Open a new project. Thsi can be any directory on the filesystem.
         */
        function newProject() {
            var chooser = document.getElementById('fileDialog');
            chooser.onchange = function (evt) {
                Cats.IDE.setDirectory(this["value"]);
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
                Cats.IDE.setDirectory(this["value"]);
            };
            chooser.click();
        }
        ;
        class ProjectCommands {
            static init(registry) {
                registry(Commands.COMMANDNAME.project_open, openProject);
                registry(Commands.COMMANDNAME.project_new, newProject);
                registry(Commands.COMMANDNAME.project_close, closeProject);
                registry(Commands.COMMANDNAME.project_build, buildProject);
                registry(Commands.COMMANDNAME.project_validate, validateProject);
                registry(Commands.COMMANDNAME.project_refresh, refreshProject);
                registry(Commands.COMMANDNAME.project_run, runProject);
                // registry(CMDS.project_debug, label: "Debug Project",null, icon: "debug.png" });
                registry(Commands.COMMANDNAME.project_quickOpen, quickOpen);
                registry(Commands.COMMANDNAME.project_configure, configureProject);
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
                if (memberCompletionOnly && editor.hasProject()) {
                    return [new TSCompleter(editor)];
                }
                if (editor.hasProject()) {
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
                    this.editor.project.iSense.getCompletions(fileName, pos, (err, completes) => {
                        var result = [];
                        if (!completes)
                            return result;
                        completes.forEach((entry) => {
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
                /**
                 * Create the new Autocomplete popup window
                 */
                constructor() {
                    super(new qx.ui.layout.Flow());
                    this.cursorPos = 0;
                    // this.setDecorator(null);
                    this.setPadding(0, 0, 0, 0);
                    this.setMargin(0, 0, 0, 0);
                    this.setWidth(300);
                    this.setHeight(200);
                    // this.setBackgroundColor("transparent");
                    this.createList();
                    this.initHandler();
                    this.changeListener = (ev) => this.onChange(ev);
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
                            converter: (data) => {
                                var icon = Cats.IDE.icons.kind[data] || Cats.IDE.icons.kind["default"];
                                return icon;
                            }
                        }
                    });
                    list.setDecorator(null);
                    list.setBackgroundColor("transparent");
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
                        filter: (data) => {
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
                 * Setup the the keybindings so when typed the key events go to the
                 * popup window and not the editor.
                 */
                initHandler() {
                    this.handler = new HashHandler();
                    this.handler.bindKey("Home", () => { this.moveCursor(-10000); });
                    this.handler.bindKey("End", () => { this.moveCursor(10000); });
                    this.handler.bindKey("Down", () => { this.moveCursor(1); });
                    this.handler.bindKey("PageDown", () => { this.moveCursor(10); });
                    this.handler.bindKey("Up", () => { this.moveCursor(-1); });
                    this.handler.bindKey("PageUp", () => { this.moveCursor(-10); });
                    this.handler.bindKey("Esc", () => { this.hidePopup(); });
                    this.handler.bindKey("Return|Tab", () => { this.insertSelectedItem(); });
                }
                isExecutable(kind) {
                    if (kind === "method" || kind === "function" || kind === "constructor")
                        return true;
                    return false;
                }
                /**
                 * Show the popup and make sure the keybindings are in place.
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
                    completions.forEach((completion) => {
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
                 * Hide the popup and remove all the keybindings
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
                 * the code completion
                 */
                onChange(ev) {
                    var key = ev.lines.join("");
                    if ((key == null) || (!AutoCompletePopup.isJsIdentifierPart(key.charCodeAt(0)))) {
                        this.hidePopup();
                        return;
                    }
                    // hack to get the cursor updated before we render
                    // TODO find out how to force update without a timer delay
                    setTimeout(() => { this.updateFilter(); }, 0);
                }
                /**
                 * This method is called from the editor to start the code completion process.
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
                    completers.forEach((completer, i) => {
                        completer.getCompletions(editor, session, pos, prefix, (err, results) => {
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
                    super(fileName);
                    this.status = {};
                    this.unsavedChanges = false;
                    this.pendingWorkerUpdate = false;
                    this.createEditSession();
                    this.createWidget();
                    this.contextMenu = new Editor.SourceEditorContextMenu(this);
                    this.widget.setContextMenu(this.contextMenu);
                    Cats.IDE.on("config", () => { this.configureEditor(); });
                }
                get project() {
                    return Cats.IDE.getProject(this.filePath);
                }
                createWidget() {
                    var widget = new qx.ui.core.Widget();
                    widget.setDecorator(null);
                    widget.setFont(null);
                    widget.setAppearance(null);
                    widget.addListenerOnce("appear", () => {
                        var container = widget.getContentElement().getDomElement();
                        container.style.lineHeight = "normal";
                        this.aceEditor = this.createAceEditor(container);
                        this.configureEditor();
                        if (this.pendingPosition)
                            this.moveToPosition(this.pendingPosition);
                    }, this);
                    widget.addListener("appear", () => {
                        // this.session.activate();
                        this.informWorld();
                        if (this.aceEditor)
                            this.aceEditor.focus();
                    });
                    // session.on("errors", this.showErrors, this);
                    widget.addListener("resize", () => { this.resizeHandler(); });
                    this.widget = widget;
                }
                createEditSession() {
                    this.editSession = new Editor.EditSession(this);
                    this.editSession.on("changeAnnotation", () => {
                        this.emit("errors", this.editSession.getMaxAnnotationLevel());
                    });
                    this.editSession.on("changeOverwrite", () => {
                        this.informWorld();
                    });
                    this.editSession.on("change", () => {
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
                /**
                 * Is the file being part of a tsconfig project. This is used to determine
                 * wehter all type of features specific to TS will be enabled.
                 *
                 */
                hasProject() {
                    return this.project != null;
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
                    if (this.hasProject()) {
                        var range = this.aceEditor.selection.getRange();
                        if (!range.isEmpty())
                            r = { start: range.start, end: range.end };
                        this.project.iSense.getFormattedTextForRange(this.filePath, r, (err, result) => {
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
                    var config = Cats.IDE.config;
                    if (config.fontSize)
                        this.aceEditor.setFontSize(config.fontSize + "px");
                    if (config.editor && config.editor.rightMargin)
                        this.aceEditor.setPrintMarginColumn(config.editor.rightMargin);
                    if (Cats.IDE.theme)
                        this.aceEditor.setTheme(Cats.IDE.theme.ace);
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
                        this.addListenerOnce("appear", () => { this.resizeEditor(); });
                    }
                    else {
                        this.resizeEditor();
                    }
                }
                resizeEditor() {
                    setTimeout(() => {
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
                        super.moveToPosition(pos);
                        if (pos) {
                            if (pos.start) {
                                this.aceEditor.moveCursorToPosition(pos.start);
                            }
                            else {
                                this.aceEditor.moveCursorToPosition(pos);
                            }
                        }
                        setTimeout(() => {
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
                    if (this.hasProject()) {
                        this.project.iSense.updateScript(this.filePath, this.getContent());
                    }
                    autoCompletePopup.complete(memberCompletionOnly, this, this.aceEditor);
                }
                liveAutoComplete(e) {
                    if (!this.hasProject())
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
                    editor.on("changeSelection", () => {
                        this.clearSelectedTextMarker();
                        this.informWorld();
                    });
                    new Editor.TSTooltip(this);
                    new Gui.TSHelper(this, this.editSession);
                    editor.commands.on('afterExec', (e) => { this.liveAutoComplete(e); });
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
                            exec: () => { this.showAutoComplete(); }
                        },
                        {
                            name: "gotoDeclaration",
                            bindKey: {
                                win: "F12",
                                mac: "F12"
                            },
                            exec: () => { this.contextMenu.gotoDeclaration(); }
                        },
                        {
                            name: "save",
                            bindKey: {
                                win: "Ctrl-S",
                                mac: "Command-S"
                            },
                            exec: () => { this.save(); }
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
                    super(fileName);
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
                    image.onload = () => { this.drawImage(image); };
                    url = Cats.OS.File.switchToForwardSlashes(url);
                    image.src = "file://" + url;
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
                    ImageEditor.BackgroundColors.forEach((color) => {
                        var button = new qx.ui.menu.Button("Background " + color);
                        button.addListener("execute", () => {
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
            class TSTooltip extends qx.ui.tooltip.ToolTip {
                constructor(editor) {
                    super("");
                    this.editor = editor;
                    this.mouseX = 0;
                    this.mouseY = 0;
                    this.exclude();
                    this.setRich(true);
                    this.setMaxWidth(500);
                    var elem = editor.getLayoutItem().getContentElement().getDomElement(); // TODo find scroller child
                    elem.onmousemove = this.onMouseMove.bind(this);
                    elem.onmouseout = () => {
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
                    this.editor.project.iSense.getInfoAtPosition(this.editor.filePath, docPos, (err, data) => {
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
                    if (!this.editor.hasProject())
                        return;
                    clearTimeout(this.mouseMoveTimer);
                    var elem = ev.srcElement;
                    if (elem.className !== "ace_content")
                        return;
                    this.mouseMoveTimer = setTimeout(() => {
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
                    super();
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
                    this.getIsense().getDefinitionAtPosition(this.editor.filePath, this.getPos(), (err, data) => {
                        if (data && data.fileName)
                            Cats.FileEditor.OpenEditor(data.fileName, data.range.start);
                    });
                }
                gotoTypeDeclaration() {
                    this.getIsense().getTypeDefinitionAtPosition(this.editor.filePath, this.getPos(), (err, data) => {
                        if (data && data.fileName)
                            Cats.FileEditor.OpenEditor(data.fileName, data.range.start);
                    });
                }
                getPos() {
                    return this.editor.getPosition();
                }
                getInfoAt(type) {
                    this.getIsense().getCrossReference(type, this.editor.filePath, this.getPos(), (err, data) => {
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
                    this.getIsense().insertDocComments(this.editor.filePath, this.getPos(), (err, data) => {
                        if (data)
                            this.editor.getAceEditor().insert(data.newText);
                    });
                }
                bookmark() {
                    var dialog = new Gui.PromptDialog("Please provide bookmark name");
                    dialog.onSuccess = (name) => {
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
                    modes.forEach((entry) => {
                        var button = new qx.ui.menu.Button(entry.caption);
                        button.addListener("execute", () => {
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
                    super("", "ace/mode/text");
                    this.editor = editor;
                    this.filePath = editor.filePath;
                    var content = "";
                    this.version = 0;
                    this.mode = this.calculateMode();
                    if (this.filePath) {
                        content = Cats.OS.File.readTextFile(this.filePath);
                    }
                    super.setMode(this.mode);
                    super.setValue(content);
                    this.setNewLineMode("unix");
                    // this.configureAceSession(IDE.config.editor); @TODO
                    this.setUndoManager(new UndoManager());
                    // @TODO
                    // project.on("config", (c:ProjectConfiguration) => { this.configureAceSession(c); });
                    this.on("change", () => { this.version++; });
                }
                get project() {
                    return Cats.IDE.getProject(this.filePath);
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
                    result.forEach((error) => {
                        annotations.push({
                            row: error.range.start.row,
                            column: error.range.start.column,
                            type: error.severity,
                            text: error.message + ""
                        });
                    });
                    super.setAnnotations(annotations);
                }
                /**
                  * Is the file being edited a possible candiate for the tsconfig project. Right now
                  * TypeScript supports 4 type of scripts: TS, TSX, JS, JSX.
                  *
                  */
                isProjectCandidate() {
                    if (!this.filePath)
                        return false;
                    var exts = [".ts", ".tsx", ".js", ".jsx"];
                    var ext = Cats.OS.File.PATH.extname(this.filePath);
                    return (exts.indexOf(ext) > -1);
                }
                setMode(mode) {
                    this.mode = mode;
                    super.setMode(mode);
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
                    annotations.forEach((annotation) => {
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
                        dialog.onSuccess = (filePath) => {
                            filePath = Cats.OS.File.switchToForwardSlashes(filePath);
                            this.editor.setFilePath(filePath);
                            this.mode = this.calculateMode();
                            this.setMode(this.mode);
                            this.save();
                            if (this.isProjectCandidate()) {
                                var addDialog = new Gui.ConfirmDialog("Not yet part of any project, refresh IDE now?");
                                addDialog.onConfirm = () => {
                                    Cats.IDE.refresh();
                                };
                                addDialog.show();
                            }
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
                            if (this.project.config.compileOnSave) {
                                this.project.build();
                            }
                            else {
                                if (this.project.config.validateOnSave) {
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
                super(null);
                this.printTime = true;
                this.tsRef = /ts\([0-9]+,[0-9]+\):/i;
                this.setPadding(2, 2, 2, 2);
                this.setDecorator(null);
                this.setOverflow("auto", "auto");
                this.addListenerOnce("appear", () => {
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
                    lines.forEach((line) => {
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
                item1.addListener("execute", () => { this.clear(); });
                menu.add(item1);
                var item2 = new qx.ui.menu.Button("Toggle Print Time");
                item2.addListener("execute", () => { this.printTime = !this.printTime; });
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
                super(null, "label", "children");
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
                this.setBackgroundColor("transparent");
                var contextMenu = new Gui.FileContextMenu(this);
                this.setContextMenu(contextMenu);
                this.setupDragAndDrop();
            }
            /**
             * Enable drag and drop on the FileNavigator
             * @TODO finalized implementation
             */
            setupDragAndDrop2() {
                this.setDraggable(true);
                this.setDroppable(true);
                // @TODO Issue because <cntrl> is also right click.            
                // this.setSelectionMode("multi");
                this.addListener("dragstart", (e) => {
                    Cats.IDE.console.log("drag started. Not yet implemented!!!");
                    e.addAction("move");
                    e.addType("tree-items");
                    e.addData("tree-items", this.getSelection());
                }, this);
                this.addListener("drop", (e) => {
                    Cats.IDE.console.log("Target path:" + e.getRelatedTarget());
                    for (var i = 0; i < this.getSelection().getLength(); i++) {
                        Cats.IDE.console.log("To be moved:" + this.getSelection().getItem(i));
                    }
                }, this);
            }
            setupDragAndDrop() {
                this.setDraggable(true);
                this.setDroppable(true);
                this.addListener("dragstart", (e) => {
                    e.addAction("move");
                    e.addType("tree-items");
                    e.addData("tree-items", this.getSelection());
                });
                this.addListener("drop", (e) => {
                    // Using the selection sorted by the original index in the list
                    var sel = e.getData("tree-items");
                    console.log("Drag and Drop");
                    console.log(e);
                    // This is the original target hovered
                    var orig = e.getOriginalTarget();
                    console.log(orig);
                    for (var i = 0, l = sel.length; i < l; i++) {
                        // Insert before the marker
                        console.log(sel[i]);
                        // Recover selection as it gets lost during child move
                        // this.addToSelection(sel[i]);
                    }
                });
            }
            setRootDir(dir) {
                this.projectDir = dir;
                this.watcher = Cats.OS.File.getWatcher();
                this.watcher.on("change", (dir) => {
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
                this.addListener("dblclick", () => {
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
                    converter: (value, model) => {
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
                entries.forEach((entry) => {
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
                super(null, "label", "kids");
                this.setDecorator(null);
                this.setPadding(0, 0, 0, 0);
                this.setHideRoot(true);
                this.setBackgroundColor("transparent");
                this.setDecorator(null);
                this.addListener("click", () => {
                    var item = this.getSelectedItem();
                    if (item && item.getPos) {
                        var position = JSON.parse(qx.util.Serializer.toJson(item.getPos()));
                        Cats.IDE.editorTabView.navigateToPage(this.page, position);
                    }
                });
                this.setIconPath("kind");
                this.setIconOptions({
                    converter: (value) => {
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
                // headers.forEach((header) => { columns.push(this.tr(header))});
                headers.forEach((header) => { columns.push(Cats.translate(header)); });
                tableModel.setColumns(columns);
                tableModel.setData([]);
                var custom = {
                    tableColumnModel: function () {
                        return new qx.ui.table.columnmodel.Resize();
                    }
                };
                super(tableModel, custom);
                this.setStatusBarVisible(false);
                this.setDecorator(null);
                this.projectData = {};
                this.setPadding(0, 0, 0, 0);
                this.addListener("click", () => {
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
                var baseDir = Cats.IDE.rootDir;
                var fileName = row.fileName || "";
                if (fileName)
                    fileName = Cats.OS.File.PATH.relative(baseDir, fileName);
                return [
                    row.message,
                    "",
                    fileName || "",
                    this.rangeToPosition(row.range),
                    row.fileName || "",
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
             * Flatten the currently set data for possible multiple projects into a single array.
             */
            flatten() {
                var result = [];
                var baseDir = Cats.IDE.rootDir;
                Object.keys(this.projectData).forEach((key) => {
                    var projectData = this.projectData[key];
                    var projectName = projectData.project ? projectData.project.name : "default";
                    var data = projectData.data || [];
                    data.forEach((row) => {
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
                // if (this.areEmpty(this.projectData[key], data)) return;
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
                item1.addListener("execute", () => { this.clear(); });
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
                super(Cats.translate(id), Cats.IDE.icons.tab[id]);
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
                    widget.addListener("contentChange", () => {
                        if (this.autoSelect) {
                            var elem = document.activeElement;
                            this.select();
                            setTimeout(() => {
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
                super();
                this.setPadding(0, 0, 0, 0);
                this.setContentPadding(0, 0, 0, 0);
                this.createContextMenu();
            }
            createContextMenu() {
                var menu = new qx.ui.menu.Menu();
                var directions = ["top", "left", "right", "bottom"];
                directions.forEach((dir) => {
                    var item = new qx.ui.menu.Button(Cats.translate(dir));
                    item.addListener("execute", () => { this.setBarPosition(dir); });
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
                super();
                this.commands = [
                    Cats.Commands.COMMANDNAME.file_new,
                    Cats.Commands.COMMANDNAME.file_close,
                    Cats.Commands.COMMANDNAME.file_closeAll,
                    null,
                    Cats.Commands.COMMANDNAME.file_save,
                    Cats.Commands.COMMANDNAME.file_saveAll,
                    Cats.Commands.COMMANDNAME.file_saveAs,
                    null,
                    Cats.Commands.COMMANDNAME.project_open,
                    Cats.Commands.COMMANDNAME.project_close,
                    Cats.Commands.COMMANDNAME.project_build,
                    Cats.Commands.COMMANDNAME.project_run,
                    Cats.Commands.COMMANDNAME.project_refresh,
                    null,
                    Cats.Commands.COMMANDNAME.edit_undo,
                    Cats.Commands.COMMANDNAME.edit_redo,
                    Cats.Commands.COMMANDNAME.edit_find,
                    Cats.Commands.COMMANDNAME.edit_replace,
                    Cats.Commands.COMMANDNAME.edit_indent,
                    Cats.Commands.COMMANDNAME.edit_outdent,
                    //       Cats.Commands.CMDS.edit_toggleComment
                    null,
                    Cats.Commands.COMMANDNAME.ide_history_prev,
                    Cats.Commands.COMMANDNAME.ide_history_next,
                    null,
                    Cats.Commands.COMMANDNAME.ide_theme
                ];
                this.init();
            }
            createButton(command) {
                var cmd = Cats.Commands.commandRegistry.getCommand(command);
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
                button.addListener("click", () => {
                    cmd.command();
                });
                return button;
            }
            init() {
                var part = new qx.ui.toolbar.Part();
                this.commands.forEach((cmd) => {
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
                super(editor.label);
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
                this.continueWhenNeedSaving(() => {
                    super._onButtonClose();
                });
            }
            createToolTip() {
                const button = this.getButton();
                const tooltipText = this.editor.getDescription() || this.editor.label;
                const tooltip = new qx.ui.tooltip.ToolTip(tooltipText);
                button.setToolTip(tooltip);
            }
            createContextMenu() {
                const button = this.getButton();
                const menu = new qx.ui.menu.Menu();
                const item1 = new qx.ui.menu.Button("Close");
                item1.addListener("execute", () => { Cats.IDE.editorTabView.close(this); });
                const item2 = new qx.ui.menu.Button("Close other");
                item2.addListener("execute", () => { Cats.IDE.editorTabView.closeOther(this); });
                const item3 = new qx.ui.menu.Button("Close all");
                item3.addListener("execute", () => { Cats.IDE.editorTabView.closeAll(); });
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
                const button = this.getButton();
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
                super();
                this.setPadding(0, 0, 0, 0);
                this.setContentPadding(0, 0, 0, 0);
            }
            addEditor(editor, pos) {
                const page = new EditorPage(editor);
                this.add(page);
                this.navigateToPage(page, pos);
                page.fadeIn(500);
                return page;
            }
            /**
             * close all open pages
             */
            closeAll() {
                let pages = this.getChildren().concat();
                this.continueIfUnsavedChanges(pages, () => {
                    pages.forEach((page) => {
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
                page.continueWhenNeedSaving(() => {
                    this.remove(page);
                });
            }
            onChangeEditor(cb) {
                this.addListener("changeSelection", (ev) => {
                    const page = ev.getData()[0];
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
                let pages = this.getChildren().concat().filter((page) => { return page !== closePage; });
                this.continueIfUnsavedChanges(pages, () => {
                    pages.forEach((page) => {
                        this.remove(page);
                    });
                });
            }
            continueIfUnsavedChanges(pages, callback) {
                let hasUnsaved = false;
                hasUnsaved = pages.some((page) => {
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
                return this.getChildren().some((page) => {
                    return page.editor.hasUnsavedChanges();
                });
            }
            /**
             * Get all the editors
             */
            getEditors() {
                let result = [];
                this.getChildren().forEach((page) => {
                    result.push(page.editor);
                });
                return result;
            }
            /**
             * Get the currently active editor
             */
            getActiveEditor(type) {
                let page = this.getActivePage();
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
                const pages = this.getChildren();
                for (var x = 0; x < pages.length; x++) {
                    if (pages[x].editor === editor)
                        return pages[x];
                }
            }
            getPagesForFile(filePath) {
                const result = [];
                this.getChildren().forEach((page) => {
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
                super();
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
             * @TODO fix for when multiple projects
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
                super(name);
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
                confirmCommand.addListener("execute", () => {
                    if (this.onConfirm) {
                        this.onConfirm();
                    }
                    this.close();
                });
                // Cancel command
                var cancelCommand = new qx.ui.command.Command("Escape");
                cancelCommand.addListener("execute", () => {
                    if (this.onCancel) {
                        this.onCancel();
                    }
                    this.close();
                });
                // Command cleanup
                this.addListener("close", () => {
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
                super(name);
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
                this.addListener("appear", () => {
                    valuefield.focus();
                });
                // Success command
                var successCommand = new qx.ui.command.Command("Enter");
                successCommand.addListener("execute", () => {
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
                cancelCommand.addListener("execute", () => {
                    this.close();
                });
                // Command cleanup
                this.addListener("close", () => {
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
                super("Quick Open");
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
                this.project.getScripts().forEach((absolutePath) => {
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
                this.addListener("appear", () => {
                    valuefield.focus();
                });
                // File list
                var filelist = new qx.ui.form.List();
                filelist.setMinHeight(500);
                this.add(filelist);
                var doFilter = () => {
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
                valuefield.addListener("keypress", (ev) => {
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
                successCommand.addListener("execute", () => {
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
                filelist.addListener("dblclick", () => {
                    successCommand.execute(null);
                });
                // Cancel command
                var cancelCommand = new qx.ui.command.Command("Escape");
                cancelCommand.addListener("execute", () => {
                    this.close();
                });
                // Command cleanup
                this.addListener("close", () => {
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
                super();
                this.fileNavigator = fileNavigator;
                this.searchDialog = new Gui.SearchDialog();
                this.init();
            }
            openInApp() {
                var gui = Cats.getNWGui();
                var osPath = Cats.OS.File.join(this.getFullPath(), "", true);
                if (osPath)
                    gui.Shell.openItem(osPath);
            }
            showInFolder() {
                var gui = Cats.getNWGui();
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
                dialog.onConfirm = () => {
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
                dialog.onSuccess = (name) => {
                    var fullName = Cats.OS.File.join(basedir, name);
                    Cats.OS.File.writeTextFile(fullName, "");
                };
                dialog.show();
            }
            newFolder() {
                var basedir = this.getBaseDir();
                var dialog = new Gui.PromptDialog("Enter new folder name in directory " + basedir);
                dialog.onSuccess = (name) => {
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
                dialog.onSuccess = (name) => {
                    var message = "Going to rename " + basename + " to " + name;
                    var confirmDialog = new Gui.ConfirmDialog(message);
                    confirmDialog.onConfirm = () => {
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
                super(name);
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
                okbutton.addListener("execute", () => {
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
                super(name);
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
                var label = Cats.translate(labelId);
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
                items.forEach((item) => {
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
                super(Cats.translate("project_settings"));
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
                super("Compiler");
                this.moduleGenTarget = [
                    { label: "none", model: ts.ModuleKind.None },
                    { label: "commonjs", model: ts.ModuleKind.CommonJS },
                    { label: "amd", model: ts.ModuleKind.AMD },
                    { label: "umd", model: ts.ModuleKind.UMD },
                    { label: "system", model: ts.ModuleKind.System },
                    { label: "es2015", model: ts.ModuleKind.ES2015 }
                ];
                this.jsTarget = [
                    { label: "es3", model: ts.ScriptTarget.ES3 },
                    { label: "es5", model: ts.ScriptTarget.ES5 },
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
                super("Generic");
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
                super("Code Formatting");
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
                super("TSLint Settings");
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
                super("Documentation Settings");
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
                super(name);
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
                super("Custom Run");
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
                super("CATS Settings");
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
                super("Generic");
                this.locales = [
                    { label: "English", model: "en" }
                ];
                this.createForm();
                this.finalStep();
            }
            getThemes() {
                var themes = Cats.IDE.getThemes().map((theme) => {
                    return {
                        label: theme.name,
                        model: theme.name
                    };
                });
                return themes;
            }
            createForm() {
                this.addSelectBox("theme", this.getThemes());
                this.addSpinner("fontSize", 6, 24);
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
                super("Source Editor");
                this.completionMode = [
                    { label: "strict", model: "strict" },
                    { label: "forgiven", model: "forgiven" }
                ];
                this.newLineMode = [
                    { label: "Linux/OSX", model: "\n" },
                    { label: "Dos/Windows", model: "\r\n" },
                ];
                this.createForm();
                this.finalStep();
            }
            getThemes() {
                var themelist = ace.require("ace/ext/themelist");
                var result = [];
                themelist.themes.forEach((x) => {
                    var label = x.caption;
                    if (x.isDark)
                        label += " (dark)";
                    result.push({ model: x.theme, label: label });
                });
                return result;
            }
            createForm() {
                this.addSpinner("fontSize", 6, 24);
                this.addSpinner("rightMargin", 40, 240);
                this.addSelectBox("completionMode", this.completionMode);
                // this.addSelectBox("NewLineCharacter", this.newLineMode);
                // this.addCheckBox("ConvertTabsToSpaces");
                // this.addSpinner("IndentSize", 1, 16);
                // this.addSpinner("TabSize", 1, 16);
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
         */
        class ProcessTable extends qx.ui.container.Composite {
            constructor() {
                super(new qx.ui.layout.VBox());
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
                button.addListener("execute", () => { this.sendSignal(signal); });
                bar.add(button);
            }
            createTable() {
                var tableModel = new qx.ui.table.model.Simple();
                var headers = [Cats.translate("tableheader_pid"), Cats.translate("tableheader_command")];
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
                super(name);
                this.setLayout(new qx.ui.layout.Basic());
                this.setMinWidth(300);
                this.setMinHeight(150);
                this.add(new qx.ui.basic.Label("Please wait one moment ...."));
                this.setModal(true);
                this.addListener("resize", this.center);
                this.addListenerOnce("appear", () => {
                    setTimeout(() => {
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
                var headers = [Cats.translate("tableheader_name"), Cats.translate("tableheader_value")];
                tableModel.setColumns(headers);
                tableModel.setData([]);
                var custom = {
                    tableColumnModel: function (obj) {
                        return new qx.ui.table.columnmodel.Resize();
                    }
                };
                super(tableModel, custom);
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
                    data.forEach((row) => {
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
                mainContainer.setBackgroundColor("transparent");
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
                infoSplit.add(ide.contextPane, 1);
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
                super("Search in Files");
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
                Cats.OS.File.find(param.glob, this.rootDir, (err, files) => {
                    files.forEach((file) => {
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
                searchButton.addListener("execute", () => {
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
                cancelButton.addListener("execute", () => {
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
                super("Rename");
                this.form = new qx.ui.form.Form();
                var layout = new qx.ui.layout.VBox();
                this.setLayout(layout);
                this.add(this.createForm());
                this.setModal(true);
                this.addListener("resize", this.center);
            }
            run(fileName, project, pos) {
                project.iSense.getRenameInfo(fileName, pos, (err, data) => {
                    if (!data)
                        return;
                    if (!data.canRename) {
                        alert("Cannot rename the selected element");
                        return;
                    }
                    var dialog = new Gui.PromptDialog("Rename " + data.displayName + " into:");
                    dialog.onSuccess = (newName) => {
                        project.iSense.findRenameLocations(fileName, pos, false, false, (err, data) => {
                            // renameOccurences(data, newName);
                        });
                    };
                    dialog.show();
                });
            }
            addTextField(label, model) {
                var t = new qx.ui.form.TextField();
                t.setWidth(200);
                this.form.add(t, label, undefined, model);
                return t;
            }
            addSpinner(label, model) {
                var s = new qx.ui.form.Spinner();
                s.set({ minimum: 0, maximum: 1000 });
                this.form.add(s, label, undefined, model);
                return s;
            }
            addCheckBox(label, model) {
                var cb = new qx.ui.form.CheckBox();
                this.form.add(cb, label, undefined, model);
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
                searchButton.addListener("execute", () => {
                    if (this.form.validate()) {
                        var param = {
                            name: s.getValue(),
                            caseInsensitive: c.getValue()
                        };
                        // this.run(param);
                    }
                    ;
                }, this);
                this.form.addButton(cancelButton);
                cancelButton.addListener("execute", () => {
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
        function getItem(command) {
            var cmd = Cats.Commands.commandRegistry.getCommand(command);
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
                var label = Cats.translate(name + "_menu_name");
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
                source.append(getItem(Cats.Commands.COMMANDNAME.edit_toggleComment));
                source.append(getItem(Cats.Commands.COMMANDNAME.edit_toggleInvisibles));
                source.append(new GUI.MenuItem({ type: "separator" }));
                source.append(getItem(Cats.Commands.COMMANDNAME.edit_indent));
                source.append(getItem(Cats.Commands.COMMANDNAME.edit_outdent));
                source.append(new GUI.MenuItem({ type: "separator" }));
                source.append(getItem(Cats.Commands.COMMANDNAME.source_format));
                source.append(getItem(Cats.Commands.COMMANDNAME.edit_gotoLine));
            }
            createHelpMenu() {
                var help = this.menus["help"];
                help.append(getItem(Cats.Commands.COMMANDNAME.help_shortcuts));
                help.append(getItem(Cats.Commands.COMMANDNAME.help_processInfo));
                help.append(getItem(Cats.Commands.COMMANDNAME.help_devTools));
                help.append(getItem(Cats.Commands.COMMANDNAME.help_about));
            }
            createEditMenu() {
                var edit = this.menus.edit;
                // Already done by native OSX menu
                if (!Cats.OS.File.isOSX()) {
                    edit.append(getItem(Cats.Commands.COMMANDNAME.edit_undo));
                    edit.append(getItem(Cats.Commands.COMMANDNAME.edit_redo));
                    edit.append(new GUI.MenuItem({ type: "separator" }));
                    edit.append(getItem(Cats.Commands.COMMANDNAME.edit_cut));
                    edit.append(getItem(Cats.Commands.COMMANDNAME.edit_copy));
                    edit.append(getItem(Cats.Commands.COMMANDNAME.edit_paste));
                }
                edit.append(new GUI.MenuItem({ type: "separator" }));
                edit.append(getItem(Cats.Commands.COMMANDNAME.edit_find));
                edit.append(getItem(Cats.Commands.COMMANDNAME.edit_findNext));
                edit.append(getItem(Cats.Commands.COMMANDNAME.edit_findPrev));
                edit.append(getItem(Cats.Commands.COMMANDNAME.edit_replace));
                edit.append(getItem(Cats.Commands.COMMANDNAME.edit_replaceAll));
                edit.append(new GUI.MenuItem({ type: "separator" }));
                edit.append(getItem(Cats.Commands.COMMANDNAME.edit_toggleRecording));
                edit.append(getItem(Cats.Commands.COMMANDNAME.edit_replayMacro));
            }
            createFileMenu() {
                var file = this.menus.file;
                file.append(getItem(Cats.Commands.COMMANDNAME.file_new));
                file.append(new GUI.MenuItem({ type: "separator" }));
                file.append(getItem(Cats.Commands.COMMANDNAME.file_save));
                file.append(getItem(Cats.Commands.COMMANDNAME.file_saveAs));
                file.append(getItem(Cats.Commands.COMMANDNAME.file_saveAll));
                file.append(new GUI.MenuItem({ type: "separator" }));
                file.append(getItem(Cats.Commands.COMMANDNAME.file_close));
                file.append(getItem(Cats.Commands.COMMANDNAME.file_closeAll));
                file.append(getItem(Cats.Commands.COMMANDNAME.file_closeOther));
                file.append(new GUI.MenuItem({ type: "separator" }));
                file.append(getItem(Cats.Commands.COMMANDNAME.ide_configure));
                if (!Cats.OS.File.isOSX()) {
                    file.append(getItem(Cats.Commands.COMMANDNAME.ide_quit));
                }
            }
            recentProjects() {
                var menu = new GUI.Menu();
                Cats.IDE.config.projects.slice().reverse().forEach((project) => {
                    if (!project)
                        return;
                    var item = {
                        label: project,
                        click: () => { Cats.IDE.setDirectory(project); }
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
                proj.append(getItem(Cats.Commands.COMMANDNAME.project_open));
                proj.append(getItem(Cats.Commands.COMMANDNAME.project_close));
                proj.append(getItem(Cats.Commands.COMMANDNAME.project_new));
                proj.append(this.recentProjects());
                proj.append(new GUI.MenuItem({ type: "separator" }));
                proj.append(getItem(Cats.Commands.COMMANDNAME.project_build));
                proj.append(getItem(Cats.Commands.COMMANDNAME.project_run));
                proj.append(getItem(Cats.Commands.COMMANDNAME.project_validate));
                proj.append(getItem(Cats.Commands.COMMANDNAME.project_refresh));
                // proj.append( new GUI.MenuItem( { type: "separator" }) );
                // proj.append( getItem( Commands.COMMANDNAME.project_configure ) );
            }
            createViewMenu() {
                var view = this.menus.view;
                view.append(getItem(Cats.Commands.COMMANDNAME.ide_toggle_toolbar));
                view.append(getItem(Cats.Commands.COMMANDNAME.ide_toggle_statusbar));
                view.append(getItem(Cats.Commands.COMMANDNAME.ide_toggle_context));
                view.append(getItem(Cats.Commands.COMMANDNAME.ide_toggle_result));
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
                this.editor.getLayoutItem().addListener("appear", () => {
                    this.updateDiagnostics(0);
                });
                this.editSession.on("change", () => {
                    this.updateContent();
                });
            }
            updateContent(timeout = 500) {
                if (!this.editor.hasProject())
                    return;
                clearTimeout(this.updateSourceTimer);
                this.pendingUpdates = true;
                this.updateSourceTimer = setTimeout(() => {
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
                if (!this.editor.hasProject())
                    return;
                var project = this.editor.project;
                clearTimeout(this.outlineTimer);
                this.outlineTimer = setTimeout(() => {
                    project.iSense.getScriptOutline(this.editor.filePath, (err, data) => {
                        this.editor.set("outline", data);
                    });
                }, timeout);
            }
            /**
             * Lets check the worker if something changed in the diagnostic.
             *
             */
            updateDiagnostics(timeout = 1000) {
                if (!this.editor.hasProject())
                    return;
                var project = this.editor.project;
                this.diagnosticTimer = setTimeout(() => {
                    project.iSense.getErrors(this.editor.filePath, (err, result) => {
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
                files.forEach((file) => {
                    this.require(file, () => {
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
    // const child_process = require('child_process');
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
    var localeManager = qx.locale.Manager.getInstance();
    function translate2(msg, options = []) {
        return localeManager.translate(msg, []);
    }
    Cats.translate2 = translate2;
    function translate(msg) {
        return qx.locale.Manager.tr(msg);
    }
    Cats.translate = translate;
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
    function startWebServer() {
        var http = require("http");
        var PORT = 8080;
        var server = http.createServer((req, res) => {
            var content = Cats.OS.File.readTextFile(Cats.IDE.rootDir + "/public/manifest.json");
            res.end(content);
        });
        server.listen(PORT, function () {
            //Callback triggered when server is successfully listening. Hurray!
            console.log("Server listening on: http://localhost:%s", PORT);
        });
    }
    /**
     * This is the functions that kicks it all of. When Qooxdoo is loaded it will
     * call this main to start the application.
     */
    function main(app) {
        const GUI = getNWGui(); // require('nw.gui');
        const args = GUI.App.argv;
        if (args.indexOf("--debug") === -1) {
            console.info = function () { };
            console.debug = function () { };
        }
        Cats.IDE = new Cats.Ide();
        Cats.IDE.init(app.getRoot());
        if (args.indexOf("--debug") > -1) {
            Cats.IDE.debug = true;
        }
        if (args.indexOf("--project") > -1) {
            let dir = args[args.indexOf("--project") + 1];
            Cats.IDE.setDirectory(dir);
        }
        if (args.indexOf("--restore") > -1) {
            Cats.IDE.restorePreviousProjects();
        }
        startWebServer();
    }
    // Catch unhandled expections so they don't stop the process.
    process.on("uncaughtException", function (err) {
        console.error("Uncaught exception occured: " + err);
        console.error(err.stack);
        if (Cats.IDE && Cats.IDE.console)
            Cats.IDE.console.error(err.stack);
    });
    /*
    var worker_process = child_process.fork("tsserver.js", []);
    worker_process.on('close', function (code) {
       console.log('child process exited with code ' + code);
    });
     */
    // Register the main method that once Qooxdoo is loaded is called
    qx.registry.registerMainMethod(main);
})(Cats || (Cats = {}));
