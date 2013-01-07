var Cats;
(function (Cats) {
    (function (Menu) {
        var gui = require('nw.gui')
        var Range = ace.require("ace/range").Range;
        var win = gui.Window.get();
        function createHeader(table, headers) {
            var head = table.createTHead();
            var row = head.insertRow(-1);
            headers.forEach(function (header) {
                var th = document.createElement("th");
                th.innerText = header;
                row.appendChild(th);
            });
        }
        function errorStringToStructure(errStr) {
            var result = [];
            var errors = errStr.split("\n");
            errors.forEach(function (error) {
                error = error.trim();
                if(!error) {
                    return;
                }
                var match = /^(.*)\(([0-9]*),([0-9]*)\):(.*)$/g;
                var parts = match.exec(error);
                if(!parts) {
                    console.error("Couldn't parse error:" + error);
                    return;
                }
                result.push({
                    description: parts[4],
                    resource: parts[1].trim(),
                    row: parseInt(parts[2], 10) - 1,
                    column: parseInt(parts[3], 10) - 1
                });
            });
            return result;
        }
        function refactorRename() {
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
        function showErrors(errStr) {
            var errors = errorStringToStructure(errStr);
            var grid = new Cats.UI.Grid();
            grid.setColumns([
                "description", 
                "resource", 
                "position"
            ]);
            grid.setAspect("position", function (data) {
                return (data.row + 1) + ":" + (data.column + 1);
            });
            grid.setRows(errors);
            grid.onselect = function (data) {
                Cats.project.editFile(data.resource, null, {
                    row: data.row,
                    column: data.column
                });
            };
            grid.render();
            var result = document.getElementById("errorresults");
            result.innerHTML = "";
            grid.appendTo(result);
        }
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
                        theme: "cats",
                        label: "CATS"
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
                var menubar = new gui.Menu({
                    type: 'menubar'
                });
                var file = new gui.Menu();
                file.append(new gui.MenuItem({
                    label: 'New File',
                    click: this.newFile
                }));
                file.append(new gui.MenuItem({
                    type: "separator"
                }));
                file.append(this.editorCommand("save"));
                file.append(new gui.MenuItem({
                    label: 'Save As ...',
                    click: this.nop
                }));
                file.append(new gui.MenuItem({
                    label: 'Save All',
                    click: this.saveAll
                }));
                file.append(new gui.MenuItem({
                    type: "separator"
                }));
                file.append(new gui.MenuItem({
                    label: 'Close File',
                    click: this.closeFile
                }));
                file.append(new gui.MenuItem({
                    label: 'Close All Files',
                    click: this.closeAllFiles
                }));
                file.append(new gui.MenuItem({
                    label: 'Close Other Files',
                    click: this.closeOtherFiles
                }));
                file.append(new gui.MenuItem({
                    type: "separator"
                }));
                file.append(new gui.MenuItem({
                    label: 'Exit',
                    click: this.closeAllProjects
                }));
                var edit = new gui.Menu();
                edit.append(this.editorCommand("undo"));
                edit.append(this.editorCommand("redo"));
                edit.append(new gui.MenuItem({
                    type: "separator"
                }));
                edit.append(this.editorCommand("cut"));
                edit.append(this.editorCommand("copy"));
                edit.append(this.editorCommand("paste"));
                edit.append(new gui.MenuItem({
                    type: "separator"
                }));
                edit.append(this.editorCommand("find"));
                edit.append(this.editorCommand("findnext"));
                edit.append(this.editorCommand("findprevious"));
                edit.append(this.editorCommand("replace"));
                edit.append(this.editorCommand("replaceall"));
                edit.append(new gui.MenuItem({
                    label: 'Find/Replace...',
                    click: this.nop
                }));
                edit.append(new gui.MenuItem({
                    type: "separator"
                }));
                edit.append(this.editorCommand("togglerecording"));
                edit.append(this.editorCommand("replaymacro"));
                var source = new gui.Menu();
                source.append(this.editorCommand("togglecomment"));
                source.append(this.editorCommand("indent"));
                source.append(this.editorCommand("outdent"));
                source.append(new gui.MenuItem({
                    label: 'Format code',
                    click: this.formatText
                }));
                var refactor = new gui.Menu();
                refactor.append(new gui.MenuItem({
                    label: 'Rename',
                    click: refactorRename
                }));
                var navigate = new gui.Menu();
                navigate.append(new gui.MenuItem({
                    label: 'Open Declaration',
                    click: Menu.gotoDeclaration
                }));
                navigate.append(new gui.MenuItem({
                    label: 'Find References',
                    click: function () {
                        Menu.getInfoAt("getReferencesAtPosition");
                    }
                }));
                navigate.append(new gui.MenuItem({
                    label: 'Find Occurences',
                    click: function () {
                        Menu.getInfoAt("getOccurrencesAtPosition");
                    }
                }));
                navigate.append(new gui.MenuItem({
                    label: 'Find Implementors',
                    click: function () {
                        Menu.getInfoAt("getImplementorsAtPosition");
                    }
                }));
                var proj = new gui.Menu();
                proj.append(new gui.MenuItem({
                    label: 'Open Project...',
                    click: this.openProject
                }));
                proj.append(new gui.MenuItem({
                    label: 'Close Project',
                    click: this.closeProject
                }));
                proj.append(new gui.MenuItem({
                    type: "separator"
                }));
                proj.append(new gui.MenuItem({
                    label: 'Build Project',
                    click: this.compileAll
                }));
                var run = new gui.Menu();
                run.append(new gui.MenuItem({
                    label: 'Run main',
                    click: this.runFile
                }));
                run.append(new gui.MenuItem({
                    label: 'Debug main',
                    click: this.nop
                }));
                var window = new gui.Menu();
                window.append(new gui.MenuItem({
                    label: 'Theme',
                    submenu: this.createThemeMenu()
                }));
                window.append(new gui.MenuItem({
                    label: 'Font size',
                    submenu: this.createFontSizeMenu()
                }));
                window.append(new gui.MenuItem({
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
                    label: 'About CATS',
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
                    label: 'Source',
                    submenu: source
                }));
                menubar.append(new gui.MenuItem({
                    label: 'Refactor',
                    submenu: refactor
                }));
                menubar.append(new gui.MenuItem({
                    label: 'Navigate',
                    submenu: navigate
                }));
                menubar.append(new gui.MenuItem({
                    label: 'Project',
                    submenu: proj
                }));
                menubar.append(new gui.MenuItem({
                    label: 'Run',
                    submenu: run
                }));
                menubar.append(new gui.MenuItem({
                    label: 'Window',
                    submenu: window
                }));
                menubar.append(new gui.MenuItem({
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
                var item = new gui.MenuItem({
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
            Menubar.prototype.showShortcuts = function () {
                window.open('keyboard_shortcuts.html', '_blank');
            };
            Menubar.prototype.showAbout = function () {
                alert("Code Assisitant for TypeScript\nversion 0.6.8\nCreated by JBaron");
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
                Cats.project.editFile("untitled", "");
            };
            Menubar.prototype.closeFile = function () {
                Cats.mainEditor.closeSession(Cats.mainEditor.activeSession);
            };
            Menubar.prototype.closeAllFiles = function () {
                Cats.mainEditor.closeAllSessions();
            };
            Menubar.prototype.closeOtherFiles = function () {
                var sessions = Cats.mainEditor.sessions.slice(0);
                var activeSession = Cats.mainEditor.activeSession;
                for(var i = 0; i < sessions.length; i++) {
                    var session = sessions[i];
                    if(session !== activeSession) {
                        Cats.mainEditor.closeSession(session);
                    }
                }
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
                var options = Cats.project.config.config().compiler;
                $("#result").addClass("busy");
                Cats.project.iSense.perform("compile", options, function (err, data) {
                    $("#result").removeClass("busy");
                    if(data.error) {
                        showErrors(data.error);
                        return;
                    }
                    document.getElementById("errorresults").innerText = "Successfully generated " + Object.keys(data.source).length + " file(s).";
                    var sources = data.source;
                    for(var name in sources) {
                        Cats.project.writeTextFile(name, sources[name]);
                    }
                });
            };
            Menubar.prototype.preferences = function () {
                var content = Cats.project.config.stringify();
                var name = Cats.Configuration.NAME;
                Cats.project.editFile(name, content);
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
                var session = Cats.mainEditor.activeSession;
                session.project.iSense.perform("getFormattedTextForRange", session.name, 0, session.getValue().length, function (err, result) {
                    if(!err) {
                        session.setValue(result);
                    }
                });
            };
            Menubar.prototype.saveAll = function () {
                var sessions = Cats.mainEditor.sessions;
                for(var i = 0; i < sessions.length; i++) {
                    var session = sessions[i];
                    if(session.changed) {
                        session.persist();
                    }
                }
            };
            Menubar.prototype.saveFile = function () {
                Cats.mainEditor.aceEditor.execCommand("save");
            };
            Menubar.prototype.runFile = function () {
                var path = require("path");
                var main = Cats.project.config.config().main;
                if(!main) {
                    alert("Please specify the main html file to run in the project settings.");
                    return;
                }
                var startPage = "file://" + Cats.project.getFullName(main);
                console.log("Opening file: " + startPage);
                var win2 = gui.Window.open(startPage, {
                    toolbar: true,
                    webkit: {
                        "page-cache": false
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
                var menu = new gui.Menu();
                this.fontSizes.forEach(function (size) {
                    menu.append(new gui.MenuItem({
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
        var fs = require("fs")
        var path = require("path")
        var gui = require('nw.gui')
        function nop() {
            alert("Not yet implemented");
        }
        ; ;
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
        function deleteFile() {
            var sure = confirm("Delete " + data.key);
            if(sure) {
                var fullName = Cats.project.getFullName(data.key);
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
            Cats.project.writeTextFile(fullName, "");
        }
        function rename() {
            var name = prompt("Enter new name", data.key);
            if(name == null) {
                return;
            }
            var c = confirm("Going to rename " + data.key + " into " + name);
            if(c) {
                var root = Cats.project.projectDir;
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
        var fileContextMenu = createFileContextMenu();
        document.getElementById("filetree").addEventListener('contextmenu', function (ev) {
            data.key = ev.srcElement["_value"].path;
            data.isFolder = ev.srcElement["_value"].isFolder;
            ev.preventDefault();
            fileContextMenu.popup(ev.x, ev.y);
            return false;
        });
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
                var content = Cats.project.readTextFile(Configuration.NAME);
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
                fontSize: "14px",
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
    Cats.Configuration = Configuration;    
})(Cats || (Cats = {}));
var Cats;
(function (Cats) {
    var path = require("path")
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
            var ext = path.extname(name);
            this.editSession = new EditSession(content, this.getMode(ext));
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
        Session.prototype.getMode = function (ext) {
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
    (function (Menu) {
        var gui = require('nw.gui')
        var win = gui.Window.get();
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
        Menu.gotoDeclaration = gotoDeclaration;
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
                    var searchResultsElem = document.getElementById("searchresults");
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
        Menu.getInfoAt = getInfoAt;
        var EditorContextMenu = (function () {
            function EditorContextMenu(editor) {
                this.editor = editor;
                this.ctxmenu = new gui.Menu();
                this.ctxmenu.append(new gui.MenuItem({
                    label: 'Goto Declaration',
                    click: gotoDeclaration
                }));
                this.ctxmenu.append(new gui.MenuItem({
                    label: 'Get References',
                    click: function () {
                        getInfoAt("getReferencesAtPosition");
                    }
                }));
                this.ctxmenu.append(new gui.MenuItem({
                    label: 'Get Occurences',
                    click: function () {
                        getInfoAt("getOccurrencesAtPosition");
                    }
                }));
                this.ctxmenu.append(new gui.MenuItem({
                    label: 'Get Implementors',
                    click: function () {
                        getInfoAt("getImplementorsAtPosition");
                    }
                }));
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
                    li["_value"] = entry;
                    if(entry.isFolder) {
                        li.className = FileTree.COLLAPSED;
                    }
                    ul.appendChild(li);
                });
                return ul;
            };
            FileTree.prototype.toggle = function (li) {
                var _this = this;
                var entry = li["_value"];
                if(!entry.isFolder) {
                    if(this.onselect) {
                        this.onselect(entry.path);
                    }
                    return;
                }
                if(li.className === FileTree.OPENED) {
                    li.className = FileTree.COLLAPSED;
                    li.removeChild(li.childNodes[1]);
                    return;
                }
                li.className = FileTree.OPENED;
                var dir = entry.path;
                var fullDirName = path.join(this.rootDir, dir);
                var files = fs.readdirSync(fullDirName);
                var entries = [];
                files.forEach(function (file) {
                    try  {
                        var pathName = path.join(dir, file);
                        var fullName = path.join(_this.rootDir, pathName);
                        entries.push({
                            name: file,
                            path: pathName,
                            isFolder: fs.statSync(fullName).isDirectory()
                        });
                    } catch (err) {
                        console.log("Got error while handling file " + fullName);
                        console.error(err);
                    }
                });
                entries.sort(sort);
                var ul = this.render(entries);
                li.appendChild(ul);
            };
            return FileTree;
        })();
        UI.FileTree = FileTree;        
    })(Cats.UI || (Cats.UI = {}));
    var UI = Cats.UI;
})(Cats || (Cats = {}));
var Cats;
(function (Cats) {
    var fs = require("fs")
    var path = require("path")
    var Project = (function () {
        function Project(projectDir) {
            this.loadDefaultLib = true;
            Cats.project = this;
            this.projectDir = path.resolve(projectDir);
            this.config = new Cats.Configuration(this.projectDir);
            this.config.load();
            this.iSense = new Cats.ISenseHandler();
            if(this.loadDefaultLib) {
                var libdts = fs.readFileSync("typings/lib.d.ts", "utf8");
                this.iSense.perform("addScript", "lib.d.ts", libdts, true, null);
            }
            this.loadTypeScriptFiles("");
        }
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
        Project.prototype.getFullName = function (name) {
            return path.join(this.projectDir, name);
        };
        Project.prototype.writeTextFile = function (name, value) {
            fs.writeFileSync(this.getFullName(name), value, "utf8");
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
            var data = fs.readFileSync(this.getFullName(name), "utf8");
            var content = data.replace(/\r\n?/g, "\n");
            return content;
        };
        Project.prototype.loadTypeScriptFiles = function (directory) {
            var _this = this;
            var files = fs.readdirSync(this.getFullName(directory));
            files.forEach(function (file) {
                try  {
                    var fullName = path.join(directory, file);
                    var stats = fs.statSync(_this.getFullName(fullName));
                    if(stats.isFile()) {
                        var ext = path.extname(file);
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
                this.select = document.createElement("select");
                this.ul.onclick = this.onClickHandler.bind(this);
                this.select.onchange = function (ev) {
                    return _this.onChangeHandler(ev);
                };
                this.select.style.display = "none";
                this.root.appendChild(this.ul);
                this.root.appendChild(this.select);
                this.root.className = "tabbar";
                this.ul.className = "tabbar";
            }
            Tabbar.prototype.renderDropDown = function () {
                var _this = this;
                this.select.style.display = "block";
                this.select.innerHTML = "";
                this.options.forEach(function (option) {
                    var optionElem = document.createElement("option");
                    optionElem.innerText = _this.getValue(option, "name");
                    var selected = _this.getValue(option, "selected");
                    if(selected === true) {
                        optionElem.selected = true;
                    }
                    optionElem["_value"] = option;
                    _this.select.appendChild(optionElem);
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
                    this.select.style.display = "none";
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
    var Editor = (function () {
        function Editor(rootElement) {
            this.rootElement = rootElement;
            this.sessions = [];
            this.aceEditor = this.createEditor();
            this.aceEditor.setFontSize("16px");
            this.setTheme("cats");
            this.hide();
            this.toolTip = new Cats.UI.ToolTip();
            this.autoCompleteView = new Cats.UI.AutoCompleteView(this.aceEditor);
            this.editorContextMenu = new Cats.Menu.EditorContextMenu(this);
            this.editorContextMenu.bindTo(rootElement);
        }
        Editor.prototype.getSession = function (name, project) {
            for(var i = 0; i < this.sessions.length; i++) {
                var session = this.sessions[i];
                if((session.name === name) && (project === session.project)) {
                    return session;
                }
            }
        };
        Editor.prototype.setSession = function (session, pos) {
            this.activeSession = session;
            this.aceEditor.setSession(session.editSession);
            if(pos) {
                this.moveCursorTo(pos);
                this.aceEditor.clearSelection();
            }
            this.aceEditor.focus();
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
    var defaultProject = "./samples" + path.sep + "greeter";
    Cats.project = new Cats.Project(getParameterByName("project") || defaultProject);
    Cats.mainEditor = new Cats.Editor(document.getElementById("editor"));
    function initFileTree() {
        var fileTree = new Cats.UI.FileTree(Cats.project.projectDir);
        fileTree.appendTo(document.getElementById("filetree"));
        fileTree.onselect = function (filePath) {
            Cats.project.editFile(filePath);
        };
    }
    Cats.tabbar;
    function initTabBar() {
        Cats.tabbar = new Cats.UI.Tabbar();
        Cats.tabbar.setOptions(Cats.mainEditor.sessions);
        Cats.tabbar.setAspect("name", function (session) {
            return path.basename(session.name);
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
        Cats.tabbar.appendTo(document.getElementById("sessionbar"));
    }
    function initNavBar() {
        var navbar = new Cats.UI.Tabbar();
        navbar.setOptions([
            {
                name: "Files",
                selected: true,
                decorator: "icon-files"
            }, 
            {
                name: "Outline",
                selected: false,
                decorator: "icon-outline"
            }
        ]);
        navbar.appendTo(document.getElementById("navigationbar"));
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
        infobar.appendTo(document.getElementById("infobar"));
    }
    function initResultBar() {
        var resultbar = new Cats.UI.Tabbar();
        var resultbaroptions = [
            {
                name: "Errors",
                selected: true,
                decorator: "icon-errors",
                element: document.getElementById("errorresults")
            }, 
            {
                name: "Search",
                selected: false,
                decorator: "icon-search",
                element: document.getElementById("searchresults")
            }
        ];
        resultbar.setOptions(resultbaroptions);
        resultbar.setAspect("selected", function (data, name) {
            if(data.selected) {
                data.element.style.display = "block";
                return true;
            } else {
                data.element.style.display = "none";
                return false;
            }
        });
        resultbar.onselect = function (option) {
            resultbaroptions.forEach(function (o) {
                return o.selected = false;
            });
            option.selected = true;
            resultbar.refresh();
        };
        resultbar.appendTo(document.getElementById("resultbar"));
    }
    Cats.Menu.createMenuBar();
    initFileTree();
    initTabBar();
    initNavBar();
    initInfoBar();
    initResultBar();
    $(document).ready(function () {
        $('body').layout({
            applyDemoStyles: false,
            spacing_open: 8
        });
    });
    var gui = require('nw.gui');
    var win = gui.Window.get();
    win.on("close", function () {
        Cats.mainEditor.closeAllSessions();
        if(win != null) {
            win.close(true);
        }
        this.close(true);
    });
})(Cats || (Cats = {}));
