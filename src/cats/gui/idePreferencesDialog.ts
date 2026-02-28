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


    interface Theme {
        model:string;
        label:string;
    }

    /**
     * This class contains the configuration page for the overal IDE
     */
    class GenericPreferences extends ConfigDialogPage {

 
        private locales = [
            { label: "English", model: "en" }
        ];

        constructor() {
            super("Generic");
            this.createForm();
            this.finalStep();
        }


        private getThemes() {
            var themes = IDE.getThemes().map((theme) =>  { return {
                label: theme.name,
                model: theme.name
            }});
            return themes;
        }

        createForm() {
            this.addSelectBox("theme", this.getThemes());
            this.addSpinner("fontSize", 6, 24);
            this.addSelectBox("locale", this.locales);
            this.addCheckBox("rememberOpenFiles");
            this.addCheckBox("rememberLayout");
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

        private newLineMode = [
            { label: "Linux/OSX", model: "\n" },
            { label: "Dos/Windows", model: "\r\n" },
        ];


        private getThemes() {
            var themelist:ace.ThemeList = ace.require("ace/ext/themelist");
            var result:Array<Theme> = [];
            themelist.themes.forEach((x) => { 
                var label = x.caption;
                if (x.isDark) label += " (dark)";
                result.push({model:x.theme, label:label}); 
            });
            return result;
        }

        constructor() {
            super("Source Editor");
            this.createForm();
            this.finalStep();
        }

        createForm() {
            this.addSpinner("fontSize", 6, 24);
            this.addSpinner( "rightMargin", 40, 240);
            this.addSelectBox("completionMode", this.completionMode);
            // this.addSelectBox("NewLineCharacter", this.newLineMode);
            // this.addCheckBox("ConvertTabsToSpaces");
            // this.addSpinner("IndentSize", 1, 16);
            // this.addSpinner("TabSize", 1, 16);


        }
    }
}