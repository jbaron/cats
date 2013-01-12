// This module contains all the global commands pertaining to project related functionality

module Cats.Commands {

  

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