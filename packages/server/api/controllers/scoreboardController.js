const fs = require('fs').promises;

const baseScoreboard = {
	entrants: [],
    commentators: [],
	round: '',
	tournamentName: '',
	caster: '',
	streamer: ''
}

let scoreboard = null;

const scoreboardFileName = './scoreboard.json';

async function loadScoreboard() {
    if (!scoreboard) {
        return fs.readFile(scoreboardFileName, 'utf8')
            .then((file) => {
                scoreboard = JSON.parse(file);
                return scoreboard;
            })
            .catch(() => {
                scoreboard = {...baseScoreboard};
                return scoreboard;
            })
    } else {
        return scoreboard;
    }
}

async function saveScoreboard(newScoreboard) {
    return fs.writeFile(scoreboardFileName, JSON.stringify(newScoreboard), 'utf8')
        .then(() => {
            return newScoreboard;
        })
        .finally(() => {
            scoreboard = newScoreboard;
        });
}

async function getScoreboard(req, res) {
    const scoreboard = await loadScoreboard();
    res.json(scoreboard);
}

async function updateScoreboard(req, res) {
    const scoreboard = await saveScoreboard(req.body);
	res.json(scoreboard);
}

module.exports = {
    getScoreboard,
    updateScoreboard
}
