var path = require('path');

module.exports = function(app) {
	var scoreboard = require('../controllers/scoreboardController')

	app.route('/scoreboard')
		.get(scoreboard.getScoreboard)
		.post(scoreboard.updateScoreboard);

	app.get(/^(.+)$/, function (req, res) {
		var filePath = path.resolve(__dirname + '../../../Stuff/Content/html' + req.params[0]);
		console.log('Sending static file', filePath);	
		res.sendFile(filePath);
	});
}
