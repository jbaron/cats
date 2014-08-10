/**
 * Base class for Editors. Implements most generic methods as 
 * NOP
 */ 
interface Editor extends qx.ui.core.Widget {
       
    replace(range:Ace.Range,content:string);  
    
    getContent();
    
    setContent(content, keepPosition?);
    
    updateWorld();
    
    moveToPosition(pos: Ace.Position);
    
}