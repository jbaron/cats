/**
 * The toolbar for CATS
 */
class StatusBar extends qx.ui.toolbar.ToolBar {

    modeInfo:qx.ui.toolbar.Button;
    overwriteInfo:qx.ui.toolbar.Button;
    positionInfo;
    busyInfo
    

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

    init() {
        
       this.positionInfo = this.createButton("1:1");
       this.add(this.positionInfo);
       
       this.modeInfo = this.createButton("No Mode");
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

        // Leftover past

        private render() {
            /*
            var act = <Cats.AceSession>IDE.activeSession;
            var session = act.editSession;
            if (session) {
                document.getElementById("sessionmode").innerText = session.getMode();
                document.getElementById("overwritemode").innerText = session.getOverwrite() ? "overwrite" : "insert";
                this.updateSelectionText();
            }
            */
        }


        private setupListeners() {
            IDE.infoBus.on("editor.overwrite", (value) => {
                if (value) 
                    this.overwriteInfo.setLabel("OVERWRITE");
                else 
                    this.overwriteInfo.setLabel("INESRT");
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