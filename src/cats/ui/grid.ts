module cats.ui {

export interface AspectHandler {
	(row,aspectName?:string) : string;
}

// Simple grid
export class Grid  {

	private rootElement:HTMLTableElement;
	private columns:string[];
	private rows:any[];
	private aspects = {};

	defaultHandler = (row,name:string) => { return row[name];};

	onselect:Function;

	constructor() {
		this.rootElement = <HTMLTableElement>document.createElement("table");		
	}

	setColumns(columns: string[]) {
		this.columns = columns;
	}

	setRows(rows:any[]) {
		this.rows = rows;
	}

	setAspect(aspect:string,handler:AspectHandler) {
		this.aspects[aspect] = handler;
	}

	private getValue(row,columnName:string) :string {
		var fn = this.aspects[columnName] || this.defaultHandler;
		return fn(row,columnName);
	}


	// todo i18n
	private getLabel(headerName: string) {
		return headerName;
	}

	appendTo(elem: Element) {
		elem.appendChild(this.rootElement);
	}

	// TODO i18n
   private createHeader() {
	  var head = <HTMLTableElement>this.rootElement.createTHead();
	  var row = head.insertRow(-1);
	  this.columns.forEach((header) => {
	    var th = document.createElement("th");
	    th.innerText = this.getLabel(header);
	    row.appendChild(th);
	  });
	}

	private createRow(parent:HTMLTableElement, rowData) {
		var row = <HTMLTableRowElement>parent.insertRow(-1);
		this.columns.forEach((column) => {
			row.insertCell(-1).innerText = this.getValue(rowData,column); 
		});
		row["_value"] = rowData;
		var self = this;
		row.onclick = function(){
			if (self.onselect) {
				self.onselect(this["_value"]);
			}
      };
	}

	render() {
    
	    var table = this.rootElement;
	    table.innerHTML = "";
	    this.createHeader();

	    var tbody = <HTMLTableElement>document.createElement("tbody");
	    table.appendChild(tbody); 

	    this.rows.forEach( (row) => {      
	    	this.createRow(tbody,row);
	    });
	}


}

}