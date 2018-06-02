<template>
<div id="app">
    <div class="container-fluid">
        <h1>HypestBoard admin page</h1>
        <div class="row">
            <div class="col-md-2">
                <StreamQueue />
            </div>
            <div class="col-md-10">
                <Scoreboard /> 
            </div>
        </div>
    </div>
</div>
</template>

<script>
import Scoreboard from './components/Scoreboard';
import StreamQueue from './components/StreamQueue';

export default {
    name: 'App',
    components: {
        Scoreboard,
        StreamQueue
    }
}
</script>

<style>
@import '../node_modules/bootstrap/dist/css/bootstrap.css';
@import '../node_modules/font-awesome/css/font-awesome.css';
@import '../node_modules/flag-icon-css/css/flag-icon.css';

</style>
