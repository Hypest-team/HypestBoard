const routes = require('express').Router();

module.exports = (appBasePath, baseUrl) => {
    routes.use('/api/scoreboard/', require('./scoreboardRoutes'));
    routes.use('/api/smashgg/', require('./smashGgRoutes'));
    routes.use('/api/challonge', require('./challongeRoutes'));
    routes.use('/overlays/', require('./overlaysRoutes')(appBasePath, baseUrl));
    routes.use('/api/config', require('./configRoutes'));
    routes.use('/', require('./staticRoutes'));

    return routes;
}
