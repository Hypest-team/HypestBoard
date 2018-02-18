module.exports = function (app) {
    var express = require('express');
	var staticCtrl = require('../controllers/staticController')

    app.use('/js/lib/vue', express.static(__dirname + '/node_modules/vue/dist/'));
    app.use('/js/lib/boostrap', express.static(__dirname + '/node_modules/bootstrap/dist/js'));
    app.use('/css/lib/boostrap', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
    
    app.get('/', staticCtrl.getIndexFile);
    //app.get(/^(.+)$/, staticCtrl.getStaticFile);
}
