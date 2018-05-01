
var scoreboard = {
	entrants: [],
    comentators: [],
	round: '',
	tournamentName: '',
	caster: '',
	streamer: '',
    game: {
        id: 'melee'
    }
}

exports.getScoreboard = function (req, res) {
	res.json(scoreboard);
}

exports.updateScoreboard = function (req, res) {
    scoreboard = req.body;
	res.send(scoreboard);
}
