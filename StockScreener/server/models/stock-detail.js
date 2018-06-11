class StockDetail {
    constructor(symbol, companyName, primaryExchange, sector, week52High, week52Low, latestPrice, previousClose, stockNews) {
        this.symbol = symbol;
        this.companyName = companyName;
        this.primaryExchange = primaryExchange;
        this.sector = sector;
        this.week52High = week52High;
        this.week52Low = week52Low;
        this.latestPrice = latestPrice;
        this.previousClose = previousClose;
        this.stockNews = stockNews;
    }
}

module.exports = StockDetail