/**
 * Wrapper around the ACE editor. The rest of the code base should not use
 * ACE editor directly so it can be easily changed for another editor if required.
 */
class SourceEditor extends qx.ui.core.Widget /* qx.ui.embed.Html */{

    private aceEditor:Ace.Editor;
    private autoCompletePopup:AutoCompletePopup;
    // private autoCompleteView: Cats.UI.AutoCompleteView;
    // private container:HTMLElement;
    private mouseMoveTimer;
    private updateSourceTimer;
    private pendingWorkerUpdate = false;

    constructor(private session:Cats.Session, pos?:Cats.Position) {
        super();
        this.setDecorator(null);
        this.setFont(null);
        this.setAppearance(null);
        this.addListenerOnce("appear", () => {
            var container = this.getContentElement().getDomElement();
            container.style.lineHeight="normal";
             // this.configEditor(this.project.config.editor);

            this.aceEditor = this.createAceEditor(container);
            var aceSession = this.aceEditor.getSession();
            aceSession.setMode("ace/mode/" + session.mode)
            aceSession.setValue(session.content);
            
            aceSession.on("change", this.onChangeHandler.bind(this));
            
             if (session.mode === "binary") {
                this.aceEditor.setReadOnly(true);
            } else {
                this.aceEditor.setReadOnly(false);                
            }
            
        
             if (session.mode === "typescript") this.createContextMenu();
             if (pos) setTimeout(() => { this.moveToPosition(pos); }, 100);
              
              
             this.autoCompletePopup = new AutoCompletePopup(this.aceEditor);
             this.autoCompletePopup.show();
             this.autoCompletePopup.hide();
               
               
        }, this);
        
      
        this.addListener("appear", () => { session.sync() });
        session.on("errors", (errors) => { this.showErrors(errors)});
        this.addListener("resize", () => { this.resizeHandler(); });
 
    }

    setContent(content) {
        this.aceEditor.getSession().setValue(content);
    }

           
    getContent() {
        return this.aceEditor.getSession().getValue();
    }

    /**
     * Keep track of changes made to the content and update the 
     * worker if required.
     */
    private onChangeHandler(event) {
        if (! this.session.getChanged()) this.session.setChanged(true);
        
        
        this.pendingWorkerUpdate = true;

        if (this.session.mode !== "typescript") return;

        clearTimeout(this.updateSourceTimer);

        // Don't send too many updates to the worker, wait for people to 
        // finsih typing at least 1 second.
        this.updateSourceTimer = setTimeout(() => {
            if (this.pendingWorkerUpdate) this.update();
        }, 1000);
    }

    private createToolTip() {
        var tooltip = new qx.ui.tooltip.ToolTip("");
        tooltip.exclude();
        tooltip.setRich(true);
        tooltip.setMaxWidth(500);
        // tooltip.setWidth(300);
        this.setToolTip(tooltip);
        return tooltip;
    }

    private resizeHandler() {
        if (!this.isSeeable()) {
            this.addListenerOnce("appear", () => { this.resizeEditor();});
        } else {
             this.resizeEditor();   
        }
    }


    private resizeEditor() {
         setTimeout(() => {
            this.aceEditor.resize();
        }, 100);
    }


    setFontSize(size) {
        this.aceEditor.setFontSize(size + "px");
    }
    
    private setupEvents() {
        var session = this.aceEditor.getSession();
        session.on("changeOverwrite",(a)=>{
                IDE.infoBus.emit("editor.overwrite",session.getOverwrite());
        });
    }
    
    moveToPosition(pos: Ace.Position) {
        this.aceEditor.clearSelection();
        this.aceEditor.moveCursorToPosition(pos);
        this.aceEditor.centerSelection();
    }

    getPosition() {
        return this.aceEditor.getCursorPosition();
    }

       /**
         * Get the Position based on mouse x,y coordinates
         */
    getPositionFromScreenOffset(x: number, y: number): Ace.Position {
            var r = this.aceEditor.renderer;
            // var offset = (x + r.scrollLeft - r.$padding) / r.characterWidth;
            var offset = (x - r.$padding) / r.characterWidth;

            // @BUG: Quickfix for strange issue with top
            var correction = r.scrollTop ? 7 : 0;

            var row = Math.floor((y + r.scrollTop - correction) / r.lineHeight);
            var col = Math.round(offset);
            
            var docPos = this.aceEditor.getSession().screenToDocumentPosition(row, col);
            return docPos;
        }

        /**
         * Show info at Screen location
         */
        showToolTipAt(ev: MouseEvent) {
            // if (this.mode !== "typescript") return;

            var docPos = this.getPositionFromScreenOffset(ev.offsetX, ev.offsetY);
            var project = IDE.project;

            project.iSense.getTypeAtPosition(this.session.name, docPos,
                (err, data: Cats.TypeInfo) => {
                    if (!data) return;
                    var member = data.memberName;
                    if (!member) return;
                    
                    var tip = data.description;
                    if (data.docComment) {
                        tip += '<hr>' + data.docComment;
                    }
                    
                    if (tip && tip.trim()) {
                        var tooltip:qx.ui.tooltip.ToolTip = this.getToolTip();
                        if (! tooltip) tooltip = this.createToolTip();
                        tooltip.setLabel(tip);
                        tooltip.moveTo(ev.x, ev.y+10);
                        tooltip.show();
                    }
                    // IDE.mainEditor.toolTip.show(ev.x, ev.y, tip);
                });
        }


       /**
         * Update the worker with the latest version of the content of this 
         * session.
         */
        private update() {
            if (this.session.isTypeScript()) {
                var source = this.aceEditor.getSession().getValue();
                this.session.updateContent(source);
                clearTimeout(this.updateSourceTimer);
                this.pendingWorkerUpdate = false;
            };
        }

        /**
         * Perform code autocompletion. Right now support for TS.
         */
        showAutoComplete(cursor: Ace.Position) {
            
            if (! this.session.isTypeScript()) return;

            // Any pending changes that are not yet send to the worker?
            if (this.pendingWorkerUpdate) this.update();

            IDE.project.iSense.autoComplete(cursor, this.session.name, 
            (err, completes:TypeScript.Services.CompletionInfo) => {
                if (completes != null) this.autoCompletePopup.showCompletions(completes.entries);
            });
        }


     autoComplete() {
            if (this.session.mode === "typescript") {
                var cursor = this.aceEditor.getCursorPosition();
                this.showAutoComplete(cursor);
            }                        
        }

    autoComplete123() {
        // alert("auto complete");
        var cursor = this.aceEditor.getCursorPosition();
        var coords = this.aceEditor.renderer.textToScreenCoordinates(cursor.row, cursor.column);
        this.autoCompletePopup.moveTo(coords.pageX, coords.pageY);
        this.autoCompletePopup.show();
    }

       /**
         * Check if there are any errors for this session and show them.    
         */
        showErrors(result) {
            var annotations = [];
            result.forEach((error: Cats.FileRange) => {
                annotations.push({
                    row: error.range.start.row,
                    column: error.range.start.column,
                    type: error.severity === Cats.Severity.Error ? "error" : "warning",
                    text: error.message
                });
            });
            this.aceEditor.getSession().setAnnotations(annotations);
        }
       
       
          // Initialize the editor
        private createAceEditor(rootElement):Ace.Editor {
            var editor: Ace.Editor = ace.edit(rootElement);

            editor.commands.addCommands([
            {
                name: "autoComplete",
                bindKey: {
                    win: "Ctrl-Space",
                    mac: "Ctrl-Space" 
                },
                exec: () => { this.autoComplete() }
            },

           {
                name: "gotoDeclaration",
                bindKey: {
                    win: "F12",
                    mac: "F12"
                },
                exec: () => { this.gotoDeclaration() }
            },


            {
                name: "save",
                bindKey: {
                    win: "Ctrl-S",
                    mac: "Command-S"
                },
                exec: () =>  { this.session.persist() }
            }
            ]);
 
            
            var originalTextInput = editor.onTextInput;
            editor.onTextInput = (text) => {
                originalTextInput.call(editor, text);
                if (text === ".") this.autoComplete();
            };
            
        
            var elem = rootElement; // TODo find scroller child
            elem.onmousemove = this.onMouseMove.bind(this);
            elem.onmouseout = () => {
                if (this.getToolTip() && this.getToolTip().isSeeable()) this.getToolTip().exclude();
                clearTimeout(this.mouseMoveTimer);
            };
            
            return editor;
    }

  private gotoDeclaration() {        
        var session = this.session;
      
        session.project.iSense.getDefinitionAtPosition( session.name, this.getPosition(), (err, data:Cats.FileRange) => {
            if (data && data.fileName)
                IDE.openSession(data.fileName, data.range.start);
        });
    }

    private getInfoAt(type: string) {        
        
        IDE.problemPane.select("Search");
    
 
        this.session.project.iSense.getInfoAtPosition(type, this.session.name, this.getPosition(), (err, data:Cats.FileRange[]) => {
            console.debug("Called getInfoAt for with results #" + data.length);
            IDE.searchResult.setData(data);
        });
    }

    private findReferences() {
        return this.getInfoAt("getReferencesAtPosition");        
    }

    private findOccurences() {
        return this.getInfoAt("getOccurrencesAtPosition");        
    }


    private findImplementors() {
        return this.getInfoAt("getImplementorsAtPosition");        
    }

    private createContextMenuItem(name:string, fn:Function) {
        var button = new qx.ui.menu.Button(name);
        button.addListener("execute", fn)
        return button;
    }
    
    private createContextMenu() {
        var CMDS = Cats.Commands.CMDS;
        var menu = new qx.ui.menu.Menu();
    
        menu.add(this.createContextMenuItem("Goto Declaration", this.gotoDeclaration.bind(this)));
        menu.add(this.createContextMenuItem("Find References", this.findReferences.bind(this)));
        menu.add(this.createContextMenuItem("Find Occurences", this.findOccurences.bind(this)));
        menu.add(this.createContextMenuItem("FInd Implementations", this.findImplementors.bind(this)));
        
        this.setContextMenu(menu);
    }
  

    private onMouseMove(ev: MouseEvent) {
            if (this.getToolTip() && this.getToolTip().isSeeable()) this.getToolTip().exclude();
            clearTimeout(this.mouseMoveTimer);
            var elem = <HTMLElement>ev.srcElement;
            if (elem.className !== "ace_content") return;
            this.mouseMoveTimer = setTimeout(() => {
                this.showToolTipAt(ev);
            }, 800);
        }

}