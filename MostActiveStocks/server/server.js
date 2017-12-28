var express = require('express');
var index = require('./routes/index');
var stocks = require('./routes/stocks');
var app = express();

var port = 8000;

// Add headers
app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/', index);
app.use('/stocks', stocks);

app.listen(port, function(){
	console.log('Server started on port ' + port);
});