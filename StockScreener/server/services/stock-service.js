const request = require('request');
const mongojs = require('mongojs');
const db = mongojs('mongodb://bmwelu:bmwelu1@ds245337.mlab.com:45337/bmwelu_stocks', ['stocks_watched']);
const TimeSeriesFactory = require('../factories/time-series-factory');

module.exports = {
    updateStockPrices : function (tickers, callback) {
        request('https://www.alphavantage.co/query?function=BATCH_STOCK_QUOTES&symbols=' + tickers +'&apikey=' + 'YCZKYIG7S23CREP0', function(error, response, body) {
            //Check for error
            if (error) {
                return callback(error);
            }
            //Check for success status code
            if (response.statusCode !== 200) {
                return callback(new Error('Invalid Status Code Returned:' + response.statusCode));
            }
            //groom data
            var ungroomedData = JSON.parse(body)['Stock Quotes'];
            var groomedData = [];
            for(let i = 0; i < ungroomedData.length; i++) {
                var clone = {};
                clone["symbol"] = ungroomedData[i]["1. symbol"];
                clone["latestPrice"] = ungroomedData[i]["2. price"];
                groomedData.push(clone);
            }
            callback(null,groomedData);
        })
    },

    getStockTimeSeriesData: function (ticker, interval, callback) {
        if (parseInt(interval) < 0 || parseInt(interval) > 3) {
            return callback(new Error('Invalid interval. Must be 0 through 3'));
        }
        const timeSeriesFactory = new TimeSeriesFactory();
        const timeSeries = timeSeriesFactory.createTimeSeries(interval);
        console.log(timeSeries.requestURL);
        request(timeSeries.requestURL + ticker +'&apikey=' + 'YCZKYIG7S23CREP0', function(error, response, body) {
            //Check for error
            if (error) {timeSeries.requestURL
                return callback(error);
            }
            //Check for success status code
            if (response.statusCode !== 200) {
                return callback(new Error('Invalid Status Code Returned:' + response.statusCode));
            }

            //groom data
            callback(null,timeSeries.parseBody(body));
        });
    },

    // getLatestStocks : function (callback) {
    //     request('https://api.iextrading.com/1.0/stock/market/list/mostactive', function(error, response, body) {
    //         //Check for error
    //         if (error) {
    //             return callback(error);
    //         }
    //         //Check for success status code
    //         if (response.statusCode !== 200) {
    //             return callback(new Error('Invalid Status Code Returned:' + response.statusCode));
    //         }
    //         //groom data
    //         var ungroomedData = JSON.parse(body);
    //         var groomedData = [];
      
    //         for(let i = 0; i < ungroomedData.length; i++) {
    //             var clone = {};
    //             clone["symbol"] = ungroomedData[i]["symbol"];
    //             clone["companyName"] = ungroomedData[i]["companyName"];
    //             clone["latestPrice"] = ungroomedData[i]["latestPrice"];
    //             groomedData.push(clone);
    //         }
    //         callback(null,groomedData);
    //     })
    // },

    // getStockDetail : function (ticker,callback) {
    //     request('https://api.iextrading.com/1.0/stock/' + ticker + '/quote', function(error, response, body) {
    //         //Check for error
    //         if (error) {
    //             return callback(error);
    //         }
    //         //Check for success status code
    //         if (response.statusCode !== 200) {
    //             return callback(new Error('Invalid Status Code Returned:' + response.statusCode));
    //         }
    //         //groom data
    //         var ungroomedData = JSON.parse(body);

    //         var clone = {};
    //         clone["symbol"] = ungroomedData["symbol"];
    //         clone["companyName"] = ungroomedData["companyName"];
    //         clone["latestPrice"] = ungroomedData["latestPrice"];
    //         clone["primaryExchange"] = ungroomedData["primaryExchange"];
    //         clone["sector"] = ungroomedData["sector"];
    //         callback(null,clone);
    //     })
    // },

    // getStocksMonitored : function (callback) {
    //     db.stocks_watched.find(function(error, response){
    //         if (error) {
    //             return callback(error);
    //         }
    //         callback(null,response);
    //     });
    // },

    getSuggestedStocks : function (searchString, callback) {
        request('http://search.xignite.com/Search/Suggest?parameter=XigniteFinancials.GetCompanyBalanceSheet.Identifier&term=' + searchString + '&tags=XNYS,XNAS', function(error, response, body) {
            //Check for error
            if (error) {
                return callback(error);              
            }
            //Check for success status code
            if (response.statusCode !== 200) {
                return callback(new Error('Invalid Status Code Returned:' + response.statusCode));           
            }

            //groom data
            var ungroomedData = JSON.parse(body)['Results'];
            var groomedData = [];    
            for(let i = 0; i < ungroomedData.length && i < 5; i++) {
                var clone = {};
                clone["symbol"] = ungroomedData[i]["Value"];
                clone["companyName"] = ungroomedData[i]["Text"];
                groomedData.push(clone);
            }
            callback(null,groomedData);
        })
    }
};