<template>
    <div>
        <div class="input-group">
            <div class="input-group-prepend">
                <div class="input-group-text">
                    <img v-bind:src="getCharacterIcon()" height="24"
                        v-if="selCharacter && selCharacter.id" />
                    <span v-if="!selCharacter || !selCharacter.id">?</span>
                </div>
            </div>
            <select class="form-control"
                    @input="onSelect($event)"
                    v-model="characterId">
                <option v-for="(character, index) in characters"
                    v-bind:value="character.id"
                    v-bind:key="index">
                    {{ character.name }}
                </option>
            </select>
        </div>

        <ColorSelect v-if="selCharacter && colors"
            :colors="colors"
            v-model="selCharacter.color"
            @input="updateColor($event)" />
    </div>
</template>

<script>
import _ from 'lodash';
import ApiService from '../services/ApiService';
import ColorSelect from './ColorSelect';

let apiService = ApiService();

export default {
    name: 'CharacterSelect',
    data () {
        return {
            characters: null,
            characterId: null,
            selCharacter: null,
            colors: []
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
        onSelect,
        getCharacterIcon,
        updateColor
    },
    components: {
        ColorSelect
    }
}

function watchValue(newValue) {
    var vm = this;
    updateViewModel(vm, newValue);
}

function watchGameId(newValue) {
    var vm = this;
    loadCharacters(newValue, vm);
}

function updateViewModel(vm, value) {
    let characters = vm.characters;

    if (characters) {
        let fullCharacter = characters.find(character => {
            return character.id === value.id;
        });

        let colors = fullCharacter.colors;
        vm.colors = colors;

    } else {
        vm.colors = null;
    }

    vm.selCharacter = _.clone(value);
    if (!vm.selCharacter.color && vm.colors && vm.colors.length > 0) {
        vm.selCharacter.color = vm.colors[0];
    }
    delete vm.selCharacter.colors;

    vm.characterId = vm.selCharacter.id;
}

function onMounted() {
    var vm = this;
    updateViewModel(vm, vm.value);
    loadCharacters(vm.gameId, vm);
}

function onSelect(event) {
    var vm = this;
    var selCharacter = vm.characters[event.target.selectedIndex];
    updateViewModel(vm, selCharacter);
    vm.$emit('input', vm.selCharacter);
}

function getCharacterIcon() {
    var vm = this;
    return `static/characters/${vm.gameId}/${vm.selCharacter.id}.png`;
}

function updateColor(color) {
    var vm = this;
    vm.selCharacter.color = color;
    vm.$emit('input', vm.selCharacter);
}

function loadCharacters(gameId, vm) {
    apiService.getCharacters(gameId)
        .then(characters => {
            vm.characters = characters;
            updateViewModel(vm, vm.selCharacter);
            return characters;
        });
}
</script>
