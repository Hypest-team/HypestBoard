module.exports = function (app) {
    const path = require('path');
    const serveStatic = require('serve-static');

    app.use('/lib/bootstrap/', serveStatic('node_modules/bootstrap/dist'));
    app.use('/lib/vue/', serveStatic('node_modules/vue/dist'));
    app.use('/lib/lodash/', serveStatic('node_modules/lodash'));
    app.use('/lib/font-awesome/css', serveStatic('node_modules/font-awesome/css'));
    app.use('/lib/font-awesome/fonts', serveStatic('node_modules/font-awesome/fonts'));
    app.use('/lib/svg-country-flags/', serveStatic('node_modules/svg-country-flags'));

    app.use('/', serveStatic('html'));
    app.use('/admin2', serveStatic('node_modules/@hypestboard/client/dist'));
}
