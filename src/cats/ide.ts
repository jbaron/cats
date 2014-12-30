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

module Cats {

    var GUI = require('nw.gui');

    /**
     * This class represents the total IDE. The CATS is started a single isntance will be
     * created that takes care of rendering all the components and open a project if applicable.
     * 
     */ 
    export class Ide  extends qx.event.Emitter{

        // List of different themes that are available
        private themes = {                  
            cats : cats.theme.Default,
            gray: cats.theme.Grey,
            classic: qx.theme.Classic,
            indigo: qx.theme.Indigo,
            modern:qx.theme.Modern,
            simple:qx.theme.Simple
        };

        recentProjects:Array<string>;

        resultPane: Gui.TabView;
        toolBar: Gui.ToolBar;
        contextPane: Gui.TabView;
        statusBar: Gui.StatusBar;
        editorTabView: Gui.EditorTabView;
        console: Gui.ConsoleLog;
        processTable: Gui.ProcessTable;
        todoList: Gui.ResultTable;
        bookmarks:Gui.ResultTable;
        problemResult:Gui.ResultTable;
        menuBar:Gui.MenuBar;
        propertyTable:Gui.PropertyTable;
        outlineNavigator:Gui.OutlineNavigator; 
        fileNavigator:Gui.FileNavigator;
        debug:boolean= false;

        catsHomeDir: string;
        project: Project;
        config:IDEConfiguration;
        private static STORE_KEY = "cats.config";
        private lastEntry = <any>{}; 
        
        icons:IconMap;

        constructor() {
            super();
            this.catsHomeDir = process.cwd();
            this.loadMessages();
            this.config = this.loadPreferences();
            this.recentProjects = Array.isArray(this.config.projects) ?  this.config.projects : [];
            
            this.icons = this.loadIconsMap();
            this.configure();
            
            window.onpopstate = (data) => {
                if (data && data.state) this.goto(data.state);
            }
            
            this.loadShortCuts();
            
        }

        private loadShortCuts() {
            var fileName = OS.File.join(this.catsHomeDir, "resource/shortcuts.json");
            var c = OS.File.readTextFile(fileName);
            var shortCutSets:{} = JSON.parse(c);
            var os = "linux";
            if (Cats.OS.File.isWindows()) {
              os = "win";
            } else if (Cats.OS.File.isOSX()) {
              os = "osx";
            }
            var shortCuts = shortCutSets[os];
            for (var shortCut in shortCuts) {
                var commandName = shortCuts[shortCut];
                var cmd = new qx.ui.core.Command(shortCut);
                cmd.addListener("execute", (function(commandName: string) {
                  Cats.Commands.CMDS[commandName].command();
                }).bind(null, commandName));
            }
            
        }

        /**
         * Load the icons map from the file.
         */ 
        private loadIconsMap() {
            return JSON.parse(OS.File.readTextFile("resource/icons.json"));
        }


        setColors() {
            var manager = qx.theme.manager.Color.getInstance();
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
        }


        /**
         * Load all the locale dependend messages from the message file.
         * 
         * @param locale The locale you want to retrieve the messages for 
         */ 
        private loadMessages(locale="en") {
            var fileName = "resource/locales/" + locale + "/messages.json";
            var messages = JSON.parse(OS.File.readTextFile(fileName));
            var map:IMap = {};
            for (var key in messages) {
                map[key] = messages[key].message;
            }
            qx.locale.Manager.getInstance().setLocale(locale);
            qx.locale.Manager.getInstance().addTranslation(locale, map);

        }


        private goto(entry) {
            var hash = entry.hash;
            this.lastEntry = entry;
            var page = <Gui.EditorPage>qx.core.ObjectRegistry.fromHashCode(hash);
            if (page) IDE.editorTabView.navigateToPage(page, entry.pos);
        }

        /**
         * Initialize the different modules within the IDE.
         * 
         */ 
        init(rootDoc:qx.ui.container.Composite) {
            Cats.Commands.init();
            var layouter = new Gui.Layout(rootDoc);
            layouter.layout(this);
            this.menuBar = new Gui.MenuBar();
            this.initFileDropArea();
            this.handleCloseWindow();
        }

        /**
         * Add an entry to the history list
         */ 
        addHistory(editor:Editor, pos?:any) {
             var page = this.editorTabView.getPageForEditor(editor);
             if ((this.lastEntry.hash === page.toHashCode()) && (this.lastEntry.pos === pos)) return;
            
             var entry ={
                hash: page.toHashCode(),
                pos: pos
            }; 
            
            history.pushState(entry,page.getLabel());
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
        private initFileDropArea(): void {
            // Listen onto file drop events
            document.documentElement.addEventListener("drop", this.acceptFileDrop.bind(this), false);

            // Prevent the browser from redirecting to the file
            document.documentElement.addEventListener("dragover", (event: DragEvent) => {
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
        private acceptFileDrop(event: DragEvent): void {
            event.stopPropagation();
            event.preventDefault();

            // Loop over each file dropped. More than one file
            // can be added at a time
            var files: FileList = event.dataTransfer.files;

            for(var i = 0; i < files.length; i++) {
                var path:string = (<any>files[i]).path;
                FileEditor.OpenEditor(path);
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
                    this.config.sessions.forEach((session) => {
                        try {
                            var editor = Editor.Restore(session.type, JSON.parse(session.state));
                            if (editor) IDE.editorTabView.addEditor(editor);
                        } catch (err) {
                            console.error("error " + err);
                        }
                    });
                }
                // this.project.refresh();
            }
        }


        /**
         * Load the configuration for the IDE. If there is no configuration
         * found, create the default one to use.
         */ 
        private loadPreferences() {
            
            var defaultConfig:IDEConfiguration = {
                version: "1.1",
                theme: "cats",
                editor : {
                    fontSize: 13,
                    rightMargin: 100
                },
                locale: "en",
                rememberOpenFiles: false,
                sessions: [],
                projects:[]
            };
            
            var configStr = localStorage[Ide.STORE_KEY];
            
            if (configStr) {
                    try {
                        var config:IDEConfiguration = JSON.parse(configStr);
                        if (config.version === "1.1") return config;
                    } catch (err) {
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
                if (this.project) {
                    this.editorTabView.getEditors().forEach((editor)=>{ 
                        var state = editor.getState();
                        if ((state !== null) && (editor.getType())) {
                            config.sessions.push({ 
                                state: JSON.stringify(state),
                                type: editor.getType()
                            });
                        }
                    });
                };
                
                var configStr = JSON.stringify(config);
                localStorage[Ide.STORE_KEY] = configStr;
            } catch (err) {
                console.error(err);
            }
        }


        /**
         * Add a new project to the IDE
         * 
         * @param projectDir the directory of the new project
         */
        addProject(projectDir: string) {
            projectDir = OS.File.PATH.resolve(this.catsHomeDir,projectDir);
            if (this.recentProjects.indexOf(projectDir) === -1) {
                this.recentProjects.push(projectDir);
            }
            if (! this.project) {
                this.project = new Project(projectDir);
                this.fileNavigator.setProject(this.project);
            } else {
                var param = encodeURIComponent(projectDir);
                window.open('index.html?project=' + param);
            }
        }
        
        
        private handleCloseWindow() {
            // Catch the close of the windows in order to save any unsaved changes
            var win = GUI.Window.get();
            win.on("close", function() {
                var doClose = () => {
                    IDE.savePreferences();
                    this.close(true);
                };

                try {
                    if (IDE.editorTabView.hasUnsavedChanges()) {
                        var dialog = new Gui.ConfirmDialog("There are unsaved changes!\nDo you really want to continue?");
                        dialog.onConfirm = doClose;
                        dialog.show();
                    } else {
                        doClose();
                    }
                } catch (err) { } // lets ignore this
            });
        }
        
        
        /**
         * Quit the application. If there are unsaved changes ask the user if they really
         * want to quit.
         */ 
        quit() {
            var doClose = () => {
                this.savePreferences();
                GUI.App.quit();
            };

            if (this.editorTabView.hasUnsavedChanges()) {
                var dialog = new Gui.ConfirmDialog("There are unsaved files!\nDo you really want to quit?");
                dialog.onConfirm = doClose;
                dialog.show();
            } else {
                doClose();
            }
        }
 
    }

}
