module.exports = function(app) {
    require('./scoreboardRoutes')(app);
    require('./smashGgRoutes')(app);
    require('./staticRoutes')(app); 
}
