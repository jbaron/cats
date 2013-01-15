var Cats;
(function (Cats) {
    Cats.fs = require("fs");
    Cats.path = require("path");
    Cats.gui = require('nw.gui');
})(Cats || (Cats = {}));
var Cats;
(function (Cats) {
    (function (UI) {
        UI.fs = require("fs");
        UI.path = require("path");
        UI.gui = require('nw.gui');
    })(Cats.UI || (Cats.UI = {}));
    var UI = Cats.UI;
})(Cats || (Cats = {}));
var Cats;
(function (Cats) {
    (function (Menu) {
        Menu.gui = require('nw.gui');
    })(Cats.Menu || (Cats.Menu = {}));
    var Menu = Cats.Menu;
})(Cats || (Cats = {}));
var Cats;
(function (Cats) {
    (function (Commands) {
        Commands.gui = require('nw.gui');
    })(Cats.Commands || (Cats.Commands = {}));
    var Commands = Cats.Commands;
})(Cats || (Cats = {}));
var Cats;
(function (Cats) {
    (function (Commands) {
        function showShortcuts() {
            window.open('keyboard_shortcuts.html', '_blank');
        }
        function showAbout() {
            alert("Code Assisitant for TypeScript\nversion 0.6.8\nCreated by JBaron");
        }
        function showDevTools() {
            Commands.gui.Window.get().showDevTools();
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
            }
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
            Cats.project.editFile("untitled", "");
        }
        function closeFile() {
            Cats.mainEditor.closeSession(Cats.mainEditor.activeSession);
        }
        function closeAllFiles() {
            Cats.mainEditor.closeAllSessions();
        }
        function closeOtherFiles() {
            var sessions = Cats.mainEditor.sessions.slice(0);
            var activeSession = Cats.mainEditor.activeSession;
            for(var i = 0; i < sessions.length; i++) {
                var session = sessions[i];
                if(session !== activeSession) {
                    Cats.mainEditor.closeSession(session);
                }
            }
        }
        function saveAll() {
            var sessions = Cats.mainEditor.sessions;
            for(var i = 0; i < sessions.length; i++) {
                var session = sessions[i];
                if(session.changed) {
                    session.persist();
                }
            }
        }
        function saveFile() {
            Cats.mainEditor.aceEditor.execCommand("save");
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
                    command: null
                });
            }
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
                Commands.gui.App.closeAllWindows();
            }
        }
        function closeProject() {
            window.close();
        }
        function runProject() {
            var main = Cats.project.config.main;
            if(!main) {
                alert("Please specify the main html file to run in the project settings.");
                return;
            }
            var startPage = Cats.project.getStartURL();
            console.log("Opening file: " + startPage);
            var win2 = Commands.gui.Window.open(startPage, {
                toolbar: true,
                webkit: {
                    "page-cache": false
                }
            });
        }
        ; ;
        function showErrors(errors) {
            var grid = new Cats.UI.Grid();
            grid.setColumns([
                "message", 
                "scriptName", 
                "position"
            ]);
            grid.setAspect("position", function (data) {
                return (data.range.startRow + 1) + ":" + (data.range.startColumn + 1);
            });
            grid.setRows(errors);
            grid.onselect = function (data) {
                Cats.project.editFile(data.scriptName, null, {
                    row: data.range.startRow,
                    column: data.range.startColumn
                });
            };
            grid.render();
            var result = Cats.IDE.compilationResult;
            result.innerHTML = "";
            grid.appendTo(result);
        }
        function buildProject() {
            var options = Cats.project.config.compiler;
            $("#result").addClass("busy");
            Cats.project.iSense.perform("compile", options, function (err, data) {
                $("#result").removeClass("busy");
                if(data.error && (data.error.length > 0)) {
                    console.log(data.error);
                    showErrors(data.error);
                    return;
                }
                Cats.IDE.compilationResult.innerText = "Successfully generated " + Object.keys(data.source).length + " file(s).";
                var sources = data.source;
                for(var name in sources) {
                    console.log(name);
                    Cats.project.writeTextFile(name, sources[name]);
                }
            });
        }
        function propertiesProject() {
            var content = JSON.stringify(Cats.project.config, null, 4);
            Cats.project.editFile(Cats.project.getConfigFileName(), content);
        }
        function refreshProject() {
            Cats.project.refresh();
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
        ; ;
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
            }
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
            var sure = confirm("Do you really want to quit?");
            if(sure) {
                Commands.gui.App.quit();
            }
        }
        function setTheme(theme) {
            Cats.mainEditor.setTheme(theme);
        }
        function setFontSize(size) {
            Cats.mainEditor.aceEditor.setFontSize(size + "px");
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
            }
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
            var grid = Cats.UI.Grid.getGridFromElement(table);
            var newName = prompt("Enter new name");
            if(!newName) {
                return;
            }
            var rows = grid.getRows();
            var i = rows.length;
            while(i--) {
                var data = rows[i];
                var session = Cats.mainEditor.getSession(data.script, Cats.project);
                if(!session) {
                    session = Cats.project.editFile(data.script);
                }
                var r = data.range;
                var range = new Range(r.startRow, r.startColumn, r.endRow, r.endColumn);
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
            }
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
            return Cats.mainEditor.aceEditor.getCursorPosition();
        }
        function gotoDeclaration() {
            var cursor = getCursor();
            var session = Cats.mainEditor.activeSession;
            session.project.iSense.perform("getDefinitionAtPosition", session.name, cursor, function (err, data) {
                if(data && data.unitName) {
                    session.project.editFile(data.unitName, null, data.startPos);
                }
            });
        }
        Commands.gotoDeclaration = gotoDeclaration;
        function rangeToPosition(range) {
            return (range.startRow + 1) + ":" + (range.startColumn + 1);
        }
        function getInfoAt(type) {
            var cursor = getCursor();
            var session = Cats.mainEditor.activeSession;
            var resultElem = document.getElementById("result");
            $(resultElem).addClass("busy");
            session.project.iSense.perform("getInfoAtPosition", type, session.name, cursor, function (err, data) {
                $(resultElem).removeClass("busy");
                if(data) {
                    var searchResultsElem = Cats.IDE.searchResult;
                    searchResultsElem.innerHTML = "";
                    var grid = new Cats.UI.Grid();
                    grid.setColumns([
                        "description", 
                        "script", 
                        "position"
                    ]);
                    grid.setRows(data);
                    grid.setAspect("position", function (row) {
                        return rangeToPosition(row.range);
                    });
                    grid.render();
                    grid.appendTo(searchResultsElem);
                    grid.onselect = function (data) {
                        session.project.editFile(data.script, null, {
                            row: data.range.startRow,
                            column: data.range.startColumn
                        });
                    };
                }
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
            }
            return NavigateCommands;
        })();
        Commands.NavigateCommands = NavigateCommands;        
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
            CMDS._map[22] = "edit_toggleMacroRecording";
            CMDS.edit_toggleMacroRecording = 22;
            CMDS._map[23] = "edit_playMacro";
            CMDS.edit_playMacro = 23;
            CMDS._map[24] = "edit_toggleComments";
            CMDS.edit_toggleComments = 24;
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
        ; ;
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
        function getMenuCommand(name, label) {
            var params = [];
            for (var _i = 0; _i < (arguments.length - 2); _i++) {
                params[_i] = arguments[_i + 2];
            }
            var cmd = Commands.commands[name];
            if(!cmd) {
                console.error("No implementation available for command " + name);
                return new Commands.gui.MenuItem({
                    label: "Unknow command"
                });
            }
            var click = cmd.command;
            if(params.length > 0) {
                click = function () {
                    cmd.command.apply(this, params);
                };
            }
            var item = {
                label: label || cmd.label,
                click: click
            };
            if(cmd.shortcut) {
                item.label += " [" + cmd.shortcut + "]";
            }
            if(cmd.icon) {
                item.icon = cmd.icon;
            }
            return new Commands.gui.MenuItem(item);
        }
        Commands.getMenuCommand = getMenuCommand;
        function get(name) {
            return Commands.commands[name];
        }
        Commands.get = get;
        function init() {
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
    Cats.IDE = {
        navigationBar: document.getElementById("navigationbar"),
        fileNavigation: document.getElementById("filetree"),
        outlineNavigation: document.getElementById("outlinenav"),
        resultBar: document.getElementById("resultbar"),
        compilationResult: document.getElementById("errorresults"),
        searchResult: document.getElementById("searchresults"),
        taskBar: document.getElementById("infobar"),
        editor: document.getElementById("editor"),
        sessionBar: document.getElementById("sessionbar"),
        toolBar: document.getElementById("toolbar"),
        statusBar: document.getElementById("statusbar"),
        mainMenu: null
    };
})(Cats || (Cats = {}));
var Cats;
(function (Cats) {
    (function (Menu) {
        Menu.IDE = Cats.IDE;
        var Range = ace.require("ace/range").Range;
        var win = Menu.gui.Window.get();
        var Menubar = (function () {
            function Menubar() {
                this.fontSizes = [
                    10, 
                    12, 
                    14, 
                    16, 
                    18, 
                    20
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
                this.icons = {
                    undo: "undo_edit.gif",
                    redo: "redo_edit.gif",
                    copy: "copy_edit.gif",
                    paste: "paste_edit.gif",
                    cut: "cut_edit.gif",
                    indent: "shift_r_edit.gif",
                    outdent: "shift_l_edit.gif"
                };
                var menubar = new Menu.gui.Menu({
                    type: 'menubar'
                });
                var getCmd = Cats.Commands.getMenuCommand;
                var CMDS = Cats.Commands.CMDS;
                var file = new Menu.gui.Menu();
                file.append(getCmd(CMDS.file_new));
                file.append(new Menu.gui.MenuItem({
                    type: "separator"
                }));
                file.append(getCmd(CMDS.file_save));
                file.append(getCmd(CMDS.file_saveAs));
                file.append(getCmd(CMDS.file_saveAll));
                file.append(new Menu.gui.MenuItem({
                    type: "separator"
                }));
                file.append(getCmd(CMDS.file_close));
                file.append(getCmd(CMDS.file_closeAll));
                file.append(getCmd(CMDS.file_closeOther));
                file.append(new Menu.gui.MenuItem({
                    type: "separator"
                }));
                file.append(getCmd(CMDS.ide_quit));
                var edit = new Menu.gui.Menu();
                edit.append(this.editorCommand("undo"));
                edit.append(this.editorCommand("redo"));
                edit.append(new Menu.gui.MenuItem({
                    type: "separator"
                }));
                edit.append(this.editorCommand("cut"));
                edit.append(this.editorCommand("copy"));
                edit.append(this.editorCommand("paste"));
                edit.append(new Menu.gui.MenuItem({
                    type: "separator"
                }));
                edit.append(this.editorCommand("find"));
                edit.append(this.editorCommand("findnext"));
                edit.append(this.editorCommand("findprevious"));
                edit.append(this.editorCommand("replace"));
                edit.append(this.editorCommand("replaceall"));
                edit.append(new Menu.gui.MenuItem({
                    label: 'Find/Replace...',
                    click: this.nop
                }));
                edit.append(new Menu.gui.MenuItem({
                    type: "separator"
                }));
                edit.append(this.editorCommand("togglerecording"));
                edit.append(this.editorCommand("replaymacro"));
                var source = new Menu.gui.Menu();
                source.append(this.editorCommand("togglecomment"));
                source.append(this.editorCommand("indent"));
                source.append(this.editorCommand("outdent"));
                source.append(new Menu.gui.MenuItem({
                    label: 'Format code',
                    click: this.formatText
                }));
                var refactor = new Menu.gui.Menu();
                refactor.append(getCmd(CMDS.refactor_rename));
                var navigate = new Menu.gui.Menu();
                navigate.append(getCmd(CMDS.navigate_declaration));
                navigate.append(getCmd(CMDS.navigate_references));
                navigate.append(getCmd(CMDS.navigate_occurences));
                navigate.append(getCmd(CMDS.navigate_implementors));
                var proj = new Menu.gui.Menu();
                proj.append(getCmd(CMDS.project_open));
                proj.append(getCmd(CMDS.project_close));
                proj.append(new Menu.gui.MenuItem({
                    type: "separator"
                }));
                proj.append(getCmd(CMDS.project_build));
                proj.append(getCmd(CMDS.project_refresh));
                proj.append(getCmd(CMDS.project_properties));
                var run = new Menu.gui.Menu();
                run.append(getCmd(CMDS.project_run));
                run.append(getCmd(CMDS.project_debug));
                var window = new Menu.gui.Menu();
                window.append(new Menu.gui.MenuItem({
                    label: 'Theme',
                    submenu: this.createThemeMenu()
                }));
                window.append(new Menu.gui.MenuItem({
                    label: 'Font size',
                    submenu: this.createFontSizeMenu()
                }));
                var help = new Menu.gui.Menu();
                help.append(getCmd(CMDS.help_shortcuts));
                help.append(getCmd(CMDS.help_processInfo));
                help.append(getCmd(CMDS.help_devTools));
                help.append(getCmd(CMDS.help_about));
                menubar.append(new Menu.gui.MenuItem({
                    label: 'File',
                    submenu: file
                }));
                menubar.append(new Menu.gui.MenuItem({
                    label: 'Edit',
                    submenu: edit
                }));
                menubar.append(new Menu.gui.MenuItem({
                    label: 'Source',
                    submenu: source
                }));
                menubar.append(new Menu.gui.MenuItem({
                    label: 'Refactor',
                    submenu: refactor
                }));
                menubar.append(new Menu.gui.MenuItem({
                    label: 'Navigate',
                    submenu: navigate
                }));
                menubar.append(new Menu.gui.MenuItem({
                    label: 'Project',
                    submenu: proj
                }));
                menubar.append(new Menu.gui.MenuItem({
                    label: 'Run',
                    submenu: run
                }));
                menubar.append(new Menu.gui.MenuItem({
                    label: 'Window',
                    submenu: window
                }));
                menubar.append(new Menu.gui.MenuItem({
                    label: 'Help',
                    submenu: help
                }));
                win.menu = menubar;
                this.menubar = menubar;
            }
            Menubar.prototype.getLabelForCommand = function (commandName) {
                var label = commandName[0].toUpperCase() + commandName.slice(1);
                var platform = Cats.mainEditor.aceEditor.commands.platform;
                var command = Cats.mainEditor.aceEditor.commands.byName[commandName];
                var tabs = 5 - Math.floor((label.length / 4) - 0.01);
                label = label + "\t\t\t\t\t\t".substring(0, tabs);
                if(command && command.bindKey) {
                    var key = command.bindKey[platform];
                    if(key) {
                        label += key;
                    }
                }
                return label;
            };
            Menubar.prototype.editorCommand = function (commandName) {
                var label = this.getLabelForCommand(commandName);
                var item = new Menu.gui.MenuItem({
                    label: label,
                    click: function () {
                        Cats.mainEditor.aceEditor.execCommand(commandName);
                    }
                });
                var iconName = this.icons[commandName];
                if(iconName) {
                    item.icon = "static/img/" + iconName;
                }
                return item;
            };
            Menubar.prototype.formatText = function () {
                var session = Cats.mainEditor.activeSession;
                session.project.iSense.perform("getFormattedTextForRange", session.name, 0, session.getValue().length, function (err, result) {
                    if(!err) {
                        session.setValue(result);
                    }
                });
            };
            Menubar.prototype.nop = function () {
                alert("Not yet implemented");
            };
            Menubar.prototype.enableFind = function () {
                window.open('findreplace.html', '_blank');
            };
            Menubar.prototype.actionFind = function () {
                var input = document.getElementById("findText");
                Cats.mainEditor.aceEditor.find(input.value, {
                }, true);
            };
            Menubar.prototype.actionReplace = function () {
                var findText = document.getElementById("findText");
                var replaceText = document.getElementById("replaceText");
                var options = {
                    needle: findText.value
                };
                Cats.mainEditor.aceEditor.replace(replaceText.value, options);
            };
            Menubar.prototype.setThemeWrapper = function (theme) {
                return function setTheme() {
                    Cats.mainEditor.setTheme(theme);
                }
            };
            Menubar.prototype.createFontSizeMenu = function () {
                var menu = new Menu.gui.Menu();
                this.fontSizes.forEach(function (size) {
                    menu.append(new Menu.gui.MenuItem({
                        label: size + "px",
                        click: function () {
                            Cats.mainEditor.aceEditor.setFontSize(size + "px");
                        }
                    }));
                });
                return menu;
            };
            Menubar.prototype.createThemeMenu = function () {
                var _this = this;
                var menu = new Menu.gui.Menu();
                this.themes.forEach(function (theme) {
                    if(theme.theme) {
                        menu.append(new Menu.gui.MenuItem({
                            label: theme.label,
                            click: _this.setThemeWrapper(theme.theme)
                        }));
                    } else {
                        menu.append(new Menu.gui.MenuItem({
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
        function createMenuBar() {
            Menu.mainMenuBar = new Menubar();
        }
        Menu.createMenuBar = createMenuBar;
    })(Cats.Menu || (Cats.Menu = {}));
    var Menu = Cats.Menu;
})(Cats || (Cats = {}));
var Cats;
(function (Cats) {
    (function (Menu) {
        function createFileContextMenu() {
            var ctxmenu = new Menu.gui.Menu();
            ctxmenu.append(new Menu.gui.MenuItem({
                label: 'Rename',
                click: rename
            }));
            ctxmenu.append(new Menu.gui.MenuItem({
                label: 'New file',
                click: newFile
            }));
            ctxmenu.append(new Menu.gui.MenuItem({
                label: 'Delete',
                click: deleteFile
            }));
            return ctxmenu;
        }
        function deleteFile() {
            var basename = Cats.path.basename(data.key);
            var sure = confirm("Delete " + basename);
            if(sure) {
                Cats.fs.unlinkSync(data.key);
            }
        }
        function newFile() {
            var basedir;
            if(data.isFolder) {
                basedir = data.key;
            } else {
                basedir = Cats.path.dirname(data.key);
            }
            var name = prompt("Enter new file name ");
            if(name == null) {
                return;
            }
            var fullName = Cats.path.join(basedir, name);
            Cats.project.writeTextFile(fullName, "");
        }
        function rename() {
            var dirname = Cats.path.dirname(data.key);
            var basename = Cats.path.basename(data.key);
            var name = prompt("Enter new name", basename);
            if(name == null) {
                return;
            }
            var c = confirm("Going to rename " + basename + " into " + name);
            if(c) {
                try  {
                    Cats.fs.renameSync(data.key, Cats.path.join(dirname, name));
                } catch (err) {
                    alert(err);
                }
            }
        }
        var data = {
            key: "",
            isFolder: true
        };
        var fileContextMenu = createFileContextMenu();
        Menu.IDE.fileNavigation.addEventListener('contextmenu', function (ev) {
            var d = Cats.UI.TreeView.getValueFromElement(ev.srcElement);
            data.key = d.path;
            data.isFolder = d.isFolder;
            ev.preventDefault();
            fileContextMenu.popup(ev.x, ev.y);
            return false;
        });
    })(Cats.Menu || (Cats.Menu = {}));
    var Menu = Cats.Menu;
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
    Cats.ISenseHandler = ISenseHandler;    
})(Cats || (Cats = {}));
function errorHandler(err, data) {
    if(err) {
        console.log(err);
        alert("Error occured, check console logging");
    }
}
var Cats;
(function (Cats) {
    var ConfigLoader = (function () {
        function ConfigLoader(projectRoot) {
            this.fileName = Cats.path.join(projectRoot, ConfigLoader.NAME);
            var dir = Cats.path.dirname(this.fileName);
            Cats.fs.exists(dir, function (exists) {
                if(!exists) {
                    Cats.fs.mkdirSync(dir);
                    console.log("created .setting directory");
                }
            });
        }
        ConfigLoader.NAME = ".settings" + Cats.path.sep + "config.json";
        ConfigLoader.prototype.load = function () {
            try  {
                var content = Cats.project.readTextFile(this.fileName);
                this._config = JSON.parse(content);
            } catch (err) {
                console.log("Couldn't load project configuration, loading defaults");
                this.loadDefault();
            }
            return this._config;
        };
        ConfigLoader.prototype.config = function () {
            return this._config;
        };
        ConfigLoader.prototype.loadDefault = function () {
            this._config = {
                main: "index.html",
                sourcePath: null,
                outputPath: null,
                compiler: {
                    useDefaultLib: true,
                    outputOption: null,
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
        return ConfigLoader;
    })();
    Cats.ConfigLoader = ConfigLoader;    
})(Cats || (Cats = {}));
var Cats;
(function (Cats) {
    var EditSession = ace.require("ace/edit_session").EditSession;
    var UndoManager = ace.require("ace/undomanager").UndoManager;
    var Session = (function () {
        function Session(project, name, content) {
            this.project = project;
            this.name = name;
            this.typeScriptMode = false;
            this.pendingWorkerUpdate = false;
            this._changed = false;
            console.log("Creating new session for file " + name + " with content length " + content.length);
            var ext = Cats.path.extname(name);
            this.mode = this.determineMode(ext);
            this.editSession = new EditSession(content, this.mode);
            if(ext === ".ts") {
                this.typeScriptMode = true;
            }
            this.editSession.on("change", this.onChangeHandler.bind(this));
            this.editSession.setUndoManager(new UndoManager());
        }
        Session.MODES = {
            ".js": "ace/mode/javascript",
            ".ts": "ace/mode/typescript",
            ".xhtml": "ace/mode/html",
            ".xhtm": "ace/mode/html",
            ".html": "ace/mode/html",
            ".htm": "ace/mode/html",
            ".css": "ace/mode/css",
            ".less": "ace/mode/less",
            ".md": "ace/mode/markdown",
            ".svg": "ace/mode/svg",
            ".yaml": "ace/mode/yaml",
            ".yml": "ace/mode/yaml",
            ".xml": "ace/mode/xml",
            ".json": "ace/mode/json"
        };
        Session.DEFAULT_MODE = "ace/mode/text";
        Object.defineProperty(Session.prototype, "changed", {
            get: function () {
                return this._changed;
            },
            set: function (value) {
                if(this._changed !== value) {
                    this._changed = value;
                    Cats.tabbar.refresh();
                }
            },
            enumerable: true,
            configurable: true
        });
        Session.prototype.persist = function () {
            this.project.writeSession(this);
            Cats.tabbar.refresh();
        };
        Session.prototype.getValue = function () {
            return this.editSession.getValue();
        };
        Session.prototype.setValue = function (value) {
            this.editSession.setValue(value);
        };
        Session.convertMember = function convertMember(member) {
            var result = member.prefix;
            if(member.entries) {
                for(var i = 0; i < member.entries.length; i++) {
                    result += this.convertMember(member.entries[i]);
                }
            } else {
                result += member.text;
            }
            result += member.suffix;
            return result;
        }
        Session.prototype.getPositionFromScreenOffset = function (x, y) {
            var r = Cats.mainEditor.aceEditor.renderer;
            var offset = (x - r.$padding) / r.characterWidth;
            var correction = r.scrollTop ? 7 : 0;
            var row = Math.floor((y + r.scrollTop - correction) / r.lineHeight);
            var col = Math.round(offset);
            var docPos = this.editSession.screenToDocumentPosition(row, col);
            return docPos;
        };
        Session.prototype.showInfoAt = function (ev) {
            if(!this.typeScriptMode) {
                return;
            }
            var docPos = this.getPositionFromScreenOffset(ev.offsetX, ev.offsetY);
            var project = this.project;
            project.iSense.perform("getTypeAtPosition", this.name, docPos, function (err, data) {
                if(!data) {
                    return;
                }
                var member = data.memberName;
                if(!member) {
                    return;
                }
                var tip = Session.convertMember(member);
                Cats.mainEditor.toolTip.show(ev.x, ev.y, tip);
            });
        };
        Session.prototype.determineMode = function (ext) {
            var result = Session.MODES[ext] || Session.DEFAULT_MODE;
            return result;
        };
        Session.prototype.autoComplete = function (cursor, view) {
            if(!this.typeScriptMode) {
                return;
            }
            var editSession = this.editSession;
            if(this.pendingWorkerUpdate) {
                var source = editSession.getValue();
                this.project.iSense.perform("updateScript", this.name, source, function (err, result) {
                    editSession.setAnnotations(result);
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
            if(!this.typeScriptMode) {
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
    Cats.Session = Session;    
})(Cats || (Cats = {}));
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
            }
            TreeView.prototype.handleClick = function (li) {
                if($(li).hasClass(TreeView.OPENED)) {
                    li.className = TreeView.COLLAPSED;
                    this.decorate(li);
                    li.removeChild(li.childNodes[1]);
                    return;
                }
                if($(li).hasClass(TreeView.COLLAPSED)) {
                    li.className = TreeView.OPENED;
                    this.decorate(li);
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
            var files = Cats.fs.readdirSync(dir.path);
            var entries = [];
            files.forEach(function (file) {
                try  {
                    var pathName = Cats.path.join(dir.path, file);
                    var isFolder = Cats.fs.statSync(pathName).isDirectory();
                    entries.push({
                        name: file,
                        path: pathName,
                        isFolder: isFolder,
                        decorator: isFolder ? "icon-folder" : "icon-file"
                    });
                } catch (err) {
                    console.log("Got error while handling file " + pathName);
                    console.error(err);
                }
            });
            entries.sort(sort);
            console.log(entries);
            return entries;
        };
        return DirectoryReader;
    })();
    Cats.DirectoryReader = DirectoryReader;    
})(Cats || (Cats = {}));
var Cats;
(function (Cats) {
    var Project = (function () {
        function Project(projectDir) {
            Cats.project = this;
            this.projectDir = Cats.path.resolve(projectDir);
            this.name = Cats.path.basename(this.projectDir);
            this.refresh();
        }
        Project.prototype.getConfigFileName = function () {
            return Cats.path.join(this.projectDir, Cats.ConfigLoader.NAME);
        };
        Project.prototype.initFileTree = function () {
            var _this = this;
            Cats.IDE.fileNavigation.innerHTML = "";
            var fileTree = new Cats.UI.TreeView();
            var dirReader = new Cats.DirectoryReader();
            fileTree.setAspect("children", function (parent) {
                if(parent == null) {
                    return [
                        {
                            name: _this.name,
                            isFolder: true,
                            path: _this.projectDir,
                            decorator: "icon-folder"
                        }
                    ];
                }
                return dirReader.read(parent);
            });
            fileTree.appendTo(Cats.IDE.fileNavigation);
            fileTree.refresh();
            fileTree.onselect = function (entry) {
                if(!entry.isFolder) {
                    _this.editFile(entry.path);
                }
            };
        };
        Project.prototype.refresh = function () {
            var _this = this;
            this.initFileTree();
            this.config = new Cats.ConfigLoader(this.projectDir).load();
            this.iSense = new Cats.ISenseHandler();
            this.iSense.perform("setCompilationSettings", this.config.compiler, null);
            if(this.config.compiler.useDefaultLib) {
                var libdts = Cats.fs.readFileSync("typings/lib.d.ts", "utf8");
                var fullName = Cats.path.join(process.cwd(), "typings/lib.d.ts");
                this.iSense.perform("addScript", fullName, libdts, true, null);
            }
            var srcPaths = [].concat(this.config.sourcePath);
            srcPaths.forEach(function (srcPath) {
                var fullPath = Cats.path.join(_this.projectDir, srcPath);
                _this.loadTypeScriptFiles(fullPath);
            });
        };
        Project.prototype.editFile = function (name, content, goto) {
            var session = Cats.mainEditor.getSession(name, this);
            if(!session) {
                if(content == null) {
                    content = this.readTextFile(name);
                }
                session = new Cats.Session(this, name, content);
                Cats.mainEditor.sessions.push(session);
                Cats.mainEditor.setSession(session);
                Cats.mainEditor.moveCursorTo(goto);
                if(session.typeScriptMode) {
                    this.iSense.perform("updateScript", name, content, function (err, result) {
                        session.editSession.setAnnotations(result);
                    });
                }
            } else {
                Cats.mainEditor.setSession(session);
                this.iSense.perform("getErrors", name, function (err, result) {
                    session.editSession.setAnnotations(result);
                });
                if(goto) {
                    Cats.mainEditor.moveCursorTo(goto);
                    Cats.mainEditor.aceEditor.clearSelection();
                }
            }
            Cats.mainEditor.show();
            Cats.tabbar.refresh();
            return session;
        };
        Project.prototype.getStartURL = function () {
            var url = Cats.path.join(this.projectDir, this.config.main);
            return "file://" + url;
        };
        Project.prototype.writeTextFile = function (name, value) {
            if(name.charAt(0) !== Cats.path.sep) {
                name = Cats.path.join(this.projectDir, name);
            }
            Cats.fs.writeFileSync(name, value, "utf8");
        };
        Project.prototype.writeSession = function (session) {
            if(session.name === "untitled") {
                session.name = prompt("Please enter the file name") || "untitled";
            }
            if(session.name !== "untitled") {
                session.changed = false;
                this.writeTextFile(session.name, session.getValue());
            }
        };
        Project.prototype.readTextFile = function (name) {
            if(name === "untitled") {
                return "";
            }
            var data = Cats.fs.readFileSync(name, "utf8");
            var content = data.replace(/\r\n?/g, "\n");
            return content;
        };
        Project.prototype.loadTypeScriptFiles = function (directory) {
            var _this = this;
            var files = Cats.fs.readdirSync(directory);
            files.forEach(function (file) {
                try  {
                    var fullName = Cats.path.join(directory, file);
                    var stats = Cats.fs.statSync(fullName);
                    if(stats.isFile()) {
                        var ext = Cats.path.extname(file);
                        if(ext === ".ts") {
                            var content = _this.readTextFile(fullName);
                            _this.iSense.perform("updateScript", fullName, content, function () {
                            });
                            console.log("Found TypeScript file: " + fullName);
                        }
                    }
                    if(stats.isDirectory()) {
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
var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
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
            };
            Tabbar.prototype.appendTo = function (elem) {
                this.render();
                elem.appendChild(this.root);
            };
            Tabbar.prototype.selectOption = function (option) {
                if(this.onselect) {
                    this.onselect(option);
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
            ElemTabAdapter.prototype.select = function (elem) {
                this.onSelect(this.getTab(elem));
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
        var win = Menu.gui.Window.get();
        var EditorContextMenu = (function () {
            function EditorContextMenu(editor) {
                this.editor = editor;
                this.ctxmenu = new Menu.gui.Menu();
                var getCmd = Cats.Commands.getMenuCommand;
                var CMDS = Cats.Commands.CMDS;
                this.ctxmenu.append(getCmd(CMDS.navigate_declaration));
                this.ctxmenu.append(getCmd(CMDS.navigate_references));
                this.ctxmenu.append(getCmd(CMDS.navigate_occurences));
                this.ctxmenu.append(getCmd(CMDS.navigate_implementors));
            }
            EditorContextMenu.prototype.bindTo = function (elem) {
                var _this = this;
                elem.oncontextmenu = function (ev) {
                    ev.preventDefault();
                    if(_this.editor.activeSession.typeScriptMode) {
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
                    return this.completions;
                }
                var result = this.completions.filter(function (entry) {
                    return (entry.name.indexOf(text) === 0);
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
                var _this = this;
                var key = ev.data.text;
                if(" -=,[]_/()!';:<>".indexOf(key) !== -1) {
                    this.hide();
                    return;
                }
                setTimeout(function () {
                    _this.render();
                }, 0);
            };
            AutoCompleteView.prototype.render = function () {
                this.listElement.innerHTML = "";
                var infos = this.filter();
                if(infos.length > 0) {
                    var html = '';
                    for(var n in infos) {
                        var info = infos[n];
                        var decorator = "icon-" + info.kind;
                        var name = '<span class="name ' + decorator + '">' + info.name + '</span>';
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
                console.log("Received completions: " + completions.length);
                var cursor = this.editor.getCursorPosition();
                var coords = this.editor.renderer.textToScreenCoordinates(cursor.row, cursor.column);
                this.setPosition(coords);
                this.render();
                this.show();
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
        UI.AutoCompleteView = AutoCompleteView;        
    })(Cats.UI || (Cats.UI = {}));
    var UI = Cats.UI;
})(Cats || (Cats = {}));
var Cats;
(function (Cats) {
    var Editor = (function () {
        function Editor(rootElement) {
            this.rootElement = rootElement;
            this.sessions = [];
            this.aceEditor = this.createEditor();
            this.aceEditor.setFontSize("16px");
            this.setTheme("cats");
            this.hide();
        }
        Editor.prototype.init = function () {
            this.toolTip = new Cats.UI.ToolTip();
            this.autoCompleteView = new Cats.UI.AutoCompleteView(this.aceEditor);
            this.editorContextMenu = new Cats.Menu.EditorContextMenu(this);
            this.editorContextMenu.bindTo(this.rootElement);
        };
        Editor.prototype.getSession = function (name, project) {
            for(var i = 0; i < this.sessions.length; i++) {
                var session = this.sessions[i];
                if((session.name === name) && (project === session.project)) {
                    return session;
                }
            }
        };
        Editor.prototype.setSession = function (session, pos) {
            if(this.activeSession === session) {
                if(pos) {
                    this.moveCursorTo(pos);
                    this.aceEditor.clearSelection();
                }
                return;
            }
            this.activeSession = session;
            this.aceEditor.setSession(session.editSession);
            if(pos) {
                this.moveCursorTo(pos);
                this.aceEditor.clearSelection();
            }
            this.aceEditor.focus();
            document.getElementById("sessionmode").innerText = Cats.path.basename(session.mode);
            if(session.typeScriptMode) {
                session.project.iSense.perform("getOutliningRegions", session.name, function (err, data) {
                    console.log(data);
                    Cats.IDE.outlineNavigation.innerHTML = "";
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
                                result.push({
                                    name: o.name,
                                    decorator: "icon-" + o.kind,
                                    qualifyer: fullName,
                                    kind: o.kind,
                                    outline: o,
                                    isFolder: !(o.kind === "method" || o.kind === "constructor" || o.kind === "function")
                                });
                            }
                        }
                        return result;
                    });
                    outliner.appendTo(Cats.IDE.outlineNavigation);
                    outliner.onselect = function (value) {
                        var data = value.outline;
                        Cats.project.editFile(data.unitName, null, {
                            row: data.range.startRow,
                            column: data.range.startColumn
                        });
                    };
                    outliner.refresh();
                });
            }
        };
        Editor.prototype.moveCursorTo = function (pos) {
            if (typeof pos === "undefined") { pos = {
                column: 0,
                row: 0
            }; }
            this.aceEditor.moveCursorTo(pos.row, pos.column);
        };
        Editor.prototype.show = function () {
            this.rootElement.style.display = "block";
            this.aceEditor.focus();
        };
        Editor.prototype.hide = function () {
            this.rootElement.style.display = "none";
        };
        Editor.prototype.setTheme = function (theme) {
            this.aceEditor.setTheme("ace/theme/" + theme);
            setTimeout(function () {
                var isDark = $(".ace_dark").length > 0;
                var fg = isDark ? "white" : "black";
                var elem = $(".ace_scroller");
                var bg = elem.css("background-color");
                $("html, #main, #navigator, #info, #result").css("background-color", bg);
                $("html").css("color", fg);
                $(".autocomplete").css("background-color", bg);
                $(".autocomplete").css("color", fg);
                $("input").css("background-color", fg);
                $("input").css("color", bg);
            }, 500);
        };
        Editor.prototype.closeSession = function (session) {
            if(session.changed) {
                var c = confirm("Save " + session.name + " before closing ?");
                if(c) {
                    session.persist();
                }
            }
            var index = this.sessions.indexOf(session);
            this.sessions.splice(index, 1);
            if(this.activeSession === session) {
                this.activeSession === null;
                Cats.mainEditor.hide();
            }
            Cats.tabbar.refresh();
        };
        Editor.prototype.closeAllSessions = function () {
            this.sessions.forEach(function (session) {
                if(session.changed) {
                    var c = confirm("Save " + session.name + " before closing ?");
                    if(c != null) {
                        session.persist();
                    }
                }
                ; ;
            });
            this.sessions.length = 0;
            this.activeSession = null;
            Cats.mainEditor.hide();
            Cats.tabbar.refresh();
        };
        Editor.prototype.addCommand = function (command) {
            this.aceEditor.commands.addCommand(command);
        };
        Editor.prototype.bindToMouse = function (fn) {
            var _this = this;
            this.rootElement.onmousemove = fn;
            this.rootElement.onmouseout = function () {
                _this.toolTip.hide();
            };
        };
        Editor.prototype.autoComplete = function () {
            if(this.activeSession.typeScriptMode) {
                var cursor = this.aceEditor.getCursorPosition();
                this.activeSession.autoComplete(cursor, this.autoCompleteView);
            }
        };
        Editor.prototype.onMouseMove = function (ev) {
            this.toolTip.hide();
            var session = this.activeSession;
            clearTimeout(this.mouseMoveTimer);
            var elem = ev.srcElement;
            if(elem.className !== "ace_content") {
                return;
            }
            this.mouseMoveTimer = setTimeout(function () {
                session.showInfoAt(ev);
            }, 500);
        };
        Editor.prototype.createEditor = function () {
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
                    name: "save",
                    bindKey: {
                        win: "Ctrl-S",
                        mac: "Command-S"
                    },
                    exec: function () {
                        _this.activeSession.persist();
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
        return Editor;
    })();
    Cats.Editor = Editor;    
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
            }
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
var Cats;
(function (Cats) {
    Cats.mainEditor;
    Cats.project;
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
    var projectName = getParameterByName("project");
    if(!projectName) {
        var args = Cats.gui.App.argv;
        if(args && (args.length > 0)) {
            projectName = args[0];
        } else {
            projectName = Cats.path.join(process.cwd(), "samples", "greeter");
        }
    }
    Cats.project = new Cats.Project(projectName);
    Cats.mainEditor = new Cats.Editor(Cats.IDE.editor);
    Cats.tabbar;
    function initTabBar() {
        Cats.tabbar = new Cats.UI.Tabbar();
        Cats.tabbar.setOptions(Cats.mainEditor.sessions);
        Cats.tabbar.setAspect("name", function (session) {
            return Cats.path.basename(session.name);
        });
        Cats.tabbar.setAspect("selected", function (session) {
            return session === Cats.mainEditor.activeSession;
        });
        Cats.tabbar.setAspect("longname", function (session) {
            return session.name;
        });
        Cats.tabbar.setAspect("changed", function (session) {
            return session.changed;
        });
        Cats.tabbar.onselect = function (session) {
            return Cats.project.editFile(session.name);
        };
        Cats.tabbar.appendTo(Cats.IDE.sessionBar);
    }
    function initNavBar() {
        var navbar = new Cats.UI.Tabbar();
        var t = new Cats.UI.ElemTabAdapter(navbar, [
            Cats.IDE.fileNavigation, 
            Cats.IDE.outlineNavigation
        ], Cats.IDE.fileNavigation);
        t.setAspect(Cats.IDE.fileNavigation, "decorator", "icon-files");
        t.setAspect(Cats.IDE.outlineNavigation, "decorator", "icon-outline");
        navbar.appendTo(Cats.IDE.navigationBar);
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
        infobar.appendTo(Cats.IDE.taskBar);
    }
    function initToolBar() {
        var t = Cats.IDE.toolBar;
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
    }
    function initResultBar() {
        var resultbar = new Cats.UI.Tabbar();
        var t = new Cats.UI.ElemTabAdapter(resultbar, [
            Cats.IDE.compilationResult, 
            Cats.IDE.searchResult
        ], Cats.IDE.compilationResult);
        t.setAspect(Cats.IDE.compilationResult, "decorator", "icon-errors");
        t.setAspect(Cats.IDE.searchResult, "decorator", "icon-search");
        resultbar.appendTo(Cats.IDE.resultBar);
    }
    Cats.Commands.init();
    Cats.Menu.createMenuBar();
    initTabBar();
    initNavBar();
    initInfoBar();
    initResultBar();
    initToolBar();
    Cats.mainEditor.init();
    var win = Cats.gui.Window.get();
    win.on("close", function () {
        Cats.mainEditor.closeAllSessions();
        if(win != null) {
            win.close(true);
        }
        this.close(true);
    });
})(Cats || (Cats = {}));
