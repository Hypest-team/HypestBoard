
var scoreboard = {
	entrants: [],
    comentators: [],
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
