const TimeSeriesBase = require('./time-series-base')

function TimeSeriesFiveYears(ticker) {
    TimeSeriesBase.call(this, '5y', ticker);
  }

  TimeSeriesFiveYears.prototype.parseBody = function(body) {
    return TimeSeriesBase.prototype.parseBody(body);
  }

  module.exports = TimeSeriesFiveYears