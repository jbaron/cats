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



    var HashHandler = ace.require('ace/keyboard/hash_handler').HashHandler;

    /** 
     * This class takes care of the autocomplete popup and deals with 
     * the key events and filtering of the results while you are typing
     */
    class AutoCompletePopup extends qx.ui.popup.Popup {

        private static selectedClassName = 'autocomplete_selected';
        private static className = 'autocomplete';
       
        private listElement: HTMLElement;
        private handler;
        private changeListener;
        private list:qx.ui.list.List;
        
        // Other tasks can check wether autocompletion is in progress
        active = false;
        
        
        private offset = 0;
        private index = 0;
        private cursorPos = -1;
        private showNumberOfOptions = 10;

        constructor(private editor: Ace.Editor) {
            super(new qx.ui.layout.Flow());
            // this.setDecorator(null);
            this.setPadding(0,0,0,0);
            this.setMargin(0,0,0,0);
            this.setWidth(300);
            this.setHeight(200);
            this.createList();
            this.initHandler();
        }


        private createList() {
                 // Creates the model data
          
          
              var model = qx.data.marshal.Json.createModel([], false);
        
              // Creates the list and configures it
              var list:qx.ui.list.List = new qx.ui.list.List(model).set({
                scrollbarX: "on",
                selectionMode : "single",
                // height: 280,
                width: 300,
                labelPath: "label",
                iconPath: "icon",
                iconOptions: {converter : function(data) {
                  return "icon/" + data + "/places/folder.png";
                }}
              });
              
              list.setDecorator(null);
              
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

        /**
         * Only match when exactly same string from first position 
         */
        private strictComparison(a:string,b:string) : boolean {
            return (a.indexOf(b) === 0);
        }

        /**
         * Match any string within other string, case insensitive
         */ 
        private looseComparison(a:string,b:string) : boolean {
            return (a.toLowerCase().indexOf(b.toLowerCase()) >= 0);
        }

        /**
         * Fitler the available completetions based on the users input 
         * so far.
         */ 
        private updateFilter() {
            var text = this.getInputText(); // .toLowerCase();
            if (!text) {
                this.list.setDelegate(null);
            } else {
                var delegate = {}
                delegate["filter"] = function(data) {
                    var label = data.getLabel();
                    return label.indexOf(text) === 0 ;
                }
                this.list.setDelegate(delegate);
            }
        }

   
        private moveCursor(rows:number) {
            
        }
        
        private current() {
            return null;
        }
   
        /**
         * Setup the different keybindings that would go to the 
         * popup window and not the editor
         */ 
        private initHandler() {
            this.handler = new HashHandler();
            this.handler.bindKey("Home", () => { this.moveCursor(-10000) });
            this.handler.bindKey("End", () => { this.moveCursor(10000) });
            this.handler.bindKey("Down", () => { this.moveCursor(1) });
            this.handler.bindKey("PageDown", () => { this.moveCursor(10) });
            this.handler.bindKey("Up", () => { this.moveCursor(-1) });
            this.handler.bindKey("PageUp", () => { this.moveCursor(-10) });
            this.handler.bindKey("Esc", () => { this.hidePopup() });
            this.handler.bindKey("Return|Tab", () => {
                var current = this.current();
                if (current) {
                    var inputText = this.getInputText()
                    for (var i = 0; i < inputText.length; i++) {
                        this.editor.remove("left");
                    }
                    var span = <HTMLElement>current.firstChild;
                    this.editor.insert(span.innerText);
                }
                this.hidePopup();
            });

            // this.handler.bindKeys(AutoCompleteView.KeyBinding);

        }

        /**
         * Show the popup and make sure the keybinding is in place
         * 
         */ 
        private showPopup(coords,completions:TypeScript.Services.CompletionEntry[]) {
            this.editor.keyBinding.addKeyboardHandler(this.handler);
            this.moveTo(coords.pageX, coords.pageY+15);
            
            
             var rawData = [];
             completions.forEach((completion) => {
                  rawData.push({
                     label: completion.name,
                     icon: "16"
                  });
              });
          
            var model = qx.data.marshal.Json.createModel(rawData, false);
            this.updateFilter()
            this.list.setModel(model);
            
            this.show();
            // this.wrap.style.display = 'block';
            this.changeListener = (ev) => this.onChange(ev);
            // this.editor.getSession().removeAllListeners('change');
            this.editor.getSession().on("change", this.changeListener);
            this.active = true;
        }

        /**
         * Hide the popup and remove all keybindings
         * 
         */ 
        private hidePopup() {
            this.editor.keyBinding.removeKeyboardHandler(this.handler);
            this.exclude();
            // this.wrap.style.display = 'none';
            this.editor.getSession().removeListener('change', this.changeListener);
            // this.editor.getSession().removeAllListeners('change');
            this.active = false;
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
                || ch > 127     //non-ASCII letter. Not accurate, but good enough for autocomplete
        }

        /**
         * Check wether the typed character is reason to stop
         * the auto-complete task
         */ 
        private onChange(ev) {
            var key = ev.data.text;
            if (!AutoCompletePopup.isJsIdentifierPart(key.charCodeAt(0))) {
                this.hidePopup();
                return;
            }
            // hack to get the cursor updated before we render
            // TODO find out how to force update without a timer delay
            setTimeout(() => { this.updateFilter() }, 0);
        }

     
        showCompletions(completions:TypeScript.Services.CompletionEntry[]) {
            if (this.active || (completions.length === 0)) return;            
            console.info("Received completions: " + completions.length);
            var cursor = this.editor.getCursorPosition();
            var coords = this.editor.renderer.textToScreenCoordinates(cursor.row, cursor.column);
            this.showPopup(coords, completions);
        }


        private highLite() {
            var elem = <HTMLElement>this.listElement.children[this.cursorPos];
            elem.className = AutoCompletePopup.selectedClassName;
        }

}


