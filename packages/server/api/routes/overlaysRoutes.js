const {
    getManifest,
    getStaticRoutes,
    fixUpOverlayUrl,
    fixUpAppsWithRouting,
    fallback404
} = require('../controllers/overlaysController');
const express = require('express');
const serveIndex = require('serve-index');
const fs = require('fs');
path = require('path');

const routes = express.Router();

module.exports = (appBasePath, baseUrl) => {
    routes.route(['/', '/manifest.json'])
        .get(getManifest(appBasePath, baseUrl));

    getStaticRoutes(appBasePath, baseUrl).forEach((manifestEntry) => {
        const { path: overlayPath, servePath, notFoundUrl, appType } = manifestEntry;

        routes.route(`/${overlayPath}/**`)
            .get(fixUpOverlayUrl(overlayPath))
            .get(fixUpAppsWithRouting(appType))
            .get(express.static(servePath))
            .get(fallback404(servePath, notFoundUrl, appType))
            .get(serveIndex(servePath));
    });

    return routes;
};