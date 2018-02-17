module.exports = function(app) {
	var scoreboard = require('../controllers/scoreboardController')

	app.route('/scoreboard')
		.get(scoreboard.getScoreboard)
		.post(scoreboard.updateScoreboard)
}
