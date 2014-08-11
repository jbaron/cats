class ConfigDialog extends qx.ui.window.Window {

    form = new qx.ui.form.Form();
    model: qx.core.Object;

    constructor(name: string) {
        super(name);

        // Layout
        var layout = new qx.ui.layout.Basic();
        this.setLayout(layout);
        this.setModal(true);
    }

    addCheckBox(label:string, model?:string) {
        var cb = new qx.ui.form.CheckBox();
        this.form.add(cb, label, null, model);
    }
    
    addSpinner(label:string, model:string, min:number, max:number) {
        var s = new qx.ui.form.Spinner();
        s.set({ minimum: min, maximum: max});
        this.form.add(s, label, null, model);
    }
    
    addTextField(label:string, model:string) {
        var t = new qx.ui.form.TextField();
        this.form.add(t, label, null, model); 
    }
    
    setData(data) {
        for (var key in data) {
            try {
                this.model.set(key, data[key]);
            } catch (err) { /* NOP */ }
        }
    }
    
    finalStep() {
        var controller = new qx.data.controller.Form(null, this.form);
        this.model = controller.createModel();
        
           // Save button
        var okbutton = new qx.ui.form.Button("Ok");
        this.form.addButton(okbutton);
        okbutton.addListener("execute", function() {
            if (this.form.validate()) {
                var usrData = qx.util.Serializer.toJson(this.model);
                this.fireDataEvent("changeUserData", usrData);
                this.close();
            };
        }, this);

        // Cancel button
        var cancelbutton = new qx.ui.form.Button("Cancel");
        this.form.addButton(cancelbutton);
        cancelbutton.addListener("execute", function() {
            this.close();
        }, this);

        var renderer = new qx.ui.form.renderer.Single(this.form);
        this.add(renderer);
    }
    
    
    
}


class ConfigCompilerSettings extends ConfigDialog {

    constructor() {
        super("Compiler Settings");
        this.createForm();
        this.finalStep();
    }

    createForm() {
        this.addCheckBox("Use default lib", "useDefaultLib");
        this.addCheckBox("removeComments", "removeComments");
        this.addCheckBox("noImplicitAny", "noImplicitAny");
        this.addCheckBox("generateDeclarationFiles", "generateDeclarationFiles");
        this.addCheckBox("mapSourceFiles", "mapSourceFiles");
        this.addCheckBox("removeComments", "removeComments");
        this.addCheckBox("propagateEnumConstants", "propagateEnumConstants");
        this.addSpinner("codeGenTarget", "codeGenTarget", 0, 1);
        this.addSpinner("moduleGenTarget", "moduleGenTarget", 0, 2);
        this.addTextField("outDirOption", "outDirOption");
        this.addTextField("outFileOption", "outFileOption");
    }
}







