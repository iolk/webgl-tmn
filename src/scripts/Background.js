import GameState from './GameState.js'
import Terrain from './Terrain.js'

export default (function () {

	class Background {
		constructor() {
			this.width = GameState.screen.x
			this.height = GameState.screen.y - Terrain.height
			this.color = GameState.colors.red
			this.angle = 0

			this.have_texture = true

			this.origin = {
				x: 0,
				y: 0,
			}

			this.translation = {
				x: 0,
				y: 0,
			}

			this.rotation = {
				x: 0,
				y: 1,
			}
		}

		getTextureName() { return "Background"; }
	}

	var instance

	function createInstance() {
		var obj = new Background()
		return obj
	}

	return {
		getInstance: function () {
			if (!instance) {
				instance = createInstance()
			}
			return instance
		}
	}
})().getInstance()
