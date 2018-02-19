function SmashGgApiService(fetch) {
    'use strict';

    var serverPath = '/api/smashgg/';

    this.getTournament = getTournament;

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
    
}