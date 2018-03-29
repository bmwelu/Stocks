const TimeSeriesBase = require('./time-series-base')

function TimeSeriesMonthly(numberOfMonths) {
    TimeSeriesBase.call(this,'Monthly Time Series','https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=');
    this.numberOfMonths = numberOfMonths;
  }

  TimeSeriesMonthly.prototype.parseBody = function(body) {
    var monthlyParsedBody = TimeSeriesBase.prototype.parseBody(body, this.objectString).slice(0,this.numberOfMonths);
    return monthlyParsedBody;
  }

  module.exports = TimeSeriesMonthly