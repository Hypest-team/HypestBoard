<template>
    <div>
        <div class="actions">
            <button type="button" class="btn btn-success"
                v-on:click="$emit('add')">
                <i class="fa fa-plus"></i>
                Add commentator</button>
        </div>

        <br/>


        <div class="jumbotron text-center"
            v-if="!commentators || commentators.length === 0">
            <h4>
                No commentators added.<br/>
                Click
                <a href @click.prevent="$emit('add')">here</a>
                to add a commentator.</h4>
        </div>

        <div class="row" v-if="commentators && commentators.length > 0">
            <!-- API has a bug for commentators, it is misspelled! !-->

            <div v-for="(commentator, index) in commentators"
                :key="index"
                class="col-4">
                <Commentator
                    v-bind:commentator="commentator"
                    v-bind:index="index"
                    v-on:delete="$emit('delete', $event)"/>
            </div>
        </div>
    </div>
</template>

<script>
import Commentator from './Commentator';

export default {
    name: 'Commentators',
    props: ['commentators'],
    components: {
        Commentator
    }
}
</script>
