module.exports = function(app) {
    require('./characterRoutes')(app);
    require('./scoreboardRoutes')(app);
    require('./staticRoutes')(app); 
}
