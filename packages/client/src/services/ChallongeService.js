import axios from 'axios';

export default function ChallongeService() {
    return {
        getTournament,
        getMatches
    }
}

function getTournament(tournamentId, apiKey) {
    return axios.get(`/api/challonge/tournaments/${tournamentId}?apikey=${apiKey}`)
        .then(processReponse);
}

function getMatches(tournamentId, apiKey) {
    return axios.get(`/api/challonge/matches/${tournamentId}?apikey=${apiKey}`)
        .then(processReponse);
}

function processReponse(result) {
    return result.data;
}
