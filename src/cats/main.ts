///<reference path='menubar.ts'/>
///<reference path='filecontextmenu.ts'/>
///<reference path='project.ts'/>
///<reference path='ui/tabbar.ts'/>



module cats {

export var project:Project;
import fs = module("fs");
import path = module("path");

function getParameterByName(name) {
  name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
  var regexS = "[\\?&]" + name + "=([^&#]*)";
  var regex = new RegExp(regexS);
  var results = regex.exec(window.location.search);
  if(results == null)
    return "";
  else
    return decodeURIComponent(results[1].replace(/\+/g, " "));
}


function getParamByName(name:string) {
  var querystring = require("querystring");
  var params = querystring.parse(window.location.search);
  return params[name];
}


var defaultProject = "./samples" + path.sep + "greeter";

project = new cats.Project(getParameterByName("project") || defaultProject);

var fileTree = new ui.FileTree(project.projectDir);
fileTree.appendTo(document.getElementById("filetree"));
fileTree.onselect = (filePath) => {
    project.editFile(filePath);
}; 



export var tabbar;
tabbar = new ui.Tabbar();
tabbar.setOptions(project.sessions);
tabbar.setAspect("name", (session) => { return path.basename(session.name)});
tabbar.setAspect("selected", (session) => { return session === cats.project.session});
tabbar.setAspect("longname", (session) => { return session.name});
// tabbar.setAspect("changed", (session) => { return session.changed});
tabbar.onselect = (session) => cats.project.editFile(session.name); //TODO Fix to use real session

tabbar.appendTo(document.getElementById("sessionbar"));

$(document).ready(function () {
        $('body').layout({ 
          applyDemoStyles: false, 
          spacing_open: 8
        });
});


var gui = require('nw.gui');
var win = gui.Window.get();

win.on("close", function() {
  project.close();
  if (win != null)
      win.close(true);
    this.close(true);
});

}
