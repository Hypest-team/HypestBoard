<template>
    <div>
        <h2>Smash.gg Tournament</h2>

        <details>
            <summary>Smash GG</summary>

            <SmashGgQueue />
        </details>
    </div>
</template>

<script>
import SmashGgQueue from './SmashGgQueue';

export default {
    name: "StreamQueue",
    components: {
        SmashGgQueue
    }
};
</script>
