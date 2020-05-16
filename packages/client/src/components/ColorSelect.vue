<template>
    <div>
        <div class="input-group">
            <div class="input-group-prepend">
                <div class="input-group-text">
                    <span v-if="!selColor || !selColor.hex">?</span>
                    <span v-if="selColor" class="color"
                        :style="getColorStyle(selColor)"></span>
                </div>
            </div>
            <select class="form-control"
                @input="onSelect($event)"
                v-model="selColor">
                <option v-for="(color, index) in colors"
                    v-bind:value="color"
                    v-bind:key="index">
                    {{ color.name }}
                </option>
            </select>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ColorSelect',
    data () {
        return {
            selColor: null
        }
    },
    props: {
        colors: {
            type: Array,
            default () {
                return [];
            }
        },
        value: null
    },
    watch: {
        value: watchValue,
        colors: watchColors
    },
    mounted: onMounted,
    methods: {
        onSelect,
        getColorStyle
    }
}

function watchValue(newValue) {
    var vm = this;
    vm.selColor = newValue;
}

function watchColors() {
    var vm = this;
    vm.selColor = vm.value;
}

function onMounted() {
    var vm = this;
    vm.selColor = vm.value;
}

function onSelect(event) {
    var vm = this;
    vm.selColor = vm.colors[event.target.selectedIndex];
    vm.$emit('input', vm.selColor);
}

function getColorStyle(color) {
    if (color) {
        return `background-color: ${color.hex};`;
    } else {
        return '';
    }
}

</script>

<style scoped>
.color {
    display: block;
    height: 1em;
    width: 1em;
}
</style>

