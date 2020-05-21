#!/usr/bin/env node
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./api/routes/index');
const process = require('process');

let server;

function start({ altPort, appBasePath }) {
    const app = express();

    console.log('using base path:', appBasePath);

    app.use(bodyParser.json());

    routes(app, appBasePath);

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

    const port = altPort || process.env.PORT || 3000;
    server = app.listen(port);

    console.log('Listening on port', port);
    console.log(`Navigate to http://localhost:${port}/ for the admin UI`);

    return { app, server };
}

function stop() {
    server.close();
}

module.exports = {
    start,
    stop
};

// Check if being launched as server
if (require.main === module) {
    start({
        appBasePath: __dirname
    });
}