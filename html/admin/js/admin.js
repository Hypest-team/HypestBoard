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

    var data = {
        scoreBoard: _.cloneDeep(emptyScoreBoard),
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

            onCharacterChange: onCharacterChange, 
            onGameChange: onGameChange,

            swapPlayers: swapPlayers,
            resetForm: resetForm,
            clearChanges: clearChanges
        }
    });

    function onMounted() {
        getGameList(this)
            .then(getScoreboard)
    }

    function isFilledIn(str) {
        return !!str && str.trim().length > 0;
    }

    function swapPlayers(event) {
        var Player1 = _.clone(this.scoreBoard.Player1);
        var Player2 = _.clone(this.scoreBoard.Player2);

        this.scoreBoard.Player1 = Player2
        this.scoreBoard.Player2 = Player1;
    }


    function resetForm(event) {
        this.scoreBoard = _.cloneDeep(emptyScoreBoard);
    }

    function clearChanges() {
        getScoreboard(this);
    }

    function onGameChange() {
        getCharacterList(this);
    }
    
    function onCharacterChange(player) {
        var vm = this;
        var character = vm.characterList.find(function (char) {
            return char.name === player.character.name;
        }) || {};
        
        player.character.icon = character.icon;
    }

    function processResponse(response) {
        if (response.ok) {
            return response.json();
        } else {
            console.error('HypestScore server is down');
        }
    }

    function getGameList(vm) {
        return fetch('/config/games.json')
            .then(processResponse)
            .then(function (data) {
                vm.gameList = data;
                return vm;
            });
    }

    function getCharacterList(vm) {
        var selectedGameId = vm.scoreBoard.game.id;

        return fetch('/characters/' + selectedGameId + '.json')
            .then(processResponse)
            .then(function (data) {
                vm.characterList = data;
                return vm;
            });
    }

    function getScoreboard(vm) {
        return fetch('/api/scoreboard')
            .then(processResponse)
            .then(function (data) {
                vm.scoreBoard = data;
                return vm;
            });
    }

    function updateScoreboard(event) {
        return fetch('/api/scoreboard', {
            method: 'post',
            body: JSON.stringify(this.scoreBoard),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(processResponse)
            .then(function (data) {
                console.log('POSTED scoredboard');
                this.scoreBoard = data;
            });
    }

}(Vue, window.fetch, _));
