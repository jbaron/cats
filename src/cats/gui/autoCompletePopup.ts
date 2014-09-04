//
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
    
    var HashHandler = ace.require('ace/keyboard/hash_handler').HashHandler;


   /**
     * Case insensitive sorting algoritme
     */
    function caseInsensitiveSort(a: { name: string; }, b: { name: string; }) {
        if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
        if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
        // the lower-case strings are equal, so now put them in local order..
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
    }
    

    /** 
     * This class takes care of the autocomplete popup and deals with 
     * the key events and filtering of the results while you are typing
     */
    export class AutoCompletePopup extends qx.ui.popup.Popup {

        private listModel: any;
        private handler;
        private changeListener: Function;
        private list: qx.ui.list.List;
        private filtered: any[];

        private cursorPos = 0;

        constructor(private editor: Ace.Editor) {
            super(new qx.ui.layout.Flow());
            // this.setDecorator(null);
            this.setPadding(0, 0, 0, 0);
            this.setMargin(0, 0, 0, 0);
            this.setWidth(300);
            this.setHeight(200);
            this.createList();
            this.initHandler();
            this.addListener("disappear", this.hidePopup, this);
        }


        /**
         * Create the list that hold the completions
         */
        private createList() {
            var self = this;

            // Creates the list and configures it
            var list: qx.ui.list.List = new qx.ui.list.List(null).set({
                scrollbarX: "off",
                selectionMode: "single",
                // height: 280,
                width: 300,
                labelPath: "caption",
                iconPath: "meta",
                iconOptions: {
                    converter: (data) => {
                        return this.getIconForKind(data);
                    }
                }
            });

            list.setDecorator(null);
            list.setItemHeight(18);
            this.add(list);
            this.list = list;

        }


        /**
         * Get the text between cursor and start
         */
        private getInputText(): string {
            var cursor = this.editor.getCursorPosition();
            var text = this.editor.session.getLine(cursor.row).slice(0, cursor.column);
            // console.log("input text:" + text);
            var matches = text.match(/[a-zA-Z_0-9\$]*$/);
            if (matches && matches[0])
                return matches[0];
            else
                return "";
        }


        // ALternative immplementation to get the text between cursor and start
        private getInputText2(): string {
            var pos = this.editor.getCursorPosition();
            var result = this.editor.getSession().getTokenAt(pos.row, pos.column);
            if (result && result.value)
                return result.value.trim();
            else
                return "";
        }


        private match_strict(text: string, completion: string) {
            if (!text) return true;
            if (completion.toLowerCase().indexOf(text) === 0) return true;
            return false;
        }


        private match_forgiven(text: string, completion: string) {
            if (!text) return true;
            if (completion.indexOf(text) > -1) return true;
            return false;
        }

        /**
         * Filter the available completions based on the users text input 
         * so far.
         */
        private updateFilter() {
            var text = this.getInputText();
            if (text) text = text.toLowerCase();

            var matchText = this.match_forgiven;
            if (IDE.config.editor.completionMode) {
                var methodName = "match_" + IDE.config.editor.completionMode;
                if (this[methodName]) matchText = this[methodName];
            }

            var lastItem = this.listModel.getItem(this.listModel.getLength() - 1);
            var counter = 0;

            this.filtered = [];
            var delegate = {};
            delegate["filter"] = (data) => {
                var value = data.getCaption().toLowerCase();
                var result = this.match_forgiven(text, value); // TODO hwo to deal with this
                if (result) this.filtered.push(data);
                if (data === lastItem) {
                    // IDE.console.log("filtered items: " + this.filtered.length);
                    // @TODO check for selected
                    var selection = this.list.getSelection().getItem(0);
                    if (!(selection && (this.filtered.indexOf(selection) > -1))) {
                        this.cursorPos = 0;
                        this.moveCursor(0);
                    }
                }
                return result;
            };
            this.list.setDelegate(delegate);

        }


        private moveCursor(row: number) {
            this.cursorPos += row;

            var len = this.filtered.length - 1;
            if (this.cursorPos > len) this.cursorPos = len;
            if (this.cursorPos < 0) this.cursorPos = 0;

            var item = this.filtered[this.cursorPos];
            this.list.resetSelection();
            (<any>this.list.getSelection()).push(item);
            // IDE.console.log("Cursor:" + this.cursorPos);
        }


        /**
         * Setup the different keybindings that would go to the 
         * popup window and not the editor
         */
        private initHandler() {
            this.handler = new HashHandler();
            this.handler.bindKey("Home", () => { this.moveCursor(-10000); });
            this.handler.bindKey("End", () => { this.moveCursor(10000); });
            this.handler.bindKey("Down", () => { this.moveCursor(1); });
            this.handler.bindKey("PageDown", () => { this.moveCursor(10); });
            this.handler.bindKey("Up", () => { this.moveCursor(-1); });
            this.handler.bindKey("PageUp", () => { this.moveCursor(-10); });
            this.handler.bindKey("Esc", () => { this.hidePopup(); });
            this.handler.bindKey("Return|Tab", () => {
                var current = this.list.getSelection().getItem(0);;
                if (current) {
                    var inputText = this.getInputText();
                    for (var i = 0; i < inputText.length; i++) {
                        this.editor.remove("left");
                    }
                    if (current.getMeta() === "snippet") {
                        this.editor.insertSnippet(current.getSnippet());
                    } else {
                        this.editor.insert(current.getValue());
                    }
                }
                this.hidePopup();
            });
        }

        private getIconForKind(name: string) {
            var iconPath = "./resource/qx/icon/Oxygen/16/types/";
            switch (name) {
                case "function":
                case "keyword":
                case "method": return iconPath + "method.png";
                case "constructor": return iconPath + "constructor.png";
                case "module": return iconPath + "module.png";
                case "interface": return iconPath + "interface.png";
                case "enum": return iconPath + "enum.png";
                case "class": return iconPath + "class.png";
                case "property":
                case "var": return iconPath + "property.png";
                case "snippet" : return iconPath + "snippet.png";
                default: return iconPath + "method.png";
            }
        }

        private isExecutable(kind) {
            if (kind === "method" || kind === "function" || kind === "constructor") return true;
            return false;
        }


        /**
         * Show the popup and make sure the keybinding is in place
         * 
         */
        private showPopup(coords, completions: Cats.CompletionEntry[]) {
            this.editor.keyBinding.addKeyboardHandler(this.handler);
            this.moveTo(coords.pageX, coords.pageY + 20);


            var rawData = [];
            completions.forEach((completion) => {
                var extension = "";
              
                if (this.isExecutable(completion.meta)) {
                    completion.caption += "()";
                    if (completion.value) completion.value += "()"
                } 
              
                if ((! completion.caption) && (! completion.name)) {
                    console.log(completion);
                    return;
                }
                
                rawData.push({
                    caption: completion.caption || completion.name ,
                    meta: completion.meta,
                    snippet: completion.snippet || "",
                    value: completion.value || ""
                });
            });

            this.listModel = qx.data.marshal.Json.createModel(rawData, false);



            this.list.setModel(this.listModel);
            this.updateFilter();

            this.cursorPos = 0;
            this.moveCursor(0);

            this.show();

            this.changeListener = (ev) => this.onChange(ev);
            // this.editor.getSession().removeAllListeners('change');
            this.editor.getSession().on("change", this.changeListener);
        }

        /**
         * Hide the popup and remove all keybindings
         * 
         */
        private hidePopup() {
            this.editor.keyBinding.removeKeyboardHandler(this.handler);
            this.exclude();

            this.editor.getSession().removeListener('change', this.changeListener);
            // this.editor.getSession().removeAllListeners('change');

            // this.editor.getSession().on("change",CATS.onChangeHandler);
            // this.editor.getSession().removeAllListeners('change');
        }

        /**
         * Determines if the specified character may be part of a JS identifier
         */
        private static isJsIdentifierPart(ch: number) {
            ch |= 0; //tell JIT that ch is an int
            return ch >= 97 && ch <= 122    //a-z
                || ch >= 65 && ch <= 90     //A-Z
                || ch >= 48 && ch <= 57     //0-9
                || ch === 95    //_
                || ch === 36    //$
                || ch > 127;     //non-ASCII letter. Not accurate, but good enough for autocomplete
        }

        /**
         * Check wether the typed character is reason to stop
         * the auto-complete task
         */
        private onChange(ev) {
            var key: string = ev.data.text;

            if ((key == null) || (!AutoCompletePopup.isJsIdentifierPart(key.charCodeAt(0)))) {
                this.hidePopup();
                return;
            }
            // hack to get the cursor updated before we render
            // TODO find out how to force update without a timer delay
            setTimeout(() => { this.updateFilter(); }, 0);
        }


        showCompletions(completions: Cats.CompletionEntry[]) {
            if (this.list.isSeeable() || (completions.length === 0)) return;
            console.debug("Received completions: " + completions.length);
            var cursor = this.editor.getCursorPosition();
            var coords = this.editor.renderer.textToScreenCoordinates(cursor.row, cursor.column);
            this.showPopup(coords, completions);
        }


    }

}
