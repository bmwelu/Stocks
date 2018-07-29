var express = require('express');
var stocks = require('./routes/stocks');
var sectors = require('./routes/sectors');
var app = express();
const DefaultPort = 8080;

var port = process.env.PORT || DefaultPort;

// Add headers
app.use(function (req, res, next) {
    res.header("Content-Type", "application/javascript")
    next();
});

app.use('/', stocks);
app.use('/stocks', stocks);
app.use('/sectors', sectors);

app.listen(port, function(){
    console.log('Server started on port ' + port);
});
