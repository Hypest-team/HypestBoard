const { getManifest, getStaticRoutes } = require('../controllers/overlaysController');
const express = require('express');
const serveIndex = require('serve-index');

module.exports = function (app, appBasePath) {
    app.use('/overlays/manifest.json', getManifest(appBasePath));

    getStaticRoutes(appBasePath).forEach(({ path, servePath }) => {
        app.use(`/overlays/${path}`, express.static(servePath));
        app.use(`/overlays/${path}`, serveIndex(servePath));
    });
};