///<reference path='menubar.ts'/>
///<reference path='contextmenu.ts'/>
///<reference path='project.ts'/>

module cats {

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

cats.project = new cats.Project(getParameterByName("project") || defaultProject);


}
