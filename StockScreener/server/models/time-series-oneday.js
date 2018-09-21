const TimeSeriesBase = require('./time-series-base');

class TimeSeriesOneDay extends TimeSeriesBase {
    constructor(ticker) {
        super('1d',ticker);
    }
    
    parseBody(body) {
        var ungroomedData = Object.keys(JSON.parse(body)).map(key => {
            return JSON.parse(body)[key];
        });
        var groomedData = [];     
        if (ungroomedData !== undefined && ungroomedData.length !== 0)
        {
            var firstTradingTimeDurationIndex = this.findFirstTradingTimeDuration(ungroomedData);
            //There hasn't been anything traded so far today
            if(firstTradingTimeDurationIndex === -1) {
                return groomedData;
            }
            //Add previous close
            groomedData.push(this.calculatePreviousClose(ungroomedData[firstTradingTimeDurationIndex]));  

            var oneDayStartTime = new Date('2000-11-11T08:30:00');
            const minutesInOneDayTradingSession = 390;
            var previousAverage;
            for(let i = 1; i <= minutesInOneDayTradingSession + 1; i++) {
                var oneMinute = {};
                if(i <= ungroomedData.length) {
                    //sometimes stocks aren't traded at all during a minute duration, get previous average if so
                    if(ungroomedData[i-1]["average"] === -1)
                    {
                        oneMinute[oneDayStartTime.toTimeString().split(' ')[0]] = previousAverage;
                    } else {
                        oneMinute[oneDayStartTime.toTimeString().split(' ')[0]] = ungroomedData[i-1]["average"];
                        previousAverage = ungroomedData[i-1]["average"];
                    }
                } else {
                    oneMinute[oneDayStartTime.toTimeString().split(' ')[0]] = null;
                }
                groomedData.push(oneMinute);
                oneDayStartTime.setMinutes(oneDayStartTime.getMinutes() + 1);            
            } 
            //By the minute produces some funky charts, every two minutes is fine for now       
            return groomedData.filter(function(value, index, Arr) {
                return index % 5 == 0;
            });
        }
        return groomedData;
    }
    
    //Current data doesn't set the first point the previous close.  If there is aftermarket trading, graphs won't
    //display % change correctly.
    calculatePreviousClose(firstDailyEntry) {
        return {
            previousClose: parseFloat(firstDailyEntry["average"]) * (1 - parseFloat(firstDailyEntry["changeOverTime"]))
        };
    }
    
      //Sometimes stocks don't trade right away, so averages will be -1.  Find the first entry that has an average
    findFirstTradingTimeDuration(timeData) {
        for(let i = 0; i < timeData.length; i++)
        {
            if(timeData[i]["average"] !== -1)
                return i;
        }
        return -1;
    }
}

 module.exports = TimeSeriesOneDay;