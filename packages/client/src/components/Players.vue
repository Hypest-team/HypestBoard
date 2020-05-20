<template>

    <div>
        <div>
            <button type="button" class="btn btn-success" @click="$emit('add')">
                <i class="fa fa-plus"></i>
                Add player
            </button>

            <button type="button" class="btn btn-secondary" @click="$emit('swap')" v-if="players && players.length == 2">
                <i class="fa fa-swap"></i>
                Swap players 
            </button>
        </div>

        <br/>

        <div class="jumbotron text-center" v-if="!players || players.length === 0">
            <h4>No players added.<br/>Click <a href @click.prevent="$emit('add')">here</a> to add an player.</h4>
        </div>
        
        <div class="row" v-if="players">
            <div class="col-md-6" v-for="(player, index) in players" :key="index">
                <Player 
                    v-bind:player="player"
                    v-bind:index="index"
                    v-bind:game-id="gameId"
                    v-on:delete="$emit('delete', $event)"/>
            </div>
        </div>
    </div>
</template>

<script>
import Player from './Player';

export default {
    name: 'Players',
    props: ['players', 'gameId'],
    components: {
        Player
    }
}
</script>
