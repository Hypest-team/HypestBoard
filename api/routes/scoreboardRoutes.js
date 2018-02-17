var path = require('path');

module.exports = function(app) {
	var scoreboard = require('../controllers/scoreboardController')

    function getStaticFilePath(file) {
        return path.resolve(__dirname + '../../../Stuff/Content/html' + file);
    }

	app.route('/scoreboard')
		.get(scoreboard.getScoreboard)
		.post(scoreboard.updateScoreboard);

    app.get('/', function (req, res) {
        var filePath = getStaticFilePath('/index.html');
        console.log('Sending static file', filePath);
        res.sendFile(filePath);
    });

	app.get(/^(.+)$/, function (req, res) {
        var filePath = getStaticFilePath(req.params[0]);
		console.log('Sending static file', filePath);	
		res.sendFile(filePath);
	});
}
