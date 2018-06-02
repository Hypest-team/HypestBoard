(function (Vue, fetch) {
	var REFRESH_TIMEOUT = 1000; // in MS
	
	var data = {
		scoreboard: {}
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
		return fetch('/api/scoreboard')
			.then(function (response) {
				if (response.ok) {
					return response.json();
				} else {
					console.error('HypestBoard server is down');
				}
			})
			.then(function (data) {
				vm.scoreboard = data;
				
				window.setTimeout(function () {
					getScoreboard(vm);
				}, REFRESH_TIMEOUT);
			});
	}
		
}(Vue, window.fetch));
