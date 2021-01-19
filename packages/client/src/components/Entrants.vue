<template>
    <div>
        <div>
            <button type="button" class="btn btn-success" @click="addEntrant()">
                <i class="fa fa-plus"></i>
                Add entrant
            </button>

            <button type="button" class="btn btn-secondary" @click="swapEntrants()" v-if="entrants && entrants.length == 2">
                <i class="fa fa-swap"></i>
                Swap entrants 
            </button>
        </div>

        <br/>

        <div class="jumbotron text-center" v-if="!entrants || entrants.length === 0">
            <h4>No entrants added.<br/>Click <a href @click.prevent="addEntrant()">here</a> to add an entrant.</h4>
        </div>
        
        <div class="row" v-if="entrants">
            <div class="col-md-6" v-for="(entrant, index) in entrants" :key="index">
                <Entrant 
                    v-bind:entrant="entrant"
                    v-bind:index="index"
                    v-bind:game-config="gameConfig"
                    v-on:delete="deleteEntrant()"/>
            </div>
        </div>
    </div>
</template>

<script>
import Entrant from './Entrant';

export default {
    name: 'Entrants',
    props: ['entrants', 'gameConfig'],
    components: {
        Entrant
    },
    methods: {
        getEmptyEntrant,
        addEntrant,
        deleteEntrant,
        swapEntrants
    }
}

function addEntrant() {
    const vm = this;
    vm.entrants.push(vm.getEmptyEntrant());
}

function getEmptyEntrant() {
    return {
        name: '',
        score: 0,
        players: []
    }
}

function deleteEntrant(index) {
    var vm = this;
    vm.entrants.splice(index, 1);
}

function swapEntrants() {
    var vm = this;

    if (vm.entrants.length === 2) {
        const entrantsToSwap = [vm.entrants[0], vm.entrants[1]];
        this.entrants.splice(0, 2, entrantsToSwap[1], entrantsToSwap[0]);
    }
}

</script>
