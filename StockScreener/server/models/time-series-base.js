class TimeSeriesBase  { 

    constructor(timeSlice, ticker){
        this.timeSlice = timeSlice;
        this.ticker = ticker;
    }

    parseBody(body, objectString) {
        var ungroomedData = JSON.parse(body);
        var groomedData = [];
        for (var key in ungroomedData) {     
            var obj = ungroomedData[key];
           
            if (obj.hasOwnProperty('close')) {
                var clone = {};
                clone[obj["date"]] = obj["close"];
                groomedData.push(clone);
            }
        }
        return groomedData;
      }
}

module.exports = TimeSeriesBase