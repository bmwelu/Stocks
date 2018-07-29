const TimeSeriesBase = require('./time-series-base')

class TimeSeriesOneMonth extends TimeSeriesBase {
    constructor(ticker){
        super('1m', ticker);
    }

    parseBody(body) {  
        return TimeSeriesBase.prototype.parseBody(body);
    }
}

module.exports = TimeSeriesOneMonth;