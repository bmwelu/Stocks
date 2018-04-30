function TimeSeriesBase (requestURL, ticker) { 
    this.requestURL = requestURL;
    this.ticker = ticker;
}

TimeSeriesBase.prototype.parseBody = function(body, objectString) {
    var ungroomedData = JSON.parse(body);
    var groomedData = [];
    for (var key in ungroomedData) {
        // skip loop if the property is from prototype
        if (!ungroomedData.hasOwnProperty(key)) continue;
        
        var obj = ungroomedData[key];
       
        if (obj.hasOwnProperty('close')) {
            var clone = {};
            clone[obj["date"]] = obj["close"];
            groomedData.push(clone);
        }
    }
    return groomedData;
  }

module.exports = TimeSeriesBase