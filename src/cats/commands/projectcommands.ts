// This module contains all the global commands pertaining to project related functionality

module Cats.Commands {

    var gui = require("gui");

  function openProject() {
            var chooser: any = document.getElementById('fileDialog');
            chooser.onchange = function(evt) {
                console.log(this.value);
                var param = encodeURIComponent(this.value)
                window.open('index.html?project=' + param, '_blank');
            };
            chooser.click();
        };


  function closeProject() {
            window.close();
   }


   function runFile() {
            var path = require("path");

            var main = Cats.project.config.config().main;
            if (!main) {
                alert("Please specify the main html file to run in the project settings.");
                return;
            }
            var startPage = "file://" + Cats.project.getFullName(main);
            console.log("Opening file: " + startPage);
            var win2 = gui.Window.open(startPage, {
                toolbar: true,
                webkit: {
                    "page-cache": false
                }
            });
            // win2.reloadIgnoringCache()
        };



        function closeAllProjects() {
            var sure = confirm("Do you really want to quit?");
            if (sure) gui.App.closeAllWindows();
        }
        
        
        export class ProjectCommands {
        static init(register) {
            register("project.open", openProject);
        }

    }

}