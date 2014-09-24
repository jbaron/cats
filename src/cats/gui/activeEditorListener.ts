module Cats.Gui {
    
    /**
     * Class that proxies editor events
     */  
    class ActiveEditorListener  {
        
        private editor:Editor;
        private reg = {};
        
        
        constructor() {
            this.editor = IDE.editorTabView.getActiveEditor();
            IDE.editorTabView.addListener("changeSelection", (ev) => {
                var page:EditorPage = ev.getData()[0];
                if (page) {
                    this.swap(page.editor);
                } else {
                    this.swap(null);
                }
            });
        }
        
        
        private offAll(editor) {
            if (! editor) return;
            Object.keys(this.reg).forEach((key) => {
                var value = this.reg[key];
                editor.on(key, value[0], value[1]); 
            });
        }
        
        private onAll(editor) {
            if (! editor) return;
            Object.keys(this.reg).forEach((key) => {
                var value = this.reg[key];
                editor.on(key, value[0], value[1]); 
            });
        }
        
        
        private swap(editor) {
            this.offAll(this.editor);
            this.onAll(editor);
            this.editor = editor;
        }
        
        get(key:string) {
            if (this.editor) this.editor[key];
        }
        
        hasEditor() {
            return this.editor != null;
        }
        
        getEditor() {
            return this.editor;
        }
        
        on(key:string, cb:Function, ctx?) {
            if (this.editor) this.editor.on(key,cb, ctx);
            this.reg[key] = [cb, ctx];
        }
        
        off(key:string, cb:Function, ctx?) {
            if(this.editor) this.editor.off(key,cb, ctx);
            delete this.reg[key]
        }
        
    }
    
}