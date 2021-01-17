<template>
    <div v-if="!!flags">
        <div class="input-group">
            <div class="input-group-prepend">
                <div class="input-group-text">
                    <span v-if="!value.code">?</span>
                    <span v-if="value.code"
                        class="flag-icon"
                        :class="`flag-icon-${value.code.toLowerCase()}`"></span>
                </div>
            </div>
            <select class="form-control"
                @input="onSelect($event)"
                v-model="value.code">
                <option v-for="(name, code) in flags"
                    v-bind:key="code"
                    v-bind:value="code.toLowerCase()">
                    {{ flags[code] }}
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
            flags: null
        }
    },
    props: {
        value: null
    },
    mounted: onMounted,
    methods: {
        onSelect
    }
}

async function onMounted() {
    const vm = this;
    vm.flags = await loadFlags();
}

function onSelect($event) {
    var vm = this;
    var countryCode = $event.target.value;

    vm.$emit('input', {
        name: vm.flags[countryCode.toUpperCase()],
        code: countryCode
    }); 
}

async function loadFlags() {
    return apiService.getFlags();
}
</script>
