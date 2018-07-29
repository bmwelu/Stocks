const TimeSeriesBase = require('./time-series-base')

class TimeSeriesOneYear extends TimeSeriesBase {
    constructor(ticker) {
        super('1y',ticker);
    }

    parseBody(body) {
        return TimeSeriesBase.prototype.parseBody(body);
    }
}

module.exports = TimeSeriesOneYear;