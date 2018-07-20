const stockInfoURL = 'https://api.iextrading.com/1.0/stock/';
const suggestedStockURL = 'https://api.intrinio.com/companies?query=';
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

    static get suggestedStockURL() {
        return suggestedStockURL;
    }

    static get maxStockNewsArcticles() {
        return maxStockNewsArcticles;
    }

    static get maxMarketNewsArcticles() {
        return maxMarketNewsArcticles;
    }

    //this is terrble, redo once the program becomes more serious
    static get intrinioAuth() {
        return "Basic " + new Buffer("25fa9c0467a49e6f5d1c0e29193728e8:845f53a575f228269aa92560ce86cc82").toString("base64");
    }
}

module.exports = GlobalConstants