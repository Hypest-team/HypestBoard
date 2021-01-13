<template>
    <div>
        <h2>Smash.gg Tournament</h2>

        <details open="true">
            <summary>Tournament data</summary>

            <form novalidate @submit.prevent="loadTournament()">

                <div class="form-group">
                    <label>API key</label>
                    <input class="form-control" type="password"
                        name="smashgg-api-key"
                        v-model="apiKey"/>

                    <small class="form-text text-muted">
                        A smash.gg API key can be created at:<br/>
                        <a target="_blank" href="https://smash.gg/admin/profile/developer">
                        https://smash.gg/admin/profile/developer</a><br/>
                        <em>Ensure that you are logged in beforehand on smash.gg</em>
                    </small>
                </div>
                <div class="form-group">
                    <label>Tournament slug</label>
                    <input class="form-control" type="text"
                        v-model="tournamentSlug"/>

                    <small class="form-text text-muted">
                        The tournament slug can be extracted from the URL:<br/> https://smash.gg/tournament/<wbr/><strong>tournament-slug</strong>
                    </small>
                </div>
                <div class="actions">
                    <button type="submit" class="btn btn-primary">
                        Get queues
                    </button>
                </div>
            </form>
        </details>

        <hr />

        <div v-if="tournament">
            <h3 v-if="tournament.data">
                {{ tournament.data.entrant.tournament.name }}
            </h3>

            <div v-if="stationQueue">
                <div class="jumbotron text-center"
                     v-if="stationQueue.queues.length === 0">
                    <h4>No games in the queue</h4>
                </div>

                <div v-for="(set, index) in stationQueue.data.entities.sets"
                    :key="index">
                    <h5>{{ set.midRoundText }}</h5>
                    <button class="btn btn-sm btn-success"
                        @click="$emit('select', {isSmashGg: true, ...set})">
                        <i class="fa fa-check"></i>
                    </button>
                    <span v-for="(entrant, index) in set.entrants"
                        :key="index">
                        <span v-if="entrant">
                            {{ entrant.name }}
                        </span>
                        <span v-if="!entrant">
                            -
                        </span>
                        <span v-if="index < set.entrants.length - 1">VS</span>
                    </span>
                    <hr/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import SmashGgService from '../services/SmashGgService';

let smashGgService = SmashGgService();

export default {
    name: 'SmashGgQueue',
    data () {
        return {
            tournamentSlug: '', 
            apiKey: localStorage.smashGgApiKey,
            tournament: null,
            stationQueue: null
        }
    },
    methods: {
        loadTournament
    }
}

function loadTournament() {
    var vm = this;

    localStorage.smashGgApiKey = vm.apiKey;

    return smashGgService.getTournament(vm.tournamentSlug, vm.apiKey)
        .then(function (tournament) {
            // TODO continue here
            //vm.tournament = tournament;
            //vm.$emit('load', vm.tournament);
            console.log('got tournament', tournament);
            return tournament;
        });
}

</script>
