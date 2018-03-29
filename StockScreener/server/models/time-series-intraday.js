const TimeSeriesBase = require('./time-series-base')

function TimeSeriesIntraday() {
    TimeSeriesBase.call(this,'Time Series (15min)','https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&interval=15min&symbol=');
  }

  TimeSeriesIntraday.prototype.parseBody = function(body) {
    var intradayParsedBody = TimeSeriesBase.prototype.parseBody(body, this.objectString);
    var lastTradingDayDate =  Object.keys(intradayParsedBody[0])[0].split(' ')[0];
    
    // Holidays and weekends won't get any data, default to last trading day  
    var lastTradingDayData = [];
    for (var key in intradayParsedBody) {
      if (Object.keys(intradayParsedBody[key])[0].match(lastTradingDayDate)) {
        // lastTradingDayData.push(intradayParsedBody[key]);
        var timeJSON = {};
        timeJSON[Object.keys(intradayParsedBody[key])[0].split(' ')[1]] = intradayParsedBody[key][Object.keys(intradayParsedBody[key])[0]];
        lastTradingDayData.push(timeJSON);

      }
    }
    return lastTradingDayData;
  }

  module.exports = TimeSeriesIntraday