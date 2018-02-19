module.exports = function(app) {
    require('./scoreboardRoutes')(app);
    require('./staticRoutes')(app); 
}
