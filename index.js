var express = require('express');
var bodyParser = require('body-parser');

var routes = require('./api/routes/index');

var app = express();
var port = process.env.PORT || 3000;

app.use(bodyParser.json());

routes(app);

app.listen(port);

console.log('Listening on port', port);
console.log('Navigate to http://localhost:' +  port + '/scoreboard.html for the overlay');
