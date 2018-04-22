const request = require('request');
//const mongojs = require('mongojs');
//const db = mongojs('mongodb://bmwelu:bmwelu1@ds245337.mlab.com:45337/bmwelu_stocks', ['stocks_watched']);
const TimeSeriesFactory = require('../factories/time-series-factory');
const StockDetail = require('../models/stock-detail');
const SuccessStatusCode = 200;
const IntradayInterval = 0;
const MontlyInterval = 3;
const SuggestStockReturnAmount = 5;

module.exports = {
    updateStockPrices : function (tickers, callback) {
        request('https://www.alphavantage.co/query?function=BATCH_STOCK_QUOTES&symbols=' + tickers +'&apikey=' + 'YCZKYIG7S23CREP0', function(error, response, body) {
            //Check for error
            if (error) {
                return callback(error);
            }
            //Check for success status code
            if (response.statusCode !== SuccessStatusCode) {
                return callback(new Error('Invalid Status Code Returned:' + response.statusCode));
            }
            //groom data
            var ungroomedData = JSON.parse(body)['Stock Quotes'];
            var groomedData = [];
            for(let i = 0; i < ungroomedData.length; i++) {
                const clone = {};
                clone["symbol"] = ungroomedData[i]["1. symbol"];
                clone["latestPrice"] = ungroomedData[i]["2. price"];
                groomedData.push(clone);
            }
            callback(null,groomedData);
        })
    },

    getStockTimeSeriesData: function (ticker, interval, callback) {
        if (parseInt(interval) < IntradayInterval || parseInt(interval) > MontlyInterval) {
            return callback(new Error('Invalid interval. Must be 0(IntradayInterval) through 3(MontlyInterval)'));
        }
        const timeSeriesFactory = new TimeSeriesFactory();
        const timeSeries = timeSeriesFactory.createTimeSeries(interval);
        request(timeSeries.requestURL + ticker +'&apikey=' + 'YCZKYIG7S23CREP0', function(error, response, body) {
            //Check for error
            if (error) {timeSeries.requestURL
                return callback(error);
            }
            //Check for success status code
            if (response.statusCode !== SuccessStatusCode) {
                return callback(new Error('Invalid Status Code Returned:' + response.statusCode));
            }
            //groom data
            callback(null,timeSeries.parseBody(body));
        });
    },

    getStockDetail : function (ticker,callback) {
        request('https://api.iextrading.com/1.0/stock/' + ticker + '/quote', function(error, response, body) {
            //Check for error
            if (error) {
                return callback(error);
            }
            //Check for success status code
            if (response.statusCode !== SuccessStatusCode) {
                return callback(new Error('Invalid Status Code Returned:' + response.statusCode));
            }
            //groom data
            var ungroomedData = JSON.parse(body);

            const stockDetail = new StockDetail(ungroomedData["symbol"],
                                                ungroomedData["companyName"],
                                                ungroomedData["primaryExchange"],
                                                ungroomedData["sector"],
                                                ungroomedData["week52High"],
                                                ungroomedData["week52Low"])
            callback(null,stockDetail);
        })
    },

    getSuggestedStocks : function (searchString, callback) {
        request('http://search.xignite.com/Search/Suggest?parameter=XigniteFinancials.GetCompanyBalanceSheet.Identifier&term=' + searchString + '&tags=XNYS,XNAS', function(error, response, body) {
            //Check for error
            if (error) {
                return callback(error);              
            }
            //Check for success status code
            if (response.statusCode !== SuccessStatusCode) {
                return callback(new Error('Invalid Status Code Returned:' + response.statusCode));           
            }

            //groom data
            var ungroomedData = JSON.parse(body)['Results'];
            var groomedData = [];    
            for(let i = 0; i < ungroomedData.length && i < SuggestStockReturnAmount; i++) {
                var clone = {};
                clone["symbol"] = ungroomedData[i]["Value"];
                clone["companyName"] = ungroomedData[i]["Text"];
                groomedData.push(clone);
            }
            callback(null,groomedData);
        })
    },

    getSectorPerformance : function (callback) {
        request('https://www.alphavantage.co/query?function=SECTOR' & 'apikey=' + 'YCZKYIG7S23CREP0', function(error, response, body) {
            //Check for error
            if (error) {
                return callback(error);
            }
            //Check for success status code
            if (response.statusCode !== SuccessStatusCode) {
                return callback(new Error('Invalid Status Code Returned:' + response.statusCode));
            }
            //groom data
            var ungroomedData = JSON.parse(body)['Rank A: Real-Time Performance'];
            var groomedData = [];
            console.log(ungroomedData);
            // for(let i = 0; i < ungroomedData.length; i++) {
            //     const clone = {};
            //     clone["symbol"] = ungroomedData[i]["1. symbol"];
            //     clone["latestPrice"] = ungroomedData[i]["2. price"];
            //     groomedData.push(clone);
            // }
            callback(null,groomedData);
        })
    }
};