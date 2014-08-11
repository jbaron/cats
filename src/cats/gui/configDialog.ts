/**
 * Base class for all the configuration dialogs forms in
 * CATS.
 */ 
class ConfigDialog extends qx.ui.window.Window {

    constructor(name) {
        super(name);

        // Layout
        // var layout = new qx.ui.layout.Basic();
        var layout = new qx.ui.layout.VBox();
        this.setLayout(layout);
        this.setModal(true);
        
        this.addTabs();
        this.addButtons();
    }
    
    addTabs() {
        // to do in subclasses;
    }
    

    addButtons() {
             // Save button
        var form = new qx.ui.form.Form();     
        var okbutton = new qx.ui.form.Button("Ok");
        form.addButton(okbutton);
        okbutton.addListener("execute", () => {
            if (form.validate()) {
                // var usrData = qx.util.Serializer.toJson(this.model);
                // this.fireDataEvent("changeUserData", usrData);
                this.close();
            };
        }, this);

        // Cancel button
        var cancelbutton = new qx.ui.form.Button("Cancel");
        form.addButton(cancelbutton);
        cancelbutton.addListener("execute", function() {
            this.close();
        }, this);
        
        var renderer = new qx.ui.form.renderer.Single(form);
        this.add(renderer);
        // this.add(form);
    }
    
}

class ProjectConfigDialog extends ConfigDialog {
     constructor() {
        super("Project Settings");
     }
     
     
     addTabs() {
        var tab = new qx.ui.tabview.TabView();
        tab.add(new ConfigCompilerSettings());
        tab.add(new ProjectSettings());
        tab.add(new CustomBuildSettings());
        tab.add(new CustomRunSettings());
        this.add(tab); 
     }
}


class IdeConfigDialog extends ConfigDialog {
     constructor() {
        super("CATS Settings");
     }
     
     
     addTabs() {
        var tab = new qx.ui.tabview.TabView();
        tab.add(new EditorSettings());
        tab.add(new IDEGenericSettings());
        this.add(tab); 
     }
}



class ConfigDialogPage extends qx.ui.tabview.Page {
   
    form = new qx.ui.form.Form();
    model: qx.core.Object;

    constructor(name:string) {
        super(name);
        this.setLayout(new qx.ui.layout.Canvas());
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
        t.setWidth(200);
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
        var renderer = new qx.ui.form.renderer.Single(this.form);
        this.add(renderer);
    }
    
    
    
}

/**
 * Dialog window to set the compiler settings
 */ 
class ConfigCompilerSettings extends ConfigDialogPage {

    constructor() {
        super("Compiler");
        this.createForm();
        this.finalStep();
    }

    createForm() {
        this.addCheckBox("Don't include lib.d.ts", "noLib");
        this.addCheckBox("Remove comments", "removeComments");
        this.addCheckBox("Don't allow implicit any", "noImplicitAny");
        this.addCheckBox("Generate declaration files", "generateDeclarationFiles");
        this.addCheckBox("Generate map source files", "mapSourceFiles");
        this.addCheckBox("Propagate enum constants", "propagateEnumConstants");
        this.addSpinner("ES5/ES6 target", "codeGenTarget", 0, 1);
        this.addSpinner("No module/commonjs/amd", "moduleGenTarget", 0, 2);
        this.addTextField("Output to directory", "outDirOption");
        this.addTextField("Output to single file", "outFileOption");
    }
}



class ProjectSettings extends ConfigDialogPage {

    constructor() {
        super("Generic");
        this.createForm();
        this.finalStep();
    }

    createForm() {
        this.addTextField("Source Path", "src");
        this.addTextField("Startup HTML page", "main");
        this.addTextField("Completion Mode", "completionMode");
    }
}


class CustomBuildSettings extends ConfigDialogPage {

    constructor(name="Custom Build") {
        super(name);
        this.createForm();
        this.finalStep();
    }

    createForm() {
        this.addTextField("Name", "name");
        this.addTextField("Commandline", "commmand");
        this.addTextField("Working directory", "directory");
        this.addTextField("Environment variables", "environment");
        this.addCheckBox("Own output console", "ownConsole");
    }
} 

class CustomRunSettings extends CustomBuildSettings {

    constructor() {
        super("Custom Run");
    }

} 

class EditorSettings extends ConfigDialogPage {

    constructor() {
        super("Editor");
        this.createForm();
        this.finalStep();
    }

    createForm() {
        this.addSpinner("Font size", "fontSize", 6, 24);
        this.addSpinner("Right Margin", "rightMargin", 40, 240);
    }
} 

class IDEGenericSettings extends ConfigDialogPage {

    constructor() {
        super("Generic");
        this.createForm();
        this.finalStep();
    }

    createForm() {
        this.addTextField("Theme", "theme");
        this.addCheckBox("Strict Code Completion", "usestrictCompletionRules");
    }
} 


