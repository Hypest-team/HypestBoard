function SmashGgApiService(fetch) {
    'use strict';

    var serverPath = '/api/smashgg/';

    this.getTournament = getTournament;
    this.getStationQueue = getStationQueue;

    function getPath(call) {
        return serverPath + call;
    }

    function processResponse(response) {
        if (response.ok) {
            return response.json();
        } else {
            console.error('Server is down');
        }
    }

    function getTournament(tournamentSlug) {
        return fetch(getPath('tournament/' + tournamentSlug))
            .then(processResponse);
    }

    function getStationQueue(tournamentId) {
        return fetch(getPath('station_queue/' + tournamentId))
            .then(processResponse);
    }
}