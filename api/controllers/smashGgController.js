var fetch = require('node-fetch');
var serverUrl = 'https://api.smash.gg/';

function getFullUrl(call) {
    return serverUrl + call;
}

function processResponse(response) {
    if (response.ok) {
        return response.json();
    } else {
        console.error('Smash.gg server is down', response);
    }
}

function getRequest(path, res) {
    var url = getFullUrl(path);

    fetch(url)
        .then(processResponse)
        .then(function (data) {
            res.json(data);
            return data;
        });
}

exports.getTournament = function (req, res) {
    return getRequest('tournament/' + req.params.tournamentSlug, res);
};

exports.getStationQueue = function (req, res) {
    return getRequest('station_queue/' + req.params.tournamentId, res);
};
