const TimeSeriesBase = require('./time-series-base')

function TimeSeriesOneMonth(ticker) {
    TimeSeriesBase.call(this, '1m', ticker);
  }

  TimeSeriesOneMonth.prototype.parseBody = function(body) {  
    return TimeSeriesBase.prototype.parseBody(body);

  }

  module.exports = TimeSeriesOneMonth