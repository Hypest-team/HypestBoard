const axios = require('axios').default;
const baseUrl = 'https://api.challonge.com/v1/';

function get(call, res, apikey) {
    return getApi(call, apikey)
        .then(({ data }) => res.json(data))
        .catch(console.error);
}

function getApi(call, apikey) {
    const url = `${baseUrl}${call}?api_key=${apikey}`;

    console.log('[Challonge API call]', url);
    return axios.get(url);
}

function getTournament(req, res) {
    const { apikey } = req.query;
    const { tournamentId } = req.params;
    getApi(`tournaments/${tournamentId}.json`, apikey)
        .then(({ data }) => {
            return res.json(data.tournament);
        });
}

function resolvePlayer(tournamentId, playerId, apikey) {
    return getApi(`tournaments/${tournamentId}/participants/${playerId}.json`, apikey)
        .then(({ data }) => {
            return data.participant;
        });
}

function enhanceMatches(matches, tournamentId, apikey) {
    const promises = matches.map(({ match }) => {
        return Promise.all([
            resolvePlayer(tournamentId, match.player1_id, apikey),
            resolvePlayer(tournamentId, match.player2_id, apikey)
        ])
            .then(([player1, player2]) => {
                return {
                    player1,
                    player2,
                    round_label: match.round > 0 ? `Winners R${match.round}` : `Losers R${-match.round}`,
                    ...match
                };
            })
    });

    return Promise.all(promises)
        .then((matches) => {
            //console.log('all matches', matches);
            return matches;
        });
}

function getMatches(req, res) {
    const { apikey } = req.query;
    const { tournamentId } = req.params;
    getApi(`tournaments/${tournamentId}/matches.json`, apikey)
        .then(({ data }) => {
            return enhanceMatches(data, tournamentId, apikey);
        })
        .then((result) => {
            res.json(result);
            return result;
        });
}

module.exports = {
    getTournament,
    getMatches
};