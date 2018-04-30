const stockInfoURL = 'https://api.iextrading.com/1.0/stock/';
const maxStockDescriptionLength = 28;

class GlobalConstants {

  static get stockInfoURL() {
    return stockInfoURL;
  }

  static get maxStockDescriptionLength() {
    return maxStockDescriptionLength;
  }
}

module.exports = GlobalConstants