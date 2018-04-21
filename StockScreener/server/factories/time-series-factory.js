const TimeSeriesIntraday = require('../models/time-series-intraday')
const TimeSeriesDaily = require('../models/time-series-daily')
const TimeSeriesWeekly = require('../models/time-series-weekly')
const TimeSeriesMonthly = require('../models/time-series-monthly')
const NumberOfDays = 10;
const NumberOfWeeks = 52;
const NumberOfMonths = 60;
const IntradayInterval = 0;
const DailyInterval = 1;
const WeeklyInterval = 2;
const MontlyInterval = 3;

function TimeSeriesFactory () { }

TimeSeriesFactory.prototype.createTimeSeries = function (interval, ticker) {
    var timeSeries;
    var intParsed = parseInt(interval);
    if (intParsed === IntradayInterval) {
         timeSeries = new TimeSeriesIntraday();
    } else if (intParsed === DailyInterval) {
        timeSeries = new TimeSeriesDaily(NumberOfDays);
    } else if (intParsed === WeeklyInterval) {
        timeSeries = new TimeSeriesWeekly(NumberOfWeeks);
    } else if (intParsed === MontlyInterval) {
        timeSeries = new TimeSeriesMonthly(NumberOfMonths);
    }
    return timeSeries;
}

module.exports = TimeSeriesFactory