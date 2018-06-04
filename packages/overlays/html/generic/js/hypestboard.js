(function (Vue, fetch, window) {
	var REFRESH_TIMEOUT = 1000; // in MS

    var vm = new Vue({
        el: '#scoreboard',
        data: function () {
            return {
                scoreboard: {}
            }
        },
        methods: {
            isFilled: isFilled,
            getCharacterUrl: getCharacterUrl
        },
        mounted: onMounted
    })

    function onMounted() {
        var vm = this;
        getScoreboard(vm);
    }

	function isFilled(str) {
		return !!str && str.trim().length > 0;
	}

    function getCharacterUrl(character) {
        var vm = this;
        return `/static/characters/${vm.scoreboard.game.id}/${character.id}.png`;
    }

	function getScoreboard(vm) {
		return fetch('/api/scoreboard')
			.then(function (response) {
				if (response.ok) {
					return response.json();
				} else {
					console.error('There was an error while fetching the scoreboad. Server is down?');
				}
			})
			.then(function (data) {
				vm.scoreboard = data;
				
				window.setTimeout(function () {
					getScoreboard(vm);
                }, REFRESH_TIMEOUT);
			});
	}
}(Vue, window.fetch, window));
