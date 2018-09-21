const request = require('request');
//const mongojs = require('mongojs');
//const db = mongojs('mongodb://bmwelu:bmwelu1@ds245337.mlab.com:45337/bmwelu_stocks', ['stocks_watched']);
const TimeSeriesFactory = require('../factories/time-series-factory');
const StockDetail = require('../models/stock-detail');
const GlobalConstants = require('../models/global-constants');
var StockSymbolLookup = require('stock-symbol-lookup');
const SuccessStatusCode = 200;
const IntradayInterval = 0;
const MontlyInterval = 3;
const SuggestStockReturnAmount = 5;

class StockService {
    getStockNews(id, callback) { 
        var maxNewsArcticles = (id.toUpperCase() === 'MARKET') ? GlobalConstants.maxMarketNewsArcticles : GlobalConstants.maxStockNewsArcticles;
        request(GlobalConstants.stockInfoURL + id + '/news/last/' + maxNewsArcticles, function(error, response, body) {
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
                var result;
                if(id.toUpperCase() === 'MARKET')
                {
                    result = Object.keys(ungroomedData).map(function(key) {
                        return { headline: ungroomedData[key]["headline"], 
                                 url: ungroomedData[key]["url"],
                                 source: ungroomedData[key]["source"],
                                 image: ungroomedData[key]["image"]}
                    });
                }
                else
                {
                    result = Object.keys(ungroomedData).map(function(key) {
                        return { headline: ungroomedData[key]["headline"], 
                                 url: ungroomedData[key]["url"],
                                 source: ungroomedData[key]["source"]}
                    });
                }
    
                callback(null,result);
            }
            catch (err)
            {
                return callback(err);
            }
        })
    }

    getStockDetail(ticker,callback) {
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
                
                self.getStockNews(ticker, function(error, newsResults) {
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
                        newsResults)
                        
                    callback(null,stockDetail);
                });
            }
            catch (err)
            {
                return callback(err);
            }
        })
    }

    updateStockPrices(tickers, callback) {
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
    }

    getStockTimeSeriesData(ticker, interval, callback) {
        if (parseInt(interval) < IntradayInterval || parseInt(interval) > MontlyInterval) {
            return callback(new Error('Invalid interval. Must be 0(one day) through 3(5 years)'));
        }
        const timeSeriesFactory = new TimeSeriesFactory();
        const timeSeries = timeSeriesFactory.createTimeSeries(interval, ticker);
        request(GlobalConstants.stockInfoURL + ticker + '/chart/' + timeSeries.timeSlice + '?changeFromClose=true', function(error, response, body) {          
            //Check for error
            if (error) {
                console.log('1')
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
    }

    getSuggestedStocks(searchString, callback) {
        try
        {
            StockSymbolLookup.loadData()
            .then((data) => {
                StockSymbolLookup.searchBySymbol(searchString, 5)
                .then((data) => {
                    var result = Object.keys(data).map(function(key) {
                        return { symbol: data[key]["symbol"], 
                                 companyName: data[key]["securityName"].substring(0,GlobalConstants.maxStockDescriptionLength)}
                    });
                   callback(null,result.filter(obj => obj["symbol"] !== null).slice(0,SuggestStockReturnAmount));
                });
            });
        }
        catch (err)
        {
            return callback(err);
        }
    };

    getPreviousCloseStockValue(ticker, callback) {
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
}

var self = module.exports = new StockService();