// new faster view for completions. Still work in progress
class ScrollView {
	
	options;

	pos=0;
	max = 10;
	selected:HTMLElement;
    rootElement:HTMLElement;

	constructor() {
		this.rootElement = document.createElement("ol");
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