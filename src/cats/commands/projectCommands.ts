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

    function showDiagram() {
        alert("Right now just showing some demo classes.");
        var session = new Session("Class Diagram");
        session.uml = true;
        IDE.sessionTabView.addSession(session);
    }

    /**
     * Run the project
     
    function showDependency() {
        IDE.project.iSense.getDependencyGraph((err,data:any[])=>{
            
            data.forEach((entry) =>{
               var refs:any[] = entry.ref;
               var d = PATH.dirname(entry.src);
               for (var i=0;i<refs.length;i++) {                   
                   refs[i] = OS.File.switchToForwardSlashes(PATH.join(d,refs[i]));
               };               
            });
            
            
            window["dependencies"] = data;
            var startPage = "uml.html";
            console.info("Opening file: " + startPage);
            var win2 = window.open(startPage,"dependencies","status=1,resizable=1,menubar=1,location=1,toolbar=1,titlebar=1,scrollbars=1");
            win2["dependencies"] = data;
        })
        // win2.reloadIgnoringCache()
    };
    
    */

    /**
     * Compile all the sources without saving them
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
     * Build the project
     */ 
    function documentProject() {
        IDE.project.document();
    }

    function configureProject() {
        var w = new ProjectConfigDialog(IDE.project);
        w.show();
    }

    /**
     * Refresh the project so everything is in sync again.
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
                window.open('index.html?project=' + param, '_blank');
            }
            /*
            var gui = require('nw.gui'); 
            gui.Window.open(
                'index.html?project=' + param,
                {"new-instance":true}
            );
            */
            
            
        };
        chooser.click();
    };


    export class ProjectCommands {
        static init(registry) {
            registry({ name: CMDS.project_open, label: "Open Project...", command: openProject, icon: "actions/project-open.png" });
            registry({ name: CMDS.project_close, label: "Close project", command: closeProject, icon:"actions/project-development-close.png" });
            registry({ name: CMDS.project_build, label: "Build Project", command: buildProject, icon: "categories/applications-development.png" });
            registry({ name: CMDS.project_validate, label: "Validate Project", command: validateProject });
            registry({ name: CMDS.project_refresh, label: "Refresh Project", command: refreshProject, icon: "actions/view-refresh.png" });
            registry({ name: CMDS.project_run, label: "Run Project", command: runProject, icon: "actions/arrow-right.png" });
            // registry({ name: CMDS.project_debug, label: "Debug Project", command: null, icon: "debug.png" });
            registry({ name: CMDS.project_dependencies, label: "Class Diagram", command: showDiagram });
            registry({ name: CMDS.project_configure, label: "Settings", command: configureProject });
             registry({ name: CMDS.project_document, label: "Generate Documentation", command: documentProject });

        }

    }

}