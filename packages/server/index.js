#!/usr/bin/env node
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./api/routes/index');
const process = require('process');
const passport = require('passport');

let server;

function start({ altPort, appBasePath, hostname, baseUrl, useCors, skipAuth }) {
    const app = express();
    const port = altPort || process.env.PORT || 3000;

    const myRoutes = routes(appBasePath, hostname, port, baseUrl, skipAuth);

    if (useCors) {
        console.log('CORS is enabled');
        app.use(require('cors')());
    }

    app.use(bodyParser.json());
    app.use(passport.initialize());
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

    let baseUrl = argv.baseUrl || ''; 
    const altPort = argv.port || 3000;
    const hostname = argv.hostname || 'localhost';
    const useCors = !!argv.cors || false;
    const skipAuth = !!argv.skipAuth || false;

    if (baseUrl && !baseUrl.startsWith('/')) {
        baseUrl = `/${baseUrl}`;
    }

    start({
        appBasePath: __dirname,
        hostname,
        baseUrl,
        altPort,
        useCors,
        skipAuth
    });
}