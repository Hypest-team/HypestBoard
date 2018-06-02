<template>
    <div>
        <div class="input-group">
            <div class="input-group-prepend">
                <div class="input-group-text">
                    <img v-bind:src="'/api/' + selCharacter.icon" height="24"
                        v-if="selCharacter && selCharacter.icon" />
                    <span v-if="!selCharacter || !selCharacter.icon">?</span>
                </div>
            </div>
            <select class="form-control"
                @input="onSelect($event)"
                v-model="selCharacter">
                <option v-for="(character, index) in characters"
                    v-bind:value="character"
                    v-bind:key="index">
                    {{ character.name }}
                </option>
            </select>
        </div>
    </div>
</template>

<script>
import ApiService from '../services/ApiService';

let apiService = ApiService();

export default {
    name: 'CharacterSelect',
    data () {
        return {
            characters: null,
            selCharacter: null
        }
    },
    props: {
        gameId: null,
        value: null
    },
    mounted: onMounted,
    watch: {
        value: watchValue,
        gameId: watchGameId
    },
    methods: {
        onSelect
    }
}

function watchValue(newValue) {
    var vm = this;
    vm.selCharacter = newValue;
}

function watchGameId(newValue) {
    var vm = this;
    loadCharacters(newValue, vm);
}

function onMounted() {
    var vm = this;
    vm.selCharacter = vm.value;
    loadCharacters(vm.gameId, vm);
}

function onSelect(event) {
    var vm = this;
    vm.selCharacter = vm.characters[event.target.selectedIndex];
    vm.$emit('input', vm.selCharacter);
}

function loadCharacters(gameId, vm) {
    apiService.getCharacters(gameId)
        .then(characters => {
            vm.characters = characters;
            return characters;
        });
}
</script>
