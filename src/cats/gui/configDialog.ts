// Copyright (c) JBaron.  All rights reserved.
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//

module Cats.Gui {
    
    /**
     * Base class for all the configuration dialogs forms in
     * CATS.
     */
    export class ConfigDialog extends qx.ui.window.Window {

        constructor(name) {
            super(name);

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

        saveValues() {
            // to do in subclass
        }

        addButtons() {
            // Save button
            var form = new qx.ui.form.Form();
            var okbutton = new qx.ui.form.Button("Ok");
            form.addButton(okbutton);
            okbutton.addListener("execute", () => {
                if (form.validate()) {
                    this.saveValues();
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


    /**
     * Base class for all configuration tab pages. Contains a number
     * of helper methods to quickly add a form element.
     */
    class ConfigDialogPage extends qx.ui.tabview.Page {

        form = new qx.ui.form.Form();
        model: qx.core.Object;

        constructor(name: string) {
            super(name);
            this.setLayout(new qx.ui.layout.Canvas());
        }

        addCheckBox(label: string, model?: string) {
            var cb = new qx.ui.form.CheckBox();
            this.form.add(cb, label, null, model);
        }
        
        addCheckBox2(model: string) {
            var cb = new qx.ui.form.CheckBox();
            var label = this.tr("config_" + model);
            this.form.add(cb, label, null, model);
        }

        addSpinner(label: string, model: string, min: number, max: number) {
            var s = new qx.ui.form.Spinner();
            s.set({ minimum: min, maximum: max });
            this.form.add(s, label, null, model);
        }

        addTextField(label: string, model: string) {
            var t = new qx.ui.form.TextField();
            t.setWidth(200);
            this.form.add(t, label, null, model);
        }

        addSelectBox(label: string, model: string, items: Array<any>) {
            var s = new qx.ui.form.SelectBox();
            items.forEach((item) => {
                var listItem = new qx.ui.form.ListItem(item.label, null, item.model);
                s.add(listItem);
            });
            this.form.add(s, label, null, model);
        }

        setData(data: any) {
            for (var key in data) {
                try {
                    this.model.set(key, data[key]);
                } catch (err) { /* NOP */ }
            }
        }

        /**
         * Get the data back as a JSON object
         */
        getData() {
            var result = JSON.parse(qx.util.Serializer.toJson(this.model));
            return result;
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

    /**
     * This class represents the configuration windows for the project specific 
     * settings.
     */
    export class ProjectSettingsDialog extends ConfigDialog {

        private compilerSettings: ConfigDialogPage;
        private projectSettings: ConfigDialogPage;
        private codingStandards: ConfigDialogPage;
        private customBuild: ConfigDialogPage;
        private customRun: ConfigDialogPage;
        private documentationSettings: ConfigDialogPage;

        constructor(private project: Cats.Project) {
            super(super.tr("project_settings"));
            this.loadValues();
        }

        private loadValues() {
            var config = this.project.config;
            this.projectSettings.setData(config);
            this.compilerSettings.setData(config.compiler);
            this.codingStandards.setData(config.codingStandards);
            this.customBuild.setData(config.customBuild);
            this.customRun.setData(config.customRun);
            this.documentationSettings.setData(config.documentation);
        }

        saveValues() {
            var config: Cats.ProjectConfiguration = this.projectSettings.getData();
            config.compiler = this.compilerSettings.getData();
            config.codingStandards = this.codingStandards.getData();
            config.customBuild = this.customBuild.getData();
            config.customRun = this.customRun.getData();
            config.documentation = this.documentationSettings.getData();
            IDE.project.updateConfig(config);
        }

        addTabs() {
            var tab = new qx.ui.tabview.TabView();

            this.compilerSettings = new ProjectCompilerSettings();
            tab.add(this.compilerSettings);

            this.projectSettings = new ProjectGeneric();
            tab.add(this.projectSettings);

            this.codingStandards = new CodingStandardsSettings();
            tab.add(this.codingStandards);

            this.documentationSettings = new DocumentationSettings();
            tab.add(this.documentationSettings);

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
            { label: "none", model: ts.ModuleGenTarget.Unspecified },
            { label: "commonjs", model: ts.ModuleGenTarget.Synchronous },
            { label: "amd", model: ts.ModuleGenTarget.Asynchronous },
        ];

        private jsTarget = [
            { label: "es3", model: ts.ScriptTarget.ES3 },
            { label: "es5", model: ts.ScriptTarget.ES5 },
        ];

        constructor() {
            super("Compiler");
            this.createForm();
            this.finalStep();
        }

        createForm() {
            this.addCheckBox2("noLib");
            this.addCheckBox2("removeComments");
            this.addCheckBox2("noImplicitAny");
            this.addCheckBox2("generateDeclarationFiles");
            this.addCheckBox2("mapSourceFiles");
            this.addCheckBox2("propagateEnumConstants");
            this.addCheckBox2("allowAutomaticSemicolonInsertion");
            this.addSelectBox("JavaScript target", "target", this.jsTarget);
            this.addSelectBox("Module generation", "module", this.moduleGenTarget);
            this.addTextField("Output to directory", "outDir");
            this.addTextField("Output to single file", "out");
        }
    }

    /**
     * The generic project settings
     */
    class ProjectGeneric extends ConfigDialogPage {

        constructor() {
            super("Generic");
            this.createForm();
            this.finalStep();
        }

        createForm() {
            this.addTextField("Source Path", "src");
            this.addTextField("Startup HTML page", "main");
            this.addCheckBox("Build on save", "buildOnSave");
        }
    }

    /**
     * The different settings so all developers checking the same code format and 
     * standards.
     */
    class CodingStandardsSettings extends ConfigDialogPage {

        private newLineMode = [
            { label: "auto", model: "auto" },
            { label: "unix", model: "unix" },
            { label: "dos", model: "dos" },
        ];

        constructor() {
            super("Coding Standards");
            this.createForm();
            this.finalStep();
        }

        createForm() {
            this.addSelectBox("Newline mode", "newLineMode", this.newLineMode);
            this.addCheckBox("Use soft tabs", "useSoftTabs");
            this.addSpinner("Tab size", "tabSize", 1, 16);
            this.addCheckBox("Use TSLint", "useLint");
            this.addTextField("TSLint configuration file", "lintFile");
        }
    }

    /**
     * The various settings for the documentation generation tool (TypeDoc).
     */
    class DocumentationSettings extends ConfigDialogPage {

        private themes = [
            { label: "Default", model: "default" },
            //  {label:"Minimal", model : "minimal"} causes loop @TODO
        ];

        constructor() {
            super("Documentation Settings");
            this.createForm();
            this.finalStep();
        }

        createForm() {
            this.addCheckBox("Include declarations", "includeDeclarations");
            this.addTextField("Output directory", "outputDirectory");
            this.addTextField("Readme file", "readme");
            this.addSelectBox("Documentation theme", "theme", this.themes);

        }
    }


    class CustomBuildSettings extends ConfigDialogPage {

        constructor(name= "Custom Build") {
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

    /**
     * The main class for the IDE configuration window. This window allows to configure 
     * all kind of personal settings and preferences.
     */
    export class IdePreferencesDialog extends ConfigDialog {

        private ideGenericSettings: ConfigDialogPage;
        private editorSettings: ConfigDialogPage;

        constructor(private config: Cats.IDEConfiguration) {
            super("CATS Settings");
            this.loadValues();

        }

        private loadValues() {
            var config = this.config;
            this.editorSettings.setData(config.editor);
            this.ideGenericSettings.setData(config);
        }

        saveValues() {
            var config: Cats.IDEConfiguration = this.ideGenericSettings.getData();
            config.editor = this.editorSettings.getData();
            IDE.updatePreferences(config);
        }


        addTabs() {
            var tab = new qx.ui.tabview.TabView();
            this.ideGenericSettings = new GenericPreferences;
            this.editorSettings = new EditorPreferences;

            tab.add(this.ideGenericSettings);
            tab.add(this.editorSettings);
            this.add(tab);
        }
    }

    /**
     * This class contains the configuration page for the overal IDE
     */
    class GenericPreferences extends ConfigDialogPage {

        private themes = [
            { label: "CATS", model: "cats" },
            { label: "Gray", model: "gray" },
            { label: "Classic", model: "classic" },
            { label: "Modern", model: "modern" },
            { label: "Indigo", model: "indigo" },
            { label: "Simple", model: "simple" }
        ];

        private locales = [
            { label: "English", model: "en" }
        ];

        constructor() {
            super("Generic");
            this.createForm();
            this.finalStep();
        }

        createForm() {
            this.addSelectBox("Global theme", "theme", this.themes);
            this.addSelectBox("Locale", "locale", this.locales);
            this.addCheckBox("Remember open files", "rememberOpenFiles");
            this.addCheckBox("Remember layout", "rememberLayout");
        }
    }

    /**
     * This class contains the configuration page for the source editor
     */
    class EditorPreferences extends ConfigDialogPage {
        private completionMode = [
            { label: "strict", model: "strict" },
            { label: "forgiven", model: "forgiven" }
        ];

        private theme = [
            { model: "chrome", label: "Chrome" },
            { model: "clouds", label: "Clouds" },
            { model: "crimson_editor", label: "Crimson Editor" },
            { model: "dreamweaver", label: "Dreamweaver" },
            { model: "eclipse", label: "Eclipse" },
            { model: "github", label: "GitHub" },
            { model: "textmate", label: "TextMate" },
            { model: "xcode", label: "XCode" },
        ];

        constructor() {
            super("Source Editor");
            this.createForm();
            this.finalStep();
        }

        createForm() {
            this.addSpinner("Font size", "fontSize", 6, 24);
            this.addSpinner("Right Margin", "rightMargin", 40, 240);
            this.addSelectBox("Editor Theme", "theme", this.theme);
            this.addSelectBox("Code completion mode", "completionMode", this.completionMode);

        }
    }

}
