var express = require('express');
var stocks = require('./routes/stocks');
var sectors = require('./routes/sectors');
var app = express();
const DefaultPort = 8080;
var StockSymbolLookup = require('stock-symbol-lookup');

var port = process.env.PORT || DefaultPort;

//Load stock lookup list at start
StockSymbolLookup.loadData();

// Add headers
// Add headers
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type');
    next();
});

app.use('/', stocks);
app.use('/stocks', stocks);
app.use('/sectors', sectors);

app.listen(port, function(){
    console.log('Server started on port ' + port);
});
