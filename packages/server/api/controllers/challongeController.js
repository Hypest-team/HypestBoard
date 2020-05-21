const axios = require('axios').default;
const baseUrl = 'https://api.challonge.com/v1/';

function get(call, apikey) {
    const url = `${baseUrl}${call}?api_key=${apikey}`;

    console.log('getting', url);

    return axios.get(url);
}

function getTournament(req, res) {
    const { apikey } = req.query;
    const { tournamentId } = req.params;
    get(`tournaments/${tournamentId}.json`, apikey)
        .then(res.json);
}

function getParticipant(req, res) {
    const { apikey } = req.query;
    const { tournamentId, participantId } = req.params;
    get(`tournaments/${tournamentId}/participants/${participantId}.json`, apikey)
        .then(res.json)
}

function getMatches(req, res) {
    const { apikey } = req.query;
    const { tournamentId } = req.params;
    get(`tournaments/${tournamentId}/matches`, apikey)
        .then(res.json)
}

module.exports = {
    getTournament,
    getParticipant,
    getMatches
};