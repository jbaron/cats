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

    var glob = require("glob");

    /**
     * This class represents the total IDE. Wehn CATS is started a single instance of this class 
     * will be created that takes care of rendering all the components and open a project 
     * if applicable. 
     */ 
    export class Ide  extends qx.event.Emitter{

        // List of different themes that are available
        private themes:Array<Theme>;
        
        theme:Theme;
        
        private recentProjects:Array<string>;

        rootDir: string;
        projects: Project[] = [];
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
	        this.themes = this.loadThemes();	
            
            window.onpopstate = (data) => {
                if (data && data.state) this.goto(data.state);
            }
            
            this.loadShortCuts();
            qx.theme.manager.Meta.getInstance().setTheme(cats.theme.Default);
            this.setTheme(this.config.theme);
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
                var cmd = new qx.ui.command.Command(shortCut);
                cmd.addListener("execute", (function(commandName: string) {
                  Cats.Commands.commandRegistry.runCommand(commandName);
                }).bind(null, commandName));
            }
            
        }

        /**
         * Load the icons map from the file.
         */ 
        private loadIconsMap() {
            return JSON.parse(OS.File.readTextFile("resource/icons.json"));
        }


        /**
         * Load the themes from the file.
         */ 
        private loadThemes() {
            return JSON.parse(OS.File.readTextFile("resource/themes.json"));
        }

        setFont(size=14) {
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
        private loadMessages(locale="en") {
            const fileName = "resource/locales/" + locale + "/messages.json";
            const messages = JSON.parse(OS.File.readTextFile(fileName));
            let map:IMap = {};
            for (var key in messages) {
                map[key] = messages[key].message;
            }
            qx.locale.Manager.getInstance().setLocale(locale);
            qx.locale.Manager.getInstance().addTranslation(locale, map);

        }


        private goto(entry) {
            const hash = entry.hash;
            this.lastEntry = entry;
            const page = <Gui.EditorPage>qx.core.ObjectRegistry.fromHashCode(hash);
            if (page) IDE.editorTabView.navigateToPage(page, entry.pos);
        }

        /**
         * Initialize the different modules within the IDE.
         * 
         */ 
        init(rootDoc:qx.ui.container.Composite) {
            Cats.Commands.init();
            const layouter = new Gui.Layout(rootDoc);
            rootDoc.setBackgroundColor("transparent");
            layouter.layout(this);
            this.menuBar = new Gui.MenuBar();

            // @TODO fix for 1.4
            this.initFileDropArea();
            this.handleCloseWindow();
        }

        /**
         * Add an entry to the history list
         */ 
        addHistory(editor:Editor, pos?:any) {
             const page = this.editorTabView.getPageForEditor(editor);
             if ((this.lastEntry.hash === page.toHashCode()) && (this.lastEntry.pos === pos)) return;
            
             var entry ={
                hash: page.toHashCode(),
                pos: pos
            }; 
            
            history.pushState(entry,page.getLabel());
        }


        getCurrentTheme() :Theme {
            const themeName = this.config.theme || "default"; 
            var theme = this.themes.find((theme) => {return theme.name == themeName});
            if (theme) return theme;
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
        private initFileDropArea(): void {
            // Listen onto file drop events
            document.documentElement.addEventListener("drop", (ev) => this.acceptFileDrop(ev), false);

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
            const files: FileList = event.dataTransfer.files;

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
                const projectDir = this.config.projects[0]; 
                this.setDirectory(projectDir);
            
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

        private getDefaultTheme() : Theme {
            return {
                "name" : "default",
                "background" : "linear-gradient(to right, #666 , #888)",
                "color" : "Color",
                "ace" : "ace/theme/eclipse"          
            }
        }
   
   
        private findTheme(name:string) : Theme {
            return this.themes.find((theme) => {return theme.name == name});
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
            this.projects=[];
        }

        /**
         * Get a set of default preferences.
         */
        private getDefaultPreferences() {
            var defaultConfig:IDEConfiguration = {
                version: "2.0",
                theme: "default",
                fontSize: 13,
                editor : {
                    rightMargin: 100
                },
                locale: "en",
                rememberOpenFiles: false,
                sessions: [],
                projects:[]
            };
            return defaultConfig;
        }

        /**
         * Load the configuration for the IDE. If there is no configuration
         * found or it is an old version, use the default one to use.
         */ 
        private loadPreferences() {
            
            var configStr = localStorage[Ide.STORE_KEY];
            
            if (configStr) {
                    try {
                        var config:IDEConfiguration = JSON.parse(configStr);
                        if (config.version === "2.0") return config;
                    } catch (err) {
                        console.error("Error during parsing config " + err);
                    }
            }
            
            return this.getDefaultPreferences();
        }

        /**
         * Set the theme for this IDE
         */
        setTheme(name="default") {
            var theme = this.findTheme(name);
            if (! theme) {
                IDE.console.error(`Theme with name ${name} not found.`);
                theme = this.getDefaultTheme();
            }
            
            this.theme = theme;
            const colorTheme = cats.theme[theme.color] || cats.theme.Color;
            
            document.body.style.background = theme.background;
            var manager = qx.theme.manager.Color.getInstance();
            qx.theme.manager.Color.getInstance().setTheme(colorTheme);
            document.body.style.color = colorTheme.colors.text
            
            this.setFont(this.config.fontSize);
            this.emit("config");
        }


        /**
         * Update the configuration for IDE
         * 
         */ 
        updatePreferences(config:IDEConfiguration) {
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
  
                    this.editorTabView.getEditors().forEach((editor)=>{ 
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
            } catch (err) {
                console.error(err);
            }
        }


        /**
         * For a given file get the first project it belongs to.
         */
        getProject(fileName:string) {
            for (var x=0;x<this.projects.length;x++) {
                let project = this.projects[x];
                if (project.hasScriptFile(fileName)) return project;
            }
        }
         
        /**
         * Find all possible TSConfig files from a certain base directory.
         */
        private getTSConfigs(dir:string) {
            var configs:string[] = glob.sync(dir + "/" + "**/tsconfig*.json");
            if (configs.length === 0) {
                this.console.log("No tsconfig file found, creating a default one");
                let fileName = OS.File.PATH.join(dir,"tsconfig.json");
                OS.File.writeTextFile(fileName,"{}");
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
        setDirectory(directory: string, refreshFileNavigator = true) {
            this.projects = [];
            this.rootDir = OS.File.PATH.resolve(this.catsHomeDir,directory);

            var index = this.recentProjects.indexOf(directory);
            if (index !== -1) {
                this.recentProjects.splice(index,1);
            }
            this.recentProjects.push(directory);
            
            
            var name = OS.File.PATH.basename(directory);
            document.title = "CATS | " + name;

            if (refreshFileNavigator) this.fileNavigator.setRootDir(directory);
            var configs:string[] = this.getTSConfigs(directory);
    
            configs.forEach((config) => {
                let path = OS.File.PATH.resolve(config);
                path = OS.File.switchToForwardSlashes(path);
                let p = new Project(path);
                this.projects.push(p);
            });
        }
        
        
        private handleCloseWindow() {
            
            // Catch the close of the windows in order to save any unsaved changes
            var win = getNWWindow();
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
            var GUI = getNWGui();
  
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
