const TimeSeriesBase = require('./time-series-base')

function TimeSeriesOneDay(ticker) {
    TimeSeriesBase.call(this,'1d', ticker);
  }

  TimeSeriesOneDay.prototype.parseBody = function(body) {
    var ungroomedData = JSON.parse(body);
    var groomedData = [];

    for (var key in ungroomedData) {
        // skip loop if the property is from prototype
        if (!ungroomedData.hasOwnProperty(key)) continue;
        
        var obj = ungroomedData[key];
       
        if (obj.hasOwnProperty('close')) {
            var clone = {};
            clone[obj["minute"]] = obj["close"];
            groomedData.push(clone);
        }
    }
    return groomedData;
  }

  module.exports = TimeSeriesOneDay