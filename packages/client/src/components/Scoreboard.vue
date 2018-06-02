<template>
    <div>
        <div class="alert alert-danger">
            <b>TODO:</b> Scoreboard
        </div>

        <form novalidate @submit.prevent="updateScoreboard">

            <details open="true">
                <summary><strong>Entrants</strong></summary>

                <br/>

                <Entrants 
                    v-bind:entrants="scoreboard.entrants"
                    v-on:add="addEntrant()"
                    v-on:delete="deleteEntrant($event)"
                    v-on:swap="swapEntrants()"/>
            </details>

            <details>
                <summary><strong>Commentators</strong></summary>

                <br/>

                <Commentators 
                    v-bind:commentators="scoreboard.comentators"
                    v-on:add="addCommentator()"
                    v-on:delete="deleteCommentator($event)" />
            </details>

            <hr />

            <div class="actions">
                <button type="submit" class="btn btn-primary">Update scoreboard</button>
            </div>
        </form>
    </div>
</template>

<script>
import ApiService from '../services/ApiService';
import Entrants from './Entrants';
import Commentators from './Commentators';
import _ from 'lodash';

const apiService = new ApiService();

export default {
    name: 'Scoreboard',
    data () {
        return {
            scoreboard: {}
        }
    },
    components: {
        Entrants,
        Commentators
    },
    mounted: onMounted,
    methods: {
        updateScoreboard,

        addEntrant,
        deleteEntrant,
        swapEntrants,

        addCommentator,
        deleteCommentator
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

function getEmptyEntrant(entrant) {
    return {
        name: '',
        score: 0,
        players: (entrant && entrant.players) ?
            entrant.players.map(getEmptyPlayer) : []
    };
}

function getEmptyCommentator() {
    return {
        name: '',
        handle: ''
    };
}

function addEntrant() {
    var vm = this;
    vm.scoreboard.entrants.push(getEmptyEntrant());
}

function deleteEntrant(index) {
    var vm = this;
    vm.scoreboard.entrants.splice(index, 1);
}

function swapEntrants() {
    var vm = this;
    if (vm.scoreboard.entrants.length === 2) {
        var e1 = _.clone(vm.scoreboard.entrants[0]);
        var e2 = _.clone(vm.scoreboard.entrants[1]);

        vm.scoreboard.entrants = [e2, e1];
    }
}

function addCommentator() {
    var vm = this;
    vm.scoreboard.comentators.push(getEmptyCommentator());
}

function deleteCommentator(index) {
    var vm = this;
    vm.scoreboard.comentators.splice(index, 1);
}
</script>
