import axios from 'axios';

export default class ApiService {

    getGameList() {
        return axios.get('/config/games.json')
            .then(processReponse);
    }

    getFlagList() {
        return axios.get('/config/flags.json')
            .then(processReponse);
    }

    getCharacterList(gameId) {
        return axios.get('/characters/' + gameId + '.json')
            .then(processReponse);
    }

    getScoreboard() {
        return axios.get('/api/scoreboard')
            .then(processReponse);
    }

    updateScoreboard(scoreboard) {
        return axios.post('/api/scoreboard', scoreboard)
            .then(processReponse);
    }
}

function processReponse(result) {
    return result.data;
}
