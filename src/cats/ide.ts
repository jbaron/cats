module Cats {
    
export interface Ide {
    fileNavigation: HTMLElement;
    outlineNavigation: HTMLElement;
    
}    
    
    
    
export var IDE = {
    
    navigationBar :document.getElementById("navigationbar"),
    fileNavigation : document.getElementById("filetree"),
    outlineNavigation : document.getElementById("outlinenav"),
    
    resultBar :document.getElementById("resultbar"),
    compilationResult :document.getElementById("errorresults"),
    searchResult :document.getElementById("searchresults"),
    
    taskBar :document.getElementById("infobar"),
    
    editor : document.getElementById("editor"),
    sessionBar : document.getElementById("sessionbar"),
    
    toolBar: document.getElementById("toolbar"),
    statusBar: document.getElementById("statusbar"),
    
    mainMenu: null,
}    
    
    
    
    
    
    
}