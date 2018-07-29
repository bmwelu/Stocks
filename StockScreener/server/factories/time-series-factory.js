const TimeSeriesOneDay = require('../models/time-series-oneday')
const TimeSeriesOneMonth = require('../models/time-series-onemonth')
const TimeSeriesOneYear = require('../models/time-series-oneyear')
const TimeSeriesFiveYears = require('../models/time-series-fiveyears')

const IntradayInterval = 0;
const DailyInterval = 1;
const WeeklyInterval = 2;

class TimeSeriesFactory { 
    createTimeSeries(interval, ticker) {
        var intParsed = parseInt(interval);
        if (intParsed === IntradayInterval) {
             return new TimeSeriesOneDay(ticker);
        } else if (intParsed === DailyInterval) {
            return new TimeSeriesOneMonth(ticker);
        } else if (intParsed === WeeklyInterval) {
            return new TimeSeriesOneYear(ticker);
        }
        return  new TimeSeriesFiveYears(ticker);
    }
}

module.exports = TimeSeriesFactory