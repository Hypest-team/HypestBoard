const routes = require('express').Router()
const challongeCtrl = require('../controllers/challongeController')

routes.route('/tournaments/:tournamentId')
    .get(challongeCtrl.getTournament);

routes.route('/matches/:tournamentId')
    .get(challongeCtrl.getMatches);

module.exports = routes;