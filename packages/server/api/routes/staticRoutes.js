const clientPath = require.resolve('@scoreman/client');

const path = require('path');
const express = require('express');

const basePath = path.dirname(require.resolve('../..'));
const staticPath = path.dirname(clientPath);

module.exports = function (app) {
    app.use('/api/config', express.static(
        path.resolve(basePath, 'data', 'config')
    ));
    app.use('/api/characters', express.static(
        path.resolve(basePath, 'data', 'characters')
    ));

    app.use('/', express.static(staticPath));
};
