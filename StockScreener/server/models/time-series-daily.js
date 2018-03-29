const TimeSeriesBase = require('./time-series-base')

function TimeSeriesDaily(numberOfDays) {
    TimeSeriesBase.call(this,'Time Series (Daily)','https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=');
    this.numberOfDays = numberOfDays;
  }

TimeSeriesDaily.prototype.parseBody = function(body) {  
    var dailyParsedBody = TimeSeriesBase.prototype.parseBody(body, this.objectString).slice(0,this.numberOfDays);
    return dailyParsedBody;
  }

  module.exports = TimeSeriesDaily