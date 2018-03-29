const TimeSeriesIntraday = require('../models/time-series-intraday')
const TimeSeriesDaily = require('../models/time-series-daily')
const TimeSeriesWeekly = require('../models/time-series-weekly')
const TimeSeriesMonthly = require('../models/time-series-monthly')
const NumberOfDays = 10;
const NumberOfWeeks = 52;
const NumberOfMonths = 60;

function TimeSeriesFactory () {

}

TimeSeriesFactory.prototype.createTimeSeries = function (interval, ticker) {
    var timeSeries;
    var intParsed = parseInt(interval);
    if (intParsed === 0) {
         timeSeries = new TimeSeriesIntraday();
    } else if (intParsed === 1) {
        timeSeries = new TimeSeriesDaily(NumberOfDays);
    } else if (intParsed === 2) {
        timeSeries = new TimeSeriesWeekly(NumberOfWeeks);
    } else if (intParsed === 3) {
        timeSeries = new TimeSeriesMonthly(NumberOfMonths);
    }
    return timeSeries;
}

module.exports = TimeSeriesFactory