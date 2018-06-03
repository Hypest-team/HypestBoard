import axios from 'axios';
import ApiService from './ApiService';

export default function SmashGgService() {
    return {
        getTournament,
        getStationQueue,

        convertGgEntrant
    }
}

const apiService = ApiService();
const serverPath = '/api/smashgg/';

function getPath(call) {
    return serverPath + call;
}

function processResponse(result) {
    return result.data;
}

function getTournament(tournamentSlug) {
    return axios.get(getPath(`tournament/${tournamentSlug}`))
        .then(processResponse);
}

function getStationQueue(tournamentId) {
    return axios.get(getPath(`station_queue/${tournamentId}`))
        .then(processResponse);
}

function convertCountryToFlag(countryName) {
    return apiService.getFlags()
        .then(function (flags) {
            var flag = {
                code: '',
                name: ''
            };

            _.forEach(flags, function (name, countryCode) {

                if (countryName === name) {
                    flag = {
                        code: countryCode.toLowerCase(),
                        name: name
                    }
                    return;
                }
            });    

            return flag;
        });

}

function convertGgPlayer(ggPlayer) {
    if (ggPlayer) {

        return convertCountryToFlag(ggPlayer.country)
            .then(function(flag) {
                return {
                    name: ggPlayer.gamerTag,
                    character: {
                        icon: '',
                        name: ''
                    },
                    country: flag,
                    sponsor: ggPlayer.prefix || ''
                };
            });
    } else {
        return Promise.resolve(null);
    }
}

function convertGgEntrant(ggEntrant) {
    if (ggEntrant) {
        return Promise.all(ggEntrant.players.filter(o => !!o)
                .map(convertGgPlayer))
            .then(function (players) {
                return {
                    name: ggEntrant.name,
                    players: players,
                    score: 0
                };
            });
    } else {
        return Promise.resolve(null);
    }
}
