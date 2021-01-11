#!/usr/bin/env node
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./api/routes/index');
const process = require('process');
const path = require('path');

let server;

function start({ altPort, appBasePath, hostname, baseUrl }) {
    const app = express();
    const port = altPort || process.env.PORT || 3000;

    const myRoutes = routes(appBasePath, hostname, port, baseUrl);

    app.use(bodyParser.json());

    app.use(baseUrl || '', myRoutes);

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

    server = app.listen(port);

    console.log('Listening on port', port);
    console.log(`Navigate to http://${hostname}:${port}${baseUrl || ''} for the admin UI`);

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
    const yargs = require('yargs/yargs');
    const { hideBin } = require('yargs/helpers');
    const argv = yargs(hideBin(process.argv)).argv;

    const baseUrl = argv.baseUrl || ''; 
    const altPort = argv.port || 3000;
    const hostname = argv.hostname || 'localhost';

    start({
        appBasePath: __dirname,
        hostname,
        baseUrl,
        altPort
    });
}