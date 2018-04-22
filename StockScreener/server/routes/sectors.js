var express = require('express');
var router = express.Router();
var sectorservice = require('../services/sector-service');

router.get('/', function(req, res){
    sectorservice.getSectorPerformance(function(error, results) {
      if (error) {
        res.status(500).send({ error: 'Failure retrieving sector information.'})
      }
      res.send(results);  
    });
});
module.exports = router;