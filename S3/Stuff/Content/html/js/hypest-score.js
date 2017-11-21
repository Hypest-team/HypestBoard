(function (Vue, fetch) {
	var REFRESH_TIMEOUT = 1000; // in MS
	
	var data = {
		scoreBoard: {
			"Player1": {
				"name": "",
				"character": {
					"name": "Fox",
					"icon": "20xx.png"
				},
				"sponsor": {
					"name": "None",
					"icon": "none"
				},
				"score": 0,
				"flag": {
					"name": "Spain",
					"icon": "spain.png"
				}
			},
			"Player2": {
				"name": "",
				"character": {
					"name": "Fox",
					"icon": "20xx.png"
				},
				"sponsor": {
					"name": "None",
					"icon": "none"
				},
				"score": 0,
				"flag": {
					"name": "Spain",
					"icon": "spain.png"
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
		mounted: onMounted
	});
	
	function onMounted() {
		getScoreboard(this);
	}
	
	function getScoreboard(vm) {
		return fetch('/getCurrentValues')
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
