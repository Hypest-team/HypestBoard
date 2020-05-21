module.exports = function(app) {
    require('./scoreboardRoutes')(app);
    require('./smashGgRoutes')(app);
    require('./overlaysRoutes')(app); 
    require('./staticRoutes')(app); 
}
