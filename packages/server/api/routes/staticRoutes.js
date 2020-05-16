const clientPath = require.resolve('@scoreman/client');
const overlaysPath = require.resolve('@scoreman/overlays');

const path = require('path');
const serveStatic = require('serve-static');

module.exports = function (app) {
    app.use('/api/config', serveStatic(path.resolve(__dirname, '../../data/config')));
    app.use('/api/characters', serveStatic(path.resolve(__dirname, '../../data/characters')));

    app.use('/', serveStatic(path.dirname(clientPath)));
    app.use('/overlays', serveStatic(path.dirname(overlaysPath)));
};
