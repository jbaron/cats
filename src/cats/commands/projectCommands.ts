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
       IDE.close();
    }

    /**
     * Close the project
     */ 
    function closeProject() { 
        IDE.close();
    }

    /**
     * Run the project
     */ 
    function runProject() {
        IDE.projects.forEach((project) => project.run());
    };


    /**
     * Show a class diagram of the project. 
     */ 
    function showDiagram() {
       // if (IDE.project) IDE.editorTabView.addEditor(new Gui.Editor.UMLEditor("Class Diagram"));
    }

    /**
     * Shows a quick open dialog for the project.
     */
    function quickOpen(project) {
        var dialog = new Gui.QuickOpenDialog(project);
        dialog.show();
    }
 
    /**
     * Compile all the sources without actually saving them
     * to see if there are any issues popping up.
     */ 
    function validateProject() {
        IDE.projects.forEach((project) => project.validate());
    }


    /**
     * Build the project
     */ 
    function buildProject() {
        IDE.projects.forEach((project) => project.build());
    }

 
    /**
     * Provide the user with an UI to configure the project settings
     */ 
    function configureProject(project) {
        
            var w = new Gui.ProjectSettingsDialog(project);
            w.show();
        
    }

    /**
     * Refresh the project so everything is in sync again. This is needed when more complex
     * filesystem changes are done (like renaming TS files etc).
     */ 
    function refreshProject() {
        IDE.refresh();
        // IDE.projects.forEach((project) => project.refresh());
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
        }

    }

}
