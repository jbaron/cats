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
    }

    /**
     * Open a new project. Thsi can be any directory on the filesystem.
     */ 
    function newProject() {
        var chooser: HTMLElement = document.getElementById('fileDialog');
        chooser.onchange = function(evt:Event) {
            IDE.setDirectory(<string>this["value"]);
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
            IDE.setDirectory(<string>this["value"]);
        };
        chooser.click();
    };


    export class ProjectCommands {
        static init(registry: (cmd: COMMANDNAME, fn:Function) => void) {
            registry(COMMANDNAME.project_open,openProject);
            registry(COMMANDNAME.project_new,newProject);
            registry(COMMANDNAME.project_close,closeProject);
            registry(COMMANDNAME.project_build,buildProject);
            registry(COMMANDNAME.project_validate, validateProject);
            registry(COMMANDNAME.project_refresh, refreshProject);
            registry(COMMANDNAME.project_run, runProject);
            // registry(CMDS.project_debug, label: "Debug Project",null, icon: "debug.png" });
            registry(COMMANDNAME.project_quickOpen, quickOpen);
            registry(COMMANDNAME.project_configure, configureProject);
        }

    }

}
