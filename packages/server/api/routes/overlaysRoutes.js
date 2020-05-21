const { getManifest, staticRoutes } = require('../controllers/overlaysController');
const express = require('express');
const serveIndex = require('serve-index');

module.exports = function (app) {
    app.use('/overlays/manifest.json', getManifest);

    staticRoutes.forEach(({ path, servePath }) => {
        app.use(`/overlays/${path}`, express.static(servePath));
        app.use(`/overlays/${path}`, serveIndex(servePath));
    });
};