import axios from 'axios';

export default function ApiService() {

    return {
        getScoreboard,
        updateScoreboard,

        getGames,
        getFlags,
        getCharacters
    }
}

let caches = {};

function getGames() {
    return axios.get('/api/config/games.json')
        .then(processReponse);
}

function getFlags() {
    return cachedResponse('/api/config/flags.json');
}

function getCharacters(gameId) {
    return cachedResponse(`/api/characters/${gameId}.json`, 'characters', gameId);
}

function getScoreboard() {
    return axios.get('/api/scoreboard')
        .then(processReponse);
}

function updateScoreboard(scoreboard) {
    return axios.post('/api/scoreboard', scoreboard)
        .then(processReponse);
}

function cachedResponse(request, cacheName, cacheKey) {
    let cache = caches[cacheName];
    if (!cache) {
        caches[cacheName] = {};
        cache = caches[cacheName];
    }

    let subCache = cache[cacheKey];

    if (subCache) {
        return Promise.resolve(subCache);
    } else {
        return axios.get(request)
            .then(processReponse)
            .then(data => {
                cache[cacheKey] = data;
                return data;
            })
    }
}

function processReponse(result) {
    return result.data;
}
