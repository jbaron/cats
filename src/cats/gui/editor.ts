/**
 * Minimal required interface for Editors. Editors should at least implement these methods
 * (if only as NOP)
 * 
 * @TODO cleanup it a bit. Editor should only expose a generic command pattern interface and possible a
 * sync/updateWorld.
 */ 
interface Editor extends qx.ui.core.Widget {
       
    replace(range:Ace.Range,content:string);  
    
    getContent();
    
    setContent(content, keepPosition?);
    
    updateWorld();
    
    moveToPosition(pos: Ace.Position);
    
    executeCommand(commandName: string, ...args): boolean;
    
}

