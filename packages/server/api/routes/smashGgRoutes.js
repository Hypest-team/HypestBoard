const routes = require('express').Router(); 
const smashGgCtrl = require('../controllers/smashGgController')

routes.route('/tournament/:tournamentSlug')
    .get(smashGgCtrl.getTournament);

routes.route('/station_queue/:tournamentId')
    .get(smashGgCtrl.getStationQueue);

module.exports = routes;