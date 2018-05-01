var express = require('express');
var bodyParser = require('body-parser');

var routes = require('./api/routes/index');

var app = express();
var port = process.env.PORT || 3000;

app.use(bodyParser.json());

routes(app);

app.use(function (err, req, res, next) {
    var responseData;

    if (err.name === 'JsonSchemaValidation') {
        responseData = {
           statusText: 'Bad Request',
           jsonSchemaValidation: true,
           validations: err.validations
        };

        res.status(400).json(responseData);
    } else {
        next(err);
    }
});


app.listen(port);

console.log('Listening on port', port);
console.log('Navigate to http://localhost:' +  port + '/scoreboard.html for the overlay');
