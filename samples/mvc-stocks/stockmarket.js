var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var StockView = (function (_super) {
    __extends(StockView, _super);
    function StockView(stock, parent) {
        _super.call(this);
        this.stock = stock;
        this.root = document.createElement("tr");
        this.root.innerHTML = "<td></td><td></td><td></td><td></td>";
        parent.appendChild(this.root);
    }
    StockView.prototype.setChildText = function (n, text) {
        var elem = this.root.children[n];
        elem.innerText = text;
    };
    StockView.prototype.render = function () {
        var newPrice = this.stock.price;
        var oPrice = this.stock.openingPrice;
        var diff = ((newPrice - oPrice) / oPrice) * 100;
        this.setChildText(0, this.stock.symbol);
        this.setChildText(1, oPrice.toFixed(2));
        this.setChildText(2, newPrice.toFixed(2));
        this.setChildText(3, diff.toFixed(0) + "%");
        this.root.className = diff >= 0 ? "up" : "down";
    };
    return StockView;
})(MVC.View);
var Stock = (function () {
    function Stock(symbol, openingPrice) {
        this.symbol = symbol;
        this.openingPrice = openingPrice;
        this.price = this.openingPrice;
    }
    Stock.prototype.newDay = function () {
        this.openingPrice = this.price;
    };
    return Stock;
})();
function initStockMarket() {
    var stockMarket = [];
    var stockList = [
        "Microsoft (MSFT)", 
        "Apple (AAPL)", 
        "Cisco (CSCO)", 
        "Google (GOOG)", 
        "Oracle (ORCL)", 
        "Intel (INTC)", 
        "Qualcomm (QCOMM)", 
        "Amgen (AMGN)", 
        "Teva Pharmacutical (TEVA)", 
        "Research in Motion (RIMM)", 
        "Gilead Sciences (GILD)", 
        "Amazon.com (AMZN)", 
        "Comcast (CMCSA)", 
        "LM Ericsson (ERIC)", 
        "e-Bay (EBAY)", 
        "Dell (DELL)", 
        "Celgene Corp (CELG)", 
        "DirecTv (DTV)", 
        "Infosys Technology (INFY)", 
        "Mitsui & Company (MITSY)"
    ];
    var parent = document.getElementById("stockmarket");
    stockList.forEach(function (stockName) {
        var stock = new Stock(stockName, Math.random() * 100);
        MVC.Model.makeObservable(stock, [
            "openingPrice", 
            "price"
        ]);
        stockMarket.push(stock);
        var view = new StockView(stock, parent);
        view.update();
    });
    return stockMarket;
}
function simulate() {
    setInterval(function () {
        var index = Math.random() * stockMarket.length;
        var stock = stockMarket[Math.floor(index)];
        stock.price += Math.random() - 0.5;
        if(stock.price < 0.01) {
            stock.price = 0.01;
        }
    }, 100);
}
function nextDay() {
    stockMarket.forEach(function (stock) {
        return stock.newDay();
    });
}
var stockMarket = initStockMarket();
simulate();
//@ sourceMappingURL=stockmarket.js.map
