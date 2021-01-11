const path = require('path');
const fs = require('fs');

const EXT_OVERLAY_PATHNAME = 'overlays';
const NPM_OVERLAY_PREFIX = 'scoreman-overlay';

let manifestCache = null;

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

function getExtOverlayPaths(basePath) {
    const extOverlayPath = path.resolve(basePath, EXT_OVERLAY_PATHNAME);

    if (fs.existsSync(extOverlayPath)) {
        return fs.readdirSync(extOverlayPath).map((fileName) =>
            // return full path names for all the external overlay packages
            path.resolve(extOverlayPath, fileName)
        )
            // ensure we get full path dirs
            .filter((dirname) => {
                // Ensure it is a dir
                if (fs.existsSync(dirname)) {
                    const stat = fs.statSync(dirname);
                    return stat.isDirectory();
                } else {
                    return false;
                }
            });
        ;
    } else {
        return [];
    }
}


function resolveOverlayPkgBaseName(overlayPath) {
    let name;
    const pkgJson = path.resolve(overlayPath, 'package.json');

    if (fs.existsSync(pkgJson)) {
        // try reading package.json
        const pkg = require(pkgJson);
        name = pkg.name;
    } else {
        // no package.json? dirname it is
        name = `ext-${path.basename(overlayPath)}`;
    }

    return name;
}

function createOverlayManifest(basePath, homepage) {
    if (!manifestCache) {
        const overlayPaths = [
            ...getNpmOverlayPaths(),
            ...getExtOverlayPaths(basePath)
        ];

        const baseNamesCount = {};

        manifestCache = overlayPaths
            .filter((overlayPath) =>
                fs.existsSync(path.resolve(overlayPath, 'manifest.json'))
            )
            .map((overlayPath) => ({
                manifestText: fs.readFileSync(path.resolve(overlayPath, 'manifest.json')),
                overlayPath
            }))
            .map(({ manifestText, overlayPath }, i, manifestArr) => {

                const manifest = JSON.parse(manifestText);

                const base = resolveOverlayPkgBaseName(overlayPath);
                if (!baseNamesCount[base]) {
                    baseNamesCount[base] = 0;
                }
                baseNamesCount[base]++;
                const nameCount = baseNamesCount[base];

                manifest.base = `${base}${nameCount > 1 ? `-${nameCount}` : ''}`;
                manifest.pkgPath = overlayPath;

                // do dedeups
                const dups = manifestArr.find((m) => m.base = manifest.base);
                if (dups.length > 0) {
                    manifest.base = `${manifest.base}-${dups.length}`;
                }

                manifest.overlays = (manifest.overlays || []).map((entry) => {
                    return {
                        ...entry,
                        url: `${homepage}/overlays/${manifest.base}/${entry.url}`
                    }
                });

                return manifest;

            });
    }


    return manifestCache;
}

function getManifest(basePath, homepage) {
    const manifest = createOverlayManifest(basePath, homepage);

    return (req, res) => {
        const filteredManifest = manifest.map(({ pkgPath, ...rest }) => rest);
        res.json(filteredManifest);
    };
}

function getStaticRoutes(basePath, homepage) {
    const manifest = createOverlayManifest(basePath, homepage);

    return manifest.map(({ base, pkgPath }) => {
        return { path: base, servePath: pkgPath };
    });
}

function getServerConfig({
    homepage,
    hostname,
    port,
    baseUrl,
}) {
    return (req, res, next) => {
        const serverData = {
            baseUrl,
            homepage,
            hostname,
            port
        };

        if (req.path.endsWith('!serverconfig')) {
            console.log('used !serverconfig')
            res.json(serverData);
            res.end();
        }

        next();
    }
}

// This is an hack that will be deprecated
function getServerConfigWithoutCheck({
    homepage,
    hostname,
    port,
    baseUrl,
}) {
    return (req, res, next) => {
        const serverData = {
            baseUrl,
            homepage,
            hostname,
            port
        };

        console.log('url', req.path);

        console.log('called without check')

        res.json(serverData);
        res.end();
        next();
    }
}

module.exports = {
    getManifest,
    getStaticRoutes,
    getServerConfig,
    getServerConfigWithoutCheck
};