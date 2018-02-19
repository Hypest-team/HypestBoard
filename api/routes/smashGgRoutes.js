module.exports = function (app) {
    var smashGgCtrl = require('../controllers/smashGgController')

    app.route('/api/smashgg/tournament/:tournamentSlug')
        .get(smashGgCtrl.getTournament);

    app.route('/api/smashgg/station_queue/:tournamentId')
        .get(smashGgCtrl.getStationQueue);
}
