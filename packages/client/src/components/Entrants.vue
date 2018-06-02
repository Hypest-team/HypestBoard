<template>
    <div>
        <div>
            <button type="button" class="btn btn-success" @click="$emit('add')">
                <i class="fa fa-plus"></i>
                Add entrant
            </button>

            <button type="button" class="btn btn-default" @click="$emit('swap')" v-if="entrants && entrants.length == 2">
                <i class="fa fa-swap"></i>
                Swap entrants 
            </button>
        </div>

        <br/>

        <div class="jumbotron text-center" v-if="!entrants || entrants.length === 0">
            <h4>No entrants added.<br/>Click <a href @click.prevent="$emit('add')">here</a> to add an entrant.</h4>
        </div>
        
        <div class="row">
            <div class="col-md-6" v-if="entrants" v-for="(entrant, index) in entrants" :key="index">
                <Entrant 
                    v-bind:entrant="entrant"
                    v-bind:index="index"
                    v-on:delete="$emit('delete', $event)"/>
            </div>
        </div>
    </div>
</template>

<script>
import Entrant from './Entrant';

export default {
    name: 'Entrants',
    props: ['entrants'],
    components: {
        Entrant
    }
}
</script>
