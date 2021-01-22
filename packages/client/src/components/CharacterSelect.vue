<template>
    <div>
        <div v-if="loading">
            Loading character
            <i class="fa fa-spin fa-spinner" />
        </div>
        <div class="input-group" v-if="!loading && character">
            <div class="input-group-prepend">
                <div class="input-group-text">
                    <img v-bind:src="getCharacterIcon()" height="24"
                        v-if="character && character.id" />
                    <span v-if="!character || !character.id">?</span>
                </div>
            </div>
            <select class="form-control"
                v-model="characterId"
                @change="onSelect($event)">
                <option v-for="(character, index) in characters"
                    :value="character.id"
                    :key="index">
                    {{ character.name }}
                </option>
            </select>
        </div>

        <ColorSelect v-if="character && colors"
            :colors="colors"
            v-model="character.color"
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
            characterIcon: null,
            characters: null,
            characterId: 'falcon',
            colors: [],
            loading: true
        }
    },
    model: {
        prop: 'character'
    },
    props: ['gameConfig', 'character'],
    mounted: onMounted,
    watch: {
        gameConfig: watchGameConfig,
        character: watchCharacter
    },
    methods: {
        onSelect,
        getCharacterIcon,
        getColors,
        updateColor,
        updateCharacter,
        loadCharacters
    },
    components: {
        ColorSelect
    }
}

async function watchGameConfig(newConfig, oldConfig) {
    const vm = this;
    if (newConfig.id !== oldConfig.id) {
        vm.characters = await vm.loadCharacters();
        if (vm.characters) {
            const firstChar = _.clone(vm.characters[0]);
            vm.updateCharacter(firstChar);
            vm.$emit('input', firstChar);
        } else {
            vm.$emit('input', null);
        }
    }
}

function watchCharacter(newChar) {
    const vm = this;
    vm.updateCharacter(newChar);
}

function updateCharacter() {
    const vm = this;

    if (vm.character) {
        vm.colors = vm.getColors(vm.character);

        if (!vm.character.color &&
            vm.colors && vm.colors.length > 0) {
            vm.character.color = Object.assign({}, vm.colors[0]);
        } else if (!vm.colors) {
            vm.character.color = null;
        }

        vm.characterId = vm.character.id;
    } else {
        vm.characterId = '';
    }
}

function getColors(char) {
    const vm = this;

    if (char) {
        const fullCharacter = vm.characters.find(character => {
            return character.id === char.id;
        });

        if (fullCharacter) {
            return fullCharacter.colors;
        }
    }

    return null;
}

async function onMounted() {
    const vm = this;
    vm.characters = await vm.loadCharacters();
    vm.updateCharacter();
}

function onSelect($event) {
    const vm = this;
    const charId = $event.target.value;
    const selected = _.clone(vm.characters.find((char) => char.id === charId));
    
    delete selected.colors;

    vm.$emit('input', selected);
}

function getCharacterIcon() {
    const vm = this;
    return `static/characters/${vm.gameConfig.id}/${vm.character.id}.png`;
}

function updateColor(color) {
    const vm = this;
    vm.character.color = color;
    vm.$emit('input', vm.character);
}

async function loadCharacters() {
    const vm = this;
    vm.loading = true;
    const chars = await apiService.getCharacters(vm.gameConfig.id);
    vm.loading = false;
    return chars;
}
</script>
