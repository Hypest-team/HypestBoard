const routes = require('express').Router();

module.exports = (appBasePath, appHostname, appPort, baseUrl, skipAuth) => {
    routes.use('*!serverconfig', require('./serverConfigRoutes')({
        hostname: appHostname,
        port: appPort,
        baseUrl: baseUrl
    }));
    
    if (!skipAuth) {
        routes.use('/', require('./authRoutes'));
    }

    routes.use('/api/scoreboard/', require('./scoreboardRoutes'));
    routes.use('/api/smashgg/', require('./smashGgRoutes'));
    //routes.use('/api/challonge', require('./challongeRoutes'));
    routes.use('/api/characters', require('./charactersRoutes'));
    routes.use('/api/config', require('./configRoutes'));

    routes.use('/overlays/', require('./overlaysRoutes')(appBasePath, baseUrl));
    
    routes.use('/', require('./staticRoutes'));

    return routes;
}
