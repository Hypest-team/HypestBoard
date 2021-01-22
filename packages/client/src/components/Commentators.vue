<template>
    <div>
        <div class="actions">
            <button type="button" class="btn btn-success"
                @click="addCommentator()">
                <i class="fa fa-plus"></i>
                Add commentator
            </button>
        </div>

        <br/>

        <div class="jumbotron text-center"
            v-if="!commentators || commentators.length === 0">
            <h4>
                No commentators added.<br/>
                Click
                <a href @click.prevent="addCommentator()">here</a>
                to add a commentator.</h4>
        </div>

        <div class="row" v-if="commentators && commentators.length > 0">
            <!-- API has a bug for commentators, it is misspelled! !-->

            <div v-for="(commentator, index) in commentators"
                :key="index"
                class="col-4">
                <Commentator
                    v-model="commentators[index]"
                    v-bind:index="index"
                    @delete="deleteCommentator($event)"/>
            </div>
        </div>
    </div>
</template>

<script>
import Commentator from './Commentator';

export default {
    name: 'Commentators',
    props: ['commentators'],
    model: {
        prop: 'commentators'
    },
    components: {
        Commentator
    },
    methods: {
        getEmptyCommentator,
        addCommentator,
        deleteCommentator
    }
}

function getEmptyCommentator() {
    return {
        name: '',
        handle: '',
        enabled: true
    };
}

function addCommentator() {
    var vm = this;
    vm.commentators.push(getEmptyCommentator());
}

function deleteCommentator(index) {
    var vm = this;
    vm.commentators.splice(index, 1);
}
</script>
