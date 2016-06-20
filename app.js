/**
 * Created by ruic on 03/04/2016.
 */



//var Promise = require('promise/lib/es6-extensions');
var logger = require('./loggerConfig');

var express = require('express');
var ejs = require('ejs');
var app = express();

var apiController = require('./controllers/apiController');
var htmlController = require('./controllers/htmlController');

var port = process.env.PORT || 3000;



app.set('views', __dirname + '/app');
app.use('/bower_components', express.static(__dirname + '/bower_components'));
app.use('/', express.static(__dirname + '/app'));

app.set('view engine', 'html');
app.engine('html', ejs.renderFile);

app.use('/', function (req, res, next) {
    console.log('Request Url:' + req.url);
    next();
});

htmlController(app);

apiController(app);



app.listen(port);

console.log("--Started--");