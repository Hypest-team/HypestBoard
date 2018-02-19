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

    var data = {
        scoreBoard: {},
        gameList: [],
        characterList: []
    };

    var vm = new Vue({
        el: '#scoreBoardAdmin',
        data: data,
        mounted: onMounted,
        methods: {
            isFilledIn: isFilledIn,
            updateScoreboard: updateScoreboard,

            onGameChange: onGameChange,

            swapPlayers: swapPlayers,
            resetForm: resetForm,
            clearChanges: clearChanges,

            addCommentator: addCommentator,
            removeCommentator: removeCommentator
        }
    });

    function onMounted() {
        var vm = this;

        getGameList(vm)
            .then(getFlagList)
            .then(getScoreBoard)
    }

    function isFilledIn(str) {
        return !!str && str.trim().length > 0;
    }

    function swapPlayers(event) {
        var vm = this;

        if (vm.scoreBoard.players.length === 2) {
            var p1 = _.clone(vm.scoreBoard.players[0]);
            var p2 = _.clone(vm.scoreBoard.players[1]);

            vm.scoreBoard.players = [p2, p1];
        }
    }


    function resetForm(event) {
        var vm = this;
        vm.scoreBoard = _.cloneDeep(emptyScoreBoard);
    }

    function clearChanges() {
        var vm = this;
        getScoreBoard(vm);
    }

    function addCommentator() {
        var vm = this;

        vm.scoreBoard.commentators.push({
            name: '',
            handler: ''
        });
    }

    function removeCommentator(index) {
        var vm = this;

        vm.scoreBoard.commentators.splice(index, 1);
    }

    function onGameChange() {
        getCharacterList(this);
    }
        
    function getGameList(vm) {
        return ApiService.getGameList()
            .then(function (data) {
                vm.gameList = data;
                return vm;
            });
    }

    function getFlagList(vm) {
        return ApiService.getFlagList()
            .then(function (data) {
                vm.flagList = data;
                return vm;
            });
    }

    function getCharacterList(vm) {
        var selectedGameId = vm.scoreBoard.game.id;

        return ApiService.getCharacterList(selectedGameId)
            .then(function (data) {
                vm.characterList = data;
                return vm;
            });
    }

    function getScoreBoard(vm) {
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

}(Vue, window.fetch, _));
