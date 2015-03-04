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
     * This class represents the configuration windows for the project specific 
     * settings.
     */
    export class ProjectSettingsDialog extends ConfigDialog {

        private compilerSettings: ConfigDialogPage;
        private projectSettings: ConfigDialogPage;
        private codeFormatSettings: ConfigDialogPage;
        private customBuild: ConfigDialogPage;
        private customRun: ConfigDialogPage;
        private documentationSettings: ConfigDialogPage;
        private tslintSettings:TSLintSettings;

        constructor(private project: Cats.Project) {
            super(super.tr("project_settings"));
            this.loadValues();
        }

        private loadValues() {
            var config = this.project.config;
            this.projectSettings.setData(config);
            this.compilerSettings.setData(config.compiler);
            this.codeFormatSettings.setData(config.codeFormat);
            this.tslintSettings.setData(config.tslint);
            this.customBuild.setData(config.customBuild);
            this.customRun.setData(config.customRun);
            this.documentationSettings.setData(config.documentation);
            
        }

        protected saveValues() {
            var config: Cats.ProjectConfiguration = this.projectSettings.getData();
            config.compiler = this.compilerSettings.getData();
            config.codeFormat = this.codeFormatSettings.getData();
            config.customBuild = this.customBuild.getData();
            config.customRun = this.customRun.getData();
            config.documentation = this.documentationSettings.getData();
            config.tslint = this.tslintSettings.getData();
            IDE.project.updateConfig(config);
        }

        protected addTabs() {
            var tab = new qx.ui.tabview.TabView();

            this.compilerSettings = new ProjectCompilerSettings();
            tab.add(this.compilerSettings);

            this.projectSettings = new ProjectGeneric();
            tab.add(this.projectSettings);

            this.codeFormatSettings = new CodeFormatSettings();
            tab.add(this.codeFormatSettings);

            this.tslintSettings = new TSLintSettings();
            tab.add(this.tslintSettings);

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
            { label: "none", model: ts.ModuleKind.None },
            { label: "commonjs", model: ts.ModuleKind.CommonJS },
            { label: "amd", model: ts.ModuleKind.AMD }
        ];

        private jsTarget = [
            { label: "es3", model: ts.ScriptTarget.ES3 },
            { label: "es5", model: ts.ScriptTarget.ES5 },
            { label: "es6", model: ts.ScriptTarget.ES6 }
        ];

        constructor() {
            super("Compiler");
            this.createForm();
            this.finalStep();
        }

        createForm() {
            this.addCheckBox("noLib");
            this.addCheckBox("removeComments");
            this.addCheckBox("noImplicitAny");
            this.addCheckBox("declaration");
            this.addCheckBox("sourceMap");
            this.addCheckBox("propagateEnumConstants");
            this.addCheckBox("allowAutomaticSemicolonInsertion");
            this.addSelectBox("target", this.jsTarget);
            this.addSelectBox("module", this.moduleGenTarget);
            this.addTextField("outDir");
            this.addTextField("out");
        }
    }

    /**
     * The generic project settings
     */
    class ProjectGeneric extends ConfigDialogPage {

        private projectType = [
            { label: "standard", model: "standard" },
            { label: "webworker", model: "webworker" },
            { label: "ECMAScript", model: "core" },
            { label: "scriptHost", model: "scriptHost" },
           // { label: "IE10", model: "dom" },
            { label: "none", model: "none" }
        ];


        constructor() {
            super("Generic");
            this.createForm();
            this.finalStep();
        }

        createForm() {
            this.addTextField("src");
            this.addTextField("main");
            this.addCheckBox("buildOnSave");
            this.addSelectBox("projectType", this.projectType);
        }
    }

    /**
     * The different settings so all developers checking the same code format and 
     * standards.
     */
    class CodeFormatSettings extends ConfigDialogPage {

        private newLineMode = [
            { label: "Linux/OSX", model: "\n" },
            { label: "Dos/Windows", model: "\r\n" },
        ];

        constructor() {
            super("Code Formatting");
            this.createForm();
            this.finalStep();
        }

        createForm() {
            this.addSelectBox("NewLineCharacter", this.newLineMode);
            this.addCheckBox("ConvertTabsToSpaces");
            this.addSpinner("IndentSize", 1, 16);
            this.addSpinner("TabSize", 1, 16);
            // this.addCheckBox2("InsertSpaceAfterCommaDelimiter");
            // this.addCheckBox2("InsertSpaceAfterFunctionKeywordForAnonymousFunctions");
            // this.addCheckBox2("")
        }
    }

    /**
     * The configuration for TSLint
     */
    class TSLintSettings extends ConfigDialogPage {

        constructor() {
            super("TSLint Settings");
            this.createForm();
            this.finalStep();
        }

        createForm() {
            this.addCheckBox("useLint");
            this.addTextField("lintFile");
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
            this.addCheckBox("includeDeclarations");
            this.addTextField("outputDirectory");
            this.addTextField("readme");
            this.addSelectBox("theme", this.themes);

        }
    }


    class CustomBuildSettings extends ConfigDialogPage {

        constructor(name= "Custom Build") {
            super(name);
            this.createForm();
            this.finalStep();
        }

        createForm() {
            this.addTextField("name");
            this.addTextField( "command");
            this.addTextField( "directory");
            this.addTextField( "environment");
            this.addCheckBox("ownConsole");
        }
    }

    class CustomRunSettings extends CustomBuildSettings {

        constructor() {
            super("Custom Run");
        }

    }
}
