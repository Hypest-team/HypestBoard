<template>
<div id="app">
    <div class="container-fluid">
        <h1>HypestBoard admin page</h1>
        <div class="row">
            <div class="col-md-2">
                <StreamQueue />
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
        updateScoreboard
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

</script>

<style>
@import '../node_modules/bootstrap/dist/css/bootstrap.css';
@import '../node_modules/font-awesome/css/font-awesome.css';
@import '../node_modules/flag-icon-css/css/flag-icon.css';

</style>
