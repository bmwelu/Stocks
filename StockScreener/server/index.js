var express = require('express');
var stocks = require('./routes/stocks');
var sectors = require('./routes/sectors');
var cors = require('cors')
var app = express();
const DefaultPort = 8080;

var port = process.env.PORT || DefaultPort;

// Add headers
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use('/', stocks);
app.use('/stocks', stocks);
app.use('/sectors', sectors);

app.listen(port, function(){
    console.log('Server started on port ' + port);
});
