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

const scoreboardFileName = './scoreboard-data.json';

async function getScoreboard() {
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

async function setScoreboard(newScoreboard) {
    return fs.writeFile(scoreboardFileName, JSON.stringify(newScoreboard), 'utf8')
        .then(() => {
            return newScoreboard;
        })
        .finally(() => {
            scoreboard = newScoreboard;
        });
}

module.exports = {
    getScoreboard,
    setScoreboard
}