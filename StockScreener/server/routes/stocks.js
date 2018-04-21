var express = require('express');
var router = express.Router();
var stockservice = require('../services/stock-service');

router.get('/stocks/:stocks', function(req, res){
  stockservice.updateStockPrices(req.params.stocks, function(error, results) {
    if (error) {
      res.status(500).send({ error: 'Failure retrieving latest stocks' })
    }   
    res.send(results);  
  });
});

router.get('/stocks/:ticker/timeseries-data/:interval', function(req, res){
    var ticker = req.params.ticker;
    var interval = req.params.interval;
    stockservice.getStockTimeSeriesData(ticker, interval, function(error, results) {
      if (error) {
        res.status(500).send({ error: 'Failure retrieving watched stocks' })
      }   
      res.send(results);
    });
  });

router.get('/stocks/:ticker/detail', function(req, res){
  var ticker = req.params.ticker;
  stockservice.getStockDetail(ticker, function(error, results) {
    if (error) {
      res.status(500).send({ error: 'Failure retrieving ' + ticker + ' stock detail.' })
    }
    res.send(results);  
  });
});

router.get('/stocks/suggested-stocks/:searchString', function(req, res){
  var searchString = req.params.searchString;
  stockservice.getSuggestedStocks(searchString, function(error, results) {
    if (error) {
      res.status(500).send({ error: 'Failure retrieving ' + searchString + ' suggested stocks.' })
    }
    res.send(results);  
  });
});

module.exports = router;