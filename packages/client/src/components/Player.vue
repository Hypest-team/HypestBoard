<template>
    <div class="card">
        <div class="card-header">
            <button type="button"
                class="btn btn-danger btn-sm pull-right"
                v-on:click="$emit('delete', index)"
                title="Remove player">
                <i class="fa fa-times"></i>
            </button>
            <strong>Player {{ index + 1 }}</strong>
        </div>
        <div class="card-body">
            <div class="form-group">
                <label>Name</label>
                <input type="text" v-model="player.name" class="form-control" />
            </div>

            <div class="form-group" v-if="playerHasStatus()">
                <label>Status</label>
                <PlayerStatusSelect
                    v-bind:game-config="gameConfig"
                    v-model="player.status" class="form-control" />
            </div>

            <div class="form-group">
                <label>Character</label>
                <CharacterSelect v-bind:game-config="gameConfig"
                    v-model="player.character"/>
            </div>

            <div class="form-group">
                <label>Country</label>
                <CountrySelect v-model="player.country"/>
            </div>

            <div class="form-group">
                <label>Sponsor</label>
                <input type="text" v-model="player.sponsor" class="form-control" />
            </div>
        </div>
    </div>
</template>

<script>
import CharacterSelect from './CharacterSelect';
import CountrySelect from './CountrySelect';
import PlayerStatusSelect from './PlayerStatusSelect';
import Vue from 'vue';

export default {
    name: 'Player',
    props: ['player', 'index', 'gameConfig'],
    components: {
        CharacterSelect,
        CountrySelect,
        PlayerStatusSelect
    },
    methods: {
        playerHasStatus
    },
    watch: {
        gameConfig: watchGameConfig
    }
}

function gameHasStatusTypes(gameConfig) {
    const playerConfig = gameConfig.players;
    const statusTypes = playerConfig && playerConfig.statusTypes
        && playerConfig.statusTypes.length > 0;

    return !!statusTypes;
}

function playerHasStatus() {
    const vm = this;
    return gameHasStatusTypes(vm.gameConfig);
}

function watchGameConfig(newGameConfig) {
    const vm = this;
    if (!gameHasStatusTypes(newGameConfig)) {
        Vue.delete(vm.player, 'status');
    } else {
        Vue.set(vm.player, 'status', newGameConfig.players.statusTypes[0]);
    }

    Vue.set(vm.player, 'character', {
        name: '',
        id: ''
    })
}
</script>
