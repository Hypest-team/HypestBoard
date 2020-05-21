const path = require('path');
const fs = require('fs');
const express = require('express');
//const serveIndex = require('serve-index');

const defaultOverlaysPath = require.resolve('@scoreman/overlays');

const appPath = path.dirname(require.resolve('../..'));

const EXT_OVERLAY_PATHNAME = 'overlays';
const NPM_OVERLAY_PREFIX = 'scoreman-overlay';

function getNpmOverlayPaths() {
    return require.resolve.paths('')
        .reduce((acc, npmDir) => {
            try {
                // Read one of the npm dirs
                fs.readdirSync(npmDir)
                    // Filter out what is not a scoreman overlay
                    .filter((npmDirPkg) => npmDirPkg.startsWith(NPM_OVERLAY_PREFIX))

                    // make everything in that npm dir a full path
                    .map((file) => path.resolve(npmDir, file))

                    // make sure all we get are directories
                    .filter((npmDirPkgs) => {
                        try {
                            // Ensure it is a dir
                            const stat = fs.statSync(npmDirPkgs);
                            return stat.isDirectory();
                        } catch (e) {
                        }

                        return false;
                    })

                    // push all the found directories into the accumulator
                    .forEach((overlayPath) => {
                        acc.push(overlayPath);
                    });

            } catch (e) {
            }

            return acc;
        }, []);
}

function getExtOverlayPaths() {
    const extOverlayPath = path.resolve(appPath, EXT_OVERLAY_PATHNAME);

    try {
        return fs.readdirSync(extOverlayPath).map((fileName) =>
            // return full path names for all the external overlay packages
            path.resolve(extOverlayPath, fileName)
        )
            // ensure we get full path dirs
            .filter((dirname) => {
                // Ensure it is a dir
                try {
                    const stat = fs.statSync(path.resolve(dirname));
                    return stat.isDirectory();
                } catch (e) {

                }
                return false;
            });
        ;
    } catch (e) {
        console.warn('No external overlays to load');
        return [];
    }
}

const overlayPaths = [
    ...getNpmOverlayPaths(),
    ...getExtOverlayPaths(),
    path.dirname(defaultOverlaysPath)
];

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
        //acc.push(serveIndex(overlayDir));
        acc.push(express.static(overlayDir));
        return acc;
    }, [])
];

module.exports = {
    getOverlays
};