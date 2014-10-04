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
  
    var Events = require('events');

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

        problemPane: Gui.TabView;
        toolBar: Gui.ToolBar;
        infoPane: Gui.TabView;
        statusBar: Gui.StatusBar;
        editorTabView: Gui.EditorTabView;
        console: Gui.ConsoleLog;
        processTable: Gui.ProcessTable;
        todoList: Gui.ResultTable;
        bookmarks:Gui.ResultTable;
        problemResult:Gui.ResultTable;
        menubar:Gui.Menubar;
        propertyTable:Gui.PropertyTable;
        outlineNavigator:Gui.OutlineNavigator; 
        fileNavigator:Gui.FileNavigator;
        debug:boolean= false;

        catsHomeDir: string;
        project: Project;
        config:IDEConfiguration;
        private static STORE_KEY = "cats.config";
        private lastEntry = <any>{}; 

        constructor() {
            super();
            this.catsHomeDir = process.cwd();
            this.config = this.loadConfig();
            this.configure();
            
            window.onpopstate = (data) => {
                if (data && data.state) this.goto(data.state);
            }
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
            this.menubar = new Gui.Menubar();
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
                FileEditor.OpenEditor((<any>files[i]).path);
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
                this.addProject(new Project(projectDir));
            
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
        private loadConfig() {
            
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

        updateConfig(config) {
            this.config = config;
            this.emit("config", config);
            this.configure();
            this.saveConfig();
        }

        /**
         * Persist the current IDE configuration to a file
         */ 
        saveConfig() {
            try {
                var config = this.config;
                config.version = "1.1";
                config.sessions = [];
                config.projects = [];
                if (this.project) {
                    config.projects.push(this.project.projectDir);
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
         * @param projectDir the directory of the new project
         */
        addProject(project: Project) {
            this.project = project;
              
            if (this.project) {
                this.fileNavigator.setProject(this.project);
            }
        }
        
        
        private handleCloseWindow() {
            // Catch the close of the windows in order to save any unsaved changes
            var win = GUI.Window.get();
            win.on("close", function() {
                try {
                    if (IDE.editorTabView.hasUnsavedChanges()) {
                        if (!confirm("There are unsaved changes!\nDo you really want to continue?")) return;
                    }
                    IDE.saveConfig();
                } catch (err) { } // lets ignore this
                this.close(true);
            });
        }
        
        
        /**
         * Close an open project
         * @param project to be closed
         */
        closeProject(project:Project) {
            // TODO put code on IDE
            this.project.close();
            this.project = null;
        }
        
        quit() {
            if (this.editorTabView.hasUnsavedChanges()) {
                if (! confirm("There are unsaved files!\nDo you really want to quit?")) return;
            }
            this.saveConfig();
            GUI.App.quit();
        }
 
    }

}
