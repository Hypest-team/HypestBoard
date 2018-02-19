function HypestBoardApiService(fetch) {
    'use strict';

    this.getGameList = getGameList;
    this.getFlagList = getFlagList;
    this.getCharacterList = getCharacterList;

    this.getScoreBoard = getScoreBoard;
    this.updateScoreBoard = updateScoreBoard;

    function processResponse(response) {
        if (response.ok) {
            return response.json();
        } else {
            console.error('HypestScore server is down');
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

    function getScoreBoard() {
        return fetch('/api/scoreboard')
            .then(processResponse);
    }

    function updateScoreBoard(scoreBoard) {
        return fetch('/api/scoreboard', {
            method: 'post',
            body: JSON.stringify(scoreBoard),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(processResponse);
    }
}