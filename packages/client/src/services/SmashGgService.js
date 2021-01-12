import axios from 'axios';

export default function SmashGgService() {
    return {
        getTournament
    }
}

const serverPath = '/api/smashgg/';

function getPath(call) {
    return serverPath + call;
}

function processResponse(result) {
    return result.data;
}

function getTournament(tournamentSlug, apiKey) {
    return axios.post(getPath(`${tournamentSlug}`), {
        apiKey
    })
        .then(processResponse);
}
