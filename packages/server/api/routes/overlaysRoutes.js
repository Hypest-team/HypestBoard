const { getManifest, getStaticRoutes } = require('../controllers/overlaysController');
const express = require('express');
const serveIndex = require('serve-index');

const routes = express.Router();
const pathMod = require('path');

module.exports = (appBasePath, baseUrl) => {
    routes.route(['/', '/manifest.json'])
        .get(getManifest(appBasePath, baseUrl));

    getStaticRoutes(appBasePath, baseUrl).forEach((manifestEntry) => {
        const { path, servePath } = manifestEntry;

        // Quick hack so overlays can know where they stand
        routes.route(`/${path}/config.json`)
            .get((req, res, next) => {
                res.json({
                    baseUrl,
                })
                next();
            });

        routes.route(`/${path}/*`)
            .get((req, res, next) => {
                // Remove the overlay base path, so serveIndex and serveStatic
                // can work properly
                const regExp = new RegExp(`^\/${path}\/`);
                req.url = req.url.replace(regExp, '');
                next();
            })
            .get(serveIndex(servePath))
            .get(express.static(servePath));
    });


    return routes;
};