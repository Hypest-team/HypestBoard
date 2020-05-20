#!/usr/bin/env node 
const express = require('express');
const bodyParser = require('body-parser');

const routes = require('./api/routes/index');

const app = express();
let server;

app.use(bodyParser.json());

routes(app);

app.use(function (err, req, res, next) {
    let responseData;

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

function start(altPort) {
    const port = altPort || process.env.PORT || 3000;
    server = app.listen(port);

    console.log('Listening on port', port);
    console.log(`Navigate to http://localhost:${port}/ for the admin UI`);
}

function stop() {
    server.close(); 
}

module.exports = {
    app,
    start,
    stop
};

// Check if being launched as sever
if (require.main === module) {
    start();
}