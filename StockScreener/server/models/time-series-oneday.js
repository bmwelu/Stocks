const TimeSeriesBase = require('./time-series-base')

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
            groomedData.push(this.calculatePreviousClose(ungroomedData[firstTradingTimeDurationIndex]));
            for(let i = 0; i < ungroomedData.length; i++)
            {
                var obj = {};
                //sometimes stocks aren't traded at all during a 15 minute duration, get previous average if so
                if(ungroomedData[i]["average"] === -1)
                {
                    //if first daily increment, take previous close
                    if(i === 0)
                    {
                        obj[ungroomedData[i]["minute"]] = groomedData[0]['previousClose'];
                        groomedData.push(obj);
                    } else {
                        obj[ungroomedData[i]["minute"]] = Object.values(groomedData[i-1])[0];
                        groomedData.push(obj);
                    }
                } else {
                    obj[ungroomedData[i]["minute"]] = ungroomedData[i]["average"];
                    groomedData.push(obj);
                }
            }    
            //By the minute produces some funky charts, every two minutes is fine for now       
            return groomedData.filter(function(value, index, Arr) {
                return index % 2 == 0;
            });
            //return groomedData;
        }
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
            {
                return i;
            }
        }
        return -1;
    }
}

 module.exports = TimeSeriesOneDay;