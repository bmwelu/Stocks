const TimeSeriesBase = require('./time-series-base')

function TimeSeriesWeekly(numberOfWeeks) {
    TimeSeriesBase.call(this,'Weekly Time Series','https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=');
    this.numberOfWeeks = numberOfWeeks;
  }

  TimeSeriesWeekly.prototype.parseBody = function(body) {
    var weeklyParsedBody = TimeSeriesBase.prototype.parseBody(body, this.objectString).slice(0,this.numberOfWeeks);
    return weeklyParsedBody;
  }

  module.exports = TimeSeriesWeekly