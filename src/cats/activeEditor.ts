
interface Editor extends qx.event.Emitter {
    setContent(value);
    getContent():any;

    executeCommand(commandName:string, ...params:any[]);
}

/**
 * This class represents a virtual active editor that represents the state of 
 * the actual active editor.
 * 
 * Listen to events on this one for state changes.
 */ 
class DelegateEditor extends qx.event.Emitter implements Editor {
    
    private delegate:Editor;
    private interest : string[];
    private handler;
    
    setDelegate(editor:Editor, refreshListeners = true) {
        this.interest.forEach((name) => {
             this.delegate.removeListener(name,this.handler);
             editor.on(name,this.handler);
        });
        
        this.delegate = editor;
        if (refreshListeners) {
            
        }
    }

    setContent(value) {
        if (this.delegate) this.delegate.setContent(value);
    }
    
    getContent() {
        if (this.delegate) return this.delegate.getContent();
    }
    
    refresh(mode,pos,overwrite) {
        
    }
    
    executeCommand(commandName, ...params:any[]) {
        if (this.delegate) this.delegate.executeCommand(commandName, params);
    }
    
    
}