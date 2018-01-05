var express = require('express');
var router = express.Router();
var stockservice = require('../services/stock-service');

router.get('/stocks', function(req, res){
  stockservice.getLatestStocks(function(error, results) {
    if (error) {
      res.status(500).send({ error: 'Failure retrieving latest stocks' })
    }
    res.send(results);  
  });
});

router.get('/stocks/:ticker', function(req, res){
  var ticker = req.params.ticker;
  stockservice.getStockDetail(ticker, function(error, results) {
    if (error) {
      res.status(500).send({ error: 'Failure retrieving ' + ticker + ' stock detail.' })
    }
    res.send(results);  
  });
})

module.exports = router;