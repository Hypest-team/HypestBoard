<template>
    <div>
        <form v-if="scoreboard" novalidate @submit.prevent="$emit('update')">

            <label>Game configuration</label>

            <GameSelect v-model="scoreboard.game" v-bind:games="games" />

            <hr />

            <details open="true" v-if="scoreboard.game">
                <summary><strong>Entrants</strong></summary>

                <br/>

                <Entrants 
                    v-bind:game-config="scoreboard.game"
                    v-bind:entrants="scoreboard.entrants"
                    v-on:add="addEntrant()"
                    v-on:delete="deleteEntrant($event)"
                    v-on:swap="swapEntrants()" />
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
                <summary><strong>Social</strong></summary>
                <br/>

                <Social
                    v-bind:scoreboard="scoreboard"/>
            </details>

            <hr />

            <details>
                <summary><strong>Commentators</strong></summary>

                <br/>

                <Commentators 
                    v-model="scoreboard.commentators" />
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
import Social from './Social';
import Commentators from './Commentators';
import Overlays from './Overlays';

export default {
    name: 'Scoreboard',
    model: {
        prop: 'scoreboard'
    },
    props: {
        scoreboard: null,
        games: null
    },
    components: {
        GameSelect,
        Entrants,
        TournamentDetails,
        Social,
        Commentators,
        Overlays
    }
}

</script>
