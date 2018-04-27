const TimeSeriesBase = require('./time-series-base')

function TimeSeriesOneYear() {
    TimeSeriesBase.call(this,'1y');
  }

  TimeSeriesOneYear.prototype.parseBody = function(body) {
    return TimeSeriesBase.prototype.parseBody(body);
  }

  module.exports = TimeSeriesOneYear