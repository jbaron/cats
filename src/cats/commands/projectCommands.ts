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
        if (IDE.project) IDE.project.close();
    }

    /**
     * Close the project
     */ 
    function closeProject() { 
        if (IDE.project) IDE.project.close();
    }

    /**
     * Run the project
     */ 
    function runProject() {
        if (IDE.project) IDE.project.run();
    };


    /**
     * Show a class diagram of the project. 
     */ 
    function showDiagram() {
       if (IDE.project) IDE.editorTabView.addEditor(new Gui.Editor.UMLEditor("Class Diagram"));
    }

    /**
     * Shows a quick open dialog for the project.
     */
    function quickOpen() {
      if (IDE.project) {
        var dialog = new Gui.QuickOpenDialog(IDE.project);
        dialog.show();
      }
    }
 
    /**
     * Compile all the sources without actually saving them
     * to see if there are any issues popping up.
     */ 
    function validateProject() {
        if (IDE.project) IDE.project.validate();
    }

    /**
     * Build the project
     */ 
    function buildProject() {
        if (IDE.project) IDE.project.build();
    }

    /**
     * Generate the API documentation for the project
     */ 
    function documentProject() {
        if (IDE.project) IDE.project.document();
    }

    /**
     * Provide the user with an UI to configure the project settings
     */ 
    function configureProject() {
        if (IDE.project) {
            var w = new Gui.ProjectSettingsDialog(IDE.project);
            w.show();
        }
    }

    /**
     * Refresh the project so everything is in sync again. This is needed when more complex
     * filesystem changes are done (like renaming TS files etc).
     */ 
    function refreshProject() {
        if (IDE.project) IDE.project.refresh();
    }

    /**
     * Open a project. If current windows doesn't have a project yet, opene there.
     * Otherwise open the project in a new window.
     * 
     * @TODO: for a new project provide template capabilities
     */ 
    function newProject() {
        var chooser: HTMLElement = document.getElementById('fileDialog');
        chooser.onchange = function(evt:Event) {
            IDE.addProject(<string>this.value);
        };
        chooser.click();
    };


    /**
     * Open a project. If current windows doesn't have a project yet, opene there.
     * Otherwise open the project in a new window
     */ 
    function openProject() {
        var chooser: HTMLElement= document.getElementById('fileDialog');
        chooser.onchange = function(evt:Event) {
            IDE.addProject(<string>this.value);
        };
        chooser.click();
    };


    export class ProjectCommands {
        static init(registry: (cmd: Command, fn:Function) => void) {
            registry(CMDS.project_open,openProject);
            registry(CMDS.project_new,newProject);
            registry(CMDS.project_close,closeProject);
            registry(CMDS.project_build,buildProject);
            registry(CMDS.project_validate, validateProject);
            registry(CMDS.project_refresh, refreshProject);
            registry(CMDS.project_run, runProject);
            // registry(CMDS.project_debug, label: "Debug Project",null, icon: "debug.png" });
            registry(CMDS.project_quickOpen, quickOpen);
            registry(CMDS.project_classDiagram, showDiagram);
            registry(CMDS.project_configure, configureProject);
            registry(CMDS.project_document, documentProject);
        }

    }

}
