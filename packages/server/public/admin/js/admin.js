(function (Vue, fetch, _) {
    var ApiService = new HypestBoardApiService(fetch);
    var SmashGgService = new SmashGgApiService(fetch);

    var data = {
        scoreboard: {},
        gameList: [],
        characterList: [],
        tournament: {
            data: null,
            stationQueue: null
        },
        flagList: [],
        options: {
            autoGenerateEntrantNames: true
        },
        components: {
            'commentator-card': CommentatorCardComponent(Vue),
            'commentators': CommentatorsComponent(Vue)
        }
    };

    var vm = new Vue({
        el: '#scoreboardAdmin',
        data: function () {
            return data;
        },
        mounted: onMounted,
        methods: {
            isFilledIn: isFilledIn,
            updateScoreboard: updateScoreboard,
            updateTournament: updateTournament, 

            onGameChange: onGameChange,
            setEntrantPreset: setEntrantPreset,

            addEntrant: addEntrant,
            deleteEntrant: deleteEntrant,
            swapEntrants: swapEntrants,

            addPlayer: addPlayer,
            deletePlayer: deletePlayer,
            swapPlayers: swapPlayers,
            onPlayerNameChange: onPlayerNameChange,

            resetForm: resetForm,
            clearChanges: clearChanges,

            getFlag: getFlag,

            addCommentator: addCommentator,
            deleteCommentator: deleteCommentator,

            autoFillGgSet: autoFillGgSet
        }
    });

    function onMounted() {
        getScoreboard()
            .then(getFlagList)
            .then(getGameList);
    }

    function isFilledIn(str) {
        return !!str && str.trim().length > 0;
    }

    function swapPlayers(entrant) {
        if (entrant.players.length === 2) {
            var p1 = _.clone(entrant.players[0]);
            var p2 = _.clone(entrant.players[1]);

            entrant.players = [p2, p1];

            onPlayerNameChange(entrant); 
        }
    }

    function swapEntrants() {
        if (vm.scoreboard.entrants.length === 2) {
            var e1 = _.clone(vm.scoreboard.entrants[0]);
            var e2 = _.clone(vm.scoreboard.entrants[1]);

            vm.scoreboard.entrants = [e2, e1];
        }
    }

    function resetForm() {
        vm.scoreboard.entrants = vm.scoreboard.entrants.map(getEmptyEntrant);
    }

    function getEmptyEntrant(entrant) {
        return {
            name: '',
            score: 0,
            players: (entrant && entrant.players) ?
                entrant.players.map(getEmptyPlayer) : []
        };
    }


    function getEmptyPlayer() {
        return {
            name: '',
            character: {
                name: '',
                icon: ''
            },
            flag: {
                name: '',
                icon: ''
            },
            sponsor: ''
        };
    }

    function clearChanges() {
        getScoreboard();
    }

    function addCommentator() {
        vm.scoreboard.commentators.push({
            name: '',
            handle: ''
        });
    }

    function deleteCommentator(index) {
        vm.scoreboard.commentators.splice(index, 1);
    }

    function onGameChange() {
        /*vm.scoreboard.players = vm.scoreboard.players.map(function (player) {
            player.character = {};
            return player;
        });*/

        getCharacterList();
    }

    function setEntrantPreset(preset) {
        var entrant = getEmptyEntrant();
        var entrants = [];

        entrant.score = preset.score;
        
        for (var i = 0; i < preset.players; i++) {
            entrant.players.push(getEmptyPlayer());
        }

        for (var i = 0; i < preset.entrants; i++) {
            entrants.push(_.cloneDeep(entrant));
        }

        vm.scoreboard.entrants = entrants;
    }

    function getGeneratedEntrantName(entrant) {
        var name = entrant.players.map(function (player) {
            return player.name;
        }).join(' - ');

        return name;
    }

    function onPlayerNameChange(entrant, player) {
        if (vm.options.autoGenerateEntrantNames) {
            entrant.name = getGeneratedEntrantName(entrant);
        }
    }

    function addEntrant() {
        vm.scoreboard.entrants.push(getEmptyEntrant());
    }

    function deleteEntrant(index) {
        vm.scoreboard.entrants.splice(index, 1);
    }

    function deletePlayer(entrant, index) {
        entrant.players.splice(index, 1);
        onPlayerNameChange(entrant);
    }

    function addPlayer(entrant) {
        entrant.players.push(getEmptyPlayer());
        onPlayerNameChange(entrant);
    }
     
    function getGameList() {
        return ApiService.getGameList()
            .then(function (data) {
                vm.gameList = data;

                if (!vm.scoreboard.game) {
                    vm.scoreboard.game = vm.gameList[0];
                }

                return getCharacterList();
            });
    }

    function getFlagList() {
        return ApiService.getFlagList()
            .then(function (data) {
                vm.flagList = data;
                return vm;
            });
    }

    function getCharacterList() {
        var selectedGameId = vm.scoreboard.game.id;

        return ApiService.getCharacterList(selectedGameId)
            .then(function (data) {
                vm.characterList = data;
                return vm;
            });
    }

    function getScoreboard() {
        return ApiService.getScoreboard()
            .then(function (data) {
                vm.scoreboard = data;
                return vm;
            });
    }

    function updateScoreboard(event) {
        return ApiService.updateScoreboard(this.scoreboard)
            .then(function (data) {
                vm.scoreboard = data;
                return vm;
            })
            .catch(function () {
                alert("There was an error while updating the score. Check the console for more details.");
            });
    }

    function updateStationQueue() {
        return SmashGgService.getStationQueue(vm.tournament.data.entities.tournament.id)
            .then(function (data) {
                vm.tournament.stationQueue = data;
                vm.scoreboard.streamer = data.data.entities.stream.streamName;
            });
    }

    function updateTournament(event) {
        return SmashGgService.getTournament(vm.tournament.editSlug)
            .then(function (data) {
                vm.tournament.data = data;
                vm.scoreboard.tournamentName = data.entities.tournament.name;
                return updateStationQueue();
            });
    }

    function getFlag(countryName, countryCode) {
        return {
            name: countryName,
            icon: '/lib/svg-country-flags/svg/' +
                countryCode.toLowerCase() + '.svg'
        };
    }

    function convertCountryToFlag(countryName) {
        var flag = {
            name: '',
            icon: ''
        };
        _.forEach(vm.flagList, function (name, countryCode) {
            if (countryName === name) {
                flag = getFlag(name, countryCode);
                return;
            }
        });
        return flag;
    }

    function convertGgPlayer(ggPlayer) {
        if (ggPlayer) {
            return {
                name: ggPlayer.gamerTag,
                character: {
                    icon: '',
                    name: ''
                },
                flag: convertCountryToFlag(ggPlayer.country),
                sponsor: ggPlayer.prefix || ''
            };
        } else {
            return null;
        }
    }

    function filterNull(o) {
        return !!o;
    }

    function convertGgEntrant(ggEntrant) {
        if (ggEntrant) {
            return {
                name: ggEntrant.name,
                players: ggEntrant.players.map(convertGgPlayer)
                    .filter(filterNull),
                score: 0
            }
        } else {
            return null;
        }
    }

    function autoFillGgSet(ggSet) {
        var entrants = ggSet.entrants.map(convertGgEntrant)
            .filter(filterNull);

        vm.scoreboard.entrants = entrants;
        vm.scoreboard.round = ggSet.fullRoundText;
        vm.scoreboard.streamer = ggSet.stream.streamName;
    }

}(Vue, window.fetch, _));
