module.exports = function (app) {
    const path = require('path');
    const serveStatic = require('serve-static');

    app.use('/api/config', serveStatic('data/config'));
    app.use('/api/characters', serveStatic('data/characters'));

    app.use('/', serveStatic('node_modules/@hypestboard/client/dist/'));
    app.use('/overlays', serveStatic('node_modules/@hypestboard/overlays/html'));
}
