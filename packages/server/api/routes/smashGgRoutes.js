const routes = require('express').Router(); 
const smashGgCtrl = require('../controllers/smashGgController')

routes.route('/:tournamentSlug')
    .post(smashGgCtrl.getTournamentData);

routes.route('/:tournamentSlug/queue')
    .post(smashGgCtrl.getTournamentQueue);

module.exports = routes;