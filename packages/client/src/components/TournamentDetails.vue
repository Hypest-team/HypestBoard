<template>

    <div>
        <div class="row">
            <div class="col form-group">
                <label>Tournament name</label>
                <input type="text" class="form-control" v-model="scoreboard.tournamentName" />
            </div>

            <div class="col form-group">
                <label>Tournament round</label>
                <input type="text" class="form-control" v-model="scoreboard.round" />
            </div>

            <div class="col form-group">
                <label>Streamer</label>
                <input type="text" class="form-control" v-model="scoreboard.streamer" />
            </div>

            <div class="col form-group">
                <label>Caster</label>
                <input type="text" class="form-control" v-model="scoreboard.caster" />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'TournamentDetails',
    props: ['scoreboard']
}
</script>
