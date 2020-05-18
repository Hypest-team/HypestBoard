<template>

    <div>
        <div class="row">
            <div class="col form-group">
                <label>Twitch</label>
                <input type="text" class="form-control" v-model="scoreboard.twitch" />
            </div>

            <div class="col form-group">
                <label>Youtube</label>
                <input type="text" class="form-control" v-model="scoreboard.youtube" />
            </div>

            <div class="col form-group">
                <label>Twitter</label>
                <input type="text" class="form-control" v-model="scoreboard.twitter" />
            </div>

            <div class="col form-group">
                <label>Reddit</label>
                <input type="text" class="form-control" v-model="scoreboard.reddit" />
            </div>
            <div class="col form-group">
                <label>Facebook</label>
                <input type="text" class="form-control" v-model="scoreboard.facebook" />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Social',
    props: ['scoreboard']
}
</script>
