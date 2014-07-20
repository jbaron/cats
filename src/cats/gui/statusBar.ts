/**
 * The toolbar for CATS
 */
class StatusBar extends qx.ui.toolbar.ToolBar {

    constructor() {
        super();
        this.setPadding(0, 0, 0, 0);
        this.setMargin(0, 0, 0, 0);
        this.setDecorator(null);
        this.init();
    }

    init() {
       var positionButton = new qx.ui.toolbar.Button("1:1");
       positionButton.setPadding(1,1,1,1);
       positionButton.setMargin(0, 0, 0, 0);
       this.add(positionButton); 
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
            var act = <Cats.AceSession>IDE.activeSession;
            var session = act.editSession;
            if (session) {
                document.getElementById("sessionmode").innerText = session.getMode();
                document.getElementById("overwritemode").innerText = session.getOverwrite() ? "overwrite" : "insert";
                this.updateSelectionText();
            }
        }

        initStatusBar() {
            var overwriteMode = document.getElementById("overwritemode");
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
            
            IDE.on("sessions", (sessions: Cats.Session[]) => {
                if (sessions.length) {
                    // this.root.classList.remove("no-session");
                } else {
                    // this.root.classList.add("no-session");
                }
            })
        }
        
        private updateSelectionText() {
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
        }

}