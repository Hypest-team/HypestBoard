const path = require('path');
const fs = require('fs');

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

function createOverlayManifest(basePath, baseUrl) {
    const overlayPaths = [
        ...getNpmOverlayPaths(),
        ...getExtOverlayPaths(basePath)
    ];

    return overlayPaths.filter((overlayPath) =>
        fs.existsSync(path.resolve(overlayPath, 'manifest.json'))
    )
        .map((overlayPath) => ({
            manifestText: fs.readFileSync(path.resolve(overlayPath, 'manifest.json')),
            overlayPath
        }))
        .map(({ manifestText, overlayPath }) => {
            const manifest = JSON.parse(manifestText);

            manifest.base = resolveOverlayPkgBaseName(overlayPath);
            manifest.pkgPath = overlayPath;

            manifest.overlays = (manifest.overlays || []).map((entry) => {
                return {
                    ...entry,
                    url: `${baseUrl.trim() || ''}/overlays/${manifest.base}/${entry.url}`
                }
            });

            return manifest;
        });
}

function getManifest(basePath, baseUrl) {
    const manifest = createOverlayManifest(basePath, baseUrl);

    return (req, res) => {
        const filteredManifest = manifest.map(({ pkgPath, ...rest }) => rest);
        res.json(filteredManifest);
    };
}

function getStaticRoutes(basePath, baseUrl) {
    const manifest = createOverlayManifest(basePath, baseUrl);

    return manifest.map(({ base, pkgPath }) => {
        return { path: base, servePath: pkgPath };
    });
}

/**
 * Gives some enhanced information regarding where and how
 * the server is hosted, named base path
 * @param {} manifestEntry 
 */
function enhanceOverlayPackManifest(manifestEntry, baseUrl) {
    return (req, res, next) => {
        console.log('enhance!');
        res.json({
            baseUrl,
            ...manifestEntry
        });
        res.end();
    }
}

module.exports = {
    getManifest,
    getStaticRoutes,
    enhanceOverlayPackManifest
};