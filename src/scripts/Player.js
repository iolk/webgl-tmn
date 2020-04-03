import GameState from './GameState.js'
import Terrain from './Terrain.js'

export default (function () {

	class Player {

		constructor() {
			this.width = 60
			this.height = 100
			this.color = GameState.colors.blue
			this.state = null
			this.angle = 0

			this.origin = {
				x: 0,
				y: 0,
			}

			this.translation = {
				x: GameState.screen.x / 2 - this.width / 2,
				y: GameState.screen.y - Terrain.height - this.height,
			}

			this.rotation = {
				x: 0,
				y: 1,
			}
		}
	}

	var instance;

	function createInstance() {
		var obj = new Player();
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
