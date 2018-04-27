const TimeSeriesBase = require('./time-series-base')

function TimeSeriesFiveYears() {
    TimeSeriesBase.call(this, '5y');
  }

  TimeSeriesFiveYears.prototype.parseBody = function(body) {
    return TimeSeriesBase.prototype.parseBody(body);
  }

  module.exports = TimeSeriesFiveYears