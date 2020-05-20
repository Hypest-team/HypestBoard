const clientPath = require.resolve('@scoreman/client');
const defaultOverlaysPath = require.resolve('@scoreman/overlays');

const path = require('path');
const express = require('express');
const fs = require('fs');
const serveIndex = require('serve-index');

const EXT_OVERLAY_PATHNAME = 'overlays';

const basePath = path.dirname(require.resolve('../..'));
const staticPath = path.dirname(clientPath);

const baseOverlayPaths = [
    ...require.resolve.paths(''),
    path.resolve(basePath, EXT_OVERLAY_PATHNAME),
];

const extOverlayPaths = baseOverlayPaths.reduce((acc, npmDir) => {
    try {
        const overlayPkgs = fs.readdirSync(npmDir).filter((npmDirPkgs) => {
            return npmDirPkgs.startsWith('scoreman-overlay');
        })
            .map((overlayPkg) => {
                return path.resolve(npmDir, overlayPkg);
            });

        overlayPkgs.forEach((overlayPath) => {
            acc.push(overlayPath);
        });
    } catch (e) {

    }

    return acc;
}, []);

const overlayPaths = [
    path.dirname(defaultOverlaysPath),
    ...extOverlayPaths
]

function overlayManifest(req, res) {
    const overlayObj = overlayPaths.filter((overlayPath) => {
        return fs.existsSync(path.resolve(overlayPath, 'manifest.json'));
    })
        .map((overlayPath) => ({
            manifest: fs.readFileSync(path.resolve(overlayPath, 'manifest.json')),
            overlayPath
        }))
        .map(({ manifest, overlayPath }) => {
            const json = JSON.parse(manifest);

            json.pkgPath = overlayPath;
            return json;
        });

    res.json(overlayObj);
}

module.exports = function (app) {
    app.use('/api/config', express.static(
        path.resolve(basePath, 'data', 'config')
    ));
    app.use('/api/characters', express.static(
        path.resolve(basePath, 'data', 'characters')
    ));

    app.use('/', express.static(staticPath));

    app.use('/overlays/manifest.json', overlayManifest);

    overlayPaths.forEach((overlayDir) => {
        app.use('/overlays', serveIndex(overlayDir));
        app.use('/overlays', express.static(overlayDir));
    });

};
