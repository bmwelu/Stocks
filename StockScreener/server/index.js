var express = require('express');
var stocks = require('./routes/stocks');
var app = express();

var port = process.env.PORT || 80;

// Add headers
app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/', stocks);
app.use('/stocks', stocks);

app.listen(port, function(){
	console.log('Server started on port ' + port);
});