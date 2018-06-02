<template>
    <div>
        <div class="alert alert-danger">
            <b>TODO:</b> Scoreboard
        </div>

        <form novalidate @submit.prevent="updateScoreboard">

            <details open="true">
                <summary><strong>Commentators</strong></summary>

                <br/>

                <Commentators 
                    v-bind:commentators="scoreboard.comentators"
                    v-on:add="addCommentator()"
                    v-on:delete="deleteCommentator($event)" />
            </details>


            <hr />

            <div class="actions">
                <button type="submit" class="btn btn-primary">Update scoreboard</button>
            </div>
        </form>
    </div>
</template>

<script>
import ApiService from '../services/ApiService';
import Commentators from './Commentators';

const apiService = new ApiService();

export default {
    name: 'Scoreboard',
    data () {
        return {
            scoreboard: {}
        }
    },
    components: {
        Commentators
    },
    mounted: onMounted,
    methods: {
        updateScoreboard,
        addCommentator,
        deleteCommentator
    }
}

function onMounted() {
    var vm = this;
    apiService.getScoreboard()
        .then(scoreboard => {
            vm.scoreboard = scoreboard;
            return scoreboard;
        });
}

function updateScoreboard() {
    var vm = this;
    apiService.updateScoreboard(vm.scoreboard)
        .then(scoreboard => {
            vm.scoreboard = scoreboard;
            return scoreboard;
        });
}

function addCommentator() {
    var vm = this;
    vm.scoreboard.comentators.push({
        name: '',
        handle: ''
    });
}

function deleteCommentator(index) {
    var vm = this;
    vm.scoreboard.comentators.splice(index, 1);
}
</script>
