import Utils from './GameState.js'

export default (function () {

	class Terrain {
		constructor() {

			this.width = Utils.screen.x
			this.height = 200
			this.color = Utils.colors.red
			this.angle = 0

			this.origin = {
				x: 0,
				y: 0,
			}

			this.translation = {
				x: 0,
				y: Utils.screen.y - this.height,
			}

			this.rotation = {
				x: 0,
				y: 1,
			}
		}

	}

	var instance;

	function createInstance() {
		var obj = new Terrain();
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
