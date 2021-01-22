<template>
    <div class="card">
        <div class="card-header">
            <button type="button"
                class="btn btn-danger btn-sm pull-right"
                @click="$emit('delete', index)"
                title="Remove commentator">
                <i class="fa fa-times"></i>
            </button>
            <strong>Commentator {{ index + 1 }}</strong>
        </div>
        <div class="card-body">
            <div class="form-group form-check">
                <input type="checkbox"
                    class="form-check-input"
                    :id="`commentator-enabled-${index}`"
                    v-model="commentator.enabled">
                <label class="form-check-label"
                    :for="`commentator-enabled-${index}`">
                    Enabled
                </label>
            </div>
            <div class="form-group">
                <label>Name</label>
                <input type="text" v-model="commentator.name" class="form-control" />
            </div>
            <div class="form-group">
                <label>Handle</label>
                <input type="text" v-model="commentator.handle" class="form-control" />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Commentator',
    props: ['commentator', 'index'],
    model: {
        prop: 'commentator'
    }
}
</script>
