const TimeSeriesOneDay = require('../models/time-series-oneday')
const TimeSeriesOneMonth = require('../models/time-series-onemonth')
const TimeSeriesOneYear = require('../models/time-series-oneyear')
const TimeSeriesFiveYears = require('../models/time-series-fiveyears')

const IntradayInterval = 0;
const DailyInterval = 1;
const WeeklyInterval = 2;
const MontlyInterval = 3;

function TimeSeriesFactory () { }

TimeSeriesFactory.prototype.createTimeSeries = function (interval, ticker) {
    var timeSeries;
    var intParsed = parseInt(interval);
    if (intParsed === IntradayInterval) {
         timeSeries = new TimeSeriesOneDay();
    } else if (intParsed === DailyInterval) {
        timeSeries = new TimeSeriesOneMonth();
    } else if (intParsed === WeeklyInterval) {
        timeSeries = new TimeSeriesOneYear();
    } else if (intParsed === MontlyInterval) {
        timeSeries = new TimeSeriesFiveYears();
    }
    return timeSeries;
}

module.exports = TimeSeriesFactory