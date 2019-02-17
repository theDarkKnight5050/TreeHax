
var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'),
    Bais = require('./api/models/biasModel'), //created model loading here
    bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://admin:treehacks2019@ds127771.mlab.com:27771/treehacks2019-aman');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./api/routes/biasRoutes'); //importing route
routes(app);

app.listen(port);

console.log('bias RESTful API server started on: ' + port);