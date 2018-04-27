const TimeSeriesBase = require('./time-series-base')

function TimeSeriesOneDay() {
    TimeSeriesBase.call(this,'1d');
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
            clone[obj["date"] + obj["minute"]] = obj["close"];
            groomedData.push(clone);
        }
    }
    return groomedData;
  }

  module.exports = TimeSeriesOneDay