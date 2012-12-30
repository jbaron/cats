module cats.ui {

// Simple grid
class Grid  {

	private rootElement:HTMLTableElement;
	private columns:string[];
	onselect:Function;

	constructor() {
		this.rootElement = <HTMLTableElement>document.createElement("table");
	}

	setColumns(columns: string[]) {
		this.columns = columns;
	}

	render() {

	}

	// todo i18n
	getLabel(headerName: string) {
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
			var data = rowData[column];
			row.insertCell(-1).innerText = data || ""; 
		});
		row["_value"] = rowData;
		var self = this;
		row.onclick = function(){
			if (self.onselect) {
				self.onselect(this["_value"]);
			}
      };
	}

	showRows(rows:any[]) {
    
	    var table = this.rootElement;
	    table.innerHTML = "";
	    this.createHeader();

	    var tbody = <HTMLTableElement>document.createElement("tbody");
	    table.appendChild(tbody); 

	    rows.forEach( (row) => {      
	    	this.createRow(tbody,row);
	    });
	}


}

}