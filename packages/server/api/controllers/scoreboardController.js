const scoreboardStore = require('../stores/scoreboardStore');

async function getScoreboard(req, res) {
    const scoreboard = await scoreboardStore.getScoreboard();
    res.json(scoreboard);
}

async function updateScoreboard(req, res) {
    const scoreboard = await scoreboardStore.setScoreboard(req.body);
	res.json(scoreboard);
}

module.exports = {
    getScoreboard,
    updateScoreboard
}
