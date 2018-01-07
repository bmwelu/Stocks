const request = require('request');
const mongojs = require('mongojs');
const db = mongojs('mongodb://bmwelu:bmwelu1@ds245337.mlab.com:45337/bmwelu_stocks', ['stocks_watched']);

module.exports = {
    getLatestStocks : function (callback) {
        request('https://api.iextrading.com/1.0/stock/market/list/mostactive', function(error, response, body) {
            //Check for error
            if (error) {
                return callback(error);
            }
            //Check for success status code
            if (response.statusCode !== 200) {
                return callback(new Error('Invalid Status Code Returned:' + response.statusCode));
            }
            //groom data
            var ungroomedData = JSON.parse(body);
            var groomedData = [];
      
            for(let i = 0; i < ungroomedData.length; i++) {
                var clone = {};
                clone["symbol"] = ungroomedData[i]["symbol"];
                clone["companyName"] = ungroomedData[i]["companyName"];
                clone["latestPrice"] = ungroomedData[i]["latestPrice"];
                groomedData.push(clone);
            }
            callback(null,groomedData);
        })
    },

    getStockDetail : function (ticker,callback) {
        request('https://api.iextrading.com/1.0/stock/' + ticker + '/quote', function(error, response, body) {
            //Check for error
            if (error) {
                return callback(error);
            }
            //Check for success status code
            if (response.statusCode !== 200) {
                return callback(new Error('Invalid Status Code Returned:' + response.statusCode));
            }
            //groom data
            var ungroomedData = JSON.parse(body);

            var clone = {};
            clone["symbol"] = ungroomedData["symbol"];
            clone["companyName"] = ungroomedData["companyName"];
            clone["latestPrice"] = ungroomedData["latestPrice"];
            clone["primaryExchange"] = ungroomedData["primaryExchange"];
            clone["sector"] = ungroomedData["sector"];
            callback(null,clone);
        })
    },

    getStocksMonitored : function (callback) {
        db.stocks_watched.find(function(error, response){
            if (error) {
                return callback(error);
            }
            callback(null,response);
        });
    }
};