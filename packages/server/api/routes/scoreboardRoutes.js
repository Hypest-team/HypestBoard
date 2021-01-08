const routes = require('express').Router();

const scoreboardCtrl = require('../controllers/scoreboardController');
const scoreboardSchema = require('../../data/schema/scoreboard.json');

const validate = require('express-jsonschema').validate;

routes.route('/')
    .get(scoreboardCtrl.getScoreboard)
    .post(validate({body: scoreboardSchema}),
            scoreboardCtrl.updateScoreboard);

module.exports = routes;