var express = require('express');
var stocks = require('./routes/stocks');
var sectors = require('./routes/sectors');
var app = express();
const DefaultPort = 80;

var port = process.env.PORT || DefaultPort;

var detectDebug = function() {
    return process.env.NODE_ENV !== 'production';
};

// Add headers
app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/', stocks);
app.use('/stocks', stocks);
app.use('/sectors', sectors);

if (detectDebug)
{
    app.listen(port, function(){
        console.log('Server started on port ' + port);
    });
}
else //Openshift deploy
{
    var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080
    var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'

    server.listen(server_port, server_ip_address, function () {
        console.log( "Listening on " + server_ip_address + ", server_port " + port )
    });
}
