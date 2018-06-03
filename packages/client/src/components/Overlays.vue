<template>
    <div v-if="manifest">
        <h3>{{ manifest.name }}</h3>

        <ul>
            <li v-for="(overlay, index) in manifest.overlays"
                v-bind:value="overlay"
                v-bind:key="index">
                <a :href="getOverlayUrl(overlay)" target="_blank">
                    {{ overlay.name }}
                </a>
                
            </li>
        </ul>
    </div>
</template>

<script>
import ApiService from '../services/ApiService';

let apiService = ApiService();

export default {
    name: 'Overlays',
    data () {
        return {
            manifest: null
        }
    },
    mounted: onMounted,
    methods: {
        getOverlayUrl
    }
}

function onMounted() {
    var vm = this;
    apiService.getOverlaysManifest()
        .then(manifest => {
            vm.manifest = manifest;
            return manifest;
        });
}

function getOverlayUrl(overlay) {
    return `/overlays/${overlay.url}`;
}

</script>
