var data = {
	scoreBoard: {
		Player1: {
			name: '',
			character: {
				name: '',
				icon: ''
			},
			sponsor: {
				name: '',
				icon: ''
			},
			score: 0,
			flag: {
				name: '',
				icon: ''
			}
		},
		Player2: {
			name: '',
			character: {
				name: '',
				icon: ''
			},
			sponsor: {
				name: '',
				icon: ''
			},
			score: 0,
			flag: {
				name: '',
				icon: ''
			}
		},
		round: '',
		tournamentName: '',
		caster: '',
		streamer: ''
	}
}

exports.getScoreboard = function (req, res) {
	console.log('Got a scoreboard request')
	res.json(data);
}

exports.updateScoreboard = function (req, res) {
	console.log('Updated scoredboard', req.body)
	res.send(data);
}
