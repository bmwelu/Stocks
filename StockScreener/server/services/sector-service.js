const request = require('request');
const SuccessStatusCode = 200;

module.exports = {
    getSectorPerformance : function (callback) {
        request('https://www.alphavantage.co/query?function=SECTOR&apikey=YCZKYIG7S23CREP0', function(error, response, body) {
            //Check for error
            if (error) {
                return callback(error);
            }
            //Check for success status code
            if (response.statusCode !== SuccessStatusCode) {
                return callback(new Error('Invalid Status Code Returned:' + response.statusCode));
            }
            var ungroomedData = JSON.parse(body)['Rank A: Real-Time Performance'];
            var result = Object.keys(ungroomedData).map(function(key) {
                return { sectorName: String(key), percentChange: ungroomedData[key]}
              });
            callback(null,result);
        })
    }
};