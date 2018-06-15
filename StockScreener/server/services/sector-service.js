const request = require('request');
const SuccessStatusCode = 200;
const GlobalConstants = require('../models/global-constants');

module.exports = {
    getSectorPerformance : function (callback) {
        request('https://www.alphavantage.co/query?function=SECTOR&apikey=' + GlobalConstants.alphavantageapikey, function(error, response, body) {
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
                var ungroomedData = JSON.parse(body)['Rank A: Real-Time Performance'];
                var result = Object.keys(ungroomedData).map(function(key) {
                    return { sectorName: String(key), percentChange: ungroomedData[key]}
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