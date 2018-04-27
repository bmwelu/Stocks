const request = require('request');
//const mongojs = require('mongojs');
//const db = mongojs('mongodb://bmwelu:bmwelu1@ds245337.mlab.com:45337/bmwelu_stocks', ['stocks_watched']);
const TimeSeriesFactory = require('../factories/time-series-factory');
const StockDetail = require('../models/stock-detail');
const GlobalConstants = require('../models/global-constants');
const SuccessStatusCode = 200;
const IntradayInterval = 0;
const MontlyInterval = 3;
const SuggestStockReturnAmount = 5;

module.exports = {
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
            //groom data
            var ungroomedData = JSON.parse(body);
            var groomedData = [];

            for (var prop in ungroomedData) {
                if (ungroomedData.hasOwnProperty(prop)) {
                    const clone = {};
                    clone["symbol"] = ungroomedData[prop]["quote"]["symbol"];
                    clone["latestPrice"] = ungroomedData[prop]["quote"]["latestPrice"];
                    clone["percentChange"] = (parseFloat(ungroomedData[prop]["quote"]["changePercent"]) * 100).toFixed(2) + '%';
                    groomedData.push(clone);
                }
            }
            callback(null,groomedData);
        })
    },

    getStockTimeSeriesData: function (ticker, interval, callback) {
        if (parseInt(interval) < IntradayInterval || parseInt(interval) > MontlyInterval) {
            return callback(new Error('Invalid interval. Must be 0(one day) through 3(5 years)'));
        }
        const timeSeriesFactory = new TimeSeriesFactory();
        const timeSeries = timeSeriesFactory.createTimeSeries(interval);
        //request(timeSeries.requestURL + ticker +'&apikey=' + GlobalConstants.alphavantageapikey, function(error, response, body) {
        request(GlobalConstants.stockInfoURL + ticker + '/chart/' + timeSeries.requestURL, function(error, response, body) {
            
            //Check for error
            if (error) {
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
        request(GlobalConstants.stockInfoURL + ticker + '/quote', function(error, response, body) {
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
                                                ungroomedData["companyName"].substring(0,28),
                                                ungroomedData["primaryExchange"],
                                                ungroomedData["sector"],
                                                ungroomedData["week52High"],
                                                ungroomedData["week52Low"],
                                                ungroomedData["latestPrice"])
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
                clone["companyName"] = ungroomedData[i]["Text"].substring(0,28);
                groomedData.push(clone);
            }
            callback(null,groomedData);
        })
    }
};