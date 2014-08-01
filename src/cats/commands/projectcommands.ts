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


        function showCompilationResults(data:Cats.CompileResults) {

            if (data.errors && (data.errors.length > 0)) {
                IDE.problemResult.setData(data.errors);
                return;
            }
            
            IDE.problemResult.setData([]);
            var time = new Date();
            var stamp = time.toLocaleTimeString();
            IDE.console.log( stamp + " Successfully compiled " + Object.keys(data.source).length + " file(s).\n");
        }


    function closeAllProjects() {
        var sure = confirm("Do you really want to quit?");
        if (sure) GUI.App.closeAllWindows();
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
        var main = IDE.project.config.main;
        if (!main) {
            alert("Please specify the main html file to run in the project settings.");
            return;
        }
        var startPage = IDE.project.getStartURL();
        console.info("Opening file: " + startPage);
        var win2 = GUI.Window.open(startPage, {
            toolbar: true,
            webkit: {
                "page-cache": false
            }
        });
        // win2.reloadIgnoringCache()
    };

    /**
     * Run the project
     */ 
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

    /**
     * Compile all the sources without saving them
     */ 
    function validateProject() {
        var project = IDE.project;

        project.iSense.compile((err, data:Cats.CompileResults) => {                        
            showCompilationResults(data);
        });
    }

    function show(text:string) {
        if (! text) return;
        IDE.console.log(text);
    }

    /**
     * Build the project
     */ 
    function buildProject() {
        // this.defaultOutput = window.prompt("Output file",this.defaultOutput);
        var project = IDE.project;
        if (project.config.customBuild) {
            IDE.busy(true);
            // IDE.resultbar.selectOption(2);
            var cmd = project.config.customBuild.command;
            var options = project.config.customBuild.options || {};
            
            if (! options.cwd) {
                options.cwd = IDE.project.projectDir;
            }
            
            var exec = require('child_process').exec;

            var child = exec(cmd,options,
              function (error, stdout, stderr) {
                IDE.busy(false);
                show(stdout);
                show(stderr);
                if (error !== null) {
                  show('exec error: ' + error);
                }
            });
            
        } else {
            project.iSense.compile((err, data:Cats.CompileResults) => {                        
                showCompilationResults(data);
                if (data.errors && (data.errors.length > 0)) return;
                var sources = data.source;
                sources.forEach((source) => {
                        OS.File.writeTextFile(source.fileName, source.content);
                });
            });
        }
    }


    /**
     * Configure the properties of a project
     */ 
    function propertiesProject() {
        var project = IDE.project;
        var name = ConfigLoader.getFileName(project.projectDir);
        if (IDE.getSession(name)) {
            IDE.openSession(name);
        } else {
            var content = JSON.stringify(project.config, null, 4);
            // @TODO fix
            // var session = new AceSession(name,content);
            // IDE.addSession(session);
            // IDE.openSession(name);
        }
    }
    
    /**
     * Refresh the project so everything is in sync again.
     */ 
    function refreshProject() {
        IDE.project.refresh();
    }

    /**
     * Open a (new) project in a separate window
     */ 
    function openProject() {
        var chooser: any = document.getElementById('fileDialog');
        chooser.onchange = function(evt) {
            console.log(this.value);
            var param = encodeURIComponent(this.value)
            this.value = ""; // Make sure the change event goes off next tome
            
            /*
            var gui = require('nw.gui'); 
            gui.Window.open(
                'index.html?project=' + param,
                {"new-instance":true}
            );
            */
            
            window.open('index.html?project=' + param, '_blank');
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
            registry({ name: CMDS.project_properties, label: "Properties", command: propertiesProject });
            registry({ name: CMDS.project_dependencies, label: "Show Dependencies", command: showDependency });
        }

    }

}