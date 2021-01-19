<template>
        <select class="form-control"
            @input="onSelect($event)"
            v-model="selStatus">
            <option v-for="(status, index) in statusTypes"
                v-bind:value="status"
                v-bind:key="index">
                {{ status.name }}
            </option>
        </select>
</template>

<script>

export default {
    name: 'PlayerStatusSelect',
    data () {
        return {
            statusTypes: null,
            selStatus: null
        }
    },
    props: {
        value: null,
        gameConfig: null
    },
    watch: {
        value: watchValue
    },
    mounted: onMounted,
    methods: {
        onSelect
    }
}

function onMounted() {
    const vm = this;
    const playersConfig = vm.gameConfig.players;
    
    if (playersConfig) {
        vm.statusTypes = playersConfig.statusTypes;
    }

    vm.selStatus = vm.value;
}

function watchValue(newValue) {
    const vm = this;
    vm.selStatus = newValue;
}

function onSelect($event) {
    const vm = this;
    vm.selStatus = vm.statusTypes[$event.target.selectedIndex];
    vm.$emit('input', vm.selStatus);
}

</script>
