const TimeSeriesBase = require('./time-series-base')

function TimeSeriesOneYear(ticker) {
    TimeSeriesBase.call(this,'1y',ticker);
  }

  TimeSeriesOneYear.prototype.parseBody = function(body) {
    return TimeSeriesBase.prototype.parseBody(body);
  }

  module.exports = TimeSeriesOneYear