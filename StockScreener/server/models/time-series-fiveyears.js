const TimeSeriesBase = require('./time-series-base')

class TimeSeriesFiveYears extends TimeSeriesBase {
    constructor(ticker) {
        super('5y', ticker);
    } 

    parseBody(body) {
        return TimeSeriesBase.prototype.parseBody(body);
    }
}

module.exports = TimeSeriesFiveYears;