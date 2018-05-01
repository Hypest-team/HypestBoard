
var scoreboard = {
	entrants: [{
        name: 'Team Beer',
        players: [{
            name: 'Bla',
            character: {
                name: '',
                icon: ''
            },
            flag: {
                name: '',
                icon: ''
            },
            sponsor: ''
        }, {
            name: 'Ble',
            character: {
                name: '',
                icon: ''
            },
            flag: {
                name: '',
                icon: ''
            },
            sponsor: ''
        }],
        score: 0
    }],
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
