const stockInfoURL = 'https://api.iextrading.com/1.0/stock/'

class GlobalConstants {

  static get stockInfoURL() {
    return stockInfoURL;
  }
}

module.exports = GlobalConstants