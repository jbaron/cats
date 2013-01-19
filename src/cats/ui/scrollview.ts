// new faster view for completions. Still work in progress

var HashHandler = ace.require('ace/keyboard/hash_handler').HashHandler;

class ScrollView {
	
    
	options;

	pos=0;
	max = 10;
	selected:HTMLElement;
    rootElement:HTMLElement;
    private handler = new HashHandler();
    changeListener;
    active=false;

	constructor(private editor: Ace.Editor) {
		this.rootElement = document.createElement("ol");
        this.initKeys();
        this.editor.container.appendChild(this.rootElement);
	}

    getAspect(data,name) :string{
        return "";
    }

    filter(text:string) {
        if (!text) return this.options;

        // console.log("filter: " + text);
        // if (text === ".") return this.completions;

        var result = this.options.filter(function(entry) {
            var name = this.getAspect(entry,"name");
            return (name.indexOf(text) === 0);
        });
        return result;
    }

    current() :any {
        return this.pos;
    }


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

	next() {
		if (this.pos === this.options.length) return;
		this.pos++;
		var focus = <HTMLElement>this.selected.nextSibling;
		if (! focus) {
			focus = this.renderOption(this.pos,true);
			this.rootElement.removeChild(this.rootElement.children[0]);
		} 
		
		this.selected.className = "";
		focus.className = "selected";
		this.selected = focus;
	}

	prev() {
		if (this.pos === 0) return;		
		this.pos--;
	}


  initKeys() {

        this.handler.bindKey("Down", () => { this.next() });
        this.handler.bindKey("Up", () => { this.prev() });
        this.handler.bindKey("Esc", () => { this.hide() });
        this.handler.bindKey("Return|Tab", () => {
            var current = this.current();
            if (current) {
                var inputText = this.getInputText()
                for (var i = 0; i < inputText.length; i++) {
                    this.editor.remove("left");
                }
                this.editor.insert(current.dataset["name"]);
            }
            this.hide();
        });

        // this.handler.bindKeys(AutoCompleteView.KeyBinding);

    }

    show() {
        this.editor.keyBinding.addKeyboardHandler(this.handler);
        this.rootElement.style.display = 'block';
        this.changeListener = (ev) => this.onChange(ev);
        // this.editor.getSession().removeAllListeners('change');
        this.editor.getSession().on("change", this.changeListener);
        this.active = true;
    };


    hide() {
        this.editor.keyBinding.removeKeyboardHandler(this.handler);
        this.rootElement.style.display = 'none';
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
        setTimeout(() => {this.render()},0);
    }


	private renderOption(id,selected=false) {
		var result = document.createElement("li");
		this.rootElement.appendChild(result);
		result.innerText= this.options[id];
		return result;

	}

	render() {
		var max = Math.min(this.max,this.options.length);
		for (var i =0;i<max;i++) {
			// this.renderOption(id,i===0);
		}
	}


}