<template>
    <div>
        <form novalidate @submit.prevent="loadTournament()">
            <details v-bind:open="expanded">
                <summary>Tournament data</summary>


                    <div class="form-group">
                        <label>API key</label>
                        <input class="form-control" type="password"
                            name="smashgg-api-key"
                            v-model="apiKey"/>

                        <small class="form-text text-muted">
                            A smash.gg API key can be created at:<br/>
                            <a target="_blank" href="https://smash.gg/admin/profile/developer">
                            https://smash.gg/admin/profile/developer</a><br/>
                            <em>Ensure that you are logged in beforehand on smash.gg</em>
                        </small>
                    </div>
                    <div class="form-group">
                        <label>Tournament slug</label>
                        <input class="form-control" type="text"
                            v-model="tournamentSlug"/>

                        <small class="form-text text-muted">
                            The tournament slug can be extracted from the URL:<br/> https://smash.gg/tournament/<wbr/><strong>tournament-slug</strong>
                        </small>
                    </div>
            </details>

            <div class="actions">
                <button type="submit" class="btn btn-primary">
                    Get queues
                </button>
                <div class="form-group form-check">
                    <input type="checkbox"
                        class="form-check-input"
                        id="gg-autorefresh"
                        v-model="autoUpdate"
                        v-on:change.prevent="onAutoUpdateChange()">
                    <label class="form-check-label" for="gg-autorefresh">Refresh automatically</label>
                </div>
                <small v-if="updateDate">
                    Last updated:
                    <strong>{{ updateDate | date }}</strong>
                </small>
            </div>
        </form>

        <hr />

        <div v-if="tournament">
            <strong v-if="tournament.tournamentName">
                {{ tournament.tournamentName }}
            </strong>

            <div v-if="tournament.sets">
                <div class="jumbotron text-center"
                     v-if="tournament.sets === 0">
                    <h4>No games in the queue</h4>
                </div>

                <div v-for="(set, index) in tournament.sets"
                    :key="index">
                    <small><strong>{{ set.round }}</strong></small><br/>
                    <button class="btn btn-sm btn-success"
                        @click="selectSet(set)">
                        <i class="fa fa-check"></i>
                    </button>
                    <span v-for="(entrant, index) in set.entrants"
                        :key="index">
                        <span v-if="entrant">
                            {{ entrant.name }}
                        </span>
                        <span v-if="!entrant">
                            -
                        </span>
                        <span v-if="index < set.entrants.length - 1">VS</span>
                    </span>
                    <hr/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import SmashGgService from "../services/SmashGgService";

let smashGgService = SmashGgService();

export default {
    name: "SmashGgQueue",
    data() {
        return {
            tournamentSlug: "",
            apiKey: localStorage.smashGgApiKey,
            tournament: null,
            expanded: true,
            autoUpdate: true,
            autoUpdateTimer: null,
            updateDate: null
        };
    },
    methods: {
        loadTournament,
        loadQueues,
        selectSet,
        onAutoUpdateChange
    },
};

const AUTO_UPDATE_MS = 10000;

function loadTournament() {
    var vm = this;

    return vm.loadQueues()
        .then((response) => {
            vm.expanded = false;
            vm.onAutoUpdateChange(true);
            vm.$emit("load", { isSmashGg: true, ...response });
        });
}

async function loadQueues() {
    var vm = this;

    return smashGgService
        .getTournamentQueue(vm.tournamentSlug, vm.apiKey)
        .then((response) => {
            vm.tournament = response;
            vm.updateDate = new Date();
        });
}

function selectSet(set) {
    const vm = this;
    vm.$emit("select", { isSmashGg: true, ...set });
}

async function onAutoUpdateChange(skipFirstLoad) {
    const vm = this;

    if (!vm.tournament) {
        return;
    }

    window.clearTimeout(vm.autoUpdateTimer);

    if (vm.autoUpdate) {
        const doUpdate = async () => {
            if (skipFirstLoad) {
                skipFirstLoad = false;
            } else {
                try {
                    await vm.loadQueues();
                } catch (e) {
                    // TODO: show something nicer!
                    console.error('Failure in loading queue');
                }
            }
            vm.autoUpdateTimer = window.setTimeout(() => doUpdate(), AUTO_UPDATE_MS);
        };

        doUpdate();
    }
}

</script>
