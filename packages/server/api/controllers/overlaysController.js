const path = require('path');
const fs = require('fs');
const express = require('express');
const serveIndex = require('serve-index');

const defaultOverlaysPath = require.resolve('@scoreman/overlays');

const basePath = path.dirname(require.resolve('../..'));

const EXT_OVERLAY_PATHNAME = 'overlays';

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

function resolveOverlayManifest() {
    return overlayPaths.filter((overlayPath) => {
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

}

function getManifest(req, res, next) {
    if (path.basename(req.path) === 'manifest.json') {
        res.json(resolveOverlayManifest());
    } else {
        next();
    }
}

const getOverlays = [
    getManifest,

    // Middlewares for serving static overlay files
    ...overlayPaths.reduce((acc, overlayDir) => {
        acc.push(serveIndex(overlayDir));
        acc.push(express.static(overlayDir));
        return acc;
    }, [])
]

module.exports = {
    getOverlays
}