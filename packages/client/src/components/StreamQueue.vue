<template>
    <div>
        <details>
            <summary>Smash GG</summary>

            <SmashGgQueue
                @load="onLoad"
                @select="onSelect"/>
        </details>

        <details>
            <summary>Challonge</summary>

            <ChallongeQueue
                @load="onLoad"
                @select="onSelect"/>
        </details>
    </div>
</template>

<script>
import SmashGgQueue from './SmashGgQueue';
import ChallongeQueue from './ChallongeQueue';

export default {
    name: "StreamQueue",
    components: {
        SmashGgQueue,
        ChallongeQueue
    },
    methods: {
        onLoad(data) {
            this.$emit('load', data);
        },

        onSelect(data) {
            this.$emit('select', data);
        }
    }
};
</script>
