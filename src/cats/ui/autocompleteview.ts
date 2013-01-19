/**
  This class is "inspired" by the ace typescript playground project.
  Especially the way popup is drawn and focused. 
  @TODO create less HTML and separate UI and logic
*/



module Cats.UI {

    declare var $;
    var HashHandler = ace.require('ace/keyboard/hash_handler').HashHandler;

    // This class takes care of the autocomplete popup and deals with 
    // the key events
    export class AutoCompleteView {

        private static selectedClassName = 'autocomplete_selected';
        private static className = 'autocomplete';
        wrap: HTMLElement;
        listElement: HTMLElement;
        private handler = new HashHandler();
        changeListener;
        active = false;
        completions: Services.CompletionEntry[];
        filteredCompletions: Services.CompletionEntry[];

        private offset = 0;
        private index = 0;
        private cursor = -1;
        private showNumberOfOptions = 10;

        constructor(private editor: Ace.Editor) {
            this.init();
            this.initKeys();
            this.editor.container.appendChild(this.wrap);
            this.listElement.innerHTML = '';
        }

        init() {
            this.wrap = document.createElement('div');
            this.listElement = document.createElement('ul');
            this.wrap.className = AutoCompleteView.className;
            this.wrap.appendChild(this.listElement);
        };


        getInputText(): string {
            var cursor = this.editor.getCursorPosition();
            var text = this.editor.session.getLine(cursor.row).slice(0, cursor.column);
            // console.log("input text:" + text);
            var matches = text.match(/[a-zA-Z_0-9\$]*$/);
            if (matches && matches[0])
                return matches[0];
            else
                return "";
        };


            // Get the text between cursor and start
        getInputText2(): string {
            var pos = this.editor.getCursorPosition();
            var result = this.editor.getSession().getTokenAt(pos.row, pos.column);
            if (result && result.value)
                return result.value.trim();
            else
                return "";
        }

        filter() {
            var text = this.getInputText(); // .toLowerCase();
            if (!text) {
                this.filteredCompletions = this.completions;
            } else {
                this.filteredCompletions = this.completions.filter(function(entry) {
                    return (entry.name.indexOf(text) === 0);
                });
            }
        }


        initKeys() {
            this.handler.bindKey("Home", () => { this.moveCursor(-10000) });
            this.handler.bindKey("End", () => { this.moveCursor(10000) });
            this.handler.bindKey("Down", () => { this.moveCursor(1) });
            this.handler.bindKey("PageDown", () => { this.moveCursor(10) });
            this.handler.bindKey("Up", () => { this.moveCursor(-1) });
            this.handler.bindKey("PageUp", () => { this.moveCursor(-10) });
            this.handler.bindKey("Esc", () => { this.hide() });
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
                this.hide();
            });

            // this.handler.bindKeys(AutoCompleteView.KeyBinding);

        }

        show() {
            this.editor.keyBinding.addKeyboardHandler(this.handler);
            this.wrap.style.display = 'block';
            this.changeListener = (ev) => this.onChange(ev);
            // this.editor.getSession().removeAllListeners('change');
            this.editor.getSession().on("change", this.changeListener);
            this.active = true;
        };


        hide() {
            this.editor.keyBinding.removeKeyboardHandler(this.handler);
            this.wrap.style.display = 'none';
            this.editor.getSession().removeListener('change', this.changeListener);
            // this.editor.getSession().removeAllListeners('change');
            this.active = false;
            // this.editor.getSession().on("change",CATS.onChangeHandler);
            // this.editor.getSession().removeAllListeners('change');
        };

        onChange(ev) {
            var key = ev.data.text;
            if (" -=,[]_/()!';:<>".indexOf(key) !== -1) {
                this.hide();
                return;
            }
            // hack to get the cursor updated before we render
            // TODO find out how to force update without a timer delay
            setTimeout(() => { this.render() }, 0);
        }


        private renderRow() {
            var index = this.listElement.children.length;
            var info = this.filteredCompletions[index];
            var li = <HTMLElement>document.createElement("li");
            var span1 = document.createElement("span");
            span1.className = "name " + " icon-" + info.kind;
            span1.innerText = info.name;
            li.appendChild(span1);

            if (info.name !== info.type) {
                var span2 = document.createElement("span");
                span2.className = "type";
                span2.innerText = info.type;
                li.appendChild(span2);
            }

            this.listElement.appendChild(li);
        }


        private hasCompletions() {
            return this.filteredCompletions.length > 0;
        }

        private render() {
            this.listElement.innerHTML = "";
            this.filter();
            this.offset = 0;
            this.index = 0;
            this.cursor = 0;

            if (this.hasCompletions()) {
                var max = Math.min(this.filteredCompletions.length, 10);
                for (var n = 0; n < max; n++) this.renderRow();
                this.highLite();
            }
            
        }


        showCompletions(completions) {
            if (this.active || (completions.length === 0)) return;
            var start = Date.now();
            this.completions = completions;
            console.log("Received completions: " + completions.length);
            var cursor = this.editor.getCursorPosition();
            var coords = this.editor.renderer.textToScreenCoordinates(cursor.row, cursor.column);
            this.setPosition(coords);
            this.render();
            this.show();
            console.log(Date.now() - start);
        };


    highLite() {
            var elem = <HTMLElement>this.listElement.children[this.cursor];
            elem.className = AutoCompleteView.selectedClassName;
        }

        moveCursor(offset: number) {
            if (! this.hasCompletions()) return;
            var newCursor = this.cursor + offset;
            newCursor = Math.min(this.filteredCompletions.length-1, newCursor);
            newCursor = Math.max(0, newCursor);

            // If there are any missing rows, let add them
            while (newCursor >= this.listElement.children.length) this.renderRow();

            var elem = this.current();
            if (elem) elem.className = "";
            this.cursor = newCursor;
            this.scroll();
        }

        // TODO remove jquery dependency
        setPosition(coords) {
            var bottom, editorBottom, top;
            top = coords.pageY + 20;
            editorBottom = $(this.editor.container).offset().top + $(this.editor.container).height();
            bottom = top + $(this.wrap).height();
            if (bottom < editorBottom) {
                this.wrap.style.top = top + 'px';
                return this.wrap.style.left = coords.pageX + 'px';
            } else {
                this.wrap.style.top = (top - $(this.wrap).height() - 20) + 'px';
                return this.wrap.style.left = coords.pageX + 'px';
            }
        };

        current(): HTMLElement {
            if (this.cursor >= 0)
                return <HTMLElement>this.listElement.childNodes[this.cursor];
            else
                return null;
        };
       

        hideRow(index) {
            var elem = <HTMLElement>this.listElement.children[index];
            elem.style.display = "none";
        }

        showRow(index) {
            var elem = <HTMLElement>this.listElement.children[index];
            elem.style.display = "block";
        }

        // ToDO use plain DOM API instead of jquery and speedup, since this is slow
        // for fast scrolling through large sets
        private scroll() {

            while (this.cursor >= (this.offset + 10)) {
                this.hideRow(this.offset);
                this.showRow(this.offset + 10);
                this.offset++;
            }

            while (this.cursor < this.offset) {
                this.showRow(this.offset - 1);
                this.hideRow(this.offset + 9);
                this.offset--;
            }
            this.highLite();
        };

    }

}