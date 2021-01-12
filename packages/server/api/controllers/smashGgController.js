var fetch = require('node-fetch');
var _ = require('lodash');
var serverUrl = 'https://api.smash.gg/';

const graphQlUrl = 'https://api.smash.gg/gql/alpha';

function graphQlCall(call, smashGgKey) {
    return fetch(graphQlUrl, {
        method: 'POST',
        body: JSON.stringify(call),
        withCredentials: true,
        credentials: 'include',
        headers: {
            Authorization: `Bearer ${smashGgKey}`,
            'Content-Type': 'application/json'
        }
    })
        .then((res) => {
            return res.json()
        });
}

exports.getSmashGgData = async function(req, res) {
    const tourneySlug = req.params.tournamentSlug;
    const apiKey = req.body.apiKey;
    const result = await graphQlCall({
        query:
        `query TournamentData($tourneySlug: String!) {
  tournament(slug: $tourneySlug) {
    id,
    name,
    streamQueue {
      stream {
        streamSource,
        streamName
      }
      sets {
        fullRoundText,
        identifier,
        slots {
          entrant {
            participants {
              id,
              gamerTag,
              prefix,
              contactInfo {
                country
              }
            }
          }
        }
      }
    }
  }
}`,
        variables: {
            tourneySlug: tourneySlug
        }
    }, apiKey)

    res.json(result);
};


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

function mapEntrantsForSets(entrants, sets) {
    return sets.map(function (set) {
        var entrantIdKeys = Object.keys(set).filter(function (key) {
            return /entrant\dId$/.test(key);
        });

        set.entrants = [];

        entrantIdKeys.forEach(function (entrantIdKey) {
            var entrantKey = entrantIdKey.replace('Id', '');
            var entrant = entrants.find(function (e) {

                return e.id === set[entrantIdKey];
            });

            set.entrants.push(entrant);
        });

        return set;
    });
}

function mapPlayersForEntrants(players, entrants) {
    return entrants.map(function (entrant) {
        var playerIds = entrant.playerIds;
        var entrantPlayers = _.map(playerIds, function (playerId) {
            return players.find(function (player) {
                return player.id === playerId;
            });
        });

        entrant.players = entrantPlayers;
        return entrant;
    });
}

function mapStreamsForSets(streams, sets) {
    return sets.map(function (set) {
        set.stream = streams.find(function (stream) {
            return stream.id === set.streamId;
        });
        return set;
    });
}

function enhanceStationQueue(stationQ) {
    if (!(stationQ.data)) {
        return stationQ;
    }

    var sets = getAsArray(stationQ.data.entities.sets);
    var entrants = getAsArray(stationQ.data.entities.entrants);
    var players = getAsArray(stationQ.data.entities.player);
    var streams = getAsArray(stationQ.data.entities.stream);

    // Fill in player data
    stationQ.data.entities.players = mapPlayersForEntrants(players, entrants);
    stationQ.data.entities.sets = mapEntrantsForSets(entrants, sets);
    stationQ.data.entities.sets = mapStreamsForSets(streams, sets);

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
            var enhanced = enhanceStationQueue(data);
            res.json(enhanced);
        })
        .catch(function (e) {
            console.error(e);
        });
};