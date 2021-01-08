const clientPath = require.resolve('@scoreman/client');

const path = require('path');

const staticPath = path.dirname(clientPath);

const express = require('express');
const routes = express.Router();

console.log('logging client path', clientPath);
console.log('logging static path', staticPath);

routes.route('/*')
    .get(express.static(staticPath))

module.exports = routes;
