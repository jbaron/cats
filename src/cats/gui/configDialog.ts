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
        this.addListener("resize", this.center);

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
    
    addSelectBox(label:string, model:string, items:Array<any>) {
        var s = new qx.ui.form.SelectBox();
        items.forEach((item) => {
            var listItem = new qx.ui.form.ListItem(item.label, null,item.model);
            s.add(listItem);
        });
        this.form.add(s,label, null, model)
    }
    
    setData(data:any) {
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

// ########################################################################
// #########   Project Settings
// #########################################################################


class ProjectConfigDialog extends ConfigDialog {

    private compilerSettings:ConfigDialogPage;
    private projectSettings:ConfigDialogPage;
    private codingStandards:ConfigDialogPage;
    private customBuild: ConfigDialogPage;
    private customRun: ConfigDialogPage;

     constructor(private project:Cats.Project) {
        super("Project Settings");
        this.loadValues();
     }
     
     private loadValues() {
         var config = this.project.config
         this.projectSettings.setData(config);
         this.compilerSettings.setData(config.compiler);
         this.codingStandards.setData(config.codingStandards);
         this.customBuild.setData(config.customBuild);
         this.customRun.setData(config.customRun);
     }
     
     addTabs() {
        var tab = new qx.ui.tabview.TabView();
        
        this.compilerSettings = new ProjectCompilerSettings();
        tab.add(this.compilerSettings);
        
        this.projectSettings = new ProjectGeneric();
        tab.add(this.projectSettings);
        
        this.codingStandards = new CodingStandardsSettings();
        tab.add(this.codingStandards);
        
        this.customBuild = new CustomBuildSettings();
        tab.add(this.customBuild);
        
        this.customRun = new CustomRunSettings();
        tab.add(this.customRun);
        
        this.add(tab); 
     }
}



/**
 * Dialog window to set the compiler settings
 */ 
class ProjectCompilerSettings extends ConfigDialogPage {

    private moduleGenTarget = [
        {label:"none", model : 0},
        {label:"commonjs", model : 1},
        {label:"amd", model : 2},
    ];
    
    private jsTarget = [
        {label:"es5", model : 0},
        {label:"es6", model : 1},
    ];

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
        this.addSelectBox("JavaScript target", "codeGenTarget", this.jsTarget);
        this.addSelectBox("Module generation", "moduleGenTarget", this.moduleGenTarget);
        this.addTextField("Output to directory", "outDirOption");
        this.addTextField("Output to single file", "outFileOption");
    }
}



class ProjectGeneric extends ConfigDialogPage {

    constructor() {
        super("Generic");
        this.createForm();
        this.finalStep();
    }

    createForm() {
        this.addTextField("Source Path", "src");
        this.addTextField("Startup HTML page", "main");
    }
}


class CodingStandardsSettings extends ConfigDialogPage {

    private newLineMode = [
        {label:"auto", model : "auto"},
        {label:"unix", model : "unix"},
        {label:"dos", model : "dos"},
    ];

    constructor() {
        super("Coding Standards");
        this.createForm();
        this.finalStep();
    }

    createForm() {
        this.addSelectBox("Newline mode","newLineMode", this.newLineMode);
        this.addCheckBox("Use soft tabs","useSoftTabs");
        this.addSpinner("Tab size", "tabSize", 1, 16);
        this.addCheckBox("Use TSLint","useLint");
        this.addTextField("TSLint configuration file", "lintFile");
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
        this.addTextField("Command line", "command");
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


// ########################################################################
// #########   IDE Settings
// #########################################################################

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

class EditorSettings extends ConfigDialogPage {
    private completionMode = [
        {label:"strict", model : "strict"},
        {label:"forgiven", model : "forgiven"}
    ];


    constructor() {
        super("Editor");
        this.createForm();
        this.finalStep();
    }

    createForm() {
        this.addSpinner("Font size", "fontSize", 6, 24);
        this.addSpinner("Right Margin", "rightMargin", 40, 240);
        this.addSelectBox("Code completion mode", "completionMode",this.completionMode);
        
    }
} 

class IDEGenericSettings extends ConfigDialogPage {

    private theme = [
        {label:"CATS", model : "Cats"},
        {label:"Classic", model : "Classic"}
    ];


    constructor() {
        super("Generic");
        this.createForm();
        this.finalStep();
    }

    createForm() {
        this.addSelectBox("Theme", "theme", this.theme);
        this.addCheckBox("Remember open files","rememberOpenFiles");
        this.addCheckBox("Build On save","buildOnSave");
    }
} 


