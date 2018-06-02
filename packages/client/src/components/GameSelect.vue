<template>
    <div>
        <select class="form-control"
            @input="onSelect($event)"
            v-model="selGame">
            <option v-for="(game, index) in games"
                v-bind:value="game"
                v-bind:key="index">
                {{ game.name }}
            </option>
        </select>
    </div>
</template>

<script>
import ApiService from '../services/ApiService';

let apiService = ApiService();

export default {
    name: 'GameSelect',
    data () {
        return {
            games: null,
            selGame: null
        }
    },
    props: {
        value: null
    },
    mounted: onMounted,
    watch: {
        value: watchValue
    },
    methods: {
        onSelect
    }
}

function watchValue(newValue) {
    var vm = this;
    vm.selGame = newValue;
}

function onMounted() {
    var vm = this;
    vm.selGame = vm.value;
    loadGames(vm);
}

function onSelect(event) {
    var vm = this;
    vm.selGame = vm.games[event.target.selectedIndex];
    vm.$emit('input', vm.selGame);
}

function loadGames(vm) {
    apiService.getGames()
        .then(games => {
            vm.games = games;
            return games;
        });
}
</script>
