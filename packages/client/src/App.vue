<template>
<div id="app">
    <div class="container-fluid">
        <h1>Scoreman admin page</h1>
        <div class="row">
            <div class="col-md-2">
                <button class="btn btn-lg btn-primary"
                    v-on:click="updateTournamentData($event)">
                    Update Scoreboard
                </button>
                <StreamQueue
                    v-on:select="autofillEntrants($event)"
                    v-on:load="updateTournamentData($event)"/>
            </div>
            <div class="col-md-10">
                <div v-if="!scoreboard" class="text-center">
                    <i class="fa fa-spin fa-refresh fa-4x"></i><br/>
                    Loading scoreboard, please wait
                </div>
                <Scoreboard v-if="scoreboard" v-model="scoreboard"
                    v-on:update="updateScoreboard()"/> 
            </div>
        </div>
    </div>
</div>
</template>

<script>
import Scoreboard from './components/Scoreboard';
import StreamQueue from './components/StreamQueue';
import ApiService from './services/ApiService';
import _ from 'lodash';

let apiService = ApiService();

export default {
    name: 'App',
    components: {
        Scoreboard,
        StreamQueue
    },
    data () {
        return {
            scoreboard: null 
        }
    },
    mounted: onMounted,
    methods: {
        updateScoreboard,
        updateTournamentData,
        autofillEntrants
    }
}

function onMounted() {
    var vm = this;
    apiService.getScoreboard()
        .then(scoreboard => {
            vm.scoreboard = scoreboard;
            return scoreboard;
        });

}

function updateScoreboard() {
    var vm = this;
    apiService.updateScoreboard(vm.scoreboard)
        .then(scoreboard => {
            vm.scoreboard = scoreboard;
            return scoreboard;
        });
}

function updateTournamentData(data) {
    const vm = this;

    vm.scoreboard.tournamentName = data.tournamentName;
    vm.scoreboard.streamer = data.streamer;
    vm.scoreboard.round = data.round;
}

function autofillEntrants(set) {
    const vm = this;
    vm.scoreboard.entrants = _.cloneDeep(set.entrants);
}

</script>

<style>

</style>
