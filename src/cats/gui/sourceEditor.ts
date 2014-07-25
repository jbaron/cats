/**
 * Wrapper around the ACE editor. The rest of the code base should not use
 * ACE editor directly so it can be easily changed for another editor if required.
 */
class SourceEditor extends qx.ui.embed.Html {

    private aceEditor:Ace.Editor;
    private popup:qx.ui.popup.Popup;
    private autoCompleteView: Cats.UI.AutoCompleteView;
    private container;
    private mouseMoveTimer;
    private updateSourceTimer;
    private pendingWorkerUpdate = false;

    constructor(private session:Cats.Session, pos?:Cats.Position) {
        super("");
        this.setDecorator(null);
        this.setFont(null);
        this.setAppearance(null);
        this.addListenerOnce("appear", () => {
            this.container = this.getContentElement().getDomElement();
            // create the editor
            this.aceEditor = this.createAceEditor(this.container);
            this.aceEditor.getSession().setMode("ace/mode/typescript");
            // this.aceEditor.getSession().setValue(this.getContent());
            this.aceEditor.getSession();
            this.setContent(session.getValue());
            
            this.autoCompleteView = new Cats.UI.AutoCompleteView(this.aceEditor);
             // this.setupInputHandling();
              if (session.mode === "typescript") this.createContextMenu();
              if (pos) this.moveToPosition(pos);
        }, this);
        
        this.popup = new qx.ui.popup.Popup(new qx.ui.layout.Flow());
        this.popup.add(new qx.ui.basic.Label("Code completion"));
  
        this.setToolTip(new qx.ui.tooltip.ToolTip(""));
        this.getToolTip().exclude();
        this.getToolTip().setRich(true);
        this.getToolTip().setWidth(200);
        
        
        this.addListener("resize", () => { this.resizeHandler();});
        // this.addListener("resize", () => { this.resizeEditor();});
        // this.addListener("appear", () => { this.resizeEditor() });
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

    getSession() : Cats.Session {
        return this.session;
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
                        tip += "\n" + data.docComment;
                    }
                    
                    if (tip && tip.trim()) {
                        var tooltip:qx.ui.tooltip.ToolTip = this.getToolTip();
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
        update() {
            if (this.session.mode === "typescript") {
                var source = this.aceEditor.getSession().getValue();
                IDE.project.iSense.updateScript(this.session.name, source);
                clearTimeout(this.updateSourceTimer);
                this.pendingWorkerUpdate = false;
            };
        }


        /**
         * Perform code autocompletion. Right now support for TS.
         */
        showAutoComplete(cursor: Ace.Position, view: Cats.UI.AutoCompleteView) {
            
            if (this.session.mode !== "typescript") return;

            // Any pending changes that are not yet send to the worker?
            if (this.pendingWorkerUpdate) this.update();

            IDE.project.iSense.autoComplete(cursor, this.session.name, 
            (err, completes:TypeScript.Services.CompletionInfo) => {
                if (completes != null) view.showCompletions(completes.entries);
            });
        }


     autoComplete() {
            if (this.session.mode === "typescript") {
                var cursor = this.aceEditor.getCursorPosition();
                this.showAutoComplete(cursor, this.autoCompleteView);
            }                        
        }

    autoComplete123() {
        // alert("auto complete");
        var cursor = this.aceEditor.getCursorPosition();
        var coords = this.aceEditor.renderer.textToScreenCoordinates(cursor.row, cursor.column);
        this.popup.moveTo(coords.pageX, coords.pageY);
        this.popup.show();
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
                exec: () => { Cats.Commands.runCommand(Cats.Commands.CMDS.navigate_declaration) }
            },


            {
                name: "save",
                bindKey: {
                    win: "Ctrl-S",
                    mac: "Command-S"
                },
                exec: () =>  { Cats.Commands.runCommand(Cats.Commands.CMDS.file_save) }
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
                this.getToolTip().exclude();
                clearTimeout(this.mouseMoveTimer);
            };
            

            return editor;
    }

    setContent(value:string) {
        this.aceEditor.getSession().setValue(value);
    }
    
    private createContextMenuItem(name, commandID) {
        var button = new qx.ui.menu.Button(name);
        var command = Cats.Commands.get(commandID).command;
        button.addListener("execute", () =>{
           command();
        });
        return button;
    }
    
    private createContextMenu() {
        var CMDS = Cats.Commands.CMDS;
        var menu = new qx.ui.menu.Menu();
    
        menu.add(this.createContextMenuItem("Goto Declaration", CMDS.navigate_declaration));
        menu.add(this.createContextMenuItem("Find References", CMDS.navigate_references));
        menu.add(this.createContextMenuItem("Find Occurences", CMDS.navigate_occurences));
        menu.add(this.createContextMenuItem("FInd Implementations", CMDS.navigate_implementors));
        
        this.setContextMenu(menu);
    }
  

    private onMouseMove(ev: MouseEvent) {
            this.getToolTip().exclude();
            clearTimeout(this.mouseMoveTimer);
            var elem = <HTMLElement>ev.srcElement;
            if (elem.className !== "ace_content") return;
            this.mouseMoveTimer = setTimeout(() => {
                this.showToolTipAt(ev);
            }, 800);
        }

}