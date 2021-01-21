const fetch = require('node-fetch');
const { findCountryByName } = require('../stores/countryStores');
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

async function fetchTournamentData(tournamentSlug, apiKey) {
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
            name,
            participants {
              id,
              gamerTag,
              prefix,
              user {
                location {
                  country
                }
              }
            }
          }
        }
      }
    }
  }
}`,
        variables: {
            tourneySlug: tournamentSlug
        }
    }, apiKey)

    return result;

};

async function getTournamentData(req, res, next) {
    try {
        const { tournamentSlug, } = req.params;
        const { apiKey } = req.body;
        const result = await fetchTournamentData(tournamentSlug, apiKey);
        res.json(result);
    } catch (e) {
        console.log('Error on smashgg tournament request', e);
        res.status(406).send('Not Acceptable');
    }
}

async function getTournamentQueue(req, res, next) {
    const { tournamentSlug } = req.params;
    const { apiKey } = req.body;

    try {

        const ggTournamentResponse = await fetchTournamentData(tournamentSlug, apiKey);
        const ggTournamentData = ggTournamentResponse.data;
        const ggTournament = ggTournamentData.tournament;

        // FIXME: support multiple stream queues
        const ggStreamQueues = ggTournament.streamQueue;
        const ggStreamQueue = ggStreamQueues ? ggTournament.streamQueue[0] : null;

        if (ggStreamQueue) {
            const response = {
                tournamentName: ggTournament.name || '',
                streamer: ggStreamQueue.stream.streamName || '',
                sets: ggStreamQueue.sets.map(convertGgSet)
            }
    
            res.json(response)
                .end();

        } else {
            const message = `No smashgg streams were added. Slug ${tournamentSlug}`;
            res.status(404)
                .json({
                    message
                })
                .end();
            console.error(message);
        }

    } catch (e) {
        console.log(`Error on smashgg tournament request. Slug: ${tournamentSlug}`, e);
        res.status(406).send('Not Acceptable');
    }
}

function convertGgSet(ggSet) {
    return {
        id: ggSet.id,
        round: ggSet.fullRoundText || '',
        entrants: ggSet.slots.map(convertGgSlotToEntrant)
    }
}

function convertGgSlotToEntrant(ggSlot) {
    const ggEntrant = ggSlot.entrant;

    if (ggEntrant) {
        return {
            name: ggEntrant.name || '',
            score: 0,
            players: ggEntrant.participants.map(convertGgParticipantToPlayer)
        };
    } else {
        return {
            name: '<TBD>',
            score: 0,
            players: []
        };
    }
}

function convertGgParticipantToPlayer(ggParticipant) {
    const result = {
        name: ggParticipant.gamerTag || '',
        sponsor: ggParticipant.prefix || '',
        character: {
            id: '',
            name: '-Empty-'
        }
    };

    const emptyCountry = {
        name: '',
        code: ''
    };

    if (ggParticipant.user) {
        result.country = convertGgLocationToCountry(ggParticipant.user.location) ||
            emptyCountry;
    } else {
        result.country = emptyCountry;
    }

    return result;
}

function convertGgLocationToCountry(ggCountry) {
    return ggCountry ? findCountryByName(ggCountry.country) : null
}

module.exports = {
    getTournamentData,
    getTournamentQueue
};