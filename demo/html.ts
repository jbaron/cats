// ****************************************************************************
// A small trial to use the TypeScript typing system to create a strong typed 
// DOM API with good autocomplete support.
// Just try it out in the next section 
// ***********************************************************************

var html = new Doc().html;
html.body.div.span.div.text("hello world");





// **********************************************************************
// Implementation classes and interfaces
// **********************************************************************
class SingleElem {

	constructor(public tag, public parent:SingleElem) {}

	children: SingleElem[] = [];
	attrs = {};


	find(tag): SingleElem[] {
		var result=[];
		this.children.forEach((child) => {
			if (child.tag === tag) result.push(child);	
		});
		return result;
	}

	removeChild(child) {
		var pos = this.children.indexOf(child);
	    if (pos !== -1) this.children.splice(pos,1);
	}

	clone() {
		var result = new SingleElem(this.tag,this.parent);
		for (var name in this.attrs) {
			result.attrs[name] = this.attrs[name];
		}
		// result.children = []; // this.children; // todo make deep copy
		return result;
	}

	materialize() {
		if (this.isTransient()) {
			console.log("Materialize %s", this.tag);		
			this.parent.children.push(this);
			this.parent.materialize();
			// this.parent = null; 
		}
	}

	remove() {
		if (this.parent == null) return;
        this.parent.removeChild(this);
	}

	isTransient() {		
		if (this.parent == null) return false;
		return this.parent.children.indexOf(this) === -1;
	}

	toHTML(indent="") : string {		
		var result = indent + "<" + this.tag;
		for (var name in this.attrs) {
			result += " " + name + "=" + this.attrs[name];
		}
		result += ">\n";
		this.children.forEach(child => {
			if (child.toHTML)
				result += child.toHTML(indent+"    ");
			else
				result += indent + "    " + child + "\n"; 	
		})
		result += indent + "</" + this.tag + ">\n";
		return result;
	}

}

/**
	This implements all the real methods
*/
class ElemImpl {

	elems: SingleElem[] = [];

	constructor(tag?, parent?) {
		if (tag) this.elems.push(new SingleElem(tag,parent));
	}

	private addSingleElems(elems: SingleElem[]) {
		this.elems = this.elems.concat(elems);
	}

	materialize() {
		this.elems.forEach( elem => {
			elem.materialize();	
		})
	}


	private find(tag): ElemImpl {
		var result = new ElemImpl();
		this.elems.forEach( (elem:SingleElem) => {
			var matches = elem.find(tag);
			if (matches.length) result.addSingleElems(matches);
		});

		// If we didn't find anything, lets create a so called transient element
		if (result.elems.length === 0) {
			console.log("Creating transient element %s", tag);
			this.elems.forEach((elem) => {
				var e = new SingleElem(tag,elem);
				result.addSingleElems([e]);
			});
		}
		return result;
	}


	times(n:number) : ElemImpl {
		if (n <= 1) return this;
		var result = new ElemImpl();
		this.elems.forEach( elem => {
			result.elems.push(elem); // Copy the original one
			for (var i = 1;i < n;i++) {
				var newElem = elem.clone();
				result.elems.push(newElem); // Add the remaining ones
			}

		})
		return result;		
	}

	clone() : ElemImpl {
		return new ElemImpl(); // todo
	}

	attr(key,value?) : any {
		if (value === undefined) return this.elems[0].attrs[key];
		
		this.elems.forEach(elem => {
			elem.attrs[key] = value;
		});
		return this;
	} 

	exists() : bool {
		if (this.elems.length === 0) return true;
		return ! this.elems[0].isTransient();		
	}

    remove() : void {
    	this.elems.forEach( elem => {
    			elem.remove();
    	});

    }

    toHTML() {    	
    	var result = "";
    	this.elems.forEach(elem => {
    		result += elem.toHTML();
    	});
    	return result;
    }


    filter(criteria) : ElemImpl {
    	return null;
    }

	get a(): A { return this.find("a");}
	get div(): Div {return this.find("div");}
	get html() : HTML {return this.find("html");}
	get head() : Head { return this.find("head");}
	get title() : Title { return this.find("title");}
	get body() : Body {return this.find("body");}
	get span() : Span {return this.find("span");}
	get base() : Span {return this.find("base");}
	get meta() : Span {return this.find("meta");}
	get link() : Span {return this.find("link");}
	get noscript() : Span {return this.find("noscript");}
	get script() : Span {return this.find("script");}			
	get style() : Span {return this.find("style");}		
	get command() : Span {return this.find("command");}
	text(str) : void {
		if (str) {
			this.elems.forEach( elem => {
				elem.children.push(str);
			});
			this.materialize();
		}
		console.log("set text");
	}
}


class Doc {
	get html() : HTML {
		return <HTML><any>new ElemImpl("html", null);
	}

}

/*************************************************************************
 * Interfaces
 *************************************************************************/

interface Elem {
	times(i:number) : Elem;
	text(str) : void;
	attr(key,value) : any;
	attr(key) :string;
	exists(): bool;
	materialize() : void;
	remove() : void;
	toHTML() : void;
}


interface Span extends Elem {
	div : Div;
}

interface Div extends Elem {
	span: Span;
	a : A;
	times(i) : Div;
}

interface Title extends Elem {

}

interface Base extends Elem {}
interface Command extends Elem {}
interface Link extends Elem {}
interface Meta extends Elem {}
interface Noscript extends Elem {}
interface Script extends Elem {}
interface Style extends Elem {}

interface Head extends Elem, MetadataParent {
}




interface MetadataParent {
	title: Title;
	base : Base;
	command: Command;
	link : Link;
	meta : Meta;
	noscript: Noscript;
	script: Script;
	style: Style;
}

interface PhrasingContentParent {

}

interface FlowContentParent {

}


interface Body extends Elem {
	a: A;
	div: Div;
	attr(key,value): Body;
	attr(key) :string;
}

interface HTML extends Elem {
	body: Body;
	head: Head;
}

interface A extends Elem {
	div : Div;
	span: Span;
	times(i) : A;
}




