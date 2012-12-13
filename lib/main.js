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
            if(handler) {
                this.registry[this.messageId] = handler;
            }
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
    var fs = require("fs");
    var path = require("path");
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
    function createTreeViewer(dir, parent, tsHandler) {
        var files = fs.readdirSync(dir);
        var entries = [];
        files.forEach(function (file) {
            var fullName = path.join(dir, file);
            entries.push({
                name: file,
                fullName: fullName,
                stat: fs.statSync(fullName)
            });
        });
        entries.sort(sort);
        entries.forEach(function (file) {
            name = file.fullName;
            var child = {
                title: file.name,
                key: "",
                isFolder: false,
                children: []
            };
            if(file.stat.isFile()) {
                child["abc"] = true;
                child.key = name;
                if(path.extname(name) === ".ts") {
                    tsHandler(name);
                }
                parent.push(child);
            }
            if(file.stat.isDirectory()) {
                child.isFolder = true;
                createTreeViewer(name, child.children, tsHandler);
                parent.push(child);
            }
        });
        return parent;
    }
    cats.createTreeViewer = createTreeViewer;
})(cats || (cats = {}));
var allOptions = {
    canCallDefinitionSignature: false,
    codeGenTarget: 0,
    controlFlow: false,
    controlFlowUseDef: false,
    emitComments: false,
    errorOnWith: true,
    errorRecovery: false,
    exec: false,
    generateDeclarationFiles: false,
    inferPropertiesFromThisAssignment: false,
    mapSourceFiles: false,
    minWhitespace: false,
    moduleGenTarget: 0,
    outputFileName: "",
    outputMany: true,
    parseOnly: false,
    preprocess: true,
    printControlFlow: false,
    propagateConstants: false,
    resolve: true,
    styleSettings: {
        assignmentInCond: false,
        bitwise: false,
        blockInCompoundStmt: false,
        emptyBlocks: true,
        eqeqeq: false,
        eqnull: false,
        evalOK: true,
        forin: false,
        funcInLoop: true,
        implicitAny: false,
        innerScopeDeclEscape: true,
        literalSubscript: true,
        newMustBeUsed: false,
        reDeclareLocal: true,
        requireSemi: false
    },
    useCaseSensitiveFileResolution: false,
    useDefaultLib: true,
    watch: false
};
function errorHandler(err, data) {
    if(err) {
        console.log(err);
        alert("Error occured, check console logging");
    }
}
var cats;
(function (cats) {
    var fs = require("fs");
    var path = require("path");
    var Configuration = (function () {
        function Configuration(projectRoot) {
            this.fileName = path.join(projectRoot, Configuration.NAME);
            var dir = path.dirname(this.fileName);
            fs.exists(dir, function (exists) {
                if(!exists) {
                    fs.mkdirSync(dir);
                    console.log("created .setting directory");
                }
            });
        }
        Configuration.NAME = ".settings/config.json";
        Configuration.prototype.load = function () {
            try  {
                var content = fs.readFileSync(this.fileName, "utf8");
                this._config = JSON.parse(content);
            } catch (err) {
                console.log("Couldn't load project configuration, loading defaults");
                this.loadDefault();
            }
        };
        Configuration.prototype.save = function () {
            fs.writeFile(this.fileName, "utf8", errorHandler);
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
                theme: "ace/theme/clouds",
                fontSize: 14,
                main: "index.html",
                sourcePath: null,
                outputPath: null,
                compiler: {
                    useDefaultLib: true,
                    outputMany: true,
                    outputFileName: "",
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
    var EditSession = ace.require("ace/edit_session").EditSession;
    var UndoManager = ace.require("ace/undomanager").UndoManager;
    var path = require("path");
    var Session = (function () {
        function Session(project, name, content) {
            this.project = project;
            this.name = name;
            this.enableAutoComplete = false;
            this.changed = false;
            console.log("Creating new session for file " + name + " with content length " + content.length);
            var ext = path.extname(name);
            this.editSession = new EditSession(content, this.getMode(ext));
            if(ext === ".ts") {
                this.enableAutoComplete = true;
                this.editSession.on("change", this.onChangeHandler.bind(this));
            }
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
            return {
                name: this.name,
                content: this.editSession.getValue()
            };
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
            if(this.changed) {
                var source = this.editSession.getValue();
                this.project.iSense.perform("updateScript", this.name, source, function (err, result) {
                    _this.editSession.setAnnotations(result);
                });
                this.changed = false;
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
            clearTimeout(this.updateSourceTimer);
            this.updateSourceTimer = setTimeout(function () {
                if(_this.changed) {
                    console.log("updating source code for file " + _this.name);
                    var source = _this.editSession.getValue();
                    _this.project.iSense.perform("updateScript", _this.name, source, function (err, result) {
                        _this.editSession.setAnnotations(result);
                    });
                    _this.changed = false;
                }
            }, 1000);
        };
        return Session;
    })();
    cats.Session = Session;    
})(cats || (cats = {}));
var cats;
(function (cats) {
    var fs = require("fs");
    var path = require("path");
    cats.project;
    var Project = (function () {
        function Project(projectDir) {
            this.projectDir = projectDir;
            this.sessions = {
            };
            this.loadDefaultLib = true;
            this.config = new cats.Configuration(this.projectDir);
            this.config.load();
            this.editor = this.createEditor();
            this.autoCompleteView = new AutoCompleteView(this.editor);
            this.iSense = new cats.ISenseHandler();
            if(this.loadDefaultLib) {
                var libdts = Project.readTextFile("typings/lib.d.ts");
                this.iSense.perform("addScript", "lib.d.ts", libdts, true, null);
            }
            this.scanProjectDir();
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
        Project.prototype.saveFile = function () {
            var script = this.session.getValue();
            var confirmation = confirm("Save file " + script.name);
            if(confirmation) {
                Project.writeTextFile(script.name, script.content);
            }
        };
        Project.prototype.autoComplete = function () {
            if(this.session.enableAutoComplete) {
                var cursor = this.editor.getCursorPosition();
                this.session.autoComplete(cursor, this.autoCompleteView);
            }
        };
        Project.prototype.createEditor = function () {
            var _this = this;
            var editor = ace.edit("editor");
            editor.setTheme(this.config.config().theme);
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
            var session = this.sessions[name];
            if(!session) {
                if(content == null) {
                    content = Project.readTextFile(name);
                }
                session = new cats.Session(this, name, content);
                this.sessions[name] = session;
                this.editor.setSession(session.editSession);
                this.editor.moveCursorTo(0, 0);
                var li = document.createElement("li");
                li.innerText = path.basename(name);
                li.setAttribute("id", "tab_" + name);
                li.setAttribute("title", name);
                document.getElementById("tabs").appendChild(li);
            } else {
                this.editor.setSession(session.editSession);
            }
            this.session = session;
            $("#tabs li").removeClass("active");
            document.getElementById("tab_" + name).className = "active";
            document.getElementById("tabs").onclick = function (ev) {
                console.log(ev);
            };
        };
        Project.writeTextFile = function writeTextFile(fullName, content) {
            fs.writeFileSync(fullName, content, "utf8");
        }
        Project.readTextFile = function readTextFile(fullName) {
            var data = fs.readFileSync(fullName, "utf8");
            var content = data.replace(/\r\n?/g, "\n");
            return content;
        }
        Project.prototype.scanProjectDir = function () {
            var _this = this;
            var children = cats.createTreeViewer(this.projectDir, [], function (tsName) {
                var script = {
                    name: tsName,
                    content: Project.readTextFile(tsName)
                };
                _this.iSense.perform("updateScript", script.name, script.content, function () {
                });
            });
            _canLog = false;
            var root = document.getElementById("fileTree");
            children = [
                {
                    title: path.basename(this.projectDir),
                    isFolder: true,
                    children: children
                }
            ];
            $(root).dynatree({
                onActivate: function (node) {
                    var scriptname = node.data.key;
                    if(scriptname) {
                        cats.project.editFile(scriptname);
                    }
                },
                children: children
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
            this.defaultOutput = "main.js";
            this.themes = [
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
                    theme: null,
                    label: "seperator dark themes"
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
                click: this.nop
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
                label: 'About',
                click: this.showAbout
            }));
            help.append(new gui.MenuItem({
                label: 'Process',
                click: this.showProcess
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
            alert("CATS version 0.3.0\nCode Assisitant for TypeScript\nCreated by JBaron");
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
                console.log(data);
                var sources = data.source;
                for(var name in sources) {
                    cats.Project.writeTextFile(name, sources[name]);
                }
            });
        };
        Menubar.prototype.preferences = function () {
            var content = cats.project.config.stringify();
            var name = cats.project.config.fileName;
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
            var startPage = path.join(cats.project.projectDir, main);
            gui.Window.open(startPage, {
                toolbar: true
            });
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
                cats.project.editor.setTheme(theme);
                cats.project.assimilate();
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
            label: 'Rename...',
            click: nop
        }));
        ctxmenu.append(new gui.MenuItem({
            label: 'Delete',
            click: nop
        }));
        return ctxmenu;
    }
    var fileContextMenu = createFileContextMenu();
    document.getElementById("fileTree").addEventListener('contextmenu', function (ev) {
        console.log(ev);
        var fileName = ev.srcElement.childNodes[0].data;
        console.log(fileName);
        ev.preventDefault();
        fileContextMenu.popup(ev.x, ev.y);
        return false;
    });
})(menu || (menu = {}));
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
cats.project = new cats.Project(getParameterByName("project") || "./demo");
