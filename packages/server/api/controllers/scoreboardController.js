
var scoreboard = {
	entrants: [],
    commentators: [],
	round: '',
	tournamentName: '',
	caster: '',
	streamer: ''
}

exports.getScoreboard = function (req, res) {
	res.json(scoreboard);
}

exports.updateScoreboard = function (req, res) {
    scoreboard = req.body;
	res.send(scoreboard);
}
