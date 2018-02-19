function HypestBoardApiService(fetch) {
    'use strict';

    this.getScoreBoard = getScoreBoard;
    this.updateScoreBoard = updateScoreBoard;

    function processResponse(response) {
        if (response.ok) {
            return response.json();
        } else {
            console.error('HypestScore server is down');
        }
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