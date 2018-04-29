var fetch = require('node-fetch');
var _ = require('lodash');
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

    console.log('Fetching', url);

    return fetch(url)
        .then(processResponse)
        .catch(function (e) {
            console.log('SmashGG API error', e);
        });
}

function enhanceStationQueue(stationQ) {
    if (!stationQ.queues.length) {
        return stationQ;
    }

    var sets = stationQ.data.entities.sets;
    var entrants = stationQ.data.entities.entrants;
    var player = stationQ.data.entities.player;

    // Fill in player data
    stationQ.data.entities.sets = sets.map(function (set) {
        var newSet = _.cloneDeep(set);

        var entrantIdKeys = Object.keys(set).filter(function (key) {
            return /entrant\dId$/.test(key);
        });
       
        newSet.entrants = [];

        entrantIdKeys.forEach(function (entrantIdKey) {
            var entrantKey = entrantIdKey.replace('Id', '');
            var entrant = entrants.find(function (entrant) {
                return entrant.id === set[entrantIdKey];
            });

            if (entrant) {
                newSet.entrants.push(entrant);
            }
        });

        return newSet;
    });

    return stationQ;
}

exports.getTournament = function (req, res) {
    return getRequest('tournament/' + req.params.tournamentSlug, res)
        .then(function (data) {
            res.json(data);
        });
};

exports.getStationQueue = function (req, res) {
    return getRequest('station_queue/' + req.params.tournamentId, res)
        .then(function (data) {
            res.json(enhanceStationQueue(data));
        })
        .catch(function (e) {
            console.error(e);
        });
};
