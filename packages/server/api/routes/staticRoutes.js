const clientPath = require.resolve('@scoreman/client');
const overlays = require('@scoreman/overlays');

const path = require('path');
const express = require('express');
const serveIndex = require('serve-index');

const EXT_OVERLAY_PATHNAME = 'overlays';

module.exports = function (app) {
    const basePath = path.dirname(require.main.filename);
    const staticPath = path.dirname(clientPath);

    app.use('/api/config', express.static(
        path.resolve(basePath, 'data', 'config')
    ));
    app.use('/api/characters', express.static(
        path.resolve(basePath, 'data', 'characters')
    ));

    app.use('/', express.static(staticPath));

    app.use('/overlays', serveIndex(path.resolve(basePath, EXT_OVERLAY_PATHNAME)));
    app.use('/overlays', serveIndex(overlays.root));

    app.use('/overlays', express.static(path.resolve(basePath, EXT_OVERLAY_PATHNAME)));
    app.use('/overlays', express.static(overlays.root));
};
