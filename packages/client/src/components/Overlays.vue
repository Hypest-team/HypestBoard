<template>
    <div v-if="manifests">
        <div v-for="(manifest, index) in manifests"
            v-bind:key="index">
            <h3>{{ manifest.name }}</h3>

            <ul class="list-unstyled">
                <li v-for="(overlay, index) in manifest.overlays"
                    v-bind:value="overlay.url"
                    v-bind:key="index">

                    <span class="btn-group">
                        <button type="button" class="btn btn-primary" @click="copyUrl(index)"
                            title="Copy overlay URL">
                            <i class="fa fa-copy"></i>
                        </button>

                        &nbsp;

                        <a class="btn btn-secondary" :href="getOverlayUrl(overlay)" target="_blank"
                            title="Preview overlay">
                            <i class="fa fa-external-link"></i>
                        </a>
                    </span>

                    <strong> {{overlay.name}}</strong>

                    <input type="hidden" readonly v-bind:value="getOverlayUrl(overlay)"
                        ref="overlayUrl" />
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import ApiService from '../services/ApiService';

let apiService = ApiService();

export default {
    name: 'Overlays',
    data () {
        return {
            manifests: null
        }
    },
    mounted: onMounted,
    methods: {
        getOverlayUrl,
        copyUrl
    }
}

function onMounted() {
    var vm = this;
    apiService.getOverlaysManifest()
        .then(manifests => {
            vm.manifests = manifests;
            return manifests;
        });
}

function getOverlayUrl(overlay) {
    return `${location.protocol}//${location.host}${overlay.url}`;
}

function copyUrl(index) {
    const vm = this;
    const input = vm.$refs.overlayUrl[index];

    input.setAttribute('type', 'text');
    input.select();
    window.document.execCommand("copy");
    input.setAttribute('type', 'hidden');
    window.getSelection().removeAllRanges();
}

</script>
