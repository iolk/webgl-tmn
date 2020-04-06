import GameState from './GameState.js'
import TerrainTexture from '../textures/Terrain.png'
import ImageLoader from './ImageLoader.js'

export default (function () {

	class Terrain {
		constructor() {
			console.log("terrain")
			this.width = GameState.screen.x
			this.height = 100
			this.color = GameState.colors.red
			this.angle = 0

			this.have_texture = true

			this.origin = {
				x: 0,
				y: 0,
			}

			this.translation = {
				x: 0,
				y: GameState.screen.y - this.height,
			}

			this.rotation = {
				x: 0,
				y: 1,
			}
		}

		getTextureName() { return "Terrain"; }
	}

	var instance

	function createInstance() {
		var obj = new Terrain()
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
