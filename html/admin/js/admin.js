(function (Vue, fetch, _) {
    var emptyScoreBoard = {
        players: [{
            "name": "",
            "character": {
                "name": "",
                "icon": ""
            },
            "sponsor": {
                "name": "",
                "icon": ""
            },
            "score": 0,
            "flag": {
                "name": "",
                "icon": ""
            }
        }, {
            "name": "",
            "character": {
                "name": "",
                "icon": ""
            },
            "sponsor": {
                "name": "",
                "icon": ""
            },
            "score": 0,
            "flag": {
                "name": "",
                "icon": ""
            }
        }],
        "round": "",
        "tournamentName": "",
        "caster": "",
        "streamer": ""
    };

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
        flagList: []
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

            swapPlayers: swapPlayers,
            resetForm: resetForm,
            clearChanges: clearChanges,

            getFlag: getFlag,

            addCommentator: addCommentator,
            removeCommentator: removeCommentator,

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

    function swapPlayers(event) {
        if (vm.scoreBoard.players.length === 2) {
            var p1 = _.clone(vm.scoreBoard.players[0]);
            var p2 = _.clone(vm.scoreBoard.players[1]);

            vm.scoreBoard.players = [p2, p1];
        }
    }


    function resetForm(event) {
        vm.scoreBoard.players = vm.scoreBoard.players.map(function () {
            return {
                name: '',
                score: 0,
                character: {},
                flag: {},
                sponsor: ''
            };
        });
    }

    function clearChanges() {
        getScoreBoard();
    }

    function addCommentator() {
        vm.scoreBoard.commentators.push({
            name: '',
            handler: ''
        });
    }

    function removeCommentator(index) {
        vm.scoreBoard.commentators.splice(index, 1);
    }

    function onGameChange() {
        vm.scoreBoard.players = vm.scoreBoard.players.map(function (player) {
            player.character = {};
            return player;
        });

        getCharacterList();
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
            .then(function (data) {
                this.scoreBoard = data;
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
        return {
            name: ggPlayer.gamerTag,
            character: {
                icon: '',
                name: ''
            },
            flag: convertCountryToFlag(ggPlayer.country),
            sponsor: ggPlayer.prefix || '',
            score: 0
        };
    }

    function autoFillGgSet(ggSet) {
        var players = [];

        ggSet.entrants.forEach(function (entrant) {
            if (entrant) {
                entrant.players.forEach(function (player) {
                    players.push(convertGgPlayer(player));
                }); 
            }
        });

        vm.scoreBoard.players = players;
        vm.scoreBoard.round = ggSet.fullRoundText;
        vm.scoreBoard.streamer = ggSet.stream.streamName;
    }

}(Vue, window.fetch, _));
