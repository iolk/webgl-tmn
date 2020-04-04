
export default (function () {

	class GameState {
		constructor() {
			this.screen = {
				x: 800,
				y: 600,
				center: {
					x: 0,
					y: 0,
				}
			}

			this.colors = {
				red: [1, 0, 0, 1],
				green: [0, 1, 0, 1],
				blue: [0, 0, 1, 1],
				violet: [0.6, 0, 1, 1],
				gray: [0.4, 0.4, 0.4, 1],
				black: [0, 0, 0, 1],
				white: [1, 1, 1, 1],
			};

			this.GRAVITY = 9.8;

			this.keys = {
				up: false,
				bottom: false,
				right: false,
				left: false,
			}

			this.shurikens = [];
			this.ninjas = [];
			this.stop = false;
			this.points = 0;
			this.gl = null;
			this.locators = null;
		}
	}

	var instance;

	function createInstance() {
		var obj = new GameState();
		return obj;
	}

	return {
		getInstance: function () {
			if (!instance) {
				instance = createInstance();
			}
			return instance;
		}
	};
})().getInstance()
