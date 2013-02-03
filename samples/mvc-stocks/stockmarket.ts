/**
 * Simple application demosntrating the MVC solution. A number of stocks are being consitently being updated and shown 
 * in a table. The daily profit or loss is also shown.
 * 
 * When the user clicks "Next Day", the opening price is reset
 * to the latest price and the calculations start again.
 */

///<reference path='./mvc.ts'/>


/**
 * StockView renders a single Stock
 */ 
class StockView extends MVC.View {

    private root: HTMLElement;

    constructor(private stock: Stock, parent) {
        super();
        this.root = document.createElement("tr");
        this.root.innerHTML = "<td></td><td></td><td></td><td></td>";
        parent.appendChild(this.root);
    }

    /**
     * Small utility to set the text of a child element
     * @param n The index of the child element
     * @param text The text to be set
     */
    private setChildText(n: number, text: string) {
        var elem = <HTMLElement>this.root.children[n];
        elem.innerText = text;
    }

    /**
     * Render the StockView
     */
    render() {
        var newPrice = this.stock.price;
        var oPrice = this.stock.openingPrice;
        var diff = ((newPrice - oPrice) / oPrice) * 100;

        this.setChildText(0, this.stock.symbol);
        this.setChildText(1, oPrice.toFixed(2));
        this.setChildText(2, newPrice.toFixed(2));
        this.setChildText(3, diff.toFixed(0)+"%");

        this.root.className = diff >= 0 ? "up" : "down";
    }
}


/**
 * A very simple stock model with two properties, symbol and price 
 */
class Stock {

    price: number;

    /**
     * Create a new stock
     * @param symbol The symbol name of the stock
     * @param openingPrice The initial opening price for this stock
     */
    constructor(public symbol: string, public openingPrice: number) {
        this.price = this.openingPrice;
    }

    /**
     * Start a new day of trading
     */
    newDay() {
        this.openingPrice = this.price;
    }

}



/**
 * Initialize the stock market and its views
 */ 
function initStockMarket():Stock[] {
    var stockMarket: Stock[] = [];
    var stockList = [ "Microsoft (MSFT)", "Apple (AAPL)", "Cisco (CSCO)",
        "Google (GOOG)", "Oracle (ORCL)" ,"Intel (INTC)", "Qualcomm (QCOMM)",
        "Amgen (AMGN)","Teva Pharmacutical (TEVA)","Research in Motion (RIMM)",
        "Gilead Sciences (GILD)", "Amazon.com (AMZN)","Comcast (CMCSA)",
        "LM Ericsson (ERIC)","e-Bay (EBAY)","Dell (DELL)","Celgene Corp (CELG)",
        "DirecTv (DTV)", "Infosys Technology (INFY)","Mitsui & Company (MITSY)"]

    var parent = document.getElementById("stockmarket");

    stockList.forEach((stockName) =>{
        var stock = new Stock(stockName, Math.random() * 100);
        MVC.Model.makeObservable(stock, ["openingPrice", "price"]);
        stockMarket.push(stock);
        var view = new StockView(stock, parent);
        view.update();
    });

    return stockMarket;
}

/**
 * Start the simulation of the stock market
 */ 
function simulate() {
    setInterval(() => {
        // Select a random stock to be updated
        var index = Math.random() * stockMarket.length;
        var stock = stockMarket[Math.floor(index)];
        stock.price += Math.random() - 0.5;
        if (stock.price < 0.01) stock.price = 0.01;
    }, 100);
}

/**
 * Simulates the next trading day
 */ 
function nextDay() {
    stockMarket.forEach((stock) => stock.newDay());
}

var stockMarket = initStockMarket();
simulate();
