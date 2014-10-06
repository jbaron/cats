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

module Cats.Commands {

    /**
     * Close all open projects
     */ 
    function closeAllProjects() {
        IDE.closeProject(IDE.project);
    }

    /**
     * Close the project
     */ 
    function closeProject() { 
        IDE.closeProject(IDE.project);
    }

    /**
     * Run the project
     */ 
    function runProject() {
        IDE.project.run();
    };


    /**
     * Show a class diagram of the project. 
     */ 
    function showDiagram() {
        IDE.editorTabView.addEditor(new Gui.UMLEditor("Class Diagram"));
    }

 
    /**
     * Compile all the sources without actually saving them
     * to see if there are any issues popping up.
     */ 
    function validateProject() {
        var project = IDE.project;
        project.validate();
    }

    /**
     * Build the project
     */ 
    function buildProject() {
        IDE.project.build();
    }

    /**
     * Generate the API documentation for the project
     */ 
    function documentProject() {
        IDE.project.document();
    }

    /**
     * Provide the user with an UI to configure the project settings
     */ 
    function configureProject() {
        var w = new Gui.ProjectConfigDialog(IDE.project);
        w.show();
    }

    /**
     * Refresh the project so everything is in sync again. This is needed when more complex
     * filesystem changes are done (like renaming TS files etc).
     */ 
    function refreshProject() {
        IDE.project.refresh();
    }


    /**
     * Open a project. If current windows doesn't have a project yet, opene there.
     * Otherwise open the project in a new window
     */ 
    function openProject() {
        var chooser: any = document.getElementById('fileDialog');
        chooser.onchange = function(evt) {
            var projectPath: string = this.value;
            if (! IDE.project) {
                IDE.addProject(new Project(projectPath));
            } else {
                var param = encodeURIComponent(projectPath);
                this.value = ""; // Make sure the change event goes off next tome
                window.open('index.html?project=' + param);
            }
        };
        chooser.click();
    };


    export class ProjectCommands {
        static init(registry) {
            registry({ name: CMDS.project_open, label: "Open Project....", command: openProject});
            registry({ name: CMDS.project_close, label: "Close project", command: closeProject});
            registry({ name: CMDS.project_build, label: "Build Project", command: buildProject});
            registry({ name: CMDS.project_validate, label: "Validate Project", command: validateProject });
            registry({ name: CMDS.project_refresh, label: "Refresh Project", command: refreshProject});
            registry({ name: CMDS.project_run, label: "Run Project", command: runProject});
            // registry({ name: CMDS.project_debug, label: "Debug Project", command: null, icon: "debug.png" });
            registry({ name: CMDS.project_classDiagram, label: "Class Diagram", command: showDiagram });
            registry({ name: CMDS.project_configure, label: "Settings....", command: configureProject });
             registry({ name: CMDS.project_document, label: "Generate Documentation", command: documentProject });
        }

    }

}