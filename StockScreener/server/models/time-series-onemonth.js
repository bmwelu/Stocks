const TimeSeriesBase = require('./time-series-base')

function TimeSeriesOneMonth() {
    TimeSeriesBase.call(this, '1m');
  }

  TimeSeriesOneMonth.prototype.parseBody = function(body) {  
    return TimeSeriesBase.prototype.parseBody(body);

  }

  module.exports = TimeSeriesOneMonth