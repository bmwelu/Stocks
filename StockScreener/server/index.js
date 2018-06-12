var express = require('express');
var stocks = require('./routes/stocks');
var sectors = require('./routes/sectors');
var app = express();

// Add headers
app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/', stocks);
app.use('/stocks', stocks);
app.use('/sectors', sectors);

var server_port = process.env.OPENSHIFT_NODEJS_PORT || 80
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || 'localhost'

app.listen(server_port, server_ip_address, function () {
    console.log( "Listening on " + server_ip_address + ", server_port " + server_port )
});
