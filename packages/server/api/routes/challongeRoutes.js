module.exports = function (app) {
    const challongeCtrl = require('../controllers/challongeController')

    app.route('/api/challonge/tournaments/:tournamentId')
        .get(challongeCtrl.getTournament);

    app.route('/api/challonge/matches/:tournamentId')
        .get(challongeCtrl.getMatches);
}
