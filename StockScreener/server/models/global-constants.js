const stockInfoURL = 'https://api.iextrading.com/1.0/stock/';
const suggestedStockURL = 'http://search.xignite.com/Search/Suggest?parameter=XigniteFinancials.GetCompanyBalanceSheet.Identifier&term=';
const maxStockDescriptionLength = 28;
const maxNewsArcticles = 5;
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

  static get maxNewsArcticles() {
    return maxNewsArcticles;
}
}

module.exports = GlobalConstants