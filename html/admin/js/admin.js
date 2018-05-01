(function (Vue, fetch, _) {
    var ApiService = new HypestBoardApiService(fetch);
    var SmashGgService = new SmashGgApiService(fetch);

    var data = {
        scoreBoard: {},
        gameList: [],
        characterList: [],
        tournament: {
            data: null,
            stationQueue: null
        },
        flagList: [],
        options: {
            autoGenerateEntrantNames: true
        }
    };

    var vm = new Vue({
        el: '#scoreBoardAdmin',
        data: data,
        mounted: onMounted,
        methods: {
            isFilledIn: isFilledIn,
            updateScoreboard: updateScoreboard,
            updateTournament: updateTournament, 

            onGameChange: onGameChange,
            setEntrantPreset: setEntrantPreset,

            addEntrant: addEntrant,
            removeEntrant: removeEntrant,
            swapEntrants: swapEntrants,

            addPlayer: addPlayer,
            removePlayer: removePlayer,
            swapPlayers: swapPlayers,
            onPlayerNameChange: onPlayerNameChange,

            resetForm: resetForm,
            clearChanges: clearChanges,

            getFlag: getFlag,

            addComentator: addComentator,
            removeComentator: removeComentator,

            autoFillGgSet: autoFillGgSet
        }
    });

    function onMounted() {
        getScoreBoard()
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
        if (vm.scoreBoard.entrants.length === 2) {
            var e1 = _.clone(vm.scoreBoard.entrants[0]);
            var e2 = _.clone(vm.scoreBoard.entrants[1]);

            vm.scoreBoard.entrants = [e2, e1];
        }
    }

    function resetForm() {
        vm.scoreBoard.entrants = vm.scoreBoard.entrants.map(getEmptyEntrant);
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
        getScoreBoard();
    }

    function addComentator() {
        vm.scoreBoard.comentators.push({
            name: '',
            handle: ''
        });
    }

    function removeComentator(index) {
        vm.scoreBoard.comentators.splice(index, 1);
    }

    function onGameChange() {
        /*vm.scoreBoard.players = vm.scoreBoard.players.map(function (player) {
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

        vm.scoreBoard.entrants = entrants;
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
        vm.scoreBoard.entrants.push(getEmptyEntrant());
    }

    function removeEntrant(index) {
        vm.scoreBoard.entrants.splice(index, 1);
    }

    function removePlayer(entrant, index) {
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

                if (!vm.scoreBoard.game) {
                    vm.scoreBoard.game = vm.gameList[0];
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
        var selectedGameId = vm.scoreBoard.game.id;

        return ApiService.getCharacterList(selectedGameId)
            .then(function (data) {
                vm.characterList = data;
                return vm;
            });
    }

    function getScoreBoard() {
        return ApiService.getScoreBoard()
            .then(function (data) {
                vm.scoreBoard = data;
                return vm;
            });
    }

    function updateScoreboard(event) {
        return ApiService.updateScoreBoard(this.scoreBoard)
            .then(function (data) {
                vm.scoreBoard = data;
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
                vm.scoreBoard.streamer = data.data.entities.stream.streamName;
            });
    }

    function updateTournament(event) {
        return SmashGgService.getTournament(vm.tournament.editSlug)
            .then(function (data) {
                vm.tournament.data = data;
                vm.scoreBoard.tournamentName = data.entities.tournament.name;
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

        vm.scoreBoard.entrants = entrants;
        vm.scoreBoard.round = ggSet.fullRoundText;
        vm.scoreBoard.streamer = ggSet.stream.streamName;
    }

}(Vue, window.fetch, _));
