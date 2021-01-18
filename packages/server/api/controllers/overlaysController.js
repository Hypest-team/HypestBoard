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

function getOverlayManifest(basePath, baseUrl) {
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

                const overlayPkgBaseName = resolveOverlayPkgBaseName(overlayPath);
                if (!baseNamesCount[overlayPkgBaseName]) {
                    baseNamesCount[overlayPkgBaseName] = 0;
                }
                baseNamesCount[overlayPkgBaseName]++;
                const nameCount = baseNamesCount[overlayPkgBaseName];

                manifest.pkgBase = `${overlayPkgBaseName}${nameCount > 1 ? `-${nameCount}` : ''}`;
                manifest.pkgPath = overlayPath;
                manifest.pkgServePath = `${overlayPath}/${manifest.baseUrl || ''}`;

                // do dedeups
                const dups = manifestArr.find((m) => m.base = manifest.pkgBase);
                if (dups.length > 0) {
                    manifest.pkgBase = `${manifest.pkgBase}-${dups.length}`;
                }

                manifest.overlays = (manifest.overlays || []).map((entry) => {
                    return {
                        ...entry,
                        url: `${baseUrl || ''}/overlays/${manifest.pkgBase}/${entry.url}`
                    }
                });

                return manifest;

            });
    }


    return manifestCache;
}

function getManifest(basePath, baseUrl) {
    const manifest = getOverlayManifest(basePath, baseUrl);

    return (req, res) => {
        const filteredManifest = manifest.map(({
            pkgPath,
            pkgServePath,
            ...rest
        }) => rest);
        res.json(filteredManifest);
    };
}

function getStaticRoutes(basePath, baseUrl) {
    const manifest = getOverlayManifest(basePath, baseUrl);

    return manifest.map((overlayManifest) => {
        const { pkgBase,
            pkgServePath,
            overlays,
            notFoundUrl,
            appType
        } = overlayManifest;

        return {
            path: pkgBase,
            servePath: pkgServePath,
            overlays,
            notFoundUrl,
            appType
        };
    });
}

function fixUpOverlayUrl(overlayPath) {
    return (req, res, next) => {
        // Remove the overlay base path, so serveIndex and serveStatic
        // can work properly
        const regExp = new RegExp(`^\/${overlayPath}\/`);
        req.url = '/' + req.url.replace(regExp, '');
        next();
    }
}

function fixUpAppsWithRouting(appType) {
    return (req, res, next) => {
        // XXX: HACK Fixup for react based overlays
        if (appType === 'react') {
            if (req.url.includes('static')) {
                let staticStrFound = false;

                const fixedUpUrl = req.url.split('/')
                    .filter((part, i) => {
                        if (part === 'static') {
                            staticStrFound = true;
                        }

                        return staticStrFound;
                    })
                    .join('/');

                req.url = '/' + fixedUpUrl;
            }
        }

        next();
    }
}

function fallback404(servePath, notFoundUrl, appType) {
    return (req, res, next) => {

        const path404 = `${servePath}/${notFoundUrl}`;

        const indexFile = fs.readFileSync(path404, 'utf-8');

        res.status(200);
        res.send(indexFile);
        res.end();
    }
}

module.exports = {
    getManifest,
    getStaticRoutes,
    fixUpOverlayUrl,
    fixUpAppsWithRouting,
    fallback404
};