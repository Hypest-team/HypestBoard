<template>
    <div v-if="colors">
        <div class="input-group">
            <div class="input-group-prepend">
                <div class="input-group-text">
                    <span v-if="!color || !color.hex">?</span>
                    <span v-if="color" class="color"
                        :style="getColorStyle(color)"></span>
                </div>
            </div>
            <select class="form-control"
                @change="onSelect($event)"
                v-model="selColorId">
                <option v-for="(color, index) in colors"
                    :value="color.id"
                    :key="index">
                    {{ color.name }}
                </option>
            </select>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ColorSelect',
    data: () => ({
        selColorId: ''
    }),
    watch: {
        color: watchColor
    },
    model: {
        prop: 'color'
    },
    props: ['colors', 'color'],
    methods: {
        onSelect,
        getColorStyle
    },
    mounted: onMount
}

function onSelect(event) {
    const vm = this;
    const selColor = vm.colors[event.target.selectedIndex];
    vm.$emit('input', selColor);
}

function getColorStyle(color) {
    if (color) {
        return `background-color: ${color.hex};`;
    } else {
        return '';
    }
}

function watchColor(color) {
    const vm = this;
    vm.selColorId = color.id;
}

function onMount() {
    const vm = this;
    vm.selColorId = vm.color ? vm.color.id : null;
}

</script>

<style scoped>
.color {
    display: block;
    height: 1em;
    width: 1em;
}
</style>

