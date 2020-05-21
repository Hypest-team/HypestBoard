const axios = require('axios').default;
const baseUrl = 'https://api.challonge.com/v1/';

function get(call, res, apikey) {
    const url = `${baseUrl}${call}?api_key=${apikey}`;

    console.log('[Challonge API call]', url);
    return axios.get(url)
        .then(({data}) => res.json(data))
        .catch(console.error);
}

function getTournament(req, res) {
    const { apikey } = req.query;
    const { tournamentId } = req.params;
    get(`tournaments/${tournamentId}.json`, res, apikey);
}

function getParticipant(req, res) {
    const { apikey } = req.query;
    const { tournamentId, participantId } = req.params;
    get(`tournaments/${tournamentId}/participants/${participantId}.json`, res, apikey);
}

function getMatches(req, res) {
    const { apikey } = req.query;
    const { tournamentId } = req.params;
    get(`tournaments/${tournamentId}/matches.json`, res, apikey);
}

module.exports = {
    getTournament,
    getParticipant,
    getMatches
};