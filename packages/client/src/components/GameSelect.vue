<template>
    <div v-if="games">
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

export default {
    name: 'GameSelect',
    data () {
        return {
            selGame: null
        }
    },
    props: {
        games: null,
        value: null
    },
    mounted: onMounted,
    watch: {
        value: watchValue,
        games: watchGames
    },
    methods: {
        onSelect
    }
}

function watchValue(newValue) {
    var vm = this;
    vm.selGame = newValue;
}

function watchGames(newGames) {
    console.log(newGames, this.games)
}


function onMounted() {
    var vm = this;
    vm.selGame = vm.value;
}

function onSelect(event) {
    var vm = this;
    vm.selGame = vm.games[event.target.selectedIndex];
    vm.$emit('input', vm.selGame);
}

</script>
