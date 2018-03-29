function TimeSeriesBase (objectString, requestURL) { 
    this.objectString = objectString;
    this.requestURL = requestURL;
}

TimeSeriesBase.prototype.parseBody = function(body, objectString) {
    var ungroomedData = JSON.parse(body)[objectString];
    var groomedData = [];
    for (var key in ungroomedData) {
        // skip loop if the property is from prototype
        if (!ungroomedData.hasOwnProperty(key)) continue;
        
        var obj = ungroomedData[key];
        var clone = {};
        clone[key] = obj["4. close"];
        groomedData.push(clone);
    }
    return groomedData;
  }

module.exports = TimeSeriesBase