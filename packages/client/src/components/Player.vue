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
                <label>Character</label>
                <pre>{{ player.character }}</pre>
            </div>

            <div class="form-group">
                <label>Flag</label>
                <pre>{{ player.flag }}</pre>
            </div>

            <div class="form-group">
                <label>Sponsor</label>
                <input type="text" v-model="player.sponsor.name" class="form-control" />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Player',
    props: ['player', 'index']
}
</script>
