const routes = require('express').Router();

const scoreboardCtrl = require('../controllers/scoreboardController');
const scoreboardSchema = require('../../data/schema/scoreboard.json');

const validate = require('express-jsonschema').validate;

module.exports = (config) => {
    routes.route('/')
        .get(scoreboardCtrl.getScoreboard)
        .post(
            require('../middleware/autheticated')(config),
            validate({ body: scoreboardSchema }),
            scoreboardCtrl.updateScoreboard);

    return routes;
};