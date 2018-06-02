<template>
    <div>
        <div class="input-group">
            <div class="input-group-prepend">
                <div class="input-group-text">
                    <span v-if="!selFlagCode">?</span>
                    <span v-if="selFlagCode"
                        class="flag-icon"
                        :class="'flag-icon-' + selFlagCode"></span>
                </div>
            </div>
            <select class="form-control"
                @input="onSelect($event)"
                v-model="selFlagCode">
                <option v-for="(flagName, flagCode) in flags"
                    v-bind:key="flagCode"
                    v-bind:value="flagCode.toLowerCase()">
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
    name: 'CountrySelect',
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
        onSelect
    }
}

function watchValue(newValue) {
    var vm = this;
    vm.selFlagCode = newValue.code;
}

function onMounted() {
    var vm = this;
    vm.selFlagCode = vm.value.code;
    loadFlags(vm);
}

function onSelect($event) {
    var vm = this;
    var countryCode = $event.target.value;
    vm.$emit('input', {
        name: vm.flags[countryCode.toUpperCase()],
        code: countryCode
    }); 
}

function loadFlags(vm) {
    apiService.getFlags()
        .then(flags => {
            vm.flags = flags;
            return flags;
        });
}
</script>
