module.exports = function (app) {
    var scoreboardCtrl = require('../controllers/scoreboardController')

    app.route('/api/scoreboard')
        .get(scoreboardCtrl.getScoreboard)
        .post(scoreboardCtrl.updateScoreboard);
}
