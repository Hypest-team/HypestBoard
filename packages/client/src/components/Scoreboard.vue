<template>
    <div>
        <form v-if="scoreboard" novalidate @submit.prevent="$emit('update')">

            <label>Game configuration</label>

            <GameSelect v-model="scoreboard.game" />

            <hr />

            <details open="true" v-if="scoreboard.game">
                <summary><strong>Entrants</strong></summary>

                <br/>

                <Entrants 
                    v-bind:game-id="scoreboard.game.id"
                    v-bind:entrants="scoreboard.entrants"
                    v-on:add="addEntrant()"
                    v-on:delete="deleteEntrant($event)"
                    v-on:swap="swapEntrants()"
                    v-on:reset="resetEntrants()"/>
            </details>

            <hr />

            <details>
                <summary><strong>Tournament details</strong></summary>
                <br/>

                <TournamentDetails 
                    v-bind:scoreboard="scoreboard"/>
            </details>

            <hr />

            <details>
                <summary><strong>Commentators</strong></summary>

                <br/>

                <Commentators 
                    v-bind:commentators="scoreboard.commentators"
                    v-on:add="addCommentator()"
                    v-on:delete="deleteCommentator($event)" />
            </details>

            <hr />

            <details>
                <summary><strong>Overlays</strong></summary>

                <br/>

                <Overlays />
            </details>

            <hr />

            <div class="actions">
                <button type="submit" class="btn btn-primary">Update scoreboard</button>
            </div>
        </form>
    </div>
</template>

<script>
import GameSelect from './GameSelect';
import Entrants from './Entrants';
import TournamentDetails from './TournamentDetails';
import Commentators from './Commentators';
import Overlays from './Overlays';
import _ from 'lodash';

export default {
    name: 'Scoreboard',
    model: {
        prop: 'scoreboard'
    },
    props: {
        scoreboard: {
            type: Object,
            default: null
        }
    },
    components: {
        GameSelect,
        Entrants,
        TournamentDetails,
        Commentators,
        Overlays
    },
    methods: {
        addEntrant,
        deleteEntrant,
        swapEntrants,
        resetEntrants,

        addCommentator,
        deleteCommentator
    }
}

function getEmptyPlayer() {
    return {
        name: '',
        character: {
            id: '',
            name: '',
            color: null
        },
        country: {
            name: '',
            code: ''
        },
        sponsor: ''
    };
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

function resetEntrants() {
    var vm = this;
    vm.scoreboard.entrants = vm.scoreboard.entrants.map(getEmptyEntrant);
}

function addCommentator() {
    var vm = this;
    vm.scoreboard.commentators.push(getEmptyCommentator());
}

function deleteCommentator(index) {
    var vm = this;
    vm.scoreboard.commentators.splice(index, 1);
}
</script>
