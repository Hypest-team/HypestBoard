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

// Always returns an array, because SMASHGG API IS STUPID!
function getAsArray(obj) {
    if (!obj || Array.isArray(obj)) {
        return obj;
    } else {
        return [obj];
    }
}

function enhanceStationQueue(stationQ) {
    if (!(stationQ.queues && stationQ.queues.length > 0)) {
        return stationQ;
    }

    var sets = getAsArray(stationQ.data.entities.sets);
    var entrants = getAsArray(stationQ.data.entities.entrants);
    var players = getAsArray(stationQ.data.entities.player);

    // Fill in player data
    stationQ.data.entities.sets = sets.map(function (set) {
        var newSet = _.cloneDeep(set);

        var entrantIdKeys = Object.keys(set).filter(function (key) {
            return /entrant\dId$/.test(key);
        });
       
        newSet.entrants = [];

        entrantIdKeys.forEach(function (entrantIdKey) {
            var entrantKey = entrantIdKey.replace('Id', '');
            var entrant = entrants.find(function (e) {

                return e.id === set[entrantIdKey];
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
