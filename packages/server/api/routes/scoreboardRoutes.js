module.exports = function (app) {
    var scoreboardCtrl = require('../controllers/scoreboardController');
    var scoreboardSchema = require('../../html/schema/scoreboard.json');

    var validate = require('express-jsonschema').validate;

    app.route('/api/scoreboard')
        .get(scoreboardCtrl.getScoreboard)
        .post(validate({body: scoreboardSchema}),
                scoreboardCtrl.updateScoreboard);
}
