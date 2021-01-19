<template>

    <div>
        <div>
            <button type="button" class="btn btn-success" @click="addPlayer()">
                <i class="fa fa-plus"></i>
                Add player
            </button>

            <button type="button" class="btn btn-secondary" @click="swapPlayers()" v-if="players && players.length == 2">
                <i class="fa fa-swap"></i>
                Swap players 
            </button>
        </div>

        <br/>

        <div class="jumbotron text-center" v-if="!players || players.length === 0">
            <h4>No players added.<br/>Click <a href @click.prevent="addPlayer()">here</a> to add an player.</h4>
        </div>
        
        <div class="row" v-if="players">
            <div class="col-md-6" v-for="(player, index) in players" :key="index">
                <Player 
                    v-bind:player="player"
                    v-bind:index="index"
                    v-bind:game-config="gameConfig"
                    v-on:delete="deletePlayer($event)"/>
            </div>
        </div>
    </div>
</template>

<script>
import Player from './Player';

export default {
    name: 'Players',
    props: ['players', 'gameConfig'],
    components: {
        Player
    },
    methods: {
        getEmptyPlayer,
        addPlayer,
        deletePlayer,
        swapPlayers
    }
}

function getEmptyPlayer() {
    const vm = this;
    const playerConfig = vm.gameConfig.players;
    const statusTypes = playerConfig && playerConfig.statusTypes;

    const emptyPlayer = {
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
    };

    if (statusTypes) {
        emptyPlayer.status = statusTypes[0];
    } 

    return emptyPlayer;
}

function addPlayer() {
    const vm = this;
    vm.players.push(vm.getEmptyPlayer());
}

function deletePlayer(index) {
    var vm = this;
    vm.players.splice(index, 1);
}

function swapPlayers() {
    var vm = this;

    if (vm.players.length === 2) {
        const playersToSwap = [vm.players[0], vm.players[1]];
        this.players.splice(0, 2, playersToSwap[1], playersToSwap[0]);
    }
}
</script>
