<template>
    <div>
        <div class="input-group">
            <div class="input-group-prepend">
                <div class="input-group-text">
                    <span v-if="!selFlagCode">?</span>
                    <span v-if="selFlagCode">{{ selFlagCode }}</span>
                </div>
            </div>
            <select class="form-control"
                @input="onSelect($event)"
                v-model="selFlagCode">
                <option v-for="(flagName, flagCode) in flags"
                    v-bind:key="flagCode"
                    v-bind:value="flagCode">
                    {{ flags[flagCode] }}
                </option>
            </select>
        </div>
    </div>
</template>

<script>
import ApiService from '../services/ApiService';

let apiService = ApiService();

export default {
    name: 'FlagSelect',
    data () {
        return {
            flags: null,
            selFlagCode: null
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
        onSelect,
        getFlag
    }
}

function watchValue(newValue) {
    var vm = this;
    vm.selFlag = newValue.code;
}

function onMounted() {
    var vm = this;
    vm.selFlag = vm.value.code;
    loadFlags(vm.gameId, vm);
}

function onSelect($event) {
    var vm = this;
    var countryCode = $event.target.value;
    vm.$emit('input', getFlag(vm.flags[countryCode], countryCode)); 
}

function getFlag(countryName, countryCode) {
    return {
        name: countryName,
        code: countryCode.toLowerCase()
    };
}

function loadFlags(gameId, vm) {
    apiService.getFlags(gameId)
        .then(flags => {
            vm.flags = flags;
            return flags;
        });
}
</script>
