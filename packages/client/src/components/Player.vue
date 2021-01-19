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

            <div class="form-group">
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

export default {
    name: 'Player',
    props: ['player', 'index', 'gameConfig'],
    components: {
        CharacterSelect,
        CountrySelect,
        PlayerStatusSelect
    }
}
</script>
