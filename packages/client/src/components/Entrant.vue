<template>
    <div class="card">
        <div class="card-header">
            <button type="button"
                class="btn btn-danger btn-sm float-right"
                @click="$emit('delete', index)"
                title="Remove entrant">
                <i class="fa fa-times"></i>
            </button>
            <strong>Entrant {{ index + 1 }}</strong>
        </div>

        <div class="card-body">
            <div class="row">
                <div class="form-group col-8">
                    <label>Name</label>
                    <input class="form-control" type="text"
                        v-model="entrant.name" />
                </div>
                
                <div class="form-group col-4">
                    <label>Score</label>
                    <div class="input-group">
                        <input type="number" class="form-control form-control" v-model.number="entrant.score" />
                        <div class="input-group-append">
                            <button class="btn btn-outline-secondary"
                                type="button"
                                title="Decrease score"
                                @click="entrant.score--">
                                <i class="fa fa-minus"></i>
                            </button>
                            <button class="btn btn-outline-secondary"
                                type="button"
                                title="Increase score"
                                @click="entrant.score++">
                                <i class="fa fa-plus"></i>
                            </button>
                        </div>
                    </div>
                </div>

                <div class="col-12">
                    <details open="true">
                        <summary><strong>Players</strong></summary>

                        <br/>

                        <Players
                            v-bind:players="entrant.players"
                            v-bind:game-config="gameConfig"
                            v-on:add="addPlayer()"
                            v-on:delete="deletePlayer($event)"
                            v-on:swap="swapPlayers()"/>
                    </details>
                
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Players from './Players';
import _ from 'lodash';

export default {
    name: 'Entrant',
    props: ['entrant', 'index', 'gameConfig'],
    methods: {
        addPlayer,
        deletePlayer,
        swapPlayers,
        getEmptyPlayer
    },
    components: {
        Players
    }
}

function getEmptyPlayer() {
    const vm = this;
    const playerConfig = vm.gameConfig.players;
    const statusTypes = playerConfig && playerConfig.statusTypes;

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
        sponsor: '',
        status: statusTypes && statusTypes[0]
    };
}

function addPlayer() {
    var vm = this;
    vm.entrant.players.push(vm.getEmptyPlayer());
}

function deletePlayer(index) {
    var vm = this;
    vm.entrant.players.splice(index, 1);
}

function swapPlayers() {
    var vm = this;
    var entrant = vm.entrant;

    if (entrant.players.length === 2) {
        var p1 = _.clone(entrant.players[0]);
        var p2 = _.clone(entrant.players[1]);

        entrant.players = [p2, p1];
    }
}
</script>
