module.exports = function(app, appBasePath) {
    require('./scoreboardRoutes')(app, appBasePath);
    require('./smashGgRoutes')(app, appBasePath);
    require('./challongeRoutes')(app, appBasePath);
    require('./overlaysRoutes')(app, appBasePath); 
    require('./staticRoutes')(app, appBasePath); 
}
