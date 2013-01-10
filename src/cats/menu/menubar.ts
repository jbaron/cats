
module Cats.Menu {

    import gui = module('nw.gui');
    var Range: Ace.Range = ace.require("ace/range").Range;

    var win = gui.Window.get();

    // TODO i18n
    function createHeader(table: HTMLTableElement, headers: string[]) {
        var head = <HTMLTableElement>table.createTHead();
        var row = head.insertRow(-1);
        headers.forEach((header) => {
            var th = document.createElement("th");
            th.innerText = header;
            row.appendChild(th);
        });
    }


    // Quick hack to convert TS compiler output into something more usefull
    function errorStringToStructure(errStr: string) {
        var result = [];
        var errors = errStr.split("\n");
        errors.forEach((error: string) => {
            error = error.trim();
            if (!error) return;

            var match = /^(.*)\(([0-9]*),([0-9]*)\):(.*)$/g;
            var parts = <string[]><any>match.exec(error);
            if (!parts) {
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
        var table = <HTMLElement>document.querySelector("#searchresults table");
        var grid = Cats.UI.Grid.getGridFromElement(table);
        var newName = prompt("Enter new name");
        if (! newName) return;
        var rows = grid.getRows();
        var i = rows.length;
        while (i--) {
            var data = rows[i];
            var session = Cats.mainEditor.getSession(data.script,Cats.project);
            if (! session) {
                session = Cats.project.editFile(data.script);
            }
            // console.log(session.name);
            var r = data.range;
            var range:Ace.Range = new Range(r.startRow, r.startColumn,r.endRow,r.endColumn);
            session.editSession.replace(range,newName);
        }
        
    }


  

    function showErrors(errStr) {

        var errors = errorStringToStructure(errStr);

        var grid = new Cats.UI.Grid();
        grid.setColumns(["description", "resource", "position"]);
        grid.setAspect("position", (data) => { return (data.row + 1) + ":" + (data.column + 1) });

        grid.setRows(errors);
        grid.onselect = function(data) {
            Cats.project.editFile(data.resource, null, { row: data.row, column: data.column });
        };

        grid.render();

        var result = document.getElementById("errorresults");
        result.innerHTML = "";
        grid.appendTo(result);
    }

    // This class creates the main menubar and has the actions that are linked to the 
    // menubar.
    class Menubar {

        menubar;

        fontSizes = [10, 12, 14, 16, 18, 20];

        themes = [
                    { theme: "chrome", label: "Chrome" },
                    { theme: "clouds", label: "Clouds" },
                    { theme: "crimson_editor", label: "Crimson Editor" },
                    { theme: "dawn", label: "Dawn" },
                    { theme: "dreamweaver", label: "Dreamweaver" },
                    { theme: "eclipse", label: "Eclipse" },
                    { theme: "cats", label: "CATS" },
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
                    { theme: "vibrant_ink", label: "Vibrant Ink" },
        ];


        constructor() {
            var menubar = new gui.Menu({ type: 'menubar' });

            var file = new gui.Menu();
            file.append(new gui.MenuItem({ label: 'New File', click: this.newFile }));
            file.append(new gui.MenuItem({ type: "separator" }));
            file.append(this.editorCommand("save"));
            file.append(new gui.MenuItem({ label: 'Save As ...', click: this.nop }));
            file.append(new gui.MenuItem({ label: 'Save All', click: this.saveAll }));
            file.append(new gui.MenuItem({ type: "separator" }));
            file.append(new gui.MenuItem({ label: 'Close File', click: this.closeFile }));
            file.append(new gui.MenuItem({ label: 'Close All Files', click: this.closeAllFiles }));
            file.append(new gui.MenuItem({ label: 'Close Other Files', click: this.closeOtherFiles }));
            file.append(new gui.MenuItem({ type: "separator" }));
            file.append(new gui.MenuItem({ label: 'Exit', click: this.closeAllProjects }));

            var edit = new gui.Menu();
            edit.append(this.editorCommand("undo"));
            edit.append(this.editorCommand("redo"));
            edit.append(new gui.MenuItem({ type: "separator" }));
            edit.append(this.editorCommand("cut"));
            edit.append(this.editorCommand("copy"));
            edit.append(this.editorCommand("paste"));
            edit.append(new gui.MenuItem({ type: "separator" }));
            edit.append(this.editorCommand("find"));
            edit.append(this.editorCommand("findnext"));
            edit.append(this.editorCommand("findprevious"));
            edit.append(this.editorCommand("replace"));
            edit.append(this.editorCommand("replaceall"));
            edit.append(new gui.MenuItem({ label: 'Find/Replace...', click: this.nop }));
            edit.append(new gui.MenuItem({ type: "separator" }));
            edit.append(this.editorCommand("togglerecording"));
            edit.append(this.editorCommand("replaymacro"));

            var source = new gui.Menu();
            source.append(this.editorCommand("togglecomment"));
            source.append(this.editorCommand("indent"));
            source.append(this.editorCommand("outdent"));
            source.append(new gui.MenuItem({ label: 'Format code', click: this.formatText }));

            var refactor = new gui.Menu();
            refactor.append(new gui.MenuItem({ label: 'Rename', click: refactorRename }));

            var navigate = new gui.Menu();
            navigate.append(new gui.MenuItem({ label: 'Open Declaration', click: gotoDeclaration }));
            navigate.append(new gui.MenuItem({ label: 'Find References', click: () => { getInfoAt("getReferencesAtPosition") } }));
            navigate.append(new gui.MenuItem({ label: 'Find Occurences', click: () => { getInfoAt("getOccurrencesAtPosition") } }));
            navigate.append(new gui.MenuItem({ label: 'Find Implementors', click: () => { getInfoAt("getImplementorsAtPosition") } }));

            var proj = new gui.Menu();
            proj.append(new gui.MenuItem({ label: 'Open Project...', click: this.openProject }));
            proj.append(new gui.MenuItem({ label: 'Close Project', click: this.closeProject }));
            proj.append(new gui.MenuItem({ type: "separator" }));
            proj.append(new gui.MenuItem({ label: 'Build Project', click: this.compileAll }));
            proj.append(new gui.MenuItem({ label: 'Refresh Project', click: this.refreshProject }));
            proj.append(new gui.MenuItem({ label: 'Properties', click: this.preferences }));


            var run = new gui.Menu();
            run.append(new gui.MenuItem({ label: 'Run main', click: this.runFile }));
            run.append(new gui.MenuItem({ label: 'Debug main', click: this.nop }));

            var window = new gui.Menu();
            window.append(new gui.MenuItem({ label: 'Theme', submenu: this.createThemeMenu() }));
            window.append(new gui.MenuItem({ label: 'Font size', submenu: this.createFontSizeMenu() }));
            

            var help = new gui.Menu();
            help.append(new gui.MenuItem({ label: 'Keyboard shortcuts', click: this.showShortcuts }));
            help.append(new gui.MenuItem({ label: 'Process Info', click: this.showProcess }));
            help.append(new gui.MenuItem({ label: 'Developers tools', click: this.showDevTools }));
            help.append(new gui.MenuItem({ label: 'About CATS', click: this.showAbout }));

            menubar.append(new gui.MenuItem({ label: 'File', submenu: file }));
            menubar.append(new gui.MenuItem({ label: 'Edit', submenu: edit }));
            menubar.append(new gui.MenuItem({ label: 'Source', submenu: source }));
            menubar.append(new gui.MenuItem({ label: 'Refactor', submenu: refactor }));
            menubar.append(new gui.MenuItem({ label: 'Navigate', submenu: navigate }));
            menubar.append(new gui.MenuItem({ label: 'Project', submenu: proj }));
            menubar.append(new gui.MenuItem({ label: 'Run', submenu: run }));
            menubar.append(new gui.MenuItem({ label: 'Window', submenu: window }));
            menubar.append(new gui.MenuItem({ label: 'Help', submenu: help }));
            win.menu = menubar;
            this.menubar = menubar;
        }


        // TODO i18n
        getLabelForCommand(commandName: string) {
            var label = commandName[0].toUpperCase() + commandName.slice(1);
            var platform = Cats.mainEditor.aceEditor.commands.platform;
            var command = Cats.mainEditor.aceEditor.commands.byName[commandName];

            var tabs = 5 - Math.floor((label.length / 4) - 0.01);
            label = label + "\t\t\t\t\t\t".substring(0, tabs);
            if (command && command.bindKey) {
                var key = command.bindKey[platform];
                if (key) label += key;
            }
            return label;
        }


        icons = {
            undo: "undo_edit.gif",
            redo: "redo_edit.gif",
            copy: "copy_edit.gif",
            paste: "paste_edit.gif",
            cut: "cut_edit.gif",
            indent: "shift_r_edit.gif",
            outdent: "shift_l_edit.gif"
        }

        editorCommand(commandName: string) {
            var label = this.getLabelForCommand(commandName);
            var item = new gui.MenuItem({
                label: label,
                click: function() { Cats.mainEditor.aceEditor.execCommand(commandName); }
            });
            var iconName = this.icons[commandName];
            if (iconName) {
                item.icon = "static/img/" + iconName;
            }
            return item;
        }

        showShortcuts() {
            window.open('keyboard_shortcuts.html', '_blank');
        }

        showAbout() {
            alert("Code Assisitant for TypeScript\nversion 0.6.8\nCreated by JBaron");
        }

        closeAllProjects() {
            var sure = confirm("Do you really want to quit?");
            if (sure) gui.App.closeAllWindows();
        }

        showDevTools() {
            win.showDevTools()
        }

        newFile() {
            Cats.project.editFile("untitled", "");
        }


        closeFile() {
            Cats.mainEditor.closeSession(Cats.mainEditor.activeSession);
        }

        closeAllFiles() {
            Cats.mainEditor.closeAllSessions();
        }

        closeOtherFiles() {
            // Make a copy of sessions
            var sessions = Cats.mainEditor.sessions.slice(0);
            var activeSession = Cats.mainEditor.activeSession;
            for (var i=0;i<sessions.length;i++) {
                var session = sessions[i];
                if (session !== activeSession) {
                    Cats.mainEditor.closeSession(session);
                }
            }
        }

        closeProject() {
            window.close();
        }

        quit() {
            var sure = confirm("Do you really want to quit?");
            if (sure) gui.App.quit();
        }

        showProcess() {
            var mem = process.memoryUsage();
            var display = "memory used: " + mem.heapUsed;
            display += "\nmemory total: " + mem.heapTotal;
            display += "\nplatform: " + process.platform;
            display += "\nworking directory: " + process.cwd();
            alert(display);
        }

        compileAll() {
            // this.defaultOutput = window.prompt("Output file",this.defaultOutput);
            var options = Cats.project.config.compiler;
            $("#result").addClass("busy");
            Cats.project.iSense.perform("compile", options, (err, data) => {
                $("#result").removeClass("busy");
                if (data.error) {
                    showErrors(data.error);
                    return;
                }

                document.getElementById("errorresults").innerText = "Successfully generated " + Object.keys(data.source).length + " file(s).";
                var sources = data.source
                for (var name in sources) {
                    Cats.project.writeTextFile(name, sources[name]);
                }
            });
        }

        preferences() {
            var content = JSON.stringify(Cats.project.config, null, 4);            
            Cats.project.editFile(Cats.project.getConfigFileName(), content);
        }


        refreshProject() {
            project.refresh();
        }

        openProject() {
            var chooser: any = document.getElementById('fileDialog');
            chooser.onchange = function(evt) {
                console.log(this.value);
                var param = encodeURIComponent(this.value)
                window.open('index.html?project=' + param, '_blank');
            };
            chooser.click();
        };


        formatText() {
            var session = Cats.mainEditor.activeSession;
            session.project.iSense.perform("getFormattedTextForRange", session.name, 0, session.getValue().length, (err, result) => {
                if (!err) session.setValue(result);
            });
        }


        saveAll() {
            var sessions = Cats.mainEditor.sessions; 
            for (var i=0;i<sessions.length;i++) {
                var session = sessions[i];
                if (session.changed) session.persist();
            }
        }


        saveFile() {
            Cats.mainEditor.aceEditor.execCommand("save");
        }

        runFile() {
            var main = Cats.project.config.main;
            if (!main) {
                alert("Please specify the main html file to run in the project settings.");
                return;
            }
            var startPage = Cats.project.getStartURL();
            console.log("Opening file: " + startPage);
            var win2 = gui.Window.open(startPage, {
                toolbar: true,
                webkit: {
                    "page-cache": false
                }
            });
            // win2.reloadIgnoringCache()
        };


        nop() {
            alert("Not yet implemented");
        };

            //undoChange() {
            //  var man = cats.mainEditor.aceEditor.getSession().getUndoManager();
            //  man.undo();
            //}
            //
            //redoChange() {
            //  var man = cats.mainEditor.aceEditor.getSession().getUndoManager();
            //  man.redo();
            //}

        enableFind() {
            window.open('findreplace.html', '_blank');
        }

        actionFind() {
            var input = <HTMLInputElement>document.getElementById("findText");
            Cats.mainEditor.aceEditor.find(input.value, {}, true);
        }

        actionReplace() {
            var findText = <HTMLInputElement>document.getElementById("findText");
            var replaceText = <HTMLInputElement>document.getElementById("replaceText");
            var options = {
                needle: findText.value
            };
            Cats.mainEditor.aceEditor.replace(replaceText.value, options);
        }

        setThemeWrapper(theme) {
            return function setTheme() {
                Cats.mainEditor.setTheme(theme);
            }
        }

        createFontSizeMenu() {
            var menu = new gui.Menu();
            this.fontSizes.forEach((size: number) => {
                menu.append(new gui.MenuItem({
                    label: size + "px",
                    click: () => { Cats.mainEditor.aceEditor.setFontSize(size + "px") }
                }));
            });
            return menu;
        }

        createThemeMenu() {
            var menu = new gui.Menu();
            this.themes.forEach((theme) => {
                if (theme.theme) {
                    menu.append(new gui.MenuItem({
                        label: theme.label,
                        click: this.setThemeWrapper(theme.theme)
                    }));
                } else {
                    menu.append(new gui.MenuItem({
                        type: "separator"
                    }));
                }
            });
            return menu;
        }

        enableReplace() {
            document.getElementById("findArea").style.display = "block";
            document.getElementById("replaceArea").style.display = "block";
        }


    }

    export var mainMenuBar;
    export function createMenuBar() {
        mainMenuBar = new Menubar();
    }


}


// global.actionFind = Menu.mainMenuBar.actionFind; 