const stockInfoURL = 'https://api.iextrading.com/1.0/stock/';
const maxStockDescriptionLength = 28;
const maxStockNewsArcticles = 5;
const maxMarketNewsArcticles = 10;
const alphavantageapikey = 'YCZKYIG7S23CREP0';

class GlobalConstants {

    static get alphavantageapikey() {
        return alphavantageapikey;
    }
  
    static get stockInfoURL() {
        return stockInfoURL;
    }

    static get maxStockDescriptionLength() {
        return maxStockDescriptionLength;
    }

    static get maxStockNewsArcticles() {
        return maxStockNewsArcticles;
    }

    static get maxMarketNewsArcticles() {
        return maxMarketNewsArcticles;
    }
}

module.exports = GlobalConstants