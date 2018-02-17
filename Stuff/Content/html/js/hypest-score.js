(function (Vue, fetch) {
	var REFRESH_TIMEOUT = 1000; // in MS
	
	var data = {
		scoreBoard: {
			"Player1": {
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
			},
			"Player2": {
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
			},
			"round": "",
			"tournamentName": "",
			"caster": "",
			"streamer": ""
		}
	};
	
	var vm = new Vue({
		el: '#scoreboard',
		data: data,
		mounted: onMounted,
		methods: {
			isFilledIn: isFilledIn
		}
	});
	
	function onMounted() {
		getScoreboard(this);
	}

	function isFilledIn(str) {
		return !!str && str.trim().length > 0;
	}
	
	function getScoreboard(vm) {
		return fetch('/scoreboard')
			.then(function (response) {
				if (response.ok) {
					return response.json();
				} else {
					console.error('Aurora server is down');
				}
			})
			.then(function (data) {
				vm.scoreBoard = data;
				
				window.setTimeout(function () {
					getScoreboard(vm);
				}, 1000);
			});
	}
		
}(Vue, window.fetch));
