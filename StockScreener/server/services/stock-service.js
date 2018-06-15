const request = require('request');
//const mongojs = require('mongojs');
//const db = mongojs('mongodb://bmwelu:bmwelu1@ds245337.mlab.com:45337/bmwelu_stocks', ['stocks_watched']);
const TimeSeriesFactory = require('../factories/time-series-factory');
const StockDetail = require('../models/stock-detail');
const StockNews = require('../models/stock-news');
const GlobalConstants = require('../models/global-constants');
const SuccessStatusCode = 200;
const IntradayInterval = 0;
const MontlyInterval = 3;
const SuggestStockReturnAmount = 5;

module.exports = {

    getStockNews : getStockNews,

    updateStockPrices : function (tickers, callback) {
        request(GlobalConstants.stockInfoURL + 'market/batch?symbols=' + tickers +'&types=quote&range=1m', function(error, response, body) {
            //Check for error
            if (error) {
                return callback(error);
            }
            //Check for success status code
            if (response.statusCode !== SuccessStatusCode) {
                return callback(new Error('Invalid Status Code Returned:' + response.statusCode));
            }
            try
            {
                //groom data
                var ungroomedData = JSON.parse(body);
                var result = Object.keys(ungroomedData).map(function(key) {
                    return { symbol: ungroomedData[key]["quote"]["symbol"], 
                             latestPrice: ungroomedData[key]["quote"]["latestPrice"],
                             percentChange:  (parseFloat(ungroomedData[key]["quote"]["changePercent"]) * 100).toFixed(2) + '%'}
                });
                callback(null,result);
            }
            catch (err)
            {
                return callback(err);
            }
        })
    },

    getStockTimeSeriesData: function (ticker, interval, callback) {
        if (parseInt(interval) < IntradayInterval || parseInt(interval) > MontlyInterval) {
            return callback(new Error('Invalid interval. Must be 0(one day) through 3(5 years)'));
        }
        const timeSeriesFactory = new TimeSeriesFactory();
        const timeSeries = timeSeriesFactory.createTimeSeries(interval, ticker);
        request(GlobalConstants.stockInfoURL + ticker + '/chart/' + timeSeries.requestURL, function(error, response, body) {          
            //Check for error
            if (error) {
                return callback(error);
            }
            //Check for success status code
            if (response.statusCode !== SuccessStatusCode) {
                return callback(new Error('Invalid Status Code Returned:' + response.statusCode));
            }
            try
            {
                //groom data
                callback(null,timeSeries.parseBody(body));
            }
            catch (err)
            {
                return callback(err);
            }
        });
    },

    getStockDetail : function (ticker,callback) {
        request(GlobalConstants.stockInfoURL + ticker + '/quote' , function(error, response, body) {
            //Check for error
            if (error) {
                return callback(error);
            }
            //Check for success status code
            if (response.statusCode !== SuccessStatusCode) {
                return callback(new Error('Invalid Status Code Returned:' + response.statusCode));
            }
            try
            {
                //groom data
                var ungroomedData = JSON.parse(body);

                getStockNews(ticker, function(error, results) {
                    if (error) {
                        return callback(error);
                    }
                    const stockDetail = new StockDetail(ungroomedData["symbol"],
                        ungroomedData["companyName"].substring(0,GlobalConstants.maxStockDescriptionLength),
                        ungroomedData["primaryExchange"],
                        ungroomedData["sector"],
                        ungroomedData["week52High"],
                        ungroomedData["week52Low"],
                        ungroomedData["latestPrice"],
                        ungroomedData["previousClose"],
                        results)
    
                    callback(null,stockDetail);
                });
            }
            catch (err)
            {
                return callback(err);
            }
        })
    },

    getSuggestedStocks : function (searchString, callback) {
        request(GlobalConstants.suggestedStockURL + searchString + '&tags=XNYS,XNAS', function(error, response, body) {
            //Check for error
            if (error) {
                return callback(error);              
            }
            //Check for success status code
            if (response.statusCode !== SuccessStatusCode) {
                return callback(new Error('Invalid Status Code Returned:' + response.statusCode));           
            }
            try
            {
                //groom data
                var ungroomedData = JSON.parse(body)['Results'];
                var groomedData = [];    
                for(let i = 0; i < ungroomedData.length && i < SuggestStockReturnAmount; i++) {
                    var clone = {};
                    clone["symbol"] = ungroomedData[i]["Value"];
                    clone["companyName"] = ungroomedData[i]["Text"].substring(0,GlobalConstants.maxStockDescriptionLength);
                    groomedData.push(clone);
                }
                callback(null,groomedData);
            }
            catch (err)
            {
                return callback(err);
            }
        })
    },

    getPreviousCloseStockValue : function (ticker, callback) {
        request(GlobalConstants.stockInfoURL + 'market/batch?symbols=' + ticker +'&types=quote&range=1m', function(error, response, body) {
            //Check for error
            if (error) {
                return callback(error);
            }
            //Check for success status code
            if (response.statusCode !== SuccessStatusCode) {
                return callback(new Error('Invalid Status Code Returned:' + response.statusCode));
            }
            try
            {
                //groom data
                var ungroomedData = JSON.parse(body);
                var result = Object.keys(ungroomedData).map(function(key) {
                    return { symbol: ungroomedData[key]["quote"]["symbol"], 
                             previousClose: ungroomedData[key]["quote"]["previousClose"]}
                });
                callback(null,result);
            }
            catch (err)
            {
                return callback(err);
            }
        })
    }
};

function getStockNews(ticker, callback) {
    request(GlobalConstants.stockInfoURL + ticker + '/news/last/' + GlobalConstants.maxNewsArcticles, function(error, response, body) {
        //Check for error
        if (error) {
            return callback(error);
        }
        //Check for success status code
        if (response.statusCode !== SuccessStatusCode) {
            return callback(new Error('Invalid Status Code Returned:' + response.statusCode));
        }
        try
        {
            //groom data
            var ungroomedData = JSON.parse(body);
            var result = Object.keys(ungroomedData).map(function(key) {
                return { headline: ungroomedData[key]["headline"], 
                         url: ungroomedData[key]["url"],
                         source: ungroomedData[key]["source"]}
            });
            callback(null,result);
        }
        catch (err)
        {
            return callback(err);
        }
    })
}