// This module contains all the global commands pertaining to project related functionality

module Cats.Commands {


     function closeAllProjects() {
            var sure = confirm("Do you really want to quit?");
            if (sure) gui.App.closeAllWindows();
        }

     function closeProject() {
            window.close();
        }


      function runProject() {
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


  
    function showErrors(errors:any[]) {
        

        var grid = new Cats.UI.Grid();
        grid.setColumns(["message", "scriptName", "position"]);
        grid.setAspect("position", (data) => { return (data.range.startRow + 1) + ":" + (data.range.startColumn + 1) });

        grid.setRows(errors);
        grid.onselect = function(data) {
            Cats.project.editFile(data.scriptName, null, { row: data.range.startRow, column: data.range.startColumn });
        };

        grid.render();

        var result = IDE.compilationResult;
        result.innerHTML = "";
        grid.appendTo(result);
    }
  

    function  buildProject() {
            // this.defaultOutput = window.prompt("Output file",this.defaultOutput);
            var options = Cats.project.config.compiler;
            $("#result").addClass("busy");
            Cats.project.iSense.perform("compile", options, (err, data) => {
                $("#result").removeClass("busy");
                if (data.error && (data.error.length > 0)) {
                    console.log(data.error);
                    showErrors(data.error);
                    return;
                }

                Cats.IDE.compilationResult.innerText = "Successfully generated " + Object.keys(data.source).length + " file(s).";
                var sources = data.source
                for (var name in sources) {
                    console.log(name);
                    Cats.project.writeTextFile(name, sources[name]);
                }
            });
        }

  
     function propertiesProject() {
            var content = JSON.stringify(Cats.project.config, null, 4);            
            Cats.project.editFile(Cats.project.getConfigFileName(), content);
        }

     function refreshProject() {
            Cats.project.refresh();
        }

     function openProject() {
            var chooser: any = document.getElementById('fileDialog');
            chooser.onchange = function(evt) {
                console.log(this.value);
                var param = encodeURIComponent(this.value)
                this.value = ""; // Make sure the change event goes off next tome
                window.open('index.html?project=' + param, '_blank');
            };
            chooser.click();
        };


        
        
        export class ProjectCommands {
        static init(registry) {
            registry({name:CMDS.project_open, label:"Open Project...", command:openProject});
            registry({name:CMDS.project_close, label:"Close project", command:closeProject});
            registry({name:CMDS.project_build, label:"Build Project", command:buildProject});
            registry({name:CMDS.project_refresh, label:"Refresh Project", command: refreshProject});
            registry({name:CMDS.project_run, label:"Run Project", command: runProject});
            registry({name:CMDS.project_debug, label:"Debug Project", command: null});
            registry({name:CMDS.project_properties, label:"Properties", command: propertiesProject});

        }

    }

}