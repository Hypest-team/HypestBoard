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
        gameConfig: null,
        value: null
    },
    mounted: onMounted,
    watch: {
        value: watchValue,
        gameConfig: watchGameConfig
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

function watchGameConfig(newValue) {
    var vm = this;
    updateViewModel(vm, null);
    loadCharacters(newValue, vm);
}

function updateViewModel(vm, value) {
    let characters = vm.characters;

    if (characters && value) {
        let fullCharacter = characters.find(character => {
            return character.id === value.id;
        });

        if (fullCharacter) {
            let colors = fullCharacter.colors;
            vm.colors = colors;
        }

    } else {
        vm.colors = null;
    }

    vm.selCharacter = _.clone(value);
    if (vm.selCharacter) {
        if (!vm.selCharacter.color && vm.colors && vm.colors.length > 0) {
            vm.selCharacter.color = vm.colors[0];
        }
        delete vm.selCharacter.colors;

        vm.characterId = vm.selCharacter.id;
    } else {
        vm.characterId = null;
    }
}

function onMounted() {
    var vm = this;
    updateViewModel(vm, vm.value);
    loadCharacters(vm.gameConfig, vm);
}

function onSelect(event) {
    var vm = this;
    var selCharacter = vm.characters[event.target.selectedIndex];
    updateViewModel(vm, selCharacter);
    vm.$emit('input', vm.selCharacter);
}

function getCharacterIcon() {
    var vm = this;
    return `static/characters/${vm.gameConfig.id}/${vm.selCharacter.id}.png`;
}

function updateColor(color) {
    var vm = this;
    vm.selCharacter.color = color;
    vm.$emit('input', vm.selCharacter);
}

function loadCharacters(gameConfig, vm) {
    apiService.getCharacters(gameConfig.id)
        .then(characters => {
            vm.characters = characters;
            updateViewModel(vm, vm.selCharacter);
            return characters;
        });
}
</script>
