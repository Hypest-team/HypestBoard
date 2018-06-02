function HypestBoardApiService(fetch) {
    'use strict';

    this.getGameList = getGameList;
    this.getFlagList = getFlagList;
    this.getCharacterList = getCharacterList;

    this.getScoreboard = getScoreboard;
    this.updateScoreboard = updateScoreboard;

    function processResponse(response) {
        if (response.ok) {
            return response.json();
        } else {
            console.error('There was an error:', response);
            throw response;
        }
    }

    function getGameList() {
        return fetch('/config/games.json')
            .then(processResponse);
    }

    function getFlagList() {
        return fetch('/config/flags.json')
            .then(processResponse);
    }

    function getCharacterList(gameId) {
        return fetch('/characters/' + gameId + '.json')
            .then(processResponse);
    }

    function getScoreboard() {
        return fetch('/api/scoreboard')
            .then(processResponse);
    }

    function updateScoreboard(scoreboard) {
        return fetch('/api/scoreboard', {
            method: 'post',
            body: JSON.stringify(scoreboard),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(processResponse);
    }
}
