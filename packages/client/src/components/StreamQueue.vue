<template>
    <div>
        <h2>Smash.gg Tournament</h2>

        <details>
            <summary>Smash GG</summary>

            <SmashGgQueue />
        </details>

        <details>
            <summary>Challonge</summary>

            <ChallongeQueue />
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
    }
};
</script>
