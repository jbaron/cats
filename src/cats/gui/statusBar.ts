/**
 * The toolbar for CATS
 */
class StatusBar extends qx.ui.toolbar.ToolBar {

    private modeInfo:qx.ui.toolbar.Button;
    private overwriteInfo:qx.ui.toolbar.Button;
    private positionInfo;
    private busyInfo
    

    constructor() {
        super();
        this.init();
        this.setupListeners();
    }

    private createButton(label?:string, icon?:string) {
        var button = new qx.ui.toolbar.Button(label,icon);
        // button.setPadding(1,1,1,1);
        button.setMargin(0, 10, 0, 10);
        button.setMinWidth(100);
        button.setDecorator(null);
        return button;
    }

    private init() {
        
       this.positionInfo = this.createButton("-:-");
       this.add(this.positionInfo);
       
       this.modeInfo = this.createButton("Unknown");
       this.add(this.modeInfo);
       this.addSpacer();

       this.busyInfo = this.createButton("","./resource/cats/loader.gif");
       this.busyInfo.setShow("icon");
       this.add(this.busyInfo);

       this.overwriteInfo = this.createButton("INSERT");
       this.add(this.overwriteInfo);
       
       
    }


    setBusy(busy:boolean) {
        if (busy) {
            this.busyInfo.setIcon("./resource/cats/loader_anim.gif");
        } else {
            this.busyInfo.setIcon("./resource/cats/loader.gif");
        }
    }

    toggle() {
        if (this.isVisible()) { 
            this.exclude();    
        } else {
            this.show();
        }
    }


    private setupListeners() {
        IDE.infoBus.on("editor.overwrite", (value:boolean) => {
            this.overwriteInfo.setLabel(value ? "OVERWRITE" : "INSERT");
        });
        
        IDE.infoBus.on("editor.mode" , (value:string) => {
            this.modeInfo.setLabel(value.toUpperCase());
        });
        
        IDE.infoBus.on("editor.position", (value:Ace.Position) => {
             var label = (value.row +1) + ":" + (value.column+1);
             this.positionInfo.setLabel(label);
        });
        
    }

        initStatusBar() {
            var overwriteMode = document.getElementById("overwritemode");
            
            /*
            infoBus.SESSION.on("overwrite",(mode: boolean) => {
                overwriteMode.innerText = mode ? "overwrite" : "insert";
            });
            

            overwriteMode.onclick = (e:MouseEvent)=>{
              var s = <Cats.AceSession>IDE.activeSession;
              if (s && s.editSession) s.editSession.setOverwrite(! s.editSession.getOverwrite());
            };

            var aceEditor = <any>IDE.mainEditor.aceEditor;
            aceEditor.on("changeSelection", this.updateSelectionText);

            var sessionMode = document.getElementById("sessionmode");
            aceEditor.on("changeMode", () => {
                var mode = aceEditor.getSession().getMode();
                sessionMode.innerText = PATH.basename(mode.$id);
            });

            var recordingMode = document.getElementById("recordingmode");
            aceEditor.on("changeStatus", () => {
                setTimeout(() => {
                    recordingMode.innerText = aceEditor.commands.recording ? "RECORDING" : "";
                }, 100);
            });
            recordingMode.onclick = (e:MouseEvent) => {
                aceEditor.commands.toggleRecording(aceEditor);
            };
            */    
        }
        
        
        private updateSelectionText() {
        /*
            var aceEditor = <any>IDE.mainEditor.aceEditor;
            var lead = aceEditor.selection.lead;
            var text: string;
            
            if (aceEditor.selection.isEmpty()) {
                text = (lead.row + 1) + " : " + (lead.column + 1);
            } else {
                var copyText = aceEditor.getCopyText();
                var length = copyText.replace("\n", "").length;
                
                text = copyText.split("\n").length + " × " + (lead.column + 1) + " [" + copyText.replace(/\r?\n/g, "").length + "]";
            }
            
            document.getElementById("selection").innerText = text;
        */
        }
        
        
}