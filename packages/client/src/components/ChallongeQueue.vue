<template>
    <div>
        <details open="true">
            <form novalidate @submit.prevent="loadTournament()">
                <div class="form-group">
                    <label>API key</label>
                    <input class="form-control" type="password" v-model="apiKey" />

                    <small class="form-text text-muted">
                        The API key can be obtained at
                        <br />
                        <a
                            href="https://challonge.com/settings/developer"
                            target="_blank"
                        >https://challonge.com/settings/developer</a>
                    </small>
                </div>
                <div class="form-group">
                    <label>Tournament id</label>
                    <input class="form-control" type="text" v-model="tournamentId" />

                    <small class="form-text text-muted">
                        The tournament id can be extracted from the URL:
                        <br />https://challonge.com/
                        <wbr />
                        <strong>tournament-id</strong>
                    </small>
                </div>
                <div class="actions">
                    <button type="submit" class="btn btn-primary">Get queues</button>
                </div>
            </form>
        </details>

        <hr />

        <div v-if="tournament">
            <h3 v-if="tournament">{{ tournament.name }}</h3>

            <label>
                <input type="checkbox" v-model="showAllMatches" />
                Show complete matches
            </label>

            <div v-if="filteredMatches">
                <div v-for="(match, index) in filteredMatches" v-bind:key="index">
                    <h5>{{ match.round_label }}</h5>
                    <button class="btn btn-sm btn-success"
                        @click="$emit('select', {isChallonge: true, ...match})">
                        <i class="fa fa-check"></i>
                    </button>
                    <span>{{ match.player1.name }}</span>
                    VS
                    <span>{{ match.player2.name }}</span>
                    <hr/>
                </div>
            </div>

            <div
                class="jumbotron text-center"
                v-if="!filteredMatches || filteredMatches.length === 0"
            >
                <h4>No matches to show</h4>
            </div>
        </div>
    </div>
</template>

<script>
import ChallongeService from "../services/ChallongeService";

let challongeService = ChallongeService();

export default {
    name: "ChallongeQueue",
    data() {
        return {
            apiKey: "",
            tournamentId: "",
            tournament: null,
            matches: null,
            showAllMatches: false
        };
    },
    computed: {
        filteredMatches
    },
    methods: {
        loadTournament
    }
};

function loadTournament() {
    var vm = this;

    return challongeService
        .getTournament(vm.tournamentId, vm.apiKey)
        .then(tournament => {
            vm.tournament = tournament;
            // Lazy way of doing it.
            // Because this was done based on smashgg api
            // Should be changed later
            // TODO: change the way this is done at App.vue
            vm.$emit("load", {
                entities: {
                    tournament: {
                        name: tournament.name
                    }
                }
            });
            return tournament;
        })
        .then(() => {
            return loadMatches(vm.tournamentId, vm.apiKey);
        })
        .then(matches => {
            vm.matches = matches;
            return matches;
        });
}

function loadMatches(tournamentId, apiKey) {
    return challongeService.getMatches(tournamentId, apiKey);
}

function filteredMatches() {
    var vm = this;

    return (vm.matches || []).filter(match => {
        return vm.showAllMatches || match.state !== "complete";
    });
}
</script>
